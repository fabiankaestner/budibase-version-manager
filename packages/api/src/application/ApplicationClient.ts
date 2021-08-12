import { IHttpClient } from '../http/HttpClient';

export enum ApplicationStatus {
  Development = 'development',
  Published = 'published',
  All = 'all'
}

export interface IApplication {
  id: string,
  name: string,
  url: string,
  updatedAt: Date,
  createdAt: Date,
  status: ApplicationStatus
}

function parseApplication(obj: Record<string, any>[]): IApplication[]
function parseApplication(obj: Record<string, any>): IApplication
function parseApplication(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(el => parseApplication(el))
  } else {
    return {
      id: obj.appId as string,
      name: obj.name as string,
      url: obj.url as string,
      updatedAt: new Date(obj.updatedAt),
      createdAt: new Date(obj.createdAt),
      status: obj.status as ApplicationStatus
    } as IApplication
  }
}

export class ApplicationClient {

  http: IHttpClient;

  constructor(http: IHttpClient) {
    this.http = http
  }

  async create(name: string) {
    const data = {
      name,
      useTemplate: false
    }
    const resp = await this.http.post(
      'applications',
      data,
      { contentType: 'form' }
    )
    console.log(resp.body);
    return resp
  }

  async list(status: ApplicationStatus) {
    const resp = await this.http.get('applications', { status: 'all' })
    return parseApplication(JSON.parse(resp.body))
  }

  async export(appId: string) {
    const resp = await this.http.get('backups/export', { appId })
    return resp.body
  }

  async delete(appId: string) {
    const resp = await this.http.delete(`applications/${appId}`)
    return resp.body
  }
}