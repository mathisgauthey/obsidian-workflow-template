'use strict';

var obsidian = require('obsidian');
var crypto = require('crypto');

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

// العربية
var ar = {};

// čeština
var cz = {};

// Dansk
var da = {};

// Deutsch
var de = {};

// English
var en = {
    // settings
    IMAGE_TOOLKIT_SETTINGS_TITLE: 'Image Toolkit Settings',
    // >>>Common Settings:
    COMMON_SETTINGS: 'Common Settings:',
    VIEW_MODE_NAME: 'Choose a mode to view images',
    VIEW_MODE_NORMAL: '🖼 Normal',
    VIEW_MODE_PIN: '📌 Pin',
    // >>>View Trigger Settings:
    VIEW_TRIGGER_SETTINGS: 'View Trigger Settings:',
    VIEW_IMAGE_GLOBAL_NAME: 'Click and view an image globally',
    VIEW_IMAGE_GLOBAL_DESC: 'You can zoom, rotate, drag, and invert it on the popup layer when clicking an image.',
    VIEW_IMAGE_IN_EDITOR_NAME: 'Click and view an image in the Editor Area',
    VIEW_IMAGE_IN_EDITOR_DESC: 'Turn on this option if you want to click and view an image in the Editor Area.',
    // CPB = COMMUNITY_PLUGINS_BROWSER
    VIEW_IMAGE_IN_CPB_NAME: 'Click and view an image in the Community Plugins browser',
    VIEW_IMAGE_IN_CPB_DESC: 'Turn on this option if you want to click and view an image in the Community Plugins browser.',
    VIEW_IMAGE_WITH_A_LINK_NAME: 'Click and view an image with a link',
    VIEW_IMAGE_WITH_A_LINK_DESC: 'Turn on this option if you want to click and view an image with a link. (NOTE: The browser will be opened for you to visit the link and the image will be popped up for being viewed at the same time when you click the image.)',
    VIEW_IMAGE_OTHER_NAME: 'Click and view in the other areas except the above',
    VIEW_IMAGE_OTHER_DESC: 'Except for the above mentioned, it also supports other areas, e.g. flashcards.',
    // >>> PIN_MODE_SETTINGS
    PIN_MODE_SETTINGS: "Pin Mode Settings:",
    PIN_MODE_NAME: "📌 Pin an image",
    PIN_MODE_DESC: "You can pin an image onto the top of the screen. And have more options by right click. (press Esc to close the image where your mouse cursor is hovering)",
    PIN_MAXIMUM_NAME: "The maximum images you can pin",
    PIN_COVER_NAME: "Cover mode",
    PIN_COVER_DESC: "After those pinned images reach maximum, you can cover the earliest pinned image when you click an image once again.",
    PIN_MAXIMUM_NOTICE: "Exceeded maximum images you can pin (non cover mode)",
    // >>>View Detail Settings:
    VIEW_DETAILS_SETTINGS: 'View Detail Settings:',
    IMAGE_MOVE_SPEED_NAME: 'Set the moving speed of the image',
    IMAGE_MOVE_SPEED_DESC: 'When you move an image on the popup layer by keyboard (up, down, left, right), the moving speed of the image can be set here.',
    IMAGE_TIP_TOGGLE_NAME: "Display the image's zoom number",
    IMAGE_TIP_TOGGLE_DESC: "Turn on this option if you want to display the zoom number when you zoom the image.",
    IMG_FULL_SCREEN_MODE_NAME: 'Full-screen preview mode',
    // preview mode options:
    FIT: 'Fit',
    FILL: 'Fill',
    STRETCH: 'Stretch',
    IMG_VIEW_BACKGROUND_COLOR_NAME: "Set the background color of the previewed image (Only support the image with transparent background)",
    // >>>Image Border Settings:
    IMAGE_BORDER_SETTINGS: 'Image Border Settings:',
    IMAGE_BORDER_TOGGLE_NAME: "Display the image's border",
    IMAGE_BORDER_TOGGLE_DESC: "The clicked image's border can be displayed after you exit previewing and close the popup layer.",
    IMAGE_BORDER_WIDTH_NAME: "Set the image's border width",
    IMAGE_BORDER_STYLE_NAME: "Set the image's border style",
    IMAGE_BORDER_COLOR_NAME: "Set the image's border color",
    // IMG_BORDER_WIDTH options:
    THIN: 'thin',
    MEDIUM: 'medium',
    THICK: 'thick',
    // IMG_BORDER_STYLE options:
    //HIDDEN: 'hidden',
    DOTTED: 'dotted',
    DASHED: 'dashed',
    SOLID: 'solid',
    DOUBLE: 'double',
    GROOVE: 'groove',
    RIDGE: 'ridge',
    INSET: 'inset',
    OUTSET: 'outset',
    // IMAGE_BORDER_COLOR_NAME options:
    BLACK: 'black',
    BLUE: 'blue',
    DARK_GREEN: 'dark green',
    GREEN: 'green',
    LIME: 'lime',
    STEEL_BLUE: 'steel blue',
    INDIGO: 'indigo',
    PURPLE: 'purple',
    GRAY: 'gray',
    DARK_RED: 'dark red',
    LIGHT_GREEN: 'light green',
    BROWN: 'brown',
    LIGHT_BLUE: 'light blue',
    SILVER: 'silver',
    RED: 'red',
    PINK: 'pink',
    ORANGE: 'orange',
    GOLD: 'gold',
    YELLOW: 'yellow',
    // >>>Gallery Navbar Settings:
    GALLERY_NAVBAR_SETTINGS: 'Gallery Navbar Settings (Experimental):',
    GALLERY_NAVBAR_TOGGLE_NAME: "Display gallery navbar",
    GALLERY_NAVBAR_TOGGLE_DESC: "All of the images in the current pane view can be displayed at the bottom of the popup layer.",
    GALLERY_NAVBAR_DEFAULT_COLOR_NAME: "Set the background color of the gallery navbar (default state)",
    GALLERY_NAVBAR_HOVER_COLOR_NAME: "Set the background color of the gallery navbar (hovering state)",
    GALLERY_IMG_BORDER_TOGGLE_NAME: "Display the selected image on the gallery navbar",
    GALLERY_IMG_BORDER_TOGGLE_DESC: "When you select an image, the image's border will be displayed, so you can know which image is currently active.",
    GALLERY_IMG_BORDER_ACTIVE_COLOR_NAME: 'Set the border color of the selected image',
    // >>>HOTKEYS_SETTINGS:
    HOTKEY_SETTINGS: "Hotkey Settings:",
    HOTKEY_SETTINGS_DESC: "📢 You cannot set the same hotkey for 'Move the image' and 'Switch the image' at the same time. (NOT SUPPORT in Pin Mode)",
    MOVE_THE_IMAGE_NAME: "Set the hotkey for moving the image",
    MOVE_THE_IMAGE_DESC: "You can move the image on the popup layer by hotkey.",
    SWITCH_THE_IMAGE_NAME: "Set the hotkey for switching the image",
    SWITCH_THE_IMAGE_DESC: "You can switch to the previous/next image on the gallery navbar by hotkey. (NOTE: You need to turn on 'Display gallery navbar' first, if you wanna use this hotkey.)",
    DOUBLE_CLICK_TOOLBAR_NAME: "Double click",
    VIEW_TRIGGER_HOTKEY_NAME: "Set the hotkey for triggering viewing an image",
    VIEW_TRIGGER_HOTKEY_DESC: "When you set 'None', you can directly click and preview an image without holding any modifier keys; otherwise, you must hold the configured modifier keys to click and preview an image.",
    // MODIFIER_HOTKEYS
    NONE: "None",
    CTRL: "Ctrl",
    ALT: "Alt",
    SHIFT: "Shift",
    CTRL_ALT: "Ctrl+Alt",
    CTRL_SHIFT: "Ctrl+Shift",
    SHIFT_ALT: "Shift+Alt",
    CTRL_SHIFT_ALT: "Ctrl+Shift+Alt",
    // toolbar icon title
    ZOOM_TO_100: "zoom to 100%",
    ZOOM_IN: "zoom in",
    ZOOM_OUT: "zoom out",
    FULL_SCREEN: 'full screen',
    REFRESH: "refresh",
    ROTATE_LEFT: "rotate left",
    ROTATE_RIGHT: "rotate right",
    SCALE_X: 'flip along x-axis',
    SCALE_Y: 'flip along y-axis',
    INVERT_COLOR: 'invert color',
    COPY: 'copy',
    CLOSE: 'close',
    // tip:
    COPY_IMAGE_SUCCESS: 'Copy the image successfully!',
    COPY_IMAGE_ERROR: 'Fail to copy the image!'
};

// British English
var enGB = {};

// Español
var es = {};

// français
var fr = {};

// हिन्दी
var hi = {};

// Bahasa Indonesia
var id = {};

// Italiano
var it = {};

// 日本語
var ja = {};

// 한국어
var ko = {};

// Nederlands
var nl = {};

// Norsk
var no = {};

// język polski	
var pl = {};

// Português
var pt = {};

// Português do Brasil
// Brazilian Portuguese
var ptBR = {};

// Română
var ro = {};

// русский
var ru = {};

// Türkçe
var tr = {};

// 简体中文
var zhCN = {
    // settings
    IMAGE_TOOLKIT_SETTINGS_TITLE: "Image Toolkit 设置",
    // >>>Common Settings:
    COMMON_SETTINGS: '通用设置：',
    VIEW_MODE_NAME: '选择查看模式',
    VIEW_MODE_NORMAL: '🖼 普通',
    VIEW_MODE_PIN: '📌 贴图',
    // >>> 预览触发配置：
    VIEW_TRIGGER_SETTINGS: '预览触发配置：',
    VIEW_IMAGE_GLOBAL_NAME: '支持全局预览图片',
    VIEW_IMAGE_GLOBAL_DESC: '开启后，在任何地方点击图片都可以弹出预览界面，可对图片进行缩放、旋转、拖动、和反色等。',
    VIEW_IMAGE_IN_EDITOR_NAME: '支持在编辑区域预览图片',
    VIEW_IMAGE_IN_EDITOR_DESC: '开启后，支持在编辑区域，点击图片预览。',
    // CPB = COMMUNITY_PLUGINS_BROWSER
    VIEW_IMAGE_IN_CPB_NAME: '支持在社区插件页面预览图片',
    VIEW_IMAGE_IN_CPB_DESC: '开启后，支持在社区插件页面，点击图片预览。',
    VIEW_IMAGE_WITH_A_LINK_NAME: '支持预览带链接的图片',
    VIEW_IMAGE_WITH_A_LINK_DESC: '开启后，支持点击带链接的图片（注意：点击该图片，会同时打开浏览器访问指定地址和弹出预览图片）',
    VIEW_IMAGE_OTHER_NAME: '支持除上述其他地方来预览图片',
    VIEW_IMAGE_OTHER_DESC: '除上述支持范围外，还支持一些其他区域，如flashcards。',
    // >>> PIN_MODE_SETTINGS
    PIN_MODE_SETTINGS: "贴图模式设置：",
    PIN_MODE_NAME: "📌 将所点击的图片贴到屏幕上",
    PIN_MODE_DESC: "你可以将当前所点击的图片贴到屏幕上，并且可以通过右击图片选择更多操作（按 Esc 关闭已贴图片的展示）",
    PIN_MAXIMUM_NAME: "最大贴图数量",
    PIN_COVER_NAME: "覆盖模式",
    PIN_COVER_DESC: "当贴图数量达到最大值后，此时再次点击图片，该图片会覆盖最早弹出的那个贴图。",
    PIN_MAXIMUM_NOTICE: "超过最大Pin图设置（非覆盖模式）",
    // >>>查看细节设置：
    VIEW_DETAILS_SETTINGS: '查看细节设置：',
    IMAGE_MOVE_SPEED_NAME: '图片移动速度设置',
    IMAGE_MOVE_SPEED_DESC: '当使用键盘（上、下、左、右）移动图片时，可对图片移动速度进行设置。',
    IMAGE_TIP_TOGGLE_NAME: "展示缩放比例提示",
    IMAGE_TIP_TOGGLE_DESC: "开启后，当你缩放图片时会展示当前缩放的比例。",
    IMG_FULL_SCREEN_MODE_NAME: '全屏预览模式',
    // 全屏预览模式 下拉：
    FIT: '自适应',
    FILL: '填充',
    STRETCH: '拉伸',
    IMG_VIEW_BACKGROUND_COLOR_NAME: "设置预览图片的背景色（仅对透明背景的图片生效）",
    // >>>图片边框设置：
    IMAGE_BORDER_SETTINGS: '图片边框设置：',
    IMAGE_BORDER_TOGGLE_NAME: "展示被点击图片的边框",
    IMAGE_BORDER_TOGGLE_DESC: "当离开图片预览和关闭弹出层后，突出展示被点击图片的边框。",
    IMAGE_BORDER_WIDTH_NAME: "设置图片边框宽度",
    IMAGE_BORDER_STYLE_NAME: "设置图片边框样式",
    IMAGE_BORDER_COLOR_NAME: "设置图片边框颜色",
    // IMG_BORDER_WIDTH 下拉：
    THIN: '较细',
    MEDIUM: '正常',
    THICK: '较粗',
    // IMG_BORDER_STYLE  下拉：
    //HIDDEN: '隐藏',
    DOTTED: '点状',
    DASHED: '虚线',
    SOLID: '实线',
    DOUBLE: '双线',
    GROOVE: '凹槽',
    RIDGE: ' 垄状',
    INSET: '凹边',
    OUTSET: '凸边',
    // IMAGE_BORDER_COLOR_NAME  下拉：
    BLACK: '黑色',
    BLUE: '蓝色',
    DARK_GREEN: '深绿色',
    GREEN: '绿色',
    LIME: '淡黄绿色',
    STEEL_BLUE: '钢青色',
    INDIGO: '靛蓝色',
    PURPLE: '紫色',
    GRAY: '灰色',
    DARK_RED: '深红色',
    LIGHT_GREEN: '浅绿色',
    BROWN: '棕色',
    LIGHT_BLUE: '浅蓝色',
    SILVER: '银色',
    RED: '红色',
    PINK: '粉红色',
    ORANGE: '橘黄色',
    GOLD: '金色',
    YELLOW: '黄色',
    // >>>Gallery Navbar Settings:
    GALLERY_NAVBAR_SETTINGS: '图片导航设置 (体验版):',
    GALLERY_NAVBAR_TOGGLE_NAME: "展示图片导航",
    GALLERY_NAVBAR_TOGGLE_DESC: "当前文档的所有图片会展示在弹出层的底部，可随意切换展示不同图片。",
    GALLERY_NAVBAR_DEFAULT_COLOR_NAME: "设置图片导航底栏背景色（默认展示）",
    GALLERY_NAVBAR_HOVER_COLOR_NAME: "设置图片导航底栏背景色（鼠标悬浮时）",
    GALLERY_IMG_BORDER_TOGGLE_NAME: "展示图片导航上被选中的图片",
    GALLERY_IMG_BORDER_TOGGLE_DESC: "当你选中正查看某一图片，对应图片导航底栏上将突出显示该缩略图片的边框。",
    GALLERY_IMG_BORDER_ACTIVE_COLOR_NAME: '设置被选中图片的边框色',
    // >>>HOTKEYS_SETTINGS:
    HOTKEY_SETTINGS: "快捷键设置:",
    HOTKEY_SETTINGS_DESC: "📢  你无法为'移动图片'和'切换图片'设置相同的快捷键。（不支持贴图模式）",
    MOVE_THE_IMAGE_NAME: "为移动图片设置快捷键",
    MOVE_THE_IMAGE_DESC: "你可以利用快捷键来移动弹出层上的图片。",
    SWITCH_THE_IMAGE_NAME: "为切换图片设置快捷键",
    SWITCH_THE_IMAGE_DESC: "你可以利用快捷键来切换在图片导航栏上的图片至上一张/下一张。(注意: 仅当开启“展示图片导航”后，才能使用该快捷键来控制切换图片。)",
    DOUBLE_CLICK_TOOLBAR_NAME: "双击",
    VIEW_TRIGGER_HOTKEY_NAME: "为触发弹出查看图片设置快捷键",
    VIEW_TRIGGER_HOTKEY_DESC: "当你设置为“无”，你可以直接点击预览图片；否则，须按住已配置的修改键（Ctrl、Alt、Shift）才能点击查看某个图片。",
    // MODIFIER_HOTKEYS
    NONE: "无",
    // toolbar icon title
    ZOOM_TO_100: "缩放至100%",
    ZOOM_IN: "放大",
    ZOOM_OUT: "缩小",
    FULL_SCREEN: "全屏",
    REFRESH: "刷新",
    ROTATE_LEFT: "左旋",
    ROTATE_RIGHT: "右旋",
    SCALE_X: 'x轴翻转',
    SCALE_Y: 'y轴翻转',
    INVERT_COLOR: '反色',
    COPY: '复制',
    CLOSE: '关闭',
    // tip:
    COPY_IMAGE_SUCCESS: '拷贝图片成功！',
    COPY_IMAGE_ERROR: '拷贝图片失败！'
};

// 繁體中文
var zhTW = {
    // settings
    IMAGE_TOOLKIT_SETTINGS_TITLE: "image toolkit 設定",
    // toolbar icon title
    ZOOM_IN: "放大",
    ZOOM_OUT: "縮小",
    FULL_SCREEN: '全螢幕',
    REFRESH: "重整",
    ROTATE_LEFT: "向左旋轉",
    ROTATE_RIGHT: "向右旋轉",
    SCALE_X: 'x 軸縮放',
    SCALE_Y: 'y 軸縮放',
    INVERT_COLOR: '色彩反轉',
    COPY: '複製',
    COPY_IMAGE_SUCCESS: '成功複製圖片！'
};

const localeMap = {
    ar,
    cs: cz,
    da,
    de,
    en,
    "en-gb": enGB,
    es,
    fr,
    hi,
    id,
    it,
    ja,
    ko,
    nl,
    nn: no,
    pl,
    pt,
    "pt-br": ptBR,
    ro,
    ru,
    tr,
    "zh-cn": zhCN,
    "zh-tw": zhTW,
};
const locale = localeMap[obsidian.moment.locale()];
function t(str) {
    if (!locale) {
        console.error("[oit] Image toolkit locale not found", obsidian.moment.locale());
    }
    return (locale && locale[str]) || en[str];
}

var ViewMode;
(function (ViewMode) {
    ViewMode["Normal"] = "Normal";
    ViewMode["Pin"] = "Pin";
})(ViewMode || (ViewMode = {}));
const DEFAULT_VIEW_MODE = ViewMode.Normal;
const OIT_CLASS = {
    CONTAINER_ROOT: 'oit',
    CONTAINER_NORMAL: 'oit-normal',
    CONTAINER_PIN: 'oit-pin',
    // the place for storing images
    IMG_CONTAINER: 'oit-img-container',
    IMG_VIEW: 'oit-img-view',
    IMG_TTP: 'oit-img-tip',
    IMG_FOOTER: 'oit-img-footer',
    IMG_TITLE: 'oit-img-title',
    IMG_TITLE_NAME: 'oit-img-title-name',
    IMG_TITLE_INDEX: 'oit-img-title-index',
    IMG_TOOLBAR: 'oit-img-toolbar',
    IMG_PLAYER: 'img-player',
    IMG_FULLSCREEN: 'img-fullscreen',
};
const ZOOM_FACTOR = 0.8;
const IMG_VIEW_MIN = 30;
const ICONS = [{
        id: 'zoom-to-100',
        svg: `<g> <path id="svg_1" d="m42,6c-18.8,0 -34,15.2 -34,34s15.2,34 34,34c7.4,0 14.3,-2.4 19.9,-6.4l26.3,26.3l5.6,-5.6l-26,-26.1c5.1,-6 8.2,-13.7 8.2,-22.1c0,-18.9 -15.2,-34.1 -34,-34.1zm0,4c16.6,0 30,13.4 30,30s-13.4,30 -30,30s-30,-13.4 -30,-30s13.4,-30 30,-30z" stroke-width="2" stroke="currentColor" fill="currentColor"/> <text font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Noto Sans JP" font-size="24" id="svg_2" y="48.5" x="24" stroke-width="0" stroke="#000" fill="#000000">1:1</text> </g>`
    }];
const SEPARATOR_SYMBOL = "---";
const TOOLBAR_CONF = [{
        title: "ZOOM_TO_100",
        class: 'toolbar_zoom_to_100',
        icon: 'zoom-to-100',
        enableToolbarIcon: true,
        enableMenu: true,
        enableHotKey: true
    }, {
        title: "ZOOM_IN",
        class: 'toolbar_zoom_in',
        icon: 'zoom-in',
        enableToolbarIcon: true,
        enableMenu: false,
        enableHotKey: true
    }, {
        title: "ZOOM_OUT",
        class: 'toolbar_zoom_out',
        icon: 'zoom-out',
        enableToolbarIcon: true,
        enableMenu: false,
        enableHotKey: true
    }, {
        title: "FULL_SCREEN",
        class: 'toolbar_full_screen',
        icon: 'expand',
        enableToolbarIcon: true,
        enableMenu: true,
        enableHotKey: true
    }, {
        title: "REFRESH",
        class: 'toolbar_refresh',
        icon: 'refresh-ccw',
        enableToolbarIcon: true,
        enableMenu: true,
        enableHotKey: true
    }, {
        title: "ROTATE_LEFT",
        class: 'toolbar_rotate_left',
        icon: 'rotate-ccw',
        enableToolbarIcon: true,
        enableMenu: true,
        enableHotKey: true
    }, {
        title: "ROTATE_RIGHT",
        class: 'toolbar_rotate_right',
        icon: 'rotate-cw',
        enableToolbarIcon: true,
        enableMenu: true,
        enableHotKey: true
    }, {
        title: "SCALE_X",
        class: 'toolbar_scale_x',
        icon: 'move-horizontal',
        enableToolbarIcon: true,
        enableMenu: true,
        enableHotKey: true
    }, {
        title: "SCALE_Y",
        class: 'toolbar_scale_y',
        icon: 'move-vertical',
        enableToolbarIcon: true,
        enableMenu: true,
        enableHotKey: true
    }, {
        title: "INVERT_COLOR",
        class: 'toolbar_invert_color',
        icon: 'droplet',
        enableToolbarIcon: true,
        enableMenu: true,
        enableHotKey: true
    }, {
        title: "COPY",
        class: 'toolbar_copy',
        icon: 'copy',
        enableToolbarIcon: true,
        enableMenu: true,
        enableHotKey: true
    }, {
        title: SEPARATOR_SYMBOL,
        enableToolbarIcon: false,
        enableMenu: true,
        enableHotKey: false
    }, {
        title: "CLOSE",
        class: 'toolbar_close',
        icon: 'trash',
        enableToolbarIcon: false,
        enableMenu: true,
        enableHotKey: true
    }];
