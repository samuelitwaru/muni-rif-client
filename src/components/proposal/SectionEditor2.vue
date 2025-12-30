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
          @paste="onPaste"
          ref="editorRef"
        />
        <div class="text-caption text-grey-8" align="right">
          <small
            v-if="numWords > section.word_limit"
            class="text-red text-caption"
          >
            Exceeded word limit ({{ numWords }}/{{ section.lower_limit }}-{{
              section.word_limit
            }})
          </small>
          <div v-else class="text-right">
            Number of Words ({{ numWords }}/{{ section.lower_limit }}-{{
              section.word_limit
            }})
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import { removeHTMLTags } from 'src/utils/helpers';

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
      // Get the text content without HTML tags
      const cleanText = removeHTMLTags(htmlString);

      // Split the text into words and count them
      const words = cleanText.split(/\s+/);
      const numWords = words.length;

      return numWords - 1;
    },

    onPaste(evt) {
      // Let inputs do their thing, so we don't break pasting of links.
      if (evt.target.nodeName === "INPUT") return;
      let text, onPasteStripFormattingIEPaste;
      evt.preventDefault();
      evt.stopPropagation();
      if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
        text = evt.originalEvent.clipboardData.getData("text/plain");
        this.$refs.editorRef.runCmd("insertText", text);
      } else if (evt.clipboardData && evt.clipboardData.getData) {
        text = evt.clipboardData.getData("text/plain");
        this.$refs.editorRef.runCmd("insertText", text);
      } else if (window.clipboardData && window.clipboardData.getData) {
        if (!onPasteStripFormattingIEPaste) {
          onPasteStripFormattingIEPaste = true;
          this.$refs.editorRef.runCmd("ms-pasteTextOnly", text);
        }
        onPasteStripFormattingIEPaste = false;
      }
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
