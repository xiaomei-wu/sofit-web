import { Histories } from '@/types/histories';
import { api } from '../utils';

export const getHistories = async (): Promise<Histories | null> =>
  await api.get('/api/v1/histories').json();
