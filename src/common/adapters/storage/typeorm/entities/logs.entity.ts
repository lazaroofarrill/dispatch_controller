import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export enum LogLevel {
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  ERROR = 'ERROR',
  LOG = 'LOG',
  WARNING = 'WARNING'
}

@Entity('logs')
export class LogsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('timestamp')
  time: Date

  @Column('enum', { enum: LogLevel })
  logLevel: LogLevel

  @Column('text')
  message: string
}
