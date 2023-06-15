import { Announcement } from './mongo';
import type { AttendanceInfo } from './api';

class AnnouncementRepo {
  saveData = async (info: AttendanceInfo) => {
    return new Announcement(info).save();
  };

  hasEmail = async (email: string) => {
    return Announcement.exists({ email: email });
  };
}

export const announcementRepo = new AnnouncementRepo();
