import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EnergyController } from './energy.controller';
import { EnergyService } from './energy.service';

@Module({
  controllers: [EnergyController],
  providers: [EnergyService],
  imports: [PrismaModule],
})
export class EnergyModule {}
