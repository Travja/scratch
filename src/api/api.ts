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
  firstName: string,
  lastName: string,
  email: string,
  address?: string,
  city?: string,
  state?: string,
  zip?: string,
  announcement: boolean,
  attending: boolean,
  numGuests: number,
}

export const api = new Api('http://localhost:8080');
