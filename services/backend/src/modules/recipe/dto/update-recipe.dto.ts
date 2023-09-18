import { PartialType } from '@nestjs/swagger';
import {
  CreateRecipeDto,
  CreateRecipeRecordDto,
  RecipeIngredient
} from './create-recipe.dto';

export class UpdateRecipeIngredientDto extends PartialType(RecipeIngredient) {
  uuid?: string;
}

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
  uuid?: string;
}

export class UpdateRecipeRecordDto extends PartialType(CreateRecipeRecordDto) {
  recipeId?: string;
}
