<template>
  <div
    v-if="
      proposal.status === 'SUBMITTED' && $userHasAnyGroups(['grants_officer'])
    "
  >
    <q-btn color="primary" label="Finish Screening" @click="startDialog" />
    <q-dialog v-model="showDialog" persistent>
      <q-card style="min-width: 22rem">
        <q-card-section class="flex justify-between">
          <div class="text-h6">Finish Screening</div>
          <q-btn
            color="primary"
            flat
            dense
            icon="close"
            @click="showDialog = false"
          />
        </q-card-section>
        <q-separator />
        <q-card-section class="scroll">
          <q-markup-table separator="cell" flat dense bordered>
            <thead>
              <tr>
                <th class="text-left">Section</th>
                <th class="text-right">Score</th>
                <th class="text-left">Comment</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="section in sections" :key="section.id">
                <tr v-if="section.max_score > 0">
                  <td class="text-left">{{ section.title }}</td>
                  <td
                    class="text-center"
                    :class="{
                      'bg-green-2':
                        proposal[`${section.name}_score`] >
                        section.max_score / 2,
                      'bg-red-1':
                        proposal[`${section.name}_score`] <=
                        section.max_score / 2,
                    }"
                  >
                    {{ proposal[`${section.name}_score`] }}/{{
                      section.max_score
                    }}
                  </td>
                  <td class="text-left">
                    {{ proposal[`${section.name}_comment`] }}
                  </td>
                </tr>
              </template>
              <tr class="bg-grey-4">
                <td>Total percentage score</td>
                <td colspan="2">{{ percentageScore }}%</td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>

        <div class="q-pa-md">
          <q-checkbox
            v-model="formData.is_recommended"
            label="Proceed with this proposal for external review?"
          />
        </div>
        <q-separator spaced />
        <q-card-section align="right">
          <q-btn
            color="primary"
            flat
            label="Cancel"
            @click="showDialog = false"
          />
          <q-btn
            color="primary"
            label="Finish Screening"
            @click="submitScore"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ["proposal"],
  data() {
    return {
      loading: false,
      showDialog: false,
      score: null,
      sections: [],
      formData: {
        is_recommended: false,
        is_done_screening: true,
        status: "SCREENED",
      },
    };
  },
  created() {
    this.getSections();
  },
  computed: {
    percentageScore() {
      let total = 0;
      this.sections.forEach((section) => {
        total += this.proposal[`${section.name}_score`];
      });
      return total;
    },
  },
  methods: {
    getSections() {
      this.$api.get(`sections/`).then((res) => {
        this.sections = res.data;
      });
    },

    startDialog() {
      this.showDialog = true;
    },

    submitScore() {
      this.$utilsStore.setLoading(true);
      this.$api
        .patch(`proposals/${this.proposal.id}/`, this.formData)
        .then((res) => {
          this.$q.notify({
            message: "Proposal screening completed successfully",
            color: "positive",
          });
          this.$router.go(-1);
        })
        .finally(() => {
          this.$utilsStore.setLoading(false);
        });
    },
  },
};
</script>
