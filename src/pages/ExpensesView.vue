<script setup lang="ts">
import BudgetProgressList from "../components/expenses/BudgetProgressList.vue";
import TransactionList from "../components/expenses/TransactionList.vue";
</script>

<template>
  <div class="grid grid-nogutter pt-4">
    <div class="col md:col-2 md:col-offset-2 px-3">
      <BudgetProgressList />
    </div>
    <div class="col md:col-6 px-3">
      <TransactionList />
    </div>
  </div>
</template>
