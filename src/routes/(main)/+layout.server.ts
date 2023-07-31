import { env } from '$env/dynamic/private';
import type { RequestEvent } from '@sveltejs/kit';

export const load = async (event: RequestEvent) => {
  const userAgent = event.request.headers.get('user-agent');

  console.log(env.MAX_BODY_SIZE);

  return {
    isSafari: userAgent && /(iPhone|iPad)/.test(userAgent)
  };
};
