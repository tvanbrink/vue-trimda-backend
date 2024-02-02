<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import SettingsMenu from "./SettingsMenu.vue";
// import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

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
  <div id="navbar" class="desktop">
    <Toolbar>
      <template #start>
        <div class="brand">
          <div class="flex justify-content-between flex-wrap">
            <div class="flex align-items-center justify-content-center">
              <router-link
                class="no-underline font-semibold text-color-white"
                to="/"
                >vanbr.ink</router-link
              >
            </div>
            <div class="flex align-items-center justify-content-center">
              <Button
                @click="openSidebarHandler"
                icon="pi pi-bars"
                severity="contrast"
                text
                rounded
                aria-label="Bookmark"
                style="width: 2rem; height: 2rem"
              />
            </div>
          </div>
        </div>
        <div class="pl-4 page-title">{{ route.name }}</div>
      </template>

      <!-- <template #center>center</template> -->

      <template #end>
        <!-- <Button
          @click="openSideBar"
          icon="pi pi-search"
          severity="secondary"
          text
          rounded
          aria-label="Bookmark"
          style="width: 2rem; height: 2rem"
        /> -->
        <SettingsMenu />
      </template>
    </Toolbar>
  </div>
</template>
