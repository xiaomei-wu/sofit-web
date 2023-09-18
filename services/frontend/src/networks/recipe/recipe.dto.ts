export interface RecipeResponse {
  uuid: string;
  name: string;
  imgUrl: string;
  source: string;
  yield: string;
}

interface RecipeIngredient {
  food: string;
  text: string;
  quantity: number;
  weight?: number;
  measure?: string;
}

interface CreateRecipeDto {
  name: string;
  yield: number;
  calories: number;
  ingredients: RecipeIngredient[];
}

export interface CreateRecipeRecordDto {
  recipe: CreateRecipeDto;
  servingAmount: number;
  servingSize: string;
  date: string;
  startTime: string;
  mealCategory: MealCategory;
  recipe: CreateRecipeDto;
}
