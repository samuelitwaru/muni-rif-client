<template>
  <div>
    <loading-component :loading="loading" />
    <q-btn dense flat color="primary" icon="edit" @click="showDialog = true" />

    <q-form @submit="updateSection" class="q-gutter-md">
      <q-dialog v-model="showDialog" persistent full-width full-height>
        <q-card style="width: 500px">
          <q-card-section class="flex justify-between">
            <div class="text-h6">{{ section.title }}</div>
            <q-btn
              color="primary"
              flat
              dense
              icon="close"
              @click="cancelCreate"
            />
          </q-card-section>
          <q-separator />
          <q-card-section class="scroll">
            <!-- <q-editor v-model="editor" min-height="5rem" flat /> -->
            <q-editor
              v-model="formData[section.name]"
              label="Title of your proposal"
              outlined
              required
              min-height="65vh"
            />
          </q-card-section>
          <q-separator spaced />
          <q-card-actions align="right">
            <q-btn flat color="primary" label="Cancel" @click="cancelCreate" />
            <q-btn color="primary" label="Save" @click="updateSection" />
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
    updateSection() {
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
  mounted() {
    this.formData[this.section.name] = this.proposal[this.section.name] || "";
  },
  watch: {
    proposal(newVal) {
      this.formData[this.section.name] = newVal[this.section.name] || "";
    },
  },
};
</script>
