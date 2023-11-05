import { Drink } from './drink';
import { FoodRecord } from './food';
import { Sleep } from './sleep';
import { Symptom } from './symptom';

export interface Histories {
  food: FoodRecord[];
  drink: Drink[];
  sleep: Sleep[];
  symptom: Symptom[];
}
