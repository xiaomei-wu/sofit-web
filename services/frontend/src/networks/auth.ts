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
): Promise<SignupResponse | null> => {
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
    return { message: 'An error occurred during signup.', status: err.status };
  }
};

interface LoginResponse {
  access_token: string;
  message?: string;
  // Add any other properties you expect in the response here
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password })
  };

  try {
    const response = await fetch('/api/v1/auth/login', requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (err) {
    return { message: 'An error occurred during login.' };
  }
};

export const verifyToken = async (accessToken: string) => {
  try {
    const response = await api
      .post('/api/v1/auth/verifyToken', { json: { accessToken } })
      .json();
    return response;
  } catch (error) {
    return { message: 'Invalid token ' };
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post('/api/v1/auth/logout').json();
    return response;
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
