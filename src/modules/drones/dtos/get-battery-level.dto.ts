import { IsInt, Max, Min } from 'class-validator'

export class GetBatteryLevelDto {
  @IsInt()
  @Min(0)
  @Max(100)
  batteryCapacity: number
}
