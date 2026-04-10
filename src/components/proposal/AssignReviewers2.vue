<template lang>
  <div>
    <q-dialog v-model="show">
      <q-card class="my-card">
        <q-card-section class="flex justify-between">
          <div class="text-h6">Assign Reviewers</div>
          <q-btn color="primary" dense flat icon="close" @click="closeDialog" />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div>
            <q-stepper
              flat
              v-model="step"
              ref="stepper"
              color="primary"
              animated
            >
              <q-step
                :name="1"
                title="Select Reviewers"
                icon="settings"
                :done="step > 1"
              >
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
                  @update:model-value="getReviewers"
                />
                <hr />
                <q-list
                  bordered
                  class
                  style="width: 500px; max-height: 280px; overflow-y: auto"
                >
                  <q-item
                    class="flex justify-between items-center"
                    @click="selectReviewer(item.id)"
                    clickable
                    :active="selectedReviewers.includes(item.id)"
                    v-for="item in activeReviewers"
                    :key="item.id"
                  >
                    <div class="row flex items-center">
                      <input
                        class="q-ma-sm"
                        style="width: 10px"
                        type="checkbox"
                        :checked="selectedReviewers.includes(item.id)"
                      />
                      <span>{{ item.first_name }} {{ item.last_name }}</span>
                    </div>

                    <span class="text-grey q-mx-lg">
                      ({{ item.score_count }} assigned)
                    </span>
                  </q-item>

                  <div v-if="activeReviewers?.length == 0">
                    <q-item>
                      <q-item-section>No reviewers found</q-item-section>
                    </q-item>
                  </div>
                </q-list>
              </q-step>
              <q-step
                :name="2"
                title="Invite Reviewers"
                icon="create_new_folder"
                :done="step > 2"
              >
                <p>
                  <q-icon name="info" size="md" /> An email invitation will be
                  sent to each of the selected reviewers
                </p>
                <q-card
                  class="my-card"
                  style="width: 500px; height: 250px; overflow-y: auto"
                  flat
                  bordered
                >
                  <ul>
                    <li
                      v-for="rev in reviewers.filter((item) =>
                        selectedReviewers.includes(item.id)
                      )"
                      :key="rev.id"
                    >
                      {{ rev.first_name }} {{ rev.last_name }} ({{ rev.email }})
                      <ul>
                        <li v-for="theme in rev.profile.themes" :key="theme.id">
                          {{ theme.theme_title }}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </q-card>
              </q-step>
              <template v-slot:navigation>
                <q-stepper-navigation align="right">
                  <q-btn
                    v-if="step > 1"
                    flat
                    color="primary"
                    @click="$refs.stepper.previous()"
                    label="Back"
                    class="q-ml-sm"
                  />
                  <q-btn
                    @click="next"
                    :disabled="selectedReviewers.length == 0"
                    color="primary"
                    :label="step === 2 ? 'Finish' : 'Continue'"
                  />
                </q-stepper-navigation>
              </template>
            </q-stepper>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  name: "AssignReviewers",
  data() {
    return {
      step: 1,
      selectedReviewers: [],
      themes: [],
      reviewers: [],
      formData: { theme: null },
    };
  },
  created() {
    this.getThemes();
    this.getReviewers();
  },

  computed: {
    show() {
      return this.showDialog;
    },
    activeReviewers() {
      return this.reviewers.filter((item) => item.is_active == true);
    },
  },
  methods: {
    next() {
      if (this.step == 2) {
        this.$emit("reviewers-selected", this.selectedReviewers);
        this.resetData();
      } else {
        this.$refs.stepper.next();
      }
    },
    closeDialog() {
      this.resetData();
      this.$emit("close-dialog");
    },
    getThemes() {
      this.$api
        .get(`themes/?call=${this.$dataStore.currentCall.id}`)
        .then((res) => {
          this.themes = res.data;
        });
    },

    resetData() {
      (this.step = 1), (this.selectedReviewers = []);
      // this.themes = [];
      // this.reviewers = [];
      this.formData = { theme: null };
    },

    getReviewers() {
      var queryString = this.$buildURLQuery({
        themes__in: this.formData.theme,
      });
      this.$api
        .get(`users/?${queryString}&groups__name__in=reviewer`)
        .then((res) => {
          this.reviewers = res.data;
          this.getScoreCounts();
        });
    },

    getScoreCounts() {
      this.reviewers.forEach((reviewer) => {
        this.$api
          .get(
            `scores/count/?user=${reviewer.id}&proposal__call=${this.$dataStore.currentCall.id}`
          )
          .then((res) => {
            const count = res.data.count;
            this.reviewers.map((rev) => {
              if (rev.id === reviewer.id) {
                rev.score_count = count;
                return rev;
              }
            });
            return reviewer;
          });
      });
    },

    selectReviewer(reviewerId) {
      if (this.selectedReviewers.includes(reviewerId)) {
        this.selectedReviewers = this.selectedReviewers.filter(
          (item) => item != reviewerId
        );
      } else {
        this.selectedReviewers.push(reviewerId);
      }
    },
  },

  watch: {
    show: function (newVal, oldVal) {
      if (newVal == true) {
        this.getScoreCounts();
      }
      // console.log(oldVal, newVal);
    },
  },
};
</script>
<style lang></style>
