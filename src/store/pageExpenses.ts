import axios, { AxiosResponse } from "axios";
import { defineStore } from "pinia";
import Mutation from "@/models/Mutation";
import MutationService from "@/services/MutationService";
import { useAppStore } from "./app";
import Bankaccount from "@/models/BankAccount";
import DropDownOption from "@/models/DropDownOption";

const appStore = useAppStore();

const mutationRepo: MutationService = new MutationService();

type State = {
  selectedBankAccount: Bankaccount | null;
  selectedMutation: Mutation | null;
  mutations: Mutation[];
};

export const usePageExpensesStore = defineStore("pageExpenses", {
  state: () =>
    ({
      selectedBankAccount: null,
      selectedMutation: null,
      mutations: [],
    } as State),
  getters: {
    getSelectedBankAccount: (state: State) => state.selectedBankAccount,
    getBankAccountCreditors: (state: State) =>
      state.selectedBankAccount?.bankAccountCreditors,

    getSelectedMutation: (state: State) => state.selectedMutation,
    getMutations: (state: State) => state.mutations,
  },
  actions: {
    async init() {
      this.selectedBankAccount = appStore.getDefaultBankAccount;
      await this.setMutations();
    },
    async setSelectedBankAccount(account: Bankaccount) {
      this.selectedBankAccount = account;
    },
    async setSelectedMutation(mutation: Mutation) {
      this.selectedMutation = mutation;
    },
    async clearSelectedMutation() {
      this.selectedMutation = null;
    },
    async setMutations() {
      if (this.selectedBankAccount) {
        await mutationRepo
          .getAll(this.selectedBankAccount?.id)
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
