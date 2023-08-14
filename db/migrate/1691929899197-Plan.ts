import { MigrationInterface, QueryRunner } from 'typeorm';

export class Plan1691929899197 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE "plan" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "name" character varying NOT NULL,
      "data" jsonb NOT NULL DEFAULT '{}',
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      CONSTRAINT "UQ_name" UNIQUE ("name"),
      PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "plan"
        `);
  }
}
