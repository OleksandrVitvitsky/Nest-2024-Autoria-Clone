import { MigrationInterface, QueryRunner } from "typeorm";

export class  фÐфaddDealers21726577224484 implements MigrationInterface {
    name = ' фÐфaddDealers21726577224484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_2a65b7959dfb903d539a1c13d65"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_3f0bafe01288ec83331616e52d4"`);
        await queryRunner.query(`CREATE TABLE "dealers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, CONSTRAINT "UQ_63a4c43e7a706d279cf1f911793" UNIQUE ("name"), CONSTRAINT "PK_4d0d8be9eac6e1822ad16d21194" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_2a65b7959dfb903d539a1c13d65" FOREIGN KEY ("dealerId") REFERENCES "dealers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_3f0bafe01288ec83331616e52d4" FOREIGN KEY ("dealerId") REFERENCES "dealers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_3f0bafe01288ec83331616e52d4"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_2a65b7959dfb903d539a1c13d65"`);
        await queryRunner.query(`DROP TABLE "dealers"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_3f0bafe01288ec83331616e52d4" FOREIGN KEY ("dealerId") REFERENCES "dealer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_2a65b7959dfb903d539a1c13d65" FOREIGN KEY ("dealerId") REFERENCES "dealer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
