import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdsEditQuantity1726601287921 implements MigrationInterface {
    name = 'AddAdsEditQuantity1726601287921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads" ADD "editQuantity" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads" DROP COLUMN "editQuantity"`);
    }

}
