/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/projects/shadowMaze/editor/assets";
/******/ 	// webpack-livereload-plugin
/******/ 	(function() {
/******/ 	  if (typeof window === "undefined") { return };
/******/ 	  var id = "webpack-livereload-plugin-script";
/******/ 	  if (document.getElementById(id)) { return; }
/******/ 	  var el = document.createElement("script");
/******/ 	  el.id = id;
/******/ 	  el.async = true;
/******/ 	  el.src = "http://localhost:35729/livereload.js";
/******/ 	  document.getElementsByTagName("head")[0].appendChild(el);
/******/ 	}());
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);


/***/ },
/* 1 */
/***/ function(module, exports) {

	class EventsController {
		constructor() {
			if(!(this instanceof EventsController)){
				return new EventsController();
			}
			this._events = Object.create(null);
		}
	
		add(el, type, handler, phrase = false) {
			el.addEventListener(type, handler, !!phrase);
			(this._events[type] || (this._events[type] = [])).push({
				el,
				type,
				handler
			});
			return this;
		}
	
		remove(type) {
			if(this._events[type]){
				const events = this._events[type];
				for(let event of events){
					event.el.removeEventListener(event.type, event.handler);
				}
				delete this._events[type];
			}
			return this;
		}
	
		destroy() {
			const events = this._events;
			for(let key in events){
				this.remove(key);
			}
			this._events = null;
			return null;
		}
	}
	
	
	module.exports = EventsController;

/***/ },
/* 2 */
/***/ function(module, exports) {

	const fs = nodeRequire("fs");
	
	
	module.exports = {
		getOffset: (el) => {
			const bodyRect = document.body.getBoundingClientRect(),
				elRect = el.getBoundingClientRect();
	
			return {
				top: elRect.top - bodyRect.top,
				left: elRect.left - bodyRect.left
			}
		},
	
		copyFile: (source, target, cb) => {
			let cbCalled = false;
			const rd = fs.createReadStream(source),
				wr = fs.createWriteStream(target);
	
			rd.on("error", (err) => done(err));
			wr.on("error", (err) => done(err));
			wr.on("close", (ex) => done());
			rd.pipe(wr);
	
			function done(err) {
				if (!cbCalled) {
					cb(err);
					cbCalled = true;
				}
			}
		}
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "@font-face {\n  font-family: 'Material Icons';\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Material Icons\"), local(\"MaterialIcons-Regular\"), url(" + __webpack_require__(7) + ") format(\"woff\"); }\n\n.mi {\n  font-family: 'Material Icons';\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  /* Preferred icon size */\n  display: inline-block;\n  line-height: 1;\n  text-transform: none;\n  letter-spacing: normal;\n  word-wrap: normal;\n  white-space: nowrap;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  text-rendering: optimizeLegibility;\n  /* Rules for using icons as black on a light background. */\n  /* Rules for using icons as white on a dark background. */ }\n  .mi.md-18 {\n    font-size: 18px; }\n  .mi.md-24 {\n    font-size: 24px; }\n  .mi.md-36 {\n    font-size: 36px; }\n  .mi.md-48 {\n    font-size: 48px; }\n  .mi.md-dark {\n    color: rgba(0, 0, 0, 0.54); }\n    .mi.md-dark.md-inactive {\n      color: rgba(0, 0, 0, 0.26); }\n  .mi.md-light {\n    color: white; }\n    .mi.md-light.md-inactive {\n      color: rgba(255, 255, 255, 0.3); }\n\nbutton.shadow-maze-btn {\n  border: 3px solid #222;\n  background: #ebebeb;\n  overflow: hidden;\n  width: 100%;\n  outline: none;\n  display: flex;\n  align-items: center;\n  transition: background-color .3s; }\n  button.shadow-maze-btn span {\n    text-transform: uppercase;\n    font-weight: 700;\n    font-size: 1.5em;\n    color: #222;\n    display: block;\n    user-select: none;\n    position: relative;\n    overflow: hidden;\n    padding: 10px; }\n  button.shadow-maze-btn:hover {\n    background-color: #e1e1e1;\n    cursor: pointer; }\n\nbody {\n  margin: 0;\n  padding: 0;\n  height: 100vh;\n  background-color: #efefef;\n  overflow: hidden; }\n\n.editor-container {\n  height: inherit;\n  display: flex;\n  flex-direction: row;\n  user-select: none; }\n  .editor-container input[type=file] {\n    display: none; }\n  .editor-container .exit {\n    position: absolute;\n    text-decoration: none;\n    color: #222;\n    transition: text-shadow .4s, color .6s;\n    top: 0;\n    left: 0;\n    padding: 0; }\n    .editor-container .exit:hover {\n      text-shadow: 0 0 6px rgba(0, 0, 0, 0.4);\n      color: #C62828; }\n  .editor-container .left-navbar {\n    flex: 3;\n    min-width: 230px;\n    max-width: 400px;\n    display: flex;\n    flex-direction: column;\n    align-items: stretch;\n    background-color: #ccc;\n    box-shadow: 0 0 6px rgba(0, 0, 0, 0.4); }\n    .editor-container .left-navbar ::-webkit-scrollbar {\n      width: 0.5em;\n      height: 0.5em; }\n    .editor-container .left-navbar ::-webkit-scrollbar-thumb {\n      background: #222; }\n    .editor-container .left-navbar ::-webkit-scrollbar-track {\n      background: #919191; }\n    .editor-container .left-navbar .main-actions {\n      list-style: none;\n      margin: 0;\n      padding: 7px 0 0;\n      display: flex;\n      width: 100%;\n      justify-content: flex-end; }\n      .editor-container .left-navbar .main-actions li {\n        margin-right: 15px; }\n        .editor-container .left-navbar .main-actions li a {\n          text-decoration: none;\n          color: #444;\n          display: inline-block;\n          transition: text-shadow .4s, color .4s; }\n          .editor-container .left-navbar .main-actions li a:hover {\n            text-shadow: 0 0 6px rgba(0, 0, 0, 0.4); }\n    .editor-container .left-navbar .add-sound, .editor-container .left-navbar .add-level {\n      border-right-width: 0;\n      border-left-width: 0; }\n    .editor-container .left-navbar .title {\n      cursor: default;\n      color: #222;\n      font-size: 1.5em;\n      border: 3px solid #222;\n      border-right-width: 0;\n      border-left-width: 0;\n      padding: 10px;\n      text-transform: uppercase;\n      font-weight: 700;\n      background-color: #ebebeb; }\n    .editor-container .left-navbar .sound-list {\n      flex: 1;\n      list-style: none;\n      padding: 0;\n      margin: 0;\n      display: flex;\n      flex-direction: column;\n      overflow-y: auto;\n      overflow-x: hidden; }\n      .editor-container .left-navbar .sound-list li {\n        padding: 10px 15px;\n        font-size: 18px;\n        cursor: default;\n        transition: background-color .3s; }\n        .editor-container .left-navbar .sound-list li:hover {\n          background-color: #bfbfbf; }\n        .editor-container .left-navbar .sound-list li a {\n          text-decoration: none;\n          color: #222;\n          display: flex;\n          justify-content: space-between; }\n      .editor-container .left-navbar .sound-list li {\n        padding: 5px 15px; }\n        .editor-container .left-navbar .sound-list li a {\n          display: flex;\n          align-items: center;\n          justify-content: space-between;\n          cursor: default; }\n          .editor-container .left-navbar .sound-list li a .play:before {\n            cursor: pointer;\n            content: \"play_circle_filled\";\n            font-family: \"Material Icons\";\n            font-size: 28px;\n            opacity: 0;\n            transition: opacity .1s, text-shadow .4s;\n            transition-delay: .0s; }\n        .editor-container .left-navbar .sound-list li:hover .play:before, .editor-container .left-navbar .sound-list li:hover .timeline {\n          opacity: 1;\n          transition: opacity .6s, color .4s;\n          transition-delay: .5s, .0s; }\n        .editor-container .left-navbar .sound-list li.played .play:before {\n          content: \"pause_circle_filled\";\n          opacity: 1; }\n        .editor-container .left-navbar .sound-list li.played .timeline {\n          opacity: 1; }\n        .editor-container .left-navbar .sound-list li .timeline {\n          cursor: pointer;\n          display: block;\n          width: 100%;\n          height: 5px;\n          opacity: 0;\n          transition: opacity .1s, color .4s;\n          transition-delay: .0s;\n          background-color: #ebebeb;\n          border-radius: 3px;\n          position: relative;\n          float: left; }\n          .editor-container .left-navbar .sound-list li .timeline .progress {\n            display: block;\n            background-color: #222222;\n            height: 100%;\n            width: 0; }\n    .editor-container .left-navbar .settings-list {\n      list-style: none;\n      padding: 0;\n      margin: 0;\n      display: flex;\n      flex-direction: column;\n      overflow-y: auto;\n      overflow-x: hidden; }\n      .editor-container .left-navbar .settings-list li {\n        padding: 10px 15px;\n        font-size: 18px;\n        cursor: default;\n        transition: background-color .3s; }\n        .editor-container .left-navbar .settings-list li:hover {\n          background-color: #bfbfbf; }\n        .editor-container .left-navbar .settings-list li a {\n          text-decoration: none;\n          color: #222;\n          display: flex;\n          justify-content: space-between; }\n    .editor-container .left-navbar .levels-list {\n      flex: 1;\n      list-style: none;\n      padding: 0;\n      margin: 0;\n      display: flex;\n      flex-direction: column;\n      overflow-y: auto;\n      overflow-x: hidden; }\n      .editor-container .left-navbar .levels-list li {\n        padding: 10px 15px;\n        font-size: 18px;\n        cursor: default;\n        transition: background-color .3s; }\n        .editor-container .left-navbar .levels-list li:hover {\n          background-color: #bfbfbf; }\n        .editor-container .left-navbar .levels-list li a {\n          text-decoration: none;\n          color: #222;\n          display: flex;\n          justify-content: space-between; }\n      .editor-container .left-navbar .levels-list li {\n        padding: 5px 15px;\n        cursor: pointer; }\n        .editor-container .left-navbar .levels-list li a {\n          cursor: inherit;\n          display: flex;\n          align-items: center;\n          justify-content: space-between; }\n          .editor-container .left-navbar .levels-list li a .remove:before {\n            content: \"delete\";\n            font-family: \"Material Icons\";\n            font-size: 28px;\n            opacity: 0;\n            transition: opacity .1s, text-shadow .4s;\n            transition-delay: .0s; }\n        .editor-container .left-navbar .levels-list li:hover .remove:before {\n          opacity: 1;\n          transition: opacity .6s, color .4s;\n          transition-delay: .5s, .0s; }\n        .editor-container .left-navbar .levels-list li .remove:hover {\n          color: #C62828; }\n        .editor-container .left-navbar .levels-list li.active {\n          cursor: default;\n          background-color: #bfbfbf; }\n  .editor-container .map-container {\n    flex: 5;\n    margin: 5px 10px;\n    background-color: #efefef;\n    min-width: 545px;\n    min-height: 545px; }\n    .editor-container .map-container canvas {\n      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4); }\n\n[data-hidden] {\n  transition-property: opacity;\n  transition-duration: .4s;\n  transition-timing-function: cubic-bezier(0, 1, 0.5, 1); }\n\n[data-hidden=\"true\"] {\n  opacity: 0.3;\n  pointer-events: none; }\n", ""]);
	
	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "data:application/font-woff;base64,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"

