import { text }              from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  return text(
    "BEGIN:VCALENDAR\n"
    + "VERSION:2.0\n"
    + "PRODID:-//Foobar Corporation//NONSGML Foobar//EN\n"
    + "BEGIN:VEVENT\n"
    + "DTSTART:20080413T000000\n"
    + "SUMMARY:TEST\n"
    + "DESCRIPTION: this is just a test\n"
    + "END:VEVENT\n"
    + "END:VCALENDAR\n",
    {
      headers: {
        'Content-Type':        'text/calendar',
        'Content-Disposition': 'attachment; filename="invite.ics"'
      }
    }
  );
}