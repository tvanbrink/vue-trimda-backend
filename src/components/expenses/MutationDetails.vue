<script setup lang="ts">
import Mutation from "@/models/Mutation";
import { helper } from "@/helpers/helpers";
import Dropdown from "primevue/dropdown";
import { onMounted, ref } from "vue";
import { usePageExpensesStore } from "@/store/pageExpenses";
import DropDownOption from "@/models/DropDownOption";

const expenseStore = usePageExpensesStore();

const selectedCreditor = ref<DropDownOption>();
const optionsCreditor = ref<DropDownOption[]>([]);
const mutation = ref<Mutation | null>();

onMounted(() => {
  mutation.value = expenseStore.getSelectedMutation;

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
});
</script>

<template>
  <div>
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
  </div>
</template>
