<script setup lang="ts">
import Mutation from "@/models/Mutation";

defineProps<{
  mutation: Mutation | null;
}>();
</script>

<template>
  <div>{{ mutation }}</div>
</template>
