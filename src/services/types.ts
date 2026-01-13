import { AxiosRequestConfig } from "axios";

export enum ApiMethod {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete",
}

export type ApiHandler = {
  createRequest: (
    url: string,
    method: string,
    payload?: any,
    user?: any,
    withCredentials?: boolean,
    timeout?: number
  ) => AxiosRequestConfig;
  mapResponse: (response: any, codes?: number[]) => { [key: string]: any };
  apiCall?: any;
};

export const enum status {
  done = "done"  ,
  pending = "pending"  ,
  error = "error"  ,
}

export type Response = {
  data: any;
  status: number;
  headers?: any;
};
