<template>
  <q-page>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" label="Home" />
        <q-breadcrumbs-el label="Selected Proposals" icon="list" />
      </q-breadcrumbs>
    </div>
    <q-separator spaced />
    <div align="right" class="q-ma-sm row">
      <div class="col">
        <q-select
          v-model="formData.theme"
          dense
          outlined
          :options="[{ id: null, title: 'All' }].concat(themes)"
          label="Select Theme"
          option-value="id"
          option-label="title"
          map-options
          emit-value
          @update:model-value="getProposals"
        />
      </div>
      <div class="col"></div>
    </div>
    <q-markup-table class="q-ma-sm" flat bordered>
      <thead>
        <tr>
          <th align="left">Title</th>
          <th align="left">Date Submitted</th>
          <th align="center">Total Score</th>
          <th align="center">Average Score</th>
          <th align="left">Budget Allocation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in proposals" :key="item.id">
          <td>
            <router-link :to="`/proposals/${item.id}`">
              {{ item.title }}
            </router-link>
          </td>
          <td>{{ item.submission_date }}</td>
          <td class="text-center">{{ item.total_score }}</td>
          <td class="text-center">{{ item.average_score }}</td>
          <td class="text-center">
              <div class="flex items-center">
                <span class="q-pr-sm">
                  {{ $commaSeparator(item.budget_allocation) }}
                </span>
                <award-project-dialog :proposal="item" />
              </div>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-page>
</template>

<script>
import AwardProjectDialog from './AwardProjectDialog.vue';


export default {
  name: "SelectedProposals",
  components: {
    AwardProjectDialog,
  },
  data() {
    return {
      formData: {
        theme: null,
        is_selected: true,
        call: this.$dataStore.currentCall.id,
        page: 1,
        limit: 20
      },
      proposals: [],
      themes: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getProposals();
      this.getThemes();
    },
    getProposals() {
      var queryString = this.$buildURLQuery(this.formData);
      this.$api.get(`proposals/?${queryString}`).then((res) => {
        console.log
        this.proposals = res.data.results;
      });
    },
    getThemes() {
      this.$api.get("themes/").then((res) => {
        this.themes = res.data;
      });
    },
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
