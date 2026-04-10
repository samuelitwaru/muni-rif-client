<template>
  <div id="reviews" v-if="scores.length" class="q-pa-sm">
    <div class="flex q-py-xs"></div>

    <q-markup-table wrap-cells separator="cell" flat dense bordered>
      <thead>
        <tr class="bg-grey-2">
          <th class="text-left"></th>
          <template v-for="section in sections" :key="section.id">
            <th v-if="section.max_score" class="text-left">
              {{ section.title }}
            </th>
          </template>
          <th class="text-left bg-grey-3">Total</th>
          <th class="text-left">Strengths</th>
          <th class="text-left">Weaknesses</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="score in scores"
          :key="score.user__username"
          class="q-tr--no-hover"
        >
          <!-- Reviewer -->
          <td class="text-left">
            <div>{{ score.user__first_name }} {{ score.user__last_name }}</div>
            <div class="text-caption text-grey">{{ score.user__username }}</div>
          </td>

          <!-- Section scores -->
          <template v-for="section in sections" :key="section.id">
            <td v-if="section.max_score" class="text-left">
              {{ score[section.name] }}

              <q-btn
                v-if="score[`${section.name}_comment`]"
                color="secondary"
                dense
                flat
                size="xs"
                icon="comment"
              >
                <q-popup-proxy>
                  <q-banner>
                    {{ score[`${section.name}_comment`] }}
                  </q-banner>
                </q-popup-proxy>
              </q-btn>
            </td>
          </template>

          <!-- Total -->
          <td class="text-left bg-grey-3">
            <q-card
              flat
              bordered
              class="q-mx-sm text-center"
              style="width: 1.5rem; display: inline-block"
            >
              {{ score.total_score }}
            </q-card>
          </td>

          <!-- Strengths -->
          <td class="text-left">
            <q-btn
              v-if="score.strengths"
              color="secondary"
              dense
              flat
              size="xs"
              icon="comment"
            >
              <q-popup-proxy>
                <q-banner>
                  {{ score.strengths }}
                </q-banner>
              </q-popup-proxy>
            </q-btn>
          </td>

          <!-- Weaknesses -->
          <td class="text-left">
            <q-btn
              v-if="score.weaknesses"
              color="secondary"
              dense
              flat
              size="xs"
              icon="comment"
            >
              <q-popup-proxy>
                <q-banner>
                  {{ score.weaknesses }}
                </q-banner>
              </q-popup-proxy>
            </q-btn>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
export default {
  props: {
    proposal_id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      showDialog: false,
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
    this.getScores();
    this.getSections();
  },
  methods: {
    getScores() {
      this.$api
        .get(
          `scores/?proposal=${this.proposal_id}&status_includes=IN PROGRESS|COMPLETED`
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
        .get(`proposals/${this.proposal_id}/score-sheet/download/`)
        .then((res) => {
          if (res.status == 200) {
            window.open(res.data.file_url, "_blank");
          }
        });
    },
  },
};
</script>
