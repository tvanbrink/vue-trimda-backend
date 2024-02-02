<script setup lang="ts">
import router from "@/router";
import { useAuth0 } from "@auth0/auth0-vue";
import Button from "primevue/button";
import Menu from "primevue/menu";
import { ref } from "vue";

const { user, logout } = useAuth0();
const menu = ref();

const handleLogout = () => {
  logout({ logoutParams: { returnTo: window.location.origin } });
};
const toggle = (event: any) => {
  menu.value.toggle(event);
};

const items = ref([
  {
    label: "Options",
    items: [
      {
        label: "Settings",
        icon: "pi pi-cog",
        command: () => router.push({ name: "profile" }),
      },
    ],
  },
  {
    separator: true,
  },
  {
    label: "Logout",
    icon: "pi pi-sign-out",
    command: () => handleLogout(),
  },
]);
</script>

<template>
  <div>
    <Button
      class="hidden md:block"
      label="Submit"
      @click="toggle"
      size="small"
      severity="secondary"
      text
      >{{ user?.given_name ?? user?.nickname }}
      <i class="pi pi-angle-down ml-2" style="font-size: 1rem"></i
    ></Button>

    <Menu ref="menu" :model="items" :popup="true" />
  </div>
</template>
