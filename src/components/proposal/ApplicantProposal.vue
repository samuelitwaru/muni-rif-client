<template lang="">
  <div>
    <accept-review :proposal="proposal" :score="score" />

    <div v-for="section in sections" :key="section.id">
      <hr :id="section.name" class="section-separator" />
      <div class="q-pa-sm">
        <q-toolbar-title class="flex justify-between">
          <div class="flex">
            {{ section.title }}
            <section-editor
              :proposal="proposal"
              :section="section"
              @proposal-updated="proposal = $event"
            />
          </div>
        </q-toolbar-title>
        <q-card flat bordered class="bg-grey-2 q-pa-sm">
          <div>
            <div
              style="overflow: auto"
              v-html="proposal?.[section['name']] || content"
            ></div>
          </div>
        </q-card>

        <score-editor
          :min="0"
          :max="10"
          :proposal="proposal"
          :section="section"
          :score="score"
        />
      </div>
    </div>

    <hr id="solution" class="section-separator" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      sections: [],
      proposal: {},
      score: null,
      content: `
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati
        natus animi, et itaque ea tempora, exercitationem nemo nobis eos quos
        corrupti quasi cupiditate recusandae magnam, quis dicta facere dolore
        blanditiis.
      </p>`,
    };
  },

  created() {
    this.getProposal();
    this.getSections();
  },

  methods: {
    getProposal() {
      this.$api.get(`proposals/${this.$route.params.id}/`).then((res) => {
        this.proposal = res.data;
        this.$proposalStore.setProposal(this.proposal);
        this.getScore();
      });
    },

    getScore() {
      console.log(this.$authStore.currentUser?.id || 0);
      this.$api
        .get(
          `scores/?user=${this.$authStore.currentUser?.id || 0}&proposal=${
            this.$route.params.id
          }`
        )
        .then((res) => {
          if (res.data.length == 1) {
            this.score = res.data[0];
          }
        });
    },

    getSections() {
      this.$api.get(`sections/`).then((res) => {
        this.sections = res.data;
      });
    },
  },
};
</script>
<style>
body,
html {
  scroll-behavior: smooth;
}

.section-separator {
  margin-bottom: 3rem;
}
</style>
