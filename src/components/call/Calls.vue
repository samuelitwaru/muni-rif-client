<template>
  <q-page>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" label="Home" />

        <q-breadcrumbs-el label="Calls" icon="campaign" />
      </q-breadcrumbs>
    </div>
    <q-separator spaced />
    <q-markup-table class="q-ma-sm" flat bordered>
      <thead>
        <tr>
          <th align="left">Title</th>
          <th align="left">Date From</th>
          <th align="left">Date To</th>
          <th align="left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.date_from }}</td>
          <td>{{ item.date_to }}</td>
          <td>
            <router-link :to="`/calls/${item.id}`">
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
import { getCalls } from "src/utils/api";

export default {
  name: "DataTable",
  data() {
    return {
      items: [
        {
          id: 1,
          title: "CALL 2024/2025",
          date_from: "2024-06-24T09:57:11.467359Z",
          date_to: "2024-06-24T09:57:11.467359Z",
        },
        // Add more items as needed
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getCalls().then((res) => (this.items = res));
    },
    editItem(item) {
      console.log("Edit item:", item);
    },
    deleteItem(id) {
      if (confirm("Delete this call?")) {
        this.$api.delete(`calls/${id}`).then((res) => {
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
