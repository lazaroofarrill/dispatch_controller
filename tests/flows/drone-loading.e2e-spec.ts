import { Express } from 'express'
import request from 'supertest'
import { CreateDroneDto } from '../../src/modules/drones/dtos/create-drone.dto'
import { DroneModelEnum } from '../../src/modules/drones/enums/drone-model.enum'
import { DroneStateEnum } from '../../src/modules/drones/enums/drone-state.enum'
import { isUUID } from 'class-validator'
import { CreateMedicamentDto } from '../../src/modules/medicaments/dtos/create-medicament.dto'
import { Medicament } from '../../src/modules/medicaments/models/medicament.model'
import { randomUUID } from 'crypto'
import { Drone } from '../../src/modules/drones/models/drone.model'
import * as path from 'path'
import axios from 'axios'
import * as fs from 'fs'
import FormData from 'form-data'
import { scaffoldTests } from '../scaffold-tests'

const { createServer } = scaffoldTests()
let app: Express

beforeAll(async () => {
  app = await createServer()
})

describe('Load Drone', () => {
  jest.setTimeout(10000)

  it('should load a drone with medicine', async () => {
    const createDroneDtos: CreateDroneDto[] = [
      {
        batteryCapacity: 100,
        model: DroneModelEnum.Heavyweight,
        serialNumber: randomUUID(),
        state: DroneStateEnum.IDLE,
        weightLimit: 500,
      },
      {
        batteryCapacity: 80,
        model: DroneModelEnum.Lightweight,
        serialNumber: randomUUID(),
        state: DroneStateEnum.IDLE,
        weightLimit: 100,
      },
      {
        batteryCapacity: 50,
        model: DroneModelEnum.Lightweight,
        serialNumber: randomUUID(),
        state: DroneStateEnum.DELIVERED,
        weightLimit: 500,
      },
    ]

    //Register drone
    const [drone1, drone2, drone3] = (await Promise.all(
      createDroneDtos.map((createDroneDto) =>
        request(app)
          .post('/drones')
          .send(createDroneDto)
          .expect(201)
          .then((response) => response.body)
      )
    )) as Drone[]

    expect(isUUID(drone1.id)).toBe(true)
    expect(drone1).toMatchObject(createDroneDtos[0])

    //Upload medicament images
    const imagePaths = [
      path.resolve('static/img1.png'),
      path.resolve('static/img2.jpg'),
    ]

    const uploadDtos = await Promise.all(
      new Array(2).fill(0).map(() =>
        request(app)
          .get('/media/presigned-url')
          .expect(200)
          .then((result) => {
            expect(result.body).toMatchObject({
              url: expect.any(String),
              key: expect.any(String),
            })
            return {
              url: result.body.url,
              key: result.body.key,
            }
          })
      )
    )

    const uploadImageKeys = await Promise.all(
      uploadDtos.map(async (uploadDto, idx) => {
        const fileName = path.basename(imagePaths[idx])
        const readStream = fs.createReadStream(imagePaths[idx])
        const formData = new FormData()
        formData.append('file', readStream, fileName)
        await axios.put(uploadDto.url, formData).then((response) => {
          expect(response.status).toBe(200)
        })

        return uploadDto.key
      })
    )

    //Create medicaments
    const createMedicamentsDtos: CreateMedicamentDto[] = [
      {
        code: 'CZP_01',
        image: uploadImageKeys[0],
        name: 'Clonazepam',
        weight: 250,
      },
      {
        code: 'VCT',
        image: uploadImageKeys[1],
        name: 'Victorious',
        weight: 35,
      },
    ]

    const createdMedicaments: Medicament[] = await Promise.all(
      createMedicamentsDtos.map((medicamentDto) => {
        return request(app)
          .post('/medicaments')
          .send(medicamentDto)
          .expect(201)
          .then((result) => {
            return result.body
          })
      })
    )

    expect(createdMedicaments.length).toBe(2)
    expect(createdMedicaments[0]).toMatchObject(createMedicamentsDtos[0])
    expect(createdMedicaments[1]).toMatchObject(createMedicamentsDtos[1])

    //Get stored image
    expect(createdMedicaments)

    // Load drone 1
    await request(app)
      .post(`/drones/${drone1.id}/items/${createdMedicaments[0].id}`)
      .expect(200)
      .expect('true')

    //Get available drones
    const { body: loadedItems } = await request(app)
      .get(`/drones/${drone1.id}/items`)
      .expect(200)

    //Exceed drone 1 capacity
    await request(app)
      .post(`/drones/${drone1.id}/items/${createdMedicaments[0].id}`)
      .expect(200)
      .expect('true')

    await request(app)
      .post(`/drones/${drone1.id}/items/${createdMedicaments[0].id}`)
      .expect(400)
      .expect({
        status: 400,
        message: 'Weight limit of the drone has been reached',
      })

    // Unload drone
    await request(app)
      .delete(`/drones/${drone1.id}/items/${createdMedicaments[0].id}`)
      .expect(200)

    await request(app)
      .delete(`/drones/${drone1.id}/items/${createdMedicaments[0].id}`)
      .expect(200)

    //Fail when trying to unload below 0
    await request(app)
      .delete(`/drones/${drone1.id}/items/${createdMedicaments[0].id}`)
      .expect(400)
      .expect({ status: 400, message: 'This item is not loaded in the drone' })

    //Check battery level for drone 2
    await request(app).get(`/drones/${drone2.id}/battery`).expect(200).expect({
      batteryCapacity: drone2.batteryCapacity,
    })

    //Input invalid id when checking battery level
    await request(app)
      .get(`/drones/invalid-uuid/battery`)
      .expect(400)
      .expect({ status: 400, message: 'droneId must be a valid UUID' })

    // List medicaments
    await request(app)
      .get('/medicaments')
      .expect(200)
      .then((result) => {
        expect(result.body.map((m: Medicament) => m.id).sort()).toEqual(
          createdMedicaments.map((m) => m.id).sort()
        )
      })

    // List available drones
    await request(app)
      .get('/drones/available')
      .expect(200)
      .then(({ body }) => {
        expect(body.map((b: any) => b.id).sort()).toEqual(
          [drone1, drone2].map((d) => d.id).sort()
        )
      })
  })
})
