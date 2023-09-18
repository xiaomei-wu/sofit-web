import { deleteRequest, getRequest, patchRequest, postRequest } from '../utils';
import { CreateFoodRecordDto } from './foodRecord.dto';

export const createFoodRecord = async (
  createFoodRecordDto: CreateFoodRecordDto,
) => await postRequest('/api/v1/food/record', createFoodRecordDto);

export const getAllFoodRecord = async () =>
  await getRequest('/api/v1/food/record');

export const getRecentFoodRecord = async () =>
  await getRequest('/api/v1/food/record/recent');

export const getFoodRecordsByDate = async date =>
  await getRequest(`/api/v1/food/record/${date}`);

export const deleteFoodRecord = async (recordId: string) =>
  await deleteRequest(`/api/v1/food/record/${recordId}`);

export const updateFoodRecord = async (
  foodRecordId: string,
  data: CreateRecipeRecordDto,
): Promise<RecipeResponse | null> =>
  await patchRequest(`/api/v1/food/record/${foodRecordId}`, data);
