import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Drone } from '../../../../../modules/drones/models/drone.model'
import { DroneModelEnum } from '../../../../../modules/drones/enums/drone-model.enum'
import { DroneStateEnum } from '../../../../../modules/drones/enums/drone-state.enum'
import { DroneMedicamentJoinEntity } from './drone-medicament-join.entity'

@Entity('drones')
export class DroneEntity implements Drone {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'integer' })
  batteryCapacity: number

  @Column({ type: 'enum', enum: DroneModelEnum })
  model: DroneModelEnum

  @Column('varchar', { unique: true })
  serialNumber: string

  @Column({ type: 'enum', enum: DroneStateEnum })
  state: DroneStateEnum

  @Column({ type: 'double precision' })
  weightLimit: number

  @OneToMany(
    () => DroneMedicamentJoinEntity,
    (droneToMedicamentJoin) => droneToMedicamentJoin.drone
  )
  droneMedicamentJoin: DroneMedicamentJoinEntity[]

  toDrone(): Drone {
    const { batteryCapacity, id, model, serialNumber, state, weightLimit } =
      this
    return {
      batteryCapacity,
      id,
      model,
      serialNumber,
      state,
      weightLimit,
    }
  }
}
