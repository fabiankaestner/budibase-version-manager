import AuthenticatedCommand from '../../AuthenticatedCommand'

export default class Application extends AuthenticatedCommand {
  static description = 'Manage Budibase applications.'

  static flags = {
    ...AuthenticatedCommand.flags,
  }

  static args = []

  async run() {
    const { flags, args } = this.parse(Application)
  }
}
