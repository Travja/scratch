import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import * as fs from 'fs';

/** @type {import('../../../../../.svelte-kit/types/src/routes').RequestHandler} */
export async function GET(event: RequestEvent) {
  let media = event.params.image;

  if (!media) {
    throw error(400, { message: 'Media is required' });
  }

  media = 'upload/' + media;

  if (!fs.existsSync(media)) {
    throw error(404, { message: 'Media not found' });
  }

  const localMedia = fs.readFileSync(media);
  return new Response(new Blob([localMedia]));
}
