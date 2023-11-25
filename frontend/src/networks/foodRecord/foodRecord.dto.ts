import { CreateFoodDto } from '../food/food.dto';

export interface CreateFoodRecordDto {
  food: CreateFoodDto;
  servingAmount: number;
  servingSize: string;
  date: Date;
  startTime: Date;
  mealCategory: MealCategory;
}

export enum MealCategory {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
  SNACK = 'SNACK'
}

export enum FoodCategory {
  GENERIC_FOODS = 'GENERIC_FOODS',
  PACKAGED_FOODS = 'PACKAGED_FOODS'
}
