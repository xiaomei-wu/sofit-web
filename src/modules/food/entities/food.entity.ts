import { ApiProperty } from '@nestjs/swagger';
import { FoodCategory } from '@prisma/client';

export class Food {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  imgUrl: string;

  @ApiProperty()
  category: FoodCategory;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
export class UserFoodRecord {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  servingAmount: number;

  @ApiProperty()
  servingSize: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  mealCategory: string | null;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  foodId: string | null;

  @ApiProperty()
  recipeId: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  food: Food;
}
