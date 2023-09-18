import { getRequest, patchRequest, postRequest } from '../utils';
import { RecipeResponse } from './recipe.dto';

export const getAllRecipe = async (): Promise<RecipeResponse | null> =>
  await getRequest('/api/v1/recipe');

export const createRecipe = async (data): Promise<RecipeResponse | null> =>
  await postRequest('/api/v1/recipe', data);

export const createRecipeRecord = async (
  data: CreateRecipeRecordDto,
): Promise<RecipeResponse | null> =>
  await postRequest('/api/v1/recipe/record', data);

export const updateRecipeRecord = async (
  recordId: string,
  data: CreateRecipeRecordDto,
): Promise<RecipeResponse | null> =>
  await patchRequest(`/api/v1/recipe/record/${recordId}`, data);
