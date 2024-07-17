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
          <th align="left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in proposals" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.submission_date }}</td>
          <td class="text-center">{{ item.total_score }}</td>
          <td class="text-center">{{ item.average_score }}</td>

          <td>
            <q-btn color="green" label="Award" />
            <q-btn color="red" class="q-mx-sm" label="reject" />
            <router-link :to="`/proposals/${item.id}`">
              <q-btn
                label="View"
                flat
                color="primary"
                @click="editItem(item)"
              />
            </router-link>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-page>
</template>

<script>
export default {
  name: "ReviewerList",
  data() {
    return {
      formData: {
        theme: null,
        is_selected: true,
        call: this.$dataStore.currentCall.id,
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
        this.proposals = res.data;
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
