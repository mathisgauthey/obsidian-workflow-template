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
tR += '[[' + currentMoment.format('GGGG-[W]WW|[Week] WW') + ']]';
tR += rightAngle;
tR += '\n';
tR += '\n';
tR += leftAngle;
currentMoment.add(-1,'days');
tR += '[[' + currentMoment.format('YYYY-MM-DD|dddd Do') + ']]' + pipe;
currentMoment.add(1,'days');
tR += currentMoment.format('dddd Do') + pipe;
currentMoment.add(1,'days');
tR += '[[' + currentMoment.format('YYYY-MM-DD|dddd Do') + ']]';
currentMoment.add(-1,'days');
tR += rightAngle;
%>

## Today 🔆

> [!CHECK]+ Super Productivity ☑️
>
> ```tasks
> not done
> (happens on or before <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>) OR (status.type is IN_PROGRESS)
> (heading does not include Focus) AND (heading does not include Goals)
> group by function (!task.description.includes("[[")) ? 'Tasks' : 'Projects'
> group by function (task.happens.moment?.isBefore("<% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>", 'day')) ? 'Overdue' : 'Today'
> ```

> [!IMPORTANT]+ Short Next Actions 🏃
>
> ```tasks
> not done
> description does not include ]]
> tags include #next
> short mode
> group by function task.tags.filter( (tag) => tag.includes("#next") )
> ```

## Notes 📝



## Inbox 📥

```todoist
name: Inbox
filter: "#Inbox"
```

## Dashboard 🗺️

> [!DANGER]+ Overdue 📆
>
> ```tasks
> not done
> is not recurring
> description does not include ]]
> happens before <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>
> group by happens
> ```

> [!CHECK]+ Do Today 📅
>
> ```tasks
> not done
> is not recurring
> description does not include ]]
> happens on <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>
> group by filename
> ```

> [!WARNING]+ Upcoming 🗓️
>
> ```tasks
> not done
> is not recurring
> description does not include ]]
> happens in <% moment(tp.file.title, "YYYY-MM-DD").add(1,"days").format("YYYY-MM-DD") %> <% moment(tp.file.title, "YYYY-MM-DD").add(30,"days").format("YYYY-MM-DD") %>
> group by function task.happens.format("YYYY [Week] WW")
> group by happens
> ```

> [!TODO]+ Recurring 🔁
>
> ```tasks
> not done
> is recurring
> filter by function task.happens.moment?.isSameOrBefore('<% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>', 'day') || false
> group by filename
> ```

> [!IMPORTANT]+ Next Actions 🏃
>
> ```tasks
> not done
> description does not include ]]
> tags include #next
> group by function task.tags.filter( (tag) => ! tag.includes("#next") )
> ```

> [!EXAMPLE]+ Upcoming Projects (by date) 🎯
>
> ```tasks
> not done
> description includes ]]
> filename does not include Passions Backlog 🎮
> (heading does not include Focus) AND (heading does not include Goals)
> group by function (!task.happens.moment) ? '%%4%% *Undated*' : result = task.happens.moment.isBefore(moment(), 'day') ? '%%1%% ==Overdue==' : result = task.happens.moment.isSame(moment(), 'day') ? '%%2%% **Today**' : '%%3%% Future'
> group by function task.happens.format("YYYY > Q[ - Quarter] > MM[ - ]MMMM > [Week] WW", task.priorityNameGroupText)
> group by function task.happens.format("YYYY-MM-DD dddd")
> ```

> [!QUESTION]+ Waiting For 💤
>
> ```tasks
> not done
> description does not include ]]
> tags include #waiting
> group by filename
> ```

> [!BUG]+ Delegated 👷‍♂️
>
> ```tasks
> not done
> description does not include ]]
> tags include #delegated
> group by filename
> ```

> [!SUMMARY]+ Higher Focus 🔥 & Goals 🎯
>
> ```tasks
> not done
> (path includes -Daily-Notes) OR (path includes -Periodic-Notes)
> (heading includes Focus) AND (heading includes Goals)
> group by function '%%' + (task.heading.includes("Yearly Focus 🔥 & Goals 🎯") ? "1" : task.heading.includes("Quarterly Focus 🔥 & Goals 🎯") ? "2" : task.heading.includes("Monthly Focus 🔥 & Goals 🎯") ? "3" : task.heading.includes("Weekly Focus 🔥 & Goals 🎯") ? "4" : task.heading.includes("Daily Focus 🔥 & Goals 🎯") ? "5" : "6") + '%%' + task.heading + " > " + task.file.filenameWithoutExtension + " > " + task.tags
> ```

## Passions 🎮

> [!QUOTE]+ Ongoing Passions 🎮
>
> ```tasks
> not done
> filename includes Passions Backlog 🎮
> heading includes Doing
> group by heading
> ```

## Logs 🪵

> [!NOTE]+ Projects Created ➕
>
> ```tasks
> not done
> is not recurring
> description includes ]]
> created on <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>
> group by filename
> ```

> [!NOTE]+ Tasks Created ➕
>
> ```tasks
> not done
> is not recurring
> description does not include ]]
> created on <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>
> group by filename
> ```

> [!MISSING]+ Projects Graveyard 🪦
>
> ```tasks
> description includes ]]
> done on <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>
> group by filename
> ```

> [!MISSING]+ Tasks Log ❌
>
> ```tasks
> description does not include ]]
> done on <% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM-DD") %>
> group by filename
> ```

## Daily Focus 🔥 & Goals 🎯

## Journal 📔

Mood::

An Interesting Title :

Accomplishments | Failures | Lessons learned | Good and king things I did | Positive and grateful for :

-

<% await tp.file.move("/-Daily-Notes/" + tp.file.title) %>
