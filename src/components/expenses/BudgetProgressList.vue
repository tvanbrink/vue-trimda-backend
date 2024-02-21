<script setup lang="ts">
import Card from "primevue/card";
import ButtonIcon from "../buttons/ButtonIcon.vue";

const clickRefreshHandler = () => {
  alert("Ververs de budgetten dan!");
};
</script>

<template>
  <Card>
    <!-- <template #header>
          <img alt="user header" src="/images/usercard.png" />
        </template> -->
    <template #title>
      <div class="flex justify-content-between flex-wrap">
        <div class="flex align-items-center justify-content-center">
          Budgetten
        </div>
        <div class="flex align-items-center justify-content-center">
          <ButtonIcon
            icon="pi pi-sync"
            title="Ververs budgetten"
            @click="clickRefreshHandler"
          />
        </div>
      </div>
    </template>
    <!-- <template #subtitle>Card subtitle</template> -->
    <template #content>
      <!-- <p class="m-0">Card</p> -->
    </template>
    <!-- <template #footer>
          <div class="flex gap-3 mt-1">
            <Button
              label="Cancel"
              severity="secondary"
              outlined
              class="w-full"
            />
            <Button label="Save" class="w-full" />
          </div>
        </template> -->
  </Card>
</template>
