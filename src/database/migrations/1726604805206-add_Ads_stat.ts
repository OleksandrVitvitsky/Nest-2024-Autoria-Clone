import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdsStat1726604805206 implements MigrationInterface {
    name = 'AddAdsStat1726604805206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ads_views" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "viewDate" TIMESTAMP NOT NULL DEFAULT now(), "adId" uuid, CONSTRAINT "PK_f5be310e71e69e63062658a19b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ads_views" ADD CONSTRAINT "FK_a9c7f7a02f701d8ce6dd56d6837" FOREIGN KEY ("adId") REFERENCES "ads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ads_views" DROP CONSTRAINT "FK_a9c7f7a02f701d8ce6dd56d6837"`);
        await queryRunner.query(`DROP TABLE "ads_views"`);
    }

}
