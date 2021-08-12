import { HttpClient, IHttpClient, ISessionToken } from "./http/HttpClient";
import * as SetCookieParser from 'set-cookie-parser'
import { ApplicationClient } from "./application/ApplicationClient";

export interface IUserInformation {
  email: string,
  id: string,
  builder: { global: boolean }
  admin: { global: boolean }
  status: string
}

export class BudibaseClient {

  baseUrl: string;
  http: IHttpClient;

  application: ApplicationClient

  constructor(baseUrl: string, session?: ISessionToken) {
    this.baseUrl = baseUrl
    this.http = new HttpClient(baseUrl, session)

    this.application = new ApplicationClient(this.http)
  }

  async login(username: string, password: string): Promise<{ session: ISessionToken, user: IUserInformation }> {
    const resp = await this.http.post('admin/auth', { username, password }, { contentType: 'json' })
    const cookies = SetCookieParser.parse(resp.headers['set-cookie'])
    const { _id: id, email, builder, admin, status } = JSON.parse(resp.body).user
    const session = {
      token: cookies.find(c => c.name === 'budibase:auth').value as string,
      sig: cookies.find(c => c.name === 'budibase:auth.sig').value as string,
    }
    const user = {
      id,
      email,
      builder,
      admin,
      status

    }
    return {
      session,
      user
    }
  }
}