<template lang="">
  <q-card
    v-if="
      score &&
      score.status == 'IN PROGRESS' &&
      this.$userHasAnyGroups(['reviewer'])
    "
    flat
    bordered
    class="q-mt-sm q-pa-sm"
  >
    <div class="q-mb-sm">
      <div>
        <span>
          <div>
            <small>Score</small>
          </div>
          <input
            type="number"
            :min="min"
            :max="max"
            v-model="mark"
            @blur="updateSectionScore(score.id)"
          />
        </span>
        /10
        <q-input
          height="2"
          multiline
          v-model="comment"
          type="textarea"
          label="Comment (Optional)"
          @blur="updateSectionComment(score.id)"
        />
      </div>
    </div>
  </q-card>
</template>
<script>
export default {
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 10,
    },
    proposal: {
      type: Object,
      required: true,
    },
    section: {
      type: Object,
      required: true,
    },
    score: {
      required: true,
      default: null,
    },
  },

  watch: {
    score(newValue, oldValue) {
      // This function will run whenever myProp changes
      this.mark = this.score[this.section["name"]];
      this.comment = this.score[`${this.section["name"]}_comment`];
    },
  },

  data() {
    return {
      comment: null,
      mark: null,
      formData: {
        l: 4,
      },
    };
  },

  methods: {
    updateSectionScore(scoreId) {
      this.formData[this.section["name"]] = this.mark;
      this.$api.patch(`scores/${scoreId}/`, this.formData).then((res) => {
        console.log(res.data);
      });
    },

    updateSectionComment(scoreId) {
      this.formData[`${this.section["name"]}_comment`] = this.comment;
      this.$api.patch(`scores/${scoreId}/`, this.formData).then((res) => {
        console.log(res.data);
      });
    },
  },
};
</script>
<style lang=""></style>
