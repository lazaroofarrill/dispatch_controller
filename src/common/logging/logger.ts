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
    const timestamp = new Date().toISOString()
    if (isObject(message)) {
      return `\x1b[32m${timestamp}
      _________________________________________________________
      \x1b[0m${message}`
    } else {
      return `\x1b[32m${new Date().toISOString()}: \x1b[0m${message}`
    }
  }
}
