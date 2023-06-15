import type { RequestEvent } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { uploadRepo } from '../../../../api/upload-repo';

/** @type {import('./$types').RequestHandler} */
export async function GET(event: RequestEvent) {
  const type = event.params.type as 'engagements' | 'bridals' | 'temple' | 'reception';

  if (!type) {
    throw error(400, { message: 'Type is required' });
  }

  const photos = await uploadRepo.getPhotos(type);

  return json(photos || []);
}
