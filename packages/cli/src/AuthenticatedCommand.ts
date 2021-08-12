import { flags } from '@oclif/command'
import BaseCommand from './BaseCommand'
import { prettyPrint } from './util/prettyPrint'

export default abstract class AuthenticatedCommand extends BaseCommand {

  static flags = {
    ...BaseCommand.flags,
  }

  async init() {
    await this._init(true)
  }
}