const IMG_FULL_SCREEN_MODE = {
    FIT: 'FIT',
    FILL: 'FILL',
    STRETCH: 'STRETCH'
};
const VIEW_IMG_SELECTOR = {
    EDITOR_AREAS: `.workspace-leaf-content[data-type='markdown'] img,.workspace-leaf-content[data-type='image'] img`,
    EDITOR_AREAS_NO_LINK: `.workspace-leaf-content[data-type='markdown'] img:not(a img),.workspace-leaf-content[data-type='image'] img:not(a img)`,
    CPB: `.community-modal-details img`,
    CPB_NO_LINK: `.community-modal-details img:not(a img)`,
    OTHER: `#sr-flashcard-view img`,
    OTHER_NO_LINK: `#sr-flashcard-view img:not(a img)`,
};
const IMG_BORDER_WIDTH = {
    THIN: 'thin',
    MEDIUM: 'medium',
    THICK: 'thick'
};
const IMG_BORDER_STYLE = {
    // HIDDEN: 'hidden',
    DOTTED: 'dotted',
    DASHED: 'dashed',
    SOLID: 'solid',
    DOUBLE: 'double',
    GROOVE: 'groove',
    RIDGE: 'ridge',
    INSET: 'inset',
    OUTSET: 'outset'
};
// https://www.runoob.com/cssref/css-colorsfull.html
const IMG_BORDER_COLOR = {
    BLACK: 'black',
    BLUE: 'blue',
    DARK_GREEN: 'darkgreen',
    GREEN: 'green',
    LIME: 'lime',
    STEEL_BLUE: 'steelblue',
    INDIGO: 'indigo',
    PURPLE: 'purple',
    GRAY: 'gray',
    DARK_RED: 'darkred',
    LIGHT_GREEN: 'lightgreen',
    BROWN: 'brown',
    LIGHT_BLUE: 'lightblue',
    SILVER: 'silver',
    RED: 'red',
    PINK: 'pink',
    ORANGE: 'orange',
    GOLD: 'gold',
    YELLOW: 'yellow'
};
const GALLERY_NAVBAR_DEFAULT_COLOR = '#0000001A'; // rgba(0, 0, 0, 0.1)
const GALLERY_NAVBAR_HOVER_COLOR = '#0000004D'; // rgba(0, 0, 0, 0.3)
const GALLERY_IMG_BORDER_ACTIVE_COLOR = '#FF0000'; // red
const MODIFIER_HOTKEYS = {
    NONE: "NONE",
    CTRL: "CTRL",
    ALT: "ALT",
    SHIFT: "SHIFT",
    CTRL_ALT: "CTRL_ALT",
    CTRL_SHIFT: "CTRL_SHIFT",
    SHIFT_ALT: "SHIFT_ALT",
    CTRL_SHIFT_ALT: "CTRL_SHIFT_ALT"
};
const MOVE_THE_IMAGE = {
    CODE: "MOVE_THE_IMAGE",
    DEFAULT_HOTKEY: MODIFIER_HOTKEYS.NONE,
    SVG: `<svg width="56" height="37" xmlns="http://www.w3.org/2000/svg" class="icon"><path fill="none" d="M-1 -1H57V38H-1z"/><g><path stroke="null" fill="#707070" d="M19.001 16.067V1.928C19.001.864 19.865 0 20.93 0h14.142c1.064 0 1.928.864 1.928 1.928v14.14a1.929 1.929 0 01-1.928 1.927H20.929a1.929 1.929 0 01-1.928-1.928zm4.805-5.909l2.908-3.032v7.334c0 .535.43.964.965.964h.642c.535 0 .965-.43.965-.964V7.126l2.908 3.032a.965.965 0 001.378.017l.438-.442a.96.96 0 000-1.362l-5.327-5.33a.96.96 0 00-1.362 0l-5.335 5.33a.96.96 0 000 1.362l.438.441a.97.97 0 001.382-.016zM36.999 20.933v14.139A1.929 1.929 0 0135.07 37H20.929a1.929 1.929 0 01-1.928-1.928v-14.14c0-1.064.864-1.927 1.928-1.927h14.142c1.064 0 1.928.863 1.928 1.928zm-4.805 5.909l-2.908 3.032V22.54a.962.962 0 00-.965-.964h-.642a.962.962 0 00-.965.964v7.334l-2.908-3.032a.965.965 0 00-1.378-.016l-.438.441a.96.96 0 000 1.362l5.327 5.33a.96.96 0 001.362 0l5.335-5.33a.96.96 0 000-1.362l-.438-.441a.97.97 0 00-1.382.016zM16.068 37.001H1.93a1.929 1.929 0 01-1.928-1.928V20.932c0-1.065.864-1.928 1.928-1.928h14.14c1.064 0 1.927.863 1.927 1.928v14.14a1.929 1.929 0 01-1.928 1.93zm-5.908-4.804l-3.033-2.909h7.335c.534 0 .964-.43.964-.964v-.643a.962.962 0 00-.964-.964H7.127l3.033-2.909a.965.965 0 00.016-1.378l-.442-.438a.96.96 0 00-1.362 0l-5.33 5.327a.96.96 0 000 1.362l5.33 5.335a.96.96 0 001.362 0l.442-.438a.97.97 0 00-.016-1.381zM39.932 19.004H54.07c1.064 0 1.928.863 1.928 1.928v14.14a1.929 1.929 0 01-1.928 1.93H39.93a1.929 1.929 0 01-1.927-1.93v-14.14c0-1.065.863-1.928 1.928-1.928zm5.908 4.804l3.033 2.909h-7.335a.962.962 0 00-.964.964v.643c0 .534.43.964.964.964h7.335l-3.033 2.909a.965.965 0 00-.016 1.377l.442.438a.96.96 0 001.362 0l5.33-5.327a.96.96 0 000-1.362l-5.33-5.335a.96.96 0 00-1.362 0l-.442.438a.97.97 0 00.016 1.382z"/></g></svg>`
};
const SWITCH_THE_IMAGE = {
    CODE: "SWITCH_THE_IMAGE",
    DEFAULT_HOTKEY: MODIFIER_HOTKEYS.CTRL,
    SVG: `<svg width="37" height="18" xmlns="http://www.w3.org/2000/svg" class="icon"><path fill="none" d="M-1 -1H38V19H-1z"/><g><path stroke="null" fill="#707070" d="M16.068 17.999H1.93A1.929 1.929 0 01.001 16.07V1.929C.001.865.865.001 1.93.001h14.14c1.064 0 1.927.864 1.927 1.928v14.142a1.929 1.929 0 01-1.928 1.928zm-5.908-4.805l-3.033-2.908h7.335c.534 0 .964-.43.964-.965V8.68a.962.962 0 00-.964-.965H7.127l3.033-2.908a.965.965 0 00.016-1.378l-.442-.438a.96.96 0 00-1.362 0l-5.33 5.327a.96.96 0 000 1.362l5.33 5.335a.96.96 0 001.362 0l.442-.438a.97.97 0 00-.016-1.382zM20.932.001H35.07c1.064 0 1.928.864 1.928 1.928v14.142a1.929 1.929 0 01-1.928 1.928H20.93a1.929 1.929 0 01-1.927-1.928V1.929c0-1.064.863-1.928 1.928-1.928zm5.908 4.805l3.033 2.908h-7.335a.962.962 0 00-.964.965v.642c0 .535.43.965.964.965h7.335l-3.033 2.908a.965.965 0 00-.016 1.378l.442.438a.96.96 0 001.362 0l5.33-5.327a.96.96 0 000-1.362l-5.33-5.335a.96.96 0 00-1.362 0l-.442.438a.97.97 0 00.016 1.382z"/></g></svg>`
};
const IMG_DEFAULT_BACKGROUND_COLOR = '#00000000';

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

/*! Pickr 1.8.2 MIT | https://github.com/Simonwep/pickr */

