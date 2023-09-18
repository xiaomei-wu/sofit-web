import { postRequest } from '../utils';
import { CreateFoodDto } from './food.dto';

export const createFood = async (createFoodDto: CreateFoodDto) =>
  await postRequest('/api/v1/food', createFoodDto);
