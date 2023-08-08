<template lang="">
  <div class="container">
    <!-- Fixed column -->
    <div class="fixed-column">
      <!-- Add your content here for the fixed column -->
      <div style="height: 100%">
        <q-list>
          <router-link to="/account/profile">
            <q-item clickable v-ripple>
              <q-item-section>Profile</q-item-section>
            </q-item>
          </router-link>

          <router-link to="/account/password">
            <q-item clickable v-ripple>
              <q-item-section>Password</q-item-section>
            </q-item>
          </router-link>
        </q-list>
      </div>
    </div>

    <!-- Scrollable column -->
    <div class="scrollable-column"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        subject: "",
        problem: "",
        solution: "",
        budget: "",
      },
    };
  },
  methods: {},
};
</script>

<style>
body,
html {
  height: 100%;
  margin: 0;
}

.container {
  display: flex;
  height: 100%;
}

.fixed-column {
  flex: 0 0 auto;
  /* width: 300px; Change the width of the fixed column as needed */
  background-color: #f2f2f2;
  /* padding: 20px; */
}

.scrollable-column {
  flex: 1 1 auto;
  max-height: calc(
    100vh - 40px
  ); /* Adjust the max height to leave space for padding */
  overflow-y: auto;
  padding: 10px;
  scroll-behavior: smooth;
}
</style>
