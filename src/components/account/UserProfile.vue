<template>
  <div>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" label="Home" />

        <q-breadcrumbs-el label="My Profile" icon="person" />
      </q-breadcrumbs>
    </div>
    <q-separator spaced />
    <div v-if="user">
      <q-card class="my-card q-ma-md" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="col-3 flex flex-center">
            <q-icon name="person" size="xl" />
          </q-card-section>
          <q-card-section class="col q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-xs">
              {{ user.first_name }} {{ user.last_name }}
            </div>
            <div class="text-overline">{{ user.groups }}</div>
            <div class="text-caption text-grey">
              {{ user.profile?.designation }}
            </div>

            <q-markup-table flat bordered>
              <tbody>
                <tr>
                  <td class="text-left">
                    <strong>Faculty</strong>
                    <div>{{ user.profile?.faculty?.name }}</div>
                  </td>
                </tr>
                <tr>
                  <td class="text-left">
                    <strong>Department</strong>
                    <div>{{ user.profile?.department?.name }}</div>
                  </td>
                </tr>
                <tr>
                  <td class="text-left">
                    <strong>Qualification</strong>
                    <div>{{ user.profile?.qualification?.name }}</div>
                  </td>
                </tr>
                <tr>
                  <td class="text-right">
                    <user-logout />
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card-section>
        </q-card-section>

        <q-card-actions align="right"> </q-card-actions>
      </q-card>
    </div>
    <div class="row">
      <div class="col-md-6" align="center">
        <update-user />
      </div>
      <div class="col-md-4 col-sm-6">
        <change-password />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.user = this.$authStore.currentUser;
    },
  },
};
</script>
<style lang=""></style>
