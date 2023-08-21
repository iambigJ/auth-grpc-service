import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1691930094047 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table if not exists "Users"
      (
          id              uuid not null primary key DEFAULT uuid_generate_v4(),
          payer_id        bigserial unique,
          plan_id         uuid references "Plans" on delete set null,
          mobile          varchar(255) constraint "Users_mobile_key1" unique,
          role            varchar(255) not null,
          password        text,
          profile         jsonb,
          "createdAt"     timestamp not null default CURRENT_TIMESTAMP,
          "updatedAt"     timestamp,
          "deletedAt"     timestamp,
          email           varchar(255) unique,
          "emailVerified" boolean default false,
          "referralCode"  text default substr(md5((random())::text), 1, 8) not null unique
      );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "user"
      `);
  }
}
