<template lang="">
  <div>
    <hr id="problem" class="section-separator" />
    <div class="q-pa-sm">
      <q-toolbar-title> The Problem </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div v-html="content"></div>
      </q-card>
    </div>

    <hr id="solution" class="section-separator" />

    <div class="q-pa-sm">
      <q-toolbar-title> Proposed Solution </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div v-html="content"></div>
      </q-card>
    </div>

    <hr id="outputs" class="section-separator" />

    <div class="q-pa-sm">
      <q-toolbar-title> Outputs, Outcomes and Impact </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div v-html="content"></div>
      </q-card>
    </div>

    <hr id="team" class="section-separator" />

    <div class="q-pa-sm">
      <q-toolbar-title> Team Composition </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div v-html="content"></div>
      </q-card>
    </div>

    <hr id="capacity_development" class="section-separator" />

    <div class="q-pa-sm">
      <q-toolbar-title> Provision for Capacity Development </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div v-html="content"></div>
      </q-card>
    </div>

    <hr id="scalability" class="section-separator" />

    <div class="q-pa-sm">
      <q-toolbar-title>
        Dissemination, Scalabilty and Sustainability
      </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div v-html="content"></div>
      </q-card>
    </div>

    <hr id="ethical_implications" class="section-separator" />

    <div class="q-pa-sm">
      <q-toolbar-title>
        Ethical Implications and Enviromental Impact
      </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div v-html="content"></div>
      </q-card>
    </div>

    <hr id="conflict_of_interest" class="section-separator" />

    <div class="q-pa-sm">
      <q-toolbar-title> Conflict of Interest </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div v-html="content"></div>
      </q-card>
    </div>

    <hr id="summary_budget" class="section-separator" />

    <div class="q-pa-sm">
      <q-toolbar-title> Summary Budget </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div v-html="content"></div>
      </q-card>
    </div>

    <hr id="detailed_budget" class="section-separator" />

    <div class="q-pa-sm">
      <q-toolbar-title> Detailed Budget </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div v-html="content"></div>
      </q-card>
    </div>

    <hr id="workplan" class="section-separator" />

    <div class="q-pa-sm">
      <q-toolbar-title> Workplan </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div v-html="content"></div>
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      proposal: null,
      content: `
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati
        natus animi, et itaque ea tempora, exercitationem nemo nobis eos quos
        corrupti quasi cupiditate recusandae magnam, quis dicta facere dolore
        blanditiis.
      </p>
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
  },

  methods: {
    getProposal() {
      this.$api.get(`proposals/${this.$route.params.id}/`).then((res) => {
        this.proposal = res.data;
        this.$proposalStore.setProposal(this.proposal);
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
