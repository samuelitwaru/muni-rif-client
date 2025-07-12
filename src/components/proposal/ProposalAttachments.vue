<template>
  <div>
    <q-markup-table class="q-my-sm" flat bordered>
      <thead>
        <tr>
          <th align="left">Title</th>
          <th align="left" colspan="2">Files</th>
        </tr>
      </thead>
      <tbody>
        <tr class="q-tr--no-hover" v-for="item in attachments" :key="item.id">
          <td>{{ item.title }}</td>
          <td>
            <div class="flex">
              <q-chip
                v-for="file in item.files"
                dense
                :key="file.id"
                class="glossy"
                icon="attachment"
                :label="file.name"
                :removable="
                  $userHasAnyGroups(['applicant']) &&
                  $authStore.currentUser.id ==
                    $proposalStore.currentProposal.user &&
                  $proposalStore.currentProposal.status == 'EDITING'
                "
                clickable
                @remove="deleteFile(file.id)"
                @click="openFile(file.file)"
              />
            </div>
          </td>
          <td>
            <proposal-file-attachment
              :attachment_id="item.id"
              @file-uploaded="getFiles()"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
export default {
  name: "ProposalAttachments",
  data() {
    return {
      formData: {
        full_name: "",
        email: "",
        telephone: "",
        proposal: this.$route.params.proposal_id,
      },
      attachments: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getAttachments();
    },
    getAttachments() {
      this.$api.get(`attachments/`).then((res) => {
        this.attachments = res.data;
        this.getFiles();
      });
    },

    getFiles() {
      for (let index = 0; index < this.attachments.length; index++) {
        const attachment = this.attachments[index];
        this.$api
          .get(
            `files/?proposal_id=${this.$route.params.proposal_id}&attachment_id=${attachment.id}`
          )
          .then((res) => {
            var files = res.data;
            this.attachments.filter((att) => att.id == attachment.id)[0].files =
              files;
            if (index == this.attachments.length - 1) {
              alert(1)
              this.$bus.emit("attachments-updated", this.validateAttachments());
            }

          });
      }
    },

    validateAttachments() {
      for (let index = 0; index < this.attachments.length; index++) {
        const attachment = this.attachments[index];
        if (attachment?.files?.length == 0) {
          return false;
        }
      }
      return true;
    },

    deleteFile(fileId) {
      if (confirm("Delete this File?")) {
        this.$api.delete(`files/${fileId}/`).then((res) => {
          if (res.status == 204) {
            this.getFiles();
          }
        });
      }
    },

    openFile(fileURL) {
      window.open(fileURL);
    },
  },
};
</script>
