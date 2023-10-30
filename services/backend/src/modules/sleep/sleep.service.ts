import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSleepDto } from './dto/create-sleep.dto';
import { UpdateSleepDto } from './dto/update-sleep.dto';

@Injectable()
export class SleepService {
  constructor(private prisma: PrismaService) {}

  async create(createSleepDto: CreateSleepDto, userId: string) {
    return this.prisma.sleep.create({
      data: {
        ...createSleepDto,
        user: {
          connect: { uuid: userId }, // Connect the User using the provided userId
        },
      },
    });
  }

  async findAll(userId: string, includedDays = 1) {
    const desiredDate = new Date();
    desiredDate.setDate(desiredDate.getDate() - includedDays);

    return this.prisma.sleep.findMany({
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

    return this.prisma.sleep.findMany({
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
    return this.prisma.sleep.findUnique({ where: { uuid, userId } });
  }

  async update(uuid: string, updateSleepDto: UpdateSleepDto, userId: string) {
    return this.prisma.sleep.update({
      where: { uuid, userId },
      data: updateSleepDto,
    });
  }

  async delete(uuid: string, userId: string) {
    return this.prisma.sleep.delete({ where: { uuid, userId } });
  }
}
