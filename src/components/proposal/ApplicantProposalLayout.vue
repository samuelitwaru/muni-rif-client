<template>
  <q-layout view="lHh Lpr lFf" v-if="$proposalStore.currentProposal">
    <loading-component />
    <q-header elevated>
      <q-toolbar class="bg-white text-dark">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title class="flex justify-between items-center">
          <div class="flex justify-between items-center">
            <div class="q-my-xs">
              <q-input
                style="min-width: 20rem"
                v-if="
                  editMode &&
                  $proposalStore.currentProposal?.status == 'EDITING'
                "
                @blur="editProposalTitle"
                v-model="formData.title"
                type="text"
                outlined
                dense
              />
              <span style="cursor: pointer" @click="editMode = true" v-else>{{
                $proposalStore.currentProposal?.title
              }}</span>
            </div>
            <q-chip
              color="secondary"
              class="text-white"
              size="md"
              :label="$proposalStore.currentProposal?.status"
            />
          </div>
        </q-toolbar-title>
        <div class="flex">
          <q-btn
            v-if="$proposalStore.currentProposal?.status != 'EDITING'"
            color="primary"
            icon="download"
            dense
            label="download"
            @click="downloadProposal"
          />
          <proposal-options />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-grey-2"
      show-if-above
      bordered
      :width="220"
    >
      <q-card flat class="q-py-sm">
        <router-link to="/applicant/proposals">
          <q-btn
            class="q-mx-sm"
            block
            color="primary"
            flat
            icon="arrow_back"
            label="My Proposals"
          />
        </router-link>
      </q-card>
      <q-separator />
      <q-list>
        <a
          v-for="section in sections"
          :key="section.id"
          :href="`/applicant/proposals/${$route.params.proposal_id}${section.ref}`"
        >
          <q-item clickable v-ripple>
            <div class="text-caption q-px-sm q-my-auto q-mr-sm">
              <q-icon
                v-if="validateSection(section)"
                size="sm"
                color="green"
                name="check_circle_outline"
              />
              <q-icon v-else size="sm" color="red" name="dangerous" />
            </div>

            <q-item-section>{{ section.title }}</q-item-section>
          </q-item>
          <q-separator />
        </a>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-md">
        <q-toolbar-title class="flex justify-between">
          <div class="flex">Background Information</div>
        </q-toolbar-title>
        <div>
          <q-markup-table flat bordered class="q-ma-sm">
            <tbody>
              <tr class="q-tr--no-hover">
                <td class="text-left">Title</td>
                <td class="text-left">
                  <q-input
                    style="min-width: 20rem"
                    v-if="$proposalStore.currentProposal?.status == 'EDITING'"
                    @blur="editProposalTitle"
                    v-model="formData.title"
                    type="text"
                    outlined
                    dense
                  />
                  <label v-else>
                    {{ $proposalStore.currentProposal.title }}
                  </label>
                </td>
              </tr>
              <tr class="q-tr--no-hover">
                <td class="text-left">Theme</td>
                <td class="text-left">
                  {{ $proposalStore.currentProposal.theme_title }}
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>

      <router-view></router-view>

      <div
        v-if="$proposalStore.currentProposal?.status == 'EDITING'"
        align="center"
        class="flex justify-center q-mb-lg"
      >
        <router-link class="q-mx-sm" to="/applicant/proposals">
          <q-btn
            color="secondary"
            outline
            icon="check"
            label="save and continue later"
          />
        </router-link>

        <submit-proposal
          :disabled="!isProposalValid"
          :proposal="$proposalStore.currentProposal"
        />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { protectFile } from "src/utils/helpers";
import cheerio from "cheerio";

