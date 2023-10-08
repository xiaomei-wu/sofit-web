import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateRecipeDto,
  CreateRecipeRecordDto
} from './dto/create-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  async createRecipe(createRecipeDto: CreateRecipeDto) {
    const recipeData = {
      name: createRecipeDto.name,
      yield: createRecipeDto.yield,
      dietLabels: {
        create: createRecipeDto.dietLabels,
      },
      healthLabels: {
        create: createRecipeDto.healthLabels,
      },
      imgUrl: createRecipeDto.imgUrl,
      source: createRecipeDto.source,
      mealType: {
        create: createRecipeDto.mealType,
      },
      dishType: {
        create: createRecipeDto.dishType,
      },
      cuisineType: {
        create: createRecipeDto.cuisineType,
      },
      cautions: {
        create: createRecipeDto.cautions,
      },
      ingredients: {
        create: createRecipeDto.ingredients.map((ingredient) => ({
          text: ingredient.text,
          food: ingredient.food,
          quantity: ingredient.quantity,
          measure: ingredient.measure,
          weight: ingredient.weight,
        })),
      },
      calories: createRecipeDto.calories,
    };

    const recipe = await this.prisma.recipe.create({
      data: recipeData,
      include: {
        ingredients: true, // Include ingredients in the response if needed
        dietLabels: true, // Include dietLabels in the response if needed
        healthLabels: true, // Include healthLabels in the response if needed
        mealType: true, // Include mealType in the response if needed
        dishType: true, // Include dishType in the response if needed
        cuisineType: true, // Include cuisineType in the response if needed
        cautions: true, // Include cautions in the response if needed
      },
    });

    return recipe;
  }

  async createRecipeRecord(
    createRecipeRecordDto: CreateRecipeRecordDto,
    userId: string,
  ) {
    const {
      recipe,
      servingAmount,
      servingSize,
      date,
      startTime,
      mealCategory,
    } = createRecipeRecordDto;
    const user = await this.prisma.user.findUnique({
      where: { uuid: userId },
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    const createdRecipe = await this.createRecipe(recipe);

    return this.prisma.userFoodRecord.create({
      data: {
        servingAmount,
        servingSize,
        date,
        startTime,
        mealCategory,
        recipe: {
          connect: { uuid: createdRecipe.uuid },
        },
        user: {
          connect: { uuid: userId }, // Connect the User using the provided userId
        },
      },
      include: { recipe: { include: { ingredients: true } } },
    });
  }

  // Update a Recipe
  async updateRecipe(recipeId: string, updateRecipeDto) {
    const {
      ingredients,
      dietLabels,
      healthLabels,
      cautions,
      cuisineType,
      mealType,
      dishType,
      ...restRecipeData
    } = updateRecipeDto;

    // Update the main Recipe data
    const updatedRecipe = await this.prisma.recipe.update({
      where: { uuid: recipeId },
      data: {
        ...restRecipeData,
        ingredients: {
          updateMany: ingredients?.map((ingredient) => ({
            where: { uuid: ingredient.uuid },
            data: {
              text: ingredient.text,
              food: ingredient.food,
              quantity: ingredient.quantity,
              measure: ingredient.measure,
              weight: ingredient.weight,
            },
          })),
        },
        dietLabels: {
          updateMany: dietLabels?.map((label) => ({
            where: {
              uuid: label.uuid,
            },
            data: {
              label: label,
            },
          })),
        },
        healthLabels: {
          updateMany: healthLabels?.map((label) => ({
            where: {
              uuid: label.uuid,
            },
            data: {
              label: label,
            },
          })),
        },
        dishType: {
          updateMany: dishType?.map((label) => ({
            where: {
              uuid: label.uuid,
            },
            data: {
              label: label,
            },
          })),
        },
        mealType: {
          updateMany: mealType?.map((label) => ({
            where: {
              uuid: label.uuid,
            },
            data: {
              label: label,
            },
          })),
        },
        cautions: {
          updateMany: cautions?.map((label) => ({
            where: {
              uuid: label.uuid,
            },
            data: {
              label: label,
            },
          })),
        },
        cuisineType: {
          updateMany: cuisineType?.map((label) => ({
            where: {
              uuid: label.uuid,
            },
            data: {
              label: label,
            },
          })),
        },
      },
      include: {
        ingredients: true,
        dietLabels: true,
        healthLabels: true,
        mealType: true,
        dishType: true,
        cautions: true,
        cuisineType: true,
      },
    });

    return updatedRecipe;
  }

  // Update a RecipeRecord
  async updateRecipeRecord(
    recipeRecordId: string,
    updateRecipeRecordDto,
    userId: string,
  ) {
    const {
      recipe,
      recipeId,
      userId: userUUID,
      foodId,
      food,
      ...restRecipeRecordData
    } = updateRecipeRecordDto;

    // Update Recipe data
    const updatedRecipe = await this.updateRecipe(recipeId, recipe);

    // Update RecipeRecord data
    const updatedRecipeRecord = await this.prisma.userFoodRecord.update({
      where: { uuid: recipeRecordId },
      data: {
        ...restRecipeRecordData,
        recipe: {
          connect: { uuid: updatedRecipe.uuid },
        },
        user: {
          connect: { uuid: userId }, // Connect the User using the provided userId
        },
      },
      include: { recipe: { include: { ingredients: true } } },
    });

    return updatedRecipeRecord;
  }

  async findAllRecipes() {
    return this.prisma.recipe.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
