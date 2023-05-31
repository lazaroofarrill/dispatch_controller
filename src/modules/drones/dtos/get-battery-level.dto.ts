import {IsInt, Max, Min} from "class-validator";
import {Drone} from "../models/drone.schema";

export class GetBatteryLevelDto implements Partial<Drone> {
    @IsInt()
    @Min(0)
    @Max(100)
    batteryCapacity: number
}
