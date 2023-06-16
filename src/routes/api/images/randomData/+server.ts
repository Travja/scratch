import { error } from '@sveltejs/kit';
import { uploadRepo } from '../../../../api/upload-repo';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const photos = await uploadRepo.getAllPhotos();
  // get a random photo
  const randomPhoto = photos[Math.floor(Math.random() * photos.length)];

  if (!randomPhoto) {
    throw error(404, { message: 'Image not found' });
  }

  return new Response(JSON.stringify(randomPhoto));
}
