import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEnergyDto } from './dto/create-energy.dto';
import { UpdateEnergyDto } from './dto/update-energy.dto';

@Injectable()
export class EnergyService {
  constructor(private prisma: PrismaService) {}

  async create(createEnergyDto: CreateEnergyDto, userId: string) {
    return this.prisma.energy.create({
      data: {
        ...createEnergyDto,
        user: {
          connect: { uuid: userId },
        },
      },
    });
  }

  async findAll(userId: string, includedDays = 1) {
    const desiredDate = new Date();
    desiredDate.setDate(desiredDate.getDate() - includedDays);

    return this.prisma.energy.findMany({
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
    return this.prisma.energy.findMany({
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
    return this.prisma.energy.findUnique({ where: { uuid, userId } });
  }

  async update(uuid: string, updateEnergyDto: UpdateEnergyDto, userId: string) {
    return this.prisma.energy.update({
      where: { uuid, userId },
      data: updateEnergyDto,
    });
  }

  async delete(uuid: string, userId: string) {
    return this.prisma.energy.delete({ where: { uuid, userId } });
  }
}
