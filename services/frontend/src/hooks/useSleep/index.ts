import {
  createSleep,
  deleteSleep,
  fetchSleep,
  updateSleep
} from '@/networks/sleep';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const SLEEP = 'SLEEP';

export const useCreateSleepData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [SLEEP],
    mutationFn: createSleep,
    onSettled: () => {
      queryClient.invalidateQueries([SLEEP]);
    }
  });
};

export const useGetSleepData = () => {
  return useQuery({
    queryKey: [SLEEP],
    queryFn: fetchSleep
  });
};

export const useDeleteSleepData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [SLEEP],
    mutationFn: deleteSleep,
    onSettled: () => {
      queryClient.invalidateQueries([SLEEP]);
    }
  });
};

export const useUpdateSleepData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [SLEEP],
    mutationFn: updateSleep,
    onSettled: () => {
      queryClient.invalidateQueries([SLEEP]);
    }
  });
};
