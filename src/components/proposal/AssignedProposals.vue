<template>
  <q-page>
    <q-markup-table
      class="q-ma-sm my-sticky-column-table"
      wrap-cells
      flat
      bordered
      dense
    >
      <thead>
        <tr>
          <th align="left">Title</th>
          <th v-for="section in sections" :key="section.id">
            {{ section.title }}
          </th>
          <th align="center">Total</th>
          <th align="center">Reviewer</th>
          <th align="center">Average Score</th>
          <th align="left"></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in proposals" :key="item.id">
          <tr v-if="item?.scores?.length" class="q-tr--no-hover text-center">
            <td :rowspan="item.scores?.length" class="text-left">
              <table>
                <tbody>
                  <tr>
                    <td class="inner">
                      <input
                        @click="selectProposal($event, item.id)"
                        type="checkbox"
                        :checked="item.is_selected"
                      />
                    </td>
                    <td class="inner">
                      <span>{{ item.title }} ({{ item.status }})</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>

            <td v-for="section in sections" :key="section.id">
              {{ item.scores[0][section.name] }}
            </td>
            <td>
              {{ item.scores[0].total_score }}
            </td>
            <td>
              {{ item.scores[0].user__first_name }}
              {{ item.scores[0].user__last_name }}
              ({{ item.scores[0].user__username }}) ({{
                item.scores[0].status
              }})
            </td>

            <td :rowspan="item.scores?.length">{{ item.average_score }}</td>
            <td :rowspan="item.scores?.length">
              <router-link :to="`/proposals/${item.id}`">
                <q-btn color="primary" icon="remove_red_eye" flat dense />
              </router-link>
            </td>
          </tr>

          <tr
            class="q-tr--no-hover text-center"
            v-for="score in item.scores?.slice(1)"
            :key="score.id"
          >
            <td class="exclude" v-for="section in sections" :key="section.id">
              {{ score[section.name] }}
            </td>
            <td class="">&nbsp;&nbsp;{{ score.total_score }}</td>
            <td class="">
              &nbsp;&nbsp;
              {{ score.user__first_name }}
              {{ score.user__last_name }}
              ({{ score.user__username }}) ({{ score.status }})
            </td>
          </tr>
        </template>
      </tbody>
    </q-markup-table>
  </q-page>
</template>

<script>
// import { useQuasar } from "quasar";
import { useQuasar } from "quasar";
export default {
  props: {
    proposals: {
      type: Array,
      default: () => ([]),
    },

  },
  name: "ReviewerList",
  data() {
    return {
      formData: {
        theme: null,
        call: this.$dataStore.currentCall.id,
      },
      // proposals: [],
      themes: [],
      sections: [],
    };
  },
  created() {
    this.$q = useQuasar();
    this.getSections();
    // this.getProposals();
    this.getThemes();
  },
  methods: {
    getSections() {
      this.$api.get(`sections/`).then((res) => {
        this.sections = res.data.filter((sec) => sec.max_score > 0);
      });
    },
    // getProposals() {
    //   var queryString = this.$buildURLQuery(this.formData);
    //   this.$api.get(`proposals/?${queryString}`).then((res) => {
    //     this.proposals = res.data;
    //     this.getProposalScores();
    //   });
    // },
    // getProposalScores() {
    //   for (let index = 0; index < this.proposals.length; index++) {
    //     const prop = this.proposals[index];

    //     this.$api.get(`scores/?proposal=${prop.id}`).then((res) => {
    //       this.proposals[index].scores = res.data;
    //     });
    //   }
    // },
    getThemes() {
      this.$api.get("themes/").then((res) => {
        this.themes = res.data;
      });
    },

    selectProposal($event, ProposalId) {
      const is_selected = $event.target.checked;
      this.$api
        .patch(`proposals/${ProposalId}/`, { is_selected: is_selected })
        .then((res) => {
          var message = "Proposal added to selected proposals";
          if (!is_selected) {
            message = "Proposal removed from selected proposals";
          }
          this.$q.notify(message);
        });
    },
  },
};
</script>

<style scoped>
.my-sticky-column-table {
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 100%;
}

/* bg color is important for th; just specify one */
thead tr:first-child th:first-child {
  background-color: #fff;
  opacity: 1;
}

td:first-child {
  background-color: white;
}
thead tr:first-child th:first-child,
td:first-child:not(.exclude) {
  overflow-x: hidden;
  position: sticky;
  -webkit-position: sticky; /* add this line */
  left: 0;
  z-index: 1;
}
td:not(.inner),
th {
  border-right: 1px solid #ddd;
}
/* Add any component-specific styles here */
</style>
