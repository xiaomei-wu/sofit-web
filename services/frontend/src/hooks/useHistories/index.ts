import { getHistories } from '@/networks/histories';
import { useQuery } from '@tanstack/react-query';

export const Histories = 'Histories';

export const useGetHistories = () => {
  return useQuery([Histories], getHistories);
};
