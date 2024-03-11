import axios, { AxiosResponse } from "axios";
import { defineStore } from "pinia";
import Mutation from "@/models/Mutation";
import MutationService from "@/services/MutationService";
import { useAppStore } from "./app";

const appStore = useAppStore();

const mutationRepo: MutationService = new MutationService();

type State = {
  selectedAccountId: string;
  selectedMutation: Mutation | null;
  mutations: Mutation[];
};

export const usePageExpensesStore = defineStore("pageExpenses", {
  state: () =>
    ({
      selectedAccountId: "",
      selectedMutation: null,
      mutations: [],
    } as State),
  getters: {
    getSelectedAccountId: (state: State) => state.selectedAccountId,
    getSelectedMutation: (state: State) => state.selectedMutation,
    getMutations: (state: State) => state.mutations,
  },
  actions: {
    async init() {
      this.selectedAccountId = appStore.getDefaultAccountId;
      await this.setMutations();
    },
    async setSelectedAccount(accountId: string) {
      this.selectedAccountId = accountId;
    },
    async setSelectedMutation(mutation: Mutation) {
      this.selectedMutation = mutation;
    },
    async clearSelectedMutation() {
      this.selectedMutation = null;
    },
    async setMutations() {
      if (this.selectedAccountId) {
        await mutationRepo
          .getAll(this.selectedAccountId)
          .then((response: AxiosResponse<any, any>) => {
            this.mutations = response.data;
          })
          .catch((reason: any) => {
            console.log("Error", reason);
          });
      }
    },
  },
});
