---
title: <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>
date: <% moment(tp.file.creation_date()).format("YYYY-MM-DD HH:mm:ss") %>
lastmod: <% moment(tp.file.creation_date()).format("YYYY-MM-DD HH:mm:ss") %>
categories: 
tags: daily-notes
aliases: 
share: false 
---

# <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>

Hi partner, today is <% moment(tp.file.title, "YYYY-MM-DD").format("dddd") %>.

<%*
const currentMoment = moment(tp.file.title, "YYYY-MM-DD");
const hash = '# ';
const slash = ' / ';
const pipe = ' | ';
const leftAngle = '❮ ';
const rightAngle = ' ❯';
tR += leftAngle;
tR += '[[' + currentMoment.format('YYYY') + ']]' + slash;
tR += '[[' + currentMoment.format('YYYY-[Q]Q|[Q]Q') + ']]' + slash;
tR += '[[' + currentMoment.format('YYYY-MM|MMMM') + ']]' + slash;
tR += '[[' + currentMoment.format('gggg-[W]ww') + '|' + currentMoment.format('[Week] ww') + ']]';
tR += rightAngle;
tR += '\n';
tR += '\n';
tR += leftAngle;
currentMoment.add(-1,'days');
tR += '[[' + currentMoment.format('YYYY-MM-DD') + ']]' + pipe;
currentMoment.add(1,'days');
tR += currentMoment.format('YYYY-MM-DD') + pipe;
currentMoment.add(1,'days');
tR += '[[' + currentMoment.format('YYYY-MM-DD') + ']]';
currentMoment.add(-1,'days');
tR += rightAngle;
%>

[[Dashboard 🗺️]] & [[TaskBoard ✅]]

> [!EXAMPLE]- Ongoing Medias 🎮
> ![[Ongoing Medias 🎮#Ongoing Medias 🎮]]

> [!INFO]- Time left ⏱
> ![[Time Left ⏱#Time Left ⏱]]

> [!QUOTE]- Google Calendar 📅
> ![[Google Calendar Weekly View 📅#Google Calendar Weekly View 📅]]

> [!QUOTE]- Tasks Calendar ✅
> ![[Tasks Calendar Weekly View ✅#Tasks Calendar Weekly View ✅]]

> [!EXAMPLE]- Ongoing & Upcoming Projects 🎯
>
> ```tasks
> not done
> path includes 2-Areas
> (status.type is IN_PROGRESS) OR (happens in <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY") %>)
> group by function (!task.due.moment) ? '%%4%% ==Undated==' : result = task.due.moment.isBefore('<% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>', 'day') ? '%%1%% ==Overdue==' : result = task.due.moment.isSame('<% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>', 'day') ? '%%2%% ==Today==' : '%%3%% ==Future=='
> group by happens
> ```

## Notes 📝



![[0-Inbox 📥#0-Inbox 📥]]

> [!DANGER]+ Overdue
> ```tasks
> not done
> is not recurring
> path does not include 2-Areas
> happens before <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>
> group by happens
> ```

> [!CHECK]+ Do Today
> ```tasks
> not done
> is not recurring
> path does not include 2-Areas
> happens on <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>
> group by filename
> ```

> [!WARNING]+ Upcoming
> ```tasks
> not done
> is not recurring
> path does not include 2-Areas
> happens in <% moment(tp.file.title, "YYYY-MM-DD").add(1,"days").format("YYYY-MM-DD") %> <% moment(tp.file.title, "YYYY-MM-DD").add(30,"days").format("YYYY-MM-DD") %>
> group by happens
> ```

> [!IMPORTANT]- Next Actions
> ```tasks
> not done
> path does not include 2-Areas
> tags include #next
> group by function task.tags.filter( (tag) => ! tag.includes("#next") )
> ```

> [!QUESTION]- Waiting For
> ```tasks
> not done
> path does not include 2-Areas
> tags include #waiting
> group by filename
> ```

> [!BUG]- Delegated
> ```tasks
> not done
> path does not include 2-Areas
> tags include #delegated
> group by filename
> ```

> [!MISSING]- Task Log
> ```tasks
> path does not include 2-Areas
> done on <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>
> group by filename
> ```

> [! ABSTRACT]+ Workout Log 💪
> ```dataview
> LIST
> FROM "-Workout_Log"
> WHERE contains(file.name, "<% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>")
> ```

> [!TODO]+ Recurring
> ```tasks
> not done
> is recurring
> filter by function task.due.moment?.isSameOrBefore('<% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>', 'day') || false
> group by filename 
> ```

## Journal 📔

Mood::

An Interesting Title : 



Decisions I made :

- 

Positive and grateful for things :

1. 

Good and kind things I did :

1. 