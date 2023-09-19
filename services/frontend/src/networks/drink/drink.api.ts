import ky from 'ky-universal';
import { CreateDrinkDto } from './drink.dto';

export const createDrink = async (createDrinkDto: CreateDrinkDto) =>
  await ky.post('/api/v1/drinks', { json: createDrinkDto });
// await postRequest('/api/v1/drinks', createDrinkDto);

export const fetchDrinks = async ({
  prefix,
  category,
}: {
  prefix: string;
  category: string;
}) => {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${prefix}=${category}`,
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
