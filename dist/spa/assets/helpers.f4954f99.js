import{a as s}from"./auth.285be793.js";const n={ProposalLayout:["grants_officer"],ApplicantProposalLayout:["applicant"],ReviewProposalLayout:["reviewer"],ProposalList:["grants_officer"],ApplicantProposalList:["applicant"],ReviewProposalList:["reviewer"]};function i(o){var r=s().currentUser.groups;return o.some(e=>r.includes(e))}function p(o){let r=n[o];if(r){if(i(r))return!0;window.location="/unauthorised"}}function u(o){const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";let e="";for(let t=0;t<o;t++){const a=Math.floor(Math.random()*r.length);e+=r[a]}return e}export{u as g,p};
