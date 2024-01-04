'use strict';

var obsidian = require('obsidian');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const DEFAULT_SETTINGS = {
    enableAutoSuggest: true,
    enableFootnoteSectionHeading: false,
    FootnoteSectionHeading: "Footnotes",
};
class FootnotePluginSettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl("h2", {
            text: "Footnote Shortcut",
        });
        const mainDesc = containerEl.createEl('p');
        mainDesc.appendText('Need help? Check the ');
        mainDesc.appendChild(createEl('a', {
            text: "README",
            href: "https://github.com/MichaBrugger/obsidian-footnotes",
        }));
        mainDesc.appendText('!');
        containerEl.createEl('br');
        new obsidian.Setting(containerEl)
            .setName("Enable Footnote Autosuggest")
            .setDesc("Suggests existing footnotes when entering named footnotes.")
            .addToggle((toggle) => toggle
            .setValue(this.plugin.settings.enableAutoSuggest)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.enableAutoSuggest = value;
            yield this.plugin.saveSettings();
        })));
        containerEl.createEl("h3", {
            text: "Footnotes Section Behavior",
        });
        new obsidian.Setting(containerEl)
            .setName("Enable Footnote Section Heading")
            .setDesc("Automatically adds a heading separating footnotes at the bottom of the note from the rest of the text.")
            .addToggle((toggle) => toggle
            .setValue(this.plugin.settings.enableFootnoteSectionHeading)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.enableFootnoteSectionHeading = value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName("Footnote Section Heading")
            .setDesc("Heading to place above footnotes section (Supports Markdown formatting). Heading will be H1 size.")
            .addText((text) => text
            .setPlaceholder("Heading is Empty")
            .setValue(this.plugin.settings.FootnoteSectionHeading)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.FootnoteSectionHeading = value;
            yield this.plugin.saveSettings();
        })));
    }
}

