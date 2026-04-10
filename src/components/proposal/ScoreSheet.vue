<template>
  <div
    v-if="
      score && score.status == 'IN PROGRESS' && $userHasAnyGroups(['reviewer'])
    "
  >
    <p class="text-red" v-if="!allScoresAreValid">
      Please score all required sections before submit.
    </p>
    <q-btn color="primary" label="Submit Review" @click="getScore(true)" />

    <q-dialog v-model="showDialog" persistent full-height>
      <q-card style="min-width: 22rem">
        <q-card-section class="flex justify-between">
          <div class="text-h6">Submit Review</div>
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
          <q-markup-table separator="cell" wrap-cells flat dense bordered>
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
                  <td class="text-left">
                    {{ section.title }}

                    <div v-if="score[section.name] == null">
                      <small class="text-red flex items-center gap-1">
                        <q-icon name="error" color="red" />
                        You have not scored this section!
                      </small>
                    </div>
                  </td>
                  <td
                    class="text-center"
                    :class="{
                      'bg-green-2': score[section.name] > section.max_score / 2,
                      'bg-red-1': score[section.name] <= section.max_score / 2,
                    }"
                  >
                    {{ score[section.name] }}/{{ section.max_score }}
                  </td>
                  <td class="text-left">
                    {{ score[`${section.name}_comment`] }}
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

        <div class="q-pa-sm row">
          <div class="col-12 q-px-sm">
            <q-chip
              outline
              color="teal"
              text-color="white"
              icon="arrow_circle_up"
            >
              Strengths
            </q-chip>

            <q-input
              v-model="formData.strengths"
              type="textarea"
              outlined
              label="Strengths"
            />
          </div>
          <div class="col-12 q-px-sm">
            <q-chip
              outline
              color="primary"
              text-color="white"
              icon="arrow_circle_down"
            >
              Weaknesses
            </q-chip>
            <q-input
              v-model="formData.weaknesses"
              type="textarea"
              outlined
              label="Weaknesses"
            />
          </div>
        </div>
        <div class="q-pa-md">
          <p>Do you recommend this proposal for funding?</p>
          <q-radio v-model="formData.is_recommended" :val="true" label="Yes" />
          <q-radio v-model="formData.is_recommended" :val="false" label="No" />
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
            :disabled="!allScoresAreValid"
            label="Submit Review"
            @click="submitScore"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      showDialog: false,
      score: null,
      sections: [],
      formData: {
        strengths: null,
        weaknesses: null,
        status: "COMPLETED",
        is_recommended: null,
      },
    };
  },
  created() {
    this.getScore();
    this.getSections();
  },
  computed: {
    percentageScore() {
      const scores = this.sections?.map((section) => section.max_score);
      const section_scores = this.sections?.map(
        (section) => this.score[section.name] || 0
      );
      const total_section_scores = section_scores.reduce(
        (acc, curr) => acc + curr,
        0
      );
      const total = scores.reduce((acc, curr) => acc + curr, 0);
      return Math.round((total_section_scores / total) * 100);
    },

    allScoresAreValid() {
      if (this.score && this.sections) {
        for (let index = 0; index < this.sections.length; index++) {
          const section = this.sections[index];
          if (section.max_score > 0) {
            if (this.score[section.name] === null) {
              return false;
            }
          }
        }
      }
      return true;
    },
  },
  methods: {
    getScore(submit = false) {
      this.$api
        .get(
          `scores/?user=${this.$authStore.currentUser?.id || 0}&proposal=${
            this.$route.params.proposal_id
          }`
        )
        .then((res) => {
          if (res.data.length == 1) {
            this.score = res.data[0];
            this.formData.strengths = this.score.strengths;
            this.formData.weaknesses = this.score.weaknesses;
            if (submit) {
              const isValid = this.verifyAllSectionsAreScored();
              this.showDialog = isValid;
            }
          }
        });
    },

    getSections() {
      this.$api.get(`sections/`).then((res) => {
        this.sections = res.data;
      });
    },

    verifyAllSectionsAreScored() {
      if (this.score && this.sections) {
        for (let index = 0; index < this.sections.length; index++) {
          const section = this.sections[index];
          if (section.max_score > 0) {
            if (this.score[section.name] === null) {
              this.$q.notify({
                type: "negative",
                message: `Please score the section: ${section.title}`,
              });
              // scroll to the section
              const sectionElement = document.getElementById(`${section.name}`);
              if (sectionElement) {
                sectionElement.scrollIntoView({ behavior: "smooth" });
              }
              return false;
            }
          }
        }
      }
      return true;
    },
    submitScore() {
      if (
        confirm(
          "This action is irreversible. Please confirm submission of your score sheet"
        )
      ) {
        this.$utilsStore.setLoading(true);
        this.$api
          .patch(`scores/${this.score.id}/`, this.formData)
          .then((res) => {
            this.score = res.data;
            this.$utilsStore.setLoading(false);
            this.showDialog = false;
            location.reload();
          });
      }
    },
  },
};
</script>
