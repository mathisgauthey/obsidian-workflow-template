---
title: Journal Test
date created: 2023-05-03 18:15:57
date modified: 2023-06-04 14:10:29
tags: 
aliases: 
---

# Journal 📔

```dataviewjs
const header = '#+ [^\n]*?Journal[^\n]*?'

// You can update this to filter as you like - filtering for just your daily notes would be good
const pages = dv.pages('"-Daily-Notes"').sort(x => x.file.name, 'desc')

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
        dv.header(2, file.basename)
        dv.paragraph(summary[1].trim())
    }
}
```
