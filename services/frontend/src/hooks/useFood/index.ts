import {
  createFoodRecord,
  deleteFoodRecord,
  getAllFoodRecord,
  getFoodRecordsByDate,
  getRecentFoodRecord,
  updateFoodRecord
} from '@/networks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const FOOD = 'food';

export const useCreateFoodRecord = () => {
  return useMutation({
    mutationKey: ['createFoodRecord'],
    mutationFn: createFoodRecord,
  });
};

export const useGetAllFoodRecord = () => {
  return useQuery([FOOD], getAllFoodRecord);
};

export const useGetRecentFoodRecord = () => {
  return useQuery(
    ['getRecentFoodRecord'],
    async () => await getRecentFoodRecord(),
  );
};

export const useGetFoodRecordsByDate = (date: string) => {
  return useQuery(
    ['getFoodRecordsByDate', date],
    async () => await getFoodRecordsByDate(date),
  );
};

export const useDeleteFoodRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteFoodRecord'],
    mutationFn: deleteFoodRecord,
    onSettled: () => {
      queryClient.invalidateQueries([FOOD]);
    },
  });
};

export const useUpdateFoodRecord = () => {
  return useMutation({
    mutationKey: ['updateFoodRecord'],
    mutationFn: updateFoodRecord,
  });
};
