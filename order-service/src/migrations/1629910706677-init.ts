import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1629910706677 implements MigrationInterface {
  name = 'init1629910706677';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ordered_item" ("id" SERIAL NOT NULL, "product_id" integer NOT NULL, "quantity" integer NOT NULL, "order_id" integer, CONSTRAINT "PK_5e6bd38fc51977db42e61d63a18" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" SERIAL NOT NULL, "customer_name" character varying NOT NULL, "customer_phone" character varying NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "ordered_item" ADD CONSTRAINT "FK_d5144196f9ef94620707f9c11f1" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ordered_item" DROP CONSTRAINT "FK_d5144196f9ef94620707f9c11f1"`,
    );
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "ordered_item"`);
  }
}
