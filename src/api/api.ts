import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export interface EventInfo {
  id: string;
  name: string;
  date: Date;
  location: string;
  mapsLink?: string;
  description: string;
  outside?: boolean;
}

export interface RsvpInfo {
  firstName: string;
  lastName: string;
  events: EventRsvp[];
}

export interface EventRsvp {
  ev?: EventInfo;
  event: string;
  numGuests: number;
  outside?: boolean;
}

export enum MediaType {
  BRIDALS = 'bridals',
  ENGAGEMENTS = 'engagements',
  TEMPLE = 'temple',
  RECEPTION = 'reception',
  CHILDHOOD = 'childhood'
}

export interface UploadData {
  id?: any;
  fileName: string;
  author?: string;
  message?: string;
  location: string;
  timestamp: Date;
  type: MediaType;
}

export const formatDateTime = (date: Date | string | undefined) => {
  if (!date) return '--';

  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit'
  };
  return d.toLocaleString('en-US', options);
};

export const amazonLink = 'https://www.amazon.com/wedding/share/travisanddorothy';
export const venmoUsername = 'Dotwags';

export const scrollHeight: Writable<number> = writable(0);
export const isSafari: Writable<boolean> = writable(false);

export const events: EventInfo[] = [
  {
    id: 'temple',
    name: 'Temple Sealing',
    date: new Date('2025-05-22T16:00:00'),
    location: 'Taylorsville Temple',
    mapsLink: 'https://maps.app.goo.gl/kwXNEWfvkf6L1mFc6',
    description: 'Join us for our sealing. Please arrive by 3:15PM',
    outside: true
  },
  {
    id: 'temple-dinner',
    name: 'Post-Temple Dinner',
    date: new Date('2025-05-22T18:00:00'),
    location: '4986 S. Valois Dr, Taylorsville',
    mapsLink: 'https://maps.app.goo.gl/25YT6xc4e8US6QuN7',
    description: 'Join us for a celebratory dinner after the temple.'
  },
  {
    id: 'ring-ceremony',
    name: 'Ring Ceremony',
    date: new Date('2025-05-23T16:30:00'),
    location: 'The Church of Jesus Christ of Latter-day Saints',
    description: 'Join us in an intimate ceremony as we exchange rings and vows.'
  },
  {
    id: 'reception',
    name: 'Reception',
    date: new Date('2025-05-23T18:00:00'),
    location: 'The Grand America Hotel',
    description: 'Join us for a night of treats, dancing, and fun as we celebrate our marriage.'
  }
];
