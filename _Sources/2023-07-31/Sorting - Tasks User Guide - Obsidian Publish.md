---
id: id-generated-by-omnivore
title: Sorting - Tasks User Guide - Obsidian Publish
tags:
  - obsidian-tasks
state: ARCHIVED
date_saved: 2023-07-16 10:23:47
date_archived: 2023-07-16T10:05:13.986Z
---

# Sorting - Tasks User Guide - Obsidian Publish

#Omnivore

[Read on Omnivore](https://omnivore.app/)
[Read Original](https://publish.obsidian.md/tasks/Queries/Sorting)

## Webpage

## Sorting 

## Contents 

This page is long. Here are some links to the main sections:

* [Basics](https://publish.obsidian.md/tasks/Queries/Sorting#Basics)
* [Sort by Task Statuses](https://publish.obsidian.md/tasks/Queries/Sorting#Sort%20by%20Task%20Statuses)
* [Sort by Dates in Tasks](https://publish.obsidian.md/tasks/Queries/Sorting#Sort%20by%20Dates%20in%20Tasks)
* [Sort by Other Task Properties](https://publish.obsidian.md/tasks/Queries/Sorting#Sort%20by%20Other%20Task%20Properties)
* [Sort by File Properties](https://publish.obsidian.md/tasks/Queries/Sorting#Sort%20by%20File%20Properties)
* [Multiple sort criteria](https://publish.obsidian.md/tasks/Queries/Sorting#Multiple%20sort%20criteria)
* [Notes](https://publish.obsidian.md/tasks/Queries/Sorting#Notes)
* [Reverse sorting](https://publish.obsidian.md/tasks/Queries/Sorting#Reverse%20sorting)
* [Examples](https://publish.obsidian.md/tasks/Queries/Sorting#Examples)

## Basics 

To sort the results of a query different from the default, you must add at least one `sort by` line to the query.

## Sort by Task Statuses 

For more information, including adding your own customised statuses, see [Statuses](https://publish.obsidian.md/tasks/Getting+Started/Statuses).

### Status 

* `sort by status` (done or todo)

### Status Name 

* `sort by status.name` (Done, Todo, Cancelled, In Progress, Unknown, My very important custom status, etc - sorted alphabetically)

`sort by status.name` was introduced in Tasks 1.23.0.

### Status Type 

* `sort by status.type` (Sorted in the order `IN_PROGRESS`, `TODO`, `DONE`, `CANCELLED` then `NON_TASK`)

`sort by status.type` was introduced in Tasks 1.23.0.

## Sort by Dates in Tasks 

### Done Date 

* `sort by done` (the date when the task was done)

### Due Date 

* `sort by due` (the date when the task is due)

### Scheduled Date 

* `sort by scheduled` (the date when the task is scheduled)

### Start Date 

* `sort by start` (the date when the task starts)

* `sort by created` (the date when the task was created)

`sort by created` was introduced in Tasks 2.0.0.

### Happens 

* `sort by happens` (the earliest of start date, scheduled date, and due date)

`sort by happens` was introduced in Tasks 1.21.0.

## Sort by Other Task Properties 

### Description 

* `sort by description` (the description of the task)

### Priority 

* `sort by priority` (priority of the task; "low" is below "none": [priorities](https://publish.obsidian.md/tasks/Getting+Started/Priority))

### Urgency 

* `sort by urgency` ([urgency](https://publish.obsidian.md/tasks/Advanced/Urgency))

### Recurrence 

* `sort by recurring` (recurring tasks sort before non-recurring ones: [Recurring Tasks](https://publish.obsidian.md/tasks/Getting+Started/Recurring+Tasks))

### Tags 

* `sort by tag` (the description of the task)

If you want to sort by tags, by default it will sort by the first tag found in the description. If you want to sort by a tag that comes after that then you can specify the index at the end of the query. All tasks should have the same amount of tags for optimal sorting and the tags in the same order. The index starts from 1 which is also the default.

For example this query will sort by the second tag found in the description.

```autohotkey
```tasks
sort by tag 2
```

```

Tag sorting was introduced in Tasks 1.6.0.

## Sort by File Properties 

### File Path 

* `sort by path` (the path to the file that contains the task)

### Root 

It is not currently possible to sort by the top-level folder that contains the task.

### Folder 

It is not currently possible to sort by the folder that contains the task.

### File Name 

* `sort by filename` (the filename of the file that contains the task, with its extension)  
   * Note that tasks from different notes with the same file name will be sorter.

`sort by filename` was introduced in Tasks 1.21.0.

### Heading 

* `sort by sort by heading` (the heading preceding the task; files with empty headings sort before other tasks)

`sort by heading` was introduced in Tasks 1.21.0.

## Multiple sort criteria 

You can add multiple `sort by` query options, each on an extra line. The first sort has the highest priority. Each subsequent `sort` will sort within the existing sorting.

## Notes 

If you want tasks to be sorted the way they were sorted before urgency was introduced, add the following `sort` expressions to your queries:

```xquery
```tasks
sort by status
sort by due
sort by path
```

```

Sorting by description should take into account `[[Links]]` and `[Links with an|Alias]` (note pipe). It should also take into account `*italics*` and `==highlights==`. It sorts by the text that's visible in preview mode.

## Reverse sorting 

After the name of the property that you want to sort by, you can add the `reverse` keyword. If given, the sort order will be reverse for that property.

Note that `reverse` will reverse the entire result set. For example, when you `sort by done reverse` and your query results contain tasks that do not have a done date, then those tasks without a done date will be listed first.

## Examples 

```xquery
```tasks
not done
due today
sort by due
```

```tasks
done
sort by done reverse
```

```tasks
not done
due before next monday
sort by status
sort by description reverse
sort by path
```

```

Sorting