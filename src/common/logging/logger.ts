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
    return {
      time: new Date().toISOString(),
      message,
    }
  }
}
