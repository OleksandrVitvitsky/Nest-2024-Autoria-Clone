import { MigrationInterface, QueryRunner } from "typeorm";

export class AdÑdTables11726516389166 implements MigrationInterface {
    name = 'AdÑdTables11726516389166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "brands" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_96db6bbbaa6f23cad26871339b" ON "brands" ("name") `);
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "brandId" uuid, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bba34af5c8f612cc048f2c9ec8" ON "cars" ("name") `);
        await queryRunner.query(`CREATE TABLE "ads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" text NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "currency" "public"."ads_currency_enum" NOT NULL, "location" text NOT NULL, "condition" text NOT NULL, "year" integer NOT NULL, "mileage" integer NOT NULL, "photos" text, "modelId" uuid, "userId" uuid, CONSTRAINT "PK_a7af7d1998037a97076f758fc23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "refreshToken" text NOT NULL, "deviceId" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9769b295a8d670435ce210ba15" ON "refresh_tokens" ("deviceId") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userName" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "phone" text, "image" text, "role" "public"."users_role_enum" NOT NULL, "accountType" "public"."users_accounttype_enum" NOT NULL DEFAULT 'basic', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_cf9b1f1ecfc160c61dbbe15995f" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ads" ADD CONSTRAINT "FK_66dee3f23f07a1e0b4d83e4d58e" FOREIGN KEY ("modelId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ads" ADD CONSTRAINT "FK_e72da72588dc5b91427a9adda71" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`ALTER TABLE "ads" DROP CONSTRAINT "FK_e72da72588dc5b91427a9adda71"`);
        await queryRunner.query(`ALTER TABLE "ads" DROP CONSTRAINT "FK_66dee3f23f07a1e0b4d83e4d58e"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_cf9b1f1ecfc160c61dbbe15995f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9769b295a8d670435ce210ba15"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "ads"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bba34af5c8f612cc048f2c9ec8"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_96db6bbbaa6f23cad26871339b"`);
        await queryRunner.query(`DROP TABLE "brands"`);
    }

}
