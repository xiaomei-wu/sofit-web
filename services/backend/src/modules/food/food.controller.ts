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
import { CreateFoodDto, CreateFoodRecordDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodService } from './food.service';

@Controller('food')
@ApiTags('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  createFood(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.createFood(createFoodDto);
  }

  @Post('/record')
  createFoodRecord(
    @Body() createFoodRecordDto: CreateFoodRecordDto,
    @User() userId: string,
  ) {
    return this.foodService.createFoodRecord(createFoodRecordDto, userId);
  }

  @Get('/record')
  findAllRecord(@User() userId: string) {
    return this.foodService.findAllRecord(userId);
  }

  @Get('/record/recent')
  findAllRecordInOneWeek(@User() userId: string) {
    return this.foodService.findAllRecordInOneWeek(userId);
  }

  @Get('/record/:date')
  findAllRecordsByDate(@Param('date') date: string, @User() userId: string) {
    return this.foodService.findAllRecordsByDate(date, userId);
  }

  @Patch('/record/:foodRecordId')
  updateFoodRecord(
    @Param('foodRecordId') foodRecordId: string,
    @Body() updateFoodRecordDto,
    @User() userId: string,
  ) {
    console.log(updateFoodRecordDto, 'updateFoodRecordDto in controller');

    return this.foodService.updateFoodRecord(
      foodRecordId,
      updateFoodRecordDto,
      userId,
    );
  }

  @Delete('/record/:recordId')
  deleteFoodRecord(
    @Param('recordId') recordId: string,
    @User() userId: string,
  ) {
    return this.foodService.deleteFoodRecord(recordId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.foodService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    // return this.foodService.update(+id, updateFoodDto);
  }
}
