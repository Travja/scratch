import * as mongoose from 'mongoose';
import { DB_URL } from '$env/static/private';
import Date = mongoose.Schema.Types.Date;

await mongoose.connect(DB_URL);

const rsvpSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  events: [
    {
      event: String,
      attending: Boolean,
      numGuests: Number,
      outside: Boolean
    }
  ],
  comment: String
});

// Schema to store picture files on the database
const pictureSchema = new mongoose.Schema({
  fileName: String,
  author: String,
  location: String,
  timestamp: Date,
  type: String,
  message: String
});

export const Rsvp = mongoose.model('rsvp', rsvpSchema);
export const Photo = mongoose.model('Photo', pictureSchema);
