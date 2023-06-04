import '../common/dependencies'
import { createAppServer } from '../common/create-app-server'
import request from 'supertest'
import { droneSeeds, medicamentSeeds } from './drone.seeder'
import { GetDroneDto } from '../modules/drones/dtos/get-drone-dto'
import { GetMedicamentDto } from '../modules/medicaments/dtos/get-medicament.dto'
import { Container } from 'typedi'
import { DataSource } from 'typeorm'

const dataSource = Container.get(DataSource)

const app = createAppServer()

const runSeeders = async () => {
  const createdDrones: GetDroneDto[] = await Promise.all(
    droneSeeds.map((dto) =>
      request(app)
        .post('/drones/')
        .send(dto)
        .expect(201)
        .then((res) => res.body)
    )
  )

  const createdMedicaments: GetMedicamentDto[] = await Promise.all(
    medicamentSeeds.map((dto) =>
      request(app)
        .post('/medicaments')
        .send(dto)
        .expect(201)
        .then((res) => res.body)
    )
  )

  await Promise.all(
    createdDrones.map((d, idx) =>
      request(app)
        .post(`/drones/${d.id}/items/${createdMedicaments[idx].id}`)
        .expect(200)
    )
  )
}

dataSource
  .initialize()
  .then(() => runSeeders().then(() => console.log('Database seeded')))
