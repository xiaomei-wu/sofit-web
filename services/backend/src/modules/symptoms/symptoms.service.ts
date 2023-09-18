import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSymptomDto } from './dto/create-symptom.dto';
import { UpdateSymptomDto } from './dto/update-symptom.dto';

@Injectable()
export class SymptomsService {
  constructor(private prisma: PrismaService) {}

  async create(createSymptomDto: CreateSymptomDto) {
    return this.prisma.symptom.create({ data: createSymptomDto });
  }

  async findAll() {
    return this.prisma.symptom.findMany();
  }

  async findById(uuid: string) {
    return this.prisma.symptom.findUnique({ where: { uuid } });
  }

  async update(uuid: string, updateSymptomDto: UpdateSymptomDto) {
    return this.prisma.symptom.update({
      where: { uuid },
      data: updateSymptomDto,
    });
  }

  async delete(uuid: string) {
    return this.prisma.symptom.delete({ where: { uuid } });
  }
}
