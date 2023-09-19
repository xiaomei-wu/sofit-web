import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ky from 'ky-universal';
import { CreateDrinkDto } from './drink.dto';

export const DRINKS = 'drinks';

const fetchDrinks = async () => {
  return await ky('/api/v1/drinks').json();
};

const createDrink = async ({
  createDrinkDto,
}: {
  createDrinkDto: CreateDrinkDto;
}) => {
  try {
    const createdDrink = await ky
      .post('/api/v1/drinks', { json: createDrinkDto })
      .json();
    return createdDrink;
  } catch (error) {
    throw new Error('Failed to create drink');
  }
};

const updateDrink = async ({
  drinkId,
  updateDrinkDto,
}: {
  drinkId: string;
  updateDrinkDto: Partial<CreateDrinkDto>;
}) => {
  try {
    const updatedDrink = await ky
      .patch(`/api/v1/drinks/${drinkId}`, { json: updateDrinkDto })
      .json();

    return updatedDrink;
  } catch (error) {
    throw new Error('Failed to update drink');
  }
};

const deleteDrink = async (drinkId: string) => {
  return await ky.delete(`/api/v1/drinks/${drinkId}`);
};

const useGetDrinks = () =>
  useQuery({
    queryKey: [DRINKS],
    queryFn: () => fetchDrinks(),
  });

const useCreateDrink = () =>
  useMutation({
    mutationKey: [DRINKS],
    mutationFn: createDrink,
  });

const useUpdateDrink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [DRINKS],
    mutationFn: updateDrink,
    onMutate: async ({ drinkId, updateDrinkDto }) => {
      const previousData = queryClient.getQueryData([DRINKS, { drinkId }]);

      queryClient.setQueryData([DRINKS, { drinkId }], oldData => {
        return {
          ...oldData,
          ...updateDrinkDto,
        };
      });

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [DRINKS, { drinkId: variables.drinkId }],
          context.previousData,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries([DRINKS]);
    },
  });
};

export { useGetDrinks, useCreateDrink, useUpdateDrink, deleteDrink };
