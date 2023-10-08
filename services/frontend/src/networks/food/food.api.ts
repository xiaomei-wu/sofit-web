import { api } from '../utils';
import { CreateFoodDto } from './food.dto';

export const createFood = async (createFoodDto: CreateFoodDto) =>
  await api.post('/api/v1/food', { json: createFoodDto }).json();
