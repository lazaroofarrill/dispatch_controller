import { scaffoldTests } from '../../../tests/create-server'
import request from 'supertest'
import express from 'express'
import { randomUUID } from 'crypto'

const { createServer } = scaffoldTests()

let app: express.Application

beforeAll(async () => {
  app = await createServer()
})

it('should fail to get an upload url when providing a not uuid key', async () => {
  await request(app)
    .get(`/media/presigned-url?key=some_invalid_key`)
    .expect(400)
    .expect({ status: 400, message: 'key must be a valid uuid' })
})

it('should redirect to a valid resource when requesting a public url for a file', async () => {
  await request(app).get(`/media/${randomUUID()}`).expect(302)
})
