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
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
@ApiTags('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto, @User() userId: string) {
    return this.exerciseService.create(createExerciseDto, userId);
  }

  @Get()
  findAll() {
    return this.exerciseService.findAll();
  }

  @Get(':exerciseId')
  findById(@Param('exerciseId') exerciseId: string) {
    return this.exerciseService.findById(exerciseId);
  }

  @Patch(':exerciseId')
  update(
    @Param('exerciseId') exerciseId: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return this.exerciseService.update(exerciseId, updateExerciseDto);
  }

  @Delete(':exerciseId')
  delete(@Param('exerciseId') exerciseId: string) {
    return this.exerciseService.delete(exerciseId);
  }
}
