<script setup lang="ts">
import ProgressBar from "primevue/progressbar";
import BudgetItem from "../../models/BudgetItem";
// import { onBeforeMount } from "vue";

defineProps<{
  item: BudgetItem;
}>();

// onBeforeMount(()  => {

// })
</script>

<template>
  <div>
    <div class="flex justify-content-between flex-wrap">
      <div class="flex align-items-center justify-content-center">
        <p class="mt-0 mb-2 text-sm">{{ item.description }}</p>
      </div>
      <div class="flex align-items-center justify-content-center">
        <p class="mt-0 mb-2 text-sm">€{{ item.targetValue }}</p>
      </div>
    </div>
    <ProgressBar :value="item.consumedPercentage">{{
      item.consumedPercentage > 10 ? `€${item.consumedValue}` : ""
    }}</ProgressBar>
  </div>
</template>
