<template lang="">
  <div>
    <ProposalAttachments v-if="section.name == 'attachments'" />
    <BudgetItems v-else-if="section.name == 'summary_budget'" :proposal_id="$route.params.proposal_id" />
    <TeamMembers v-else-if="section.name == 'team'" />
    <div v-else>
      <q-card flat bordered class="q-pa-sm q-my-sm">
        <div
          style="overflow: auto; min-height: 5rem"
          v-html="proposal?.[section['name']] || ''"
        ></div>
      </q-card>
    </div>
  </div>
</template>
<script>
import ProposalAttachments from "components/proposal/ProposalAttachments.vue";
import BudgetItems from "components/proposal/BudgetItems.vue";
import TeamMembers from "components/proposal/TeamMembers.vue";
export default {
  props: ["score", "section", "proposal"],
  name: "ScoreView",
  components: {
    ProposalAttachments,
    BudgetItems,
    TeamMembers,
  },
};
</script>
<style lang=""></style>
