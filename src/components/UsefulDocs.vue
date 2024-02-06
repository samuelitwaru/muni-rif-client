<template lang="">
  <div>
    <q-card class="my-card q-ma-sm" flat bordered>
      <q-card-section>
        <div class="text-h6">Useful Documents</div>
      </q-card-section>

      <q-separator />

      <q-card-actions vertical>
        <q-chip
          color="secondary"
          v-for="file in files"
          :key="file.id"
          class="glossy"
          icon="note"
          :label="file.name"
          clickable
          @click="openFile(file.url)"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      files: [
        {
          name: "MUNIRIF_PROPOSAL_GUIDELINES_Round_2",
          url: "https://munirif.pythonanywhere.com/media/MUNIRIF_PROPOSAL_GUIDELINES_Round_2.pdf",
        },
        {
          name: "MUNIRIF_Round_Two_Call_Final",
          url: "https://munirif.pythonanywhere.com/media/MUNIRIF_Round_Two_Call_Final.pdf",
        },
      ],
    };
  },
  methods: {
    openFile(fileURL) {
      window.open(fileURL);
    },
  },
};
</script>
<style lang=""></style>
