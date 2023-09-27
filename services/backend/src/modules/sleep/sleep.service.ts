import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSleepDto } from './dto/create-sleep.dto';
import { UpdateSleepDto } from './dto/update-sleep.dto';

@Injectable()
export class SleepService {
  constructor(private prisma: PrismaService) {}

  async create(createSleepDto: CreateSleepDto) {
    return this.prisma.sleep.create({ data: createSleepDto });
  }

  async findAll() {
    return this.prisma.sleep.findMany();
  }

  async findById(uuid: string) {
    return this.prisma.sleep.findUnique({ where: { uuid } });
  }

  async update(uuid: string, updateSleepDto: UpdateSleepDto) {
    return this.prisma.sleep.update({ where: { uuid }, data: updateSleepDto });
  }

  async delete(uuid: string) {
    return this.prisma.sleep.delete({ where: { uuid } });
  }
}
