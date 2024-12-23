import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsersTable1734957815096 implements MigrationInterface {
    name = 'AddUsersTable1734957815096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "refresh_token" text NOT NULL, "roles" text array NOT NULL DEFAULT '{user}', CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
