import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DrinksService } from '../drinks/drinks.service';
import { EnergyService } from '../energy/energy.service';
import { FoodService } from '../food/food.service';
import { SleepService } from '../sleep/sleep.service';
import { SymptomsService } from '../symptoms/symptoms.service';

@Injectable()
export class HistoriesService {
  constructor(
    private prisma: PrismaService,
    private readonly foodService: FoodService,
    private readonly sleepService: SleepService,
    private readonly drinkService: DrinksService,
    private readonly symtomsService: SymptomsService,
    private readonly energyService: EnergyService,
  ) {}

  async findUserHistory(userId: string) {
    if (!userId) {
      return new UnauthorizedException();
    }
    const food = await this.foodService.findAllRecordWithinDays(userId, 7);
    const sleep = await this.sleepService.findAll(userId, 7);
    const drink = await this.drinkService.findAll(userId, 7);
    const symptom = await this.symtomsService.findAll(userId, 7);
    const energy = await this.energyService.findAll(userId, 7);

    return {
      userId,
      food: [...food],
      drink: [...drink],
      sleep: [...sleep],
      symptom: [...symptom],
      energy: [...energy],
    };
  }
}
