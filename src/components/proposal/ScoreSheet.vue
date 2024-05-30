<template>
  <div v-if="score && score.status == 'IN PROGRESS'">
    <q-btn
      dense
      flat
      color="primary"
      label="Submit Review"
      @click="startDialog"
    />

    <q-dialog v-model="showDialog" persistent full-width full-height>
      <q-card style="width: 500px">
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
          <q-markup-table flat dense bordered separator="vertical">
            <thead>
              <tr>
                <th class="text-left">Section</th>
                <th class="text-right">Score</th>
                <th class="text-left">Comment</th>
              </tr>
            </thead>
            <tbody>
              <tr
                :class="{
                  'bg-green-2': score[section.name] > 5,
                  'bg-red-1': score[section.name] <= 5,
                }"
                v-for="section in sections"
                :key="section.id"
              >
                <td class="text-left">{{ section.title }}</td>
                <td class="text-right">{{ score[section.name] }}</td>
                <td class="text-left">
                  {{ score[`${section.name}_comment`] }}
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>

        <div class="q-pa-sm row">
          <div class="col q-px-sm">
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
          <div class="col">
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
          <q-btn color="primary" label="Submit Review" @click="submitScore" />
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
  methods: {
    getScore() {
      this.$api
        .get(
          `scores/?user=${this.$authStore.currentUser?.id || 0}&proposal=${
            this.$route.params.id
          }`
        )
        .then((res) => {
          if (res.data.length == 1) {
            this.score = res.data[0];
            this.formData.strengths = this.score.strengths;
            this.formData.weaknesses = this.score.weaknesses;
          }
        });
    },

    getSections() {
      this.$api.get(`sections/`).then((res) => {
        this.sections = res.data;
      });
    },

    startDialog() {
      this.getScore();
      this.showDialog = true;
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