export default defineComponent({
  name: "ProposalLayout",

  data() {
    return {
      formData: {
        title: "",
      },
      proposal: null,
      editMode: false,
      leftDrawerOpen: false,
      score: {},
      sections: [],
      isAttachmentsValid: false,
      isTeamValid: false,
      isBudgetValid: false,
      validity: {},
    };
  },

  computed: {
    wordCounts() {
      let wordCountsObject = {};
      for (let index = 0; index < this.sections.length; index++) {
        const section = this.sections[index];
        wordCountsObject[section.name] = this.countWordsInHtml(
          this.proposal[section.name] || ""
        );
      }
      return wordCountsObject;
    },

    isProposalValid() {
      var isValid = true;
      for (let key in this.validity) {
        if (this.validity.hasOwnProperty(key)) {
          if (this.validity[key]) continue;
          else return false;
        }
      }
      return isValid;
    },
  },

  created() {
    protectFile(this.$options.__file);
    this.getProposal();
    this.$bus.on("proposal-updated", (val) => {
      this.getProposal(false);
    });

    this.$bus.on("attachments-updated", (val) => {
      this.isAttachmentsValid = val;
    });
  },

  methods: {
    getProposal(withLoading = true) {
      this.$utilsStore.setLoading(withLoading);
      this.$api
        .get(`proposals/${this.$route.params.proposal_id}/`)
        .then((res) => {
          this.proposal = res.data;
          this.formData.title = this.proposal.title;
          this.$proposalStore.setProposal(this.proposal);
          // this.getProposalFiles();
          this.getSections();
          this.getScore();
          this.getTeam();
          this.getBudget();
          this.$utilsStore.setLoading(false);
        });
    },

    getTeam() {
      this.$api
        .get(`teams/?proposal=${this.$route.params.proposal_id}`)
        .then((res) => {
          if (res.data.length) {
            this.isTeamValid = true;
          } else {
            this.isTeamValid = false;
          }
        });
    },

    getBudget() {
      this.$api
        .get(`budgets/?proposal=${this.$route.params.proposal_id}`)
        .then((res) => {
          if (res.data.length) {
            this.isBudgetValid = true;
          } else {
            this.isBudgetValid = false;
          }
        });
    },

    getScore() {
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

    editProposalTitle() {
      this.$api
        .patch(`/proposals/${this.$route.params.proposal_id}/`, this.formData)
        .then((res) => {
          this.$proposalStore.setProposal(res.data);
          this.editMode = false;
        });
    },

    deleteFile(fileId) {
      if (confirm("Delete this File?")) {
        this.$api.delete(`files/${fileId}/`).then((res) => {
          this.getProposalFiles();
        });
      }
    },

    getSections() {
      this.$api.get(`sections/`).then((res) => {
        this.sections = res.data;
      });
    },

    downloadProposal() {
      this.$api
        .get(`proposals/${this.$route.params.proposal_id}/pdf/download/`)
        .then((res) => {
          if (res.status == 200) {
            window.open(res.data.file_url, "_blank");
          }
        });
    },

    openFile(fileURL) {
      window.open(fileURL);
    },

    countWordsInHtml(htmlString) {
      const $ = cheerio.load(htmlString);

      // Get the text content without HTML tags
      const cleanText = $("body").text();

      // Split the text into words and count them
      const words = cleanText.split(/\s+/);
      const numWords = words.length;

      return numWords;
    },

    validateSection(section) {
      let isValid = false;
      if (section.name == "attachments") {
        isValid = this.isAttachmentsValid;
        this.validity[section.name] = isValid;
        return isValid;
      } else if (section.name == "summary_budget") {
        isValid = this.isBudgetValid;
        this.validity[section.name] = isValid;
        return isValid;
      } else if (section.name == "team") {
        isValid = this.isTeamValid;
        this.validity[section.name] = isValid;
        return isValid;
      }
      isValid =
        this.wordCounts[section.name] >= section.lower_limit &&
        this.wordCounts[section.name] <= section.word_limit;
      this.validity[section.name] = isValid;
      return isValid;
    },
  },
});
</script>

<style>
a {
  text-decoration: none;
}
</style>
