import {Service} from "typedi";
import {validateInput, validateOutput} from "../../common/validation/validator";
import {
    InMemoryDroneRepository
} from "./repositories/in-memory-drone-repository";
import {BadRequestException} from "../../common/exceptions/HttpExceptions";
import {isUUID} from "class-validator";
import {CreateDroneDto} from "./dtos/create-drone.dto";
import {Drone} from "./models/drone.schema";
import {GetBatteryLevelDto} from "./dtos/get-battery-level.dto";


@Service()
export class DroneService {
    constructor(private readonly droneRepository: InMemoryDroneRepository) {
    }

    async registerDrone(createDroneDto: CreateDroneDto) {
        await validateInput(CreateDroneDto, createDroneDto)

        const newDrone = Object.assign(
            new Drone(),
            createDroneDto)


        return this.droneRepository.save(newDrone)
    }

    async getAvailableDrones() {
        return this.droneRepository.getAvailableDrones()
    }

    async checkBatteryLevel(droneId: string) {
        if (!isUUID(droneId)) {
            throw new BadRequestException('droneId must be a valid UUID')
        }

        const drone = await this.droneRepository.findById(droneId)

        if (!drone) {
            throw new BadRequestException(`Drone with id: "${droneId}" not found`)
        }

        const batteryLevelDto: GetBatteryLevelDto = {
            batteryCapacity: drone.batteryCapacity
        }
        await validateOutput(GetBatteryLevelDto, batteryLevelDto)
        return batteryLevelDto
    }
}
