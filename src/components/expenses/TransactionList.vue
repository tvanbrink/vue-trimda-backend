<script setup lang="ts">
import Card from "primevue/card";
import ImportModal from "./ImportModal.vue";
import { onMounted, ref } from "vue";
import { usePageExpensesStore } from "@/store/pageExpenses";
import MutationComponent from "./MutationComponent.vue";
import Mutation from "@/models/Mutation";
import Sidebar from "primevue/sidebar";

const expenseStore = usePageExpensesStore();
const visible = ref(true);

const onMutationClickHandler = (mutation: Mutation) => {
  expenseStore.setSelectedMutation(mutation);
};

const openMutationDetails = () => {
  visible.value = true;
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

    <Sidebar header="Sidebar">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </Sidebar>
    <Button icon="pi pi-arrow-right" @click="openMutationDetails()"
      >test</Button
    >
    {{ expenseStore.getSelectedMutation }}
  </div>
</template>

<style lang="scss" scoped>
.p-card {
  .p-card-body {
    padding: 0;
  }
}
</style>
