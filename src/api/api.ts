import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

class Api {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }
}

export interface AttendanceInfo {
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  announcement: boolean;
  attending: boolean;
  numGuests: number;
}

export interface UploadData {
  fileName: string;
  author?: string;
  message?: string;
  location: string;
  timestamp: Date;
  type: 'engagements' | 'bridals' | 'temple' | 'reception';
}

export const api = new Api('http://localhost:8080');
export const amazonLink = 'https://www.amazon.com/wedding/share/travisanddorothy';
export const venmoUsername = 'Dotwags';

export const scrollHeight: Writable<number> = writable(0);
