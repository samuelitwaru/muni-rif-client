<template>
  <q-page>
    <div class="q-ma-md">
      <q-breadcrumbs>
        <!-- <q-breadcrumbs-el icon="home" to="/" label="Home" /> -->
        <q-breadcrumbs-el text-color="black" label="Home" icon="home" />
      </q-breadcrumbs>
    </div>
    <q-separator spaced />
    <div class="q-pt-xl flex flex-center">
      <DropdownCallMenu v-if="$userHasAnyGroups(['grants_officer'])" />
    </div>
    <CallProgress />
    <main-menu />
    <!-- <SupportButton @action="handleSupport" /> -->
  </q-page>
</template>

<script>
import CallProgress from "src/components/call/CallProgress.vue";
import { defineComponent } from "vue";
import DropdownCallMenu from "src/components/call/DropdownCallMenu.vue";

// import { DropdownCallMenu } from "src/components/call/DropdownCallMenu.vue";
// import SupportButton from "src/components/SupportButton.vue";

export default defineComponent({
  name: "IndexPage",
  components: { CallProgress, DropdownCallMenu },
  data() {
    return {
      call: this.$dataStore?.currentCall,
    };
  },
  created() {},
  methods: {},
});
</script>
