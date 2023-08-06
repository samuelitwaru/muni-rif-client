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
        path: "account",
        component: () => import("components/account/UserAccount.vue"),
        children: [
          {
            path: "signup",
            component: () => import("components/account/UserSignup.vue"),
          },
          {
            path: "signin",
            component: () => import("components/account/UserSignin.vue"),
          },
          {
            path: "password-reset",
            component: () => import("components/account/PasswordReset.vue"),
          },
        ],
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
