import { Transform } from 'class-transformer';
import { Check, Column, Entity, PrimaryColumn, Unique } from 'typeorm';

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

  @Column({
    type: 'numeric',
    transformer: {
      from(dbNumeric: string): number {
        return Number(dbNumeric);
      },
      to(entityValue: number) {
        return entityValue;
      },
    },
  })
  amount: number;
}
