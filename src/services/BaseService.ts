import axios, { AxiosResponse } from "axios";
import { auth0 } from "../plugins/auth0";

export interface IBaseService<T> {
  get(id: any): Promise<AxiosResponse<any, any>>;
  getAll(): Promise<AxiosResponse<any, any>>;
  create(id: any, item: T): Promise<AxiosResponse<any, any>>;
  update(id: any, item: T): Promise<AxiosResponse<any, any>>;
  delete(id: any): Promise<AxiosResponse<any, any>>;
}

export class ApiResponse<T> {
  data?: T;
  succeeded?: boolean;
  errors: any;
}

// TODO: verwijder transform functie

// const transform = (response: AxiosResponse): Promise<ApiResponse<any>> => {
//   return new Promise((resolve, reject) => {
//     const result: ApiResponse<any> = {
//       data: response.data,
//       succeeded: response.status === 200,
//       errors: response.data.errors,
//     };
//     resolve(result);
//   });
// };

export abstract class BaseService<T> implements IBaseService<T> {
  protected collection: string | undefined;

  private url(id?: string): string {
    return (
      process.env.VUE_APP_API_BASE_URL +
      "/" +
      this.collection +
      (id ? "/" + id : "")
    );
  }

  private async request(
    method: string,
    url: string,
    data?: T | T[]
  ): Promise<AxiosResponse<any, any>> {
    return await axios({
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await auth0.getAccessTokenSilently()),
      },
      data: data,
    });
  }

  public async get(id?: string): Promise<AxiosResponse<any, any>> {
    return await this.request("get", this.url(id));
  }

  public async getAll(): Promise<AxiosResponse<any, any>> {
    return await this.request("get", this.url());
  }

  public async create(data: T | T[]): Promise<AxiosResponse<any, any>> {
    return await this.request("post", this.url(), data);
  }

  public async update(id: string, item: T): Promise<AxiosResponse<any, any>> {
    return await this.request("put", this.url(id), item);
  }

  public async delete(id: any): Promise<AxiosResponse<any, any>> {
    return await this.request("delete", this.url(id));
  }
}
