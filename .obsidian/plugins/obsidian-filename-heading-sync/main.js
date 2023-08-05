'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
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
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function isExcalidraw(app, f) {
    if (f.extension === 'excalidraw' || /.*\.excalidraw\.md$/g.test(f.path)) {
        return true;
    }
    var fileCache = app.metadataCache.getFileCache(f);
    return (!!(fileCache === null || fileCache === void 0 ? void 0 : fileCache.frontmatter) && !!fileCache.frontmatter['excalidraw-plugin']);
}
function isExcluded(app, f) {
    if (isExcalidraw(app, f)) {
        return true;
    }
    return false;
}

var stockIllegalSymbols = /[\\/:|#^[\]]/g;
var DEFAULT_SETTINGS = {
    userIllegalSymbols: [],
    ignoredFiles: {},
    ignoreRegex: '',
    useFileOpenHook: true,
    useFileSaveHook: true,
    newHeadingStyle: "Prefix" /* Prefix */,
    replaceStyle: false,
    underlineString: '===',
};
var FilenameHeadingSyncPlugin = /** @class */ (function (_super) {
    __extends(FilenameHeadingSyncPlugin, _super);
    function FilenameHeadingSyncPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRenameInProgress = false;
        return _this;
    }
    FilenameHeadingSyncPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.registerEvent(this.app.vault.on('rename', function (file, oldPath) {
                            if (_this.settings.useFileSaveHook) {
                                return _this.handleSyncFilenameToHeading(file, oldPath);
                            }
                        }));
                        this.registerEvent(this.app.vault.on('modify', function (file) {
                            if (_this.settings.useFileSaveHook) {
                                return _this.handleSyncHeadingToFile(file);
                            }
                        }));
                        this.registerEvent(this.app.workspace.on('file-open', function (file) {
                            if (_this.settings.useFileOpenHook && file !== null) {
                                return _this.handleSyncFilenameToHeading(file, file.path);
                            }
                        }));
                        this.addSettingTab(new FilenameHeadingSyncSettingTab(this.app, this));
                        this.addCommand({
                            id: 'page-heading-sync-ignore-file',
                            name: 'Ignore current file',
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.settings.ignoredFiles[_this.app.workspace.getActiveFile().path] = null;
                                        _this.saveSettings();
                                    }
                                    return true;
                                }
                                return false;
                            },
                        });
                        this.addCommand({
                            id: 'sync-filename-to-heading',
                            name: 'Sync Filename to Heading',
                            editorCallback: function (editor, view) {
                                return _this.forceSyncFilenameToHeading(view.file);
                            },
                        });
                        this.addCommand({
                            id: 'sync-heading-to-filename',
                            name: 'Sync Heading to Filename',
                            editorCallback: function (editor, view) {
                                return _this.forceSyncHeadingToFilename(view.file);
                            },
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    FilenameHeadingSyncPlugin.prototype.fileIsIgnored = function (activeFile, path) {
        // check exclusions
        if (isExcluded(this.app, activeFile)) {
            return true;
        }
        // check manual ignore
        if (this.settings.ignoredFiles[path] !== undefined) {
            return true;
        }
        // check regex
        try {
            if (this.settings.ignoreRegex === '') {
                return;
            }
            var reg = new RegExp(this.settings.ignoreRegex);
            return reg.exec(path) !== null;
        }
        catch (_a) { }
        return false;
    };
    /**
     * Renames the file with the first heading found
     *
     * @param      {TAbstractFile}  file    The file
     */
    FilenameHeadingSyncPlugin.prototype.handleSyncHeadingToFile = function (file) {
        if (!(file instanceof obsidian.TFile)) {
            return;
        }
        if (file.extension !== 'md') {
            // just bail
            return;
        }
        // if currently opened file is not the same as the one that fired the event, skip
        // this is to make sure other events don't trigger this plugin
        if (this.app.workspace.getActiveFile() !== file) {
            return;
        }
        // if ignored, just bail
        if (this.fileIsIgnored(file, file.path)) {
            return;
        }
        this.forceSyncHeadingToFilename(file);
    };
    FilenameHeadingSyncPlugin.prototype.forceSyncHeadingToFilename = function (file) {
        var _this = this;
        this.app.vault.read(file).then(function (data) { return __awaiter(_this, void 0, void 0, function () {
            var lines, start, heading, sanitizedHeading, newPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lines = data.split('\n');
                        start = this.findNoteStart(lines);
                        heading = this.findHeading(lines, start);
                        if (heading === null)
                            return [2 /*return*/]; // no heading found, nothing to do here
                        sanitizedHeading = this.sanitizeHeading(heading.text);
                        if (!(sanitizedHeading.length > 0 &&
                            this.sanitizeHeading(file.basename) !== sanitizedHeading)) return [3 /*break*/, 2];
                        newPath = file.parent.path + "/" + sanitizedHeading + ".md";
                        this.isRenameInProgress = true;
                        return [4 /*yield*/, this.app.fileManager.renameFile(file, newPath)];
                    case 1:
                        _a.sent();
                        this.isRenameInProgress = false;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * Syncs the current filename to the first heading
     * Finds the first heading of the file, then replaces it with the filename
     *
     * @param      {TAbstractFile}  file     The file that fired the event
     * @param      {string}         oldPath  The old path
     */
    FilenameHeadingSyncPlugin.prototype.handleSyncFilenameToHeading = function (file, oldPath) {
        if (this.isRenameInProgress) {
            return;
        }
        if (!(file instanceof obsidian.TFile)) {
            return;
        }
        if (file.extension !== 'md') {
            // just bail
            return;
        }
        // if oldpath is ignored, hook in and update the new filepath to be ignored instead
        if (this.fileIsIgnored(file, oldPath.trim())) {
            // if filename didn't change, just bail, nothing to do here
            if (file.path === oldPath) {
                return;
            }
            // If filepath changed and the file was in the ignore list before,
            // remove it from the list and add the new one instead
            if (this.settings.ignoredFiles[oldPath]) {
                delete this.settings.ignoredFiles[oldPath];
                this.settings.ignoredFiles[file.path] = null;
                this.saveSettings();
            }
            return;
        }
        this.forceSyncFilenameToHeading(file);
    };
    FilenameHeadingSyncPlugin.prototype.forceSyncFilenameToHeading = function (file) {
        var _this = this;
        var sanitizedHeading = this.sanitizeHeading(file.basename);
        this.app.vault.read(file).then(function (data) {
            var lines = data.split('\n');
            var start = _this.findNoteStart(lines);
            var heading = _this.findHeading(lines, start);
            if (heading !== null) {
                if (_this.sanitizeHeading(heading.text) !== sanitizedHeading) {
                    _this.replaceHeading(file, lines, heading.lineNumber, heading.style, sanitizedHeading);
                }
            }
            else
                _this.insertHeading(file, lines, start, sanitizedHeading);
        });
    };
    /**
     * Finds the start of the note file, excluding frontmatter
     *
     * @param {string[]} fileLines array of the file's contents, line by line
     * @returns {number} zero-based index of the starting line of the note
     */
    FilenameHeadingSyncPlugin.prototype.findNoteStart = function (fileLines) {
        // check for frontmatter by checking if first line is a divider ('---')
        if (fileLines[0] === '---') {
            // find end of frontmatter
            // if no end is found, then it isn't really frontmatter and function will end up returning 0
            for (var i = 1; i < fileLines.length; i++) {
                if (fileLines[i] === '---') {
                    // end of frontmatter found, next line is start of note
                    return i + 1;
                }
            }
        }
        return 0;
    };
    /**
     * Finds the first heading of the note file
     *
     * @param {string[]} fileLines array of the file's contents, line by line
     * @param {number} startLine zero-based index of the starting line of the note
     * @returns {LinePointer | null} LinePointer to heading or null if no heading found
     */
    FilenameHeadingSyncPlugin.prototype.findHeading = function (fileLines, startLine) {
        for (var i = startLine; i < fileLines.length; i++) {
            if (fileLines[i].startsWith('# ')) {
                return {
                    lineNumber: i,
                    text: fileLines[i].substring(2),
                    style: "Prefix" /* Prefix */,
                };
            }
            else {
                if (fileLines[i + 1] !== undefined &&
                    fileLines[i + 1].match(/^=+$/) !== null) {
                    return {
                        lineNumber: i,
                        text: fileLines[i],
                        style: "Underline" /* Underline */,
                    };
                }
            }
        }
        return null; // no heading found
    };
    FilenameHeadingSyncPlugin.prototype.regExpEscape = function (str) {
        return String(str).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
    };
    FilenameHeadingSyncPlugin.prototype.sanitizeHeading = function (text) {
        var _this = this;
        // stockIllegalSymbols is a regExp object, but userIllegalSymbols is a list of strings and therefore they are handled separately.
        text = text.replace(stockIllegalSymbols, '');
        var userIllegalSymbolsEscaped = this.settings.userIllegalSymbols.map(function (str) { return _this.regExpEscape(str); });
        var userIllegalSymbolsRegExp = new RegExp(userIllegalSymbolsEscaped.join('|'), 'g');
        text = text.replace(userIllegalSymbolsRegExp, '');
        return text.trim();
    };
    /**
     * Insert the `heading` at `lineNumber` in `file`.
     *
     * @param {TFile} file the file to modify
     * @param {string[]} fileLines array of the file's contents, line by line
     * @param {number} lineNumber zero-based index of the line to replace
     * @param {string} text the new text
     */
    FilenameHeadingSyncPlugin.prototype.insertHeading = function (file, fileLines, lineNumber, heading) {
        var newStyle = this.settings.newHeadingStyle;
        switch (newStyle) {
            case "Underline" /* Underline */: {
                this.insertLineInFile(file, fileLines, lineNumber, "" + heading);
                this.insertLineInFile(file, fileLines, lineNumber + 1, this.settings.underlineString);
                break;
            }
            case "Prefix" /* Prefix */: {
                this.insertLineInFile(file, fileLines, lineNumber, "# " + heading);
                break;
            }
        }
    };
    /**
     * Modified `file` by replacing the heading at `lineNumber` with `newHeading`,
     * updating the heading style according the user settings.
     *
     * @param {TFile} file the file to modify
     * @param {string[]} fileLines array of the file's contents, line by line
     * @param {number} lineNumber zero-based index of the line to replace
     * @param {HeadingStyle} oldStyle the style of the original heading
     * @param {string} text the new text
     */
    FilenameHeadingSyncPlugin.prototype.replaceHeading = function (file, fileLines, lineNumber, oldStyle, newHeading) {
        var newStyle = this.settings.newHeadingStyle;
        var replaceStyle = this.settings.replaceStyle;
        // If replacing the style
        if (replaceStyle) {
            switch (newStyle) {
                // For underline style, replace heading line...
                case "Underline" /* Underline */: {
                    this.replaceLineInFile(file, fileLines, lineNumber, "" + newHeading);
                    //..., then add or replace underline.
                    switch (oldStyle) {
                        case "Prefix" /* Prefix */: {
                            this.insertLineInFile(file, fileLines, lineNumber + 1, this.settings.underlineString);
                            break;
                        }
                        case "Underline" /* Underline */: {
                            // Update underline with setting.
                            this.replaceLineInFile(file, fileLines, lineNumber + 1, this.settings.underlineString);
                            break;
                        }
                    }
                    break;
                }
                // For prefix style, replace heading line, and possibly delete underline
                case "Prefix" /* Prefix */: {
                    this.replaceLineInFile(file, fileLines, lineNumber, "# " + newHeading);
                    switch (oldStyle) {
                        case "Prefix" /* Prefix */: {
                            // nop
                            break;
                        }
                        case "Underline" /* Underline */: {
                            this.replaceLineInFile(file, fileLines, lineNumber + 1, '');
                            break;
                        }
                    }
                    break;
                }
            }
        }
        else {
            // If not replacing style, match
            switch (oldStyle) {
                case "Underline" /* Underline */: {
                    this.replaceLineInFile(file, fileLines, lineNumber, "" + newHeading);
                    break;
                }
                case "Prefix" /* Prefix */: {
                    this.replaceLineInFile(file, fileLines, lineNumber, "# " + newHeading);
                    break;
                }
            }
        }
    };
    /**
     * Modifies the file by replacing a particular line with new text.
     *
     * The function will add a newline character at the end of the replaced line.
     *
     * If the `lineNumber` parameter is higher than the index of the last line of the file
     * the function will add a newline character to the current last line and append a new
     * line at the end of the file with the new text (essentially a new last line).
     *
     * @param {TFile} file the file to modify
     * @param {string[]} fileLines array of the file's contents, line by line
     * @param {number} lineNumber zero-based index of the line to replace
     * @param {string} text the new text
     */
    FilenameHeadingSyncPlugin.prototype.replaceLineInFile = function (file, fileLines, lineNumber, text) {
        if (lineNumber >= fileLines.length) {
            fileLines.push(text + '\n');
        }
        else {
            fileLines[lineNumber] = text;
        }
        var data = fileLines.join('\n');
        this.app.vault.modify(file, data);
    };
    /**
     * Modifies the file by inserting a line with specified text.
     *
     * The function will add a newline character at the end of the inserted line.
     *
     * @param {TFile} file the file to modify
     * @param {string[]} fileLines array of the file's contents, line by line
     * @param {number} lineNumber zero-based index of where the line should be inserted
     * @param {string} text the text that the line shall contain
     */
    FilenameHeadingSyncPlugin.prototype.insertLineInFile = function (file, fileLines, lineNumber, text) {
        if (lineNumber >= fileLines.length) {
            fileLines.push(text + '\n');
        }
        else {
            fileLines.splice(lineNumber, 0, text);
        }
        var data = fileLines.join('\n');
        this.app.vault.modify(file, data);
    };
    FilenameHeadingSyncPlugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [{}, DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    FilenameHeadingSyncPlugin.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return FilenameHeadingSyncPlugin;
}(obsidian.Plugin));
var FilenameHeadingSyncSettingTab = /** @class */ (function (_super) {
    __extends(FilenameHeadingSyncSettingTab, _super);
    function FilenameHeadingSyncSettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        _this.app = app;
        return _this;
    }
    FilenameHeadingSyncSettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        var regexIgnoredFilesDiv;
        var renderRegexIgnoredFiles = function (div) {
            // empty existing div
            div.innerHTML = '';
            if (_this.plugin.settings.ignoreRegex === '') {
                return;
            }
            try {
                var files = _this.app.vault.getFiles();
                var reg_1 = new RegExp(_this.plugin.settings.ignoreRegex);
                files
                    .filter(function (file) { return reg_1.exec(file.path) !== null; })
                    .forEach(function (el) {
                    new obsidian.Setting(div).setDesc(el.path);
                });
            }
            catch (e) {
                return;
            }
        };
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Filename Heading Sync' });
        containerEl.createEl('p', {
            text: 'This plugin will overwrite the first heading found in a file with the filename.',
        });
        containerEl.createEl('p', {
            text: 'If no header is found, will insert a new one at the first line (after frontmatter).',
        });
        new obsidian.Setting(containerEl)
            .setName('Custom Illegal Characters/Strings')
            .setDesc('Type characters/strings separated by a comma. This input is space sensitive.')
            .addText(function (text) {
            return text
                .setPlaceholder('[],#,...')
                .setValue(_this.plugin.settings.userIllegalSymbols.join())
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.userIllegalSymbols = value.split(',');
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName('Ignore Regex Rule')
            .setDesc('Ignore rule in RegEx format. All files listed below will get ignored by this plugin.')
            .addText(function (text) {
            return text
                .setPlaceholder('MyFolder/.*')
                .setValue(_this.plugin.settings.ignoreRegex)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            try {
                                new RegExp(value);
                                this.plugin.settings.ignoreRegex = value;
                            }
                            catch (_b) {
                                this.plugin.settings.ignoreRegex = '';
                            }
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            renderRegexIgnoredFiles(regexIgnoredFilesDiv);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName('Use File Open Hook')
            .setDesc('Whether this plugin should trigger when a file is opened, and not just on save. Disable this when you notice conflicts with other plugins that also act on file open.')
            .addToggle(function (toggle) {
            return toggle
                .setValue(_this.plugin.settings.useFileOpenHook)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.useFileOpenHook = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName('Use File Save Hook')
            .setDesc('Whether this plugin should trigger when a file is saved. Disable this when you want to trigger sync only manually.')
            .addToggle(function (toggle) {
            return toggle
                .setValue(_this.plugin.settings.useFileSaveHook)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.useFileSaveHook = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName('New Heading Style')
            .setDesc('Which Markdown heading style to use when creating new headings: Prefix ("# Heading") or Underline ("Heading\\n===").')
            .addDropdown(function (cb) {
            return cb
                .addOption("Prefix" /* Prefix */, 'Prefix')
                .addOption("Underline" /* Underline */, 'Underline')
                .setValue(_this.plugin.settings.newHeadingStyle)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (value === 'Prefix') {
                                this.plugin.settings.newHeadingStyle = "Prefix" /* Prefix */;
                            }
                            if (value === 'Underline') {
                                this.plugin.settings.newHeadingStyle = "Underline" /* Underline */;
                            }
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName('Replace Heading Style')
            .setDesc('Whether this plugin should replace existing heading styles when updating headings.')
            .addToggle(function (toggle) {
            return toggle
                .setValue(_this.plugin.settings.replaceStyle)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.replaceStyle = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName('Underline String')
            .setDesc('The string to use when insert Underline-style headings; should be some number of "="s.')
            .addText(function (text) {
            return text
                .setPlaceholder('===')
                .setValue(_this.plugin.settings.underlineString)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.underlineString = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        containerEl.createEl('h2', { text: 'Ignored Files By Regex' });
        containerEl.createEl('p', {
            text: 'All files matching the above RegEx will get listed here',
        });
        regexIgnoredFilesDiv = containerEl.createDiv('test');
        renderRegexIgnoredFiles(regexIgnoredFilesDiv);
        containerEl.createEl('h2', { text: 'Manually Ignored Files' });
        containerEl.createEl('p', {
            text: 'You can ignore files from this plugin by using the "ignore this file" command',
        });
        var _loop_1 = function (key) {
            var ignoredFilesSettingsObj = new obsidian.Setting(containerEl).setDesc(key);
            ignoredFilesSettingsObj.addButton(function (button) {
                button.setButtonText('Delete').onClick(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                delete this.plugin.settings.ignoredFiles[key];
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
                                this.display();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        };
        // go over all ignored files and add them
        for (var key in this.plugin.settings.ignoredFiles) {
            _loop_1(key);
        }
    };
    return FilenameHeadingSyncSettingTab;
}(obsidian.PluginSettingTab));

module.exports = FilenameHeadingSyncPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsImV4Y2x1c2lvbnMudHMiLCJtYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuIiwiaW1wb3J0IHsgQXBwLCBURmlsZSB9IGZyb20gJ29ic2lkaWFuJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXhjYWxpZHJhdyhhcHA6IEFwcCwgZjogVEZpbGUpIHtcbiAgaWYgKGYuZXh0ZW5zaW9uID09PSAnZXhjYWxpZHJhdycgfHwgLy4qXFwuZXhjYWxpZHJhd1xcLm1kJC9nLnRlc3QoZi5wYXRoKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGNvbnN0IGZpbGVDYWNoZSA9IGFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShmKTtcbiAgcmV0dXJuIChcbiAgICAhIWZpbGVDYWNoZT8uZnJvbnRtYXR0ZXIgJiYgISFmaWxlQ2FjaGUuZnJvbnRtYXR0ZXJbJ2V4Y2FsaWRyYXctcGx1Z2luJ11cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXhjbHVkZWQoYXBwOiBBcHAsIGY6IFRGaWxlKSB7XG4gIGlmIChpc0V4Y2FsaWRyYXcoYXBwLCBmKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuIiwiaW1wb3J0IHtcbiAgQXBwLFxuICBQbHVnaW4sXG4gIFBsdWdpblNldHRpbmdUYWIsXG4gIFNldHRpbmcsXG4gIFRBYnN0cmFjdEZpbGUsXG4gIFRGaWxlLFxuICBFZGl0b3IsXG4gIE1hcmtkb3duVmlldyxcbn0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHsgaXNFeGNsdWRlZCB9IGZyb20gJy4vZXhjbHVzaW9ucyc7XG5cbmNvbnN0IHN0b2NrSWxsZWdhbFN5bWJvbHMgPSAvW1xcXFwvOnwjXltcXF1dL2c7XG5cbi8vIE11c3QgYmUgU3RyaW5ncyB1bmxlc3Mgc2V0dGluZ3MgZGlhbG9nIGlzIHVwZGF0ZWQuXG5jb25zdCBlbnVtIEhlYWRpbmdTdHlsZSB7XG4gIFByZWZpeCA9ICdQcmVmaXgnLFxuICBVbmRlcmxpbmUgPSAnVW5kZXJsaW5lJyxcbn1cblxuaW50ZXJmYWNlIExpbmVQb2ludGVyIHtcbiAgbGluZU51bWJlcjogbnVtYmVyO1xuICB0ZXh0OiBzdHJpbmc7XG4gIHN0eWxlOiBIZWFkaW5nU3R5bGU7XG59XG5cbmludGVyZmFjZSBGaWxlbmFtZUhlYWRpbmdTeW5jUGx1Z2luU2V0dGluZ3Mge1xuICB1c2VySWxsZWdhbFN5bWJvbHM6IHN0cmluZ1tdO1xuICBpZ25vcmVSZWdleDogc3RyaW5nO1xuICBpZ25vcmVkRmlsZXM6IHsgW2tleTogc3RyaW5nXTogbnVsbCB9O1xuICB1c2VGaWxlT3Blbkhvb2s6IGJvb2xlYW47XG4gIHVzZUZpbGVTYXZlSG9vazogYm9vbGVhbjtcbiAgbmV3SGVhZGluZ1N0eWxlOiBIZWFkaW5nU3R5bGU7XG4gIHJlcGxhY2VTdHlsZTogYm9vbGVhbjtcbiAgdW5kZXJsaW5lU3RyaW5nOiBzdHJpbmc7XG59XG5cbmNvbnN0IERFRkFVTFRfU0VUVElOR1M6IEZpbGVuYW1lSGVhZGluZ1N5bmNQbHVnaW5TZXR0aW5ncyA9IHtcbiAgdXNlcklsbGVnYWxTeW1ib2xzOiBbXSxcbiAgaWdub3JlZEZpbGVzOiB7fSxcbiAgaWdub3JlUmVnZXg6ICcnLFxuICB1c2VGaWxlT3Blbkhvb2s6IHRydWUsXG4gIHVzZUZpbGVTYXZlSG9vazogdHJ1ZSxcbiAgbmV3SGVhZGluZ1N0eWxlOiBIZWFkaW5nU3R5bGUuUHJlZml4LFxuICByZXBsYWNlU3R5bGU6IGZhbHNlLFxuICB1bmRlcmxpbmVTdHJpbmc6ICc9PT0nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlsZW5hbWVIZWFkaW5nU3luY1BsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG4gIGlzUmVuYW1lSW5Qcm9ncmVzczogYm9vbGVhbiA9IGZhbHNlO1xuICBzZXR0aW5nczogRmlsZW5hbWVIZWFkaW5nU3luY1BsdWdpblNldHRpbmdzO1xuXG4gIGFzeW5jIG9ubG9hZCgpIHtcbiAgICBhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xuXG4gICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgdGhpcy5hcHAudmF1bHQub24oJ3JlbmFtZScsIChmaWxlLCBvbGRQYXRoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnVzZUZpbGVTYXZlSG9vaykge1xuICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVN5bmNGaWxlbmFtZVRvSGVhZGluZyhmaWxlLCBvbGRQYXRoKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXG4gICAgICB0aGlzLmFwcC52YXVsdC5vbignbW9kaWZ5JywgKGZpbGUpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MudXNlRmlsZVNhdmVIb29rKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlU3luY0hlYWRpbmdUb0ZpbGUoZmlsZSk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXG4gICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub24oJ2ZpbGUtb3BlbicsIChmaWxlKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnVzZUZpbGVPcGVuSG9vayAmJiBmaWxlICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlU3luY0ZpbGVuYW1lVG9IZWFkaW5nKGZpbGUsIGZpbGUucGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLmFkZFNldHRpbmdUYWIobmV3IEZpbGVuYW1lSGVhZGluZ1N5bmNTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6ICdwYWdlLWhlYWRpbmctc3luYy1pZ25vcmUtZmlsZScsXG4gICAgICBuYW1lOiAnSWdub3JlIGN1cnJlbnQgZmlsZScsXG4gICAgICBjaGVja0NhbGxiYWNrOiAoY2hlY2tpbmc6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgbGV0IGxlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZjtcbiAgICAgICAgaWYgKGxlYWYpIHtcbiAgICAgICAgICBpZiAoIWNoZWNraW5nKSB7XG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLmlnbm9yZWRGaWxlc1tcbiAgICAgICAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZUZpbGUoKS5wYXRoXG4gICAgICAgICAgICBdID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6ICdzeW5jLWZpbGVuYW1lLXRvLWhlYWRpbmcnLFxuICAgICAgbmFtZTogJ1N5bmMgRmlsZW5hbWUgdG8gSGVhZGluZycsXG4gICAgICBlZGl0b3JDYWxsYmFjazogKGVkaXRvcjogRWRpdG9yLCB2aWV3OiBNYXJrZG93blZpZXcpID0+XG4gICAgICAgIHRoaXMuZm9yY2VTeW5jRmlsZW5hbWVUb0hlYWRpbmcodmlldy5maWxlKSxcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogJ3N5bmMtaGVhZGluZy10by1maWxlbmFtZScsXG4gICAgICBuYW1lOiAnU3luYyBIZWFkaW5nIHRvIEZpbGVuYW1lJyxcbiAgICAgIGVkaXRvckNhbGxiYWNrOiAoZWRpdG9yOiBFZGl0b3IsIHZpZXc6IE1hcmtkb3duVmlldykgPT5cbiAgICAgICAgdGhpcy5mb3JjZVN5bmNIZWFkaW5nVG9GaWxlbmFtZSh2aWV3LmZpbGUpLFxuICAgIH0pO1xuICB9XG5cbiAgZmlsZUlzSWdub3JlZChhY3RpdmVGaWxlOiBURmlsZSwgcGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgLy8gY2hlY2sgZXhjbHVzaW9uc1xuICAgIGlmIChpc0V4Y2x1ZGVkKHRoaXMuYXBwLCBhY3RpdmVGaWxlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgbWFudWFsIGlnbm9yZVxuICAgIGlmICh0aGlzLnNldHRpbmdzLmlnbm9yZWRGaWxlc1twYXRoXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayByZWdleFxuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5pZ25vcmVSZWdleCA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZWcgPSBuZXcgUmVnRXhwKHRoaXMuc2V0dGluZ3MuaWdub3JlUmVnZXgpO1xuICAgICAgcmV0dXJuIHJlZy5leGVjKHBhdGgpICE9PSBudWxsO1xuICAgIH0gY2F0Y2gge31cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5hbWVzIHRoZSBmaWxlIHdpdGggdGhlIGZpcnN0IGhlYWRpbmcgZm91bmRcbiAgICpcbiAgICogQHBhcmFtICAgICAge1RBYnN0cmFjdEZpbGV9ICBmaWxlICAgIFRoZSBmaWxlXG4gICAqL1xuICBoYW5kbGVTeW5jSGVhZGluZ1RvRmlsZShmaWxlOiBUQWJzdHJhY3RGaWxlKSB7XG4gICAgaWYgKCEoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChmaWxlLmV4dGVuc2lvbiAhPT0gJ21kJykge1xuICAgICAgLy8ganVzdCBiYWlsXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gaWYgY3VycmVudGx5IG9wZW5lZCBmaWxlIGlzIG5vdCB0aGUgc2FtZSBhcyB0aGUgb25lIHRoYXQgZmlyZWQgdGhlIGV2ZW50LCBza2lwXG4gICAgLy8gdGhpcyBpcyB0byBtYWtlIHN1cmUgb3RoZXIgZXZlbnRzIGRvbid0IHRyaWdnZXIgdGhpcyBwbHVnaW5cbiAgICBpZiAodGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZUZpbGUoKSAhPT0gZmlsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGlmIGlnbm9yZWQsIGp1c3QgYmFpbFxuICAgIGlmICh0aGlzLmZpbGVJc0lnbm9yZWQoZmlsZSwgZmlsZS5wYXRoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZm9yY2VTeW5jSGVhZGluZ1RvRmlsZW5hbWUoZmlsZSk7XG4gIH1cblxuICBmb3JjZVN5bmNIZWFkaW5nVG9GaWxlbmFtZShmaWxlOiBURmlsZSkge1xuICAgIHRoaXMuYXBwLnZhdWx0LnJlYWQoZmlsZSkudGhlbihhc3luYyAoZGF0YSkgPT4ge1xuICAgICAgY29uc3QgbGluZXMgPSBkYXRhLnNwbGl0KCdcXG4nKTtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5maW5kTm90ZVN0YXJ0KGxpbmVzKTtcbiAgICAgIGNvbnN0IGhlYWRpbmcgPSB0aGlzLmZpbmRIZWFkaW5nKGxpbmVzLCBzdGFydCk7XG5cbiAgICAgIGlmIChoZWFkaW5nID09PSBudWxsKSByZXR1cm47IC8vIG5vIGhlYWRpbmcgZm91bmQsIG5vdGhpbmcgdG8gZG8gaGVyZVxuXG4gICAgICBjb25zdCBzYW5pdGl6ZWRIZWFkaW5nID0gdGhpcy5zYW5pdGl6ZUhlYWRpbmcoaGVhZGluZy50ZXh0KTtcbiAgICAgIGlmIChcbiAgICAgICAgc2FuaXRpemVkSGVhZGluZy5sZW5ndGggPiAwICYmXG4gICAgICAgIHRoaXMuc2FuaXRpemVIZWFkaW5nKGZpbGUuYmFzZW5hbWUpICE9PSBzYW5pdGl6ZWRIZWFkaW5nXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgbmV3UGF0aCA9IGAke2ZpbGUucGFyZW50LnBhdGh9LyR7c2FuaXRpemVkSGVhZGluZ30ubWRgO1xuICAgICAgICB0aGlzLmlzUmVuYW1lSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAgIGF3YWl0IHRoaXMuYXBwLmZpbGVNYW5hZ2VyLnJlbmFtZUZpbGUoZmlsZSwgbmV3UGF0aCk7XG4gICAgICAgIHRoaXMuaXNSZW5hbWVJblByb2dyZXNzID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU3luY3MgdGhlIGN1cnJlbnQgZmlsZW5hbWUgdG8gdGhlIGZpcnN0IGhlYWRpbmdcbiAgICogRmluZHMgdGhlIGZpcnN0IGhlYWRpbmcgb2YgdGhlIGZpbGUsIHRoZW4gcmVwbGFjZXMgaXQgd2l0aCB0aGUgZmlsZW5hbWVcbiAgICpcbiAgICogQHBhcmFtICAgICAge1RBYnN0cmFjdEZpbGV9ICBmaWxlICAgICBUaGUgZmlsZSB0aGF0IGZpcmVkIHRoZSBldmVudFxuICAgKiBAcGFyYW0gICAgICB7c3RyaW5nfSAgICAgICAgIG9sZFBhdGggIFRoZSBvbGQgcGF0aFxuICAgKi9cbiAgaGFuZGxlU3luY0ZpbGVuYW1lVG9IZWFkaW5nKGZpbGU6IFRBYnN0cmFjdEZpbGUsIG9sZFBhdGg6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmlzUmVuYW1lSW5Qcm9ncmVzcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghKGZpbGUgaW5zdGFuY2VvZiBURmlsZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZmlsZS5leHRlbnNpb24gIT09ICdtZCcpIHtcbiAgICAgIC8vIGp1c3QgYmFpbFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGlmIG9sZHBhdGggaXMgaWdub3JlZCwgaG9vayBpbiBhbmQgdXBkYXRlIHRoZSBuZXcgZmlsZXBhdGggdG8gYmUgaWdub3JlZCBpbnN0ZWFkXG4gICAgaWYgKHRoaXMuZmlsZUlzSWdub3JlZChmaWxlLCBvbGRQYXRoLnRyaW0oKSkpIHtcbiAgICAgIC8vIGlmIGZpbGVuYW1lIGRpZG4ndCBjaGFuZ2UsIGp1c3QgYmFpbCwgbm90aGluZyB0byBkbyBoZXJlXG4gICAgICBpZiAoZmlsZS5wYXRoID09PSBvbGRQYXRoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgZmlsZXBhdGggY2hhbmdlZCBhbmQgdGhlIGZpbGUgd2FzIGluIHRoZSBpZ25vcmUgbGlzdCBiZWZvcmUsXG4gICAgICAvLyByZW1vdmUgaXQgZnJvbSB0aGUgbGlzdCBhbmQgYWRkIHRoZSBuZXcgb25lIGluc3RlYWRcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmlnbm9yZWRGaWxlc1tvbGRQYXRoXSkge1xuICAgICAgICBkZWxldGUgdGhpcy5zZXR0aW5ncy5pZ25vcmVkRmlsZXNbb2xkUGF0aF07XG4gICAgICAgIHRoaXMuc2V0dGluZ3MuaWdub3JlZEZpbGVzW2ZpbGUucGF0aF0gPSBudWxsO1xuICAgICAgICB0aGlzLnNhdmVTZXR0aW5ncygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZm9yY2VTeW5jRmlsZW5hbWVUb0hlYWRpbmcoZmlsZSk7XG4gIH1cblxuICBmb3JjZVN5bmNGaWxlbmFtZVRvSGVhZGluZyhmaWxlOiBURmlsZSkge1xuICAgIGNvbnN0IHNhbml0aXplZEhlYWRpbmcgPSB0aGlzLnNhbml0aXplSGVhZGluZyhmaWxlLmJhc2VuYW1lKTtcbiAgICB0aGlzLmFwcC52YXVsdC5yZWFkKGZpbGUpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGNvbnN0IGxpbmVzID0gZGF0YS5zcGxpdCgnXFxuJyk7XG4gICAgICBjb25zdCBzdGFydCA9IHRoaXMuZmluZE5vdGVTdGFydChsaW5lcyk7XG4gICAgICBjb25zdCBoZWFkaW5nID0gdGhpcy5maW5kSGVhZGluZyhsaW5lcywgc3RhcnQpO1xuXG4gICAgICBpZiAoaGVhZGluZyAhPT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5zYW5pdGl6ZUhlYWRpbmcoaGVhZGluZy50ZXh0KSAhPT0gc2FuaXRpemVkSGVhZGluZykge1xuICAgICAgICAgIHRoaXMucmVwbGFjZUhlYWRpbmcoXG4gICAgICAgICAgICBmaWxlLFxuICAgICAgICAgICAgbGluZXMsXG4gICAgICAgICAgICBoZWFkaW5nLmxpbmVOdW1iZXIsXG4gICAgICAgICAgICBoZWFkaW5nLnN0eWxlLFxuICAgICAgICAgICAgc2FuaXRpemVkSGVhZGluZyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgdGhpcy5pbnNlcnRIZWFkaW5nKGZpbGUsIGxpbmVzLCBzdGFydCwgc2FuaXRpemVkSGVhZGluZyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmluZHMgdGhlIHN0YXJ0IG9mIHRoZSBub3RlIGZpbGUsIGV4Y2x1ZGluZyBmcm9udG1hdHRlclxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWxlTGluZXMgYXJyYXkgb2YgdGhlIGZpbGUncyBjb250ZW50cywgbGluZSBieSBsaW5lXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IHplcm8tYmFzZWQgaW5kZXggb2YgdGhlIHN0YXJ0aW5nIGxpbmUgb2YgdGhlIG5vdGVcbiAgICovXG4gIGZpbmROb3RlU3RhcnQoZmlsZUxpbmVzOiBzdHJpbmdbXSkge1xuICAgIC8vIGNoZWNrIGZvciBmcm9udG1hdHRlciBieSBjaGVja2luZyBpZiBmaXJzdCBsaW5lIGlzIGEgZGl2aWRlciAoJy0tLScpXG4gICAgaWYgKGZpbGVMaW5lc1swXSA9PT0gJy0tLScpIHtcbiAgICAgIC8vIGZpbmQgZW5kIG9mIGZyb250bWF0dGVyXG4gICAgICAvLyBpZiBubyBlbmQgaXMgZm91bmQsIHRoZW4gaXQgaXNuJ3QgcmVhbGx5IGZyb250bWF0dGVyIGFuZCBmdW5jdGlvbiB3aWxsIGVuZCB1cCByZXR1cm5pbmcgMFxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBmaWxlTGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGZpbGVMaW5lc1tpXSA9PT0gJy0tLScpIHtcbiAgICAgICAgICAvLyBlbmQgb2YgZnJvbnRtYXR0ZXIgZm91bmQsIG5leHQgbGluZSBpcyBzdGFydCBvZiBub3RlXG4gICAgICAgICAgcmV0dXJuIGkgKyAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIHRoZSBmaXJzdCBoZWFkaW5nIG9mIHRoZSBub3RlIGZpbGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gZmlsZUxpbmVzIGFycmF5IG9mIHRoZSBmaWxlJ3MgY29udGVudHMsIGxpbmUgYnkgbGluZVxuICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnRMaW5lIHplcm8tYmFzZWQgaW5kZXggb2YgdGhlIHN0YXJ0aW5nIGxpbmUgb2YgdGhlIG5vdGVcbiAgICogQHJldHVybnMge0xpbmVQb2ludGVyIHwgbnVsbH0gTGluZVBvaW50ZXIgdG8gaGVhZGluZyBvciBudWxsIGlmIG5vIGhlYWRpbmcgZm91bmRcbiAgICovXG4gIGZpbmRIZWFkaW5nKGZpbGVMaW5lczogc3RyaW5nW10sIHN0YXJ0TGluZTogbnVtYmVyKTogTGluZVBvaW50ZXIgfCBudWxsIHtcbiAgICBmb3IgKGxldCBpID0gc3RhcnRMaW5lOyBpIDwgZmlsZUxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZmlsZUxpbmVzW2ldLnN0YXJ0c1dpdGgoJyMgJykpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBsaW5lTnVtYmVyOiBpLFxuICAgICAgICAgIHRleHQ6IGZpbGVMaW5lc1tpXS5zdWJzdHJpbmcoMiksXG4gICAgICAgICAgc3R5bGU6IEhlYWRpbmdTdHlsZS5QcmVmaXgsXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZmlsZUxpbmVzW2kgKyAxXSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgZmlsZUxpbmVzW2kgKyAxXS5tYXRjaCgvXj0rJC8pICE9PSBudWxsXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsaW5lTnVtYmVyOiBpLFxuICAgICAgICAgICAgdGV4dDogZmlsZUxpbmVzW2ldLFxuICAgICAgICAgICAgc3R5bGU6IEhlYWRpbmdTdHlsZS5VbmRlcmxpbmUsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDsgLy8gbm8gaGVhZGluZyBmb3VuZFxuICB9XG5cbiAgcmVnRXhwRXNjYXBlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gU3RyaW5nKHN0cikucmVwbGFjZSgvW1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKTtcbiAgfVxuXG4gIHNhbml0aXplSGVhZGluZyh0ZXh0OiBzdHJpbmcpIHtcbiAgICAvLyBzdG9ja0lsbGVnYWxTeW1ib2xzIGlzIGEgcmVnRXhwIG9iamVjdCwgYnV0IHVzZXJJbGxlZ2FsU3ltYm9scyBpcyBhIGxpc3Qgb2Ygc3RyaW5ncyBhbmQgdGhlcmVmb3JlIHRoZXkgYXJlIGhhbmRsZWQgc2VwYXJhdGVseS5cbiAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKHN0b2NrSWxsZWdhbFN5bWJvbHMsICcnKTtcblxuICAgIGNvbnN0IHVzZXJJbGxlZ2FsU3ltYm9sc0VzY2FwZWQgPSB0aGlzLnNldHRpbmdzLnVzZXJJbGxlZ2FsU3ltYm9scy5tYXAoXG4gICAgICAoc3RyKSA9PiB0aGlzLnJlZ0V4cEVzY2FwZShzdHIpLFxuICAgICk7XG4gICAgY29uc3QgdXNlcklsbGVnYWxTeW1ib2xzUmVnRXhwID0gbmV3IFJlZ0V4cChcbiAgICAgIHVzZXJJbGxlZ2FsU3ltYm9sc0VzY2FwZWQuam9pbignfCcpLFxuICAgICAgJ2cnLFxuICAgICk7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSh1c2VySWxsZWdhbFN5bWJvbHNSZWdFeHAsICcnKTtcbiAgICByZXR1cm4gdGV4dC50cmltKCk7XG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0IHRoZSBgaGVhZGluZ2AgYXQgYGxpbmVOdW1iZXJgIGluIGBmaWxlYC5cbiAgICpcbiAgICogQHBhcmFtIHtURmlsZX0gZmlsZSB0aGUgZmlsZSB0byBtb2RpZnlcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gZmlsZUxpbmVzIGFycmF5IG9mIHRoZSBmaWxlJ3MgY29udGVudHMsIGxpbmUgYnkgbGluZVxuICAgKiBAcGFyYW0ge251bWJlcn0gbGluZU51bWJlciB6ZXJvLWJhc2VkIGluZGV4IG9mIHRoZSBsaW5lIHRvIHJlcGxhY2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgdGhlIG5ldyB0ZXh0XG4gICAqL1xuICBpbnNlcnRIZWFkaW5nKFxuICAgIGZpbGU6IFRGaWxlLFxuICAgIGZpbGVMaW5lczogc3RyaW5nW10sXG4gICAgbGluZU51bWJlcjogbnVtYmVyLFxuICAgIGhlYWRpbmc6IHN0cmluZyxcbiAgKSB7XG4gICAgY29uc3QgbmV3U3R5bGUgPSB0aGlzLnNldHRpbmdzLm5ld0hlYWRpbmdTdHlsZTtcbiAgICBzd2l0Y2ggKG5ld1N0eWxlKSB7XG4gICAgICBjYXNlIEhlYWRpbmdTdHlsZS5VbmRlcmxpbmU6IHtcbiAgICAgICAgdGhpcy5pbnNlcnRMaW5lSW5GaWxlKGZpbGUsIGZpbGVMaW5lcywgbGluZU51bWJlciwgYCR7aGVhZGluZ31gKTtcblxuICAgICAgICB0aGlzLmluc2VydExpbmVJbkZpbGUoXG4gICAgICAgICAgZmlsZSxcbiAgICAgICAgICBmaWxlTGluZXMsXG4gICAgICAgICAgbGluZU51bWJlciArIDEsXG4gICAgICAgICAgdGhpcy5zZXR0aW5ncy51bmRlcmxpbmVTdHJpbmcsXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBIZWFkaW5nU3R5bGUuUHJlZml4OiB7XG4gICAgICAgIHRoaXMuaW5zZXJ0TGluZUluRmlsZShmaWxlLCBmaWxlTGluZXMsIGxpbmVOdW1iZXIsIGAjICR7aGVhZGluZ31gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1vZGlmaWVkIGBmaWxlYCBieSByZXBsYWNpbmcgdGhlIGhlYWRpbmcgYXQgYGxpbmVOdW1iZXJgIHdpdGggYG5ld0hlYWRpbmdgLFxuICAgKiB1cGRhdGluZyB0aGUgaGVhZGluZyBzdHlsZSBhY2NvcmRpbmcgdGhlIHVzZXIgc2V0dGluZ3MuXG4gICAqXG4gICAqIEBwYXJhbSB7VEZpbGV9IGZpbGUgdGhlIGZpbGUgdG8gbW9kaWZ5XG4gICAqIEBwYXJhbSB7c3RyaW5nW119IGZpbGVMaW5lcyBhcnJheSBvZiB0aGUgZmlsZSdzIGNvbnRlbnRzLCBsaW5lIGJ5IGxpbmVcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpbmVOdW1iZXIgemVyby1iYXNlZCBpbmRleCBvZiB0aGUgbGluZSB0byByZXBsYWNlXG4gICAqIEBwYXJhbSB7SGVhZGluZ1N0eWxlfSBvbGRTdHlsZSB0aGUgc3R5bGUgb2YgdGhlIG9yaWdpbmFsIGhlYWRpbmdcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgdGhlIG5ldyB0ZXh0XG4gICAqL1xuICByZXBsYWNlSGVhZGluZyhcbiAgICBmaWxlOiBURmlsZSxcbiAgICBmaWxlTGluZXM6IHN0cmluZ1tdLFxuICAgIGxpbmVOdW1iZXI6IG51bWJlcixcbiAgICBvbGRTdHlsZTogSGVhZGluZ1N0eWxlLFxuICAgIG5ld0hlYWRpbmc6IHN0cmluZyxcbiAgKSB7XG4gICAgY29uc3QgbmV3U3R5bGUgPSB0aGlzLnNldHRpbmdzLm5ld0hlYWRpbmdTdHlsZTtcbiAgICBjb25zdCByZXBsYWNlU3R5bGUgPSB0aGlzLnNldHRpbmdzLnJlcGxhY2VTdHlsZTtcbiAgICAvLyBJZiByZXBsYWNpbmcgdGhlIHN0eWxlXG4gICAgaWYgKHJlcGxhY2VTdHlsZSkge1xuICAgICAgc3dpdGNoIChuZXdTdHlsZSkge1xuICAgICAgICAvLyBGb3IgdW5kZXJsaW5lIHN0eWxlLCByZXBsYWNlIGhlYWRpbmcgbGluZS4uLlxuICAgICAgICBjYXNlIEhlYWRpbmdTdHlsZS5VbmRlcmxpbmU6IHtcbiAgICAgICAgICB0aGlzLnJlcGxhY2VMaW5lSW5GaWxlKGZpbGUsIGZpbGVMaW5lcywgbGluZU51bWJlciwgYCR7bmV3SGVhZGluZ31gKTtcbiAgICAgICAgICAvLy4uLiwgdGhlbiBhZGQgb3IgcmVwbGFjZSB1bmRlcmxpbmUuXG4gICAgICAgICAgc3dpdGNoIChvbGRTdHlsZSkge1xuICAgICAgICAgICAgY2FzZSBIZWFkaW5nU3R5bGUuUHJlZml4OiB7XG4gICAgICAgICAgICAgIHRoaXMuaW5zZXJ0TGluZUluRmlsZShcbiAgICAgICAgICAgICAgICBmaWxlLFxuICAgICAgICAgICAgICAgIGZpbGVMaW5lcyxcbiAgICAgICAgICAgICAgICBsaW5lTnVtYmVyICsgMSxcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLnVuZGVybGluZVN0cmluZyxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIEhlYWRpbmdTdHlsZS5VbmRlcmxpbmU6IHtcbiAgICAgICAgICAgICAgLy8gVXBkYXRlIHVuZGVybGluZSB3aXRoIHNldHRpbmcuXG4gICAgICAgICAgICAgIHRoaXMucmVwbGFjZUxpbmVJbkZpbGUoXG4gICAgICAgICAgICAgICAgZmlsZSxcbiAgICAgICAgICAgICAgICBmaWxlTGluZXMsXG4gICAgICAgICAgICAgICAgbGluZU51bWJlciArIDEsXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy51bmRlcmxpbmVTdHJpbmcsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLyBGb3IgcHJlZml4IHN0eWxlLCByZXBsYWNlIGhlYWRpbmcgbGluZSwgYW5kIHBvc3NpYmx5IGRlbGV0ZSB1bmRlcmxpbmVcbiAgICAgICAgY2FzZSBIZWFkaW5nU3R5bGUuUHJlZml4OiB7XG4gICAgICAgICAgdGhpcy5yZXBsYWNlTGluZUluRmlsZShcbiAgICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgICBmaWxlTGluZXMsXG4gICAgICAgICAgICBsaW5lTnVtYmVyLFxuICAgICAgICAgICAgYCMgJHtuZXdIZWFkaW5nfWAsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzd2l0Y2ggKG9sZFN0eWxlKSB7XG4gICAgICAgICAgICBjYXNlIEhlYWRpbmdTdHlsZS5QcmVmaXg6IHtcbiAgICAgICAgICAgICAgLy8gbm9wXG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBIZWFkaW5nU3R5bGUuVW5kZXJsaW5lOiB7XG4gICAgICAgICAgICAgIHRoaXMucmVwbGFjZUxpbmVJbkZpbGUoZmlsZSwgZmlsZUxpbmVzLCBsaW5lTnVtYmVyICsgMSwgJycpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgbm90IHJlcGxhY2luZyBzdHlsZSwgbWF0Y2hcbiAgICAgIHN3aXRjaCAob2xkU3R5bGUpIHtcbiAgICAgICAgY2FzZSBIZWFkaW5nU3R5bGUuVW5kZXJsaW5lOiB7XG4gICAgICAgICAgdGhpcy5yZXBsYWNlTGluZUluRmlsZShmaWxlLCBmaWxlTGluZXMsIGxpbmVOdW1iZXIsIGAke25ld0hlYWRpbmd9YCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBIZWFkaW5nU3R5bGUuUHJlZml4OiB7XG4gICAgICAgICAgdGhpcy5yZXBsYWNlTGluZUluRmlsZShcbiAgICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgICBmaWxlTGluZXMsXG4gICAgICAgICAgICBsaW5lTnVtYmVyLFxuICAgICAgICAgICAgYCMgJHtuZXdIZWFkaW5nfWAsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNb2RpZmllcyB0aGUgZmlsZSBieSByZXBsYWNpbmcgYSBwYXJ0aWN1bGFyIGxpbmUgd2l0aCBuZXcgdGV4dC5cbiAgICpcbiAgICogVGhlIGZ1bmN0aW9uIHdpbGwgYWRkIGEgbmV3bGluZSBjaGFyYWN0ZXIgYXQgdGhlIGVuZCBvZiB0aGUgcmVwbGFjZWQgbGluZS5cbiAgICpcbiAgICogSWYgdGhlIGBsaW5lTnVtYmVyYCBwYXJhbWV0ZXIgaXMgaGlnaGVyIHRoYW4gdGhlIGluZGV4IG9mIHRoZSBsYXN0IGxpbmUgb2YgdGhlIGZpbGVcbiAgICogdGhlIGZ1bmN0aW9uIHdpbGwgYWRkIGEgbmV3bGluZSBjaGFyYWN0ZXIgdG8gdGhlIGN1cnJlbnQgbGFzdCBsaW5lIGFuZCBhcHBlbmQgYSBuZXdcbiAgICogbGluZSBhdCB0aGUgZW5kIG9mIHRoZSBmaWxlIHdpdGggdGhlIG5ldyB0ZXh0IChlc3NlbnRpYWxseSBhIG5ldyBsYXN0IGxpbmUpLlxuICAgKlxuICAgKiBAcGFyYW0ge1RGaWxlfSBmaWxlIHRoZSBmaWxlIHRvIG1vZGlmeVxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWxlTGluZXMgYXJyYXkgb2YgdGhlIGZpbGUncyBjb250ZW50cywgbGluZSBieSBsaW5lXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lTnVtYmVyIHplcm8tYmFzZWQgaW5kZXggb2YgdGhlIGxpbmUgdG8gcmVwbGFjZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCB0aGUgbmV3IHRleHRcbiAgICovXG4gIHJlcGxhY2VMaW5lSW5GaWxlKFxuICAgIGZpbGU6IFRGaWxlLFxuICAgIGZpbGVMaW5lczogc3RyaW5nW10sXG4gICAgbGluZU51bWJlcjogbnVtYmVyLFxuICAgIHRleHQ6IHN0cmluZyxcbiAgKSB7XG4gICAgaWYgKGxpbmVOdW1iZXIgPj0gZmlsZUxpbmVzLmxlbmd0aCkge1xuICAgICAgZmlsZUxpbmVzLnB1c2godGV4dCArICdcXG4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZUxpbmVzW2xpbmVOdW1iZXJdID0gdGV4dDtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IGZpbGVMaW5lcy5qb2luKCdcXG4nKTtcbiAgICB0aGlzLmFwcC52YXVsdC5tb2RpZnkoZmlsZSwgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogTW9kaWZpZXMgdGhlIGZpbGUgYnkgaW5zZXJ0aW5nIGEgbGluZSB3aXRoIHNwZWNpZmllZCB0ZXh0LlxuICAgKlxuICAgKiBUaGUgZnVuY3Rpb24gd2lsbCBhZGQgYSBuZXdsaW5lIGNoYXJhY3RlciBhdCB0aGUgZW5kIG9mIHRoZSBpbnNlcnRlZCBsaW5lLlxuICAgKlxuICAgKiBAcGFyYW0ge1RGaWxlfSBmaWxlIHRoZSBmaWxlIHRvIG1vZGlmeVxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWxlTGluZXMgYXJyYXkgb2YgdGhlIGZpbGUncyBjb250ZW50cywgbGluZSBieSBsaW5lXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lTnVtYmVyIHplcm8tYmFzZWQgaW5kZXggb2Ygd2hlcmUgdGhlIGxpbmUgc2hvdWxkIGJlIGluc2VydGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IHRoZSB0ZXh0IHRoYXQgdGhlIGxpbmUgc2hhbGwgY29udGFpblxuICAgKi9cbiAgaW5zZXJ0TGluZUluRmlsZShcbiAgICBmaWxlOiBURmlsZSxcbiAgICBmaWxlTGluZXM6IHN0cmluZ1tdLFxuICAgIGxpbmVOdW1iZXI6IG51bWJlcixcbiAgICB0ZXh0OiBzdHJpbmcsXG4gICkge1xuICAgIGlmIChsaW5lTnVtYmVyID49IGZpbGVMaW5lcy5sZW5ndGgpIHtcbiAgICAgIGZpbGVMaW5lcy5wdXNoKHRleHQgKyAnXFxuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVMaW5lcy5zcGxpY2UobGluZU51bWJlciwgMCwgdGV4dCk7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSBmaWxlTGluZXMuam9pbignXFxuJyk7XG4gICAgdGhpcy5hcHAudmF1bHQubW9kaWZ5KGZpbGUsIGRhdGEpO1xuICB9XG5cbiAgYXN5bmMgbG9hZFNldHRpbmdzKCkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuICB9XG5cbiAgYXN5bmMgc2F2ZVNldHRpbmdzKCkge1xuICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG4gIH1cbn1cblxuY2xhc3MgRmlsZW5hbWVIZWFkaW5nU3luY1NldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcbiAgcGx1Z2luOiBGaWxlbmFtZUhlYWRpbmdTeW5jUGx1Z2luO1xuICBhcHA6IEFwcDtcblxuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBGaWxlbmFtZUhlYWRpbmdTeW5jUGx1Z2luKSB7XG4gICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICAgIHRoaXMuYXBwID0gYXBwO1xuICB9XG5cbiAgZGlzcGxheSgpOiB2b2lkIHtcbiAgICBsZXQgeyBjb250YWluZXJFbCB9ID0gdGhpcztcbiAgICBsZXQgcmVnZXhJZ25vcmVkRmlsZXNEaXY6IEhUTUxEaXZFbGVtZW50O1xuXG4gICAgY29uc3QgcmVuZGVyUmVnZXhJZ25vcmVkRmlsZXMgPSAoZGl2OiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgLy8gZW1wdHkgZXhpc3RpbmcgZGl2XG4gICAgICBkaXYuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgIGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5pZ25vcmVSZWdleCA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBmaWxlcyA9IHRoaXMuYXBwLnZhdWx0LmdldEZpbGVzKCk7XG4gICAgICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAodGhpcy5wbHVnaW4uc2V0dGluZ3MuaWdub3JlUmVnZXgpO1xuXG4gICAgICAgIGZpbGVzXG4gICAgICAgICAgLmZpbHRlcigoZmlsZSkgPT4gcmVnLmV4ZWMoZmlsZS5wYXRoKSAhPT0gbnVsbClcbiAgICAgICAgICAuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgICAgIG5ldyBTZXR0aW5nKGRpdikuc2V0RGVzYyhlbC5wYXRoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb250YWluZXJFbC5lbXB0eSgpO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ2gyJywgeyB0ZXh0OiAnRmlsZW5hbWUgSGVhZGluZyBTeW5jJyB9KTtcbiAgICBjb250YWluZXJFbC5jcmVhdGVFbCgncCcsIHtcbiAgICAgIHRleHQ6XG4gICAgICAgICdUaGlzIHBsdWdpbiB3aWxsIG92ZXJ3cml0ZSB0aGUgZmlyc3QgaGVhZGluZyBmb3VuZCBpbiBhIGZpbGUgd2l0aCB0aGUgZmlsZW5hbWUuJyxcbiAgICB9KTtcbiAgICBjb250YWluZXJFbC5jcmVhdGVFbCgncCcsIHtcbiAgICAgIHRleHQ6XG4gICAgICAgICdJZiBubyBoZWFkZXIgaXMgZm91bmQsIHdpbGwgaW5zZXJ0IGEgbmV3IG9uZSBhdCB0aGUgZmlyc3QgbGluZSAoYWZ0ZXIgZnJvbnRtYXR0ZXIpLicsXG4gICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKCdDdXN0b20gSWxsZWdhbCBDaGFyYWN0ZXJzL1N0cmluZ3MnKVxuICAgICAgLnNldERlc2MoXG4gICAgICAgICdUeXBlIGNoYXJhY3RlcnMvc3RyaW5ncyBzZXBhcmF0ZWQgYnkgYSBjb21tYS4gVGhpcyBpbnB1dCBpcyBzcGFjZSBzZW5zaXRpdmUuJyxcbiAgICAgIClcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFBsYWNlaG9sZGVyKCdbXSwjLC4uLicpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZXJJbGxlZ2FsU3ltYm9scy5qb2luKCkpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudXNlcklsbGVnYWxTeW1ib2xzID0gdmFsdWUuc3BsaXQoJywnKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pLFxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoJ0lnbm9yZSBSZWdleCBSdWxlJylcbiAgICAgIC5zZXREZXNjKFxuICAgICAgICAnSWdub3JlIHJ1bGUgaW4gUmVnRXggZm9ybWF0LiBBbGwgZmlsZXMgbGlzdGVkIGJlbG93IHdpbGwgZ2V0IGlnbm9yZWQgYnkgdGhpcyBwbHVnaW4uJyxcbiAgICAgIClcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFBsYWNlaG9sZGVyKCdNeUZvbGRlci8uKicpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmlnbm9yZVJlZ2V4KVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIG5ldyBSZWdFeHAodmFsdWUpO1xuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5pZ25vcmVSZWdleCA9IHZhbHVlO1xuICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmlnbm9yZVJlZ2V4ID0gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgcmVuZGVyUmVnZXhJZ25vcmVkRmlsZXMocmVnZXhJZ25vcmVkRmlsZXNEaXYpO1xuICAgICAgICAgIH0pLFxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoJ1VzZSBGaWxlIE9wZW4gSG9vaycpXG4gICAgICAuc2V0RGVzYyhcbiAgICAgICAgJ1doZXRoZXIgdGhpcyBwbHVnaW4gc2hvdWxkIHRyaWdnZXIgd2hlbiBhIGZpbGUgaXMgb3BlbmVkLCBhbmQgbm90IGp1c3Qgb24gc2F2ZS4gRGlzYWJsZSB0aGlzIHdoZW4geW91IG5vdGljZSBjb25mbGljdHMgd2l0aCBvdGhlciBwbHVnaW5zIHRoYXQgYWxzbyBhY3Qgb24gZmlsZSBvcGVuLicsXG4gICAgICApXG4gICAgICAuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG4gICAgICAgIHRvZ2dsZVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51c2VGaWxlT3Blbkhvb2spXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudXNlRmlsZU9wZW5Ib29rID0gdmFsdWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KSxcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKCdVc2UgRmlsZSBTYXZlIEhvb2snKVxuICAgICAgLnNldERlc2MoXG4gICAgICAgICdXaGV0aGVyIHRoaXMgcGx1Z2luIHNob3VsZCB0cmlnZ2VyIHdoZW4gYSBmaWxlIGlzIHNhdmVkLiBEaXNhYmxlIHRoaXMgd2hlbiB5b3Ugd2FudCB0byB0cmlnZ2VyIHN5bmMgb25seSBtYW51YWxseS4nLFxuICAgICAgKVxuICAgICAgLmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxuICAgICAgICB0b2dnbGVcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudXNlRmlsZVNhdmVIb29rKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZUZpbGVTYXZlSG9vayA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSksXG4gICAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSgnTmV3IEhlYWRpbmcgU3R5bGUnKVxuICAgICAgLnNldERlc2MoXG4gICAgICAgICdXaGljaCBNYXJrZG93biBoZWFkaW5nIHN0eWxlIHRvIHVzZSB3aGVuIGNyZWF0aW5nIG5ldyBoZWFkaW5nczogUHJlZml4IChcIiMgSGVhZGluZ1wiKSBvciBVbmRlcmxpbmUgKFwiSGVhZGluZ1xcXFxuPT09XCIpLicsXG4gICAgICApXG4gICAgICAuYWRkRHJvcGRvd24oKGNiKSA9PlxuICAgICAgICBjYlxuICAgICAgICAgIC5hZGRPcHRpb24oSGVhZGluZ1N0eWxlLlByZWZpeCwgJ1ByZWZpeCcpXG4gICAgICAgICAgLmFkZE9wdGlvbihIZWFkaW5nU3R5bGUuVW5kZXJsaW5lLCAnVW5kZXJsaW5lJylcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubmV3SGVhZGluZ1N0eWxlKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJ1ByZWZpeCcpIHtcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubmV3SGVhZGluZ1N0eWxlID0gSGVhZGluZ1N0eWxlLlByZWZpeDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJ1VuZGVybGluZScpIHtcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubmV3SGVhZGluZ1N0eWxlID0gSGVhZGluZ1N0eWxlLlVuZGVybGluZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pLFxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoJ1JlcGxhY2UgSGVhZGluZyBTdHlsZScpXG4gICAgICAuc2V0RGVzYyhcbiAgICAgICAgJ1doZXRoZXIgdGhpcyBwbHVnaW4gc2hvdWxkIHJlcGxhY2UgZXhpc3RpbmcgaGVhZGluZyBzdHlsZXMgd2hlbiB1cGRhdGluZyBoZWFkaW5ncy4nLFxuICAgICAgKVxuICAgICAgLmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxuICAgICAgICB0b2dnbGVcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MucmVwbGFjZVN0eWxlKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnJlcGxhY2VTdHlsZSA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSksXG4gICAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSgnVW5kZXJsaW5lIFN0cmluZycpXG4gICAgICAuc2V0RGVzYyhcbiAgICAgICAgJ1RoZSBzdHJpbmcgdG8gdXNlIHdoZW4gaW5zZXJ0IFVuZGVybGluZS1zdHlsZSBoZWFkaW5nczsgc2hvdWxkIGJlIHNvbWUgbnVtYmVyIG9mIFwiPVwicy4nLFxuICAgICAgKVxuICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoJz09PScpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnVuZGVybGluZVN0cmluZylcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy51bmRlcmxpbmVTdHJpbmcgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pLFxuICAgICAgKTtcblxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdoMicsIHsgdGV4dDogJ0lnbm9yZWQgRmlsZXMgQnkgUmVnZXgnIH0pO1xuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdwJywge1xuICAgICAgdGV4dDogJ0FsbCBmaWxlcyBtYXRjaGluZyB0aGUgYWJvdmUgUmVnRXggd2lsbCBnZXQgbGlzdGVkIGhlcmUnLFxuICAgIH0pO1xuXG4gICAgcmVnZXhJZ25vcmVkRmlsZXNEaXYgPSBjb250YWluZXJFbC5jcmVhdGVEaXYoJ3Rlc3QnKTtcbiAgICByZW5kZXJSZWdleElnbm9yZWRGaWxlcyhyZWdleElnbm9yZWRGaWxlc0Rpdik7XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVFbCgnaDInLCB7IHRleHQ6ICdNYW51YWxseSBJZ25vcmVkIEZpbGVzJyB9KTtcbiAgICBjb250YWluZXJFbC5jcmVhdGVFbCgncCcsIHtcbiAgICAgIHRleHQ6XG4gICAgICAgICdZb3UgY2FuIGlnbm9yZSBmaWxlcyBmcm9tIHRoaXMgcGx1Z2luIGJ5IHVzaW5nIHRoZSBcImlnbm9yZSB0aGlzIGZpbGVcIiBjb21tYW5kJyxcbiAgICB9KTtcblxuICAgIC8vIGdvIG92ZXIgYWxsIGlnbm9yZWQgZmlsZXMgYW5kIGFkZCB0aGVtXG4gICAgZm9yIChsZXQga2V5IGluIHRoaXMucGx1Z2luLnNldHRpbmdzLmlnbm9yZWRGaWxlcykge1xuICAgICAgY29uc3QgaWdub3JlZEZpbGVzU2V0dGluZ3NPYmogPSBuZXcgU2V0dGluZyhjb250YWluZXJFbCkuc2V0RGVzYyhrZXkpO1xuXG4gICAgICBpZ25vcmVkRmlsZXNTZXR0aW5nc09iai5hZGRCdXR0b24oKGJ1dHRvbikgPT4ge1xuICAgICAgICBidXR0b24uc2V0QnV0dG9uVGV4dCgnRGVsZXRlJykub25DbGljayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMucGx1Z2luLnNldHRpbmdzLmlnbm9yZWRGaWxlc1trZXldO1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbIlRGaWxlIiwiUGx1Z2luIiwiU2V0dGluZyIsIlBsdWdpblNldHRpbmdUYWIiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztBQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDcEYsUUFBUSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDMUcsSUFBSSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBQ0Y7QUFDTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2hDLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxLQUFLLElBQUk7QUFDN0MsUUFBUSxNQUFNLElBQUksU0FBUyxDQUFDLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRywrQkFBK0IsQ0FBQyxDQUFDO0FBQ2xHLElBQUksYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QixJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekYsQ0FBQztBQXVDRDtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Q7QUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNySCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FB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
