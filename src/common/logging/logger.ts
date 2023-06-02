import { Service } from 'typedi'
import { isObject } from 'class-validator'

@Service()
export class Logger {
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
    if (isObject(message)) {
      message = JSON.stringify(message)
    }

    const timestamp = new Date().toISOString()

    return `${timestamp}: ${message}`
  }
}
