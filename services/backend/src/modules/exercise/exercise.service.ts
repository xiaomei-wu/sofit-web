import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(private prisma: PrismaService) {}

  async create(createExerciseDto: CreateExerciseDto) {
    return this.prisma.excercise.create({
      data: createExerciseDto,
    });
  }

  async findAll() {
    return this.prisma.excercise.findMany();
  }

  async findById(uuid: string) {
    return this.prisma.excercise.findUnique({ where: { uuid } });
  }

  async update(uuid: string, updateExerciseDto: UpdateExerciseDto) {
    return this.prisma.excercise.update({
      where: { uuid },
      data: updateExerciseDto,
    });
  }

  async delete(uuid: string) {
    return this.prisma.excercise.delete({ where: { uuid } });
  }
}
