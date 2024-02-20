<script setup lang="ts">
import router from "../../router";
import { ref } from "vue";

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: "navigate"): void;
}>();

const handleClick = (item: any) => {
  if (router.currentRoute.value.name !== item.name) {
    router.push(item.to);
    emit("navigate");
  }
};

const items = ref([
  {
    name: "overzicht",
    to: "/",
    routeName: "overzicht",
    icon: "pi pi-home",
  },
  {
    name: "Inkomsten & Uitgaven",
    to: "expenses",
    icon: "pi pi-book",
    routeName: "expenses",
  },
]);
</script>

<template>
  <ul class="list-none p-0 m-0 overflow-hidden">
    <li v-for="item in items" :key="item.name">
      <a
        @click="handleClick(item)"
        v-ripple
        class="flex align-items-center cursor-pointer p-3 text-700 transition-duration-150 transition-colors p-ripple hover:surface-50"
        :class="
          $route.matched.some(({ name }) => name === item.routeName)
            ? 'surface-100'
            : ''
        "
      >
        <i v-if="item.icon" class="mr-2" :class="item.icon"></i>
        <span class="font-medium capitalize">{{ item.name }}</span>
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
