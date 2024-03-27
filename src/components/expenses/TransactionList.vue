<script setup lang="ts">
import Card from "primevue/card";
import ImportModal from "./ImportModal.vue";
import { onMounted, ref } from "vue";
import { usePageExpensesStore } from "@/store/pageExpenses";
import MutationComponent from "./MutationComponent.vue";
import Mutation from "@/models/Mutation";
import Sidebar from "primevue/sidebar";
import MutationDetails from "./MutationDetails.vue";

const expenseStore = usePageExpensesStore();
const sidebarOpen = ref(false);

const onMutationClickHandler = async (mutation: Mutation) => {
  await expenseStore.setSelectedMutation(mutation);
  sidebarOpen.value = true;
};

const mutationSavedHandler = async () => {
  sidebarOpen.value = false;
  await expenseStore.reload();
};

onMounted(async () => {
  await expenseStore.init();
});
</script>

<template>
  <div>
    <Card class="p-card-mutations-header mb-3">
      <template #title>
        <div class="flex justify-content-between flex-wrap">
          <div class="flex align-items-center justify-content-center">
            Mutaties
          </div>
          <div class="flex align-items-center justify-content-center">
            <ImportModal />
          </div>
        </div>
      </template>
    </Card>

    <h3 class="pl-3 mb-2">Maart</h3>

    <Card class="p-card-mutations mb-3">
      <template #title>
        <div class="flex justify-content-between flex-wrap">
          <div class="flex align-items-center justify-content-center"></div>
          <div class="flex align-items-center justify-content-center"></div>
        </div>
      </template>
      <template #content>
        <ul class="mutation-list list-none p-0 m-0">
          <li
            v-for="mutation in expenseStore.getMutations"
            v-bind:key="mutation.id"
          >
            <MutationComponent
              :mutation="mutation"
              @click="onMutationClickHandler(mutation)"
            />
          </li>
        </ul>
      </template>
    </Card>

    <!-- eslint-disable vue/no-v-model-argument -->
    <Sidebar
      v-model:visible="sidebarOpen"
      header="Mutatie details"
      class="p-sidebar-mutation w-full md:w-20rem lg:w-30rem"
      position="right"
      @hide="expenseStore.clearSelectedMutation()"
    >
      <!-- eslint-enable vue/no-v-model-argument -->
      <MutationDetails
        :open="sidebarOpen"
        :mutation="expenseStore.getSelectedMutation"
        @mutation-saved="mutationSavedHandler"
      />
    </Sidebar>
  </div>
</template>

<style lang="scss" scoped>
.p-card {
  .p-card-body {
    padding: 0;
  }
}
</style>
