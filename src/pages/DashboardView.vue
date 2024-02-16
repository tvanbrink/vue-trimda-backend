<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";

const { user } = useAuth0();
</script>

<template>
  <div class="flex justify-content-center flex-wrap pt-5">
    <div style="max-width: 500px">{{ user }}</div>
  </div>
</template>
