import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsersTable1735049409361 implements MigrationInterface {
  name = 'AddUsersTable1735049409361';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Users" (
        "id" uuid NOT NULL, 
        "email" text NOT NULL, 
        "password" text NOT NULL, 
        "roles" text array NOT NULL DEFAULT '{user}', 
        CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), 
        CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id")
    )`,
    );

    await queryRunner.query(
      `INSERT INTO "public"."Users"("id", "email", "password", "roles") 
        VALUES (
        	'616b4b30-5b1c-4320-9b3a-98ba7ffda1bc', 
        	'user@test.com', 
        	'$2b$10$PxX1meE.ZSp1VK6dyEpCYuPRdFCljRFwyuII/jeC8PHXNRwvDemLC', 
        	'{user}'
        ) `,
    );

    await queryRunner.query(
      `INSERT INTO "public"."Users"("id", "email", "password", "roles") 
        VALUES (
        	'7e2af159-ab1a-431f-bd88-6cd9f37b5952', 
        	'admin@test.com', 
        	'$2b$10$uIWiqL6UINEgXVDcpyi/hukLQm6I6SF1BUUwSLG0lcH1h3/7r3Bju', 
        	'{admin,user}'
        )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "Users"`);
  }
}
