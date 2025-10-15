<template lang="">
  <div
    v-if="
      score &&
      score.status == 'IN PROGRESS' &&
      this.$userHasAnyGroups(['reviewer', 'grants_officer'])
    "
    class="q-mb-sm q-mt-sm"
  >
    <q-markup-table bordered flat square style="background: #f5f5f5">
      <thead>
        <tr>
          <th class="text-left">Score</th>
          <th class="text-left">Comment</th>
        </tr>
      </thead>
      <tbody>
        <tr class="">
          <td class="q-td--no-hover">
            <div class="text-center">
              <input
                type="number"
                :min="min"
                :max="max"
                v-model="mark"
                @blur="updateSectionScore(score.id)"
              />/{{ max }}
            </div>
            <q-slider
              v-model="mark"
              :min="min"
              :max="max"
              :step="1"
              color="green"
              @change="updateSectionScore(score.id)"
            />
          </td>
          <td class="q-td--no-hover">
            <q-input
              outlined
              multiline
              v-model="comment"
              type="textarea"
              label="Comment (Optional)"
              @blur="updateSectionComment(score.id)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
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
      this.mark = this.score[this.section["name"]];
      this.comment = this.score[`${this.section["name"]}_comment`];
    },
  },

  data() {
    return {
      comment: "",
      mark: 0,
      formData: {
        l: 4,
      },
    };
  },

  methods: {
    updateSectionScore(scoreId) {
      if (this.mark > this.section.max_score) {
        this.mark = this.section.max_score;
      } else if (this.mark < 0) {
        this.mark = 0;
      }

      this.formData[this.section["name"]] = this.mark;
      this.$api.patch(`scores/${scoreId}/`, this.formData).then((res) => {});
      this.$bus.emit('score-updated', {section: this.section.name, score:this.mark})
    },

    updateSectionComment(scoreId) {
      this.formData[`${this.section["name"]}_comment`] = this.comment;
      this.$api.patch(`scores/${scoreId}/`, this.formData).then((res) => {});
    },
  },
};
</script>
<style lang=""></style>
