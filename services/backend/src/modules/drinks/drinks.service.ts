import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';

@Injectable()
export class DrinksService {
  constructor(private prisma: PrismaService) {}

  async create(createDrinkDto: CreateDrinkDto, userId: string) {
    return this.prisma.drink.create({
      data: {
        ...createDrinkDto,
        user: {
          connect: { uuid: userId },
        },
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.drink.findMany({ where: { userId: userId } });
  }

  async findById(uuid: string, userId: string) {
    return this.prisma.drink.findUnique({ where: { uuid, userId } });
  }

  async update(uuid: string, updateDrinkDto: UpdateDrinkDto, userId: string) {
    return this.prisma.drink.update({
      where: { uuid, userId },
      data: updateDrinkDto,
    });
  }

  async delete(uuid: string, userId: string) {
    return this.prisma.drink.delete({
      where: { uuid, userId },
    });
  }
}
