import type { Actions, RequestEvent } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { rsvpRepo } from '../../../api/rsvp-repo';
import { MongoServerError } from 'mongodb';
import type { RsvpInfo } from '../../../api/api';

export const actions: Actions = {
  default: async (event: RequestEvent) => {
    const formData = await event.request.formData();

    const firstName = (formData.get('firstName') as string)?.trim();
    const lastName = (formData.get('lastName') as string)?.trim();

    const info: RsvpInfo = {
      firstName,
      lastName,
      events: []
    };

    try {
      await rsvpRepo.saveData(info);

      return { success: true, firstName };
    } catch (e: unknown) {
      console.log(e);
      if (e instanceof MongoServerError) {
        return fail(400, { message: e.message });
      }
    }
  }
};
