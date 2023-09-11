import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserSeed1694432405884 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const plan = await queryRunner.query(
      'SELECT * FROM "Plans" where name=\'default\';',
    );
    const profile = JSON.stringify({
      firstName: 'test',
      lastName: 'testian',
      email: 'test@gmail.com',
      defaultAiModel: 'test',
    });
    await queryRunner.query(
      `insert into "Users" (id, payer_id, plan_id, mobile, role, password, profile, "createdAt", "updatedAt", "deletedAt", email,
          "emailVerified", "referralCode")
        values
        (
          uuid_generate_v4(),
          1000,
          '${plan[0].id}',
          '0912111111',
          'admin',
          '$2b$10$CF5UiIf6e7juF4KyC58rXen8Oj.zD55TID5sF0YNg3ib7nH3E4W/W',
          '${profile}',
          CURRENT_TIMESTAMP,
          CURRENT_TIMESTAMP,
          null,
          'test@gmail.com',
          true,
          'ccc12346vgjv'
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
