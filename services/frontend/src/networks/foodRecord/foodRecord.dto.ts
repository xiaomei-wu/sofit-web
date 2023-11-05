export interface CreateFoodRecordDto {
  name: string;
  brand: string;
  servingAmount: number;
  servingSize: string;
  date: Date;
  time: Date;
  category: FoodCategory;
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
