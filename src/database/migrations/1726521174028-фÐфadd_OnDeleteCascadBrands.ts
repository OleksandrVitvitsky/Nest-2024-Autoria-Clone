import { MigrationInterface, QueryRunner } from "typeorm";

export class  фÐфaddOnDeleteCascadBrands1726521174028 implements MigrationInterface {
    name = ' фÐфaddOnDeleteCascadBrands1726521174028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_cf9b1f1ecfc160c61dbbe15995f"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_cf9b1f1ecfc160c61dbbe15995f" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_cf9b1f1ecfc160c61dbbe15995f"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_cf9b1f1ecfc160c61dbbe15995f" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
