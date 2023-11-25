import { ApiProperty } from '@nestjs/swagger';

export class CreateDrinkDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  servingAmount: number;

  @ApiProperty()
  servingSize: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  category?: string;

  @ApiProperty()
  imgUrl?: string;
}
