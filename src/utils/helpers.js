import { authStore } from "stores/auth";

const fileAccessRoles = {
  "ProposalLayout.vue": ["grants_officer"],
  "ApplicantProposalLayout.vue": ["applicant"],
  "ReviewProposalLayout.vue": ["reviewer"],
  "ProposalList.vue": ["grants_officer"],
  "ApplicantProposalList.vue": ["applicant"],
  "ReviewProposalList.vue": ["reviewer"],
};

function userHasAnyGroups(groups) {
  var userGroups = authStore().currentUser.groups;

  return groups.some((group) => userGroups.includes(group));
}

function protectFile(filepath) {
  let array = filepath.split("/");
  let filename = array[array.length - 1];
  let groups = fileAccessRoles[filename];
  console.log(groups);
  if (groups) {
    if (userHasAnyGroups(groups)) {
      return true;
    } else {
      window.location = "/unauthorised";
    }
  }
}

export { protectFile };
