body {
    --layer-image-toolkit-popup: 1024;
    --layer-image-toolkit-player: 1025;
    --layer-image-toolkit-notice: 1026;
    --layer-menu: 1027;
}

.menu {
    z-index: var(--layer-menu);
}

.notice-container {
    z-index: var(--layer-image-toolkit-notice);
}

.oit li::before {
    margin-left: 0;
}

.image-toolkit-img-invert {
    filter: invert(1) hue-rotate(180deg);
    mix-blend-mode: screen;
}

.oit-normal {
    position: fixed;
    font-size: 0;
    line-height: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
    z-index: var(--layer-image-toolkit-popup);
    display: none;
}

.oit-pin {
    position: fixed;
    font-size: 0;
    line-height: 0;
    z-index: var(--layer-image-toolkit-popup);
    display: none;
}

.oit .oit-img-container {
    position: fixed;
    top: 0;
    pointer-events: none;
}

.oit .oit-img-container .oit-img-view {
    max-height: none;
    pointer-events: auto;
}

.oit-pin .oit-img-container .oit-img-view {
    position: fixed;
    pointer-events: auto;
    box-shadow: 0 0 5px;
}

.oit-pin .oit-img-container .oit-img-view:hover {
    box-shadow: 0 0 6px #55acc6;
}

.oit .img-default-background {
    background-position: 0 0, 5px 5px !important;
    background-size: 10px 10px !important;
    background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, #fff 25%, #fff 75%, #eee 75%, #eee 100%) !important;
}

.oit .oit-img-container .oit-img-view:hover {
    cursor: pointer;
}

.oit-normal .img-close {
    position: absolute;
    width: 32px;
    height: 32px;
    top: 0;
    right: 0;
    cursor: pointer;
}

.oit .oit-img-tip {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 12px;
    line-height: 20px;
    height: 20px;
    width: 50px;
    text-align: center;
    color: #fff;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, .4);
    pointer-events: none;
    z-index: 1;
}

/*region img-player*/
.oit .img-player {
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: none;
    background-color: #000;
    text-align: center;
    cursor: pointer;
}

.oit .img-player > img {
    display: inline;
    float: none;
    padding: 0;
    max-height: none;
    transform: none;
    cursor: pointer;
}
/*endregion*/

.oit-normal .oit-img-footer {
    position: absolute;
    text-align: center;
    bottom: 5px;
    left: 0;
    right: 0;
}

/*region oit-img-title*/
.oit-normal .oit-img-footer .oit-img-title {
    font-size: 12px;
    line-height: 1;
    display: inline-block;
    max-width: 90%;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 5px;
    opacity: .8;
    color: #fff;
    /* filter: alpha(opacity=80) */
}

.oit-normal .oit-img-footer .oit-img-title:hover {
    /* opacity: 1; */
    color: #fff;
    font-size: 15px;
    background-color: rgba(0, 0, 0, .3);
    border-radius: 8px;
    line-height: 1.5;
    /* filter: alpha(opacity=100) */
}
/*endregion*/

/*region toolbar*/
.oit-normal .oit-img-footer .oit-img-toolbar {
    width: 385px;
    height: 30px;
    margin: 0 auto 5px;
    padding: 3px 0;
}

.oit-normal .oit-img-footer .oit-img-toolbar:hover {
    background-color: rgba(0, 0, 0, .3);
    border-radius: 12px;
}

.oit-normal .oit-img-footer .oit-img-toolbar > li {
    float: left;
    width: 25px;
    height: 25px;
    margin: 0 5px;
    padding: 0;
    line-height: 0;
    border: none;
    cursor: pointer;
    overflow: hidden;
}

.oit-normal .oit-img-footer .oit-img-toolbar > li:hover {
    animation: bounce .5s cubic-bezier(0.51, 0.23, 0.02, 0.96)
}

@keyframes bounce {
    0% {
        transform: scale(1, 1);
    }

    50% {
        transform: scale(0.85, 1.1) translateY(-5px);
    }
}

