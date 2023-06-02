import { Logger } from './logger'
import { Service } from 'typedi'
import { DataSource, Repository } from 'typeorm'
import {
  LogLevel,
  LogsEntity
} from '../adapters/storage/typeorm/entities/logs.entity'
import { randomUUID } from 'crypto'

@Service()
export class TypeormLogger extends Logger {
  constructor(dataSource: DataSource) {
    super()
    this.logsRepository = dataSource.getRepository(LogsEntity)
  }

  logsRepository: Repository<LogsEntity>

  info(message: any) {
    return this.writeLog(message, LogLevel.INFO)
  }


  log(message: any) {
    return this.writeLog(message, LogLevel.LOG)
  }

  debug(message: any) {
    return this.writeLog(message, LogLevel.DEBUG)
  }

  error(message: any) {
    return this.writeLog(message, LogLevel.ERROR)
  }

  private writeLog(message: any, logLevel: LogLevel) {
    const newLog: LogsEntity = {
      id: randomUUID(), logLevel: logLevel, message: message, time: new Date()
    }
    return this.logsRepository.save(newLog)
  }
}
