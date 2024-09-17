import { MigrationInterface, QueryRunner } from "typeorm";

export class  фaddUserIsActive1726586933916 implements MigrationInterface {
    name = ' фaddUserIsActive1726586933916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
    }

}
