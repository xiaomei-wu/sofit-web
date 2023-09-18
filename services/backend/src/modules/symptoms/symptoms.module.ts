import { Module } from '@nestjs/common';
import { SymptomsController } from './symptoms.controller';
import { SymptomsService } from './symptoms.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SymptomsController],
  providers: [SymptomsService],
  imports: [PrismaModule],
})
export class SymptomsModule {}
