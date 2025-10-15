const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/no-call-found",
        component: () => import("pages/NoCallFound.vue"),
      },
      {
        path: "proposals",
        component: () => import("components/proposal/ProposalList.vue"),
      },
      {
        path: "applicant/proposals",
        component: () =>
          import("components/proposal/ApplicantProposalList.vue"),
      },
      {
        path: "proposal-reviews",
        component: () => import("components/proposal/ReviewProposalList.vue"),
      },
      {
        path: "grant/create",
        component: () => import("components/grant/CreateGrant.vue"),
      },
      {
        path: "grant",
        component: () => import("pages/IndexPage.vue"),
        children: [],
      },

      {
        path: "account/profile",
        component: () => import("components/account/UserProfile.vue"),
      },

      {
        path: "account/password",
        component: () => import("components/account/ChangePassword.vue"),
      },
      {
        path: "calls",
        component: () => import("components/call/Calls.vue"),
      },
      {
        path: "calls/create",
        component: () => import("components/call/CreateCall.vue"),
      },
      {
        path: "calls/:call_id",
        component: () => import("components/call/Call.vue"),
      },

      {
        path: "themes",
        component: () => import("components/theme/Themes.vue"),
      },
      {
        path: "themes/create",
        component: () => import("components/theme/CreateTheme.vue"),
      },
      {
        path: "themes/:id",
        component: () => import("components/theme/Theme.vue"),
      },

      {
        path: "reviewers",
        component: () => import("components/reviewer/Reviewers.vue"),
      },

      {
        path: "applicants",
        component: () => import("components/applicant/Applicants.vue"),
      },

      {
        path: "reviewers/create",
        component: () => import("components/reviewer/CreateReviewer.vue"),
      },
      {
        path: "reviewers/:user_id",
        component: () => import("components/reviewer/Reviewer.vue"),
      },
    ],
  },

  {
    path: "/proposals",
    component: () => import("components/proposal/ProposalLayout.vue"),
    children: [
      {
        path: "submitted/list",
        component: () => import("components/proposal/SubmittedProposals.vue"),
      },
      {
        path: ":proposal_id",
        component: () => import("components/proposal/ProposalEditor.vue"),
      },
      {
        path: ":proposal_id/reviews",
        component: () => import("components/proposal/ProposalReviewers.vue"),
      },
      {
        path: ":proposal_id/reports",
        component: () => import("src/components/proposal/ExpenseReports.vue"),
      },
      {
        path: ":proposal_id/team",
        component: () => import("components/proposal/ProposalTeam.vue"),
      },
    ],
  },

  {
    path: "/go/proposals",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "submitted",
        component: () => import("components/proposal/SubmittedProposals.vue"),
      },
      {
        path: "reviewed",
        component: () => import("components/proposal/ReviewedProposals.vue"),
      },
      {
        path: "selected",
        component: () => import("components/proposal/SelectedProposals.vue"),
      },
    ],
  },

  {
    path: "/applicant/proposals",
    component: () => import("components/proposal/ApplicantProposalLayout.vue"),
    children: [
      {
        path: ":proposal_id",
        component: () => import("components/proposal/ApplicantProposal.vue"),
      },
      {
        path: ":proposal_id/reviews",
        component: () => import("components/proposal/ProposalReviews.vue"),
      },
      {
        path: ":proposal_id/reports",
        component: () => import("src/components/proposal/ExpenseReports.vue"),
      },
      {
        path: ":proposal_id/team",
        component: () => import("components/proposal/ProposalTeam.vue"),
      },
    ],
  },

  {
    path: "/proposal-reviews",
    component: () => import("components/proposal/ReviewProposalLayout.vue"),
    children: [
      {
        path: ":proposal_id",
        component: () => import("components/proposal/ReviewProposal.vue"),
      },
      {
        path: ":proposal_id/reviews",
        component: () => import("components/proposal/ProposalReviews.vue"),
      },
      {
        path: ":proposal_id/team",
        component: () => import("components/proposal/ProposalTeam.vue"),
      },
    ],
  },

  {
    path: "/index",
    component: () => import("layouts/IndexLayout.vue"),
    children: [
      {
        path: "account/signup",
        component: () => import("components/account/UserSignup.vue"),
      },
      {
        path: "account/signin",
        component: () => import("components/account/UserSignin.vue"),
      },
      {
        path: "account/password-reset",
        component: () => import("components/account/PasswordReset.vue"),
      },

      {
        path: "account/password/set/:token",
        component: () => import("components/account/SetPassword.vue"),
      },
      {
        path: "account/:token/complete-signup",
        component: () => import("components/account/CompleteSignup.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/unauthorised",
    component: () => import("pages/ErrorUnauthorised.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },

  {
    path: "/test",
    component: () => import("layouts/TestLayout.vue"),
    children: [
      {
        path: "1",
        component: () => import("pages/TestPage.vue"),
      },
    ],
  },
];

export default routes;
