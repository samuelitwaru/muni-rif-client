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
      <q-card>
        <q-card-section>
          <div class="text-h6">Upload File</div>
        </q-card-section>

        <q-card-section>
          <div>
            <q-uploader
              :url="uploadUrl"
              multiple
              @added="onFileAdded"
              style="max-width: 800px"
            >
              <template v-slot:header>
                <div
                  class="text-h6 text-center q-my-auto q-py-lg"
                  style="background-color: #ffffff; color: #000000"
                >
                  Drag and drop files here
                </div>
              </template>
            </q-uploader>
          </div>
        </q-card-section>
        <q-separator spaced />
        <q-card-section align="right">
          <q-btn color="primary" label="Done" />
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
    };
  },
  methods: {
    onFileAdded(files) {
      var file = files[0];
      this.uploadFile(file);
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
          // Handle the response
          this.modalVisible = false;
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
