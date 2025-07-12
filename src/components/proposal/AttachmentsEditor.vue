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
        <tr v-for="item in attachments" :key="item.id">
          <td>
            {{ item.title }}
            <span v-if="item.is_required" class="text-red">*</span>
          </td>
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
  name: "AttachmentEditor",
  data() {
    return {
      formData: {
        full_name: "",
        email: "",
        telephone: "",
        proposal: this.$route.params.proposal_id,
      },
      attachments: [],
      attachmentsValid: false,
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
              setTimeout(() => {
                let isAttachmentsValid = this.validateAttachments();
              }, 1000);
            }
          });
      }
    },

    validateAttachments() {
      let isAttachmentsValid = true;
      let invalidAttachements = this.attachments.filter(
        (attachment) => {
          return attachment.is_required && !attachment.files?.length
        }
      );
      if (invalidAttachements.length) {
        isAttachmentsValid = false;
      } else {
        isAttachmentsValid = true;
      }
      this.$bus.emit("attachments-updated", isAttachmentsValid);
      return isAttachmentsValid;
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
