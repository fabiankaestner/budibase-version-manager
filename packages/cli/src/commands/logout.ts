import { flags } from '@oclif/command'
import BaseCommand from '../BaseCommand'
import { prettyPrint } from '../util/prettyPrint'

export default class Logout extends BaseCommand {
  static description = 'Logout from the current Budibase service.'

  static flags = {
    ...BaseCommand.flags,
  }

  static args = []

  async run() {
    const { flags, args } = this.parse(Logout)

    this.state.host = undefined
    this.state.session = undefined

    await this.saveState()
  }
}
