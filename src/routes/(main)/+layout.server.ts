import type { RequestEvent } from '@sveltejs/kit';

export const load = async (event: RequestEvent) => {
  const userAgent = event.request.headers.get('user-agent');

  return {
    isSafari: userAgent && /(iPhone|iPad)/.test(userAgent)
  };
};
