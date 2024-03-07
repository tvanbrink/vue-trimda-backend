import Mutation from "@/models/Mutation";
import { BaseService } from "./BaseService";
import { AxiosResponse } from "axios";

export default class MutationService extends BaseService<Mutation> {
  collection = "mutation";

  get(id: string): Promise<AxiosResponse<any, any>> {
    return super.get(id);
  }

  create(data: Mutation[]): Promise<AxiosResponse<any, any>> {
    return super.create(data);
  }
}
