import { Food } from '@/types/food';
import { api } from '../utils';
import { CreateFoodDto } from './food.dto';

export const createFood = async (
  createFoodDto: CreateFoodDto
): Promise<Food | undefined> =>
  await api.post('/api/v1/food', { json: createFoodDto }).json();
