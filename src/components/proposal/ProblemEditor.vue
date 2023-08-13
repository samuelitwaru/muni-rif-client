<template>
  <div>
    <loading-component :loading="loading" />
    <q-btn dense flat color="primary" icon="edit" @click="showDialog = true" />

    <q-form @submit="updateProblem" class="q-gutter-md">
      <q-dialog v-model="showDialog" persistent full-width>
        <q-card style="width: 500px">
          <q-card-section>
            <div class="text-h6">{{ section.title }}</div>
          </q-card-section>
          <q-separator />
          <q-card-section style="max-height: 60vh" class="scroll">
            <!-- <q-editor v-model="editor" min-height="5rem" flat /> -->
            <q-editor
              v-model="formData[section.name]"
              label="Title of your proposal"
              outlined
              required
            />
          </q-card-section>
          <q-separator spaced />
          <q-card-actions align="right">
            <q-btn flat color="primary" label="Cancel" @click="cancelCreate" />
            <q-btn color="primary" label="Save" @click="updateProblem" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-form>
  </div>
</template>

<script>
export default {
  props: {
    proposal: {
      type: Object,
      required: true,
    },
    section: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      showDialog: false,
      formData: {},
    };
  },
  methods: {
    updateProblem() {
      this.loading = true;
      this.$api
        .patch(`proposals/${this.$route.params.id}/`, this.formData)
        .then((res) => {
          this.$emit("proposal-updated", res.data);
          this.loading = false;
          this.showDialog = false;
        });
    },
    cancelCreate() {
      // Cancel the creation and close the dialog.
      this.showDialog = false;
    },
  },
  watch: {
    proposal(newVal) {
      this.formData[this.section.name] = newVal[this.section.name];
    },
  },
};
</script>
