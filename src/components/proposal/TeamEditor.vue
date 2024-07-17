<template>
  <div>
    <q-markup-table class="q-my-sm" flat bordered>
      <thead>
        <tr>
          <th align="left">Full Name</th>
          <th align="left">Email</th>
          <th align="left">Telephone</th>
          <th align="left">Role</th>
          <th
            v-if="$proposalStore.currentProposal?.status == 'EDITING'"
            align="left"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="q-tr--no-hover"
          v-if="
            $proposalStore.currentProposal?.status == 'EDITING' &&
            items.length < 5
          "
        >
          <td>
            <input
              v-model="formData.full_name"
              style="display: block; width: 100%"
              type="text"
            />
          </td>
          <td>
            <input
              v-model="formData.email"
              style="display: block; width: 100%"
              type="email"
            />
          </td>
          <td>
            <input
              v-model="formData.telephone"
              style="display: block; width: 100%"
              type="text"
            />
          </td>

          <td>
            <select v-model="formData.role">
              <option
                v-for="option in options"
                :key="option.name"
                :value="option.name"
              >
                {{ option.value }}
              </option>
            </select>
          </td>

          <td>
            <button @click="createTeam">Add</button>
          </td>
        </tr>
        <tr class="q-tr--no-hover" v-for="item in items" :key="item.id">
          <td>{{ item.full_name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.telephone }}</td>
          <td>{{ item.role }}</td>
          <td v-if="$proposalStore.currentProposal?.status == 'EDITING'">
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
  </div>
</template>

<script>
export default {
  name: "TeamEditor",
  data() {
    return {
      formData: {
        full_name: "",
        email: "",
        telephone: "",
        proposal: this.$route.params.proposal_id,
      },
      items: [],
      options: [
        { name: "PI", value: "PI" },
        { name: "Co PI", value: "Co PI" },
        { name: "MEMBER", value: "MEMBER" },
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getTeams();
    },
    getTeams() {
      this.$api
        .get(`teams/?proposal=${this.$route.params.proposal_id}`)
        .then((res) => {
          this.items = res.data;
        });
    },
    createTeam() {
      this.$api.post(`teams/`, this.formData).then((res) => {
        if ((res.status = 201)) {
          this.items.push(res.data);
          this.resetFormData();
          this.$bus.emit("proposal-updated", true);
        }
      });
    },

    deleteItem(id) {
      if (confirm("Delete this team?")) {
        this.$api.delete(`teams/${id}`).then((res) => {
          if (res.status == 204) {
            this.init();
            this.$bus.emit("proposal-updated", true);
          }
        });
      }
    },
    resetFormData() {
      this.formData = {
        full_name: "",
        email: "",
        telephone: "",
        proposal: this.$route.params.proposal_id,
      };
    },
  },
};
</script>
