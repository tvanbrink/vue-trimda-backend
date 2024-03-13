<script setup lang="ts">
import Mutation from "@/models/Mutation";
import { helper } from "@/helpers/helpers";
import Dropdown from "primevue/dropdown";
import { ref } from "vue";

defineProps<{
  mutation: Mutation | null;
}>();

const selectedCity = ref();
const cities = ref([
  { name: "New York", code: "NY" },
  { name: "Rome", code: "RM" },
  { name: "London", code: "LDN" },
  { name: "Istanbul", code: "IST" },
  { name: "Paris", code: "PRS" },
]);
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
      v-model="selectedCity"
      :options="cities"
      showClear
      optionLabel="name"
      placeholder="Selecteer crediteur"
    />

    <!-- <div>{{ mutation }}</div> -->
  </div>
</template>
