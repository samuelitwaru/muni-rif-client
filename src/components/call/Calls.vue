<template>
  <q-page>
    <ConfirmDialog
      ref="confirmDialog"
      :message="'Are you sure you want to delete this call?'"
      :icon="'delete'"
      :confirmText="'Delete'"
      :cancelText="'Cancel'"
      @confirm="deleteItem(selectedCallId)"></ConfirmDialog>

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
        <tr style="background-color: #dddddd;" v-if="activeCall">
          <th align="left">{{ activeCall.title }}</th>
          <th align="left">{{ activeCall.date_from }}</th>
          <th align="left">{{ activeCall.submission_date }}</th>
          <th align="left">{{ activeCall.review_date }}</th>
          <th align="left">{{ activeCall.selection_date }}</th>
          <th align="left">{{ activeCall.date_to }}</th>
          <th align="center">
            <q-icon name="check_circle_outline" size="lg" color="green" />
          </th>
          <th align="left">
            <router-link :to="`/calls/${activeCall.id}`">
              <q-btn
                icon="edit"
                flat
                color="primary"
                @click="editItem(activeCall)"
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
              @click="setAsActiveCall(item)"
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
              @click="confirmDelete(item.id)"
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
import ConfirmDialog from "../ConfirmDialog.vue";
import { Dialog, useQuasar } from 'quasar'
const $q = useQuasar()
export default {
  components: {
    CreateCallModal, ConfirmDialog
  },
  name: "DataTable",
  data() {
    return {
      items: [],
      currentCall: {},
      activeCall: {},
      entity: {},
      selectedCallId: null,
    };
  },
  created() {
    this.getEntity();
  },
  methods: {
    async getEntity() {
      const res = await this.$api.get(`entities/`);
      this.entity = res.data[0];
      this.getCalls()
    },
    getCalls() {
      this.$api.get('calls/').then(res=>{
        this.calls = res.data;
        if (this.calls.length) {
          this.activeCall = this.getActiveCall()
          this.items = this.calls.filter(call=>call.id!=this.activeCall.id)
        }
      })
    },
    getActiveCall(){
      return this.calls.find(call=>call.id==this.entity.current_call)
    },
    editItem(item) {
      console.log("Edit item:", item);
    },
    setAsActiveCall(call) {
      this.$utilsStore.setLoading(true);
      this.$api.get(`/calls/${call.id}/set-as-active`).then((res) => {
        if (res.status == 200) {
          this.getEntity()
          this.$utilsStore.setLoading(false);
          this.$q.notify({
            type: "positive",
            message: `${call.title} is now active.`,
          });
          this.$bus.emit('set-active-call', call)
        }
      });
    },
    confirmDelete(id) {
      this.selectedCallId = id;
      console.log(this.$refs.confirmDialog.show = true);
      this.$refs.confirmDialog.show();
    },
    deleteItem(id) {
      this.$api.delete(`calls/${id}`).then((res) => {
        if (res.status == 204) {
          window.location = "/calls";
        }
      });
    },
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
