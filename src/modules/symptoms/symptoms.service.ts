import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSymptomDto } from './dto/create-symptom.dto';
import { UpdateSymptomDto } from './dto/update-symptom.dto';

@Injectable()
export class SymptomsService {
  constructor(private prisma: PrismaService) {}

  async create(createSymptomDto: CreateSymptomDto, userId: string) {
    return this.prisma.symptom.create({
      data: {
        ...createSymptomDto,
        user: {
          connect: { uuid: userId }, // Connect the User using the provided userId
        },
      },
    });
  }

  async findAll(userId: string, includedDays = 1) {
    const desiredDate = new Date();
    desiredDate.setDate(desiredDate.getDate() - includedDays);
    return this.prisma.symptom.findMany({
      where: {
        userId,
        date: {
          gte: desiredDate,
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  async findByDate(searchDate: string, userId: string) {
    const midnight = new Date(searchDate);
    midnight.setHours(0, 0, 0, 0);

    return this.prisma.symptom.findMany({
      where: {
        userId: userId, // Use the provided userId variable
        date: {
          gte: midnight,
          lte: new Date(searchDate),
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findById(uuid: string, userId: string) {
    return this.prisma.symptom.findUnique({ where: { uuid, userId } });
  }

  async update(
    uuid: string,
    updateSymptomDto: UpdateSymptomDto,
    userId: string,
  ) {
    return this.prisma.symptom.update({
      where: { uuid },
      data: {
        ...updateSymptomDto,
        user: {
          connect: { uuid: userId }, // Connect the User using the provided userId
        },
      },
    });
  }

  async delete(uuid: string, userId: string) {
    return this.prisma.symptom.delete({ where: { uuid, userId } });
  }
}
