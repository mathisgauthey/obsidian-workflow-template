---
title: <% moment(tp.file.title, "YYYY-MM").format("YYYY-MM") %>
date: <% moment(tp.file.creation_date()).format("YYYY-MM-DD HH:mm:ss") %>
lastmod: <% moment(tp.file.creation_date()).format("YYYY-MM-DD HH:mm:ss") %>
categories: 
tags: monthly-notes
aliases: 
share: false 
---

# <% moment(tp.file.title, "YYYY-MM").format("YYYY-MM") %>

<%*
const currentMoment = moment(tp.file.title, "YYYY-MM");
const hash = '# ';
const slash = ' / ';
const pipe = ' | ';
const leftAngle = '❮ ';
const rightAngle = ' ❯';
tR += leftAngle;
tR += '[[' + currentMoment.format('YYYY') + ']]' + slash;
tR += '[[' + currentMoment.format('YYYY-[Q]Q|[Q]Q') + ']]' + slash;
tR += '[[' + currentMoment.format('YYYY-MM|MMMM') + ']]';
tR += rightAngle;
tR += '\n';
tR += '\n';
tR += leftAngle;
currentMoment.add(-1,'months');
tR += '[[' + currentMoment.format('YYYY-MM') + ']]' + pipe;
currentMoment.add(1,'months');
tR += currentMoment.format('YYYY-MM') + pipe;
currentMoment.add(1,'months');
tR += '[[' + currentMoment.format('YYYY-MM') + ']]';
currentMoment.add(-1,'months');
tR += rightAngle;
%>

> [!INFO]- Time left ⏱
> ![[Time Left ⏱#Time Left ⏱]]

> [!QUOTE]- Google Calendar 📅
> ![[Google Calendar Monthly View 📅#Google Calendar Monthly View 📅]]

> [!QUOTE]- Tasks Calendar ✅
> ![[Tasks Calendar Monthly View ✅#Tasks Calendar Monthly View ✅]]


## Projects 🎯

```tasks
not done
path includes 2-Areas
group by filename
sort by happens
(happens in <% moment(tp.file.title, "YYYY-MM").format("YYYY-MM") %>) OR (happens before <% moment(tp.file.title, "YYYY-MM").format("YYYY-MM") %>)
```

## Projects Graveyard 🪦

```tasks
path includes 2-Areas
group by filename
sort by done
done in <% moment(tp.file.title, "YYYY-MM").format("YYYY-MM") %>
```

## Journal 📔

An Interesting Title : 

