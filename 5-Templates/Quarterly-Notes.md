---
title: <% moment(tp.file.title, "YYYY-[Q]Q").format("YYYY-[Q]Q") %>
date: <% moment(tp.file.creation_date()).format("YYYY-MM-DD HH:mm:ss") %>
lastmod: <% moment(tp.file.creation_date()).format("YYYY-MM-DD HH:mm:ss") %>
categories: 
tags: quarterly-notes
aliases: 
share: false 
---

# <% moment(tp.file.title, "YYYY-[Q]Q").format("YYYY-[Q]Q") %>

<%*
const currentMoment = moment(tp.file.title, "YYYY-[Q]Q");
const hash = '# ';
const slash = ' / ';
const pipe = ' | ';
const leftAngle = '❮ ';
const rightAngle = ' ❯';
tR += leftAngle;
tR += '[[' + currentMoment.format('YYYY') + ']]' + slash;
tR += '[[' + currentMoment.format('YYYY-[Q]Q|[Q]Q') + ']]';
tR += rightAngle;
tR += '\n';
tR += '\n';
tR += leftAngle;
currentMoment.add(-1,'quarters');
tR += '[[' + currentMoment.format('YYYY-[Q]Q') + ']]' + pipe;
currentMoment.add(1,'quarters');
tR += currentMoment.format('YYYY-[Q]Q') + pipe;
currentMoment.add(1,'quarters');
tR += '[[' + currentMoment.format('YYYY-[Q]Q') + ']]';
currentMoment.add(-1,'quarters');
tR += rightAngle;
%>

> [!INFO]- Time left ⏱
> ![[Time Left ⏱#Time Left ⏱]]

## Projects 🎯

```tasks
not done
path includes 2-Areas
group by filename
sort by happens
(happens in <% moment(tp.file.title, "YYYY-[Q]Q").format("YYYY-[Q]Q") %>) OR (happens before <% moment(tp.file.title, "YYYY-[Q]Q").format("YYYY-[Q]Q") %>)
```

## Projects Graveyard 🪦

```tasks
path includes 2-Areas
group by filename
sort by done
done in <% moment(tp.file.title, "YYYY-[Q]Q").format("YYYY-[Q]Q") %>
```

## Journal 📔

An Interesting Title : 

