<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white text-dark">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          {{ $proposalStore.currentProposal?.title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-grey-2 q-py-lg"
      show-if-above
      bordered
      :width="220"
    >
      <q-list>
        <a
          v-for="(section, index) in sections"
          :key="section.id"
          :href="section.id"
        >
          <q-item clickable v-ripple>
            <div class="q-px-sm border q-my-auto q-mr-sm">
              {{ index + 1 }}
            </div>
            <q-item-section>{{ section.name }}</q-item-section>
          </q-item>
          <q-separator />
        </a>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ProposalLayout",

  setup() {
    const leftDrawerOpen = ref(false);

    const sections = [
      { id: "#problem", name: "The Problem" },
      { id: "#solution", name: "Proposed Solution" },
      { id: "#outputs", name: "Outputs, Outcomes and Impact" },
      { id: "#team", name: "Team Composition" },
      {
        id: "#capacity_development",
        name: "Provision for Capacity Development",
      },
      {
        id: "#scalability",
        name: "Dissemination, Scalabilty and Sustainability",
      },
      {
        id: "#ethical_implications",
        name: "Ethical Implications and Enviromental Impact",
      },
      { id: "#conflict_of_interest", name: "Conflict of Interest" },
      { id: "#summary_budget", name: "Summary Budget" },
      { id: "#detailed_budget", name: "Detailed Budget" },
      { id: "#workplan", name: "Workplan" },
    ];

    return {
      sections,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style>
a {
  text-decoration: none;
}
</style>
