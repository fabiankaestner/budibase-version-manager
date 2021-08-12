import BaseCommand from '../BaseCommand'
import { prettyPrint } from '../util/prettyPrint'

export default class Status extends BaseCommand {
  static description = 'describe the command here'

  static flags = {
    ...BaseCommand.flags,
  }

  static args = []

  async run() {
    const { flags, args } = this.parse(Status)
    prettyPrint(this.state)
  }
}
