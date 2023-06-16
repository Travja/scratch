import type { RequestEvent } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import type { UploadData } from '../../../api/api';
import { MongoServerError } from 'mongodb';
import { uploadRepo } from '../../../api/upload-repo';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

/** @type {import('../../../../.svelte-kit/types/src/routes').Actions} */
export const actions = {
  default: async (event: RequestEvent) => {
    const formData = await event.request.formData();

    const author = formData.get('author') as string;
    const message = formData.get('message') as string;
    const files = formData.getAll('photos') as File[];
    const uploadType = formData.get('uploadType') as string;

    for (const file of files) {
      if (!existsSync('upload')) mkdirSync('upload');

      const location = 'upload';

      let fileName = file.name;
      // Randomize the name using uuid
      fileName = uuidv4() + fileName.slice(fileName.lastIndexOf('.'));

      // Save file to local storage
      mkdirSync(location, { recursive: true });
      writeFileSync(`${location}/${fileName}`, Buffer.from(await file.arrayBuffer()));

      const data: UploadData = {
        fileName: files[0].name,
        author,
        message,
        location: `${location}/${fileName}`,
        timestamp: new Date(),
        type: uploadType as 'engagements' | 'bridals' | 'temple' | 'reception'
      };

      try {
        await uploadRepo.saveData(data);
      } catch (e: unknown) {
        console.log(e);
        if (e instanceof MongoServerError) {
          fail(400, { message: e.message });
        }
      }
    }

    return { success: true };
  }
};
