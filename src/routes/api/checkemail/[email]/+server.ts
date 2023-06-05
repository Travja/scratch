import type { RequestEvent } from '@sveltejs/kit';
import { error, json }       from '@sveltejs/kit';
import { announcementRepo }  from "../../../../api/announcement-repo";

/** @type {import('./$types').RequestHandler} */
export async function GET(event: RequestEvent) {
  const email = event.params.email;

  if (!email) {
    throw error(400, {message: 'Email is required'});
  }

  const hasEmail = await announcementRepo.hasEmail(email);

  if (hasEmail) {
    throw error(400, {message: 'Email already exists'});
  }

  return json({success: true});
}