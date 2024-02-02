<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
// import SettingsMenu from "./SettingsMenu.vue";

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
    <Toolbar>
      <template #start>
        <Button
          @click="openSidebarHandler"
          icon="pi pi-bars"
          severity="contrast"
          text
          rounded
          aria-label="Bookmark"
          style="width: 2rem; height: 2rem"
        />
      </template>

      <template #center>
        <router-link class="no-underline font-semibold text-color-white" to="/"
          >vanbr.ink</router-link
        >
      </template>

      <template #end>
        <SettingsMenu />
      </template>
    </Toolbar>
  </div>
</template>
