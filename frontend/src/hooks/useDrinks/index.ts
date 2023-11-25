import {
  createDrink,
  deleteDrink,
  fetchDrinks,
  searchDrinks,
  updateDrink
} from '@/networks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const DRINKS = 'drinks';

const useGetDrinks = () =>
  useQuery({
    queryKey: [DRINKS],
    queryFn: () => fetchDrinks()
  });

const useCreateDrink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [DRINKS],
    mutationFn: createDrink,
    onSettled: () => {
      queryClient.invalidateQueries([DRINKS]);
    }
  });
};

const useUpdateDrink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [DRINKS],
    mutationFn: updateDrink,
    onSettled: () => {
      queryClient.invalidateQueries([DRINKS]);
    }
  });
};

const useDeleteDrink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [DRINKS],
    mutationFn: async (drinkId: string) => {
      await deleteDrink(drinkId);
      queryClient.invalidateQueries([DRINKS]);
    }
  });
};

const useSearchDrinks = ({
  prefix,
  category,
  query
}: {
  prefix: string;
  category: string;
  query: string;
}) => {
  return useQuery(['searchDrinks', { prefix, category, query }], async () => {
    try {
      const response = await searchDrinks({ prefix, category, query });
      return response;
    } catch (error) {
      throw new Error('Failed to fetch search results');
    }
  });
};

export {
  useGetDrinks,
  useCreateDrink,
  useUpdateDrink,
  useSearchDrinks,
  useDeleteDrink
};
