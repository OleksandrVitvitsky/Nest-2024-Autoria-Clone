import { MigrationInterface, QueryRunner } from "typeorm";

export class  фÐфaddDealers1726577129936 implements MigrationInterface {
    name = ' фÐфaddDealers1726577129936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dealer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, CONSTRAINT "UQ_829a7e7b01e2bcccae9e122067e" UNIQUE ("name"), CONSTRAINT "PK_1bd6073e224f6c22ff1d5827add" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "dealerId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD "dealerId" uuid`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_2a65b7959dfb903d539a1c13d65" FOREIGN KEY ("dealerId") REFERENCES "dealer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_3f0bafe01288ec83331616e52d4" FOREIGN KEY ("dealerId") REFERENCES "dealer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_3f0bafe01288ec83331616e52d4"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_2a65b7959dfb903d539a1c13d65"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "dealerId"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "dealerId"`);
        await queryRunner.query(`DROP TABLE "dealer"`);
    }

}
