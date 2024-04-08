import { type Environment, environmentSchema } from '@app/@shared/environment/environment.types'
import PinoSingleton from '@app/@shared/lib/pino.singleton'

const logger = PinoSingleton.logger

export function loadEnv(): Environment | never {
  try {
    return environmentSchema.parse(process.env)
  } catch (error) {
    const message = 'Invalid environment variables'
    logger.error({ message, error })
    throw new Error(message)
  }
}
