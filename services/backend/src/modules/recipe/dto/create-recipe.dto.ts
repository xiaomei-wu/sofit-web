import { ApiProperty } from '@nestjs/swagger';

enum MealCategory {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
  SNACK = 'SNACK',
}

export class RecipeIngredient {
  @ApiProperty()
  food: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  measure?: string;
  @ApiProperty()
  text: string;
  @ApiProperty()
  weight?: number;
}

class DietLabel {
  @ApiProperty()
  label: string;
}

class HealthLabel {
  @ApiProperty()
  label: string;
}

class MealType {
  @ApiProperty()
  label: string;
}

class CuisineType {
  @ApiProperty()
  label: string;
}

class DishType {
  @ApiProperty()
  label: string;
}

class Caution {
  @ApiProperty()
  label: string;
}

export class CreateRecipeDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  yield: number;

  @ApiProperty()
  dietLabels?: DietLabel[];

  @ApiProperty()
  healthLabels?: HealthLabel[];

  @ApiProperty()
  imgUrl?: string;

  @ApiProperty()
  source?: string;

  @ApiProperty()
  mealType?: MealType[];

  @ApiProperty()
  dishType?: DishType[];

  @ApiProperty()
  cuisineType?: CuisineType[];

  @ApiProperty()
  cautions?: Caution[];

  @ApiProperty()
  ingredients: RecipeIngredient[];

  @ApiProperty()
  calories: number;
}

export class CreateRecipeRecordDto {
  @ApiProperty()
  recipe: CreateRecipeDto;

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
