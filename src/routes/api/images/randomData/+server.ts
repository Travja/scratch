import { error } from '@sveltejs/kit';
import { uploadRepo } from '../../../../api/upload-repo';
import type { MediaType } from '../../../../api/api';

/** @type {import("./$types").RequestHandler} */
export async function GET({ url }: { url: URL }) {
  const photos = url.searchParams.has('type')
    ? await uploadRepo.getPhotos(url.searchParams.get('type') as MediaType)
    : await uploadRepo.getAllPhotos();
  // get a random photo
  const randomPhoto = photos[Math.floor(Math.random() * photos.length)];

  if (!randomPhoto) {
    throw error(404, { message: 'Image not found' });
  }

  return new Response(JSON.stringify(randomPhoto));
}