var pickr_min = createCommonjsModule(function (module, exports) {
!function(t,e){module.exports=e();}(self,(function(){return (()=>{var t={d:(e,o)=>{for(var n in o)t.o(o,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:o[n]});},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0});}},e={};t.d(e,{default:()=>L});var o={};function n(t,e,o,n,i={}){e instanceof HTMLCollection||e instanceof NodeList?e=Array.from(e):Array.isArray(e)||(e=[e]),Array.isArray(o)||(o=[o]);for(const s of e)for(const e of o)s[t](e,n,{capture:!1,...i});return Array.prototype.slice.call(arguments,1)}t.r(o),t.d(o,{adjustableInputNumbers:()=>p,createElementFromString:()=>r,createFromTemplate:()=>a,eventPath:()=>l,off:()=>s,on:()=>i,resolveElement:()=>c});const i=n.bind(null,"addEventListener"),s=n.bind(null,"removeEventListener");function r(t){const e=document.createElement("div");return e.innerHTML=t.trim(),e.firstElementChild}function a(t){const e=(t,e)=>{const o=t.getAttribute(e);return t.removeAttribute(e),o},o=(t,n={})=>{const i=e(t,":obj"),s=e(t,":ref"),r=i?n[i]={}:n;s&&(n[s]=t);for(const n of Array.from(t.children)){const t=e(n,":arr"),i=o(n,t?{}:r);t&&(r[t]||(r[t]=[])).push(Object.keys(i).length?i:n);}return n};return o(r(t))}function l(t){let e=t.path||t.composedPath&&t.composedPath();if(e)return e;let o=t.target.parentElement;for(e=[t.target,o];o=o.parentElement;)e.push(o);return e.push(document,window),e}function c(t){return t instanceof Element?t:"string"==typeof t?t.split(/>>/g).reduce(((t,e,o,n)=>(t=t.querySelector(e),o<n.length-1?t.shadowRoot:t)),document):null}function p(t,e=(t=>t)){function o(o){const n=[.001,.01,.1][Number(o.shiftKey||2*o.ctrlKey)]*(o.deltaY<0?1:-1);let i=0,s=t.selectionStart;t.value=t.value.replace(/[\d.]+/g,((t,o)=>o<=s&&o+t.length>=s?(s=o,e(Number(t),n,i)):(i++,t))),t.focus(),t.setSelectionRange(s,s),o.preventDefault(),t.dispatchEvent(new Event("input"));}i(t,"focus",(()=>i(window,"wheel",o,{passive:!1}))),i(t,"blur",(()=>s(window,"wheel",o)));}const{min:u,max:h,floor:d,round:m}=Math;function f(t,e,o){e/=100,o/=100;const n=d(t=t/360*6),i=t-n,s=o*(1-e),r=o*(1-i*e),a=o*(1-(1-i)*e),l=n%6;return [255*[o,r,s,s,a,o][l],255*[a,o,o,r,s,s][l],255*[s,s,a,o,o,r][l]]}function v(t,e,o){const n=(2-(e/=100))*(o/=100)/2;return 0!==n&&(e=1===n?0:n<.5?e*o/(2*n):e*o/(2-2*n)),[t,100*e,100*n]}function b(t,e,o){const n=u(t/=255,e/=255,o/=255),i=h(t,e,o),s=i-n;let r,a;if(0===s)r=a=0;else {a=s/i;const n=((i-t)/6+s/2)/s,l=((i-e)/6+s/2)/s,c=((i-o)/6+s/2)/s;t===i?r=c-l:e===i?r=1/3+n-c:o===i&&(r=2/3+l-n),r<0?r+=1:r>1&&(r-=1);}return [360*r,100*a,100*i]}function y(t,e,o,n){e/=100,o/=100;return [...b(255*(1-u(1,(t/=100)*(1-(n/=100))+n)),255*(1-u(1,e*(1-n)+n)),255*(1-u(1,o*(1-n)+n)))]}function g(t,e,o){e/=100;const n=2*(e*=(o/=100)<.5?o:1-o)/(o+e)*100,i=100*(o+e);return [t,isNaN(n)?0:n,i]}function _(t){return b(...t.match(/.{2}/g).map((t=>parseInt(t,16))))}function w(t){t=t.match(/^[a-zA-Z]+$/)?function(t){if("black"===t.toLowerCase())return "#000";const e=document.createElement("canvas").getContext("2d");return e.fillStyle=t,"#000"===e.fillStyle?null:e.fillStyle}(t):t;const e={cmyk:/^cmyk[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)/i,rgba:/^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,hsla:/^((hsla)|hsl)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,hsva:/^((hsva)|hsv)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,hexa:/^#?(([\dA-Fa-f]{3,4})|([\dA-Fa-f]{6})|([\dA-Fa-f]{8}))$/i},o=t=>t.map((t=>/^(|\d+)\.\d+|\d+$/.test(t)?Number(t):void 0));let n;t:for(const i in e){if(!(n=e[i].exec(t)))continue;const s=t=>!!n[2]==("number"==typeof t);switch(i){case"cmyk":{const[,t,e,s,r]=o(n);if(t>100||e>100||s>100||r>100)break t;return {values:y(t,e,s,r),type:i}}case"rgba":{const[,,,t,e,r,a]=o(n);if(t>255||e>255||r>255||a<0||a>1||!s(a))break t;return {values:[...b(t,e,r),a],a,type:i}}case"hexa":{let[,t]=n;4!==t.length&&3!==t.length||(t=t.split("").map((t=>t+t)).join(""));const e=t.substring(0,6);let o=t.substring(6);return o=o?parseInt(o,16)/255:void 0,{values:[..._(e),o],a:o,type:i}}case"hsla":{const[,,,t,e,r,a]=o(n);if(t>360||e>100||r>100||a<0||a>1||!s(a))break t;return {values:[...g(t,e,r),a],a,type:i}}case"hsva":{const[,,,t,e,r,a]=o(n);if(t>360||e>100||r>100||a<0||a>1||!s(a))break t;return {values:[t,e,r,a],a,type:i}}}}return {values:null,type:null}}function A(t=0,e=0,o=0,n=1){const i=(t,e)=>(o=-1)=>e(~o?t.map((t=>Number(t.toFixed(o)))):t),s={h:t,s:e,v:o,a:n,toHSVA(){const t=[s.h,s.s,s.v,s.a];return t.toString=i(t,(t=>`hsva(${t[0]}, ${t[1]}%, ${t[2]}%, ${s.a})`)),t},toHSLA(){const t=[...v(s.h,s.s,s.v),s.a];return t.toString=i(t,(t=>`hsla(${t[0]}, ${t[1]}%, ${t[2]}%, ${s.a})`)),t},toRGBA(){const t=[...f(s.h,s.s,s.v),s.a];return t.toString=i(t,(t=>`rgba(${t[0]}, ${t[1]}, ${t[2]}, ${s.a})`)),t},toCMYK(){const t=function(t,e,o){const n=f(t,e,o),i=n[0]/255,s=n[1]/255,r=n[2]/255,a=u(1-i,1-s,1-r);return [100*(1===a?0:(1-i-a)/(1-a)),100*(1===a?0:(1-s-a)/(1-a)),100*(1===a?0:(1-r-a)/(1-a)),100*a]}(s.h,s.s,s.v);return t.toString=i(t,(t=>`cmyk(${t[0]}%, ${t[1]}%, ${t[2]}%, ${t[3]}%)`)),t},toHEXA(){const t=function(t,e,o){return f(t,e,o).map((t=>m(t).toString(16).padStart(2,"0")))}(s.h,s.s,s.v),e=s.a>=1?"":Number((255*s.a).toFixed(0)).toString(16).toUpperCase().padStart(2,"0");return e&&t.push(e),t.toString=()=>`#${t.join("").toUpperCase()}`,t},clone:()=>A(s.h,s.s,s.v,s.a)};return s}const C=t=>Math.max(Math.min(t,1),0);function $(t){const e={options:Object.assign({lock:null,onchange:()=>0,onstop:()=>0},t),_keyboard(t){const{options:o}=e,{type:n,key:i}=t;if(document.activeElement===o.wrapper){const{lock:o}=e.options,s="ArrowUp"===i,r="ArrowRight"===i,a="ArrowDown"===i,l="ArrowLeft"===i;if("keydown"===n&&(s||r||a||l)){let n=0,i=0;"v"===o?n=s||r?1:-1:"h"===o?n=s||r?-1:1:(i=s?-1:a?1:0,n=l?-1:r?1:0),e.update(C(e.cache.x+.01*n),C(e.cache.y+.01*i)),t.preventDefault();}else i.startsWith("Arrow")&&(e.options.onstop(),t.preventDefault());}},_tapstart(t){i(document,["mouseup","touchend","touchcancel"],e._tapstop),i(document,["mousemove","touchmove"],e._tapmove),t.cancelable&&t.preventDefault(),e._tapmove(t);},_tapmove(t){const{options:o,cache:n}=e,{lock:i,element:s,wrapper:r}=o,a=r.getBoundingClientRect();let l=0,c=0;if(t){const e=t&&t.touches&&t.touches[0];l=t?(e||t).clientX:0,c=t?(e||t).clientY:0,l<a.left?l=a.left:l>a.left+a.width&&(l=a.left+a.width),c<a.top?c=a.top:c>a.top+a.height&&(c=a.top+a.height),l-=a.left,c-=a.top;}else n&&(l=n.x*a.width,c=n.y*a.height);"h"!==i&&(s.style.left=`calc(${l/a.width*100}% - ${s.offsetWidth/2}px)`),"v"!==i&&(s.style.top=`calc(${c/a.height*100}% - ${s.offsetHeight/2}px)`),e.cache={x:l/a.width,y:c/a.height};const p=C(l/a.width),u=C(c/a.height);switch(i){case"v":return o.onchange(p);case"h":return o.onchange(u);default:return o.onchange(p,u)}},_tapstop(){e.options.onstop(),s(document,["mouseup","touchend","touchcancel"],e._tapstop),s(document,["mousemove","touchmove"],e._tapmove);},trigger(){e._tapmove();},update(t=0,o=0){const{left:n,top:i,width:s,height:r}=e.options.wrapper.getBoundingClientRect();"h"===e.options.lock&&(o=t),e._tapmove({clientX:n+s*t,clientY:i+r*o});},destroy(){const{options:t,_tapstart:o,_keyboard:n}=e;s(document,["keydown","keyup"],n),s([t.wrapper,t.element],"mousedown",o),s([t.wrapper,t.element],"touchstart",o,{passive:!1});}},{options:o,_tapstart:n,_keyboard:r}=e;return i([o.wrapper,o.element],"mousedown",n),i([o.wrapper,o.element],"touchstart",n,{passive:!1}),i(document,["keydown","keyup"],r),e}function k(t={}){t=Object.assign({onchange:()=>0,className:"",elements:[]},t);const e=i(t.elements,"click",(e=>{t.elements.forEach((o=>o.classList[e.target===o?"add":"remove"](t.className))),t.onchange(e),e.stopPropagation();}));return {destroy:()=>s(...e)}}const S={variantFlipOrder:{start:"sme",middle:"mse",end:"ems"},positionFlipOrder:{top:"tbrl",right:"rltb",bottom:"btrl",left:"lrbt"},position:"bottom",margin:8},O=(t,e,o)=>{const{container:n,margin:i,position:s,variantFlipOrder:r,positionFlipOrder:a}={container:document.documentElement.getBoundingClientRect(),...S,...o},{left:l,top:c}=e.style;e.style.left="0",e.style.top="0";const p=t.getBoundingClientRect(),u=e.getBoundingClientRect(),h={t:p.top-u.height-i,b:p.bottom+i,r:p.right+i,l:p.left-u.width-i},d={vs:p.left,vm:p.left+p.width/2+-u.width/2,ve:p.left+p.width-u.width,hs:p.top,hm:p.bottom-p.height/2-u.height/2,he:p.bottom-u.height},[m,f="middle"]=s.split("-"),v=a[m],b=r[f],{top:y,left:g,bottom:_,right:w}=n;for(const t of v){const o="t"===t||"b"===t,n=h[t],[i,s]=o?["top","left"]:["left","top"],[r,a]=o?[u.height,u.width]:[u.width,u.height],[l,c]=o?[_,w]:[w,_],[p,m]=o?[y,g]:[g,y];if(!(n<p||n+r>l))for(const r of b){const l=d[(o?"v":"h")+r];if(!(l<m||l+a>c))return e.style[s]=l-u[s]+"px",e.style[i]=n-u[i]+"px",t+r}}return e.style.left=l,e.style.top=c,null};function E(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}class L{constructor(t){E(this,"_initializingActive",!0),E(this,"_recalc",!0),E(this,"_nanopop",null),E(this,"_root",null),E(this,"_color",A()),E(this,"_lastColor",A()),E(this,"_swatchColors",[]),E(this,"_setupAnimationFrame",null),E(this,"_eventListener",{init:[],save:[],hide:[],show:[],clear:[],change:[],changestop:[],cancel:[],swatchselect:[]}),this.options=t=Object.assign({...L.DEFAULT_OPTIONS},t);const{swatches:e,components:o,theme:n,sliders:i,lockOpacity:s,padding:r}=t;["nano","monolith"].includes(n)&&!i&&(t.sliders="h"),o.interaction||(o.interaction={});const{preview:a,opacity:l,hue:c,palette:p}=o;o.opacity=!s&&l,o.palette=p||a||l||c,this._preBuild(),this._buildComponents(),this._bindEvents(),this._finalBuild(),e&&e.length&&e.forEach((t=>this.addSwatch(t)));const{button:u,app:h}=this._root;this._nanopop=((t,e,o)=>{const n="object"!=typeof t||t instanceof HTMLElement?{reference:t,popper:e,...o}:t;return {update(t=n){const{reference:e,popper:o}=Object.assign(n,t);if(!o||!e)throw new Error("Popper- or reference-element missing.");return O(e,o,n)}}})(u,h,{margin:r}),u.setAttribute("role","button"),u.setAttribute("aria-label",this._t("btn:toggle"));const d=this;this._setupAnimationFrame=requestAnimationFrame((function e(){if(!h.offsetWidth)return requestAnimationFrame(e);d.setColor(t.default),d._rePositioningPicker(),t.defaultRepresentation&&(d._representation=t.defaultRepresentation,d.setColorRepresentation(d._representation)),t.showAlways&&d.show(),d._initializingActive=!1,d._emit("init");}));}_preBuild(){const{options:t}=this;for(const e of ["el","container"])t[e]=c(t[e]);this._root=(t=>{const{components:e,useAsButton:o,inline:n,appClass:i,theme:s,lockOpacity:r}=t.options,l=t=>t?"":'style="display:none" hidden',c=e=>t._t(e),p=a(`\n      <div :ref="root" class="pickr">\n\n        ${o?"":'<button type="button" :ref="button" class="pcr-button"></button>'}\n\n        <div :ref="app" class="pcr-app ${i||""}" data-theme="${s}" ${n?'style="position: unset"':""} aria-label="${c("ui:dialog")}" role="window">\n          <div class="pcr-selection" ${l(e.palette)}>\n            <div :obj="preview" class="pcr-color-preview" ${l(e.preview)}>\n              <button type="button" :ref="lastColor" class="pcr-last-color" aria-label="${c("btn:last-color")}"></button>\n              <div :ref="currentColor" class="pcr-current-color"></div>\n            </div>\n\n            <div :obj="palette" class="pcr-color-palette">\n              <div :ref="picker" class="pcr-picker"></div>\n              <div :ref="palette" class="pcr-palette" tabindex="0" aria-label="${c("aria:palette")}" role="listbox"></div>\n            </div>\n\n            <div :obj="hue" class="pcr-color-chooser" ${l(e.hue)}>\n              <div :ref="picker" class="pcr-picker"></div>\n              <div :ref="slider" class="pcr-hue pcr-slider" tabindex="0" aria-label="${c("aria:hue")}" role="slider"></div>\n            </div>\n\n            <div :obj="opacity" class="pcr-color-opacity" ${l(e.opacity)}>\n              <div :ref="picker" class="pcr-picker"></div>\n              <div :ref="slider" class="pcr-opacity pcr-slider" tabindex="0" aria-label="${c("aria:opacity")}" role="slider"></div>\n            </div>\n          </div>\n\n          <div class="pcr-swatches ${e.palette?"":"pcr-last"}" :ref="swatches"></div>\n\n          <div :obj="interaction" class="pcr-interaction" ${l(Object.keys(e.interaction).length)}>\n            <input :ref="result" class="pcr-result" type="text" spellcheck="false" ${l(e.interaction.input)} aria-label="${c("aria:input")}">\n\n            <input :arr="options" class="pcr-type" data-type="HEXA" value="${r?"HEX":"HEXA"}" type="button" ${l(e.interaction.hex)}>\n            <input :arr="options" class="pcr-type" data-type="RGBA" value="${r?"RGB":"RGBA"}" type="button" ${l(e.interaction.rgba)}>\n            <input :arr="options" class="pcr-type" data-type="HSLA" value="${r?"HSL":"HSLA"}" type="button" ${l(e.interaction.hsla)}>\n            <input :arr="options" class="pcr-type" data-type="HSVA" value="${r?"HSV":"HSVA"}" type="button" ${l(e.interaction.hsva)}>\n            <input :arr="options" class="pcr-type" data-type="CMYK" value="CMYK" type="button" ${l(e.interaction.cmyk)}>\n\n            <input :ref="save" class="pcr-save" value="${c("btn:save")}" type="button" ${l(e.interaction.save)} aria-label="${c("aria:btn:save")}">\n            <input :ref="cancel" class="pcr-cancel" value="${c("btn:cancel")}" type="button" ${l(e.interaction.cancel)} aria-label="${c("aria:btn:cancel")}">\n            <input :ref="clear" class="pcr-clear" value="${c("btn:clear")}" type="button" ${l(e.interaction.clear)} aria-label="${c("aria:btn:clear")}">\n          </div>\n        </div>\n      </div>\n    `),u=p.interaction;return u.options.find((t=>!t.hidden&&!t.classList.add("active"))),u.type=()=>u.options.find((t=>t.classList.contains("active"))),p})(this),t.useAsButton&&(this._root.button=t.el),t.container.appendChild(this._root.root);}_finalBuild(){const t=this.options,e=this._root;if(t.container.removeChild(e.root),t.inline){const o=t.el.parentElement;t.el.nextSibling?o.insertBefore(e.app,t.el.nextSibling):o.appendChild(e.app);}else t.container.appendChild(e.app);t.useAsButton?t.inline&&t.el.remove():t.el.parentNode.replaceChild(e.root,t.el),t.disabled&&this.disable(),t.comparison||(e.button.style.transition="none",t.useAsButton||(e.preview.lastColor.style.transition="none")),this.hide();}_buildComponents(){const t=this,e=this.options.components,o=(t.options.sliders||"v").repeat(2),[n,i]=o.match(/^[vh]+$/g)?o:[],s=()=>this._color||(this._color=this._lastColor.clone()),r={palette:$({element:t._root.palette.picker,wrapper:t._root.palette.palette,onstop:()=>t._emit("changestop","slider",t),onchange(o,n){if(!e.palette)return;const i=s(),{_root:r,options:a}=t,{lastColor:l,currentColor:c}=r.preview;t._recalc&&(i.s=100*o,i.v=100-100*n,i.v<0&&(i.v=0),t._updateOutput("slider"));const p=i.toRGBA().toString(0);this.element.style.background=p,this.wrapper.style.background=`\n                        linear-gradient(to top, rgba(0, 0, 0, ${i.a}), transparent),\n                        linear-gradient(to left, hsla(${i.h}, 100%, 50%, ${i.a}), rgba(255, 255, 255, ${i.a}))\n                    `,a.comparison?a.useAsButton||t._lastColor||l.style.setProperty("--pcr-color",p):(r.button.style.setProperty("--pcr-color",p),r.button.classList.remove("clear"));const u=i.toHEXA().toString();for(const{el:e,color:o}of t._swatchColors)e.classList[u===o.toHEXA().toString()?"add":"remove"]("pcr-active");c.style.setProperty("--pcr-color",p);}}),hue:$({lock:"v"===i?"h":"v",element:t._root.hue.picker,wrapper:t._root.hue.slider,onstop:()=>t._emit("changestop","slider",t),onchange(o){if(!e.hue||!e.palette)return;const n=s();t._recalc&&(n.h=360*o),this.element.style.backgroundColor=`hsl(${n.h}, 100%, 50%)`,r.palette.trigger();}}),opacity:$({lock:"v"===n?"h":"v",element:t._root.opacity.picker,wrapper:t._root.opacity.slider,onstop:()=>t._emit("changestop","slider",t),onchange(o){if(!e.opacity||!e.palette)return;const n=s();t._recalc&&(n.a=Math.round(100*o)/100),this.element.style.background=`rgba(0, 0, 0, ${n.a})`,r.palette.trigger();}}),selectable:k({elements:t._root.interaction.options,className:"active",onchange(e){t._representation=e.target.getAttribute("data-type").toUpperCase(),t._recalc&&t._updateOutput("swatch");}})};this._components=r;}_bindEvents(){const{_root:t,options:e}=this,o=[i(t.interaction.clear,"click",(()=>this._clearColor())),i([t.interaction.cancel,t.preview.lastColor],"click",(()=>{this.setHSVA(...(this._lastColor||this._color).toHSVA(),!0),this._emit("cancel");})),i(t.interaction.save,"click",(()=>{!this.applyColor()&&!e.showAlways&&this.hide();})),i(t.interaction.result,["keyup","input"],(t=>{this.setColor(t.target.value,!0)&&!this._initializingActive&&(this._emit("change",this._color,"input",this),this._emit("changestop","input",this)),t.stopImmediatePropagation();})),i(t.interaction.result,["focus","blur"],(t=>{this._recalc="blur"===t.type,this._recalc&&this._updateOutput(null);})),i([t.palette.palette,t.palette.picker,t.hue.slider,t.hue.picker,t.opacity.slider,t.opacity.picker],["mousedown","touchstart"],(()=>this._recalc=!0),{passive:!0})];if(!e.showAlways){const n=e.closeWithKey;o.push(i(t.button,"click",(()=>this.isOpen()?this.hide():this.show())),i(document,"keyup",(t=>this.isOpen()&&(t.key===n||t.code===n)&&this.hide())),i(document,["touchstart","mousedown"],(e=>{this.isOpen()&&!l(e).some((e=>e===t.app||e===t.button))&&this.hide();}),{capture:!0}));}if(e.adjustableNumbers){const e={rgba:[255,255,255,1],hsva:[360,100,100,1],hsla:[360,100,100,1],cmyk:[100,100,100,100]};p(t.interaction.result,((t,o,n)=>{const i=e[this.getColorRepresentation().toLowerCase()];if(i){const e=i[n],s=t+(e>=100?1e3*o:o);return s<=0?0:Number((s<e?s:e).toPrecision(3))}return t}));}if(e.autoReposition&&!e.inline){let t=null;const n=this;o.push(i(window,["scroll","resize"],(()=>{n.isOpen()&&(e.closeOnScroll&&n.hide(),null===t?(t=setTimeout((()=>t=null),100),requestAnimationFrame((function e(){n._rePositioningPicker(),null!==t&&requestAnimationFrame(e);}))):(clearTimeout(t),t=setTimeout((()=>t=null),100)));}),{capture:!0}));}this._eventBindings=o;}_rePositioningPicker(){const{options:t}=this;if(!t.inline){if(!this._nanopop.update({container:document.body.getBoundingClientRect(),position:t.position})){const t=this._root.app,e=t.getBoundingClientRect();t.style.top=(window.innerHeight-e.height)/2+"px",t.style.left=(window.innerWidth-e.width)/2+"px";}}}_updateOutput(t){const{_root:e,_color:o,options:n}=this;if(e.interaction.type()){const t=`to${e.interaction.type().getAttribute("data-type")}`;e.interaction.result.value="function"==typeof o[t]?o[t]().toString(n.outputPrecision):"";}!this._initializingActive&&this._recalc&&this._emit("change",o,t,this);}_clearColor(t=!1){const{_root:e,options:o}=this;o.useAsButton||e.button.style.setProperty("--pcr-color","rgba(0, 0, 0, 0.15)"),e.button.classList.add("clear"),o.showAlways||this.hide(),this._lastColor=null,this._initializingActive||t||(this._emit("save",null),this._emit("clear"));}_parseLocalColor(t){const{values:e,type:o,a:n}=w(t),{lockOpacity:i}=this.options,s=void 0!==n&&1!==n;return e&&3===e.length&&(e[3]=void 0),{values:!e||i&&s?null:e,type:o}}_t(t){return this.options.i18n[t]||L.I18N_DEFAULTS[t]}_emit(t,...e){this._eventListener[t].forEach((t=>t(...e,this)));}on(t,e){return this._eventListener[t].push(e),this}off(t,e){const o=this._eventListener[t]||[],n=o.indexOf(e);return ~n&&o.splice(n,1),this}addSwatch(t){const{values:e}=this._parseLocalColor(t);if(e){const{_swatchColors:t,_root:o}=this,n=A(...e),s=r(`<button type="button" style="--pcr-color: ${n.toRGBA().toString(0)}" aria-label="${this._t("btn:swatch")}"/>`);return o.swatches.appendChild(s),t.push({el:s,color:n}),this._eventBindings.push(i(s,"click",(()=>{this.setHSVA(...n.toHSVA(),!0),this._emit("swatchselect",n),this._emit("change",n,"swatch",this);}))),!0}return !1}removeSwatch(t){const e=this._swatchColors[t];if(e){const{el:o}=e;return this._root.swatches.removeChild(o),this._swatchColors.splice(t,1),!0}return !1}applyColor(t=!1){const{preview:e,button:o}=this._root,n=this._color.toRGBA().toString(0);return e.lastColor.style.setProperty("--pcr-color",n),this.options.useAsButton||o.style.setProperty("--pcr-color",n),o.classList.remove("clear"),this._lastColor=this._color.clone(),this._initializingActive||t||this._emit("save",this._color),this}destroy(){cancelAnimationFrame(this._setupAnimationFrame),this._eventBindings.forEach((t=>s(...t))),Object.keys(this._components).forEach((t=>this._components[t].destroy()));}destroyAndRemove(){this.destroy();const{root:t,app:e}=this._root;t.parentElement&&t.parentElement.removeChild(t),e.parentElement.removeChild(e),Object.keys(this).forEach((t=>this[t]=null));}hide(){return !!this.isOpen()&&(this._root.app.classList.remove("visible"),this._emit("hide"),!0)}show(){return !this.options.disabled&&!this.isOpen()&&(this._root.app.classList.add("visible"),this._rePositioningPicker(),this._emit("show",this._color),this)}isOpen(){return this._root.app.classList.contains("visible")}setHSVA(t=360,e=0,o=0,n=1,i=!1){const s=this._recalc;if(this._recalc=!1,t<0||t>360||e<0||e>100||o<0||o>100||n<0||n>1)return !1;this._color=A(t,e,o,n);const{hue:r,opacity:a,palette:l}=this._components;return r.update(t/360),a.update(n),l.update(e/100,1-o/100),i||this.applyColor(),s&&this._updateOutput(),this._recalc=s,!0}setColor(t,e=!1){if(null===t)return this._clearColor(e),!0;const{values:o,type:n}=this._parseLocalColor(t);if(o){const t=n.toUpperCase(),{options:i}=this._root.interaction,s=i.find((e=>e.getAttribute("data-type")===t));if(s&&!s.hidden)for(const t of i)t.classList[t===s?"add":"remove"]("active");return !!this.setHSVA(...o,e)&&this.setColorRepresentation(t)}return !1}setColorRepresentation(t){return t=t.toUpperCase(),!!this._root.interaction.options.find((e=>e.getAttribute("data-type").startsWith(t)&&!e.click()))}getColorRepresentation(){return this._representation}getColor(){return this._color}getSelectedColor(){return this._lastColor}getRoot(){return this._root}disable(){return this.hide(),this.options.disabled=!0,this._root.button.classList.add("disabled"),this}enable(){return this.options.disabled=!1,this._root.button.classList.remove("disabled"),this}}return E(L,"utils",o),E(L,"version","1.8.2"),E(L,"I18N_DEFAULTS",{"ui:dialog":"color picker dialog","btn:toggle":"toggle color picker dialog","btn:swatch":"color swatch","btn:last-color":"use previous color","btn:save":"Save","btn:cancel":"Cancel","btn:clear":"Clear","aria:btn:save":"save and close","aria:btn:cancel":"cancel and close","aria:btn:clear":"clear and close","aria:input":"color input field","aria:palette":"color selection area","aria:hue":"hue selection slider","aria:opacity":"selection slider"}),E(L,"DEFAULT_OPTIONS",{appClass:null,theme:"classic",useAsButton:!1,padding:8,disabled:!1,comparison:!0,closeOnScroll:!1,outputPrecision:0,lockOpacity:!1,autoReposition:!0,container:"body",components:{interaction:{}},i18n:{},swatches:null,inline:!1,sliders:null,default:"#42445a",defaultRepresentation:null,position:"bottom-middle",adjustableNumbers:!0,showAlways:!1,closeWithKey:"Escape"}),E(L,"create",(t=>new L(t))),e=e.default})()}));

});

var Pickr = /*@__PURE__*/getDefaultExportFromCjs(pickr_min);

const DEFAULT_SETTINGS = {
    viewMode: ViewMode.Normal,
    viewImageInEditor: true,
    viewImageInCPB: true,
    viewImageWithLink: true,
    viewImageOther: true,
    // pinMode: false,
    pinMaximum: 3,
    pinCoverMode: true,
    imageMoveSpeed: 10,
    imgTipToggle: true,
    imgFullScreenMode: IMG_FULL_SCREEN_MODE.FIT,
    imgViewBackgroundColor: IMG_DEFAULT_BACKGROUND_COLOR,
    imageBorderToggle: false,
    imageBorderWidth: IMG_BORDER_WIDTH.MEDIUM,
    imageBorderStyle: IMG_BORDER_STYLE.SOLID,
    imageBorderColor: IMG_BORDER_COLOR.RED,
    galleryNavbarToggle: true,
    galleryNavbarDefaultColor: GALLERY_NAVBAR_DEFAULT_COLOR,
    galleryNavbarHoverColor: GALLERY_NAVBAR_HOVER_COLOR,
    galleryImgBorderActive: true,
    galleryImgBorderActiveColor: GALLERY_IMG_BORDER_ACTIVE_COLOR,
    // hotkeys conf
    moveTheImageHotkey: MOVE_THE_IMAGE.DEFAULT_HOTKEY,
    switchTheImageHotkey: SWITCH_THE_IMAGE.DEFAULT_HOTKEY,
    doubleClickToolbar: TOOLBAR_CONF[3].class,
    viewTriggerHotkey: MODIFIER_HOTKEYS.NONE
};
class ImageToolkitSettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        let { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: t("IMAGE_TOOLKIT_SETTINGS_TITLE") });
        // Common Settings:
        this.displayCommonSettings(containerEl);
        // View Trigger Settings:
        this.displayViewTriggerSettings(containerEl);
        // Pin Mode Settings:
        this.displayPinModeSettings(containerEl);
        //region >>> VIEW_DETAILS_SETTINGS
        containerEl.createEl('h3', { text: t("VIEW_DETAILS_SETTINGS") });
        let imgMoveSpeedScaleText;
        new obsidian.Setting(containerEl)
            .setName(t("IMAGE_MOVE_SPEED_NAME"))
            .setDesc(t("IMAGE_MOVE_SPEED_DESC"))
            .addSlider(slider => slider
            .setLimits(1, 30, 1)
            .setValue(this.plugin.settings.imageMoveSpeed)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            imgMoveSpeedScaleText.innerText = " " + value.toString();
            this.plugin.settings.imageMoveSpeed = value;
            this.plugin.saveSettings();
        })))
            .settingEl.createDiv('', (el) => {
            imgMoveSpeedScaleText = el;
            el.style.minWidth = "2.3em";
            el.style.textAlign = "right";
            el.innerText = " " + this.plugin.settings.imageMoveSpeed.toString();
        });
        new obsidian.Setting(containerEl)
            .setName(t("IMAGE_TIP_TOGGLE_NAME"))
            .setDesc(t("IMAGE_TIP_TOGGLE_DESC"))
            .addToggle(toggle => toggle
            .setValue(this.plugin.settings.imgTipToggle)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.imgTipToggle = value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName(t("IMG_FULL_SCREEN_MODE_NAME"))
            .addDropdown((dropdown) => __awaiter(this, void 0, void 0, function* () {
            for (const key in IMG_FULL_SCREEN_MODE) {
                // @ts-ignore
                dropdown.addOption(key, t(key));
            }
            dropdown.setValue(this.plugin.settings.imgFullScreenMode);
            dropdown.onChange((option) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.imgFullScreenMode = option;
                yield this.plugin.saveSettings();
            }));
        }));
        this.createPickrSetting(containerEl, 'IMG_VIEW_BACKGROUND_COLOR_NAME', IMG_DEFAULT_BACKGROUND_COLOR);
        //endregion
        //region >>> IMAGE_BORDER_SETTINGS
        containerEl.createEl('h3', { text: t("IMAGE_BORDER_SETTINGS") });
        new obsidian.Setting(containerEl)
            .setName(t("IMAGE_BORDER_TOGGLE_NAME"))
            .setDesc(t("IMAGE_BORDER_TOGGLE_DESC"))
            .addToggle(toggle => toggle
            .setValue(this.plugin.settings.imageBorderToggle)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.imageBorderToggle = value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName(t("IMAGE_BORDER_WIDTH_NAME"))
            .addDropdown((dropdown) => __awaiter(this, void 0, void 0, function* () {
            for (const key in IMG_BORDER_WIDTH) {
                // @ts-ignore
                dropdown.addOption(IMG_BORDER_WIDTH[key], t(key));
            }
            dropdown.setValue(this.plugin.settings.imageBorderWidth);
            dropdown.onChange((option) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.imageBorderWidth = option;
                yield this.plugin.saveSettings();
            }));
        }));
        new obsidian.Setting(containerEl)
            .setName(t("IMAGE_BORDER_STYLE_NAME"))
            .addDropdown((dropdown) => __awaiter(this, void 0, void 0, function* () {
            for (const key in IMG_BORDER_STYLE) {
                // @ts-ignore
                dropdown.addOption(IMG_BORDER_STYLE[key], t(key));
            }
            dropdown.setValue(this.plugin.settings.imageBorderStyle);
            dropdown.onChange((option) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.imageBorderStyle = option;
                yield this.plugin.saveSettings();
            }));
        }));
        new obsidian.Setting(containerEl)
            .setName(t("IMAGE_BORDER_COLOR_NAME"))
            .addDropdown((dropdown) => __awaiter(this, void 0, void 0, function* () {
            for (const key in IMG_BORDER_COLOR) {
                // @ts-ignore
                dropdown.addOption(IMG_BORDER_COLOR[key], t(key));
            }
            dropdown.setValue(this.plugin.settings.imageBorderColor);
            dropdown.onChange((option) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.imageBorderColor = option;
                yield this.plugin.saveSettings();
            }));
        }));
        //endregion
        //region >>> GALLERY_NAVBAR_SETTINGS
        let galleryNavbarDefaultColorSetting, galleryNavbarHoverColorSetting, galleryImgBorderToggleSetting, galleryImgBorderActiveColorSetting;
        containerEl.createEl('h3', { text: t("GALLERY_NAVBAR_SETTINGS") });
        new obsidian.Setting(containerEl)
            .setName(t("GALLERY_NAVBAR_TOGGLE_NAME"))
            .setDesc(t("GALLERY_NAVBAR_TOGGLE_DESC"))
            .addToggle(toggle => toggle
            .setValue(this.plugin.settings.galleryNavbarToggle)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.galleryNavbarToggle = value;
            this.switchSettingsDisabled(!value, galleryNavbarDefaultColorSetting, galleryNavbarHoverColorSetting, galleryImgBorderToggleSetting, galleryImgBorderActiveColorSetting);
            yield this.plugin.saveSettings();
        })));
        galleryNavbarDefaultColorSetting = this.createPickrSetting(containerEl, 'GALLERY_NAVBAR_DEFAULT_COLOR_NAME', GALLERY_NAVBAR_DEFAULT_COLOR);
        galleryNavbarHoverColorSetting = this.createPickrSetting(containerEl, 'GALLERY_NAVBAR_HOVER_COLOR_NAME', GALLERY_NAVBAR_HOVER_COLOR);
        galleryImgBorderToggleSetting = new obsidian.Setting(containerEl)
            .setName(t("GALLERY_IMG_BORDER_TOGGLE_NAME"))
            .setDesc(t("GALLERY_IMG_BORDER_TOGGLE_DESC"))
            .addToggle(toggle => toggle
            .setValue(this.plugin.settings.galleryImgBorderActive)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.galleryImgBorderActive = value;
            yield this.plugin.saveSettings();
        })));
        galleryImgBorderActiveColorSetting = this.createPickrSetting(containerEl, 'GALLERY_IMG_BORDER_ACTIVE_COLOR_NAME', GALLERY_IMG_BORDER_ACTIVE_COLOR);
        this.switchSettingsDisabled(!this.plugin.settings.galleryNavbarToggle, galleryNavbarDefaultColorSetting, galleryNavbarHoverColorSetting, galleryImgBorderToggleSetting, galleryImgBorderActiveColorSetting);
        //endregion
        //region >>> HOTKEYS_SETTINGS
        containerEl.createEl('h3', { text: t("HOTKEY_SETTINGS") });
        containerEl.createEl('p', { text: t("HOTKEY_SETTINGS_DESC") });
        if (this.plugin.settings.moveTheImageHotkey === this.plugin.settings.switchTheImageHotkey) {
            this.plugin.settings.moveTheImageHotkey = MOVE_THE_IMAGE.DEFAULT_HOTKEY;
        }
        const moveTheImageSetting = new obsidian.Setting(containerEl)
            .setName(t("MOVE_THE_IMAGE_NAME"))
            .setDesc(t("MOVE_THE_IMAGE_DESC"))
            .addDropdown((dropdown) => __awaiter(this, void 0, void 0, function* () {
            dropdown.addOptions(this.getDropdownOptions());
            dropdown.setValue(this.plugin.settings.moveTheImageHotkey);
            dropdown.onChange((option) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.moveTheImageHotkey = option;
                this.checkDropdownOptions(MOVE_THE_IMAGE.CODE, switchTheImageSetting);
                yield this.plugin.saveSettings();
            }));
        })).then((setting) => {
            setting.controlEl.appendChild(createDiv('setting-editor-extra-setting-button hotkeys-settings-plus', (el) => {
                el.innerHTML = "+";
            }));
            setting.controlEl.appendChild(createDiv('setting-editor-extra-setting-button', (el) => {
                el.innerHTML = MOVE_THE_IMAGE.SVG;
            }));
        });
        if (this.plugin.settings.switchTheImageHotkey === this.plugin.settings.moveTheImageHotkey) {
            this.plugin.settings.switchTheImageHotkey = SWITCH_THE_IMAGE.DEFAULT_HOTKEY;
        }
        const switchTheImageSetting = new obsidian.Setting(containerEl)
            .setName(t("SWITCH_THE_IMAGE_NAME"))
            .setDesc(t("SWITCH_THE_IMAGE_DESC"))
            .addDropdown((dropdown) => __awaiter(this, void 0, void 0, function* () {
            dropdown.addOptions(this.getDropdownOptions());
            dropdown.setValue(this.plugin.settings.switchTheImageHotkey);
            dropdown.onChange((option) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.switchTheImageHotkey = option;
                this.checkDropdownOptions(SWITCH_THE_IMAGE.CODE, moveTheImageSetting);
                yield this.plugin.saveSettings();
            }));
        })).then((setting) => {
            setting.controlEl.appendChild(createDiv('setting-editor-extra-setting-button hotkeys-settings-plus', (el) => {
                el.innerHTML = "+";
            }));
            setting.controlEl.appendChild(createDiv('setting-editor-extra-setting-button', (el) => {
                el.innerHTML = SWITCH_THE_IMAGE.SVG;
            }));
        });
        if (switchTheImageSetting) {
            this.checkDropdownOptions(MOVE_THE_IMAGE.CODE, switchTheImageSetting);
        }
        if (moveTheImageSetting) {
            this.checkDropdownOptions(SWITCH_THE_IMAGE.CODE, moveTheImageSetting);
        }
        new obsidian.Setting(containerEl)
            .setName(t("DOUBLE_CLICK_TOOLBAR_NAME"))
            .addDropdown((dropdown) => __awaiter(this, void 0, void 0, function* () {
            for (const conf of TOOLBAR_CONF) {
                if (!conf.enableHotKey)
                    continue;
                // @ts-ignore
                dropdown.addOption(conf.class, t(conf.title));
            }
            dropdown.setValue(this.plugin.settings.doubleClickToolbar);
            dropdown.onChange((option) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.doubleClickToolbar = option;
                yield this.plugin.saveSettings();
            }));
        }));
        new obsidian.Setting(containerEl)
            .setName(t("VIEW_TRIGGER_HOTKEY_NAME"))
            .setDesc(t("VIEW_TRIGGER_HOTKEY_DESC"))
            .addDropdown((dropdown) => __awaiter(this, void 0, void 0, function* () {
            dropdown.addOptions(this.getDropdownOptions());
            dropdown.setValue(this.plugin.settings.viewTriggerHotkey);
            dropdown.onChange((option) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.viewTriggerHotkey = option;
                yield this.plugin.saveSettings();
            }));
        }));
        //endregion
    }
    displayCommonSettings(containerEl) {
        containerEl.createEl('h3', { text: t('COMMON_SETTINGS') });
        new obsidian.Setting(containerEl)
            .setName(t("VIEW_MODE_NAME"))
            .addDropdown((dropdown) => __awaiter(this, void 0, void 0, function* () {
            for (const key in ViewMode) {
                // @ts-ignore
                dropdown.addOption(key, t('VIEW_MODE_' + key.toUpperCase()));
            }
            dropdown.setValue(this.plugin.settings.viewMode);
            dropdown.onChange((option) => __awaiter(this, void 0, void 0, function* () {
                yield this.plugin.switchViewMode(option);
            }));
        }));
    }
    displayViewTriggerSettings(containerEl) {
        containerEl.createEl('h3', { text: t("VIEW_TRIGGER_SETTINGS") });
        new obsidian.Setting(containerEl)
            .setName(t("VIEW_IMAGE_IN_EDITOR_NAME"))
            .setDesc(t("VIEW_IMAGE_IN_EDITOR_DESC"))
            .addToggle(toggle => toggle
            .setValue(this.plugin.settings.viewImageInEditor)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.viewImageInEditor = value;
            this.plugin.refreshViewTrigger();
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName(t("VIEW_IMAGE_IN_CPB_NAME"))
            .setDesc(t("VIEW_IMAGE_IN_CPB_DESC"))
            .addToggle(toggle => toggle
            .setValue(this.plugin.settings.viewImageInCPB)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.viewImageInCPB = value;
            this.plugin.refreshViewTrigger();
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName(t("VIEW_IMAGE_WITH_A_LINK_NAME"))
            .setDesc(t("VIEW_IMAGE_WITH_A_LINK_DESC"))
            .addToggle(toggle => toggle
            .setValue(this.plugin.settings.viewImageWithLink)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.viewImageWithLink = value;
            this.plugin.refreshViewTrigger();
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName(t("VIEW_IMAGE_OTHER_NAME"))
            .setDesc(t("VIEW_IMAGE_OTHER_DESC"))
            .addToggle(toggle => toggle
            .setValue(this.plugin.settings.viewImageOther)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.viewImageOther = value;
            this.plugin.refreshViewTrigger();
            yield this.plugin.saveSettings();
        })));
    }
    displayPinModeSettings(containerEl) {
        //region >>> PIN_MODE_SETTINGS
        let pinMaximumSetting;
        containerEl.createEl('h3', { text: t("PIN_MODE_SETTINGS") });
        /*new Setting(containerEl)
          .setName(t("PIN_MODE_NAME"))
          .setDesc(t("PIN_MODE_DESC"))
          .addToggle(toggle => toggle
            .setValue(this.plugin.settings.pinMode)
            .onChange(async (value) => {
              this.plugin.settings.pinMode = value;
              this.switchSettingsDisabled(!value, pinMaximumSetting, pinCoverSetting);
              //this.plugin.togglePinMode(value);
              await this.plugin.saveSettings();
            }));*/
        let pinMaximumScaleText;
        pinMaximumSetting = new obsidian.Setting(containerEl)
            .setName(t("PIN_MAXIMUM_NAME"))
            .addSlider(slider => slider
            .setLimits(1, 5, 1)
            .setValue(this.plugin.settings.pinMaximum)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            pinMaximumScaleText.innerText = " " + value.toString();
            this.plugin.settings.pinMaximum = value;
            // this.plugin.containerView?.setPinMaximum(value);
            this.plugin.saveSettings();
        })));
        pinMaximumSetting.settingEl.createDiv('', (el) => {
            pinMaximumScaleText = el;
            el.style.minWidth = "2.3em";
            el.style.textAlign = "right";
            el.innerText = " " + this.plugin.settings.pinMaximum.toString();
        });
        new obsidian.Setting(containerEl)
            .setName(t("PIN_COVER_NAME"))
            .setDesc(t("PIN_COVER_DESC"))
            .addToggle(toggle => toggle
            .setValue(this.plugin.settings.pinCoverMode)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.pinCoverMode = value;
            yield this.plugin.saveSettings();
        })));
        //this.switchSettingsDisabled(!this.plugin.settings.pinMode, pinMaximumSetting, pinCoverSetting);
        //endregion
    }
    switchSettingsDisabled(disabled, ...settings) {
        for (const setting of settings) {
            setting === null || setting === void 0 ? void 0 : setting.setDisabled(disabled);
        }
    }
    createPickrSetting(containerEl, name, defaultColor) {
        let pickrDefault;
        if ('GALLERY_NAVBAR_DEFAULT_COLOR_NAME' === name) {
            pickrDefault = this.plugin.settings.galleryNavbarDefaultColor;
        }
        else if ('GALLERY_NAVBAR_HOVER_COLOR_NAME' === name) {
            pickrDefault = this.plugin.settings.galleryNavbarHoverColor;
        }
        else if ('GALLERY_IMG_BORDER_ACTIVE_COLOR_NAME' === name) {
            pickrDefault = this.plugin.settings.galleryImgBorderActiveColor;
        }
        else if ('IMG_VIEW_BACKGROUND_COLOR_NAME' === name) {
            pickrDefault = this.plugin.settings.imgViewBackgroundColor;
        }
        else {
            pickrDefault = defaultColor;
        }
        let pickr;
        return new obsidian.Setting(containerEl)
            // @ts-ignore
            .setName(t(name))
            .then((setting) => {
            pickr = Pickr.create({
                el: setting.controlEl.createDiv({ cls: "picker" }),
                theme: 'nano',
                position: "left-middle",
                lockOpacity: false,
                default: pickrDefault,
                swatches: [],
                components: {
                    preview: true,
                    hue: true,
                    opacity: true,
                    interaction: {
                        hex: true,
                        rgba: true,
                        hsla: false,
                        input: true,
                        cancel: true,
                        save: true,
                    },
                }
            })
                .on('show', (color, instance) => {
                if (!this.plugin.settings.galleryNavbarToggle)
                    pickr === null || pickr === void 0 ? void 0 : pickr.hide();
                const { result } = pickr.getRoot().interaction;
                requestAnimationFrame(() => requestAnimationFrame(() => result.select()));
            })
                .on('save', (color, instance) => {
                if (!color)
                    return;
                instance.hide();
                const savedColor = color.toHEXA().toString();
                instance.addSwatch(savedColor);
                this.setAndSavePickrSetting(name, savedColor);
            })
                .on('cancel', (instance) => {
                instance.hide();
            });
        })
            .addExtraButton((btn) => {
            btn.setIcon("reset")
                .onClick(() => {
                pickr.setColor(defaultColor);
                this.setAndSavePickrSetting(name, defaultColor);
            })
                .setTooltip('restore default color');
        });
    }
    setAndSavePickrSetting(name, savedColor) {
        if ('GALLERY_NAVBAR_DEFAULT_COLOR_NAME' === name) {
            this.plugin.settings.galleryNavbarDefaultColor = savedColor;
        }
        else if ('GALLERY_NAVBAR_HOVER_COLOR_NAME' === name) {
            this.plugin.settings.galleryNavbarHoverColor = savedColor;
        }
        else if ('GALLERY_IMG_BORDER_ACTIVE_COLOR_NAME' === name) {
            this.plugin.settings.galleryImgBorderActiveColor = savedColor;
        }
        else if ('IMG_VIEW_BACKGROUND_COLOR_NAME' === name) {
            this.plugin.settings.imgViewBackgroundColor = savedColor;
            // this.plugin.containerView?.setImgViewDefaultBackgroundForImgList();
            this.plugin.getAllContainerViews().forEach(container => {
                container.setImgViewDefaultBackgroundForImgList();
            });
        }
        this.plugin.saveSettings();
    }
    getDropdownOptions() {
        let options = {};
        for (const key in MODIFIER_HOTKEYS) {
            //@ts-ignore
            options[key] = t(key);
        }
        return options;
    }
    checkDropdownOptions(code, setting) {
        if (!setting || !setting.controlEl)
            return;
        const optionElList = setting.controlEl.getElementsByClassName('dropdown')[0].getElementsByTagName('option');
        for (let i = 0, size = optionElList.length; i < size; i++) {
            if (code === MOVE_THE_IMAGE.CODE) {
                optionElList[i].disabled = optionElList[i].value === this.plugin.settings.moveTheImageHotkey;
            }
            else if (code === SWITCH_THE_IMAGE.CODE) {
                optionElList[i].disabled = optionElList[i].value === this.plugin.settings.switchTheImageHotkey;
            }
        }
    }
}

