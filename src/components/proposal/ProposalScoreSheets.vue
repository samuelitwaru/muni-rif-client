<template>
  <div v-if="scores.length" class="q-pa-sm">
    <div class="flex q-py-xs">
      <q-toolbar-title>Score Sheet</q-toolbar-title>
      <q-btn
        color="primary"
        icon="download"
        dense
        label="export"
        @click="downloadScoreSheet"
      />
    </div>

    <q-markup-table flat dense bordered separator="vertical">
      <!-- <thead>
        <tr class="bg-grey-3">
          <th class="text-left">Section</th>
          <th class="text-left" :colspan="scores.length">Scores</th>
        </tr>
      </thead> -->
      <tbody>
        <tr class="bg-grey-2">
          <td class="text-left"></td>
          <td v-for="score in scores" :key="score" class="text-left">
            <div>{{ score.user__first_name }} {{ score.user__last_name }}</div>
            {{ score.user__username }}
          </td>
        </tr>
        <tr v-for="(section, index) in sections" :key="section.id">
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
</template>

<script>
export default {
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
          `scores/?proposal=${this.$route.params.proposal_id}&status_includes=IN PROGRESS|COMPLETED`
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
        .get(
          `proposals/${this.$route.params.proposal_id}/score-sheet/download/`
        )
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            window.open(res.data.file_url, "_blank");
          }
        });
    },
  },
};
</script>
