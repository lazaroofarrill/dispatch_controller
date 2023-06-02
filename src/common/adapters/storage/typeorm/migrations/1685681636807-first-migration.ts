import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1685681636807 implements MigrationInterface {
    name = 'FirstMigration1685681636807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."drones_model_enum" AS ENUM('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight')`);
        await queryRunner.query(`CREATE TYPE "public"."drones_state_enum" AS ENUM('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING')`);
        await queryRunner.query(`CREATE TABLE "drones" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "battery_capacity" integer NOT NULL, "model" "public"."drones_model_enum" NOT NULL, "serial_number" character varying NOT NULL, "state" "public"."drones_state_enum" NOT NULL, "weight_limit" double precision NOT NULL, CONSTRAINT "PK_3137fc855d37186eeccd193569f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "drone_medicament_join" ("drone_id" uuid NOT NULL, "medicament_id" uuid NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_6d0aaf2a9ec97840ded0ce97dac" PRIMARY KEY ("drone_id", "medicament_id"))`);
        await queryRunner.query(`CREATE TABLE "medicaments" ("code" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image" character varying NOT NULL, "name" character varying NOT NULL, "weight" double precision NOT NULL, CONSTRAINT "PK_acdc01abf3788429a19de68cd8f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."logs_log_level_enum" AS ENUM('INFO', 'DEBUG', 'ERROR', 'LOG', 'WARNING')`);
        await queryRunner.query(`CREATE TABLE "logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "time" TIMESTAMP NOT NULL, "log_level" "public"."logs_log_level_enum" NOT NULL, "message" text NOT NULL, CONSTRAINT "PK_fb1b805f2f7795de79fa69340ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "drone_medicament_join" ADD CONSTRAINT "FK_f6a92c6687473509e1734fb9c33" FOREIGN KEY ("medicament_id") REFERENCES "medicaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "drone_medicament_join" ADD CONSTRAINT "FK_2d447816d6b5cdd190bd189a02a" FOREIGN KEY ("drone_id") REFERENCES "drones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drone_medicament_join" DROP CONSTRAINT "FK_2d447816d6b5cdd190bd189a02a"`);
        await queryRunner.query(`ALTER TABLE "drone_medicament_join" DROP CONSTRAINT "FK_f6a92c6687473509e1734fb9c33"`);
        await queryRunner.query(`DROP TABLE "logs"`);
        await queryRunner.query(`DROP TYPE "public"."logs_log_level_enum"`);
        await queryRunner.query(`DROP TABLE "medicaments"`);
        await queryRunner.query(`DROP TABLE "drone_medicament_join"`);
        await queryRunner.query(`DROP TABLE "drones"`);
        await queryRunner.query(`DROP TYPE "public"."drones_state_enum"`);
        await queryRunner.query(`DROP TYPE "public"."drones_model_enum"`);
    }

}
