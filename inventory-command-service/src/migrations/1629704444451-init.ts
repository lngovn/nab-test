import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1629704444451 implements MigrationInterface {
  name = 'init1629704444451';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "branch" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "branch"("name", "code") VALUES ('Computer', 'P001'), ('Monitor','P002'), ('Keyboard','P003'), ('Mouse','P004') RETURNING "id"`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "color" character varying NOT NULL, "code" character varying NOT NULL, "price" double precision NOT NULL, "branch_id" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_79a52c9b7de68257eda80c10215" FOREIGN KEY ("branch_id") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_79a52c9b7de68257eda80c10215"`,
    );
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "branch"`);
  }
}
