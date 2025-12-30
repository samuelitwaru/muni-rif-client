<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      ref="stepper"
      :vertical="vertical"
      color="primary"
      animated
      flat
    >
      <q-step
        :name="1"
        title="Start"
        :caption="call.date_from"
        icon="edit"
        active-icon="edit"
        :done="step > 1"
        :disable="step <= 1"
      >
      </q-step>

      <q-step
        :name="2"
        title="Submission"
        :caption="call.submission_date"
        icon="description"
        active-icon="description"
        :done="step > 2"
        :disable="step <= 2"
      >
      </q-step>

      <q-step
        :name="3"
        title="Review"
        :caption="call.review_date"
        icon="search"
        active-icon="search"
        :done="step > 3"
        :disable="step <= 3"
      >
      </q-step>

      <q-step
        :name="4"
        title="Selection"
        :caption="call.selection_date"
        icon="check_circle"
        active-icon="check_circle"
        :done="step > 4"
        :disable="step <= 4"
      >
      </q-step>

      <q-step
        :name="5"
        title="End"
        :caption="call.date_to"
        icon="add_comment"
        :done="step > 5"
        :disable="step <= 5"
      >
      </q-step>

      <!-- <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="nextStep" color="primary" :label="step === 5 ? 'Finish' : 'Continue'" />
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </template> -->
    </q-stepper>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  data() {
    return {
      call: this.$dataStore.currentCall,
    }
  },
  computed: {
    vertical() {
      return window.innerWidth < 600
    },
    step() {
      const today = new Date()
      const dateFrom = new Date(this.call.date_from)
      const submissionDate = new Date(this.call.submission_date)
      const reviewDate = new Date(this.call.review_date)
      const selectionDate = new Date(this.call.selection_date)
      const dateTo = new Date(this.call.date_to)

      if (today < dateFrom) {
        return 1
      } else if (today >= dateFrom && today < submissionDate) {
        return 2
      } else if (today >= submissionDate && today < reviewDate) {
        return 3
      } else if (today >= reviewDate && today < selectionDate) {
        return 4
      } else if (today >= selectionDate && today <= dateTo) {
        return 5
      } else {
        return 6 // Call has ended
      }
    }
  },
  methods: {

  },
}
</script>
