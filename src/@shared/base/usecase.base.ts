import PinoSingleton from '@app/@shared/lib/pino.singleton'

export default abstract class UseCaseBase {
  protected readonly logger = PinoSingleton.logger
}
