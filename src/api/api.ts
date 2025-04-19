import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

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

export const scrollHeight: Writable<number> = writable(0);
export const isSafari: Writable<boolean> = writable(false);
