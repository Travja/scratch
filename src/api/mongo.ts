import * as mongoose from 'mongoose';
import { DB_URL } from '$env/static/private';
import Date = mongoose.Schema.Types.Date;

await mongoose.connect(DB_URL);

const attendanceSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  address: String,
  city: String,
  state: String,
  zip: String,
  announcement: Boolean,
  attending: Boolean,
  numGuests: Number
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

export const Announcement = mongoose.model('Announcement', attendanceSchema);
export const Photo = mongoose.model('Photo', pictureSchema);
