import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1629947655939 implements MigrationInterface {
  name = 'init1629947655939';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "branch" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "branch"("name","code") VALUES ('Computer','CPT'),('Keyboard','KB'),('Mouse','MS')`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "color" character varying NOT NULL, "code" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "product"("name","color","code") VALUES ('Macbook Pro 2021','silver', 'MBP2021'),('Logitech Mouse','black','LGTM'),('Logitech Keyboard','silver','LGTKB')`,
    );
    await queryRunner.query(
      `CREATE TABLE "item" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "product_id" integer, "branch_id" integer, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD CONSTRAINT "FK_ab25455f602addda94c12635c60" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD CONSTRAINT "FK_6f963df5ab58ce0925b75a777b4" FOREIGN KEY ("branch_id") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_activity_log" ("id" SERIAL NOT NULL, "activity" character varying NOT NULL, "path" character varying NOT NULL, "userId" integer, "args" json, "result" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ca8b900eea707229383724af630" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE VIEW "product_view" AS 
    SELECT p.*, it.price, it.quantity, it.branch_id FROM product p 
    LEFT OUTER JOIN item it ON p.id = it.product_id;`);
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`,
      [
        'VIEW',
        'public',
        'product_view',
        'SELECT p.*, it.price, it.quantity, it.branch_id FROM product p \n  LEFT OUTER JOIN item it ON p.id = it.product_id;',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "schema" = $2 AND "name" = $3`,
      ['VIEW', 'public', 'product_view'],
    );
    await queryRunner.query(`DROP VIEW "product_view"`);
    await queryRunner.query(`DROP TABLE "user_activity_log"`);
    await queryRunner.query(
      `ALTER TABLE "item" DROP CONSTRAINT "FK_6f963df5ab58ce0925b75a777b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP CONSTRAINT "FK_ab25455f602addda94c12635c60"`,
    );
    await queryRunner.query(`DROP TABLE "item"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "branch"`);
  }
}
