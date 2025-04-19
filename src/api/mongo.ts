import * as mongoose from 'mongoose';
import { DB_URL } from '$env/static/private';
import Date = mongoose.Schema.Types.Date;

await mongoose.connect(DB_URL);

// Schema to store picture files on the database
const pictureSchema = new mongoose.Schema({
  fileName: String,
  author: String,
  location: String,
  timestamp: Date,
  type: String,
  message: String
});

export const Photo = mongoose.model('Photo', pictureSchema);
