<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import { useAppStore } from "./store/app";
import LoadingView from "./pages/LoadingView.vue";
import Navigation from "./components/navigation/NavBar.vue";
import DeveloperModal from "./components/DeveloperModal.vue";
import Toast from "primevue/toast";
import { onMounted, ref, watch } from "vue";
import { helper } from "./helpers/helpers";

const { isLoading, isAuthenticated } = useAuth0();
const app = useAppStore();

let loading = ref(true);

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

watch(isLoading, async (current) => {
  if (!current) {
    await app.setUser();
    await app.setSettings();

    if (isAuthenticated.value) {
      loading.value = false;
    }
  }
});

onMounted(() => {
  loading.value = isLoading.value;
});
</script>

<template>
  <div>
    <LoadingView v-if="loading" />

    <Navigation v-if="!loading && isAuthenticated" />

    <div id="content" v-if="!loading && isAuthenticated" class="px-3">
      <router-view />
    </div>

    <Toast position="bottom-right" />

    <DeveloperModal
      v-if="!loading && isAuthenticated && !helper.environment.isProduction()"
    />
  </div>
</template>
