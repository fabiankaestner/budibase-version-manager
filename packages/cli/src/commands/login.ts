import { flags } from '@oclif/command'
import BaseCommand from '../BaseCommand'
import { prettyPrint } from '../util/prettyPrint'

export default class Login extends BaseCommand {
  static description = 'Login to a Budibase service.'

  static flags = {
    ...BaseCommand.flags,

    user: flags.string({ char: 'u', description: 'the user/email to authenticate with.', required: true }),
    pass: flags.string({ char: 'p', description: 'the password to authenticate with.', required: true }),
    host: flags.string({ char: 'H', description: 'the host:port of the Budibase backend.', required: true }),

    insecure: flags.boolean({ char: 'i' }),
  }

  static args = []

  async run() {
    const { flags, args } = this.parse(Login)

    const credentials = await this.api.login(flags.user, flags.pass)

    this.state.host = flags.host
    this.state.session = credentials.session

    await this.saveState()

    prettyPrint(credentials)
  }
}
