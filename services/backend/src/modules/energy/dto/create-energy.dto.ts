import { ApiProperty } from '@nestjs/swagger';

export class CreateEnergyDto {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  energyLevel: number;

  @ApiProperty()
  notes: string;
}