/**
 * ts class object: image operating status
 */
class ImgStatusCto {
    constructor() {
        // true: the popup layer of viewing image is displayed
        this.popup = false;
        // whether the image is being dragged
        this.dragging = false;
        // keybord pressing status
        this.arrowUp = false;
        this.arrowDown = false;
        this.arrowLeft = false;
        this.arrowRight = false;
        this.fullScreen = false;
        this.activeImgZIndex = 0; /*--layer-status-bar*/
        this.clickCount = 0;
    }
}
/**
 * ts class object: image information including all html elements
 */
class ImgInfoCto {
    constructor() {
        this.imgList = new Array();
        this.getPopupImgNum = () => {
            let num = 0;
            for (const imgCto of this.imgList) {
                if (imgCto.popup)
                    num++;
            }
            return num;
        };
    }
}
class ImgCto {
    constructor(index, mtime, imgViewEl) {
        this.popup = false;
        this.zIndex = 0;
        this.curWidth = 0; // image's current width
        this.curHeight = 0;
        this.realWidth = 0; // image's real width
        this.realHeight = 0;
        this.left = 0; // margin-left
        this.top = 0; // margin-top
        this.moveX = 0; // 鼠标相对于图片的位置
        this.moveY = 0;
        this.rotate = 0; // rotateDeg
        this.invertColor = false;
        this.scaleX = false; // scaleX(-1)
        this.scaleY = false; // scaleY(-1)
        this.fullScreen = false; // whether the image is being previewed in full-screen mode
        this.defaultImgStyle = {
            transform: 'none',
            filter: 'none',
            mixBlendMode: 'normal',
            borderWidth: '',
            borderStyle: '',
            borderColor: ''
        };
        this.index = index;
        this.mtime = mtime;
        this.imgViewEl = imgViewEl;
    }
}

/**
 * Image utility class
 */
class ImgUtil {
    static copyText(text) {
        navigator.clipboard.writeText(text)
            .then(() => {
            //console.log('copyText:', copyText);
        })
            .catch(err => {
            console.error('copy text error', err);
        });
    }
    static copyImage(imgEle, width, height) {
        let image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = imgEle.src;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0);
            try {
                canvas.toBlob((blob) => __awaiter(this, void 0, void 0, function* () {
                    yield navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
                        .then(() => {
                        new obsidian.Notice(t("COPY_IMAGE_SUCCESS"));
                    }, () => {
                        new obsidian.Notice(t("COPY_IMAGE_ERROR"));
                    });
                }));
            }
            catch (error) {
                new obsidian.Notice(t("COPY_IMAGE_ERROR"));
                console.error(error);
            }
        };
        image.onerror = () => {
            new obsidian.Notice(t("COPY_IMAGE_ERROR"));
        };
    }
}
ImgUtil.calculateImgZoomSize = (realImg, imgCto, windowWidth, windowHeight) => {
    if (!windowWidth) {
        windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
    }
    if (!windowHeight) {
        windowHeight = (document.documentElement.clientHeight || document.body.clientHeight) - 100;
    }
    const windowZoomWidth = windowWidth * ZOOM_FACTOR;
    const windowZoomHeight = windowHeight * ZOOM_FACTOR;
    let tempWidth = realImg.width, tempHeight = realImg.height;
    if (realImg.height > windowZoomHeight) {
        tempHeight = windowZoomHeight;
        if ((tempWidth = tempHeight / realImg.height * realImg.width) > windowZoomWidth) {
            tempWidth = windowZoomWidth;
        }
    }
    else if (realImg.width > windowZoomWidth) {
        tempWidth = windowZoomWidth;
        tempHeight = tempWidth / realImg.width * realImg.height;
    }
    tempHeight = tempWidth * realImg.height / realImg.width;
    // cache image info: curWidth, curHeight, realWidth, realHeight, left, top
    imgCto.left = (windowWidth - tempWidth) / 2;
    imgCto.top = (windowHeight - tempHeight) / 2;
    imgCto.curWidth = tempWidth;
    imgCto.curHeight = tempHeight;
    imgCto.realWidth = realImg.width;
    imgCto.realHeight = realImg.height;
    /* console.log('calculateImgZoomSize', 'realImg: ' + realImg.width + ',' + realImg.height,
        'tempSize: ' + tempWidth + ',' + tempHeight,
        'windowZoomSize: ' + windowZoomWidth + ',' + windowZoomHeight,
        'windowSize: ' + windowWidth + ',' + windowHeight); */
    return imgCto;
};
/**
 * zoom an image
 * @param ratio
 * @param targetImgInfo
 * @param offsetSize
 * @param actualSize
 * @returns
 */
ImgUtil.zoom = (ratio, targetImgInfo, offsetSize, actualSize) => {
    let zoomRatio;
    if (!actualSize) {
        const zoomInFlag = ratio > 0;
        ratio = zoomInFlag ? 1 + ratio : 1 / (1 - ratio);
        zoomRatio = targetImgInfo.curWidth * ratio / targetImgInfo.realWidth;
    }
    // Snap to 100% zoom when we pass over it
    const curRatio = targetImgInfo.curWidth / targetImgInfo.realWidth;
    if (actualSize || (curRatio < 1 && zoomRatio > 1) || (curRatio > 1 && zoomRatio < 1)) {
        // set zoom ratio to 100%
        zoomRatio = 1;
        // reduce snap offset ratio accordingly
        ratio = 1 / curRatio;
    }
    let newWidth = targetImgInfo.realWidth * zoomRatio;
    let newHeight = targetImgInfo.realHeight * zoomRatio;
    if (IMG_VIEW_MIN >= newWidth || IMG_VIEW_MIN >= newHeight) {
        // set minimum width or height
        if (IMG_VIEW_MIN >= newWidth) {
            newWidth = IMG_VIEW_MIN;
            newHeight = (newWidth * targetImgInfo.realHeight) / targetImgInfo.realWidth;
        }
        else {
            newHeight = IMG_VIEW_MIN;
            newWidth = (newHeight * targetImgInfo.realWidth) / targetImgInfo.realHeight;
        }
        ratio = 1;
    }
    const left = targetImgInfo.left + offsetSize.offsetX * (1 - ratio);
    const top = targetImgInfo.top + offsetSize.offsetY * (1 - ratio);
    // cache image info: curWidth, curHeight, left, top
    targetImgInfo.curWidth = newWidth;
    targetImgInfo.curHeight = newHeight;
    targetImgInfo.left = left;
    targetImgInfo.top = top;
    // return { newWidth, left, top };
    return targetImgInfo;
};
ImgUtil.transform = (targetImgInfo) => {
    let transform = 'rotate(' + targetImgInfo.rotate + 'deg)';
    if (targetImgInfo.scaleX) {
        transform += ' scaleX(-1)';
    }
    if (targetImgInfo.scaleY) {
        transform += ' scaleY(-1)';
    }
    targetImgInfo.imgViewEl.style.setProperty('transform', transform);
};
ImgUtil.rotate = (degree, targetImgInfo) => {
    targetImgInfo.imgViewEl.style.setProperty('transform', 'rotate(' + (targetImgInfo.rotate += degree) + 'deg)');
};
ImgUtil.invertImgColor = (imgEle, open) => {
    if (open) {
        imgEle.style.setProperty('filter', 'invert(1) hue-rotate(180deg)');
        imgEle.style.setProperty('mix-blend-mode', 'screen');
    }
    else {
        imgEle.style.setProperty('filter', 'none');
        imgEle.style.setProperty('mix-blend-mode', 'normal');
    }
    // open ? imgEle.addClass('image-toolkit-img-invert') : imgEle.removeClass('image-toolkit-img-invert');
};

