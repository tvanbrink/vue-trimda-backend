<script setup lang="ts">
import { onMounted, ref } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

const visible = ref(false);

onMounted(async () => {
  console.log(visible);
});
</script>

<template>
  <div>
    <Button @click="visible = true"><i class="pi pi-code"></i></Button>

    <!-- eslint-disable vue/no-v-model-argument -->
    <Dialog
      v-model:visible="visible"
      maximizable
      modal
      header="Developer insight"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
    </Dialog>
  </div>
</template>

<style lang="scss" scoped>
Button {
  background-color: var(--surface-200) !important;
  color: var(--surface-700) !important;
  border-width: 0;
  position: fixed;
  bottom: 10px;
  right: 10px;
  padding: 0.75rem;
  // width: 40px;
  // height: 40px;
  &:hover {
    background-color: var(--surface-300) !important;
  }

  &:focus {
    box-shadow: none;
  }
}
AccordionTab {
  word-wrap: break-word;
}
</style>
