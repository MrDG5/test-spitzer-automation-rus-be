import {
  BeforeInsert,
  Check,
  Column,
  Entity,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({
  schema: 'public',
  name: 'Clients',
})
@Unique(['email'])
@Check('amount <> 0')
export class ClientsEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'numeric' })
  amount: number;
}
