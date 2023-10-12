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
          <q-card-section class="col-2 flex flex-center">
            <q-icon name="person" size="xl" />
            <!-- <q-img
              class="rounded-borders"
              src="https://cdn.quasar.dev/img/parallax2.jpg"
            /> -->
          </q-card-section>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-xs">
              {{ user.first_name }} {{ user.last_name }}
            </div>
            <div class="text-overline">{{ user.groups }}</div>
            <div class="text-caption text-grey">
              {{ user.profile.designation }}
            </div>

            <q-markup-table flat bordered>
              <tbody>
                <tr>
                  <td class="text-left"><strong>Faculty</strong></td>
                  <td class="text-left">{{ user.profile?.faculty.name }}</td>
                </tr>
                <tr>
                  <td class="text-left"><strong>Department</strong></td>
                  <td class="text-left">
                    {{ user.profile?.department.name }}
                  </td>
                </tr>
                <tr>
                  <td class="text-left"><strong>Qualification</strong></td>
                  <td class="text-left">
                    {{ user.profile?.qualification.name }}
                  </td>
                </tr>
                <tr>
                  <td class="text-left"></td>
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
      <div class="col-md-7" align="center">
        <update-user />
      </div>
      <div class="col-md-5">
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
