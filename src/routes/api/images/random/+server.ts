import { error } from '@sveltejs/kit';
import { uploadRepo } from '../../../../api/upload-repo';
import * as fs from 'fs';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const photos = await uploadRepo.getAllExceptReception();
  // get a random photo
  const randomPhoto = photos[Math.floor(Math.random() * photos.length)];

  if (!randomPhoto) {
    throw error(404, { message: 'Image not found' });
  }

  const location = randomPhoto.location;

  if (!fs.existsSync(location)) {
    console.log(location);
    throw error(500, { message: 'Image not found' });
  }

  const photo = fs.readFileSync(location);

  return new Response(new Blob([photo]));
}
