import { ApiProperty } from '@nestjs/swagger';

enum MealCategory {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
  SNACK = 'SNACK',
}

enum FoodCategory {
  GENERIC_FOODS = 'GENERIC_FOODS',
  PACKAGED_FOODS = 'PACKAGED_FOODS',
}

export class CreateNutrientDto {
  @ApiProperty()
  enerc_Kcal: number;

  @ApiProperty()
  procnt_g: number;

  @ApiProperty()
  fat_g: number;

  @ApiProperty()
  chocdf_g: number;

  @ApiProperty({ required: false })
  sugar_g?: number;

  @ApiProperty({ required: false })
  fibt_g?: number;
}

export class CreateFoodDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  brand: string;

  @ApiProperty({ required: false })
  imgUrl?: string;

  @ApiProperty()
  category: FoodCategory;

  @ApiProperty({ required: false })
  nutrients?: CreateNutrientDto;
}

export class CreateFoodRecordDto {
  @ApiProperty()
  food: CreateFoodDto;

  @ApiProperty()
  servingAmount: number;

  @ApiProperty()
  servingSize: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  mealCategory: MealCategory;
}