class ContainerView {
    constructor(plugin) {
        this.lastClickedImgDefaultStyle = {
            borderWidth: '',
            borderStyle: '',
            borderColor: ''
        };
        this.imgGlobalStatus = new ImgStatusCto();
        this.imgInfo = new ImgInfoCto();
        this.getViewMode = () => {
            return this.plugin.settings.viewMode;
        };
        this.isPinMode = () => {
            return ViewMode.Pin === this.getViewMode();
        };
        this.isNormalMode = () => {
            return ViewMode.Normal === this.getViewMode();
        };
        this.setMenuView = (menuView) => {
            this.menuView = menuView;
        };
        this.getPlugin = () => {
            return this.plugin;
        };
        this.getLastClickedImgEl = () => {
            return this.lastClickedImgEl;
        };
        this.getActiveImg = () => {
            return this.imgGlobalStatus.activeImg;
        };
        this.getDoc = () => {
            return this.doc;
        };
        /*public setPinMaximum = (val: number) => {
          this.pinMaximum = val;
        }*/
        this.getOitContainerViewEl = () => {
            return this.imgInfo.imgContainerEl;
        };
        this.getParentContainerEl = (targetEl) => {
            if (!targetEl) {
                return this.parentContainerEl;
            }
            if (!this.parentContainerEl) {
                this.parentContainerEl = targetEl.matchParent('body');
                this.doc = this.parentContainerEl.ownerDocument;
            }
            return this.parentContainerEl;
        };
        //region ================== Container View & Init ========================
        /**
         * Render when clicking an image (core step)
         * @param targetEl clicked image's element
         * @returns
         */
        this.renderContainer = (targetEl) => {
            if (!this.checkStatus())
                return;
            const matchedImg = this.initContainerView(targetEl, this.getParentContainerEl(targetEl));
            if (!matchedImg)
                return;
            this.openOitContainerView(matchedImg);
            this.renderGalleryNavbar();
            this.refreshImg(matchedImg, targetEl.src, targetEl.alt);
            matchedImg.mtime = new Date().getTime();
        };
        /**
         * initContainerDom ->
         * @param targetEl
         * @param parentContainerEl  targetEl's body
         */
        this.initContainerView = (targetEl, parentContainerEl) => {
            const matchedImg = this.initContainerDom(parentContainerEl);
            if (!matchedImg)
                return null;
            matchedImg.targetOriginalImgEl = targetEl;
            this.restoreBorderForLastClickedImg();
            this.initDefaultData(matchedImg, window.getComputedStyle(targetEl));
            this.addBorderForLastClickedImg(targetEl);
            this.addOrRemoveEvents(matchedImg, true); // add events
            return matchedImg;
        };
        this.removeOitContainerView = () => {
            var _a;
            this.restoreBorderForLastClickedImg();
            this.removeGalleryNavbar();
            (_a = this.imgInfo.oitContainerEl) === null || _a === void 0 ? void 0 : _a.remove();
            this.imgInfo.oitContainerEl = null;
            this.imgInfo.imgContainerEl = null;
            this.imgGlobalStatus.dragging = false;
            this.imgGlobalStatus.popup = false;
            this.imgGlobalStatus.activeImgZIndex = 0;
            this.imgGlobalStatus.fullScreen = false;
            this.imgGlobalStatus.activeImg = null;
            // clear imgList
            this.imgInfo.imgList.length = 0;
        };
        this.checkStatus = () => {
            const viewMode = this.plugin.getViewMode();
            if (!viewMode)
                return false;
            // none of popped-up-images
            if (!this.imgGlobalStatus.popup)
                return true;
            // Pin mode && Cover mode
            if (this.isPinMode() && this.plugin.settings.pinCoverMode)
                return true;
            // configured max images > current pop-up images
            if (this.getConfiguredPinMaximum() > this.imgInfo.getPopupImgNum())
                return true;
            new obsidian.Notice(t("PIN_MAXIMUM_NOTICE"));
            return false;
        };
        this.getConfiguredPinMaximum = () => {
            if (this.isPinMode())
                return this.plugin.settings.pinMaximum;
            return 1;
        };
        this.initDefaultData = (matchedImg, targetImgStyle) => {
            if (targetImgStyle) {
                matchedImg.defaultImgStyle.transform = 'none';
                matchedImg.defaultImgStyle.filter = targetImgStyle.filter;
                matchedImg.defaultImgStyle.mixBlendMode = targetImgStyle.mixBlendMode;
                matchedImg.defaultImgStyle.borderWidth = targetImgStyle.borderWidth;
                matchedImg.defaultImgStyle.borderStyle = targetImgStyle.borderStyle;
                matchedImg.defaultImgStyle.borderColor = targetImgStyle.borderColor;
                this.lastClickedImgDefaultStyle.borderWidth = targetImgStyle.borderWidth;
                this.lastClickedImgDefaultStyle.borderStyle = targetImgStyle.borderStyle;
                this.lastClickedImgDefaultStyle.borderColor = targetImgStyle.borderColor;
            }
            this.imgGlobalStatus.dragging = false;
            this.imgGlobalStatus.arrowUp = false;
            this.imgGlobalStatus.arrowDown = false;
            this.imgGlobalStatus.arrowLeft = false;
            this.imgGlobalStatus.arrowRight = false;
            matchedImg.invertColor = false;
            matchedImg.scaleX = false;
            matchedImg.scaleY = false;
            matchedImg.fullScreen = false;
            if (!this.imgGlobalStatus.popup) {
                this.resetClickTimer();
            }
        };
        /**
         * set 'data-oit-target' and lastClickedImgEl
         * @param targetEl
         */
        this.setLastClickedImg = (targetEl) => {
            if (!targetEl)
                return;
            // 'data-oit-target' is set for locating current image
            targetEl.setAttribute('data-oit-target', '1');
            this.lastClickedImgEl = targetEl;
        };
        //endregion
        //region ================== (Original) Image Border ========================
        this.addBorderForLastClickedImg = (targetEl) => {
            this.setLastClickedImg(targetEl);
            if (!targetEl || !this.plugin.settings.imageBorderToggle)
                return;
            const lastClickedImgStyle = targetEl === null || targetEl === void 0 ? void 0 : targetEl.style;
            if (!lastClickedImgStyle)
                return;
            lastClickedImgStyle.setProperty('border-width', this.plugin.settings.imageBorderWidth);
            lastClickedImgStyle.setProperty('border-style', this.plugin.settings.imageBorderStyle);
            lastClickedImgStyle.setProperty('border-color', this.plugin.settings.imageBorderColor);
        };
        /**
         * remove 'data-oit-target'
         * restore default border style
         */
        this.restoreBorderForLastClickedImg = () => {
            if (!this.lastClickedImgEl)
                return;
            this.lastClickedImgEl.removeAttribute('data-oit-target');
            const lastClickedImgStyle = this.lastClickedImgEl.style;
            if (lastClickedImgStyle) {
                lastClickedImgStyle.setProperty('border-width', this.lastClickedImgDefaultStyle.borderWidth);
                lastClickedImgStyle.setProperty('border-style', this.lastClickedImgDefaultStyle.borderStyle);
                lastClickedImgStyle.setProperty('border-color', this.lastClickedImgDefaultStyle.borderColor);
            }
        };
        //endregion
        //region ================== Image ========================
        this.updateImgViewElAndList = (imgInfo) => {
            if (!(imgInfo === null || imgInfo === void 0 ? void 0 : imgInfo.imgContainerEl))
                return;
            const pinMaximum = this.getConfiguredPinMaximum();
            const imgNum = this.imgInfo.imgList.length;
            if (pinMaximum < imgNum) {
                // remove all imgViewEl and imgList
                imgInfo.imgContainerEl.innerHTML = '';
                // clear imgList
                imgInfo.imgList.length = 0;
            }
            // let isUpdate: boolean = false;
            const curTime = new Date().getTime();
            for (let i = imgNum; i < pinMaximum; i++) {
                // <div class="oit-img-container"> `<img class='oit-img-view' data-index='0' src='' alt=''>` </div>
                let imgViewEl = createEl('img');
                imgViewEl.addClass(OIT_CLASS.IMG_VIEW);
                imgViewEl.hidden = true; // hide 'oit-img-view' for now
                imgViewEl.dataset.index = i + ''; // set data-index
                this.setImgViewDefaultBackground(imgViewEl);
                imgInfo.imgContainerEl.appendChild(imgViewEl);
                // cache imgList
                imgInfo.imgList.push(new ImgCto(i, curTime, imgViewEl));
                // isUpdate = true;
            }
        };
        this.getMatchedImg = () => {
            let earliestImg;
            for (const img of this.imgInfo.imgList) {
                if (!earliestImg || earliestImg.mtime > img.mtime)
                    earliestImg = img;
                if (img.popup)
                    continue;
                return img;
            }
            if (this.plugin.settings.pinCoverMode) {
                return earliestImg;
            }
            return null;
        };
        /**
         * it may from: renderContainerView(), switch GalleryNavbarView, click toolbar_refresh
         * @param imgCto
         * @param imgSrc
         * @param imgAlt
         * @param imgTitleIndex
         */
        this.refreshImg = (imgCto, imgSrc, imgAlt, imgTitleIndex) => {
            if (!imgSrc)
                imgSrc = imgCto.imgViewEl.src;
            if (!imgAlt)
                imgAlt = imgCto.imgViewEl.alt;
            this.renderImgTitle(imgAlt, imgTitleIndex);
            if (imgSrc) {
                if (imgCto.refreshImgInterval) {
                    clearInterval(imgCto.refreshImgInterval);
                    imgCto.refreshImgInterval = null;
                }
                let realImg = new Image();
                realImg.src = imgSrc;
                imgCto.refreshImgInterval = setInterval((realImg) => {
                    var _a, _b;
                    if (realImg.width > 0 || realImg.height > 0) {
                        clearInterval(imgCto.refreshImgInterval);
                        imgCto.refreshImgInterval = null;
                        this.setImgViewPosition(ImgUtil.calculateImgZoomSize(realImg, imgCto, (_a = this.parentContainerEl) === null || _a === void 0 ? void 0 : _a.clientWidth, (_b = this.parentContainerEl) === null || _b === void 0 ? void 0 : _b.clientHeight), 0);
                        this.renderImgView(imgCto.imgViewEl, imgSrc, imgAlt);
                        this.renderImgTip(imgCto);
                        imgCto.imgViewEl.style.setProperty('transform', imgCto.defaultImgStyle.transform);
                        imgCto.imgViewEl.style.setProperty('filter', imgCto.defaultImgStyle.filter);
                        imgCto.imgViewEl.style.setProperty('mix-blend-mode', imgCto.defaultImgStyle.mixBlendMode);
                    }
                }, 40, realImg);
            }
        };
        this.renderImgTitle = (name, index) => {
        };
        this.setImgViewPosition = (imgZoomSize, rotate) => {
            const imgViewEl = imgZoomSize.imgViewEl;
            if (!imgViewEl)
                return;
            if (imgZoomSize) {
                imgViewEl.setAttribute('width', imgZoomSize.curWidth + 'px');
                imgViewEl.style.setProperty('margin-top', imgZoomSize.top + 'px', 'important');
                imgViewEl.style.setProperty('margin-left', imgZoomSize.left + 'px', 'important');
            }
            const rotateDeg = rotate ? rotate : 0;
            imgViewEl.style.transform = 'rotate(' + rotateDeg + 'deg)';
            imgZoomSize.rotate = rotateDeg;
        };
        this.renderImgView = (imgViewEl, src, alt) => {
            if (!imgViewEl)
                return;
            imgViewEl.setAttribute('src', src);
            imgViewEl.setAttribute('alt', alt);
            imgViewEl.hidden = !src && !alt;
        };
        this.renderImgTip = (activeImg) => {
            if (!activeImg)
                activeImg = this.imgGlobalStatus.activeImg;
            if (activeImg && this.imgInfo.imgTipEl && activeImg.realWidth > 0 && activeImg.curWidth > 0) {
                if (this.imgInfo.imgTipTimeout) {
                    clearTimeout(this.imgInfo.imgTipTimeout);
                }
                if (this.plugin.settings.imgTipToggle) {
                    this.imgInfo.imgTipEl.hidden = false; // display 'oit-img-tip'
                    const ratio = activeImg.curWidth * 100 / activeImg.realWidth;
                    const isSingleDigit = 10 > ratio;
                    const width = isSingleDigit ? 20 : 40;
                    const left = activeImg.left + activeImg.curWidth / 2 - width / 2;
                    const top = activeImg.top + activeImg.curHeight / 2 - 10;
                    this.imgInfo.imgTipEl.style.setProperty("width", width + 'px');
                    this.imgInfo.imgTipEl.style.setProperty("font-size", isSingleDigit || 100 >= activeImg.curWidth ? 'xx-small' : 'x-small');
                    this.imgInfo.imgTipEl.style.setProperty("left", left + 'px');
                    this.imgInfo.imgTipEl.style.setProperty("top", top + 'px');
                    this.imgInfo.imgTipEl.style.setProperty("z-index", activeImg.zIndex + '');
                    this.imgInfo.imgTipEl.setText(parseInt(ratio + '') + '%');
                    this.imgInfo.imgTipTimeout = setTimeout(() => {
                        this.imgInfo.imgTipEl.hidden = true;
                    }, 1000);
                }
                else {
                    this.imgInfo.imgTipEl.hidden = true; // hide 'oit-img-tip'
                    this.imgInfo.imgTipTimeout = null;
                }
            }
        };
        this.setImgViewDefaultBackgroundForImgList = () => {
            for (const imgCto of this.imgInfo.imgList) {
                this.setImgViewDefaultBackground(imgCto.imgViewEl);
            }
        };
        this.setImgViewDefaultBackground = (imgViewEl) => {
            if (!imgViewEl)
                return;
            if (this.plugin.settings.imgViewBackgroundColor && IMG_DEFAULT_BACKGROUND_COLOR != this.plugin.settings.imgViewBackgroundColor) {
                imgViewEl.removeClass('img-default-background');
                imgViewEl.style.setProperty('background-color', this.plugin.settings.imgViewBackgroundColor);
            }
            else {
                imgViewEl.addClass('img-default-background');
                imgViewEl.style.removeProperty('background-color');
            }
        };
        this.setActiveImgZIndex = (activeImg) => {
        };
        //endregion
        //region ================== Gallery NavBar ========================
        this.switchImageOnGalleryNavBar = (event, next) => {
        };
        this.renderGalleryNavbar = () => {
        };
        this.removeGalleryNavbar = () => {
        };
        //endregion
        //region ================== full screen ========================
        /**
         * full-screen mode
         */
        this.showPlayerImg = (activeImg) => {
            if (!activeImg && !(activeImg = this.imgGlobalStatus.activeImg))
                return;
            this.imgGlobalStatus.fullScreen = true;
            activeImg.fullScreen = true;
            // activeImg.imgViewEl.style.setProperty('display', 'none', 'important'); // hide imgViewEl
            // this.imgInfoCto.imgFooterEl?.style.setProperty('display', 'none'); // hide 'oit-img-footer'
            // show the img-player
            this.imgInfo.imgPlayerEl.style.setProperty('display', 'block');
            this.imgInfo.imgPlayerEl.style.setProperty('z-index', (this.imgGlobalStatus.activeImgZIndex + 10) + '');
            this.imgInfo.imgPlayerEl.addEventListener('click', this.closePlayerImg);
            const windowWidth = this.doc.documentElement.clientWidth || this.doc.body.clientWidth;
            const windowHeight = this.doc.documentElement.clientHeight || this.doc.body.clientHeight;
            let newWidth, newHeight;
            let top = 0;
            if (IMG_FULL_SCREEN_MODE.STRETCH == this.plugin.settings.imgFullScreenMode) {
                newWidth = windowWidth + 'px';
                newHeight = windowHeight + 'px';
            }
            else if (IMG_FULL_SCREEN_MODE.FILL == this.plugin.settings.imgFullScreenMode) {
                newWidth = '100%';
                newHeight = '100%';
            }
            else {
                // fit
                const widthRatio = windowWidth / activeImg.realWidth;
                const heightRatio = windowHeight / activeImg.realHeight;
                if (widthRatio <= heightRatio) {
                    newWidth = windowWidth;
                    newHeight = widthRatio * activeImg.realHeight;
                }
                else {
                    newHeight = windowHeight;
                    newWidth = heightRatio * activeImg.realWidth;
                }
                top = (windowHeight - newHeight) / 2;
                newWidth = newWidth + 'px';
                newHeight = newHeight + 'px';
            }
            const imgPlayerImgViewEl = this.imgInfo.imgPlayerImgViewEl;
            if (imgPlayerImgViewEl) {
                imgPlayerImgViewEl.setAttribute('src', activeImg.imgViewEl.src);
                imgPlayerImgViewEl.setAttribute('alt', activeImg.imgViewEl.alt);
                imgPlayerImgViewEl.setAttribute('width', newWidth);
                imgPlayerImgViewEl.setAttribute('height', newHeight);
                imgPlayerImgViewEl.style.setProperty('margin-top', top + 'px');
                //this.imgInfo.imgPlayerImgViewEl.style.setProperty('margin-left', left + 'px');
                this.setImgViewDefaultBackground(imgPlayerImgViewEl);
            }
        };
        /**
         * close full screen
         */
        this.closePlayerImg = () => {
            for (const imgCto of this.imgInfo.imgList) {
                if (!imgCto.fullScreen)
                    continue;
                // show the popped up image
                // imgCto.imgViewEl?.style.setProperty('display', 'block', 'important');
                // this.imgInfoCto.imgFooterEl?.style.setProperty('display', 'block');
            }
            // hide full screen
            if (this.imgInfo.imgPlayerEl) {
                this.imgInfo.imgPlayerEl.style.setProperty('display', 'none'); // hide 'img-player'
                this.imgInfo.imgPlayerEl.removeEventListener('click', this.closePlayerImg);
            }
            if (this.imgInfo.imgPlayerImgViewEl) {
                this.imgInfo.imgPlayerImgViewEl.setAttribute('src', '');
                this.imgInfo.imgPlayerImgViewEl.setAttribute('alt', '');
            }
            this.imgGlobalStatus.fullScreen = false;
        };
        //endregion
        //region ================== events ========================
        this.addOrRemoveEvents = (matchedImg, isAdd) => {
            if (isAdd) {
                if (!this.imgGlobalStatus.popup) {
                    this.doc.addEventListener('keydown', this.triggerKeydown);
                    this.doc.addEventListener('keyup', this.triggerKeyup);
                }
                if (this.isNormalMode()) {
                    // click event: hide container view
                    this.imgInfo.oitContainerEl.addEventListener('click', this.closeContainerView);
                }
                matchedImg.imgViewEl.addEventListener('mouseenter', this.mouseenterImgView);
                matchedImg.imgViewEl.addEventListener('mouseleave', this.mouseleaveImgView);
                // drag the image via mouse
                matchedImg.imgViewEl.addEventListener('mousedown', this.mousedownImgView);
                matchedImg.imgViewEl.addEventListener('mouseup', this.mouseupImgView);
                // zoom the image via mouse wheel
                matchedImg.imgViewEl.addEventListener('mousewheel', this.mousewheelViewContainer, { passive: true });
            }
            else {
                if (!this.imgGlobalStatus.popup) {
                    this.doc.removeEventListener('keydown', this.triggerKeydown);
                    this.doc.removeEventListener('keyup', this.triggerKeyup);
                    if (this.imgGlobalStatus.clickTimer) {
                        clearTimeout(this.imgGlobalStatus.clickTimer);
                        this.imgGlobalStatus.clickTimer = null;
                        this.imgGlobalStatus.clickCount = 0;
                    }
                }
                if (!this.isPinMode()) {
                    this.imgInfo.oitContainerEl.removeEventListener('click', this.closeContainerView);
                }
                matchedImg.imgViewEl.removeEventListener('mouseenter', this.mouseenterImgView);
                matchedImg.imgViewEl.removeEventListener('mouseleave', this.mouseleaveImgView);
                matchedImg.imgViewEl.removeEventListener('mousedown', this.mousedownImgView);
                matchedImg.imgViewEl.removeEventListener('mouseup', this.mouseupImgView);
                matchedImg.imgViewEl.removeEventListener('mousewheel', this.mousewheelViewContainer);
                if (matchedImg.refreshImgInterval) {
                    clearInterval(matchedImg.refreshImgInterval);
                    matchedImg.refreshImgInterval = null;
                }
            }
        };
        this.triggerKeyup = (event) => {
            // console.log('keyup', event, event.key);
            const key = event.key;
            if (!key)
                return;
            if (!('Escape' === key)) {
                event.preventDefault();
                event.stopPropagation();
            }
            switch (key) {
                case 'Escape':
                    // close full screen, hide container view
                    this.imgGlobalStatus.fullScreen ? this.closePlayerImg() : this.closeContainerView();
                    break;
                case 'ArrowUp':
                    this.imgGlobalStatus.arrowUp = false;
                    break;
                case 'ArrowDown':
                    this.imgGlobalStatus.arrowDown = false;
                    break;
                case 'ArrowLeft':
                    this.imgGlobalStatus.arrowLeft = false;
                    // switch to the previous image on the gallery navBar
                    this.switchImageOnGalleryNavBar(event, false);
                    break;
                case 'ArrowRight':
                    this.imgGlobalStatus.arrowRight = false;
                    // switch to the next image on the gallery navBar
                    this.switchImageOnGalleryNavBar(event, true);
                    break;
            }
        };
        /**
         * move the image by keyboard
         * @param event
         */
        this.triggerKeydown = (event) => {
            //console.log('keydown', event, event.key, this.imgStatus);
            if (this.isPinMode())
                return;
            event.preventDefault();
            event.stopPropagation();
            if (this.imgGlobalStatus.arrowUp && this.imgGlobalStatus.arrowLeft) {
                this.moveImgViewByHotkey(event, 'UP_LEFT');
                return;
            }
            else if (this.imgGlobalStatus.arrowUp && this.imgGlobalStatus.arrowRight) {
                this.moveImgViewByHotkey(event, 'UP_RIGHT');
                return;
            }
            else if (this.imgGlobalStatus.arrowDown && this.imgGlobalStatus.arrowLeft) {
                this.moveImgViewByHotkey(event, 'DOWN_LEFT');
                return;
            }
            else if (this.imgGlobalStatus.arrowDown && this.imgGlobalStatus.arrowRight) {
                this.moveImgViewByHotkey(event, 'DOWN_RIGHT');
                return;
            }
            switch (event.key) {
                case 'ArrowUp':
                    this.imgGlobalStatus.arrowUp = true;
                    this.moveImgViewByHotkey(event, 'UP');
                    break;
                case 'ArrowDown':
                    this.imgGlobalStatus.arrowDown = true;
                    this.moveImgViewByHotkey(event, 'DOWN');
                    break;
                case 'ArrowLeft':
                    this.imgGlobalStatus.arrowLeft = true;
                    this.moveImgViewByHotkey(event, 'LEFT');
                    break;
                case 'ArrowRight':
                    this.imgGlobalStatus.arrowRight = true;
                    this.moveImgViewByHotkey(event, 'RIGHT');
                    break;
            }
        };
        this.moveImgViewByHotkey = (event, orientation) => {
            if (!orientation || !this.imgGlobalStatus.popup || !this.checkHotkeySettings(event, this.plugin.settings.moveTheImageHotkey))
                return;
            switch (orientation) {
                case 'UP':
                    this.mousemoveImgView(null, { offsetX: 0, offsetY: -this.plugin.settings.imageMoveSpeed });
                    break;
                case 'DOWN':
                    this.mousemoveImgView(null, { offsetX: 0, offsetY: this.plugin.settings.imageMoveSpeed });
                    break;
                case 'LEFT':
                    this.mousemoveImgView(null, { offsetX: -this.plugin.settings.imageMoveSpeed, offsetY: 0 });
                    break;
                case 'RIGHT':
                    this.mousemoveImgView(null, { offsetX: this.plugin.settings.imageMoveSpeed, offsetY: 0 });
                    break;
                case 'UP_LEFT':
                    this.mousemoveImgView(null, {
                        offsetX: -this.plugin.settings.imageMoveSpeed,
                        offsetY: -this.plugin.settings.imageMoveSpeed
                    });
                    break;
                case 'UP_RIGHT':
                    this.mousemoveImgView(null, {
                        offsetX: this.plugin.settings.imageMoveSpeed,
                        offsetY: -this.plugin.settings.imageMoveSpeed
                    });
                    break;
                case 'DOWN_LEFT':
                    this.mousemoveImgView(null, {
                        offsetX: -this.plugin.settings.imageMoveSpeed,
                        offsetY: this.plugin.settings.imageMoveSpeed
                    });
                    break;
                case 'DOWN_RIGHT':
                    this.mousemoveImgView(null, {
                        offsetX: this.plugin.settings.imageMoveSpeed,
                        offsetY: this.plugin.settings.imageMoveSpeed
                    });
                    break;
            }
        };
        this.checkHotkeySettings = (event, hotkey) => {
            // console.log("[oit] checkHotkeySettings: ", event.ctrlKey, event.altKey, event.shiftKey)
            switch (hotkey) {
                case "NONE":
                    return !event.ctrlKey && !event.altKey && !event.shiftKey;
                case "CTRL":
                    return event.ctrlKey && !event.altKey && !event.shiftKey;
                case "ALT":
                    return !event.ctrlKey && event.altKey && !event.shiftKey;
                case "SHIFT":
                    return !event.ctrlKey && !event.altKey && event.shiftKey;
                case "CTRL_ALT":
                    return event.ctrlKey && event.altKey && !event.shiftKey;
                case "CTRL_SHIFT":
                    return event.ctrlKey && !event.altKey && event.shiftKey;
                case "SHIFT_ALT":
                    return !event.ctrlKey && event.altKey && event.shiftKey;
                case "CTRL_SHIFT_ALT":
                    return event.ctrlKey && event.altKey && event.shiftKey;
            }
            return false;
        };
        this.mouseenterImgView = (event) => {
            this.resetClickTimer();
            event.stopPropagation();
            event.preventDefault();
            this.getAndUpdateActiveImg(event);
            // console.log('mouseenterImgView', event, this.imgGlobalStatus.activeImg);
        };
        this.mousedownImgView = (event) => {
            // console.log('mousedownImgView', event, this.imgGlobalStatus.activeImg, event.button);
            event.stopPropagation();
            event.preventDefault();
            const activeImg = this.getAndUpdateActiveImg(event);
            if (!activeImg)
                return;
            if (0 == event.button) { // left click
                this.setClickTimer(activeImg);
                this.setActiveImgZIndex(activeImg);
                this.imgGlobalStatus.dragging = true;
                // 鼠标相对于图片的位置
                activeImg.moveX = activeImg.imgViewEl.offsetLeft - event.clientX;
                activeImg.moveY = activeImg.imgViewEl.offsetTop - event.clientY;
                // 鼠标按下时持续触发/移动事件
                activeImg.imgViewEl.onmousemove = this.mousemoveImgView;
            }
        };
        /**
         * move the image by mouse or keyboard
         * @param event
         * @param offsetSize
         */
        this.mousemoveImgView = (event, offsetSize) => {
            // console.log('mousemoveImgView', event, this.imgGlobalStatus.activeImg);
            const activeImg = this.imgGlobalStatus.activeImg;
            if (!activeImg)
                return;
            if (event) {
                if (!this.imgGlobalStatus.dragging)
                    return;
                // drag via mouse cursor (Both Mode)
                activeImg.left = event.clientX + activeImg.moveX;
                activeImg.top = event.clientY + activeImg.moveY;
            }
            else if (offsetSize) {
                // move by arrow keys (Normal Mode)
                activeImg.left += offsetSize.offsetX;
                activeImg.top += offsetSize.offsetY;
            }
            else {
                return;
            }
            // move the image
            activeImg.imgViewEl.style.setProperty('margin-left', activeImg.left + 'px', 'important');
            activeImg.imgViewEl.style.setProperty('margin-top', activeImg.top + 'px', 'important');
        };
        this.mouseupImgView = (event) => {
            var _a;
            // console.log('mouseupImgView', event, this.imgGlobalStatus.activeImg);
            this.imgGlobalStatus.dragging = false;
            event.preventDefault();
            event.stopPropagation();
            const activeImg = this.imgGlobalStatus.activeImg;
            if (activeImg) {
                activeImg.imgViewEl.onmousemove = null;
                if (2 == event.button) { // right click
                    (_a = this.menuView) === null || _a === void 0 ? void 0 : _a.show(event, activeImg);
                }
            }
        };
        this.mouseleaveImgView = (event) => {
            // console.log('mouseleaveImgView', event, this.imgGlobalStatus.activeImg, '>>> set null');
            this.imgGlobalStatus.dragging = false;
            this.resetClickTimer();
            event.preventDefault();
            event.stopPropagation();
            const activeImg = this.imgGlobalStatus.activeImg;
            if (activeImg) {
                activeImg.imgViewEl.onmousemove = null;
                this.setActiveImgForMouseEvent(null); // for pin mode
            }
        };
        this.setClickTimer = (activeImg) => {
            ++this.imgGlobalStatus.clickCount;
            clearTimeout(this.imgGlobalStatus.clickTimer);
            this.imgGlobalStatus.clickTimer = setTimeout(() => {
                const clickCount = this.imgGlobalStatus.clickCount;
                this.resetClickTimer();
                if (2 === clickCount) { // double click
                    if (!activeImg)
                        activeImg = this.imgGlobalStatus.activeImg;
                    // console.log('mousedownImgView: double click...', activeImg.index);
                    this.clickImgToolbar(null, this.plugin.settings.doubleClickToolbar, activeImg);
                }
            }, 200);
        };
        this.resetClickTimer = () => {
            this.imgGlobalStatus.clickTimer = null;
            this.imgGlobalStatus.clickCount = 0;
        };
        this.getAndUpdateActiveImg = (event) => {
            const targetEl = event.target;
            let index;
            if (!targetEl || !(index = targetEl.dataset.index))
                return;
            const activeImg = this.imgInfo.imgList[parseInt(index)];
            if (activeImg && (!this.imgGlobalStatus.activeImg || activeImg.index !== this.imgGlobalStatus.activeImg.index)) {
                this.setActiveImgForMouseEvent(activeImg); // update activeImg
            }
            // console.log('getAndUpdateActiveImg: ', activeImg)
            return activeImg;
        };
        this.mousewheelViewContainer = (event) => {
            // event.preventDefault();
            event.stopPropagation();
            // @ts-ignore
            this.zoomAndRender(0 < event.wheelDelta ? 0.1 : -0.1, event);
        };
        this.zoomAndRender = (ratio, event, actualSize, activeImg) => {
            if (!activeImg) {
                activeImg = this.imgGlobalStatus.activeImg;
            }
            let activeImgViewEl;
            if (!activeImg || !(activeImgViewEl = activeImg.imgViewEl))
                return;
            let offsetSize = { offsetX: 0, offsetY: 0 };
            if (event) {
                offsetSize.offsetX = event.offsetX;
                offsetSize.offsetY = event.offsetY;
            }
            else {
                offsetSize.offsetX = activeImg.curWidth / 2;
                offsetSize.offsetY = activeImg.curHeight / 2;
            }
            const zoomData = ImgUtil.zoom(ratio, activeImg, offsetSize, actualSize);
            this.renderImgTip(activeImg);
            activeImgViewEl.setAttribute('width', zoomData.curWidth + 'px');
            activeImgViewEl.style.setProperty('margin-top', zoomData.top + 'px', 'important');
            activeImgViewEl.style.setProperty('margin-left', zoomData.left + 'px', 'important');
        };
        this.clickImgToolbar = (event, targetElClass, activeImg) => {
            if (!targetElClass && !activeImg) {
                if (!event)
                    return;
                // comes from clicking toolbar
                targetElClass = event.target.className;
                activeImg = this.imgGlobalStatus.activeImg;
            }
            switch (targetElClass) {
                case 'toolbar_zoom_to_100':
                    this.zoomAndRender(null, null, true, activeImg);
                    break;
                case 'toolbar_zoom_in':
                    this.zoomAndRender(0.1);
                    break;
                case 'toolbar_zoom_out':
                    this.zoomAndRender(-0.1);
                    break;
                case 'toolbar_full_screen':
                    this.showPlayerImg(activeImg);
                    break;
                case 'toolbar_refresh':
                    this.refreshImg(activeImg);
                    break;
                case 'toolbar_rotate_left':
                    activeImg.rotate -= 90;
                    ImgUtil.transform(activeImg);
                    break;
                case 'toolbar_rotate_right':
                    activeImg.rotate += 90;
                    ImgUtil.transform(activeImg);
                    break;
                case 'toolbar_scale_x':
                    activeImg.scaleX = !activeImg.scaleX;
                    ImgUtil.transform(activeImg);
                    break;
                case 'toolbar_scale_y':
                    activeImg.scaleY = !activeImg.scaleY;
                    ImgUtil.transform(activeImg);
                    break;
                case 'toolbar_invert_color':
                    activeImg.invertColor = !activeImg.invertColor;
                    ImgUtil.invertImgColor(activeImg.imgViewEl, activeImg.invertColor);
                    break;
                case 'toolbar_copy':
                    ImgUtil.copyImage(activeImg.imgViewEl, activeImg.curWidth, activeImg.curHeight);
                    break;
                case 'toolbar_close':
                    this.closeContainerView(event, activeImg);
                    break;
            }
        };
        this.plugin = plugin;
    }
}

