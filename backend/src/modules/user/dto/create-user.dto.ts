import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class Token {
  @ApiProperty()
  accessToken: string;
}
