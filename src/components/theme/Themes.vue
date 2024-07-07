<template>
  <q-page>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" label="Home" />
        <q-breadcrumbs-el label="Themes" icon="apps" />
      </q-breadcrumbs>
    </div>
    <q-separator spaced />
    <q-markup-table class="q-ma-sm" flat bordered>
      <thead>
        <tr>
          <th align="left">Title</th>
          <th align="left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input
              v-model="formData.title"
              style="display: block; width: 100%"
              type="text"
            />
          </td>
          <td>
            <button :disabled="formData.title.length < 5" @click="createTheme">
              Add
            </button>
          </td>
        </tr>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.title }}</td>
          <td>
            <router-link :to="`/themes/${item.id}`">
              <q-btn icon="edit" flat color="primary" @click="editItem(item)" />
            </router-link>
            <q-btn
              icon="delete"
              flat
              color="negative"
              @click="deleteItem(item.id)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-page>
</template>

<script>
import { getThemes } from "src/utils/api";

export default {
  name: "ThemesList",
  data() {
    return {
      formData: {
        title: "",
      },
      items: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getThemes().then((res) => (this.items = res));
    },
    createTheme() {
      this.$api.post(`themes/`, this.formData).then((res) => {
        if ((res.status = 201)) {
          this.items.unshift(res.data);
          this.formData = { title: "" };
        }
      });
    },
    editItem(item) {
      console.log("Edit item:", item);
    },
    deleteItem(id) {
      if (confirm("Delete this theme?")) {
        this.$api.delete(`themes/${id}`).then((res) => {
          if (res.status == 204) {
            this.init();
          }
        });
      }
    },
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
