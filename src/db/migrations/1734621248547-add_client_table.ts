import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddClientTable1734621248547 implements MigrationInterface {
  name = 'AddClientTable1734621248547';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Clients" (
        "id" uuid NOT NULL, 
        "name" text NOT NULL, 
        "email" text NOT NULL, 
        "amount" numeric NOT NULL, 
        CONSTRAINT "UQ_38fd02fc8a88ed82f0c1e6eee4e" UNIQUE ("email"), 
        CONSTRAINT "CHK_bebd3a7a37dc68f8fc19cd34c9" CHECK (amount <> 0), 
        CONSTRAINT "PK_8dadaa0dc6305d95e1d1a6b9544" PRIMARY KEY ("id")
    )`,
    );

    await queryRunner.query(
      `INSERT INTO "public"."Clients"(
         	"id",
         	"name",
         	"email",
         	"amount"
       )
       VALUES 
       ('04b263ca-537f-46c8-8ae6-74a3e6355516', 'Bob',	'bob@automation.rus', 1),
       ('92aff15d-febc-47db-a48e-aa4f1c276a6b', 'Аlex', 'alex@automation.rus', 12),
       ('6b378acc-5948-4c5e-ae65-d412c6d7b037', 'Аlisa', 'alisa@automation.rus', -21),
       ('718968a4-2eeb-49bd-b3b9-19b7538a33c2', 'John', 'john@automation.rus', 2),
       ('02541a7a-d463-4690-ba54-7fce7c77c865', 'Kate', 'kate@automation.rus', 3)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "Clients"`);
  }
}
