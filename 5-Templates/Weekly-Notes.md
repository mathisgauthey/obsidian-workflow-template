---
title: <% moment(tp.file.title, "gggg-[W]ww").format("gggg-[W]ww") %>
date: <% moment(tp.file.creation_date()).format("YYYY-MM-DD HH:mm:ss") %>
lastmod: <% moment(tp.file.creation_date()).format("YYYY-MM-DD HH:mm:ss") %>
categories: 
tags: weekly-notes
aliases: 
share: false 
---

# <% moment(tp.file.title, "gggg-[W]ww").format("gggg-[W]ww") %>

<%*
const currentMoment = moment(tp.file.title, "gggg-[W]ww");
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
currentMoment.add(-1,'weeks');
tR += '[[' + currentMoment.format('gggg-[W]ww') + ']]' + pipe;
currentMoment.add(1,'weeks');
tR += currentMoment.format('gggg-[W]ww') + pipe;
currentMoment.add(1,'weeks');
tR += '[[' + currentMoment.format('gggg-[W]ww') + ']]';
currentMoment.add(-1,'weeks');
tR += rightAngle;
%>

> [!INFO]- Time left ⏱
> ![[Time Left ⏱#Time Left ⏱]]

> [!QUOTE]- Google Calendar 📅
> ![[Google Calendar Weekly View 📅#Google Calendar Weekly View 📅]]

> [!QUOTE]- Tasks Calendar ✅
> ![[Tasks Calendar Weekly View ✅#Tasks Calendar Weekly View ✅]]

## Projects 🎯

```tasks
not done
path includes 2-Areas
group by filename
sort by happens
(happens in <% moment(tp.file.title, "gggg-[W]ww").format("gggg-[W]ww") %>) OR (happens before <% moment(tp.file.title, "gggg-[W]ww").format("gggg-[W]ww") %>)
```

## Projects Graveyard 🪦

```tasks
path includes 2-Areas
group by filename
sort by done
done in <% moment(tp.file.title, "gggg-[W]ww").format("gggg-[W]ww") %>
```

## Tasks Log ❌

```tasks
path does not include 2-Areas
group by filename
sort by done
done in <% moment(tp.file.title, "gggg-[W]ww").format("gggg-[W]ww") %>
```

## Journal 📔

An Interesting Title : 

