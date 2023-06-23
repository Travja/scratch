import type { RequestEvent } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { announcementRepo } from '../../../api/announcement-repo';
import { MongoServerError } from 'mongodb';
import type { AttendanceInfo } from '../../../api/api';

/** @type {import('../../../../.svelte-kit/types/src/routes').Actions} */
export const actions = {
  default: async (event: RequestEvent) => {
    const formData = await event.request.formData();

    const firstName = (formData.get('firstName') as string).trim();
    const lastName = (formData.get('lastName') as string).trim();
    const email = (formData.get('email') as string).trim();
    const address = (formData.get('address') as string).trim();
    const city = (formData.get('city') as string).trim();
    const state = (formData.get('state') as string).trim().toUpperCase();
    const zip = (formData.get('zip') as string).trim();
    const announcement = formData.get('announcement') === 'on';
    const attending = formData.get('attending') === 'on';
    const numGuests = parseInt(((formData.get('guests') || '0') as string).trim());

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
