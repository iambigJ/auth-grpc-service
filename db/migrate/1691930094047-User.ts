import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1691930094047 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "user" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "emailVerified" boolean NOT NULL,
          "referralCode" character varying NOT NULL,
          "payer_id" bigint NOT NULL,
          "plan_id" uuid,
          "mobile" character varying NOT NULL,
          "role" character varying NOT NULL,
          "password" character varying NOT NULL,
          "profile" jsonb NOT NULL DEFAULT '{}',
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
          PRIMARY KEY ("id")
        );
        ALTER TABLE "user" ADD CONSTRAINT "fk_user_plan" 
        FOREIGN KEY ("plan_id") REFERENCES "plan"("id");
        CREATE INDEX "idx_user_plan_id" ON "user" ("plan_id");
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "user"
      `);
  }
}
