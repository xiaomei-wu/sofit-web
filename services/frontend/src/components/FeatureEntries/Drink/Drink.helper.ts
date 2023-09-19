export const options = [
  'Alcoholic',
  'Non_Alcoholic',
  'Ordinary_Drink',
  'Cocktail',
];

export enum DrinkCategory {
  ALCOHOLIC = 'Alcoholic',
  NON_ALCOHOLIC = 'Non_Alcoholic',
  ORDINARY_DRINK = 'Ordinary_Drink',
  COCKTAIL = 'Cocktail',
}

export enum DrinkSearchPrefix {
  A = 'a',
  C = 'c',
}

export const drinkCategoryOptions = [
  { value: DrinkCategory.ALCOHOLIC, label: 'Alcoholic' },
  { value: DrinkCategory.NON_ALCOHOLIC, label: 'Non-alcoholic' },
  { value: DrinkCategory.COCKTAIL, label: 'Cocktail' },
  { value: DrinkCategory.ORDINARY_DRINK, label: 'Ordinary drink' },
];
