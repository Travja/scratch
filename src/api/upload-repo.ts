import { Photo }           from './mongo';
import type { UploadData } from './api';

class UploadRepo {
  saveData = async (info: UploadData) => {
    return new Photo(info).save();
  };
}

export const uploadRepo = new UploadRepo();