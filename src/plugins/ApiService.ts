import axios, { AxiosInstance } from 'axios'
export class ApiService {
  private static _instance: ApiService

  private readonly _api: AxiosInstance

  constructor() {
    this._api = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
    })

    this._api.interceptors.request.use(
      config => {
        return config
      },
      error => {
        return Promise.reject(error)
      },
    )

    this._api.interceptors.response.use(
      response => {
        return response.data
      },
      function (error) {
        if (error?.response?.data?.code == 401) {
          return Promise.reject(error.response.data.msg)
        } else {
          return Promise.reject(error)
        }
      },
    )
  }

  static instance(): ApiService {
    if (!this._instance) this._instance = new ApiService()
    return this._instance
  }

  public get axios(): AxiosInstance {
    return this._api
  }
}
