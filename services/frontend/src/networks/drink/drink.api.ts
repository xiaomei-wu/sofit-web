import ky from 'ky-universal';
import { api } from '../utils';
import { CreateDrinkDto } from './drink.dto';

export const fetchDrinks = async () => {
  return await api.get('/api/v1/drinks').json();
};

export const createDrink = async ({
  createDrinkDto,
}: {
  createDrinkDto: CreateDrinkDto;
}) => {
  try {
    const createdDrink = await api
      .post('/api/v1/drinks', { json: createDrinkDto })
      .json();
    return createdDrink;
  } catch (error) {
    throw new Error('Failed to create drink');
  }
};

export const updateDrink = async ({
  drinkId,
  updateDrinkDto,
}: {
  drinkId: string;
  updateDrinkDto: Partial<CreateDrinkDto>;
}) => {
  try {
    const updatedDrink = await api
      .patch(`/api/v1/drinks/${drinkId}`, { json: updateDrinkDto })
      .json();

    return updatedDrink;
  } catch (error) {
    throw new Error('Failed to update drink');
  }
};

export const deleteDrink = async (drinkId: string) => {
  return await api.delete(`/api/v1/drinks/${drinkId}`);
};

export const searchDrinks = async ({
  query,
}: {
  prefix: string;
  category: string;
  query?: string;
}) => {
  try {
    const response = await ky(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`,
    ).json();
    return response;
  } catch (error) {
    console.info(error);
  }
};
