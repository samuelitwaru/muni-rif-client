<template lang="">
  <div>
    <hr id="problem" class="section-separator" />
    <div class="q-pa-sm">
      <q-toolbar-title class="flex">
        The Problem
        <problem-editor
          :proposal="proposal"
          :section="{ id: '#problem', name: 'problem', title: 'The Problem' }"
          @proposal-updated="proposal = $event"
        />
      </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div style="overflow: auto" v-html="proposal?.problem || content"></div>
      </q-card>
    </div>

    <hr id="solution" class="section-separator" />

    <div class="q-pa-sm">
      <q-toolbar-title class="flex">
        Proposed Solution
        <problem-editor
          :proposal="proposal"
          :section="{
            id: '#solution',
            name: 'solution',
            title: 'Proposed Solution',
          }"
          @proposal-updated="proposal = $event"
        />
      </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div
          style="overflow: auto"
          v-html="proposal?.solution || content"
        ></div>
      </q-card>
    </div>

    <hr id="outputs" class="section-separator" />

    <div class="q-pa-sm">
      <q-toolbar-title class="flex">
        Outputs, Outcomes and Impact
        <problem-editor
          :proposal="proposal"
          :section="{
            id: '#outputs',
            name: 'outputs',
            title: 'Outputs, Outcomes and Impact',
          }"
          @proposal-updated="proposal = $event"
        />
      </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div style="overflow: auto" v-html="proposal?.outputs || content"></div>
      </q-card>
    </div>

    <hr id="team" class="section-separator" />

    <div class="q-pa-sm">
      <q-toolbar-title class="flex">
        Team Composition
        <problem-editor
          :proposal="proposal"
          :section="{
            id: '#team',
            name: 'team',
            title: 'Team Composition',
          }"
          @proposal-updated="proposal = $event"
        />
      </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div style="overflow: auto" v-html="proposal?.team || content"></div>
      </q-card>
    </div>

    <hr id="capacity_development" class="section-separator" />

    <div class="q-pa-sm">
      <q-toolbar-title class="flex">
        Provision for Capacity Development
        <problem-editor
          :proposal="proposal"
          :section="{
            id: '#capacity_development',
            name: 'capacity_development',
            title: 'Provision for Capacity Development',
          }"
          @proposal-updated="proposal = $event"
        />
      </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div
          style="overflow: auto"
          v-html="proposal?.capacity_development || content"
        ></div>
      </q-card>
    </div>

    <hr id="scalability" class="section-separator" />

    <div class="q-pa-sm">
      <q-toolbar-title class="flex">
        Dissemination, Scalabilty and Sustainability
        <problem-editor
          :proposal="proposal"
          :section="{
            id: '#scalability',
            name: 'scalability',
            title: 'Dissemination, Scalabilty and Sustainability',
          }"
          @proposal-updated="proposal = $event"
        />
      </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div
          style="overflow: auto"
          v-html="proposal?.scalability || content"
        ></div>
      </q-card>
    </div>

    <hr id="ethical_implications" class="section-separator" />

    <div class="q-pa-sm">
      <q-toolbar-title class="flex">
        Ethical Implications and Enviromental Impact
        <problem-editor
          :proposal="proposal"
          :section="{
            id: '#ethical_implications',
            name: 'ethical_implications',
            title: 'Ethical Implications and Enviromental Impact',
          }"
          @proposal-updated="proposal = $event"
        />
      </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div
          style="overflow: auto"
          v-html="proposal?.ethical_implications || content"
        ></div>
      </q-card>
    </div>

    <hr id="conflict_of_interest" class="section-separator" />

    <div class="q-pa-sm">
      <q-toolbar-title class="flex">
        Conflict of Interest
        <problem-editor
          :proposal="proposal"
          :section="{
            id: '#conflict_of_interest',
            name: 'conflict_of_interest',
            title: 'Conflict of Interest',
          }"
          @proposal-updated="proposal = $event"
        />
      </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div
          style="overflow: auto"
          v-html="proposal?.conflict_of_interest || content"
        ></div>
      </q-card>
    </div>

    <hr id="summary_budget" class="section-separator" />

    <div class="q-pa-sm">
      <q-toolbar-title class="flex">
        Summary Budget
        <problem-editor
          :proposal="proposal"
          :section="{
            id: '#summary_budget',
            name: 'summary_budget',
            title: 'Summary Budget',
          }"
          @proposal-updated="proposal = $event"
        />
      </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div
          style="overflow: auto"
          v-html="proposal?.summary_budget || content"
        ></div>
      </q-card>
    </div>

    <hr id="detailed_budget" class="section-separator" />

    <div class="q-pa-sm">
      <q-toolbar-title class="flex">
        Detailed Budget
        <problem-editor
          :proposal="proposal"
          :section="{
            id: '#detailed_budget',
            name: 'detailed_budget',
            title: 'Detailed Budget',
          }"
          @proposal-updated="proposal = $event"
        />
      </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div
          style="overflow: auto"
          v-html="proposal?.detailed_budget || content"
        ></div>
      </q-card>
    </div>

    <hr id="workplan" class="section-separator" />

    <div class="q-pa-sm">
      <q-toolbar-title class="flex">
        Workplan
        <problem-editor
          :proposal="proposal"
          :section="{
            id: '#workplan',
            name: 'workplan',
            title: 'Workplan',
          }"
          @proposal-updated="proposal = $event"
        />
      </q-toolbar-title>
      <q-card flat bordered class="bg-grey-2 q-pa-sm">
        <div
          style="overflow: auto"
          v-html="proposal?.workplan || content"
        ></div>
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      proposal: {},
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
