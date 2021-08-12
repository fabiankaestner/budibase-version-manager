import chalk = require('chalk')
import AuthenticatedCommand from '../../AuthenticatedCommand'

export default class ApplicationDelete extends AuthenticatedCommand {
  static description = 'Manage Budibase applications.'

  static flags = {
    ...AuthenticatedCommand.flags,
  }

  static args = [{ name: 'id' }]

  static aliases = ['applications:delete']

  async run() {
    const { flags, args } = this.parse(ApplicationDelete)

    try {
      const resp = await this.api.application.delete(args.id)
      console.log('Deleted application ' + chalk.blueBright(args.id))
    } catch (e) {
      console.error('Failed to delete application.')
      throw e
    }
  }
}
