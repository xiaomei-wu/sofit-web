import ky from 'ky-universal';
import { getRequest } from '../utils';

export const fetchEdamamFood = async (query: string) =>
  await getRequest(
    `https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${process.env.NEXT_PUBLIC_EDAMAM_FOOD_APP_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_FOOD_APP_KEY}`,
  );

export const fetchEdamamRecipes = async (query: string) =>
  await getRequest(
    `https://api.edamam.com/search?q=${query}&app_id=${process.env.NEXT_PUBLIC_EDAMAM_RECEIP_APP_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_RECIPE_APP_KEY}`,
  );

type RecipeSchema = {
  title: string;
  ingr: string[];
  url: string;
  summary: string;
  yield: string;
  time: string;
  img: string;
  prep: string;
};

export const getFullRecipeNutritionAnalysis = async (recipe: RecipeSchema) => {
  try {
    const response = await ky
      .post(
        `https://api.edamam.com/api/nutrition-details?app_id=${process.env.NEXT_PUBLIC_EDAMAM_NUTRITION_ANALYSIS_APP_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_NUTRITION_ANALYSIS_APP_KEY}`,
        { json: recipe },
      )
      .json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getIndividualTextLineNutritionAnalysis = async (query: string) => {
  try {
    const response = await ky(
      `https://api.edamam.com/api/nutrition-data?ingr=${query}&app_id=${process.env.NEXT_PUBLIC_EDAMAM_NUTRITION_ANALYSIS_APP_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_NUTRITION_ANALYSIS_APP_KEY}`,
    ).json();
    return response;
  } catch (error) {
    console.error(error);
  }
};
