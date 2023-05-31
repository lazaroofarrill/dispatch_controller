import {Service} from "typedi";
import {validateDto} from "../../common/validation/validator";
import {CreateDroneDto} from "./dto/create-drone.dto";
import {Drone} from "./model/drone.schema";
import {
    InMemoryDroneRepository
} from "./repositories/in-memory-drone-repository";


@Service()
export class DroneService {
    constructor(private readonly droneRepository: InMemoryDroneRepository) {
    }

    async registerDrone(createDroneDto: CreateDroneDto) {
        await validateDto(CreateDroneDto, createDroneDto)

        const newDrone = Object.assign(
            new Drone(createDroneDto),
            createDroneDto)


        return this.droneRepository.save(newDrone)
    }

    async getAvailableDrones() {
        return this.droneRepository.getAvailableDrones()
    }
}
