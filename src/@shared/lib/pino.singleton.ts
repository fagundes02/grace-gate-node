import * as PinoLib from 'pino'
import * as pack from '@root/package.json'

import { NodeEnvironment } from '@app/@shared/environment/environment.types'

export default class PinoSingleton {
  private static _instance: PinoLib.Logger

  private constructor() {}

  public static get logger(): PinoLib.Logger {
    if (!this._instance) {
      const transport = { target: 'pino-pretty', options: { colorize: true } }
      this._instance = PinoLib.pino({
        name: (pack as { name: string }).name,
        level: 'trace',
        transport: process.env.NODE_ENV === NodeEnvironment.DEV ? transport : undefined
      })
    }
    return this._instance
  }
}
