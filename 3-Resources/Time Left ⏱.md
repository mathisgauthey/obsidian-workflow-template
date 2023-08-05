---
title: Time Left
date created: 2023-07-16 13:55:37
date modified: 2023-07-16 13:55:40
tags: 
aliases: 
---

# Time Left ⏱

```dataviewjs
 function newDiff(date1, date2) {
    let years = date1.diff(date2, 'year');
    date2.add(years, 'years');
    let months = date1.diff(date2, 'months');
    date2.add(months, 'months');
    let days = date1.diff(date2, 'days');
    date2.add(days, 'days');
    let hours = date1.diff(date2, 'hours');
    date2.add(hours, 'hours');
    let minutes = date1.diff(date2, 'minutes');
    date2.add(minutes, 'minutes');
    let seconds = date1.diff(date2, 'seconds');
    let resultArray = []
    if (years) resultArray.push(`${years} years`)
    if (months) resultArray.push(`${months} months`)
    if (days) resultArray.push(`${days} days`)
    if (hours) resultArray.push(`${hours} hours`)
    if (minutes) resultArray.push(`${minutes} minutes`)
    //if (seconds) resultArray.push(`${seconds} seconds`)
    const resultString = resultArray.join(', ')
    return  resultString;
};
function newBar(start, end, now){
    const value = Number(((now- start)*100)/(end-start)).toFixed("2")
    const remTime = newDiff(moment(end), moment(now))
    return "<progress value='" + value + "' max='100'></progress>" + 
        "<span>" + value + "% &nbsp;| &nbsp;" + remTime + " left</span>"
}
function liveBar(start, end, now){
    const value = Number(((now- start)*100)/(end-start)).toFixed("2")
    const remTime = newDiff(moment(end), moment(start))
    return "<progress value='" + value + "' max='100'></progress>" + 
        "<span> Live &nbsp;| &nbsp;" + remTime + " went by</span>"
}

const data = []
data.push(["Day", newBar(dv.date("today").toMillis(), dv.date("tomorrow").toMillis(), dv.date("now").toMillis())])
data.push(["Week", newBar(dv.date("sow").toMillis(), dv.date("eow").toMillis(), dv.date("now").toMillis())])
data.push(["Month", newBar(dv.date("som").toMillis(), dv.date("eom").toMillis(), dv.date("now").toMillis())])
data.push(["Quarter", newBar(DateTime.fromFormat(dv.date("now").toFormat("yyyy-qq"), "yyyy-qq").toMillis(), DateTime.fromFormat(dv.date("now").plus({quarter: 1}).toFormat("yyyy-qq"), "yyyy-qq").toMillis(), dv.date("now").toMillis())])
data.push(["Year", newBar(dv.date("soy").toMillis(), dv.date("eoy").toMillis(), dv.date("now").toMillis())])

dv.table(["Name", "Bar"], data)
```
