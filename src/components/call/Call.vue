<template>
  <q-page padding v-if="call">
    <div class="q-my-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" to="/" label="Home" />
        <q-breadcrumbs-el label="Calls" to="/calls" icon="campaign" />
        <q-breadcrumbs-el :label="call.title" icon="campaign" />
      </q-breadcrumbs>
    </div>
    <CalendarGrid2 />
  </q-page>
</template>

<script>
import CalendarGrid2 from "components/utils/CalendarGrid2.vue";

export default {
  name: "UpdateCall",
  components: { CalendarGrid2 },
  data() {
    return {
      loading: false,
      showDialog: false,
      call: null,
      // formData: {
      //   title: "",
      // },
    };
  },
  computed: {},
  created() {
    this.getCall();
  },
  methods: {
    getCall() {
      this.$api.get(`calls/${this.$route.params.call_id}/`).then((res) => {
        if (res.status == 200) {
          this.call = res.data;
        }
      });
    },
  },

  watch: {
    showPopup(newValue, oldValue) {
      this.showDialog = newValue;
    },
    showDialog(newValue, oldValue) {
      this.$emit("showPopupChanged", newValue);
    },
  },
};
</script>
