import { CreateNutrientDto } from '../food';
import { MealCategory } from '../foodRecord';

interface Label {
  uuid: string;
  label: string;
  recipeId: string;
}

interface LabelDto {
  label: string;
}
export interface RecipeResponse {
  uuid: string;
  name: string;
  imgUrl: string | null;
  source: string | null;
  yield: number;
  calories: number;
  createdAt: string;
  updatedAt: string;
  ingredients: RecipeIngredient[];
  dietLabels: Label[];
  healthLabels: Label[];
  cuisineType: Label[];
}

interface RecipeIngredient {
  uuid: string;
  text: string;
  quantity: null;
  measure: string;
  food: string;
  weight: number;
  recipeId: string;
}

export interface RecipeIngredientDto {
  text: string;
  quantity: number;
  measure: string;
  food: string;
  weight: number;
}

export interface CreateRecipeDto {
  name: string;
  yield: number;
  calories: number;
  ingredients: RecipeIngredientDto[];
  dietLabels?: LabelDto[];
  healthLabels?: LabelDto[];
  imgUrl?: string;
  source?: string;
  mealType?: LabelDto[];
  dishType?: LabelDto[];
  cuisineType?: LabelDto[];
  cautions?: LabelDto[];
  nutrients?: CreateNutrientDto;
}

export interface CreateRecipeRecordDto {
  recipe: CreateRecipeDto;
  servingAmount: number;
  servingSize: string;
  date: Date;
  startTime: Date;
  mealCategory: MealCategory;
}
