const convertDate = (date: Date) => {
  let concat = '';

  concat += date.getFullYear();
  concat += ('0' + (date.getMonth() + 1)).slice(-2);
  concat += ('0' + date.getDate()).slice(-2);
  concat += 'T';
  concat += ('0' + date.getHours()).slice(-2);
  concat += ('0' + date.getMinutes()).slice(-2);
  concat += ('0' + date.getSeconds()).slice(-2);

  return concat;
};

export const makeIcsFile = (
  date: {
    start: Date;
    end: Date;
  },
  summary: string,
  description: string,
  location?: string
) => {
  const startDate = convertDate(date.start);
  const endDate = convertDate(date.end);
  let calendarData =
    'BEGIN:VCALENDAR' +
    '\nPRODID:-//Stellar Melodies//EN' +
    '\nVERSION:2.0' +
    '\nX-MS-OLK-FORCEINSPECTOROPEN:TRUE' +
    '\nX-WR-TIMEZONE:America/Denver' +
    '\nMETHOD:PUBLISH' +
    '\nBEGIN:VTIMEZONE' +
    '\nTZID:America/Denver' +
    '\nLAST-MODIFIED:20050809T050000Z' +
    '\nBEGIN:STANDARD' +
    '\nDTSTART:20071104T020000' +
    '\nTZOFFSETFROM:-0600' +
    '\nTZOFFSETTO:-0700' +
    '\nTZNAME:MST' +
    '\nEND:STANDARD' +
    '\nBEGIN:DAYLIGHT' +
    '\nDTSTART:20070311T020000' +
    '\nTZOFFSETFROM:-0600' +
    '\nTZOFFSETTO:-0700' +
    '\nTZNAME:MDT' +
    '\nEND:DAYLIGHT' +
    '\nEND:VTIMEZONE' +
    '\nBEGIN:VEVENT' +
    '\nDTSTART:' +
    startDate +
    '\nDTEND:' +
    endDate +
    '\nDESCRIPTION:' +
    description +
    '\nURL:https://stellarmelodies.com';
  if (location) calendarData += '\nLOCATION:' + location;

  calendarData +=
    '\nSEQUENCE:0' +
    '\nPRIORITY:5' +
    '\nSTATUS:CONFIRMED' +
    '\nSUMMARY:' +
    summary +
    '\nUID:X:201600U2800000A9Yp0EAF@sample' +
    '\nTRANSP:OPAQUE' +
    '\nEND:VEVENT' +
    '\nEND:VCALENDAR';

  const data = new File([calendarData], 'invite.ics', { type: 'text/calendar' });

  return URL.createObjectURL(data);
};

const standardizeDate = (date: Date) => {
  return date.toISOString().replace(/.\d+Z/, '') + '+00:00';
};

export const makeOutlookInvite = (
  office: boolean,
  date: { start: Date; end: Date },
  summary: string,
  description: string,
  location?: string
) => {
  let str = `https://outlook.${
    office ? 'office' : 'live'
  }.com/calendar/0/deeplink/compose?allday=false&body=${encodeURIComponent(
    description
  )}&enddt=${encodeURIComponent(
    standardizeDate(date.end)
  )}&path=/calendar/action/compose&rru=addevent&startdt=${encodeURIComponent(
    standardizeDate(date.start)
  )}&subject=${encodeURIComponent(summary)}`;

  if (location) {
    str += `&location=${encodeURIComponent(location)}`;
  }

  return str;
};
