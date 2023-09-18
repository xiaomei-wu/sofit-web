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
import { DrinksService } from './drinks.service';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';

@Controller('drinks')
@ApiTags('drinks')
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Post()
  create(@Body() createDrinkDto: CreateDrinkDto) {
    return this.drinksService.create(createDrinkDto);
  }

  @Get()
  findAll() {
    return this.drinksService.findAll();
  }

  @Get(':drinkId')
  findById(@Param('drinkId') drinkId: string) {
    return this.drinksService.findById(drinkId);
  }

  @Patch(':drinkId')
  update(
    @Param('drinkId') drinkId: string,
    @Body() updateDrinkDto: UpdateDrinkDto,
  ) {
    return this.drinksService.update(drinkId, updateDrinkDto);
  }

  @Delete('drinkId')
  delete(@Param('drinkId') drinkId: string) {
    return this.drinksService.delete(drinkId);
  }
}
