import express from "express"
import "reflect-metadata"
import { appRouter } from "./modules/router"

const app = express()


app.use("/", appRouter)

console.log("Starting app in port 3000")
app.listen(3000)
