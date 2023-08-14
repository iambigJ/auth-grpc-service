import { MigrationInterface, QueryRunner } from 'typeorm';

export class Plan1691929899197 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    create table if not exists "Plans"
    (
        id          uuid not null primary key DEFAULT uuid_generate_v4(),
        name        varchar(255)  not null unique,
        data        jsonb     not null,
        "createdAt" timestamp not null,
        "updatedAt" timestamp,
        "deletedAt" timestamp
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "plan"
        `);
  }
}
