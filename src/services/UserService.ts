import { BaseService } from "./BaseService";

export interface User {
  id: string;
  bankAccounts: Account[];
  active: boolean;
  admin: boolean;
  developer: boolean;
}

export interface Account {
  id: string;
  description: string;
  primary: boolean;
}

export default class UserService extends BaseService<User> {
  collection = "user";

  get(id?: string) {
    return super.get(id);
  }
}
