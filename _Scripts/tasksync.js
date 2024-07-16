module.exports = {
  SelectFromAllTasks: SelectFromAllTasks,
  GetAllTasksFromProject: GetAllTasksFromProject,
  GetAllTasksFromSection: GetAllTasksFromSection,
};

const getTodoistPluginApi = (t) =>
  t.plugins.plugins["todoist-sync-plugin"].services.todoist.api.value;

async function SelectFromAllTasks(t) {
  const s = await getAllTasks(t);
  if (0 === s.length) return void new Notice("No tasks.");
  const e = await selectTasks(t, s);
  return await closeSelectedTasks(t.app, e), formatTasksToTasksPluginTask(e);
}
async function GetAllTasksFromProject(t) {
  const [s, e] = await Promise.all([getAllTasks(t), getProjects(t.app)]),
    a = await t.quickAddApi.suggester(
      (t) => (
        (t.tasks = s.filter((s) => s.projectID === t.id)),
        `${t.name} (${t.tasks.length})`
      ),
      e
    );
  if (a) {
    if (0 !== a.tasks.length)
      return (
        new Notice(`Added ${a.tasks.length} tasks from '${a.name}'.`),
        await closeSelectedTasks(t.app, a.tasks),
        formatTasksToTasksPluginTask(a.tasks)
      );
    new Notice(`No tasks in '${a.name}'.`);
  }
}
async function GetAllTasksFromSection(t) {
  const [s, e, a] = await Promise.all([
      getProjects(t.app),
      getSections(t.app),
      getAllTasks(t),
    ]),
    n = await t.quickAddApi.suggester((t) => {
      const e = s.find((s) => s.id === t.project_id);
      return (
        (t.tasks = a.filter((s) => s.sectionID === t.id)),
        `${e.name} > ${t.name} (${t.tasks.length})`
      );
    }, e);
  if (0 !== n.tasks.length)
    return (
      new Notice(`Added ${n.tasks.length} tasks from '${n.name}'.`),
      await closeSelectedTasks(n.tasks),
      formatTasksToTasksPluginTask(n.tasks)
    );
  new Notice(`No tasks in '${n.name}'.`);
}
async function getAllTasks(t) {
  const s = getTodoistPluginApi(t.app);
  e = await s.getTasks();
  return e;
}
async function selectTasks(t, s) {
  const e = await t.quickAddApi.checkboxPrompt(s.map((t) => t.content));
  return s.filter((t) => e.some((s) => s.contains(t.content)));
}
async function closeSelectedTasks(t, s) {
  const e = getTodoistPluginApi(t);
  s.forEach(async (t) => await e.closeTask(t.id));
}
function formatTasksToTasksPluginTask(t) {
  const todayDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  return (
    t
      .map(
        (t) =>
          (t = t.rawDatetime
            ? `- [ ] ${
                t.content
              } \u2795 ${todayDate} \ud83d\udcc5 ${t.rawDatetime.format(
                "YYYY-MM-DD"
              )}`
            : `- [ ] ${t.content} \u2795 ${todayDate}`)
      )
      .join("\n") + "\n"
  );
}
async function getTasksGroupedByProject(t) {
  const s = getTodoistPluginApi(t),
    { ok: e } = await s.getTasksGroupedByProject();
  return e;
}
async function getProjects(t) {
  const s = getTodoistPluginApi(t),
    { ok: e } = await s.getProjects();
  return e;
}
async function getSections(t) {
  const s = getTodoistPluginApi(t),
    { ok: e } = await s.getSections();
  return e;
}
