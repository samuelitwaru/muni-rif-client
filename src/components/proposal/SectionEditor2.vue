<template>
  <div
    v-if="
      proposal?.status == 'EDITING' &&
      $authStore.currentUser.id == proposal?.user
    "
  >
    <q-form @submit="updateSection" class="q-gutter-md">
      <div class="scroll">
        <q-editor
          v-model="formData[section.name]"
          label="Title of your proposal"
          outlined
          required
          min-height="30vh"
          @blur="updateSection"
        />
        <div class="text-caption text-grey-8" align="right">
          <small
            v-if="numWords > section.word_limit"
            class="text-red text-caption"
          >
            Exceeded word limit ({{ numWords }}/{{ section.word_limit }})
          </small>
          <div v-else class="text-right">
            Number of Words ({{ numWords }}/{{ section.word_limit }})
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import cheerio from "cheerio";
export default {
  name: "SectionEditor2",
  props: {
    proposal: {
      type: Object,
      required: true,
    },
    section: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      showDialog: false,
      formData: {},
    };
  },
  computed: {
    numWords() {
      return this.countWordsInHtml(this.formData[this.section.name] || "");
      // return wordCount(this.formData[this.section.name]);
      return 0;
    },
  },
  methods: {
    updateSection() {
      // this.$utilsStore.setLoading(true);

      this.$api
        .patch(`proposals/${this.$route.params.proposal_id}/`, this.formData)
        .then((res) => {
          this.$emit("proposal-updated", res.data);
          this.$bus.emit("proposal-updated", res.data);

          // this.$utilsStore.setLoading(false);
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
  mounted() {
    this.formData[this.section.name] = this.proposal[this.section.name] || "";
  },
  watch: {
    proposal(newVal) {
      this.formData[this.section.name] = newVal[this.section.name] || "";
    },
  },
};
</script>
