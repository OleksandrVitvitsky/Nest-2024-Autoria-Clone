import { MigrationInterface, QueryRunner } from "typeorm";

export class AÐÐddTimeStampForCol1726519511919 implements MigrationInterface {
    name = 'AÐÐddTimeStampForCol1726519511919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "ads" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "ads" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ads" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ads" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "ads" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "ads" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ads" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ads" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
