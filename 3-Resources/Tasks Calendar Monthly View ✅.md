---
title: Tasks Calendar ✅
date created: 2023-07-16 13:57:43
date modified: 2023-07-16 13:57:46
tags: 
aliases: 
---

# Tasks Calendar Monthly View ✅

```dataviewjs
await dv.view("tasksCalendar", {pages: "dv.pages().file.tasks.where(f => f.folder != '_Sources' && f.folder != '-Workout_Log' && f.folder != '2-Areas' && f.folder != '4-Archives').where(t => !t.text.includes('🔁'))", view: "month", firstDayOfWeek: "1", options: "style8", dailyNoteFolder: "-Daily-Notes"})
```
