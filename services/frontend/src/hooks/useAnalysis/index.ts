import {
  getIndividualTextLineNutritionAnalysis,
  updateFoodRecordNutritionData,
} from '@/networks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const GET_NUTRITION_ANALYSIS_EDAMAM = 'GET_NUTRITION_ANALYSIS_EDAMAM';
export const GET_NUTRITION_ANALYSIS = 'GET_NUTRITION_ANALYSIS';
export const UPDATE_NUTRITION_ANALYSIS = 'UPDATE_NUTRITION_ANALYSIS';

export const useGetNutritionDataFromEdamam = ({ query, enabled }) => {
  return useQuery({
    queryKey: [GET_NUTRITION_ANALYSIS_EDAMAM],
    queryFn: () => getIndividualTextLineNutritionAnalysis(query),
    enabled: !!query && enabled,
    retry: false,
  });
};

export const useUpdateNutritionData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [UPDATE_NUTRITION_ANALYSIS],
    mutationFn: updateFoodRecordNutritionData,
    onSettled: () => {
      queryClient.invalidateQueries([UPDATE_NUTRITION_ANALYSIS]);
    },
  });
};
