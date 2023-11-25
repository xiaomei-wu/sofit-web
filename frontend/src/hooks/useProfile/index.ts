import { getMe } from '@/networks';
import { useQuery } from '@tanstack/react-query';

export const ME = 'ME';

export const useGetMe = () => {
  return useQuery([ME], getMe, { retry: false });
};
