import { getRequest } from '../utils';

export const fetchEdamamFood = async (query: string) =>
  await getRequest(
    `https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${process.env.NEXT_PUBLIC_EDAMAM_FOOD_APP_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_FOOD_APP_KEY}`,
  );

export const fetchEdamamRecipes = async (query: string) =>
  await getRequest(
    `https://api.edamam.com/search?q=${query}&app_id=${process.env.NEXT_PUBLIC_EDAMAM_RECEIP_APP_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_RECIPE_APP_KEY}`,
  );
