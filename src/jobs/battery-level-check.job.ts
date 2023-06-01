import { Container } from 'typedi'
import { Logger } from '../common/logging/logger'
import cron from 'node-cron'

const checkBatteryLevel = () => {
  const logger = Container.get(Logger)
}

//Schedule job to run every minute
cron.schedule(' * * * * *', checkBatteryLevel)
