---
title: Journal 2024 📔
date: 2023-05-03 18:15:57
lastmod: 2024-01-03 09:48:34
categories:
  - 
tags:
  - 
aliases: 
share: false
---

# Journal 2024 📔

[Color palette](https://www.color-hex.com/color-palette/1464) :

![[2023-09-27_14-22-16_color_palette_journal.png|250]]

```dataviewjs
dv.span("Journal Mood 📈")
const calendarData = {
    year: 2024,  // (optional) defaults to current year
    colors: {    // (optional) defaults to green
        scale:        ["#f2120d", "#ef7626", "#faed03", "#0af508", "#051ac3"]
    },
    showCurrentDayBorder: true, // (optional) defaults to true
    defaultEntryIntensity: 4,   // (optional) defaults to 4
    //intensityScaleStart: 1,    // (optional) defaults to lowest value passed to entries.intensity
    //intensityScaleEnd: 5,     // (optional) defaults to highest value passed to entries.intensity
    entries: [],                // (required) populated in the DataviewJS loop below
}

//DataviewJS loop
for (let page of dv.pages('"-Daily-Notes"').where(p => p.mood)) {
    //dv.span("<br>" + page.file.name) // uncomment for troubleshooting
    calendarData.entries.push({
        date: page.file.name,     // (required) Format YYYY-MM-DD
        intensity: page.mood, // (required) the data you want to track, will map color intensities automatically
        content: await dv.span(`[](${page.file.name})`), // (optional) Add text to the date cell
        color: "",          // (optional) Reference from *calendarData.colors*. If no color is supplied; colors[0] is used
    })
}

renderHeatmapCalendar(this.container, calendarData)
```

```dataviewjs
const header = '#+ [^\n]*?Journal[^\n]*?'

// You can update this to filter as you like - filtering for just your daily notes would be good
const pages = dv.pages('"-Daily-Notes"').filter(page => page.file.name.includes("2024")).sort(x => x.file.name, 'desc')

// This regex will return text from the Summary header, until it reaches
// the next header, a horizontal line, or the end of the file
const regex = new RegExp(`\n${header}\r?\n(.*?)(\n#+ |\n---|$)`, 's')

for (const page of pages) {
    const file = app.vault.getAbstractFileByPath(page.file.path)
    // Read the file contents
    const contents = await app.vault.read(file)
    // Extract the summary via regex
    const summary = contents.match(regex)
    if (summary) {
        // Output the header and summary
        dv.header(2, "[["+file.basename+"]]")
        dv.paragraph(summary[1].trim())
    }
}
```
