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

  getAllPhotos = async (): Promise<UploadData[]> => {
    return Photo.find({}, { _id: 0, __v: 0 }).sort({
      timestamp: -1
    }) as unknown as UploadData[];
  };

  getAllExceptReception = async (): Promise<UploadData[]> => {
    return Photo.find({ type: { $ne: 'reception' } }, { _id: 0, __v: 0 }).sort({
      timestamp: -1
    }) as unknown as UploadData[];
  };
}

export const uploadRepo = new UploadRepo();
