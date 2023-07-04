import { error } from '@sveltejs/kit';
import { announcementRepo } from '../../../api/announcement-repo';

export const load = async () => {
  const data = await announcementRepo.getData();

  if (data) {
    return { responses: JSON.parse(JSON.stringify(data)) };
  }

  throw error(404, 'Not found');
};
