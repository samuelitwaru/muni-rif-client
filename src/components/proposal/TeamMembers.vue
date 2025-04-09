<template>
  <div>
    <q-markup-table dense class="q-my-sm" flat bordered>
      <thead>
        <tr>
          <th align="left">Full Name</th>
          <th align="left">Email</th>
          <th align="left">Telephone</th>
          <th align="left">Role</th>
        </tr>
      </thead>
      <tbody>
        <tr class="q-tr--no-hover" v-for="item in items" :key="item.id">
          <td>{{ item.full_name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.telephone }}</td>
          <td>{{ item.role }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
export default {
  name: "TeamMembers",
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
      this.getTeams();
    },
    getTeams() {
      this.$api
        .get(`teams/?proposal=${this.$route.params.proposal_id}`)
        .then((res) => {
          this.items = res.data;
        });
    },
  },
};
</script>
