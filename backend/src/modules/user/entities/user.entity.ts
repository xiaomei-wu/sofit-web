import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ required: false, nullable: true })
  nickName: string | null;

  @ApiProperty({ required: false, nullable: true })
  firstName: string | null;

  @ApiProperty({ required: false, nullable: true })
  lastName: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class JWTResponse {
  @ApiProperty()
  sub: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  iat: number;
}
