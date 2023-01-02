import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { StorageProvider } from './storage.provider';
const https = require("https");
import qs from 'qs';
export interface RequestConfig extends AxiosRequestConfig {
  responseHeader?: boolean;
};

export class NetworkProvider {
  /**
   * @private
   * @dev
   * Base api url located in evn file
   */
  private BASE_URL = "http://dev.thanqminh.com:3000";

  /**
   * Default network options
   * @private
   */
  private defaultNetWorkOptions: RawAxiosRequestHeaders = {
    'Content-Type': 'application/json',
  };

  /**
   * Storage provider
   * @private
   */
  private storageProvider;

  /**
   * @description
   * Initilize mode
   */
  constructor() {
    this.storageProvider = new StorageProvider();
  }

  /**
   * @param url
   * @param requestConfig
   * @returns
   * @description
   * The function to request to the api
   */
  async request<RequestResponse>(
    url: string,
    requestConfig: RequestConfig
  ): Promise<RequestResponse> {
    const filterRequestConfig = requestConfig as AxiosRequestConfig;
    const resp = await axios(url, {
      ...filterRequestConfig,
      baseURL: `${this.BASE_URL}`,
      paramsSerializer: {
        serialize: (params: any) => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        },
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      headers: {
        ...this.defaultNetWorkOptions,
        ...filterRequestConfig.headers,
      } as any,
    }).catch((e) => e.response);

    if (!resp || resp?.status >= 400) {
      throw new Error(`Error when request server, ${resp.statusText}`);
    }

    let jsonData = requestConfig?.responseHeader === true ? resp : resp?.data;
    try {
      if (requestConfig?.responseHeader === true) {
        if (typeof resp.data === 'string') {
          jsonData = {
            data: JSON.parse(resp.data),
            headers: JSON.parse(resp.headers)
          };
        } else {
          jsonData = {
            data: resp.data,
            headers: resp.headers
          };
        };
      } else {
        jsonData = JSON.parse(resp.data);
      }
    } catch {};

    return jsonData as RequestResponse;
  }

  /**
   * @param url
   * @param requestConfig
   * @returns
   * @description
   * The function to request to the api with credential
   */
  async requestWithCredentials<RequestResponse>(
    url: string,
    requestConfig: RequestConfig
  ): Promise<RequestResponse> {
    const credential = this.storageProvider.getItem('hAccessToken');
    const client = this.storageProvider.getItem("client");
    const uid = this.storageProvider.getItem("uid");
    if (!credential || !client || !uid) {
      throw new Error("Error when request without credential");
    }
    const options = Object.assign({}, requestConfig);
    options.headers = {
      ...options.headers,
      "access-token": credential,
      client,
      uid,
    } as any;
    return this.request<RequestResponse>(url, options);
  }
}

export const networkProvider = new NetworkProvider();
