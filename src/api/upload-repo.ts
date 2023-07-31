import { Photo } from './mongo';
import type { UploadData } from './api';
import { MediaType } from './api';

class UploadRepo {
  saveData = async (info: UploadData) => {
    return new Photo(info).save();
  };

  getPhotos = async (type: MediaType, since?: Date): Promise<UploadData[]> => {
    let params: any = { type };
    if (since) {
      params = { type, timestamp: { $gt: since.toISOString() } };
    }

    return Photo.find(params, { _id: 0, __v: 0 }).sort({
      timestamp: 1,
      fileName: 1
    }) as unknown as UploadData[];
  };

  getAllPhotos = async (since?: Date): Promise<UploadData[]> => {
    let params: any = {};
    if (since) {
      params = { timestamp: { $gt: since.toISOString() } };
    }

    return Photo.find(params, { _id: 0, __v: 0 }).sort({
      timestamp: 1,
      fileName: 1
    }) as unknown as UploadData[];
  };

  getAllExceptReception = async (): Promise<UploadData[]> => {
    return Photo.find(
      { type: { $nin: [MediaType.RECEPTION, MediaType.CHILDHOOD] } },
      { _id: 0, __v: 0 }
    ).sort({
      timestamp: 1,
      fileName: 1
    }) as unknown as UploadData[];
  };
}

export const uploadRepo = new UploadRepo();
