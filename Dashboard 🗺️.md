---
title: Dashboard 🗺️
date created: 2023-05-04 10:33:29
date modified: 2023-07-16 10:16:16
tags: 
aliases: 
---

# Dashboard 🗺️

> [!EXAMPLE]- Upcoming Projects (by date)
>
> ```tasks
> not done
> path includes 2-Areas
> (status.type is IN_PROGRESS) OR (has happens date)
> group by function (!task.due.moment) ? '%%4%% ==Undated==' : result = task.due.moment.isBefore(moment(), 'day') ? '%%1%% ==Overdue==' : result = task.due.moment.isSame(moment(), 'day') ? '%%2%% ==Today==' : '%%3%% ==Future=='
> group by happens
> ```

> [!EXAMPLE]- Upcoming Projects (by areas)
>
> ```tasks
> not done
> path includes 2-Areas
> (status.type is IN_PROGRESS) OR (has happens date)
> group by filename
> ```

> [!INFO]+ Unplanned Projects
>
> ```tasks
> not done
> path includes 2-Areas
> heading does not include Goals
> (status.type is TODO) AND (no happens date)
> group by filename
> ```
