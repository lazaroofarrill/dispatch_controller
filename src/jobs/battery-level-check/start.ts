import './dependencies'
import { Container } from 'typedi'
import { Logger } from '../../common/logging/logger'
import cron from 'node-cron'
import { DataSource } from 'typeorm'
import { checkBatteryLevel } from './check-battery-level'

const logger = Container.get(Logger)
const dataSource = Container.get(DataSource)

//Schedule job to run every minute
dataSource.initialize().then(() => {
  logger.info('Starting service')
  cron.schedule('* * * * *', checkBatteryLevel, { runOnInit: true })
})
