<template>
  <div
    v-if="
      proposal?.status == 'EDITING' &&
      $authStore.currentUser.id == proposal?.user
    "
  >
    <q-btn
      color="primary"
      label="Submit"
      dense
      flat
      @click="modalVisible = true"
    />
    <q-dialog v-model="modalVisible">
      <q-card>
        <q-card-section> </q-card-section>
        <q-separator />

        <q-card-section>
          <q-markup-table flat dense bordered separator="vertical">
            <thead>
              <tr class="bg-grey-3">
                <th class="text-left">Section</th>
                <th class="text-left">Limit</th>
                <th class="text-left">Words</th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="section in sections" :key="section.id">
                <td class="text-left">{{ section.title }}</td>
                <td class="text-left">{{ section.word_limit }}</td>
                <td class="text-left">
                  {{ wordCounts[section.name] }}
                </td>
                <td class="text-left">
                  <q-icon
                    name="check"
                    class="text-green"
                    v-if="wordCounts[section.name] <= section.word_limit"
                  />
                  <q-icon class="text-red" v-else name="close" />
                </td>
              </tr>
            </tbody>
          </q-markup-table>

          <q-separator spaced />

          <alert-msg
            message="You will not be able to edit this proposal once submitted."
            icon="crisis_alert"
          />
          <p class="q-pa-md">Do you wish to proceed?</p>
        </q-card-section>
        <q-separator />
        <q-card-section align="right">
          <q-btn
            color="primary"
            flat
            label="Cancel"
            @click="modalVisible = false"
          />
          <q-btn
            :disabled="!wordCountsValid"
            color="primary"
            label="Submit"
            @click="submitProposal"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import cheerio from "cheerio";

export default {
  props: {
    proposal: { type: Object, required: true },
  },
  data() {
    return {
      modalVisible: false,
      sections: [],
      // proposal: null,
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

    wordCountsValid() {
      let wordCountsObject = {};
      for (let index = 0; index < this.sections.length; index++) {
        const section = this.sections[index];
        if (wordCountsObject[section.name] >= this.sections[section.name]) {
          return false;
        }
      }

      return true;
    },
  },

  created() {
    this.getSections();
  },
  methods: {
    getProposal() {
      this.$api.get(`/proposals/${this.$route.params.id}/`);
    },
    submitProposal() {
      this.$utilsStore.setLoading(true);
      this.$api
        .patch(`/proposals/${this.$route.params.id}/`, {
          status: "SUBMITTED",
        })
        .then((res) => {
          this.$utilsStore.setLoading(false);
          location.reload();
        });
    },

    getSections() {
      this.$api.get(`sections/`).then((res) => {
        this.sections = res.data;
      });
    },

    countWordsInHtml(htmlString) {
      const $ = cheerio.load(htmlString);

      // Get the text content without HTML tags
      const cleanText = $("body").text();

      // Split the text into words and count them
      const words = cleanText.split(/\s+/);
      const numWords = words.length;

      return numWords - 1;
    },
  },
};
</script>
