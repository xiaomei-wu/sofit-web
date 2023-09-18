import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SleepService } from './sleep.service';
import { CreateSleepDto } from './dto/create-sleep.dto';
import { UpdateSleepDto } from './dto/update-sleep.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('sleep')
@ApiTags('sleep')
export class SleepController {
  constructor(private readonly sleepService: SleepService) {}

  @Post()
  create(@Body() createSleepDto: CreateSleepDto) {
    return this.sleepService.create(createSleepDto);
  }

  @Get()
  findAll() {
    return this.sleepService.findAll();
  }

  @Get(':sleepId')
  findById(@Param('sleepId') sleepId: string) {
    return this.sleepService.findById(sleepId);
  }

  @Patch(':sleepId')
  update(
    @Param('sleepId') sleepId: string,
    @Body() updateSleepDto: UpdateSleepDto,
  ) {
    return this.sleepService.update(sleepId, updateSleepDto);
  }

  @Delete(':sleepId')
  delete(@Param('sleepId') sleepId: string) {
    return this.sleepService.delete(sleepId);
  }
}
