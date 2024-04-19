import type { BaseHttpRequest } from "./core/BaseHttpRequest"
import type { OpenAPIConfig } from "./core/OpenAPI"
import { Interceptors } from "./core/OpenAPI"
import { AxiosHttpRequest } from "./core/AxiosHttpRequest"

import { DemoService } from "./services.gen"

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest

export class AppClient {
  public readonly demo: DemoService

  public readonly request: BaseHttpRequest

  constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? "",
      VERSION: config?.VERSION ?? "1.0.0",
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? "include",
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
      interceptors: {
        request: new Interceptors(),
        response: new Interceptors(),
      },
    })

    this.demo = new DemoService(this.request)
  }
}
