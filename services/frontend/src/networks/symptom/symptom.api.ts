import { Symptom } from '@/types/symptom';
import { api } from '../utils';
import { CreateSymptomDto } from './symptom.dto';

export const fetchSymptom = async (): Promise<Symptom[] | undefined> => {
  return await api.get('/api/v1/symptoms').json();
};

export const createSymptom = async ({
  createSymptomDto
}: {
  createSymptomDto: CreateSymptomDto;
}) => {
  try {
    const createdSymptom = await api
      .post('/api/v1/symptoms', { json: createSymptomDto })
      .json();
    return createdSymptom;
  } catch (error) {
    throw new Error('Failed to create symptoms');
  }
};

export const updateSymptom = async ({
  uuid,
  updateSymptomDto
}: {
  uuid: string;
  updateSymptomDto: Partial<CreateSymptomDto>;
}) => {
  try {
    const updatedSymptom = await api
      .patch(`/api/v1/symptoms/${uuid}`, { json: updateSymptomDto })
      .json();

    return updatedSymptom;
  } catch (error) {
    throw new Error('Failed to update symptom');
  }
};

export const deleteSymptom = async (uuid: string) => {
  return await api.delete(`/api/v1/symptoms/${uuid}`);
};
