---
title: <% moment(tp.file.title, "YYYY").format("YYYY") %>
date: <% moment(tp.file.creation_date()).format("YYYY-MM-DD HH:mm:ss") %>
lastmod: <% moment(tp.file.creation_date()).format("YYYY-MM-DD HH:mm:ss") %>
categories: 
tags: yearly-notes
aliases: 
share: false 
---

# <% moment(tp.file.title, "YYYY").format("YYYY") %>

<%*
const currentMoment = moment(tp.file.title, "YYYY");
const hash = '# ';
const slash = ' / ';
const pipe = ' | ';
const leftAngle = '❮ ';
const rightAngle = ' ❯';
tR += leftAngle;
tR += '[[' + currentMoment.format('YYYY') + ']]';
tR += rightAngle;
tR += '\n';
tR += '\n';
tR += leftAngle;
currentMoment.add(-1,'years');
tR += '[[' + currentMoment.format('YYYY') + ']]' + pipe;
currentMoment.add(1,'years');
tR += currentMoment.format('YYYY') + pipe;
currentMoment.add(1,'years');
tR += '[[' + currentMoment.format('YYYY') + ']]';
currentMoment.add(-1,'years');
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
(happens in <% moment(tp.file.title, "YYYY").format("YYYY") %>) OR (happens before <% moment(tp.file.title, "YYYY").format("YYYY") %>)
```

## Projects Graveyard 🪦

```tasks
path includes 2-Areas
group by filename
sort by done
done in <% moment(tp.file.title, "YYYY").format("YYYY") %>
```

## Journal 📔

An Interesting Title : 

