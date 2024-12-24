import { SetMetadata } from '@nestjs/common';
import { UserRolesType } from 'src/db/entities/users.entity';

export const Roles = (...roles: UserRolesType[]) =>
  SetMetadata('required_roles', roles);
