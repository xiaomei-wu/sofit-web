import { api } from '../utils';

export const getHistories = async () =>
  await api.get('/api/v1/histories').json();
