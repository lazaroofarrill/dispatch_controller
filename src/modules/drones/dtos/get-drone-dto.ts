import { DroneStateEnum } from '../enums/drone-state.enum'
import { DroneModelEnum } from '../enums/drone-model.enum'
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min
} from 'class-validator'
import { Drone } from '../models/drone.model'

export class GetDroneDto implements Partial<Drone> {
  @IsInt()
  batteryCapacity: number

  @IsUUID()
  id: string

  @IsEnum(DroneModelEnum)
  model: DroneModelEnum

  @IsString()
  @MaxLength(100)
  serialNumber: string

  @IsEnum(DroneStateEnum)
  state: DroneStateEnum

  @IsNumber()
  @Max(500)
  @Min(0)
  weightLimit: number
}
