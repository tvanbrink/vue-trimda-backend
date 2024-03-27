<script setup lang="ts">
import FileUpload from "primevue/fileupload";
import Dialog from "primevue/dialog";
import ProgressBar from "primevue/progressbar";
import { ref } from "vue";
import { helper } from "@/helpers/helpers";
import Mutation from "@/models/Mutation";
import MutationService from "../../services/MutationService";
import { usePageExpensesStore } from "@/store/pageExpenses";

const expenseStore = usePageExpensesStore();

const mutationService: MutationService = new MutationService();

const dialogVisible = ref(false);
let mutations: Mutation[] = [];
const progress = ref(0);
const stepDescription = ref("");

const showDialog = () => {
  dialogVisible.value = true;
};

const closeDialog = async () => {
  await helper.utils.sleep(3000);
  dialogVisible.value = false;
};

const initDialog = () => {
  mutations = [];
  progress.value = 0;
};

const onUpload = async (event: any) => {
  const file: File = event.files[0];
  initDialog();
  showDialog();

  // read excel
  stepDescription.value = "Exporteer excel data";
  helper.convert.xlsToJson(mutations, file);

  await helper.utils.sleep(1000);

  progress.value = 33;

  // validate data
  stepDescription.value = "Valideer data";

  await helper.utils.sleep(1000);

  progress.value = 66;

  // send data to webservice
  stepDescription.value = "Sla data op";

  await mutationService
    .create(mutations)
    .then(async () => {
      await expenseStore.reload();
    })
    .catch((reason: any) => {
      console.log("catch : ", reason);
    });

  progress.value = 100;

  await closeDialog();
};
</script>

<template>
  <div>
    <FileUpload
      mode="basic"
      accept=".xls"
      :maxFileSize="1000000"
      customUpload
      @uploader="onUpload"
      :auto="true"
      :multiple="false"
      chooseLabel=""
      :showCancelButton="false"
      :showUploadButton="false"
    />

    <!-- eslint-disable vue/no-v-model-argument -->
    <Dialog
      v-model:visible="dialogVisible"
      modal
      header="Importeer mutaties"
      :style="{ width: '30rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      position="center"
      :closable="false"
      :dismissableMask="false"
      :closeOnEscape="false"
    >
      <template #header>
        <div
          class="flex justify-content-between align-content-end flex-wrap w-full"
        >
          <div
            class="flex align-items-center justify-content-center p-dialog-title"
          >
            Importeer mutaties
          </div>
          <!-- <div class="flex align-items-center justify-content-center">
            {{ stepDescription }}
          </div> -->
        </div>
      </template>

      <p>{{ stepDescription }}</p>

      <ProgressBar :value="progress" />

      <!-- <template #footer>
        <Button
          label="Annuleer"
          text
          severity="secondary"
          @click="closeModal"
        />
        <Button
          label="Opslaan"
          severity="primary"
          @click="closeModal"
          :disabled="canSave"
        />
      </template> -->
    </Dialog>
  </div>
</template>
