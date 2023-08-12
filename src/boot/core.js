import { boot } from "quasar/wrappers";
import { proposalStore } from "src/stores/proposal";
import { authStore } from "stores/auth";

export default boot(({ app }) => {
  const useAuthStore = authStore();
  const useProposalStore = proposalStore();
  app.config.globalProperties.$authStore = useAuthStore;
  app.config.globalProperties.$proposalStore = useProposalStore;
});
