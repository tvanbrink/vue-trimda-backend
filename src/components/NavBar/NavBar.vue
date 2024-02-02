<!-- eslint-disable vue/no-v-model-argument -->
<script setup lang="ts">
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import SettingsMenu from "./SettingsMenu.vue";
import { ref } from "vue";
import SideBarMenu from "./SideBarMenu.vue";
import Sidebar from "primevue/sidebar";
import { useRoute } from "vue-router";

const route = useRoute();
const sidebarOpen = ref(false);

const openSideBar = () => {
  sidebarOpen.value = true;

  console.log("openSideBar", sidebarOpen.value);
};

const onNavigateHandler = () => {
  sidebarOpen.value = false;
};
</script>

<template>
  <div>
    <div id="navbar" v-if="route.name !== 'Page not found'">
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
                  @click="openSideBar"
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

    <!-- eslint-disable-next-line vue/no-v-model-argument -->
    <Sidebar v-model:visible="sidebarOpen" header="Menu" style="width: 16rem">
      <SideBarMenu @navigate="onNavigateHandler" />
    </Sidebar>
  </div>
</template>

<style lang="scss">
#navbar .p-toolbar {
  border-radius: 0;
  border-width: 0 0 0 0;
  border-color: var(--surface-100);
  padding: 0 1.25rem 0 0;
  background-color: #ffffff;

  .brand {
    padding: 1rem;
    background-color: var(--primary-color) !important;
    width: 255px;

    a {
      color: white;
    }

    .p-button-icon {
      color: white;
    }
  }

  .page-title {
    text-transform: capitalize;
  }
}
</style>
