import { Prisma } from '@prisma/client';
import { UpdateUserDto } from '../dto/requests';

export class UsersUpdateBuilder {
  private input: Prisma.UserUpdateInput;

  constructor(dto: UpdateUserDto) {
    this.input = {};
    if (dto.name) this.input.name = dto.name;
    if (dto.email) this.input.email = dto.email;
    if (dto.roleId) this.input.role = { connect: { id: dto.roleId } };
  }

  public build(): Prisma.UserUpdateInput {
    return this.input;
  }
}
