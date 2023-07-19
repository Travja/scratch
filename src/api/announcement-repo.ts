import { Announcement } from './mongo';
import type { AttendanceInfo } from './api';

class AnnouncementRepo {
  saveData = async (info: AttendanceInfo) => {
    return new Announcement(info).save();
  };

  hasEmail = async (email: string) => {
    return Announcement.exists({ email: email });
  };

  getData = async () => {
    // Only include attending, announcement, and numGuests
    return Announcement.find(
      {},
      {
        firstName: 1,
        lastName: 1,
        attending: 1,
        announcement: 1,
        numGuests: 1,
        announcementSent: 1
      }
    );
  };
}

export const announcementRepo = new AnnouncementRepo();
