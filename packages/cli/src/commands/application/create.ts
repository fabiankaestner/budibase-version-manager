import { flags } from '@oclif/command'
import chalk = require('chalk')
import { promises as fs } from 'fs'
import * as path from 'path'

import AuthenticatedCommand from '../../AuthenticatedCommand'

export default class ApplicationCreate extends AuthenticatedCommand {
  static description = 'Manage Budibase applications.'

  static flags = {
    ...AuthenticatedCommand.flags,
    template: flags.string({ char: 't', description: 'use an application template file.', required: false }),
  }

  static args = [{ name: 'name' }]

  static aliases = ['applications:create']

  async run() {
    const { flags, args } = this.parse(ApplicationCreate)

    try {
      let templateStr: string | undefined;
      if (flags.template) {
        const raw = await fs.readFile(path.join(process.cwd(), flags.template))
        templateStr = raw.toString()
      }
      const resp = await this.api.application.create(args.name, templateStr)
      console.log(`Created application ${chalk.blueBright(args.name)} (${chalk.blueBright(resp.appId)})`)
    } catch (e) {
      console.error('Failed to create application.')
      throw e
    }
  }
}
