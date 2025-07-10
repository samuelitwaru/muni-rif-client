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
      <CreateCallModal />
    </div>

    <q-markup-table separator="cell" class="q-ma-sm" flat bordered>
      <thead>
        <tr>
          <th align="left">Title</th>
          <th align="left">Start</th>
          <th align="left">Submission Date</th>
          <th align="left">Review Date</th>
          <th align="left">Selection Date</th>
          <th align="left">End Date</th>
          <th align="center">Active</th>
          <th align="left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background-color: #dddddd;" v-if="currentCall">
          <th align="left">{{ currentCall.title }}</th>
          <th align="left">{{ currentCall.date_from }}</th>
          <th align="left">{{ currentCall.submission_date }}</th>
          <th align="left">{{ currentCall.review_date }}</th>
          <th align="left">{{ currentCall.selection_date }}</th>
          <th align="left">{{ currentCall.date_to }}</th>
          <th align="center">
            <q-icon name="check_circle_outline" size="lg" color="green" />
          </th>
          <th align="left">
            <router-link :to="`/calls/${currentCall.id}`">
              <q-btn
                icon="edit"
                flat
                color="primary"
                @click="editItem(currentCall)"
              />
            </router-link>
          </th>
        </tr>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.date_from }}</td>
          <td>{{ item.submission_date }}</td>
          <td>{{ item.review_date }}</td>
          <td>{{ item.selection_date }}</td>
          <td>{{ item.date_to }}</td>
          <td align="center">
            <q-btn
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
    <div v-if="!currentCall && items.length == 0">
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
import CreateCallModal from "./CreateCallModal.vue";

export default {
  components: {
    CreateCallModal,
  },
  name: "DataTable",
  data() {
    return {
      items: [],
      currentCall: {},
      entity: {},
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getEntity();
    },
    async getEntity() {
      const res = await this.$api.get(`entities/`);
      this.entity = res.data[0];
      this.$dataStore.setEntity(this.entity);
      console.log("entity", this.entity);
      getCalls().then((res) => {
        console.log("calls", res);
        this.items = res;
        this.currentCall = this.items.find(
          (item) => item.id == this.entity.current_call
        );
        this.items = this.items.filter(
          (item) => item.id != this.entity.current_call
        );
        console.log("store", this.currentCall);
        this.$dataStore.setCall(this.currentCall);
      });
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
