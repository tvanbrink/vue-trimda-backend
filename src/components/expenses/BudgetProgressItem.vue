<script setup lang="ts">
import ProgressBar from "primevue/progressbar";
import BankAccountGoal from "@/models/BankAccountGoals";
import { onMounted, ref } from "vue";
import { helper } from "@/helpers/helpers";

const props = defineProps<{
  goal: BankAccountGoal;
}>();

const percentage = ref<number>(0);

onMounted(() => {
  percentage.value = (props.goal.total / props.goal.goal) * 100;

  if (percentage.value > 100) {
    percentage.value = 100;
  }
});
</script>

<template>
  <div class="mt-3 mb-1">
    <div class="flex justify-content-between flex-wrap">
      <div class="flex align-goals-center justify-content-center">
        <p class="mt-0 text text-sm">{{ goal.name.substring(0, 20) }}</p>
      </div>
      <div class="flex align-goals-center justify-content-center">
        <p class="mt-0 text text-sm">€{{ goal.goal }}</p>
      </div>
    </div>
    <ProgressBar :value="percentage">{{
      percentage > 10 ? `${helper.format.toCurrency(goal.total, true)}` : ""
    }}</ProgressBar>
  </div>
</template>

<style lang="scss" scoped>
.text {
  font-size: 0.75rem !important;
  margin-bottom: 0.4rem;
  text-transform: capitalize;
}
</style>
