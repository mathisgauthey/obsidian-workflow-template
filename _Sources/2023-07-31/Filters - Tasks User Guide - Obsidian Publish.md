---
id: id-generated-by-omnivore
title: Filters - Tasks User Guide - Obsidian Publish
tags:
  - obsidian-tasks
state: ARCHIVED
date_published: 2021-05-25 01:00:00
date_saved: 2023-07-16 10:23:46
date_archived: 2023-07-16T10:05:15.231Z
---

# Filters - Tasks User Guide - Obsidian Publish

#Omnivore

[Read on Omnivore](https://omnivore.app/)
[Read Original](https://publish.obsidian.md/tasks/Queries/Filters)

## Webpage

## Filters 

## Contents 

This page is long. Here are some links to the main sections:

* [Custom Filters](https://publish.obsidian.md/tasks/Queries/Filters#Custom%20Filters)
* [Searching for dates](https://publish.obsidian.md/tasks/Queries/Filters#Searching%20for%20dates)
* [Text filters](https://publish.obsidian.md/tasks/Queries/Filters#Text%20filters)
* [Matching multiple filters](https://publish.obsidian.md/tasks/Queries/Filters#Matching%20multiple%20filters)
* [Filters for Task Statuses](https://publish.obsidian.md/tasks/Queries/Filters#Filters%20for%20Task%20Statuses)
* [Filters for Dates in Tasks](https://publish.obsidian.md/tasks/Queries/Filters#Filters%20for%20Dates%20in%20Tasks)
* [Filters for Other Task Properties](https://publish.obsidian.md/tasks/Queries/Filters#Filters%20for%20Other%20Task%20Properties)
* [Filters for File Properties](https://publish.obsidian.md/tasks/Queries/Filters#Filters%20for%20File%20Properties)
* [Appendix: Tasks 2.0.0 improvements to date filters](https://publish.obsidian.md/tasks/Queries/Filters#Appendix:%20Tasks%202.0.0%20improvements%20to%20date%20filters)

## Custom Filters 

`filter by function` was introduced in Tasks 4.2.0.

Tasks provides many built-in filtering options, but sometimes they don't quite do what is wanted by all users.

Now Tasks has a powerful mechanism for you to create your own **custom filters**, offering incredible flexibility.

There are many examples of the custom filtering instruction `filter by function` in the documentation below, with explanations, for when the instructions built in to Tasks do not satisfy your preferences.

You can find out more about this very powerful facility in [Custom Filters](https://publish.obsidian.md/tasks/Scripting/Custom+Filters).

## Searching for dates 

Tasks allows a lot of flexibility in the dates inside query blocks.

### Absolute dates 

`<date>` filters can be given with 'absolute' dates, whose preferred format is `YYYY-MM-DD`.

Absolute dates specify a **particular date in a calendar**. They represent the same day, regardless of today's date.

Examples:

* `25th May 2023`  
   * The [chrono](https://github.com/wanasit/chrono) library reads dates very flexibly, so you can use free text for absolute dates in your filters.  
   * The `YYYY-MM-DD` format is somewhat safer, though, as there is no chance of ambiguity in reading your text.

### Relative dates 

`<date>` filters can be given with `relative` dates.

Relative dates are **calculated from today's date**.

When the day changes, relative dates like `due today` are re-evaluated so that the list stays up-to-date (so long as your computer was not hibernating at midnight - see [#1289](https://github.com/obsidian-tasks-group/obsidian-tasks/issues/1289)).

Examples for inspiration:

* `yesterday`
* `today`
* `tomorrow`
* `next monday`
* `last friday`
* `14 days ago`
* `in two weeks`
* `14 October` (the current year will be used)
* `May` (1st May in the current year will be used)

Note that if it is Wednesday and you write `tuesday`, Tasks assumes you mean "yesterday", as that is the closest Tuesday. Use `next tuesday` instead if you mean "next tuesday".

### Searching date ranges 

Date range searches were introduced in Tasks 2.0.0.

Tasks allows date searches to specify a pair of dates, `<date range>`.

These searches are inclusive: the dates at either end are found by the search.

#### Absolute date ranges 

`<date range>` may be specified as 2 valid dates in `YYYY-MM-DD` format.

Dates on either end are included, that is, it is an inclusive search.

* `before <date range>` will match before the earliest date of the range.
* `after <date range>` will match after the latest date of the range.

Notes:

* `in` and `on` may be omitted.
* If one of the `YYYY-MM-DD` dates is invalid, then it is ignored and the filter will behave as `<date>` not `<date range>`.
* Date range cannot be specified by 2 relative dates eg `next monday three weeks`.
* It is technically possible to specify absolute dates in words, such as `25th May 2023`.  
   * However, we do not recommend using words for specifying the two dates in ranges.  
   * This is because we have found that using two adjacent non-numeric dates can lead to ambiguity and unintended results when the [chrono](https://github.com/wanasit/chrono) library parses the dates in your `<date range>` filter.

Example absolute date ranges:

Prior to Tasks 2.0.0, the second date in absolute date ranges was ignored. See the tables in the [Appendix below](https://publish.obsidian.md/tasks/Queries/Filters#Appendix:%20Tasks%202.0.0%20improvements%20to%20date%20filters) to understand the changes in results, and whether you need to update any of your searches.

#### Relative date ranges 

Tasks supports a very specific set of relative `<date range>` values: `last|this|next week|month|quarter|year`. The pipe (`|`) character means 'or'.

Tasks will process these ranges, based on today's date, and convert them to absolute date ranges (`YYYY-MM-DD YYYY-MM-DD`) internally.

Dates on either end are included, that is, it is an inclusive search.

Notes:

* Currently all weeks are defined as [ISO 8601](https://en.wikipedia.org/wiki/ISO%5Fweek%5Fdate) weeks **starting on Monday** and **ending on Sunday**.  
   * We will provide more flexibility in a future release.  
   * We are tracking this in [issue #1751](https://github.com/obsidian-tasks-group/obsidian-tasks/issues/1751)
* Relative date ranges support only the exact keywords specified above.  
   * So, for example, `previous half of year` and `next semester` are not supported.

Example relative date ranges:

* `in this week` (from this week's Monday to Sunday inclusive)
* `after this month`
* `next quarter`
* `before next year`

Prior to Tasks 2.0.0, the interpretation of relative date ranges was confusing, and not what most users naturally expected. See the tables in the [Appendix below](https://publish.obsidian.md/tasks/Queries/Filters#Appendix:%20Tasks%202.0.0%20improvements%20to%20date%20filters) to understand the changes in results, and whether you need to update any of your searches.

#### Numbered date ranges 

There is also the ability to use numbered date ranges that are independent of the current date. These numbered date range types are supported:

* Week  
   * Format: `YYYY-Www` (`ww` is the week number, always in 2 digits)  
   * Example: `2022-W14`
* Month  
   * Format: `YYYY-mm` (`mm` is the month number, always in 2 digits)  
   * Example: `2023-10`
* Quarter  
   * Format: `YYYY-Qq` (`q` is the quarter number, always 1 digit)  
   * Example: `2021-Q4`
* Year  
   * Format: `YYYY`  
   * Example: `2023`

Numbered date ranges were introduced in Tasks 3.1.0.

## Text filters 

Filters that search for text strings have two flavours.

In the following examples, we describe the `heading` filter, but these comments apply to all the text filters.

1. `heading (includes|does not include) <search text>`  
   * It matches all tasks in a section whose heading contains the string `<search text>` at least once.  
         * That is, it is a sub-string search.  
         * So `heading includes Day Planner` will match tasks in sections `## Monday Day Planner` and `## Day Planner for typical day`.  
   * It ignores capitalization. Searches are case-insensitive.  
         * So `heading includes Day Planner` will match tasks in sections `## Day Planner` and `## DAY PLANNER`.  
   * Any quote characters (`'` and `"`) are included in the search text.  
         * So `heading includes "Day Planner"` will match a section`## "Day Planner"`.  
         * But will not match tasks with headings like `## Day Planner`.
2. `heading (regex matches|regex does not match) /<JavaScript-style Regex>/`  
   * Does regular expression match (case-sensitive by default).  
   * Regular expression (or ‘regex’) searching is a powerful but advanced feature.  
   * It requires thorough knowledge in order to use successfully, and not miss intended search results.  
   * It is easy to write a regular expression that looks correct, but which has a special character with a non-obvious meaning.  
   * Essential reading: [Regular Expression Searches](https://publish.obsidian.md/tasks/Queries/Regular+Expressions).

## Matching multiple filters 

Boolean combinations were introduced in Tasks 1.9.0

Each line of a query has to match in order for a task to be listed. In other words, lines are considered to have an 'AND' operator between them. Within each line, you can use the boolean operators `NOT`, `AND`, `OR`, `AND NOT`, `OR NOT` and `XOR`, as long as individual filters are wrapped in parentheses:

```autohotkey
```tasks
(no due date) OR (due after 2021-04-04)
path includes GitHub
```

```tasks
due after 2021-04-04
(path includes GitHub) AND NOT (tags include #todo)
```

```

For full details of combining filters with boolean operators, see [Combining Filters](https://publish.obsidian.md/tasks/Queries/Combining+Filters).

## Filters for Task Statuses 

### Status 

* `done` \- matches tasks status types `DONE`, `CANCELLED` and `NON_TASK`
* `not done` \- matches status types with type `TODO` and `IN_PROGRESS`

Prior to Tasks 1.23.0, there was no concept of task status type, and so only the status symbol was used:

* a task with `[ ]` used to count as `not done`
* any other character than space used to count as `done`

The new behaviour is more flexible and was required to introduce support for in-progress and cancelled tasks. If the original behaviour is preferred, you can change the status types of every symbol except `space` to `DONE`. See [How to set up your custom statuses](https://publish.obsidian.md/tasks/How+To/Set+up+custom+statuses).

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by status** is now possible, using `task.isDone`.

* `filter by function task.isDone`  
   * Same as the `done` filter, but might be useful in conjunction with other expressions on the same line.
* `filter by function ! task.isDone`  
   * Same as the `not done` filter, but might be useful in conjunction with other expressions on the same line.

`task.status.type` (see [Status Type](https://publish.obsidian.md/tasks/Queries/Filters#Status%20Type)) gives more precision in custom filters than `task.isDone`.

### Status Name 

* This searches the names given to your custom statuses.
* For example, perhaps you might have named `[!]` as `Important`, and so this field would search the text `Important` for all tasks with that status symbol.
* `status.name (includes|does not include) <string>`  
   * Matches case-insensitive (disregards capitalization).
* `status.name (regex matches|regex does not match) /<JavaScript-style Regex>/`  
   * Does regular expression match (case-sensitive by default).  
   * Essential reading: [Regular Expression Searches](https://publish.obsidian.md/tasks/Queries/Regular+Expressions).

`status.name` text searching was introduced in Tasks 1.23.0.

For more information, including adding your own customised statuses, see [Statuses](https://publish.obsidian.md/tasks/Getting+Started/Statuses).

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by status names** is now possible, using `task.status.name`.

* `filter by function task.status.name === 'Unknown'`  
   * Find all tasks with custom statuses not yet added to the Tasks settings.

### Status Type 

* `status.type (is|is not) (TODO|DONE|IN_PROGRESS|CANCELLED|NON_TASK)`  
   * The values `TODO` etc are case-insensitive: you can use `in_progress`, for example
* This searches the types you have given to your custom statuses.
* This search is efficient if you wish to find all tasks that are `IN_PROGRESS`, and you have set up your statuses to have `[/]`, `[d]` and perhaps several others all treated as `IN_PROGRESS`.
* To search for multiple possible status types:  
   * To exclude multiple values, you can use multiple `status.type is not` lines.  
   * To allow multiple values, use a boolean combination, for example: `( status.type is TODO ) OR ( status.type is IN_PROGRESS )`.  
   * Or see the 'custom filtering' examples below.

`status.type` text searching was introduced in Tasks 1.23.0.

For more information, including adding your own customised statuses, see [Statuses](https://publish.obsidian.md/tasks/Getting+Started/Statuses).

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by status type** is now possible, using `task.status.type`.

* `filter by function task.status.type === 'NON_TASK'`  
   * Find tasks of type `NON_TASK`.
* `filter by function 'TODO,IN_PROGRESS'.includes(task.status.type)`  
   * Find tasks that are either type `TODO` or type `IN_PROGRESS`.  
   * This can be more convenient than doing Boolean `OR` searches.
* `filter by function ! 'NON_TASK,CANCELLED'.includes(task.status.type)`  
   * Find tasks that are not type `NON_TASK` and not type `CANCELLED`.

### Status Symbol 

There is no built-in instruction to filter by status symbols.

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by status symbol** is now possible, using `task.status.symbol`.

* `filter by function task.status.symbol === '-'`  
   * Find tasks with a checkbox `[-]`, which is conventionally used to mean "cancelled".
* `filter by function task.status.symbol !== ' '`  
   * Find tasks with anything but the space character as their status symbol, that is, without the checkbox `[ ]`.
* `filter by function task.status.symbol === 'P' || task.status.symbol === 'C' || task.status.symbol === 'Q' || task.status.symbol === 'A'`  
   * Find tasks with status symbol `P`, `C`, `Q` or `A`.  
   * This can get quite verbose, the more symbols you want to search for.
* `filter by function 'PCQA'.includes(task.status.symbol)`  
   * Find tasks with status symbol `P`, `C`, `Q` or `A`.  
   * This is a convenient shortcut over a longer statement testing each allowed value independently.
* `filter by function !' -x/'.includes(task.status.symbol)`  
   * Find tasks with any status symbol not supported by Tasks in the default settings.

### Next Status Symbol 

There is no built-in instruction to filter by next status symbols.

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by next status symbol** is now possible, using `task.status.nextSymbol`.

* `filter by function task.status.symbol === task.status.nextSymbol`  
   * Find tasks that toggle to themselves, because the next symbol is the same as the current symbol.

### Status Examples 

Find any tasks that have status symbols you have not yet added to your Tasks settings:

```routeros
```tasks
status.name includes unknown
group by path
```

```

## Filters for Dates in Tasks 

### Due Date 

* `no due date`
* `has due date`
* `due (before|after|on) <date>`
* `due (before|after|in) <date range>`  
   * `YYYY-MM-DD YYYY-MM-DD`  
   * `(last|this|next) (week|month|quarter|year)`  
   * `(YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)`
* `due date is invalid`

For more information, see [Due date](https://publish.obsidian.md/tasks/Getting+Started/Dates#Due%20date).

* `has due date` was introduced in Tasks 1.6.0.
* `due date is invalid` was introduced in Tasks 1.16.0.
* `due (before|after|in) <date range>` searches were introduced in Tasks 2.0.0.
* `due (before|after|in) (YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)` searches were introduced in Tasks 3.1.0.

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by due date** is now possible, using `task.due`.

These examples all use `task.due` property, which is a `TasksDate` object. You can see the current [TasksDate source code](https://github.com/obsidian-tasks-group/obsidian-tasks/blob/main/src/Scripting/TasksDate.ts), to explore its capabilities.

* `filter by function task.due.format('dddd') === 'Tuesday'`  
   * Find tasks due on Tuesdays, that is, any Tuesday.  
   * On non-English systems, you may need to supply the day of the week in the local language.

For users who are comfortable with JavaScript, these more complicated examples may also be of interest:

* `filter by function task.due.moment?.isSameOrBefore(moment(), 'day') || false`  
   * Find all tasks due today or earlier.  
   * `moment()` returns the current date and time, which we need to convert to the start of the day.  
   * As the second parameter determines the precision, and not just a single value to check, using 'day' will check for year, month and day.  
   * See the documentation of [isSameOrBefore](https://momentjscom.readthedocs.io/en/latest/moment/05-query/04-is-same-or-before/).
* `filter by function task.due.moment?.isSameOrAfter(moment(), 'day') || false`  
   * Due today or later.
* `filter by function task.due.moment?.isSame(moment('2023-05-31'), 'day') || false`  
   * Find all tasks due on 31 May 2023.
* `filter by function task.due.moment?.isSame(moment('2023-05-31'), 'week') || false`  
   * Find all tasks due in the week of 31 May 2023.

### Done Date 

* `no done date`
* `has done date`
* `done (before|after|on) <date>`
* `done (before|after|in) <date range>`  
   * `YYYY-MM-DD YYYY-MM-DD`  
   * `(last|this|next) (week|month|quarter|year)`  
   * `(YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)`
* `done date is invalid`

* `no done date` and `has done date` were introduced in Tasks 1.7.0.
* `done date is invalid` was introduced in Tasks 1.16.0.
* `done (before|after|in) <date range>` searches were introduced in Tasks 2.0.0.
* `done (before|after|in) (YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)` searches were introduced in Tasks 3.1.0.

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by done date** is now possible, using `task.done`.

* `filter by function task.done.format('dddd') === 'Thursday'`  
   * Find tasks done on Thursdays, that is, any Thursday.  
   * On non-English systems, you may need to supply the day of the week in the local language.

### Scheduled Date 

* `no scheduled date`
* `has scheduled date`
* `scheduled (before|after|on) <date>`
* `scheduled (before|after|in) <date range>`  
   * `YYYY-MM-DD YYYY-MM-DD`  
   * `(last|this|next) (week|month|quarter|year)`  
   * `(YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)`
* `scheduled date is invalid`

* `has scheduled date` was introduced in Tasks 1.6.0.
* `scheduled date is invalid` was introduced in Tasks 1.16.0.
* `scheduled (before|after|in) <date range>` searches were introduced in Tasks 2.0.0.
* `scheduled (before|after|in) (YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)` searches were introduced in Tasks 3.1.0.

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by scheduled date** is now possible, using `task.scheduled`.

* `filter by function task.scheduled.format('dddd') === 'Wednesday'`  
   * Find tasks scheduled on Wednesdays, that is, any Wednesday.  
   * On non-English systems, you may need to supply the day of the week in the local language.

### Start Date 

* `no start date`
* `has start date`
* `starts (before|after|on) <date>`
* `starts (before|after|in) <date range>`  
   * `YYYY-MM-DD YYYY-MM-DD`  
   * `(last|this|next) (week|month|quarter|year)`  
   * `(YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)`
* `start date is invalid`

* `has start date` was Introduced in Tasks 1.6.0.
* `start date is invalid` was introduced in Tasks 1.16.0.
* `starts (before|after|in) <date range>` searches were introduced in Tasks 2.0.0.
* `starts (before|after|in) (YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)` searches were introduced in Tasks 3.1.0.

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by start date** is now possible, using `task.start`.

* `filter by function task.start.format('dddd') === 'Sunday'`  
   * Find tasks starting on Sundays, that is, any Sunday.  
   * On non-English systems, you may need to supply the day of the week in the local language.

#### Making Start Date only find tasks with Start 

When filtering queries by [start date](https://publish.obsidian.md/tasks/Getting+Started/Dates#Start%20date), the result will include tasks without a start date. This way, you can use the start date as a filter to filter out any tasks that you cannot yet work on.

Such filter could be:

```vala
```tasks
# Find tasks which:
#    EITHER start before today or earlier
#    OR     have no start date:
starts before tomorrow
```

```

To find tasks which really do start before tomorrow:

```autohotkey
```tasks
# Find tasks which start today or earlier:
( (starts before tomorrow) AND (has start date) )
```

```

See [created date](https://publish.obsidian.md/tasks/Getting+Started/Dates#Created%20date) for how to make Tasks record the created date on any task lines that it creates.

* `no created date`
* `has created date`
* `created (before|after|on) <date>`
* `created (before|after|in) <date range>`  
   * `YYYY-MM-DD YYYY-MM-DD`  
   * `(last|this|next) (week|month|quarter|year)`  
   * `(YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)`
* `created date is invalid`

Such a filter could be:

```autohotkey
```tasks
created before tomorrow
```

```

* Created date was introduced in Tasks 2.0.0.
* `created (before|after|in) (YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)` searches were introduced in Tasks 3.1.0.

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by created date** is now possible, using `task.created`.

* `filter by function task.created.format('dddd') === 'Monday'`  
   * Find tasks created on Mondays, that is, any Monday.  
   * On non-English systems, you may need to supply the day of the week in the local language.

### Happens 

* `happens (before|after|on) <date>`
* `happens (before|after|in) <date range>`  
   * `YYYY-MM-DD YYYY-MM-DD`  
   * `(last|this|next) (week|month|quarter|year)`  
   * `(YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)`

`happens` returns any task for a matching start date, scheduled date, _or_ due date. For example, `happens before tomorrow` will return all tasks that are starting, scheduled, or due earlier than tomorrow. If a task starts today and is due in a week from today, `happens before tomorrow` will match, because the tasks starts before tomorrow. Only one of the dates needs to match.

* `no happens date`  
   * Return tasks where _none_ of start date, scheduled date, and due date are set.
* `has happens date`  
   * Return tasks where _any_ of start date, scheduled date, _or_ due date are set.

* `no happens date` and `has happens date` were introduced in Tasks 1.7.0.
* `happens (before|after|in) <date range>` searches were introduced in Tasks 2.0.0.
* `happens (before|after|in) (YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)` searches were introduced in Tasks 3.1.0.

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by happens date** is now possible, using `task.happens`.

* `filter by function task.happens.format('dddd') === 'Friday'`  
   * Find tasks happens on Fridays, that is, any Friday.  
   * On non-English systems, you may need to supply the day of the week in the local language.

### Troubleshooting date searches 

If your date searches are giving unexpected results, add an [explain](https://publish.obsidian.md/tasks/Queries/Explaining+Queries) line to your query.

This will help you identify common mistakes such as:

* Accidentally using an invalid absolute date in a filter.
* Using unsupported keywords in relative date ranges.

If relative dates in queries do not update from the previous day, and your computer was sleeping at midnight, this is likely caused by a known Chrome bug and you will need to re-open the note. See [#1289](https://github.com/obsidian-tasks-group/obsidian-tasks/issues/1289).

### Finding Tasks with Invalid Dates 

* Validation of dates was introduced in Tasks 1.16.0.
* `created date is invalid` was introduced in Tasks 2.0.0.

It is possible to accidentally use a non-existent date on a task signifier, such as `📅 2022-02-30`. February has at most 29 days.

Such tasks look like they have a date, but that date will never be found. When viewed in Reading mode, the date will be shown as `Invalid date`.

Any such mistakes can be found systematically with this search:

```pgsql
```tasks
(created date is invalid) OR (done date is invalid) OR (due date is invalid) OR (scheduled date is invalid) OR (start date is invalid)
```

```

If the above search finds any tasks with invalid dates, they are best fixed by clicking on the [backlink](https://publish.obsidian.md/tasks/Queries/Backlinks) to navigate to the incorrect line, and fixing it by directly typing in the new date.

If you use the 'Create or edit Task' Modal, it will discard the broken date, and there will be no information about the original, incorrect value.

## Filters for Other Task Properties 

As well as the date-related searches above, these filters search other properties in individual tasks.

### Description 

* `description (includes|does not include) <string>`  
   * Matches case-insensitive (disregards capitalization).  
   * Disregards the global filter when matching.
* `description (regex matches|regex does not match) /<JavaScript-style Regex>/`  
   * Does regular expression match (case-sensitive by default).  
   * Essential reading: [Regular Expression Searches](https://publish.obsidian.md/tasks/Queries/Regular+Expressions).

`regex matches` and `regex does not match` were introduced in Tasks 1.12.0.

For precise searches, it may help to know that `description`:

* first removes all each task's signifier emojis and their values,
* then removes any global filter,
* then removes an trailing spaces
* and then searches the remaining text

For example:

| Global Filter    | Task line                                                                | Text searched by description   |
| ---------------- | ------------------------------------------------------------------------ | ------------------------------ |
| No global filter | '- \[ \] Do stuff ⏫ #tag1 ✅ 2022\-08\-12 #tag2/sub-tag '                 | 'Do stuff #tag1 #tag2/sub-tag' |
| #task            | '- \[ \] #task Do stuff ⏫ #tag1 ✅ 2022\-08\-12 #tag2/sub-tag '           | 'Do stuff #tag1 #tag2/sub-tag' |
| global\-filter   | '- \[ \] global\-filter Do stuff ⏫ #tag1 ✅ 2022\-08\-12 #tag2/sub\-tag ' | 'Do stuff #tag1 #tag2/sub-tag' |

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by description** is now possible, using `task.description`.

* `filter by function task.description.length > 100`  
   * Find tasks with long descriptions.

### Description without tags 

Since Tasks 4.2.0, it is possible to remove tags from the descriptions in custom filters, for use in **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters)**, using `task.descriptionWithoutTags`.

### Priority 

* `priority is (above|below|not)? (lowest|low|none|medium|high|highest)`

The available priorities are (from high to low):

1. 🔺 for highest priority
2. ⏫ for high priority
3. 🔼 for medium priority
4. use no signifier to indicate no priority (searched for with 'none')
5. 🔽 for low priority
6. ⏬️ for lowest priority

Priorities 'lowest' and 'highest' were introduced in Tasks 3.9.0.

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by priority name and number** is now possible, using `task.priorityName` and `task.priorityNumber`.

Using the priority name:

* `filter by function task.priorityName !== 'Normal'`  
   * The same as `priority is not none`.

Using the priority number:

* `filter by function task.priorityNumber % 2 === 0`  
   * Filter using the task's priority number, where Highest is 0 and Lowest is 5.  
   * This artificial example finds all the tasks with even priority numbers, so Highest, Medium and Low priorities.

#### Examples 

```autohotkey
```tasks
not done
priority is above none
```

```tasks
priority is high
```

```tasks
not done
priority is not none
```

```

### Urgency 

There is no built-in instruction to filter by urgency.

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by urgency** is now possible, using `task.urgency`.

Please read the following examples carefully. To use `task.urgency` with `filter by function` successfully, it is important to understand how to handle searches for non-integer numbers.

* `filter by function task.urgency > 8.9999`  
   * Find tasks with an urgency score above `9.0`.  
   * Note that limiting value used is `8.9999`.  
   * Searches that compare two urgency values for 'less than' or 'more than' (using one of `>`, `>=`, `<` or `<=`) **must adjust their values slightly to allow for rounding**.
* `filter by function task.urgency > 7.9999 && task.urgency < 11.0001`  
   * Find tasks with an urgency score between `8.0` and `11.0`, inclusive.
* `filter by function task.urgency.toFixed(2) === 1.95.toFixed(2)`  
   * Find tasks with the [default urgency](https://publish.obsidian.md/tasks/Advanced/Urgency#Why%20do%20all%20my%20tasks%20have%20urgency%20score%201.95?) of `1.95`.  
   * This is the correct way to do an equality or inequality search for any numeric values.  
   * The `.toFixed(2)` on both sides of the `===` ensures that two numbers being compared are both rounded to the same number of decimal places (2).  
   * This is important, to prevent being tripped up `10.29` being not exactly the same when comparing non-integer numbers.
* `filter by function task.urgency.toFixed(2) !== 1.95.toFixed(2)`  
   * Find tasks with any urgency other than the default score of `1.95`.
* `filter by function task.urgency === 10.29`  
   * **This will not find any tasks**.  
   * Do not use raw numbers in searches for equality or inequality of any numbers, either seemingly integer or floating point ones.  
   * From using `group by urgency` and reviewing the headings, we might conclude that tasks with the following values have urgency `10.19`:  
         * due tomorrow,  
         * have no priority symbol.  
   * From this, it might be natural to presume that we can search for `task.urgency === 10.29`.  
   * However, our function is checking the following values for equality:  
         * `task.urgency` is approximately:  
         * `10.29` is approximately:  
   * These values are **not exactly equal**, so the test fails to find any matching tasks.

### Recurrence 

* `is recurring`
* `is not recurring`
* `recurrence (includes|does not include) <part of recurrence rule>`  
   * Matches case-insensitive (disregards capitalization).  
   * Note that the text searched is generated programmatically and standardised, and so may not exactly match the text in any manually typed tasks. For example, a task with `🔁 every Sunday` will be searched as `every week on Sunday`.  
   * The easiest way to see the standardised recurrence rule of your tasks is to use `group by recurrence`, and review the resulting group headings.
* `recurrence (regex matches|regex does not match) /<JavaScript-style Regex>/`  
   * Does regular expression match (case-sensitive by default).  
   * Essential reading: [Regular Expression Searches](https://publish.obsidian.md/tasks/Queries/Regular+Expressions).

`recurrence` text searching was introduced in Tasks 1.22.0.

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by recurrence** is now possible, using `task.isRecurring` and `task.recurrenceRule`.

Using `task.isRecurring`:

* `filter by function task.isRecurring`  
   * This is identical to `is recurring`.  
   * It can be used with `&&` (Boolean AND) or `||` (Boolean OR) in conjunction with other conditions.
* `filter by function !task.isRecurring`  
   * This is identical to `is not recurring`.  
   * It can be used with `&&` (Boolean AND) or `||` (Boolean OR) in conjunction with other conditions.
* `filter by function (!task.isRecurring) && task.originalMarkdown.includes('🔁')`  
   * Find tasks that have a **broken/invalid recurrence rule**.  
   * This assumes use of the Tasks emoji format, and should of course be updated if using another format.  
   * This uses knowledge of an implementation detail of Tasks, which is that recurrence rules are read and removed from the description even if they are invalid.  
   * So we have to search for the recurrence marker in `task.originalMarkdown` to see whether the original task contained the recurrence signifier when `task.isRecurring` even though false.

* `filter by function task.recurrenceRule.includes("every week")`  
   * Similar to `recurrence includes every week`, but case-sensitive.
* `filter by function !task.recurrenceRule.includes("every week")`  
   * Similar to `recurrence does not include every week`, but case-sensitive.
* `filter by function task.recurrenceRule.includes("every week") && task.recurrenceRule.includes("when done")`  
   * Find tasks that are due every week, and **do** contain `when done` in their recurrence rule.
* `filter by function task.recurrenceRule.includes("every week") && !task.recurrenceRule.includes("when done")`  
   * Find tasks that are due every week, and do **not** contain `when done` in their recurrence rule.

### Sub-Items 

* `exclude sub-items`  
   * When this is set, the result list will only include tasks that are not indented in their file. It will only show tasks that are top level list items in their list.

### Tags 

Introduced in Tasks 1.6.0.

* `no tags`
* `has tags`
* `tags (include|do not include) <tag>` _or_
* `tag (includes|does not include) <tag>`  
   * Matches case-insensitive (disregards capitalization).  
   * Disregards the global filter when matching.  
   * The `#` is optional on the tag so `#home` and `home` will work to match `#home`.  
   * If the `#` is given, it must be present, so searching for `#home` will match `#home` but not `#location/home`.  
   * The match is partial so `tags include foo` will match `#foo/bar` and `#foo-bar`.
* `tags (regex matches|regex does not match) /<JavaScript-style Regex>/` _or_
* `tag (regex matches|regex does not match) /<JavaScript-style Regex>/`  
   * Does regular expression match (case-sensitive by default).  
   * Essential reading: [Regular Expression Searches](https://publish.obsidian.md/tasks/Queries/Regular+Expressions).  
   * This enables tag searches that avoid sub-tags, by putting a `$` character at the end of the regular expression. See examples below.  
   * If searching for sub-tags, remember to escape the slashes in regular expressions: `\/`

* `regex matches` and `regex does not match` were introduced in Tasks 1.13.0.
* `no tags` and `has tags` were introduced in Tasks 2.0.0.

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by tags** is now possible, using `task.tags`.

* `filter by function task.tags.length === 1`  
   * Find tasks with exactly 1 tag (other than any global filter).
* `filter by function task.tags.length > 1`  
   * Find tasks with more than one tag (other than any global filter).

These are more complicated examples, which you might like to copy if you use tasks with [nested tags](https://help.obsidian.md/Editing+and+formatting/Tags#Nested+tags).

* `filter by function task.tags.find( (tag) => tag.includes('/') ) && true || false`  
   * Find all tasks that have at least one nested tag.
* `filter by function task.tags.find( (tag) => tag.split('/').length >= 3 ) && true || false`  
   * Find all tasks that have at least one doubly-nested tag, such as `#context/home/ground-floor`.  
   * This splits each tag at the `/` character, and counts as a match if there are at least 3 words.

#### Tag Query Examples 

* `tags include #todo`
* `tags do not include #todo`
* `tag regex matches /#t$/`  
   * Searches for a single-character tag `#t`, with no sub-tags, because `$` matches the end of the tag text.
* `tag regex matches /#book$/i`  
   * The trailing `i` means case-insensitive.  
   * Searches for tags such as `#book`, `#Book`, `#BOOK` and the `$` prevents matching of `#books`, `#book/literature`, etc.

### Original Markdown 

There is no built-in instruction to filter by the original markdown line.

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by original markdown line** is now possible, using `task.originalMarkdown`.

For example, this could be used to extract information from `task.originalMarkdown` that Tasks does not parse, to use for filtering tasks.

## Filters for File Properties 

These filters allow searching for tasks in particular files and sections of files.

### File Path 

Note that the path includes the `.md` extension.

* `path (includes|does not include) <path>`  
   * Matches case-insensitive (disregards capitalization).
* `path (regex matches|regex does not match) /<JavaScript-style Regex>/`  
   * Does regular expression match (case-sensitive by default).  
   * Essential reading: [Regular Expression Searches](https://publish.obsidian.md/tasks/Queries/Regular+Expressions).

`regex matches` and `regex does not match` were introduced in Tasks 1.12.0.

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by file path** is now possible, using `task.file.path`.

* `filter by function task.file.path.includes('tasks releases/4.1.0 Release.md')`  
   * Like 'path includes', except that it is **case-sensitive**: capitalisation matters.
* `filter by function task.file.path === 'tasks releases/4.1.0 Release.md'`  
   * An exact, **case-sensitive**, equality search.  
   * Note that the file extension needs to be included too.  
   * With built-in searches, this could only be done using a regular expression, with special characters `^` and `$`, and escaping any characters with special meaning such as `/`.
* `filter by function task.file.path.toLocaleLowerCase() === 'TASKS RELEASES/4.1.0 RELEASE.MD'.toLocaleLowerCase()`  
   * An exact, **non**\-case-sensitive, equality search.  
   * By lower-casing both values, we do not have to worry about manually lower-casing them in our query.

### Root 

Introduced in Tasks 3.4.0.

The `root` is the top-level folder of the file that contains the task, that is, the first directory in the path, which will be `/` for files in the root of the vault.

* `root (includes|does not include) <root>`  
   * Matches case-insensitive (disregards capitalization).
* `root (regex matches|regex does not match) /<JavaScript-style Regex>/`  
   * Does regular expression match (case-sensitive by default).  
   * Essential reading: [Regular Expression Searches](https://publish.obsidian.md/tasks/Queries/Regular+Expressions).

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by root folder** is now possible, using `task.file.root`.

* `filter by function task.file.root === '/'`  
   * Find tasks in files in the root of the vault.  
   * Note that this is **case-sensitive**: capitalisation matters.
* `filter by function task.file.root === 'Work/'`  
   * Find tasks in files inside the folder `Work` which is in the root of the vault.  
   * Note that this is **case-sensitive**: capitalisation matters.

### Folder 

Introduced in Tasks 3.4.0.

This is the `folder` to the file that contains the task, which will be `/` for files in root of the vault.

* `folder (includes|does not include) <folder>`  
   * Matches case-insensitive (disregards capitalization).
* `folder (regex matches|regex does not match) /<JavaScript-style Regex>/`  
   * Does regular expression match (case-sensitive by default).  
   * Essential reading: [Regular Expression Searches](https://publish.obsidian.md/tasks/Queries/Regular+Expressions).

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by folder** is now possible, using `task.file.folder`.

* `filter by function task.file.folder === "Work/Projects/"`  
   * Find tasks in files in any file in the given folder **only**, and not any sub-folders.  
   * The equality test, `===`, requires that the trailing slash (`/`) be included.
* `filter by function task.file.folder.includes("Work/Projects/")`  
   * Find tasks in files in any folder **and any sub-folders**.
* `filter by function task.file.folder.includes("Work/Projects")`  
   * By leaving off the trailing slash (`/`) this would also find tasks in any file inside folders such as:  
         * `Work/Projects 2023/`  
         * `Work/Projects Top Secret/`

### File Name 

Introduced in Tasks 1.13.0.

Note that the file name includes the `.md` extension.

* `filename (includes|does not include) <filename>`  
   * Matches case-insensitive (disregards capitalization).
* `filename (regex matches|regex does not match) /<JavaScript-style Regex>/`  
   * Does regular expression match (case-sensitive by default).  
   * Essential reading: [Regular Expression Searches](https://publish.obsidian.md/tasks/Queries/Regular+Expressions).

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by file name** is now possible, using `task.file.filename`.

* `filter by function task.file.filename === "4.1.0 Release.md"`  
   * Find tasks in files with the exact file name, but in any folder.  
   * The equality test, `===`, requires that the file extension `.md` be included.
* `filter by function task.file.filename.includes("4.1.0 Release")`  
   * Find tasks in files whose name contains the given text.  
   * By using `.includes()` and leaving out the file extension, this will also find files such as `14.1.0 Release.md` and `4.1.0 Release Notes.md`.

### Heading 

* `heading (includes|does not include) <string>`  
   * Whether or not the heading preceding the task includes the given string.  
   * Always tries to match the closest heading above the task, regardless of heading level.  
   * `does not include` will match a task that does not have a preceding heading in its file.  
   * Matches case-insensitive (disregards capitalization).
* `heading (regex matches|regex does not match) /<JavaScript-style Regex>/`  
   * Whether or not the heading preceding the task includes the given regular expression (case-sensitive by default).  
   * Always tries to match the closest heading above the task, regardless of heading level.  
   * `regex does not match` will match a task that does not have a preceding heading in its file.  
   * Essential reading: [Regular Expression Searches](https://publish.obsidian.md/tasks/Queries/Regular+Expressions).

`regex matches` and `regex does not match` were introduced in Tasks 1.12.0.

Since Tasks 4.2.0, **[custom filtering](https://publish.obsidian.md/tasks/Scripting/Custom+Filters) by heading** is now possible, using `task.heading`.

Heading searches can be very powerful: you can put information in headings and then write your searches to look for the information:

* either on the task,
* or if it's missing from the task, then look for it in the preceding heading.

It is like a more generalisable version of the built-in mechanism to infer [a scheduled date from a filename](https://publish.obsidian.md/tasks/Getting+Started/Use+Filename+as+Default+Date), under your own control.

* `filter by function task.due.moment?.isSame('2023-06-11', 'day') || ( !task.due.moment && task.heading?.includes('2023-06-11')) || false`  
   * Find takes that:  
         * **or** do not have a due date, and their preceding heading contains the same date as a string: .
* `filter by function task.due.moment?.isSame(moment(), 'day') || ( !task.due.moment && task.heading?.includes(moment().format('YYYY-MM-DD')) ) || false`  
   * Find takes that:  
         * **either** due on today's date,  
         * **or** do not have a due date, and their preceding heading contains today's date as a string, formatted as `YYYY-MM-DD`.
* `filter by function task.heading?.includes('#context/home') || task.tags.find( (tag) => tag === '#context/home' ) && true || false`  
   * Find takes that:  
         * **either** have a tag exactly matching `#context/home` on the task line,  
         * **or** their preceding heading contains the text `#context/home` anywhere.  
                  * For demonstration purposes, this is slightly imprecise, in that it would also match nested tasks, such as `#context/home/ground-floor`.

![Custom filters can extract dates and tags from headings](https://proxy-prod.omnivore-image-cache.app/0x0,sMcR1rvdy8QWbH9rtynHJQIjN4PGoM8l1ISAqMLY4FNU/https://publish-01.obsidian.md/access/40e62a316a834ff6f495ebf1d122cae6/images/search-headings-for-date-and-tag.png)

Custom filters can extract dates and tags from headings.

## Appendix: Tasks 2.0.0 improvements to date filters 

Tasks 2.0.0 introduced the concept of filtering for date ranges.

In all cases, this new feature improves the results of Tasks date filters.

This Appendix shows how the results of various searches have changes, to enable you to decide whether any existing searches need to be updated.

### due (before|on|in||after) absolute date: results unchanged 

| keyword                                                   | Tasks 1.25.0 and earlier                                      | Tasks 2.0.0 onwards                                           |
| --------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| **Summary**                                               | All searches behave logically, using the correct date.        | Identical behaviour to previous releases.                     |
| before                                                    | \=> due date is before2023-02-09 (Thursday 9th February 2023) | \=> due date is before2023-02-09 (Thursday 9th February 2023) |
| on                                                        | \=> due date is on2023-02-09 (Thursday 9th February 2023)     | \=> due date is on2023-02-09 (Thursday 9th February 2023)     |
| in                                                        | \=> due date is on2023-02-09 (Thursday 9th February 2023)     | \=> due date is on2023-02-09 (Thursday 9th February 2023)     |
| \=> due date is on2023-02-09 (Thursday 9th February 2023) | \=> due date is on2023-02-09 (Thursday 9th February 2023)     |                                                               |
| after                                                     | \=> due date is after2023-02-09 (Thursday 9th February 2023)  | \=> due date is after2023-02-09 (Thursday 9th February 2023)  |

### due (before|on|in||after) absolute date range: results improved 

| keyword                                                  | Tasks 1.25.0 and earlier                                                                                            | Tasks 2.0.0 onwards                                                                                                 |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Summary**                                              | The second date is ignored: only the first date is used.                                                            | The values are interpreted as a date range.after takes the end date in to account.                                  |
| before                                                   | \=> due date is before2023-02-07 (Tuesday 7th February 2023)                                                        | \=> due date is before2023-02-07 (Tuesday 7th February 2023)                                                        |
| on                                                       | \=> due date is on2023-02-07 (Tuesday 7th February 2023)                                                            | \=> due date is between2023-02-07 (Tuesday 7th February 2023) and2023-02-11 (Saturday 11th February 2023) inclusive |
| in                                                       | \=> due date is on2023-02-07 (Tuesday 7th February 2023)                                                            | \=> due date is between2023-02-07 (Tuesday 7th February 2023) and2023-02-11 (Saturday 11th February 2023) inclusive |
| \=> due date is on2023-02-07 (Tuesday 7th February 2023) | \=> due date is between2023-02-07 (Tuesday 7th February 2023) and2023-02-11 (Saturday 11th February 2023) inclusive |                                                                                                                     |
| after                                                    | \=> due date is after2023-02-07 (Tuesday 7th February 2023)                                                         | \=> due date is after2023-02-11 (Saturday 11th February 2023)                                                       |

### due (before|on|in||after) last week: results improved 

Differences in interpretation of various **[relative due date range](https://publish.obsidian.md/tasks/Queries/Filters#Relative%20date%20ranges)** filters, when run on (Friday 10th February 2023):

| keyword                                                               | Tasks 1.25.0 and earlier                                                                                                      | Tasks 2.0.0 onwards                                                                                                              |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Summary**                                                           | last week is interpreted as a single date: 7 days before the current date.                                                    | last week is interpreted as a date range:the previous Monday to Sunday.after takes the end date in to account.                   |
| before                                                                | due before last week \=> due date is before2023-02-03 (Friday 3rd February 2023)                                              | due before last week \=> due date is before2023-01-30 (Monday 30th January 2023)                                                 |
| on                                                                    | due on last week \=> due date is on2023-02-03 (Friday 3rd February 2023)                                                      | due on last week \=> due date is between2023-01-30 (Monday 30th January 2023) and2023-02-05 (Sunday 5th February 2023) inclusive |
| in                                                                    | due in last week \=> due date is on2023-02-03 (Friday 3rd February 2023)                                                      | due in last week \=> due date is between2023-01-30 (Monday 30th January 2023) and2023-02-05 (Sunday 5th February 2023) inclusive |
| due last week \=> due date is on2023-02-03 (Friday 3rd February 2023) | due last week \=> due date is between2023-01-30 (Monday 30th January 2023) and2023-02-05 (Sunday 5th February 2023) inclusive |                                                                                                                                  |
| after                                                                 | due after last week \=> due date is after2023-02-03 (Friday 3rd February 2023)                                                | due after last week \=> due date is after2023-02-05 (Sunday 5th February 2023)                                                   |

### due (before|on|in||after) this week: results improved 

Differences in interpretation of various **[relative due date range](https://publish.obsidian.md/tasks/Queries/Filters#Relative%20date%20ranges)** filters, when run on (Friday 10th February 2023):

| keyword                                                               | Tasks 1.25.0 and earlier                                                                                                       | Tasks 2.0.0 onwards                                                                                                               |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Summary**                                                           | this week is interpreted as a single date:the sunday before the current date                                                   | this week is interpreted as a date range:the Monday to Sunday containing the current day.after takes the end date in to account.  |
| before                                                                | due before this week \=> due date is before2023-02-05 (Sunday 5th February 2023)                                               | due before this week \=> due date is before2023-02-06 (Monday 6th February 2023)                                                  |
| on                                                                    | due on this week \=> due date is on2023-02-05 (Sunday 5th February 2023)                                                       | due on this week \=> due date is between2023-02-06 (Monday 6th February 2023) and2023-02-12 (Sunday 12th February 2023) inclusive |
| in                                                                    | due in this week \=> due date is on2023-02-05 (Sunday 5th February 2023)                                                       | due in this week \=> due date is between2023-02-06 (Monday 6th February 2023) and2023-02-12 (Sunday 12th February 2023) inclusive |
| due this week \=> due date is on2023-02-05 (Sunday 5th February 2023) | due this week \=> due date is between2023-02-06 (Monday 6th February 2023) and2023-02-12 (Sunday 12th February 2023) inclusive |                                                                                                                                   |
| after                                                                 | due after this week \=> due date is after2023-02-05 (Sunday 5th February 2023)                                                 | due after this week \=> due date is after2023-02-12 (Sunday 12th February 2023)                                                   |

### due (before|on|in||after) next week: results improved 

Differences in interpretation of various **[relative due date range](https://publish.obsidian.md/tasks/Queries/Filters#Relative%20date%20ranges)** filters, when run on (Friday 10th February 2023):

| keyword                                                                | Tasks 1.25.0 and earlier                                                                                                        | Tasks 2.0.0 onwards                                                                                                                |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Summary**                                                            | next week is interpreted as a single date: 7 days after the current date.                                                       | next week is interpreted as a date range:the next Monday to Sunday.after takes the end date in to account.                         |
| before                                                                 | due before next week \=> due date is before2023-02-17 (Friday 17th February 2023)                                               | due before next week \=> due date is before2023-02-13 (Monday 13th February 2023)                                                  |
| on                                                                     | due on next week \=> due date is on2023-02-17 (Friday 17th February 2023)                                                       | due on next week \=> due date is between2023-02-13 (Monday 13th February 2023) and2023-02-19 (Sunday 19th February 2023) inclusive |
| in                                                                     | due in next week \=> due date is on2023-02-17 (Friday 17th February 2023)                                                       | due in next week \=> due date is between2023-02-13 (Monday 13th February 2023) and2023-02-19 (Sunday 19th February 2023) inclusive |
| due next week \=> due date is on2023-02-17 (Friday 17th February 2023) | due next week \=> due date is between2023-02-13 (Monday 13th February 2023) and2023-02-19 (Sunday 19th February 2023) inclusive |                                                                                                                                    |
| after                                                                  | due after next week \=> due date is after2023-02-17 (Friday 17th February 2023)                                                 | due after next week \=> due date is after2023-02-19 (Sunday 19th February 2023)                                                    |

Filters