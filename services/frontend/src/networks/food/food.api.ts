import ky from 'ky-universal';
import { CreateFoodDto } from './food.dto';

export const createFood = async (createFoodDto: CreateFoodDto) =>
  await ky.post('/api/v1/food', { json: createFoodDto }).json();
