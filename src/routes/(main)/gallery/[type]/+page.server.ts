import { error } from '@sveltejs/kit';
import { uploadRepo } from '../../../../api/upload-repo';

export const load = async ({
  params
}: {
  params: { type: 'engagements' | 'bridals' | 'temple' | 'reception' };
}) => {
  const photos = await uploadRepo.getPhotos(params.type);

  if (photos) {
    return { images: JSON.parse(JSON.stringify(photos)) };
  }

  throw error(404, 'Not found');
};
