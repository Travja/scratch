import { rsvpRepo } from '../../../api/rsvp-repo';
import { MongoServerError } from 'mongodb';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
  const rsvp = await request.json();

  console.log(rsvp);

  const { firstName, lastName } = rsvp;
  if (!firstName || !lastName) {
    return json(
      { message: 'Please fill out all fields.' },
      {
        status: 400
      }
    );
  }
  // Check that the first+last name is not already in the database
  const existingRsvp = await rsvpRepo.getData();
  const existingRsvpNames = existingRsvp.map((r) => `${r.firstName} ${r.lastName}`);
  const name = `${firstName} ${lastName}`;
  if (existingRsvpNames.includes(name)) {
    return json(
      { message: "You have already RSVP'd." },
      {
        status: 400
      }
    );
  }

  try {
    await rsvpRepo.saveData(rsvp);

    return json({ success: true, firstName });
  } catch (e: unknown) {
    console.log(e);
    if (e instanceof MongoServerError) {
      return json(
        { message: 'There was an error saving your RSVP. Please try again.' },
        {
          status: 500
        }
      );
    }
  }
}
