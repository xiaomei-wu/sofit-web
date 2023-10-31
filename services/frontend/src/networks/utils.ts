import { getAccessTokenFromCookie } from '@/utils/cookies';
import ky from 'ky-universal';

export const headers = {
  'Content-Type': 'application/json',
  'x-auth': getAccessTokenFromCookie(),
};

export const api = ky.create({
  hooks: {
    beforeRequest: [
      request => {
        const accessToken = getAccessTokenFromCookie();
        request.headers.set('Authorization', `Bearer ${accessToken}`);
      },
    ],
  },
});

export const getRequest = async (endpoint: string) => {
  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
  };

  try {
    const response = await fetch(endpoint, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (err) {
    return { message: `An error occurred during fetching ${endpoint}` };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postRequest = async (endpoint: string, data: any) => {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(endpoint, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (err) {
    return { message: `An error occurred during posting ${endpoint}` };
  }
};

export const deleteRequest = async endpoint => {
  const requestOptions = {
    method: 'DELETE',
    headers,
  };

  try {
    const response = await fetch(endpoint, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return { message: 'Resource deleted successfully' };
  } catch (err) {
    return { message: `An error occurred during deletion at ${endpoint}` };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const patchRequest = async (endpoint: string, data: any) => {
  const requestOptions: RequestInit = {
    method: 'PATCH',
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(endpoint, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return { message: 'Resource updated successfully' };
  } catch (err) {
    return { message: `An error occurred during updating ${endpoint}` };
  }
};
