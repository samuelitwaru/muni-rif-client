import { boot } from "quasar/wrappers";
import { proposalStore } from "src/stores/proposal";
import { authStore } from "stores/auth";
import { utilsStore } from "stores/utils";

export default boot(({ app }) => {
  const useAuthStore = authStore();
  const useProposalStore = proposalStore();
  const useUtilsStore = utilsStore();
  app.config.globalProperties.$authStore = useAuthStore;
  app.config.globalProperties.$proposalStore = useProposalStore;
  app.config.globalProperties.$utilsStore = useUtilsStore;
});
