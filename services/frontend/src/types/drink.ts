import { DrinkCategory } from '@/components/FeatureEntries/Drink/Drink.helper';

export interface Drink {
  uuid: string;
  name: string;
  servingAmount: number;
  servingSize: string;
  date: Date;
  startTime: Date;
  category: DrinkCategory;
  imgUrl: string | null;
  userId: string;
}
