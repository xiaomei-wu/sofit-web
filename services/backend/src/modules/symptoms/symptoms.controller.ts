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
import { CreateSymptomDto } from './dto/create-symptom.dto';
import { UpdateSymptomDto } from './dto/update-symptom.dto';
import { SymptomsService } from './symptoms.service';

@Controller('symptoms')
@ApiTags('symptoms')
export class SymptomsController {
  constructor(private readonly symptomsService: SymptomsService) {}

  @Post()
  create(@Body() createSymptomDto: CreateSymptomDto) {
    return this.symptomsService.create(createSymptomDto);
  }

  @Get()
  findAll() {
    return this.symptomsService.findAll();
  }

  @Get(':symptomId')
  findById(@Param('symptomId') symptomId: string) {
    return this.symptomsService.findById(symptomId);
  }

  @Patch(':symptomId')
  update(
    @Param('symptomId') symptomId: string,
    @Body() updateSymptomDto: UpdateSymptomDto,
  ) {
    return this.symptomsService.update(symptomId, updateSymptomDto);
  }

  @Delete(':symptomId')
  delete(@Param('symptomId') symptomId: string) {
    return this.symptomsService.delete(symptomId);
  }
}
