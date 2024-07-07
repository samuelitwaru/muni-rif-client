<template lang="">
  <div>
    <proposal-score-sheets />
    <div class="q-pa-sm">
      <q-toolbar-title>Reports</q-toolbar-title>
      <q-markup-table class="q-my-sm" flat bordered>
        <thead>
          <tr>
            <th align="left">Title</th>
            <th align="left">Deadline</th>
            <th align="left">Reports</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="date in reportingDates" :key="date.id">
            <td>{{ date.title }}</td>
            <td>{{ date.date }}</td>
            <td>
              <div v-if="date?.files?.length" class="flex">
                <div v-for="file in date.files" :key="file.id">
                  <q-btn
                    color="primary"
                    flat
                    icon="report"
                    :label="file.title"
                    :removable="
                      $userHasAnyGroups(['applicant']) &&
                      $authStore.currentUser.id ==
                        $proposalStore.currentProposal.user &&
                      $proposalStore.currentProposal.status == 'EDITING'
                    "
                    @click="openFile(file.file)"
                  />
                  <q-btn
                    color="primary"
                    flat
                    icon="close"
                    @click="deleteFile(file.id)"
                  />
                </div>
              </div>
              <FileUploader
                v-else
                :multiple="false"
                :uploadUrl="`reports/`"
                :formData="{
                  title: date.title,
                  proposal: $proposalStore.currentProposal.id,
                  reporting_date: date.id,
                }"
                @file-uploaded="getReports"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>
<script>
import FileUploader from "components/widgets/FileUploader.vue";
export default {
  components: { FileUploader },
  data() {
    return {
      reportingDates: [],
      loading: false,
    };
  },
  created() {
    this.getReportingDates();
  },
  methods: {
    getReportingDates() {
      this.$api.get(`reporting-dates/`).then((res) => {
        this.reportingDates = res.data;
        this.getReports();
      });
    },

    getReports() {
      for (let index = 0; index < this.reportingDates.length; index++) {
        const date = this.reportingDates[index];
        this.$api
          .get(
            `reports/?proposal_id=${this.$route.params.proposal_id}&reporting_date_id=${date.id}`
          )
          .then((res) => {
            var files = res.data;
            console.log(date.title + ">>" + files);

            this.reportingDates.filter((item) => item.id == date.id)[0].files =
              files;
          });
      }
    },
    deleteFile(fileId) {
      if (confirm("Delete this Report?")) {
        this.$api.delete(`reports/${fileId}/`).then((res) => {
          this.getReports();
        });
      }
    },
    openFile(fileURL) {
      window.open(fileURL);
    },
  },
};
</script>
<style lang=""></style>
