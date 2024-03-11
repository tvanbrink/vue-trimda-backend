<script setup lang="ts">
import Mutation from "@/models/Mutation";
import moment from "moment";

defineProps<{
  mutation: Mutation;
}>();

const dateTime = (date: Date): string => {
  return moment(date).locale("nl").format("ddd D MMMM").replace(".", "");
};

const formatNumber = (number: Number): string => {
  // return number.toLocaleString();
  return number
    .toLocaleString(undefined, {
      currency: "EUR",
      useGrouping: true,
      // style: "currency",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace("-", "- ");
};
</script>

<template>
  <div class="mutation-component py-2 px-3">
    <div class="flex justify-content-between flex-wrap">
      <div class="flex align-items-center justify-content-center">
        <div class="flex flex-column">
          <div class="flex">
            <p class="pb-1 m-0 font-medium">Crediteur</p>
          </div>
          <div class="flex">
            <p class="m-0 text-xs">{{ dateTime(mutation.transactionDate) }}</p>
          </div>
        </div>
      </div>
      <div class="flex align-items-center justify-content-center">
        <p class="m-0 p-0 text-sm font-medium">
          {{ formatNumber(mutation.ammount) }}
        </p>
      </div>
    </div>
  </div>
</template>

<stlye lang="scss">
li {
  text-transform: lowercase;
}
</stlye>
