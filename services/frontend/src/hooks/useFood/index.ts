import {
  createFood,
  deleteFoodRecord,
  getAllFoodRecord,
  getFoodRecordsByDate,
  getRecentFoodRecord,
  updateFoodRecord
} from '@/networks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const FOOD = 'food';

export const useCreateFoodRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [FOOD],
    mutationFn: createFood,
    onSettled: () => {
      queryClient.invalidateQueries([FOOD]);
    },
  });
};

export const useGetAllFoodRecord = () => {
  return useQuery({
    queryKey: [FOOD],
    queryFn: () => getAllFoodRecord(),
  });
};

export const useGetRecentFoodRecord = () => {
  return useQuery(
    ['getRecentFoodRecord'],
    async () => await getRecentFoodRecord(),
  );
};

export const useGetFoodRecordsByDate = (date: string) => {
  return useQuery(['getFoodRecordsByDate', date], () =>
    getFoodRecordsByDate(date),
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateFoodRecord'],
    mutationFn: updateFoodRecord,
    onSettled: () => {
      queryClient.invalidateQueries([FOOD]);
    },
  });
};
