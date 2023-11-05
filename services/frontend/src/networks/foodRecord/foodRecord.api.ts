import { FoodRecord } from '@/types/food';
import { api } from '../utils';
import { CreateFoodRecordDto } from './foodRecord.dto';

export const createFoodRecord = async (
  createFoodRecordDto: CreateFoodRecordDto
) =>
  await api.post('/api/v1/food/record', { json: createFoodRecordDto }).json();

export const getAllFoodRecord = async (): Promise<FoodRecord[]> =>
  await api.get('/api/v1/food/record').json();

export const getRecentFoodRecord = async () =>
  await api.get('/api/v1/food/record/recent').json();

export const getFoodRecordsByDate = async (date: Date) =>
  await api.get(`/api/v1/food/record/${date}`).json();

export const deleteFoodRecord = async (recordId: string) =>
  await api.delete(`/api/v1/food/record/${recordId}`).json();

export const updateFoodRecord = async ({
  foodRecordId,
  data
}: {
  foodRecordId: string;
  data: Partial<CreateFoodRecordDto>;
}) => {
  await api.patch(`/api/v1/food/record/${foodRecordId}`, { json: data }).json();
};

export const updateFoodRecordNutritionData = async ({
  foodRecordId,
  data
}: {
  foodRecordId: string;
  data: Record<string, any>;
}) => {
  await api
    .patch(`/api/v1/food/record/${foodRecordId}/nutritionData`, { json: data })
    .json();
};
