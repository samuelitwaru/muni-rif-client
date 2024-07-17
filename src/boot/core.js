import { boot } from "quasar/wrappers";
import { proposalStore } from "src/stores/proposal";
import { dataStore } from "src/stores/data";
import { authStore } from "stores/auth";
import { utilsStore } from "stores/utils";

console.dir(authStore().currentUser);

export default boot(({ app }) => {
  const useAuthStore = authStore();
  const useProposalStore = proposalStore();
  const useDataStore = dataStore();
  const useUtilsStore = utilsStore();

  const userHasGroups = (groups) => {
    var userGroups = authStore().currentUser.groups;
  };

  app.config.globalProperties.$userHasAnyGroups = (groups) => {
    var userGroups = authStore().currentUser.groups;
    return groups.some((group) => userGroups.includes(group));
  };

  app.config.globalProperties.$buildURLQuery = (obj) => {
    return Object.entries(obj)
      .map((pair) => {
        if (pair[1]) {
          return pair.map(encodeURIComponent).join("=");
        }
      })
      .join("&");
  };

  app.config.globalProperties.$commaSeparator = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  app.config.globalProperties.$authStore = useAuthStore;
  app.config.globalProperties.$dataStore = useDataStore;
  app.config.globalProperties.$proposalStore = useProposalStore;
  app.config.globalProperties.$utilsStore = useUtilsStore;
});
