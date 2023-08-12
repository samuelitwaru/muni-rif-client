import { boot } from "quasar/wrappers";
import { authStore } from "stores/auth";

export default boot(({ app }) => {
  const useAuthStore = authStore();
  app.config.globalProperties.$authStore = useAuthStore;
});
