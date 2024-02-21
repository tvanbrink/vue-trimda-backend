<script setup lang="ts">
import Button from "primevue/button";

defineProps<{
  icon: string;
  title: string;
}>();
</script>

<template>
  <Button
    class="p-button-icon-custom"
    type="button"
    :icon="icon"
    :title="title"
  />
</template>
