import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

export enum UserRoles {
  admin = 'admin',
  user = 'user',
  unknown = 'unknown',
}

export type UserRolesType = `${UserRoles}`;

@Entity({
  schema: 'public',
  name: 'Users',
})
@Unique(['email'])
export class UsersEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  password: string;

  //TODO: Убрать
  @Column({ type: 'text', nullable: true })
  refreshToken: string;

  @Column({ type: 'text', array: true, default: `{${UserRoles.user}}` })
  roles: string[];
}