var Md5 = /** @class */ (function () {
    function Md5() {
    }
    Md5.AddUnsigned = function (lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (!!(lX4 & lY4)) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (!!(lX4 | lY4)) {
            if (!!(lResult & 0x40000000)) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            }
            else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        }
        else {
            return (lResult ^ lX8 ^ lY8);
        }
    };
    Md5.FF = function (a, b, c, d, x, s, ac) {
        a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.F(b, c, d), x), ac));
        return this.AddUnsigned(this.RotateLeft(a, s), b);
    };
    Md5.GG = function (a, b, c, d, x, s, ac) {
        a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.G(b, c, d), x), ac));
        return this.AddUnsigned(this.RotateLeft(a, s), b);
    };
    Md5.HH = function (a, b, c, d, x, s, ac) {
        a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.H(b, c, d), x), ac));
        return this.AddUnsigned(this.RotateLeft(a, s), b);
    };
    Md5.II = function (a, b, c, d, x, s, ac) {
        a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.I(b, c, d), x), ac));
        return this.AddUnsigned(this.RotateLeft(a, s), b);
    };
    Md5.ConvertToWordArray = function (string) {
        var lWordCount, lMessageLength = string.length, lNumberOfWords_temp1 = lMessageLength + 8, lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64, lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16, lWordArray = Array(lNumberOfWords - 1), lBytePosition = 0, lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };
    Md5.WordToHex = function (lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };
    Md5.Utf8Encode = function (string) {
        var utftext = "", c;
        string = string.replace(/\r\n/g, "\n");
        for (var n = 0; n < string.length; n++) {
            c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    Md5.init = function (string) {
        var temp;
        if (typeof string !== 'string')
            string = JSON.stringify(string);
        this._string = this.Utf8Encode(string);
        this.x = this.ConvertToWordArray(this._string);
        this.a = 0x67452301;
        this.b = 0xEFCDAB89;
        this.c = 0x98BADCFE;
        this.d = 0x10325476;
        for (this.k = 0; this.k < this.x.length; this.k += 16) {
            this.AA = this.a;
            this.BB = this.b;
            this.CC = this.c;
            this.DD = this.d;
            this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k], this.S11, 0xD76AA478);
            this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 1], this.S12, 0xE8C7B756);
            this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 2], this.S13, 0x242070DB);
            this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 3], this.S14, 0xC1BDCEEE);
            this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 4], this.S11, 0xF57C0FAF);
            this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 5], this.S12, 0x4787C62A);
            this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 6], this.S13, 0xA8304613);
            this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 7], this.S14, 0xFD469501);
            this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 8], this.S11, 0x698098D8);
            this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 9], this.S12, 0x8B44F7AF);
            this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 10], this.S13, 0xFFFF5BB1);
            this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 11], this.S14, 0x895CD7BE);
            this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 12], this.S11, 0x6B901122);
            this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 13], this.S12, 0xFD987193);
            this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 14], this.S13, 0xA679438E);
            this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 15], this.S14, 0x49B40821);
            this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 1], this.S21, 0xF61E2562);
            this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 6], this.S22, 0xC040B340);
            this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 11], this.S23, 0x265E5A51);
            this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k], this.S24, 0xE9B6C7AA);
            this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 5], this.S21, 0xD62F105D);
            this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 10], this.S22, 0x2441453);
            this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 15], this.S23, 0xD8A1E681);
            this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 4], this.S24, 0xE7D3FBC8);
            this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 9], this.S21, 0x21E1CDE6);
            this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 14], this.S22, 0xC33707D6);
            this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 3], this.S23, 0xF4D50D87);
            this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 8], this.S24, 0x455A14ED);
            this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 13], this.S21, 0xA9E3E905);
            this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 2], this.S22, 0xFCEFA3F8);
            this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 7], this.S23, 0x676F02D9);
            this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 12], this.S24, 0x8D2A4C8A);
            this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 5], this.S31, 0xFFFA3942);
            this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 8], this.S32, 0x8771F681);
            this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 11], this.S33, 0x6D9D6122);
            this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 14], this.S34, 0xFDE5380C);
            this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 1], this.S31, 0xA4BEEA44);
            this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 4], this.S32, 0x4BDECFA9);
            this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 7], this.S33, 0xF6BB4B60);
            this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 10], this.S34, 0xBEBFBC70);
            this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 13], this.S31, 0x289B7EC6);
            this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k], this.S32, 0xEAA127FA);
            this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 3], this.S33, 0xD4EF3085);
            this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 6], this.S34, 0x4881D05);
            this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 9], this.S31, 0xD9D4D039);
            this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 12], this.S32, 0xE6DB99E5);
            this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 15], this.S33, 0x1FA27CF8);
            this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 2], this.S34, 0xC4AC5665);
            this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k], this.S41, 0xF4292244);
            this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 7], this.S42, 0x432AFF97);
            this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 14], this.S43, 0xAB9423A7);
            this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 5], this.S44, 0xFC93A039);
            this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 12], this.S41, 0x655B59C3);
            this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 3], this.S42, 0x8F0CCC92);
            this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 10], this.S43, 0xFFEFF47D);
            this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 1], this.S44, 0x85845DD1);
            this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 8], this.S41, 0x6FA87E4F);
            this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 15], this.S42, 0xFE2CE6E0);
            this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 6], this.S43, 0xA3014314);
            this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 13], this.S44, 0x4E0811A1);
            this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 4], this.S41, 0xF7537E82);
            this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 11], this.S42, 0xBD3AF235);
            this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 2], this.S43, 0x2AD7D2BB);
            this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 9], this.S44, 0xEB86D391);
            this.a = this.AddUnsigned(this.a, this.AA);
            this.b = this.AddUnsigned(this.b, this.BB);
            this.c = this.AddUnsigned(this.c, this.CC);
            this.d = this.AddUnsigned(this.d, this.DD);
        }
        temp = this.WordToHex(this.a) + this.WordToHex(this.b) + this.WordToHex(this.c) + this.WordToHex(this.d);
        return temp.toLowerCase();
    };
    Md5.x = Array();
    Md5.S11 = 7;
    Md5.S12 = 12;
    Md5.S13 = 17;
    Md5.S14 = 22;
    Md5.S21 = 5;
    Md5.S22 = 9;
    Md5.S23 = 14;
    Md5.S24 = 20;
    Md5.S31 = 4;
    Md5.S32 = 11;
    Md5.S33 = 16;
    Md5.S34 = 23;
    Md5.S41 = 6;
    Md5.S42 = 10;
    Md5.S43 = 15;
    Md5.S44 = 21;
    Md5.RotateLeft = function (lValue, iShiftBits) { return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits)); };
    Md5.F = function (x, y, z) { return (x & y) | ((~x) & z); };
    Md5.G = function (x, y, z) { return (x & z) | (y & (~z)); };
    Md5.H = function (x, y, z) { return (x ^ y ^ z); };
    Md5.I = function (x, y, z) { return (y ^ (x | (~z))); };
    return Md5;
}());

class GalleryImgCto {
    constructor(alt, src) {
        this.alt = alt;
        this.src = src;
    }
}
class GalleryImgCacheCto {
    constructor(file, galleryImgList, mtime) {
        this.file = file;
        this.galleryImgList = galleryImgList;
        this.mtime = mtime;
    }
}

class FileCto {
    constructor(path, ctime, mtime) {
        this.path = path;
        this.ctime = ctime;
        this.mtime = mtime;
    }
}

