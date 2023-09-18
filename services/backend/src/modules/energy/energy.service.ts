import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEnergyDto } from './dto/create-energy.dto';
import { UpdateEnergyDto } from './dto/update-energy.dto';

@Injectable()
export class EnergyService {
  constructor(private prisma: PrismaService) {}

  async create(createEnergyDto: CreateEnergyDto) {
    return this.prisma.energy.create({
      data: createEnergyDto,
    });
  }

  async findAll() {
    return this.prisma.energy.findMany();
  }

  async findById(uuid: string) {
    return this.prisma.energy.findUnique({ where: { uuid } });
  }

  async update(uuid: string, updateEnergyDto: UpdateEnergyDto) {
    return this.prisma.energy.update({
      where: { uuid },
      data: updateEnergyDto,
    });
  }

  async delete(uuid: string) {
    return this.prisma.energy.delete({ where: { uuid } });
  }
}
