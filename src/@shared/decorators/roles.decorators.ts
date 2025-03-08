import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../enums';

export const ROLES_KEY = 'roles';

export type RoleDecorators = {
  roles: RoleEnum[];
};

export const Roles = (roles: RoleDecorators) => SetMetadata(ROLES_KEY, [roles]);
