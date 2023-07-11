import { error } from '@sveltejs/kit';
import { uploadRepo } from '../../../../api/upload-repo';
import type { MediaType } from '../../../../api/api';

export const load = async ({ params }: { params: { type: MediaType } }) => {
  const photos = await uploadRepo.getPhotos(params.type);

  if (photos) {
    return {
      images: JSON.parse(JSON.stringify(photos)),
      title: params.type.charAt(0).toUpperCase() + params.type.slice(1)
    };
  }

  throw error(404, 'Not found');
};
