enum FoodCategory {
  GENERIC_FOODS = 'GENERIC_FOODS',
  PACKAGED_FOODS = 'PACKAGED_FOODS'
}

export interface CreateNutrientDto {
  enerc_Kcal: number;
  procnt_g: number;
  fat_g: number;
  chocdf_g: number;
  sugar_g?: number;
  fibt_g?: number;
}

export interface CreateFoodDto {
  name: string;
  brand: string;
  imgUrl?: string;
  category: FoodCategory;
  nutrients?: CreateNutrientDto;
}
