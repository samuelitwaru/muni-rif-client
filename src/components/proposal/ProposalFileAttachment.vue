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
      dense
      flat
      @click="modalVisible = true"
    />
    <q-dialog v-model="modalVisible">
      <q-card style="width: 500px">
        <q-card-section class="flex justify-between q-pa-sm text-center">
          <div class="text-h6">Attachments</div>
          <q-btn color="primary" icon="close" flat @click="uploadedFiles = [];modalVisible = false;" />
        </q-card-section>
        <q-separator spaced />
        <q-card-section class="q-pa-sm">
          <div>
            <q-uploader
              :url="uploadUrl"
              multiple
              @added="onFileAdded"
              style="width: 100%"
              flat
            >
              <template v-slot:header>
                <div
                  class="text-center q-my-auto q-py-lg"
                  style="background-color: #ffffff; color: #000000"
                >
                  Drag and drop files here
                </div>

                <div
                  class="text-center"
                  style="background-color: #ffffff; color: #000000"
                >
                  or
                  <br />
                  <br />
                  <input
                    @change="onBrowse"
                    type="file"
                    id="files"
                    class="hidden"
                    multiple
                    :accept="acceptedFileTypes"
                  />
                  <div>
                    <label for="files" class="button-label"> Browse </label>
                  </div>
                </div>
              </template>

              <template v-slot:list>
                <q-list separator dense >
                  <q-item v-for="file in filesToUpload" :key="file.__key">
                    <q-item-section>
                      <q-item-label class="full-width ellipsis">
                        {{ file.name }}
                      </q-item-label>

                      <q-item-label caption>
                        {{ file.__sizeLabel }} {{ file.__progressLabel }}
                      </q-item-label>
                    </q-item-section>

                    <q-item-section top side>
                      <q-spinner size="20px" color="primary" />
                    </q-item-section>
                  </q-item>
                </q-list>

                <div align="center">
                  <br />
                  Only <strong>PDF, WORD, EXCEL</strong> are accepted
                </div>
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
  props: ["attachment_id"],
  data() {
    return {
      acceptedFileTypes:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
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
      files.forEach((file) => {
        console.dir(file);
        if (file.type && this.acceptedFileTypes.includes(file.type)) {
          this.uploadFile(file);
          this.filesToUpload.push(file);
        }
      });
      // this.filesToUpload = [...this.filesToUpload, ...files];
    },
    onBrowse(event) {
      var files = Array.from(event.target.files);
      this.onFileAdded(files);
    },
    uploadFile(file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", file.name);
      formData.append("attachment", this.attachment_id);
      formData.append("proposal", this.$route.params["proposal_id"]);

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
          this.uploadedFiles = [];
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

<style>
.button-label {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff; /* Button background color */
  color: #fff; /* Text color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  /* Add any other styles you desire */
}

/* Hover effect */
.button-label:hover {
  background-color: #0056b3; /* Darker shade of the button color */
}
</style>
