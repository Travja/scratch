import type { RequestEvent } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { rsvpRepo } from '../../../../api/rsvp-repo';

/** @type {import('./$types').RequestHandler} */
export async function GET(event: RequestEvent) {
  const email = event.params.email;

  if (!email) {
    throw error(400, { message: 'Email is required' });
  }

  const hasEmail = await rsvpRepo.hasEmail(email);

  if (hasEmail) {
    throw error(400, { message: 'Email already exists' });
  }

  return json({ success: true });
}
