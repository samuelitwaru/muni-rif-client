import { authStore } from "stores/auth";

const fileAccessRoles = {
  ProposalLayout: ["grants_officer"],
  ApplicantProposalLayout: ["applicant"],
  ReviewProposalLayout: ["reviewer"],
  ProposalList: ["grants_officer"],
  ApplicantProposalList: ["applicant"],
  ReviewProposalList: ["reviewer"],
};

function userHasAnyGroups(groups) {
  var userGroups = authStore().currentUser.groups;

  return groups.some((group) => userGroups.includes(group));
}

function protectFile(name) {
  let groups = fileAccessRoles[name];
  if (groups) {
    if (userHasAnyGroups(groups)) {
      return true;
    } else {
      window.location = "/unauthorised";
    }
  }
}

function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

export { protectFile, generateRandomString };
