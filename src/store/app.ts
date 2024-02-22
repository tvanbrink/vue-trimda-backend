import axios, { AxiosResponse } from "axios";
import { defineStore } from "pinia";
import UserRepository, { User } from "../repositories/UserRepository";
import SettingsRepository, {
  Settings,
} from "../repositories/SettingsRepository";

const userRepo: UserRepository = new UserRepository();
const settingsRepo: SettingsRepository = new SettingsRepository();

export const useAppStore = defineStore("app", {
  state: () => ({
    user: {} as User | null,
    settings: {} as Settings | null,
  }),
  getters: {
    getUser: (state: { user: any }) => state.user,
    getSettings: (state: { settings: any }) => state.settings,
  },
  actions: {
    async setUser() {
      await userRepo
        .get()
        .then((response: AxiosResponse<any, any>) => {
          this.user = response.data;
        })
        .catch((reason: any) => {
          console.log("Error", reason);
        });
    },
    async setSettings() {
      if (this.user?.id) {
        await settingsRepo
          .get(this.user?.id)
          .then((response: AxiosResponse<any, any>) => {
            this.settings = response.data;
          })
          .catch((reason: any) => {
            console.log("Error", reason);
          });
      }
    },
  },
});
