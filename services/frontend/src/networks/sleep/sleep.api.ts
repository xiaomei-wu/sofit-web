import { api } from '../utils';
import { CreateSleepDto } from './sleep.dto';

export const fetchSleep = async () => {
  return await api.get('/api/v1/sleep').json();
};

export const createSleep = async ({
  createSleepDto
}: {
  createSleepDto: CreateSleepDto;
}) => {
  try {
    const createdSleep = await api
      .post('/api/v1/sleep', { json: createSleepDto })
      .json();
    return createdSleep;
  } catch (error) {
    throw new Error('Failed to create sleep');
  }
};

export const updateSleep = async ({
  uuid,
  updateSleepDto
}: {
  uuid: string;
  updateSleepDto: Partial<CreateSleepDto>;
}) => {
  try {
    const updatedSleep = await api
      .patch(`/api/v1/sleep/${uuid}`, { json: updateSleepDto })
      .json();

    return updatedSleep;
  } catch (error) {
    throw new Error('Failed to update drink');
  }
};

export const deleteSleep = async (uuid: string) => {
  return await api.delete(`/api/v1/sleep/${uuid}`);
};
