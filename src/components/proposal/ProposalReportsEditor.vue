<template>
  <div class="q-pa-md">
    <div class="text-h6">Other Reports</div>
    <q-markup-table class="q-my-sm" flat bordered>
      <thead>
        <tr>
          <th align="left">Title</th>
          <th align="left">Due Date</th>
          <th align="left" colspan="2">Files</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="schedule in reporting_dates" :key="schedule.id">
          <td>
            {{ schedule.title }}
          </td>
          <td>{{ schedule.date }}</td>
          <td>
            <div class="flex">
              <q-chip
                v-for="file in reports.filter(rep=>rep.reporting_date===schedule.id)"
                dense
                :key="file.id"
                class="glossy"
                icon="attachment"
                :label="getFileNameFromUrl(file.file)"
                :removable="
                  $userHasAnyGroups(['applicant']) &&
                  $authStore.currentUser.id ==
                    $proposalStore.currentProposal.user &&
                  $proposalStore.currentProposal.status == 'SELECTED'
                "
                clickable
                @remove="deleteReport(file.id)"
                @click="openFile(file.file)"
              />
            </div>
          </td>
          <td>
            <FileUploader2 v-if="$userHasAnyGroups(['applicant']) &&
                  $authStore.currentUser.id ==
                    $proposalStore.currentProposal.user &&
                  $proposalStore.currentProposal.status == 'SELECTED'" @file-uploaded="getReports()" uploadUrl="/reports/" :multiple="false" :formData="{title:schedule.title, reporting_date:schedule.id, proposal:$route.params.proposal_id}" />
          </td>
        </tr>
        <tr v-if="reporting_dates.length==0" align="center">
          <td colspan="3">
            No report schedules found.
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import FileUploader2 from '../widgets/FileUploader2.vue';

export default {
  name: "ProposalReportsEditor",
  components: {FileUploader2},
  data() {
    return {
      reports: [],
      reporting_dates: []
    };
  },
  created() {
    this.getReports()
    this.getReportingSchedules()
  },
  methods: {
    getReports() {
      this.$api.get(`reports/`).then((res) => {
        this.reports = res.data;
        console.log('reports:', res.data)
      });
    },

    getReportingSchedules() {
      this.$api.get(`reporting-dates/`).then((res) => {
        this.reporting_dates = res.data;
      });
    },

    validateAttachments() {
      let isAttachmentsValid = true;
      let invalidAttachements = this.attachments.filter(
        (attachment) => {
          return attachment.is_required && !attachment.files?.length
        }
      );
      if (invalidAttachements.length) {
        isAttachmentsValid = false;
      } else {
        isAttachmentsValid = true;
      }
      this.$bus.emit("attachments-updated", isAttachmentsValid);
      return isAttachmentsValid;
    },

    deleteReport(reportId) {
      if (confirm("Delete this Report?")) {
        this.$api.delete(`reports/${reportId}/`).then((res) => {
          if (res.status == 204) {
            this.getReports();
          }
        });
      }
    },

    openFile(fileURL) {
      window.open(fileURL);
    },
    getFileNameFromUrl(url) {
      const splits = url.split('/')
      return splits[splits.length-1]
    }
  },
};
</script>
