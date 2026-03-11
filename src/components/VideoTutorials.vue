<template lang="">
  <div>
    <q-card class="my-card q-ma-sm" flat bordered>
      <q-card-section>
        <div class="text-h6">Video Tutorials</div>
      </q-card-section>
      <q-separator />
      <q-card-actions class="row justify-start q-gutter-lg">
        <template v-for="vid in videos" :key="vid.id">
          <q-card v-if="$userHasAnyGroups(vid.roles)" class="my-card">
            <q-video :src="vid.url" style="width: 300px; height: 160px" />
            <q-card-section>
              <div class="text-subtitle2">{{ vid.title }}</div>
            </q-card-section>
          </q-card>
        </template>
      </q-card-actions>
    </q-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      videos: [
        {
          title: "Call Management",
          url: "https://www.youtube.com/embed/gieUz80f3RE?si=1446t0jorTNjtO4k",
          roles: ["grants_officer"],
        },
        {
          title: "Screening, Selection, Award, Reporting",
          url: "https://www.youtube.com/embed/rO6A4UaX2w0?si=1IOQDxDLu3m36ckZ",
          roles: ["grants_officer"],
        },
        {
          title: "Grants Application",
          url: "https://www.youtube.com/embed/ymK2nyyXbwg?si=HXQaNNraKy2eovEv",
          roles: ["applicant"],
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
