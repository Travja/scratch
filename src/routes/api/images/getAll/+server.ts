import { uploadRepo } from '../../../../api/upload-repo';
import type { MediaType } from '../../../../api/api';

/** @type {import("./$types").RequestHandler} */
export async function GET({ url }: { url: URL }) {
  const sinceRaw = url.searchParams.get('since');
  const since = sinceRaw ? new Date(sinceRaw) : undefined;

  const photos = url.searchParams.has('type')
    ? await uploadRepo.getPhotos(url.searchParams.get('type') as MediaType, since)
    : await uploadRepo.getAllPhotos(since);

  return new Response(JSON.stringify(photos));
}
