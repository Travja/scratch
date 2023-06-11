import type { RequestEvent }                    from '@sveltejs/kit';
import { fail }                                 from '@sveltejs/kit';
import type { UploadData }                      from '../../api/api';
import { MongoServerError }                     from 'mongodb';
import { uploadRepo }                           from '../../api/upload-repo';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event: RequestEvent) => {
    const formData = await event.request.formData();

    console.log(formData);

    const author     = formData.get('author') as string;
    const message    = formData.get('message') as string;
    const files      = formData.getAll('photos') as File[];
    const uploadType = formData.get('uploadType') as string;

    for (const file of files) {
      if (!existsSync('upload')) mkdirSync('upload');

      // Save file to local storage
      writeFileSync(`upload/${file.name}`, Buffer.from(await file.arrayBuffer()));


      const data: UploadData = {
        fileName:  files[0].name,
        author,
        message,
        location:  'test',
        timestamp: new Date(),
        type:      uploadType as 'engagements' | 'bridals' | 'temple' | 'reception'
      };

      try {
        await uploadRepo.saveData(data);

      } catch (e: any) {
        console.log(e);
        if (e instanceof MongoServerError) {
          fail(400, { message: e.message });
        }
      }
    }

    return { success: true };
  }
};