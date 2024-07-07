<template lang="">
  <div>
    <div class="q-pa-sm">
      <q-toolbar-title>Team</q-toolbar-title>
      <q-markup-table flat bordered>
        <tbody>
          <tr>
            <td class="text-left q-my-auto">
              <q-icon size="sm" name="person" />
              <label class="q-pa-sm" for="">
                {{ $proposalStore.currentProposal.user__first_name }}
                {{ $proposalStore.currentProposal.user__last_name }}
              </label>
            </td>
            <td class="text-right"></td>
          </tr>
          <tr v-for="member in team" :key="member.id">
            <td class="text-left q-my-auto">
              <q-icon size="sm" name="person" />
              <label class="q-pa-sm" for="">
                {{ member.first_name }}
                {{ member.last_name }}
                [{{ member.email }}]
              </label>
            </td>
            <td class="text-right">
              <q-btn
                v-if="
                  $authStore.currentUser.id ==
                  $proposalStore.currentProposal.user
                "
                color="primary"
                flat
                dense
                icon="close"
                @click="removeMember(member.id)"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <!-- <p v-if="!team.length" align="center" class="q-my-lg">
        No team members found
      </p> -->
      <div
        v-if="$authStore.currentUser.id == $proposalStore.currentProposal.user"
      >
        <q-separator spaced />
        <q-toolbar-title>Add Team Member</q-toolbar-title>
        <q-card flat bordered class="my-card q-my-sm">
          <div class="row">
            <div class="col-6 q-pa-sm">
              <q-btn-dropdown
                flat
                class="q-mx-sm"
                label="Select Member"
                color="primary"
              >
                <q-list>
                  <q-item
                    v-for="user in applicants.filter(
                      (appl) => appl.id != $authStore.currentUser.id
                    )"
                    :key="user.id"
                    clickable
                    v-close-popup
                    @click="
                      this.formData.email = user.email;
                      this.formData.user = user.id;
                    "
                  >
                    <q-item-section>
                      <q-item-label>
                        <div>
                          {{ user.first_name }}
                          {{ user.last_name }}
                          [{{ user.email }}]
                        </div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
            <div class="col-4 q-pa-sm">
              <q-input
                outlined
                dense
                v-model="formData.email"
                type="email"
                label="Enter Email Address"
              />
            </div>
            <div class="col-2 q-pa-sm">
              <q-btn color="primary" label="Add" @click="addMember" />
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      team: [],
      applicants: [],
      loading: false,
      formData: {
        user: null,
        email: null,
        proposal: this.$route.params.proposal_id,
      },
    };
  },
  created() {
    this.getTeam();
    this.getApplicants();
  },
  methods: {
    getTeam() {
      this.$api
        .get(`proposals/${this.$route.params.proposal_id}/team`)
        .then((res) => {
          this.team = res.data;
        });
    },

    getApplicants() {
      this.$api.get("users/?groups__name__in=applicant").then((res) => {
        this.applicants = res.data;
      });
    },

    addMember() {
      this.$utilsStore.setLoading(true);
      this.$api
        .post(
          `proposals/${this.$route.params.proposal_id}/team/add/`,
          this.formData
        )
        .then((res) => {
          this.team = res.data;
          this.$utilsStore.setLoading(false);
          window.location.reload();
        });
    },

    removeMember(id) {
      if (confirm("Are you sure you would like to member this member?")) {
        this.$utilsStore.setLoading(true);
        this.$api
          .post(`proposals/${this.$route.params.proposal_id}/team/remove/`, {
            user: id,
          })
          .then((res) => {
            this.team = res.data;
            this.$utilsStore.setLoading(false);
          });
      }
    },
  },
};
</script>
<style lang=""></style>
