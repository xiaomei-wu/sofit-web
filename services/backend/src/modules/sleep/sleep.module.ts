import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SleepController } from './sleep.controller';
import { SleepService } from './sleep.service';

@Module({
  controllers: [SleepController],
  providers: [SleepService],
  imports: [PrismaModule],
})
export class SleepModule {}
