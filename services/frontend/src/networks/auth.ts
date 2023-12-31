import { api } from './utils';

interface User {
  uuid: string;
  nickName: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface SignupResponse {
  user: User;
  token: string;
}

const headers = {
  'Content-Type': 'application/json'
};

export const signup = async (
  email: string,
  password: string
): Promise<SignupResponse | undefined> => {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password })
  };

  try {
    const response = await fetch('/api/v1/auth/signup', requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: SignupResponse = await response.json();
    return data;
  } catch (err) {
    console.error('Error while sign up');
  }
};

interface LoginResponse {
  access_token: string;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse | undefined> => {
  try {
    return api
      .post('/api/v1/auth/login', {
        json: { email, password }
      })
      .json();
  } catch (err) {
    console.error('An error occurred during login.');
  }
};

export const verifyToken = async (
  accessToken: string
): Promise<{ iat: number } | undefined> => {
  try {
    return api
      .post('/api/v1/auth/verifyToken', { json: { accessToken } })
      .json();
  } catch (error) {
    console.error('Invalid token');
  }
};

export const logoutUser = async () => {
  try {
    return api.post('/api/v1/auth/logout').json();
  } catch (error) {
    return { message: 'Failed to logout' };
  }
};

export type Me = {
  email: string;
};

export const getMe = async (): Promise<Me | undefined> => {
  return await api.get('/api/v1/auth/me').json();
};
