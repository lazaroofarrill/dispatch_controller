import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from 'typeorm'
import { DroneEntity } from './drone.entity'
import { MedicamentEntity } from './medicament.entity'

@Entity('drone_medicament_join')
export class DroneMedicamentJoinEntity {
  @PrimaryColumn()
  droneId: string

  @PrimaryColumn()
  medicamentId: string

  @ManyToOne(() => MedicamentEntity, (medicament) => medicament.droneMedicamentJoin)
  medicament?: Relation<MedicamentEntity>

  @ManyToOne(() => DroneEntity, (drone) => drone.droneMedicamentJoin)
  drone?: Relation<DroneEntity>

  @Column('integer')
  quantity: number
}
