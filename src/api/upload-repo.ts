import { Photo } from './mongo';
import type { UploadData } from './api';
import type { MediaType } from './api';

class UploadRepo {
  saveData = async (info: UploadData) => {
    return new Photo(info).save();
  };

  getPhotos = async (type: MediaType): Promise<UploadData[]> => {
    return Photo.find({ type }, { _id: 0, __v: 0 }).sort({
      timestamp: 1,
      fileName: 1
    }) as unknown as UploadData[];
  };

  getAllPhotos = async (): Promise<UploadData[]> => {
    return Photo.find({}, { _id: 0, __v: 0 }).sort({
      timestamp: 1,
      fileName: 1
    }) as unknown as UploadData[];
  };

  getAllExceptReception = async (): Promise<UploadData[]> => {
    return Photo.find({ type: { $ne: 'reception' } }, { _id: 0, __v: 0 }).sort({
      timestamp: 1,
      fileName: 1
    }) as unknown as UploadData[];
  };
}

export const uploadRepo = new UploadRepo();
