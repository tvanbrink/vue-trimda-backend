import { BaseRepository } from "./BaseRepository";

export interface User {
  id: string;
  accounts: Account[];
  active: boolean;
  admin: boolean;
  developer: boolean;
}

export interface Account {
  id: string;
  description: string;
  primary: boolean;
}

export default class UserRepository extends BaseRepository<User> {
  collection = "user";

  get(id?: string) {
    return super.get(id);
  }
}
