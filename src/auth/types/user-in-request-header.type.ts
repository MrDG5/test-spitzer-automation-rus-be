import { UserRolesType } from 'src/db/entities/users.entity';

export type UserInRequestHeader = {
  id: string;
  email: string;
  roles: UserRolesType[];
};
