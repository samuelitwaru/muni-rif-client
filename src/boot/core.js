import { boot } from "quasar/wrappers";
import { proposalStore } from "src/stores/proposal";
import { authStore } from "stores/auth";
import { utilsStore } from "stores/utils";

console.dir(authStore().currentUser);

export default boot(({ app }) => {
  const useAuthStore = authStore();
  const useProposalStore = proposalStore();
  const useUtilsStore = utilsStore();

  const userHasGroups = (groups) => {
    var userGroups = authStore().currentUser.groups;
  };

  app.config.globalProperties.$userHasAnyGroups = (groups) => {
    var userGroups = authStore().currentUser.groups;
    return groups.some((group) => userGroups.includes(group));
  };

  app.config.globalProperties.$authStore = useAuthStore;
  app.config.globalProperties.$proposalStore = useProposalStore;
  app.config.globalProperties.$utilsStore = useUtilsStore;
});
