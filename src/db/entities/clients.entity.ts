import { Check, Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity({
  schema: 'public',
  name: 'Clients',
})
@Unique(['email'])
@Check('amount <> 0')
export class Clients {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'numeric' })
  amount: number;
}
