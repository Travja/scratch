import * as mongoose from "mongoose";
import { DB_URL }    from "$env/static/private";

await mongoose.connect(DB_URL);

const attendanceSchema = new mongoose.Schema({
  firstName:    String,
  lastName:     String,
  email:        {type: String, unique: true},
  address:      String,
  city:         String,
  state:        String,
  zip:          String,
  announcement: Boolean,
  attending:    Boolean,
  numGuests:    Number,
});

export const Announcement = mongoose.model('Announcement', attendanceSchema);