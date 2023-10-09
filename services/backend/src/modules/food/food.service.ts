import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateFoodDto,
  CreateFoodRecordDto,
  CreateNutrientDto
} from './dto/create-food.dto';
import { UserFoodRecord } from './entities/food.entity';
@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}

  createNutrient(createNutrientDto: CreateNutrientDto) {
    return this.prisma.nutrient.create({
      data: createNutrientDto,
    });
  }

  updateNurient(updateNurientDto) {
    return this.prisma.nutrient.update({
      where: {
        uuid: updateNurientDto?.uuid,
      },
      data: updateNurientDto,
    });
  }

  async createFood(createFoodDto: CreateFoodDto) {
    const nutrients = await this.createNutrient(createFoodDto.nutrients);

    return this.prisma.food.create({
      data: {
        ...createFoodDto,
        nutrients: {
          connect: { uuid: nutrients.uuid },
        },
      },
      include: {
        nutrients: true, // Include the related Nutrient in the response
      },
    });
  }

  async updateFood(foodId, updateFoodDto) {
    let nutrients;

    if (updateFoodDto?.nutrients) {
      nutrients = await this.updateNurient(updateFoodDto.nutrients);
    }

    return this.prisma.food.update({
      where: {
        uuid: foodId,
      },
      data: {
        ...updateFoodDto,
        ...(nutrients && {
          nutrients: {
            connect: { uuid: nutrients.uuid },
          },
        }),
      },
      include: {
        nutrients: true, // Include the related Nutrient in the response
      },
    });
  }

  async createFoodRecord(
    createFoodRecordDto: CreateFoodRecordDto,
    userId: string,
  ) {
    const { food, servingAmount, servingSize, date, startTime, mealCategory } =
      createFoodRecordDto;

    const existingFood = await this.prisma.food.findFirst({
      where: { name: food.name },
    });

    let createdFood;
    if (!existingFood) {
      createdFood = await this.createFood(food);
    } else {
      createdFood = existingFood;
    }

    return this.prisma.userFoodRecord.create({
      data: {
        servingAmount,
        servingSize,
        date,
        startTime,
        mealCategory,
        food: {
          connect: { uuid: createdFood.uuid },
        },
        user: {
          connect: { uuid: userId }, // Connect the User using the provided userId
        },
      },
      include: {
        food: true,
      },
    });
  }

  async updateFoodRecord(
    foodRecordId: string,
    updateFoodRecordDto,
    userId: string,
  ) {
    const {
      recipe,
      recipeId,
      userId: userUuid,
      foodId,
      food,
      ...restRecipeRecordData
    } = updateFoodRecordDto;
    // Update Recipe data
    const updatedFood = await this.updateFood(foodId, food);

    // Update RecipeRecord data
    const updatedFoodRecord = await this.prisma.userFoodRecord.update({
      where: { uuid: foodRecordId },
      data: {
        ...restRecipeRecordData,
        food: {
          connect: { uuid: updatedFood.uuid },
        },
        user: {
          connect: { uuid: userId }, // Connect the User using the provided userId
        },
      },
      include: { food: { include: { nutrients: true } } },
    });

    return updatedFoodRecord;
  }

  async deleteFoodRecord(recordId: string, userId: string): Promise<void> {
    // Check if the userFoodRecord exists and belongs to the user
    const userFoodRecord = await this.prisma.userFoodRecord.findUnique({
      where: { uuid: recordId },
      include: {
        user: true, // Include the user to check ownership
      },
    });

    if (!userFoodRecord) {
      throw new NotFoundException('UserFoodRecord not found');
    }

    if (userFoodRecord.user.uuid !== userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    // Delete the userFoodRecord by its UUID
    await this.prisma.userFoodRecord.delete({
      where: { uuid: recordId },
    });
  }

  async findAllRecord(userId: string) {
    return this.prisma.userFoodRecord.findMany({
      where: {
        userId: userId,
      },
      include: {
        food: true,
        recipe: {
          include: {
            ingredients: true, // Include the ingredients relationship
          },
        },
      },
    });
  }

  async findAllRecordInOneWeek(userId: string): Promise<UserFoodRecord[]> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return this.prisma.userFoodRecord.findMany({
      where: {
        userId: userId, // Replace with userId variable
        date: {
          gte: oneWeekAgo,
        },
      },
      include: {
        food: true,
        recipe: {
          include: {
            ingredients: true, // Include the ingredients relationship
          },
        },
      },
      orderBy: {
        date: 'desc', // Sort by date in descending order
      },
    });
  }

  async findAllRecordsByDate(
    searchDate: string,
    userId: string,
  ): Promise<UserFoodRecord[]> {
    const midnight = new Date(searchDate);
    midnight.setHours(0, 0, 0, 0);

    return this.prisma.userFoodRecord.findMany({
      where: {
        userId: userId, // Use the provided userId variable
        date: {
          gte: midnight,
          lte: new Date(searchDate),
        },
      },
      include: {
        food: true,
        recipe: {
          include: {
            ingredients: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async updateConsumedNutritionData(
    foodRecordId: string,
    nutritionData,
    userId: string,
  ) {
    const foodEntry = await this.prisma.userFoodRecord.findUnique({
      where: { uuid: foodRecordId, userId },
    });

    if (!foodEntry) {
      throw new NotFoundException('No food record found');
    }

    // Update analysed nutrition data of what user has consumed
    const updatedFoodRecord = await this.prisma.userFoodRecord.update({
      where: { uuid: foodRecordId },
      data: {
        nutritionData: nutritionData,
        user: {
          connect: { uuid: userId }, // Connect the User using the provided userId
        },
      },
    });

    return {
      uuid: updatedFoodRecord.uuid,
      nutritionData: updatedFoodRecord.nutritionData,
    };
  }
}
