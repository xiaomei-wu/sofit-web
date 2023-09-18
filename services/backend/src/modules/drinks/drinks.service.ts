import { Injectable } from '@nestjs/common';
import { Drink as DrinkModel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';

@Injectable()
export class DrinksService {
  constructor(private prisma: PrismaService) {}

  async create(createDrinkDto: CreateDrinkDto) {
    this.prisma.drink.create({ data: createDrinkDto });
  }

  async findAll() {
    this.prisma.drink.findMany();
  }

  async findById(uuid: string) {
    return this.prisma.drink.findUnique({ where: { uuid } });
  }

  async update(uuid: string, updateDrinkDto: UpdateDrinkDto) {
    return this.prisma.drink.update({ where: { uuid }, data: updateDrinkDto });
  }

  async delete(uuid: string): Promise<DrinkModel | null> {
    return this.prisma.drink.delete({ where: { uuid } });
  }
}
