import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

export enum UserRoles {
  admin = 'admin',
  user = 'user',
  unknown = 'unknown',
}

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

  @Column({ type: 'text' })
  refreshToken: string;

  @Column({ type: 'text', array: true, default: `{${UserRoles.user}}` })
  roles: string[];
}
