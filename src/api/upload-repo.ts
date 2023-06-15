import { Photo } from './mongo';
import type { UploadData } from './api';

class UploadRepo {
  saveData = async (info: UploadData) => {
    return new Photo(info).save();
  };

  getPhotos = async (
    type: 'engagements' | 'bridals' | 'temple' | 'reception'
  ): Promise<UploadData[]> => {
    return Photo.find({ type }, { _id: 0, __v: 0 }).sort({
      timestamp: -1
    }) as unknown as UploadData[];
  };
}

export const uploadRepo = new UploadRepo();
