import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdsIsActive1726594649300 implements MigrationInterface {
    name = 'AddAdsIsActive1726594649300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads" DROP COLUMN "isActive"`);
    }

}
