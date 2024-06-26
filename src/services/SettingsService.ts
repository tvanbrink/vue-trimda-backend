import { BaseService } from "./BaseService";

export interface Settings {
  id: string;
  test: boolean;
}

export default class SettingsService extends BaseService<Settings> {
  collection = "settings";

  get(id: string) {
    return super.get(id);
  }

  //   getAll() {
  //     return super.getAll();
  //   }

  //   create(id: string, data: IUser) {
  //     return super.create(id, data);
  //   }

  //   update(id: string, data: IUser) {
  //     return super.update(id, data);
  //   }

  //   delete(id: string) {
  //     return super.delete(id);
  //   }
}
