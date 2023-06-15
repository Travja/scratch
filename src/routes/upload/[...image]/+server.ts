import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import * as fs from 'fs';

/** @type {import('./$types').RequestHandler} */
export async function GET(event: RequestEvent) {
  let image = event.params.image;

  if (!image) {
    throw error(400, { message: 'Image is required' });
  }

  image = 'upload/' + image;

  if (!fs.existsSync(image)) {
    throw error(404, { message: 'Image not found' });
  }

  const photo = fs.readFileSync(`${image}`);
  return new Response(new Blob([photo]));
}
