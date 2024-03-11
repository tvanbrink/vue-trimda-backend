import axios, { AxiosResponse } from "axios";
import { defineStore } from "pinia";
import UserService, { User } from "../services/UserService";
import SettingsService, { Settings } from "../services/SettingsService";

const userRepo: UserService = new UserService();
const settingsRepo: SettingsService = new SettingsService();

type State = {
  user: User | null;
  settings: Settings | null;
};

export const useAppStore = defineStore("app", {
  state: () =>
    ({
      user: null,
      settings: {},
    } as State),
  getters: {
    getUser: (state: State) => state.user,
    getSettings: (state: State) => state.settings,
    getDefaultAccountId(state: State): string {
      let accountId: string = "";

      if (state.user) {
        state.user?.accounts.forEach((account) => {
          if (account.primary) {
            accountId = account.id;
          }
        });
      }

      return accountId;
    },
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
