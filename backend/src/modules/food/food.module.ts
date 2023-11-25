import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';

@Module({
  controllers: [FoodController],
  providers: [FoodService],
  imports: [PrismaModule],
})
export class FoodModule {}
