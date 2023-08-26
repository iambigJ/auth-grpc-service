import { MigrationInterface, QueryRunner } from 'typeorm';

export class PlanSeeder1693038479197 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const data = JSON.stringify({
      unitCost: 400,
      balanceWarning: 20000,
      unitDivision: 15,
      audioSizeLimit: 10,
      audioDurationLimit: 600,
      defaultWalletBalance: 250000,
      apiKeyExpireTime: '90d',
      extension: ['.mp3', '.wav'],
    });
    await queryRunner.query(
      `INSERT INTO "Plans" 
        (id, name, data, "createdAt", "updatedAt")
        VALUES
        (
          uuid_generate_v4(),
          'default',
          '${data}',
          CURRENT_TIMESTAMP,
          CURRENT_TIMESTAMP
    );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