/* // const imgList: Array<GalleryImg> = parseMarkDown(plugin, activeView.sourceMode?.cmEditor, activeView.file.path);
export const parseMarkDown = (plugin: ImageToolkitPlugin, cm: CodeMirror.Editor, filePath: string) => {
    let line, lineText;
    for (let i = 0, lastLine = cm.lastLine(); i <= lastLine; i++) {
        if (!(line = cm.lineInfo(i))) continue;
        if (!(lineText = line.text)) continue;
        console.debug((i + 1) + ' line: ' + lineText);
    }
} */
const parseActiveViewData = (plugin, lines, file) => {
    if (!lines || 0 >= lines.length)
        return null;
    let lineText;
    let isCodeArea = false;
    let textArr;
    const imgList = new Array();
    for (let i = 0, len = lines.length; i < len; i++) {
        if (!(lineText = lines[i]))
            continue;
        // console.log((i + 1) + ' line: ' + lineText);
        if (lineText.startsWith('```')) {
            isCodeArea = !isCodeArea;
            continue;
        }
        if (isCodeArea)
            continue;
        if (textArr = getNonCodeAreaTexts(lineText)) {
            for (const text of textArr) {
                extractImage(text, imgList);
            }
        }
        else {
            extractImage(lineText, imgList);
        }
    }
    const filePath = file.path;
    for (let i = 0, len = imgList.length; i < len; i++) {
        const img = imgList[i];
        if (img.convert) {
            const imageFile = plugin.app.metadataCache.getFirstLinkpathDest(decodeURIComponent(img.src), filePath);
            img.src = imageFile ? plugin.app.vault.getResourcePath(imageFile) : '';
        }
        img.hash = md5Img(img.alt, img.src);
        img.match = null;
        img.name = null;
    }
    return new GalleryImgCacheCto(new FileCto(file.path, file.stat.ctime, file.stat.mtime), imgList, new Date().getTime());
};
const getNonCodeAreaTexts = (lineText) => {
    let textArr = [];
    const idx1 = lineText.indexOf('`');
    if (0 > idx1)
        return null;
    const idx2 = lineText.lastIndexOf('`');
    if (idx1 === idx2)
        return null;
    if (idx1 > 0)
        textArr.push(lineText.substring(0, idx1));
    if (lineText.length - 1 > idx2)
        textArr.push(lineText.substring(idx2 + 1));
    return textArr;
};
const IMAGE_LINK_REGEX1 = /\[\s*?(!\[(.*?)\]\((.*?)\))\s*?\]\(.*?\)/; // 1-link: [ ![alt1|alt2|...|altn|width](src) ](https://...)
const IMAGE_REGEX1 = /!\[(.*?)\]\((.*?)\)/; // 1: ![alt1|alt2|...|altn|width](src)
const IMAGE_LINK_REGEX2 = /\[\s*?(!\[\[(.*?[jpe?g|png|gif|svg|bmp].*?)\]\])\s*?\]\(.*?\)/i; // 2-link: [ ![[src|alt1|alt2|width]] ](https://...)
const IMAGE_REGEX2 = /!\[\[(.*?[jpe?g|png|gif|svg|bmp].*?)\]\]/i; // 2: ![[src|alt1|alt2|width]]
const SRC_LINK_REGEX = /[a-z][a-z0-9+\-.]+:\/.*/i; // match link: http://, file://, app:// 
const SRC_IMG_REGREX = /.*?\.jpe?g|png|gif|svg|bmp/i; // match image ext: .jpg/.jpeg/.png/.gif/.svg/.bmp
const IMG_TAG_LINK_SRC_REGEX = /<a.*?(<img.*?src=[\'"](.*?)[\'"].*?\/?>).*?\/a>/i; // 3-a-img-src: <a> <img ... src=''/> </a>
const IMG_TAG_SRC_REGEX = /<img.*?src=[\'"](.*?)[\'"].*?\/?>/i; // 3-img-src: <img ... src='' />
const IMG_TAG_ALT_REGEX = /<img.*?alt=[\'"](.*?)[\'"].*?\/?>/i; // 3-img-alt: <img ... alt='' />
const FULL_PATH_REGEX = /^[a-z]\:.*?[jpe?g|png|gif|svg|bmp]/i;
const BLOCKQUOTE_PREFIX = `#^`;
const IMG_MATCH_MIN_LEN = 7;
const extractImage = (text, imgList) => {
    let img;
    if (!(img = matchImage1(text))) {
        if (!(img = matchImage2(text))) {
            if (!(img = matchImageTag(text))) {
                return;
            }
        }
    }
    imgList.push(img);
    if (img.match) {
        const idx = img.match.index + img.match[0].length;
        if (idx > text.length - IMG_MATCH_MIN_LEN)
            return;
        extractImage(text.substring(idx), imgList);
    }
};
/**
 * ![alt1|alt2|...|altn|width](src)
 * @param text
 * @returns
 */
const matchImage1 = (text) => {
    var _a;
    let match = text.match(IMAGE_LINK_REGEX1); // 1-link: [ ![alt1|alt2|...|altn|width](src) ](https://...)
    let link = false;
    let alt, src;
    if (match) {
        link = true;
        alt = match[2];
        src = match[3];
    }
    else {
        match = text.match(IMAGE_REGEX1); // 1: ![alt1|alt2|...|altn|width](src)
        if (match) {
            if (alt = match[1]) {
                if (0 <= alt.indexOf('[') && 0 <= alt.indexOf(']'))
                    return;
            }
            src = match[2];
            if (src && src.startsWith(BLOCKQUOTE_PREFIX))
                return;
        }
    }
    if (!match)
        return null;
    const img = new GalleryImgCto();
    img.link = link;
    img.match = match;
    img.alt = alt;
    img.src = src;
    let width;
    if (img.src) {
        if (SRC_LINK_REGEX.test(img.src)) { // 1.2: match link: http://, file://, app://local/
            if (img.src.startsWith('file://')) {
                img.src = img.src.replace(/^file:\/+/, 'app://local/');
            }
        }
        else if (SRC_IMG_REGREX.test(img.src)) { // 1.3: match image ext: .jpg/.jpeg/.png/.gif/.svg/.bmp
            const srcArr = img.src.split('/');
            if (srcArr && 0 < srcArr.length) {
                img.name = srcArr[srcArr.length - 1];
            }
            img.convert = true;
        }
    }
    const altArr = (_a = img.alt) === null || _a === void 0 ? void 0 : _a.split('\|'); // match[1] = alt1|alt2|...|altn|width
    if (altArr && 1 < altArr.length) {
        if (/\d+/.test(width = altArr[altArr.length - 1])) {
            img.alt = img.alt.substring(0, img.alt.length - width.length - 1);
        }
    }
    return img;
};
/**
 * ![[src|alt1|alt2|width]]
 * @param text
 * @returns
 */
const matchImage2 = (text) => {
    let match = text.match(IMAGE_LINK_REGEX2); // 2-link: [ ![[src|alt1|alt2|width]] ](https://...)
    let link = false;
    let content;
    if (match) {
        link = true;
        content = match[2];
    }
    else {
        match = text.match(IMAGE_REGEX2); // 2: ![[src|alt1|alt2|width]]
        content = match ? match[1] : null;
        if (content && content.startsWith(BLOCKQUOTE_PREFIX))
            return;
    }
    if (!match)
        return null;
    const img = new GalleryImgCto();
    img.link = link;
    img.match = match;
    const contentArr = content === null || content === void 0 ? void 0 : content.split('|');
    if (contentArr && 0 < contentArr.length && (img.src = contentArr[0])) {
        const srcArr = img.src.split('/');
        if (srcArr && 0 < srcArr.length) {
            img.name = srcArr[srcArr.length - 1];
        }
        if (1 == contentArr.length) {
            img.alt = img.src;
        }
        else {
            img.alt = '';
            for (let i = 1; i < contentArr.length; i++) {
                if (i == contentArr.length - 1 && /\d+/.test(contentArr[i]))
                    break;
                if (img.alt)
                    img.alt += '|';
                img.alt += contentArr[i];
            }
        }
        img.convert = true;
    }
    return img;
};
const matchImageTag = (text) => {
    let match = text.match(IMG_TAG_LINK_SRC_REGEX); // 3-a-img-src: <a> <img ... src=''/> </a>
    let link = false;
    if (match) {
        link = true;
    }
    else {
        match = text.match(IMG_TAG_SRC_REGEX); // 3-img-src: <img ... src='' />
    }
    if (!match)
        return null;
    const img = new GalleryImgCto();
    img.link = link;
    img.match = match;
    img.src = img.link ? match[2] : match[1];
    if (img.src) {
        if (img.src.startsWith('file://')) {
            img.src = img.src.replace(/^file:\/+/, 'app://local/');
        }
        else if (FULL_PATH_REGEX.test(img.src)) {
            img.src = 'app://local/' + img.src;
        }
    }
    const matchAlt = text.match(IMG_TAG_ALT_REGEX);
    img.alt = matchAlt ? matchAlt[1] : '';
    return img;
};
const md5Img = (alt, src) => {
    return Md5.init((alt ? alt : '') + '_' + src);
};

class GalleryNavbarView {
    constructor(mainContainerView, plugin) {
        // whether to display gallery navbar
        this.state = false;
        this.galleryNavbarEl = null;
        this.galleryListEl = null;
        this.galleryIsMousingDown = false;
        this.galleryMouseDownClientX = 0;
        this.galleryTranslateX = 0;
        this.CACHE_LIMIT = 10;
        this.CLICK_TIME = 150;
        this.renderGalleryImg = (imgFooterEl) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (this.state)
                return;
            // get all of images on the current editor
            const activeView = this.plugin.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
            if (!activeView
                || 'markdown' !== activeView.getViewType()
                // modal-container: community plugin, flashcards (Space Repetition)
                || 0 < this.mainContainerView.getDoc().getElementsByClassName('modal-container').length) {
                if (this.galleryNavbarEl)
                    this.galleryNavbarEl.hidden = true;
                if (this.galleryListEl)
                    this.galleryListEl.innerHTML = '';
                return;
            }
            // <div class="gallery-navbar"> <ul class="gallery-list"> <li> <img src='' alt=''> </li> <li...> <ul> </div>
            this.initGalleryNavbar(imgFooterEl);
            const activeFile = activeView.file;
            let galleryImg = this.getGalleryImgCache(activeFile);
            // let hitCache: boolean = true;
            if (!galleryImg) {
                // hitCache = false;
                galleryImg = parseActiveViewData(this.plugin, (_a = activeView.data) === null || _a === void 0 ? void 0 : _a.split('\n'), activeFile);
                this.setGalleryImgCache(galleryImg);
            }
            // console.log('oit-gallery-navbar: ' + (hitCache ? 'hit cache' : 'miss cache') + '!', galleryImg);
            const imgList = galleryImg.galleryImgList;
            const imgContextHash = this.getTargetImgContextHash(this.mainContainerView.getLastClickedImgEl(), activeView.containerEl, this.plugin.imgSelector);
            let liEl, imgEl, liElActive;
            let imgListEl = new Array();
            let targetImageIdx = -1, targetRealIdx = 0;
            let isAddGalleryActive = false;
            let prevHash, nextHash;
            const viewImageWithLink = this.plugin.settings.viewImageWithLink;
            for (let i = 0, len = imgList.length; i < len; i++) {
                const img = imgList[i];
                if (!viewImageWithLink && img.link)
                    continue;
                // <li> <img class='gallery-img' src='' alt=''> </li>
                this.galleryListEl.append(liEl = createEl('li'));
                liEl.append(imgEl = createEl('img'));
                imgEl.addClass('gallery-img', 'oit-img');
                imgEl.setAttr('alt', img.alt);
                imgEl.setAttr('src', img.src);
                imgListEl.push(imgEl);
                this.mainContainerView.setImgViewDefaultBackground(imgEl);
                // find the target image (which image is just clicked)
                if (!imgContextHash || isAddGalleryActive)
                    continue;
                if (imgContextHash[1] == img.hash) {
                    if (0 > targetImageIdx) {
                        targetImageIdx = i;
                        liElActive = liEl;
                        targetRealIdx = imgListEl.length;
                    }
                    if (0 == i) {
                        prevHash = null;
                        nextHash = 1 < len ? imgList[i + 1].hash : null;
                    }
                    else if (len - 1 == i) {
                        prevHash = imgList[i - 1].hash;
                        nextHash = null;
                    }
                    else {
                        prevHash = imgList[i - 1].hash;
                        nextHash = imgList[i + 1].hash;
                    }
                    if (imgContextHash[0] == prevHash && imgContextHash[2] == nextHash) {
                        isAddGalleryActive = true;
                        liElActive = liEl;
                    }
                }
            }
            const realTotalNum = imgListEl.length;
            this.mainContainerView.renderImgTitle(null, '[' + targetRealIdx + '/' + realTotalNum + ']');
            imgListEl.forEach((value, index) => {
                value.dataset.index = '[' + (index + 1) + '/' + realTotalNum + ']';
            });
            if (0 <= targetImageIdx) {
                if (liElActive) {
                    liElActive.addClass('gallery-active');
                    if (this.settings.galleryImgBorderActive) {
                        liElActive.addClass('img-border-active');
                        liElActive.style.setProperty('border-color', this.settings.galleryImgBorderActiveColor);
                    }
                }
                this.galleryTranslateX = (this.mainContainerView.getDoc().documentElement.clientWidth || this.mainContainerView.getDoc().body.clientWidth) / 2.5 - targetImageIdx * 52;
                this.galleryListEl.style.transform = 'translateX(' + this.galleryTranslateX + 'px)';
            }
        });
        this.initDefaultData = () => {
            this.galleryMouseDownClientX = 0;
            this.galleryTranslateX = 0;
            if (this.galleryListEl) {
                this.galleryListEl.style.transform = 'translateX(0px)';
                // remove all childs (li) of gallery-list
                this.galleryListEl.innerHTML = '';
            }
        };
        this.initGalleryNavbar = (imgFooterEl) => {
            // <div class="gallery-navbar">
            if (!this.galleryNavbarEl) {
                // imgInfo.imgFooterEl.append(galleryNavbarEl = createDiv());
                imgFooterEl.append(this.galleryNavbarEl = createDiv());
                this.galleryNavbarEl.addClass('gallery-navbar');
                this.galleryNavbarEl.onmouseover = () => {
                    this.galleryNavbarEl.style.setProperty('background-color', this.settings.galleryNavbarHoverColor);
                };
                this.galleryNavbarEl.onmouseout = () => {
                    this.galleryNavbarEl.style.setProperty('background-color', this.settings.galleryNavbarDefaultColor);
                };
                // add events
                this.galleryNavbarEl.addEventListener('mousedown', this.mouseDownGallery);
                this.galleryNavbarEl.addEventListener('mousemove', this.mouseMoveGallery);
                this.galleryNavbarEl.addEventListener('mouseup', this.mouseUpGallery);
                this.galleryNavbarEl.addEventListener('mouseleave', this.mouseLeaveGallery);
            }
            this.galleryNavbarEl.style.setProperty('background-color', this.settings.galleryNavbarDefaultColor);
            if (!this.galleryListEl) {
                this.galleryNavbarEl.append(this.galleryListEl = createEl('ul')); // <ul class="gallery-list">
                this.galleryListEl.addClass('gallery-list');
            }
            this.initDefaultData();
            this.galleryNavbarEl.hidden = false; // display 'gallery-navbar'
            this.state = true;
        };
        this.closeGalleryNavbar = () => {
            if (!this.state)
                return;
            this.galleryNavbarEl.hidden = true; // hide 'gallery-navbar'
            this.state = false;
            this.initDefaultData();
        };
        this.remove = () => {
            var _a, _b;
            this.state = false;
            (_a = this.galleryNavbarEl) === null || _a === void 0 ? void 0 : _a.remove();
            (_b = this.galleryListEl) === null || _b === void 0 ? void 0 : _b.remove();
            this.galleryNavbarEl = null;
            this.galleryListEl = null;
            this.galleryIsMousingDown = false;
            this.galleryMouseDownClientX = 0;
            this.galleryTranslateX = 0;
            this.mouseDownTime = null;
            GalleryNavbarView.GALLERY_IMG_CACHE = new Map();
            this.initDefaultData();
        };
        this.getTargetImgContextHash = (targetImgEl, containerEl, imageSelector) => {
            let imgEl;
            let targetImgHash = null;
            let targetIdx = -1;
            const imgs = containerEl.querySelectorAll(imageSelector);
            // console.log('IMAGE_SELECTOR>>', imageSelector, imgs);
            const len = imgs.length;
            for (let i = 0; i < len; i++) {
                if ((imgEl = imgs[i])) {
                    if ('1' == imgEl.getAttribute('data-oit-target')) {
                        targetIdx = i;
                        targetImgHash = md5Img(imgEl.alt, imgEl.src);
                        break;
                    }
                }
            }
            if (0 > targetIdx)
                targetImgHash = md5Img(targetImgEl.alt, targetImgEl.src);
            let prevHash, nextHash;
            if (0 == targetIdx) {
                prevHash = null;
                nextHash = 1 < len ? md5Img(imgs[1].alt, imgs[1].src) : null;
            }
            else if (len - 1 == targetIdx) {
                prevHash = md5Img(imgs[targetIdx - 1].alt, imgs[targetIdx - 1].src);
                nextHash = null;
            }
            else {
                prevHash = md5Img(imgs[targetIdx - 1].alt, imgs[targetIdx - 1].src);
                nextHash = md5Img(imgs[targetIdx + 1].alt, imgs[targetIdx + 1].src);
            }
            return [prevHash, targetImgHash, nextHash];
        };
        this.activateImage = (liEl, imgEL) => {
            if (!liEl || 'LI' !== liEl.tagName)
                return;
            if (!imgEL) {
                const imgELList = liEl.getElementsByTagName('img');
                if (imgELList && 0 < imgELList.length) {
                    imgEL = imgELList[0];
                }
            }
            if (imgEL) {
                const activeImg = this.mainContainerView.getActiveImg();
                this.mainContainerView.initDefaultData(activeImg, imgEL.style);
                this.mainContainerView.refreshImg(activeImg, imgEL.src, imgEL.alt || '', imgEL.dataset.index);
            }
            liEl.addClass('gallery-active');
            if (this.settings.galleryImgBorderActive) {
                liEl.addClass('img-border-active');
                liEl.style.setProperty('border-color', this.settings.galleryImgBorderActiveColor);
            }
        };
        this.deactivateImage = (liEl) => {
            if (!liEl)
                return;
            liEl.removeClass('gallery-active');
            if (liEl.hasClass('img-border-active')) {
                liEl.removeClass('img-border-active');
                liEl.style.removeProperty('border-color');
            }
        };
        this.clickGalleryImg = (event) => {
            const targetEl = event.target;
            if (!targetEl || 'IMG' !== targetEl.tagName)
                return;
            if (this.galleryListEl) {
                const liElList = this.galleryListEl.getElementsByClassName('gallery-active');
                for (let i = 0, len = liElList.length; i < len; i++) {
                    this.deactivateImage(liElList[i]);
                }
            }
            this.activateImage(targetEl.parentElement, targetEl);
        };
        /**
         * switch the image on the gallery navbar
         * @param next true: switch to the next image; false: switch to the previous image
         */
        this.switchImage = (next) => {
            if (!this.state || !this.galleryListEl)
                return;
            const liElList = this.galleryListEl.getElementsByTagName('li');
            if (!liElList || 0 >= liElList.length)
                return;
            let liEl;
            let toSwitchIdx = -1;
            for (let i = 0, len = liElList.length; i < len; i++) {
                if (!(liEl = liElList[i]))
                    continue;
                if (liEl.hasClass('gallery-active')) {
                    toSwitchIdx = next ? (len <= (i + 1) ? 0 : i + 1) : (0 == i ? len - 1 : i - 1);
                    this.deactivateImage(liEl);
                    break;
                }
            }
            if (0 >= toSwitchIdx) {
                toSwitchIdx = 0;
            }
            this.activateImage(liElList[toSwitchIdx]);
        };
        this.mouseDownGallery = (event) => {
            // console.log('mouse Down Gallery...');
            event.preventDefault();
            event.stopPropagation();
            this.mouseDownTime = new Date().getTime();
            this.galleryIsMousingDown = true;
            this.galleryMouseDownClientX = event.clientX;
        };
        this.mouseMoveGallery = (event) => {
            // console.log('mouse Move Gallery...');
            event.preventDefault();
            event.stopPropagation();
            if (!this.galleryIsMousingDown)
                return;
            let moveDistance = event.clientX - this.galleryMouseDownClientX;
            if (4 > Math.abs(moveDistance))
                return;
            this.galleryMouseDownClientX = event.clientX;
            this.galleryTranslateX += moveDistance;
            const windowWidth = this.mainContainerView.getDoc().documentElement.clientWidth || this.mainContainerView.getDoc().body.clientWidth;
            const imgLiWidth = (this.galleryListEl.childElementCount - 1) * 52;
            // console.log('move...', 'windowWidth=' + windowWidth, 'galleryTranslateX=' + galleryTranslateX, 'li count=' + imgInfo.galleryList.childElementCount);
            if (this.galleryTranslateX + 50 >= windowWidth)
                this.galleryTranslateX = windowWidth - 50;
            if (0 > this.galleryTranslateX + imgLiWidth)
                this.galleryTranslateX = -imgLiWidth;
            this.galleryListEl.style.transform = 'translateX(' + this.galleryTranslateX + 'px)';
        };
        this.mouseUpGallery = (event) => {
            // console.log('mouse Up Gallery>>>', event.target);
            event.preventDefault();
            event.stopPropagation();
            this.galleryIsMousingDown = false;
            if (!this.mouseDownTime || this.CLICK_TIME > new Date().getTime() - this.mouseDownTime) {
                this.clickGalleryImg(event);
            }
            this.mouseDownTime = null;
        };
        this.mouseLeaveGallery = (event) => {
            // console.log('mouse Leave Gallery>>>', event.target);
            event.preventDefault();
            event.stopPropagation();
            this.galleryIsMousingDown = false;
            this.mouseDownTime = null;
        };
        this.getGalleryImgCache = (file) => {
            if (!file)
                return null;
            const md5File = this.md5File(file.path, file.stat.ctime);
            if (!md5File)
                return null;
            const galleryImgCache = GalleryNavbarView.GALLERY_IMG_CACHE.get(md5File);
            if (galleryImgCache && file.stat.mtime !== galleryImgCache.file.mtime) {
                GalleryNavbarView.GALLERY_IMG_CACHE.delete(md5File);
                return null;
            }
            return galleryImgCache;
        };
        this.setGalleryImgCache = (galleryImg) => {
            const md5File = this.md5File(galleryImg.file.path, galleryImg.file.ctime);
            if (!md5File)
                return;
            this.trimGalleryImgCache();
            GalleryNavbarView.GALLERY_IMG_CACHE.set(md5File, galleryImg);
        };
        this.trimGalleryImgCache = () => {
            if (GalleryNavbarView.GALLERY_IMG_CACHE.size < this.CACHE_LIMIT)
                return;
            let earliestMtime, earliestKey;
            GalleryNavbarView.GALLERY_IMG_CACHE.forEach((value, key) => {
                if (!earliestMtime) {
                    earliestMtime = value.mtime;
                    earliestKey = key;
                }
                else {
                    if (earliestMtime > value.mtime) {
                        earliestMtime = value.mtime;
                        earliestKey = key;
                    }
                }
            });
            if (earliestKey) {
                GalleryNavbarView.GALLERY_IMG_CACHE.delete(earliestKey);
            }
        };
        this.md5File = (path, ctime) => {
            if (!path || !ctime)
                return;
            return Md5.init(path + '_' + ctime);
        };
        this.mainContainerView = mainContainerView;
        this.plugin = plugin;
        this.settings = plugin.settings;
    }
}
GalleryNavbarView.GALLERY_IMG_CACHE = new Map();

class NormalContainerView extends ContainerView {
    constructor(plugin) {
        super(plugin);
        //region ================== Container View ========================
        this.initContainerDom = (parentContainerEl) => {
            let imgCto;
            if (!this.imgInfo.oitContainerEl) {
                // init `oit-normal` dom at first time
                // <div class="oit oit-normal"> ... <div>
                (this.imgInfo.oitContainerEl = createDiv()).addClass(OIT_CLASS.CONTAINER_ROOT, OIT_CLASS.CONTAINER_NORMAL);
                parentContainerEl.appendChild(this.imgInfo.oitContainerEl);
                // 1. <div class="oit-img-container">...</div>
                this.imgInfo.oitContainerEl.append(this.imgInfo.imgContainerEl = createDiv(OIT_CLASS.IMG_CONTAINER));
                // 1.1. <div class="oit-img-container"> `<img class="oit-img-view" src="" alt="">` </div>
                this.updateImgViewElAndList(this.imgInfo);
                // 2. <div class="oit-img-tip"></div>
                this.imgInfo.oitContainerEl.appendChild(this.imgInfo.imgTipEl = createDiv(OIT_CLASS.IMG_TTP));
                this.imgInfo.imgTipEl.hidden = true;
                // 3. <div class="oit-img-footer"> ... <div>
                this.imgInfo.oitContainerEl.appendChild(this.imgInfo.imgFooterEl = createDiv(OIT_CLASS.IMG_FOOTER));
                // 3.1. <div class="oit-img-title"></div>
                this.imgInfo.imgFooterEl.appendChild(this.imgInfo.imgTitleEl = createDiv(OIT_CLASS.IMG_TITLE));
                // <span class="oit-img-title-name"></span>
                this.imgInfo.imgTitleEl.appendChild(this.imgInfo.imgTitleNameEl = createSpan(OIT_CLASS.IMG_TITLE_NAME));
                // <span class="oit-img-title-index"></span>
                this.imgInfo.imgTitleEl.appendChild(this.imgInfo.imgTitleIndexEl = createSpan(OIT_CLASS.IMG_TITLE_INDEX));
                // 3.2. <ul class="oit-img-toolbar">
                const imgToolbarUlEL = createEl('ul');
                imgToolbarUlEL.addClass(OIT_CLASS.IMG_TOOLBAR);
                this.imgInfo.imgFooterEl.appendChild(imgToolbarUlEL);
                let toolbarLi;
                for (const toolbar of TOOLBAR_CONF) {
                    if (!toolbar.enableToolbarIcon)
                        continue;
                    imgToolbarUlEL.appendChild(toolbarLi = createEl('li'));
                    toolbarLi.addClass(toolbar.class);
                    toolbarLi.setAttribute('alt', toolbar.title);
                    // @ts-ignore
                    toolbarLi.setAttribute('title', t(toolbar.title));
                }
                // add event: for oit-img-toolbar ul
                imgToolbarUlEL.addEventListener('click', this.clickImgToolbar);
                // <div class="img-player"> <img class='img-fullscreen' src=''> </div>
                this.imgInfo.oitContainerEl.appendChild(this.imgInfo.imgPlayerEl = createDiv(OIT_CLASS.IMG_PLAYER)); // img-player for full screen mode
                this.imgInfo.imgPlayerEl.appendChild(this.imgInfo.imgPlayerImgViewEl = createEl('img'));
                this.imgInfo.imgPlayerImgViewEl.addClass(OIT_CLASS.IMG_FULLSCREEN);
            }
            imgCto = this.imgInfo.imgList[0];
            this.imgGlobalStatus.activeImg = imgCto;
            return imgCto;
        };
        this.openOitContainerView = (matchedImg) => {
            if (!this.imgInfo.oitContainerEl) {
                console.error('obsidian-image-toolkit: oit-*-container-view has not been initialized!');
                return;
            }
            matchedImg.popup = true;
            this.imgGlobalStatus.popup = true;
            // display 'oit-normal'
            this.imgInfo.oitContainerEl.style.setProperty('display', 'block');
        };
        this.closeContainerView = (event, activeImg) => {
            if (event) {
                const target = event.target;
                if (!target || !(target.hasClass(OIT_CLASS.CONTAINER_ROOT) || target.hasClass(OIT_CLASS.IMG_CONTAINER)))
                    return;
            }
            if (!activeImg && !(activeImg = this.imgGlobalStatus.activeImg))
                return;
            if (this.imgInfo.oitContainerEl) {
                this.imgInfo.oitContainerEl.style.setProperty('display', 'none'); // hide 'oit-normal'
                this.renderImgTitle('', '');
                this.renderImgView(activeImg.imgViewEl, '', '');
                // remove events
                this.imgGlobalStatus.popup = false;
                activeImg.popup = false;
                activeImg.mtime = 0;
                this.addOrRemoveEvents(activeImg, false);
            }
            if (this.plugin.settings.galleryNavbarToggle && this.galleryNavbarView) {
                this.galleryNavbarView.closeGalleryNavbar();
            }
        };
        //endregion
        //region ================== Gallery Navbar ========================
        this.renderGalleryNavbar = () => {
            // <div class="gallery-navbar"> <ul class="gallery-list"> <li> <img src='' alt=''> </li> <li...> <ul> </div>
            if (!this.plugin.settings.galleryNavbarToggle)
                return;
            if (!this.galleryNavbarView) {
                this.galleryNavbarView = new GalleryNavbarView(this, this.plugin);
            }
            this.galleryNavbarView.renderGalleryImg(this.imgInfo.imgFooterEl);
        };
        this.removeGalleryNavbar = () => {
            if (!this.galleryNavbarView)
                return;
            this.galleryNavbarView.remove();
            this.galleryNavbarView = null;
        };
        //endregion
        this.renderImgTitle = (name, index) => {
            var _a, _b;
            if (undefined !== name && null !== name)
                (_a = this.imgInfo.imgTitleNameEl) === null || _a === void 0 ? void 0 : _a.setText(name);
            if (undefined !== index && null !== index)
                (_b = this.imgInfo.imgTitleIndexEl) === null || _b === void 0 ? void 0 : _b.setText(' ' + index);
        };
        this.switchImageOnGalleryNavBar = (event, next) => {
            var _a;
            if (!this.checkHotkeySettings(event, this.plugin.settings.switchTheImageHotkey))
                return;
            (_a = this.galleryNavbarView) === null || _a === void 0 ? void 0 : _a.switchImage(next);
        };
    }
    setActiveImgForMouseEvent(imgCto) {
    }
}

/**
 * Right click menu
 */
class MenuView {
    constructor(pinContainerView) {
        this.init = () => {
            if (this.menu)
                return;
            this.menu = new obsidian.Menu();
            for (const itemConf of TOOLBAR_CONF) {
                if (!itemConf.enableMenu)
                    continue;
                if (SEPARATOR_SYMBOL === itemConf.title) {
                    this.menu.addSeparator();
                    continue;
                }
                this.menu.addItem(item => {
                    if (itemConf.icon)
                        item.setIcon(itemConf.icon);
                    // @ts-ignore
                    item.setTitle(t(itemConf.title))
                        .onClick(() => {
                        this.pinContainerView.clickImgToolbar(null, itemConf.class, MenuView.activeImg);
                    });
                });
            }
        };
        this.show = (event, activeImg) => {
            MenuView.activeImg = activeImg;
            this.init();
            this.menu.showAtPosition({ x: event.clientX, y: event.clientY });
        };
        this.pinContainerView = pinContainerView;
    }
}

/**
 * PinContainerView: Pin an image on the top
 * @Support: move an image by mouse; close an image by Esc
 * @Nonsupport: move an image by keyboard; display gallery navbar
 */
class PinContainerView extends ContainerView {
    constructor(plugin /*, viewMode: ViewMode*/) {
        super(plugin /*, viewMode, plugin.settings.pinMaximum*/);
        //region ================== Container View ========================
        this.initContainerDom = (parentContainerEl) => {
            /*
            <div class="oit-pin-container-view">
              <div class="oit-img-container">
                <img class="oit-img-view" data-index='0' src="" alt="">
                <img class="oit-img-view" data-index='1' src="" alt="">
                ...
              </div>
            </div>
             */
            if (!this.imgInfo.oitContainerEl) { // init at first time
                // create: <div class="oit oit-pin">
                (this.imgInfo.oitContainerEl = createDiv()).addClass(OIT_CLASS.CONTAINER_ROOT, OIT_CLASS.CONTAINER_PIN);
                parentContainerEl.appendChild(this.imgInfo.oitContainerEl);
                // <div class="oit oit-pin"> <div class="oit-img-container"/> </div>
                this.imgInfo.oitContainerEl.append(this.imgInfo.imgContainerEl = createDiv(OIT_CLASS.IMG_CONTAINER));
                // <div class="oit-img-tip"></div>
                this.imgInfo.oitContainerEl.appendChild(this.imgInfo.imgTipEl = createDiv(OIT_CLASS.IMG_TTP)); // oit-img-tip
                this.imgInfo.imgTipEl.hidden = true; // hide 'oit-img-tip'
                // <div class="img-player"> <img class='img-fullscreen' src=''> </div>
                this.imgInfo.oitContainerEl.appendChild(this.imgInfo.imgPlayerEl = createDiv(OIT_CLASS.IMG_PLAYER)); // img-player for full screen mode
                this.imgInfo.imgPlayerEl.appendChild(this.imgInfo.imgPlayerImgViewEl = createEl('img'));
                this.imgInfo.imgPlayerImgViewEl.addClass(OIT_CLASS.IMG_FULLSCREEN);
            }
            // <div class="oit-img-container"> <img class="oit-img-view" src="" alt=""> </div>
            this.updateImgViewElAndList(this.imgInfo);
            return this.getMatchedImg();
        };
        this.openOitContainerView = (matchedImg) => {
            if (!this.imgInfo.oitContainerEl) {
                console.error('obsidian-image-toolkit: oit-*-container-view has not been initialized!');
                return;
            }
            matchedImg.popup = true;
            if (!this.imgGlobalStatus.popup) {
                this.imgGlobalStatus.popup = true;
                this.imgGlobalStatus.activeImgZIndex = 0;
                this.imgInfo.imgList.forEach(value => {
                    value.zIndex = 0;
                });
            }
            else {
                matchedImg.zIndex = (++this.imgGlobalStatus.activeImgZIndex);
            }
            matchedImg.imgViewEl.style.setProperty('z-index', matchedImg.zIndex + '');
            // display 'oit-pin-container-view'
            this.imgInfo.oitContainerEl.style.setProperty('display', 'block');
        };
        /**
         * hide container view
         * @param event not null: click event; null: keyboard event (Esc)
         * @param activeImg
         */
        this.closeContainerView = (event, activeImg) => {
            if (event && !activeImg) {
                // PinContainerView doesn't need click event to hide container for now
                return;
            }
            if (!this.imgInfo.oitContainerEl)
                return;
            if (!activeImg && !(activeImg = this.imgGlobalStatus.activeImg))
                return;
            // console.log('closeContainerView', event, activeImg)
            this.renderImgView(activeImg.imgViewEl, '', '');
            activeImg.popup = false;
            activeImg.mtime = 0;
            let globalPopupFlag = false;
            for (const imgCto of this.imgInfo.imgList) {
                if (imgCto.popup) {
                    globalPopupFlag = true;
                    break;
                }
            }
            if (!globalPopupFlag) {
                this.imgInfo.oitContainerEl.style.setProperty('display', 'none'); // hide 'oit-pin-container-view'
                this.imgGlobalStatus.activeImgZIndex = 0;
                this.imgInfo.imgList.forEach(value => {
                    value.zIndex = 0;
                });
            }
            this.imgGlobalStatus.popup = globalPopupFlag;
            this.addOrRemoveEvents(activeImg, false);
        };
        //endregion
        this.setActiveImgZIndex = (activeImg) => {
            var _a;
            let isUpdate = false;
            for (const imgCto of this.imgInfo.imgList) {
                if (activeImg.index !== imgCto.index && activeImg.zIndex <= imgCto.zIndex) {
                    isUpdate = true;
                    break;
                }
            }
            if (isUpdate) {
                activeImg.zIndex = (++this.imgGlobalStatus.activeImgZIndex);
                (_a = activeImg.imgViewEl) === null || _a === void 0 ? void 0 : _a.style.setProperty("z-index", activeImg.zIndex + '');
            }
        };
        this.setMenuView(new MenuView(this));
    }
    setActiveImgForMouseEvent(imgCto) {
        this.imgGlobalStatus.activeImg = imgCto;
    }
}

class ContainerFactory {
    constructor() {
        // popout window containers: hash -> ContainerView
        this.popoutContainers = new Map();
        this.setMainContainer = (container) => {
            this.mainContainer = container;
        };
        this.getMainContainer = () => {
            return this.mainContainer;
        };
        this.setPopoutContainer = (key, container) => {
            this.popoutContainers.set(key, container);
        };
        this.getPopoutContainer = (key) => {
            return this.popoutContainers.get(key);
        };
        this.getPopoutContainers = () => {
            return this.popoutContainers;
        };
        this.getContainer = (targetEl) => {
            const bodyEl = targetEl === null || targetEl === void 0 ? void 0 : targetEl.matchParent('body');
            if (!bodyEl)
                return null;
            const oitEventKey = bodyEl.getAttribute('data-oit-event');
            if (oitEventKey) {
                //popout window
                return this.getPopoutContainer(oitEventKey);
            }
            return this.mainContainer;
        };
        this.getAllContainers = () => {
            let allContainerViews = [this.mainContainer];
            for (let value of this.popoutContainers.values()) {
                allContainerViews.push(value);
            }
            return allContainerViews;
        };
        this.clearAll = () => {
            this.mainContainer = null;
            this.popoutContainers.clear();
        };
    }
}

class ImageToolkitPlugin extends obsidian.Plugin {
    constructor() {
        super(...arguments);
        this.containerFactory = new ContainerFactory();
        this.imgSelector = ``;
        this.addIcons = () => __awaiter(this, void 0, void 0, function* () {
            for (const icon of ICONS) {
                obsidian.addIcon(icon.id, icon.svg);
            }
        });
        this.getViewMode = () => {
            return this.settings.viewMode;
        };
        this.setViewMode = (viewMode) => {
            return this.settings.viewMode = viewMode;
        };
        this.checkViewMode = (viewMode) => __awaiter(this, void 0, void 0, function* () {
            for (const key in ViewMode) {
                if (key == viewMode) {
                    return;
                }
            }
            this.setViewMode(DEFAULT_VIEW_MODE);
            console.log('[oit] Reset view mode: %s', DEFAULT_VIEW_MODE);
            yield this.saveSettings();
        });
        this.getAllContainerViews = () => {
            return this.containerFactory.getAllContainers();
        };
        this.initContainer = (viewMode, popoutWindowEventId) => __awaiter(this, void 0, void 0, function* () {
            const container = yield this.initContainerByViewMode(viewMode);
            if (!container) {
                console.error('[oit] Cannot init container');
                return;
            }
            if (popoutWindowEventId) {
                // popoutWindowEventId will be recorded into data-oit-event'of body tag
                this.containerFactory.setPopoutContainer(popoutWindowEventId, container);
            }
            else {
                this.containerFactory.setMainContainer(container);
            }
        });
        this.initContainerByViewMode = (viewMode, fromDefault) => __awaiter(this, void 0, void 0, function* () {
            switch (viewMode) {
                case ViewMode.Normal:
                    return new NormalContainerView(this);
                case ViewMode.Pin:
                    return new PinContainerView(this);
                default:
                    if (fromDefault) {
                        return null;
                    }
                    this.setViewMode(viewMode = DEFAULT_VIEW_MODE);
                    yield this.saveSettings();
                    console.log('[oit] Reset view mode to: %s', viewMode);
                    return this.initContainerByViewMode(viewMode, true);
            }
        });
        this.isImageElement = (imgEl) => {
            return imgEl && 'IMG' === imgEl.tagName;
        };
        this.isClickable = (targetEl, event) => {
            let container;
            if (this.isImageElement(targetEl)
                && (container = this.containerFactory.getContainer(targetEl))
                && container.checkHotkeySettings(event, this.settings.viewTriggerHotkey)) {
                return container;
            }
            return null;
        };
        this.switchViewMode = (viewMode) => __awaiter(this, void 0, void 0, function* () {
            this.settings.viewMode = viewMode;
            yield this.saveSettings();
            this.getAllContainerViews().forEach(container => {
                var _a;
                container.removeOitContainerView();
                this.initContainer(viewMode, (_a = container.getParentContainerEl()) === null || _a === void 0 ? void 0 : _a.getAttribute('data-oit-event'));
            });
        });
        /**
         * refresh events for main container
         */
        this.refreshViewTrigger = (doc) => {
            // .workspace-leaf-content[data-type='markdown'] img,.workspace-leaf-content[data-type='image'] img
            const viewImageInEditor = this.settings.viewImageInEditor;
            // .community-modal-details img
            const viewImageInCPB = this.settings.viewImageInCPB;
            // false: ... img:not(a img)
            const viewImageWithLink = this.settings.viewImageWithLink;
            // #sr-flashcard-view img
            const viewImageOther = this.settings.viewImageOther;
            if (!doc) {
                doc = document;
            }
            if (this.imgSelector) {
                doc.off('click', this.imgSelector, this.clickImage);
                doc.off('mouseover', this.imgSelector, this.mouseoverImg);
                doc.off('mouseout', this.imgSelector, this.mouseoutImg);
            }
            if (!viewImageOther && !viewImageInEditor && !viewImageInCPB && !viewImageWithLink) {
                return;
            }
            let selector = ``;
            if (viewImageInEditor) {
                selector += (viewImageWithLink ? VIEW_IMG_SELECTOR.EDITOR_AREAS : VIEW_IMG_SELECTOR.EDITOR_AREAS_NO_LINK);
            }
            if (viewImageInCPB) {
                selector += (1 < selector.length ? `,` : ``) + (viewImageWithLink ? VIEW_IMG_SELECTOR.CPB : VIEW_IMG_SELECTOR.CPB_NO_LINK);
            }
            if (viewImageOther) {
                selector += (1 < selector.length ? `,` : ``) + (viewImageWithLink ? VIEW_IMG_SELECTOR.OTHER : VIEW_IMG_SELECTOR.OTHER_NO_LINK);
            }
            if (selector) {
                this.imgSelector = selector;
                doc.on('click', this.imgSelector, this.clickImage);
                doc.on('mouseover', this.imgSelector, this.mouseoverImg);
                doc.on('mouseout', this.imgSelector, this.mouseoutImg);
            }
        };
        this.clickImage = (event) => {
            const targetEl = event.target;
            let container = this.isClickable(targetEl, event);
            if (container) {
                container.renderContainer(targetEl);
            }
        };
        this.mouseoverImg = (event) => {
            const targetEl = event.target;
            if (!this.isClickable(targetEl, event)) {
                return;
            }
            if (null == targetEl.getAttribute(ImageToolkitPlugin.IMG_ORIGIN_CURSOR)) {
                targetEl.setAttribute(ImageToolkitPlugin.IMG_ORIGIN_CURSOR, targetEl.style.cursor || '');
            }
            targetEl.style.cursor = 'zoom-in';
        };
        this.mouseoutImg = (event) => {
            const targetEl = event.target;
            if (!this.isClickable(targetEl, event)) {
                return;
            }
            targetEl.style.cursor = targetEl.getAttribute(ImageToolkitPlugin.IMG_ORIGIN_CURSOR);
        };
    }
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('loading %s plugin v%s ...', this.manifest.id, this.manifest.version);
            yield this.loadSettings();
            this.addSettingTab(new ImageToolkitSettingTab(this.app, this));
            // this.registerCommands();
            yield this.initContainer(this.settings.viewMode);
            this.refreshViewTrigger();
            // addEventListener for opened new windows
            this.app.workspace.on('layout-change', () => {
                this.app.workspace.iterateAllLeaves((leaf) => {
                    var _a;
                    if (['markdown', 'image'].includes((_a = leaf.getViewState()) === null || _a === void 0 ? void 0 : _a.type)) {
                        const bodyEl = leaf.view.containerEl.matchParent('body');
                        if (bodyEl.hasClass('is-popout-window')) {
                            if (!bodyEl.hasAttribute(ImageToolkitPlugin.POPOUT_WINDOW_EVENT)) {
                                console.log('popout leaf:', leaf, leaf.getDisplayText());
                                const eventId = crypto.randomUUID();
                                this.initContainer(this.settings.viewMode, eventId);
                                bodyEl.setAttr(ImageToolkitPlugin.POPOUT_WINDOW_EVENT, eventId);
                                this.refreshViewTrigger(bodyEl.ownerDocument);
                            }
                        }
                    }
                });
            });
        });
    }
    onunload() {
        console.log('unloading ' + this.manifest.id + ' plugin...');
        this.getAllContainerViews().forEach(container => {
            container.removeOitContainerView();
        });
        this.containerFactory.clearAll();
        document.off('click', this.imgSelector, this.clickImage);
        document.off('mouseover', this.imgSelector, this.mouseoverImg);
        document.off('mouseout', this.imgSelector, this.mouseoutImg);
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
            yield this.checkViewMode(this.getViewMode());
            yield this.addIcons();
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
    registerCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            /* this.addCommand({
                "id": "oit-move-up-image",
                "name": "move up the image",
                hotkeys: [{ modifiers: ["Ctrl"], key: "ArrowUp" }],
                checkCallback: (checking: boolean) => {
                    if (checking) return false;
                    this.containerView.moveImgViewByHotkey('UP');
                },
            }); */
        });
    }
}
ImageToolkitPlugin.IMG_ORIGIN_CURSOR = 'data-oit-origin-cursor';
// data-oit-event: 标识new window是否已addEventListener for click
ImageToolkitPlugin.POPOUT_WINDOW_EVENT = 'data-oit-event';

