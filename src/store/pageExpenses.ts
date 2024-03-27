import axios, { AxiosResponse } from "axios";
import { defineStore } from "pinia";
import Mutation from "@/models/Mutation";
import MutationService from "@/services/MutationService";
import { useAppStore } from "./app";
import Bankaccount from "@/models/BankAccount";
import DropDownOption from "@/models/DropDownOption";
import BankAccountCreditor from "@/models/BankAccountCreditor";
import BankAccountCategory from "@/models/BankAccountCategory";

const appStore = useAppStore();

const mutationService: MutationService = new MutationService();

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
    getBankAccountCreditors: (state: State) =>
      state.selectedBankAccount?.bankAccountCreditors,
    getBankAccountCategories: (state: State) =>
      state.selectedBankAccount?.bankAccountCategories,
    getSelectedBankAccount: (state: State) => state.selectedBankAccount,
    getSelectedMutation: (state: State) => state.selectedMutation,
    getMutations: (state: State) => state.mutations,
  },
  actions: {
    async init() {
      this.selectedBankAccount = appStore.getDefaultBankAccount;
      await this.setMutations();
    },
    async reload() {
      await this.init();
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
        await mutationService
          .getAll(this.selectedBankAccount?.id)
          .then((response: AxiosResponse<any, any>) => {
            this.mutations = response.data;
          })
          .catch((reason: any) => {
            console.log("Error", reason);
          });
      }
    },
    async saveMutation() {
      if (this.selectedMutation) {
        await mutationService
          .update(this.selectedMutation.id, this.selectedMutation)
          .then((response: AxiosResponse<any, any>) => {
            console.log(response);
          })
          .catch((reason: any) => {
            console.log("Error", reason);
          });
      }
    },
    setCreditor(option: DropDownOption): BankAccountCreditor | null {
      const creditor = this.selectedBankAccount?.bankAccountCreditors.find(
        (c) => c.id === option.code
      );

      if (this.selectedMutation) {
        this.selectedMutation.creditor = creditor ?? null;
      }

      return creditor ?? null;
    },
    setCategory(option: DropDownOption | undefined) {
      if (this.selectedMutation) {
        let category: BankAccountCategory | undefined = undefined;

        if (option) {
          category = this.selectedBankAccount?.bankAccountCategories.find(
            (c) => c.id === option.code
          );
        }

        this.selectedMutation.category = category ? category : null;
      }
    },
  },
});
