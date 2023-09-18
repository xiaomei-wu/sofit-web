import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DrinksController } from './drinks.controller';
import { DrinksService } from './drinks.service';

@Module({
  controllers: [DrinksController],
  providers: [DrinksService],
  imports: [PrismaModule],
})
export class DrinksModule {}
