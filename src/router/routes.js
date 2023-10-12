const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "test", component: () => import("pages/TestPage.vue") },
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
    ],
  },

  {
    path: "/proposals",
    component: () => import("components/proposal/ProposalLayout.vue"),
    children: [
      {
        path: ":id",
        component: () => import("components/proposal/ProposalEditor.vue"),
      },
      {
        path: ":id/reviewers",
        component: () => import("components/proposal/ProposalReviewers.vue"),
      },
    ],
  },

  {
    path: "/applicant/proposals",
    component: () => import("components/proposal/ApplicantProposalLayout.vue"),
    children: [
      {
        path: ":id",
        component: () => import("components/proposal/ApplicantProposal.vue"),
      },
      {
        path: ":id/reviews",
        component: () => import("components/proposal/ProposalReviews.vue"),
      },
    ],
  },

  {
    path: "/proposal-reviews",
    component: () => import("components/proposal/ReviewProposalLayout.vue"),
    children: [
      {
        path: ":id",
        component: () => import("components/proposal/ReviewProposal.vue"),
      },
      {
        path: ":id/reviews",
        component: () => import("components/proposal/ProposalReviews.vue"),
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
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
