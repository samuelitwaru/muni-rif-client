<template>
  <div class="table-wrapper">
    <h2>Expandable Table</h2>

    <table>
      <thead>
        <tr>
          <th align="left">Project</th>
          <th align="left">Last Updated</th>
          <th align="center">Budget Allocation</th>
          <th align="center">Total Expenses</th>
          <th align="center">Budget Balance</th>
          <th align="left"></th>
        </tr>
      </thead>

      <tbody>
        <template v-for="(row, index) in rows" :key="index">
          <!-- Main Row -->
          <tr class="expandable" @click="toggle(index)">
            <td>{{ row.name }}</td>
            <td>{{ row.role }}</td>
            <td>{{ row.status }}</td>
          </tr>

          <!-- Expanded Content -->
          <tr v-if="expandedIndex === index" class="expand-content">
            <td colspan="3">
              <strong>Details:</strong><br />
              Skills: {{ row.skills }}<br />
              Experience: {{ row.experience }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

const expandedIndex = ref(null);

const rows = ref([
  {
    name: "John Doe",
    role: "Developer",
    status: "Active",
    skills: "JavaScript, Vue, Node.js",
    experience: "5 years",
  },
  {
    name: "Jane Smith",
    role: "Designer",
    status: "Inactive",
    skills: "UI/UX, Figma, Adobe XD",
    experience: "3 years",
  },
]);

function toggle(index) {
  expandedIndex.value = expandedIndex.value === index ? null : index;
}
</script>

<style scoped>
.table-wrapper {
  max-width: 800px;
  margin: auto;
  font-family: Arial, sans-serif;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

.expandable {
  cursor: pointer;
  background-color: #fafafa;
}

.expandable:hover {
  background-color: #f0f0f0;
}

.expand-content {
  background-color: #f9f9f9;
}
</style>
