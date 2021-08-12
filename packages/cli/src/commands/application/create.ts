import AuthenticatedCommand from '../../AuthenticatedCommand'

export default class ApplicationCreate extends AuthenticatedCommand {
  static description = 'Manage Budibase applications.'

  static flags = {
    ...AuthenticatedCommand.flags,
  }

  static args = [{ name: 'name' }]

  static aliases = ['applications:create']

  async run() {
    const { flags, args } = this.parse(ApplicationCreate)

    try {
      const resp = await this.api.application.create(args.name)
    } catch (e) {
      console.error('Failed to create application.')
      throw e
    }
  }
}
