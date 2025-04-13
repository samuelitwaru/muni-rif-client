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

function converDateToString(date, separator = "/") {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const dd = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${yyyy}${separator}${mm}${separator}${dd}`;
  return formattedDate;
}

function parseDate(ymdString) {
  const [year, month, day] = ymdString.split("/").map(Number);
  return new Date(year, month - 1, day); // Month is 0-based in JS
}

export {
  protectFile,
  generateRandomString,
  userHasAnyGroups,
  converDateToString,
  parseDate,
};
