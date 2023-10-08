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
import { DrinksService } from './drinks.service';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';

@Controller('drinks')
@ApiTags('drinks')
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Post()
  create(@Body() createDrinkDto: CreateDrinkDto, @User() userId: string) {
    return this.drinksService.create(createDrinkDto, userId);
  }

  @Get()
  findAll(@User() userId: string) {
    return this.drinksService.findAll(userId);
  }

  @Get(':drinkId')
  findById(@Param('drinkId') drinkId: string, @User() userId: string) {
    return this.drinksService.findById(drinkId, userId);
  }

  @Patch(':drinkId')
  update(
    @Param('drinkId') drinkId: string,
    @Body() updateDrinkDto: UpdateDrinkDto,
    @User() userId: string,
  ) {
    return this.drinksService.update(drinkId, updateDrinkDto, userId);
  }

  @Delete(':drinkId')
  delete(@Param('drinkId') drinkId: string, @User() userId: string) {
    return this.drinksService.delete(drinkId, userId);
  }
}
