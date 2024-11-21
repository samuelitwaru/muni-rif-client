<template>
  <q-page>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" label="Home" />
        <q-breadcrumbs-el icon="apps" to="/themes" label="Themes" />
        <q-breadcrumbs-el :label="`${theme?.title}`" icon="apps" />
      </q-breadcrumbs>
    </div>
    <q-separator spaced size="0.5px" />

    <div class="flex justify-center">
      <q-card class="my-card q-pa-md" style="width: 500px">
        <q-form @submit="submitForm" ref="form">
          <q-input
            v-model="formData.title"
            label="Title"
            outlined
            required
            :rules="[rules.required]"
            class="q-my-md"
          />
          <q-select
            v-model="formData.call"
            label="Call"
            outlined
            :options="callOptions"
            option-value="id"
            option-label="title"
            emit-value
            map-options
            class="q-my-md"
          />
          <q-card-actions align="right">
            <q-btn label="Cancel" flat color="negative" @click="cancel" />
            <q-btn
              label="Save"
              color="primary"
              :loading="loading"
              type="submit"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "ThemeComponent",

  data() {
    return {
      theme: {},
      formData: {
        title: "",
        call: null,
      },
      callOptions: [],
      loading: false,
      rules: {
        required: (value) => !!value || "This field is required",
      },
    };
  },
  async created() {
    await this.fetchTheme();
    await this.fetchCalls();
  },
  methods: {
    async fetchTheme() {
      try {
        const response = await this.$api.get(`themes/${this.$route.params.id}`);
        this.theme = response.data;
        this.formData.title = this.theme.title;
        this.formData.call = this.theme.call;
        console.log(">>>>>>>>", this.theme);
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: "Failed to fetch theme details",
        });
        console.error(error);
      }
    },
    async fetchCalls() {
      try {
        const response = await this.$api.get("/calls");
        this.callOptions = response.data;
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: "Failed to fetch call options",
        });
        console.error(error);
      }
    },
    async submitForm() {
      if (!(await this.$refs.form.validate())) return;

      this.loading = true;
      try {
        console.log(this.formData);
        await this.$api.put(`themes/${this.theme.id}/`, this.formData);
        this.$q.notify({
          type: "positive",
          message: "Theme updated successfully",
        });
        this.cancel();
        this.$emit("updated");
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: "Failed to update theme",
        });
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    cancel() {
      this.$router.push("/themes");
    },
  },
};
</script>
