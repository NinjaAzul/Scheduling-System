import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure';
import { Prisma } from '@prisma/client';
import { UsersFilterBuilder } from './buiders';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createUserDto: Prisma.UserCreateInput) {
    return await this.prismaService.user.create({
      data: createUserDto,
    });
  }

  async findAll(usersFilterBuilder: UsersFilterBuilder) {
    const { where, orderBy, pagination } = usersFilterBuilder.build();

    const users = await this.prismaService.user.findMany({
      where,
      orderBy,
      take: pagination.take,
      skip: pagination.skip,
      select: {
        id: true,
        name: true,
        email: true,
        active: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    return { users, pagination };
  }

  async findOne(id: number) {
    return await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        active: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.user.delete({
      where: { id },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        active: true,
        password: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async count(usersFilterBuilder: UsersFilterBuilder) {
    const { where } = usersFilterBuilder.build();

    return await this.prismaService.user.count({ where });
  }
}
