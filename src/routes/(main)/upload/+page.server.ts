import type { RequestEvent } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import type { MediaType, UploadData } from '../../../api/api';
import { MongoServerError } from 'mongodb';
import { uploadRepo } from '../../../api/upload-repo';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

const compressImage = async (buffer: ArrayBuffer, out: string) => {
  let quality = 100;

  try {
    let curBuffer = buffer;
    while (curBuffer.byteLength > 500000 && quality > 10) {
      quality -= 10;
      await sharp(curBuffer)
        .rotate()
        .resize({ width: 1500, height: 1500, fit: 'inside', withoutEnlargement: true })
        .toFormat('jpeg')
        .jpeg({ quality: 80 })
        .toFile(out);
      curBuffer = await sharp(out).toBuffer();
    }
    console.log(
      'Saved image with final size: ' + curBuffer.byteLength + ' with quality ' + quality
    );
  } catch (e) {
    console.error('Error while compressing image', e);
    console.log('Saving image with original size: ' + buffer.byteLength);
    writeFileSync(out, Buffer.from(buffer));
  }
};

/** @type {import('../../../../.svelte-kit/types/src/routes').Actions} */
export const actions = {
  default: async (event: RequestEvent) => {
    const formData = await event.request.formData();

    const author = formData.get('author') as string;
    const files = formData.getAll('photos') as File[];
    const uploadType = formData.get('uploadType') as string;

    let index = 0;
    for (const file of files) {
      if (!existsSync('upload')) mkdirSync('upload');

      const location = 'upload/' + uploadType;
      // Randomize the name using uuid
      const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
      const buffer: ArrayBuffer = await file.arrayBuffer();
      const shouldCompress =
        file.type.startsWith('image') &&
        !file.type.endsWith('gif') &&
        !file.type.endsWith('svg') &&
        !file.type.endsWith('bmp') &&
        buffer.byteLength > 500000;
      const fileName = uuidv4() + (shouldCompress ? '-full' : '') + fileExtension;

      // Save file to local storage
      mkdirSync(location, { recursive: true });
      writeFileSync(`${location}/${fileName}`, Buffer.from(buffer));

      if (shouldCompress) {
        compressImage(
          buffer,
          `${location}/${fileName.replace('-full', '').replace(fileExtension, '.jpg')}`
        );
      }

      const data: UploadData = {
        fileName: file.name,
        author,
        message: formData.get('comment-' + index++) as string,
        location: `${location}/${fileName
          .replace('-full', '')
          .replace(fileExtension, shouldCompress ? '.jpg' : fileExtension)}`,
        timestamp: new Date(),
        type: uploadType as MediaType
      };

      try {
        await uploadRepo.saveData(data);
      } catch (e: unknown) {
        console.log(e);
        if (e instanceof MongoServerError) {
          fail(400, { success: false, message: e.message });
        }
      }
    }

    return { success: true };
  }
};

export const load = async ({ url }: { url: URL }) => ({ type: url.searchParams.get('type') });
