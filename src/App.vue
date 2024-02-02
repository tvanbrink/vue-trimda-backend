<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import LoadingView from "./pages/LoadingView.vue";
import NavBar from "./components/NavBar/NavBar.vue";
import DeveloperModal from "./components/DeveloperModal.vue";
import Toast from "primevue/toast";
import { onMounted, ref, watch } from "vue";
import { helper } from "./helpers/helpers";

const { isLoading, isAuthenticated } = useAuth0();

let loading = ref(true);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

watch(isLoading, async (current) => {
  if (!current) {
    await sleep(1000);

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

    <NavBar v-if="!loading && isAuthenticated" />

    <div id="content" v-if="!loading && isAuthenticated">
      <router-view />
    </div>

    <Toast position="bottom-right" />

    <DeveloperModal
      v-if="!loading && isAuthenticated && !helper.environment.isProduction()"
    />
  </div>
</template>
