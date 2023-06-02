import { Service } from 'typedi'
import { DroneService } from './drone.service'
import { CreateDroneDto } from './dtos/create-drone.dto'
import { validateOutput } from '../../common/validation/validator'
import { GetDroneDto } from './dtos/get-drone-dto'

@Service()
export class DroneController {
  constructor(private readonly droneService: DroneService) {}

  registerDrone(createDroneDto: CreateDroneDto) {
    return this.droneService
      .registerDrone(createDroneDto)
      .then((drone) => validateOutput(GetDroneDto, drone).then(() => drone))
  }

  loadItem(droneId: string, medicamentId: string) {
    return this.droneService.loadItem(droneId, medicamentId)
  }

  checkLoadedItems(droneId: string) {
    return this.droneService.checkLoadedItems(droneId)
  }

  checkAvailableDrones() {
    return this.droneService.getAvailableDrones()
  }

  checkBatteryLevel(droneId: string) {
    return this.droneService.checkBatteryLevel(droneId)
  }
}
