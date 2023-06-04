import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator'
import { DroneModelEnum } from '../enums/drone-model.enum'
import { DroneStateEnum } from '../enums/drone-state.enum'

export class UpdateDroneDto {
  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  batteryCapacity?: number

  @IsEnum(DroneModelEnum)
  @IsOptional()
  model?: DroneModelEnum

  @IsString()
  @MaxLength(100)
  @IsOptional()
  serialNumber?: string

  @IsEnum(DroneStateEnum)
  @IsOptional()
  state?: DroneStateEnum

  @IsNumber()
  @Max(500)
  @Min(0)
  @IsOptional()
  weightLimit?: number
}
