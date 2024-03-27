<script setup lang="ts">
import Button from "primevue/button";
import Mutation from "@/models/Mutation";
import { helper } from "@/helpers/helpers";
import Dropdown from "primevue/dropdown";
import { onMounted, ref, watch } from "vue";
import { usePageExpensesStore } from "@/store/pageExpenses";
import DropDownOption from "@/models/DropDownOption";
import Bankaccount from "@/models/BankAccount";
import BankAccountCreditor from "@/models/BankAccountCreditor";

const expenseStore = usePageExpensesStore();

const selectedCreditorOption = ref<DropDownOption>();
const optionsCreditor = ref<DropDownOption[]>([]);

const selectedCategoryOption = ref<DropDownOption>();
const optionsCategory = ref<DropDownOption[]>([]);

const mutation = ref<Mutation | null>();
const bankAccount = ref<Bankaccount | null>();

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: "mutationSaved"): void;
}>();

onMounted(async () => {
  mutation.value = expenseStore.getSelectedMutation;
  bankAccount.value = expenseStore.getSelectedBankAccount;

  optionsCreditor.value =
    expenseStore.getBankAccountCreditors?.map(
      (creditor) => new DropDownOption(creditor.name, creditor.id)
    ) ?? [];

  if (expenseStore.getSelectedMutation?.creditor) {
    selectedCreditorOption.value = new DropDownOption(
      expenseStore.getSelectedMutation?.creditor?.name,
      expenseStore.getSelectedMutation?.creditor?.id
    );
  }

  optionsCategory.value =
    expenseStore.getBankAccountCategories?.map(
      (category) => new DropDownOption(category.name, category.id)
    ) ?? [];

  if (expenseStore.getSelectedMutation?.category) {
    selectedCategoryOption.value = new DropDownOption(
      expenseStore.getSelectedMutation?.category.name,
      expenseStore.getSelectedMutation?.category.id
    );
  }
});

watch(selectedCreditorOption, (newCreditor, oldCreditor) => {
  if (newCreditor && oldCreditor && newCreditor != oldCreditor) {
    const creditor: BankAccountCreditor | null =
      expenseStore.setCreditor(newCreditor);

    if (creditor) {
      if (creditor.defaultCategory) {
        selectedCategoryOption.value = new DropDownOption(
          creditor.defaultCategory.name,
          creditor.defaultCategory.id
        );
      } else {
        selectedCategoryOption.value = undefined;
      }
    }
  }
});

watch(selectedCategoryOption, (newCategory) => {
  expenseStore.setCategory(newCategory);
});

const updateMutation = async () => {
  await expenseStore.saveMutation().then(() => {
    emit("mutationSaved");
  });
};
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
    <div>
      <Dropdown
        v-model="selectedCreditorOption"
        :options="optionsCreditor"
        optionLabel="name"
        placeholder="Selecteer crediteur"
      />
    </div>

    <p>Categorie</p>
    <div class="mb-5">
      <Dropdown
        v-model="selectedCategoryOption"
        :options="optionsCategory"
        optionLabel="name"
        placeholder="Selecteer categorie"
      />
    </div>

    <div>
      <Button @click="updateMutation">Opslaan</Button>
    </div>
  </div>
</template>
