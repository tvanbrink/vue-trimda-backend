import Mutation from "@/models/Mutation";
import { BaseService } from "./BaseService";
import { AxiosResponse } from "axios";

export default class MutationService extends BaseService<Mutation> {
  collection = "mutation";

  get(id: string): Promise<AxiosResponse<any, any>> {
    return super.get(id);
  }

  async getAll(id?: string): Promise<AxiosResponse<any, any>> {
    this.collection = "bankaccount/" + id + "/mutation";
    return await super.get();
  }

  create(data: Mutation[]): Promise<AxiosResponse<any, any>> {
    return super.create(data);
  }
}
