import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DrinksService } from '../drinks/drinks.service';
import { EnergyService } from '../energy/energy.service';
import { FoodService } from '../food/food.service';
import { SleepService } from '../sleep/sleep.service';
import { SymptomsService } from '../symptoms/symptoms.service';
import { HistoriesController } from './histories.controller';
import { HistoriesService } from './histories.service';

@Module({
  controllers: [HistoriesController],
  providers: [
    HistoriesService,
    FoodService,
    DrinksService,
    SleepService,
    SymptomsService,
    EnergyService,
  ],
  imports: [PrismaModule],
})
export class HistoriesModule {}
