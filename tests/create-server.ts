import express from "express"
import { appRouter } from "../src/modules/router"
import { exceptionsFilter } from "../src/common/filters/exceptions-filter"

export function createServer() {
  const app = express()
  app.use(appRouter)
  app.use(exceptionsFilter)
  return app
}
