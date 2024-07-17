<template lang="">
  <div>
    <div class="text-h6 q-pa-sm">Background Information</div>
    <q-markup-table flat bordered class="q-ma-sm">
      <tbody>
        <tr class="q-tr--no-hover">
          <td class="text-left">
            <div class="text-h6">Title</div>
          </td>
          <td class="text-left">{{ $proposalStore.currentProposal?.title }}</td>
        </tr>
        <tr class="q-tr--no-hover">
          <td class="text-left">
            <div class="text-h6">Theme</div>
          </td>
          <td class="text-left">
            {{ $proposalStore.currentProposal?.theme_title }}
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
