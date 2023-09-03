<template>
  <div>
    <q-btn
      color="primary"
      icon="send"
      label="Submit"
      @click="modalVisible = true"
    />
    <q-dialog v-model="modalVisible">
      <q-card>
        <q-card-section>
          <div class="text-h6">Sumit Proposal</div>
        </q-card-section>
        <q-separator />

        <q-card-section>
          <alert-msg
            message="You will not be able to edit this proposal once submitted."
            icon="crisis_alert"
          />
          <p class="q-pa-md">Do you wish to proceed?</p>
        </q-card-section>
        <q-separator />
        <q-card-section align="right">
          <q-btn
            color="primary"
            flat
            label="Cancel"
            @click="modalVisible = false"
          />
          <q-btn color="primary" label="Submit" @click="submitProposal" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalVisible: false,
    };
  },
  methods: {
    submitProposal() {
      this.$api
        .patch(`/proposals/${this.$route.params.id}/`, {
          status: "SUBMITTED",
        })
        .then((res) => {
          console.log(res);
          location.reload();
        });
    },
  },
};
</script>
