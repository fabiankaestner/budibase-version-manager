import { ApplicationStatus } from '@budibase-version-manager/api'
import AuthenticatedCommand from '../../AuthenticatedCommand'

import Table = require('cli-table')
import chalk = require('chalk')
export default class Application extends AuthenticatedCommand {
  static description = 'Manage Budibase applications.'

  static flags = {
    ...AuthenticatedCommand.flags,
  }

  static args = []

  static aliases = ['application:list', 'applications:list', 'applications']

  async run() {
    const { flags, args } = this.parse(Application)
    const applications = await this.api.application.list(ApplicationStatus.All)

    const table = new Table({
      chars: {
        'top': '', 'top-mid': '', 'top-left': '', 'top-right': ''
        , 'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': ''
        , 'left': '', 'left-mid': '', 'mid': '', 'mid-mid': ''
        , 'right': '', 'right-mid': '', 'middle': '  '
      },
      style: { 'padding-left': 0, 'padding-right': 0, }
    });


    const trunc = (str: string, len: number) => str.length > len - 3 ? str.substr(0, len - 3) + '...' : str

    const formattedApplications = applications.reduce<string[][]>((list, app) =>
      [
        ...list, [app.id, app.name, app.status, app.url, app.updatedAt.toISOString(), app.createdAt?.toISOString()].map(str => trunc(str || '---', 50))
      ],
      [
        ['ID', 'NAME', 'STATUS', 'URL', 'UPDATED', 'CREATED'].map(str => chalk.bold.blueBright(str))
      ]
    )
    table.push(...formattedApplications)
    console.log(table.toString())
  }
}
