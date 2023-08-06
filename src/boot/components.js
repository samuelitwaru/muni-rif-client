// const createSerie = import('components/CreateSerieModal.vue');
import developerMenu from "components/menus/DeveloperMenu.vue";
import developerMenu2 from "components/menus/DeveloperMenu2.vue";
import radioField from "components/widgets/RadioField.vue";
import optionsField from "components/widgets/OptionsField.vue";
import tinyMCE from "components/widgets/TinyMCE.vue";
// import richTextEdit from "components/widgets/RichTextEdit.vue";
// import selectField from "components/widgets/SelectField.vue";

const components = {
  "developer-menu": developerMenu,
  "developer-menu-2": developerMenu2,
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
