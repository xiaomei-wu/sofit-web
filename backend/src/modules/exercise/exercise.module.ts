import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';

@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService],
  imports: [PrismaModule],
})
export class ExerciseModule {}
