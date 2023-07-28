import { error } from '@sveltejs/kit';
import { uploadRepo } from '../../../../api/upload-repo';
import type { MediaType } from '../../../../api/api';

/** @type {import("./$types").RequestHandler} */
export async function GET({ url }: { url: URL }) {
  const photos = url.searchParams.has('type')
    ? await uploadRepo.getPhotos(url.searchParams.get('type') as MediaType)
    : await uploadRepo.getAllPhotos();

  return new Response(JSON.stringify(photos));
}
