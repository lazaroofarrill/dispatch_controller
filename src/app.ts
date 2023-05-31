import express from 'express'
import 'reflect-metadata'
import {appRouter} from "./modules/router";
import {exceptionsFilter} from "./common/filters/exceptions-filter";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json()

const app = express()

app.use(jsonParser)
app.use('/', appRouter)
app.use(exceptionsFilter)

console.log('Starting app in port 3000')
app.listen(3000)
