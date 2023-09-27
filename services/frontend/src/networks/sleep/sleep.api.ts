import ky from 'ky-universal';
import { CreateSleepDto } from './index';

export const fetchSleep = async () => {
  return await ky('/api/v1/sleep').json();
};

export const createSleep = async ({
  createSleepDto,
}: {
  createSleepDto: CreateSleepDto;
}) => {
  try {
    const createdSleep = await ky
      .post('/api/v1/sleep', { json: createSleepDto })
      .json();
    return createdSleep;
  } catch (error) {
    throw new Error('Failed to create sleep');
  }
};

export const updateSleep = async ({
  uuid,
  updateSleepDto,
}: {
  uuid: string;
  updateSleepDto: Partial<CreateSleepDto>;
}) => {
  try {
    const updatedSleep = await ky
      .patch(`/api/v1/sleep/${uuid}`, { json: updateSleepDto })
      .json();

    return updatedSleep;
  } catch (error) {
    throw new Error('Failed to update drink');
  }
};

export const deleteSleep = async (uuid: string) => {
  return await ky.delete(`/api/v1/sleep/${uuid}`);
};
