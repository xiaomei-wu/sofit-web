import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.decorator';
import {
  CreateRecipeDto,
  CreateRecipeRecordDto
} from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeService } from './recipe.service';

@Controller('recipe')
@ApiTags('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  createRecipe(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.createRecipe(createRecipeDto);
  }

  @Post('/record')
  createRecipeRecord(
    @Body() createRecipeRecordDto: CreateRecipeRecordDto,
    @User() userId: string,
  ) {
    return this.recipeService.createRecipeRecord(createRecipeRecordDto, userId);
  }

  @Patch('record/:recordId')
  update(
    @Param('recordId') recordId: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @User() userId: string,
  ) {
    return this.recipeService.updateRecipeRecord(
      recordId,
      updateRecipeDto,
      userId,
    );
  }

  @Get()
  findAllRecipes() {
    return this.recipeService.findAllRecipes();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  }
}
