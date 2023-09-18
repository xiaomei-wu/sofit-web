import { Injectable } from '@nestjs/common';
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

  async delete(uuid: string) {
    return this.prisma.drink.delete({ where: { uuid } });
  }
}
