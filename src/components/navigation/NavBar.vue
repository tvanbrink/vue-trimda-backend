<!-- eslint-disable vue/no-v-model-argument -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import SideBarMenu from "./SideBarMenu.vue";
import Sidebar from "primevue/sidebar";
import { useRoute } from "vue-router";
import NavDesktop from "./NavDesktop.vue";
import NavMobile from "./NavMobile.vue";

const route = useRoute();
const sidebarOpen = ref(false);
let isMobile = ref(false);

const onNavigateHandler = () => {
  sidebarOpen.value = false;
};

const onSidebarOpenHandler = () => {
  sidebarOpen.value = true;
};

const windowResizeHandler = () => {
  isMobile.value = window.innerWidth < 767;
};

onMounted(() => {
  windowResizeHandler();
  window.addEventListener("resize", windowResizeHandler);
});
</script>

<template>
  <div id="navigatie" v-if="route.name !== 'Page not found'">
    <NavDesktop v-if="!isMobile" @sidebarOpen="onSidebarOpenHandler" />
    <NavMobile v-else @sidebarOpen="onSidebarOpenHandler" />

    <!-- eslint-disable-next-line vue/no-v-model-argument -->
    <Sidebar v-model:visible="sidebarOpen" header="Menu" style="width: 16rem">
      <SideBarMenu @navigate="onNavigateHandler" />
    </Sidebar>
  </div>
</template>
