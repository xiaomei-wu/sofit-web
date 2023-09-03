import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(user: CreateUserDto) {
    return await this.prisma.user.create({ data: user });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findFirst({ where: { email } });
  }

  async findOneById(uuid: string) {
    return await this.prisma.user.findUnique({ where: { uuid } });
  }
}
