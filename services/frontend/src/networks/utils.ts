import { getAccessTokenFromCookie } from '@/utils/cookies';
import ky from 'ky-universal';

export const headers = {
  'Content-Type': 'application/json',
  'x-auth': getAccessTokenFromCookie()
};

export const api = ky.create({
  hooks: {
    beforeRequest: [
      request => {
        const accessToken = getAccessTokenFromCookie();
        request.headers.set('Authorization', `Bearer ${accessToken}`);
      }
    ]
  }
});
