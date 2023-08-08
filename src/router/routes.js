const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "test", component: () => import("pages/TestPage.vue") },
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
        path: "account/profile",
        component: () => import("components/account/UserProfile.vue"),
      },

      {
        path: "account/password",
        component: () => import("components/account/ChangePassword.vue"),
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
