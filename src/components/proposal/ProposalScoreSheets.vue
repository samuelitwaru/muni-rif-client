<template>
  <div>
    <q-toolbar-title>Score Sheet</q-toolbar-title>

    <q-markup-table flat dense bordered separator="vertical">
      <thead>
        <tr class="bg-grey-3">
          <th class="text-left">Section</th>
          <th class="text-left" :colspan="scores.length">Scores</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-grey-2">
          <td class="text-left"></td>
          <td v-for="score in scores" :key="score" class="text-right">
            <div>{{ score.user__first_name }} {{ score.user__last_name }}</div>
            {{ score.user__username }}
          </td>
        </tr>
        <tr v-for="section in sections" :key="section.id">
          <td class="text-left">{{ section.title }}</td>
          <td v-for="score in scores" :key="score" class="text-right">
            {{ score[section.name] }}
          </td>
        </tr>
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
      this.$api.get(`scores/?proposal=${this.$route.params.id}`).then((res) => {
        this.scores = res.data;
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
