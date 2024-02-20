<script setup lang="ts">
import Card from "primevue/card";
</script>

<template>
  <Card>
    <!-- <template #header>
          <img alt="user header" src="/images/usercard.png" />
        </template> -->
    <template #title>Transacties</template>
    <!-- <template #subtitle>Card subtitle</template> -->
    <template #content>
      <p class="m-0">Card</p>
    </template>
    <!-- <template #footer>
          <div class="flex gap-3 mt-1">
            <Button
              label="Cancel"
              severity="secondary"
              outlined
              class="w-full"
            />
            <Button label="Save" class="w-full" />
          </div>
        </template> -->
  </Card>
</template>