.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_zoom_to_100::before,
.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_zoom_in::before,
.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_zoom_out::before,
.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_full_screen::before,
.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_refresh::before,
.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_rotate_left::before,
.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_rotate_right::before,
.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_scale_x::before,
.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_scale_y::before,
.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_invert_color::before,
.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_copy::before {
    font-size: 0;
    line-height: 0;
    display: block;
    width: 25px;
    height: 25px;
    color: transparent;
    background-image: url(data:image/png;base64,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);
    background-repeat: no-repeat
}

.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_zoom_to_100::before {
    content: 'Zoom to Actual Size';
    background-position: 0 0
}

.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_zoom_in::before {
    content: 'Zoom In';
    background-position: -25px 0
}

.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_zoom_out::before {
    content: 'Zoom Out';
    background-position: -50px 0
}

.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_full_screen::before {
    content: 'Full Screen';
    background-position: -75px 0
}

.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_refresh::before {
    content: 'Refresh';
    background-position: -100px 0
}

.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_rotate_left::before {
    content: 'Rotate Left';
    background-position: -125px 0
}

.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_rotate_right::before {
    content: 'Rotate Right';
    background-position: -150px 0
}

.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_scale_x::before {
    content: 'Scale x';
    background-position: -175px 0
}

.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_scale_y::before {
    content: 'Scale y';
    background-position: -200px 0
}

.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_invert_color::before {
    content: 'Invert color';
    background-position: -225px 0
}

.oit-normal .oit-img-footer .oit-img-toolbar .toolbar_copy::before {
    content: 'Copy';
    background-position: -250px 0
}
/*endregion*/

/*region gallery-navbar*/
.oit-normal .oit-img-footer .gallery-navbar {
    position: relative;
    flex: 0 0 auto;
    overflow: hidden;
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 60px;
    margin-top: 20px;
    background-color: rgba(0, 0, 0, .1);
}

.oit-normal .oit-img-footer .gallery-navbar:hover {
    background-color: rgba(0, 0, 0, .8);
}

.oit-normal .oit-img-footer .gallery-navbar .gallery-list {
    display: flex;
    transform: translateX(0px);
    cursor: pointer;
}

.oit-normal .oit-img-footer .gallery-navbar .gallery-list .gallery-active {
    opacity: 1;
}

.oit-normal .oit-img-footer .gallery-navbar .gallery-list .img-border-active {
    margin-top: 1px;
    border-width: 1px;
    border-style: solid;
    border-color: red;
}

.oit-normal .oit-img-footer .gallery-navbar .gallery-list > li {
    width: 48px;
    height: 58px;
    opacity: .3;
    color: transparent;
    margin: 2px 1px;
    padding: 0;
    border-radius: 0;
    /* transition: all 100ms linear; */
}

.oit-normal .oit-img-footer .gallery-navbar .gallery-list img {
    width: 46px;
    height: 56px;
}
/*endregion*/

.hotkeys-settings-plus {
    margin: 0 10px;
    font-size: x-large;
}

/*region pickr*/
.pcr-app .pcr-swatches > button {
    padding: 0;
}

/*! Pickr 1.8.2 MIT | https://github.com/Simonwep/pickr */
.pickr {
    position: relative;
    overflow: visible;
    transform: translateY(0)
}

.pickr * {
    box-sizing: border-box;
    outline: none;
    border: none;
    -webkit-appearance: none
}

.pickr .pcr-button {
    position: relative;
    height: 2em;
    width: 2em;
    padding: 0.5em;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
    border-radius: .15em;
    background: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" stroke="%2342445A" stroke-width="5px" stroke-linecap="round"><path d="M45,45L5,5"></path><path d="M45,5L5,45"></path></svg>') no-repeat center;
    background-size: 0;
    transition: all 0.3s
}

.pickr .pcr-button::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');
    background-size: .5em;
    border-radius: .15em;
    z-index: -1
}

.pickr .pcr-button::before {
    z-index: initial
}

.pickr .pcr-button::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transition: background 0.3s;
    background: var(--pcr-color);
    border-radius: .15em
}

.pickr .pcr-button.clear {
    background-size: 70%
}

.pickr .pcr-button.clear::before {
    opacity: 0
}

