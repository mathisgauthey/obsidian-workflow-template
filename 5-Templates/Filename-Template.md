<%*
let templater = app.plugins.plugins["templater-obsidian"];
let templateFolder = templater.settings.templates_folder;

/**
 * format:   momentjs format strings for filename
 * template: name of template
 *
 * If the file name matches the format, respective
 * template will be inserted.
 */
let noteTypes = [
  { format: "YYYY-MM-DD", template: "Daily-Notes.md" },
  { format: "GGGG-[W]WW", template: "Weekly-Notes.md" },
  { format: "YYYY-MM", template: "Monthly-Notes.md" },
  { format: "YYYY-[Q]Q", template: "Quarterly-Notes.md" },
  { format: "YYYY", template: "Yearly-Notes.md" },
  { format: "2-Areas", template: "Areas.md" },
  { format: "0-Inbox", template: "Untitled.md" },
];

for (const noteType of noteTypes) {
  // If found a matching note title
  if (moment(tp.file.title, noteType.format, true).isValid()) {
    // Get TFile of template
    let templateTFile;
    try {
      // Get TFile
      templateTFile = app.vault.getAbstractFileByPath(
        `${templateFolder}/${noteType.template}`
      );

      // Error handling
      if (!templateTFile) {
        let msg =
          "Template not found\n" +
          `${templateFolder}/${noteType.template} does not exist.`;
        new Notice(msg);
        throw Error(msg);
      }
    } catch (e) {
      console.error(e);
      return;
    }

    // Insert template
    templater.templater.append_template_to_active_file(templateTFile);
    break; // Task completed, leaving the loop
  }

  // If found a matching note title
  else if (tp.file.folder(true) == noteType.format) {
    // Get TFile of template
    let templateTFile;
    try {
      // Get TFile
      templateTFile = app.vault.getAbstractFileByPath(
        `${templateFolder}/${noteType.template}`
      );

      // Error handling
      if (!templateTFile) {
        let msg =
          "Template not found\n" +
          `${templateFolder}/${noteType.template} does not exist.`;
        new Notice(msg);
        throw Error(msg);
      }
    } catch (e) {
      console.error(e);
      return;
    }

    // Insert template
    templater.templater.append_template_to_active_file(templateTFile);
    break; // Task completed, leaving the loop
  }
}
%>