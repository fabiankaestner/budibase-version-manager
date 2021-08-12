import { flags } from '@oclif/command'
import { promises as fs } from 'fs'
import * as path from 'path'

import BaseCommand from '../../BaseCommand'
import readPipe from '../../util/readPipe'

export default class ModifyDatasource extends BaseCommand {
  static description = 'Update the datasource details of Budibase JSON export.'

  static flags = {
    ...BaseCommand.flags,
    input: flags.string({ char: 'i', description: 'load input JSON from file.', required: false }),
    file: flags.string({ char: 'f', description: 'file to save output to.', required: false }),
    pretty: flags.boolean({ char: 'p', description: 'pretty-print the output JSON. Please note that prettyprinted JSON cannot be imported.', required: false }),

    'config:host': flags.string({ description: 'new datasource host.', required: false }),
    'config:port': flags.integer({ description: 'new datasource port.', required: false }),
    'config:db': flags.string({ description: 'new datasource database.', required: false }),
    'config:user': flags.string({ description: 'new datasource user.', required: false }),
    'config:pass': flags.string({ description: 'new datasource password.', required: false }),
    'config:ssl': flags.boolean({ description: 'new datasource connection SSL status.', required: false }),

  }

  static args = [{ name: 'name' }]

  async run() {
    const { flags, args } = this.parse(ModifyDatasource)

    let appStr = ''

    if (flags.input) {
      try {
        const rawInput = await fs.readFile(path.join(process.cwd(), flags.input))
        appStr = rawInput.toString()
      } catch (e) {
        console.error('Error reading input file.')
        throw e
      }
    } else {
      const rawInput = await readPipe()
      if (rawInput) {
        appStr = rawInput
      } else {
        console.error('No stdin input received.')
        throw new Error('NO_INPUT')
      }
    }

    const exportParts = appStr
      .split('\n')
      .filter(str => str.trim().length !== 0)
      .map(str => JSON.parse(str))

    if (exportParts.length !== 3) {
      console.error('Invalid stdin input received. Number of JSON objects is not 3.')
      throw new Error('INVALID_INPUT')
    }

    const datasource = exportParts[1].docs.filter((doc: any) => doc.type === 'datasource_plus' && doc.name === args.name)

    if (datasource.length === 0) {
      console.error(`Could not find datasource with name ${args.name}.`)
      throw new Error('NOT_FOUND')
    }
    if (datasource.length > 1) {
      console.error(`Found more than one datasource with name ${args.name}.`)
      throw new Error('NOT_UNIQUE')
    }

    if (!datasource[0].config) {
      console.error(`Datasource ${args.name} does not have a config property.`)
      throw new Error('INVALID_INPUT')
    }

    if (flags['config:host']) {
      datasource[0].config.host = flags['config:host']
    }

    if (flags['config:port']) {
      datasource[0].config.port = flags['config:port']
    }

    if (flags['config:db']) {
      datasource[0].config.database = flags['config:db']
    }

    if (flags['config:user']) {
      datasource[0].config.user = flags['config:user']
    }

    if (flags['config:pass']) {
      datasource[0].config.password = flags['config:pass']
    }

    if (flags['config:ssl'] !== undefined) {
      datasource[0].config.port = flags['config:ssl']
    }

    appStr = exportParts
      .map(obj => JSON.stringify(obj, undefined, flags.pretty ? 2 : undefined))
      .join('\n')


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