module.exports = ImageToolkitPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9sYW5nL2xvY2FsZS9hci50cyIsInNyYy9sYW5nL2xvY2FsZS9jei50cyIsInNyYy9sYW5nL2xvY2FsZS9kYS50cyIsInNyYy9sYW5nL2xvY2FsZS9kZS50cyIsInNyYy9sYW5nL2xvY2FsZS9lbi50cyIsInNyYy9sYW5nL2xvY2FsZS9lbi1nYi50cyIsInNyYy9sYW5nL2xvY2FsZS9lcy50cyIsInNyYy9sYW5nL2xvY2FsZS9mci50cyIsInNyYy9sYW5nL2xvY2FsZS9oaS50cyIsInNyYy9sYW5nL2xvY2FsZS9pZC50cyIsInNyYy9sYW5nL2xvY2FsZS9pdC50cyIsInNyYy9sYW5nL2xvY2FsZS9qYS50cyIsInNyYy9sYW5nL2xvY2FsZS9rby50cyIsInNyYy9sYW5nL2xvY2FsZS9ubC50cyIsInNyYy9sYW5nL2xvY2FsZS9uby50cyIsInNyYy9sYW5nL2xvY2FsZS9wbC50cyIsInNyYy9sYW5nL2xvY2FsZS9wdC50cyIsInNyYy9sYW5nL2xvY2FsZS9wdC1ici50cyIsInNyYy9sYW5nL2xvY2FsZS9yby50cyIsInNyYy9sYW5nL2xvY2FsZS9ydS50cyIsInNyYy9sYW5nL2xvY2FsZS90ci50cyIsInNyYy9sYW5nL2xvY2FsZS96aC1jbi50cyIsInNyYy9sYW5nL2xvY2FsZS96aC10dy50cyIsInNyYy9sYW5nL2hlbHBlcnMudHMiLCJzcmMvY29uZi9jb25zdGFudHMudHMiLCJub2RlX21vZHVsZXMvQHNpbW9ud2VwL3BpY2tyL2Rpc3QvcGlja3IubWluLmpzIiwic3JjL2NvbmYvc2V0dGluZ3MudHMiLCJzcmMvbW9kZWwvaW1nVG8udHMiLCJzcmMvdXRpbC9pbWdVdGlsLnRzIiwic3JjL3VpL2NvbnRhaW5lci9jb250YWluZXIudmlldy50cyIsIm5vZGVfbW9kdWxlcy9tZDUtdHlwZXNjcmlwdC9kaXN0L2luZGV4LmpzIiwic3JjL21vZGVsL2dhbGxlcnlOYXZiYXJUby50cyIsInNyYy9tb2RlbC9jb21tb25Uby50cyIsInNyYy91dGlsL21hcmtkb3dQYXJzZS50cyIsInNyYy91aS9nYWxsZXJ5TmF2YmFyVmlldy50cyIsInNyYy91aS9jb250YWluZXIvbm9ybWFsQ29udGFpbmVyLnZpZXcudHMiLCJzcmMvdWkvbWVudVZpZXcudHMiLCJzcmMvdWkvY29udGFpbmVyL3BpbkNvbnRhaW5lci52aWV3LnRzIiwic3JjL2ZhY3RvcnkvY29udGFpbmVyRmFjdG9yeS50cyIsInNyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6WyJtb21lbnQiLCJQbHVnaW5TZXR0aW5nVGFiIiwiU2V0dGluZyIsIk5vdGljZSIsIk1hcmtkb3duVmlldyIsIk1lbnUiLCJQbHVnaW4iLCJhZGRJY29uIiwicmFuZG9tVVVJRCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBb0dBO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUs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LE1BQU0sNEJBQTRCLEdBQUcsV0FBVzs7Ozs7Ozs7Ozs7Ozs7QUN4TnZELENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQW1ELE1BQWUsQ0FBQSxPQUFBLENBQUEsQ0FBQyxHQUE0RyxDQUFDLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxPQUFNLENBQUMsSUFBSSxDQUFjLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxNQUFNLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLGNBQWMsRUFBRSxDQUFDLFlBQVksUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxPQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsT0FBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsNERBQTRELENBQUMsSUFBSSxDQUFDLHVFQUF1RSxDQUFDLElBQUksQ0FBQyx1RUFBdUUsQ0FBQyxJQUFJLENBQUMsdUVBQXVFLENBQUMsSUFBSSxDQUFDLDBEQUEwRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLEdBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsR0FBRSxDQUFDLEVBQUUsQ0FBQyxPQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxZQUFZLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMscUJBQXFCLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDLENBQUMsR0FBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtREFBbUQsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLGtFQUFrRSxDQUFDLDJDQUEyQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLHVEQUF1RCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsNkRBQTZELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQywyRkFBMkYsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxtVEFBbVQsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMscUdBQXFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxvSkFBb0osRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsd0dBQXdHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyx3SkFBd0osRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsbUdBQW1HLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLHNGQUFzRixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxzRkFBc0YsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLGlGQUFpRixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLDhFQUE4RSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLDhFQUE4RSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLDhFQUE4RSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLGtHQUFrRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLDREQUE0RCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLCtEQUErRCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsNkRBQTZELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyx3REFBd0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGdFQUFnRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsd0VBQXdFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixHQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMscUJBQXFCLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLHFCQUFxQixDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFDLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLDBDQUEwQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9B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QUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDNUYsUUFBUSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDMUQsS0FBSyxDQUFDO0FBQ04sSUFBSSxHQUFHLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO0FBQzdDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM1RixRQUFRLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMxRCxLQUFLLENBQUM7QUFDTixJQUFJLEdBQUcsQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7QUFDN0MsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzVGLFFBQVEsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMs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Q0FBQyxDQUFDO0FBQzVDLFFBQVEsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9DLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZELFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUM7QUFDNUIsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztBQUM1QixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDO0FBQzVCLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUM7QUFDNUIsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7QUFDL0QsWUFBWSxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDN0IsWUFBWSxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDN0IsWUFBWSxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDN0IsWUFBWSxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDN0IsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ25HLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDdkcsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN2RyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZHLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDdkcsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN2RyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZHLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDdkcsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN2RyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZHLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDeEcsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN4RyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3hHLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDeEcsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN4RyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3hHLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDdkcsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN2RyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3hHLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUNuRyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZHLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDdkcsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN4RyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZHLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDdkcsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN4RyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZHLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDdkcsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN4RyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZHLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDdkcsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN4RyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZHLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDdkcsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN4RyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3hHLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDdkcsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN2RyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZHLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDeEcsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN4RyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDbkcsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN2RyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3RHLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDdkcsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN4RyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3hHLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDdkcsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ25HLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDdkcsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN4RyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZHLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDeEcsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN2RyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3hHLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDdkcsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN2RyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3hHLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDdkcsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN4RyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZHLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDeEcsWUFBWSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN2RyxZQUFZLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZHLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZELFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZELFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZELFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZELFNBQVM7QUFDVCxRQUFRLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FB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
