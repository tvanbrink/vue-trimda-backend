<script setup lang="ts">
import Mutation from "@/models/Mutation";
import { helper } from "@/helpers/helpers";

defineProps<{
  mutation: Mutation;
}>();
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
            <p class="m-0 text-xs">
              {{
                helper.format.dateTime(mutation.transactionDate, "ddd D MMMM")
              }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex align-items-center justify-content-center">
        <p class="m-0 p-0 text-sm font-medium">
          {{ helper.format.toCurrency(mutation.ammount, false) }}
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
