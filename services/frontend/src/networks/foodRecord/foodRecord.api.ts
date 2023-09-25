import ky from 'ky-universal';
import { CreateFoodRecordDto } from './foodRecord.dto';

export const createFoodRecord = async (
  createFoodRecordDto: CreateFoodRecordDto,
) => await ky.post('/api/v1/food/record', { json: createFoodRecordDto }).json();

export const getAllFoodRecord = async () =>
  await ky('/api/v1/food/record').json();

export const getRecentFoodRecord = async () =>
  await ky('/api/v1/food/record/recent').json();

export const getFoodRecordsByDate = async date =>
  await ky(`/api/v1/food/record/${date}`).json();

export const deleteFoodRecord = async (recordId: string) =>
  await ky.delete(`/api/v1/food/record/${recordId}`).json();

export const updateFoodRecord = async (
  foodRecordId: string,
  data: CreateRecipeRecordDto,
): Promise<RecipeResponse | null> =>
  await ky.patch(`/api/v1/food/record/${foodRecordId}`, { json: data }).json();
