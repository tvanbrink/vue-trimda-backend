<script setup lang="ts">
import { onMounted, ref } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import { useAppStore } from "../store/app";

import { useAuth0 } from "@auth0/auth0-vue";
const app = useAppStore();

const { user, getAccessTokenSilently } = useAuth0();

const visible = ref(false);
const token = ref({});

onMounted(async () => {
  token.value = await getAccessTokenSilently();
});
</script>

<template>
  <div>
    <Button @click="visible = true"><i class="pi pi-code"></i></Button>

    <!-- eslint-disable vue/no-v-model-argument -->
    <Dialog
      v-model:visible="visible"
      maximizable
      modal
      header="Developer insight"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <!-- eslint-enable vue/no-v-model-argument -->
      <Accordion>
        <AccordionTab header="User object (Auth0)">
          <p class="m-0">
            {{ user }}
          </p>
        </AccordionTab>
        <AccordionTab header="User Jwt">
          {{ token }}
        </AccordionTab>
        <AccordionTab header="User object (DB)">
          <p class="m-0">
            {{ app.getUser }}
          </p>
        </AccordionTab>
        <AccordionTab header="User settings (DB)">
          {{ app.getSettings }}
        </AccordionTab>
      </Accordion>
    </Dialog>
  </div>
</template>

<style lang="scss" scoped>
Button {
  background-color: var(--surface-200) !important;
  color: var(--surface-700) !important;
  border-width: 0;
  position: fixed;
  bottom: 10px;
  right: 10px;
  padding: 0.75rem;
  // width: 40px;
  // height: 40px;
  &:hover {
    background-color: var(--surface-300) !important;
  }

  &:focus {
    box-shadow: none;
  }
}
AccordionTab {
  word-wrap: break-word;
}
</style>
