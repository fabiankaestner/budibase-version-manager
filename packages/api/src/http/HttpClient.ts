import got, { Response } from "got"

export interface IHttpClient {
  baseUrl: string

  post(path: string, data: any, opts: IPostRequestOptions): Promise<Response<string>>
  get(path: string, params?: Record<string, string>): Promise<Response<string>>
  delete(path: string, params?: Record<string, string>): Promise<Response<string>>
}

interface IPostRequestOptions {
  contentType: 'json' | 'form'
}

export interface ISessionToken {
  token: string
  sig: string
}

export class HttpClient implements IHttpClient {

  baseUrl: string
  session: ISessionToken

  constructor(baseUrl: string, session?: ISessionToken) {
    this.baseUrl = baseUrl
    this.session = session
  }

  private getCookies = () => this.session?.token && this.session?.sig ? [
    { name: 'budibase:auth', value: this.session.token },
    { name: 'budibase:auth.sig', value: this.session.sig }
  ] : []
  private getCookieHeader = () => this.getCookies().map(({ name, value }) => `${name}=${value}`).join('; ')

  setSession(session: ISessionToken) {
    this.session = session
  }

  async post(path: string, data: any, opts: IPostRequestOptions) {
    const resp = await got.post({
      url: `${this.baseUrl}/${path}`,
      json: opts.contentType === 'json' ? data : undefined,
      body: opts.contentType === 'form' ? data : undefined,
      headers: {
        'cookie': this.getCookieHeader()
      }
    });
    return resp;

  }

  async get(path: string, params?: Record<string, string>) {
    const resp = await got.get({
      url: `${this.baseUrl}/${path}`,
      searchParams: params,
      headers: {
        'cookie': this.getCookieHeader()
      }
    });
    return resp;
  }

  async delete(path: string, params?: Record<string, string>) {
    const resp = await got.delete({
      url: `${this.baseUrl}/${path}`,
      searchParams: params,
      headers: {
        'cookie': this.getCookieHeader()
      }
    });
    return resp;
  }
}