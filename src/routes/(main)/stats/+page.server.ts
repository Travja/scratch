import { error } from '@sveltejs/kit';
import { rsvpRepo } from '../../../api/rsvp-repo';

export const load = async () => {
  const data = await rsvpRepo.getData();

  if (data) {
    return { responses: JSON.parse(JSON.stringify(data)) };
  }

  throw error(404, 'Not found');
};
