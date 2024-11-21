<template>
  <q-page>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" label="Home" />

        <q-breadcrumbs-el label="Calls" icon="campaign" />
      </q-breadcrumbs>
    </div>
    <q-separator spaced />
    <div align="right" class="q-ma-sm">
      <router-link to="/calls/create">
        <q-btn color="primary" outline label="add call" />
      </router-link>
    </div>
    <q-markup-table class="q-ma-sm" flat bordered>
      <thead>
        <tr>
          <th align="left">Title</th>
          <th align="left">Date From</th>
          <th align="left">Date To</th>
          <th align="center">Active</th>
          <th align="left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.date_from }}</td>
          <td>{{ item.date_to }}</td>
          <td align="center">
            <q-icon
              v-if="item.is_active"
              name="check_circle_outline"
              size="lg"
              color="green"
            />
            <q-btn
              v-else
              color="primary"
              dense
              outline
              label="set as active"
              @click="setAsActiveCall(item.id)"
            />
          </td>
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
    <div v-if="items.length == 0">
      <p class="text-center q-py-xl q-my-xl text-h3 text-grey">
        No Calls Found!
      </p>
      <div class="text-center">
        <router-link to="/calls/create">
          <q-btn color="primary" outline label="add call" />
        </router-link>
      </div>
    </div>
  </q-page>
</template>

<script>
import { getCalls } from "src/utils/api";

export default {
  name: "DataTable",
  data() {
    return {
      items: [],
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
    setAsActiveCall(callId) {
      this.$utilsStore.setLoading(true);
      this.$api.get(`/calls/${callId}/set-as-active`).then((res) => {
        if (res.status == 200) {
          this.init();
          this.$utilsStore.setLoading(false);
        }
      });
    },
    deleteItem(id) {
      if (confirm("Delete this call?")) {
        this.$api.delete(`calls/${id}`).then((res) => {
          if (res.status == 204) {
            window.location = "/calls";
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
