import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { DroneEntity } from './drone.entity'
import { MedicamentEntity } from './medicament.entity'
import { Relation } from 'typeorm/browser'

@Entity('drone_medicament_join')
export class DroneMedicamentJoinEntity {
  @PrimaryColumn()
  droneId: string

  @PrimaryColumn()
  medicamentId: string

  @ManyToOne(() => MedicamentEntity)
  medicament?: Relation<MedicamentEntity>

  @ManyToOne(() => DroneEntity)
  drone?: Relation<DroneEntity>

  @Column('integer')
  quantity: number
}
