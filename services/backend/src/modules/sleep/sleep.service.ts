import { Injectable } from '@nestjs/common';
import { CreateSleepDto } from './dto/create-sleep.dto';
import { UpdateSleepDto } from './dto/update-sleep.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SleepService {
  constructor(private prisma: PrismaService) {}

  create(createSleepDto: CreateSleepDto) {
    return this.prisma.sleep.create({ data: createSleepDto });
  }

  findAll() {
    return this.prisma.sleep.findMany();
  }

  findById(uuid: string) {
    return this.prisma.sleep.findUnique({ where: { uuid } });
  }

  update(uuid: string, updateSleepDto: UpdateSleepDto) {
    return this.prisma.sleep.update({ where: { uuid }, data: updateSleepDto });
  }

  delete(uuid: string) {
    return this.prisma.sleep.delete({ where: { uuid } });
  }
}
