import type { RequestEvent } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { announcementRepo } from '../../api/announcement-repo';
import { MongoServerError } from 'mongodb';
import type { AttendanceInfo } from '../../api/api';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event: RequestEvent) => {
    const formData = await event.request.formData();

    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const zip = formData.get('zip') as string;
    const announcement = formData.get('announcement') === 'on';
    const attending = formData.get('attending') === 'on';
    const numGuests = parseInt((formData.get('guests') || '0') as string);

    const info: AttendanceInfo = {
      firstName,
      lastName,
      email,
      attending,
      numGuests,
      announcement
    };

    if (address) {
      info.address = address;
    }
    if (city) {
      info.city = city;
    }
    if (state) {
      info.state = state;
    }
    if (zip) {
      info.zip = zip;
    }

    try {
      await announcementRepo.saveData(info);

      return { success: true, firstName };
    } catch (e: unknown) {
      console.log(e);
      if (e instanceof MongoServerError) {
        return fail(400, { message: e.message });
      }
    }
  }
};
