import { Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class DroneMedicamentJoinEntity {
  @PrimaryColumn()
  droneId: string

  @PrimaryColumn()
  medicamentId: string
}
