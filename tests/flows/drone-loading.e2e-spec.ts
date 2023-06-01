import express, { Express } from "express"
import { appRouter } from "../../src/modules/router"
import request from "supertest"
import { CreateDroneDto } from "../../src/modules/drones/dtos/create-drone.dto"
import { DroneModelEnum } from "../../src/modules/drones/enums/drone-model.enum"
import { DroneStateEnum } from "../../src/modules/drones/enums/drone-state.enum"
import { isUUID } from "class-validator"
import {
  CreateMedicamentDto
} from "../../src/modules/medicaments/dtos/create-medicament.dto"
import {
  Medicament
} from "../../src/modules/medicaments/models/medicament.model"
import { randomUUID } from "crypto"

let app: Express

beforeEach(() => {
  app = express()
  app.use(appRouter)
})

describe("Load Drone", function() {
  it("should load a drone with medicine", async () => {
    const createDroneDtos: CreateDroneDto[] = [
      {
        batteryCapacity: 100,
        model: DroneModelEnum.Heavyweight,
        serialNumber: randomUUID(),
        state: DroneStateEnum.IDLE,
        weightLimit: 500
      },
      {
        batteryCapacity: 80,
        model: DroneModelEnum.Lightweight,
        serialNumber: randomUUID(),
        state: DroneStateEnum.IDLE,
        weightLimit: 100
      },
      {
        batteryCapacity: 80,
        model: DroneModelEnum.Lightweight,
        serialNumber: randomUUID(),
        state: DroneStateEnum.IDLE,
        weightLimit: 100
      }
    ]

    //Register drone
    const [drone1, drone2] = await Promise.all(
      createDroneDtos.map(
        createDroneDto =>
          request(app)
            .post("/drones")
            .send(createDroneDto)
            .expect(201)
            .then(response => response.body))
    )

    expect(isUUID(drone1.id)).toBe(true)
    expect(drone1).toMatchObject(createDroneDtos[0])

    const createMedicamentsDtos: CreateMedicamentDto[] = [
      {
        code: "CZP_01", image: "picsum/1", name: "Clonazepam", weight: 250
      },
      {
        code: "VCT", image: "picsum/2", name: "Victorious", weight: 35
      }
    ]

    //Create medicaments
    const createdMedicaments: Medicament[] = await Promise.all(
      createMedicamentsDtos.map((medicamentDto) => {
        return request(app)
          .post("/medicaments")
          .send(medicamentDto)
          .expect(201)
          .then((result) => {
            return result.body
          })

      }))

    expect(createdMedicaments.length).toBe(2)
    expect(createdMedicaments[0]).toMatchObject(createMedicamentsDtos[0])
    expect(createdMedicaments[1]).toMatchObject(createMedicamentsDtos[1])

    // Load Drone
    await request(app)
      .patch(`/drones/${drone1.id}/items/load/${createdMedicaments[0].id}`)
      .expect(200)
      .expect("true")

    //Get available drones
    const { body: loadedItems } = await request(app)
      .get(`/drones/${drone1.id}/items`)
      .expect(200)

    //Exceed drone capacity
    await request(app)
      .patch(`/drones/${drone1.id}/items/load/${createdMedicaments[0].id}`)
      .expect(200)
      .expect("true")

    await request(app)
      .patch(`/drones/${drone1.id}/items/load/${createdMedicaments[0].id}`)
      .expect(400)
      .expect({
        "status": 400,
        "message": "Weight limit of the drone has been reached"
      })
  })
})
