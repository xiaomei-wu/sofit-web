export type CreateDrinkDto = {
  name: string;
  servingAmount: number;
  servingSize: string;
  date: Date;
  startTime: Date;
  category?: string;
  imgUrl?: string;
};
