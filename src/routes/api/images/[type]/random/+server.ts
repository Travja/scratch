import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { uploadRepo } from '../../../../../api/upload-repo';
import * as fs from 'fs';
import type { MediaType } from '../../../../../api/api';

/** @type {import('./$types').RequestHandler} */
export async function GET(event: RequestEvent) {
  const type = event.params.type as MediaType;

  if (!type) {
    throw error(400, { message: 'Type is required' });
  }

  const photos = await uploadRepo.getPhotos(type);
  // get a random photo
  const randomPhoto = photos[Math.floor(Math.random() * photos.length)];

  if (!randomPhoto) {
    throw error(404, { message: 'Image not found' });
  }

  const location = randomPhoto.location;

  if (!fs.existsSync(location)) {
    console.log('Missing file: ' + location);
    throw error(500, { message: 'Image not found' });
  }

  const photo = fs.readFileSync(location);

  return new Response(new Blob([photo]));
}
