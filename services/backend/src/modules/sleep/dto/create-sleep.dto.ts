import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSleepDto {
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  startTime: Date;

  @ApiProperty()
  @IsString()
  notes: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  durationSeconds: number;
}
