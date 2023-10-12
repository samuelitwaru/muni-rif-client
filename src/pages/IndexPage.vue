<template>
  <q-page>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <!-- <q-breadcrumbs-el icon="home" to="/" label="Home" /> -->

        <q-breadcrumbs-el label="Home" icon="home" />
      </q-breadcrumbs>
    </div>
    <q-separator spaced />

    <q-card class="my-card q-ma-sm">
      <user-menu-2 />
    </q-card>

    <q-card class="my-card q-ma-sm">
      <q-card-section>
        <div class="text-h6">Useful Documents</div>
      </q-card-section>

      <q-separator />

      <q-card-actions vertical>
        <q-chip
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

    <!-- <developer-menu-2></developer-menu-2> -->
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
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
});
</script>
