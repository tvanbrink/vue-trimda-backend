<script setup lang="ts">
import Mutation from "@/models/Mutation";
import { helper } from "@/helpers/helpers";
import Dropdown from "primevue/dropdown";
import { onMounted, ref } from "vue";
import { usePageExpensesStore } from "@/store/pageExpenses";
import DropDownOption from "@/models/DropDownOption";
import Bankaccount from "@/models/BankAccount";

const expenseStore = usePageExpensesStore();

const selectedCreditor = ref<DropDownOption>();
const optionsCreditor = ref<DropDownOption[]>([]);

const selectedCategory = ref<DropDownOption>();
const optionsCategory = ref<DropDownOption[]>([]);

const mutation = ref<Mutation | null>();
const bankAccount = ref<Bankaccount | null>();

onMounted(() => {
  mutation.value = expenseStore.getSelectedMutation;
  bankAccount.value = expenseStore.getSelectedBankAccount;

  expenseStore.getBankAccountCreditors?.forEach((creditor) => {
    optionsCreditor.value.push({
      name: creditor.name,
      code: creditor.id,
    });
  });

  selectedCreditor.value = {
    name: expenseStore.getSelectedMutation?.creditor?.name,
    code: expenseStore.getSelectedMutation?.creditor?.id,
  };

  expenseStore.getBankAccountCategories?.forEach((category) => {
    optionsCategory.value?.push({
      name: category.name,
      code: category.id,
    });
  });
});
</script>

<template>
  <div>
    <p>{{ bankAccount?.description }}</p>

    <p>Uitgevoerd op</p>
    <p v-if="mutation?.transactionDate">
      {{ helper.format.dateTime(mutation.transactionDate, "dddd D MMMM YYYY") }}
    </p>

    <p>Saldo na boeking</p>
    <p>{{ helper.format.toCurrency(mutation?.endingSaldo ?? 0, true) }}</p>

    <p>Crediteur</p>
    <Dropdown
      v-model="selectedCreditor"
      :options="optionsCreditor"
      optionLabel="name"
      placeholder="Selecteer crediteur"
    />

    <p>Categorie</p>
    <Dropdown
      v-model="selectedCategory"
      :options="optionsCategory"
      optionLabel="name"
      placeholder="Selecteer categorie"
    />
  </div>
</template>
