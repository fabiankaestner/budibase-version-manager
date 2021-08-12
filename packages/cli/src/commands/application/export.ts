import { flags } from '@oclif/command'
import { promises as fs } from 'fs'
import * as path from 'path'

import AuthenticatedCommand from '../../AuthenticatedCommand'

export default class ApplicationCreate extends AuthenticatedCommand {
  static description = 'Manage Budibase applications.'

  static flags = {
    ...AuthenticatedCommand.flags,
    file: flags.string({ char: 'f', description: 'save the application export to file.', required: false }),
    pretty: flags.boolean({ char: 'p', description: 'pretty-print the output JSON', required: false })

  }

  static args = [{ name: 'id' }]

  static aliases = ['applications:export']

  async run() {
    const { flags, args } = this.parse(ApplicationCreate)

    let appStr = ''
    try {
      appStr = await this.api.application.export(args.id)
    } catch (e) {
      console.error('Failed to export application.')
      throw e
    }

    if (flags.pretty) {
      appStr = appStr
        .split('\n')
        .filter(str => str.trim().length !== 0)
        .map(str => JSON.parse(str))
        .map(obj => JSON.stringify(obj, undefined, 2))
        .join('\n')
    }

    if (flags.file) {
      const outPath = path.join(process.cwd(), flags.file)
      try {

        await fs.writeFile(outPath, appStr)
      } catch (e) {
        console.error('Failed to write file.')
        throw e
      }
    } else {
      console.log(appStr)
    }
  }
}
