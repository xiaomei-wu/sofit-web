import { FoodCategory, MealCategory } from '@/networks';

interface Nutrient {
  uuid?: string;
  enerc_Kcal: number;
  procnt_g: number;
  fat_g: number;
  chocdf_g: number;
  sugar_g: number;
  fibt_g: number;
  recipeId?: string | null;
  foodId?: string | null;
}

export interface Food {
  uuid: string;
  name: string;
  brand: string | null;
  imgUrl: string | null;
  category: FoodCategory;
  createdAt: string;
  updatedAt: string;
  nutrients: Nutrient[] | null;
}

interface Ingredient {
  uuid: string;
  text: string;
  quantity: null;
  measure: string;
  food: string;
  weight: number;
  recipeId: string;
}

interface Label {
  uuid: string;
  label: string;
  recipeId: string;
}

export interface Recipe {
  uuid: string;
  name: string;
  imgUrl: string | null;
  source: string | null;
  yield: number;
  calories: number;
  createdAt: string;
  updatedAt: string;
  ingredients: Ingredient[];
  dietLabels: Label[];
  healthLabels: Label[];
  cuisineType: Label[];
}

export interface FoodRecord {
  uuid: string;
  servingAmount: number;
  servingSize: string;
  date: string;
  startTime: string;
  mealCategory: MealCategory;
  userId: string;
  foodId: string | null;
  recipeId: string | null;
  createdAt: Date;
  updatedAt: Date;
  nutritionData: Record<string, any> | null;
  food: Food | null;
  recipe: Recipe | null;
}
