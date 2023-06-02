import { Service } from 'typedi'

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

    return `\x1b[32m${timestamp} | \x1b[0m${JSON.stringify(message)}`
  }
}