.pickr .pcr-button.clear:focus {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.85), 0 0 0 3px var(--pcr-color)
}

.pickr .pcr-button.disabled {
    cursor: not-allowed
}

.pickr *, .pcr-app * {
    box-sizing: border-box;
    outline: none;
    border: none;
    -webkit-appearance: none
}

.pickr input:focus, .pickr input.pcr-active, .pickr button:focus, .pickr button.pcr-active, .pcr-app input:focus, .pcr-app input.pcr-active, .pcr-app button:focus, .pcr-app button.pcr-active {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.85), 0 0 0 3px var(--pcr-color)
}

.pickr .pcr-palette, .pickr .pcr-slider, .pcr-app .pcr-palette, .pcr-app .pcr-slider {
    transition: box-shadow 0.3s
}

.pickr .pcr-palette:focus, .pickr .pcr-slider:focus, .pcr-app .pcr-palette:focus, .pcr-app .pcr-slider:focus {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.85), 0 0 0 3px rgba(0, 0, 0, 0.25)
}

.pcr-app {
    position: fixed;
    display: flex;
    flex-direction: column;
    z-index: 10000;
    border-radius: 0.1em;
    background: #fff;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0s 0.3s;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
    box-shadow: 0 0.15em 1.5em 0 rgba(0, 0, 0, 0.1), 0 0 1em 0 rgba(0, 0, 0, 0.03);
    left: 0;
    top: 0
}

.pcr-app.visible {
    transition: opacity 0.3s;
    visibility: visible;
    opacity: 1
}

.pcr-app .pcr-swatches {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.75em
}

.pcr-app .pcr-swatches.pcr-last {
    margin: 0
}

@supports (display: grid) {
    .pcr-app .pcr-swatches {
        display: grid;
        align-items: center;
        grid-template-columns: repeat(auto-fit, 1.75em)
    }
}

.pcr-app .pcr-swatches > button {
    font-size: 1em;
    position: relative;
    width: calc(1.75em - 10px);
    height: calc(1.75em - 10px);
    border-radius: 0.15em;
    cursor: pointer;
    margin: 2.5px;
    flex-shrink: 0;
    justify-self: center;
    transition: all 0.15s;
    overflow: hidden;
    background: transparent;
    z-index: 1
}

.pcr-app .pcr-swatches > button::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');
    background-size: 6px;
    border-radius: .15em;
    z-index: -1
}

.pcr-app .pcr-swatches > button::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--pcr-color);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 0.15em;
    box-sizing: border-box
}

.pcr-app .pcr-swatches > button:hover {
    filter: brightness(1.05)
}

.pcr-app .pcr-swatches > button:not(.pcr-active) {
    box-shadow: none
}

.pcr-app .pcr-interaction {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 -0.2em 0 -0.2em
}

.pcr-app .pcr-interaction > * {
    margin: 0 0.2em
}

.pcr-app .pcr-interaction input {
    letter-spacing: 0.07em;
    font-size: 0.75em;
    text-align: center;
    cursor: pointer;
    color: #75797e;
    background: #f1f3f4;
    border-radius: .15em;
    transition: all 0.15s;
    padding: 0.45em 0.5em;
    margin-top: 0.75em
}

.pcr-app .pcr-interaction input:hover {
    filter: brightness(0.975)
}

.pcr-app .pcr-interaction input:focus {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.85), 0 0 0 3px rgba(66, 133, 244, 0.75)
}

.pcr-app .pcr-interaction .pcr-result {
    color: #75797e;
    text-align: left;
    flex: 1 1 8em;
    min-width: 8em;
    transition: all 0.2s;
    border-radius: .15em;
    background: #f1f3f4;
    cursor: text
}

.pcr-app .pcr-interaction .pcr-result::-moz-selection {
    background: #4285f4;
    color: #fff
}

.pcr-app .pcr-interaction .pcr-result::selection {
    background: #4285f4;
    color: #fff
}

.pcr-app .pcr-interaction .pcr-type.active {
    color: #fff;
    background: #4285f4
}

