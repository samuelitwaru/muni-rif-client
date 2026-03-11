<template lang="">
  <div v-if="proposal">
    <q-dialog v-model="showDialog">
      <q-card style="width: 500px">
        <q-card-section class="flex justify-between">
          <div class="text-h6">Review Score Sheet</div>
          <q-btn color="primary" dense flat icon="close" @click="close" />
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pt-lg q-pb-md">
          <div id="reviews" v-if="scores.length" class="q-pa-sm">
            <div class="flex q-py-xs">
              <q-toolbar-title class="text-h6">Reviews</q-toolbar-title>
              <q-btn
                color="primary"
                icon="download"
                label="export"
                flat
                @click="downloadScoreSheet"
              />
            </div>

            <q-markup-table wrap-cells separator="cell" flat dense bordered>
              <tbody>
                <tr class="bg-grey-2">
                  <td class="text-left"></td>
                  <td v-for="score in scores" :key="score" class="text-left">
                    <div>
                      {{ score.user__first_name }} {{ score.user__last_name }}
                    </div>
                    {{ score.user__username }}
                  </td>
                </tr>

                <template
                  v-for="(section, index) in sections"
                  :key="section.id"
                >
                  <tr class="q-tr--no-hover" v-if="section.max_score">
                    <td class="text-left">{{ index }} - {{ section.title }}</td>
                    <td v-for="score in scores" :key="score" class="text-left">
                      <q-card
                        flat
                        bordered
                        class="q-mx-sm text-center"
                        style="width: 1.5rem; display: inline-block"
                      >
                        {{ score[section.name] }}
                      </q-card>
                      <q-btn
                        v-if="score[`${section.name}_comment`]"
                        color="secondary"
                        dense
                        size="xs"
                        icon="comment"
                      >
                        <q-popup-proxy>
                          <q-banner>
                            <template v-slot:avatar>
                              <q-icon name="comment" color="secondary" />
                            </template>
                            {{ score[`${section.name}_comment`] }}
                          </q-banner>
                        </q-popup-proxy>
                      </q-btn>
                    </td>
                  </tr>
                </template>
                <!-- <tfoot> -->
                <tr class="bg-grey-3">
                  <td class="text-left">Total</td>
                  <td v-for="score in scores" :key="score" class="text-left">
                    <q-card
                      flat
                      bordered
                      class="q-mx-sm text-center"
                      style="width: 1.5rem; display: inline-block"
                    >
                      {{ score.total_score }}
                    </q-card>
                  </td>
                </tr>
                <!-- </tfoot> -->
              </tbody>
            </q-markup-table>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  props: {
    proposal: {
      type: Object,
      default: null,
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,
      scores: [],
      sections: [],
      formData: {
        strengths: null,
        weaknesses: null,
        status: "COMPLETED",
      },
    };
  },
  created() {
    if (this.proposal) {
      this.getScores();
      this.getSections();
    }
  },
  computed: {
    showDialog() {
      return this.show;
    },
  },
  methods: {
    getScores() {
      this.$api
        .get(
          `scores/?proposal=${this.proposal.id}&status_includes=IN PROGRESS|COMPLETED`
        )
        .then((res) => {
          this.scores = res.data;
        });
    },

    getSections() {
      this.$api.get(`sections/`).then((res) => {
        this.sections = res.data;
      });
    },

    downloadScoreSheet() {
      this.$api
        .get(`proposals/${this.proposal.id}/score-sheet/download/`)
        .then((res) => {
          if (res.status == 200) {
            window.open(res.data.file_url, "_blank");
          }
        });
    },

    close() {
      this.$emit("close-dialog");
    },
  },
};
</script>

<style lang=""></style>
