import type { PageLoad } from './$types';
import { type EventInfo, events } from '../../../api/api';

export const load: PageLoad = ({ params }) => {
  const slug = params.type.toLowerCase();
  const filteredEvents: EventInfo[] = [];

  // noinspection FallThroughInSwitchStatementJS
  switch (slug) {
    case 'wedding': // invited to temple and everything else
      filteredEvents.push(events.find((event) => event.id === 'temple')!);
    case 'celebrate': // invited to dinner (and outside temple) onward
      filteredEvents.push(events.find((event) => event.id === 'temple-dinner')!);
    case 'vip': // invited to the ring ceremony onward
      filteredEvents.push(events.find((event) => event.id === 'ring-ceremony')!);
    case 'party': // just invited to the reception
    default:
      filteredEvents.push(events.find((event) => event.id === 'reception')!);
      break;
  }

  return {
    events: filteredEvents
  };
};
