<template>
  <div
    v-if="
      score &&
      score?.status != 'IN PROGRESS' &&
      score?.status != 'COMPLETED' &&
      this.$userHasAnyGroups(['reviewer'])
    "
  >
    <q-dialog v-model="modalVisible" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Proposal Review Invitation</div>
        </q-card-section>
        <q-separator />

        <q-card-section>
          <p class="q-pa-md">
            You have been inivited to review this proposal on "{{
              proposal.title
            }}".
          </p>
          <p class="q-pa-md">
            Click the <strong>ACCEPT</strong> button to start your review
          </p>
        </q-card-section>
        <q-separator />
        <q-card-section align="right">
          <q-btn color="primary" label="Accept" @click="acceptReview" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {
    proposal: {
      type: Object,
      required: true,
    },
    score: {
      required: true,
    },
  },
  data() {
    return {
      modalVisible: true,
      loading: false,
    };
  },
  methods: {
    acceptReview() {
      this.$utilsStore.setLoading(true);
      this.$api
        .patch(`/scores/${this.score.id}/`, {
          status: "IN PROGRESS",
        })
        .then((res) => {
          location.reload();
        });
    },
  },
};
</script>
