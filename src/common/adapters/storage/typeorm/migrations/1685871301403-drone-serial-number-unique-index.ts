import { MigrationInterface, QueryRunner } from 'typeorm'

export class DroneSerialNumberUniqueIndex1685871301403
  implements MigrationInterface
{
  name = 'DroneSerialNumberUniqueIndex1685871301403'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "drones" ADD CONSTRAINT "UQ_c58fb0d50272dda6c64e7ee3acf" UNIQUE ("serial_number")`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "drones" DROP CONSTRAINT "UQ_c58fb0d50272dda6c64e7ee3acf"`
    )
  }
}