var AllMarkers = /\[\^([^\[\]]+)\](?!:)/dg;
var AllNumberedMarkers = /\[\^(\d+)\]/gi;
var AllDetailsNameOnly = /\[\^([^\[\]]+)\]:/g;
var DetailInLine = /\[\^([^\[\]]+)\]:/;
var ExtractNameFromFootnote = /(\[\^)([^\[\]]+)(?=\])/;
function listExistingFootnoteDetails(doc) {
    let FootnoteDetailList = [];
    //search each line for footnote details and add to list
    for (let i = 0; i < doc.lineCount(); i++) {
        let theLine = doc.getLine(i);
        let lineMatch = theLine.match(AllDetailsNameOnly);
        if (lineMatch) {
            let temp = lineMatch[0];
            temp = temp.replace("[^", "");
            temp = temp.replace("]:", "");
            FootnoteDetailList.push(temp);
        }
    }
    if (FootnoteDetailList.length > 0) {
        return FootnoteDetailList;
    }
    else {
        return null;
    }
}
function listExistingFootnoteMarkersAndLocations(doc) {
    let markerEntry;
    let FootnoteMarkerInfo = [];
    //search each line for footnote markers
    //for each, add their name, line number, and start index to FootnoteMarkerInfo
    for (let i = 0; i < doc.lineCount(); i++) {
        let theLine = doc.getLine(i);
        let lineMatch;
        while ((lineMatch = AllMarkers.exec(theLine)) != null) {
            markerEntry = {
                footnote: lineMatch[0],
                lineNum: i,
                startIndex: lineMatch.index
            };
            FootnoteMarkerInfo.push(markerEntry);
        }
    }
    return FootnoteMarkerInfo;
}
function shouldJumpFromDetailToMarker(lineText, cursorPosition, doc) {
    // check if we're in a footnote detail line ("[^1]: footnote")
    // if so, jump cursor back to the footnote in the text
    let match = lineText.match(DetailInLine);
    if (match) {
        let s = match[0];
        let index = s.replace("[^", "");
        index = index.replace("]:", "");
        let footnote = s.replace(":", "");
        let returnLineIndex = cursorPosition.line;
        // find the FIRST OCCURENCE where this footnote exists in the text
        for (let i = 0; i < doc.lineCount(); i++) {
            let scanLine = doc.getLine(i);
            if (scanLine.contains(footnote)) {
                let cursorLocationIndex = scanLine.indexOf(footnote);
                returnLineIndex = i;
                doc.setCursor({
                    line: returnLineIndex,
                    ch: cursorLocationIndex + footnote.length,
                });
                return true;
            }
        }
    }
    return false;
}
function shouldJumpFromMarkerToDetail(lineText, cursorPosition, doc) {
    // Jump cursor TO detail marker
    // does this line have a footnote marker?
    // does the cursor overlap with one of them?
    // if so, which one?
    // find this footnote marker's detail line
    // place cursor there
    let markerTarget = null;
    let FootnoteMarkerInfo = listExistingFootnoteMarkersAndLocations(doc);
    let currentLine = cursorPosition.line;
    let footnotesOnLine = FootnoteMarkerInfo.filter((markerEntry) => markerEntry.lineNum === currentLine);
    if (footnotesOnLine != null) {
        for (let i = 0; i <= footnotesOnLine.length - 1; i++) {
            if (footnotesOnLine[i].footnote !== null) {
                let marker = footnotesOnLine[i].footnote;
                let indexOfMarkerInLine = footnotesOnLine[i].startIndex;
                if (cursorPosition.ch >= indexOfMarkerInLine &&
                    cursorPosition.ch <= indexOfMarkerInLine + marker.length) {
                    markerTarget = marker;
                    break;
                }
            }
        }
    }
    if (markerTarget !== null) {
        // extract name
        let match = markerTarget.match(ExtractNameFromFootnote);
        if (match) {
            let footnoteName = match[2];
            // find the first line with this detail marker name in it.
            for (let i = 0; i < doc.lineCount(); i++) {
                let theLine = doc.getLine(i);
                let lineMatch = theLine.match(DetailInLine);
                if (lineMatch) {
                    // compare to the index
                    let nameMatch = lineMatch[1];
                    if (nameMatch == footnoteName) {
                        doc.setCursor({ line: i, ch: lineMatch[0].length + 1 });
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
function addFootnoteSectionHeader(plugin) {
    //check if 'Enable Footnote Section Heading' is true
    //if so, return the "Footnote Section Heading"
    // else, return ""
    if (plugin.settings.enableFootnoteSectionHeading == true) {
        let returnHeading = `\n# ${plugin.settings.FootnoteSectionHeading}`;
        return returnHeading;
    }
    return "";
}
//FUNCTIONS FOR AUTONUMBERED FOOTNOTES
function insertAutonumFootnote(plugin) {
    const mdView = app.workspace.getActiveViewOfType(obsidian.MarkdownView);
    if (!mdView)
        return false;
    if (mdView.editor == undefined)
        return false;
    const doc = mdView.editor;
    const cursorPosition = doc.getCursor();
    const lineText = doc.getLine(cursorPosition.line);
    const markdownText = mdView.data;
    if (shouldJumpFromDetailToMarker(lineText, cursorPosition, doc))
        return;
    if (shouldJumpFromMarkerToDetail(lineText, cursorPosition, doc))
        return;
    return shouldCreateAutonumFootnote(lineText, cursorPosition, plugin, doc, markdownText);
}
function shouldCreateAutonumFootnote(lineText, cursorPosition, plugin, doc, markdownText) {
    // create new footnote with the next numerical index
    let matches = markdownText.match(AllNumberedMarkers);
    let currentMax = 1;
    if (matches != null) {
        for (let i = 0; i <= matches.length - 1; i++) {
            let match = matches[i];
            match = match.replace("[^", "");
            match = match.replace("]", "");
            let matchNumber = Number(match);
            if (matchNumber + 1 > currentMax) {
                currentMax = matchNumber + 1;
            }
        }
    }
    let footNoteId = currentMax;
    let footnoteMarker = `[^${footNoteId}]`;
    let linePart1 = lineText.substr(0, cursorPosition.ch);
    let linePart2 = lineText.substr(cursorPosition.ch);
    let newLine = linePart1 + footnoteMarker + linePart2;
    doc.replaceRange(newLine, { line: cursorPosition.line, ch: 0 }, { line: cursorPosition.line, ch: lineText.length });
    let lastLineIndex = doc.lastLine();
    let lastLine = doc.getLine(lastLineIndex);
    while (lastLineIndex > 0) {
        lastLine = doc.getLine(lastLineIndex);
        if (lastLine.length > 0) {
            doc.replaceRange("", { line: lastLineIndex, ch: 0 }, { line: doc.lastLine(), ch: 0 });
            break;
        }
        lastLineIndex--;
    }
    let footnoteDetail = `\n[^${footNoteId}]: `;
    let list = listExistingFootnoteDetails(doc);
    if (list === null && currentMax == 1) {
        footnoteDetail = "\n" + footnoteDetail;
        let Heading = addFootnoteSectionHeader(plugin);
        doc.setLine(doc.lastLine(), lastLine + Heading + footnoteDetail);
        doc.setCursor(doc.lastLine() - 1, footnoteDetail.length - 1);
    }
    else {
        doc.setLine(doc.lastLine(), lastLine + footnoteDetail);
        doc.setCursor(doc.lastLine(), footnoteDetail.length - 1);
    }
}
//FUNCTIONS FOR NAMED FOOTNOTES
function insertNamedFootnote(plugin) {
    const mdView = app.workspace.getActiveViewOfType(obsidian.MarkdownView);
    if (!mdView)
        return false;
    if (mdView.editor == undefined)
        return false;
    const doc = mdView.editor;
    const cursorPosition = doc.getCursor();
    const lineText = doc.getLine(cursorPosition.line);
    mdView.data;
    if (shouldJumpFromDetailToMarker(lineText, cursorPosition, doc))
        return;
    if (shouldJumpFromMarkerToDetail(lineText, cursorPosition, doc))
        return;
    if (shouldCreateMatchingFootnoteDetail(lineText, cursorPosition, plugin, doc))
        return;
    return shouldCreateFootnoteMarker(lineText, cursorPosition, doc);
}
function shouldCreateMatchingFootnoteDetail(lineText, cursorPosition, plugin, doc) {
    // Create matching footnote detail for footnote marker
    // does this line have a footnote marker?
    // does the cursor overlap with one of them?
    // if so, which one?
    // does this footnote marker have a detail line?
    // if not, create it and place cursor there
    let reOnlyMarkersMatches = lineText.match(AllMarkers);
    let markerTarget = null;
    if (reOnlyMarkersMatches) {
        for (let i = 0; i <= reOnlyMarkersMatches.length; i++) {
            let marker = reOnlyMarkersMatches[i];
            if (marker != undefined) {
                let indexOfMarkerInLine = lineText.indexOf(marker);
                if (cursorPosition.ch >= indexOfMarkerInLine &&
                    cursorPosition.ch <= indexOfMarkerInLine + marker.length) {
                    markerTarget = marker;
                    break;
                }
            }
        }
    }
    if (markerTarget != null) {
        //extract footnote
        let match = markerTarget.match(ExtractNameFromFootnote);
        //find if this footnote exists by listing existing footnote details
        if (match) {
            let footnoteId = match[2];
            let list = listExistingFootnoteDetails(doc);
            // Check if the list is empty OR if the list doesn't include current footnote
            // if so, add detail for the current footnote
            if (list === null || !list.includes(footnoteId)) {
                let lastLineIndex = doc.lastLine();
                let lastLine = doc.getLine(lastLineIndex);
                while (lastLineIndex > 0) {
                    lastLine = doc.getLine(lastLineIndex);
                    if (lastLine.length > 0) {
                        doc.replaceRange("", { line: lastLineIndex, ch: 0 }, { line: doc.lastLine(), ch: 0 });
                        break;
                    }
                    lastLineIndex--;
                }
                let footnoteDetail = `\n[^${footnoteId}]: `;
                if (list === null || list.length < 1) {
                    footnoteDetail = "\n" + footnoteDetail;
                    let Heading = addFootnoteSectionHeader(plugin);
                    doc.setLine(doc.lastLine(), lastLine + Heading + footnoteDetail);
                    doc.setCursor(doc.lastLine() - 1, footnoteDetail.length - 1);
                }
                else {
                    doc.setLine(doc.lastLine(), lastLine + footnoteDetail);
                    doc.setCursor(doc.lastLine(), footnoteDetail.length - 1);
                }
                return true;
            }
            return;
        }
    }
}
function shouldCreateFootnoteMarker(lineText, cursorPosition, doc, markdownText) {
    //create empty footnote marker for name input
    let emptyMarker = `[^]`;
    doc.replaceRange(emptyMarker, doc.getCursor());
    //move cursor in between [^ and ]
    doc.setCursor(cursorPosition.line, cursorPosition.ch + 2);
    //open footnotePicker popup
}

class Autocomplete extends obsidian.EditorSuggest {
    constructor(plugin) {
        super(plugin.app);
        this.Footnote_Detail_Names_And_Text = /\[\^([^\[\]]+)\]:(.+(?:\n(?:(?!\[\^[^\[\]]+\]:).)+)*)/g;
        this.getSuggestions = (context) => {
            const { query } = context;
            const mdView = app.workspace.getActiveViewOfType(obsidian.MarkdownView);
            const doc = mdView.editor;
            const matches = this.Extract_Footnote_Detail_Names_And_Text(doc);
            const filteredResults = matches.filter((entry) => entry[1].includes(query));
            return filteredResults;
        };
        this.plugin = plugin;
    }
    onTrigger(cursorPosition, doc, file) {
        if (this.plugin.settings.enableAutoSuggest) {
            const mdView = app.workspace.getActiveViewOfType(obsidian.MarkdownView);
            const lineText = doc.getLine(cursorPosition.line);
            mdView.data;
            let reOnlyMarkersMatches = lineText.match(AllMarkers);
            let markerTarget = null;
            let indexOfMarkerInLine = null;
            if (reOnlyMarkersMatches) {
                for (let i = 0; i <= reOnlyMarkersMatches.length; i++) {
                    let marker = reOnlyMarkersMatches[i];
                    if (marker != undefined) {
                        indexOfMarkerInLine = lineText.indexOf(marker);
                        if (cursorPosition.ch >= indexOfMarkerInLine &&
                            cursorPosition.ch <= indexOfMarkerInLine + marker.length) {
                            markerTarget = marker;
                            break;
                        }
                    }
                }
            }
            if (markerTarget != null) {
                //extract footnote
                let match = markerTarget.match(ExtractNameFromFootnote);
                //find if this footnote exists by listing existing footnote details
                if (match) {
                    let footnoteId = match[2];
                    if (footnoteId !== undefined) {
                        this.latestTriggerInfo = {
                            end: cursorPosition,
                            start: {
                                ch: indexOfMarkerInLine + 2,
                                line: cursorPosition.line
                            },
                            query: footnoteId
                        };
                        return this.latestTriggerInfo;
                    }
                }
            }
            return null;
        }
    }
    Extract_Footnote_Detail_Names_And_Text(doc) {
        //search each line for footnote details and add to list
        //save the footnote detail name as capture group 1
        //save the footnote detail text as capture group 2
        let docText = doc.getValue();
        const matches = Array.from(docText.matchAll(this.Footnote_Detail_Names_And_Text));
        return matches;
    }
    renderSuggestion(value, el) {
        el.createEl("b", { text: value[1] });
        el.createEl("br");
        el.createEl("p", { text: value[2] });
    }
    selectSuggestion(value, evt) {
        const { context, plugin } = this;
        if (!context)
            return;
        const mdView = app.workspace.getActiveViewOfType(obsidian.MarkdownView);
        mdView.editor;
        const field = value[1];
        const replacement = `${field}`;
        context.editor.replaceRange(replacement, this.latestTriggerInfo.start, this.latestTriggerInfo.end);
    }
}

//Add chevron-up-square icon from lucide for mobile toolbar (temporary until Obsidian updates to Lucide v0.130.0)
obsidian.addIcon("chevron-up-square", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up-square"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><polyline points="8,14 12,10 16,14"></polyline></svg>`);
class FootnotePlugin extends obsidian.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSettings();
            this.registerEditorSuggest(new Autocomplete(this));
            this.addCommand({
                id: "insert-autonumbered-footnote",
                name: "Insert / Navigate Auto-Numbered Footnote",
                icon: "plus-square",
                checkCallback: (checking) => {
                    if (checking)
                        return !!this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                    insertAutonumFootnote(this);
                },
            });
            this.addCommand({
                id: "insert-named-footnote",
                name: "Insert / Navigate Named Footnote",
                icon: "chevron-up-square",
                checkCallback: (checking) => {
                    if (checking)
                        return !!this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                    insertNamedFootnote(this);
                }
            });
            this.addSettingTab(new FootnotePluginSettingTab(this.app, this));
        });
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
}

module.exports = FootnotePlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9zZXR0aW5ncy50cyIsInNyYy9pbnNlcnQtb3ItbmF2aWdhdGUtZm9vdG5vdGVzLnRzIiwic3JjL2F1dG9zdWdnZXN0LnRzIiwic3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcclxuICAgIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxyXG4gICAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcclxuICAgIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xyXG4gICAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XHJcbiAgICB2YXIgXywgZG9uZSA9IGZhbHNlO1xyXG4gICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xyXG4gICAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XHJcbiAgICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnB1c2goXyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMucHVzaChfKTtcclxuICAgICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcclxuICAgIGRvbmUgPSB0cnVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcclxuICAgIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xyXG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG4iLCJpbXBvcnQgeyBBcHAsIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tIFwib2JzaWRpYW5cIjtcclxuaW1wb3J0IEZvb3Rub3RlUGx1Z2luIGZyb20gXCIuL21haW5cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRm9vdG5vdGVQbHVnaW5TZXR0aW5ncyB7XHJcbiAgICBlbmFibGVBdXRvU3VnZ2VzdDogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgZW5hYmxlRm9vdG5vdGVTZWN0aW9uSGVhZGluZzogYm9vbGVhbjtcclxuICAgIEZvb3Rub3RlU2VjdGlvbkhlYWRpbmc6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU0VUVElOR1M6IEZvb3Rub3RlUGx1Z2luU2V0dGluZ3MgPSB7XHJcbiAgICBlbmFibGVBdXRvU3VnZ2VzdDogdHJ1ZSxcclxuXHJcbiAgICBlbmFibGVGb290bm90ZVNlY3Rpb25IZWFkaW5nOiBmYWxzZSxcclxuICAgIEZvb3Rub3RlU2VjdGlvbkhlYWRpbmc6IFwiRm9vdG5vdGVzXCIsXHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgRm9vdG5vdGVQbHVnaW5TZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XHJcbiAgICBwbHVnaW46IEZvb3Rub3RlUGx1Z2luO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IEZvb3Rub3RlUGx1Z2luKSB7XHJcbiAgICAgICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xyXG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXkoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qge2NvbnRhaW5lckVsfSA9IHRoaXM7XHJcbiAgICAgICAgY29udGFpbmVyRWwuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoMlwiLCB7XHJcbiAgICAgICAgdGV4dDogXCJGb290bm90ZSBTaG9ydGN1dFwiLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBtYWluRGVzYyA9IGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdwJyk7XHJcblxyXG4gICAgICAgICAgICBtYWluRGVzYy5hcHBlbmRUZXh0KCdOZWVkIGhlbHA/IENoZWNrIHRoZSAnKTtcclxuICAgICAgICAgICAgbWFpbkRlc2MuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbCgnYScsIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiUkVBRE1FXCIsXHJcbiAgICAgICAgICAgICAgICBocmVmOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9NaWNoYUJydWdnZXIvb2JzaWRpYW4tZm9vdG5vdGVzXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBtYWluRGVzYy5hcHBlbmRUZXh0KCchJyk7XHJcbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ2JyJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgICAgLnNldE5hbWUoXCJFbmFibGUgRm9vdG5vdGUgQXV0b3N1Z2dlc3RcIilcclxuICAgICAgICAuc2V0RGVzYyhcIlN1Z2dlc3RzIGV4aXN0aW5nIGZvb3Rub3RlcyB3aGVuIGVudGVyaW5nIG5hbWVkIGZvb3Rub3Rlcy5cIilcclxuICAgICAgICAuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XHJcbiAgICAgICAgICAgIHRvZ2dsZVxyXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZUF1dG9TdWdnZXN0KVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZUF1dG9TdWdnZXN0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDNcIiwge1xyXG4gICAgICAgICAgICB0ZXh0OiBcIkZvb3Rub3RlcyBTZWN0aW9uIEJlaGF2aW9yXCIsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAgIC5zZXROYW1lKFwiRW5hYmxlIEZvb3Rub3RlIFNlY3Rpb24gSGVhZGluZ1wiKVxyXG4gICAgICAgIC5zZXREZXNjKFwiQXV0b21hdGljYWxseSBhZGRzIGEgaGVhZGluZyBzZXBhcmF0aW5nIGZvb3Rub3RlcyBhdCB0aGUgYm90dG9tIG9mIHRoZSBub3RlIGZyb20gdGhlIHJlc3Qgb2YgdGhlIHRleHQuXCIpXHJcbiAgICAgICAgLmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxyXG4gICAgICAgICAgICB0b2dnbGVcclxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmFibGVGb290bm90ZVNlY3Rpb25IZWFkaW5nKVxyXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZUZvb3Rub3RlU2VjdGlvbkhlYWRpbmcgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgICAgLnNldE5hbWUoXCJGb290bm90ZSBTZWN0aW9uIEhlYWRpbmdcIilcclxuICAgICAgICAuc2V0RGVzYyhcIkhlYWRpbmcgdG8gcGxhY2UgYWJvdmUgZm9vdG5vdGVzIHNlY3Rpb24gKFN1cHBvcnRzIE1hcmtkb3duIGZvcm1hdHRpbmcpLiBIZWFkaW5nIHdpbGwgYmUgSDEgc2l6ZS5cIilcclxuICAgICAgICAuYWRkVGV4dCgodGV4dCkgPT5cclxuICAgICAgICAgICAgdGV4dFxyXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiSGVhZGluZyBpcyBFbXB0eVwiKVxyXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLkZvb3Rub3RlU2VjdGlvbkhlYWRpbmcpXHJcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuRm9vdG5vdGVTZWN0aW9uSGVhZGluZyA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgXHJcbiAgICBFZGl0b3IsIFxyXG4gICAgRWRpdG9yUG9zaXRpb24sIFxyXG4gICAgTWFya2Rvd25WaWV3XHJcbn0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcblxyXG5pbXBvcnQgRm9vdG5vdGVQbHVnaW4gZnJvbSBcIi4vbWFpblwiO1xyXG5cclxuZXhwb3J0IHZhciBBbGxNYXJrZXJzID0gL1xcW1xcXihbXlxcW1xcXV0rKVxcXSg/ITopL2RnO1xyXG52YXIgQWxsTnVtYmVyZWRNYXJrZXJzID0gL1xcW1xcXihcXGQrKVxcXS9naTtcclxudmFyIEFsbERldGFpbHNOYW1lT25seSA9IC9cXFtcXF4oW15cXFtcXF1dKylcXF06L2c7XHJcbnZhciBEZXRhaWxJbkxpbmUgPSAvXFxbXFxeKFteXFxbXFxdXSspXFxdOi87XHJcbmV4cG9ydCB2YXIgRXh0cmFjdE5hbWVGcm9tRm9vdG5vdGUgPSAvKFxcW1xcXikoW15cXFtcXF1dKykoPz1cXF0pLztcclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbGlzdEV4aXN0aW5nRm9vdG5vdGVEZXRhaWxzKFxyXG4gICAgZG9jOiBFZGl0b3JcclxuKSB7XHJcbiAgICBsZXQgRm9vdG5vdGVEZXRhaWxMaXN0OiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgXHJcbiAgICAvL3NlYXJjaCBlYWNoIGxpbmUgZm9yIGZvb3Rub3RlIGRldGFpbHMgYW5kIGFkZCB0byBsaXN0XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRvYy5saW5lQ291bnQoKTsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHRoZUxpbmUgPSBkb2MuZ2V0TGluZShpKTtcclxuICAgICAgICBsZXQgbGluZU1hdGNoID0gdGhlTGluZS5tYXRjaChBbGxEZXRhaWxzTmFtZU9ubHkpO1xyXG4gICAgICAgIGlmIChsaW5lTWF0Y2gpIHtcclxuICAgICAgICAgICAgbGV0IHRlbXAgPSBsaW5lTWF0Y2hbMF07XHJcbiAgICAgICAgICAgIHRlbXAgPSB0ZW1wLnJlcGxhY2UoXCJbXlwiLFwiXCIpO1xyXG4gICAgICAgICAgICB0ZW1wID0gdGVtcC5yZXBsYWNlKFwiXTpcIixcIlwiKTtcclxuXHJcbiAgICAgICAgICAgIEZvb3Rub3RlRGV0YWlsTGlzdC5wdXNoKHRlbXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChGb290bm90ZURldGFpbExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHJldHVybiBGb290bm90ZURldGFpbExpc3Q7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbGlzdEV4aXN0aW5nRm9vdG5vdGVNYXJrZXJzQW5kTG9jYXRpb25zKFxyXG4gICAgZG9jOiBFZGl0b3JcclxuKSB7XHJcbiAgICB0eXBlIG1hcmtlckVudHJ5ID0ge1xyXG4gICAgICAgIGZvb3Rub3RlOiBzdHJpbmc7XHJcbiAgICAgICAgbGluZU51bTogbnVtYmVyO1xyXG4gICAgICAgIHN0YXJ0SW5kZXg6IG51bWJlcjtcclxuICAgIH1cclxuICAgIGxldCBtYXJrZXJFbnRyeTtcclxuXHJcbiAgICBsZXQgRm9vdG5vdGVNYXJrZXJJbmZvID0gW107XHJcbiAgICAvL3NlYXJjaCBlYWNoIGxpbmUgZm9yIGZvb3Rub3RlIG1hcmtlcnNcclxuICAgIC8vZm9yIGVhY2gsIGFkZCB0aGVpciBuYW1lLCBsaW5lIG51bWJlciwgYW5kIHN0YXJ0IGluZGV4IHRvIEZvb3Rub3RlTWFya2VySW5mb1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb2MubGluZUNvdW50KCk7IGkrKykge1xyXG4gICAgICAgIGxldCB0aGVMaW5lID0gZG9jLmdldExpbmUoaSk7XHJcbiAgICAgICAgbGV0IGxpbmVNYXRjaDtcclxuXHJcbiAgICAgICAgd2hpbGUgKChsaW5lTWF0Y2ggPSBBbGxNYXJrZXJzLmV4ZWModGhlTGluZSkpICE9IG51bGwpIHtcclxuICAgICAgICBtYXJrZXJFbnRyeSA9IHtcclxuICAgICAgICAgICAgZm9vdG5vdGU6IGxpbmVNYXRjaFswXSxcclxuICAgICAgICAgICAgbGluZU51bTogaSxcclxuICAgICAgICAgICAgc3RhcnRJbmRleDogbGluZU1hdGNoLmluZGV4XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEZvb3Rub3RlTWFya2VySW5mby5wdXNoKG1hcmtlckVudHJ5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gRm9vdG5vdGVNYXJrZXJJbmZvO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkSnVtcEZyb21EZXRhaWxUb01hcmtlcihcclxuICAgIGxpbmVUZXh0OiBzdHJpbmcsXHJcbiAgICBjdXJzb3JQb3NpdGlvbjogRWRpdG9yUG9zaXRpb24sXHJcbiAgICBkb2M6IEVkaXRvclxyXG4pIHtcclxuICAgIC8vIGNoZWNrIGlmIHdlJ3JlIGluIGEgZm9vdG5vdGUgZGV0YWlsIGxpbmUgKFwiW14xXTogZm9vdG5vdGVcIilcclxuICAgIC8vIGlmIHNvLCBqdW1wIGN1cnNvciBiYWNrIHRvIHRoZSBmb290bm90ZSBpbiB0aGUgdGV4dFxyXG5cclxuICAgIGxldCBtYXRjaCA9IGxpbmVUZXh0Lm1hdGNoKERldGFpbEluTGluZSk7XHJcbiAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICBsZXQgcyA9IG1hdGNoWzBdO1xyXG4gICAgICAgIGxldCBpbmRleCA9IHMucmVwbGFjZShcIlteXCIsIFwiXCIpO1xyXG4gICAgICAgIGluZGV4ID0gaW5kZXgucmVwbGFjZShcIl06XCIsIFwiXCIpO1xyXG4gICAgICAgIGxldCBmb290bm90ZSA9IHMucmVwbGFjZShcIjpcIiwgXCJcIik7XHJcblxyXG4gICAgICAgIGxldCByZXR1cm5MaW5lSW5kZXggPSBjdXJzb3JQb3NpdGlvbi5saW5lO1xyXG4gICAgICAgIC8vIGZpbmQgdGhlIEZJUlNUIE9DQ1VSRU5DRSB3aGVyZSB0aGlzIGZvb3Rub3RlIGV4aXN0cyBpbiB0aGUgdGV4dFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG9jLmxpbmVDb3VudCgpOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNjYW5MaW5lID0gZG9jLmdldExpbmUoaSk7XHJcbiAgICAgICAgICAgIGlmIChzY2FuTGluZS5jb250YWlucyhmb290bm90ZSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJzb3JMb2NhdGlvbkluZGV4ID0gc2NhbkxpbmUuaW5kZXhPZihmb290bm90ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5MaW5lSW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgZG9jLnNldEN1cnNvcih7XHJcbiAgICAgICAgICAgICAgICBsaW5lOiByZXR1cm5MaW5lSW5kZXgsXHJcbiAgICAgICAgICAgICAgICBjaDogY3Vyc29yTG9jYXRpb25JbmRleCArIGZvb3Rub3RlLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRKdW1wRnJvbU1hcmtlclRvRGV0YWlsKFxyXG4gICAgbGluZVRleHQ6IHN0cmluZyxcclxuICAgIGN1cnNvclBvc2l0aW9uOiBFZGl0b3JQb3NpdGlvbixcclxuICAgIGRvYzogRWRpdG9yXHJcbikge1xyXG4gICAgLy8gSnVtcCBjdXJzb3IgVE8gZGV0YWlsIG1hcmtlclxyXG5cclxuICAgIC8vIGRvZXMgdGhpcyBsaW5lIGhhdmUgYSBmb290bm90ZSBtYXJrZXI/XHJcbiAgICAvLyBkb2VzIHRoZSBjdXJzb3Igb3ZlcmxhcCB3aXRoIG9uZSBvZiB0aGVtP1xyXG4gICAgLy8gaWYgc28sIHdoaWNoIG9uZT9cclxuICAgIC8vIGZpbmQgdGhpcyBmb290bm90ZSBtYXJrZXIncyBkZXRhaWwgbGluZVxyXG4gICAgLy8gcGxhY2UgY3Vyc29yIHRoZXJlXHJcbiAgICBsZXQgbWFya2VyVGFyZ2V0ID0gbnVsbDtcclxuXHJcbiAgICBsZXQgRm9vdG5vdGVNYXJrZXJJbmZvID0gbGlzdEV4aXN0aW5nRm9vdG5vdGVNYXJrZXJzQW5kTG9jYXRpb25zKGRvYyk7XHJcbiAgICBsZXQgY3VycmVudExpbmUgPSBjdXJzb3JQb3NpdGlvbi5saW5lO1xyXG4gICAgbGV0IGZvb3Rub3Rlc09uTGluZSA9IEZvb3Rub3RlTWFya2VySW5mby5maWx0ZXIoKG1hcmtlckVudHJ5OiB7IGxpbmVOdW06IG51bWJlcjsgfSkgPT4gbWFya2VyRW50cnkubGluZU51bSA9PT0gY3VycmVudExpbmUpO1xyXG5cclxuICAgIGlmIChmb290bm90ZXNPbkxpbmUgIT0gbnVsbCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGZvb3Rub3Rlc09uTGluZS5sZW5ndGgtMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChmb290bm90ZXNPbkxpbmVbaV0uZm9vdG5vdGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtYXJrZXIgPSBmb290bm90ZXNPbkxpbmVbaV0uZm9vdG5vdGU7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXhPZk1hcmtlckluTGluZSA9IGZvb3Rub3Rlc09uTGluZVtpXS5zdGFydEluZGV4O1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yUG9zaXRpb24uY2ggPj0gaW5kZXhPZk1hcmtlckluTGluZSAmJlxyXG4gICAgICAgICAgICAgICAgY3Vyc29yUG9zaXRpb24uY2ggPD0gaW5kZXhPZk1hcmtlckluTGluZSArIG1hcmtlci5sZW5ndGhcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgbWFya2VyVGFyZ2V0ID0gbWFya2VyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobWFya2VyVGFyZ2V0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgLy8gZXh0cmFjdCBuYW1lXHJcbiAgICAgICAgbGV0IG1hdGNoID0gbWFya2VyVGFyZ2V0Lm1hdGNoKEV4dHJhY3ROYW1lRnJvbUZvb3Rub3RlKTtcclxuICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgbGV0IGZvb3Rub3RlTmFtZSA9IG1hdGNoWzJdO1xyXG5cclxuICAgICAgICAgICAgLy8gZmluZCB0aGUgZmlyc3QgbGluZSB3aXRoIHRoaXMgZGV0YWlsIG1hcmtlciBuYW1lIGluIGl0LlxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRvYy5saW5lQ291bnQoKTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGhlTGluZSA9IGRvYy5nZXRMaW5lKGkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpbmVNYXRjaCA9IHRoZUxpbmUubWF0Y2goRGV0YWlsSW5MaW5lKTtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5lTWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb21wYXJlIHRvIHRoZSBpbmRleFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuYW1lTWF0Y2ggPSBsaW5lTWF0Y2hbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWVNYXRjaCA9PSBmb290bm90ZU5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jLnNldEN1cnNvcih7IGxpbmU6IGksIGNoOiBsaW5lTWF0Y2hbMF0ubGVuZ3RoICsgMSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkRm9vdG5vdGVTZWN0aW9uSGVhZGVyKFxyXG4gICAgcGx1Z2luOiBGb290bm90ZVBsdWdpbixcclxuKTogc3RyaW5nIHtcclxuICAgIC8vY2hlY2sgaWYgJ0VuYWJsZSBGb290bm90ZSBTZWN0aW9uIEhlYWRpbmcnIGlzIHRydWVcclxuICAgIC8vaWYgc28sIHJldHVybiB0aGUgXCJGb290bm90ZSBTZWN0aW9uIEhlYWRpbmdcIlxyXG4gICAgLy8gZWxzZSwgcmV0dXJuIFwiXCJcclxuXHJcbiAgICBpZiAocGx1Z2luLnNldHRpbmdzLmVuYWJsZUZvb3Rub3RlU2VjdGlvbkhlYWRpbmcgPT0gdHJ1ZSkge1xyXG4gICAgICAgIGxldCByZXR1cm5IZWFkaW5nID0gYFxcbiMgJHtwbHVnaW4uc2V0dGluZ3MuRm9vdG5vdGVTZWN0aW9uSGVhZGluZ31gO1xyXG4gICAgICAgIHJldHVybiByZXR1cm5IZWFkaW5nO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbn1cclxuXHJcbi8vRlVOQ1RJT05TIEZPUiBBVVRPTlVNQkVSRUQgRk9PVE5PVEVTXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0QXV0b251bUZvb3Rub3RlKHBsdWdpbjogRm9vdG5vdGVQbHVnaW4pIHtcclxuICAgIGNvbnN0IG1kVmlldyA9IGFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xyXG5cclxuICAgIGlmICghbWRWaWV3KSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAobWRWaWV3LmVkaXRvciA9PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBkb2MgPSBtZFZpZXcuZWRpdG9yO1xyXG4gICAgY29uc3QgY3Vyc29yUG9zaXRpb24gPSBkb2MuZ2V0Q3Vyc29yKCk7XHJcbiAgICBjb25zdCBsaW5lVGV4dCA9IGRvYy5nZXRMaW5lKGN1cnNvclBvc2l0aW9uLmxpbmUpO1xyXG4gICAgY29uc3QgbWFya2Rvd25UZXh0ID0gbWRWaWV3LmRhdGE7XHJcblxyXG4gICAgaWYgKHNob3VsZEp1bXBGcm9tRGV0YWlsVG9NYXJrZXIobGluZVRleHQsIGN1cnNvclBvc2l0aW9uLCBkb2MpKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGlmIChzaG91bGRKdW1wRnJvbU1hcmtlclRvRGV0YWlsKGxpbmVUZXh0LCBjdXJzb3JQb3NpdGlvbiwgZG9jKSlcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgcmV0dXJuIHNob3VsZENyZWF0ZUF1dG9udW1Gb290bm90ZShcclxuICAgICAgICBsaW5lVGV4dCxcclxuICAgICAgICBjdXJzb3JQb3NpdGlvbixcclxuICAgICAgICBwbHVnaW4sXHJcbiAgICAgICAgZG9jLFxyXG4gICAgICAgIG1hcmtkb3duVGV4dFxyXG4gICAgKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRDcmVhdGVBdXRvbnVtRm9vdG5vdGUoXHJcbiAgICBsaW5lVGV4dDogc3RyaW5nLFxyXG4gICAgY3Vyc29yUG9zaXRpb246IEVkaXRvclBvc2l0aW9uLFxyXG4gICAgcGx1Z2luOiBGb290bm90ZVBsdWdpbixcclxuICAgIGRvYzogRWRpdG9yLFxyXG4gICAgbWFya2Rvd25UZXh0OiBzdHJpbmdcclxuKSB7XHJcbiAgICAvLyBjcmVhdGUgbmV3IGZvb3Rub3RlIHdpdGggdGhlIG5leHQgbnVtZXJpY2FsIGluZGV4XHJcbiAgICBsZXQgbWF0Y2hlcyA9IG1hcmtkb3duVGV4dC5tYXRjaChBbGxOdW1iZXJlZE1hcmtlcnMpO1xyXG4gICAgbGV0IG51bWJlcnM6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgIGxldCBjdXJyZW50TWF4ID0gMTtcclxuXHJcbiAgICBpZiAobWF0Y2hlcyAhPSBudWxsKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gbWF0Y2hlcy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoID0gbWF0Y2hlc1tpXTtcclxuICAgICAgICAgICAgbWF0Y2ggPSBtYXRjaC5yZXBsYWNlKFwiW15cIiwgXCJcIik7XHJcbiAgICAgICAgICAgIG1hdGNoID0gbWF0Y2gucmVwbGFjZShcIl1cIiwgXCJcIik7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaE51bWJlciA9IE51bWJlcihtYXRjaCk7XHJcbiAgICAgICAgICAgIG51bWJlcnNbaV0gPSBtYXRjaE51bWJlcjtcclxuICAgICAgICAgICAgaWYgKG1hdGNoTnVtYmVyICsgMSA+IGN1cnJlbnRNYXgpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRNYXggPSBtYXRjaE51bWJlciArIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGZvb3ROb3RlSWQgPSBjdXJyZW50TWF4O1xyXG4gICAgbGV0IGZvb3Rub3RlTWFya2VyID0gYFteJHtmb290Tm90ZUlkfV1gO1xyXG4gICAgbGV0IGxpbmVQYXJ0MSA9IGxpbmVUZXh0LnN1YnN0cigwLCBjdXJzb3JQb3NpdGlvbi5jaCk7XHJcbiAgICBsZXQgbGluZVBhcnQyID0gbGluZVRleHQuc3Vic3RyKGN1cnNvclBvc2l0aW9uLmNoKTtcclxuICAgIGxldCBuZXdMaW5lID0gbGluZVBhcnQxICsgZm9vdG5vdGVNYXJrZXIgKyBsaW5lUGFydDI7XHJcblxyXG4gICAgZG9jLnJlcGxhY2VSYW5nZShcclxuICAgICAgICBuZXdMaW5lLFxyXG4gICAgICAgIHsgbGluZTogY3Vyc29yUG9zaXRpb24ubGluZSwgY2g6IDAgfSxcclxuICAgICAgICB7IGxpbmU6IGN1cnNvclBvc2l0aW9uLmxpbmUsIGNoOiBsaW5lVGV4dC5sZW5ndGggfVxyXG4gICAgKTtcclxuXHJcbiAgICBsZXQgbGFzdExpbmVJbmRleCA9IGRvYy5sYXN0TGluZSgpO1xyXG4gICAgbGV0IGxhc3RMaW5lID0gZG9jLmdldExpbmUobGFzdExpbmVJbmRleCk7XHJcblxyXG4gICAgd2hpbGUgKGxhc3RMaW5lSW5kZXggPiAwKSB7XHJcbiAgICAgICAgbGFzdExpbmUgPSBkb2MuZ2V0TGluZShsYXN0TGluZUluZGV4KTtcclxuICAgICAgICBpZiAobGFzdExpbmUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBkb2MucmVwbGFjZVJhbmdlKFxyXG4gICAgICAgICAgICAgICAgXCJcIixcclxuICAgICAgICAgICAgICAgIHsgbGluZTogbGFzdExpbmVJbmRleCwgY2g6IDAgfSxcclxuICAgICAgICAgICAgICAgIHsgbGluZTogZG9jLmxhc3RMaW5lKCksIGNoOiAwIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxhc3RMaW5lSW5kZXgtLTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZm9vdG5vdGVEZXRhaWwgPSBgXFxuW14ke2Zvb3ROb3RlSWR9XTogYDtcclxuXHJcbiAgICBsZXQgbGlzdCA9IGxpc3RFeGlzdGluZ0Zvb3Rub3RlRGV0YWlscyhkb2MpO1xyXG4gICAgXHJcbiAgICBpZiAobGlzdD09PW51bGwgJiYgY3VycmVudE1heCA9PSAxKSB7XHJcbiAgICAgICAgZm9vdG5vdGVEZXRhaWwgPSBcIlxcblwiICsgZm9vdG5vdGVEZXRhaWw7XHJcbiAgICAgICAgbGV0IEhlYWRpbmcgPSBhZGRGb290bm90ZVNlY3Rpb25IZWFkZXIocGx1Z2luKTtcclxuICAgICAgICBkb2Muc2V0TGluZShkb2MubGFzdExpbmUoKSwgbGFzdExpbmUgKyBIZWFkaW5nICsgZm9vdG5vdGVEZXRhaWwpO1xyXG4gICAgICAgIGRvYy5zZXRDdXJzb3IoZG9jLmxhc3RMaW5lKCkgLSAxLCBmb290bm90ZURldGFpbC5sZW5ndGggLSAxKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9jLnNldExpbmUoZG9jLmxhc3RMaW5lKCksIGxhc3RMaW5lICsgZm9vdG5vdGVEZXRhaWwpO1xyXG4gICAgICAgIGRvYy5zZXRDdXJzb3IoZG9jLmxhc3RMaW5lKCksIGZvb3Rub3RlRGV0YWlsLmxlbmd0aCAtIDEpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLy9GVU5DVElPTlMgRk9SIE5BTUVEIEZPT1ROT1RFU1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydE5hbWVkRm9vdG5vdGUocGx1Z2luOiBGb290bm90ZVBsdWdpbikge1xyXG4gICAgY29uc3QgbWRWaWV3ID0gYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XHJcblxyXG4gICAgaWYgKCFtZFZpZXcpIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChtZFZpZXcuZWRpdG9yID09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IGRvYyA9IG1kVmlldy5lZGl0b3I7XHJcbiAgICBjb25zdCBjdXJzb3JQb3NpdGlvbiA9IGRvYy5nZXRDdXJzb3IoKTtcclxuICAgIGNvbnN0IGxpbmVUZXh0ID0gZG9jLmdldExpbmUoY3Vyc29yUG9zaXRpb24ubGluZSk7XHJcbiAgICBjb25zdCBtYXJrZG93blRleHQgPSBtZFZpZXcuZGF0YTtcclxuXHJcbiAgICBpZiAoc2hvdWxkSnVtcEZyb21EZXRhaWxUb01hcmtlcihsaW5lVGV4dCwgY3Vyc29yUG9zaXRpb24sIGRvYykpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgaWYgKHNob3VsZEp1bXBGcm9tTWFya2VyVG9EZXRhaWwobGluZVRleHQsIGN1cnNvclBvc2l0aW9uLCBkb2MpKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICBpZiAoc2hvdWxkQ3JlYXRlTWF0Y2hpbmdGb290bm90ZURldGFpbChsaW5lVGV4dCwgY3Vyc29yUG9zaXRpb24sIHBsdWdpbiwgZG9jKSlcclxuICAgICAgICByZXR1cm47IFxyXG4gICAgcmV0dXJuIHNob3VsZENyZWF0ZUZvb3Rub3RlTWFya2VyKFxyXG4gICAgICAgIGxpbmVUZXh0LFxyXG4gICAgICAgIGN1cnNvclBvc2l0aW9uLFxyXG4gICAgICAgIGRvYyxcclxuICAgICAgICBtYXJrZG93blRleHRcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRDcmVhdGVNYXRjaGluZ0Zvb3Rub3RlRGV0YWlsKFxyXG4gICAgbGluZVRleHQ6IHN0cmluZyxcclxuICAgIGN1cnNvclBvc2l0aW9uOiBFZGl0b3JQb3NpdGlvbixcclxuICAgIHBsdWdpbjogRm9vdG5vdGVQbHVnaW4sXHJcbiAgICBkb2M6IEVkaXRvclxyXG4pIHtcclxuICAgIC8vIENyZWF0ZSBtYXRjaGluZyBmb290bm90ZSBkZXRhaWwgZm9yIGZvb3Rub3RlIG1hcmtlclxyXG4gICAgXHJcbiAgICAvLyBkb2VzIHRoaXMgbGluZSBoYXZlIGEgZm9vdG5vdGUgbWFya2VyP1xyXG4gICAgLy8gZG9lcyB0aGUgY3Vyc29yIG92ZXJsYXAgd2l0aCBvbmUgb2YgdGhlbT9cclxuICAgIC8vIGlmIHNvLCB3aGljaCBvbmU/XHJcbiAgICAvLyBkb2VzIHRoaXMgZm9vdG5vdGUgbWFya2VyIGhhdmUgYSBkZXRhaWwgbGluZT9cclxuICAgIC8vIGlmIG5vdCwgY3JlYXRlIGl0IGFuZCBwbGFjZSBjdXJzb3IgdGhlcmVcclxuICAgIGxldCByZU9ubHlNYXJrZXJzTWF0Y2hlcyA9IGxpbmVUZXh0Lm1hdGNoKEFsbE1hcmtlcnMpO1xyXG5cclxuICAgIGxldCBtYXJrZXJUYXJnZXQgPSBudWxsO1xyXG5cclxuICAgIGlmIChyZU9ubHlNYXJrZXJzTWF0Y2hlcyl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gcmVPbmx5TWFya2Vyc01hdGNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1hcmtlciA9IHJlT25seU1hcmtlcnNNYXRjaGVzW2ldO1xyXG4gICAgICAgICAgICBpZiAobWFya2VyICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4T2ZNYXJrZXJJbkxpbmUgPSBsaW5lVGV4dC5pbmRleE9mKG1hcmtlcik7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yUG9zaXRpb24uY2ggPj0gaW5kZXhPZk1hcmtlckluTGluZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvclBvc2l0aW9uLmNoIDw9IGluZGV4T2ZNYXJrZXJJbkxpbmUgKyBtYXJrZXIubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXJrZXJUYXJnZXQgPSBtYXJrZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1hcmtlclRhcmdldCAhPSBudWxsKSB7XHJcbiAgICAgICAgLy9leHRyYWN0IGZvb3Rub3RlXHJcbiAgICAgICAgbGV0IG1hdGNoID0gbWFya2VyVGFyZ2V0Lm1hdGNoKEV4dHJhY3ROYW1lRnJvbUZvb3Rub3RlKVxyXG4gICAgICAgIC8vZmluZCBpZiB0aGlzIGZvb3Rub3RlIGV4aXN0cyBieSBsaXN0aW5nIGV4aXN0aW5nIGZvb3Rub3RlIGRldGFpbHNcclxuICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgbGV0IGZvb3Rub3RlSWQgPSBtYXRjaFsyXTtcclxuXHJcbiAgICAgICAgICAgIGxldCBsaXN0OiBzdHJpbmdbXSA9IGxpc3RFeGlzdGluZ0Zvb3Rub3RlRGV0YWlscyhkb2MpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGxpc3QgaXMgZW1wdHkgT1IgaWYgdGhlIGxpc3QgZG9lc24ndCBpbmNsdWRlIGN1cnJlbnQgZm9vdG5vdGVcclxuICAgICAgICAgICAgLy8gaWYgc28sIGFkZCBkZXRhaWwgZm9yIHRoZSBjdXJyZW50IGZvb3Rub3RlXHJcbiAgICAgICAgICAgIGlmKGxpc3QgPT09IG51bGwgfHwgIWxpc3QuaW5jbHVkZXMoZm9vdG5vdGVJZCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsYXN0TGluZUluZGV4ID0gZG9jLmxhc3RMaW5lKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFzdExpbmUgPSBkb2MuZ2V0TGluZShsYXN0TGluZUluZGV4KTtcclxuXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAobGFzdExpbmVJbmRleCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0TGluZSA9IGRvYy5nZXRMaW5lKGxhc3RMaW5lSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0TGluZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvYy5yZXBsYWNlUmFuZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBsaW5lOiBsYXN0TGluZUluZGV4LCBjaDogMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBsaW5lOiBkb2MubGFzdExpbmUoKSwgY2g6IDAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdExpbmVJbmRleC0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgZm9vdG5vdGVEZXRhaWwgPSBgXFxuW14ke2Zvb3Rub3RlSWR9XTogYDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3Q9PT1udWxsIHx8IGxpc3QubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rub3RlRGV0YWlsID0gXCJcXG5cIiArIGZvb3Rub3RlRGV0YWlsO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBIZWFkaW5nID0gYWRkRm9vdG5vdGVTZWN0aW9uSGVhZGVyKHBsdWdpbik7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jLnNldExpbmUoZG9jLmxhc3RMaW5lKCksIGxhc3RMaW5lICsgSGVhZGluZyArIGZvb3Rub3RlRGV0YWlsKTtcclxuICAgICAgICAgICAgICAgICAgICBkb2Muc2V0Q3Vyc29yKGRvYy5sYXN0TGluZSgpIC0gMSwgZm9vdG5vdGVEZXRhaWwubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvYy5zZXRMaW5lKGRvYy5sYXN0TGluZSgpLCBsYXN0TGluZSArIGZvb3Rub3RlRGV0YWlsKTtcclxuICAgICAgICAgICAgICAgICAgICBkb2Muc2V0Q3Vyc29yKGRvYy5sYXN0TGluZSgpLCBmb290bm90ZURldGFpbC5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZENyZWF0ZUZvb3Rub3RlTWFya2VyKFxyXG4gICAgbGluZVRleHQ6IHN0cmluZyxcclxuICAgIGN1cnNvclBvc2l0aW9uOiBFZGl0b3JQb3NpdGlvbixcclxuICAgIGRvYzogRWRpdG9yLFxyXG4gICAgbWFya2Rvd25UZXh0OiBzdHJpbmdcclxuKSB7XHJcbiAgICAvL2NyZWF0ZSBlbXB0eSBmb290bm90ZSBtYXJrZXIgZm9yIG5hbWUgaW5wdXRcclxuICAgIGxldCBlbXB0eU1hcmtlciA9IGBbXl1gO1xyXG4gICAgZG9jLnJlcGxhY2VSYW5nZShlbXB0eU1hcmtlcixkb2MuZ2V0Q3Vyc29yKCkpO1xyXG4gICAgLy9tb3ZlIGN1cnNvciBpbiBiZXR3ZWVuIFteIGFuZCBdXHJcbiAgICBkb2Muc2V0Q3Vyc29yKGN1cnNvclBvc2l0aW9uLmxpbmUsIGN1cnNvclBvc2l0aW9uLmNoKzIpO1xyXG4gICAgLy9vcGVuIGZvb3Rub3RlUGlja2VyIHBvcHVwXHJcbiAgICBcclxufSIsImltcG9ydCB7XHJcbiAgICBFZGl0b3IsXHJcbiAgICBFZGl0b3JQb3NpdGlvbixcclxuICAgIEVkaXRvclN1Z2dlc3QsXHJcbiAgICBFZGl0b3JTdWdnZXN0Q29udGV4dCxcclxuICAgIEVkaXRvclN1Z2dlc3RUcmlnZ2VySW5mbyxcclxuICAgIE1hcmtkb3duVmlldyxcclxuICAgIFRGaWxlLFxyXG59IGZyb20gXCJvYnNpZGlhblwiO1xyXG5pbXBvcnQgRm9vdG5vdGVQbHVnaW4gZnJvbSBcIi4vbWFpblwiO1xyXG5pbXBvcnQgeyBBbGxNYXJrZXJzLCBFeHRyYWN0TmFtZUZyb21Gb290bm90ZSB9IGZyb20gXCIuL2luc2VydC1vci1uYXZpZ2F0ZS1mb290bm90ZXNcIlxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBBdXRvY29tcGxldGUgZXh0ZW5kcyBFZGl0b3JTdWdnZXN0PFJlZ0V4cE1hdGNoQXJyYXk+IHtcclxuICAgIHBsdWdpbjogRm9vdG5vdGVQbHVnaW47XHJcbiAgICBsYXRlc3RUcmlnZ2VySW5mbzogRWRpdG9yU3VnZ2VzdFRyaWdnZXJJbmZvO1xyXG4gICAgY3Vyc29yUG9zaXRpb246IEVkaXRvclBvc2l0aW9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBsdWdpbjogRm9vdG5vdGVQbHVnaW4pIHtcclxuICAgICAgICBzdXBlcihwbHVnaW4uYXBwKTtcclxuICAgICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcclxuICAgIH1cclxuXHJcbiAgICBvblRyaWdnZXIoXHJcbiAgICAgICAgY3Vyc29yUG9zaXRpb246IEVkaXRvclBvc2l0aW9uLCBcclxuICAgICAgICBkb2M6IEVkaXRvciwgXHJcbiAgICAgICAgZmlsZTogVEZpbGVcclxuICAgICk6IEVkaXRvclN1Z2dlc3RUcmlnZ2VySW5mbyB8IG51bGx7XHJcbiAgICAgICAgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZUF1dG9TdWdnZXN0KSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtZFZpZXcgPSBhcHAud29ya3NwYWNlLmdldEFjdGl2ZVZpZXdPZlR5cGUoTWFya2Rvd25WaWV3KTtcclxuICAgICAgICAgICAgY29uc3QgbGluZVRleHQgPSBkb2MuZ2V0TGluZShjdXJzb3JQb3NpdGlvbi5saW5lKTtcclxuICAgICAgICAgICAgY29uc3QgbWFya2Rvd25UZXh0ID0gbWRWaWV3LmRhdGE7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgcmVPbmx5TWFya2Vyc01hdGNoZXMgPSBsaW5lVGV4dC5tYXRjaChBbGxNYXJrZXJzKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBtYXJrZXJUYXJnZXQgPSBudWxsO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXhPZk1hcmtlckluTGluZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVPbmx5TWFya2Vyc01hdGNoZXMpe1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gcmVPbmx5TWFya2Vyc01hdGNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWFya2VyID0gcmVPbmx5TWFya2Vyc01hdGNoZXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hcmtlciAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhPZk1hcmtlckluTGluZSA9IGxpbmVUZXh0LmluZGV4T2YobWFya2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yUG9zaXRpb24uY2ggPj0gaW5kZXhPZk1hcmtlckluTGluZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yUG9zaXRpb24uY2ggPD0gaW5kZXhPZk1hcmtlckluTGluZSArIG1hcmtlci5sZW5ndGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXJUYXJnZXQgPSBtYXJrZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1hcmtlclRhcmdldCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvL2V4dHJhY3QgZm9vdG5vdGVcclxuICAgICAgICAgICAgICAgIGxldCBtYXRjaCA9IG1hcmtlclRhcmdldC5tYXRjaChFeHRyYWN0TmFtZUZyb21Gb290bm90ZSlcclxuICAgICAgICAgICAgICAgIC8vZmluZCBpZiB0aGlzIGZvb3Rub3RlIGV4aXN0cyBieSBsaXN0aW5nIGV4aXN0aW5nIGZvb3Rub3RlIGRldGFpbHNcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb290bm90ZUlkID0gbWF0Y2hbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvb3Rub3RlSWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhdGVzdFRyaWdnZXJJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBjdXJzb3JQb3NpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2g6IGluZGV4T2ZNYXJrZXJJbkxpbmUgKyAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IGN1cnNvclBvc2l0aW9uLmxpbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeTogZm9vdG5vdGVJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sYXRlc3RUcmlnZ2VySW5mb1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBGb290bm90ZV9EZXRhaWxfTmFtZXNfQW5kX1RleHQgPSAvXFxbXFxeKFteXFxbXFxdXSspXFxdOiguKyg/Olxcbig/Oig/IVxcW1xcXlteXFxbXFxdXStcXF06KS4pKykqKS9nO1xyXG5cclxuICAgIEV4dHJhY3RfRm9vdG5vdGVfRGV0YWlsX05hbWVzX0FuZF9UZXh0KFxyXG4gICAgICAgIGRvYzogRWRpdG9yXHJcbiAgICApIHtcclxuICAgICAgICAvL3NlYXJjaCBlYWNoIGxpbmUgZm9yIGZvb3Rub3RlIGRldGFpbHMgYW5kIGFkZCB0byBsaXN0XHJcbiAgICAgICAgLy9zYXZlIHRoZSBmb290bm90ZSBkZXRhaWwgbmFtZSBhcyBjYXB0dXJlIGdyb3VwIDFcclxuICAgICAgICAvL3NhdmUgdGhlIGZvb3Rub3RlIGRldGFpbCB0ZXh0IGFzIGNhcHR1cmUgZ3JvdXAgMlxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkb2NUZXh0OnN0cmluZyA9IGRvYy5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBBcnJheS5mcm9tKGRvY1RleHQubWF0Y2hBbGwodGhpcy5Gb290bm90ZV9EZXRhaWxfTmFtZXNfQW5kX1RleHQpKTtcclxuICAgICAgICByZXR1cm4gbWF0Y2hlcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdWdnZXN0aW9ucyA9IChjb250ZXh0OiBFZGl0b3JTdWdnZXN0Q29udGV4dCk6IFJlZ0V4cE1hdGNoQXJyYXlbXSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBxdWVyeSB9ID0gY29udGV4dDtcclxuXHJcbiAgICAgICAgY29uc3QgbWRWaWV3ID0gYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XHJcbiAgICAgICAgY29uc3QgZG9jID0gbWRWaWV3LmVkaXRvcjtcclxuICAgICAgICBjb25zdCBtYXRjaGVzID0gdGhpcy5FeHRyYWN0X0Zvb3Rub3RlX0RldGFpbF9OYW1lc19BbmRfVGV4dChkb2MpXHJcbiAgICAgICAgY29uc3QgZmlsdGVyZWRSZXN1bHRzOiBSZWdFeHBNYXRjaEFycmF5W10gPSBtYXRjaGVzLmZpbHRlcigoZW50cnkpID0+IGVudHJ5WzFdLmluY2x1ZGVzKHF1ZXJ5KSk7XHJcbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkUmVzdWx0c1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXJTdWdnZXN0aW9uKFxyXG4gICAgICAgIHZhbHVlOiBSZWdFeHBNYXRjaEFycmF5LCBcclxuICAgICAgICBlbDogSFRNTEVsZW1lbnRcclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIGVsLmNyZWF0ZUVsKFwiYlwiLCB7IHRleHQ6IHZhbHVlWzFdIH0pO1xyXG4gICAgICAgIGVsLmNyZWF0ZUVsKFwiYnJcIik7XHJcbiAgICAgICAgZWwuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogdmFsdWVbMl19KTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RTdWdnZXN0aW9uKFxyXG4gICAgICAgIHZhbHVlOiBSZWdFeHBNYXRjaEFycmF5LCBcclxuICAgICAgICBldnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50XHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB7IGNvbnRleHQsIHBsdWdpbiB9ID0gdGhpcztcclxuICAgICAgICBpZiAoIWNvbnRleHQpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgbWRWaWV3ID0gYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XHJcbiAgICAgICAgY29uc3QgZG9jID0gbWRWaWV3LmVkaXRvcjtcclxuXHJcbiAgICAgICAgY29uc3QgZmllbGQgPSB2YWx1ZVsxXTtcclxuICAgICAgICBjb25zdCByZXBsYWNlbWVudCA9IGAke2ZpZWxkfWA7XHJcblxyXG4gICAgICAgIGNvbnRleHQuZWRpdG9yLnJlcGxhY2VSYW5nZShcclxuICAgICAgICAgICAgcmVwbGFjZW1lbnQsXHJcbiAgICAgICAgICAgIHRoaXMubGF0ZXN0VHJpZ2dlckluZm8uc3RhcnQsXHJcbiAgICAgICAgICAgIHRoaXMubGF0ZXN0VHJpZ2dlckluZm8uZW5kLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBcclxuICBhZGRJY29uLFxyXG4gIEVkaXRvciwgXHJcbiAgRWRpdG9yUG9zaXRpb24sIFxyXG4gIEVkaXRvclN1Z2dlc3QsIFxyXG4gIEVkaXRvclN1Z2dlc3RDb250ZXh0LFxyXG4gIEVkaXRvclN1Z2dlc3RUcmlnZ2VySW5mbyxcclxuICBNYXJrZG93blZpZXcsIFxyXG4gIFBsdWdpblxyXG59IGZyb20gXCJvYnNpZGlhblwiO1xyXG5cclxuaW1wb3J0IHsgRm9vdG5vdGVQbHVnaW5TZXR0aW5nVGFiLCBGb290bm90ZVBsdWdpblNldHRpbmdzLCBERUZBVUxUX1NFVFRJTkdTIH0gZnJvbSBcIi4vc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQXV0b2NvbXBsZXRlIH0gZnJvbSBcIi4vYXV0b3N1Z2dlc3RcIlxyXG5pbXBvcnQgeyBpbnNlcnRBdXRvbnVtRm9vdG5vdGUsaW5zZXJ0TmFtZWRGb290bm90ZSB9IGZyb20gXCIuL2luc2VydC1vci1uYXZpZ2F0ZS1mb290bm90ZXNcIjtcclxuXHJcbi8vQWRkIGNoZXZyb24tdXAtc3F1YXJlIGljb24gZnJvbSBsdWNpZGUgZm9yIG1vYmlsZSB0b29sYmFyICh0ZW1wb3JhcnkgdW50aWwgT2JzaWRpYW4gdXBkYXRlcyB0byBMdWNpZGUgdjAuMTMwLjApXHJcbmFkZEljb24oXCJjaGV2cm9uLXVwLXNxdWFyZVwiLCBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIGNsYXNzPVwibHVjaWRlIGx1Y2lkZS1jaGV2cm9uLXVwLXNxdWFyZVwiPjxyZWN0IHdpZHRoPVwiMThcIiBoZWlnaHQ9XCIxOFwiIHg9XCIzXCIgeT1cIjNcIiByeD1cIjJcIiByeT1cIjJcIj48L3JlY3Q+PHBvbHlsaW5lIHBvaW50cz1cIjgsMTQgMTIsMTAgMTYsMTRcIj48L3BvbHlsaW5lPjwvc3ZnPmApO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9vdG5vdGVQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xyXG4gIHB1YmxpYyBzZXR0aW5nczogRm9vdG5vdGVQbHVnaW5TZXR0aW5ncztcclxuXHJcbiAgYXN5bmMgb25sb2FkKCkge1xyXG4gICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcclxuXHJcbiAgICB0aGlzLnJlZ2lzdGVyRWRpdG9yU3VnZ2VzdChuZXcgQXV0b2NvbXBsZXRlKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLmFkZENvbW1hbmQoe1xyXG4gICAgICBpZDogXCJpbnNlcnQtYXV0b251bWJlcmVkLWZvb3Rub3RlXCIsXHJcbiAgICAgIG5hbWU6IFwiSW5zZXJ0IC8gTmF2aWdhdGUgQXV0by1OdW1iZXJlZCBGb290bm90ZVwiLFxyXG4gICAgICBpY29uOiBcInBsdXMtc3F1YXJlXCIsXHJcbiAgICAgIGNoZWNrQ2FsbGJhY2s6IChjaGVja2luZzogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgIGlmIChjaGVja2luZylcclxuICAgICAgICAgIHJldHVybiAhIXRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XHJcbiAgICAgICAgaW5zZXJ0QXV0b251bUZvb3Rub3RlKHRoaXMpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmFkZENvbW1hbmQoe1xyXG4gICAgICBpZDogXCJpbnNlcnQtbmFtZWQtZm9vdG5vdGVcIixcclxuICAgICAgbmFtZTogXCJJbnNlcnQgLyBOYXZpZ2F0ZSBOYW1lZCBGb290bm90ZVwiLFxyXG4gICAgICBpY29uOiBcImNoZXZyb24tdXAtc3F1YXJlXCIsXHJcbiAgICAgIGNoZWNrQ2FsbGJhY2s6IChjaGVja2luZzogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgIGlmIChjaGVja2luZylcclxuICAgICAgICAgIHJldHVybiAhIXRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XHJcbiAgICAgICAgaW5zZXJ0TmFtZWRGb290bm90ZSh0aGlzKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgXHJcbiAgICB0aGlzLmFkZFNldHRpbmdUYWIobmV3IEZvb3Rub3RlUGx1Z2luU2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgbG9hZFNldHRpbmdzKCkge1xyXG4gICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBzYXZlU2V0dGluZ3MoKSB7XHJcbiAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJQbHVnaW5TZXR0aW5nVGFiIiwiU2V0dGluZyIsIk1hcmtkb3duVmlldyIsIkVkaXRvclN1Z2dlc3QiLCJhZGRJY29uIiwiUGx1Z2luIl0sIm1hcHBpbmdz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
