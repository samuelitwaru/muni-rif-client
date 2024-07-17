<template lang="">
  <div v-if="score">
    <q-card class="flex q-my-sm items-center" flat bordered>
      <q-card-section>
        <q-circular-progress
          show-value
          font-size="12px"
          :value="(score[section.name] / section.max_score) * 100"
          size="50px"
          :thickness="0.22"
          color="teal"
          track-color="grey-3"
          class="q-ma-md"
          >{{ score[section.name] }}/{{
            section.max_score
          }}</q-circular-progress
        >
      </q-card-section>

      <div>{{ score[`${section.name}_comment`] || "No comment" }}</div>
    </q-card>
  </div>
</template>
<script>
export default {
  props: ["score", "section"],
  name: "ScoreView",
};
</script>
<style lang=""></style>
