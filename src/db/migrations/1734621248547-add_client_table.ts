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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "Clients"`);
  }
}
