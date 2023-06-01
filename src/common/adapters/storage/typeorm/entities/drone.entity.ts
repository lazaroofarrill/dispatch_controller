import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Drone } from '../../../../../modules/drones/models/drone.model'
import { DroneModelEnum } from '../../../../../modules/drones/enums/drone-model.enum'
import { DroneStateEnum } from '../../../../../modules/drones/enums/drone-state.enum'

@Entity()
export class DroneEntity implements Drone {
  @PrimaryGeneratedColumn({ type: 'integer' })
  batteryCapacity: number

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'enum', enum: DroneModelEnum })
  model: DroneModelEnum

  @Column('varchar')
  serialNumber: string

  @Column({ type: 'enum', enum: DroneStateEnum })
  state: DroneStateEnum

  @Column({ type: 'double precision' })
  weightLimit: number
}
