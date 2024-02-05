<script setup lang="ts">
// import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import SettingsMenu from "./SettingsMenu.vue";

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: "sidebarOpen"): void;
}>();

const openSidebarHandler = () => {
  emit("sidebarOpen");
};
</script>

<template>
  <div id="navbar" class="mobile">
    <div
      class="flex justify-content-between flex-wrap bg-primary text-white fixed w-full"
    >
      <div class="flex align-items-center justify-content-center">
        <Button
          @click="openSidebarHandler"
          icon="pi pi-bars"
          severity="contrast"
          text
          rounded
          aria-label="Bookmark"
          style="width: 2rem; height: 2rem"
          class="text-white"
        />
      </div>
      <div class="brand flex align-items-center justify-content-center">
        <router-link class="no-underline font-semibold text-color-white" to="/"
          >vanbr.ink</router-link
        >
      </div>
      <div class="flex align-items-center justify-content-center">
        <SettingsMenu />
      </div>
    </div>
  </div>
</template>

<style scoped>
.brand {
  position: fixed;
  left: calc(50% - 36px);
  top: 20px;
}

.flex-wrap {
  height: 64px;
}
</style>
