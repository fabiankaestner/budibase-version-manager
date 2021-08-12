import { BudibaseClient } from "@budibase-version-manager/api";
import { Command, flags } from "@oclif/command";
import { Input } from "@oclif/parser";
import chalk = require("chalk");
import { promises as fs } from 'fs'
import * as path from 'path'
import { ISessionToken } from "../../api/dist/http/HttpClient";

interface IStatePersistenceFile {
  host?: string,
  session?: ISessionToken
}

export default abstract class BaseCommand extends Command {

  statePath: string = ''

  static flags = {
    help: flags.help({ char: 'h' }),
    host: flags.string({ char: 'H', description: 'the host:port of the Budibase backend.', required: false }),
  }

  state: IStatePersistenceFile = {
    host: undefined,
    session: undefined,
  }

  // @ts-ignore
  api: BudibaseClient

  async saveState(): Promise<void> {
    try {
      await fs.writeFile(this.statePath, JSON.stringify(this.state))
    } catch (err) {
      console.error('Error creating persistence file.')
      throw err
    }

  }

  async loadState() {
    this.statePath = path.join(this.config.configDir, 'state.json')
    try {
      const stateFile = await fs.readFile(this.statePath)
      this.state = JSON.parse(stateFile.toString()) as IStatePersistenceFile
    } catch (err) {
      if (err.code === 'ENOENT') {
        await this.saveState()
      } else {
        console.error('Error reading persistence file.')
        throw err
      }
    }
  }

  async _init(requireAuth: boolean) {
    const { args, flags } = this.parse(<Input<any>>this.constructor)

    await this.loadState();

    if (requireAuth && !(this.state.host && this.state.session)) {
      console.error(`No session information found. Did you run ${chalk.blueBright('bbvm login')}?`)
      throw new Error('NO_SESSION')
    }

    this.api = new BudibaseClient(`http://${flags.host || this.state.host}/api`, this.state.session)
  }

  async init() {
    await this._init(false);
  }

  async catch(err: any) {
    return super.catch(err);
  }

  async finally(err: any) {
    return super.finally(err);
  }

}