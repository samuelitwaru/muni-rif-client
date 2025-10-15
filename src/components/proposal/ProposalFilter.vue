<template lang="">
  <div>
    <div align="right" class="q-ma-xs row q-gutter-x-xs">
      <div class="col" v-for="field in fields" :key="field">
        <q-select
          v-if="field.type == 'select'"
          v-model="formData[field.name]"
          dense
          outlined
          :options="field.options"
          :label="field.label"
          option-value="id"
          option-label="title"
          map-options
          emit-value
          @update:model-value="filter()"
        />
        <q-input
          v-else-if="field.type == 'text'"
          v-model="formData[field.name]"
          :label="field.label"
          outlined
          @keyup.enter="filter()"
          @blur="filter()"
          dense
          clearable
        />

        <div v-else-if="field.type == 'dateRange'" flat class="no-wrap">
          <q-input
            v-model="formData2[field.range_input_name]"
            :label="field.label"
            dense
            outlined
            readonly
          >
            <template v-slot:append>
              <q-icon v-if="formData2[field.name]" name="close"
                @click="
                  formData2[field.name]=null;
                  formData2[field.range_input_name]=null;
                  setDateRange(
                        field.name,
                        field.range_input_name,
                        field.range_from_name,
                        field.range_to_name
                      );
                  filter();"
                />
              <q-icon name="event" class="cursor-pointer q-my-xs" icon="event" flat dense color="primary">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                  v-model="popups[field.name]"
                >
                  <q-date
                    @range-end="
                      setDateRange(
                        field.name,
                        field.range_input_name,
                        field.range_from_name,
                        field.range_to_name
                      );
                      filter();
                    "
                    v-model="formData2[field.name]"
                    range
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

        </div>
        <!-- </q-card> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ReviewerList",
  data() {
    return {
      formData: {},
      formData2: {},
      popups: {},
      showPopup: false,
      fields: [
        {
          type: "dateRange",
          label: "Submission Date",
          name: "submission_date",
          range_input_name: "submission_date_text",
          range_from_name: "submission_date__gte",
          range_to_name: "submission_date__lte",
        },
        { type: "select", label: "Select Theme", options: [], name: "theme" },
        { type: "select", label: "Status", options: [], name: "status" },
        { type: "select", label: "PI", options: [], name: "user" },
        { type: "text", label: "Search", name: "search_query" },
      ],
    };
  },
  created() {
    this.getThemes();
    this.getUsers();
    this.getStatusOptions();
  },
  methods: {
    getStatusOptions() {
      this.fields.filter((field) => field.name == "status")[0].options = [
        { id: 0, title: "None" },
        { id: "EDITING", title: "EDITING" },
        { id: "SUBMITTED", title: "SUBMITTED" },
        { id: "REVIEWING", title: "REVIEWING" },
        { id: "REVIEWED", title: "REVIEWED" },
        { id: "SELECTED", title: "SELECTED" },
      ];
    },
    async getUsers() {
      const res = await this.$api.get("users/?groups__name__in=applicant");
      console.log(res.data);
      const PIs = res.data.map((pi) => {
        return { id: pi.id, title: `${pi.first_name} ${pi.last_name}` };
      });
      this.fields.filter((field) => field.name == "user")[0].options = [
        { id: 0, title: "None" },
      ].concat(PIs);
      return res.data;
    },
    async getThemes() {
      const res = await this.$api.get("themes/");
      this.fields.filter((field) => field.name == "theme")[0].options = [
        { id: 0, title: "None" },
      ].concat(res.data);
      return res.data;
    },

    setDateRange(name, range_input_name, range_from_name, range_to_name) {
      this.formData[range_from_name] = this.formData2[name]?.from;
      this.formData[range_to_name] = this.formData2[name]?.to;
      this.formData2[
        range_input_name
      ] = `${this.formData2[name]?.from || ''} - ${this.formData2[name]?.to || ''}`;
      this.popups[name] = false;
    },

    filter() {
      console.log("filter", this.formData);
      this.$emit("filter", this.formData);
    },
  },
};
</script>
<style lang="">
/* .daterange-card {
  width: authStore;
  max-width: 300px;
} */
</style>
