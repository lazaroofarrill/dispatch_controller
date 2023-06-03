import { Service } from 'typedi'

@Service()
export class Logger {
  serviceName: string

  constructor(serviceName?: string) {
    this.serviceName = serviceName || Logger.name
  }

  log(message: any) {
    console.log(this.timeStampMessage(message))
  }

  debug(message: any) {
    console.debug(this.timeStampMessage(message))
  }

  info(message: any) {
    console.info(this.timeStampMessage(message))
  }

  error(message: any) {
    console.error(this.timeStampMessage(message))
  }

  private timeStampMessage(message: any) {
    if (typeof message === 'string') {
      message = {
        message,
      }
    }

    const timestamp = new Date().toISOString()

    return `\x1b[32m${timestamp} | \x1b[34m${
      this.serviceName
    } | \x1b[0m${JSON.stringify(message)}`
  }
}
