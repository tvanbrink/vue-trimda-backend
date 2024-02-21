<template>
  <div class="card flex justify-content-center">
    <Button
      type="button"
      icon="pi pi-file-import"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      class="b-button"
      title="Importeer mutaties"
    />
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
  </div>
</template>

<script setup>
import Menu from "primevue/menu";
import Button from "primevue/button";
import { ref } from "vue";

const test = () => {
  console.log("command");
};

const menu = ref();
const items = ref([
  {
    label: "Importeer mutaties",
    icon: "pi pi-file-import",
    command: () => {
      test();
    },
  },
]);

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<style lang="scss" scoped>
.b-button {
  font-size: 0.5rem;
  padding: 0.6rem;
  width: auto;
  background-color: var(--surface-100);
  color: var(--surface-700);
  border-width: 0;
}
</style>
