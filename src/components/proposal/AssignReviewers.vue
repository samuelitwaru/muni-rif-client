<template lang>
  <div style="height: 500px">
    <q-stepper v-model="step" ref="stepper" color="primary" animated>
      <q-select v-model="model" :options="options" label="Standard" filled />
      <q-step
        :name="1"
        title="Select Reviewers"
        icon="settings"
        :done="step > 1"
      >
        <q-list
          bordered
          class
          style="width: 500px; max-height: 280px; overflow-y: auto"
        >
          <q-item
            @click="selectReviewer(item.id)"
            clickable
            :active="selectedReviewers.includes(item.id)"
            v-for="item in reviewers"
            :key="item.id"
          >
            <q-item-section
              >{{ item.first_name }} {{ item.last_name }}</q-item-section
            >
          </q-item>
        </q-list>
      </q-step>
      <q-step
        :name="2"
        title="Invite Reviewers"
        icon="create_new_folder"
        :done="step > 2"
      >
        <p>
          <q-icon name="info" size="md" /> An email invitation will be sent to
          each of the selected reviewers
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
            color="primary"
            :label="step === 2 ? 'Finish' : 'Continue'"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>
<script>
export default {
  props: ["reviewers"],
  name: "AssignReviewers",
  data() {
    return {
      step: 1,
      selectedReviewers: [],
    };
  },
  methods: {
    next() {
      if (this.step == 2) {
        this.$emit("reviewers-selected", this.selectedReviewers);
      } else {
        this.$refs.stepper.next();
      }
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
};
</script>
<style lang></style>
