// const createSerie = import('components/CreateSerieModal.vue');
import developerMenu from "components/menus/DeveloperMenu.vue";
import developerMenu2 from "components/menus/DeveloperMenu2.vue";
import userLogout from "components/account/UserLogout.vue";
import createProposalDialog from "components/proposal/CreateProposalDialog.vue";
import problemEditor from "components/proposal/ProblemEditor.vue";
import loadingComponent from "components/utils/LoadingComponent.vue";
import messageBox from "components/utils/MessageBox.vue";
import errorMessageModal from "components/utils/ErrorMessageModal.vue";
import radioField from "components/widgets/RadioField.vue";
import optionsField from "components/widgets/OptionsField.vue";
import tinyMCE from "components/widgets/TinyMCE.vue";
// import richTextEdit from "components/widgets/RichTextEdit.vue";
// import selectField from "components/widgets/SelectField.vue";

const components = {
  "developer-menu": developerMenu,
  "developer-menu-2": developerMenu2,
  "user-logout": userLogout,
  "create-proposal-dialog": createProposalDialog,
  "problem-editor": problemEditor,
  "loading-component": loadingComponent,
  "message-box": messageBox,
  "error-message-modal": errorMessageModal,
  "radio-field": radioField,
  "options-field": optionsField,
  "tiny-mce": tinyMCE,
  // "rich-text-edit": richTextEdit,
};

export default async ({ app }) => {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
};
