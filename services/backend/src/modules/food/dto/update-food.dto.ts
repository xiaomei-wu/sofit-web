import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodRecordDto } from './create-food.dto';

export class UpdateFoodDto extends PartialType(CreateFoodRecordDto) {}
