import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ky from 'ky-universal';
import { CreateDrinkDto } from './drink.dto';

export const DRINKS = 'drinks';

const fetchDrinks = async () => {
  return await ky('/api/v1/drinks').json();
};

const createDrink = async (createDrinkDto: CreateDrinkDto) => {
  return await ky.post('/api/v1/drinks', { json: createDrinkDto });
};

const updateDrink = async ({
  drinkId,
  updateDrinkDto,
}: {
  drinkId: string;
  updateDrinkDto: Partial<CreateDrinkDto>;
}) => {
  return await ky.patch(`/api/v1/drinks/${drinkId}`, { json: updateDrinkDto });
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
    mutationKey: DRINKS,
    mutationFn: createDrinkDto => {
      return createDrink(createDrinkDto);
    },
  });

const useUpdateDrink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [DRINKS],
    mutationFn: updateDrink,
    onSuccess: (data, variables) => {
      queryClient.setQueryData([DRINKS, { drinkId: variables.uuid }], data);
    },
  });
};

export { useGetDrinks, useCreateDrink, useUpdateDrink, deleteDrink };
