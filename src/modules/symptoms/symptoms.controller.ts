import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.decorator';
import { CreateSymptomDto } from './dto/create-symptom.dto';
import { UpdateSymptomDto } from './dto/update-symptom.dto';
import { SymptomsService } from './symptoms.service';

@Controller('symptoms')
@ApiTags('symptoms')
export class SymptomsController {
  constructor(private readonly symptomsService: SymptomsService) {}

  @Post()
  create(@Body() createSymptomDto: CreateSymptomDto, @User() userId: string) {
    return this.symptomsService.create(createSymptomDto, userId);
  }

  @Get()
  findAll(@User() userId: string) {
    return this.symptomsService.findAll(userId);
  }

  @Get(':symptomId')
  findById(@Param('symptomId') symptomId: string, @User() userId: string) {
    return this.symptomsService.findById(symptomId, userId);
  }

  @Patch(':symptomId')
  update(
    @Param('symptomId') symptomId: string,
    @Body() updateSymptomDto: UpdateSymptomDto,
    @User() userId: string,
  ) {
    return this.symptomsService.update(symptomId, updateSymptomDto, userId);
  }

  @Delete(':symptomId')
  delete(@Param('symptomId') symptomId: string, @User() userId: string) {
    return this.symptomsService.delete(symptomId, userId);
  }
}
