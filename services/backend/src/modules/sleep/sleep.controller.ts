import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.decorator';
import { CreateSleepDto } from './dto/create-sleep.dto';
import { UpdateSleepDto } from './dto/update-sleep.dto';
import { SleepService } from './sleep.service';

@Controller('sleep')
@ApiTags('sleep')
export class SleepController {
  constructor(private readonly sleepService: SleepService) {}

  @Post()
  create(@Body() createSleepDto: CreateSleepDto, @User() userId: string) {
    return this.sleepService.create(createSleepDto, userId);
  }

  @Get()
  findAll(@User() userId: string) {
    return this.sleepService.findAll(userId);
  }

  @Get(':sleepId')
  findById(@Param('sleepId') sleepId: string, @User() userId: string) {
    return this.sleepService.findById(sleepId, userId);
  }

  @Patch(':sleepId')
  update(
    @Param('sleepId') sleepId: string,
    @Body() updateSleepDto: UpdateSleepDto,
    @User() userId: string,
  ) {
    return this.sleepService.update(sleepId, updateSleepDto, userId);
  }

  @Delete(':sleepId')
  delete(@Param('sleepId') sleepId: string, @User() userId: string) {
    return this.sleepService.delete(sleepId, userId);
  }
}
