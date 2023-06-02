import {
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator'
import { DroneModelEnum } from '../enums/drone-model.enum'
import { DroneStateEnum } from '../enums/drone-state.enum'
import { Drone } from '../models/drone.model'

export class CreateDroneDto implements Partial<Drone> {
  @IsInt()
  @Min(0)
  @Max(100)
  batteryCapacity: number

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
