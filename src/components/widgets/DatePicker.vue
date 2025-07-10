<template>
  <div>
    <q-input
      v-model="displayDate"
      :label="label"
      @click="showDatePicker = true"
      readonly
      outlined
    >
    <template v-slot:append>
    <q-icon name="event" class="cursor-pointer" @click.stop="showDatePicker = true">
      <q-popup-proxy v-model="showDatePicker" transition-show="scale" transition-hide="scale">
        <q-date
          v-model="selectedDate"
          mask="YYYY-MM-DD"
          emit-value
          @update:model-value="updateDisplayDate"
        >
          <div class="row items-center justify-end">
            <q-btn v-close-popup label="Close" color="primary" flat />
          </div>
        </q-date>
      </q-popup-proxy>
    </q-icon>
    </template>
    </q-input>
  </div>
</template>

<script>
import { date } from 'quasar' // useful date formatting

export default {
  props: {
    name: {
      type: String,
      default: 'Select Date'
    },
    date: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Select Date'
    }
  },
  data () {
    return {
      displayDate: '',
      showDatePicker: false
    }
  },
  mounted () {
    this.updateDisplayDate(this.selectedDate)
  },
  created () {
    // Initialize selectedDate from the date prop
    this.selectedDate = this.date
  },
  methods: {
    updateDisplayDate (val) {
      const data = {name:this.name, date: val}
      console.log('Selected date:', data)
      this.displayDate = date.formatDate(val, 'MMM D, YYYY') // e.g., "Apr 30, 2025"
      this.$emit('update:date', data) // Emit the selected date to the parent component
    }

  }
}
</script>
