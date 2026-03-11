<template lang="">
  <div>
    <!-- use table instead of cards -->
    <q-card class="my-card q-ma-sm" flat bordered style="max-width: 100%">
      <q-card-section>
        <div class="text-h6">Useful Documents</div>
      </q-card-section>
      <q-separator />
      <q-card-actions vertical style="overflow-x: auto">
        <q-markup-table flat separator="cell" bordered>
          <tbody>
            <tr v-for="file in files" :key="file.id" class="q-tr--no-hover">
              <td class="text-left">{{ file.title }}</td>
              <td class="text-left">
                <q-chip
                  v-if="file.file"
                  color="secondary"
                  icon="note"
                  class="glossy"
                  :label="getFileNameFromUrl(file.file)"
                  clickable
                  @click="openFile(file.file)"
                />
              </td>
              <td
                class="text-right"
                v-if="$userHasAnyGroups(['grants_officer'])"
              >
                <FileUploader2
                  @file-uploaded="getDocuments()"
                  :uploadUrl="`/documents/${file.id}/update-document/`"
                  :multiple="false"
                  :formData="{
                    id: file.id,
                    title: file.title,
                    file: file.file,
                    call: file.call,
                  }"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-actions>
    </q-card>
  </div>
</template>
<script>
import FileUploader2 from "./widgets/FileUploader2.vue";
export default {
  components: { FileUploader2 },
  data() {
    return {
      files: [
        {
          name: "MUNIRIF_PROPOSAL_GUIDELINES_Round_2",
          url: "https://munirif.vps.webdock.cloud/media/MUNIRIF_PROPOSAL_GUIDELINES_Round_2.pdf",
        },
        {
          name: "MUNIRIF_Round_Two_Call_Final",
          url: "https://munirif.vps.webdock.cloud/media/MUNIRIF_Round_Two_Call_Final.pdf",
        },
      ],
    };
  },
  created() {
    this.getDocuments();
  },
  computed: {},
  methods: {
    getDocuments() {
      this.$api.get("documents/").then((response) => {
        this.files = response.data;
        console.log("docs", response.data);
      });
    },
    openFile(fileURL) {
      window.open(fileURL);
    },
    getFileNameFromUrl(url) {
      const splits = url.split("/");
      return splits[splits.length - 1];
    },
  },
};
</script>
<style lang=""></style>
