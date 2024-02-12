<template>
  <div
    v-if="
      $proposalStore.currentProposal?.status == 'EDITING' &&
      $authStore.currentUser.id == $proposalStore.currentProposal?.user
    "
  >
    <q-btn
      color="primary"
      icon="attachment"
      label="Add"
      flat
      @click="modalVisible = true"
    />
    <q-dialog v-model="modalVisible">
      <q-card style="width: 400px">
        <q-card-section class="q-pa-sm text-center">
          <div class="text-h6">Attachments</div>
        </q-card-section>
        <q-separator spaced />
        <q-card-section class="q-pa-sm">
          <div>
            <q-uploader
              :url="uploadUrl"
              multiple
              @added="onFileAdded"
              style="width: 100%"
            >
              <template v-slot:header>
                <div
                  class="text-center q-my-auto q-py-lg"
                  style="background-color: #ffffff; color: #000000"
                >
                  Drag and drop files here
                </div>
              </template>

              <template v-slot:list>
                <q-list separator>
                  <q-item v-for="file in filesToUpload" :key="file.__key">
                    <q-item-section>
                      <q-item-label class="full-width ellipsis">
                        {{ file.name }}
                      </q-item-label>

                      <q-item-label caption>
                        {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                      </q-item-label>
                    </q-item-section>

                    <q-item-section top side>
                      <q-spinner size="20px" color="primary" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </template>
            </q-uploader>
          </div>
        </q-card-section>
        <q-card-section class="q-pa-sm">
          <q-chip
            dense
            v-for="file in uploadedFiles"
            :key="file.__key"
            class="glossy"
            icon="check"
            :label="file.name"
          />
        </q-card-section>

        <q-separator spaced />
        <q-card-section align="right">
          <q-btn
            color="primary"
            label="Done"
            @click="
              uploadedFiles = [];
              modalVisible = false;
            "
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalVisible: false,
      uploadUrl: `${this.$api.getUri()}/files/`,
      uploadHeaders: {
        // Add any headers required for authentication or other purposes
      },
      filesToUpload: [],
      uploadedFiles: [],
    };
  },
  methods: {
    onFileAdded(files) {
      var file = files[0];
      files.forEach((file) => {
        this.uploadFile(file);
      });
      this.filesToUpload = [...this.filesToUpload, ...files];
    },
    uploadFile(file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", file.name);
      formData.append("proposal", this.$route.params["id"]);

      // You might want to add more data to the formData if needed

      // Perform the actual upload
      this.$api
        .post(this.uploadUrl, formData, {
          headers: this.uploadHeaders,
        })
        .then((response) => {
          this.uploadedFiles.push(file);
          this.filesToUpload = this.filesToUpload.filter(
            (element) => element.key != file.key
          );
          console.log(file);
          console.log(this.filesToUpload);

          // Handle the response
          // this.modalVisible = false;
          this.$emit("file-uploaded");
        })
        .catch((error) => {
          // Handle errors
          console.log(error);
        });
    },
  },
};
</script>
