// const createSerie = import('components/CreateSerieModal.vue');
import developerMenu from "components/menus/DeveloperMenu.vue";
import developerMenu2 from "components/menus/DeveloperMenu2.vue";
import userMenu from "components/menus/UserMenu.vue";
import userMenu2 from "components/menus/UserMenu2.vue";
import proposalOptions from "components/proposal/ProposalOptions.vue";
import usefulDocs from "components/UsefulDocs.vue";
import tagLines from "components/TagLines.vue";
import userLogout from "components/account/UserLogout.vue";
import updateUser from "components/account/UpdateUser.vue";
import changePassword from "components/account/ChangePassword.vue";
import createProposalDialog from "components/proposal/CreateProposalDialog.vue";
import proposalFileAttachment from "components/proposal/ProposalFileAttachment.vue";
import submitProposal from "components/proposal/SubmitProposal.vue";
import acceptReview from "components/proposal/AcceptReview.vue";
import sectionEditor from "components/proposal/SectionEditor.vue";
import scoreEditor from "components/proposal/ScoreEditor.vue";
import scoreSheet from "components/proposal/ScoreSheet.vue";
import proposalScoreSheets from "components/proposal/ProposalScoreSheets.vue";
import loadingComponent from "components/utils/LoadingComponent.vue";
import messageBox from "components/utils/MessageBox.vue";
import alertMsg from "components/utils/AlertMsg.vue";
import errorMessageModal from "components/utils/ErrorMessageModal.vue";
import radioField from "components/widgets/RadioField.vue";
import optionsField from "components/widgets/OptionsField.vue";
import tinyMCE from "components/widgets/TinyMCE.vue";
// import richTextEdit from "components/widgets/RichTextEdit.vue";
// import selectField from "components/widgets/SelectField.vue";

const components = {
  "developer-menu": developerMenu,
  "developer-menu-2": developerMenu2,
  "user-menu": userMenu,
  "user-menu-2": userMenu2,
  "proposal-options": proposalOptions,
  "useful-docs": usefulDocs,
  taglines: tagLines,
  "user-logout": userLogout,
  "update-user": updateUser,
  "change-password": changePassword,
  "create-proposal-dialog": createProposalDialog,
  "proposal-file-attachment": proposalFileAttachment,
  "submit-proposal": submitProposal,
  "accept-review": acceptReview,
  "section-editor": sectionEditor,
  "score-editor": scoreEditor,
  "score-sheet": scoreSheet,
  "proposal-score-sheets": proposalScoreSheets,
  "loading-component": loadingComponent,
  "message-box": messageBox,
  "alert-msg": alertMsg,
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