/***/ },
/* 8 */
/***/ function(module, exports) {

	const fs = nodeRequire("fs"),
		path = nodeRequire("path"),
		traverse = nodeRequire("traverse");
	
	
	class ProjectManager {
		static get defaults(){
			return {
				workPath: "./game",
				sourceDirName: "source",
				entryPoint: "data.json",
				modules: null
			}
		}
	
	
		constructor(params = {}){
			this._params = Object.assign({}, ProjectManager.defaults, params);
			this.modules = new Map();
			this._prepareFileSystem();
		}
	
		get workPath(){
			return path.resolve(this._params.workPath);
		}
	
		get sourcePath(){
			return path.join(this.workPath, this._params.sourceDirName);
		}
	
		get entryPoint(){
			return path.join(this.workPath, this._params.entryPoint);
		}
	
		get paramsModules(){
			return this._params.modules || [];
		}
	
		get gameData(){
			return this._gameData;
		}
	
		get levels(){
			return this.gameData.levels;
		}
	
		set levels(lvs){
			let gameData = Object.assign({}, this.gameData),
				activeLevel = this.activeLevel;
			gameData.levels = lvs.slice(0).filter((v, i, s) => s.indexOf(v) === i);
			this._updateGameData(gameData);
	
			if(activeLevel && this.levels.indexOf(activeLevel) === -1){
				this.activeLevel = null;
			}
		}
	
		get activeLevel(){
			return this._activeLevel;
		}
	
		set activeLevel(val){
			this._activeLevel = val;
			const ev = new Event("update-active-level", { bubbles: true });
			ev.activeLevel = this.activeLevel;
			document.dispatchEvent(ev);
			this._readLevelData(this._updateActiveLevelData.bind(this));
		}
	
		get activeLevelData(){
			return this._activeLevelData;
		}
	
		get levelFilePath(){
			let level = this.activeLevel;
			if(level){
				return path.resolve(path.join(this.workPath, level + ".json"));
			}
			return null;
		}
	
		_prepareFileSystem() {
			const workPath = this.workPath,
				sourcePath = this.sourcePath;
	
			if(!fs.existsSync(workPath)) {
				fs.mkdirSync(workPath);
			}
	
			if(!fs.existsSync(sourcePath)){
				fs.mkdirSync(sourcePath);
			}
	
			this._readGameData(() => {
				this._loadModules();
				this.activeLevel = null;
			});
	
			return this;
		}
	
		_updateGameData(data){
			this._gameData = data;
			const ev = new Event("update-game-data", { bubbles: true });
			ev.gameData = Object.assign({}, this.gameData);
			document.dispatchEvent(ev);
			this._writeGameData();
			return this;
		}
	
		_readGameData(cb){
			fs.readFile(this.entryPoint, (err, data) => {
				const createException = (err) => {
					console.error(err);
					this._gameData = { levels: [] };
					this._writeGameData();
					if(cb) cb.call(this, err);
				};
	
				if(err) {
					createException(err);
					return;
				}
	
				try {
					this._gameData = JSON.parse(data);
					if(cb) cb.call(this, null);
				} catch (e) {
					createException(e);
				}
			});
			return this;
		}
	
		_writeGameData(cb){
			fs.writeFile(this.entryPoint, JSON.stringify(this.gameData), (err) => {
				if(err) console.error(err);
				if(cb) cb.call(this, err);
			});
			return this;
		}
	
		_updateActiveLevelData(data){
			this._activeLevelData = data;
			const ev = new Event("update-active-level-data", { bubbles: true });
			ev.activeLevelData = Object.assign({}, this.activeLevelData);
			document.dispatchEvent(ev);
			this._writeLevelData();
			return this;
		}
	
		_readLevelData(cb){
			const levelFilePath = this.levelFilePath;
			if(!levelFilePath) return typeof cb === "function" && cb(null);
	
			fs.readFile(levelFilePath, (err, data) => {
				function createException(err) {
					console.error(err);
					if( typeof  cb === "function") cb(null);
					return err;
				}
	
				if(err) return createException(err);
	
				try{
					data = JSON.parse(data);
					if(typeof cb === "function") cb(data);
				} catch (err){
					createException(err);
				}
			});
		}
	
		_writeLevelData(){
			const levelFilePath = this.levelFilePath;
			if(!levelFilePath) return;
	
			fs.writeFile(levelFilePath, JSON.stringify(this.activeLevelData), (err) => {
				if(err) console.error(err);
			});
		}
	
		_loadModules(){
			const paramsModules = this.paramsModules;
	
			for(let paramsModule of paramsModules){
				this.modules.set(paramsModule.name, new paramsModule.module(Object.assign({}, paramsModule.params), this));
			}
			return this;
		}
	}
	
	
	Object.assign(ProjectManager, {
	
	});
	
	
	module.exports = ProjectManager;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(6);
	
	const path = nodeRequire("path"),
		ProjectManager = __webpack_require__(8);
	
	
	window.vex.defaultOptions.className = "vex-theme-os";
	window.projectManager = new ProjectManager({
		modules: [
			{
				name: "settingsList",
				module: __webpack_require__(15),
				params: {
					listContainer: document.querySelector(".settings-list")
				}
			},
			{
				name: "addLevelDialog",
				module: __webpack_require__(11),
				params: {
					button: document.querySelector(".add-level")
				}
			},
			{
				name: "levelsList",
				module: __webpack_require__(13),
				params: {
					listContainer: document.querySelector(".levels-list")
				}
			},
			{
				name: "mapEditor",
				module: __webpack_require__(14),
				params: {
					mapContainer: document.querySelector(".map-container")
				}
			},
			{
				name: "addSoundDialog",
				module: __webpack_require__(12),
				params: {
					fileInput: document.getElementById("sound-dialog"),
					button: document.querySelector(".add-sound")
				}
			},
			{
				name: "soundList",
				module: __webpack_require__(16),
				params: {
					listContainer: document.querySelector(".sound-list")
				}
			},
			{
				name: "history",
				module: __webpack_require__(18),
				params: {
					undoEl: document.querySelector(".history.undo"),
					redoEl: document.querySelector(".history.redo")
				}
			}
		]
	});

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	const EventsController = __webpack_require__(1),
		path = nodeRequire("path"),
		fs = nodeRequire("fs"),
		vex = window.vex;
	
	
	class AddLevelDialog {
		static get defaults(){
			return {
				button: null
			}
		}
	
		static getModalContent(){
			return `
			<input name="levelName" type="text" placeholder="Name" required/>
			<input name="levelSize" type="text" placeholder="Size"/>
			`
		}
	
	
		constructor(params, projectManager){
			this._params = Object.assign({}, AddLevelDialog.defaults, params);
			this.projectManager = projectManager;
			this._attachEvents();
		}
	
		get button(){
			return this._params.button;
		}
	
		get workPath(){
			return this.projectManager.workPath;
		}
	
		_attachEvents(){
			const ec = this._ec = new EventsController();
	
			this._onClick = this._onClick.bind(this);
			ec.add(this.button, "click", this._onClick);
			return this;
		}
	
		_onClick(){
			const self = this;
			vex.dialog.buttons.YES.text = "Add";
			this._dialog = vex.dialog.open({
				input: AddLevelDialog.getModalContent(),
				callback: function (data) {
					if(data) self._createLevel(data);
				}
			})
		}
	
		_createLevel(data){
			if(!data || !data.levelName) return this;
			const name = ("" + data.levelName).trim().toLowerCase(),
				size = +data.levelSize || AddLevelDialog.defaultLevelSize;
			let levels = this.projectManager.levels;
	
			if(name && levels.indexOf(name) === -1){
				const levelData = { data: new Array(size) };
				fs.writeFile(path.join(this.workPath, `${name}.json`), JSON.stringify(levelData), (err) => {
					if(err){
						console.error(err);
						return;
					}
					levels.push(name);
					this.projectManager.levels = levels;
				});
	
			}
			return this;
		}
	
		destroy(){
			if(this._dialog) this._dialog.close();
			this._ec.destroy();
			return null;
		}
	}
	
	
	Object.assign(AddLevelDialog, {
		defaultLevelSize: 25
	});
	
	
	module.exports = AddLevelDialog;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	const EventsController = __webpack_require__(1),
		helper = __webpack_require__(2),
		path = nodeRequire("path");
	
	
	class AddSoundDialog {
		static get defaults(){
			return {
				fileInput: null,
				button: null
			}
		}
	
	
		constructor(params, projectManager){
			this._params = Object.assign({}, AddSoundDialog.defaults, params);
			this.projectManager = projectManager;
			this._attachEvents();
		}
	
		get sourcePath(){
			return this.projectManager.sourcePath;
		}
	
		get fileInput(){
			return this._params.fileInput;
		}
	
		get button(){
			return this._params.button;
		}
	
		_attachEvents(){
			const ec = this._ec = new EventsController();
	
			this._onClick = this._onClick.bind(this);
			this._onChange = this._onChange.bind(this);
	
			ec.add(this.button, "click", this._onClick);
			ec.add(this.fileInput, "change", this._onChange);
			return this;
		}
	
		_onClick(){
			const ev = new MouseEvent("click");
			this.fileInput.dispatchEvent(ev);
		}
	
		_onChange(){
			const fileInput = this.fileInput,
				files = fileInput.files,
				types = fileInput.getAttribute("accept").split(","),
				sourcePath = this.sourcePath;
	
			for(let file of files){
				if(types.indexOf(file.type)){
					helper.copyFile(file.path, path.join(sourcePath, file.name), (err) => {
						if(err) console.error(err);
					});
				}
			}
		}
	
		destroy(){
			this._ec.destroy();
			return null;
		}
	}
	
	
	module.exports = AddSoundDialog;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	const EventsController = __webpack_require__(1),
		path = nodeRequire("path"),
		fs = nodeRequire("fs");
	
	
	class LevelsList {
		static get defaults(){
			return {
				listContainer: null
			}
		}
	
		static getItemTemplate(title){
			return `<li data-name="${ title }">
				<a href="#">
					<span class="text">${ title }</span>
					<span class="remove"></span>
				</a>
			</li>`
		}
	
	
		constructor(params, projectManager) {
			this._params = Object.assign({}, LevelsList.defaults, params);
			this.projectManager = projectManager;
			this
				._attachEvents()
				._render();
		}
	
		get levels(){
			return this.projectManager.levels;
		}
	
		get listContainer(){
			return this._params.listContainer;
		}
	
		_attachEvents(){
			const  listContainer = this.listContainer,
				ec = this._ec = new EventsController();
	
			this._onUpdateGameData = this._onUpdateGameData.bind(this);
			this._showActiveLevel = this._showActiveLevel.bind(this);
			this._onItemClick = this._onItemClick.bind(this);
	
			ec.add(window, "update-game-data", this._onUpdateGameData);
			ec.add(window, "update-active-level", this._showActiveLevel);
			ec.add(listContainer, "click", this._onItemClick);
			return this;
		}
	
		_onUpdateGameData(e){
			this._params.levels = e.gameData.levels.slice(0);
			this._render();
		}
	
		_onItemClick(e){
			const projectManager = this.projectManager,
				liElement = e.target.closest("li");
	
			if(!liElement) return;
			const name = (liElement.getAttribute("data-name") || "").toLowerCase().trim();
	
			if(e.target.classList.contains("remove")){
				let levels = this.levels,
					index;
	
				if(name && (index = levels.indexOf(name)) !== -1){
					fs.unlink(path.join(projectManager.workPath, `${name}.json`), (err) => {
						if(err){
							console.error(err);
							return;
						}
						levels.splice(index, 1);
						projectManager.levels = levels;
					});
				}
			} else {
				projectManager.activeLevel = name;
			}
		}
	
		_showActiveLevel(){
			const activeLevel = projectManager.activeLevel,
				listContainer = this.listContainer,
				activeItem = listContainer.querySelector("li.active");
	
			if(activeItem) activeItem.classList.remove("active");
			if(activeLevel){
				const newActiveItem = listContainer.querySelector(`li[data-name='${activeLevel}']`);
				if(newActiveItem) newActiveItem.classList.add("active");
			}
	
			return this;
		}
	
		_render(){
			const levels = this.levels || [],
				listContainer = this.listContainer;
	
			listContainer.innerHTML = "";
			for(let level of levels){
				listContainer.insertAdjacentHTML("beforeend", LevelsList.getItemTemplate(level));
			}
			this._showActiveLevel();
	
			return this;
		}
	
		destroy(){
			this._ec.destroy();
			return null;
		}
	}
	
	
	module.exports = LevelsList;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	const EventsController = __webpack_require__(1),
		path = nodeRequire("path"),
		fs = nodeRequire("fs");
	
	
	class MapEditor {
		static get defaults() {
			return {
				mapContainer: null
			}
		}
	
		constructor(params = {}, projectManager) {
			this._params = Object.assign(Object.create(null), MapEditor.defaults, params);
			this.projectManager = projectManager;
	
			this._generateEditorData();
	
			this._createCanvas()
				._positioningCanvas()
				._attachEvents();
	
			const render = () => {
				this._renderGrid();
				this._renderGridRAFId = requestAnimationFrame(render);
			};
	
			render();
		}
	
		get mapContainer() {
			return this._params.mapContainer;
		}
	
		get size() {
			return this._size;
		}
	
		get editorData() {
			return this._editorData;
		}
	
		set editorData(val) {
			this._editorData = val;
			if(val) this._size = val.length;
			this._generateEditorData();
		}
	
		get cellData() {
			return this._cellData;
		}
	
		_updateLevelData(){
			if(this.projectManager.activeLevel){
				let levelData = Object.assign({}, this.projectManager.activeLevelData);
				levelData.data = Object.assign([], this.editorData);
				this.projectManager._updateActiveLevelData(levelData);
			}
			return this;
		}
	
		_generateEditorData() {
			if(!this.projectManager.activeLevel){
				return this;
			}
	
			const editorData = (this.editorData || (this._editorData = [])),
				size = this._size = Math.max(MapEditor.mapSize, +this.size || 0);
	
			editorData.length = size;
			for(let i = 0; i < size; i++){
				if(!editorData[i]) editorData[i] = [];
				editorData[i].length = size;
				for(let j = 0; j < size; j++){
					if(!editorData[i][j]){
						editorData[i][j] = {};
					}
				}
			}
	
			this._updateSelectedCell(null);
			return this;
		}
	
		_attachEvents() {
			const ec = this._eventsController = new EventsController(),
				mapContainer = this.mapContainer;
	
			this._onChangeState = this._onChangeState.bind(this);
			this._onResize = this._onResize.bind(this);
			this._onMouseMove = this._onMouseMove.bind(this);
			this._onMouseLeave = this._onMouseLeave.bind(this);
			this._onMouseDown = this._onMouseDown.bind(this);
			this._onMouseUp = this._onMouseUp.bind(this);
			this._onChangeActiveLevelData = this._onChangeActiveLevelData.bind(this);
			this._onChaneActiveLevel = this._onChaneActiveLevel.bind(this);
	
			ec.add(window, "changestate", this._onChangeState);
			ec.add(window, "resize", this._onResize);
			ec.add(mapContainer, "mousemove", this._onMouseMove);
			ec.add(mapContainer, "mouseleave", this._onMouseLeave);
			ec.add(mapContainer, "mousedown", this._onMouseDown);
			ec.add(window, "mouseup", this._onMouseUp);
			ec.add(window, "contextmenu", this._onContextMenu);
			ec.add(window, "update-active-level-data", this._onChangeActiveLevelData);
			ec.add(window, "update-active-level", this._onChaneActiveLevel);
	
			return this;
		}
	
		_createCanvas() {
			const cnv = this._cnv = document.createElement("canvas");
	
			this.mapContainer.appendChild(cnv);
			this._ctx = cnv.getContext("2d");
			return this;
		}
	
		_positioningCanvas(){
			const cnv = this._cnv,
				cnvStyle = cnv.style,
				mapContainer = this.mapContainer,
				wContainer = mapContainer.clientWidth,
				hContainer = mapContainer.clientHeight,
				size = this.size,
				freeSpace = MapEditor.cellSpacing * (size - 1),
				sizeCanvas = Math.floor((Math.min(wContainer, hContainer)  - freeSpace) / size) * size + freeSpace;
	
			mapContainer.style.position = "relative";
			cnvStyle.position = "absolute";
			cnv.width = sizeCanvas;
			cnv.height = sizeCanvas;
			cnvStyle.left = (wContainer - sizeCanvas) / 2 + "px";
			cnvStyle.top = (hContainer - sizeCanvas) / 2 + "px";
			return this;
		}
	
		_getGridData(){
			const cnv = this._cnv,
				cnvW = cnv.width,
				cnvH = cnv.height,
				size = this.size,
				cellSpacing = MapEditor.cellSpacing,
				cellSize = Math.floor((cnvW - cellSpacing * (size - 1)) / size),
				cellSpace = cellSpacing + cellSize;
	
			return {
				cnvW,
				cnvH,
				cellSize,
				cellSpace,
				cellSpacing
			}
		}
	
		_getCellByEvent(e){
			const cnv = this._cnv,
				pos = cnv.getBoundingClientRect(),
				cnvW = cnv.width,
				cnvH = cnv.height,
				x = e.pageX - pos.left,
				y = e.pageY - pos.top;
	
			if(x >= 0 && x <= cnvW && y >= 0 && y <= cnvH){
				const gridData = this._getGridData(),
					column = Math.floor(x / gridData.cellSpace),
					leftRange = column * gridData.cellSpace,
					rightRange = leftRange + gridData.cellSize;
	
				if(leftRange <= x && rightRange >= x){
					const row = Math.floor(y / gridData.cellSpace),
						topRange = row * gridData.cellSpace,
						bottomRange = topRange + gridData.cellSize;
	
					if(topRange <= y && bottomRange >= y){
						return { column, row }
					}
				}
			}
	
			return null;
		}
	
		_updateSelectedCell(cellData) {
			const currentCellData = this._selectedCell || {},
				ev = new Event("editor-select-cell", { bubbles: true });
	
			this._selectedCell = ev.cellData = cellData && (cellData.row === currentCellData.row && cellData.column === currentCellData.column) ? null : cellData;
			document.dispatchEvent(ev);
		}
	
		_onChangeState(e){
			switch (e.action){
				case "editorData":
					this.editorData = e.state;
					this._updateLevelData();
					break;
			}
		}
	
		_onResize(){
			this._positioningCanvas();
		}
	
		_onContextMenu(e){
			e.preventDefault();
		}
	
		_onMouseDown(e){
			if(e.button === 2){
				const cellData = this._getCellByEvent(e);
				this._mouseRightButton = true;
				if(cellData) {
					const cell = this.editorData[cellData.row][cellData.column];
					e.preventDefault();
					cell.track = !e.ctrlKey;
				}
			} else if (e.button === 0) {
				this._updateSelectedCell(this._getCellByEvent(e));
			}
		}
	
		_onMouseUp(e){
			if(e.button === 2){
				this._mouseRightButton = false;
				this._updateLevelData();
			}
		}
	
		_onMouseMove(e){
			const cellData = this._getCellByEvent(e);
	
			if(this._mouseRightButton && cellData){
				const cell = this.editorData[cellData.row][cellData.column];
				cell.track = !e.ctrlKey;
			}
	
			this.hoverData = cellData;
		}
	
		_onMouseLeave(){
			this.hoverData = null;
		}
	
		_onChangeActiveLevelData(){
			let activeLevelData = this.projectManager.activeLevelData;
			this.editorData = activeLevelData && activeLevelData.data;
			this._positioningCanvas();
		}
	
		_onChaneActiveLevel(){
			const cnv = this._cnv;
			cnv.style.opacity = this.projectManager.activeLevel ? "" : "0";
		}
	
		_renderGrid() {
			if(!this.projectManager.activeLevel) return;
			const ctx = this._ctx,
				size = this.size,
				gridData = this._getGridData(),
				cellSpace = gridData.cellSpace,
				cellSize = gridData.cellSize,
				editorData = this.editorData;
	
			ctx.fillStyle = MapEditor.bgColor;
			ctx.fillRect(0, 0, gridData.cnvW, gridData.cnvH);
	
			for(let i = 0; i < size; i++){
				for(let j = 0; j < size; j++){
					if(editorData[i][j].track){
						ctx.fillStyle = MapEditor.trackColor;
					}else{
						ctx.fillStyle = MapEditor.cellColor;
					}
					ctx.fillRect(j * cellSpace, i * cellSpace, cellSize, cellSize);
				}
			}
	
			[
				[this.hoverData, "hoverColor"],
				[this._selectedCell, "selectedColor"]
			].forEach((item) => {
				if(!item[0]) return;
				const lineWidth = MapEditor.cellSpacing * 3,
					x = item[0].column * cellSpace + lineWidth / 2,
					y = item[0].row * cellSpace + lineWidth / 2;
	
				ctx.strokeStyle = MapEditor[item[1]];
				ctx.lineWidth = lineWidth;
				ctx.beginPath();
				ctx.rect(x, y, cellSize - lineWidth, cellSize - lineWidth);
				ctx.stroke();
			});
	
			return this;
		}
	
		destroy(){
			cancelAnimationFrame(this._renderGridRAFId);
			this._eventsController.destroy();
		}
	}
	
	
	
	Object.assign(MapEditor, {
		cellSpacing: 1,
		cellColor: "#ccc",
		hoverColor: "#222",
		selectedColor: "#3288e6",
		trackColor: "#efefef",
		bgColor: "#777",
		mapSize: 25
	});
	
	
	
	module.exports = MapEditor;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	const EventsController = __webpack_require__(1);
	
	
	class SettingsList {
		static get defaults() {
			return {
				listContainer: null
			}
		}
	
	
		constructor(params, projectManager) {
			this._params = Object.assign({}, SettingsList.defaults, params);
			this.projectManager = projectManager;
	
			this._attachEvents();
		}
	
		get listContainer() {
			return this._params.listContainer;
		}
	
		_attachEvents() {
			const ec = this._ec = new EventsController();
	
			this._onActiveLevel = this._onActiveLevel.bind(this);
			this._onSelectCell = this._onSelectCell.bind(this);
	
			ec.add(window, "update-active-level", this._onActiveLevel);
			ec.add(window, "editor-select-cell", this._onSelectCell);
			return this;
		}
	
		_onSelectCell(e){
			const hidden = "" + !e.cellData,
				cellSettingsItem = this.listContainer.querySelector("[data-settings='cell']");
	
			cellSettingsItem.setAttribute("data-hidden", hidden);
		}
	
		_onActiveLevel() {
			const hidden = "" + !this.projectManager.activeLevel,
				items = this.listContainer.children;
	
			for(let item of items) {
				item.setAttribute("data-hidden", hidden);
			}
		}
	
		destroy() {
			this._ec.destroy();
			return null;
		}
	}
	
	
	module.exports = SettingsList;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	const EventsController = __webpack_require__(1),
		fs = nodeRequire("fs"),
		path = nodeRequire("path"),
		helper = __webpack_require__(2);
	
	
	class SoundList {
		static get defaults(){
			return {
				listContainer: null
			};
		}
	
		static getItemTemplate(title, src){
			return `<li>
				<a href="#">
					<span class="text">${ title }</span>
					<span class="play"></span>
					<audio src="file://${ path.resolve(path.join(src, title)) }"></audio>
				</a>
				<div class="timeline">
					<span class="progress"></span>
				</div>
			</li>`
		}
	
		constructor(params, projectManager){
			this._params = Object.assign({}, SoundList.defaults, params);
			this.projectManager = projectManager;
			this._attachEvents()._updateSounds()._watch();
		}
	
		get sourcePath(){
			return this.projectManager.sourcePath;
		}
	
		get listContainer(){
			return this._params.listContainer;
		}
	
		get sounds(){
			return this._sounds;
		}
	
		_onClick(e){
			let timeline;
			if(e.target.classList.contains("play")){
				const currentAudio = this._activeAudio,
					audio = e.target.closest("li").querySelector("audio");
	
				if(currentAudio) currentAudio.pause();
				if(audio !== currentAudio){
					audio.play();
				}
			} else if (timeline = e.target.closest(".timeline")){
				const audio = e.target.closest("li").querySelector("audio"),
					clickPos = e.pageX - helper.getOffset(timeline).left,
					percent = clickPos / timeline.clientWidth;
	
				audio.currentTime = Math.round(audio.duration * percent);
			}
		}
	
		_onPlay(e){
			const root = e.target.closest("li"),
				audio = e.target.closest("li").querySelector("audio");
	
			root.classList.add("played");
			this._activeAudio = audio;
		}
	
		_onPause(e){
			const root = e.target.closest("li");
	
			root.classList.remove("played");
			this._activeAudio = null;
		}
	
		_onTimeupdate(e){
			const audio = e.target,
				el = audio.closest("li").querySelector(".progress"),
				duration =  audio.duration;
	
			if (duration > 0) {
				const progress = (audio.currentTime / duration) * 100;
				el.style.width = progress + "%";
				if(progress === 100){
					audio.pause();
					audio.currentTime = 0;
				}
			}
		}
	
		_attachEvents(){
			const ec = this._ec = new EventsController();
	
			this._onClick = this._onClick.bind(this);
			this._onTimeupdate = this._onTimeupdate.bind(this);
			this._onPlay = this._onPlay.bind(this);
			this._onPause = this._onPause.bind(this);
	
			ec.add(this.listContainer, "click", this._onClick);
			ec.add(this.listContainer, "timeupdate", this._onTimeupdate, true);
			ec.add(this.listContainer, "play", this._onPlay, true);
			ec.add(this.listContainer, "pause", this._onPause, true);
			return this;
		}
	
		_updateSounds(){
			fs.readdir(this.sourcePath, (err, files) => {
				if(err) throw err;
				this._sounds = files.filter((fileName) => {
					const extname = path.extname(fileName).toLowerCase().substr(1);
					return SoundList.soundFormats.indexOf(extname) !== -1;
				});
				this._render();
			});
			return this;
		}
	
		_watch(){
			fs.watch(this.sourcePath, this._updateSounds.bind(this));
			return this;
		}
	
		_render(){
			const sounds = this.sounds || [],
				sourcePath = this.sourcePath,
				listContainer = this.listContainer;
	
			listContainer.innerHTML = "";
			for(let sound of sounds){
				listContainer.insertAdjacentHTML("beforeend", SoundList.getItemTemplate(sound, sourcePath));
			}
	
			return this;
		}
	
		destroy(){
			if(this._activeAudio) this._activeAudio.pause();
			this._ec.destroy();
			this.listContainer.innerHTML = "";
		}
	}
	
	
	Object.assign(SoundList, {
		soundFormats: ["ogg", "wav"]
	});
	
	
	module.exports = SoundList;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*global define:false */
	/**
	 * Copyright 2016 Craig Campbell
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * Mousetrap is a simple keyboard shortcut library for Javascript with
	 * no external dependencies
	 *
	 * @version 1.6.0
	 * @url craig.is/killing/mice
	 */
	(function(window, document, undefined) {
	
	    // Check if mousetrap is used inside browser, if not, return
	    if (!window) {
	        return;
	    }
	
	    /**
	     * mapping of special keycodes to their corresponding keys
	     *
	     * everything in this dictionary cannot use keypress events
	     * so it has to be here to map to the correct keycodes for
	     * keyup/keydown events
	     *
	     * @type {Object}
	     */
	    var _MAP = {
	        8: 'backspace',
	        9: 'tab',
	        13: 'enter',
	        16: 'shift',
	        17: 'ctrl',
	        18: 'alt',
	        20: 'capslock',
	        27: 'esc',
	        32: 'space',
	        33: 'pageup',
	        34: 'pagedown',
	        35: 'end',
	        36: 'home',
	        37: 'left',
	        38: 'up',
	        39: 'right',
	        40: 'down',
	        45: 'ins',
	        46: 'del',
	        91: 'meta',
	        93: 'meta',
	        224: 'meta'
	    };
	
	    /**
	     * mapping for special characters so they can support
	     *
	     * this dictionary is only used incase you want to bind a
	     * keyup or keydown event to one of these keys
	     *
	     * @type {Object}
	     */
	    var _KEYCODE_MAP = {
	        106: '*',
	        107: '+',
	        109: '-',
	        110: '.',
	        111 : '/',
	        186: ';',
	        187: '=',
	        188: ',',
	        189: '-',
	        190: '.',
	        191: '/',
	        192: '`',
	        219: '[',
	        220: '\\',
	        221: ']',
	        222: '\''
	    };
	
	    /**
	     * this is a mapping of keys that require shift on a US keypad
	     * back to the non shift equivelents
	     *
	     * this is so you can use keyup events with these keys
	     *
	     * note that this will only work reliably on US keyboards
	     *
	     * @type {Object}
	     */
	    var _SHIFT_MAP = {
	        '~': '`',
	        '!': '1',
	        '@': '2',
	        '#': '3',
	        '$': '4',
	        '%': '5',
	        '^': '6',
	        '&': '7',
	        '*': '8',
	        '(': '9',
	        ')': '0',
	        '_': '-',
	        '+': '=',
	        ':': ';',
	        '\"': '\'',
	        '<': ',',
	        '>': '.',
	        '?': '/',
	        '|': '\\'
	    };
	
	    /**
	     * this is a list of special strings you can use to map
	     * to modifier keys when you specify your keyboard shortcuts
	     *
	     * @type {Object}
	     */
	    var _SPECIAL_ALIASES = {
	        'option': 'alt',
	        'command': 'meta',
	        'return': 'enter',
	        'escape': 'esc',
	        'plus': '+',
	        'mod': /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
	    };
	
	    /**
	     * variable to store the flipped version of _MAP from above
	     * needed to check if we should use keypress or not when no action
	     * is specified
	     *
	     * @type {Object|undefined}
	     */
	    var _REVERSE_MAP;
	
	    /**
	     * loop through the f keys, f1 to f19 and add them to the map
	     * programatically
	     */
	    for (var i = 1; i < 20; ++i) {
	        _MAP[111 + i] = 'f' + i;
	    }
	
	    /**
	     * loop through to map numbers on the numeric keypad
	     */
	    for (i = 0; i <= 9; ++i) {
	        _MAP[i + 96] = i;
	    }
	
	    /**
	     * cross browser add event method
	     *
	     * @param {Element|HTMLDocument} object
	     * @param {string} type
	     * @param {Function} callback
	     * @returns void
	     */
	    function _addEvent(object, type, callback) {
	        if (object.addEventListener) {
	            object.addEventListener(type, callback, false);
	            return;
	        }
	
	        object.attachEvent('on' + type, callback);
	    }
	
	    /**
	     * takes the event and returns the key character
	     *
	     * @param {Event} e
	     * @return {string}
	     */
	    function _characterFromEvent(e) {
	
	        // for keypress events we should return the character as is
	        if (e.type == 'keypress') {
	            var character = String.fromCharCode(e.which);
	
	            // if the shift key is not pressed then it is safe to assume
	            // that we want the character to be lowercase.  this means if
	            // you accidentally have caps lock on then your key bindings
	            // will continue to work
	            //
	            // the only side effect that might not be desired is if you
	            // bind something like 'A' cause you want to trigger an
	            // event when capital A is pressed caps lock will no longer
	            // trigger the event.  shift+a will though.
	            if (!e.shiftKey) {
	                character = character.toLowerCase();
	            }
	
	            return character;
	        }
	
	        // for non keypress events the special maps are needed
	        if (_MAP[e.which]) {
	            return _MAP[e.which];
	        }
	
	        if (_KEYCODE_MAP[e.which]) {
	            return _KEYCODE_MAP[e.which];
	        }
	
	        // if it is not in the special map
	
	        // with keydown and keyup events the character seems to always
	        // come in as an uppercase character whether you are pressing shift
	        // or not.  we should make sure it is always lowercase for comparisons
	        return String.fromCharCode(e.which).toLowerCase();
	    }
	
	    /**
	     * checks if two arrays are equal
	     *
	     * @param {Array} modifiers1
	     * @param {Array} modifiers2
	     * @returns {boolean}
	     */
	    function _modifiersMatch(modifiers1, modifiers2) {
	        return modifiers1.sort().join(',') === modifiers2.sort().join(',');
	    }
	
	    /**
	     * takes a key event and figures out what the modifiers are
	     *
	     * @param {Event} e
	     * @returns {Array}
	     */
	    function _eventModifiers(e) {
	        var modifiers = [];
	
	        if (e.shiftKey) {
	            modifiers.push('shift');
	        }
	
	        if (e.altKey) {
	            modifiers.push('alt');
	        }
	
	        if (e.ctrlKey) {
	            modifiers.push('ctrl');
	        }
	
	        if (e.metaKey) {
	            modifiers.push('meta');
	        }
	
	        return modifiers;
	    }
	
	    /**
	     * prevents default for this event
	     *
	     * @param {Event} e
	     * @returns void
	     */
	    function _preventDefault(e) {
	        if (e.preventDefault) {
	            e.preventDefault();
	            return;
	        }
	
	        e.returnValue = false;
	    }
	
	    /**
	     * stops propogation for this event
	     *
	     * @param {Event} e
	     * @returns void
	     */
	    function _stopPropagation(e) {
	        if (e.stopPropagation) {
	            e.stopPropagation();
	            return;
	        }
	
	        e.cancelBubble = true;
	    }
	
	    /**
	     * determines if the keycode specified is a modifier key or not
	     *
	     * @param {string} key
	     * @returns {boolean}
	     */
	    function _isModifier(key) {
	        return key == 'shift' || key == 'ctrl' || key == 'alt' || key == 'meta';
	    }
	
	    /**
	     * reverses the map lookup so that we can look for specific keys
	     * to see what can and can't use keypress
	     *
	     * @return {Object}
	     */
	    function _getReverseMap() {
	        if (!_REVERSE_MAP) {
	            _REVERSE_MAP = {};
	            for (var key in _MAP) {
	
	                // pull out the numeric keypad from here cause keypress should
	                // be able to detect the keys from the character
	                if (key > 95 && key < 112) {
	                    continue;
	                }
	
	                if (_MAP.hasOwnProperty(key)) {
	                    _REVERSE_MAP[_MAP[key]] = key;
	                }
	            }
	        }
	        return _REVERSE_MAP;
	    }
	
	    /**
	     * picks the best action based on the key combination
	     *
	     * @param {string} key - character for key
	     * @param {Array} modifiers
	     * @param {string=} action passed in
	     */
	    function _pickBestAction(key, modifiers, action) {
	
	        // if no action was picked in we should try to pick the one
	        // that we think would work best for this key
	        if (!action) {
	            action = _getReverseMap()[key] ? 'keydown' : 'keypress';
	        }
	
	        // modifier keys don't work as expected with keypress,
	        // switch to keydown
	        if (action == 'keypress' && modifiers.length) {
	            action = 'keydown';
	        }
	
	        return action;
	    }
	
	    /**
	     * Converts from a string key combination to an array
	     *
	     * @param  {string} combination like "command+shift+l"
	     * @return {Array}
	     */
	    function _keysFromString(combination) {
	        if (combination === '+') {
	            return ['+'];
	        }
	
	        combination = combination.replace(/\+{2}/g, '+plus');
	        return combination.split('+');
	    }
	
	    /**
	     * Gets info for a specific key combination
	     *
	     * @param  {string} combination key combination ("command+s" or "a" or "*")
	     * @param  {string=} action
	     * @returns {Object}
	     */
	    function _getKeyInfo(combination, action) {
	        var keys;
	        var key;
	        var i;
	        var modifiers = [];
	
	        // take the keys from this pattern and figure out what the actual
	        // pattern is all about
	        keys = _keysFromString(combination);
	
	        for (i = 0; i < keys.length; ++i) {
	            key = keys[i];
	
	            // normalize key names
	            if (_SPECIAL_ALIASES[key]) {
	                key = _SPECIAL_ALIASES[key];
	            }
	
	            // if this is not a keypress event then we should
	            // be smart about using shift keys
	            // this will only work for US keyboards however
	            if (action && action != 'keypress' && _SHIFT_MAP[key]) {
	                key = _SHIFT_MAP[key];
	                modifiers.push('shift');
	            }
	
	            // if this key is a modifier then add it to the list of modifiers
	            if (_isModifier(key)) {
	                modifiers.push(key);
	            }
	        }
	
	        // depending on what the key combination is
	        // we will try to pick the best event for it
	        action = _pickBestAction(key, modifiers, action);
	
	        return {
	            key: key,
	            modifiers: modifiers,
	            action: action
	        };
	    }
	
	    function _belongsTo(element, ancestor) {
	        if (element === null || element === document) {
	            return false;
	        }
	
	        if (element === ancestor) {
	            return true;
	        }
	
	        return _belongsTo(element.parentNode, ancestor);
	    }
	
	    function Mousetrap(targetElement) {
	        var self = this;
	
	        targetElement = targetElement || document;
	
	        if (!(self instanceof Mousetrap)) {
	            return new Mousetrap(targetElement);
	        }
	
	        /**
	         * element to attach key events to
	         *
	         * @type {Element}
	         */
	        self.target = targetElement;
	
	        /**
	         * a list of all the callbacks setup via Mousetrap.bind()
	         *
	         * @type {Object}
	         */
	        self._callbacks = {};
	
	        /**
	         * direct map of string combinations to callbacks used for trigger()
	         *
	         * @type {Object}
	         */
	        self._directMap = {};
	
	        /**
	         * keeps track of what level each sequence is at since multiple
	         * sequences can start out with the same sequence
	         *
	         * @type {Object}
	         */
	        var _sequenceLevels = {};
	
	        /**
	         * variable to store the setTimeout call
	         *
	         * @type {null|number}
	         */
	        var _resetTimer;
	
	        /**
	         * temporary state where we will ignore the next keyup
	         *
	         * @type {boolean|string}
	         */
	        var _ignoreNextKeyup = false;
	
	        /**
	         * temporary state where we will ignore the next keypress
	         *
	         * @type {boolean}
	         */
	        var _ignoreNextKeypress = false;
	
	        /**
	         * are we currently inside of a sequence?
	         * type of action ("keyup" or "keydown" or "keypress") or false
	         *
	         * @type {boolean|string}
	         */
	        var _nextExpectedAction = false;
	
	        /**
	         * resets all sequence counters except for the ones passed in
	         *
	         * @param {Object} doNotReset
	         * @returns void
	         */
	        function _resetSequences(doNotReset) {
	            doNotReset = doNotReset || {};
	
	            var activeSequences = false,
	                key;
	
	            for (key in _sequenceLevels) {
	                if (doNotReset[key]) {
	                    activeSequences = true;
	                    continue;
	                }
	                _sequenceLevels[key] = 0;
	            }
	
	            if (!activeSequences) {
	                _nextExpectedAction = false;
	            }
	        }
	
	        /**
	         * finds all callbacks that match based on the keycode, modifiers,
	         * and action
	         *
	         * @param {string} character
	         * @param {Array} modifiers
	         * @param {Event|Object} e
	         * @param {string=} sequenceName - name of the sequence we are looking for
	         * @param {string=} combination
	         * @param {number=} level
	         * @returns {Array}
	         */
	        function _getMatches(character, modifiers, e, sequenceName, combination, level) {
	            var i;
	            var callback;
	            var matches = [];
	            var action = e.type;
	
	            // if there are no events related to this keycode
	            if (!self._callbacks[character]) {
	                return [];
	            }
	
	            // if a modifier key is coming up on its own we should allow it
	            if (action == 'keyup' && _isModifier(character)) {
	                modifiers = [character];
	            }
	
	            // loop through all callbacks for the key that was pressed
	            // and see if any of them match
	            for (i = 0; i < self._callbacks[character].length; ++i) {
	                callback = self._callbacks[character][i];
	
	                // if a sequence name is not specified, but this is a sequence at
	                // the wrong level then move onto the next match
	                if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {
	                    continue;
	                }
	
	                // if the action we are looking for doesn't match the action we got
	                // then we should keep going
	                if (action != callback.action) {
	                    continue;
	                }
	
	                // if this is a keypress event and the meta key and control key
	                // are not pressed that means that we need to only look at the
	                // character, otherwise check the modifiers as well
	                //
	                // chrome will not fire a keypress if meta or control is down
	                // safari will fire a keypress if meta or meta+shift is down
	                // firefox will fire a keypress if meta or control is down
	                if ((action == 'keypress' && !e.metaKey && !e.ctrlKey) || _modifiersMatch(modifiers, callback.modifiers)) {
	
	                    // when you bind a combination or sequence a second time it
	                    // should overwrite the first one.  if a sequenceName or
	                    // combination is specified in this call it does just that
	                    //
	                    // @todo make deleting its own method?
	                    var deleteCombo = !sequenceName && callback.combo == combination;
	                    var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level;
	                    if (deleteCombo || deleteSequence) {
	                        self._callbacks[character].splice(i, 1);
	                    }
	
	                    matches.push(callback);
	                }
	            }
	
	            return matches;
	        }
	
	        /**
	         * actually calls the callback function
	         *
	         * if your callback function returns false this will use the jquery
	         * convention - prevent default and stop propogation on the event
	         *
	         * @param {Function} callback
	         * @param {Event} e
	         * @returns void
	         */
	        function _fireCallback(callback, e, combo, sequence) {
	
	            // if this event should not happen stop here
	            if (self.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
	                return;
	            }
	
	            if (callback(e, combo) === false) {
	                _preventDefault(e);
	                _stopPropagation(e);
	            }
	        }
	
	        /**
	         * handles a character key event
	         *
	         * @param {string} character
	         * @param {Array} modifiers
	         * @param {Event} e
	         * @returns void
	         */
	        self._handleKey = function(character, modifiers, e) {
	            var callbacks = _getMatches(character, modifiers, e);
	            var i;
	            var doNotReset = {};
	            var maxLevel = 0;
	            var processedSequenceCallback = false;
	
	            // Calculate the maxLevel for sequences so we can only execute the longest callback sequence
	            for (i = 0; i < callbacks.length; ++i) {
	                if (callbacks[i].seq) {
	                    maxLevel = Math.max(maxLevel, callbacks[i].level);
	                }
	            }
	
	            // loop through matching callbacks for this key event
	            for (i = 0; i < callbacks.length; ++i) {
	
	                // fire for all sequence callbacks
	                // this is because if for example you have multiple sequences
	                // bound such as "g i" and "g t" they both need to fire the
	                // callback for matching g cause otherwise you can only ever
	                // match the first one
	                if (callbacks[i].seq) {
	
	                    // only fire callbacks for the maxLevel to prevent
	                    // subsequences from also firing
	                    //
	                    // for example 'a option b' should not cause 'option b' to fire
	                    // even though 'option b' is part of the other sequence
	                    //
	                    // any sequences that do not match here will be discarded
	                    // below by the _resetSequences call
	                    if (callbacks[i].level != maxLevel) {
	                        continue;
	                    }
	
	                    processedSequenceCallback = true;
	
	                    // keep a list of which sequences were matches for later
	                    doNotReset[callbacks[i].seq] = 1;
	                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo, callbacks[i].seq);
	                    continue;
	                }
	
	                // if there were no sequence matches but we are still here
	                // that means this is a regular match so we should fire that
	                if (!processedSequenceCallback) {
	                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo);
	                }
	            }
	
	            // if the key you pressed matches the type of sequence without
	            // being a modifier (ie "keyup" or "keypress") then we should
	            // reset all sequences that were not matched by this event
	            //
	            // this is so, for example, if you have the sequence "h a t" and you
	            // type "h e a r t" it does not match.  in this case the "e" will
	            // cause the sequence to reset
	            //
	            // modifier keys are ignored because you can have a sequence
	            // that contains modifiers such as "enter ctrl+space" and in most
	            // cases the modifier key will be pressed before the next key
	            //
	            // also if you have a sequence such as "ctrl+b a" then pressing the
	            // "b" key will trigger a "keypress" and a "keydown"
	            //
	            // the "keydown" is expected when there is a modifier, but the
	            // "keypress" ends up matching the _nextExpectedAction since it occurs
	            // after and that causes the sequence to reset
	            //
	            // we ignore keypresses in a sequence that directly follow a keydown
	            // for the same character
	            var ignoreThisKeypress = e.type == 'keypress' && _ignoreNextKeypress;
	            if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {
	                _resetSequences(doNotReset);
	            }
	
	            _ignoreNextKeypress = processedSequenceCallback && e.type == 'keydown';
	        };
	
	        /**
	         * handles a keydown event
	         *
	         * @param {Event} e
	         * @returns void
	         */
	        function _handleKeyEvent(e) {
	
	            // normalize e.which for key events
	            // @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion
	            if (typeof e.which !== 'number') {
	                e.which = e.keyCode;
	            }
	
	            var character = _characterFromEvent(e);
	
	            // no character found then stop
	            if (!character) {
	                return;
	            }
	
	            // need to use === for the character check because the character can be 0
	            if (e.type == 'keyup' && _ignoreNextKeyup === character) {
	                _ignoreNextKeyup = false;
	                return;
	            }
	
	            self.handleKey(character, _eventModifiers(e), e);
	        }
	
	        /**
	         * called to set a 1 second timeout on the specified sequence
	         *
	         * this is so after each key press in the sequence you have 1 second
	         * to press the next key before you have to start over
	         *
	         * @returns void
	         */
	        function _resetSequenceTimer() {
	            clearTimeout(_resetTimer);
	            _resetTimer = setTimeout(_resetSequences, 1000);
	        }
	
	        /**
	         * binds a key sequence to an event
	         *
	         * @param {string} combo - combo specified in bind call
	         * @param {Array} keys
	         * @param {Function} callback
	         * @param {string=} action
	         * @returns void
	         */
	        function _bindSequence(combo, keys, callback, action) {
	
	            // start off by adding a sequence level record for this combination
	            // and setting the level to 0
	            _sequenceLevels[combo] = 0;
	
	            /**
	             * callback to increase the sequence level for this sequence and reset
	             * all other sequences that were active
	             *
	             * @param {string} nextAction
	             * @returns {Function}
	             */
	            function _increaseSequence(nextAction) {
	                return function() {
	                    _nextExpectedAction = nextAction;
	                    ++_sequenceLevels[combo];
	                    _resetSequenceTimer();
	                };
	            }
	
	            /**
	             * wraps the specified callback inside of another function in order
	             * to reset all sequence counters as soon as this sequence is done
	             *
	             * @param {Event} e
	             * @returns void
	             */
	            function _callbackAndReset(e) {
	                _fireCallback(callback, e, combo);
	
	                // we should ignore the next key up if the action is key down
	                // or keypress.  this is so if you finish a sequence and
	                // release the key the final key will not trigger a keyup
	                if (action !== 'keyup') {
	                    _ignoreNextKeyup = _characterFromEvent(e);
	                }
	
	                // weird race condition if a sequence ends with the key
	                // another sequence begins with
	                setTimeout(_resetSequences, 10);
	            }
	
	            // loop through keys one at a time and bind the appropriate callback
	            // function.  for any key leading up to the final one it should
	            // increase the sequence. after the final, it should reset all sequences
	            //
	            // if an action is specified in the original bind call then that will
	            // be used throughout.  otherwise we will pass the action that the
	            // next key in the sequence should match.  this allows a sequence
	            // to mix and match keypress and keydown events depending on which
	            // ones are better suited to the key provided
	            for (var i = 0; i < keys.length; ++i) {
	                var isFinal = i + 1 === keys.length;
	                var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys[i + 1]).action);
	                _bindSingle(keys[i], wrappedCallback, action, combo, i);
	            }
	        }
	
	        /**
	         * binds a single keyboard combination
	         *
	         * @param {string} combination
	         * @param {Function} callback
	         * @param {string=} action
	         * @param {string=} sequenceName - name of sequence if part of sequence
	         * @param {number=} level - what part of the sequence the command is
	         * @returns void
	         */
	        function _bindSingle(combination, callback, action, sequenceName, level) {
	
	            // store a direct mapped reference for use with Mousetrap.trigger
	            self._directMap[combination + ':' + action] = callback;
	
	            // make sure multiple spaces in a row become a single space
	            combination = combination.replace(/\s+/g, ' ');
	
	            var sequence = combination.split(' ');
	            var info;
	
	            // if this pattern is a sequence of keys then run through this method
	            // to reprocess each pattern one key at a time
	            if (sequence.length > 1) {
	                _bindSequence(combination, sequence, callback, action);
	                return;
	            }
	
	            info = _getKeyInfo(combination, action);
	
	            // make sure to initialize array if this is the first time
	            // a callback is added for this key
	            self._callbacks[info.key] = self._callbacks[info.key] || [];
	
	            // remove an existing match if there is one
	            _getMatches(info.key, info.modifiers, {type: info.action}, sequenceName, combination, level);
	
	            // add this call back to the array
	            // if it is a sequence put it at the beginning
	            // if not put it at the end
	            //
	            // this is important because the way these are processed expects
	            // the sequence ones to come first
	            self._callbacks[info.key][sequenceName ? 'unshift' : 'push']({
	                callback: callback,
	                modifiers: info.modifiers,
	                action: info.action,
	                seq: sequenceName,
	                level: level,
	                combo: combination
	            });
	        }
	
	        /**
	         * binds multiple combinations to the same callback
	         *
	         * @param {Array} combinations
	         * @param {Function} callback
	         * @param {string|undefined} action
	         * @returns void
	         */
	        self._bindMultiple = function(combinations, callback, action) {
	            for (var i = 0; i < combinations.length; ++i) {
	                _bindSingle(combinations[i], callback, action);
	            }
	        };
	
	        // start!
	        _addEvent(targetElement, 'keypress', _handleKeyEvent);
	        _addEvent(targetElement, 'keydown', _handleKeyEvent);
	        _addEvent(targetElement, 'keyup', _handleKeyEvent);
	    }
	
	    /**
	     * binds an event to mousetrap
	     *
	     * can be a single key, a combination of keys separated with +,
	     * an array of keys, or a sequence of keys separated by spaces
	     *
	     * be sure to list the modifier keys first to make sure that the
	     * correct key ends up getting bound (the last key in the pattern)
	     *
	     * @param {string|Array} keys
	     * @param {Function} callback
	     * @param {string=} action - 'keypress', 'keydown', or 'keyup'
	     * @returns void
	     */
	    Mousetrap.prototype.bind = function(keys, callback, action) {
	        var self = this;
	        keys = keys instanceof Array ? keys : [keys];
	        self._bindMultiple.call(self, keys, callback, action);
	        return self;
	    };
	
	    /**
	     * unbinds an event to mousetrap
	     *
	     * the unbinding sets the callback function of the specified key combo
	     * to an empty function and deletes the corresponding key in the
	     * _directMap dict.
	     *
	     * TODO: actually remove this from the _callbacks dictionary instead
	     * of binding an empty function
	     *
	     * the keycombo+action has to be exactly the same as
	     * it was defined in the bind method
	     *
	     * @param {string|Array} keys
	     * @param {string} action
	     * @returns void
	     */
	    Mousetrap.prototype.unbind = function(keys, action) {
	        var self = this;
	        return self.bind.call(self, keys, function() {}, action);
	    };
	
	    /**
	     * triggers an event that has already been bound
	     *
	     * @param {string} keys
	     * @param {string=} action
	     * @returns void
	     */
	    Mousetrap.prototype.trigger = function(keys, action) {
	        var self = this;
	        if (self._directMap[keys + ':' + action]) {
	            self._directMap[keys + ':' + action]({}, keys);
	        }
	        return self;
	    };
	
	    /**
	     * resets the library back to its initial state.  this is useful
	     * if you want to clear out the current keyboard shortcuts and bind
	     * new ones - for example if you switch to another page
	     *
	     * @returns void
	     */
	    Mousetrap.prototype.reset = function() {
	        var self = this;
	        self._callbacks = {};
	        self._directMap = {};
	        return self;
	    };
	
	    /**
	     * should we stop this event before firing off callbacks
	     *
	     * @param {Event} e
	     * @param {Element} element
	     * @return {boolean}
	     */
	    Mousetrap.prototype.stopCallback = function(e, element) {
	        var self = this;
	
	        // if the element has the class "mousetrap" then no need to stop
	        if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
	            return false;
	        }
	
	        if (_belongsTo(element, self.target)) {
	            return false;
	        }
	
	        // stop for input, select, and textarea
	        return element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || element.isContentEditable;
	    };
	
	    /**
	     * exposes _handleKey publicly so it can be overwritten by extensions
	     */
	    Mousetrap.prototype.handleKey = function() {
	        var self = this;
	        return self._handleKey.apply(self, arguments);
	    };
	
	    /**
	     * allow custom key mappings
	     */
	    Mousetrap.addKeycodes = function(object) {
	        for (var key in object) {
	            if (object.hasOwnProperty(key)) {
	                _MAP[key] = object[key];
	            }
	        }
	        _REVERSE_MAP = null;
	    };
	
	    /**
	     * Init the global mousetrap functions
	     *
	     * This method is needed to allow the global mousetrap functions to work
	     * now that mousetrap is a constructor function.
	     */
	    Mousetrap.init = function() {
	        var documentMousetrap = Mousetrap(document);
	        for (var method in documentMousetrap) {
	            if (method.charAt(0) !== '_') {
	                Mousetrap[method] = (function(method) {
	                    return function() {
	                        return documentMousetrap[method].apply(documentMousetrap, arguments);
	                    };
	                } (method));
	            }
	        }
	    };
	
	    Mousetrap.init();
	
	    // expose mousetrap to the global object
	    window.Mousetrap = Mousetrap;
	
	    // expose as a common js module
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = Mousetrap;
	    }
	
	    // expose mousetrap as an AMD module
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	            return Mousetrap;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	}) (typeof window !== 'undefined' ? window : null, typeof  window !== 'undefined' ? document : null);


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	const Mousetrap = __webpack_require__(17),
		deepcopy = __webpack_require__(22),
		EventsController = __webpack_require__(1);
	
	
	class History {
		static get defaults() {
			return {
				undoEl: null,
				redoEl: null
			}
		}
	
		constructor(params, projectManager) {
			this._params = Object.assign({}, History.defaults, params);
			this.projectManager = projectManager;
			this.undo = this.undo.bind(this);
			this.redo = this.redo.bind(this);
			this._onPopState = this._onPopState.bind(this);
	
			this._attachEvents();
		}
	
		get undoEl() {
			return this._params.undoEl;
		}
	
		get redoEl() {
			return this._params.redoEl;
		}
	
		undo() {
			window.history.back();
			return this;
		}
	
		redo() {
			window.history.forward();
			return this;
		}
	
		clear() {
			window.location.reload(true);
			return this;
		}
	
		_pushState(action) {
			return () => {
				if(this._freeze) return;
				window.history.pushState({
					action,
					data: deepcopy(this.projectManager[action])
				}, null);
			}
		}
	
		_attachEvents() {
			const ec = this._ec = new EventsController();
	
			ec.add(this.undoEl, "click", this.undo);
			ec.add(this.redoEl, "click", this.redo);
			ec.add(window, "popstate", this._onPopState);
			ec.add(window, "update-active-level", this._pushState("activeLevel"));
			ec.add(window, "update-active-level-data", this._pushState("activeLevelData"));
			ec.add(window, "update-game-data", this._pushState("gameData"));
	
			Mousetrap.bind(["ctrl+z"], this.undo);
			Mousetrap.bind(["ctrl+y"], this.redo);
			return this;
		}
	
		_onPopState(e) {
			const state = e.state,
				action = state && state.action;
	
			this._freeze = true;
			switch(action) {
				case "activeLevel":
					this.projectManager.activeLevel = state.data;
					break;
	
				case "activeLevelData":
					this.projectManager._updateActiveLevelData(state.data);
					break;
	
				case "gameData":
					this.projectManager._updateGameData(state.data);
					break;
			}
	
			this._freeze = false;
		}
	
		destroy() {
			this._ec.destroy();
			Mousetrap.unbind(["ctrl+z", "ctrl+y"]);
			this.clear();
			return null;
		}
	}
	
	
	
	module.exports = History;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(21)
	var ieee754 = __webpack_require__(25)
	var isArray = __webpack_require__(26)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()
	
	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()
	
	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }
	
	  return that
	}
	
	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */
	
	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }
	
	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}
	
	Buffer.poolSize = 8192 // not used by this implementation
	
	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}
	
	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }
	
	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }
	
	  return fromObject(that, value)
	}
	
	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}
	
	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}
	
	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}
	
	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}
	
	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }
	
	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }
	
	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)
	
	  var actual = that.write(string, encoding)
	
	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }
	
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer
	
	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }
	
	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }
	
	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }
	
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}
	
	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)
	
	    if (that.length === 0) {
	      return that
	    }
	
	    obj.copy(that, 0, 0, len)
	    return that
	  }
	
	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }
	
	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }
	
	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }
	
	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }
	
	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}
	
	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.
	
	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }
	
	  if (end === undefined || end > this.length) {
	    end = this.length
	  }
	
	  if (end <= 0) {
	    return ''
	  }
	
	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0
	
	  if (end <= start) {
	    return ''
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true
	
	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}
	
	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}
	
	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}
	
	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }
	
	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }
	
	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }
	
	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }
	
	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0
	
	  if (this === target) return 0
	
	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)
	
	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)
	
	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1
	
	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }
	
	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }
	
	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }
	
	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length
	
	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }
	
	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }
	
	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }
	
	  return -1
	}
	
	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}
	
	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []
	
	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1
	
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint
	
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }
	
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }
	
	    res.push(codePoint)
	    i += bytesPerSequence
	  }
	
	  return decodeCodePointsArray(res)
	}
	
	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000
	
	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }
	
	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	  var i
	
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }
	
	  return len
	}
	
	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }
	
	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }
	
	  if (end <= start) {
	    return this
	  }
	
	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0
	
	  if (!val) val = 0
	
	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	
	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }
	
	        // valid lead
	        leadSurrogate = codePoint
	
	        continue
	      }
	
	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }
	
	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }
	
	    leadSurrogate = null
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19).Buffer, (function() { return this; }())))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';
	
	exports.__esModule = true;
	var toString = Object.prototype.toString;
	
	var isBuffer = typeof Buffer !== 'undefined' ? function isBuffer(obj) {
	  return Buffer.isBuffer(obj);
	} : function isBuffer() {
	  // always return false in browsers
	  return false;
	};
	
	var getKeys = typeof Object.keys === 'function' ? function getKeys(obj) {
	  return Object.keys(obj);
	} : function getKeys(obj) {
	  var objType = typeof obj;
	
	  if (obj === null || objType !== 'function' && objType !== 'object') {
	    throw new TypeError('obj must be an Object');
	  }
	
	  var resultKeys = [],
	      key = void 0;
	
	  for (key in obj) {
	    Object.prototype.hasOwnProperty.call(obj, key) && resultKeys.push(key);
	  }
	
	  return resultKeys;
	};
	
	var getSymbols = typeof Symbol === 'function' ? function getSymbols(obj) {
	  return Object.getOwnPropertySymbols(obj);
	} : function getSymbols() {
	  // always return empty Array when Symbol is not supported
	  return [];
	};
	
	// NOTE:
	//
	//   Array.prototype.indexOf is cannot find NaN (in Chrome)
	//   Array.prototype.includes is can find NaN (in Chrome)
	//
	//   this function can find NaN, because use SameValue algorithm
	function indexOf(array, s) {
	  if (toString.call(array) !== '[object Array]') {
	    throw new TypeError('array must be an Array');
	  }
	
	  var i = void 0,
	      len = void 0,
	      value = void 0;
	
	  for (i = 0, len = array.length; i < len; ++i) {
	    value = array[i];
	
	    // NOTE:
	    //
	    //   it is SameValue algorithm
	    //   http://stackoverflow.com/questions/27144277/comparing-a-variable-with-itself
	    //
	    // eslint-disable-next-line no-self-compare
	    if (value === s || value !== value && s !== s) {
	      return i;
	    }
	  }
	
	  return -1;
	}
	
	exports.getKeys = getKeys;
	exports.getSymbols = getSymbols;
	exports.indexOf = indexOf;
	exports.isBuffer = isBuffer;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19).Buffer))

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict'
	
	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray
	
	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
	
	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}
	
	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63
	
	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }
	
	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}
	
	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return b64.length * 3 / 4 - placeHoldersCount(b64)
	}
	
	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)
	
	  arr = new Arr(len * 3 / 4 - placeHolders)
	
	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len
	
	  var L = 0
	
	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  return arr
	}
	
	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}
	
	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}
	
	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3
	
	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }
	
	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }
	
	  parts.push(output)
	
	  return parts.join('')
	}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(24);


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {'use strict';
	
	exports.__esModule = true;
	exports.copyValue = exports.copyCollection = exports.copy = void 0;
	
	var _polyfill = __webpack_require__(20);
	
	var toString = Object.prototype.toString;
	
	function copy(target, customizer) {
	  var resultValue = copyValue(target);
	
	  if (resultValue !== null) {
	    return resultValue;
	  }
	
	  return copyCollection(target, customizer);
	}
	
	function copyCollection(target, customizer) {
	  if (typeof customizer !== 'function') {
	    throw new TypeError('customizer is must be a Function');
	  }
	
	  if (typeof target === 'function') {
	    var source = String(target);
	
	    // NOTE:
	    //
	    //   https://gist.github.com/jdalton/5e34d890105aca44399f
	    //
	    //   - https://gist.github.com/jdalton/5e34d890105aca44399f#gistcomment-1283831
	    //   - http://es5.github.io/#x15
	    //
	    //   native functions does not have prototype:
	    //
	    //       Object.toString.prototype  // => undefined
	    //       (function() {}).prototype  // => {}
	    //
	    //   but cannot detect native constructor:
	    //
	    //       typeof Object     // => 'function'
	    //       Object.prototype  // => {}
	    //
	    //   and cannot detect null binded function:
	    //
	    //       String(Math.abs)
	    //         // => 'function abs() { [native code] }'
	    //
	    //     Firefox, Safari:
	    //       String((function abs() {}).bind(null))
	    //         // => 'function abs() { [native code] }'
	    //
	    //     Chrome:
	    //       String((function abs() {}).bind(null))
	    //         // => 'function () { [native code] }'
	    if (/^\s*function\s*\S*\([^\)]*\)\s*{\s*\[native code\]\s*}/.test(source)) {
	      // native function
	      return target;
	    } else {
	      // user defined function
	      return new Function('return ' + String(source))();
	    }
	  }
	
	  var targetClass = toString.call(target);
	
	  if (targetClass === '[object Array]') {
	    return [];
	  }
	
	  if (targetClass === '[object Object]' && target.constructor === Object) {
	    return {};
	  }
	
	  if (targetClass === '[object Date]') {
	    // NOTE:
	    //
	    //   Firefox need to convert
	    //
	    //   Firefox:
	    //     var date = new Date;
	    //     +date;            // 1420909365967
	    //     +new Date(date);  // 1420909365000
	    //     +new Date(+date); // 1420909365967
	    //
	    //   Chrome:
	    //     var date = new Date;
	    //     +date;            // 1420909757913
	    //     +new Date(date);  // 1420909757913
	    //     +new Date(+date); // 1420909757913
	    return new Date(target.getTime());
	  }
	
	  if (targetClass === '[object RegExp]') {
	    // NOTE:
	    //
	    //   Chrome, Safari:
	    //     (new RegExp).source => "(?:)"
	    //
	    //   Firefox:
	    //     (new RegExp).source => ""
	    //
	    //   Chrome, Safari, Firefox:
	    //     String(new RegExp) => "/(?:)/"
	    var regexpText = String(target),
	        slashIndex = regexpText.lastIndexOf('/');
	
	    return new RegExp(regexpText.slice(1, slashIndex), regexpText.slice(slashIndex + 1));
	  }
	
	  if ((0, _polyfill.isBuffer)(target)) {
	    var buffer = new Buffer(target.length);
	
	    target.copy(buffer);
	
	    return buffer;
	  }
	
	  var customizerResult = customizer(target);
	
	  if (customizerResult !== void 0) {
	    return customizerResult;
	  }
	
	  return null;
	}
	
	function copyValue(target) {
	  var targetType = typeof target;
	
	  // copy String, Number, Boolean, undefined and Symbol
	  // without null and Function
	  if (target !== null && targetType !== 'object' && targetType !== 'function') {
	    return target;
	  }
	
	  return null;
	}
	
	exports.copy = copy;
	exports.copyCollection = copyCollection;
	exports.copyValue = copyValue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19).Buffer))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _copy = __webpack_require__(23);
	
	var _polyfill = __webpack_require__(20);
	
	function defaultCustomizer(target) {
	  return void 0;
	}
	
	function deepcopy(target) {
	  var customizer = arguments.length <= 1 || arguments[1] === void 0 ? defaultCustomizer : arguments[1];
	
	  if (target === null) {
	    // copy null
	    return null;
	  }
	
	  var resultValue = (0, _copy.copyValue)(target);
	
	  if (resultValue !== null) {
	    // copy some primitive types
	    return resultValue;
	  }
	
	  var resultCollection = (0, _copy.copyCollection)(target, customizer),
	      clone = resultCollection !== null ? resultCollection : target;
	
	  var visited = [target],
	      reference = [clone];
	
	  // recursively copy from collection
	  return recursiveCopy(target, customizer, clone, visited, reference);
	}
	
	function recursiveCopy(target, customizer, clone, visited, reference) {
	  if (target === null) {
	    // copy null
	    return null;
	  }
	
	  var resultValue = (0, _copy.copyValue)(target);
	
	  if (resultValue !== null) {
	    // copy some primitive types
	    return resultValue;
	  }
	
	  var keys = (0, _polyfill.getKeys)(target).concat((0, _polyfill.getSymbols)(target));
	
	  var i = void 0,
	      len = void 0;
	
	  var key = void 0,
	      value = void 0,
	      index = void 0,
	      resultCopy = void 0,
	      result = void 0,
	      ref = void 0;
	
	  for (i = 0, len = keys.length; i < len; ++i) {
	    key = keys[i];
	    value = target[key];
	    index = (0, _polyfill.indexOf)(visited, value);
	
	    resultCopy = void 0;
	    result = void 0;
	    ref = void 0;
	
	    if (index === -1) {
	      resultCopy = (0, _copy.copy)(value, customizer);
	      result = resultCopy !== null ? resultCopy : value;
	
	      if (value !== null && /^(?:function|object)$/.test(typeof value)) {
	        visited.push(value);
	        reference.push(result);
	      }
	    } else {
	      // circular reference
	      ref = reference[index];
	    }
	
	    clone[key] = ref || recursiveCopy(value, customizer, result, visited, reference);
	  }
	
	  return clone;
	}
	
	exports['default'] = deepcopy;
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 26 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map