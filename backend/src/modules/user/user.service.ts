import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
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
