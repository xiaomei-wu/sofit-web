import Cookies from 'js-cookie';

const ACCESS_TOKEN_COOKIE_NAME = 'access_token';

export const setAccessTokenCookie = accessToken => {
  Cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, { expires: 2 }); // Adjust expiration as needed
};

export const getAccessTokenFromCookie = () => {
  return Cookies.get(ACCESS_TOKEN_COOKIE_NAME);
};
