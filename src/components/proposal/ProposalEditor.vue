<template lang>
  <div>
    <!-- <accept-review :proposal="proposal" :score="score" /> -->
    <div v-for="section in sections" :key="section.id">
      <hr :id="section.name" class="section-separator" />
      <div class="q-pa-sm">
        <q-toolbar-title class="flex justify-between">
          <div class="flex">
            {{ section.title }}
          </div>
        </q-toolbar-title>

        <div v-if="section.name=='attachments'">
          <q-markup-table class="q-ma-sm" flat bordered>
            <thead>
              <tr>
                <th align="left">Title</th>
                <th align="left" colspan="2">Files</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in attachments" :key="item.id">
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
                      @click="openFile(file.file)" />
                  </div>
                </td>
                <td>
                  <proposal-file-attachment
                    :attachment_id="item.id"
                    @file-uploaded="getFiles()" />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>

        <q-card v-else flat bordered class="bg-grey-2 q-pa-sm">
          <div>
            <div
              style="overflow: auto; min-height: 5rem"
              v-html="proposal?.[section['name']] || ''"></div>
          </div>
        </q-card>
      </div>
    </div>
    <hr id="solution" class="section-separator" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      sections: [],
      proposal: {},
      score: null,
      content: `
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati
        natus animi, et itaque ea tempora, exercitationem nemo nobis eos quos
        corrupti quasi cupiditate recusandae magnam, quis dicta facere dolore
        blanditiis.
      </p>`,
      attachments:[],
    };
  },

  created() {
    this.getProposal();
    this.getSections();
  },

  methods: {
    getProposal() {
      this.$api
        .get(`proposals/${this.$route.params.proposal_id}/`)
        .then((res) => {
          this.proposal = res.data;
          this.$proposalStore.setProposal(this.proposal);
          this.getScore();
          this.getAttachments();
        });
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
          });
      }
    },

    getScore() {
      console.log(this.$authStore.currentUser?.id || 0);
      this.$api
        .get(
          `scores/?user=${this.$authStore.currentUser?.id || 0}&proposal=${
            this.$route.params.proposal_id
          }`
        )
        .then((res) => {
          if (res.data.length == 1) {
            this.score = res.data[0];
          }
        });
    },

    getSections() {
      this.$api.get(`sections/`).then((res) => {
        this.sections = res.data;
      });
    },
  },
};
</script>
<style>
body,
html {
  scroll-behavior: smooth;
}

.section-separator {
  margin-bottom: 3rem;
}
</style>
