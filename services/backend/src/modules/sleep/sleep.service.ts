import { Injectable } from '@nestjs/common';
import { CreateSleepDto } from './dto/create-sleep.dto';
import { UpdateSleepDto } from './dto/update-sleep.dto';

@Injectable()
export class SleepService {
  create(createSleepDto: CreateSleepDto) {
    return 'This action adds a new sleep';
  }

  findAll() {
    return `This action returns all sleep`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sleep`;
  }

  update(id: number, updateSleepDto: UpdateSleepDto) {
    return `This action updates a #${id} sleep`;
  }

  remove(id: number) {
    return `This action removes a #${id} sleep`;
  }
}
