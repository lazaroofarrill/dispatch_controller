import {Container, Service} from "typedi";
import {validateDto} from "../../common/validation/validator";
import {CreateDroneDto} from "./dto/create-drone.dto";
import {DroneRepository} from "./repositories/drone-repository";
import {Drone} from "./model/drone.schema";
import {
    InMemoryDroneRepository
} from "./repositories/in-memory-drone-repository";

Container.set(DroneRepository, Container.get(InMemoryDroneRepository))

@Service()
export class DroneService {
    constructor(private readonly droneRepository: DroneRepository) {
    }

    async registerDrone(createDroneDto: CreateDroneDto) {
        await validateDto(CreateDroneDto, createDroneDto)

        const newDrone = new Drone(createDroneDto)

        return this.droneRepository.save(newDrone)
    }
}