.pcr-app .pcr-interaction .pcr-save, .pcr-app .pcr-interaction .pcr-cancel, .pcr-app .pcr-interaction .pcr-clear {
    color: #fff;
    width: auto
}

.pcr-app .pcr-interaction .pcr-save, .pcr-app .pcr-interaction .pcr-cancel, .pcr-app .pcr-interaction .pcr-clear {
    color: #fff
}

.pcr-app .pcr-interaction .pcr-save:hover, .pcr-app .pcr-interaction .pcr-cancel:hover, .pcr-app .pcr-interaction .pcr-clear:hover {
    filter: brightness(0.925)
}

.pcr-app .pcr-interaction .pcr-save {
    background: #4285f4
}

.pcr-app .pcr-interaction .pcr-clear, .pcr-app .pcr-interaction .pcr-cancel {
    background: #f44250
}

.pcr-app .pcr-interaction .pcr-clear:focus, .pcr-app .pcr-interaction .pcr-cancel:focus {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.85), 0 0 0 3px rgba(244, 66, 80, 0.75)
}

.pcr-app .pcr-selection .pcr-picker {
    position: absolute;
    height: 18px;
    width: 18px;
    border: 2px solid #fff;
    border-radius: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
}

.pcr-app .pcr-selection .pcr-color-palette, .pcr-app .pcr-selection .pcr-color-chooser, .pcr-app .pcr-selection .pcr-color-opacity {
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: flex;
    flex-direction: column;
    cursor: grab;
    cursor: -webkit-grab
}

.pcr-app .pcr-selection .pcr-color-palette:active, .pcr-app .pcr-selection .pcr-color-chooser:active, .pcr-app .pcr-selection .pcr-color-opacity:active {
    cursor: grabbing;
    cursor: -webkit-grabbing
}

.pcr-app[data-theme='nano'] {
    width: 14.25em;
    max-width: 95vw
}

.pcr-app[data-theme='nano'] .pcr-swatches {
    margin-top: .6em;
    padding: 0 .6em
}

.pcr-app[data-theme='nano'] .pcr-interaction {
    padding: 0 .6em .6em .6em
}

.pcr-app[data-theme='nano'] .pcr-selection {
    display: grid;
    grid-gap: .6em;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: 5fr auto auto;
    align-items: center;
    height: 10.5em;
    width: 100%;
    align-self: flex-start
}

.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-preview {
    grid-area: 2 / 1 / 4 / 1;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-left: .6em
}

.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-preview .pcr-last-color {
    display: none
}

.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-preview .pcr-current-color {
    position: relative;
    background: var(--pcr-color);
    width: 2em;
    height: 2em;
    border-radius: 50em;
    overflow: hidden
}

.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-preview .pcr-current-color::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');
    background-size: .5em;
    border-radius: .15em;
    z-index: -1
}

.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-palette {
    grid-area: 1 / 1 / 2 / 3;
    width: 100%;
    height: 100%;
    z-index: 1
}

.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-palette .pcr-palette {
    border-radius: .15em;
    width: 100%;
    height: 100%
}

.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-palette .pcr-palette::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');
    background-size: .5em;
    border-radius: .15em;
    z-index: -1
}

.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-chooser {
    grid-area: 2 / 2 / 2 / 2
}

.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-opacity {
    grid-area: 3 / 2 / 3 / 2
}

.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-chooser, .pcr-app[data-theme='nano'] .pcr-selection .pcr-color-opacity {
    height: 0.5em;
    margin: 0 .6em
}

.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-chooser .pcr-picker, .pcr-app[data-theme='nano'] .pcr-selection .pcr-color-opacity .pcr-picker {
    top: 50%;
    transform: translateY(-50%)
}

.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-chooser .pcr-slider, .pcr-app[data-theme='nano'] .pcr-selection .pcr-color-opacity .pcr-slider {
    flex-grow: 1;
    border-radius: 50em
}

.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-chooser .pcr-slider {
    background: linear-gradient(to right, red, #ff0, lime, cyan, blue, #f0f, red)
}

.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-opacity .pcr-slider {
    background: linear-gradient(to right, transparent, black), url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');
    background-size: 100%, 0.25em
}
/*endregion*/
