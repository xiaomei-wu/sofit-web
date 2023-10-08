import {
  createSymptom,
  deleteSymptom,
  fetchSymptom,
  updateSymptom
} from '@/networks/symptom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const SYMPTOM = 'SYMPTOM';

export const useCreateSymptomData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [SYMPTOM],
    mutationFn: createSymptom,
    onSettled: () => {
      queryClient.invalidateQueries([SYMPTOM]);
    },
  });
};

export const useGetSymptomData = () => {
  return useQuery({
    queryKey: [SYMPTOM],
    queryFn: fetchSymptom,
  });
};

export const useDeleteSymptomData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [SYMPTOM],
    mutationFn: deleteSymptom,
    onSettled: () => {
      queryClient.invalidateQueries([SYMPTOM]);
    },
  });
};

export const useUpdateSymptomData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [SYMPTOM],
    mutationFn: updateSymptom,
    onSettled: () => {
      queryClient.invalidateQueries([SYMPTOM]);
    },
  });
};
