import { Rsvp } from './mongo';
import type { RsvpInfo } from './api';

class RsvpRepo {
  saveData = async (info: RsvpInfo) => {
    return new Rsvp(info).save();
  };

  hasEmail = async (email: string) => {
    return Rsvp.exists({ email: email });
  };

  getData = async () => {
    // Only include attending, announcement, and numGuests
    return Rsvp.find(
      {},
      {
        firstName: 1,
        lastName: 1,
        attending: 1,
        numGuests: 1,
        events: 1
      }
    );
  };
}

export const rsvpRepo = new RsvpRepo();
