import { Prisma } from '@prisma/client';

import { PrismaBuilder } from 'src/@shared/builders';

import { FilterUsersDto } from '../dto/requests';

export class UsersFilterBuilder extends PrismaBuilder<
  Prisma.UserWhereInput,
  Prisma.UserOrderByWithRelationInput
> {
  private constructor(whereInput: Prisma.UserWhereInput = {}) {
    super(whereInput);
  }

  static fromDto(filters: FilterUsersDto) {
    return new UsersFilterBuilder({
      active: filters.active,
      roleId: filters.roleId,
    });
  }

  addSearch(search: string) {
    this.addWhereInput({
      OR: [{ name: { contains: search } }, { email: { contains: search } }],
    });

    return this;
  }

  protected addWhereInput(input: Prisma.UserWhereInput) {
    this.where = {
      ...this.where,
      ...input,
    };
  }
}
