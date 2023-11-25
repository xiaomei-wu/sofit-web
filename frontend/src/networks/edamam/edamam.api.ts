import ky from 'ky-universal';

type EdamamNutrients = {
  ENERC_KCAL: number;
  PROCNT: number;
  FAT: number;
  CHOCDF: number;
  SUGAR: number;
  FIBTG: number;
};

type EdamamFood = {
  label: string;
  knownAs: string;
  image: string;
  category: string;
  nutrients: EdamamNutrients;
};

export type EdamamFoodHint = {
  food: EdamamFood;
};

export const fetchEdamamFood = async (
  query: string
): Promise<{ hints: EdamamFoodHint[] } | undefined> => {
  return ky
    .get(
      `https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${process.env.NEXT_PUBLIC_EDAMAM_FOOD_APP_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_FOOD_APP_KEY}`
    )
    .json();
};

type EdamamIngredient = {
  text: string;
  food: string;
  quantity: number;
  measure: string;
  weight: number;
};

type RecipeNutrient = {
  quantity: number;
};

type EdamamRecipe = {
  label: string;
  image: string;
  source: string;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  ingredients: EdamamIngredient[];
  calories: number;
  mealType: string[];
  dishType: string[];
  totalNutrients: {
    ENERC_KCAL: RecipeNutrient;
    PROCNT: RecipeNutrient;
    FAT: RecipeNutrient;
    CHOCDF: RecipeNutrient;
    SUGAR: RecipeNutrient;
    FIBTG: RecipeNutrient;
  };
};

type EdamamRecipeHit = {
  recipe: EdamamRecipe;
};

export const fetchEdamamRecipes = async (
  query: string
): Promise<{ hits: EdamamRecipeHit[] } | undefined> => {
  return ky
    .get(
      `https://api.edamam.com/search?q=${query}&app_id=${process.env.NEXT_PUBLIC_EDAMAM_RECEIP_APP_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_RECIPE_APP_KEY}`
    )
    .json();
};

export type RecipeSchema = {
  title: string;
  ingr: string[];
  url: string;
  summary: string;
  yield: number;
  time: string;
  img: string;
  prep: string;
};

export const getFullRecipeNutritionAnalysis = async (
  recipe: RecipeSchema
): Promise<Record<string, any> | undefined> => {
  try {
    const response = await ky
      .post(
        `https://api.edamam.com/api/nutrition-details?app_id=${process.env.NEXT_PUBLIC_EDAMAM_NUTRITION_ANALYSIS_APP_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_NUTRITION_ANALYSIS_APP_KEY}`,
        { json: recipe }
      )
      .json();
    return response as Record<string, any> | undefined;
  } catch (error) {
    console.info(error);
  }
};

export const getIndividualTextLineNutritionAnalysis = async (query: string) => {
  try {
    const response = await ky(
      `https://api.edamam.com/api/nutrition-data?ingr=${query}&app_id=${process.env.NEXT_PUBLIC_EDAMAM_NUTRITION_ANALYSIS_APP_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_NUTRITION_ANALYSIS_APP_KEY}`
    ).json();
    return response as Record<string, any>;
  } catch (error) {
    console.info(error);
  }
};
