import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateExerciseDto {
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
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  notes: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  intensityLevel: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  durationMinutes: number;
}
