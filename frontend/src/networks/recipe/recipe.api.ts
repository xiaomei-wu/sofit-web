import { api } from '../utils';
import {
  CreateRecipeDto,
  CreateRecipeRecordDto,
  RecipeResponse
} from './recipe.dto';

export const getAllRecipe = async (): Promise<RecipeResponse | null> =>
  await api.get('/api/v1/recipe').json();

export const createRecipe = async (
  data: CreateRecipeDto
): Promise<RecipeResponse | null> =>
  await api.post('/api/v1/recipe', { json: data }).json();

export const createRecipeRecord = async (
  data: CreateRecipeRecordDto
): Promise<RecipeResponse | null> =>
  await api.post('/api/v1/recipe/record', { json: data }).json();

export const updateRecipeRecord = async (
  recordId: string,
  data: CreateRecipeRecordDto
): Promise<RecipeResponse | null> =>
  await api.patch(`/api/v1/recipe/record/${recordId}`, { json: data }).json();
