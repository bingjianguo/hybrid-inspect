/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.DOMExplorerDashboard = undefined;var _classCallCheck2 = __webpack_require__(7);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = __webpack_require__(12);var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = __webpack_require__(11);var _inherits3 = _interopRequireDefault(_inherits2);var _DomExplorer = __webpack_require__(267);var _DomExplorer2 = _interopRequireDefault(_DomExplorer);
	var _DomExplorerNode = __webpack_require__(259);var _DomExplorerNode2 = _interopRequireDefault(_DomExplorerNode);
	var _DomExplorerPropertyEditor = __webpack_require__(261);var _DomExplorerPropertyEditor2 = _interopRequireDefault(_DomExplorerPropertyEditor);
	var _DashboardCommands = __webpack_require__(258);var _DashboardCommands2 = _interopRequireDefault(_DashboardCommands);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _VORLON =
	VORLON,DashboardPlugin = _VORLON.DashboardPlugin,Core = _VORLON.Core,Tools = _VORLON.Tools,FluentDOM = _VORLON.FluentDOM;var
	DOMExplorerDashboard = exports.DOMExplorerDashboard = function (_DashboardPlugin) {(0, _inherits3.default)(DOMExplorerDashboard, _DashboardPlugin);
	    function DOMExplorerDashboard() {(0, _classCallCheck3.default)(this, DOMExplorerDashboard);var _this = (0, _possibleConstructorReturn3.default)(this,
	        _DashboardPlugin.call(this, "domExplorer", "control.html", ['control.css', 'vorlon.domExplorer.dashboard.css']));
	        _this._lastReceivedObject = null;
	        _this.clikedNodeID = null;
	        _this._autorefresh = false;
	        _this._editablemode = false;
	        _this._clientHaveMutationObserver = false;
	        _this._id = "DOM";
	        _this._ready = false;return _this;
	    }DOMExplorerDashboard.prototype.
	    startDashboardSide = function startDashboardSide() {var _this2 = this;var div = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	        this._dashboardDiv = div;
	        this._insertHtmlContentAsync(this._dashboardDiv, function (filledDiv) {
	            _this2.root = ReactDOM.render(React.createElement(_DomExplorer2.default, { ref: function ref(ele) {
	                    _this2.refreshButton = ele.refreshButton;
	                    _this2.treeDiv = ele.treeDiv;
	                    _this2.styleView = ele.styleView;
	                    _this2.innerHTMLView = ele.innerHTMLView;
	                    _this2.computedsection = ele.computedsection;
	                } }), div);
	            $('#pluginsPaneTop').on('resize', function (e, maxHeight) {
	                _this2.root.externalSetProps({
	                    maxHeight: maxHeight });

	            });
	            $(window).trigger('PluginLoadFinish');
	            _this2._stylesEditor = new _DomExplorerPropertyEditor2.default(_this2);
	        });
	    };DOMExplorerDashboard.prototype.
	    searchDOM = function searchDOM() {var _this3 = this;
	        this._searchinput.addEventListener("keydown", function (evt) {
	            if (evt.keyCode === 13 || evt.keyCode === 9) {
	                evt.preventDefault();
	                _this3._searchresults.innerHTML = "";
	                _this3._searchresults.classList.remove('noresults');
	                _this3._searchresults.classList.remove('found');
	                _this3._selectorSearch = _this3._searchinput.value;
	                if (_this3._selectorSearch === _this3._searchinput.value) {
	                    _this3.sendCommandToClient("searchDOMBySelector", { selector: _this3._searchinput.value, position: _this3._positionSearch });
	                } else
	                {
	                    _this3._positionSearch = 0;
	                    _this3.sendCommandToClient("searchDOMBySelector", { selector: _this3._searchinput.value });
	                }
	            }
	        });
	    };DOMExplorerDashboard.prototype.
	    makeEditable = function makeEditable(element) {
	        if (element.contentEditable == "true") {
	            return;
	        }
	        var range = document.createRange();
	        var sel = window.getSelection();
	        range.setStart(element, 1);
	        range.collapse(true);
	        sel.removeAllRanges();
	        sel.addRange(range);
	        if (this._editableElement)
	        this.undoEditable(this._editableElement);
	        element.contentEditable = "true";
	        this._editablemode = true;
	        this._editableElement = element;
	        Tools.AddClass(element, "editable");
	        $(element).focus();
	        $(element).closest(".treeNodeSelected").addClass("editableselection");
	    };DOMExplorerDashboard.prototype.
	    undoEditable = function undoEditable(element) {
	        this._editablemode = false;
	        element.contentEditable = "false";
	        Tools.RemoveClass(element, "editable");
	        $(element).closest(".treeNodeSelected").addClass("editableselection");
	        this._editableElement = null;
	    };
	    /**
	        * 从client部分反馈的websocket信息
	        * @param receivedObject
	        */DOMExplorerDashboard.prototype.
	    onRealtimeMessageReceivedFromClientSide = function onRealtimeMessageReceivedFromClientSide(receivedObject) {
	        if (receivedObject.type === "contentchanged" &&
	        !this._editablemode && (
	        !this._clientHaveMutationObserver || this._autorefresh == false)) {
	            this.dirtyCheck();
	        } else
	        if (receivedObject.type === "contentchanged" &&
	        receivedObject.internalId !== null &&
	        this._clientHaveMutationObserver) {
	            if (this._autorefresh)
	            this.sendCommandToClient('refreshNode', {
	                order: receivedObject.internalId });else


	            this.dirtyCheck();
	        }
	    };DOMExplorerDashboard.prototype.
	    contentChanged = function contentChanged() {
	        this.refreshButton.setAttribute('changed', '');
	    };
	    /**
	        * 获取页面的DOM内容 innerHTML
	        * @param data
	        */DOMExplorerDashboard.prototype.
	    setInnerHTMLView = function setInnerHTMLView(data) {
	        this.root.externalSetProps({
	            innerHTML: data });

	    };
	    /**
	        *
	        * @param data 设置dashboard 中computedSection的内容
	        */DOMExplorerDashboard.prototype.
	    setComputedStyle = function setComputedStyle(data) {
	        this.root.externalSetProps({
	            computedStyle: data });

	    };
	    /**
	        * 接收client返回的dom node节点的样式信息，并渲染在页面上
	        * @param internalId
	        * @param styles
	        */DOMExplorerDashboard.prototype.
	    setNodeStyle = function setNodeStyle(internalId, styles) {
	        if (this._selectedNode && this._selectedNode.node.internalId == internalId) {
	            this._stylesEditor.generateStyles(this._selectedNode.node, this._selectedNode.node.internalId, styles);
	        }
	    };DOMExplorerDashboard.prototype.
	    setLayoutStyle = function setLayoutStyle(data) {
	        this.root.externalSetProps({
	            layoutStyle: data });

	    };DOMExplorerDashboard.prototype.
	    searchDOMByResults = function searchDOMByResults(data) {
	        this._lengthSearch = data.length;
	        this._selectorSearch = data.selector;
	        this._positionSearch = data.position;
	        if (this._selectorSearch) {
	            if (this._lengthSearch) {
	                this._searchresults.classList.remove('noresults');
	                this._searchresults.classList.add('found');
	                this._searchresults.setAttribute('content', this._positionSearch + "/" + this._lengthSearch);
	            } else
	            {
	                this._searchresults.classList.remove('found');
	                this._searchresults.classList.add('noresults');
	            }
	        } else
	        {
	            this._searchresults.classList.remove('noresults');
	            this._searchresults.classList.remove('noresults');
	        }
	    };DOMExplorerDashboard.prototype.
	    mutationObeserverAvailability = function mutationObeserverAvailability(data) {
	        this._clientHaveMutationObserver = data.availability;
	    };DOMExplorerDashboard.prototype.
	    initDashboard = function initDashboard(root) {
	        this.refreshButton.removeAttribute('changed');
	        this._lastReceivedObject = root;
	        while (this.treeDiv.hasChildNodes()) {
	            this.treeDiv.removeChild(this.treeDiv.lastChild);
	        }
	        if (this._rootNode)
	        this._rootNode.dispose();
	        this._rootNode = new _DomExplorerNode2.default(this, null, this.treeDiv, root);
	    };DOMExplorerDashboard.prototype.
	    updateDashboard = function updateDashboard(node) {
	        if (this._rootNode) {
	            this._rootNode.update(node);
	        }
	    };DOMExplorerDashboard.prototype.
	    setAutorefresh = function setAutorefresh(value) {
	        this._autorefresh = value;
	    };DOMExplorerDashboard.prototype.
	    getContainerDiv = function getContainerDiv() {
	        return this._containerDiv;
	    };DOMExplorerDashboard.prototype.
	    dirtyCheck = function dirtyCheck() {
	        this.refreshButton.setAttribute('changed', '');
	        if (this._autorefresh) {
	            this.sendCommandToClient('refresh');
	        }
	    };DOMExplorerDashboard.prototype.
	    hoverNode = function hoverNode(internalId) {var _this4 = this;var unselect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	        this._highlightedNode = internalId;
	        if (!internalId) {
	            this.sendCommandToClient('unhighlight', {
	                order: null });

	        } else
	        if (unselect) {
	            setTimeout(function () {
	                if (!_this4._highlightedNode) {
	                    _this4.sendCommandToClient('unhighlight', {
	                        order: internalId });

	                }
	            }, 5);
	        } else
	        {
	            this.sendCommandToClient('highlight', {
	                order: internalId });

	        }
	    };
	    /**
	        * 选中dom树中的某个节点，触发事件
	        * @param selected
	        */DOMExplorerDashboard.prototype.
	    select = function select(selected) {
	        // this._margincontainer.parentElement.parentElement.classList.add('hide');
	        if (this._selectedNode) {
	            this._selectedNode.selected(false);
	            this.sendCommandToClient('unselect', {
	                order: this._selectedNode.node.internalId });

	        } else
	        {
	            this.sendCommandToClient('unselect', {
	                order: null });

	        }
	        if (selected) {
	            this._selectedNode = selected;
	            this._selectedNode.selected(true);
	            this.sendCommandToClient('select', {
	                order: this._selectedNode.node.internalId });

	            this.root.externalSetProps({
	                internalId: this._selectedNode.node.internalId,
	                computedStyle: null,
	                layoutStyle: null,
	                innerHTML: null,
	                select: true });

	        } else
	        {
	            this._selectedNode = null;
	        }
	    };return DOMExplorerDashboard;}(DashboardPlugin);

	DOMExplorerDashboard.prototype.DashboardCommands = _DashboardCommands2.default;
	Core.RegisterDashboardPlugin(new DOMExplorerDashboard());

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = React;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.5.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var store = __webpack_require__(34)('wks');
	var uid = __webpack_require__(19);
	var Symbol = __webpack_require__(1).Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(13);
	var IE8_DOM_DEFINE = __webpack_require__(43);
	var toPrimitive = __webpack_require__(36);
	var dP = Object.defineProperty;

	exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(16)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(6);
	var createDesc = __webpack_require__(18);
	module.exports = __webpack_require__(8) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(50);
	var defined = __webpack_require__(28);
	module.exports = function (it) {
	  return IObject(defined(it));
	};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(57);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(56);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(27);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(27);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(15);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(1);
	var core = __webpack_require__(4);
	var ctx = __webpack_require__(40);
	var hide = __webpack_require__(9);
	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	module.exports = $export;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(117);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (true) {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(128)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = require('./factoryWithThrowingShims')();
	}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(47);
	var enumBugKeys = __webpack_require__(29);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(90);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	module.exports = {};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(90);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(59);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(58);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');


/***/ }),
/* 30 */
/***/ (function(module, exports) {

	module.exports = true;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(13);
	var dPs = __webpack_require__(72);
	var enumBugKeys = __webpack_require__(29);
	var IE_PROTO = __webpack_require__(33)('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(42)('iframe');
	  var i = enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(53).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(6).f;
	var has = __webpack_require__(3);
	var TAG = __webpack_require__(5)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(34)('keys');
	var uid = __webpack_require__(19);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(1);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(15);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(1);
	var core = __webpack_require__(4);
	var LIBRARY = __webpack_require__(30);
	var wksExt = __webpack_require__(38);
	var defineProperty = __webpack_require__(6).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(5);


/***/ }),
/* 39 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(64);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(15);
	var document = __webpack_require__(1).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(8) && !__webpack_require__(16)(function () {
	  return Object.defineProperty(__webpack_require__(42)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(30);
	var $export = __webpack_require__(14);
	var redefine = __webpack_require__(48);
	var hide = __webpack_require__(9);
	var has = __webpack_require__(3);
	var Iterators = __webpack_require__(24);
	var $iterCreate = __webpack_require__(69);
	var setToStringTag = __webpack_require__(32);
	var getPrototypeOf = __webpack_require__(55);
	var ITERATOR = __webpack_require__(5)('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	var pIE = __webpack_require__(26);
	var createDesc = __webpack_require__(18);
	var toIObject = __webpack_require__(10);
	var toPrimitive = __webpack_require__(36);
	var has = __webpack_require__(3);
	var IE8_DOM_DEFINE = __webpack_require__(43);
	var gOPD = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(8) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys = __webpack_require__(47);
	var hiddenKeys = __webpack_require__(29).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	var has = __webpack_require__(3);
	var toIObject = __webpack_require__(10);
	var arrayIndexOf = __webpack_require__(66)(false);
	var IE_PROTO = __webpack_require__(33)('IE_PROTO');

	module.exports = function (object, names) {
	  var O = toIObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(28);
	module.exports = function (it) {
	  return Object(defined(it));
	};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(39);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(35);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $at = __webpack_require__(74)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(44)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	var document = __webpack_require__(1).document;
	module.exports = document && document.documentElement;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(10);
	var gOPN = __webpack_require__(46).f;
	var toString = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(3);
	var toObject = __webpack_require__(49);
	var IE_PROTO = __webpack_require__(33)('IE_PROTO');
	var ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(60), __esModule: true };

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(62), __esModule: true };

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(77);
	var $Object = __webpack_require__(4).Object;
	module.exports = function create(P, D) {
	  return $Object.create(P, D);
	};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(78);
	module.exports = __webpack_require__(4).Object.setPrototypeOf;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(80);
	__webpack_require__(79);
	__webpack_require__(81);
	__webpack_require__(82);
	module.exports = __webpack_require__(4).Symbol;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(52);
	__webpack_require__(83);
	module.exports = __webpack_require__(38).f('iterator');


/***/ }),
/* 64 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


/***/ }),
/* 65 */
/***/ (function(module, exports) {

	module.exports = function () { /* empty */ };


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(10);
	var toLength = __webpack_require__(51);
	var toAbsoluteIndex = __webpack_require__(75);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(22);
	var gOPS = __webpack_require__(41);
	var pIE = __webpack_require__(26);
	module.exports = function (it) {
	  var result = getKeys(it);
	  var getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = pIE.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(39);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var create = __webpack_require__(31);
	var descriptor = __webpack_require__(18);
	var setToStringTag = __webpack_require__(32);
	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(9)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};


/***/ }),
/* 70 */
/***/ (function(module, exports) {

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	var META = __webpack_require__(19)('meta');
	var isObject = __webpack_require__(15);
	var has = __webpack_require__(3);
	var setDesc = __webpack_require__(6).f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(16)(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(6);
	var anObject = __webpack_require__(13);
	var getKeys = __webpack_require__(22);

	module.exports = __webpack_require__(8) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(15);
	var anObject = __webpack_require__(13);
	var check = function (O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = __webpack_require__(40)(Function.call, __webpack_require__(45).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(35);
	var defined = __webpack_require__(28);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that));
	    var i = toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(35);
	var max = Math.max;
	var min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(65);
	var step = __webpack_require__(70);
	var Iterators = __webpack_require__(24);
	var toIObject = __webpack_require__(10);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(44)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14);
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', { create: __webpack_require__(31) });


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(14);
	$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(73).set });


/***/ }),
/* 79 */
/***/ (function(module, exports) {

	

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global = __webpack_require__(1);
	var has = __webpack_require__(3);
	var DESCRIPTORS = __webpack_require__(8);
	var $export = __webpack_require__(14);
	var redefine = __webpack_require__(48);
	var META = __webpack_require__(71).KEY;
	var $fails = __webpack_require__(16);
	var shared = __webpack_require__(34);
	var setToStringTag = __webpack_require__(32);
	var uid = __webpack_require__(19);
	var wks = __webpack_require__(5);
	var wksExt = __webpack_require__(38);
	var wksDefine = __webpack_require__(37);
	var enumKeys = __webpack_require__(67);
	var isArray = __webpack_require__(68);
	var anObject = __webpack_require__(13);
	var toIObject = __webpack_require__(10);
	var toPrimitive = __webpack_require__(36);
	var createDesc = __webpack_require__(18);
	var _create = __webpack_require__(31);
	var gOPNExt = __webpack_require__(54);
	var $GOPD = __webpack_require__(45);
	var $DP = __webpack_require__(6);
	var $keys = __webpack_require__(22);
	var gOPD = $GOPD.f;
	var dP = $DP.f;
	var gOPN = gOPNExt.f;
	var $Symbol = global.Symbol;
	var $JSON = global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE = 'prototype';
	var HIDDEN = wks('_hidden');
	var TO_PRIMITIVE = wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = shared('symbol-registry');
	var AllSymbols = shared('symbols');
	var OPSymbols = shared('op-symbols');
	var ObjectProto = Object[PROTOTYPE];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function () {
	  return _create(dP({}, 'a', {
	    get: function () { return dP(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN(toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto;
	  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f = $defineProperty;
	  __webpack_require__(46).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(26).f = $propertyIsEnumerable;
	  __webpack_require__(41).f = $getOwnPropertySymbols;

	  if (DESCRIPTORS && !__webpack_require__(30)) {
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function (name) {
	    return wrap(wks(name));
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

	for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    replacer = args[1];
	    if (typeof replacer == 'function') $replacer = replacer;
	    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
	      if ($replacer) value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(37)('asyncIterator');


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(37)('observable');


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(76);
	var global = __webpack_require__(1);
	var hide = __webpack_require__(9);
	var Iterators = __webpack_require__(24);
	var TO_STRING_TAG = __webpack_require__(5)('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}


/***/ }),
/* 84 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"ant-divider":"ant-divider___3z5Oo","clearfix":"clearfix___5IkHO","anticon":"anticon___2HZTV","anticon-step-forward":"anticon-step-forward___78C_a","anticon-step-backward":"anticon-step-backward___33kIx","anticon-forward":"anticon-forward___1NNRP","anticon-backward":"anticon-backward___2hXBN","anticon-caret-right":"anticon-caret-right___1ODM_","anticon-caret-left":"anticon-caret-left___2DCO-","anticon-caret-down":"anticon-caret-down___1UTE-","anticon-caret-up":"anticon-caret-up___3si-m","anticon-right-circle":"anticon-right-circle___3PWHx","anticon-circle-right":"anticon-circle-right___2fvhM","anticon-caret-circle-right":"anticon-caret-circle-right___3WWYq","anticon-left-circle":"anticon-left-circle___3_dep","anticon-circle-left":"anticon-circle-left___2Q2mU","anticon-caret-circle-left":"anticon-caret-circle-left___3mcil","anticon-up-circle":"anticon-up-circle___20Gpk","anticon-circle-up":"anticon-circle-up___9BBXD","anticon-caret-circle-up":"anticon-caret-circle-up___2RaeF","anticon-down-circle":"anticon-down-circle___1KKXc","anticon-circle-down":"anticon-circle-down___12GT9","anticon-caret-circle-down":"anticon-caret-circle-down___3OFkx","anticon-right-circle-o":"anticon-right-circle-o___3GqRL","anticon-circle-o-right":"anticon-circle-o-right___Wq2re","anticon-caret-circle-o-right":"anticon-caret-circle-o-right___gkmEt","anticon-left-circle-o":"anticon-left-circle-o___14ztg","anticon-circle-o-left":"anticon-circle-o-left___3vwx0","anticon-caret-circle-o-left":"anticon-caret-circle-o-left___2GGUe","anticon-up-circle-o":"anticon-up-circle-o___3cAr2","anticon-circle-o-up":"anticon-circle-o-up___lB_pM","anticon-caret-circle-o-up":"anticon-caret-circle-o-up___3eGao","anticon-down-circle-o":"anticon-down-circle-o___3PjpT","anticon-circle-o-down":"anticon-circle-o-down___aNUzg","anticon-caret-circle-o-down":"anticon-caret-circle-o-down___3dl17","anticon-verticle-left":"anticon-verticle-left___1oaWK","anticon-verticle-right":"anticon-verticle-right___BPCQn","anticon-rollback":"anticon-rollback___3Cnzs","anticon-retweet":"anticon-retweet___121HN","anticon-shrink":"anticon-shrink___3Gop3","anticon-arrows-alt":"anticon-arrows-alt___234N1","anticon-arrow-salt":"anticon-arrow-salt___9-yLH","anticon-reload":"anticon-reload___2mCZ3","anticon-double-right":"anticon-double-right___2u7Nl","anticon-double-left":"anticon-double-left___UpIuw","anticon-arrow-down":"anticon-arrow-down___2Kj_B","anticon-arrow-up":"anticon-arrow-up___1L-JF","anticon-arrow-right":"anticon-arrow-right___2RtIy","anticon-arrow-left":"anticon-arrow-left___G5SQS","anticon-down":"anticon-down___1TLJq","anticon-up":"anticon-up___anzEa","anticon-right":"anticon-right___1O1Xe","anticon-left":"anticon-left___1OJRG","anticon-minus-square-o":"anticon-minus-square-o___3A4yH","anticon-minus-circle":"anticon-minus-circle___F3JHm","anticon-minus-circle-o":"anticon-minus-circle-o___38UnZ","anticon-minus":"anticon-minus___1se2x","anticon-plus-circle-o":"anticon-plus-circle-o___ERNlw","anticon-plus-circle":"anticon-plus-circle___3gD2W","anticon-plus":"anticon-plus___32_Ej","anticon-info-circle":"anticon-info-circle___3MgG7","anticon-info-circle-o":"anticon-info-circle-o___D3oUz","anticon-info":"anticon-info___15WLe","anticon-exclamation":"anticon-exclamation___1YwNI","anticon-exclamation-circle":"anticon-exclamation-circle___3Sw2F","anticon-exclamation-circle-o":"anticon-exclamation-circle-o___2eGIs","anticon-close-circle":"anticon-close-circle___26zYi","anticon-cross-circle":"anticon-cross-circle___3PRVx","anticon-close-circle-o":"anticon-close-circle-o___1dnBa","anticon-cross-circle-o":"anticon-cross-circle-o___2Hq7B","anticon-check-circle":"anticon-check-circle___W3mh6","anticon-check-circle-o":"anticon-check-circle-o___F_nNd","anticon-check":"anticon-check___Roq4g","anticon-close":"anticon-close___2WV3X","anticon-cross":"anticon-cross___clkUs","anticon-customer-service":"anticon-customer-service___Fw17R","anticon-customerservice":"anticon-customerservice___1Ob9K","anticon-credit-card":"anticon-credit-card___2T3UK","anticon-code-o":"anticon-code-o___1R7iW","anticon-book":"anticon-book___Z304C","anticon-bar-chart":"anticon-bar-chart___cpv9t","anticon-bars":"anticon-bars___2krO4","anticon-question":"anticon-question___1iaeE","anticon-question-circle":"anticon-question-circle___1mGIP","anticon-question-circle-o":"anticon-question-circle-o___1-O-S","anticon-pause":"anticon-pause___2rdac","anticon-pause-circle":"anticon-pause-circle___V9PwB","anticon-pause-circle-o":"anticon-pause-circle-o___2Gxs2","anticon-clock-circle":"anticon-clock-circle___3fm-b","anticon-clock-circle-o":"anticon-clock-circle-o___1E4ip","anticon-swap":"anticon-swap___2c6ft","anticon-swap-left":"anticon-swap-left___WfUzr","anticon-swap-right":"anticon-swap-right___28pIW","anticon-plus-square-o":"anticon-plus-square-o___G3ZSC","anticon-frown":"anticon-frown___2fYip","anticon-frown-circle":"anticon-frown-circle___NtsHc","anticon-ellipsis":"anticon-ellipsis___D3t3i","anticon-copy":"anticon-copy___2IId6","anticon-menu-fold":"anticon-menu-fold___2BuU-","anticon-mail":"anticon-mail___34rv8","anticon-logout":"anticon-logout___wTosb","anticon-link":"anticon-link___Vjs6h","anticon-area-chart":"anticon-area-chart___3Lh8P","anticon-line-chart":"anticon-line-chart___1vGNz","anticon-home":"anticon-home___a5zpY","anticon-laptop":"anticon-laptop___1L8g9","anticon-star":"anticon-star___3sgxm","anticon-star-o":"anticon-star-o___2QbVq","anticon-folder":"anticon-folder___1gKcD","anticon-filter":"anticon-filter___1bJe8","anticon-file":"anticon-file___nYkaE","anticon-exception":"anticon-exception___1gsHn","anticon-meh":"anticon-meh___283bu","anticon-meh-circle":"anticon-meh-circle___ynt8f","anticon-meh-o":"anticon-meh-o___VpTUa","anticon-shopping-cart":"anticon-shopping-cart___2JsFG","anticon-save":"anticon-save___27Rnm","anticon-user":"anticon-user___dmiM9","anticon-video-camera":"anticon-video-camera___2ztqV","anticon-to-top":"anticon-to-top___3ZEs1","anticon-team":"anticon-team___1pTDe","anticon-tablet":"anticon-tablet___3scau","anticon-solution":"anticon-solution___8t5W6","anticon-search":"anticon-search___2qZPT","anticon-share-alt":"anticon-share-alt___ndIp3","anticon-setting":"anticon-setting___1csH_","anticon-poweroff":"anticon-poweroff___3xGjP","anticon-picture":"anticon-picture___xfdEM","anticon-phone":"anticon-phone___2UdLL","anticon-paper-clip":"anticon-paper-clip___ksVHw","anticon-notification":"anticon-notification___1Kh2_","anticon-mobile":"anticon-mobile___33umo","anticon-menu-unfold":"anticon-menu-unfold___yJfso","anticon-inbox":"anticon-inbox___3coMr","anticon-lock":"anticon-lock___1kZk1","anticon-qrcode":"anticon-qrcode___1wehJ","anticon-play-circle":"anticon-play-circle___2Algu","anticon-play-circle-o":"anticon-play-circle-o___2e6WV","anticon-tag":"anticon-tag___1o-eE","anticon-tag-o":"anticon-tag-o___gdIo5","anticon-tags":"anticon-tags___26xMC","anticon-tags-o":"anticon-tags-o___14TON","anticon-cloud-o":"anticon-cloud-o___2_LAm","anticon-cloud":"anticon-cloud___3ZtAW","anticon-cloud-upload":"anticon-cloud-upload___1g9BF","anticon-cloud-download":"anticon-cloud-download___1p5BA","anticon-cloud-download-o":"anticon-cloud-download-o___34riE","anticon-cloud-upload-o":"anticon-cloud-upload-o___LOaM4","anticon-environment":"anticon-environment___vdX90","anticon-environment-o":"anticon-environment-o___247_E","anticon-eye":"anticon-eye___2h3mT","anticon-eye-o":"anticon-eye-o___3weMO","anticon-camera":"anticon-camera___3sszR","anticon-camera-o":"anticon-camera-o___2icf8","anticon-windows":"anticon-windows___3_Nka","anticon-apple":"anticon-apple___2Ubhg","anticon-apple-o":"anticon-apple-o___3iPgj","anticon-android":"anticon-android___S2e-6","anticon-android-o":"anticon-android-o___1AY1e","anticon-aliwangwang":"anticon-aliwangwang___38myY","anticon-aliwangwang-o":"anticon-aliwangwang-o___3pAJe","anticon-export":"anticon-export___3TmTG","anticon-edit":"anticon-edit___2MZp9","anticon-circle-down-o":"anticon-circle-down-o___2014u","anticon-circle-down-":"anticon-circle-down-___2-KA2","anticon-appstore-o":"anticon-appstore-o___7tPuJ","anticon-appstore":"anticon-appstore___nQDb-","anticon-scan":"anticon-scan___h3s9q","anticon-file-text":"anticon-file-text___2kfKp","anticon-folder-open":"anticon-folder-open___1Zrrv","anticon-hdd":"anticon-hdd___XEZBt","anticon-ie":"anticon-ie___w2kxd","anticon-file-jpg":"anticon-file-jpg___2aw8s","anticon-like":"anticon-like___3fttt","anticon-like-o":"anticon-like-o___3Rhu-","anticon-dislike":"anticon-dislike___2tTEI","anticon-dislike-o":"anticon-dislike-o___bJGcr","anticon-delete":"anticon-delete___29qIu","anticon-enter":"anticon-enter___2lsPT","anticon-pushpin-o":"anticon-pushpin-o___3Opzw","anticon-pushpin":"anticon-pushpin___PnFe8","anticon-heart":"anticon-heart___1jA8P","anticon-heart-o":"anticon-heart-o___1jGrQ","anticon-pay-circle":"anticon-pay-circle___NJPaO","anticon-pay-circle-o":"anticon-pay-circle-o___EaHNZ","anticon-smile":"anticon-smile___3yoKC","anticon-smile-circle":"anticon-smile-circle___2lzyh","anticon-smile-o":"anticon-smile-o___2i-bp","anticon-frown-o":"anticon-frown-o___1ehgN","anticon-calculator":"anticon-calculator___2cBgZ","anticon-message":"anticon-message___do2VO","anticon-chrome":"anticon-chrome___3FmsP","anticon-github":"anticon-github___3zzbG","anticon-file-unknown":"anticon-file-unknown___3fgPH","anticon-file-excel":"anticon-file-excel___1LYl4","anticon-file-ppt":"anticon-file-ppt___1gM4K","anticon-file-word":"anticon-file-word___1Av52","anticon-file-pdf":"anticon-file-pdf___25wyf","anticon-desktop":"anticon-desktop___3oiDP","anticon-upload":"anticon-upload___1Toc2","anticon-download":"anticon-download___1hDg8","anticon-pie-chart":"anticon-pie-chart___cM_L-","anticon-unlock":"anticon-unlock___3wUJt","anticon-calendar":"anticon-calendar___3onCj","anticon-windows-o":"anticon-windows-o___1UBPF","anticon-dot-chart":"anticon-dot-chart___357eN","anticon-code":"anticon-code___11_zq","anticon-api":"anticon-api___NQYTa","anticon-plus-square":"anticon-plus-square___pcM5P","anticon-minus-square":"anticon-minus-square___SzjwO","anticon-close-square":"anticon-close-square___34ImE","anticon-close-square-o":"anticon-close-square-o___AgPDJ","anticon-check-square":"anticon-check-square___h6VIH","anticon-check-square-o":"anticon-check-square-o___3iMHd","anticon-fast-backward":"anticon-fast-backward___1LEuh","anticon-fast-forward":"anticon-fast-forward___piXaX","anticon-up-square":"anticon-up-square___16dnr","anticon-down-square":"anticon-down-square___11N87","anticon-left-square":"anticon-left-square___33uY1","anticon-right-square":"anticon-right-square___2wque","anticon-right-square-o":"anticon-right-square-o___RP2Qa","anticon-left-square-o":"anticon-left-square-o___2UYaL","anticon-down-square-o":"anticon-down-square-o___2FJgY","anticon-up-square-o":"anticon-up-square-o___18Ag2","anticon-loading":"anticon-loading___1jzQS","anticon-loading-3-quarters":"anticon-loading-3-quarters___2Ndqw","anticon-bulb":"anticon-bulb___3mWqb","anticon-select":"anticon-select___-2K-K","anticon-addfile":"anticon-addfile___1NVd-","anticon-file-add":"anticon-file-add___t0TqG","anticon-addfolder":"anticon-addfolder___2apEh","anticon-folder-add":"anticon-folder-add___C4JLS","anticon-switcher":"anticon-switcher___26sdu","anticon-rocket":"anticon-rocket___OwIjq","anticon-dingding":"anticon-dingding___2FmYL","anticon-dingding-o":"anticon-dingding-o___2tOgR","anticon-bell":"anticon-bell___1sEf9","anticon-disconnect":"anticon-disconnect___1IjdW","anticon-database":"anticon-database___2vJM-","anticon-compass":"anticon-compass___j4bMn","anticon-barcode":"anticon-barcode___11HXs","anticon-hourglass":"anticon-hourglass___2Y4QJ","anticon-key":"anticon-key___2kpYN","anticon-flag":"anticon-flag___1JIti","anticon-layout":"anticon-layout___PSfut","anticon-login":"anticon-login___2ZRIV","anticon-printer":"anticon-printer___1HNWT","anticon-sound":"anticon-sound___3JKL6","anticon-usb":"anticon-usb___31Caz","anticon-skin":"anticon-skin___Ajumo","anticon-tool":"anticon-tool___xS7F_","anticon-sync":"anticon-sync___3KAqN","anticon-wifi":"anticon-wifi___1hZis","anticon-car":"anticon-car___5fzuu","anticon-copyright":"anticon-copyright___23cEk","anticon-schedule":"anticon-schedule___WCDNc","anticon-user-add":"anticon-user-add___3vsZO","anticon-user-delete":"anticon-user-delete___2jPRP","anticon-usergroup-add":"anticon-usergroup-add___1dNH9","anticon-usergroup-delete":"anticon-usergroup-delete___1uTnI","anticon-man":"anticon-man___myzYM","anticon-woman":"anticon-woman___1OSdg","anticon-shop":"anticon-shop___3XMuW","anticon-gift":"anticon-gift___3QBqo","anticon-idcard":"anticon-idcard___1975_","anticon-medicine-box":"anticon-medicine-box___2VfBc","anticon-red-envelope":"anticon-red-envelope___2uwwQ","anticon-coffee":"anticon-coffee___3zfGX","anticon-trademark":"anticon-trademark___zoKzo","anticon-safety":"anticon-safety___3Kq-r","anticon-wallet":"anticon-wallet___2ZDoA","anticon-bank":"anticon-bank___3xm99","anticon-trophy":"anticon-trophy___2GKOj","anticon-contacts":"anticon-contacts___2d2pL","anticon-global":"anticon-global___Pw6mk","anticon-shake":"anticon-shake___3claP","anticon-fork":"anticon-fork___3BfiH","anticon-spin":"anticon-spin___3ROzH","loadingCircle":"loadingCircle___2v-2S","fade-enter":"fade-enter___2l23g","fade-appear":"fade-appear___2fdG6","fade-leave":"fade-leave___1P-2E","fade-enter-active":"fade-enter-active___2WVy1","fade-appear-active":"fade-appear-active___PmQtW","antFadeIn":"antFadeIn___oiVBD","fade-leave-active":"fade-leave-active___1sJMc","antFadeOut":"antFadeOut___1czrr","move-up-enter":"move-up-enter___N-WeA","move-up-appear":"move-up-appear___s3kQx","move-up-leave":"move-up-leave___3W5CF","move-up-enter-active":"move-up-enter-active___24hrB","move-up-appear-active":"move-up-appear-active___117CE","antMoveUpIn":"antMoveUpIn___1Rj73","move-up-leave-active":"move-up-leave-active___3ICRS","antMoveUpOut":"antMoveUpOut___1261t","move-down-enter":"move-down-enter___2vSpg","move-down-appear":"move-down-appear___v8HC4","move-down-leave":"move-down-leave___1x_Ab","move-down-enter-active":"move-down-enter-active___2lF5v","move-down-appear-active":"move-down-appear-active___DGpXo","antMoveDownIn":"antMoveDownIn___1sFZp","move-down-leave-active":"move-down-leave-active___1EzXp","antMoveDownOut":"antMoveDownOut___3nxI6","move-left-enter":"move-left-enter___pJpsI","move-left-appear":"move-left-appear___1a9OE","move-left-leave":"move-left-leave___29gIj","move-left-enter-active":"move-left-enter-active___1q6pl","move-left-appear-active":"move-left-appear-active___21vGy","antMoveLeftIn":"antMoveLeftIn___1v_zu","move-left-leave-active":"move-left-leave-active___bVJKf","antMoveLeftOut":"antMoveLeftOut___3iW06","move-right-enter":"move-right-enter___2ZNVN","move-right-appear":"move-right-appear___3PfWb","move-right-leave":"move-right-leave___1waQq","move-right-enter-active":"move-right-enter-active___3APEQ","move-right-appear-active":"move-right-appear-active___3CjF3","antMoveRightIn":"antMoveRightIn___23dpw","move-right-leave-active":"move-right-leave-active___2kJ4F","antMoveRightOut":"antMoveRightOut___2PSXX","slide-up-enter":"slide-up-enter___akcqe","slide-up-appear":"slide-up-appear___3_Aol","slide-up-leave":"slide-up-leave___22ME4","slide-up-enter-active":"slide-up-enter-active___3NHoa","slide-up-appear-active":"slide-up-appear-active___2h9TO","antSlideUpIn":"antSlideUpIn___3tj6E","slide-up-leave-active":"slide-up-leave-active___1n31d","antSlideUpOut":"antSlideUpOut___32xwi","slide-down-enter":"slide-down-enter___1VNJ8","slide-down-appear":"slide-down-appear___176Jr","slide-down-leave":"slide-down-leave___38ICf","slide-down-enter-active":"slide-down-enter-active___1tMko","slide-down-appear-active":"slide-down-appear-active___3S5or","antSlideDownIn":"antSlideDownIn___3za_2","slide-down-leave-active":"slide-down-leave-active___1K4GK","antSlideDownOut":"antSlideDownOut___3LC9f","slide-left-enter":"slide-left-enter___1OpQG","slide-left-appear":"slide-left-appear____xgns","slide-left-leave":"slide-left-leave___2D0gT","slide-left-enter-active":"slide-left-enter-active___2SPhU","slide-left-appear-active":"slide-left-appear-active___4q1AH","antSlideLeftIn":"antSlideLeftIn___rCrKa","slide-left-leave-active":"slide-left-leave-active___mlm6B","antSlideLeftOut":"antSlideLeftOut___3Byi9","slide-right-enter":"slide-right-enter___9MYDB","slide-right-appear":"slide-right-appear___2N5da","slide-right-leave":"slide-right-leave___3OvRs","slide-right-enter-active":"slide-right-enter-active___13DMu","slide-right-appear-active":"slide-right-appear-active___13x8f","antSlideRightIn":"antSlideRightIn___1tJrN","slide-right-leave-active":"slide-right-leave-active___1ryot","antSlideRightOut":"antSlideRightOut___r-gTy","swing-enter":"swing-enter___2ddvJ","swing-appear":"swing-appear___3XyUg","swing-enter-active":"swing-enter-active___2_4hy","swing-appear-active":"swing-appear-active___VjbNr","antSwingIn":"antSwingIn___sdkpc","zoom-enter":"zoom-enter___3WmCM","zoom-appear":"zoom-appear___3p-tP","zoom-leave":"zoom-leave___3nmRg","zoom-enter-active":"zoom-enter-active___2v-Xc","zoom-appear-active":"zoom-appear-active___2RIZa","antZoomIn":"antZoomIn___1w7NH","zoom-leave-active":"zoom-leave-active___2kp9C","antZoomOut":"antZoomOut___-bfA1","zoom-big-enter":"zoom-big-enter___1j61l","zoom-big-appear":"zoom-big-appear___2ijme","zoom-big-leave":"zoom-big-leave___1tyJO","zoom-big-enter-active":"zoom-big-enter-active____apgb","zoom-big-appear-active":"zoom-big-appear-active___1SiA-","antZoomBigIn":"antZoomBigIn___1xtX7","zoom-big-leave-active":"zoom-big-leave-active___RrhSn","antZoomBigOut":"antZoomBigOut___2gleQ","zoom-big-fast-enter":"zoom-big-fast-enter___1UiHV","zoom-big-fast-appear":"zoom-big-fast-appear___1-ayL","zoom-big-fast-leave":"zoom-big-fast-leave___36faH","zoom-big-fast-enter-active":"zoom-big-fast-enter-active___29fz4","zoom-big-fast-appear-active":"zoom-big-fast-appear-active___pHyxm","zoom-big-fast-leave-active":"zoom-big-fast-leave-active___1328A","zoom-up-enter":"zoom-up-enter___2QgFn","zoom-up-appear":"zoom-up-appear___1IhIO","zoom-up-leave":"zoom-up-leave___Es0VM","zoom-up-enter-active":"zoom-up-enter-active___S7JGl","zoom-up-appear-active":"zoom-up-appear-active___3MOY5","antZoomUpIn":"antZoomUpIn___27pz2","zoom-up-leave-active":"zoom-up-leave-active___2zWMw","antZoomUpOut":"antZoomUpOut___2O_6F","zoom-down-enter":"zoom-down-enter___24UDC","zoom-down-appear":"zoom-down-appear___2tF6-","zoom-down-leave":"zoom-down-leave___vtCnh","zoom-down-enter-active":"zoom-down-enter-active___3qr7R","zoom-down-appear-active":"zoom-down-appear-active___3L_7U","antZoomDownIn":"antZoomDownIn___1PwLZ","zoom-down-leave-active":"zoom-down-leave-active___utOZ-","antZoomDownOut":"antZoomDownOut___3mmto","zoom-left-enter":"zoom-left-enter___cIpyh","zoom-left-appear":"zoom-left-appear___1wzSz","zoom-left-leave":"zoom-left-leave___3_ux7","zoom-left-enter-active":"zoom-left-enter-active___1dvw5","zoom-left-appear-active":"zoom-left-appear-active___3cni7","antZoomLeftIn":"antZoomLeftIn___2aIQD","zoom-left-leave-active":"zoom-left-leave-active___1xfjG","antZoomLeftOut":"antZoomLeftOut___12Xdo","zoom-right-enter":"zoom-right-enter___5Hnk-","zoom-right-appear":"zoom-right-appear___1hoiS","zoom-right-leave":"zoom-right-leave___2tck3","zoom-right-enter-active":"zoom-right-enter-active___1np3k","zoom-right-appear-active":"zoom-right-appear-active___6LSE6","antZoomRightIn":"antZoomRightIn___1L-kx","zoom-right-leave-active":"zoom-right-leave-active___2FNV8","antZoomRightOut":"antZoomRightOut___1hotV","ant-motion-collapse":"ant-motion-collapse___3hH8G","ant-motion-collapse-active":"ant-motion-collapse-active___iP92s"};

/***/ }),
/* 85 */
/***/ (function(module, exports) {

	module.exports = ReactDOM;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var React = __webpack_require__(2);
	var factory = __webpack_require__(172);

	if (typeof React === 'undefined') {
	  throw Error(
	    'create-react-class could not find the React object. If you are using script tags, ' +
	      'make sure that React is being loaded before create-react-class.'
	  );
	}

	// Hack to grab NoopUpdateQueue from isomorphic React
	var ReactNoopUpdateQueue = new React.Component().updater;

	module.exports = factory(
	  React.Component,
	  React.isValidElement,
	  ReactNoopUpdateQueue
	);


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function omit(obj, fields) {
	  var shallowCopy = (0, _extends3["default"])({}, obj);
	  for (var i = 0; i < fields.length; i++) {
	    var key = fields[i];
	    delete shallowCopy[key];
	  }
	  return shallowCopy;
	}

	exports["default"] = omit;
	module.exports = exports['default'];

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(23);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	exports.toArray = toArray;
	exports.getActiveIndex = getActiveIndex;
	exports.getActiveKey = getActiveKey;
	exports.setTransform = setTransform;
	exports.isTransformSupported = isTransformSupported;
	exports.setTransition = setTransition;
	exports.getTransformPropValue = getTransformPropValue;
	exports.isVertical = isVertical;
	exports.getTransformByIndex = getTransformByIndex;
	exports.getMarginStyle = getMarginStyle;
	exports.getStyle = getStyle;
	exports.setPxStyle = setPxStyle;
	exports.getDataAttr = getDataAttr;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function toArray(children) {
	  // allow [c,[a,b]]
	  var c = [];
	  _react2['default'].Children.forEach(children, function (child) {
	    if (child) {
	      c.push(child);
	    }
	  });
	  return c;
	}

	function getActiveIndex(children, activeKey) {
	  var c = toArray(children);
	  for (var i = 0; i < c.length; i++) {
	    if (c[i].key === activeKey) {
	      return i;
	    }
	  }
	  return -1;
	}

	function getActiveKey(children, index) {
	  var c = toArray(children);
	  return c[index].key;
	}

	function setTransform(style, v) {
	  style.transform = v;
	  style.webkitTransform = v;
	  style.mozTransform = v;
	}

	function isTransformSupported(style) {
	  return 'transform' in style || 'webkitTransform' in style || 'MozTransform' in style;
	}

	function setTransition(style, v) {
	  style.transition = v;
	  style.webkitTransition = v;
	  style.MozTransition = v;
	}
	function getTransformPropValue(v) {
	  return {
	    transform: v,
	    WebkitTransform: v,
	    MozTransform: v
	  };
	}

	function isVertical(tabBarPosition) {
	  return tabBarPosition === 'left' || tabBarPosition === 'right';
	}

	function getTransformByIndex(index, tabBarPosition) {
	  var translate = isVertical(tabBarPosition) ? 'translateY' : 'translateX';
	  return translate + '(' + -index * 100 + '%) translateZ(0)';
	}

	function getMarginStyle(index, tabBarPosition) {
	  var marginDirection = isVertical(tabBarPosition) ? 'marginTop' : 'marginLeft';
	  return (0, _defineProperty3['default'])({}, marginDirection, -index * 100 + '%');
	}

	function getStyle(el, property) {
	  return +getComputedStyle(el).getPropertyValue(property).replace('px', '');
	}

	function setPxStyle(el, value, vertical) {
	  value = vertical ? '0px, ' + value + 'px, 0px' : value + 'px, 0px, 0px';
	  setTransform(el.style, 'translate3d(' + value + ')');
	}

	function getDataAttr(props) {
	  return Object.keys(props).reduce(function (prev, key) {
	    if (key.substr(0, 5) === 'aria-' || key.substr(0, 5) === 'data-' || key === 'role') {
	      prev[key] = props[key];
	    }
	    return prev;
	  }, {});
	}

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	var _defineProperty2 = __webpack_require__(23);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(20);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _omit = __webpack_require__(87);

	var _omit2 = _interopRequireDefault(_omit);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var Icon = function Icon(props) {
	    var type = props.type,
	        _props$className = props.className,
	        className = _props$className === undefined ? '' : _props$className,
	        spin = props.spin;

	    var classString = (0, _classnames2['default'])((0, _defineProperty3['default'])({
	        anticon: true,
	        'anticon-spin': !!spin || type === 'loading'
	    }, 'anticon-' + type, true), className);
	    return _react2['default'].createElement('i', (0, _extends3['default'])({}, (0, _omit2['default'])(props, ['type', 'spin']), { className: classString }));
	};
	exports['default'] = Icon;
	module.exports = exports['default'];

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(103), __esModule: true };

/***/ }),
/* 91 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (obj, keys) {
	  var target = {};

	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }

	  return target;
	};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (true) {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(99);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (true) {
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	module.exports = warning;

/***/ }),
/* 94 */,
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE

	// This is CodeMirror (http://codemirror.net), a code editor
	// implemented in JavaScript on top of the browser's DOM.
	//
	// You can find some technical background for some of the code below
	// at http://marijnhaverbeke.nl/blog/#cm-internals .

	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.CodeMirror = factory());
	}(this, (function () { 'use strict';

	// Kludges for bugs and behavior differences that can't be feature
	// detected are enabled based on userAgent etc sniffing.
	var userAgent = navigator.userAgent;
	var platform = navigator.platform;

	var gecko = /gecko\/\d/i.test(userAgent);
	var ie_upto10 = /MSIE \d/.test(userAgent);
	var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(userAgent);
	var edge = /Edge\/(\d+)/.exec(userAgent);
	var ie = ie_upto10 || ie_11up || edge;
	var ie_version = ie && (ie_upto10 ? document.documentMode || 6 : +(edge || ie_11up)[1]);
	var webkit = !edge && /WebKit\//.test(userAgent);
	var qtwebkit = webkit && /Qt\/\d+\.\d+/.test(userAgent);
	var chrome = !edge && /Chrome\//.test(userAgent);
	var presto = /Opera\//.test(userAgent);
	var safari = /Apple Computer/.test(navigator.vendor);
	var mac_geMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(userAgent);
	var phantom = /PhantomJS/.test(userAgent);

	var ios = !edge && /AppleWebKit/.test(userAgent) && /Mobile\/\w+/.test(userAgent);
	var android = /Android/.test(userAgent);
	// This is woefully incomplete. Suggestions for alternative methods welcome.
	var mobile = ios || android || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(userAgent);
	var mac = ios || /Mac/.test(platform);
	var chromeOS = /\bCrOS\b/.test(userAgent);
	var windows = /win/i.test(platform);

	var presto_version = presto && userAgent.match(/Version\/(\d*\.\d*)/);
	if (presto_version) { presto_version = Number(presto_version[1]); }
	if (presto_version && presto_version >= 15) { presto = false; webkit = true; }
	// Some browsers use the wrong event properties to signal cmd/ctrl on OS X
	var flipCtrlCmd = mac && (qtwebkit || presto && (presto_version == null || presto_version < 12.11));
	var captureRightClick = gecko || (ie && ie_version >= 9);

	function classTest(cls) { return new RegExp("(^|\\s)" + cls + "(?:$|\\s)\\s*") }

	var rmClass = function(node, cls) {
	  var current = node.className;
	  var match = classTest(cls).exec(current);
	  if (match) {
	    var after = current.slice(match.index + match[0].length);
	    node.className = current.slice(0, match.index) + (after ? match[1] + after : "");
	  }
	};

	function removeChildren(e) {
	  for (var count = e.childNodes.length; count > 0; --count)
	    { e.removeChild(e.firstChild); }
	  return e
	}

	function removeChildrenAndAdd(parent, e) {
	  return removeChildren(parent).appendChild(e)
	}

	function elt(tag, content, className, style) {
	  var e = document.createElement(tag);
	  if (className) { e.className = className; }
	  if (style) { e.style.cssText = style; }
	  if (typeof content == "string") { e.appendChild(document.createTextNode(content)); }
	  else if (content) { for (var i = 0; i < content.length; ++i) { e.appendChild(content[i]); } }
	  return e
	}
	// wrapper for elt, which removes the elt from the accessibility tree
	function eltP(tag, content, className, style) {
	  var e = elt(tag, content, className, style);
	  e.setAttribute("role", "presentation");
	  return e
	}

	var range;
	if (document.createRange) { range = function(node, start, end, endNode) {
	  var r = document.createRange();
	  r.setEnd(endNode || node, end);
	  r.setStart(node, start);
	  return r
	}; }
	else { range = function(node, start, end) {
	  var r = document.body.createTextRange();
	  try { r.moveToElementText(node.parentNode); }
	  catch(e) { return r }
	  r.collapse(true);
	  r.moveEnd("character", end);
	  r.moveStart("character", start);
	  return r
	}; }

	function contains(parent, child) {
	  if (child.nodeType == 3) // Android browser always returns false when child is a textnode
	    { child = child.parentNode; }
	  if (parent.contains)
	    { return parent.contains(child) }
	  do {
	    if (child.nodeType == 11) { child = child.host; }
	    if (child == parent) { return true }
	  } while (child = child.parentNode)
	}

	function activeElt() {
	  // IE and Edge may throw an "Unspecified Error" when accessing document.activeElement.
	  // IE < 10 will throw when accessed while the page is loading or in an iframe.
	  // IE > 9 and Edge will throw when accessed in an iframe if document.body is unavailable.
	  var activeElement;
	  try {
	    activeElement = document.activeElement;
	  } catch(e) {
	    activeElement = document.body || null;
	  }
	  while (activeElement && activeElement.shadowRoot && activeElement.shadowRoot.activeElement)
	    { activeElement = activeElement.shadowRoot.activeElement; }
	  return activeElement
	}

	function addClass(node, cls) {
	  var current = node.className;
	  if (!classTest(cls).test(current)) { node.className += (current ? " " : "") + cls; }
	}
	function joinClasses(a, b) {
	  var as = a.split(" ");
	  for (var i = 0; i < as.length; i++)
	    { if (as[i] && !classTest(as[i]).test(b)) { b += " " + as[i]; } }
	  return b
	}

	var selectInput = function(node) { node.select(); };
	if (ios) // Mobile Safari apparently has a bug where select() is broken.
	  { selectInput = function(node) { node.selectionStart = 0; node.selectionEnd = node.value.length; }; }
	else if (ie) // Suppress mysterious IE10 errors
	  { selectInput = function(node) { try { node.select(); } catch(_e) {} }; }

	function bind(f) {
	  var args = Array.prototype.slice.call(arguments, 1);
	  return function(){return f.apply(null, args)}
	}

	function copyObj(obj, target, overwrite) {
	  if (!target) { target = {}; }
	  for (var prop in obj)
	    { if (obj.hasOwnProperty(prop) && (overwrite !== false || !target.hasOwnProperty(prop)))
	      { target[prop] = obj[prop]; } }
	  return target
	}

	// Counts the column offset in a string, taking tabs into account.
	// Used mostly to find indentation.
	function countColumn(string, end, tabSize, startIndex, startValue) {
	  if (end == null) {
	    end = string.search(/[^\s\u00a0]/);
	    if (end == -1) { end = string.length; }
	  }
	  for (var i = startIndex || 0, n = startValue || 0;;) {
	    var nextTab = string.indexOf("\t", i);
	    if (nextTab < 0 || nextTab >= end)
	      { return n + (end - i) }
	    n += nextTab - i;
	    n += tabSize - (n % tabSize);
	    i = nextTab + 1;
	  }
	}

	var Delayed = function() {this.id = null;};
	Delayed.prototype.set = function (ms, f) {
	  clearTimeout(this.id);
	  this.id = setTimeout(f, ms);
	};

	function indexOf(array, elt) {
	  for (var i = 0; i < array.length; ++i)
	    { if (array[i] == elt) { return i } }
	  return -1
	}

	// Number of pixels added to scroller and sizer to hide scrollbar
	var scrollerGap = 30;

	// Returned or thrown by various protocols to signal 'I'm not
	// handling this'.
	var Pass = {toString: function(){return "CodeMirror.Pass"}};

	// Reused option objects for setSelection & friends
	var sel_dontScroll = {scroll: false};
	var sel_mouse = {origin: "*mouse"};
	var sel_move = {origin: "+move"};

	// The inverse of countColumn -- find the offset that corresponds to
	// a particular column.
	function findColumn(string, goal, tabSize) {
	  for (var pos = 0, col = 0;;) {
	    var nextTab = string.indexOf("\t", pos);
	    if (nextTab == -1) { nextTab = string.length; }
	    var skipped = nextTab - pos;
	    if (nextTab == string.length || col + skipped >= goal)
	      { return pos + Math.min(skipped, goal - col) }
	    col += nextTab - pos;
	    col += tabSize - (col % tabSize);
	    pos = nextTab + 1;
	    if (col >= goal) { return pos }
	  }
	}

	var spaceStrs = [""];
	function spaceStr(n) {
	  while (spaceStrs.length <= n)
	    { spaceStrs.push(lst(spaceStrs) + " "); }
	  return spaceStrs[n]
	}

	function lst(arr) { return arr[arr.length-1] }

	function map(array, f) {
	  var out = [];
	  for (var i = 0; i < array.length; i++) { out[i] = f(array[i], i); }
	  return out
	}

	function insertSorted(array, value, score) {
	  var pos = 0, priority = score(value);
	  while (pos < array.length && score(array[pos]) <= priority) { pos++; }
	  array.splice(pos, 0, value);
	}

	function nothing() {}

	function createObj(base, props) {
	  var inst;
	  if (Object.create) {
	    inst = Object.create(base);
	  } else {
	    nothing.prototype = base;
	    inst = new nothing();
	  }
	  if (props) { copyObj(props, inst); }
	  return inst
	}

	var nonASCIISingleCaseWordChar = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
	function isWordCharBasic(ch) {
	  return /\w/.test(ch) || ch > "\x80" &&
	    (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch))
	}
	function isWordChar(ch, helper) {
	  if (!helper) { return isWordCharBasic(ch) }
	  if (helper.source.indexOf("\\w") > -1 && isWordCharBasic(ch)) { return true }
	  return helper.test(ch)
	}

	function isEmpty(obj) {
	  for (var n in obj) { if (obj.hasOwnProperty(n) && obj[n]) { return false } }
	  return true
	}

	// Extending unicode characters. A series of a non-extending char +
	// any number of extending chars is treated as a single unit as far
	// as editing and measuring is concerned. This is not fully correct,
	// since some scripts/fonts/browsers also treat other configurations
	// of code points as a group.
	var extendingChars = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
	function isExtendingChar(ch) { return ch.charCodeAt(0) >= 768 && extendingChars.test(ch) }

	// Returns a number from the range [`0`; `str.length`] unless `pos` is outside that range.
	function skipExtendingChars(str, pos, dir) {
	  while ((dir < 0 ? pos > 0 : pos < str.length) && isExtendingChar(str.charAt(pos))) { pos += dir; }
	  return pos
	}

	// Returns the value from the range [`from`; `to`] that satisfies
	// `pred` and is closest to `from`. Assumes that at least `to`
	// satisfies `pred`. Supports `from` being greater than `to`.
	function findFirst(pred, from, to) {
	  // At any point we are certain `to` satisfies `pred`, don't know
	  // whether `from` does.
	  var dir = from > to ? -1 : 1;
	  for (;;) {
	    if (from == to) { return from }
	    var midF = (from + to) / 2, mid = dir < 0 ? Math.ceil(midF) : Math.floor(midF);
	    if (mid == from) { return pred(mid) ? from : to }
	    if (pred(mid)) { to = mid; }
	    else { from = mid + dir; }
	  }
	}

	// The display handles the DOM integration, both for input reading
	// and content drawing. It holds references to DOM nodes and
	// display-related state.

	function Display(place, doc, input) {
	  var d = this;
	  this.input = input;

	  // Covers bottom-right square when both scrollbars are present.
	  d.scrollbarFiller = elt("div", null, "CodeMirror-scrollbar-filler");
	  d.scrollbarFiller.setAttribute("cm-not-content", "true");
	  // Covers bottom of gutter when coverGutterNextToScrollbar is on
	  // and h scrollbar is present.
	  d.gutterFiller = elt("div", null, "CodeMirror-gutter-filler");
	  d.gutterFiller.setAttribute("cm-not-content", "true");
	  // Will contain the actual code, positioned to cover the viewport.
	  d.lineDiv = eltP("div", null, "CodeMirror-code");
	  // Elements are added to these to represent selection and cursors.
	  d.selectionDiv = elt("div", null, null, "position: relative; z-index: 1");
	  d.cursorDiv = elt("div", null, "CodeMirror-cursors");
	  // A visibility: hidden element used to find the size of things.
	  d.measure = elt("div", null, "CodeMirror-measure");
	  // When lines outside of the viewport are measured, they are drawn in this.
	  d.lineMeasure = elt("div", null, "CodeMirror-measure");
	  // Wraps everything that needs to exist inside the vertically-padded coordinate system
	  d.lineSpace = eltP("div", [d.measure, d.lineMeasure, d.selectionDiv, d.cursorDiv, d.lineDiv],
	                    null, "position: relative; outline: none");
	  var lines = eltP("div", [d.lineSpace], "CodeMirror-lines");
	  // Moved around its parent to cover visible view.
	  d.mover = elt("div", [lines], null, "position: relative");
	  // Set to the height of the document, allowing scrolling.
	  d.sizer = elt("div", [d.mover], "CodeMirror-sizer");
	  d.sizerWidth = null;
	  // Behavior of elts with overflow: auto and padding is
	  // inconsistent across browsers. This is used to ensure the
	  // scrollable area is big enough.
	  d.heightForcer = elt("div", null, null, "position: absolute; height: " + scrollerGap + "px; width: 1px;");
	  // Will contain the gutters, if any.
	  d.gutters = elt("div", null, "CodeMirror-gutters");
	  d.lineGutter = null;
	  // Actual scrollable element.
	  d.scroller = elt("div", [d.sizer, d.heightForcer, d.gutters], "CodeMirror-scroll");
	  d.scroller.setAttribute("tabIndex", "-1");
	  // The element in which the editor lives.
	  d.wrapper = elt("div", [d.scrollbarFiller, d.gutterFiller, d.scroller], "CodeMirror");

	  // Work around IE7 z-index bug (not perfect, hence IE7 not really being supported)
	  if (ie && ie_version < 8) { d.gutters.style.zIndex = -1; d.scroller.style.paddingRight = 0; }
	  if (!webkit && !(gecko && mobile)) { d.scroller.draggable = true; }

	  if (place) {
	    if (place.appendChild) { place.appendChild(d.wrapper); }
	    else { place(d.wrapper); }
	  }

	  // Current rendered range (may be bigger than the view window).
	  d.viewFrom = d.viewTo = doc.first;
	  d.reportedViewFrom = d.reportedViewTo = doc.first;
	  // Information about the rendered lines.
	  d.view = [];
	  d.renderedView = null;
	  // Holds info about a single rendered line when it was rendered
	  // for measurement, while not in view.
	  d.externalMeasured = null;
	  // Empty space (in pixels) above the view
	  d.viewOffset = 0;
	  d.lastWrapHeight = d.lastWrapWidth = 0;
	  d.updateLineNumbers = null;

	  d.nativeBarWidth = d.barHeight = d.barWidth = 0;
	  d.scrollbarsClipped = false;

	  // Used to only resize the line number gutter when necessary (when
	  // the amount of lines crosses a boundary that makes its width change)
	  d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null;
	  // Set to true when a non-horizontal-scrolling line widget is
	  // added. As an optimization, line widget aligning is skipped when
	  // this is false.
	  d.alignWidgets = false;

	  d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;

	  // Tracks the maximum line length so that the horizontal scrollbar
	  // can be kept static when scrolling.
	  d.maxLine = null;
	  d.maxLineLength = 0;
	  d.maxLineChanged = false;

	  // Used for measuring wheel scrolling granularity
	  d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null;

	  // True when shift is held down.
	  d.shift = false;

	  // Used to track whether anything happened since the context menu
	  // was opened.
	  d.selForContextMenu = null;

	  d.activeTouch = null;

	  input.init(d);
	}

	// Find the line object corresponding to the given line number.
	function getLine(doc, n) {
	  n -= doc.first;
	  if (n < 0 || n >= doc.size) { throw new Error("There is no line " + (n + doc.first) + " in the document.") }
	  var chunk = doc;
	  while (!chunk.lines) {
	    for (var i = 0;; ++i) {
	      var child = chunk.children[i], sz = child.chunkSize();
	      if (n < sz) { chunk = child; break }
	      n -= sz;
	    }
	  }
	  return chunk.lines[n]
	}

	// Get the part of a document between two positions, as an array of
	// strings.
	function getBetween(doc, start, end) {
	  var out = [], n = start.line;
	  doc.iter(start.line, end.line + 1, function (line) {
	    var text = line.text;
	    if (n == end.line) { text = text.slice(0, end.ch); }
	    if (n == start.line) { text = text.slice(start.ch); }
	    out.push(text);
	    ++n;
	  });
	  return out
	}
	// Get the lines between from and to, as array of strings.
	function getLines(doc, from, to) {
	  var out = [];
	  doc.iter(from, to, function (line) { out.push(line.text); }); // iter aborts when callback returns truthy value
	  return out
	}

	// Update the height of a line, propagating the height change
	// upwards to parent nodes.
	function updateLineHeight(line, height) {
	  var diff = height - line.height;
	  if (diff) { for (var n = line; n; n = n.parent) { n.height += diff; } }
	}

	// Given a line object, find its line number by walking up through
	// its parent links.
	function lineNo(line) {
	  if (line.parent == null) { return null }
	  var cur = line.parent, no = indexOf(cur.lines, line);
	  for (var chunk = cur.parent; chunk; cur = chunk, chunk = chunk.parent) {
	    for (var i = 0;; ++i) {
	      if (chunk.children[i] == cur) { break }
	      no += chunk.children[i].chunkSize();
	    }
	  }
	  return no + cur.first
	}

	// Find the line at the given vertical position, using the height
	// information in the document tree.
	function lineAtHeight(chunk, h) {
	  var n = chunk.first;
	  outer: do {
	    for (var i$1 = 0; i$1 < chunk.children.length; ++i$1) {
	      var child = chunk.children[i$1], ch = child.height;
	      if (h < ch) { chunk = child; continue outer }
	      h -= ch;
	      n += child.chunkSize();
	    }
	    return n
	  } while (!chunk.lines)
	  var i = 0;
	  for (; i < chunk.lines.length; ++i) {
	    var line = chunk.lines[i], lh = line.height;
	    if (h < lh) { break }
	    h -= lh;
	  }
	  return n + i
	}

	function isLine(doc, l) {return l >= doc.first && l < doc.first + doc.size}

	function lineNumberFor(options, i) {
	  return String(options.lineNumberFormatter(i + options.firstLineNumber))
	}

	// A Pos instance represents a position within the text.
	function Pos(line, ch, sticky) {
	  if ( sticky === void 0 ) sticky = null;

	  if (!(this instanceof Pos)) { return new Pos(line, ch, sticky) }
	  this.line = line;
	  this.ch = ch;
	  this.sticky = sticky;
	}

	// Compare two positions, return 0 if they are the same, a negative
	// number when a is less, and a positive number otherwise.
	function cmp(a, b) { return a.line - b.line || a.ch - b.ch }

	function equalCursorPos(a, b) { return a.sticky == b.sticky && cmp(a, b) == 0 }

	function copyPos(x) {return Pos(x.line, x.ch)}
	function maxPos(a, b) { return cmp(a, b) < 0 ? b : a }
	function minPos(a, b) { return cmp(a, b) < 0 ? a : b }

	// Most of the external API clips given positions to make sure they
	// actually exist within the document.
	function clipLine(doc, n) {return Math.max(doc.first, Math.min(n, doc.first + doc.size - 1))}
	function clipPos(doc, pos) {
	  if (pos.line < doc.first) { return Pos(doc.first, 0) }
	  var last = doc.first + doc.size - 1;
	  if (pos.line > last) { return Pos(last, getLine(doc, last).text.length) }
	  return clipToLen(pos, getLine(doc, pos.line).text.length)
	}
	function clipToLen(pos, linelen) {
	  var ch = pos.ch;
	  if (ch == null || ch > linelen) { return Pos(pos.line, linelen) }
	  else if (ch < 0) { return Pos(pos.line, 0) }
	  else { return pos }
	}
	function clipPosArray(doc, array) {
	  var out = [];
	  for (var i = 0; i < array.length; i++) { out[i] = clipPos(doc, array[i]); }
	  return out
	}

	// Optimize some code when these features are not used.
	var sawReadOnlySpans = false;
	var sawCollapsedSpans = false;

	function seeReadOnlySpans() {
	  sawReadOnlySpans = true;
	}

	function seeCollapsedSpans() {
	  sawCollapsedSpans = true;
	}

	// TEXTMARKER SPANS

	function MarkedSpan(marker, from, to) {
	  this.marker = marker;
	  this.from = from; this.to = to;
	}

	// Search an array of spans for a span matching the given marker.
	function getMarkedSpanFor(spans, marker) {
	  if (spans) { for (var i = 0; i < spans.length; ++i) {
	    var span = spans[i];
	    if (span.marker == marker) { return span }
	  } }
	}
	// Remove a span from an array, returning undefined if no spans are
	// left (we don't store arrays for lines without spans).
	function removeMarkedSpan(spans, span) {
	  var r;
	  for (var i = 0; i < spans.length; ++i)
	    { if (spans[i] != span) { (r || (r = [])).push(spans[i]); } }
	  return r
	}
	// Add a span to a line.
	function addMarkedSpan(line, span) {
	  line.markedSpans = line.markedSpans ? line.markedSpans.concat([span]) : [span];
	  span.marker.attachLine(line);
	}

	// Used for the algorithm that adjusts markers for a change in the
	// document. These functions cut an array of spans at a given
	// character position, returning an array of remaining chunks (or
	// undefined if nothing remains).
	function markedSpansBefore(old, startCh, isInsert) {
	  var nw;
	  if (old) { for (var i = 0; i < old.length; ++i) {
	    var span = old[i], marker = span.marker;
	    var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= startCh : span.from < startCh);
	    if (startsBefore || span.from == startCh && marker.type == "bookmark" && (!isInsert || !span.marker.insertLeft)) {
	      var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= startCh : span.to > startCh);(nw || (nw = [])).push(new MarkedSpan(marker, span.from, endsAfter ? null : span.to));
	    }
	  } }
	  return nw
	}
	function markedSpansAfter(old, endCh, isInsert) {
	  var nw;
	  if (old) { for (var i = 0; i < old.length; ++i) {
	    var span = old[i], marker = span.marker;
	    var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= endCh : span.to > endCh);
	    if (endsAfter || span.from == endCh && marker.type == "bookmark" && (!isInsert || span.marker.insertLeft)) {
	      var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= endCh : span.from < endCh);(nw || (nw = [])).push(new MarkedSpan(marker, startsBefore ? null : span.from - endCh,
	                                            span.to == null ? null : span.to - endCh));
	    }
	  } }
	  return nw
	}

	// Given a change object, compute the new set of marker spans that
	// cover the line in which the change took place. Removes spans
	// entirely within the change, reconnects spans belonging to the
	// same marker that appear on both sides of the change, and cuts off
	// spans partially within the change. Returns an array of span
	// arrays with one element for each line in (after) the change.
	function stretchSpansOverChange(doc, change) {
	  if (change.full) { return null }
	  var oldFirst = isLine(doc, change.from.line) && getLine(doc, change.from.line).markedSpans;
	  var oldLast = isLine(doc, change.to.line) && getLine(doc, change.to.line).markedSpans;
	  if (!oldFirst && !oldLast) { return null }

	  var startCh = change.from.ch, endCh = change.to.ch, isInsert = cmp(change.from, change.to) == 0;
	  // Get the spans that 'stick out' on both sides
	  var first = markedSpansBefore(oldFirst, startCh, isInsert);
	  var last = markedSpansAfter(oldLast, endCh, isInsert);

	  // Next, merge those two ends
	  var sameLine = change.text.length == 1, offset = lst(change.text).length + (sameLine ? startCh : 0);
	  if (first) {
	    // Fix up .to properties of first
	    for (var i = 0; i < first.length; ++i) {
	      var span = first[i];
	      if (span.to == null) {
	        var found = getMarkedSpanFor(last, span.marker);
	        if (!found) { span.to = startCh; }
	        else if (sameLine) { span.to = found.to == null ? null : found.to + offset; }
	      }
	    }
	  }
	  if (last) {
	    // Fix up .from in last (or move them into first in case of sameLine)
	    for (var i$1 = 0; i$1 < last.length; ++i$1) {
	      var span$1 = last[i$1];
	      if (span$1.to != null) { span$1.to += offset; }
	      if (span$1.from == null) {
	        var found$1 = getMarkedSpanFor(first, span$1.marker);
	        if (!found$1) {
	          span$1.from = offset;
	          if (sameLine) { (first || (first = [])).push(span$1); }
	        }
	      } else {
	        span$1.from += offset;
	        if (sameLine) { (first || (first = [])).push(span$1); }
	      }
	    }
	  }
	  // Make sure we didn't create any zero-length spans
	  if (first) { first = clearEmptySpans(first); }
	  if (last && last != first) { last = clearEmptySpans(last); }

	  var newMarkers = [first];
	  if (!sameLine) {
	    // Fill gap with whole-line-spans
	    var gap = change.text.length - 2, gapMarkers;
	    if (gap > 0 && first)
	      { for (var i$2 = 0; i$2 < first.length; ++i$2)
	        { if (first[i$2].to == null)
	          { (gapMarkers || (gapMarkers = [])).push(new MarkedSpan(first[i$2].marker, null, null)); } } }
	    for (var i$3 = 0; i$3 < gap; ++i$3)
	      { newMarkers.push(gapMarkers); }
	    newMarkers.push(last);
	  }
	  return newMarkers
	}

	// Remove spans that are empty and don't have a clearWhenEmpty
	// option of false.
	function clearEmptySpans(spans) {
	  for (var i = 0; i < spans.length; ++i) {
	    var span = spans[i];
	    if (span.from != null && span.from == span.to && span.marker.clearWhenEmpty !== false)
	      { spans.splice(i--, 1); }
	  }
	  if (!spans.length) { return null }
	  return spans
	}

	// Used to 'clip' out readOnly ranges when making a change.
	function removeReadOnlyRanges(doc, from, to) {
	  var markers = null;
	  doc.iter(from.line, to.line + 1, function (line) {
	    if (line.markedSpans) { for (var i = 0; i < line.markedSpans.length; ++i) {
	      var mark = line.markedSpans[i].marker;
	      if (mark.readOnly && (!markers || indexOf(markers, mark) == -1))
	        { (markers || (markers = [])).push(mark); }
	    } }
	  });
	  if (!markers) { return null }
	  var parts = [{from: from, to: to}];
	  for (var i = 0; i < markers.length; ++i) {
	    var mk = markers[i], m = mk.find(0);
	    for (var j = 0; j < parts.length; ++j) {
	      var p = parts[j];
	      if (cmp(p.to, m.from) < 0 || cmp(p.from, m.to) > 0) { continue }
	      var newParts = [j, 1], dfrom = cmp(p.from, m.from), dto = cmp(p.to, m.to);
	      if (dfrom < 0 || !mk.inclusiveLeft && !dfrom)
	        { newParts.push({from: p.from, to: m.from}); }
	      if (dto > 0 || !mk.inclusiveRight && !dto)
	        { newParts.push({from: m.to, to: p.to}); }
	      parts.splice.apply(parts, newParts);
	      j += newParts.length - 3;
	    }
	  }
	  return parts
	}

	// Connect or disconnect spans from a line.
	function detachMarkedSpans(line) {
	  var spans = line.markedSpans;
	  if (!spans) { return }
	  for (var i = 0; i < spans.length; ++i)
	    { spans[i].marker.detachLine(line); }
	  line.markedSpans = null;
	}
	function attachMarkedSpans(line, spans) {
	  if (!spans) { return }
	  for (var i = 0; i < spans.length; ++i)
	    { spans[i].marker.attachLine(line); }
	  line.markedSpans = spans;
	}

	// Helpers used when computing which overlapping collapsed span
	// counts as the larger one.
	function extraLeft(marker) { return marker.inclusiveLeft ? -1 : 0 }
	function extraRight(marker) { return marker.inclusiveRight ? 1 : 0 }

	// Returns a number indicating which of two overlapping collapsed
	// spans is larger (and thus includes the other). Falls back to
	// comparing ids when the spans cover exactly the same range.
	function compareCollapsedMarkers(a, b) {
	  var lenDiff = a.lines.length - b.lines.length;
	  if (lenDiff != 0) { return lenDiff }
	  var aPos = a.find(), bPos = b.find();
	  var fromCmp = cmp(aPos.from, bPos.from) || extraLeft(a) - extraLeft(b);
	  if (fromCmp) { return -fromCmp }
	  var toCmp = cmp(aPos.to, bPos.to) || extraRight(a) - extraRight(b);
	  if (toCmp) { return toCmp }
	  return b.id - a.id
	}

	// Find out whether a line ends or starts in a collapsed span. If
	// so, return the marker for that span.
	function collapsedSpanAtSide(line, start) {
	  var sps = sawCollapsedSpans && line.markedSpans, found;
	  if (sps) { for (var sp = (void 0), i = 0; i < sps.length; ++i) {
	    sp = sps[i];
	    if (sp.marker.collapsed && (start ? sp.from : sp.to) == null &&
	        (!found || compareCollapsedMarkers(found, sp.marker) < 0))
	      { found = sp.marker; }
	  } }
	  return found
	}
	function collapsedSpanAtStart(line) { return collapsedSpanAtSide(line, true) }
	function collapsedSpanAtEnd(line) { return collapsedSpanAtSide(line, false) }

	// Test whether there exists a collapsed span that partially
	// overlaps (covers the start or end, but not both) of a new span.
	// Such overlap is not allowed.
	function conflictingCollapsedRange(doc, lineNo$$1, from, to, marker) {
	  var line = getLine(doc, lineNo$$1);
	  var sps = sawCollapsedSpans && line.markedSpans;
	  if (sps) { for (var i = 0; i < sps.length; ++i) {
	    var sp = sps[i];
	    if (!sp.marker.collapsed) { continue }
	    var found = sp.marker.find(0);
	    var fromCmp = cmp(found.from, from) || extraLeft(sp.marker) - extraLeft(marker);
	    var toCmp = cmp(found.to, to) || extraRight(sp.marker) - extraRight(marker);
	    if (fromCmp >= 0 && toCmp <= 0 || fromCmp <= 0 && toCmp >= 0) { continue }
	    if (fromCmp <= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.to, from) >= 0 : cmp(found.to, from) > 0) ||
	        fromCmp >= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.from, to) <= 0 : cmp(found.from, to) < 0))
	      { return true }
	  } }
	}

	// A visual line is a line as drawn on the screen. Folding, for
	// example, can cause multiple logical lines to appear on the same
	// visual line. This finds the start of the visual line that the
	// given line is part of (usually that is the line itself).
	function visualLine(line) {
	  var merged;
	  while (merged = collapsedSpanAtStart(line))
	    { line = merged.find(-1, true).line; }
	  return line
	}

	function visualLineEnd(line) {
	  var merged;
	  while (merged = collapsedSpanAtEnd(line))
	    { line = merged.find(1, true).line; }
	  return line
	}

	// Returns an array of logical lines that continue the visual line
	// started by the argument, or undefined if there are no such lines.
	function visualLineContinued(line) {
	  var merged, lines;
	  while (merged = collapsedSpanAtEnd(line)) {
	    line = merged.find(1, true).line
	    ;(lines || (lines = [])).push(line);
	  }
	  return lines
	}

	// Get the line number of the start of the visual line that the
	// given line number is part of.
	function visualLineNo(doc, lineN) {
	  var line = getLine(doc, lineN), vis = visualLine(line);
	  if (line == vis) { return lineN }
	  return lineNo(vis)
	}

	// Get the line number of the start of the next visual line after
	// the given line.
	function visualLineEndNo(doc, lineN) {
	  if (lineN > doc.lastLine()) { return lineN }
	  var line = getLine(doc, lineN), merged;
	  if (!lineIsHidden(doc, line)) { return lineN }
	  while (merged = collapsedSpanAtEnd(line))
	    { line = merged.find(1, true).line; }
	  return lineNo(line) + 1
	}

	// Compute whether a line is hidden. Lines count as hidden when they
	// are part of a visual line that starts with another line, or when
	// they are entirely covered by collapsed, non-widget span.
	function lineIsHidden(doc, line) {
	  var sps = sawCollapsedSpans && line.markedSpans;
	  if (sps) { for (var sp = (void 0), i = 0; i < sps.length; ++i) {
	    sp = sps[i];
	    if (!sp.marker.collapsed) { continue }
	    if (sp.from == null) { return true }
	    if (sp.marker.widgetNode) { continue }
	    if (sp.from == 0 && sp.marker.inclusiveLeft && lineIsHiddenInner(doc, line, sp))
	      { return true }
	  } }
	}
	function lineIsHiddenInner(doc, line, span) {
	  if (span.to == null) {
	    var end = span.marker.find(1, true);
	    return lineIsHiddenInner(doc, end.line, getMarkedSpanFor(end.line.markedSpans, span.marker))
	  }
	  if (span.marker.inclusiveRight && span.to == line.text.length)
	    { return true }
	  for (var sp = (void 0), i = 0; i < line.markedSpans.length; ++i) {
	    sp = line.markedSpans[i];
	    if (sp.marker.collapsed && !sp.marker.widgetNode && sp.from == span.to &&
	        (sp.to == null || sp.to != span.from) &&
	        (sp.marker.inclusiveLeft || span.marker.inclusiveRight) &&
	        lineIsHiddenInner(doc, line, sp)) { return true }
	  }
	}

	// Find the height above the given line.
	function heightAtLine(lineObj) {
	  lineObj = visualLine(lineObj);

	  var h = 0, chunk = lineObj.parent;
	  for (var i = 0; i < chunk.lines.length; ++i) {
	    var line = chunk.lines[i];
	    if (line == lineObj) { break }
	    else { h += line.height; }
	  }
	  for (var p = chunk.parent; p; chunk = p, p = chunk.parent) {
	    for (var i$1 = 0; i$1 < p.children.length; ++i$1) {
	      var cur = p.children[i$1];
	      if (cur == chunk) { break }
	      else { h += cur.height; }
	    }
	  }
	  return h
	}

	// Compute the character length of a line, taking into account
	// collapsed ranges (see markText) that might hide parts, and join
	// other lines onto it.
	function lineLength(line) {
	  if (line.height == 0) { return 0 }
	  var len = line.text.length, merged, cur = line;
	  while (merged = collapsedSpanAtStart(cur)) {
	    var found = merged.find(0, true);
	    cur = found.from.line;
	    len += found.from.ch - found.to.ch;
	  }
	  cur = line;
	  while (merged = collapsedSpanAtEnd(cur)) {
	    var found$1 = merged.find(0, true);
	    len -= cur.text.length - found$1.from.ch;
	    cur = found$1.to.line;
	    len += cur.text.length - found$1.to.ch;
	  }
	  return len
	}

	// Find the longest line in the document.
	function findMaxLine(cm) {
	  var d = cm.display, doc = cm.doc;
	  d.maxLine = getLine(doc, doc.first);
	  d.maxLineLength = lineLength(d.maxLine);
	  d.maxLineChanged = true;
	  doc.iter(function (line) {
	    var len = lineLength(line);
	    if (len > d.maxLineLength) {
	      d.maxLineLength = len;
	      d.maxLine = line;
	    }
	  });
	}

	// BIDI HELPERS

	function iterateBidiSections(order, from, to, f) {
	  if (!order) { return f(from, to, "ltr", 0) }
	  var found = false;
	  for (var i = 0; i < order.length; ++i) {
	    var part = order[i];
	    if (part.from < to && part.to > from || from == to && part.to == from) {
	      f(Math.max(part.from, from), Math.min(part.to, to), part.level == 1 ? "rtl" : "ltr", i);
	      found = true;
	    }
	  }
	  if (!found) { f(from, to, "ltr"); }
	}

	var bidiOther = null;
	function getBidiPartAt(order, ch, sticky) {
	  var found;
	  bidiOther = null;
	  for (var i = 0; i < order.length; ++i) {
	    var cur = order[i];
	    if (cur.from < ch && cur.to > ch) { return i }
	    if (cur.to == ch) {
	      if (cur.from != cur.to && sticky == "before") { found = i; }
	      else { bidiOther = i; }
	    }
	    if (cur.from == ch) {
	      if (cur.from != cur.to && sticky != "before") { found = i; }
	      else { bidiOther = i; }
	    }
	  }
	  return found != null ? found : bidiOther
	}

	// Bidirectional ordering algorithm
	// See http://unicode.org/reports/tr9/tr9-13.html for the algorithm
	// that this (partially) implements.

	// One-char codes used for character types:
	// L (L):   Left-to-Right
	// R (R):   Right-to-Left
	// r (AL):  Right-to-Left Arabic
	// 1 (EN):  European Number
	// + (ES):  European Number Separator
	// % (ET):  European Number Terminator
	// n (AN):  Arabic Number
	// , (CS):  Common Number Separator
	// m (NSM): Non-Spacing Mark
	// b (BN):  Boundary Neutral
	// s (B):   Paragraph Separator
	// t (S):   Segment Separator
	// w (WS):  Whitespace
	// N (ON):  Other Neutrals

	// Returns null if characters are ordered as they appear
	// (left-to-right), or an array of sections ({from, to, level}
	// objects) in the order in which they occur visually.
	var bidiOrdering = (function() {
	  // Character types for codepoints 0 to 0xff
	  var lowTypes = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN";
	  // Character types for codepoints 0x600 to 0x6f9
	  var arabicTypes = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
	  function charType(code) {
	    if (code <= 0xf7) { return lowTypes.charAt(code) }
	    else if (0x590 <= code && code <= 0x5f4) { return "R" }
	    else if (0x600 <= code && code <= 0x6f9) { return arabicTypes.charAt(code - 0x600) }
	    else if (0x6ee <= code && code <= 0x8ac) { return "r" }
	    else if (0x2000 <= code && code <= 0x200b) { return "w" }
	    else if (code == 0x200c) { return "b" }
	    else { return "L" }
	  }

	  var bidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
	  var isNeutral = /[stwN]/, isStrong = /[LRr]/, countsAsLeft = /[Lb1n]/, countsAsNum = /[1n]/;

	  function BidiSpan(level, from, to) {
	    this.level = level;
	    this.from = from; this.to = to;
	  }

	  return function(str, direction) {
	    var outerType = direction == "ltr" ? "L" : "R";

	    if (str.length == 0 || direction == "ltr" && !bidiRE.test(str)) { return false }
	    var len = str.length, types = [];
	    for (var i = 0; i < len; ++i)
	      { types.push(charType(str.charCodeAt(i))); }

	    // W1. Examine each non-spacing mark (NSM) in the level run, and
	    // change the type of the NSM to the type of the previous
	    // character. If the NSM is at the start of the level run, it will
	    // get the type of sor.
	    for (var i$1 = 0, prev = outerType; i$1 < len; ++i$1) {
	      var type = types[i$1];
	      if (type == "m") { types[i$1] = prev; }
	      else { prev = type; }
	    }

	    // W2. Search backwards from each instance of a European number
	    // until the first strong type (R, L, AL, or sor) is found. If an
	    // AL is found, change the type of the European number to Arabic
	    // number.
	    // W3. Change all ALs to R.
	    for (var i$2 = 0, cur = outerType; i$2 < len; ++i$2) {
	      var type$1 = types[i$2];
	      if (type$1 == "1" && cur == "r") { types[i$2] = "n"; }
	      else if (isStrong.test(type$1)) { cur = type$1; if (type$1 == "r") { types[i$2] = "R"; } }
	    }

	    // W4. A single European separator between two European numbers
	    // changes to a European number. A single common separator between
	    // two numbers of the same type changes to that type.
	    for (var i$3 = 1, prev$1 = types[0]; i$3 < len - 1; ++i$3) {
	      var type$2 = types[i$3];
	      if (type$2 == "+" && prev$1 == "1" && types[i$3+1] == "1") { types[i$3] = "1"; }
	      else if (type$2 == "," && prev$1 == types[i$3+1] &&
	               (prev$1 == "1" || prev$1 == "n")) { types[i$3] = prev$1; }
	      prev$1 = type$2;
	    }

	    // W5. A sequence of European terminators adjacent to European
	    // numbers changes to all European numbers.
	    // W6. Otherwise, separators and terminators change to Other
	    // Neutral.
	    for (var i$4 = 0; i$4 < len; ++i$4) {
	      var type$3 = types[i$4];
	      if (type$3 == ",") { types[i$4] = "N"; }
	      else if (type$3 == "%") {
	        var end = (void 0);
	        for (end = i$4 + 1; end < len && types[end] == "%"; ++end) {}
	        var replace = (i$4 && types[i$4-1] == "!") || (end < len && types[end] == "1") ? "1" : "N";
	        for (var j = i$4; j < end; ++j) { types[j] = replace; }
	        i$4 = end - 1;
	      }
	    }

	    // W7. Search backwards from each instance of a European number
	    // until the first strong type (R, L, or sor) is found. If an L is
	    // found, then change the type of the European number to L.
	    for (var i$5 = 0, cur$1 = outerType; i$5 < len; ++i$5) {
	      var type$4 = types[i$5];
	      if (cur$1 == "L" && type$4 == "1") { types[i$5] = "L"; }
	      else if (isStrong.test(type$4)) { cur$1 = type$4; }
	    }

	    // N1. A sequence of neutrals takes the direction of the
	    // surrounding strong text if the text on both sides has the same
	    // direction. European and Arabic numbers act as if they were R in
	    // terms of their influence on neutrals. Start-of-level-run (sor)
	    // and end-of-level-run (eor) are used at level run boundaries.
	    // N2. Any remaining neutrals take the embedding direction.
	    for (var i$6 = 0; i$6 < len; ++i$6) {
	      if (isNeutral.test(types[i$6])) {
	        var end$1 = (void 0);
	        for (end$1 = i$6 + 1; end$1 < len && isNeutral.test(types[end$1]); ++end$1) {}
	        var before = (i$6 ? types[i$6-1] : outerType) == "L";
	        var after = (end$1 < len ? types[end$1] : outerType) == "L";
	        var replace$1 = before == after ? (before ? "L" : "R") : outerType;
	        for (var j$1 = i$6; j$1 < end$1; ++j$1) { types[j$1] = replace$1; }
	        i$6 = end$1 - 1;
	      }
	    }

	    // Here we depart from the documented algorithm, in order to avoid
	    // building up an actual levels array. Since there are only three
	    // levels (0, 1, 2) in an implementation that doesn't take
	    // explicit embedding into account, we can build up the order on
	    // the fly, without following the level-based algorithm.
	    var order = [], m;
	    for (var i$7 = 0; i$7 < len;) {
	      if (countsAsLeft.test(types[i$7])) {
	        var start = i$7;
	        for (++i$7; i$7 < len && countsAsLeft.test(types[i$7]); ++i$7) {}
	        order.push(new BidiSpan(0, start, i$7));
	      } else {
	        var pos = i$7, at = order.length;
	        for (++i$7; i$7 < len && types[i$7] != "L"; ++i$7) {}
	        for (var j$2 = pos; j$2 < i$7;) {
	          if (countsAsNum.test(types[j$2])) {
	            if (pos < j$2) { order.splice(at, 0, new BidiSpan(1, pos, j$2)); }
	            var nstart = j$2;
	            for (++j$2; j$2 < i$7 && countsAsNum.test(types[j$2]); ++j$2) {}
	            order.splice(at, 0, new BidiSpan(2, nstart, j$2));
	            pos = j$2;
	          } else { ++j$2; }
	        }
	        if (pos < i$7) { order.splice(at, 0, new BidiSpan(1, pos, i$7)); }
	      }
	    }
	    if (direction == "ltr") {
	      if (order[0].level == 1 && (m = str.match(/^\s+/))) {
	        order[0].from = m[0].length;
	        order.unshift(new BidiSpan(0, 0, m[0].length));
	      }
	      if (lst(order).level == 1 && (m = str.match(/\s+$/))) {
	        lst(order).to -= m[0].length;
	        order.push(new BidiSpan(0, len - m[0].length, len));
	      }
	    }

	    return direction == "rtl" ? order.reverse() : order
	  }
	})();

	// Get the bidi ordering for the given line (and cache it). Returns
	// false for lines that are fully left-to-right, and an array of
	// BidiSpan objects otherwise.
	function getOrder(line, direction) {
	  var order = line.order;
	  if (order == null) { order = line.order = bidiOrdering(line.text, direction); }
	  return order
	}

	// EVENT HANDLING

	// Lightweight event framework. on/off also work on DOM nodes,
	// registering native DOM handlers.

	var noHandlers = [];

	var on = function(emitter, type, f) {
	  if (emitter.addEventListener) {
	    emitter.addEventListener(type, f, false);
	  } else if (emitter.attachEvent) {
	    emitter.attachEvent("on" + type, f);
	  } else {
	    var map$$1 = emitter._handlers || (emitter._handlers = {});
	    map$$1[type] = (map$$1[type] || noHandlers).concat(f);
	  }
	};

	function getHandlers(emitter, type) {
	  return emitter._handlers && emitter._handlers[type] || noHandlers
	}

	function off(emitter, type, f) {
	  if (emitter.removeEventListener) {
	    emitter.removeEventListener(type, f, false);
	  } else if (emitter.detachEvent) {
	    emitter.detachEvent("on" + type, f);
	  } else {
	    var map$$1 = emitter._handlers, arr = map$$1 && map$$1[type];
	    if (arr) {
	      var index = indexOf(arr, f);
	      if (index > -1)
	        { map$$1[type] = arr.slice(0, index).concat(arr.slice(index + 1)); }
	    }
	  }
	}

	function signal(emitter, type /*, values...*/) {
	  var handlers = getHandlers(emitter, type);
	  if (!handlers.length) { return }
	  var args = Array.prototype.slice.call(arguments, 2);
	  for (var i = 0; i < handlers.length; ++i) { handlers[i].apply(null, args); }
	}

	// The DOM events that CodeMirror handles can be overridden by
	// registering a (non-DOM) handler on the editor for the event name,
	// and preventDefault-ing the event in that handler.
	function signalDOMEvent(cm, e, override) {
	  if (typeof e == "string")
	    { e = {type: e, preventDefault: function() { this.defaultPrevented = true; }}; }
	  signal(cm, override || e.type, cm, e);
	  return e_defaultPrevented(e) || e.codemirrorIgnore
	}

	function signalCursorActivity(cm) {
	  var arr = cm._handlers && cm._handlers.cursorActivity;
	  if (!arr) { return }
	  var set = cm.curOp.cursorActivityHandlers || (cm.curOp.cursorActivityHandlers = []);
	  for (var i = 0; i < arr.length; ++i) { if (indexOf(set, arr[i]) == -1)
	    { set.push(arr[i]); } }
	}

	function hasHandler(emitter, type) {
	  return getHandlers(emitter, type).length > 0
	}

	// Add on and off methods to a constructor's prototype, to make
	// registering events on such objects more convenient.
	function eventMixin(ctor) {
	  ctor.prototype.on = function(type, f) {on(this, type, f);};
	  ctor.prototype.off = function(type, f) {off(this, type, f);};
	}

	// Due to the fact that we still support jurassic IE versions, some
	// compatibility wrappers are needed.

	function e_preventDefault(e) {
	  if (e.preventDefault) { e.preventDefault(); }
	  else { e.returnValue = false; }
	}
	function e_stopPropagation(e) {
	  if (e.stopPropagation) { e.stopPropagation(); }
	  else { e.cancelBubble = true; }
	}
	function e_defaultPrevented(e) {
	  return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == false
	}
	function e_stop(e) {e_preventDefault(e); e_stopPropagation(e);}

	function e_target(e) {return e.target || e.srcElement}
	function e_button(e) {
	  var b = e.which;
	  if (b == null) {
	    if (e.button & 1) { b = 1; }
	    else if (e.button & 2) { b = 3; }
	    else if (e.button & 4) { b = 2; }
	  }
	  if (mac && e.ctrlKey && b == 1) { b = 3; }
	  return b
	}

	// Detect drag-and-drop
	var dragAndDrop = function() {
	  // There is *some* kind of drag-and-drop support in IE6-8, but I
	  // couldn't get it to work yet.
	  if (ie && ie_version < 9) { return false }
	  var div = elt('div');
	  return "draggable" in div || "dragDrop" in div
	}();

	var zwspSupported;
	function zeroWidthElement(measure) {
	  if (zwspSupported == null) {
	    var test = elt("span", "\u200b");
	    removeChildrenAndAdd(measure, elt("span", [test, document.createTextNode("x")]));
	    if (measure.firstChild.offsetHeight != 0)
	      { zwspSupported = test.offsetWidth <= 1 && test.offsetHeight > 2 && !(ie && ie_version < 8); }
	  }
	  var node = zwspSupported ? elt("span", "\u200b") :
	    elt("span", "\u00a0", null, "display: inline-block; width: 1px; margin-right: -1px");
	  node.setAttribute("cm-text", "");
	  return node
	}

	// Feature-detect IE's crummy client rect reporting for bidi text
	var badBidiRects;
	function hasBadBidiRects(measure) {
	  if (badBidiRects != null) { return badBidiRects }
	  var txt = removeChildrenAndAdd(measure, document.createTextNode("A\u062eA"));
	  var r0 = range(txt, 0, 1).getBoundingClientRect();
	  var r1 = range(txt, 1, 2).getBoundingClientRect();
	  removeChildren(measure);
	  if (!r0 || r0.left == r0.right) { return false } // Safari returns null in some cases (#2780)
	  return badBidiRects = (r1.right - r0.right < 3)
	}

	// See if "".split is the broken IE version, if so, provide an
	// alternative way to split lines.
	var splitLinesAuto = "\n\nb".split(/\n/).length != 3 ? function (string) {
	  var pos = 0, result = [], l = string.length;
	  while (pos <= l) {
	    var nl = string.indexOf("\n", pos);
	    if (nl == -1) { nl = string.length; }
	    var line = string.slice(pos, string.charAt(nl - 1) == "\r" ? nl - 1 : nl);
	    var rt = line.indexOf("\r");
	    if (rt != -1) {
	      result.push(line.slice(0, rt));
	      pos += rt + 1;
	    } else {
	      result.push(line);
	      pos = nl + 1;
	    }
	  }
	  return result
	} : function (string) { return string.split(/\r\n?|\n/); };

	var hasSelection = window.getSelection ? function (te) {
	  try { return te.selectionStart != te.selectionEnd }
	  catch(e) { return false }
	} : function (te) {
	  var range$$1;
	  try {range$$1 = te.ownerDocument.selection.createRange();}
	  catch(e) {}
	  if (!range$$1 || range$$1.parentElement() != te) { return false }
	  return range$$1.compareEndPoints("StartToEnd", range$$1) != 0
	};

	var hasCopyEvent = (function () {
	  var e = elt("div");
	  if ("oncopy" in e) { return true }
	  e.setAttribute("oncopy", "return;");
	  return typeof e.oncopy == "function"
	})();

	var badZoomedRects = null;
	function hasBadZoomedRects(measure) {
	  if (badZoomedRects != null) { return badZoomedRects }
	  var node = removeChildrenAndAdd(measure, elt("span", "x"));
	  var normal = node.getBoundingClientRect();
	  var fromRange = range(node, 0, 1).getBoundingClientRect();
	  return badZoomedRects = Math.abs(normal.left - fromRange.left) > 1
	}

	// Known modes, by name and by MIME
	var modes = {};
	var mimeModes = {};

	// Extra arguments are stored as the mode's dependencies, which is
	// used by (legacy) mechanisms like loadmode.js to automatically
	// load a mode. (Preferred mechanism is the require/define calls.)
	function defineMode(name, mode) {
	  if (arguments.length > 2)
	    { mode.dependencies = Array.prototype.slice.call(arguments, 2); }
	  modes[name] = mode;
	}

	function defineMIME(mime, spec) {
	  mimeModes[mime] = spec;
	}

	// Given a MIME type, a {name, ...options} config object, or a name
	// string, return a mode config object.
	function resolveMode(spec) {
	  if (typeof spec == "string" && mimeModes.hasOwnProperty(spec)) {
	    spec = mimeModes[spec];
	  } else if (spec && typeof spec.name == "string" && mimeModes.hasOwnProperty(spec.name)) {
	    var found = mimeModes[spec.name];
	    if (typeof found == "string") { found = {name: found}; }
	    spec = createObj(found, spec);
	    spec.name = found.name;
	  } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec)) {
	    return resolveMode("application/xml")
	  } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(spec)) {
	    return resolveMode("application/json")
	  }
	  if (typeof spec == "string") { return {name: spec} }
	  else { return spec || {name: "null"} }
	}

	// Given a mode spec (anything that resolveMode accepts), find and
	// initialize an actual mode object.
	function getMode(options, spec) {
	  spec = resolveMode(spec);
	  var mfactory = modes[spec.name];
	  if (!mfactory) { return getMode(options, "text/plain") }
	  var modeObj = mfactory(options, spec);
	  if (modeExtensions.hasOwnProperty(spec.name)) {
	    var exts = modeExtensions[spec.name];
	    for (var prop in exts) {
	      if (!exts.hasOwnProperty(prop)) { continue }
	      if (modeObj.hasOwnProperty(prop)) { modeObj["_" + prop] = modeObj[prop]; }
	      modeObj[prop] = exts[prop];
	    }
	  }
	  modeObj.name = spec.name;
	  if (spec.helperType) { modeObj.helperType = spec.helperType; }
	  if (spec.modeProps) { for (var prop$1 in spec.modeProps)
	    { modeObj[prop$1] = spec.modeProps[prop$1]; } }

	  return modeObj
	}

	// This can be used to attach properties to mode objects from
	// outside the actual mode definition.
	var modeExtensions = {};
	function extendMode(mode, properties) {
	  var exts = modeExtensions.hasOwnProperty(mode) ? modeExtensions[mode] : (modeExtensions[mode] = {});
	  copyObj(properties, exts);
	}

	function copyState(mode, state) {
	  if (state === true) { return state }
	  if (mode.copyState) { return mode.copyState(state) }
	  var nstate = {};
	  for (var n in state) {
	    var val = state[n];
	    if (val instanceof Array) { val = val.concat([]); }
	    nstate[n] = val;
	  }
	  return nstate
	}

	// Given a mode and a state (for that mode), find the inner mode and
	// state at the position that the state refers to.
	function innerMode(mode, state) {
	  var info;
	  while (mode.innerMode) {
	    info = mode.innerMode(state);
	    if (!info || info.mode == mode) { break }
	    state = info.state;
	    mode = info.mode;
	  }
	  return info || {mode: mode, state: state}
	}

	function startState(mode, a1, a2) {
	  return mode.startState ? mode.startState(a1, a2) : true
	}

	// STRING STREAM

	// Fed to the mode parsers, provides helper functions to make
	// parsers more succinct.

	var StringStream = function(string, tabSize, lineOracle) {
	  this.pos = this.start = 0;
	  this.string = string;
	  this.tabSize = tabSize || 8;
	  this.lastColumnPos = this.lastColumnValue = 0;
	  this.lineStart = 0;
	  this.lineOracle = lineOracle;
	};

	StringStream.prototype.eol = function () {return this.pos >= this.string.length};
	StringStream.prototype.sol = function () {return this.pos == this.lineStart};
	StringStream.prototype.peek = function () {return this.string.charAt(this.pos) || undefined};
	StringStream.prototype.next = function () {
	  if (this.pos < this.string.length)
	    { return this.string.charAt(this.pos++) }
	};
	StringStream.prototype.eat = function (match) {
	  var ch = this.string.charAt(this.pos);
	  var ok;
	  if (typeof match == "string") { ok = ch == match; }
	  else { ok = ch && (match.test ? match.test(ch) : match(ch)); }
	  if (ok) {++this.pos; return ch}
	};
	StringStream.prototype.eatWhile = function (match) {
	  var start = this.pos;
	  while (this.eat(match)){}
	  return this.pos > start
	};
	StringStream.prototype.eatSpace = function () {
	    var this$1 = this;

	  var start = this.pos;
	  while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) { ++this$1.pos; }
	  return this.pos > start
	};
	StringStream.prototype.skipToEnd = function () {this.pos = this.string.length;};
	StringStream.prototype.skipTo = function (ch) {
	  var found = this.string.indexOf(ch, this.pos);
	  if (found > -1) {this.pos = found; return true}
	};
	StringStream.prototype.backUp = function (n) {this.pos -= n;};
	StringStream.prototype.column = function () {
	  if (this.lastColumnPos < this.start) {
	    this.lastColumnValue = countColumn(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
	    this.lastColumnPos = this.start;
	  }
	  return this.lastColumnValue - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0)
	};
	StringStream.prototype.indentation = function () {
	  return countColumn(this.string, null, this.tabSize) -
	    (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0)
	};
	StringStream.prototype.match = function (pattern, consume, caseInsensitive) {
	  if (typeof pattern == "string") {
	    var cased = function (str) { return caseInsensitive ? str.toLowerCase() : str; };
	    var substr = this.string.substr(this.pos, pattern.length);
	    if (cased(substr) == cased(pattern)) {
	      if (consume !== false) { this.pos += pattern.length; }
	      return true
	    }
	  } else {
	    var match = this.string.slice(this.pos).match(pattern);
	    if (match && match.index > 0) { return null }
	    if (match && consume !== false) { this.pos += match[0].length; }
	    return match
	  }
	};
	StringStream.prototype.current = function (){return this.string.slice(this.start, this.pos)};
	StringStream.prototype.hideFirstChars = function (n, inner) {
	  this.lineStart += n;
	  try { return inner() }
	  finally { this.lineStart -= n; }
	};
	StringStream.prototype.lookAhead = function (n) {
	  var oracle = this.lineOracle;
	  return oracle && oracle.lookAhead(n)
	};
	StringStream.prototype.baseToken = function () {
	  var oracle = this.lineOracle;
	  return oracle && oracle.baseToken(this.pos)
	};

	var SavedContext = function(state, lookAhead) {
	  this.state = state;
	  this.lookAhead = lookAhead;
	};

	var Context = function(doc, state, line, lookAhead) {
	  this.state = state;
	  this.doc = doc;
	  this.line = line;
	  this.maxLookAhead = lookAhead || 0;
	  this.baseTokens = null;
	  this.baseTokenPos = 1;
	};

	Context.prototype.lookAhead = function (n) {
	  var line = this.doc.getLine(this.line + n);
	  if (line != null && n > this.maxLookAhead) { this.maxLookAhead = n; }
	  return line
	};

	Context.prototype.baseToken = function (n) {
	    var this$1 = this;

	  if (!this.baseTokens) { return null }
	  while (this.baseTokens[this.baseTokenPos] <= n)
	    { this$1.baseTokenPos += 2; }
	  var type = this.baseTokens[this.baseTokenPos + 1];
	  return {type: type && type.replace(/( |^)overlay .*/, ""),
	          size: this.baseTokens[this.baseTokenPos] - n}
	};

	Context.prototype.nextLine = function () {
	  this.line++;
	  if (this.maxLookAhead > 0) { this.maxLookAhead--; }
	};

	Context.fromSaved = function (doc, saved, line) {
	  if (saved instanceof SavedContext)
	    { return new Context(doc, copyState(doc.mode, saved.state), line, saved.lookAhead) }
	  else
	    { return new Context(doc, copyState(doc.mode, saved), line) }
	};

	Context.prototype.save = function (copy) {
	  var state = copy !== false ? copyState(this.doc.mode, this.state) : this.state;
	  return this.maxLookAhead > 0 ? new SavedContext(state, this.maxLookAhead) : state
	};


	// Compute a style array (an array starting with a mode generation
	// -- for invalidation -- followed by pairs of end positions and
	// style strings), which is used to highlight the tokens on the
	// line.
	function highlightLine(cm, line, context, forceToEnd) {
	  // A styles array always starts with a number identifying the
	  // mode/overlays that it is based on (for easy invalidation).
	  var st = [cm.state.modeGen], lineClasses = {};
	  // Compute the base array of styles
	  runMode(cm, line.text, cm.doc.mode, context, function (end, style) { return st.push(end, style); },
	          lineClasses, forceToEnd);
	  var state = context.state;

	  // Run overlays, adjust style array.
	  var loop = function ( o ) {
	    context.baseTokens = st;
	    var overlay = cm.state.overlays[o], i = 1, at = 0;
	    context.state = true;
	    runMode(cm, line.text, overlay.mode, context, function (end, style) {
	      var start = i;
	      // Ensure there's a token end at the current position, and that i points at it
	      while (at < end) {
	        var i_end = st[i];
	        if (i_end > end)
	          { st.splice(i, 1, end, st[i+1], i_end); }
	        i += 2;
	        at = Math.min(end, i_end);
	      }
	      if (!style) { return }
	      if (overlay.opaque) {
	        st.splice(start, i - start, end, "overlay " + style);
	        i = start + 2;
	      } else {
	        for (; start < i; start += 2) {
	          var cur = st[start+1];
	          st[start+1] = (cur ? cur + " " : "") + "overlay " + style;
	        }
	      }
	    }, lineClasses);
	    context.state = state;
	    context.baseTokens = null;
	    context.baseTokenPos = 1;
	  };

	  for (var o = 0; o < cm.state.overlays.length; ++o) loop( o );

	  return {styles: st, classes: lineClasses.bgClass || lineClasses.textClass ? lineClasses : null}
	}

	function getLineStyles(cm, line, updateFrontier) {
	  if (!line.styles || line.styles[0] != cm.state.modeGen) {
	    var context = getContextBefore(cm, lineNo(line));
	    var resetState = line.text.length > cm.options.maxHighlightLength && copyState(cm.doc.mode, context.state);
	    var result = highlightLine(cm, line, context);
	    if (resetState) { context.state = resetState; }
	    line.stateAfter = context.save(!resetState);
	    line.styles = result.styles;
	    if (result.classes) { line.styleClasses = result.classes; }
	    else if (line.styleClasses) { line.styleClasses = null; }
	    if (updateFrontier === cm.doc.highlightFrontier)
	      { cm.doc.modeFrontier = Math.max(cm.doc.modeFrontier, ++cm.doc.highlightFrontier); }
	  }
	  return line.styles
	}

	function getContextBefore(cm, n, precise) {
	  var doc = cm.doc, display = cm.display;
	  if (!doc.mode.startState) { return new Context(doc, true, n) }
	  var start = findStartLine(cm, n, precise);
	  var saved = start > doc.first && getLine(doc, start - 1).stateAfter;
	  var context = saved ? Context.fromSaved(doc, saved, start) : new Context(doc, startState(doc.mode), start);

	  doc.iter(start, n, function (line) {
	    processLine(cm, line.text, context);
	    var pos = context.line;
	    line.stateAfter = pos == n - 1 || pos % 5 == 0 || pos >= display.viewFrom && pos < display.viewTo ? context.save() : null;
	    context.nextLine();
	  });
	  if (precise) { doc.modeFrontier = context.line; }
	  return context
	}

	// Lightweight form of highlight -- proceed over this line and
	// update state, but don't save a style array. Used for lines that
	// aren't currently visible.
	function processLine(cm, text, context, startAt) {
	  var mode = cm.doc.mode;
	  var stream = new StringStream(text, cm.options.tabSize, context);
	  stream.start = stream.pos = startAt || 0;
	  if (text == "") { callBlankLine(mode, context.state); }
	  while (!stream.eol()) {
	    readToken(mode, stream, context.state);
	    stream.start = stream.pos;
	  }
	}

	function callBlankLine(mode, state) {
	  if (mode.blankLine) { return mode.blankLine(state) }
	  if (!mode.innerMode) { return }
	  var inner = innerMode(mode, state);
	  if (inner.mode.blankLine) { return inner.mode.blankLine(inner.state) }
	}

	function readToken(mode, stream, state, inner) {
	  for (var i = 0; i < 10; i++) {
	    if (inner) { inner[0] = innerMode(mode, state).mode; }
	    var style = mode.token(stream, state);
	    if (stream.pos > stream.start) { return style }
	  }
	  throw new Error("Mode " + mode.name + " failed to advance stream.")
	}

	var Token = function(stream, type, state) {
	  this.start = stream.start; this.end = stream.pos;
	  this.string = stream.current();
	  this.type = type || null;
	  this.state = state;
	};

	// Utility for getTokenAt and getLineTokens
	function takeToken(cm, pos, precise, asArray) {
	  var doc = cm.doc, mode = doc.mode, style;
	  pos = clipPos(doc, pos);
	  var line = getLine(doc, pos.line), context = getContextBefore(cm, pos.line, precise);
	  var stream = new StringStream(line.text, cm.options.tabSize, context), tokens;
	  if (asArray) { tokens = []; }
	  while ((asArray || stream.pos < pos.ch) && !stream.eol()) {
	    stream.start = stream.pos;
	    style = readToken(mode, stream, context.state);
	    if (asArray) { tokens.push(new Token(stream, style, copyState(doc.mode, context.state))); }
	  }
	  return asArray ? tokens : new Token(stream, style, context.state)
	}

	function extractLineClasses(type, output) {
	  if (type) { for (;;) {
	    var lineClass = type.match(/(?:^|\s+)line-(background-)?(\S+)/);
	    if (!lineClass) { break }
	    type = type.slice(0, lineClass.index) + type.slice(lineClass.index + lineClass[0].length);
	    var prop = lineClass[1] ? "bgClass" : "textClass";
	    if (output[prop] == null)
	      { output[prop] = lineClass[2]; }
	    else if (!(new RegExp("(?:^|\s)" + lineClass[2] + "(?:$|\s)")).test(output[prop]))
	      { output[prop] += " " + lineClass[2]; }
	  } }
	  return type
	}

	// Run the given mode's parser over a line, calling f for each token.
	function runMode(cm, text, mode, context, f, lineClasses, forceToEnd) {
	  var flattenSpans = mode.flattenSpans;
	  if (flattenSpans == null) { flattenSpans = cm.options.flattenSpans; }
	  var curStart = 0, curStyle = null;
	  var stream = new StringStream(text, cm.options.tabSize, context), style;
	  var inner = cm.options.addModeClass && [null];
	  if (text == "") { extractLineClasses(callBlankLine(mode, context.state), lineClasses); }
	  while (!stream.eol()) {
	    if (stream.pos > cm.options.maxHighlightLength) {
	      flattenSpans = false;
	      if (forceToEnd) { processLine(cm, text, context, stream.pos); }
	      stream.pos = text.length;
	      style = null;
	    } else {
	      style = extractLineClasses(readToken(mode, stream, context.state, inner), lineClasses);
	    }
	    if (inner) {
	      var mName = inner[0].name;
	      if (mName) { style = "m-" + (style ? mName + " " + style : mName); }
	    }
	    if (!flattenSpans || curStyle != style) {
	      while (curStart < stream.start) {
	        curStart = Math.min(stream.start, curStart + 5000);
	        f(curStart, curStyle);
	      }
	      curStyle = style;
	    }
	    stream.start = stream.pos;
	  }
	  while (curStart < stream.pos) {
	    // Webkit seems to refuse to render text nodes longer than 57444
	    // characters, and returns inaccurate measurements in nodes
	    // starting around 5000 chars.
	    var pos = Math.min(stream.pos, curStart + 5000);
	    f(pos, curStyle);
	    curStart = pos;
	  }
	}

	// Finds the line to start with when starting a parse. Tries to
	// find a line with a stateAfter, so that it can start with a
	// valid state. If that fails, it returns the line with the
	// smallest indentation, which tends to need the least context to
	// parse correctly.
	function findStartLine(cm, n, precise) {
	  var minindent, minline, doc = cm.doc;
	  var lim = precise ? -1 : n - (cm.doc.mode.innerMode ? 1000 : 100);
	  for (var search = n; search > lim; --search) {
	    if (search <= doc.first) { return doc.first }
	    var line = getLine(doc, search - 1), after = line.stateAfter;
	    if (after && (!precise || search + (after instanceof SavedContext ? after.lookAhead : 0) <= doc.modeFrontier))
	      { return search }
	    var indented = countColumn(line.text, null, cm.options.tabSize);
	    if (minline == null || minindent > indented) {
	      minline = search - 1;
	      minindent = indented;
	    }
	  }
	  return minline
	}

	function retreatFrontier(doc, n) {
	  doc.modeFrontier = Math.min(doc.modeFrontier, n);
	  if (doc.highlightFrontier < n - 10) { return }
	  var start = doc.first;
	  for (var line = n - 1; line > start; line--) {
	    var saved = getLine(doc, line).stateAfter;
	    // change is on 3
	    // state on line 1 looked ahead 2 -- so saw 3
	    // test 1 + 2 < 3 should cover this
	    if (saved && (!(saved instanceof SavedContext) || line + saved.lookAhead < n)) {
	      start = line + 1;
	      break
	    }
	  }
	  doc.highlightFrontier = Math.min(doc.highlightFrontier, start);
	}

	// LINE DATA STRUCTURE

	// Line objects. These hold state related to a line, including
	// highlighting info (the styles array).
	var Line = function(text, markedSpans, estimateHeight) {
	  this.text = text;
	  attachMarkedSpans(this, markedSpans);
	  this.height = estimateHeight ? estimateHeight(this) : 1;
	};

	Line.prototype.lineNo = function () { return lineNo(this) };
	eventMixin(Line);

	// Change the content (text, markers) of a line. Automatically
	// invalidates cached information and tries to re-estimate the
	// line's height.
	function updateLine(line, text, markedSpans, estimateHeight) {
	  line.text = text;
	  if (line.stateAfter) { line.stateAfter = null; }
	  if (line.styles) { line.styles = null; }
	  if (line.order != null) { line.order = null; }
	  detachMarkedSpans(line);
	  attachMarkedSpans(line, markedSpans);
	  var estHeight = estimateHeight ? estimateHeight(line) : 1;
	  if (estHeight != line.height) { updateLineHeight(line, estHeight); }
	}

	// Detach a line from the document tree and its markers.
	function cleanUpLine(line) {
	  line.parent = null;
	  detachMarkedSpans(line);
	}

	// Convert a style as returned by a mode (either null, or a string
	// containing one or more styles) to a CSS style. This is cached,
	// and also looks for line-wide styles.
	var styleToClassCache = {};
	var styleToClassCacheWithMode = {};
	function interpretTokenStyle(style, options) {
	  if (!style || /^\s*$/.test(style)) { return null }
	  var cache = options.addModeClass ? styleToClassCacheWithMode : styleToClassCache;
	  return cache[style] ||
	    (cache[style] = style.replace(/\S+/g, "cm-$&"))
	}

	// Render the DOM representation of the text of a line. Also builds
	// up a 'line map', which points at the DOM nodes that represent
	// specific stretches of text, and is used by the measuring code.
	// The returned object contains the DOM node, this map, and
	// information about line-wide styles that were set by the mode.
	function buildLineContent(cm, lineView) {
	  // The padding-right forces the element to have a 'border', which
	  // is needed on Webkit to be able to get line-level bounding
	  // rectangles for it (in measureChar).
	  var content = eltP("span", null, null, webkit ? "padding-right: .1px" : null);
	  var builder = {pre: eltP("pre", [content], "CodeMirror-line"), content: content,
	                 col: 0, pos: 0, cm: cm,
	                 trailingSpace: false,
	                 splitSpaces: (ie || webkit) && cm.getOption("lineWrapping")};
	  lineView.measure = {};

	  // Iterate over the logical lines that make up this visual line.
	  for (var i = 0; i <= (lineView.rest ? lineView.rest.length : 0); i++) {
	    var line = i ? lineView.rest[i - 1] : lineView.line, order = (void 0);
	    builder.pos = 0;
	    builder.addToken = buildToken;
	    // Optionally wire in some hacks into the token-rendering
	    // algorithm, to deal with browser quirks.
	    if (hasBadBidiRects(cm.display.measure) && (order = getOrder(line, cm.doc.direction)))
	      { builder.addToken = buildTokenBadBidi(builder.addToken, order); }
	    builder.map = [];
	    var allowFrontierUpdate = lineView != cm.display.externalMeasured && lineNo(line);
	    insertLineContent(line, builder, getLineStyles(cm, line, allowFrontierUpdate));
	    if (line.styleClasses) {
	      if (line.styleClasses.bgClass)
	        { builder.bgClass = joinClasses(line.styleClasses.bgClass, builder.bgClass || ""); }
	      if (line.styleClasses.textClass)
	        { builder.textClass = joinClasses(line.styleClasses.textClass, builder.textClass || ""); }
	    }

	    // Ensure at least a single node is present, for measuring.
	    if (builder.map.length == 0)
	      { builder.map.push(0, 0, builder.content.appendChild(zeroWidthElement(cm.display.measure))); }

	    // Store the map and a cache object for the current logical line
	    if (i == 0) {
	      lineView.measure.map = builder.map;
	      lineView.measure.cache = {};
	    } else {
	      (lineView.measure.maps || (lineView.measure.maps = [])).push(builder.map)
	      ;(lineView.measure.caches || (lineView.measure.caches = [])).push({});
	    }
	  }

	  // See issue #2901
	  if (webkit) {
	    var last = builder.content.lastChild;
	    if (/\bcm-tab\b/.test(last.className) || (last.querySelector && last.querySelector(".cm-tab")))
	      { builder.content.className = "cm-tab-wrap-hack"; }
	  }

	  signal(cm, "renderLine", cm, lineView.line, builder.pre);
	  if (builder.pre.className)
	    { builder.textClass = joinClasses(builder.pre.className, builder.textClass || ""); }

	  return builder
	}

	function defaultSpecialCharPlaceholder(ch) {
	  var token = elt("span", "\u2022", "cm-invalidchar");
	  token.title = "\\u" + ch.charCodeAt(0).toString(16);
	  token.setAttribute("aria-label", token.title);
	  return token
	}

	// Build up the DOM representation for a single token, and add it to
	// the line map. Takes care to render special characters separately.
	function buildToken(builder, text, style, startStyle, endStyle, title, css) {
	  if (!text) { return }
	  var displayText = builder.splitSpaces ? splitSpaces(text, builder.trailingSpace) : text;
	  var special = builder.cm.state.specialChars, mustWrap = false;
	  var content;
	  if (!special.test(text)) {
	    builder.col += text.length;
	    content = document.createTextNode(displayText);
	    builder.map.push(builder.pos, builder.pos + text.length, content);
	    if (ie && ie_version < 9) { mustWrap = true; }
	    builder.pos += text.length;
	  } else {
	    content = document.createDocumentFragment();
	    var pos = 0;
	    while (true) {
	      special.lastIndex = pos;
	      var m = special.exec(text);
	      var skipped = m ? m.index - pos : text.length - pos;
	      if (skipped) {
	        var txt = document.createTextNode(displayText.slice(pos, pos + skipped));
	        if (ie && ie_version < 9) { content.appendChild(elt("span", [txt])); }
	        else { content.appendChild(txt); }
	        builder.map.push(builder.pos, builder.pos + skipped, txt);
	        builder.col += skipped;
	        builder.pos += skipped;
	      }
	      if (!m) { break }
	      pos += skipped + 1;
	      var txt$1 = (void 0);
	      if (m[0] == "\t") {
	        var tabSize = builder.cm.options.tabSize, tabWidth = tabSize - builder.col % tabSize;
	        txt$1 = content.appendChild(elt("span", spaceStr(tabWidth), "cm-tab"));
	        txt$1.setAttribute("role", "presentation");
	        txt$1.setAttribute("cm-text", "\t");
	        builder.col += tabWidth;
	      } else if (m[0] == "\r" || m[0] == "\n") {
	        txt$1 = content.appendChild(elt("span", m[0] == "\r" ? "\u240d" : "\u2424", "cm-invalidchar"));
	        txt$1.setAttribute("cm-text", m[0]);
	        builder.col += 1;
	      } else {
	        txt$1 = builder.cm.options.specialCharPlaceholder(m[0]);
	        txt$1.setAttribute("cm-text", m[0]);
	        if (ie && ie_version < 9) { content.appendChild(elt("span", [txt$1])); }
	        else { content.appendChild(txt$1); }
	        builder.col += 1;
	      }
	      builder.map.push(builder.pos, builder.pos + 1, txt$1);
	      builder.pos++;
	    }
	  }
	  builder.trailingSpace = displayText.charCodeAt(text.length - 1) == 32;
	  if (style || startStyle || endStyle || mustWrap || css) {
	    var fullStyle = style || "";
	    if (startStyle) { fullStyle += startStyle; }
	    if (endStyle) { fullStyle += endStyle; }
	    var token = elt("span", [content], fullStyle, css);
	    if (title) { token.title = title; }
	    return builder.content.appendChild(token)
	  }
	  builder.content.appendChild(content);
	}

	function splitSpaces(text, trailingBefore) {
	  if (text.length > 1 && !/  /.test(text)) { return text }
	  var spaceBefore = trailingBefore, result = "";
	  for (var i = 0; i < text.length; i++) {
	    var ch = text.charAt(i);
	    if (ch == " " && spaceBefore && (i == text.length - 1 || text.charCodeAt(i + 1) == 32))
	      { ch = "\u00a0"; }
	    result += ch;
	    spaceBefore = ch == " ";
	  }
	  return result
	}

	// Work around nonsense dimensions being reported for stretches of
	// right-to-left text.
	function buildTokenBadBidi(inner, order) {
	  return function (builder, text, style, startStyle, endStyle, title, css) {
	    style = style ? style + " cm-force-border" : "cm-force-border";
	    var start = builder.pos, end = start + text.length;
	    for (;;) {
	      // Find the part that overlaps with the start of this text
	      var part = (void 0);
	      for (var i = 0; i < order.length; i++) {
	        part = order[i];
	        if (part.to > start && part.from <= start) { break }
	      }
	      if (part.to >= end) { return inner(builder, text, style, startStyle, endStyle, title, css) }
	      inner(builder, text.slice(0, part.to - start), style, startStyle, null, title, css);
	      startStyle = null;
	      text = text.slice(part.to - start);
	      start = part.to;
	    }
	  }
	}

	function buildCollapsedSpan(builder, size, marker, ignoreWidget) {
	  var widget = !ignoreWidget && marker.widgetNode;
	  if (widget) { builder.map.push(builder.pos, builder.pos + size, widget); }
	  if (!ignoreWidget && builder.cm.display.input.needsContentAttribute) {
	    if (!widget)
	      { widget = builder.content.appendChild(document.createElement("span")); }
	    widget.setAttribute("cm-marker", marker.id);
	  }
	  if (widget) {
	    builder.cm.display.input.setUneditable(widget);
	    builder.content.appendChild(widget);
	  }
	  builder.pos += size;
	  builder.trailingSpace = false;
	}

	// Outputs a number of spans to make up a line, taking highlighting
	// and marked text into account.
	function insertLineContent(line, builder, styles) {
	  var spans = line.markedSpans, allText = line.text, at = 0;
	  if (!spans) {
	    for (var i$1 = 1; i$1 < styles.length; i$1+=2)
	      { builder.addToken(builder, allText.slice(at, at = styles[i$1]), interpretTokenStyle(styles[i$1+1], builder.cm.options)); }
	    return
	  }

	  var len = allText.length, pos = 0, i = 1, text = "", style, css;
	  var nextChange = 0, spanStyle, spanEndStyle, spanStartStyle, title, collapsed;
	  for (;;) {
	    if (nextChange == pos) { // Update current marker set
	      spanStyle = spanEndStyle = spanStartStyle = title = css = "";
	      collapsed = null; nextChange = Infinity;
	      var foundBookmarks = [], endStyles = (void 0);
	      for (var j = 0; j < spans.length; ++j) {
	        var sp = spans[j], m = sp.marker;
	        if (m.type == "bookmark" && sp.from == pos && m.widgetNode) {
	          foundBookmarks.push(m);
	        } else if (sp.from <= pos && (sp.to == null || sp.to > pos || m.collapsed && sp.to == pos && sp.from == pos)) {
	          if (sp.to != null && sp.to != pos && nextChange > sp.to) {
	            nextChange = sp.to;
	            spanEndStyle = "";
	          }
	          if (m.className) { spanStyle += " " + m.className; }
	          if (m.css) { css = (css ? css + ";" : "") + m.css; }
	          if (m.startStyle && sp.from == pos) { spanStartStyle += " " + m.startStyle; }
	          if (m.endStyle && sp.to == nextChange) { (endStyles || (endStyles = [])).push(m.endStyle, sp.to); }
	          if (m.title && !title) { title = m.title; }
	          if (m.collapsed && (!collapsed || compareCollapsedMarkers(collapsed.marker, m) < 0))
	            { collapsed = sp; }
	        } else if (sp.from > pos && nextChange > sp.from) {
	          nextChange = sp.from;
	        }
	      }
	      if (endStyles) { for (var j$1 = 0; j$1 < endStyles.length; j$1 += 2)
	        { if (endStyles[j$1 + 1] == nextChange) { spanEndStyle += " " + endStyles[j$1]; } } }

	      if (!collapsed || collapsed.from == pos) { for (var j$2 = 0; j$2 < foundBookmarks.length; ++j$2)
	        { buildCollapsedSpan(builder, 0, foundBookmarks[j$2]); } }
	      if (collapsed && (collapsed.from || 0) == pos) {
	        buildCollapsedSpan(builder, (collapsed.to == null ? len + 1 : collapsed.to) - pos,
	                           collapsed.marker, collapsed.from == null);
	        if (collapsed.to == null) { return }
	        if (collapsed.to == pos) { collapsed = false; }
	      }
	    }
	    if (pos >= len) { break }

	    var upto = Math.min(len, nextChange);
	    while (true) {
	      if (text) {
	        var end = pos + text.length;
	        if (!collapsed) {
	          var tokenText = end > upto ? text.slice(0, upto - pos) : text;
	          builder.addToken(builder, tokenText, style ? style + spanStyle : spanStyle,
	                           spanStartStyle, pos + tokenText.length == nextChange ? spanEndStyle : "", title, css);
	        }
	        if (end >= upto) {text = text.slice(upto - pos); pos = upto; break}
	        pos = end;
	        spanStartStyle = "";
	      }
	      text = allText.slice(at, at = styles[i++]);
	      style = interpretTokenStyle(styles[i++], builder.cm.options);
	    }
	  }
	}


	// These objects are used to represent the visible (currently drawn)
	// part of the document. A LineView may correspond to multiple
	// logical lines, if those are connected by collapsed ranges.
	function LineView(doc, line, lineN) {
	  // The starting line
	  this.line = line;
	  // Continuing lines, if any
	  this.rest = visualLineContinued(line);
	  // Number of logical lines in this visual line
	  this.size = this.rest ? lineNo(lst(this.rest)) - lineN + 1 : 1;
	  this.node = this.text = null;
	  this.hidden = lineIsHidden(doc, line);
	}

	// Create a range of LineView objects for the given lines.
	function buildViewArray(cm, from, to) {
	  var array = [], nextPos;
	  for (var pos = from; pos < to; pos = nextPos) {
	    var view = new LineView(cm.doc, getLine(cm.doc, pos), pos);
	    nextPos = pos + view.size;
	    array.push(view);
	  }
	  return array
	}

	var operationGroup = null;

	function pushOperation(op) {
	  if (operationGroup) {
	    operationGroup.ops.push(op);
	  } else {
	    op.ownsGroup = operationGroup = {
	      ops: [op],
	      delayedCallbacks: []
	    };
	  }
	}

	function fireCallbacksForOps(group) {
	  // Calls delayed callbacks and cursorActivity handlers until no
	  // new ones appear
	  var callbacks = group.delayedCallbacks, i = 0;
	  do {
	    for (; i < callbacks.length; i++)
	      { callbacks[i].call(null); }
	    for (var j = 0; j < group.ops.length; j++) {
	      var op = group.ops[j];
	      if (op.cursorActivityHandlers)
	        { while (op.cursorActivityCalled < op.cursorActivityHandlers.length)
	          { op.cursorActivityHandlers[op.cursorActivityCalled++].call(null, op.cm); } }
	    }
	  } while (i < callbacks.length)
	}

	function finishOperation(op, endCb) {
	  var group = op.ownsGroup;
	  if (!group) { return }

	  try { fireCallbacksForOps(group); }
	  finally {
	    operationGroup = null;
	    endCb(group);
	  }
	}

	var orphanDelayedCallbacks = null;

	// Often, we want to signal events at a point where we are in the
	// middle of some work, but don't want the handler to start calling
	// other methods on the editor, which might be in an inconsistent
	// state or simply not expect any other events to happen.
	// signalLater looks whether there are any handlers, and schedules
	// them to be executed when the last operation ends, or, if no
	// operation is active, when a timeout fires.
	function signalLater(emitter, type /*, values...*/) {
	  var arr = getHandlers(emitter, type);
	  if (!arr.length) { return }
	  var args = Array.prototype.slice.call(arguments, 2), list;
	  if (operationGroup) {
	    list = operationGroup.delayedCallbacks;
	  } else if (orphanDelayedCallbacks) {
	    list = orphanDelayedCallbacks;
	  } else {
	    list = orphanDelayedCallbacks = [];
	    setTimeout(fireOrphanDelayed, 0);
	  }
	  var loop = function ( i ) {
	    list.push(function () { return arr[i].apply(null, args); });
	  };

	  for (var i = 0; i < arr.length; ++i)
	    loop( i );
	}

	function fireOrphanDelayed() {
	  var delayed = orphanDelayedCallbacks;
	  orphanDelayedCallbacks = null;
	  for (var i = 0; i < delayed.length; ++i) { delayed[i](); }
	}

	// When an aspect of a line changes, a string is added to
	// lineView.changes. This updates the relevant part of the line's
	// DOM structure.
	function updateLineForChanges(cm, lineView, lineN, dims) {
	  for (var j = 0; j < lineView.changes.length; j++) {
	    var type = lineView.changes[j];
	    if (type == "text") { updateLineText(cm, lineView); }
	    else if (type == "gutter") { updateLineGutter(cm, lineView, lineN, dims); }
	    else if (type == "class") { updateLineClasses(cm, lineView); }
	    else if (type == "widget") { updateLineWidgets(cm, lineView, dims); }
	  }
	  lineView.changes = null;
	}

	// Lines with gutter elements, widgets or a background class need to
	// be wrapped, and have the extra elements added to the wrapper div
	function ensureLineWrapped(lineView) {
	  if (lineView.node == lineView.text) {
	    lineView.node = elt("div", null, null, "position: relative");
	    if (lineView.text.parentNode)
	      { lineView.text.parentNode.replaceChild(lineView.node, lineView.text); }
	    lineView.node.appendChild(lineView.text);
	    if (ie && ie_version < 8) { lineView.node.style.zIndex = 2; }
	  }
	  return lineView.node
	}

	function updateLineBackground(cm, lineView) {
	  var cls = lineView.bgClass ? lineView.bgClass + " " + (lineView.line.bgClass || "") : lineView.line.bgClass;
	  if (cls) { cls += " CodeMirror-linebackground"; }
	  if (lineView.background) {
	    if (cls) { lineView.background.className = cls; }
	    else { lineView.background.parentNode.removeChild(lineView.background); lineView.background = null; }
	  } else if (cls) {
	    var wrap = ensureLineWrapped(lineView);
	    lineView.background = wrap.insertBefore(elt("div", null, cls), wrap.firstChild);
	    cm.display.input.setUneditable(lineView.background);
	  }
	}

	// Wrapper around buildLineContent which will reuse the structure
	// in display.externalMeasured when possible.
	function getLineContent(cm, lineView) {
	  var ext = cm.display.externalMeasured;
	  if (ext && ext.line == lineView.line) {
	    cm.display.externalMeasured = null;
	    lineView.measure = ext.measure;
	    return ext.built
	  }
	  return buildLineContent(cm, lineView)
	}

	// Redraw the line's text. Interacts with the background and text
	// classes because the mode may output tokens that influence these
	// classes.
	function updateLineText(cm, lineView) {
	  var cls = lineView.text.className;
	  var built = getLineContent(cm, lineView);
	  if (lineView.text == lineView.node) { lineView.node = built.pre; }
	  lineView.text.parentNode.replaceChild(built.pre, lineView.text);
	  lineView.text = built.pre;
	  if (built.bgClass != lineView.bgClass || built.textClass != lineView.textClass) {
	    lineView.bgClass = built.bgClass;
	    lineView.textClass = built.textClass;
	    updateLineClasses(cm, lineView);
	  } else if (cls) {
	    lineView.text.className = cls;
	  }
	}

	function updateLineClasses(cm, lineView) {
	  updateLineBackground(cm, lineView);
	  if (lineView.line.wrapClass)
	    { ensureLineWrapped(lineView).className = lineView.line.wrapClass; }
	  else if (lineView.node != lineView.text)
	    { lineView.node.className = ""; }
	  var textClass = lineView.textClass ? lineView.textClass + " " + (lineView.line.textClass || "") : lineView.line.textClass;
	  lineView.text.className = textClass || "";
	}

	function updateLineGutter(cm, lineView, lineN, dims) {
	  if (lineView.gutter) {
	    lineView.node.removeChild(lineView.gutter);
	    lineView.gutter = null;
	  }
	  if (lineView.gutterBackground) {
	    lineView.node.removeChild(lineView.gutterBackground);
	    lineView.gutterBackground = null;
	  }
	  if (lineView.line.gutterClass) {
	    var wrap = ensureLineWrapped(lineView);
	    lineView.gutterBackground = elt("div", null, "CodeMirror-gutter-background " + lineView.line.gutterClass,
	                                    ("left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px; width: " + (dims.gutterTotalWidth) + "px"));
	    cm.display.input.setUneditable(lineView.gutterBackground);
	    wrap.insertBefore(lineView.gutterBackground, lineView.text);
	  }
	  var markers = lineView.line.gutterMarkers;
	  if (cm.options.lineNumbers || markers) {
	    var wrap$1 = ensureLineWrapped(lineView);
	    var gutterWrap = lineView.gutter = elt("div", null, "CodeMirror-gutter-wrapper", ("left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px"));
	    cm.display.input.setUneditable(gutterWrap);
	    wrap$1.insertBefore(gutterWrap, lineView.text);
	    if (lineView.line.gutterClass)
	      { gutterWrap.className += " " + lineView.line.gutterClass; }
	    if (cm.options.lineNumbers && (!markers || !markers["CodeMirror-linenumbers"]))
	      { lineView.lineNumber = gutterWrap.appendChild(
	        elt("div", lineNumberFor(cm.options, lineN),
	            "CodeMirror-linenumber CodeMirror-gutter-elt",
	            ("left: " + (dims.gutterLeft["CodeMirror-linenumbers"]) + "px; width: " + (cm.display.lineNumInnerWidth) + "px"))); }
	    if (markers) { for (var k = 0; k < cm.options.gutters.length; ++k) {
	      var id = cm.options.gutters[k], found = markers.hasOwnProperty(id) && markers[id];
	      if (found)
	        { gutterWrap.appendChild(elt("div", [found], "CodeMirror-gutter-elt",
	                                   ("left: " + (dims.gutterLeft[id]) + "px; width: " + (dims.gutterWidth[id]) + "px"))); }
	    } }
	  }
	}

	function updateLineWidgets(cm, lineView, dims) {
	  if (lineView.alignable) { lineView.alignable = null; }
	  for (var node = lineView.node.firstChild, next = (void 0); node; node = next) {
	    next = node.nextSibling;
	    if (node.className == "CodeMirror-linewidget")
	      { lineView.node.removeChild(node); }
	  }
	  insertLineWidgets(cm, lineView, dims);
	}

	// Build a line's DOM representation from scratch
	function buildLineElement(cm, lineView, lineN, dims) {
	  var built = getLineContent(cm, lineView);
	  lineView.text = lineView.node = built.pre;
	  if (built.bgClass) { lineView.bgClass = built.bgClass; }
	  if (built.textClass) { lineView.textClass = built.textClass; }

	  updateLineClasses(cm, lineView);
	  updateLineGutter(cm, lineView, lineN, dims);
	  insertLineWidgets(cm, lineView, dims);
	  return lineView.node
	}

	// A lineView may contain multiple logical lines (when merged by
	// collapsed spans). The widgets for all of them need to be drawn.
	function insertLineWidgets(cm, lineView, dims) {
	  insertLineWidgetsFor(cm, lineView.line, lineView, dims, true);
	  if (lineView.rest) { for (var i = 0; i < lineView.rest.length; i++)
	    { insertLineWidgetsFor(cm, lineView.rest[i], lineView, dims, false); } }
	}

	function insertLineWidgetsFor(cm, line, lineView, dims, allowAbove) {
	  if (!line.widgets) { return }
	  var wrap = ensureLineWrapped(lineView);
	  for (var i = 0, ws = line.widgets; i < ws.length; ++i) {
	    var widget = ws[i], node = elt("div", [widget.node], "CodeMirror-linewidget");
	    if (!widget.handleMouseEvents) { node.setAttribute("cm-ignore-events", "true"); }
	    positionLineWidget(widget, node, lineView, dims);
	    cm.display.input.setUneditable(node);
	    if (allowAbove && widget.above)
	      { wrap.insertBefore(node, lineView.gutter || lineView.text); }
	    else
	      { wrap.appendChild(node); }
	    signalLater(widget, "redraw");
	  }
	}

	function positionLineWidget(widget, node, lineView, dims) {
	  if (widget.noHScroll) {
	    (lineView.alignable || (lineView.alignable = [])).push(node);
	    var width = dims.wrapperWidth;
	    node.style.left = dims.fixedPos + "px";
	    if (!widget.coverGutter) {
	      width -= dims.gutterTotalWidth;
	      node.style.paddingLeft = dims.gutterTotalWidth + "px";
	    }
	    node.style.width = width + "px";
	  }
	  if (widget.coverGutter) {
	    node.style.zIndex = 5;
	    node.style.position = "relative";
	    if (!widget.noHScroll) { node.style.marginLeft = -dims.gutterTotalWidth + "px"; }
	  }
	}

	function widgetHeight(widget) {
	  if (widget.height != null) { return widget.height }
	  var cm = widget.doc.cm;
	  if (!cm) { return 0 }
	  if (!contains(document.body, widget.node)) {
	    var parentStyle = "position: relative;";
	    if (widget.coverGutter)
	      { parentStyle += "margin-left: -" + cm.display.gutters.offsetWidth + "px;"; }
	    if (widget.noHScroll)
	      { parentStyle += "width: " + cm.display.wrapper.clientWidth + "px;"; }
	    removeChildrenAndAdd(cm.display.measure, elt("div", [widget.node], null, parentStyle));
	  }
	  return widget.height = widget.node.parentNode.offsetHeight
	}

	// Return true when the given mouse event happened in a widget
	function eventInWidget(display, e) {
	  for (var n = e_target(e); n != display.wrapper; n = n.parentNode) {
	    if (!n || (n.nodeType == 1 && n.getAttribute("cm-ignore-events") == "true") ||
	        (n.parentNode == display.sizer && n != display.mover))
	      { return true }
	  }
	}

	// POSITION MEASUREMENT

	function paddingTop(display) {return display.lineSpace.offsetTop}
	function paddingVert(display) {return display.mover.offsetHeight - display.lineSpace.offsetHeight}
	function paddingH(display) {
	  if (display.cachedPaddingH) { return display.cachedPaddingH }
	  var e = removeChildrenAndAdd(display.measure, elt("pre", "x"));
	  var style = window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle;
	  var data = {left: parseInt(style.paddingLeft), right: parseInt(style.paddingRight)};
	  if (!isNaN(data.left) && !isNaN(data.right)) { display.cachedPaddingH = data; }
	  return data
	}

	function scrollGap(cm) { return scrollerGap - cm.display.nativeBarWidth }
	function displayWidth(cm) {
	  return cm.display.scroller.clientWidth - scrollGap(cm) - cm.display.barWidth
	}
	function displayHeight(cm) {
	  return cm.display.scroller.clientHeight - scrollGap(cm) - cm.display.barHeight
	}

	// Ensure the lineView.wrapping.heights array is populated. This is
	// an array of bottom offsets for the lines that make up a drawn
	// line. When lineWrapping is on, there might be more than one
	// height.
	function ensureLineHeights(cm, lineView, rect) {
	  var wrapping = cm.options.lineWrapping;
	  var curWidth = wrapping && displayWidth(cm);
	  if (!lineView.measure.heights || wrapping && lineView.measure.width != curWidth) {
	    var heights = lineView.measure.heights = [];
	    if (wrapping) {
	      lineView.measure.width = curWidth;
	      var rects = lineView.text.firstChild.getClientRects();
	      for (var i = 0; i < rects.length - 1; i++) {
	        var cur = rects[i], next = rects[i + 1];
	        if (Math.abs(cur.bottom - next.bottom) > 2)
	          { heights.push((cur.bottom + next.top) / 2 - rect.top); }
	      }
	    }
	    heights.push(rect.bottom - rect.top);
	  }
	}

	// Find a line map (mapping character offsets to text nodes) and a
	// measurement cache for the given line number. (A line view might
	// contain multiple lines when collapsed ranges are present.)
	function mapFromLineView(lineView, line, lineN) {
	  if (lineView.line == line)
	    { return {map: lineView.measure.map, cache: lineView.measure.cache} }
	  for (var i = 0; i < lineView.rest.length; i++)
	    { if (lineView.rest[i] == line)
	      { return {map: lineView.measure.maps[i], cache: lineView.measure.caches[i]} } }
	  for (var i$1 = 0; i$1 < lineView.rest.length; i$1++)
	    { if (lineNo(lineView.rest[i$1]) > lineN)
	      { return {map: lineView.measure.maps[i$1], cache: lineView.measure.caches[i$1], before: true} } }
	}

	// Render a line into the hidden node display.externalMeasured. Used
	// when measurement is needed for a line that's not in the viewport.
	function updateExternalMeasurement(cm, line) {
	  line = visualLine(line);
	  var lineN = lineNo(line);
	  var view = cm.display.externalMeasured = new LineView(cm.doc, line, lineN);
	  view.lineN = lineN;
	  var built = view.built = buildLineContent(cm, view);
	  view.text = built.pre;
	  removeChildrenAndAdd(cm.display.lineMeasure, built.pre);
	  return view
	}

	// Get a {top, bottom, left, right} box (in line-local coordinates)
	// for a given character.
	function measureChar(cm, line, ch, bias) {
	  return measureCharPrepared(cm, prepareMeasureForLine(cm, line), ch, bias)
	}

	// Find a line view that corresponds to the given line number.
	function findViewForLine(cm, lineN) {
	  if (lineN >= cm.display.viewFrom && lineN < cm.display.viewTo)
	    { return cm.display.view[findViewIndex(cm, lineN)] }
	  var ext = cm.display.externalMeasured;
	  if (ext && lineN >= ext.lineN && lineN < ext.lineN + ext.size)
	    { return ext }
	}

	// Measurement can be split in two steps, the set-up work that
	// applies to the whole line, and the measurement of the actual
	// character. Functions like coordsChar, that need to do a lot of
	// measurements in a row, can thus ensure that the set-up work is
	// only done once.
	function prepareMeasureForLine(cm, line) {
	  var lineN = lineNo(line);
	  var view = findViewForLine(cm, lineN);
	  if (view && !view.text) {
	    view = null;
	  } else if (view && view.changes) {
	    updateLineForChanges(cm, view, lineN, getDimensions(cm));
	    cm.curOp.forceUpdate = true;
	  }
	  if (!view)
	    { view = updateExternalMeasurement(cm, line); }

	  var info = mapFromLineView(view, line, lineN);
	  return {
	    line: line, view: view, rect: null,
	    map: info.map, cache: info.cache, before: info.before,
	    hasHeights: false
	  }
	}

	// Given a prepared measurement object, measures the position of an
	// actual character (or fetches it from the cache).
	function measureCharPrepared(cm, prepared, ch, bias, varHeight) {
	  if (prepared.before) { ch = -1; }
	  var key = ch + (bias || ""), found;
	  if (prepared.cache.hasOwnProperty(key)) {
	    found = prepared.cache[key];
	  } else {
	    if (!prepared.rect)
	      { prepared.rect = prepared.view.text.getBoundingClientRect(); }
	    if (!prepared.hasHeights) {
	      ensureLineHeights(cm, prepared.view, prepared.rect);
	      prepared.hasHeights = true;
	    }
	    found = measureCharInner(cm, prepared, ch, bias);
	    if (!found.bogus) { prepared.cache[key] = found; }
	  }
	  return {left: found.left, right: found.right,
	          top: varHeight ? found.rtop : found.top,
	          bottom: varHeight ? found.rbottom : found.bottom}
	}

	var nullRect = {left: 0, right: 0, top: 0, bottom: 0};

	function nodeAndOffsetInLineMap(map$$1, ch, bias) {
	  var node, start, end, collapse, mStart, mEnd;
	  // First, search the line map for the text node corresponding to,
	  // or closest to, the target character.
	  for (var i = 0; i < map$$1.length; i += 3) {
	    mStart = map$$1[i];
	    mEnd = map$$1[i + 1];
	    if (ch < mStart) {
	      start = 0; end = 1;
	      collapse = "left";
	    } else if (ch < mEnd) {
	      start = ch - mStart;
	      end = start + 1;
	    } else if (i == map$$1.length - 3 || ch == mEnd && map$$1[i + 3] > ch) {
	      end = mEnd - mStart;
	      start = end - 1;
	      if (ch >= mEnd) { collapse = "right"; }
	    }
	    if (start != null) {
	      node = map$$1[i + 2];
	      if (mStart == mEnd && bias == (node.insertLeft ? "left" : "right"))
	        { collapse = bias; }
	      if (bias == "left" && start == 0)
	        { while (i && map$$1[i - 2] == map$$1[i - 3] && map$$1[i - 1].insertLeft) {
	          node = map$$1[(i -= 3) + 2];
	          collapse = "left";
	        } }
	      if (bias == "right" && start == mEnd - mStart)
	        { while (i < map$$1.length - 3 && map$$1[i + 3] == map$$1[i + 4] && !map$$1[i + 5].insertLeft) {
	          node = map$$1[(i += 3) + 2];
	          collapse = "right";
	        } }
	      break
	    }
	  }
	  return {node: node, start: start, end: end, collapse: collapse, coverStart: mStart, coverEnd: mEnd}
	}

	function getUsefulRect(rects, bias) {
	  var rect = nullRect;
	  if (bias == "left") { for (var i = 0; i < rects.length; i++) {
	    if ((rect = rects[i]).left != rect.right) { break }
	  } } else { for (var i$1 = rects.length - 1; i$1 >= 0; i$1--) {
	    if ((rect = rects[i$1]).left != rect.right) { break }
	  } }
	  return rect
	}

	function measureCharInner(cm, prepared, ch, bias) {
	  var place = nodeAndOffsetInLineMap(prepared.map, ch, bias);
	  var node = place.node, start = place.start, end = place.end, collapse = place.collapse;

	  var rect;
	  if (node.nodeType == 3) { // If it is a text node, use a range to retrieve the coordinates.
	    for (var i$1 = 0; i$1 < 4; i$1++) { // Retry a maximum of 4 times when nonsense rectangles are returned
	      while (start && isExtendingChar(prepared.line.text.charAt(place.coverStart + start))) { --start; }
	      while (place.coverStart + end < place.coverEnd && isExtendingChar(prepared.line.text.charAt(place.coverStart + end))) { ++end; }
	      if (ie && ie_version < 9 && start == 0 && end == place.coverEnd - place.coverStart)
	        { rect = node.parentNode.getBoundingClientRect(); }
	      else
	        { rect = getUsefulRect(range(node, start, end).getClientRects(), bias); }
	      if (rect.left || rect.right || start == 0) { break }
	      end = start;
	      start = start - 1;
	      collapse = "right";
	    }
	    if (ie && ie_version < 11) { rect = maybeUpdateRectForZooming(cm.display.measure, rect); }
	  } else { // If it is a widget, simply get the box for the whole widget.
	    if (start > 0) { collapse = bias = "right"; }
	    var rects;
	    if (cm.options.lineWrapping && (rects = node.getClientRects()).length > 1)
	      { rect = rects[bias == "right" ? rects.length - 1 : 0]; }
	    else
	      { rect = node.getBoundingClientRect(); }
	  }
	  if (ie && ie_version < 9 && !start && (!rect || !rect.left && !rect.right)) {
	    var rSpan = node.parentNode.getClientRects()[0];
	    if (rSpan)
	      { rect = {left: rSpan.left, right: rSpan.left + charWidth(cm.display), top: rSpan.top, bottom: rSpan.bottom}; }
	    else
	      { rect = nullRect; }
	  }

	  var rtop = rect.top - prepared.rect.top, rbot = rect.bottom - prepared.rect.top;
	  var mid = (rtop + rbot) / 2;
	  var heights = prepared.view.measure.heights;
	  var i = 0;
	  for (; i < heights.length - 1; i++)
	    { if (mid < heights[i]) { break } }
	  var top = i ? heights[i - 1] : 0, bot = heights[i];
	  var result = {left: (collapse == "right" ? rect.right : rect.left) - prepared.rect.left,
	                right: (collapse == "left" ? rect.left : rect.right) - prepared.rect.left,
	                top: top, bottom: bot};
	  if (!rect.left && !rect.right) { result.bogus = true; }
	  if (!cm.options.singleCursorHeightPerLine) { result.rtop = rtop; result.rbottom = rbot; }

	  return result
	}

	// Work around problem with bounding client rects on ranges being
	// returned incorrectly when zoomed on IE10 and below.
	function maybeUpdateRectForZooming(measure, rect) {
	  if (!window.screen || screen.logicalXDPI == null ||
	      screen.logicalXDPI == screen.deviceXDPI || !hasBadZoomedRects(measure))
	    { return rect }
	  var scaleX = screen.logicalXDPI / screen.deviceXDPI;
	  var scaleY = screen.logicalYDPI / screen.deviceYDPI;
	  return {left: rect.left * scaleX, right: rect.right * scaleX,
	          top: rect.top * scaleY, bottom: rect.bottom * scaleY}
	}

	function clearLineMeasurementCacheFor(lineView) {
	  if (lineView.measure) {
	    lineView.measure.cache = {};
	    lineView.measure.heights = null;
	    if (lineView.rest) { for (var i = 0; i < lineView.rest.length; i++)
	      { lineView.measure.caches[i] = {}; } }
	  }
	}

	function clearLineMeasurementCache(cm) {
	  cm.display.externalMeasure = null;
	  removeChildren(cm.display.lineMeasure);
	  for (var i = 0; i < cm.display.view.length; i++)
	    { clearLineMeasurementCacheFor(cm.display.view[i]); }
	}

	function clearCaches(cm) {
	  clearLineMeasurementCache(cm);
	  cm.display.cachedCharWidth = cm.display.cachedTextHeight = cm.display.cachedPaddingH = null;
	  if (!cm.options.lineWrapping) { cm.display.maxLineChanged = true; }
	  cm.display.lineNumChars = null;
	}

	function pageScrollX() {
	  // Work around https://bugs.chromium.org/p/chromium/issues/detail?id=489206
	  // which causes page_Offset and bounding client rects to use
	  // different reference viewports and invalidate our calculations.
	  if (chrome && android) { return -(document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft)) }
	  return window.pageXOffset || (document.documentElement || document.body).scrollLeft
	}
	function pageScrollY() {
	  if (chrome && android) { return -(document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop)) }
	  return window.pageYOffset || (document.documentElement || document.body).scrollTop
	}

	function widgetTopHeight(lineObj) {
	  var height = 0;
	  if (lineObj.widgets) { for (var i = 0; i < lineObj.widgets.length; ++i) { if (lineObj.widgets[i].above)
	    { height += widgetHeight(lineObj.widgets[i]); } } }
	  return height
	}

	// Converts a {top, bottom, left, right} box from line-local
	// coordinates into another coordinate system. Context may be one of
	// "line", "div" (display.lineDiv), "local"./null (editor), "window",
	// or "page".
	function intoCoordSystem(cm, lineObj, rect, context, includeWidgets) {
	  if (!includeWidgets) {
	    var height = widgetTopHeight(lineObj);
	    rect.top += height; rect.bottom += height;
	  }
	  if (context == "line") { return rect }
	  if (!context) { context = "local"; }
	  var yOff = heightAtLine(lineObj);
	  if (context == "local") { yOff += paddingTop(cm.display); }
	  else { yOff -= cm.display.viewOffset; }
	  if (context == "page" || context == "window") {
	    var lOff = cm.display.lineSpace.getBoundingClientRect();
	    yOff += lOff.top + (context == "window" ? 0 : pageScrollY());
	    var xOff = lOff.left + (context == "window" ? 0 : pageScrollX());
	    rect.left += xOff; rect.right += xOff;
	  }
	  rect.top += yOff; rect.bottom += yOff;
	  return rect
	}

	// Coverts a box from "div" coords to another coordinate system.
	// Context may be "window", "page", "div", or "local"./null.
	function fromCoordSystem(cm, coords, context) {
	  if (context == "div") { return coords }
	  var left = coords.left, top = coords.top;
	  // First move into "page" coordinate system
	  if (context == "page") {
	    left -= pageScrollX();
	    top -= pageScrollY();
	  } else if (context == "local" || !context) {
	    var localBox = cm.display.sizer.getBoundingClientRect();
	    left += localBox.left;
	    top += localBox.top;
	  }

	  var lineSpaceBox = cm.display.lineSpace.getBoundingClientRect();
	  return {left: left - lineSpaceBox.left, top: top - lineSpaceBox.top}
	}

	function charCoords(cm, pos, context, lineObj, bias) {
	  if (!lineObj) { lineObj = getLine(cm.doc, pos.line); }
	  return intoCoordSystem(cm, lineObj, measureChar(cm, lineObj, pos.ch, bias), context)
	}

	// Returns a box for a given cursor position, which may have an
	// 'other' property containing the position of the secondary cursor
	// on a bidi boundary.
	// A cursor Pos(line, char, "before") is on the same visual line as `char - 1`
	// and after `char - 1` in writing order of `char - 1`
	// A cursor Pos(line, char, "after") is on the same visual line as `char`
	// and before `char` in writing order of `char`
	// Examples (upper-case letters are RTL, lower-case are LTR):
	//     Pos(0, 1, ...)
	//     before   after
	// ab     a|b     a|b
	// aB     a|B     aB|
	// Ab     |Ab     A|b
	// AB     B|A     B|A
	// Every position after the last character on a line is considered to stick
	// to the last character on the line.
	function cursorCoords(cm, pos, context, lineObj, preparedMeasure, varHeight) {
	  lineObj = lineObj || getLine(cm.doc, pos.line);
	  if (!preparedMeasure) { preparedMeasure = prepareMeasureForLine(cm, lineObj); }
	  function get(ch, right) {
	    var m = measureCharPrepared(cm, preparedMeasure, ch, right ? "right" : "left", varHeight);
	    if (right) { m.left = m.right; } else { m.right = m.left; }
	    return intoCoordSystem(cm, lineObj, m, context)
	  }
	  var order = getOrder(lineObj, cm.doc.direction), ch = pos.ch, sticky = pos.sticky;
	  if (ch >= lineObj.text.length) {
	    ch = lineObj.text.length;
	    sticky = "before";
	  } else if (ch <= 0) {
	    ch = 0;
	    sticky = "after";
	  }
	  if (!order) { return get(sticky == "before" ? ch - 1 : ch, sticky == "before") }

	  function getBidi(ch, partPos, invert) {
	    var part = order[partPos], right = part.level == 1;
	    return get(invert ? ch - 1 : ch, right != invert)
	  }
	  var partPos = getBidiPartAt(order, ch, sticky);
	  var other = bidiOther;
	  var val = getBidi(ch, partPos, sticky == "before");
	  if (other != null) { val.other = getBidi(ch, other, sticky != "before"); }
	  return val
	}

	// Used to cheaply estimate the coordinates for a position. Used for
	// intermediate scroll updates.
	function estimateCoords(cm, pos) {
	  var left = 0;
	  pos = clipPos(cm.doc, pos);
	  if (!cm.options.lineWrapping) { left = charWidth(cm.display) * pos.ch; }
	  var lineObj = getLine(cm.doc, pos.line);
	  var top = heightAtLine(lineObj) + paddingTop(cm.display);
	  return {left: left, right: left, top: top, bottom: top + lineObj.height}
	}

	// Positions returned by coordsChar contain some extra information.
	// xRel is the relative x position of the input coordinates compared
	// to the found position (so xRel > 0 means the coordinates are to
	// the right of the character position, for example). When outside
	// is true, that means the coordinates lie outside the line's
	// vertical range.
	function PosWithInfo(line, ch, sticky, outside, xRel) {
	  var pos = Pos(line, ch, sticky);
	  pos.xRel = xRel;
	  if (outside) { pos.outside = true; }
	  return pos
	}

	// Compute the character position closest to the given coordinates.
	// Input must be lineSpace-local ("div" coordinate system).
	function coordsChar(cm, x, y) {
	  var doc = cm.doc;
	  y += cm.display.viewOffset;
	  if (y < 0) { return PosWithInfo(doc.first, 0, null, true, -1) }
	  var lineN = lineAtHeight(doc, y), last = doc.first + doc.size - 1;
	  if (lineN > last)
	    { return PosWithInfo(doc.first + doc.size - 1, getLine(doc, last).text.length, null, true, 1) }
	  if (x < 0) { x = 0; }

	  var lineObj = getLine(doc, lineN);
	  for (;;) {
	    var found = coordsCharInner(cm, lineObj, lineN, x, y);
	    var merged = collapsedSpanAtEnd(lineObj);
	    var mergedPos = merged && merged.find(0, true);
	    if (merged && (found.ch > mergedPos.from.ch || found.ch == mergedPos.from.ch && found.xRel > 0))
	      { lineN = lineNo(lineObj = mergedPos.to.line); }
	    else
	      { return found }
	  }
	}

	function wrappedLineExtent(cm, lineObj, preparedMeasure, y) {
	  y -= widgetTopHeight(lineObj);
	  var end = lineObj.text.length;
	  var begin = findFirst(function (ch) { return measureCharPrepared(cm, preparedMeasure, ch - 1).bottom <= y; }, end, 0);
	  end = findFirst(function (ch) { return measureCharPrepared(cm, preparedMeasure, ch).top > y; }, begin, end);
	  return {begin: begin, end: end}
	}

	function wrappedLineExtentChar(cm, lineObj, preparedMeasure, target) {
	  if (!preparedMeasure) { preparedMeasure = prepareMeasureForLine(cm, lineObj); }
	  var targetTop = intoCoordSystem(cm, lineObj, measureCharPrepared(cm, preparedMeasure, target), "line").top;
	  return wrappedLineExtent(cm, lineObj, preparedMeasure, targetTop)
	}

	// Returns true if the given side of a box is after the given
	// coordinates, in top-to-bottom, left-to-right order.
	function boxIsAfter(box, x, y, left) {
	  return box.bottom <= y ? false : box.top > y ? true : (left ? box.left : box.right) > x
	}

	function coordsCharInner(cm, lineObj, lineNo$$1, x, y) {
	  // Move y into line-local coordinate space
	  y -= heightAtLine(lineObj);
	  var preparedMeasure = prepareMeasureForLine(cm, lineObj);
	  // When directly calling `measureCharPrepared`, we have to adjust
	  // for the widgets at this line.
	  var widgetHeight$$1 = widgetTopHeight(lineObj);
	  var begin = 0, end = lineObj.text.length, ltr = true;

	  var order = getOrder(lineObj, cm.doc.direction);
	  // If the line isn't plain left-to-right text, first figure out
	  // which bidi section the coordinates fall into.
	  if (order) {
	    var part = (cm.options.lineWrapping ? coordsBidiPartWrapped : coordsBidiPart)
	                 (cm, lineObj, lineNo$$1, preparedMeasure, order, x, y);
	    ltr = part.level != 1;
	    // The awkward -1 offsets are needed because findFirst (called
	    // on these below) will treat its first bound as inclusive,
	    // second as exclusive, but we want to actually address the
	    // characters in the part's range
	    begin = ltr ? part.from : part.to - 1;
	    end = ltr ? part.to : part.from - 1;
	  }

	  // A binary search to find the first character whose bounding box
	  // starts after the coordinates. If we run across any whose box wrap
	  // the coordinates, store that.
	  var chAround = null, boxAround = null;
	  var ch = findFirst(function (ch) {
	    var box = measureCharPrepared(cm, preparedMeasure, ch);
	    box.top += widgetHeight$$1; box.bottom += widgetHeight$$1;
	    if (!boxIsAfter(box, x, y, false)) { return false }
	    if (box.top <= y && box.left <= x) {
	      chAround = ch;
	      boxAround = box;
	    }
	    return true
	  }, begin, end);

	  var baseX, sticky, outside = false;
	  // If a box around the coordinates was found, use that
	  if (boxAround) {
	    // Distinguish coordinates nearer to the left or right side of the box
	    var atLeft = x - boxAround.left < boxAround.right - x, atStart = atLeft == ltr;
	    ch = chAround + (atStart ? 0 : 1);
	    sticky = atStart ? "after" : "before";
	    baseX = atLeft ? boxAround.left : boxAround.right;
	  } else {
	    // (Adjust for extended bound, if necessary.)
	    if (!ltr && (ch == end || ch == begin)) { ch++; }
	    // To determine which side to associate with, get the box to the
	    // left of the character and compare it's vertical position to the
	    // coordinates
	    sticky = ch == 0 ? "after" : ch == lineObj.text.length ? "before" :
	      (measureCharPrepared(cm, preparedMeasure, ch - (ltr ? 1 : 0)).bottom + widgetHeight$$1 <= y) == ltr ?
	      "after" : "before";
	    // Now get accurate coordinates for this place, in order to get a
	    // base X position
	    var coords = cursorCoords(cm, Pos(lineNo$$1, ch, sticky), "line", lineObj, preparedMeasure);
	    baseX = coords.left;
	    outside = y < coords.top || y >= coords.bottom;
	  }

	  ch = skipExtendingChars(lineObj.text, ch, 1);
	  return PosWithInfo(lineNo$$1, ch, sticky, outside, x - baseX)
	}

	function coordsBidiPart(cm, lineObj, lineNo$$1, preparedMeasure, order, x, y) {
	  // Bidi parts are sorted left-to-right, and in a non-line-wrapping
	  // situation, we can take this ordering to correspond to the visual
	  // ordering. This finds the first part whose end is after the given
	  // coordinates.
	  var index = findFirst(function (i) {
	    var part = order[i], ltr = part.level != 1;
	    return boxIsAfter(cursorCoords(cm, Pos(lineNo$$1, ltr ? part.to : part.from, ltr ? "before" : "after"),
	                                   "line", lineObj, preparedMeasure), x, y, true)
	  }, 0, order.length - 1);
	  var part = order[index];
	  // If this isn't the first part, the part's start is also after
	  // the coordinates, and the coordinates aren't on the same line as
	  // that start, move one part back.
	  if (index > 0) {
	    var ltr = part.level != 1;
	    var start = cursorCoords(cm, Pos(lineNo$$1, ltr ? part.from : part.to, ltr ? "after" : "before"),
	                             "line", lineObj, preparedMeasure);
	    if (boxIsAfter(start, x, y, true) && start.top > y)
	      { part = order[index - 1]; }
	  }
	  return part
	}

	function coordsBidiPartWrapped(cm, lineObj, _lineNo, preparedMeasure, order, x, y) {
	  // In a wrapped line, rtl text on wrapping boundaries can do things
	  // that don't correspond to the ordering in our `order` array at
	  // all, so a binary search doesn't work, and we want to return a
	  // part that only spans one line so that the binary search in
	  // coordsCharInner is safe. As such, we first find the extent of the
	  // wrapped line, and then do a flat search in which we discard any
	  // spans that aren't on the line.
	  var ref = wrappedLineExtent(cm, lineObj, preparedMeasure, y);
	  var begin = ref.begin;
	  var end = ref.end;
	  if (/\s/.test(lineObj.text.charAt(end - 1))) { end--; }
	  var part = null, closestDist = null;
	  for (var i = 0; i < order.length; i++) {
	    var p = order[i];
	    if (p.from >= end || p.to <= begin) { continue }
	    var ltr = p.level != 1;
	    var endX = measureCharPrepared(cm, preparedMeasure, ltr ? Math.min(end, p.to) - 1 : Math.max(begin, p.from)).right;
	    // Weigh against spans ending before this, so that they are only
	    // picked if nothing ends after
	    var dist = endX < x ? x - endX + 1e9 : endX - x;
	    if (!part || closestDist > dist) {
	      part = p;
	      closestDist = dist;
	    }
	  }
	  if (!part) { part = order[order.length - 1]; }
	  // Clip the part to the wrapped line.
	  if (part.from < begin) { part = {from: begin, to: part.to, level: part.level}; }
	  if (part.to > end) { part = {from: part.from, to: end, level: part.level}; }
	  return part
	}

	var measureText;
	// Compute the default text height.
	function textHeight(display) {
	  if (display.cachedTextHeight != null) { return display.cachedTextHeight }
	  if (measureText == null) {
	    measureText = elt("pre");
	    // Measure a bunch of lines, for browsers that compute
	    // fractional heights.
	    for (var i = 0; i < 49; ++i) {
	      measureText.appendChild(document.createTextNode("x"));
	      measureText.appendChild(elt("br"));
	    }
	    measureText.appendChild(document.createTextNode("x"));
	  }
	  removeChildrenAndAdd(display.measure, measureText);
	  var height = measureText.offsetHeight / 50;
	  if (height > 3) { display.cachedTextHeight = height; }
	  removeChildren(display.measure);
	  return height || 1
	}

	// Compute the default character width.
	function charWidth(display) {
	  if (display.cachedCharWidth != null) { return display.cachedCharWidth }
	  var anchor = elt("span", "xxxxxxxxxx");
	  var pre = elt("pre", [anchor]);
	  removeChildrenAndAdd(display.measure, pre);
	  var rect = anchor.getBoundingClientRect(), width = (rect.right - rect.left) / 10;
	  if (width > 2) { display.cachedCharWidth = width; }
	  return width || 10
	}

	// Do a bulk-read of the DOM positions and sizes needed to draw the
	// view, so that we don't interleave reading and writing to the DOM.
	function getDimensions(cm) {
	  var d = cm.display, left = {}, width = {};
	  var gutterLeft = d.gutters.clientLeft;
	  for (var n = d.gutters.firstChild, i = 0; n; n = n.nextSibling, ++i) {
	    left[cm.options.gutters[i]] = n.offsetLeft + n.clientLeft + gutterLeft;
	    width[cm.options.gutters[i]] = n.clientWidth;
	  }
	  return {fixedPos: compensateForHScroll(d),
	          gutterTotalWidth: d.gutters.offsetWidth,
	          gutterLeft: left,
	          gutterWidth: width,
	          wrapperWidth: d.wrapper.clientWidth}
	}

	// Computes display.scroller.scrollLeft + display.gutters.offsetWidth,
	// but using getBoundingClientRect to get a sub-pixel-accurate
	// result.
	function compensateForHScroll(display) {
	  return display.scroller.getBoundingClientRect().left - display.sizer.getBoundingClientRect().left
	}

	// Returns a function that estimates the height of a line, to use as
	// first approximation until the line becomes visible (and is thus
	// properly measurable).
	function estimateHeight(cm) {
	  var th = textHeight(cm.display), wrapping = cm.options.lineWrapping;
	  var perLine = wrapping && Math.max(5, cm.display.scroller.clientWidth / charWidth(cm.display) - 3);
	  return function (line) {
	    if (lineIsHidden(cm.doc, line)) { return 0 }

	    var widgetsHeight = 0;
	    if (line.widgets) { for (var i = 0; i < line.widgets.length; i++) {
	      if (line.widgets[i].height) { widgetsHeight += line.widgets[i].height; }
	    } }

	    if (wrapping)
	      { return widgetsHeight + (Math.ceil(line.text.length / perLine) || 1) * th }
	    else
	      { return widgetsHeight + th }
	  }
	}

	function estimateLineHeights(cm) {
	  var doc = cm.doc, est = estimateHeight(cm);
	  doc.iter(function (line) {
	    var estHeight = est(line);
	    if (estHeight != line.height) { updateLineHeight(line, estHeight); }
	  });
	}

	// Given a mouse event, find the corresponding position. If liberal
	// is false, it checks whether a gutter or scrollbar was clicked,
	// and returns null if it was. forRect is used by rectangular
	// selections, and tries to estimate a character position even for
	// coordinates beyond the right of the text.
	function posFromMouse(cm, e, liberal, forRect) {
	  var display = cm.display;
	  if (!liberal && e_target(e).getAttribute("cm-not-content") == "true") { return null }

	  var x, y, space = display.lineSpace.getBoundingClientRect();
	  // Fails unpredictably on IE[67] when mouse is dragged around quickly.
	  try { x = e.clientX - space.left; y = e.clientY - space.top; }
	  catch (e) { return null }
	  var coords = coordsChar(cm, x, y), line;
	  if (forRect && coords.xRel == 1 && (line = getLine(cm.doc, coords.line).text).length == coords.ch) {
	    var colDiff = countColumn(line, line.length, cm.options.tabSize) - line.length;
	    coords = Pos(coords.line, Math.max(0, Math.round((x - paddingH(cm.display).left) / charWidth(cm.display)) - colDiff));
	  }
	  return coords
	}

	// Find the view element corresponding to a given line. Return null
	// when the line isn't visible.
	function findViewIndex(cm, n) {
	  if (n >= cm.display.viewTo) { return null }
	  n -= cm.display.viewFrom;
	  if (n < 0) { return null }
	  var view = cm.display.view;
	  for (var i = 0; i < view.length; i++) {
	    n -= view[i].size;
	    if (n < 0) { return i }
	  }
	}

	function updateSelection(cm) {
	  cm.display.input.showSelection(cm.display.input.prepareSelection());
	}

	function prepareSelection(cm, primary) {
	  if ( primary === void 0 ) primary = true;

	  var doc = cm.doc, result = {};
	  var curFragment = result.cursors = document.createDocumentFragment();
	  var selFragment = result.selection = document.createDocumentFragment();

	  for (var i = 0; i < doc.sel.ranges.length; i++) {
	    if (!primary && i == doc.sel.primIndex) { continue }
	    var range$$1 = doc.sel.ranges[i];
	    if (range$$1.from().line >= cm.display.viewTo || range$$1.to().line < cm.display.viewFrom) { continue }
	    var collapsed = range$$1.empty();
	    if (collapsed || cm.options.showCursorWhenSelecting)
	      { drawSelectionCursor(cm, range$$1.head, curFragment); }
	    if (!collapsed)
	      { drawSelectionRange(cm, range$$1, selFragment); }
	  }
	  return result
	}

	// Draws a cursor for the given range
	function drawSelectionCursor(cm, head, output) {
	  var pos = cursorCoords(cm, head, "div", null, null, !cm.options.singleCursorHeightPerLine);

	  var cursor = output.appendChild(elt("div", "\u00a0", "CodeMirror-cursor"));
	  cursor.style.left = pos.left + "px";
	  cursor.style.top = pos.top + "px";
	  cursor.style.height = Math.max(0, pos.bottom - pos.top) * cm.options.cursorHeight + "px";

	  if (pos.other) {
	    // Secondary cursor, shown when on a 'jump' in bi-directional text
	    var otherCursor = output.appendChild(elt("div", "\u00a0", "CodeMirror-cursor CodeMirror-secondarycursor"));
	    otherCursor.style.display = "";
	    otherCursor.style.left = pos.other.left + "px";
	    otherCursor.style.top = pos.other.top + "px";
	    otherCursor.style.height = (pos.other.bottom - pos.other.top) * .85 + "px";
	  }
	}

	function cmpCoords(a, b) { return a.top - b.top || a.left - b.left }

	// Draws the given range as a highlighted selection
	function drawSelectionRange(cm, range$$1, output) {
	  var display = cm.display, doc = cm.doc;
	  var fragment = document.createDocumentFragment();
	  var padding = paddingH(cm.display), leftSide = padding.left;
	  var rightSide = Math.max(display.sizerWidth, displayWidth(cm) - display.sizer.offsetLeft) - padding.right;
	  var docLTR = doc.direction == "ltr";

	  function add(left, top, width, bottom) {
	    if (top < 0) { top = 0; }
	    top = Math.round(top);
	    bottom = Math.round(bottom);
	    fragment.appendChild(elt("div", null, "CodeMirror-selected", ("position: absolute; left: " + left + "px;\n                             top: " + top + "px; width: " + (width == null ? rightSide - left : width) + "px;\n                             height: " + (bottom - top) + "px")));
	  }

	  function drawForLine(line, fromArg, toArg) {
	    var lineObj = getLine(doc, line);
	    var lineLen = lineObj.text.length;
	    var start, end;
	    function coords(ch, bias) {
	      return charCoords(cm, Pos(line, ch), "div", lineObj, bias)
	    }

	    function wrapX(pos, dir, side) {
	      var extent = wrappedLineExtentChar(cm, lineObj, null, pos);
	      var prop = (dir == "ltr") == (side == "after") ? "left" : "right";
	      var ch = side == "after" ? extent.begin : extent.end - (/\s/.test(lineObj.text.charAt(extent.end - 1)) ? 2 : 1);
	      return coords(ch, prop)[prop]
	    }

	    var order = getOrder(lineObj, doc.direction);
	    iterateBidiSections(order, fromArg || 0, toArg == null ? lineLen : toArg, function (from, to, dir, i) {
	      var ltr = dir == "ltr";
	      var fromPos = coords(from, ltr ? "left" : "right");
	      var toPos = coords(to - 1, ltr ? "right" : "left");

	      var openStart = fromArg == null && from == 0, openEnd = toArg == null && to == lineLen;
	      var first = i == 0, last = !order || i == order.length - 1;
	      if (toPos.top - fromPos.top <= 3) { // Single line
	        var openLeft = (docLTR ? openStart : openEnd) && first;
	        var openRight = (docLTR ? openEnd : openStart) && last;
	        var left = openLeft ? leftSide : (ltr ? fromPos : toPos).left;
	        var right = openRight ? rightSide : (ltr ? toPos : fromPos).right;
	        add(left, fromPos.top, right - left, fromPos.bottom);
	      } else { // Multiple lines
	        var topLeft, topRight, botLeft, botRight;
	        if (ltr) {
	          topLeft = docLTR && openStart && first ? leftSide : fromPos.left;
	          topRight = docLTR ? rightSide : wrapX(from, dir, "before");
	          botLeft = docLTR ? leftSide : wrapX(to, dir, "after");
	          botRight = docLTR && openEnd && last ? rightSide : toPos.right;
	        } else {
	          topLeft = !docLTR ? leftSide : wrapX(from, dir, "before");
	          topRight = !docLTR && openStart && first ? rightSide : fromPos.right;
	          botLeft = !docLTR && openEnd && last ? leftSide : toPos.left;
	          botRight = !docLTR ? rightSide : wrapX(to, dir, "after");
	        }
	        add(topLeft, fromPos.top, topRight - topLeft, fromPos.bottom);
	        if (fromPos.bottom < toPos.top) { add(leftSide, fromPos.bottom, null, toPos.top); }
	        add(botLeft, toPos.top, botRight - botLeft, toPos.bottom);
	      }

	      if (!start || cmpCoords(fromPos, start) < 0) { start = fromPos; }
	      if (cmpCoords(toPos, start) < 0) { start = toPos; }
	      if (!end || cmpCoords(fromPos, end) < 0) { end = fromPos; }
	      if (cmpCoords(toPos, end) < 0) { end = toPos; }
	    });
	    return {start: start, end: end}
	  }

	  var sFrom = range$$1.from(), sTo = range$$1.to();
	  if (sFrom.line == sTo.line) {
	    drawForLine(sFrom.line, sFrom.ch, sTo.ch);
	  } else {
	    var fromLine = getLine(doc, sFrom.line), toLine = getLine(doc, sTo.line);
	    var singleVLine = visualLine(fromLine) == visualLine(toLine);
	    var leftEnd = drawForLine(sFrom.line, sFrom.ch, singleVLine ? fromLine.text.length + 1 : null).end;
	    var rightStart = drawForLine(sTo.line, singleVLine ? 0 : null, sTo.ch).start;
	    if (singleVLine) {
	      if (leftEnd.top < rightStart.top - 2) {
	        add(leftEnd.right, leftEnd.top, null, leftEnd.bottom);
	        add(leftSide, rightStart.top, rightStart.left, rightStart.bottom);
	      } else {
	        add(leftEnd.right, leftEnd.top, rightStart.left - leftEnd.right, leftEnd.bottom);
	      }
	    }
	    if (leftEnd.bottom < rightStart.top)
	      { add(leftSide, leftEnd.bottom, null, rightStart.top); }
	  }

	  output.appendChild(fragment);
	}

	// Cursor-blinking
	function restartBlink(cm) {
	  if (!cm.state.focused) { return }
	  var display = cm.display;
	  clearInterval(display.blinker);
	  var on = true;
	  display.cursorDiv.style.visibility = "";
	  if (cm.options.cursorBlinkRate > 0)
	    { display.blinker = setInterval(function () { return display.cursorDiv.style.visibility = (on = !on) ? "" : "hidden"; },
	      cm.options.cursorBlinkRate); }
	  else if (cm.options.cursorBlinkRate < 0)
	    { display.cursorDiv.style.visibility = "hidden"; }
	}

	function ensureFocus(cm) {
	  if (!cm.state.focused) { cm.display.input.focus(); onFocus(cm); }
	}

	function delayBlurEvent(cm) {
	  cm.state.delayingBlurEvent = true;
	  setTimeout(function () { if (cm.state.delayingBlurEvent) {
	    cm.state.delayingBlurEvent = false;
	    onBlur(cm);
	  } }, 100);
	}

	function onFocus(cm, e) {
	  if (cm.state.delayingBlurEvent) { cm.state.delayingBlurEvent = false; }

	  if (cm.options.readOnly == "nocursor") { return }
	  if (!cm.state.focused) {
	    signal(cm, "focus", cm, e);
	    cm.state.focused = true;
	    addClass(cm.display.wrapper, "CodeMirror-focused");
	    // This test prevents this from firing when a context
	    // menu is closed (since the input reset would kill the
	    // select-all detection hack)
	    if (!cm.curOp && cm.display.selForContextMenu != cm.doc.sel) {
	      cm.display.input.reset();
	      if (webkit) { setTimeout(function () { return cm.display.input.reset(true); }, 20); } // Issue #1730
	    }
	    cm.display.input.receivedFocus();
	  }
	  restartBlink(cm);
	}
	function onBlur(cm, e) {
	  if (cm.state.delayingBlurEvent) { return }

	  if (cm.state.focused) {
	    signal(cm, "blur", cm, e);
	    cm.state.focused = false;
	    rmClass(cm.display.wrapper, "CodeMirror-focused");
	  }
	  clearInterval(cm.display.blinker);
	  setTimeout(function () { if (!cm.state.focused) { cm.display.shift = false; } }, 150);
	}

	// Read the actual heights of the rendered lines, and update their
	// stored heights to match.
	function updateHeightsInViewport(cm) {
	  var display = cm.display;
	  var prevBottom = display.lineDiv.offsetTop;
	  for (var i = 0; i < display.view.length; i++) {
	    var cur = display.view[i], height = (void 0);
	    if (cur.hidden) { continue }
	    if (ie && ie_version < 8) {
	      var bot = cur.node.offsetTop + cur.node.offsetHeight;
	      height = bot - prevBottom;
	      prevBottom = bot;
	    } else {
	      var box = cur.node.getBoundingClientRect();
	      height = box.bottom - box.top;
	    }
	    var diff = cur.line.height - height;
	    if (height < 2) { height = textHeight(display); }
	    if (diff > .005 || diff < -.005) {
	      updateLineHeight(cur.line, height);
	      updateWidgetHeight(cur.line);
	      if (cur.rest) { for (var j = 0; j < cur.rest.length; j++)
	        { updateWidgetHeight(cur.rest[j]); } }
	    }
	  }
	}

	// Read and store the height of line widgets associated with the
	// given line.
	function updateWidgetHeight(line) {
	  if (line.widgets) { for (var i = 0; i < line.widgets.length; ++i)
	    { line.widgets[i].height = line.widgets[i].node.parentNode.offsetHeight; } }
	}

	// Compute the lines that are visible in a given viewport (defaults
	// the the current scroll position). viewport may contain top,
	// height, and ensure (see op.scrollToPos) properties.
	function visibleLines(display, doc, viewport) {
	  var top = viewport && viewport.top != null ? Math.max(0, viewport.top) : display.scroller.scrollTop;
	  top = Math.floor(top - paddingTop(display));
	  var bottom = viewport && viewport.bottom != null ? viewport.bottom : top + display.wrapper.clientHeight;

	  var from = lineAtHeight(doc, top), to = lineAtHeight(doc, bottom);
	  // Ensure is a {from: {line, ch}, to: {line, ch}} object, and
	  // forces those lines into the viewport (if possible).
	  if (viewport && viewport.ensure) {
	    var ensureFrom = viewport.ensure.from.line, ensureTo = viewport.ensure.to.line;
	    if (ensureFrom < from) {
	      from = ensureFrom;
	      to = lineAtHeight(doc, heightAtLine(getLine(doc, ensureFrom)) + display.wrapper.clientHeight);
	    } else if (Math.min(ensureTo, doc.lastLine()) >= to) {
	      from = lineAtHeight(doc, heightAtLine(getLine(doc, ensureTo)) - display.wrapper.clientHeight);
	      to = ensureTo;
	    }
	  }
	  return {from: from, to: Math.max(to, from + 1)}
	}

	// Re-align line numbers and gutter marks to compensate for
	// horizontal scrolling.
	function alignHorizontally(cm) {
	  var display = cm.display, view = display.view;
	  if (!display.alignWidgets && (!display.gutters.firstChild || !cm.options.fixedGutter)) { return }
	  var comp = compensateForHScroll(display) - display.scroller.scrollLeft + cm.doc.scrollLeft;
	  var gutterW = display.gutters.offsetWidth, left = comp + "px";
	  for (var i = 0; i < view.length; i++) { if (!view[i].hidden) {
	    if (cm.options.fixedGutter) {
	      if (view[i].gutter)
	        { view[i].gutter.style.left = left; }
	      if (view[i].gutterBackground)
	        { view[i].gutterBackground.style.left = left; }
	    }
	    var align = view[i].alignable;
	    if (align) { for (var j = 0; j < align.length; j++)
	      { align[j].style.left = left; } }
	  } }
	  if (cm.options.fixedGutter)
	    { display.gutters.style.left = (comp + gutterW) + "px"; }
	}

	// Used to ensure that the line number gutter is still the right
	// size for the current document size. Returns true when an update
	// is needed.
	function maybeUpdateLineNumberWidth(cm) {
	  if (!cm.options.lineNumbers) { return false }
	  var doc = cm.doc, last = lineNumberFor(cm.options, doc.first + doc.size - 1), display = cm.display;
	  if (last.length != display.lineNumChars) {
	    var test = display.measure.appendChild(elt("div", [elt("div", last)],
	                                               "CodeMirror-linenumber CodeMirror-gutter-elt"));
	    var innerW = test.firstChild.offsetWidth, padding = test.offsetWidth - innerW;
	    display.lineGutter.style.width = "";
	    display.lineNumInnerWidth = Math.max(innerW, display.lineGutter.offsetWidth - padding) + 1;
	    display.lineNumWidth = display.lineNumInnerWidth + padding;
	    display.lineNumChars = display.lineNumInnerWidth ? last.length : -1;
	    display.lineGutter.style.width = display.lineNumWidth + "px";
	    updateGutterSpace(cm);
	    return true
	  }
	  return false
	}

	// SCROLLING THINGS INTO VIEW

	// If an editor sits on the top or bottom of the window, partially
	// scrolled out of view, this ensures that the cursor is visible.
	function maybeScrollWindow(cm, rect) {
	  if (signalDOMEvent(cm, "scrollCursorIntoView")) { return }

	  var display = cm.display, box = display.sizer.getBoundingClientRect(), doScroll = null;
	  if (rect.top + box.top < 0) { doScroll = true; }
	  else if (rect.bottom + box.top > (window.innerHeight || document.documentElement.clientHeight)) { doScroll = false; }
	  if (doScroll != null && !phantom) {
	    var scrollNode = elt("div", "\u200b", null, ("position: absolute;\n                         top: " + (rect.top - display.viewOffset - paddingTop(cm.display)) + "px;\n                         height: " + (rect.bottom - rect.top + scrollGap(cm) + display.barHeight) + "px;\n                         left: " + (rect.left) + "px; width: " + (Math.max(2, rect.right - rect.left)) + "px;"));
	    cm.display.lineSpace.appendChild(scrollNode);
	    scrollNode.scrollIntoView(doScroll);
	    cm.display.lineSpace.removeChild(scrollNode);
	  }
	}

	// Scroll a given position into view (immediately), verifying that
	// it actually became visible (as line heights are accurately
	// measured, the position of something may 'drift' during drawing).
	function scrollPosIntoView(cm, pos, end, margin) {
	  if (margin == null) { margin = 0; }
	  var rect;
	  if (!cm.options.lineWrapping && pos == end) {
	    // Set pos and end to the cursor positions around the character pos sticks to
	    // If pos.sticky == "before", that is around pos.ch - 1, otherwise around pos.ch
	    // If pos == Pos(_, 0, "before"), pos and end are unchanged
	    pos = pos.ch ? Pos(pos.line, pos.sticky == "before" ? pos.ch - 1 : pos.ch, "after") : pos;
	    end = pos.sticky == "before" ? Pos(pos.line, pos.ch + 1, "before") : pos;
	  }
	  for (var limit = 0; limit < 5; limit++) {
	    var changed = false;
	    var coords = cursorCoords(cm, pos);
	    var endCoords = !end || end == pos ? coords : cursorCoords(cm, end);
	    rect = {left: Math.min(coords.left, endCoords.left),
	            top: Math.min(coords.top, endCoords.top) - margin,
	            right: Math.max(coords.left, endCoords.left),
	            bottom: Math.max(coords.bottom, endCoords.bottom) + margin};
	    var scrollPos = calculateScrollPos(cm, rect);
	    var startTop = cm.doc.scrollTop, startLeft = cm.doc.scrollLeft;
	    if (scrollPos.scrollTop != null) {
	      updateScrollTop(cm, scrollPos.scrollTop);
	      if (Math.abs(cm.doc.scrollTop - startTop) > 1) { changed = true; }
	    }
	    if (scrollPos.scrollLeft != null) {
	      setScrollLeft(cm, scrollPos.scrollLeft);
	      if (Math.abs(cm.doc.scrollLeft - startLeft) > 1) { changed = true; }
	    }
	    if (!changed) { break }
	  }
	  return rect
	}

	// Scroll a given set of coordinates into view (immediately).
	function scrollIntoView(cm, rect) {
	  var scrollPos = calculateScrollPos(cm, rect);
	  if (scrollPos.scrollTop != null) { updateScrollTop(cm, scrollPos.scrollTop); }
	  if (scrollPos.scrollLeft != null) { setScrollLeft(cm, scrollPos.scrollLeft); }
	}

	// Calculate a new scroll position needed to scroll the given
	// rectangle into view. Returns an object with scrollTop and
	// scrollLeft properties. When these are undefined, the
	// vertical/horizontal position does not need to be adjusted.
	function calculateScrollPos(cm, rect) {
	  var display = cm.display, snapMargin = textHeight(cm.display);
	  if (rect.top < 0) { rect.top = 0; }
	  var screentop = cm.curOp && cm.curOp.scrollTop != null ? cm.curOp.scrollTop : display.scroller.scrollTop;
	  var screen = displayHeight(cm), result = {};
	  if (rect.bottom - rect.top > screen) { rect.bottom = rect.top + screen; }
	  var docBottom = cm.doc.height + paddingVert(display);
	  var atTop = rect.top < snapMargin, atBottom = rect.bottom > docBottom - snapMargin;
	  if (rect.top < screentop) {
	    result.scrollTop = atTop ? 0 : rect.top;
	  } else if (rect.bottom > screentop + screen) {
	    var newTop = Math.min(rect.top, (atBottom ? docBottom : rect.bottom) - screen);
	    if (newTop != screentop) { result.scrollTop = newTop; }
	  }

	  var screenleft = cm.curOp && cm.curOp.scrollLeft != null ? cm.curOp.scrollLeft : display.scroller.scrollLeft;
	  var screenw = displayWidth(cm) - (cm.options.fixedGutter ? display.gutters.offsetWidth : 0);
	  var tooWide = rect.right - rect.left > screenw;
	  if (tooWide) { rect.right = rect.left + screenw; }
	  if (rect.left < 10)
	    { result.scrollLeft = 0; }
	  else if (rect.left < screenleft)
	    { result.scrollLeft = Math.max(0, rect.left - (tooWide ? 0 : 10)); }
	  else if (rect.right > screenw + screenleft - 3)
	    { result.scrollLeft = rect.right + (tooWide ? 0 : 10) - screenw; }
	  return result
	}

	// Store a relative adjustment to the scroll position in the current
	// operation (to be applied when the operation finishes).
	function addToScrollTop(cm, top) {
	  if (top == null) { return }
	  resolveScrollToPos(cm);
	  cm.curOp.scrollTop = (cm.curOp.scrollTop == null ? cm.doc.scrollTop : cm.curOp.scrollTop) + top;
	}

	// Make sure that at the end of the operation the current cursor is
	// shown.
	function ensureCursorVisible(cm) {
	  resolveScrollToPos(cm);
	  var cur = cm.getCursor();
	  cm.curOp.scrollToPos = {from: cur, to: cur, margin: cm.options.cursorScrollMargin};
	}

	function scrollToCoords(cm, x, y) {
	  if (x != null || y != null) { resolveScrollToPos(cm); }
	  if (x != null) { cm.curOp.scrollLeft = x; }
	  if (y != null) { cm.curOp.scrollTop = y; }
	}

	function scrollToRange(cm, range$$1) {
	  resolveScrollToPos(cm);
	  cm.curOp.scrollToPos = range$$1;
	}

	// When an operation has its scrollToPos property set, and another
	// scroll action is applied before the end of the operation, this
	// 'simulates' scrolling that position into view in a cheap way, so
	// that the effect of intermediate scroll commands is not ignored.
	function resolveScrollToPos(cm) {
	  var range$$1 = cm.curOp.scrollToPos;
	  if (range$$1) {
	    cm.curOp.scrollToPos = null;
	    var from = estimateCoords(cm, range$$1.from), to = estimateCoords(cm, range$$1.to);
	    scrollToCoordsRange(cm, from, to, range$$1.margin);
	  }
	}

	function scrollToCoordsRange(cm, from, to, margin) {
	  var sPos = calculateScrollPos(cm, {
	    left: Math.min(from.left, to.left),
	    top: Math.min(from.top, to.top) - margin,
	    right: Math.max(from.right, to.right),
	    bottom: Math.max(from.bottom, to.bottom) + margin
	  });
	  scrollToCoords(cm, sPos.scrollLeft, sPos.scrollTop);
	}

	// Sync the scrollable area and scrollbars, ensure the viewport
	// covers the visible area.
	function updateScrollTop(cm, val) {
	  if (Math.abs(cm.doc.scrollTop - val) < 2) { return }
	  if (!gecko) { updateDisplaySimple(cm, {top: val}); }
	  setScrollTop(cm, val, true);
	  if (gecko) { updateDisplaySimple(cm); }
	  startWorker(cm, 100);
	}

	function setScrollTop(cm, val, forceScroll) {
	  val = Math.min(cm.display.scroller.scrollHeight - cm.display.scroller.clientHeight, val);
	  if (cm.display.scroller.scrollTop == val && !forceScroll) { return }
	  cm.doc.scrollTop = val;
	  cm.display.scrollbars.setScrollTop(val);
	  if (cm.display.scroller.scrollTop != val) { cm.display.scroller.scrollTop = val; }
	}

	// Sync scroller and scrollbar, ensure the gutter elements are
	// aligned.
	function setScrollLeft(cm, val, isScroller, forceScroll) {
	  val = Math.min(val, cm.display.scroller.scrollWidth - cm.display.scroller.clientWidth);
	  if ((isScroller ? val == cm.doc.scrollLeft : Math.abs(cm.doc.scrollLeft - val) < 2) && !forceScroll) { return }
	  cm.doc.scrollLeft = val;
	  alignHorizontally(cm);
	  if (cm.display.scroller.scrollLeft != val) { cm.display.scroller.scrollLeft = val; }
	  cm.display.scrollbars.setScrollLeft(val);
	}

	// SCROLLBARS

	// Prepare DOM reads needed to update the scrollbars. Done in one
	// shot to minimize update/measure roundtrips.
	function measureForScrollbars(cm) {
	  var d = cm.display, gutterW = d.gutters.offsetWidth;
	  var docH = Math.round(cm.doc.height + paddingVert(cm.display));
	  return {
	    clientHeight: d.scroller.clientHeight,
	    viewHeight: d.wrapper.clientHeight,
	    scrollWidth: d.scroller.scrollWidth, clientWidth: d.scroller.clientWidth,
	    viewWidth: d.wrapper.clientWidth,
	    barLeft: cm.options.fixedGutter ? gutterW : 0,
	    docHeight: docH,
	    scrollHeight: docH + scrollGap(cm) + d.barHeight,
	    nativeBarWidth: d.nativeBarWidth,
	    gutterWidth: gutterW
	  }
	}

	var NativeScrollbars = function(place, scroll, cm) {
	  this.cm = cm;
	  var vert = this.vert = elt("div", [elt("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar");
	  var horiz = this.horiz = elt("div", [elt("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
	  place(vert); place(horiz);

	  on(vert, "scroll", function () {
	    if (vert.clientHeight) { scroll(vert.scrollTop, "vertical"); }
	  });
	  on(horiz, "scroll", function () {
	    if (horiz.clientWidth) { scroll(horiz.scrollLeft, "horizontal"); }
	  });

	  this.checkedZeroWidth = false;
	  // Need to set a minimum width to see the scrollbar on IE7 (but must not set it on IE8).
	  if (ie && ie_version < 8) { this.horiz.style.minHeight = this.vert.style.minWidth = "18px"; }
	};

	NativeScrollbars.prototype.update = function (measure) {
	  var needsH = measure.scrollWidth > measure.clientWidth + 1;
	  var needsV = measure.scrollHeight > measure.clientHeight + 1;
	  var sWidth = measure.nativeBarWidth;

	  if (needsV) {
	    this.vert.style.display = "block";
	    this.vert.style.bottom = needsH ? sWidth + "px" : "0";
	    var totalHeight = measure.viewHeight - (needsH ? sWidth : 0);
	    // A bug in IE8 can cause this value to be negative, so guard it.
	    this.vert.firstChild.style.height =
	      Math.max(0, measure.scrollHeight - measure.clientHeight + totalHeight) + "px";
	  } else {
	    this.vert.style.display = "";
	    this.vert.firstChild.style.height = "0";
	  }

	  if (needsH) {
	    this.horiz.style.display = "block";
	    this.horiz.style.right = needsV ? sWidth + "px" : "0";
	    this.horiz.style.left = measure.barLeft + "px";
	    var totalWidth = measure.viewWidth - measure.barLeft - (needsV ? sWidth : 0);
	    this.horiz.firstChild.style.width =
	      Math.max(0, measure.scrollWidth - measure.clientWidth + totalWidth) + "px";
	  } else {
	    this.horiz.style.display = "";
	    this.horiz.firstChild.style.width = "0";
	  }

	  if (!this.checkedZeroWidth && measure.clientHeight > 0) {
	    if (sWidth == 0) { this.zeroWidthHack(); }
	    this.checkedZeroWidth = true;
	  }

	  return {right: needsV ? sWidth : 0, bottom: needsH ? sWidth : 0}
	};

	NativeScrollbars.prototype.setScrollLeft = function (pos) {
	  if (this.horiz.scrollLeft != pos) { this.horiz.scrollLeft = pos; }
	  if (this.disableHoriz) { this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz"); }
	};

	NativeScrollbars.prototype.setScrollTop = function (pos) {
	  if (this.vert.scrollTop != pos) { this.vert.scrollTop = pos; }
	  if (this.disableVert) { this.enableZeroWidthBar(this.vert, this.disableVert, "vert"); }
	};

	NativeScrollbars.prototype.zeroWidthHack = function () {
	  var w = mac && !mac_geMountainLion ? "12px" : "18px";
	  this.horiz.style.height = this.vert.style.width = w;
	  this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none";
	  this.disableHoriz = new Delayed;
	  this.disableVert = new Delayed;
	};

	NativeScrollbars.prototype.enableZeroWidthBar = function (bar, delay, type) {
	  bar.style.pointerEvents = "auto";
	  function maybeDisable() {
	    // To find out whether the scrollbar is still visible, we
	    // check whether the element under the pixel in the bottom
	    // right corner of the scrollbar box is the scrollbar box
	    // itself (when the bar is still visible) or its filler child
	    // (when the bar is hidden). If it is still visible, we keep
	    // it enabled, if it's hidden, we disable pointer events.
	    var box = bar.getBoundingClientRect();
	    var elt$$1 = type == "vert" ? document.elementFromPoint(box.right - 1, (box.top + box.bottom) / 2)
	        : document.elementFromPoint((box.right + box.left) / 2, box.bottom - 1);
	    if (elt$$1 != bar) { bar.style.pointerEvents = "none"; }
	    else { delay.set(1000, maybeDisable); }
	  }
	  delay.set(1000, maybeDisable);
	};

	NativeScrollbars.prototype.clear = function () {
	  var parent = this.horiz.parentNode;
	  parent.removeChild(this.horiz);
	  parent.removeChild(this.vert);
	};

	var NullScrollbars = function () {};

	NullScrollbars.prototype.update = function () { return {bottom: 0, right: 0} };
	NullScrollbars.prototype.setScrollLeft = function () {};
	NullScrollbars.prototype.setScrollTop = function () {};
	NullScrollbars.prototype.clear = function () {};

	function updateScrollbars(cm, measure) {
	  if (!measure) { measure = measureForScrollbars(cm); }
	  var startWidth = cm.display.barWidth, startHeight = cm.display.barHeight;
	  updateScrollbarsInner(cm, measure);
	  for (var i = 0; i < 4 && startWidth != cm.display.barWidth || startHeight != cm.display.barHeight; i++) {
	    if (startWidth != cm.display.barWidth && cm.options.lineWrapping)
	      { updateHeightsInViewport(cm); }
	    updateScrollbarsInner(cm, measureForScrollbars(cm));
	    startWidth = cm.display.barWidth; startHeight = cm.display.barHeight;
	  }
	}

	// Re-synchronize the fake scrollbars with the actual size of the
	// content.
	function updateScrollbarsInner(cm, measure) {
	  var d = cm.display;
	  var sizes = d.scrollbars.update(measure);

	  d.sizer.style.paddingRight = (d.barWidth = sizes.right) + "px";
	  d.sizer.style.paddingBottom = (d.barHeight = sizes.bottom) + "px";
	  d.heightForcer.style.borderBottom = sizes.bottom + "px solid transparent";

	  if (sizes.right && sizes.bottom) {
	    d.scrollbarFiller.style.display = "block";
	    d.scrollbarFiller.style.height = sizes.bottom + "px";
	    d.scrollbarFiller.style.width = sizes.right + "px";
	  } else { d.scrollbarFiller.style.display = ""; }
	  if (sizes.bottom && cm.options.coverGutterNextToScrollbar && cm.options.fixedGutter) {
	    d.gutterFiller.style.display = "block";
	    d.gutterFiller.style.height = sizes.bottom + "px";
	    d.gutterFiller.style.width = measure.gutterWidth + "px";
	  } else { d.gutterFiller.style.display = ""; }
	}

	var scrollbarModel = {"native": NativeScrollbars, "null": NullScrollbars};

	function initScrollbars(cm) {
	  if (cm.display.scrollbars) {
	    cm.display.scrollbars.clear();
	    if (cm.display.scrollbars.addClass)
	      { rmClass(cm.display.wrapper, cm.display.scrollbars.addClass); }
	  }

	  cm.display.scrollbars = new scrollbarModel[cm.options.scrollbarStyle](function (node) {
	    cm.display.wrapper.insertBefore(node, cm.display.scrollbarFiller);
	    // Prevent clicks in the scrollbars from killing focus
	    on(node, "mousedown", function () {
	      if (cm.state.focused) { setTimeout(function () { return cm.display.input.focus(); }, 0); }
	    });
	    node.setAttribute("cm-not-content", "true");
	  }, function (pos, axis) {
	    if (axis == "horizontal") { setScrollLeft(cm, pos); }
	    else { updateScrollTop(cm, pos); }
	  }, cm);
	  if (cm.display.scrollbars.addClass)
	    { addClass(cm.display.wrapper, cm.display.scrollbars.addClass); }
	}

	// Operations are used to wrap a series of changes to the editor
	// state in such a way that each change won't have to update the
	// cursor and display (which would be awkward, slow, and
	// error-prone). Instead, display updates are batched and then all
	// combined and executed at once.

	var nextOpId = 0;
	// Start a new operation.
	function startOperation(cm) {
	  cm.curOp = {
	    cm: cm,
	    viewChanged: false,      // Flag that indicates that lines might need to be redrawn
	    startHeight: cm.doc.height, // Used to detect need to update scrollbar
	    forceUpdate: false,      // Used to force a redraw
	    updateInput: null,       // Whether to reset the input textarea
	    typing: false,           // Whether this reset should be careful to leave existing text (for compositing)
	    changeObjs: null,        // Accumulated changes, for firing change events
	    cursorActivityHandlers: null, // Set of handlers to fire cursorActivity on
	    cursorActivityCalled: 0, // Tracks which cursorActivity handlers have been called already
	    selectionChanged: false, // Whether the selection needs to be redrawn
	    updateMaxLine: false,    // Set when the widest line needs to be determined anew
	    scrollLeft: null, scrollTop: null, // Intermediate scroll position, not pushed to DOM yet
	    scrollToPos: null,       // Used to scroll to a specific position
	    focus: false,
	    id: ++nextOpId           // Unique ID
	  };
	  pushOperation(cm.curOp);
	}

	// Finish an operation, updating the display and signalling delayed events
	function endOperation(cm) {
	  var op = cm.curOp;
	  finishOperation(op, function (group) {
	    for (var i = 0; i < group.ops.length; i++)
	      { group.ops[i].cm.curOp = null; }
	    endOperations(group);
	  });
	}

	// The DOM updates done when an operation finishes are batched so
	// that the minimum number of relayouts are required.
	function endOperations(group) {
	  var ops = group.ops;
	  for (var i = 0; i < ops.length; i++) // Read DOM
	    { endOperation_R1(ops[i]); }
	  for (var i$1 = 0; i$1 < ops.length; i$1++) // Write DOM (maybe)
	    { endOperation_W1(ops[i$1]); }
	  for (var i$2 = 0; i$2 < ops.length; i$2++) // Read DOM
	    { endOperation_R2(ops[i$2]); }
	  for (var i$3 = 0; i$3 < ops.length; i$3++) // Write DOM (maybe)
	    { endOperation_W2(ops[i$3]); }
	  for (var i$4 = 0; i$4 < ops.length; i$4++) // Read DOM
	    { endOperation_finish(ops[i$4]); }
	}

	function endOperation_R1(op) {
	  var cm = op.cm, display = cm.display;
	  maybeClipScrollbars(cm);
	  if (op.updateMaxLine) { findMaxLine(cm); }

	  op.mustUpdate = op.viewChanged || op.forceUpdate || op.scrollTop != null ||
	    op.scrollToPos && (op.scrollToPos.from.line < display.viewFrom ||
	                       op.scrollToPos.to.line >= display.viewTo) ||
	    display.maxLineChanged && cm.options.lineWrapping;
	  op.update = op.mustUpdate &&
	    new DisplayUpdate(cm, op.mustUpdate && {top: op.scrollTop, ensure: op.scrollToPos}, op.forceUpdate);
	}

	function endOperation_W1(op) {
	  op.updatedDisplay = op.mustUpdate && updateDisplayIfNeeded(op.cm, op.update);
	}

	function endOperation_R2(op) {
	  var cm = op.cm, display = cm.display;
	  if (op.updatedDisplay) { updateHeightsInViewport(cm); }

	  op.barMeasure = measureForScrollbars(cm);

	  // If the max line changed since it was last measured, measure it,
	  // and ensure the document's width matches it.
	  // updateDisplay_W2 will use these properties to do the actual resizing
	  if (display.maxLineChanged && !cm.options.lineWrapping) {
	    op.adjustWidthTo = measureChar(cm, display.maxLine, display.maxLine.text.length).left + 3;
	    cm.display.sizerWidth = op.adjustWidthTo;
	    op.barMeasure.scrollWidth =
	      Math.max(display.scroller.clientWidth, display.sizer.offsetLeft + op.adjustWidthTo + scrollGap(cm) + cm.display.barWidth);
	    op.maxScrollLeft = Math.max(0, display.sizer.offsetLeft + op.adjustWidthTo - displayWidth(cm));
	  }

	  if (op.updatedDisplay || op.selectionChanged)
	    { op.preparedSelection = display.input.prepareSelection(); }
	}

	function endOperation_W2(op) {
	  var cm = op.cm;

	  if (op.adjustWidthTo != null) {
	    cm.display.sizer.style.minWidth = op.adjustWidthTo + "px";
	    if (op.maxScrollLeft < cm.doc.scrollLeft)
	      { setScrollLeft(cm, Math.min(cm.display.scroller.scrollLeft, op.maxScrollLeft), true); }
	    cm.display.maxLineChanged = false;
	  }

	  var takeFocus = op.focus && op.focus == activeElt();
	  if (op.preparedSelection)
	    { cm.display.input.showSelection(op.preparedSelection, takeFocus); }
	  if (op.updatedDisplay || op.startHeight != cm.doc.height)
	    { updateScrollbars(cm, op.barMeasure); }
	  if (op.updatedDisplay)
	    { setDocumentHeight(cm, op.barMeasure); }

	  if (op.selectionChanged) { restartBlink(cm); }

	  if (cm.state.focused && op.updateInput)
	    { cm.display.input.reset(op.typing); }
	  if (takeFocus) { ensureFocus(op.cm); }
	}

	function endOperation_finish(op) {
	  var cm = op.cm, display = cm.display, doc = cm.doc;

	  if (op.updatedDisplay) { postUpdateDisplay(cm, op.update); }

	  // Abort mouse wheel delta measurement, when scrolling explicitly
	  if (display.wheelStartX != null && (op.scrollTop != null || op.scrollLeft != null || op.scrollToPos))
	    { display.wheelStartX = display.wheelStartY = null; }

	  // Propagate the scroll position to the actual DOM scroller
	  if (op.scrollTop != null) { setScrollTop(cm, op.scrollTop, op.forceScroll); }

	  if (op.scrollLeft != null) { setScrollLeft(cm, op.scrollLeft, true, true); }
	  // If we need to scroll a specific position into view, do so.
	  if (op.scrollToPos) {
	    var rect = scrollPosIntoView(cm, clipPos(doc, op.scrollToPos.from),
	                                 clipPos(doc, op.scrollToPos.to), op.scrollToPos.margin);
	    maybeScrollWindow(cm, rect);
	  }

	  // Fire events for markers that are hidden/unidden by editing or
	  // undoing
	  var hidden = op.maybeHiddenMarkers, unhidden = op.maybeUnhiddenMarkers;
	  if (hidden) { for (var i = 0; i < hidden.length; ++i)
	    { if (!hidden[i].lines.length) { signal(hidden[i], "hide"); } } }
	  if (unhidden) { for (var i$1 = 0; i$1 < unhidden.length; ++i$1)
	    { if (unhidden[i$1].lines.length) { signal(unhidden[i$1], "unhide"); } } }

	  if (display.wrapper.offsetHeight)
	    { doc.scrollTop = cm.display.scroller.scrollTop; }

	  // Fire change events, and delayed event handlers
	  if (op.changeObjs)
	    { signal(cm, "changes", cm, op.changeObjs); }
	  if (op.update)
	    { op.update.finish(); }
	}

	// Run the given function in an operation
	function runInOp(cm, f) {
	  if (cm.curOp) { return f() }
	  startOperation(cm);
	  try { return f() }
	  finally { endOperation(cm); }
	}
	// Wraps a function in an operation. Returns the wrapped function.
	function operation(cm, f) {
	  return function() {
	    if (cm.curOp) { return f.apply(cm, arguments) }
	    startOperation(cm);
	    try { return f.apply(cm, arguments) }
	    finally { endOperation(cm); }
	  }
	}
	// Used to add methods to editor and doc instances, wrapping them in
	// operations.
	function methodOp(f) {
	  return function() {
	    if (this.curOp) { return f.apply(this, arguments) }
	    startOperation(this);
	    try { return f.apply(this, arguments) }
	    finally { endOperation(this); }
	  }
	}
	function docMethodOp(f) {
	  return function() {
	    var cm = this.cm;
	    if (!cm || cm.curOp) { return f.apply(this, arguments) }
	    startOperation(cm);
	    try { return f.apply(this, arguments) }
	    finally { endOperation(cm); }
	  }
	}

	// Updates the display.view data structure for a given change to the
	// document. From and to are in pre-change coordinates. Lendiff is
	// the amount of lines added or subtracted by the change. This is
	// used for changes that span multiple lines, or change the way
	// lines are divided into visual lines. regLineChange (below)
	// registers single-line changes.
	function regChange(cm, from, to, lendiff) {
	  if (from == null) { from = cm.doc.first; }
	  if (to == null) { to = cm.doc.first + cm.doc.size; }
	  if (!lendiff) { lendiff = 0; }

	  var display = cm.display;
	  if (lendiff && to < display.viewTo &&
	      (display.updateLineNumbers == null || display.updateLineNumbers > from))
	    { display.updateLineNumbers = from; }

	  cm.curOp.viewChanged = true;

	  if (from >= display.viewTo) { // Change after
	    if (sawCollapsedSpans && visualLineNo(cm.doc, from) < display.viewTo)
	      { resetView(cm); }
	  } else if (to <= display.viewFrom) { // Change before
	    if (sawCollapsedSpans && visualLineEndNo(cm.doc, to + lendiff) > display.viewFrom) {
	      resetView(cm);
	    } else {
	      display.viewFrom += lendiff;
	      display.viewTo += lendiff;
	    }
	  } else if (from <= display.viewFrom && to >= display.viewTo) { // Full overlap
	    resetView(cm);
	  } else if (from <= display.viewFrom) { // Top overlap
	    var cut = viewCuttingPoint(cm, to, to + lendiff, 1);
	    if (cut) {
	      display.view = display.view.slice(cut.index);
	      display.viewFrom = cut.lineN;
	      display.viewTo += lendiff;
	    } else {
	      resetView(cm);
	    }
	  } else if (to >= display.viewTo) { // Bottom overlap
	    var cut$1 = viewCuttingPoint(cm, from, from, -1);
	    if (cut$1) {
	      display.view = display.view.slice(0, cut$1.index);
	      display.viewTo = cut$1.lineN;
	    } else {
	      resetView(cm);
	    }
	  } else { // Gap in the middle
	    var cutTop = viewCuttingPoint(cm, from, from, -1);
	    var cutBot = viewCuttingPoint(cm, to, to + lendiff, 1);
	    if (cutTop && cutBot) {
	      display.view = display.view.slice(0, cutTop.index)
	        .concat(buildViewArray(cm, cutTop.lineN, cutBot.lineN))
	        .concat(display.view.slice(cutBot.index));
	      display.viewTo += lendiff;
	    } else {
	      resetView(cm);
	    }
	  }

	  var ext = display.externalMeasured;
	  if (ext) {
	    if (to < ext.lineN)
	      { ext.lineN += lendiff; }
	    else if (from < ext.lineN + ext.size)
	      { display.externalMeasured = null; }
	  }
	}

	// Register a change to a single line. Type must be one of "text",
	// "gutter", "class", "widget"
	function regLineChange(cm, line, type) {
	  cm.curOp.viewChanged = true;
	  var display = cm.display, ext = cm.display.externalMeasured;
	  if (ext && line >= ext.lineN && line < ext.lineN + ext.size)
	    { display.externalMeasured = null; }

	  if (line < display.viewFrom || line >= display.viewTo) { return }
	  var lineView = display.view[findViewIndex(cm, line)];
	  if (lineView.node == null) { return }
	  var arr = lineView.changes || (lineView.changes = []);
	  if (indexOf(arr, type) == -1) { arr.push(type); }
	}

	// Clear the view.
	function resetView(cm) {
	  cm.display.viewFrom = cm.display.viewTo = cm.doc.first;
	  cm.display.view = [];
	  cm.display.viewOffset = 0;
	}

	function viewCuttingPoint(cm, oldN, newN, dir) {
	  var index = findViewIndex(cm, oldN), diff, view = cm.display.view;
	  if (!sawCollapsedSpans || newN == cm.doc.first + cm.doc.size)
	    { return {index: index, lineN: newN} }
	  var n = cm.display.viewFrom;
	  for (var i = 0; i < index; i++)
	    { n += view[i].size; }
	  if (n != oldN) {
	    if (dir > 0) {
	      if (index == view.length - 1) { return null }
	      diff = (n + view[index].size) - oldN;
	      index++;
	    } else {
	      diff = n - oldN;
	    }
	    oldN += diff; newN += diff;
	  }
	  while (visualLineNo(cm.doc, newN) != newN) {
	    if (index == (dir < 0 ? 0 : view.length - 1)) { return null }
	    newN += dir * view[index - (dir < 0 ? 1 : 0)].size;
	    index += dir;
	  }
	  return {index: index, lineN: newN}
	}

	// Force the view to cover a given range, adding empty view element
	// or clipping off existing ones as needed.
	function adjustView(cm, from, to) {
	  var display = cm.display, view = display.view;
	  if (view.length == 0 || from >= display.viewTo || to <= display.viewFrom) {
	    display.view = buildViewArray(cm, from, to);
	    display.viewFrom = from;
	  } else {
	    if (display.viewFrom > from)
	      { display.view = buildViewArray(cm, from, display.viewFrom).concat(display.view); }
	    else if (display.viewFrom < from)
	      { display.view = display.view.slice(findViewIndex(cm, from)); }
	    display.viewFrom = from;
	    if (display.viewTo < to)
	      { display.view = display.view.concat(buildViewArray(cm, display.viewTo, to)); }
	    else if (display.viewTo > to)
	      { display.view = display.view.slice(0, findViewIndex(cm, to)); }
	  }
	  display.viewTo = to;
	}

	// Count the number of lines in the view whose DOM representation is
	// out of date (or nonexistent).
	function countDirtyView(cm) {
	  var view = cm.display.view, dirty = 0;
	  for (var i = 0; i < view.length; i++) {
	    var lineView = view[i];
	    if (!lineView.hidden && (!lineView.node || lineView.changes)) { ++dirty; }
	  }
	  return dirty
	}

	// HIGHLIGHT WORKER

	function startWorker(cm, time) {
	  if (cm.doc.highlightFrontier < cm.display.viewTo)
	    { cm.state.highlight.set(time, bind(highlightWorker, cm)); }
	}

	function highlightWorker(cm) {
	  var doc = cm.doc;
	  if (doc.highlightFrontier >= cm.display.viewTo) { return }
	  var end = +new Date + cm.options.workTime;
	  var context = getContextBefore(cm, doc.highlightFrontier);
	  var changedLines = [];

	  doc.iter(context.line, Math.min(doc.first + doc.size, cm.display.viewTo + 500), function (line) {
	    if (context.line >= cm.display.viewFrom) { // Visible
	      var oldStyles = line.styles;
	      var resetState = line.text.length > cm.options.maxHighlightLength ? copyState(doc.mode, context.state) : null;
	      var highlighted = highlightLine(cm, line, context, true);
	      if (resetState) { context.state = resetState; }
	      line.styles = highlighted.styles;
	      var oldCls = line.styleClasses, newCls = highlighted.classes;
	      if (newCls) { line.styleClasses = newCls; }
	      else if (oldCls) { line.styleClasses = null; }
	      var ischange = !oldStyles || oldStyles.length != line.styles.length ||
	        oldCls != newCls && (!oldCls || !newCls || oldCls.bgClass != newCls.bgClass || oldCls.textClass != newCls.textClass);
	      for (var i = 0; !ischange && i < oldStyles.length; ++i) { ischange = oldStyles[i] != line.styles[i]; }
	      if (ischange) { changedLines.push(context.line); }
	      line.stateAfter = context.save();
	      context.nextLine();
	    } else {
	      if (line.text.length <= cm.options.maxHighlightLength)
	        { processLine(cm, line.text, context); }
	      line.stateAfter = context.line % 5 == 0 ? context.save() : null;
	      context.nextLine();
	    }
	    if (+new Date > end) {
	      startWorker(cm, cm.options.workDelay);
	      return true
	    }
	  });
	  doc.highlightFrontier = context.line;
	  doc.modeFrontier = Math.max(doc.modeFrontier, context.line);
	  if (changedLines.length) { runInOp(cm, function () {
	    for (var i = 0; i < changedLines.length; i++)
	      { regLineChange(cm, changedLines[i], "text"); }
	  }); }
	}

	// DISPLAY DRAWING

	var DisplayUpdate = function(cm, viewport, force) {
	  var display = cm.display;

	  this.viewport = viewport;
	  // Store some values that we'll need later (but don't want to force a relayout for)
	  this.visible = visibleLines(display, cm.doc, viewport);
	  this.editorIsHidden = !display.wrapper.offsetWidth;
	  this.wrapperHeight = display.wrapper.clientHeight;
	  this.wrapperWidth = display.wrapper.clientWidth;
	  this.oldDisplayWidth = displayWidth(cm);
	  this.force = force;
	  this.dims = getDimensions(cm);
	  this.events = [];
	};

	DisplayUpdate.prototype.signal = function (emitter, type) {
	  if (hasHandler(emitter, type))
	    { this.events.push(arguments); }
	};
	DisplayUpdate.prototype.finish = function () {
	    var this$1 = this;

	  for (var i = 0; i < this.events.length; i++)
	    { signal.apply(null, this$1.events[i]); }
	};

	function maybeClipScrollbars(cm) {
	  var display = cm.display;
	  if (!display.scrollbarsClipped && display.scroller.offsetWidth) {
	    display.nativeBarWidth = display.scroller.offsetWidth - display.scroller.clientWidth;
	    display.heightForcer.style.height = scrollGap(cm) + "px";
	    display.sizer.style.marginBottom = -display.nativeBarWidth + "px";
	    display.sizer.style.borderRightWidth = scrollGap(cm) + "px";
	    display.scrollbarsClipped = true;
	  }
	}

	function selectionSnapshot(cm) {
	  if (cm.hasFocus()) { return null }
	  var active = activeElt();
	  if (!active || !contains(cm.display.lineDiv, active)) { return null }
	  var result = {activeElt: active};
	  if (window.getSelection) {
	    var sel = window.getSelection();
	    if (sel.anchorNode && sel.extend && contains(cm.display.lineDiv, sel.anchorNode)) {
	      result.anchorNode = sel.anchorNode;
	      result.anchorOffset = sel.anchorOffset;
	      result.focusNode = sel.focusNode;
	      result.focusOffset = sel.focusOffset;
	    }
	  }
	  return result
	}

	function restoreSelection(snapshot) {
	  if (!snapshot || !snapshot.activeElt || snapshot.activeElt == activeElt()) { return }
	  snapshot.activeElt.focus();
	  if (snapshot.anchorNode && contains(document.body, snapshot.anchorNode) && contains(document.body, snapshot.focusNode)) {
	    var sel = window.getSelection(), range$$1 = document.createRange();
	    range$$1.setEnd(snapshot.anchorNode, snapshot.anchorOffset);
	    range$$1.collapse(false);
	    sel.removeAllRanges();
	    sel.addRange(range$$1);
	    sel.extend(snapshot.focusNode, snapshot.focusOffset);
	  }
	}

	// Does the actual updating of the line display. Bails out
	// (returning false) when there is nothing to be done and forced is
	// false.
	function updateDisplayIfNeeded(cm, update) {
	  var display = cm.display, doc = cm.doc;

	  if (update.editorIsHidden) {
	    resetView(cm);
	    return false
	  }

	  // Bail out if the visible area is already rendered and nothing changed.
	  if (!update.force &&
	      update.visible.from >= display.viewFrom && update.visible.to <= display.viewTo &&
	      (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo) &&
	      display.renderedView == display.view && countDirtyView(cm) == 0)
	    { return false }

	  if (maybeUpdateLineNumberWidth(cm)) {
	    resetView(cm);
	    update.dims = getDimensions(cm);
	  }

	  // Compute a suitable new viewport (from & to)
	  var end = doc.first + doc.size;
	  var from = Math.max(update.visible.from - cm.options.viewportMargin, doc.first);
	  var to = Math.min(end, update.visible.to + cm.options.viewportMargin);
	  if (display.viewFrom < from && from - display.viewFrom < 20) { from = Math.max(doc.first, display.viewFrom); }
	  if (display.viewTo > to && display.viewTo - to < 20) { to = Math.min(end, display.viewTo); }
	  if (sawCollapsedSpans) {
	    from = visualLineNo(cm.doc, from);
	    to = visualLineEndNo(cm.doc, to);
	  }

	  var different = from != display.viewFrom || to != display.viewTo ||
	    display.lastWrapHeight != update.wrapperHeight || display.lastWrapWidth != update.wrapperWidth;
	  adjustView(cm, from, to);

	  display.viewOffset = heightAtLine(getLine(cm.doc, display.viewFrom));
	  // Position the mover div to align with the current scroll position
	  cm.display.mover.style.top = display.viewOffset + "px";

	  var toUpdate = countDirtyView(cm);
	  if (!different && toUpdate == 0 && !update.force && display.renderedView == display.view &&
	      (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo))
	    { return false }

	  // For big changes, we hide the enclosing element during the
	  // update, since that speeds up the operations on most browsers.
	  var selSnapshot = selectionSnapshot(cm);
	  if (toUpdate > 4) { display.lineDiv.style.display = "none"; }
	  patchDisplay(cm, display.updateLineNumbers, update.dims);
	  if (toUpdate > 4) { display.lineDiv.style.display = ""; }
	  display.renderedView = display.view;
	  // There might have been a widget with a focused element that got
	  // hidden or updated, if so re-focus it.
	  restoreSelection(selSnapshot);

	  // Prevent selection and cursors from interfering with the scroll
	  // width and height.
	  removeChildren(display.cursorDiv);
	  removeChildren(display.selectionDiv);
	  display.gutters.style.height = display.sizer.style.minHeight = 0;

	  if (different) {
	    display.lastWrapHeight = update.wrapperHeight;
	    display.lastWrapWidth = update.wrapperWidth;
	    startWorker(cm, 400);
	  }

	  display.updateLineNumbers = null;

	  return true
	}

	function postUpdateDisplay(cm, update) {
	  var viewport = update.viewport;

	  for (var first = true;; first = false) {
	    if (!first || !cm.options.lineWrapping || update.oldDisplayWidth == displayWidth(cm)) {
	      // Clip forced viewport to actual scrollable area.
	      if (viewport && viewport.top != null)
	        { viewport = {top: Math.min(cm.doc.height + paddingVert(cm.display) - displayHeight(cm), viewport.top)}; }
	      // Updated line heights might result in the drawn area not
	      // actually covering the viewport. Keep looping until it does.
	      update.visible = visibleLines(cm.display, cm.doc, viewport);
	      if (update.visible.from >= cm.display.viewFrom && update.visible.to <= cm.display.viewTo)
	        { break }
	    }
	    if (!updateDisplayIfNeeded(cm, update)) { break }
	    updateHeightsInViewport(cm);
	    var barMeasure = measureForScrollbars(cm);
	    updateSelection(cm);
	    updateScrollbars(cm, barMeasure);
	    setDocumentHeight(cm, barMeasure);
	    update.force = false;
	  }

	  update.signal(cm, "update", cm);
	  if (cm.display.viewFrom != cm.display.reportedViewFrom || cm.display.viewTo != cm.display.reportedViewTo) {
	    update.signal(cm, "viewportChange", cm, cm.display.viewFrom, cm.display.viewTo);
	    cm.display.reportedViewFrom = cm.display.viewFrom; cm.display.reportedViewTo = cm.display.viewTo;
	  }
	}

	function updateDisplaySimple(cm, viewport) {
	  var update = new DisplayUpdate(cm, viewport);
	  if (updateDisplayIfNeeded(cm, update)) {
	    updateHeightsInViewport(cm);
	    postUpdateDisplay(cm, update);
	    var barMeasure = measureForScrollbars(cm);
	    updateSelection(cm);
	    updateScrollbars(cm, barMeasure);
	    setDocumentHeight(cm, barMeasure);
	    update.finish();
	  }
	}

	// Sync the actual display DOM structure with display.view, removing
	// nodes for lines that are no longer in view, and creating the ones
	// that are not there yet, and updating the ones that are out of
	// date.
	function patchDisplay(cm, updateNumbersFrom, dims) {
	  var display = cm.display, lineNumbers = cm.options.lineNumbers;
	  var container = display.lineDiv, cur = container.firstChild;

	  function rm(node) {
	    var next = node.nextSibling;
	    // Works around a throw-scroll bug in OS X Webkit
	    if (webkit && mac && cm.display.currentWheelTarget == node)
	      { node.style.display = "none"; }
	    else
	      { node.parentNode.removeChild(node); }
	    return next
	  }

	  var view = display.view, lineN = display.viewFrom;
	  // Loop over the elements in the view, syncing cur (the DOM nodes
	  // in display.lineDiv) with the view as we go.
	  for (var i = 0; i < view.length; i++) {
	    var lineView = view[i];
	    if (lineView.hidden) {
	    } else if (!lineView.node || lineView.node.parentNode != container) { // Not drawn yet
	      var node = buildLineElement(cm, lineView, lineN, dims);
	      container.insertBefore(node, cur);
	    } else { // Already drawn
	      while (cur != lineView.node) { cur = rm(cur); }
	      var updateNumber = lineNumbers && updateNumbersFrom != null &&
	        updateNumbersFrom <= lineN && lineView.lineNumber;
	      if (lineView.changes) {
	        if (indexOf(lineView.changes, "gutter") > -1) { updateNumber = false; }
	        updateLineForChanges(cm, lineView, lineN, dims);
	      }
	      if (updateNumber) {
	        removeChildren(lineView.lineNumber);
	        lineView.lineNumber.appendChild(document.createTextNode(lineNumberFor(cm.options, lineN)));
	      }
	      cur = lineView.node.nextSibling;
	    }
	    lineN += lineView.size;
	  }
	  while (cur) { cur = rm(cur); }
	}

	function updateGutterSpace(cm) {
	  var width = cm.display.gutters.offsetWidth;
	  cm.display.sizer.style.marginLeft = width + "px";
	}

	function setDocumentHeight(cm, measure) {
	  cm.display.sizer.style.minHeight = measure.docHeight + "px";
	  cm.display.heightForcer.style.top = measure.docHeight + "px";
	  cm.display.gutters.style.height = (measure.docHeight + cm.display.barHeight + scrollGap(cm)) + "px";
	}

	// Rebuild the gutter elements, ensure the margin to the left of the
	// code matches their width.
	function updateGutters(cm) {
	  var gutters = cm.display.gutters, specs = cm.options.gutters;
	  removeChildren(gutters);
	  var i = 0;
	  for (; i < specs.length; ++i) {
	    var gutterClass = specs[i];
	    var gElt = gutters.appendChild(elt("div", null, "CodeMirror-gutter " + gutterClass));
	    if (gutterClass == "CodeMirror-linenumbers") {
	      cm.display.lineGutter = gElt;
	      gElt.style.width = (cm.display.lineNumWidth || 1) + "px";
	    }
	  }
	  gutters.style.display = i ? "" : "none";
	  updateGutterSpace(cm);
	}

	// Make sure the gutters options contains the element
	// "CodeMirror-linenumbers" when the lineNumbers option is true.
	function setGuttersForLineNumbers(options) {
	  var found = indexOf(options.gutters, "CodeMirror-linenumbers");
	  if (found == -1 && options.lineNumbers) {
	    options.gutters = options.gutters.concat(["CodeMirror-linenumbers"]);
	  } else if (found > -1 && !options.lineNumbers) {
	    options.gutters = options.gutters.slice(0);
	    options.gutters.splice(found, 1);
	  }
	}

	// Since the delta values reported on mouse wheel events are
	// unstandardized between browsers and even browser versions, and
	// generally horribly unpredictable, this code starts by measuring
	// the scroll effect that the first few mouse wheel events have,
	// and, from that, detects the way it can convert deltas to pixel
	// offsets afterwards.
	//
	// The reason we want to know the amount a wheel event will scroll
	// is that it gives us a chance to update the display before the
	// actual scrolling happens, reducing flickering.

	var wheelSamples = 0;
	var wheelPixelsPerUnit = null;
	// Fill in a browser-detected starting value on browsers where we
	// know one. These don't have to be accurate -- the result of them
	// being wrong would just be a slight flicker on the first wheel
	// scroll (if it is large enough).
	if (ie) { wheelPixelsPerUnit = -.53; }
	else if (gecko) { wheelPixelsPerUnit = 15; }
	else if (chrome) { wheelPixelsPerUnit = -.7; }
	else if (safari) { wheelPixelsPerUnit = -1/3; }

	function wheelEventDelta(e) {
	  var dx = e.wheelDeltaX, dy = e.wheelDeltaY;
	  if (dx == null && e.detail && e.axis == e.HORIZONTAL_AXIS) { dx = e.detail; }
	  if (dy == null && e.detail && e.axis == e.VERTICAL_AXIS) { dy = e.detail; }
	  else if (dy == null) { dy = e.wheelDelta; }
	  return {x: dx, y: dy}
	}
	function wheelEventPixels(e) {
	  var delta = wheelEventDelta(e);
	  delta.x *= wheelPixelsPerUnit;
	  delta.y *= wheelPixelsPerUnit;
	  return delta
	}

	function onScrollWheel(cm, e) {
	  var delta = wheelEventDelta(e), dx = delta.x, dy = delta.y;

	  var display = cm.display, scroll = display.scroller;
	  // Quit if there's nothing to scroll here
	  var canScrollX = scroll.scrollWidth > scroll.clientWidth;
	  var canScrollY = scroll.scrollHeight > scroll.clientHeight;
	  if (!(dx && canScrollX || dy && canScrollY)) { return }

	  // Webkit browsers on OS X abort momentum scrolls when the target
	  // of the scroll event is removed from the scrollable element.
	  // This hack (see related code in patchDisplay) makes sure the
	  // element is kept around.
	  if (dy && mac && webkit) {
	    outer: for (var cur = e.target, view = display.view; cur != scroll; cur = cur.parentNode) {
	      for (var i = 0; i < view.length; i++) {
	        if (view[i].node == cur) {
	          cm.display.currentWheelTarget = cur;
	          break outer
	        }
	      }
	    }
	  }

	  // On some browsers, horizontal scrolling will cause redraws to
	  // happen before the gutter has been realigned, causing it to
	  // wriggle around in a most unseemly way. When we have an
	  // estimated pixels/delta value, we just handle horizontal
	  // scrolling entirely here. It'll be slightly off from native, but
	  // better than glitching out.
	  if (dx && !gecko && !presto && wheelPixelsPerUnit != null) {
	    if (dy && canScrollY)
	      { updateScrollTop(cm, Math.max(0, scroll.scrollTop + dy * wheelPixelsPerUnit)); }
	    setScrollLeft(cm, Math.max(0, scroll.scrollLeft + dx * wheelPixelsPerUnit));
	    // Only prevent default scrolling if vertical scrolling is
	    // actually possible. Otherwise, it causes vertical scroll
	    // jitter on OSX trackpads when deltaX is small and deltaY
	    // is large (issue #3579)
	    if (!dy || (dy && canScrollY))
	      { e_preventDefault(e); }
	    display.wheelStartX = null; // Abort measurement, if in progress
	    return
	  }

	  // 'Project' the visible viewport to cover the area that is being
	  // scrolled into view (if we know enough to estimate it).
	  if (dy && wheelPixelsPerUnit != null) {
	    var pixels = dy * wheelPixelsPerUnit;
	    var top = cm.doc.scrollTop, bot = top + display.wrapper.clientHeight;
	    if (pixels < 0) { top = Math.max(0, top + pixels - 50); }
	    else { bot = Math.min(cm.doc.height, bot + pixels + 50); }
	    updateDisplaySimple(cm, {top: top, bottom: bot});
	  }

	  if (wheelSamples < 20) {
	    if (display.wheelStartX == null) {
	      display.wheelStartX = scroll.scrollLeft; display.wheelStartY = scroll.scrollTop;
	      display.wheelDX = dx; display.wheelDY = dy;
	      setTimeout(function () {
	        if (display.wheelStartX == null) { return }
	        var movedX = scroll.scrollLeft - display.wheelStartX;
	        var movedY = scroll.scrollTop - display.wheelStartY;
	        var sample = (movedY && display.wheelDY && movedY / display.wheelDY) ||
	          (movedX && display.wheelDX && movedX / display.wheelDX);
	        display.wheelStartX = display.wheelStartY = null;
	        if (!sample) { return }
	        wheelPixelsPerUnit = (wheelPixelsPerUnit * wheelSamples + sample) / (wheelSamples + 1);
	        ++wheelSamples;
	      }, 200);
	    } else {
	      display.wheelDX += dx; display.wheelDY += dy;
	    }
	  }
	}

	// Selection objects are immutable. A new one is created every time
	// the selection changes. A selection is one or more non-overlapping
	// (and non-touching) ranges, sorted, and an integer that indicates
	// which one is the primary selection (the one that's scrolled into
	// view, that getCursor returns, etc).
	var Selection = function(ranges, primIndex) {
	  this.ranges = ranges;
	  this.primIndex = primIndex;
	};

	Selection.prototype.primary = function () { return this.ranges[this.primIndex] };

	Selection.prototype.equals = function (other) {
	    var this$1 = this;

	  if (other == this) { return true }
	  if (other.primIndex != this.primIndex || other.ranges.length != this.ranges.length) { return false }
	  for (var i = 0; i < this.ranges.length; i++) {
	    var here = this$1.ranges[i], there = other.ranges[i];
	    if (!equalCursorPos(here.anchor, there.anchor) || !equalCursorPos(here.head, there.head)) { return false }
	  }
	  return true
	};

	Selection.prototype.deepCopy = function () {
	    var this$1 = this;

	  var out = [];
	  for (var i = 0; i < this.ranges.length; i++)
	    { out[i] = new Range(copyPos(this$1.ranges[i].anchor), copyPos(this$1.ranges[i].head)); }
	  return new Selection(out, this.primIndex)
	};

	Selection.prototype.somethingSelected = function () {
	    var this$1 = this;

	  for (var i = 0; i < this.ranges.length; i++)
	    { if (!this$1.ranges[i].empty()) { return true } }
	  return false
	};

	Selection.prototype.contains = function (pos, end) {
	    var this$1 = this;

	  if (!end) { end = pos; }
	  for (var i = 0; i < this.ranges.length; i++) {
	    var range = this$1.ranges[i];
	    if (cmp(end, range.from()) >= 0 && cmp(pos, range.to()) <= 0)
	      { return i }
	  }
	  return -1
	};

	var Range = function(anchor, head) {
	  this.anchor = anchor; this.head = head;
	};

	Range.prototype.from = function () { return minPos(this.anchor, this.head) };
	Range.prototype.to = function () { return maxPos(this.anchor, this.head) };
	Range.prototype.empty = function () { return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch };

	// Take an unsorted, potentially overlapping set of ranges, and
	// build a selection out of it. 'Consumes' ranges array (modifying
	// it).
	function normalizeSelection(ranges, primIndex) {
	  var prim = ranges[primIndex];
	  ranges.sort(function (a, b) { return cmp(a.from(), b.from()); });
	  primIndex = indexOf(ranges, prim);
	  for (var i = 1; i < ranges.length; i++) {
	    var cur = ranges[i], prev = ranges[i - 1];
	    if (cmp(prev.to(), cur.from()) >= 0) {
	      var from = minPos(prev.from(), cur.from()), to = maxPos(prev.to(), cur.to());
	      var inv = prev.empty() ? cur.from() == cur.head : prev.from() == prev.head;
	      if (i <= primIndex) { --primIndex; }
	      ranges.splice(--i, 2, new Range(inv ? to : from, inv ? from : to));
	    }
	  }
	  return new Selection(ranges, primIndex)
	}

	function simpleSelection(anchor, head) {
	  return new Selection([new Range(anchor, head || anchor)], 0)
	}

	// Compute the position of the end of a change (its 'to' property
	// refers to the pre-change end).
	function changeEnd(change) {
	  if (!change.text) { return change.to }
	  return Pos(change.from.line + change.text.length - 1,
	             lst(change.text).length + (change.text.length == 1 ? change.from.ch : 0))
	}

	// Adjust a position to refer to the post-change position of the
	// same text, or the end of the change if the change covers it.
	function adjustForChange(pos, change) {
	  if (cmp(pos, change.from) < 0) { return pos }
	  if (cmp(pos, change.to) <= 0) { return changeEnd(change) }

	  var line = pos.line + change.text.length - (change.to.line - change.from.line) - 1, ch = pos.ch;
	  if (pos.line == change.to.line) { ch += changeEnd(change).ch - change.to.ch; }
	  return Pos(line, ch)
	}

	function computeSelAfterChange(doc, change) {
	  var out = [];
	  for (var i = 0; i < doc.sel.ranges.length; i++) {
	    var range = doc.sel.ranges[i];
	    out.push(new Range(adjustForChange(range.anchor, change),
	                       adjustForChange(range.head, change)));
	  }
	  return normalizeSelection(out, doc.sel.primIndex)
	}

	function offsetPos(pos, old, nw) {
	  if (pos.line == old.line)
	    { return Pos(nw.line, pos.ch - old.ch + nw.ch) }
	  else
	    { return Pos(nw.line + (pos.line - old.line), pos.ch) }
	}

	// Used by replaceSelections to allow moving the selection to the
	// start or around the replaced test. Hint may be "start" or "around".
	function computeReplacedSel(doc, changes, hint) {
	  var out = [];
	  var oldPrev = Pos(doc.first, 0), newPrev = oldPrev;
	  for (var i = 0; i < changes.length; i++) {
	    var change = changes[i];
	    var from = offsetPos(change.from, oldPrev, newPrev);
	    var to = offsetPos(changeEnd(change), oldPrev, newPrev);
	    oldPrev = change.to;
	    newPrev = to;
	    if (hint == "around") {
	      var range = doc.sel.ranges[i], inv = cmp(range.head, range.anchor) < 0;
	      out[i] = new Range(inv ? to : from, inv ? from : to);
	    } else {
	      out[i] = new Range(from, from);
	    }
	  }
	  return new Selection(out, doc.sel.primIndex)
	}

	// Used to get the editor into a consistent state again when options change.

	function loadMode(cm) {
	  cm.doc.mode = getMode(cm.options, cm.doc.modeOption);
	  resetModeState(cm);
	}

	function resetModeState(cm) {
	  cm.doc.iter(function (line) {
	    if (line.stateAfter) { line.stateAfter = null; }
	    if (line.styles) { line.styles = null; }
	  });
	  cm.doc.modeFrontier = cm.doc.highlightFrontier = cm.doc.first;
	  startWorker(cm, 100);
	  cm.state.modeGen++;
	  if (cm.curOp) { regChange(cm); }
	}

	// DOCUMENT DATA STRUCTURE

	// By default, updates that start and end at the beginning of a line
	// are treated specially, in order to make the association of line
	// widgets and marker elements with the text behave more intuitive.
	function isWholeLineUpdate(doc, change) {
	  return change.from.ch == 0 && change.to.ch == 0 && lst(change.text) == "" &&
	    (!doc.cm || doc.cm.options.wholeLineUpdateBefore)
	}

	// Perform a change on the document data structure.
	function updateDoc(doc, change, markedSpans, estimateHeight$$1) {
	  function spansFor(n) {return markedSpans ? markedSpans[n] : null}
	  function update(line, text, spans) {
	    updateLine(line, text, spans, estimateHeight$$1);
	    signalLater(line, "change", line, change);
	  }
	  function linesFor(start, end) {
	    var result = [];
	    for (var i = start; i < end; ++i)
	      { result.push(new Line(text[i], spansFor(i), estimateHeight$$1)); }
	    return result
	  }

	  var from = change.from, to = change.to, text = change.text;
	  var firstLine = getLine(doc, from.line), lastLine = getLine(doc, to.line);
	  var lastText = lst(text), lastSpans = spansFor(text.length - 1), nlines = to.line - from.line;

	  // Adjust the line structure
	  if (change.full) {
	    doc.insert(0, linesFor(0, text.length));
	    doc.remove(text.length, doc.size - text.length);
	  } else if (isWholeLineUpdate(doc, change)) {
	    // This is a whole-line replace. Treated specially to make
	    // sure line objects move the way they are supposed to.
	    var added = linesFor(0, text.length - 1);
	    update(lastLine, lastLine.text, lastSpans);
	    if (nlines) { doc.remove(from.line, nlines); }
	    if (added.length) { doc.insert(from.line, added); }
	  } else if (firstLine == lastLine) {
	    if (text.length == 1) {
	      update(firstLine, firstLine.text.slice(0, from.ch) + lastText + firstLine.text.slice(to.ch), lastSpans);
	    } else {
	      var added$1 = linesFor(1, text.length - 1);
	      added$1.push(new Line(lastText + firstLine.text.slice(to.ch), lastSpans, estimateHeight$$1));
	      update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
	      doc.insert(from.line + 1, added$1);
	    }
	  } else if (text.length == 1) {
	    update(firstLine, firstLine.text.slice(0, from.ch) + text[0] + lastLine.text.slice(to.ch), spansFor(0));
	    doc.remove(from.line + 1, nlines);
	  } else {
	    update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
	    update(lastLine, lastText + lastLine.text.slice(to.ch), lastSpans);
	    var added$2 = linesFor(1, text.length - 1);
	    if (nlines > 1) { doc.remove(from.line + 1, nlines - 1); }
	    doc.insert(from.line + 1, added$2);
	  }

	  signalLater(doc, "change", doc, change);
	}

	// Call f for all linked documents.
	function linkedDocs(doc, f, sharedHistOnly) {
	  function propagate(doc, skip, sharedHist) {
	    if (doc.linked) { for (var i = 0; i < doc.linked.length; ++i) {
	      var rel = doc.linked[i];
	      if (rel.doc == skip) { continue }
	      var shared = sharedHist && rel.sharedHist;
	      if (sharedHistOnly && !shared) { continue }
	      f(rel.doc, shared);
	      propagate(rel.doc, doc, shared);
	    } }
	  }
	  propagate(doc, null, true);
	}

	// Attach a document to an editor.
	function attachDoc(cm, doc) {
	  if (doc.cm) { throw new Error("This document is already in use.") }
	  cm.doc = doc;
	  doc.cm = cm;
	  estimateLineHeights(cm);
	  loadMode(cm);
	  setDirectionClass(cm);
	  if (!cm.options.lineWrapping) { findMaxLine(cm); }
	  cm.options.mode = doc.modeOption;
	  regChange(cm);
	}

	function setDirectionClass(cm) {
	  (cm.doc.direction == "rtl" ? addClass : rmClass)(cm.display.lineDiv, "CodeMirror-rtl");
	}

	function directionChanged(cm) {
	  runInOp(cm, function () {
	    setDirectionClass(cm);
	    regChange(cm);
	  });
	}

	function History(startGen) {
	  // Arrays of change events and selections. Doing something adds an
	  // event to done and clears undo. Undoing moves events from done
	  // to undone, redoing moves them in the other direction.
	  this.done = []; this.undone = [];
	  this.undoDepth = Infinity;
	  // Used to track when changes can be merged into a single undo
	  // event
	  this.lastModTime = this.lastSelTime = 0;
	  this.lastOp = this.lastSelOp = null;
	  this.lastOrigin = this.lastSelOrigin = null;
	  // Used by the isClean() method
	  this.generation = this.maxGeneration = startGen || 1;
	}

	// Create a history change event from an updateDoc-style change
	// object.
	function historyChangeFromChange(doc, change) {
	  var histChange = {from: copyPos(change.from), to: changeEnd(change), text: getBetween(doc, change.from, change.to)};
	  attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1);
	  linkedDocs(doc, function (doc) { return attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1); }, true);
	  return histChange
	}

	// Pop all selection events off the end of a history array. Stop at
	// a change event.
	function clearSelectionEvents(array) {
	  while (array.length) {
	    var last = lst(array);
	    if (last.ranges) { array.pop(); }
	    else { break }
	  }
	}

	// Find the top change event in the history. Pop off selection
	// events that are in the way.
	function lastChangeEvent(hist, force) {
	  if (force) {
	    clearSelectionEvents(hist.done);
	    return lst(hist.done)
	  } else if (hist.done.length && !lst(hist.done).ranges) {
	    return lst(hist.done)
	  } else if (hist.done.length > 1 && !hist.done[hist.done.length - 2].ranges) {
	    hist.done.pop();
	    return lst(hist.done)
	  }
	}

	// Register a change in the history. Merges changes that are within
	// a single operation, or are close together with an origin that
	// allows merging (starting with "+") into a single event.
	function addChangeToHistory(doc, change, selAfter, opId) {
	  var hist = doc.history;
	  hist.undone.length = 0;
	  var time = +new Date, cur;
	  var last;

	  if ((hist.lastOp == opId ||
	       hist.lastOrigin == change.origin && change.origin &&
	       ((change.origin.charAt(0) == "+" && doc.cm && hist.lastModTime > time - doc.cm.options.historyEventDelay) ||
	        change.origin.charAt(0) == "*")) &&
	      (cur = lastChangeEvent(hist, hist.lastOp == opId))) {
	    // Merge this change into the last event
	    last = lst(cur.changes);
	    if (cmp(change.from, change.to) == 0 && cmp(change.from, last.to) == 0) {
	      // Optimized case for simple insertion -- don't want to add
	      // new changesets for every character typed
	      last.to = changeEnd(change);
	    } else {
	      // Add new sub-event
	      cur.changes.push(historyChangeFromChange(doc, change));
	    }
	  } else {
	    // Can not be merged, start a new event.
	    var before = lst(hist.done);
	    if (!before || !before.ranges)
	      { pushSelectionToHistory(doc.sel, hist.done); }
	    cur = {changes: [historyChangeFromChange(doc, change)],
	           generation: hist.generation};
	    hist.done.push(cur);
	    while (hist.done.length > hist.undoDepth) {
	      hist.done.shift();
	      if (!hist.done[0].ranges) { hist.done.shift(); }
	    }
	  }
	  hist.done.push(selAfter);
	  hist.generation = ++hist.maxGeneration;
	  hist.lastModTime = hist.lastSelTime = time;
	  hist.lastOp = hist.lastSelOp = opId;
	  hist.lastOrigin = hist.lastSelOrigin = change.origin;

	  if (!last) { signal(doc, "historyAdded"); }
	}

	function selectionEventCanBeMerged(doc, origin, prev, sel) {
	  var ch = origin.charAt(0);
	  return ch == "*" ||
	    ch == "+" &&
	    prev.ranges.length == sel.ranges.length &&
	    prev.somethingSelected() == sel.somethingSelected() &&
	    new Date - doc.history.lastSelTime <= (doc.cm ? doc.cm.options.historyEventDelay : 500)
	}

	// Called whenever the selection changes, sets the new selection as
	// the pending selection in the history, and pushes the old pending
	// selection into the 'done' array when it was significantly
	// different (in number of selected ranges, emptiness, or time).
	function addSelectionToHistory(doc, sel, opId, options) {
	  var hist = doc.history, origin = options && options.origin;

	  // A new event is started when the previous origin does not match
	  // the current, or the origins don't allow matching. Origins
	  // starting with * are always merged, those starting with + are
	  // merged when similar and close together in time.
	  if (opId == hist.lastSelOp ||
	      (origin && hist.lastSelOrigin == origin &&
	       (hist.lastModTime == hist.lastSelTime && hist.lastOrigin == origin ||
	        selectionEventCanBeMerged(doc, origin, lst(hist.done), sel))))
	    { hist.done[hist.done.length - 1] = sel; }
	  else
	    { pushSelectionToHistory(sel, hist.done); }

	  hist.lastSelTime = +new Date;
	  hist.lastSelOrigin = origin;
	  hist.lastSelOp = opId;
	  if (options && options.clearRedo !== false)
	    { clearSelectionEvents(hist.undone); }
	}

	function pushSelectionToHistory(sel, dest) {
	  var top = lst(dest);
	  if (!(top && top.ranges && top.equals(sel)))
	    { dest.push(sel); }
	}

	// Used to store marked span information in the history.
	function attachLocalSpans(doc, change, from, to) {
	  var existing = change["spans_" + doc.id], n = 0;
	  doc.iter(Math.max(doc.first, from), Math.min(doc.first + doc.size, to), function (line) {
	    if (line.markedSpans)
	      { (existing || (existing = change["spans_" + doc.id] = {}))[n] = line.markedSpans; }
	    ++n;
	  });
	}

	// When un/re-doing restores text containing marked spans, those
	// that have been explicitly cleared should not be restored.
	function removeClearedSpans(spans) {
	  if (!spans) { return null }
	  var out;
	  for (var i = 0; i < spans.length; ++i) {
	    if (spans[i].marker.explicitlyCleared) { if (!out) { out = spans.slice(0, i); } }
	    else if (out) { out.push(spans[i]); }
	  }
	  return !out ? spans : out.length ? out : null
	}

	// Retrieve and filter the old marked spans stored in a change event.
	function getOldSpans(doc, change) {
	  var found = change["spans_" + doc.id];
	  if (!found) { return null }
	  var nw = [];
	  for (var i = 0; i < change.text.length; ++i)
	    { nw.push(removeClearedSpans(found[i])); }
	  return nw
	}

	// Used for un/re-doing changes from the history. Combines the
	// result of computing the existing spans with the set of spans that
	// existed in the history (so that deleting around a span and then
	// undoing brings back the span).
	function mergeOldSpans(doc, change) {
	  var old = getOldSpans(doc, change);
	  var stretched = stretchSpansOverChange(doc, change);
	  if (!old) { return stretched }
	  if (!stretched) { return old }

	  for (var i = 0; i < old.length; ++i) {
	    var oldCur = old[i], stretchCur = stretched[i];
	    if (oldCur && stretchCur) {
	      spans: for (var j = 0; j < stretchCur.length; ++j) {
	        var span = stretchCur[j];
	        for (var k = 0; k < oldCur.length; ++k)
	          { if (oldCur[k].marker == span.marker) { continue spans } }
	        oldCur.push(span);
	      }
	    } else if (stretchCur) {
	      old[i] = stretchCur;
	    }
	  }
	  return old
	}

	// Used both to provide a JSON-safe object in .getHistory, and, when
	// detaching a document, to split the history in two
	function copyHistoryArray(events, newGroup, instantiateSel) {
	  var copy = [];
	  for (var i = 0; i < events.length; ++i) {
	    var event = events[i];
	    if (event.ranges) {
	      copy.push(instantiateSel ? Selection.prototype.deepCopy.call(event) : event);
	      continue
	    }
	    var changes = event.changes, newChanges = [];
	    copy.push({changes: newChanges});
	    for (var j = 0; j < changes.length; ++j) {
	      var change = changes[j], m = (void 0);
	      newChanges.push({from: change.from, to: change.to, text: change.text});
	      if (newGroup) { for (var prop in change) { if (m = prop.match(/^spans_(\d+)$/)) {
	        if (indexOf(newGroup, Number(m[1])) > -1) {
	          lst(newChanges)[prop] = change[prop];
	          delete change[prop];
	        }
	      } } }
	    }
	  }
	  return copy
	}

	// The 'scroll' parameter given to many of these indicated whether
	// the new cursor position should be scrolled into view after
	// modifying the selection.

	// If shift is held or the extend flag is set, extends a range to
	// include a given position (and optionally a second position).
	// Otherwise, simply returns the range between the given positions.
	// Used for cursor motion and such.
	function extendRange(range, head, other, extend) {
	  if (extend) {
	    var anchor = range.anchor;
	    if (other) {
	      var posBefore = cmp(head, anchor) < 0;
	      if (posBefore != (cmp(other, anchor) < 0)) {
	        anchor = head;
	        head = other;
	      } else if (posBefore != (cmp(head, other) < 0)) {
	        head = other;
	      }
	    }
	    return new Range(anchor, head)
	  } else {
	    return new Range(other || head, head)
	  }
	}

	// Extend the primary selection range, discard the rest.
	function extendSelection(doc, head, other, options, extend) {
	  if (extend == null) { extend = doc.cm && (doc.cm.display.shift || doc.extend); }
	  setSelection(doc, new Selection([extendRange(doc.sel.primary(), head, other, extend)], 0), options);
	}

	// Extend all selections (pos is an array of selections with length
	// equal the number of selections)
	function extendSelections(doc, heads, options) {
	  var out = [];
	  var extend = doc.cm && (doc.cm.display.shift || doc.extend);
	  for (var i = 0; i < doc.sel.ranges.length; i++)
	    { out[i] = extendRange(doc.sel.ranges[i], heads[i], null, extend); }
	  var newSel = normalizeSelection(out, doc.sel.primIndex);
	  setSelection(doc, newSel, options);
	}

	// Updates a single range in the selection.
	function replaceOneSelection(doc, i, range, options) {
	  var ranges = doc.sel.ranges.slice(0);
	  ranges[i] = range;
	  setSelection(doc, normalizeSelection(ranges, doc.sel.primIndex), options);
	}

	// Reset the selection to a single range.
	function setSimpleSelection(doc, anchor, head, options) {
	  setSelection(doc, simpleSelection(anchor, head), options);
	}

	// Give beforeSelectionChange handlers a change to influence a
	// selection update.
	function filterSelectionChange(doc, sel, options) {
	  var obj = {
	    ranges: sel.ranges,
	    update: function(ranges) {
	      var this$1 = this;

	      this.ranges = [];
	      for (var i = 0; i < ranges.length; i++)
	        { this$1.ranges[i] = new Range(clipPos(doc, ranges[i].anchor),
	                                   clipPos(doc, ranges[i].head)); }
	    },
	    origin: options && options.origin
	  };
	  signal(doc, "beforeSelectionChange", doc, obj);
	  if (doc.cm) { signal(doc.cm, "beforeSelectionChange", doc.cm, obj); }
	  if (obj.ranges != sel.ranges) { return normalizeSelection(obj.ranges, obj.ranges.length - 1) }
	  else { return sel }
	}

	function setSelectionReplaceHistory(doc, sel, options) {
	  var done = doc.history.done, last = lst(done);
	  if (last && last.ranges) {
	    done[done.length - 1] = sel;
	    setSelectionNoUndo(doc, sel, options);
	  } else {
	    setSelection(doc, sel, options);
	  }
	}

	// Set a new selection.
	function setSelection(doc, sel, options) {
	  setSelectionNoUndo(doc, sel, options);
	  addSelectionToHistory(doc, doc.sel, doc.cm ? doc.cm.curOp.id : NaN, options);
	}

	function setSelectionNoUndo(doc, sel, options) {
	  if (hasHandler(doc, "beforeSelectionChange") || doc.cm && hasHandler(doc.cm, "beforeSelectionChange"))
	    { sel = filterSelectionChange(doc, sel, options); }

	  var bias = options && options.bias ||
	    (cmp(sel.primary().head, doc.sel.primary().head) < 0 ? -1 : 1);
	  setSelectionInner(doc, skipAtomicInSelection(doc, sel, bias, true));

	  if (!(options && options.scroll === false) && doc.cm)
	    { ensureCursorVisible(doc.cm); }
	}

	function setSelectionInner(doc, sel) {
	  if (sel.equals(doc.sel)) { return }

	  doc.sel = sel;

	  if (doc.cm) {
	    doc.cm.curOp.updateInput = doc.cm.curOp.selectionChanged = true;
	    signalCursorActivity(doc.cm);
	  }
	  signalLater(doc, "cursorActivity", doc);
	}

	// Verify that the selection does not partially select any atomic
	// marked ranges.
	function reCheckSelection(doc) {
	  setSelectionInner(doc, skipAtomicInSelection(doc, doc.sel, null, false));
	}

	// Return a selection that does not partially select any atomic
	// ranges.
	function skipAtomicInSelection(doc, sel, bias, mayClear) {
	  var out;
	  for (var i = 0; i < sel.ranges.length; i++) {
	    var range = sel.ranges[i];
	    var old = sel.ranges.length == doc.sel.ranges.length && doc.sel.ranges[i];
	    var newAnchor = skipAtomic(doc, range.anchor, old && old.anchor, bias, mayClear);
	    var newHead = skipAtomic(doc, range.head, old && old.head, bias, mayClear);
	    if (out || newAnchor != range.anchor || newHead != range.head) {
	      if (!out) { out = sel.ranges.slice(0, i); }
	      out[i] = new Range(newAnchor, newHead);
	    }
	  }
	  return out ? normalizeSelection(out, sel.primIndex) : sel
	}

	function skipAtomicInner(doc, pos, oldPos, dir, mayClear) {
	  var line = getLine(doc, pos.line);
	  if (line.markedSpans) { for (var i = 0; i < line.markedSpans.length; ++i) {
	    var sp = line.markedSpans[i], m = sp.marker;
	    if ((sp.from == null || (m.inclusiveLeft ? sp.from <= pos.ch : sp.from < pos.ch)) &&
	        (sp.to == null || (m.inclusiveRight ? sp.to >= pos.ch : sp.to > pos.ch))) {
	      if (mayClear) {
	        signal(m, "beforeCursorEnter");
	        if (m.explicitlyCleared) {
	          if (!line.markedSpans) { break }
	          else {--i; continue}
	        }
	      }
	      if (!m.atomic) { continue }

	      if (oldPos) {
	        var near = m.find(dir < 0 ? 1 : -1), diff = (void 0);
	        if (dir < 0 ? m.inclusiveRight : m.inclusiveLeft)
	          { near = movePos(doc, near, -dir, near && near.line == pos.line ? line : null); }
	        if (near && near.line == pos.line && (diff = cmp(near, oldPos)) && (dir < 0 ? diff < 0 : diff > 0))
	          { return skipAtomicInner(doc, near, pos, dir, mayClear) }
	      }

	      var far = m.find(dir < 0 ? -1 : 1);
	      if (dir < 0 ? m.inclusiveLeft : m.inclusiveRight)
	        { far = movePos(doc, far, dir, far.line == pos.line ? line : null); }
	      return far ? skipAtomicInner(doc, far, pos, dir, mayClear) : null
	    }
	  } }
	  return pos
	}

	// Ensure a given position is not inside an atomic range.
	function skipAtomic(doc, pos, oldPos, bias, mayClear) {
	  var dir = bias || 1;
	  var found = skipAtomicInner(doc, pos, oldPos, dir, mayClear) ||
	      (!mayClear && skipAtomicInner(doc, pos, oldPos, dir, true)) ||
	      skipAtomicInner(doc, pos, oldPos, -dir, mayClear) ||
	      (!mayClear && skipAtomicInner(doc, pos, oldPos, -dir, true));
	  if (!found) {
	    doc.cantEdit = true;
	    return Pos(doc.first, 0)
	  }
	  return found
	}

	function movePos(doc, pos, dir, line) {
	  if (dir < 0 && pos.ch == 0) {
	    if (pos.line > doc.first) { return clipPos(doc, Pos(pos.line - 1)) }
	    else { return null }
	  } else if (dir > 0 && pos.ch == (line || getLine(doc, pos.line)).text.length) {
	    if (pos.line < doc.first + doc.size - 1) { return Pos(pos.line + 1, 0) }
	    else { return null }
	  } else {
	    return new Pos(pos.line, pos.ch + dir)
	  }
	}

	function selectAll(cm) {
	  cm.setSelection(Pos(cm.firstLine(), 0), Pos(cm.lastLine()), sel_dontScroll);
	}

	// UPDATING

	// Allow "beforeChange" event handlers to influence a change
	function filterChange(doc, change, update) {
	  var obj = {
	    canceled: false,
	    from: change.from,
	    to: change.to,
	    text: change.text,
	    origin: change.origin,
	    cancel: function () { return obj.canceled = true; }
	  };
	  if (update) { obj.update = function (from, to, text, origin) {
	    if (from) { obj.from = clipPos(doc, from); }
	    if (to) { obj.to = clipPos(doc, to); }
	    if (text) { obj.text = text; }
	    if (origin !== undefined) { obj.origin = origin; }
	  }; }
	  signal(doc, "beforeChange", doc, obj);
	  if (doc.cm) { signal(doc.cm, "beforeChange", doc.cm, obj); }

	  if (obj.canceled) { return null }
	  return {from: obj.from, to: obj.to, text: obj.text, origin: obj.origin}
	}

	// Apply a change to a document, and add it to the document's
	// history, and propagating it to all linked documents.
	function makeChange(doc, change, ignoreReadOnly) {
	  if (doc.cm) {
	    if (!doc.cm.curOp) { return operation(doc.cm, makeChange)(doc, change, ignoreReadOnly) }
	    if (doc.cm.state.suppressEdits) { return }
	  }

	  if (hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange")) {
	    change = filterChange(doc, change, true);
	    if (!change) { return }
	  }

	  // Possibly split or suppress the update based on the presence
	  // of read-only spans in its range.
	  var split = sawReadOnlySpans && !ignoreReadOnly && removeReadOnlyRanges(doc, change.from, change.to);
	  if (split) {
	    for (var i = split.length - 1; i >= 0; --i)
	      { makeChangeInner(doc, {from: split[i].from, to: split[i].to, text: i ? [""] : change.text, origin: change.origin}); }
	  } else {
	    makeChangeInner(doc, change);
	  }
	}

	function makeChangeInner(doc, change) {
	  if (change.text.length == 1 && change.text[0] == "" && cmp(change.from, change.to) == 0) { return }
	  var selAfter = computeSelAfterChange(doc, change);
	  addChangeToHistory(doc, change, selAfter, doc.cm ? doc.cm.curOp.id : NaN);

	  makeChangeSingleDoc(doc, change, selAfter, stretchSpansOverChange(doc, change));
	  var rebased = [];

	  linkedDocs(doc, function (doc, sharedHist) {
	    if (!sharedHist && indexOf(rebased, doc.history) == -1) {
	      rebaseHist(doc.history, change);
	      rebased.push(doc.history);
	    }
	    makeChangeSingleDoc(doc, change, null, stretchSpansOverChange(doc, change));
	  });
	}

	// Revert a change stored in a document's history.
	function makeChangeFromHistory(doc, type, allowSelectionOnly) {
	  if (doc.cm && doc.cm.state.suppressEdits && !allowSelectionOnly) { return }

	  var hist = doc.history, event, selAfter = doc.sel;
	  var source = type == "undo" ? hist.done : hist.undone, dest = type == "undo" ? hist.undone : hist.done;

	  // Verify that there is a useable event (so that ctrl-z won't
	  // needlessly clear selection events)
	  var i = 0;
	  for (; i < source.length; i++) {
	    event = source[i];
	    if (allowSelectionOnly ? event.ranges && !event.equals(doc.sel) : !event.ranges)
	      { break }
	  }
	  if (i == source.length) { return }
	  hist.lastOrigin = hist.lastSelOrigin = null;

	  for (;;) {
	    event = source.pop();
	    if (event.ranges) {
	      pushSelectionToHistory(event, dest);
	      if (allowSelectionOnly && !event.equals(doc.sel)) {
	        setSelection(doc, event, {clearRedo: false});
	        return
	      }
	      selAfter = event;
	    }
	    else { break }
	  }

	  // Build up a reverse change object to add to the opposite history
	  // stack (redo when undoing, and vice versa).
	  var antiChanges = [];
	  pushSelectionToHistory(selAfter, dest);
	  dest.push({changes: antiChanges, generation: hist.generation});
	  hist.generation = event.generation || ++hist.maxGeneration;

	  var filter = hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange");

	  var loop = function ( i ) {
	    var change = event.changes[i];
	    change.origin = type;
	    if (filter && !filterChange(doc, change, false)) {
	      source.length = 0;
	      return {}
	    }

	    antiChanges.push(historyChangeFromChange(doc, change));

	    var after = i ? computeSelAfterChange(doc, change) : lst(source);
	    makeChangeSingleDoc(doc, change, after, mergeOldSpans(doc, change));
	    if (!i && doc.cm) { doc.cm.scrollIntoView({from: change.from, to: changeEnd(change)}); }
	    var rebased = [];

	    // Propagate to the linked documents
	    linkedDocs(doc, function (doc, sharedHist) {
	      if (!sharedHist && indexOf(rebased, doc.history) == -1) {
	        rebaseHist(doc.history, change);
	        rebased.push(doc.history);
	      }
	      makeChangeSingleDoc(doc, change, null, mergeOldSpans(doc, change));
	    });
	  };

	  for (var i$1 = event.changes.length - 1; i$1 >= 0; --i$1) {
	    var returned = loop( i$1 );

	    if ( returned ) return returned.v;
	  }
	}

	// Sub-views need their line numbers shifted when text is added
	// above or below them in the parent document.
	function shiftDoc(doc, distance) {
	  if (distance == 0) { return }
	  doc.first += distance;
	  doc.sel = new Selection(map(doc.sel.ranges, function (range) { return new Range(
	    Pos(range.anchor.line + distance, range.anchor.ch),
	    Pos(range.head.line + distance, range.head.ch)
	  ); }), doc.sel.primIndex);
	  if (doc.cm) {
	    regChange(doc.cm, doc.first, doc.first - distance, distance);
	    for (var d = doc.cm.display, l = d.viewFrom; l < d.viewTo; l++)
	      { regLineChange(doc.cm, l, "gutter"); }
	  }
	}

	// More lower-level change function, handling only a single document
	// (not linked ones).
	function makeChangeSingleDoc(doc, change, selAfter, spans) {
	  if (doc.cm && !doc.cm.curOp)
	    { return operation(doc.cm, makeChangeSingleDoc)(doc, change, selAfter, spans) }

	  if (change.to.line < doc.first) {
	    shiftDoc(doc, change.text.length - 1 - (change.to.line - change.from.line));
	    return
	  }
	  if (change.from.line > doc.lastLine()) { return }

	  // Clip the change to the size of this doc
	  if (change.from.line < doc.first) {
	    var shift = change.text.length - 1 - (doc.first - change.from.line);
	    shiftDoc(doc, shift);
	    change = {from: Pos(doc.first, 0), to: Pos(change.to.line + shift, change.to.ch),
	              text: [lst(change.text)], origin: change.origin};
	  }
	  var last = doc.lastLine();
	  if (change.to.line > last) {
	    change = {from: change.from, to: Pos(last, getLine(doc, last).text.length),
	              text: [change.text[0]], origin: change.origin};
	  }

	  change.removed = getBetween(doc, change.from, change.to);

	  if (!selAfter) { selAfter = computeSelAfterChange(doc, change); }
	  if (doc.cm) { makeChangeSingleDocInEditor(doc.cm, change, spans); }
	  else { updateDoc(doc, change, spans); }
	  setSelectionNoUndo(doc, selAfter, sel_dontScroll);
	}

	// Handle the interaction of a change to a document with the editor
	// that this document is part of.
	function makeChangeSingleDocInEditor(cm, change, spans) {
	  var doc = cm.doc, display = cm.display, from = change.from, to = change.to;

	  var recomputeMaxLength = false, checkWidthStart = from.line;
	  if (!cm.options.lineWrapping) {
	    checkWidthStart = lineNo(visualLine(getLine(doc, from.line)));
	    doc.iter(checkWidthStart, to.line + 1, function (line) {
	      if (line == display.maxLine) {
	        recomputeMaxLength = true;
	        return true
	      }
	    });
	  }

	  if (doc.sel.contains(change.from, change.to) > -1)
	    { signalCursorActivity(cm); }

	  updateDoc(doc, change, spans, estimateHeight(cm));

	  if (!cm.options.lineWrapping) {
	    doc.iter(checkWidthStart, from.line + change.text.length, function (line) {
	      var len = lineLength(line);
	      if (len > display.maxLineLength) {
	        display.maxLine = line;
	        display.maxLineLength = len;
	        display.maxLineChanged = true;
	        recomputeMaxLength = false;
	      }
	    });
	    if (recomputeMaxLength) { cm.curOp.updateMaxLine = true; }
	  }

	  retreatFrontier(doc, from.line);
	  startWorker(cm, 400);

	  var lendiff = change.text.length - (to.line - from.line) - 1;
	  // Remember that these lines changed, for updating the display
	  if (change.full)
	    { regChange(cm); }
	  else if (from.line == to.line && change.text.length == 1 && !isWholeLineUpdate(cm.doc, change))
	    { regLineChange(cm, from.line, "text"); }
	  else
	    { regChange(cm, from.line, to.line + 1, lendiff); }

	  var changesHandler = hasHandler(cm, "changes"), changeHandler = hasHandler(cm, "change");
	  if (changeHandler || changesHandler) {
	    var obj = {
	      from: from, to: to,
	      text: change.text,
	      removed: change.removed,
	      origin: change.origin
	    };
	    if (changeHandler) { signalLater(cm, "change", cm, obj); }
	    if (changesHandler) { (cm.curOp.changeObjs || (cm.curOp.changeObjs = [])).push(obj); }
	  }
	  cm.display.selForContextMenu = null;
	}

	function replaceRange(doc, code, from, to, origin) {
	  if (!to) { to = from; }
	  if (cmp(to, from) < 0) { var assign;
	    (assign = [to, from], from = assign[0], to = assign[1], assign); }
	  if (typeof code == "string") { code = doc.splitLines(code); }
	  makeChange(doc, {from: from, to: to, text: code, origin: origin});
	}

	// Rebasing/resetting history to deal with externally-sourced changes

	function rebaseHistSelSingle(pos, from, to, diff) {
	  if (to < pos.line) {
	    pos.line += diff;
	  } else if (from < pos.line) {
	    pos.line = from;
	    pos.ch = 0;
	  }
	}

	// Tries to rebase an array of history events given a change in the
	// document. If the change touches the same lines as the event, the
	// event, and everything 'behind' it, is discarded. If the change is
	// before the event, the event's positions are updated. Uses a
	// copy-on-write scheme for the positions, to avoid having to
	// reallocate them all on every rebase, but also avoid problems with
	// shared position objects being unsafely updated.
	function rebaseHistArray(array, from, to, diff) {
	  for (var i = 0; i < array.length; ++i) {
	    var sub = array[i], ok = true;
	    if (sub.ranges) {
	      if (!sub.copied) { sub = array[i] = sub.deepCopy(); sub.copied = true; }
	      for (var j = 0; j < sub.ranges.length; j++) {
	        rebaseHistSelSingle(sub.ranges[j].anchor, from, to, diff);
	        rebaseHistSelSingle(sub.ranges[j].head, from, to, diff);
	      }
	      continue
	    }
	    for (var j$1 = 0; j$1 < sub.changes.length; ++j$1) {
	      var cur = sub.changes[j$1];
	      if (to < cur.from.line) {
	        cur.from = Pos(cur.from.line + diff, cur.from.ch);
	        cur.to = Pos(cur.to.line + diff, cur.to.ch);
	      } else if (from <= cur.to.line) {
	        ok = false;
	        break
	      }
	    }
	    if (!ok) {
	      array.splice(0, i + 1);
	      i = 0;
	    }
	  }
	}

	function rebaseHist(hist, change) {
	  var from = change.from.line, to = change.to.line, diff = change.text.length - (to - from) - 1;
	  rebaseHistArray(hist.done, from, to, diff);
	  rebaseHistArray(hist.undone, from, to, diff);
	}

	// Utility for applying a change to a line by handle or number,
	// returning the number and optionally registering the line as
	// changed.
	function changeLine(doc, handle, changeType, op) {
	  var no = handle, line = handle;
	  if (typeof handle == "number") { line = getLine(doc, clipLine(doc, handle)); }
	  else { no = lineNo(handle); }
	  if (no == null) { return null }
	  if (op(line, no) && doc.cm) { regLineChange(doc.cm, no, changeType); }
	  return line
	}

	// The document is represented as a BTree consisting of leaves, with
	// chunk of lines in them, and branches, with up to ten leaves or
	// other branch nodes below them. The top node is always a branch
	// node, and is the document object itself (meaning it has
	// additional methods and properties).
	//
	// All nodes have parent links. The tree is used both to go from
	// line numbers to line objects, and to go from objects to numbers.
	// It also indexes by height, and is used to convert between height
	// and line object, and to find the total height of the document.
	//
	// See also http://marijnhaverbeke.nl/blog/codemirror-line-tree.html

	function LeafChunk(lines) {
	  var this$1 = this;

	  this.lines = lines;
	  this.parent = null;
	  var height = 0;
	  for (var i = 0; i < lines.length; ++i) {
	    lines[i].parent = this$1;
	    height += lines[i].height;
	  }
	  this.height = height;
	}

	LeafChunk.prototype = {
	  chunkSize: function chunkSize() { return this.lines.length },

	  // Remove the n lines at offset 'at'.
	  removeInner: function removeInner(at, n) {
	    var this$1 = this;

	    for (var i = at, e = at + n; i < e; ++i) {
	      var line = this$1.lines[i];
	      this$1.height -= line.height;
	      cleanUpLine(line);
	      signalLater(line, "delete");
	    }
	    this.lines.splice(at, n);
	  },

	  // Helper used to collapse a small branch into a single leaf.
	  collapse: function collapse(lines) {
	    lines.push.apply(lines, this.lines);
	  },

	  // Insert the given array of lines at offset 'at', count them as
	  // having the given height.
	  insertInner: function insertInner(at, lines, height) {
	    var this$1 = this;

	    this.height += height;
	    this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
	    for (var i = 0; i < lines.length; ++i) { lines[i].parent = this$1; }
	  },

	  // Used to iterate over a part of the tree.
	  iterN: function iterN(at, n, op) {
	    var this$1 = this;

	    for (var e = at + n; at < e; ++at)
	      { if (op(this$1.lines[at])) { return true } }
	  }
	};

	function BranchChunk(children) {
	  var this$1 = this;

	  this.children = children;
	  var size = 0, height = 0;
	  for (var i = 0; i < children.length; ++i) {
	    var ch = children[i];
	    size += ch.chunkSize(); height += ch.height;
	    ch.parent = this$1;
	  }
	  this.size = size;
	  this.height = height;
	  this.parent = null;
	}

	BranchChunk.prototype = {
	  chunkSize: function chunkSize() { return this.size },

	  removeInner: function removeInner(at, n) {
	    var this$1 = this;

	    this.size -= n;
	    for (var i = 0; i < this.children.length; ++i) {
	      var child = this$1.children[i], sz = child.chunkSize();
	      if (at < sz) {
	        var rm = Math.min(n, sz - at), oldHeight = child.height;
	        child.removeInner(at, rm);
	        this$1.height -= oldHeight - child.height;
	        if (sz == rm) { this$1.children.splice(i--, 1); child.parent = null; }
	        if ((n -= rm) == 0) { break }
	        at = 0;
	      } else { at -= sz; }
	    }
	    // If the result is smaller than 25 lines, ensure that it is a
	    // single leaf node.
	    if (this.size - n < 25 &&
	        (this.children.length > 1 || !(this.children[0] instanceof LeafChunk))) {
	      var lines = [];
	      this.collapse(lines);
	      this.children = [new LeafChunk(lines)];
	      this.children[0].parent = this;
	    }
	  },

	  collapse: function collapse(lines) {
	    var this$1 = this;

	    for (var i = 0; i < this.children.length; ++i) { this$1.children[i].collapse(lines); }
	  },

	  insertInner: function insertInner(at, lines, height) {
	    var this$1 = this;

	    this.size += lines.length;
	    this.height += height;
	    for (var i = 0; i < this.children.length; ++i) {
	      var child = this$1.children[i], sz = child.chunkSize();
	      if (at <= sz) {
	        child.insertInner(at, lines, height);
	        if (child.lines && child.lines.length > 50) {
	          // To avoid memory thrashing when child.lines is huge (e.g. first view of a large file), it's never spliced.
	          // Instead, small slices are taken. They're taken in order because sequential memory accesses are fastest.
	          var remaining = child.lines.length % 25 + 25;
	          for (var pos = remaining; pos < child.lines.length;) {
	            var leaf = new LeafChunk(child.lines.slice(pos, pos += 25));
	            child.height -= leaf.height;
	            this$1.children.splice(++i, 0, leaf);
	            leaf.parent = this$1;
	          }
	          child.lines = child.lines.slice(0, remaining);
	          this$1.maybeSpill();
	        }
	        break
	      }
	      at -= sz;
	    }
	  },

	  // When a node has grown, check whether it should be split.
	  maybeSpill: function maybeSpill() {
	    if (this.children.length <= 10) { return }
	    var me = this;
	    do {
	      var spilled = me.children.splice(me.children.length - 5, 5);
	      var sibling = new BranchChunk(spilled);
	      if (!me.parent) { // Become the parent node
	        var copy = new BranchChunk(me.children);
	        copy.parent = me;
	        me.children = [copy, sibling];
	        me = copy;
	     } else {
	        me.size -= sibling.size;
	        me.height -= sibling.height;
	        var myIndex = indexOf(me.parent.children, me);
	        me.parent.children.splice(myIndex + 1, 0, sibling);
	      }
	      sibling.parent = me.parent;
	    } while (me.children.length > 10)
	    me.parent.maybeSpill();
	  },

	  iterN: function iterN(at, n, op) {
	    var this$1 = this;

	    for (var i = 0; i < this.children.length; ++i) {
	      var child = this$1.children[i], sz = child.chunkSize();
	      if (at < sz) {
	        var used = Math.min(n, sz - at);
	        if (child.iterN(at, used, op)) { return true }
	        if ((n -= used) == 0) { break }
	        at = 0;
	      } else { at -= sz; }
	    }
	  }
	};

	// Line widgets are block elements displayed above or below a line.

	var LineWidget = function(doc, node, options) {
	  var this$1 = this;

	  if (options) { for (var opt in options) { if (options.hasOwnProperty(opt))
	    { this$1[opt] = options[opt]; } } }
	  this.doc = doc;
	  this.node = node;
	};

	LineWidget.prototype.clear = function () {
	    var this$1 = this;

	  var cm = this.doc.cm, ws = this.line.widgets, line = this.line, no = lineNo(line);
	  if (no == null || !ws) { return }
	  for (var i = 0; i < ws.length; ++i) { if (ws[i] == this$1) { ws.splice(i--, 1); } }
	  if (!ws.length) { line.widgets = null; }
	  var height = widgetHeight(this);
	  updateLineHeight(line, Math.max(0, line.height - height));
	  if (cm) {
	    runInOp(cm, function () {
	      adjustScrollWhenAboveVisible(cm, line, -height);
	      regLineChange(cm, no, "widget");
	    });
	    signalLater(cm, "lineWidgetCleared", cm, this, no);
	  }
	};

	LineWidget.prototype.changed = function () {
	    var this$1 = this;

	  var oldH = this.height, cm = this.doc.cm, line = this.line;
	  this.height = null;
	  var diff = widgetHeight(this) - oldH;
	  if (!diff) { return }
	  updateLineHeight(line, line.height + diff);
	  if (cm) {
	    runInOp(cm, function () {
	      cm.curOp.forceUpdate = true;
	      adjustScrollWhenAboveVisible(cm, line, diff);
	      signalLater(cm, "lineWidgetChanged", cm, this$1, lineNo(line));
	    });
	  }
	};
	eventMixin(LineWidget);

	function adjustScrollWhenAboveVisible(cm, line, diff) {
	  if (heightAtLine(line) < ((cm.curOp && cm.curOp.scrollTop) || cm.doc.scrollTop))
	    { addToScrollTop(cm, diff); }
	}

	function addLineWidget(doc, handle, node, options) {
	  var widget = new LineWidget(doc, node, options);
	  var cm = doc.cm;
	  if (cm && widget.noHScroll) { cm.display.alignWidgets = true; }
	  changeLine(doc, handle, "widget", function (line) {
	    var widgets = line.widgets || (line.widgets = []);
	    if (widget.insertAt == null) { widgets.push(widget); }
	    else { widgets.splice(Math.min(widgets.length - 1, Math.max(0, widget.insertAt)), 0, widget); }
	    widget.line = line;
	    if (cm && !lineIsHidden(doc, line)) {
	      var aboveVisible = heightAtLine(line) < doc.scrollTop;
	      updateLineHeight(line, line.height + widgetHeight(widget));
	      if (aboveVisible) { addToScrollTop(cm, widget.height); }
	      cm.curOp.forceUpdate = true;
	    }
	    return true
	  });
	  signalLater(cm, "lineWidgetAdded", cm, widget, typeof handle == "number" ? handle : lineNo(handle));
	  return widget
	}

	// TEXTMARKERS

	// Created with markText and setBookmark methods. A TextMarker is a
	// handle that can be used to clear or find a marked position in the
	// document. Line objects hold arrays (markedSpans) containing
	// {from, to, marker} object pointing to such marker objects, and
	// indicating that such a marker is present on that line. Multiple
	// lines may point to the same marker when it spans across lines.
	// The spans will have null for their from/to properties when the
	// marker continues beyond the start/end of the line. Markers have
	// links back to the lines they currently touch.

	// Collapsed markers have unique ids, in order to be able to order
	// them, which is needed for uniquely determining an outer marker
	// when they overlap (they may nest, but not partially overlap).
	var nextMarkerId = 0;

	var TextMarker = function(doc, type) {
	  this.lines = [];
	  this.type = type;
	  this.doc = doc;
	  this.id = ++nextMarkerId;
	};

	// Clear the marker.
	TextMarker.prototype.clear = function () {
	    var this$1 = this;

	  if (this.explicitlyCleared) { return }
	  var cm = this.doc.cm, withOp = cm && !cm.curOp;
	  if (withOp) { startOperation(cm); }
	  if (hasHandler(this, "clear")) {
	    var found = this.find();
	    if (found) { signalLater(this, "clear", found.from, found.to); }
	  }
	  var min = null, max = null;
	  for (var i = 0; i < this.lines.length; ++i) {
	    var line = this$1.lines[i];
	    var span = getMarkedSpanFor(line.markedSpans, this$1);
	    if (cm && !this$1.collapsed) { regLineChange(cm, lineNo(line), "text"); }
	    else if (cm) {
	      if (span.to != null) { max = lineNo(line); }
	      if (span.from != null) { min = lineNo(line); }
	    }
	    line.markedSpans = removeMarkedSpan(line.markedSpans, span);
	    if (span.from == null && this$1.collapsed && !lineIsHidden(this$1.doc, line) && cm)
	      { updateLineHeight(line, textHeight(cm.display)); }
	  }
	  if (cm && this.collapsed && !cm.options.lineWrapping) { for (var i$1 = 0; i$1 < this.lines.length; ++i$1) {
	    var visual = visualLine(this$1.lines[i$1]), len = lineLength(visual);
	    if (len > cm.display.maxLineLength) {
	      cm.display.maxLine = visual;
	      cm.display.maxLineLength = len;
	      cm.display.maxLineChanged = true;
	    }
	  } }

	  if (min != null && cm && this.collapsed) { regChange(cm, min, max + 1); }
	  this.lines.length = 0;
	  this.explicitlyCleared = true;
	  if (this.atomic && this.doc.cantEdit) {
	    this.doc.cantEdit = false;
	    if (cm) { reCheckSelection(cm.doc); }
	  }
	  if (cm) { signalLater(cm, "markerCleared", cm, this, min, max); }
	  if (withOp) { endOperation(cm); }
	  if (this.parent) { this.parent.clear(); }
	};

	// Find the position of the marker in the document. Returns a {from,
	// to} object by default. Side can be passed to get a specific side
	// -- 0 (both), -1 (left), or 1 (right). When lineObj is true, the
	// Pos objects returned contain a line object, rather than a line
	// number (used to prevent looking up the same line twice).
	TextMarker.prototype.find = function (side, lineObj) {
	    var this$1 = this;

	  if (side == null && this.type == "bookmark") { side = 1; }
	  var from, to;
	  for (var i = 0; i < this.lines.length; ++i) {
	    var line = this$1.lines[i];
	    var span = getMarkedSpanFor(line.markedSpans, this$1);
	    if (span.from != null) {
	      from = Pos(lineObj ? line : lineNo(line), span.from);
	      if (side == -1) { return from }
	    }
	    if (span.to != null) {
	      to = Pos(lineObj ? line : lineNo(line), span.to);
	      if (side == 1) { return to }
	    }
	  }
	  return from && {from: from, to: to}
	};

	// Signals that the marker's widget changed, and surrounding layout
	// should be recomputed.
	TextMarker.prototype.changed = function () {
	    var this$1 = this;

	  var pos = this.find(-1, true), widget = this, cm = this.doc.cm;
	  if (!pos || !cm) { return }
	  runInOp(cm, function () {
	    var line = pos.line, lineN = lineNo(pos.line);
	    var view = findViewForLine(cm, lineN);
	    if (view) {
	      clearLineMeasurementCacheFor(view);
	      cm.curOp.selectionChanged = cm.curOp.forceUpdate = true;
	    }
	    cm.curOp.updateMaxLine = true;
	    if (!lineIsHidden(widget.doc, line) && widget.height != null) {
	      var oldHeight = widget.height;
	      widget.height = null;
	      var dHeight = widgetHeight(widget) - oldHeight;
	      if (dHeight)
	        { updateLineHeight(line, line.height + dHeight); }
	    }
	    signalLater(cm, "markerChanged", cm, this$1);
	  });
	};

	TextMarker.prototype.attachLine = function (line) {
	  if (!this.lines.length && this.doc.cm) {
	    var op = this.doc.cm.curOp;
	    if (!op.maybeHiddenMarkers || indexOf(op.maybeHiddenMarkers, this) == -1)
	      { (op.maybeUnhiddenMarkers || (op.maybeUnhiddenMarkers = [])).push(this); }
	  }
	  this.lines.push(line);
	};

	TextMarker.prototype.detachLine = function (line) {
	  this.lines.splice(indexOf(this.lines, line), 1);
	  if (!this.lines.length && this.doc.cm) {
	    var op = this.doc.cm.curOp;(op.maybeHiddenMarkers || (op.maybeHiddenMarkers = [])).push(this);
	  }
	};
	eventMixin(TextMarker);

	// Create a marker, wire it up to the right lines, and
	function markText(doc, from, to, options, type) {
	  // Shared markers (across linked documents) are handled separately
	  // (markTextShared will call out to this again, once per
	  // document).
	  if (options && options.shared) { return markTextShared(doc, from, to, options, type) }
	  // Ensure we are in an operation.
	  if (doc.cm && !doc.cm.curOp) { return operation(doc.cm, markText)(doc, from, to, options, type) }

	  var marker = new TextMarker(doc, type), diff = cmp(from, to);
	  if (options) { copyObj(options, marker, false); }
	  // Don't connect empty markers unless clearWhenEmpty is false
	  if (diff > 0 || diff == 0 && marker.clearWhenEmpty !== false)
	    { return marker }
	  if (marker.replacedWith) {
	    // Showing up as a widget implies collapsed (widget replaces text)
	    marker.collapsed = true;
	    marker.widgetNode = eltP("span", [marker.replacedWith], "CodeMirror-widget");
	    if (!options.handleMouseEvents) { marker.widgetNode.setAttribute("cm-ignore-events", "true"); }
	    if (options.insertLeft) { marker.widgetNode.insertLeft = true; }
	  }
	  if (marker.collapsed) {
	    if (conflictingCollapsedRange(doc, from.line, from, to, marker) ||
	        from.line != to.line && conflictingCollapsedRange(doc, to.line, from, to, marker))
	      { throw new Error("Inserting collapsed marker partially overlapping an existing one") }
	    seeCollapsedSpans();
	  }

	  if (marker.addToHistory)
	    { addChangeToHistory(doc, {from: from, to: to, origin: "markText"}, doc.sel, NaN); }

	  var curLine = from.line, cm = doc.cm, updateMaxLine;
	  doc.iter(curLine, to.line + 1, function (line) {
	    if (cm && marker.collapsed && !cm.options.lineWrapping && visualLine(line) == cm.display.maxLine)
	      { updateMaxLine = true; }
	    if (marker.collapsed && curLine != from.line) { updateLineHeight(line, 0); }
	    addMarkedSpan(line, new MarkedSpan(marker,
	                                       curLine == from.line ? from.ch : null,
	                                       curLine == to.line ? to.ch : null));
	    ++curLine;
	  });
	  // lineIsHidden depends on the presence of the spans, so needs a second pass
	  if (marker.collapsed) { doc.iter(from.line, to.line + 1, function (line) {
	    if (lineIsHidden(doc, line)) { updateLineHeight(line, 0); }
	  }); }

	  if (marker.clearOnEnter) { on(marker, "beforeCursorEnter", function () { return marker.clear(); }); }

	  if (marker.readOnly) {
	    seeReadOnlySpans();
	    if (doc.history.done.length || doc.history.undone.length)
	      { doc.clearHistory(); }
	  }
	  if (marker.collapsed) {
	    marker.id = ++nextMarkerId;
	    marker.atomic = true;
	  }
	  if (cm) {
	    // Sync editor state
	    if (updateMaxLine) { cm.curOp.updateMaxLine = true; }
	    if (marker.collapsed)
	      { regChange(cm, from.line, to.line + 1); }
	    else if (marker.className || marker.title || marker.startStyle || marker.endStyle || marker.css)
	      { for (var i = from.line; i <= to.line; i++) { regLineChange(cm, i, "text"); } }
	    if (marker.atomic) { reCheckSelection(cm.doc); }
	    signalLater(cm, "markerAdded", cm, marker);
	  }
	  return marker
	}

	// SHARED TEXTMARKERS

	// A shared marker spans multiple linked documents. It is
	// implemented as a meta-marker-object controlling multiple normal
	// markers.
	var SharedTextMarker = function(markers, primary) {
	  var this$1 = this;

	  this.markers = markers;
	  this.primary = primary;
	  for (var i = 0; i < markers.length; ++i)
	    { markers[i].parent = this$1; }
	};

	SharedTextMarker.prototype.clear = function () {
	    var this$1 = this;

	  if (this.explicitlyCleared) { return }
	  this.explicitlyCleared = true;
	  for (var i = 0; i < this.markers.length; ++i)
	    { this$1.markers[i].clear(); }
	  signalLater(this, "clear");
	};

	SharedTextMarker.prototype.find = function (side, lineObj) {
	  return this.primary.find(side, lineObj)
	};
	eventMixin(SharedTextMarker);

	function markTextShared(doc, from, to, options, type) {
	  options = copyObj(options);
	  options.shared = false;
	  var markers = [markText(doc, from, to, options, type)], primary = markers[0];
	  var widget = options.widgetNode;
	  linkedDocs(doc, function (doc) {
	    if (widget) { options.widgetNode = widget.cloneNode(true); }
	    markers.push(markText(doc, clipPos(doc, from), clipPos(doc, to), options, type));
	    for (var i = 0; i < doc.linked.length; ++i)
	      { if (doc.linked[i].isParent) { return } }
	    primary = lst(markers);
	  });
	  return new SharedTextMarker(markers, primary)
	}

	function findSharedMarkers(doc) {
	  return doc.findMarks(Pos(doc.first, 0), doc.clipPos(Pos(doc.lastLine())), function (m) { return m.parent; })
	}

	function copySharedMarkers(doc, markers) {
	  for (var i = 0; i < markers.length; i++) {
	    var marker = markers[i], pos = marker.find();
	    var mFrom = doc.clipPos(pos.from), mTo = doc.clipPos(pos.to);
	    if (cmp(mFrom, mTo)) {
	      var subMark = markText(doc, mFrom, mTo, marker.primary, marker.primary.type);
	      marker.markers.push(subMark);
	      subMark.parent = marker;
	    }
	  }
	}

	function detachSharedMarkers(markers) {
	  var loop = function ( i ) {
	    var marker = markers[i], linked = [marker.primary.doc];
	    linkedDocs(marker.primary.doc, function (d) { return linked.push(d); });
	    for (var j = 0; j < marker.markers.length; j++) {
	      var subMarker = marker.markers[j];
	      if (indexOf(linked, subMarker.doc) == -1) {
	        subMarker.parent = null;
	        marker.markers.splice(j--, 1);
	      }
	    }
	  };

	  for (var i = 0; i < markers.length; i++) loop( i );
	}

	var nextDocId = 0;
	var Doc = function(text, mode, firstLine, lineSep, direction) {
	  if (!(this instanceof Doc)) { return new Doc(text, mode, firstLine, lineSep, direction) }
	  if (firstLine == null) { firstLine = 0; }

	  BranchChunk.call(this, [new LeafChunk([new Line("", null)])]);
	  this.first = firstLine;
	  this.scrollTop = this.scrollLeft = 0;
	  this.cantEdit = false;
	  this.cleanGeneration = 1;
	  this.modeFrontier = this.highlightFrontier = firstLine;
	  var start = Pos(firstLine, 0);
	  this.sel = simpleSelection(start);
	  this.history = new History(null);
	  this.id = ++nextDocId;
	  this.modeOption = mode;
	  this.lineSep = lineSep;
	  this.direction = (direction == "rtl") ? "rtl" : "ltr";
	  this.extend = false;

	  if (typeof text == "string") { text = this.splitLines(text); }
	  updateDoc(this, {from: start, to: start, text: text});
	  setSelection(this, simpleSelection(start), sel_dontScroll);
	};

	Doc.prototype = createObj(BranchChunk.prototype, {
	  constructor: Doc,
	  // Iterate over the document. Supports two forms -- with only one
	  // argument, it calls that for each line in the document. With
	  // three, it iterates over the range given by the first two (with
	  // the second being non-inclusive).
	  iter: function(from, to, op) {
	    if (op) { this.iterN(from - this.first, to - from, op); }
	    else { this.iterN(this.first, this.first + this.size, from); }
	  },

	  // Non-public interface for adding and removing lines.
	  insert: function(at, lines) {
	    var height = 0;
	    for (var i = 0; i < lines.length; ++i) { height += lines[i].height; }
	    this.insertInner(at - this.first, lines, height);
	  },
	  remove: function(at, n) { this.removeInner(at - this.first, n); },

	  // From here, the methods are part of the public interface. Most
	  // are also available from CodeMirror (editor) instances.

	  getValue: function(lineSep) {
	    var lines = getLines(this, this.first, this.first + this.size);
	    if (lineSep === false) { return lines }
	    return lines.join(lineSep || this.lineSeparator())
	  },
	  setValue: docMethodOp(function(code) {
	    var top = Pos(this.first, 0), last = this.first + this.size - 1;
	    makeChange(this, {from: top, to: Pos(last, getLine(this, last).text.length),
	                      text: this.splitLines(code), origin: "setValue", full: true}, true);
	    if (this.cm) { scrollToCoords(this.cm, 0, 0); }
	    setSelection(this, simpleSelection(top), sel_dontScroll);
	  }),
	  replaceRange: function(code, from, to, origin) {
	    from = clipPos(this, from);
	    to = to ? clipPos(this, to) : from;
	    replaceRange(this, code, from, to, origin);
	  },
	  getRange: function(from, to, lineSep) {
	    var lines = getBetween(this, clipPos(this, from), clipPos(this, to));
	    if (lineSep === false) { return lines }
	    return lines.join(lineSep || this.lineSeparator())
	  },

	  getLine: function(line) {var l = this.getLineHandle(line); return l && l.text},

	  getLineHandle: function(line) {if (isLine(this, line)) { return getLine(this, line) }},
	  getLineNumber: function(line) {return lineNo(line)},

	  getLineHandleVisualStart: function(line) {
	    if (typeof line == "number") { line = getLine(this, line); }
	    return visualLine(line)
	  },

	  lineCount: function() {return this.size},
	  firstLine: function() {return this.first},
	  lastLine: function() {return this.first + this.size - 1},

	  clipPos: function(pos) {return clipPos(this, pos)},

	  getCursor: function(start) {
	    var range$$1 = this.sel.primary(), pos;
	    if (start == null || start == "head") { pos = range$$1.head; }
	    else if (start == "anchor") { pos = range$$1.anchor; }
	    else if (start == "end" || start == "to" || start === false) { pos = range$$1.to(); }
	    else { pos = range$$1.from(); }
	    return pos
	  },
	  listSelections: function() { return this.sel.ranges },
	  somethingSelected: function() {return this.sel.somethingSelected()},

	  setCursor: docMethodOp(function(line, ch, options) {
	    setSimpleSelection(this, clipPos(this, typeof line == "number" ? Pos(line, ch || 0) : line), null, options);
	  }),
	  setSelection: docMethodOp(function(anchor, head, options) {
	    setSimpleSelection(this, clipPos(this, anchor), clipPos(this, head || anchor), options);
	  }),
	  extendSelection: docMethodOp(function(head, other, options) {
	    extendSelection(this, clipPos(this, head), other && clipPos(this, other), options);
	  }),
	  extendSelections: docMethodOp(function(heads, options) {
	    extendSelections(this, clipPosArray(this, heads), options);
	  }),
	  extendSelectionsBy: docMethodOp(function(f, options) {
	    var heads = map(this.sel.ranges, f);
	    extendSelections(this, clipPosArray(this, heads), options);
	  }),
	  setSelections: docMethodOp(function(ranges, primary, options) {
	    var this$1 = this;

	    if (!ranges.length) { return }
	    var out = [];
	    for (var i = 0; i < ranges.length; i++)
	      { out[i] = new Range(clipPos(this$1, ranges[i].anchor),
	                         clipPos(this$1, ranges[i].head)); }
	    if (primary == null) { primary = Math.min(ranges.length - 1, this.sel.primIndex); }
	    setSelection(this, normalizeSelection(out, primary), options);
	  }),
	  addSelection: docMethodOp(function(anchor, head, options) {
	    var ranges = this.sel.ranges.slice(0);
	    ranges.push(new Range(clipPos(this, anchor), clipPos(this, head || anchor)));
	    setSelection(this, normalizeSelection(ranges, ranges.length - 1), options);
	  }),

	  getSelection: function(lineSep) {
	    var this$1 = this;

	    var ranges = this.sel.ranges, lines;
	    for (var i = 0; i < ranges.length; i++) {
	      var sel = getBetween(this$1, ranges[i].from(), ranges[i].to());
	      lines = lines ? lines.concat(sel) : sel;
	    }
	    if (lineSep === false) { return lines }
	    else { return lines.join(lineSep || this.lineSeparator()) }
	  },
	  getSelections: function(lineSep) {
	    var this$1 = this;

	    var parts = [], ranges = this.sel.ranges;
	    for (var i = 0; i < ranges.length; i++) {
	      var sel = getBetween(this$1, ranges[i].from(), ranges[i].to());
	      if (lineSep !== false) { sel = sel.join(lineSep || this$1.lineSeparator()); }
	      parts[i] = sel;
	    }
	    return parts
	  },
	  replaceSelection: function(code, collapse, origin) {
	    var dup = [];
	    for (var i = 0; i < this.sel.ranges.length; i++)
	      { dup[i] = code; }
	    this.replaceSelections(dup, collapse, origin || "+input");
	  },
	  replaceSelections: docMethodOp(function(code, collapse, origin) {
	    var this$1 = this;

	    var changes = [], sel = this.sel;
	    for (var i = 0; i < sel.ranges.length; i++) {
	      var range$$1 = sel.ranges[i];
	      changes[i] = {from: range$$1.from(), to: range$$1.to(), text: this$1.splitLines(code[i]), origin: origin};
	    }
	    var newSel = collapse && collapse != "end" && computeReplacedSel(this, changes, collapse);
	    for (var i$1 = changes.length - 1; i$1 >= 0; i$1--)
	      { makeChange(this$1, changes[i$1]); }
	    if (newSel) { setSelectionReplaceHistory(this, newSel); }
	    else if (this.cm) { ensureCursorVisible(this.cm); }
	  }),
	  undo: docMethodOp(function() {makeChangeFromHistory(this, "undo");}),
	  redo: docMethodOp(function() {makeChangeFromHistory(this, "redo");}),
	  undoSelection: docMethodOp(function() {makeChangeFromHistory(this, "undo", true);}),
	  redoSelection: docMethodOp(function() {makeChangeFromHistory(this, "redo", true);}),

	  setExtending: function(val) {this.extend = val;},
	  getExtending: function() {return this.extend},

	  historySize: function() {
	    var hist = this.history, done = 0, undone = 0;
	    for (var i = 0; i < hist.done.length; i++) { if (!hist.done[i].ranges) { ++done; } }
	    for (var i$1 = 0; i$1 < hist.undone.length; i$1++) { if (!hist.undone[i$1].ranges) { ++undone; } }
	    return {undo: done, redo: undone}
	  },
	  clearHistory: function() {this.history = new History(this.history.maxGeneration);},

	  markClean: function() {
	    this.cleanGeneration = this.changeGeneration(true);
	  },
	  changeGeneration: function(forceSplit) {
	    if (forceSplit)
	      { this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null; }
	    return this.history.generation
	  },
	  isClean: function (gen) {
	    return this.history.generation == (gen || this.cleanGeneration)
	  },

	  getHistory: function() {
	    return {done: copyHistoryArray(this.history.done),
	            undone: copyHistoryArray(this.history.undone)}
	  },
	  setHistory: function(histData) {
	    var hist = this.history = new History(this.history.maxGeneration);
	    hist.done = copyHistoryArray(histData.done.slice(0), null, true);
	    hist.undone = copyHistoryArray(histData.undone.slice(0), null, true);
	  },

	  setGutterMarker: docMethodOp(function(line, gutterID, value) {
	    return changeLine(this, line, "gutter", function (line) {
	      var markers = line.gutterMarkers || (line.gutterMarkers = {});
	      markers[gutterID] = value;
	      if (!value && isEmpty(markers)) { line.gutterMarkers = null; }
	      return true
	    })
	  }),

	  clearGutter: docMethodOp(function(gutterID) {
	    var this$1 = this;

	    this.iter(function (line) {
	      if (line.gutterMarkers && line.gutterMarkers[gutterID]) {
	        changeLine(this$1, line, "gutter", function () {
	          line.gutterMarkers[gutterID] = null;
	          if (isEmpty(line.gutterMarkers)) { line.gutterMarkers = null; }
	          return true
	        });
	      }
	    });
	  }),

	  lineInfo: function(line) {
	    var n;
	    if (typeof line == "number") {
	      if (!isLine(this, line)) { return null }
	      n = line;
	      line = getLine(this, line);
	      if (!line) { return null }
	    } else {
	      n = lineNo(line);
	      if (n == null) { return null }
	    }
	    return {line: n, handle: line, text: line.text, gutterMarkers: line.gutterMarkers,
	            textClass: line.textClass, bgClass: line.bgClass, wrapClass: line.wrapClass,
	            widgets: line.widgets}
	  },

	  addLineClass: docMethodOp(function(handle, where, cls) {
	    return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function (line) {
	      var prop = where == "text" ? "textClass"
	               : where == "background" ? "bgClass"
	               : where == "gutter" ? "gutterClass" : "wrapClass";
	      if (!line[prop]) { line[prop] = cls; }
	      else if (classTest(cls).test(line[prop])) { return false }
	      else { line[prop] += " " + cls; }
	      return true
	    })
	  }),
	  removeLineClass: docMethodOp(function(handle, where, cls) {
	    return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function (line) {
	      var prop = where == "text" ? "textClass"
	               : where == "background" ? "bgClass"
	               : where == "gutter" ? "gutterClass" : "wrapClass";
	      var cur = line[prop];
	      if (!cur) { return false }
	      else if (cls == null) { line[prop] = null; }
	      else {
	        var found = cur.match(classTest(cls));
	        if (!found) { return false }
	        var end = found.index + found[0].length;
	        line[prop] = cur.slice(0, found.index) + (!found.index || end == cur.length ? "" : " ") + cur.slice(end) || null;
	      }
	      return true
	    })
	  }),

	  addLineWidget: docMethodOp(function(handle, node, options) {
	    return addLineWidget(this, handle, node, options)
	  }),
	  removeLineWidget: function(widget) { widget.clear(); },

	  markText: function(from, to, options) {
	    return markText(this, clipPos(this, from), clipPos(this, to), options, options && options.type || "range")
	  },
	  setBookmark: function(pos, options) {
	    var realOpts = {replacedWith: options && (options.nodeType == null ? options.widget : options),
	                    insertLeft: options && options.insertLeft,
	                    clearWhenEmpty: false, shared: options && options.shared,
	                    handleMouseEvents: options && options.handleMouseEvents};
	    pos = clipPos(this, pos);
	    return markText(this, pos, pos, realOpts, "bookmark")
	  },
	  findMarksAt: function(pos) {
	    pos = clipPos(this, pos);
	    var markers = [], spans = getLine(this, pos.line).markedSpans;
	    if (spans) { for (var i = 0; i < spans.length; ++i) {
	      var span = spans[i];
	      if ((span.from == null || span.from <= pos.ch) &&
	          (span.to == null || span.to >= pos.ch))
	        { markers.push(span.marker.parent || span.marker); }
	    } }
	    return markers
	  },
	  findMarks: function(from, to, filter) {
	    from = clipPos(this, from); to = clipPos(this, to);
	    var found = [], lineNo$$1 = from.line;
	    this.iter(from.line, to.line + 1, function (line) {
	      var spans = line.markedSpans;
	      if (spans) { for (var i = 0; i < spans.length; i++) {
	        var span = spans[i];
	        if (!(span.to != null && lineNo$$1 == from.line && from.ch >= span.to ||
	              span.from == null && lineNo$$1 != from.line ||
	              span.from != null && lineNo$$1 == to.line && span.from >= to.ch) &&
	            (!filter || filter(span.marker)))
	          { found.push(span.marker.parent || span.marker); }
	      } }
	      ++lineNo$$1;
	    });
	    return found
	  },
	  getAllMarks: function() {
	    var markers = [];
	    this.iter(function (line) {
	      var sps = line.markedSpans;
	      if (sps) { for (var i = 0; i < sps.length; ++i)
	        { if (sps[i].from != null) { markers.push(sps[i].marker); } } }
	    });
	    return markers
	  },

	  posFromIndex: function(off) {
	    var ch, lineNo$$1 = this.first, sepSize = this.lineSeparator().length;
	    this.iter(function (line) {
	      var sz = line.text.length + sepSize;
	      if (sz > off) { ch = off; return true }
	      off -= sz;
	      ++lineNo$$1;
	    });
	    return clipPos(this, Pos(lineNo$$1, ch))
	  },
	  indexFromPos: function (coords) {
	    coords = clipPos(this, coords);
	    var index = coords.ch;
	    if (coords.line < this.first || coords.ch < 0) { return 0 }
	    var sepSize = this.lineSeparator().length;
	    this.iter(this.first, coords.line, function (line) { // iter aborts when callback returns a truthy value
	      index += line.text.length + sepSize;
	    });
	    return index
	  },

	  copy: function(copyHistory) {
	    var doc = new Doc(getLines(this, this.first, this.first + this.size),
	                      this.modeOption, this.first, this.lineSep, this.direction);
	    doc.scrollTop = this.scrollTop; doc.scrollLeft = this.scrollLeft;
	    doc.sel = this.sel;
	    doc.extend = false;
	    if (copyHistory) {
	      doc.history.undoDepth = this.history.undoDepth;
	      doc.setHistory(this.getHistory());
	    }
	    return doc
	  },

	  linkedDoc: function(options) {
	    if (!options) { options = {}; }
	    var from = this.first, to = this.first + this.size;
	    if (options.from != null && options.from > from) { from = options.from; }
	    if (options.to != null && options.to < to) { to = options.to; }
	    var copy = new Doc(getLines(this, from, to), options.mode || this.modeOption, from, this.lineSep, this.direction);
	    if (options.sharedHist) { copy.history = this.history
	    ; }(this.linked || (this.linked = [])).push({doc: copy, sharedHist: options.sharedHist});
	    copy.linked = [{doc: this, isParent: true, sharedHist: options.sharedHist}];
	    copySharedMarkers(copy, findSharedMarkers(this));
	    return copy
	  },
	  unlinkDoc: function(other) {
	    var this$1 = this;

	    if (other instanceof CodeMirror$1) { other = other.doc; }
	    if (this.linked) { for (var i = 0; i < this.linked.length; ++i) {
	      var link = this$1.linked[i];
	      if (link.doc != other) { continue }
	      this$1.linked.splice(i, 1);
	      other.unlinkDoc(this$1);
	      detachSharedMarkers(findSharedMarkers(this$1));
	      break
	    } }
	    // If the histories were shared, split them again
	    if (other.history == this.history) {
	      var splitIds = [other.id];
	      linkedDocs(other, function (doc) { return splitIds.push(doc.id); }, true);
	      other.history = new History(null);
	      other.history.done = copyHistoryArray(this.history.done, splitIds);
	      other.history.undone = copyHistoryArray(this.history.undone, splitIds);
	    }
	  },
	  iterLinkedDocs: function(f) {linkedDocs(this, f);},

	  getMode: function() {return this.mode},
	  getEditor: function() {return this.cm},

	  splitLines: function(str) {
	    if (this.lineSep) { return str.split(this.lineSep) }
	    return splitLinesAuto(str)
	  },
	  lineSeparator: function() { return this.lineSep || "\n" },

	  setDirection: docMethodOp(function (dir) {
	    if (dir != "rtl") { dir = "ltr"; }
	    if (dir == this.direction) { return }
	    this.direction = dir;
	    this.iter(function (line) { return line.order = null; });
	    if (this.cm) { directionChanged(this.cm); }
	  })
	});

	// Public alias.
	Doc.prototype.eachLine = Doc.prototype.iter;

	// Kludge to work around strange IE behavior where it'll sometimes
	// re-fire a series of drag-related events right after the drop (#1551)
	var lastDrop = 0;

	function onDrop(e) {
	  var cm = this;
	  clearDragCursor(cm);
	  if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e))
	    { return }
	  e_preventDefault(e);
	  if (ie) { lastDrop = +new Date; }
	  var pos = posFromMouse(cm, e, true), files = e.dataTransfer.files;
	  if (!pos || cm.isReadOnly()) { return }
	  // Might be a file drop, in which case we simply extract the text
	  // and insert it.
	  if (files && files.length && window.FileReader && window.File) {
	    var n = files.length, text = Array(n), read = 0;
	    var loadFile = function (file, i) {
	      if (cm.options.allowDropFileTypes &&
	          indexOf(cm.options.allowDropFileTypes, file.type) == -1)
	        { return }

	      var reader = new FileReader;
	      reader.onload = operation(cm, function () {
	        var content = reader.result;
	        if (/[\x00-\x08\x0e-\x1f]{2}/.test(content)) { content = ""; }
	        text[i] = content;
	        if (++read == n) {
	          pos = clipPos(cm.doc, pos);
	          var change = {from: pos, to: pos,
	                        text: cm.doc.splitLines(text.join(cm.doc.lineSeparator())),
	                        origin: "paste"};
	          makeChange(cm.doc, change);
	          setSelectionReplaceHistory(cm.doc, simpleSelection(pos, changeEnd(change)));
	        }
	      });
	      reader.readAsText(file);
	    };
	    for (var i = 0; i < n; ++i) { loadFile(files[i], i); }
	  } else { // Normal drop
	    // Don't do a replace if the drop happened inside of the selected text.
	    if (cm.state.draggingText && cm.doc.sel.contains(pos) > -1) {
	      cm.state.draggingText(e);
	      // Ensure the editor is re-focused
	      setTimeout(function () { return cm.display.input.focus(); }, 20);
	      return
	    }
	    try {
	      var text$1 = e.dataTransfer.getData("Text");
	      if (text$1) {
	        var selected;
	        if (cm.state.draggingText && !cm.state.draggingText.copy)
	          { selected = cm.listSelections(); }
	        setSelectionNoUndo(cm.doc, simpleSelection(pos, pos));
	        if (selected) { for (var i$1 = 0; i$1 < selected.length; ++i$1)
	          { replaceRange(cm.doc, "", selected[i$1].anchor, selected[i$1].head, "drag"); } }
	        cm.replaceSelection(text$1, "around", "paste");
	        cm.display.input.focus();
	      }
	    }
	    catch(e){}
	  }
	}

	function onDragStart(cm, e) {
	  if (ie && (!cm.state.draggingText || +new Date - lastDrop < 100)) { e_stop(e); return }
	  if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e)) { return }

	  e.dataTransfer.setData("Text", cm.getSelection());
	  e.dataTransfer.effectAllowed = "copyMove";

	  // Use dummy image instead of default browsers image.
	  // Recent Safari (~6.0.2) have a tendency to segfault when this happens, so we don't do it there.
	  if (e.dataTransfer.setDragImage && !safari) {
	    var img = elt("img", null, null, "position: fixed; left: 0; top: 0;");
	    img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
	    if (presto) {
	      img.width = img.height = 1;
	      cm.display.wrapper.appendChild(img);
	      // Force a relayout, or Opera won't use our image for some obscure reason
	      img._top = img.offsetTop;
	    }
	    e.dataTransfer.setDragImage(img, 0, 0);
	    if (presto) { img.parentNode.removeChild(img); }
	  }
	}

	function onDragOver(cm, e) {
	  var pos = posFromMouse(cm, e);
	  if (!pos) { return }
	  var frag = document.createDocumentFragment();
	  drawSelectionCursor(cm, pos, frag);
	  if (!cm.display.dragCursor) {
	    cm.display.dragCursor = elt("div", null, "CodeMirror-cursors CodeMirror-dragcursors");
	    cm.display.lineSpace.insertBefore(cm.display.dragCursor, cm.display.cursorDiv);
	  }
	  removeChildrenAndAdd(cm.display.dragCursor, frag);
	}

	function clearDragCursor(cm) {
	  if (cm.display.dragCursor) {
	    cm.display.lineSpace.removeChild(cm.display.dragCursor);
	    cm.display.dragCursor = null;
	  }
	}

	// These must be handled carefully, because naively registering a
	// handler for each editor will cause the editors to never be
	// garbage collected.

	function forEachCodeMirror(f) {
	  if (!document.getElementsByClassName) { return }
	  var byClass = document.getElementsByClassName("CodeMirror");
	  for (var i = 0; i < byClass.length; i++) {
	    var cm = byClass[i].CodeMirror;
	    if (cm) { f(cm); }
	  }
	}

	var globalsRegistered = false;
	function ensureGlobalHandlers() {
	  if (globalsRegistered) { return }
	  registerGlobalHandlers();
	  globalsRegistered = true;
	}
	function registerGlobalHandlers() {
	  // When the window resizes, we need to refresh active editors.
	  var resizeTimer;
	  on(window, "resize", function () {
	    if (resizeTimer == null) { resizeTimer = setTimeout(function () {
	      resizeTimer = null;
	      forEachCodeMirror(onResize);
	    }, 100); }
	  });
	  // When the window loses focus, we want to show the editor as blurred
	  on(window, "blur", function () { return forEachCodeMirror(onBlur); });
	}
	// Called when the window resizes
	function onResize(cm) {
	  var d = cm.display;
	  if (d.lastWrapHeight == d.wrapper.clientHeight && d.lastWrapWidth == d.wrapper.clientWidth)
	    { return }
	  // Might be a text scaling operation, clear size caches.
	  d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
	  d.scrollbarsClipped = false;
	  cm.setSize();
	}

	var keyNames = {
	  3: "Enter", 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt",
	  19: "Pause", 20: "CapsLock", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End",
	  36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "PrintScrn", 45: "Insert",
	  46: "Delete", 59: ";", 61: "=", 91: "Mod", 92: "Mod", 93: "Mod",
	  106: "*", 107: "=", 109: "-", 110: ".", 111: "/", 127: "Delete",
	  173: "-", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\",
	  221: "]", 222: "'", 63232: "Up", 63233: "Down", 63234: "Left", 63235: "Right", 63272: "Delete",
	  63273: "Home", 63275: "End", 63276: "PageUp", 63277: "PageDown", 63302: "Insert"
	};

	// Number keys
	for (var i = 0; i < 10; i++) { keyNames[i + 48] = keyNames[i + 96] = String(i); }
	// Alphabetic keys
	for (var i$1 = 65; i$1 <= 90; i$1++) { keyNames[i$1] = String.fromCharCode(i$1); }
	// Function keys
	for (var i$2 = 1; i$2 <= 12; i$2++) { keyNames[i$2 + 111] = keyNames[i$2 + 63235] = "F" + i$2; }

	var keyMap = {};

	keyMap.basic = {
	  "Left": "goCharLeft", "Right": "goCharRight", "Up": "goLineUp", "Down": "goLineDown",
	  "End": "goLineEnd", "Home": "goLineStartSmart", "PageUp": "goPageUp", "PageDown": "goPageDown",
	  "Delete": "delCharAfter", "Backspace": "delCharBefore", "Shift-Backspace": "delCharBefore",
	  "Tab": "defaultTab", "Shift-Tab": "indentAuto",
	  "Enter": "newlineAndIndent", "Insert": "toggleOverwrite",
	  "Esc": "singleSelection"
	};
	// Note that the save and find-related commands aren't defined by
	// default. User code or addons can define them. Unknown commands
	// are simply ignored.
	keyMap.pcDefault = {
	  "Ctrl-A": "selectAll", "Ctrl-D": "deleteLine", "Ctrl-Z": "undo", "Shift-Ctrl-Z": "redo", "Ctrl-Y": "redo",
	  "Ctrl-Home": "goDocStart", "Ctrl-End": "goDocEnd", "Ctrl-Up": "goLineUp", "Ctrl-Down": "goLineDown",
	  "Ctrl-Left": "goGroupLeft", "Ctrl-Right": "goGroupRight", "Alt-Left": "goLineStart", "Alt-Right": "goLineEnd",
	  "Ctrl-Backspace": "delGroupBefore", "Ctrl-Delete": "delGroupAfter", "Ctrl-S": "save", "Ctrl-F": "find",
	  "Ctrl-G": "findNext", "Shift-Ctrl-G": "findPrev", "Shift-Ctrl-F": "replace", "Shift-Ctrl-R": "replaceAll",
	  "Ctrl-[": "indentLess", "Ctrl-]": "indentMore",
	  "Ctrl-U": "undoSelection", "Shift-Ctrl-U": "redoSelection", "Alt-U": "redoSelection",
	  fallthrough: "basic"
	};
	// Very basic readline/emacs-style bindings, which are standard on Mac.
	keyMap.emacsy = {
	  "Ctrl-F": "goCharRight", "Ctrl-B": "goCharLeft", "Ctrl-P": "goLineUp", "Ctrl-N": "goLineDown",
	  "Alt-F": "goWordRight", "Alt-B": "goWordLeft", "Ctrl-A": "goLineStart", "Ctrl-E": "goLineEnd",
	  "Ctrl-V": "goPageDown", "Shift-Ctrl-V": "goPageUp", "Ctrl-D": "delCharAfter", "Ctrl-H": "delCharBefore",
	  "Alt-D": "delWordAfter", "Alt-Backspace": "delWordBefore", "Ctrl-K": "killLine", "Ctrl-T": "transposeChars",
	  "Ctrl-O": "openLine"
	};
	keyMap.macDefault = {
	  "Cmd-A": "selectAll", "Cmd-D": "deleteLine", "Cmd-Z": "undo", "Shift-Cmd-Z": "redo", "Cmd-Y": "redo",
	  "Cmd-Home": "goDocStart", "Cmd-Up": "goDocStart", "Cmd-End": "goDocEnd", "Cmd-Down": "goDocEnd", "Alt-Left": "goGroupLeft",
	  "Alt-Right": "goGroupRight", "Cmd-Left": "goLineLeft", "Cmd-Right": "goLineRight", "Alt-Backspace": "delGroupBefore",
	  "Ctrl-Alt-Backspace": "delGroupAfter", "Alt-Delete": "delGroupAfter", "Cmd-S": "save", "Cmd-F": "find",
	  "Cmd-G": "findNext", "Shift-Cmd-G": "findPrev", "Cmd-Alt-F": "replace", "Shift-Cmd-Alt-F": "replaceAll",
	  "Cmd-[": "indentLess", "Cmd-]": "indentMore", "Cmd-Backspace": "delWrappedLineLeft", "Cmd-Delete": "delWrappedLineRight",
	  "Cmd-U": "undoSelection", "Shift-Cmd-U": "redoSelection", "Ctrl-Up": "goDocStart", "Ctrl-Down": "goDocEnd",
	  fallthrough: ["basic", "emacsy"]
	};
	keyMap["default"] = mac ? keyMap.macDefault : keyMap.pcDefault;

	// KEYMAP DISPATCH

	function normalizeKeyName(name) {
	  var parts = name.split(/-(?!$)/);
	  name = parts[parts.length - 1];
	  var alt, ctrl, shift, cmd;
	  for (var i = 0; i < parts.length - 1; i++) {
	    var mod = parts[i];
	    if (/^(cmd|meta|m)$/i.test(mod)) { cmd = true; }
	    else if (/^a(lt)?$/i.test(mod)) { alt = true; }
	    else if (/^(c|ctrl|control)$/i.test(mod)) { ctrl = true; }
	    else if (/^s(hift)?$/i.test(mod)) { shift = true; }
	    else { throw new Error("Unrecognized modifier name: " + mod) }
	  }
	  if (alt) { name = "Alt-" + name; }
	  if (ctrl) { name = "Ctrl-" + name; }
	  if (cmd) { name = "Cmd-" + name; }
	  if (shift) { name = "Shift-" + name; }
	  return name
	}

	// This is a kludge to keep keymaps mostly working as raw objects
	// (backwards compatibility) while at the same time support features
	// like normalization and multi-stroke key bindings. It compiles a
	// new normalized keymap, and then updates the old object to reflect
	// this.
	function normalizeKeyMap(keymap) {
	  var copy = {};
	  for (var keyname in keymap) { if (keymap.hasOwnProperty(keyname)) {
	    var value = keymap[keyname];
	    if (/^(name|fallthrough|(de|at)tach)$/.test(keyname)) { continue }
	    if (value == "...") { delete keymap[keyname]; continue }

	    var keys = map(keyname.split(" "), normalizeKeyName);
	    for (var i = 0; i < keys.length; i++) {
	      var val = (void 0), name = (void 0);
	      if (i == keys.length - 1) {
	        name = keys.join(" ");
	        val = value;
	      } else {
	        name = keys.slice(0, i + 1).join(" ");
	        val = "...";
	      }
	      var prev = copy[name];
	      if (!prev) { copy[name] = val; }
	      else if (prev != val) { throw new Error("Inconsistent bindings for " + name) }
	    }
	    delete keymap[keyname];
	  } }
	  for (var prop in copy) { keymap[prop] = copy[prop]; }
	  return keymap
	}

	function lookupKey(key, map$$1, handle, context) {
	  map$$1 = getKeyMap(map$$1);
	  var found = map$$1.call ? map$$1.call(key, context) : map$$1[key];
	  if (found === false) { return "nothing" }
	  if (found === "...") { return "multi" }
	  if (found != null && handle(found)) { return "handled" }

	  if (map$$1.fallthrough) {
	    if (Object.prototype.toString.call(map$$1.fallthrough) != "[object Array]")
	      { return lookupKey(key, map$$1.fallthrough, handle, context) }
	    for (var i = 0; i < map$$1.fallthrough.length; i++) {
	      var result = lookupKey(key, map$$1.fallthrough[i], handle, context);
	      if (result) { return result }
	    }
	  }
	}

	// Modifier key presses don't count as 'real' key presses for the
	// purpose of keymap fallthrough.
	function isModifierKey(value) {
	  var name = typeof value == "string" ? value : keyNames[value.keyCode];
	  return name == "Ctrl" || name == "Alt" || name == "Shift" || name == "Mod"
	}

	function addModifierNames(name, event, noShift) {
	  var base = name;
	  if (event.altKey && base != "Alt") { name = "Alt-" + name; }
	  if ((flipCtrlCmd ? event.metaKey : event.ctrlKey) && base != "Ctrl") { name = "Ctrl-" + name; }
	  if ((flipCtrlCmd ? event.ctrlKey : event.metaKey) && base != "Cmd") { name = "Cmd-" + name; }
	  if (!noShift && event.shiftKey && base != "Shift") { name = "Shift-" + name; }
	  return name
	}

	// Look up the name of a key as indicated by an event object.
	function keyName(event, noShift) {
	  if (presto && event.keyCode == 34 && event["char"]) { return false }
	  var name = keyNames[event.keyCode];
	  if (name == null || event.altGraphKey) { return false }
	  return addModifierNames(name, event, noShift)
	}

	function getKeyMap(val) {
	  return typeof val == "string" ? keyMap[val] : val
	}

	// Helper for deleting text near the selection(s), used to implement
	// backspace, delete, and similar functionality.
	function deleteNearSelection(cm, compute) {
	  var ranges = cm.doc.sel.ranges, kill = [];
	  // Build up a set of ranges to kill first, merging overlapping
	  // ranges.
	  for (var i = 0; i < ranges.length; i++) {
	    var toKill = compute(ranges[i]);
	    while (kill.length && cmp(toKill.from, lst(kill).to) <= 0) {
	      var replaced = kill.pop();
	      if (cmp(replaced.from, toKill.from) < 0) {
	        toKill.from = replaced.from;
	        break
	      }
	    }
	    kill.push(toKill);
	  }
	  // Next, remove those actual ranges.
	  runInOp(cm, function () {
	    for (var i = kill.length - 1; i >= 0; i--)
	      { replaceRange(cm.doc, "", kill[i].from, kill[i].to, "+delete"); }
	    ensureCursorVisible(cm);
	  });
	}

	function moveCharLogically(line, ch, dir) {
	  var target = skipExtendingChars(line.text, ch + dir, dir);
	  return target < 0 || target > line.text.length ? null : target
	}

	function moveLogically(line, start, dir) {
	  var ch = moveCharLogically(line, start.ch, dir);
	  return ch == null ? null : new Pos(start.line, ch, dir < 0 ? "after" : "before")
	}

	function endOfLine(visually, cm, lineObj, lineNo, dir) {
	  if (visually) {
	    var order = getOrder(lineObj, cm.doc.direction);
	    if (order) {
	      var part = dir < 0 ? lst(order) : order[0];
	      var moveInStorageOrder = (dir < 0) == (part.level == 1);
	      var sticky = moveInStorageOrder ? "after" : "before";
	      var ch;
	      // With a wrapped rtl chunk (possibly spanning multiple bidi parts),
	      // it could be that the last bidi part is not on the last visual line,
	      // since visual lines contain content order-consecutive chunks.
	      // Thus, in rtl, we are looking for the first (content-order) character
	      // in the rtl chunk that is on the last line (that is, the same line
	      // as the last (content-order) character).
	      if (part.level > 0 || cm.doc.direction == "rtl") {
	        var prep = prepareMeasureForLine(cm, lineObj);
	        ch = dir < 0 ? lineObj.text.length - 1 : 0;
	        var targetTop = measureCharPrepared(cm, prep, ch).top;
	        ch = findFirst(function (ch) { return measureCharPrepared(cm, prep, ch).top == targetTop; }, (dir < 0) == (part.level == 1) ? part.from : part.to - 1, ch);
	        if (sticky == "before") { ch = moveCharLogically(lineObj, ch, 1); }
	      } else { ch = dir < 0 ? part.to : part.from; }
	      return new Pos(lineNo, ch, sticky)
	    }
	  }
	  return new Pos(lineNo, dir < 0 ? lineObj.text.length : 0, dir < 0 ? "before" : "after")
	}

	function moveVisually(cm, line, start, dir) {
	  var bidi = getOrder(line, cm.doc.direction);
	  if (!bidi) { return moveLogically(line, start, dir) }
	  if (start.ch >= line.text.length) {
	    start.ch = line.text.length;
	    start.sticky = "before";
	  } else if (start.ch <= 0) {
	    start.ch = 0;
	    start.sticky = "after";
	  }
	  var partPos = getBidiPartAt(bidi, start.ch, start.sticky), part = bidi[partPos];
	  if (cm.doc.direction == "ltr" && part.level % 2 == 0 && (dir > 0 ? part.to > start.ch : part.from < start.ch)) {
	    // Case 1: We move within an ltr part in an ltr editor. Even with wrapped lines,
	    // nothing interesting happens.
	    return moveLogically(line, start, dir)
	  }

	  var mv = function (pos, dir) { return moveCharLogically(line, pos instanceof Pos ? pos.ch : pos, dir); };
	  var prep;
	  var getWrappedLineExtent = function (ch) {
	    if (!cm.options.lineWrapping) { return {begin: 0, end: line.text.length} }
	    prep = prep || prepareMeasureForLine(cm, line);
	    return wrappedLineExtentChar(cm, line, prep, ch)
	  };
	  var wrappedLineExtent = getWrappedLineExtent(start.sticky == "before" ? mv(start, -1) : start.ch);

	  if (cm.doc.direction == "rtl" || part.level == 1) {
	    var moveInStorageOrder = (part.level == 1) == (dir < 0);
	    var ch = mv(start, moveInStorageOrder ? 1 : -1);
	    if (ch != null && (!moveInStorageOrder ? ch >= part.from && ch >= wrappedLineExtent.begin : ch <= part.to && ch <= wrappedLineExtent.end)) {
	      // Case 2: We move within an rtl part or in an rtl editor on the same visual line
	      var sticky = moveInStorageOrder ? "before" : "after";
	      return new Pos(start.line, ch, sticky)
	    }
	  }

	  // Case 3: Could not move within this bidi part in this visual line, so leave
	  // the current bidi part

	  var searchInVisualLine = function (partPos, dir, wrappedLineExtent) {
	    var getRes = function (ch, moveInStorageOrder) { return moveInStorageOrder
	      ? new Pos(start.line, mv(ch, 1), "before")
	      : new Pos(start.line, ch, "after"); };

	    for (; partPos >= 0 && partPos < bidi.length; partPos += dir) {
	      var part = bidi[partPos];
	      var moveInStorageOrder = (dir > 0) == (part.level != 1);
	      var ch = moveInStorageOrder ? wrappedLineExtent.begin : mv(wrappedLineExtent.end, -1);
	      if (part.from <= ch && ch < part.to) { return getRes(ch, moveInStorageOrder) }
	      ch = moveInStorageOrder ? part.from : mv(part.to, -1);
	      if (wrappedLineExtent.begin <= ch && ch < wrappedLineExtent.end) { return getRes(ch, moveInStorageOrder) }
	    }
	  };

	  // Case 3a: Look for other bidi parts on the same visual line
	  var res = searchInVisualLine(partPos + dir, dir, wrappedLineExtent);
	  if (res) { return res }

	  // Case 3b: Look for other bidi parts on the next visual line
	  var nextCh = dir > 0 ? wrappedLineExtent.end : mv(wrappedLineExtent.begin, -1);
	  if (nextCh != null && !(dir > 0 && nextCh == line.text.length)) {
	    res = searchInVisualLine(dir > 0 ? 0 : bidi.length - 1, dir, getWrappedLineExtent(nextCh));
	    if (res) { return res }
	  }

	  // Case 4: Nowhere to move
	  return null
	}

	// Commands are parameter-less actions that can be performed on an
	// editor, mostly used for keybindings.
	var commands = {
	  selectAll: selectAll,
	  singleSelection: function (cm) { return cm.setSelection(cm.getCursor("anchor"), cm.getCursor("head"), sel_dontScroll); },
	  killLine: function (cm) { return deleteNearSelection(cm, function (range) {
	    if (range.empty()) {
	      var len = getLine(cm.doc, range.head.line).text.length;
	      if (range.head.ch == len && range.head.line < cm.lastLine())
	        { return {from: range.head, to: Pos(range.head.line + 1, 0)} }
	      else
	        { return {from: range.head, to: Pos(range.head.line, len)} }
	    } else {
	      return {from: range.from(), to: range.to()}
	    }
	  }); },
	  deleteLine: function (cm) { return deleteNearSelection(cm, function (range) { return ({
	    from: Pos(range.from().line, 0),
	    to: clipPos(cm.doc, Pos(range.to().line + 1, 0))
	  }); }); },
	  delLineLeft: function (cm) { return deleteNearSelection(cm, function (range) { return ({
	    from: Pos(range.from().line, 0), to: range.from()
	  }); }); },
	  delWrappedLineLeft: function (cm) { return deleteNearSelection(cm, function (range) {
	    var top = cm.charCoords(range.head, "div").top + 5;
	    var leftPos = cm.coordsChar({left: 0, top: top}, "div");
	    return {from: leftPos, to: range.from()}
	  }); },
	  delWrappedLineRight: function (cm) { return deleteNearSelection(cm, function (range) {
	    var top = cm.charCoords(range.head, "div").top + 5;
	    var rightPos = cm.coordsChar({left: cm.display.lineDiv.offsetWidth + 100, top: top}, "div");
	    return {from: range.from(), to: rightPos }
	  }); },
	  undo: function (cm) { return cm.undo(); },
	  redo: function (cm) { return cm.redo(); },
	  undoSelection: function (cm) { return cm.undoSelection(); },
	  redoSelection: function (cm) { return cm.redoSelection(); },
	  goDocStart: function (cm) { return cm.extendSelection(Pos(cm.firstLine(), 0)); },
	  goDocEnd: function (cm) { return cm.extendSelection(Pos(cm.lastLine())); },
	  goLineStart: function (cm) { return cm.extendSelectionsBy(function (range) { return lineStart(cm, range.head.line); },
	    {origin: "+move", bias: 1}
	  ); },
	  goLineStartSmart: function (cm) { return cm.extendSelectionsBy(function (range) { return lineStartSmart(cm, range.head); },
	    {origin: "+move", bias: 1}
	  ); },
	  goLineEnd: function (cm) { return cm.extendSelectionsBy(function (range) { return lineEnd(cm, range.head.line); },
	    {origin: "+move", bias: -1}
	  ); },
	  goLineRight: function (cm) { return cm.extendSelectionsBy(function (range) {
	    var top = cm.cursorCoords(range.head, "div").top + 5;
	    return cm.coordsChar({left: cm.display.lineDiv.offsetWidth + 100, top: top}, "div")
	  }, sel_move); },
	  goLineLeft: function (cm) { return cm.extendSelectionsBy(function (range) {
	    var top = cm.cursorCoords(range.head, "div").top + 5;
	    return cm.coordsChar({left: 0, top: top}, "div")
	  }, sel_move); },
	  goLineLeftSmart: function (cm) { return cm.extendSelectionsBy(function (range) {
	    var top = cm.cursorCoords(range.head, "div").top + 5;
	    var pos = cm.coordsChar({left: 0, top: top}, "div");
	    if (pos.ch < cm.getLine(pos.line).search(/\S/)) { return lineStartSmart(cm, range.head) }
	    return pos
	  }, sel_move); },
	  goLineUp: function (cm) { return cm.moveV(-1, "line"); },
	  goLineDown: function (cm) { return cm.moveV(1, "line"); },
	  goPageUp: function (cm) { return cm.moveV(-1, "page"); },
	  goPageDown: function (cm) { return cm.moveV(1, "page"); },
	  goCharLeft: function (cm) { return cm.moveH(-1, "char"); },
	  goCharRight: function (cm) { return cm.moveH(1, "char"); },
	  goColumnLeft: function (cm) { return cm.moveH(-1, "column"); },
	  goColumnRight: function (cm) { return cm.moveH(1, "column"); },
	  goWordLeft: function (cm) { return cm.moveH(-1, "word"); },
	  goGroupRight: function (cm) { return cm.moveH(1, "group"); },
	  goGroupLeft: function (cm) { return cm.moveH(-1, "group"); },
	  goWordRight: function (cm) { return cm.moveH(1, "word"); },
	  delCharBefore: function (cm) { return cm.deleteH(-1, "char"); },
	  delCharAfter: function (cm) { return cm.deleteH(1, "char"); },
	  delWordBefore: function (cm) { return cm.deleteH(-1, "word"); },
	  delWordAfter: function (cm) { return cm.deleteH(1, "word"); },
	  delGroupBefore: function (cm) { return cm.deleteH(-1, "group"); },
	  delGroupAfter: function (cm) { return cm.deleteH(1, "group"); },
	  indentAuto: function (cm) { return cm.indentSelection("smart"); },
	  indentMore: function (cm) { return cm.indentSelection("add"); },
	  indentLess: function (cm) { return cm.indentSelection("subtract"); },
	  insertTab: function (cm) { return cm.replaceSelection("\t"); },
	  insertSoftTab: function (cm) {
	    var spaces = [], ranges = cm.listSelections(), tabSize = cm.options.tabSize;
	    for (var i = 0; i < ranges.length; i++) {
	      var pos = ranges[i].from();
	      var col = countColumn(cm.getLine(pos.line), pos.ch, tabSize);
	      spaces.push(spaceStr(tabSize - col % tabSize));
	    }
	    cm.replaceSelections(spaces);
	  },
	  defaultTab: function (cm) {
	    if (cm.somethingSelected()) { cm.indentSelection("add"); }
	    else { cm.execCommand("insertTab"); }
	  },
	  // Swap the two chars left and right of each selection's head.
	  // Move cursor behind the two swapped characters afterwards.
	  //
	  // Doesn't consider line feeds a character.
	  // Doesn't scan more than one line above to find a character.
	  // Doesn't do anything on an empty line.
	  // Doesn't do anything with non-empty selections.
	  transposeChars: function (cm) { return runInOp(cm, function () {
	    var ranges = cm.listSelections(), newSel = [];
	    for (var i = 0; i < ranges.length; i++) {
	      if (!ranges[i].empty()) { continue }
	      var cur = ranges[i].head, line = getLine(cm.doc, cur.line).text;
	      if (line) {
	        if (cur.ch == line.length) { cur = new Pos(cur.line, cur.ch - 1); }
	        if (cur.ch > 0) {
	          cur = new Pos(cur.line, cur.ch + 1);
	          cm.replaceRange(line.charAt(cur.ch - 1) + line.charAt(cur.ch - 2),
	                          Pos(cur.line, cur.ch - 2), cur, "+transpose");
	        } else if (cur.line > cm.doc.first) {
	          var prev = getLine(cm.doc, cur.line - 1).text;
	          if (prev) {
	            cur = new Pos(cur.line, 1);
	            cm.replaceRange(line.charAt(0) + cm.doc.lineSeparator() +
	                            prev.charAt(prev.length - 1),
	                            Pos(cur.line - 1, prev.length - 1), cur, "+transpose");
	          }
	        }
	      }
	      newSel.push(new Range(cur, cur));
	    }
	    cm.setSelections(newSel);
	  }); },
	  newlineAndIndent: function (cm) { return runInOp(cm, function () {
	    var sels = cm.listSelections();
	    for (var i = sels.length - 1; i >= 0; i--)
	      { cm.replaceRange(cm.doc.lineSeparator(), sels[i].anchor, sels[i].head, "+input"); }
	    sels = cm.listSelections();
	    for (var i$1 = 0; i$1 < sels.length; i$1++)
	      { cm.indentLine(sels[i$1].from().line, null, true); }
	    ensureCursorVisible(cm);
	  }); },
	  openLine: function (cm) { return cm.replaceSelection("\n", "start"); },
	  toggleOverwrite: function (cm) { return cm.toggleOverwrite(); }
	};


	function lineStart(cm, lineN) {
	  var line = getLine(cm.doc, lineN);
	  var visual = visualLine(line);
	  if (visual != line) { lineN = lineNo(visual); }
	  return endOfLine(true, cm, visual, lineN, 1)
	}
	function lineEnd(cm, lineN) {
	  var line = getLine(cm.doc, lineN);
	  var visual = visualLineEnd(line);
	  if (visual != line) { lineN = lineNo(visual); }
	  return endOfLine(true, cm, line, lineN, -1)
	}
	function lineStartSmart(cm, pos) {
	  var start = lineStart(cm, pos.line);
	  var line = getLine(cm.doc, start.line);
	  var order = getOrder(line, cm.doc.direction);
	  if (!order || order[0].level == 0) {
	    var firstNonWS = Math.max(0, line.text.search(/\S/));
	    var inWS = pos.line == start.line && pos.ch <= firstNonWS && pos.ch;
	    return Pos(start.line, inWS ? 0 : firstNonWS, start.sticky)
	  }
	  return start
	}

	// Run a handler that was bound to a key.
	function doHandleBinding(cm, bound, dropShift) {
	  if (typeof bound == "string") {
	    bound = commands[bound];
	    if (!bound) { return false }
	  }
	  // Ensure previous input has been read, so that the handler sees a
	  // consistent view of the document
	  cm.display.input.ensurePolled();
	  var prevShift = cm.display.shift, done = false;
	  try {
	    if (cm.isReadOnly()) { cm.state.suppressEdits = true; }
	    if (dropShift) { cm.display.shift = false; }
	    done = bound(cm) != Pass;
	  } finally {
	    cm.display.shift = prevShift;
	    cm.state.suppressEdits = false;
	  }
	  return done
	}

	function lookupKeyForEditor(cm, name, handle) {
	  for (var i = 0; i < cm.state.keyMaps.length; i++) {
	    var result = lookupKey(name, cm.state.keyMaps[i], handle, cm);
	    if (result) { return result }
	  }
	  return (cm.options.extraKeys && lookupKey(name, cm.options.extraKeys, handle, cm))
	    || lookupKey(name, cm.options.keyMap, handle, cm)
	}

	// Note that, despite the name, this function is also used to check
	// for bound mouse clicks.

	var stopSeq = new Delayed;
	function dispatchKey(cm, name, e, handle) {
	  var seq = cm.state.keySeq;
	  if (seq) {
	    if (isModifierKey(name)) { return "handled" }
	    stopSeq.set(50, function () {
	      if (cm.state.keySeq == seq) {
	        cm.state.keySeq = null;
	        cm.display.input.reset();
	      }
	    });
	    name = seq + " " + name;
	  }
	  var result = lookupKeyForEditor(cm, name, handle);

	  if (result == "multi")
	    { cm.state.keySeq = name; }
	  if (result == "handled")
	    { signalLater(cm, "keyHandled", cm, name, e); }

	  if (result == "handled" || result == "multi") {
	    e_preventDefault(e);
	    restartBlink(cm);
	  }

	  if (seq && !result && /\'$/.test(name)) {
	    e_preventDefault(e);
	    return true
	  }
	  return !!result
	}

	// Handle a key from the keydown event.
	function handleKeyBinding(cm, e) {
	  var name = keyName(e, true);
	  if (!name) { return false }

	  if (e.shiftKey && !cm.state.keySeq) {
	    // First try to resolve full name (including 'Shift-'). Failing
	    // that, see if there is a cursor-motion command (starting with
	    // 'go') bound to the keyname without 'Shift-'.
	    return dispatchKey(cm, "Shift-" + name, e, function (b) { return doHandleBinding(cm, b, true); })
	        || dispatchKey(cm, name, e, function (b) {
	             if (typeof b == "string" ? /^go[A-Z]/.test(b) : b.motion)
	               { return doHandleBinding(cm, b) }
	           })
	  } else {
	    return dispatchKey(cm, name, e, function (b) { return doHandleBinding(cm, b); })
	  }
	}

	// Handle a key from the keypress event
	function handleCharBinding(cm, e, ch) {
	  return dispatchKey(cm, "'" + ch + "'", e, function (b) { return doHandleBinding(cm, b, true); })
	}

	var lastStoppedKey = null;
	function onKeyDown(e) {
	  var cm = this;
	  cm.curOp.focus = activeElt();
	  if (signalDOMEvent(cm, e)) { return }
	  // IE does strange things with escape.
	  if (ie && ie_version < 11 && e.keyCode == 27) { e.returnValue = false; }
	  var code = e.keyCode;
	  cm.display.shift = code == 16 || e.shiftKey;
	  var handled = handleKeyBinding(cm, e);
	  if (presto) {
	    lastStoppedKey = handled ? code : null;
	    // Opera has no cut event... we try to at least catch the key combo
	    if (!handled && code == 88 && !hasCopyEvent && (mac ? e.metaKey : e.ctrlKey))
	      { cm.replaceSelection("", null, "cut"); }
	  }

	  // Turn mouse into crosshair when Alt is held on Mac.
	  if (code == 18 && !/\bCodeMirror-crosshair\b/.test(cm.display.lineDiv.className))
	    { showCrossHair(cm); }
	}

	function showCrossHair(cm) {
	  var lineDiv = cm.display.lineDiv;
	  addClass(lineDiv, "CodeMirror-crosshair");

	  function up(e) {
	    if (e.keyCode == 18 || !e.altKey) {
	      rmClass(lineDiv, "CodeMirror-crosshair");
	      off(document, "keyup", up);
	      off(document, "mouseover", up);
	    }
	  }
	  on(document, "keyup", up);
	  on(document, "mouseover", up);
	}

	function onKeyUp(e) {
	  if (e.keyCode == 16) { this.doc.sel.shift = false; }
	  signalDOMEvent(this, e);
	}

	function onKeyPress(e) {
	  var cm = this;
	  if (eventInWidget(cm.display, e) || signalDOMEvent(cm, e) || e.ctrlKey && !e.altKey || mac && e.metaKey) { return }
	  var keyCode = e.keyCode, charCode = e.charCode;
	  if (presto && keyCode == lastStoppedKey) {lastStoppedKey = null; e_preventDefault(e); return}
	  if ((presto && (!e.which || e.which < 10)) && handleKeyBinding(cm, e)) { return }
	  var ch = String.fromCharCode(charCode == null ? keyCode : charCode);
	  // Some browsers fire keypress events for backspace
	  if (ch == "\x08") { return }
	  if (handleCharBinding(cm, e, ch)) { return }
	  cm.display.input.onKeyPress(e);
	}

	var DOUBLECLICK_DELAY = 400;

	var PastClick = function(time, pos, button) {
	  this.time = time;
	  this.pos = pos;
	  this.button = button;
	};

	PastClick.prototype.compare = function (time, pos, button) {
	  return this.time + DOUBLECLICK_DELAY > time &&
	    cmp(pos, this.pos) == 0 && button == this.button
	};

	var lastClick;
	var lastDoubleClick;
	function clickRepeat(pos, button) {
	  var now = +new Date;
	  if (lastDoubleClick && lastDoubleClick.compare(now, pos, button)) {
	    lastClick = lastDoubleClick = null;
	    return "triple"
	  } else if (lastClick && lastClick.compare(now, pos, button)) {
	    lastDoubleClick = new PastClick(now, pos, button);
	    lastClick = null;
	    return "double"
	  } else {
	    lastClick = new PastClick(now, pos, button);
	    lastDoubleClick = null;
	    return "single"
	  }
	}

	// A mouse down can be a single click, double click, triple click,
	// start of selection drag, start of text drag, new cursor
	// (ctrl-click), rectangle drag (alt-drag), or xwin
	// middle-click-paste. Or it might be a click on something we should
	// not interfere with, such as a scrollbar or widget.
	function onMouseDown(e) {
	  var cm = this, display = cm.display;
	  if (signalDOMEvent(cm, e) || display.activeTouch && display.input.supportsTouch()) { return }
	  display.input.ensurePolled();
	  display.shift = e.shiftKey;

	  if (eventInWidget(display, e)) {
	    if (!webkit) {
	      // Briefly turn off draggability, to allow widgets to do
	      // normal dragging things.
	      display.scroller.draggable = false;
	      setTimeout(function () { return display.scroller.draggable = true; }, 100);
	    }
	    return
	  }
	  if (clickInGutter(cm, e)) { return }
	  var pos = posFromMouse(cm, e), button = e_button(e), repeat = pos ? clickRepeat(pos, button) : "single";
	  window.focus();

	  // #3261: make sure, that we're not starting a second selection
	  if (button == 1 && cm.state.selectingText)
	    { cm.state.selectingText(e); }

	  if (pos && handleMappedButton(cm, button, pos, repeat, e)) { return }

	  if (button == 1) {
	    if (pos) { leftButtonDown(cm, pos, repeat, e); }
	    else if (e_target(e) == display.scroller) { e_preventDefault(e); }
	  } else if (button == 2) {
	    if (pos) { extendSelection(cm.doc, pos); }
	    setTimeout(function () { return display.input.focus(); }, 20);
	  } else if (button == 3) {
	    if (captureRightClick) { onContextMenu(cm, e); }
	    else { delayBlurEvent(cm); }
	  }
	}

	function handleMappedButton(cm, button, pos, repeat, event) {
	  var name = "Click";
	  if (repeat == "double") { name = "Double" + name; }
	  else if (repeat == "triple") { name = "Triple" + name; }
	  name = (button == 1 ? "Left" : button == 2 ? "Middle" : "Right") + name;

	  return dispatchKey(cm,  addModifierNames(name, event), event, function (bound) {
	    if (typeof bound == "string") { bound = commands[bound]; }
	    if (!bound) { return false }
	    var done = false;
	    try {
	      if (cm.isReadOnly()) { cm.state.suppressEdits = true; }
	      done = bound(cm, pos) != Pass;
	    } finally {
	      cm.state.suppressEdits = false;
	    }
	    return done
	  })
	}

	function configureMouse(cm, repeat, event) {
	  var option = cm.getOption("configureMouse");
	  var value = option ? option(cm, repeat, event) : {};
	  if (value.unit == null) {
	    var rect = chromeOS ? event.shiftKey && event.metaKey : event.altKey;
	    value.unit = rect ? "rectangle" : repeat == "single" ? "char" : repeat == "double" ? "word" : "line";
	  }
	  if (value.extend == null || cm.doc.extend) { value.extend = cm.doc.extend || event.shiftKey; }
	  if (value.addNew == null) { value.addNew = mac ? event.metaKey : event.ctrlKey; }
	  if (value.moveOnDrag == null) { value.moveOnDrag = !(mac ? event.altKey : event.ctrlKey); }
	  return value
	}

	function leftButtonDown(cm, pos, repeat, event) {
	  if (ie) { setTimeout(bind(ensureFocus, cm), 0); }
	  else { cm.curOp.focus = activeElt(); }

	  var behavior = configureMouse(cm, repeat, event);

	  var sel = cm.doc.sel, contained;
	  if (cm.options.dragDrop && dragAndDrop && !cm.isReadOnly() &&
	      repeat == "single" && (contained = sel.contains(pos)) > -1 &&
	      (cmp((contained = sel.ranges[contained]).from(), pos) < 0 || pos.xRel > 0) &&
	      (cmp(contained.to(), pos) > 0 || pos.xRel < 0))
	    { leftButtonStartDrag(cm, event, pos, behavior); }
	  else
	    { leftButtonSelect(cm, event, pos, behavior); }
	}

	// Start a text drag. When it ends, see if any dragging actually
	// happen, and treat as a click if it didn't.
	function leftButtonStartDrag(cm, event, pos, behavior) {
	  var display = cm.display, moved = false;
	  var dragEnd = operation(cm, function (e) {
	    if (webkit) { display.scroller.draggable = false; }
	    cm.state.draggingText = false;
	    off(document, "mouseup", dragEnd);
	    off(document, "mousemove", mouseMove);
	    off(display.scroller, "dragstart", dragStart);
	    off(display.scroller, "drop", dragEnd);
	    if (!moved) {
	      e_preventDefault(e);
	      if (!behavior.addNew)
	        { extendSelection(cm.doc, pos, null, null, behavior.extend); }
	      // Work around unexplainable focus problem in IE9 (#2127) and Chrome (#3081)
	      if (webkit || ie && ie_version == 9)
	        { setTimeout(function () {document.body.focus(); display.input.focus();}, 20); }
	      else
	        { display.input.focus(); }
	    }
	  });
	  var mouseMove = function(e2) {
	    moved = moved || Math.abs(event.clientX - e2.clientX) + Math.abs(event.clientY - e2.clientY) >= 10;
	  };
	  var dragStart = function () { return moved = true; };
	  // Let the drag handler handle this.
	  if (webkit) { display.scroller.draggable = true; }
	  cm.state.draggingText = dragEnd;
	  dragEnd.copy = !behavior.moveOnDrag;
	  // IE's approach to draggable
	  if (display.scroller.dragDrop) { display.scroller.dragDrop(); }
	  on(document, "mouseup", dragEnd);
	  on(document, "mousemove", mouseMove);
	  on(display.scroller, "dragstart", dragStart);
	  on(display.scroller, "drop", dragEnd);

	  delayBlurEvent(cm);
	  setTimeout(function () { return display.input.focus(); }, 20);
	}

	function rangeForUnit(cm, pos, unit) {
	  if (unit == "char") { return new Range(pos, pos) }
	  if (unit == "word") { return cm.findWordAt(pos) }
	  if (unit == "line") { return new Range(Pos(pos.line, 0), clipPos(cm.doc, Pos(pos.line + 1, 0))) }
	  var result = unit(cm, pos);
	  return new Range(result.from, result.to)
	}

	// Normal selection, as opposed to text dragging.
	function leftButtonSelect(cm, event, start, behavior) {
	  var display = cm.display, doc = cm.doc;
	  e_preventDefault(event);

	  var ourRange, ourIndex, startSel = doc.sel, ranges = startSel.ranges;
	  if (behavior.addNew && !behavior.extend) {
	    ourIndex = doc.sel.contains(start);
	    if (ourIndex > -1)
	      { ourRange = ranges[ourIndex]; }
	    else
	      { ourRange = new Range(start, start); }
	  } else {
	    ourRange = doc.sel.primary();
	    ourIndex = doc.sel.primIndex;
	  }

	  if (behavior.unit == "rectangle") {
	    if (!behavior.addNew) { ourRange = new Range(start, start); }
	    start = posFromMouse(cm, event, true, true);
	    ourIndex = -1;
	  } else {
	    var range$$1 = rangeForUnit(cm, start, behavior.unit);
	    if (behavior.extend)
	      { ourRange = extendRange(ourRange, range$$1.anchor, range$$1.head, behavior.extend); }
	    else
	      { ourRange = range$$1; }
	  }

	  if (!behavior.addNew) {
	    ourIndex = 0;
	    setSelection(doc, new Selection([ourRange], 0), sel_mouse);
	    startSel = doc.sel;
	  } else if (ourIndex == -1) {
	    ourIndex = ranges.length;
	    setSelection(doc, normalizeSelection(ranges.concat([ourRange]), ourIndex),
	                 {scroll: false, origin: "*mouse"});
	  } else if (ranges.length > 1 && ranges[ourIndex].empty() && behavior.unit == "char" && !behavior.extend) {
	    setSelection(doc, normalizeSelection(ranges.slice(0, ourIndex).concat(ranges.slice(ourIndex + 1)), 0),
	                 {scroll: false, origin: "*mouse"});
	    startSel = doc.sel;
	  } else {
	    replaceOneSelection(doc, ourIndex, ourRange, sel_mouse);
	  }

	  var lastPos = start;
	  function extendTo(pos) {
	    if (cmp(lastPos, pos) == 0) { return }
	    lastPos = pos;

	    if (behavior.unit == "rectangle") {
	      var ranges = [], tabSize = cm.options.tabSize;
	      var startCol = countColumn(getLine(doc, start.line).text, start.ch, tabSize);
	      var posCol = countColumn(getLine(doc, pos.line).text, pos.ch, tabSize);
	      var left = Math.min(startCol, posCol), right = Math.max(startCol, posCol);
	      for (var line = Math.min(start.line, pos.line), end = Math.min(cm.lastLine(), Math.max(start.line, pos.line));
	           line <= end; line++) {
	        var text = getLine(doc, line).text, leftPos = findColumn(text, left, tabSize);
	        if (left == right)
	          { ranges.push(new Range(Pos(line, leftPos), Pos(line, leftPos))); }
	        else if (text.length > leftPos)
	          { ranges.push(new Range(Pos(line, leftPos), Pos(line, findColumn(text, right, tabSize)))); }
	      }
	      if (!ranges.length) { ranges.push(new Range(start, start)); }
	      setSelection(doc, normalizeSelection(startSel.ranges.slice(0, ourIndex).concat(ranges), ourIndex),
	                   {origin: "*mouse", scroll: false});
	      cm.scrollIntoView(pos);
	    } else {
	      var oldRange = ourRange;
	      var range$$1 = rangeForUnit(cm, pos, behavior.unit);
	      var anchor = oldRange.anchor, head;
	      if (cmp(range$$1.anchor, anchor) > 0) {
	        head = range$$1.head;
	        anchor = minPos(oldRange.from(), range$$1.anchor);
	      } else {
	        head = range$$1.anchor;
	        anchor = maxPos(oldRange.to(), range$$1.head);
	      }
	      var ranges$1 = startSel.ranges.slice(0);
	      ranges$1[ourIndex] = bidiSimplify(cm, new Range(clipPos(doc, anchor), head));
	      setSelection(doc, normalizeSelection(ranges$1, ourIndex), sel_mouse);
	    }
	  }

	  var editorSize = display.wrapper.getBoundingClientRect();
	  // Used to ensure timeout re-tries don't fire when another extend
	  // happened in the meantime (clearTimeout isn't reliable -- at
	  // least on Chrome, the timeouts still happen even when cleared,
	  // if the clear happens after their scheduled firing time).
	  var counter = 0;

	  function extend(e) {
	    var curCount = ++counter;
	    var cur = posFromMouse(cm, e, true, behavior.unit == "rectangle");
	    if (!cur) { return }
	    if (cmp(cur, lastPos) != 0) {
	      cm.curOp.focus = activeElt();
	      extendTo(cur);
	      var visible = visibleLines(display, doc);
	      if (cur.line >= visible.to || cur.line < visible.from)
	        { setTimeout(operation(cm, function () {if (counter == curCount) { extend(e); }}), 150); }
	    } else {
	      var outside = e.clientY < editorSize.top ? -20 : e.clientY > editorSize.bottom ? 20 : 0;
	      if (outside) { setTimeout(operation(cm, function () {
	        if (counter != curCount) { return }
	        display.scroller.scrollTop += outside;
	        extend(e);
	      }), 50); }
	    }
	  }

	  function done(e) {
	    cm.state.selectingText = false;
	    counter = Infinity;
	    e_preventDefault(e);
	    display.input.focus();
	    off(document, "mousemove", move);
	    off(document, "mouseup", up);
	    doc.history.lastSelOrigin = null;
	  }

	  var move = operation(cm, function (e) {
	    if (!e_button(e)) { done(e); }
	    else { extend(e); }
	  });
	  var up = operation(cm, done);
	  cm.state.selectingText = up;
	  on(document, "mousemove", move);
	  on(document, "mouseup", up);
	}

	// Used when mouse-selecting to adjust the anchor to the proper side
	// of a bidi jump depending on the visual position of the head.
	function bidiSimplify(cm, range$$1) {
	  var anchor = range$$1.anchor;
	  var head = range$$1.head;
	  var anchorLine = getLine(cm.doc, anchor.line);
	  if (cmp(anchor, head) == 0 && anchor.sticky == head.sticky) { return range$$1 }
	  var order = getOrder(anchorLine);
	  if (!order) { return range$$1 }
	  var index = getBidiPartAt(order, anchor.ch, anchor.sticky), part = order[index];
	  if (part.from != anchor.ch && part.to != anchor.ch) { return range$$1 }
	  var boundary = index + ((part.from == anchor.ch) == (part.level != 1) ? 0 : 1);
	  if (boundary == 0 || boundary == order.length) { return range$$1 }

	  // Compute the relative visual position of the head compared to the
	  // anchor (<0 is to the left, >0 to the right)
	  var leftSide;
	  if (head.line != anchor.line) {
	    leftSide = (head.line - anchor.line) * (cm.doc.direction == "ltr" ? 1 : -1) > 0;
	  } else {
	    var headIndex = getBidiPartAt(order, head.ch, head.sticky);
	    var dir = headIndex - index || (head.ch - anchor.ch) * (part.level == 1 ? -1 : 1);
	    if (headIndex == boundary - 1 || headIndex == boundary)
	      { leftSide = dir < 0; }
	    else
	      { leftSide = dir > 0; }
	  }

	  var usePart = order[boundary + (leftSide ? -1 : 0)];
	  var from = leftSide == (usePart.level == 1);
	  var ch = from ? usePart.from : usePart.to, sticky = from ? "after" : "before";
	  return anchor.ch == ch && anchor.sticky == sticky ? range$$1 : new Range(new Pos(anchor.line, ch, sticky), head)
	}


	// Determines whether an event happened in the gutter, and fires the
	// handlers for the corresponding event.
	function gutterEvent(cm, e, type, prevent) {
	  var mX, mY;
	  if (e.touches) {
	    mX = e.touches[0].clientX;
	    mY = e.touches[0].clientY;
	  } else {
	    try { mX = e.clientX; mY = e.clientY; }
	    catch(e) { return false }
	  }
	  if (mX >= Math.floor(cm.display.gutters.getBoundingClientRect().right)) { return false }
	  if (prevent) { e_preventDefault(e); }

	  var display = cm.display;
	  var lineBox = display.lineDiv.getBoundingClientRect();

	  if (mY > lineBox.bottom || !hasHandler(cm, type)) { return e_defaultPrevented(e) }
	  mY -= lineBox.top - display.viewOffset;

	  for (var i = 0; i < cm.options.gutters.length; ++i) {
	    var g = display.gutters.childNodes[i];
	    if (g && g.getBoundingClientRect().right >= mX) {
	      var line = lineAtHeight(cm.doc, mY);
	      var gutter = cm.options.gutters[i];
	      signal(cm, type, cm, line, gutter, e);
	      return e_defaultPrevented(e)
	    }
	  }
	}

	function clickInGutter(cm, e) {
	  return gutterEvent(cm, e, "gutterClick", true)
	}

	// CONTEXT MENU HANDLING

	// To make the context menu work, we need to briefly unhide the
	// textarea (making it as unobtrusive as possible) to let the
	// right-click take effect on it.
	function onContextMenu(cm, e) {
	  if (eventInWidget(cm.display, e) || contextMenuInGutter(cm, e)) { return }
	  if (signalDOMEvent(cm, e, "contextmenu")) { return }
	  cm.display.input.onContextMenu(e);
	}

	function contextMenuInGutter(cm, e) {
	  if (!hasHandler(cm, "gutterContextMenu")) { return false }
	  return gutterEvent(cm, e, "gutterContextMenu", false)
	}

	function themeChanged(cm) {
	  cm.display.wrapper.className = cm.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") +
	    cm.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
	  clearCaches(cm);
	}

	var Init = {toString: function(){return "CodeMirror.Init"}};

	var defaults = {};
	var optionHandlers = {};

	function defineOptions(CodeMirror) {
	  var optionHandlers = CodeMirror.optionHandlers;

	  function option(name, deflt, handle, notOnInit) {
	    CodeMirror.defaults[name] = deflt;
	    if (handle) { optionHandlers[name] =
	      notOnInit ? function (cm, val, old) {if (old != Init) { handle(cm, val, old); }} : handle; }
	  }

	  CodeMirror.defineOption = option;

	  // Passed to option handlers when there is no old value.
	  CodeMirror.Init = Init;

	  // These two are, on init, called from the constructor because they
	  // have to be initialized before the editor can start at all.
	  option("value", "", function (cm, val) { return cm.setValue(val); }, true);
	  option("mode", null, function (cm, val) {
	    cm.doc.modeOption = val;
	    loadMode(cm);
	  }, true);

	  option("indentUnit", 2, loadMode, true);
	  option("indentWithTabs", false);
	  option("smartIndent", true);
	  option("tabSize", 4, function (cm) {
	    resetModeState(cm);
	    clearCaches(cm);
	    regChange(cm);
	  }, true);
	  option("lineSeparator", null, function (cm, val) {
	    cm.doc.lineSep = val;
	    if (!val) { return }
	    var newBreaks = [], lineNo = cm.doc.first;
	    cm.doc.iter(function (line) {
	      for (var pos = 0;;) {
	        var found = line.text.indexOf(val, pos);
	        if (found == -1) { break }
	        pos = found + val.length;
	        newBreaks.push(Pos(lineNo, found));
	      }
	      lineNo++;
	    });
	    for (var i = newBreaks.length - 1; i >= 0; i--)
	      { replaceRange(cm.doc, val, newBreaks[i], Pos(newBreaks[i].line, newBreaks[i].ch + val.length)); }
	  });
	  option("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200f\u2028\u2029\ufeff]/g, function (cm, val, old) {
	    cm.state.specialChars = new RegExp(val.source + (val.test("\t") ? "" : "|\t"), "g");
	    if (old != Init) { cm.refresh(); }
	  });
	  option("specialCharPlaceholder", defaultSpecialCharPlaceholder, function (cm) { return cm.refresh(); }, true);
	  option("electricChars", true);
	  option("inputStyle", mobile ? "contenteditable" : "textarea", function () {
	    throw new Error("inputStyle can not (yet) be changed in a running editor") // FIXME
	  }, true);
	  option("spellcheck", false, function (cm, val) { return cm.getInputField().spellcheck = val; }, true);
	  option("rtlMoveVisually", !windows);
	  option("wholeLineUpdateBefore", true);

	  option("theme", "default", function (cm) {
	    themeChanged(cm);
	    guttersChanged(cm);
	  }, true);
	  option("keyMap", "default", function (cm, val, old) {
	    var next = getKeyMap(val);
	    var prev = old != Init && getKeyMap(old);
	    if (prev && prev.detach) { prev.detach(cm, next); }
	    if (next.attach) { next.attach(cm, prev || null); }
	  });
	  option("extraKeys", null);
	  option("configureMouse", null);

	  option("lineWrapping", false, wrappingChanged, true);
	  option("gutters", [], function (cm) {
	    setGuttersForLineNumbers(cm.options);
	    guttersChanged(cm);
	  }, true);
	  option("fixedGutter", true, function (cm, val) {
	    cm.display.gutters.style.left = val ? compensateForHScroll(cm.display) + "px" : "0";
	    cm.refresh();
	  }, true);
	  option("coverGutterNextToScrollbar", false, function (cm) { return updateScrollbars(cm); }, true);
	  option("scrollbarStyle", "native", function (cm) {
	    initScrollbars(cm);
	    updateScrollbars(cm);
	    cm.display.scrollbars.setScrollTop(cm.doc.scrollTop);
	    cm.display.scrollbars.setScrollLeft(cm.doc.scrollLeft);
	  }, true);
	  option("lineNumbers", false, function (cm) {
	    setGuttersForLineNumbers(cm.options);
	    guttersChanged(cm);
	  }, true);
	  option("firstLineNumber", 1, guttersChanged, true);
	  option("lineNumberFormatter", function (integer) { return integer; }, guttersChanged, true);
	  option("showCursorWhenSelecting", false, updateSelection, true);

	  option("resetSelectionOnContextMenu", true);
	  option("lineWiseCopyCut", true);
	  option("pasteLinesPerSelection", true);

	  option("readOnly", false, function (cm, val) {
	    if (val == "nocursor") {
	      onBlur(cm);
	      cm.display.input.blur();
	    }
	    cm.display.input.readOnlyChanged(val);
	  });
	  option("disableInput", false, function (cm, val) {if (!val) { cm.display.input.reset(); }}, true);
	  option("dragDrop", true, dragDropChanged);
	  option("allowDropFileTypes", null);

	  option("cursorBlinkRate", 530);
	  option("cursorScrollMargin", 0);
	  option("cursorHeight", 1, updateSelection, true);
	  option("singleCursorHeightPerLine", true, updateSelection, true);
	  option("workTime", 100);
	  option("workDelay", 100);
	  option("flattenSpans", true, resetModeState, true);
	  option("addModeClass", false, resetModeState, true);
	  option("pollInterval", 100);
	  option("undoDepth", 200, function (cm, val) { return cm.doc.history.undoDepth = val; });
	  option("historyEventDelay", 1250);
	  option("viewportMargin", 10, function (cm) { return cm.refresh(); }, true);
	  option("maxHighlightLength", 10000, resetModeState, true);
	  option("moveInputWithCursor", true, function (cm, val) {
	    if (!val) { cm.display.input.resetPosition(); }
	  });

	  option("tabindex", null, function (cm, val) { return cm.display.input.getField().tabIndex = val || ""; });
	  option("autofocus", null);
	  option("direction", "ltr", function (cm, val) { return cm.doc.setDirection(val); }, true);
	}

	function guttersChanged(cm) {
	  updateGutters(cm);
	  regChange(cm);
	  alignHorizontally(cm);
	}

	function dragDropChanged(cm, value, old) {
	  var wasOn = old && old != Init;
	  if (!value != !wasOn) {
	    var funcs = cm.display.dragFunctions;
	    var toggle = value ? on : off;
	    toggle(cm.display.scroller, "dragstart", funcs.start);
	    toggle(cm.display.scroller, "dragenter", funcs.enter);
	    toggle(cm.display.scroller, "dragover", funcs.over);
	    toggle(cm.display.scroller, "dragleave", funcs.leave);
	    toggle(cm.display.scroller, "drop", funcs.drop);
	  }
	}

	function wrappingChanged(cm) {
	  if (cm.options.lineWrapping) {
	    addClass(cm.display.wrapper, "CodeMirror-wrap");
	    cm.display.sizer.style.minWidth = "";
	    cm.display.sizerWidth = null;
	  } else {
	    rmClass(cm.display.wrapper, "CodeMirror-wrap");
	    findMaxLine(cm);
	  }
	  estimateLineHeights(cm);
	  regChange(cm);
	  clearCaches(cm);
	  setTimeout(function () { return updateScrollbars(cm); }, 100);
	}

	// A CodeMirror instance represents an editor. This is the object
	// that user code is usually dealing with.

	function CodeMirror$1(place, options) {
	  var this$1 = this;

	  if (!(this instanceof CodeMirror$1)) { return new CodeMirror$1(place, options) }

	  this.options = options = options ? copyObj(options) : {};
	  // Determine effective options based on given values and defaults.
	  copyObj(defaults, options, false);
	  setGuttersForLineNumbers(options);

	  var doc = options.value;
	  if (typeof doc == "string") { doc = new Doc(doc, options.mode, null, options.lineSeparator, options.direction); }
	  this.doc = doc;

	  var input = new CodeMirror$1.inputStyles[options.inputStyle](this);
	  var display = this.display = new Display(place, doc, input);
	  display.wrapper.CodeMirror = this;
	  updateGutters(this);
	  themeChanged(this);
	  if (options.lineWrapping)
	    { this.display.wrapper.className += " CodeMirror-wrap"; }
	  initScrollbars(this);

	  this.state = {
	    keyMaps: [],  // stores maps added by addKeyMap
	    overlays: [], // highlighting overlays, as added by addOverlay
	    modeGen: 0,   // bumped when mode/overlay changes, used to invalidate highlighting info
	    overwrite: false,
	    delayingBlurEvent: false,
	    focused: false,
	    suppressEdits: false, // used to disable editing during key handlers when in readOnly mode
	    pasteIncoming: false, cutIncoming: false, // help recognize paste/cut edits in input.poll
	    selectingText: false,
	    draggingText: false,
	    highlight: new Delayed(), // stores highlight worker timeout
	    keySeq: null,  // Unfinished key sequence
	    specialChars: null
	  };

	  if (options.autofocus && !mobile) { display.input.focus(); }

	  // Override magic textarea content restore that IE sometimes does
	  // on our hidden textarea on reload
	  if (ie && ie_version < 11) { setTimeout(function () { return this$1.display.input.reset(true); }, 20); }

	  registerEventHandlers(this);
	  ensureGlobalHandlers();

	  startOperation(this);
	  this.curOp.forceUpdate = true;
	  attachDoc(this, doc);

	  if ((options.autofocus && !mobile) || this.hasFocus())
	    { setTimeout(bind(onFocus, this), 20); }
	  else
	    { onBlur(this); }

	  for (var opt in optionHandlers) { if (optionHandlers.hasOwnProperty(opt))
	    { optionHandlers[opt](this$1, options[opt], Init); } }
	  maybeUpdateLineNumberWidth(this);
	  if (options.finishInit) { options.finishInit(this); }
	  for (var i = 0; i < initHooks.length; ++i) { initHooks[i](this$1); }
	  endOperation(this);
	  // Suppress optimizelegibility in Webkit, since it breaks text
	  // measuring on line wrapping boundaries.
	  if (webkit && options.lineWrapping &&
	      getComputedStyle(display.lineDiv).textRendering == "optimizelegibility")
	    { display.lineDiv.style.textRendering = "auto"; }
	}

	// The default configuration options.
	CodeMirror$1.defaults = defaults;
	// Functions to run when options are changed.
	CodeMirror$1.optionHandlers = optionHandlers;

	// Attach the necessary event handlers when initializing the editor
	function registerEventHandlers(cm) {
	  var d = cm.display;
	  on(d.scroller, "mousedown", operation(cm, onMouseDown));
	  // Older IE's will not fire a second mousedown for a double click
	  if (ie && ie_version < 11)
	    { on(d.scroller, "dblclick", operation(cm, function (e) {
	      if (signalDOMEvent(cm, e)) { return }
	      var pos = posFromMouse(cm, e);
	      if (!pos || clickInGutter(cm, e) || eventInWidget(cm.display, e)) { return }
	      e_preventDefault(e);
	      var word = cm.findWordAt(pos);
	      extendSelection(cm.doc, word.anchor, word.head);
	    })); }
	  else
	    { on(d.scroller, "dblclick", function (e) { return signalDOMEvent(cm, e) || e_preventDefault(e); }); }
	  // Some browsers fire contextmenu *after* opening the menu, at
	  // which point we can't mess with it anymore. Context menu is
	  // handled in onMouseDown for these browsers.
	  if (!captureRightClick) { on(d.scroller, "contextmenu", function (e) { return onContextMenu(cm, e); }); }

	  // Used to suppress mouse event handling when a touch happens
	  var touchFinished, prevTouch = {end: 0};
	  function finishTouch() {
	    if (d.activeTouch) {
	      touchFinished = setTimeout(function () { return d.activeTouch = null; }, 1000);
	      prevTouch = d.activeTouch;
	      prevTouch.end = +new Date;
	    }
	  }
	  function isMouseLikeTouchEvent(e) {
	    if (e.touches.length != 1) { return false }
	    var touch = e.touches[0];
	    return touch.radiusX <= 1 && touch.radiusY <= 1
	  }
	  function farAway(touch, other) {
	    if (other.left == null) { return true }
	    var dx = other.left - touch.left, dy = other.top - touch.top;
	    return dx * dx + dy * dy > 20 * 20
	  }
	  on(d.scroller, "touchstart", function (e) {
	    if (!signalDOMEvent(cm, e) && !isMouseLikeTouchEvent(e) && !clickInGutter(cm, e)) {
	      d.input.ensurePolled();
	      clearTimeout(touchFinished);
	      var now = +new Date;
	      d.activeTouch = {start: now, moved: false,
	                       prev: now - prevTouch.end <= 300 ? prevTouch : null};
	      if (e.touches.length == 1) {
	        d.activeTouch.left = e.touches[0].pageX;
	        d.activeTouch.top = e.touches[0].pageY;
	      }
	    }
	  });
	  on(d.scroller, "touchmove", function () {
	    if (d.activeTouch) { d.activeTouch.moved = true; }
	  });
	  on(d.scroller, "touchend", function (e) {
	    var touch = d.activeTouch;
	    if (touch && !eventInWidget(d, e) && touch.left != null &&
	        !touch.moved && new Date - touch.start < 300) {
	      var pos = cm.coordsChar(d.activeTouch, "page"), range;
	      if (!touch.prev || farAway(touch, touch.prev)) // Single tap
	        { range = new Range(pos, pos); }
	      else if (!touch.prev.prev || farAway(touch, touch.prev.prev)) // Double tap
	        { range = cm.findWordAt(pos); }
	      else // Triple tap
	        { range = new Range(Pos(pos.line, 0), clipPos(cm.doc, Pos(pos.line + 1, 0))); }
	      cm.setSelection(range.anchor, range.head);
	      cm.focus();
	      e_preventDefault(e);
	    }
	    finishTouch();
	  });
	  on(d.scroller, "touchcancel", finishTouch);

	  // Sync scrolling between fake scrollbars and real scrollable
	  // area, ensure viewport is updated when scrolling.
	  on(d.scroller, "scroll", function () {
	    if (d.scroller.clientHeight) {
	      updateScrollTop(cm, d.scroller.scrollTop);
	      setScrollLeft(cm, d.scroller.scrollLeft, true);
	      signal(cm, "scroll", cm);
	    }
	  });

	  // Listen to wheel events in order to try and update the viewport on time.
	  on(d.scroller, "mousewheel", function (e) { return onScrollWheel(cm, e); });
	  on(d.scroller, "DOMMouseScroll", function (e) { return onScrollWheel(cm, e); });

	  // Prevent wrapper from ever scrolling
	  on(d.wrapper, "scroll", function () { return d.wrapper.scrollTop = d.wrapper.scrollLeft = 0; });

	  d.dragFunctions = {
	    enter: function (e) {if (!signalDOMEvent(cm, e)) { e_stop(e); }},
	    over: function (e) {if (!signalDOMEvent(cm, e)) { onDragOver(cm, e); e_stop(e); }},
	    start: function (e) { return onDragStart(cm, e); },
	    drop: operation(cm, onDrop),
	    leave: function (e) {if (!signalDOMEvent(cm, e)) { clearDragCursor(cm); }}
	  };

	  var inp = d.input.getField();
	  on(inp, "keyup", function (e) { return onKeyUp.call(cm, e); });
	  on(inp, "keydown", operation(cm, onKeyDown));
	  on(inp, "keypress", operation(cm, onKeyPress));
	  on(inp, "focus", function (e) { return onFocus(cm, e); });
	  on(inp, "blur", function (e) { return onBlur(cm, e); });
	}

	var initHooks = [];
	CodeMirror$1.defineInitHook = function (f) { return initHooks.push(f); };

	// Indent the given line. The how parameter can be "smart",
	// "add"/null, "subtract", or "prev". When aggressive is false
	// (typically set to true for forced single-line indents), empty
	// lines are not indented, and places where the mode returns Pass
	// are left alone.
	function indentLine(cm, n, how, aggressive) {
	  var doc = cm.doc, state;
	  if (how == null) { how = "add"; }
	  if (how == "smart") {
	    // Fall back to "prev" when the mode doesn't have an indentation
	    // method.
	    if (!doc.mode.indent) { how = "prev"; }
	    else { state = getContextBefore(cm, n).state; }
	  }

	  var tabSize = cm.options.tabSize;
	  var line = getLine(doc, n), curSpace = countColumn(line.text, null, tabSize);
	  if (line.stateAfter) { line.stateAfter = null; }
	  var curSpaceString = line.text.match(/^\s*/)[0], indentation;
	  if (!aggressive && !/\S/.test(line.text)) {
	    indentation = 0;
	    how = "not";
	  } else if (how == "smart") {
	    indentation = doc.mode.indent(state, line.text.slice(curSpaceString.length), line.text);
	    if (indentation == Pass || indentation > 150) {
	      if (!aggressive) { return }
	      how = "prev";
	    }
	  }
	  if (how == "prev") {
	    if (n > doc.first) { indentation = countColumn(getLine(doc, n-1).text, null, tabSize); }
	    else { indentation = 0; }
	  } else if (how == "add") {
	    indentation = curSpace + cm.options.indentUnit;
	  } else if (how == "subtract") {
	    indentation = curSpace - cm.options.indentUnit;
	  } else if (typeof how == "number") {
	    indentation = curSpace + how;
	  }
	  indentation = Math.max(0, indentation);

	  var indentString = "", pos = 0;
	  if (cm.options.indentWithTabs)
	    { for (var i = Math.floor(indentation / tabSize); i; --i) {pos += tabSize; indentString += "\t";} }
	  if (pos < indentation) { indentString += spaceStr(indentation - pos); }

	  if (indentString != curSpaceString) {
	    replaceRange(doc, indentString, Pos(n, 0), Pos(n, curSpaceString.length), "+input");
	    line.stateAfter = null;
	    return true
	  } else {
	    // Ensure that, if the cursor was in the whitespace at the start
	    // of the line, it is moved to the end of that space.
	    for (var i$1 = 0; i$1 < doc.sel.ranges.length; i$1++) {
	      var range = doc.sel.ranges[i$1];
	      if (range.head.line == n && range.head.ch < curSpaceString.length) {
	        var pos$1 = Pos(n, curSpaceString.length);
	        replaceOneSelection(doc, i$1, new Range(pos$1, pos$1));
	        break
	      }
	    }
	  }
	}

	// This will be set to a {lineWise: bool, text: [string]} object, so
	// that, when pasting, we know what kind of selections the copied
	// text was made out of.
	var lastCopied = null;

	function setLastCopied(newLastCopied) {
	  lastCopied = newLastCopied;
	}

	function applyTextInput(cm, inserted, deleted, sel, origin) {
	  var doc = cm.doc;
	  cm.display.shift = false;
	  if (!sel) { sel = doc.sel; }

	  var paste = cm.state.pasteIncoming || origin == "paste";
	  var textLines = splitLinesAuto(inserted), multiPaste = null;
	  // When pasing N lines into N selections, insert one line per selection
	  if (paste && sel.ranges.length > 1) {
	    if (lastCopied && lastCopied.text.join("\n") == inserted) {
	      if (sel.ranges.length % lastCopied.text.length == 0) {
	        multiPaste = [];
	        for (var i = 0; i < lastCopied.text.length; i++)
	          { multiPaste.push(doc.splitLines(lastCopied.text[i])); }
	      }
	    } else if (textLines.length == sel.ranges.length && cm.options.pasteLinesPerSelection) {
	      multiPaste = map(textLines, function (l) { return [l]; });
	    }
	  }

	  var updateInput;
	  // Normal behavior is to insert the new text into every selection
	  for (var i$1 = sel.ranges.length - 1; i$1 >= 0; i$1--) {
	    var range$$1 = sel.ranges[i$1];
	    var from = range$$1.from(), to = range$$1.to();
	    if (range$$1.empty()) {
	      if (deleted && deleted > 0) // Handle deletion
	        { from = Pos(from.line, from.ch - deleted); }
	      else if (cm.state.overwrite && !paste) // Handle overwrite
	        { to = Pos(to.line, Math.min(getLine(doc, to.line).text.length, to.ch + lst(textLines).length)); }
	      else if (lastCopied && lastCopied.lineWise && lastCopied.text.join("\n") == inserted)
	        { from = to = Pos(from.line, 0); }
	    }
	    updateInput = cm.curOp.updateInput;
	    var changeEvent = {from: from, to: to, text: multiPaste ? multiPaste[i$1 % multiPaste.length] : textLines,
	                       origin: origin || (paste ? "paste" : cm.state.cutIncoming ? "cut" : "+input")};
	    makeChange(cm.doc, changeEvent);
	    signalLater(cm, "inputRead", cm, changeEvent);
	  }
	  if (inserted && !paste)
	    { triggerElectric(cm, inserted); }

	  ensureCursorVisible(cm);
	  cm.curOp.updateInput = updateInput;
	  cm.curOp.typing = true;
	  cm.state.pasteIncoming = cm.state.cutIncoming = false;
	}

	function handlePaste(e, cm) {
	  var pasted = e.clipboardData && e.clipboardData.getData("Text");
	  if (pasted) {
	    e.preventDefault();
	    if (!cm.isReadOnly() && !cm.options.disableInput)
	      { runInOp(cm, function () { return applyTextInput(cm, pasted, 0, null, "paste"); }); }
	    return true
	  }
	}

	function triggerElectric(cm, inserted) {
	  // When an 'electric' character is inserted, immediately trigger a reindent
	  if (!cm.options.electricChars || !cm.options.smartIndent) { return }
	  var sel = cm.doc.sel;

	  for (var i = sel.ranges.length - 1; i >= 0; i--) {
	    var range$$1 = sel.ranges[i];
	    if (range$$1.head.ch > 100 || (i && sel.ranges[i - 1].head.line == range$$1.head.line)) { continue }
	    var mode = cm.getModeAt(range$$1.head);
	    var indented = false;
	    if (mode.electricChars) {
	      for (var j = 0; j < mode.electricChars.length; j++)
	        { if (inserted.indexOf(mode.electricChars.charAt(j)) > -1) {
	          indented = indentLine(cm, range$$1.head.line, "smart");
	          break
	        } }
	    } else if (mode.electricInput) {
	      if (mode.electricInput.test(getLine(cm.doc, range$$1.head.line).text.slice(0, range$$1.head.ch)))
	        { indented = indentLine(cm, range$$1.head.line, "smart"); }
	    }
	    if (indented) { signalLater(cm, "electricInput", cm, range$$1.head.line); }
	  }
	}

	function copyableRanges(cm) {
	  var text = [], ranges = [];
	  for (var i = 0; i < cm.doc.sel.ranges.length; i++) {
	    var line = cm.doc.sel.ranges[i].head.line;
	    var lineRange = {anchor: Pos(line, 0), head: Pos(line + 1, 0)};
	    ranges.push(lineRange);
	    text.push(cm.getRange(lineRange.anchor, lineRange.head));
	  }
	  return {text: text, ranges: ranges}
	}

	function disableBrowserMagic(field, spellcheck) {
	  field.setAttribute("autocorrect", "off");
	  field.setAttribute("autocapitalize", "off");
	  field.setAttribute("spellcheck", !!spellcheck);
	}

	function hiddenTextarea() {
	  var te = elt("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none");
	  var div = elt("div", [te], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
	  // The textarea is kept positioned near the cursor to prevent the
	  // fact that it'll be scrolled into view on input from scrolling
	  // our fake cursor out of view. On webkit, when wrap=off, paste is
	  // very slow. So make the area wide instead.
	  if (webkit) { te.style.width = "1000px"; }
	  else { te.setAttribute("wrap", "off"); }
	  // If border: 0; -- iOS fails to open keyboard (issue #1287)
	  if (ios) { te.style.border = "1px solid black"; }
	  disableBrowserMagic(te);
	  return div
	}

	// The publicly visible API. Note that methodOp(f) means
	// 'wrap f in an operation, performed on its `this` parameter'.

	// This is not the complete set of editor methods. Most of the
	// methods defined on the Doc type are also injected into
	// CodeMirror.prototype, for backwards compatibility and
	// convenience.

	var addEditorMethods = function(CodeMirror) {
	  var optionHandlers = CodeMirror.optionHandlers;

	  var helpers = CodeMirror.helpers = {};

	  CodeMirror.prototype = {
	    constructor: CodeMirror,
	    focus: function(){window.focus(); this.display.input.focus();},

	    setOption: function(option, value) {
	      var options = this.options, old = options[option];
	      if (options[option] == value && option != "mode") { return }
	      options[option] = value;
	      if (optionHandlers.hasOwnProperty(option))
	        { operation(this, optionHandlers[option])(this, value, old); }
	      signal(this, "optionChange", this, option);
	    },

	    getOption: function(option) {return this.options[option]},
	    getDoc: function() {return this.doc},

	    addKeyMap: function(map$$1, bottom) {
	      this.state.keyMaps[bottom ? "push" : "unshift"](getKeyMap(map$$1));
	    },
	    removeKeyMap: function(map$$1) {
	      var maps = this.state.keyMaps;
	      for (var i = 0; i < maps.length; ++i)
	        { if (maps[i] == map$$1 || maps[i].name == map$$1) {
	          maps.splice(i, 1);
	          return true
	        } }
	    },

	    addOverlay: methodOp(function(spec, options) {
	      var mode = spec.token ? spec : CodeMirror.getMode(this.options, spec);
	      if (mode.startState) { throw new Error("Overlays may not be stateful.") }
	      insertSorted(this.state.overlays,
	                   {mode: mode, modeSpec: spec, opaque: options && options.opaque,
	                    priority: (options && options.priority) || 0},
	                   function (overlay) { return overlay.priority; });
	      this.state.modeGen++;
	      regChange(this);
	    }),
	    removeOverlay: methodOp(function(spec) {
	      var this$1 = this;

	      var overlays = this.state.overlays;
	      for (var i = 0; i < overlays.length; ++i) {
	        var cur = overlays[i].modeSpec;
	        if (cur == spec || typeof spec == "string" && cur.name == spec) {
	          overlays.splice(i, 1);
	          this$1.state.modeGen++;
	          regChange(this$1);
	          return
	        }
	      }
	    }),

	    indentLine: methodOp(function(n, dir, aggressive) {
	      if (typeof dir != "string" && typeof dir != "number") {
	        if (dir == null) { dir = this.options.smartIndent ? "smart" : "prev"; }
	        else { dir = dir ? "add" : "subtract"; }
	      }
	      if (isLine(this.doc, n)) { indentLine(this, n, dir, aggressive); }
	    }),
	    indentSelection: methodOp(function(how) {
	      var this$1 = this;

	      var ranges = this.doc.sel.ranges, end = -1;
	      for (var i = 0; i < ranges.length; i++) {
	        var range$$1 = ranges[i];
	        if (!range$$1.empty()) {
	          var from = range$$1.from(), to = range$$1.to();
	          var start = Math.max(end, from.line);
	          end = Math.min(this$1.lastLine(), to.line - (to.ch ? 0 : 1)) + 1;
	          for (var j = start; j < end; ++j)
	            { indentLine(this$1, j, how); }
	          var newRanges = this$1.doc.sel.ranges;
	          if (from.ch == 0 && ranges.length == newRanges.length && newRanges[i].from().ch > 0)
	            { replaceOneSelection(this$1.doc, i, new Range(from, newRanges[i].to()), sel_dontScroll); }
	        } else if (range$$1.head.line > end) {
	          indentLine(this$1, range$$1.head.line, how, true);
	          end = range$$1.head.line;
	          if (i == this$1.doc.sel.primIndex) { ensureCursorVisible(this$1); }
	        }
	      }
	    }),

	    // Fetch the parser token for a given character. Useful for hacks
	    // that want to inspect the mode state (say, for completion).
	    getTokenAt: function(pos, precise) {
	      return takeToken(this, pos, precise)
	    },

	    getLineTokens: function(line, precise) {
	      return takeToken(this, Pos(line), precise, true)
	    },

	    getTokenTypeAt: function(pos) {
	      pos = clipPos(this.doc, pos);
	      var styles = getLineStyles(this, getLine(this.doc, pos.line));
	      var before = 0, after = (styles.length - 1) / 2, ch = pos.ch;
	      var type;
	      if (ch == 0) { type = styles[2]; }
	      else { for (;;) {
	        var mid = (before + after) >> 1;
	        if ((mid ? styles[mid * 2 - 1] : 0) >= ch) { after = mid; }
	        else if (styles[mid * 2 + 1] < ch) { before = mid + 1; }
	        else { type = styles[mid * 2 + 2]; break }
	      } }
	      var cut = type ? type.indexOf("overlay ") : -1;
	      return cut < 0 ? type : cut == 0 ? null : type.slice(0, cut - 1)
	    },

	    getModeAt: function(pos) {
	      var mode = this.doc.mode;
	      if (!mode.innerMode) { return mode }
	      return CodeMirror.innerMode(mode, this.getTokenAt(pos).state).mode
	    },

	    getHelper: function(pos, type) {
	      return this.getHelpers(pos, type)[0]
	    },

	    getHelpers: function(pos, type) {
	      var this$1 = this;

	      var found = [];
	      if (!helpers.hasOwnProperty(type)) { return found }
	      var help = helpers[type], mode = this.getModeAt(pos);
	      if (typeof mode[type] == "string") {
	        if (help[mode[type]]) { found.push(help[mode[type]]); }
	      } else if (mode[type]) {
	        for (var i = 0; i < mode[type].length; i++) {
	          var val = help[mode[type][i]];
	          if (val) { found.push(val); }
	        }
	      } else if (mode.helperType && help[mode.helperType]) {
	        found.push(help[mode.helperType]);
	      } else if (help[mode.name]) {
	        found.push(help[mode.name]);
	      }
	      for (var i$1 = 0; i$1 < help._global.length; i$1++) {
	        var cur = help._global[i$1];
	        if (cur.pred(mode, this$1) && indexOf(found, cur.val) == -1)
	          { found.push(cur.val); }
	      }
	      return found
	    },

	    getStateAfter: function(line, precise) {
	      var doc = this.doc;
	      line = clipLine(doc, line == null ? doc.first + doc.size - 1: line);
	      return getContextBefore(this, line + 1, precise).state
	    },

	    cursorCoords: function(start, mode) {
	      var pos, range$$1 = this.doc.sel.primary();
	      if (start == null) { pos = range$$1.head; }
	      else if (typeof start == "object") { pos = clipPos(this.doc, start); }
	      else { pos = start ? range$$1.from() : range$$1.to(); }
	      return cursorCoords(this, pos, mode || "page")
	    },

	    charCoords: function(pos, mode) {
	      return charCoords(this, clipPos(this.doc, pos), mode || "page")
	    },

	    coordsChar: function(coords, mode) {
	      coords = fromCoordSystem(this, coords, mode || "page");
	      return coordsChar(this, coords.left, coords.top)
	    },

	    lineAtHeight: function(height, mode) {
	      height = fromCoordSystem(this, {top: height, left: 0}, mode || "page").top;
	      return lineAtHeight(this.doc, height + this.display.viewOffset)
	    },
	    heightAtLine: function(line, mode, includeWidgets) {
	      var end = false, lineObj;
	      if (typeof line == "number") {
	        var last = this.doc.first + this.doc.size - 1;
	        if (line < this.doc.first) { line = this.doc.first; }
	        else if (line > last) { line = last; end = true; }
	        lineObj = getLine(this.doc, line);
	      } else {
	        lineObj = line;
	      }
	      return intoCoordSystem(this, lineObj, {top: 0, left: 0}, mode || "page", includeWidgets || end).top +
	        (end ? this.doc.height - heightAtLine(lineObj) : 0)
	    },

	    defaultTextHeight: function() { return textHeight(this.display) },
	    defaultCharWidth: function() { return charWidth(this.display) },

	    getViewport: function() { return {from: this.display.viewFrom, to: this.display.viewTo}},

	    addWidget: function(pos, node, scroll, vert, horiz) {
	      var display = this.display;
	      pos = cursorCoords(this, clipPos(this.doc, pos));
	      var top = pos.bottom, left = pos.left;
	      node.style.position = "absolute";
	      node.setAttribute("cm-ignore-events", "true");
	      this.display.input.setUneditable(node);
	      display.sizer.appendChild(node);
	      if (vert == "over") {
	        top = pos.top;
	      } else if (vert == "above" || vert == "near") {
	        var vspace = Math.max(display.wrapper.clientHeight, this.doc.height),
	        hspace = Math.max(display.sizer.clientWidth, display.lineSpace.clientWidth);
	        // Default to positioning above (if specified and possible); otherwise default to positioning below
	        if ((vert == 'above' || pos.bottom + node.offsetHeight > vspace) && pos.top > node.offsetHeight)
	          { top = pos.top - node.offsetHeight; }
	        else if (pos.bottom + node.offsetHeight <= vspace)
	          { top = pos.bottom; }
	        if (left + node.offsetWidth > hspace)
	          { left = hspace - node.offsetWidth; }
	      }
	      node.style.top = top + "px";
	      node.style.left = node.style.right = "";
	      if (horiz == "right") {
	        left = display.sizer.clientWidth - node.offsetWidth;
	        node.style.right = "0px";
	      } else {
	        if (horiz == "left") { left = 0; }
	        else if (horiz == "middle") { left = (display.sizer.clientWidth - node.offsetWidth) / 2; }
	        node.style.left = left + "px";
	      }
	      if (scroll)
	        { scrollIntoView(this, {left: left, top: top, right: left + node.offsetWidth, bottom: top + node.offsetHeight}); }
	    },

	    triggerOnKeyDown: methodOp(onKeyDown),
	    triggerOnKeyPress: methodOp(onKeyPress),
	    triggerOnKeyUp: onKeyUp,
	    triggerOnMouseDown: methodOp(onMouseDown),

	    execCommand: function(cmd) {
	      if (commands.hasOwnProperty(cmd))
	        { return commands[cmd].call(null, this) }
	    },

	    triggerElectric: methodOp(function(text) { triggerElectric(this, text); }),

	    findPosH: function(from, amount, unit, visually) {
	      var this$1 = this;

	      var dir = 1;
	      if (amount < 0) { dir = -1; amount = -amount; }
	      var cur = clipPos(this.doc, from);
	      for (var i = 0; i < amount; ++i) {
	        cur = findPosH(this$1.doc, cur, dir, unit, visually);
	        if (cur.hitSide) { break }
	      }
	      return cur
	    },

	    moveH: methodOp(function(dir, unit) {
	      var this$1 = this;

	      this.extendSelectionsBy(function (range$$1) {
	        if (this$1.display.shift || this$1.doc.extend || range$$1.empty())
	          { return findPosH(this$1.doc, range$$1.head, dir, unit, this$1.options.rtlMoveVisually) }
	        else
	          { return dir < 0 ? range$$1.from() : range$$1.to() }
	      }, sel_move);
	    }),

	    deleteH: methodOp(function(dir, unit) {
	      var sel = this.doc.sel, doc = this.doc;
	      if (sel.somethingSelected())
	        { doc.replaceSelection("", null, "+delete"); }
	      else
	        { deleteNearSelection(this, function (range$$1) {
	          var other = findPosH(doc, range$$1.head, dir, unit, false);
	          return dir < 0 ? {from: other, to: range$$1.head} : {from: range$$1.head, to: other}
	        }); }
	    }),

	    findPosV: function(from, amount, unit, goalColumn) {
	      var this$1 = this;

	      var dir = 1, x = goalColumn;
	      if (amount < 0) { dir = -1; amount = -amount; }
	      var cur = clipPos(this.doc, from);
	      for (var i = 0; i < amount; ++i) {
	        var coords = cursorCoords(this$1, cur, "div");
	        if (x == null) { x = coords.left; }
	        else { coords.left = x; }
	        cur = findPosV(this$1, coords, dir, unit);
	        if (cur.hitSide) { break }
	      }
	      return cur
	    },

	    moveV: methodOp(function(dir, unit) {
	      var this$1 = this;

	      var doc = this.doc, goals = [];
	      var collapse = !this.display.shift && !doc.extend && doc.sel.somethingSelected();
	      doc.extendSelectionsBy(function (range$$1) {
	        if (collapse)
	          { return dir < 0 ? range$$1.from() : range$$1.to() }
	        var headPos = cursorCoords(this$1, range$$1.head, "div");
	        if (range$$1.goalColumn != null) { headPos.left = range$$1.goalColumn; }
	        goals.push(headPos.left);
	        var pos = findPosV(this$1, headPos, dir, unit);
	        if (unit == "page" && range$$1 == doc.sel.primary())
	          { addToScrollTop(this$1, charCoords(this$1, pos, "div").top - headPos.top); }
	        return pos
	      }, sel_move);
	      if (goals.length) { for (var i = 0; i < doc.sel.ranges.length; i++)
	        { doc.sel.ranges[i].goalColumn = goals[i]; } }
	    }),

	    // Find the word at the given position (as returned by coordsChar).
	    findWordAt: function(pos) {
	      var doc = this.doc, line = getLine(doc, pos.line).text;
	      var start = pos.ch, end = pos.ch;
	      if (line) {
	        var helper = this.getHelper(pos, "wordChars");
	        if ((pos.sticky == "before" || end == line.length) && start) { --start; } else { ++end; }
	        var startChar = line.charAt(start);
	        var check = isWordChar(startChar, helper)
	          ? function (ch) { return isWordChar(ch, helper); }
	          : /\s/.test(startChar) ? function (ch) { return /\s/.test(ch); }
	          : function (ch) { return (!/\s/.test(ch) && !isWordChar(ch)); };
	        while (start > 0 && check(line.charAt(start - 1))) { --start; }
	        while (end < line.length && check(line.charAt(end))) { ++end; }
	      }
	      return new Range(Pos(pos.line, start), Pos(pos.line, end))
	    },

	    toggleOverwrite: function(value) {
	      if (value != null && value == this.state.overwrite) { return }
	      if (this.state.overwrite = !this.state.overwrite)
	        { addClass(this.display.cursorDiv, "CodeMirror-overwrite"); }
	      else
	        { rmClass(this.display.cursorDiv, "CodeMirror-overwrite"); }

	      signal(this, "overwriteToggle", this, this.state.overwrite);
	    },
	    hasFocus: function() { return this.display.input.getField() == activeElt() },
	    isReadOnly: function() { return !!(this.options.readOnly || this.doc.cantEdit) },

	    scrollTo: methodOp(function (x, y) { scrollToCoords(this, x, y); }),
	    getScrollInfo: function() {
	      var scroller = this.display.scroller;
	      return {left: scroller.scrollLeft, top: scroller.scrollTop,
	              height: scroller.scrollHeight - scrollGap(this) - this.display.barHeight,
	              width: scroller.scrollWidth - scrollGap(this) - this.display.barWidth,
	              clientHeight: displayHeight(this), clientWidth: displayWidth(this)}
	    },

	    scrollIntoView: methodOp(function(range$$1, margin) {
	      if (range$$1 == null) {
	        range$$1 = {from: this.doc.sel.primary().head, to: null};
	        if (margin == null) { margin = this.options.cursorScrollMargin; }
	      } else if (typeof range$$1 == "number") {
	        range$$1 = {from: Pos(range$$1, 0), to: null};
	      } else if (range$$1.from == null) {
	        range$$1 = {from: range$$1, to: null};
	      }
	      if (!range$$1.to) { range$$1.to = range$$1.from; }
	      range$$1.margin = margin || 0;

	      if (range$$1.from.line != null) {
	        scrollToRange(this, range$$1);
	      } else {
	        scrollToCoordsRange(this, range$$1.from, range$$1.to, range$$1.margin);
	      }
	    }),

	    setSize: methodOp(function(width, height) {
	      var this$1 = this;

	      var interpret = function (val) { return typeof val == "number" || /^\d+$/.test(String(val)) ? val + "px" : val; };
	      if (width != null) { this.display.wrapper.style.width = interpret(width); }
	      if (height != null) { this.display.wrapper.style.height = interpret(height); }
	      if (this.options.lineWrapping) { clearLineMeasurementCache(this); }
	      var lineNo$$1 = this.display.viewFrom;
	      this.doc.iter(lineNo$$1, this.display.viewTo, function (line) {
	        if (line.widgets) { for (var i = 0; i < line.widgets.length; i++)
	          { if (line.widgets[i].noHScroll) { regLineChange(this$1, lineNo$$1, "widget"); break } } }
	        ++lineNo$$1;
	      });
	      this.curOp.forceUpdate = true;
	      signal(this, "refresh", this);
	    }),

	    operation: function(f){return runInOp(this, f)},
	    startOperation: function(){return startOperation(this)},
	    endOperation: function(){return endOperation(this)},

	    refresh: methodOp(function() {
	      var oldHeight = this.display.cachedTextHeight;
	      regChange(this);
	      this.curOp.forceUpdate = true;
	      clearCaches(this);
	      scrollToCoords(this, this.doc.scrollLeft, this.doc.scrollTop);
	      updateGutterSpace(this);
	      if (oldHeight == null || Math.abs(oldHeight - textHeight(this.display)) > .5)
	        { estimateLineHeights(this); }
	      signal(this, "refresh", this);
	    }),

	    swapDoc: methodOp(function(doc) {
	      var old = this.doc;
	      old.cm = null;
	      attachDoc(this, doc);
	      clearCaches(this);
	      this.display.input.reset();
	      scrollToCoords(this, doc.scrollLeft, doc.scrollTop);
	      this.curOp.forceScroll = true;
	      signalLater(this, "swapDoc", this, old);
	      return old
	    }),

	    getInputField: function(){return this.display.input.getField()},
	    getWrapperElement: function(){return this.display.wrapper},
	    getScrollerElement: function(){return this.display.scroller},
	    getGutterElement: function(){return this.display.gutters}
	  };
	  eventMixin(CodeMirror);

	  CodeMirror.registerHelper = function(type, name, value) {
	    if (!helpers.hasOwnProperty(type)) { helpers[type] = CodeMirror[type] = {_global: []}; }
	    helpers[type][name] = value;
	  };
	  CodeMirror.registerGlobalHelper = function(type, name, predicate, value) {
	    CodeMirror.registerHelper(type, name, value);
	    helpers[type]._global.push({pred: predicate, val: value});
	  };
	};

	// Used for horizontal relative motion. Dir is -1 or 1 (left or
	// right), unit can be "char", "column" (like char, but doesn't
	// cross line boundaries), "word" (across next word), or "group" (to
	// the start of next group of word or non-word-non-whitespace
	// chars). The visually param controls whether, in right-to-left
	// text, direction 1 means to move towards the next index in the
	// string, or towards the character to the right of the current
	// position. The resulting position will have a hitSide=true
	// property if it reached the end of the document.
	function findPosH(doc, pos, dir, unit, visually) {
	  var oldPos = pos;
	  var origDir = dir;
	  var lineObj = getLine(doc, pos.line);
	  function findNextLine() {
	    var l = pos.line + dir;
	    if (l < doc.first || l >= doc.first + doc.size) { return false }
	    pos = new Pos(l, pos.ch, pos.sticky);
	    return lineObj = getLine(doc, l)
	  }
	  function moveOnce(boundToLine) {
	    var next;
	    if (visually) {
	      next = moveVisually(doc.cm, lineObj, pos, dir);
	    } else {
	      next = moveLogically(lineObj, pos, dir);
	    }
	    if (next == null) {
	      if (!boundToLine && findNextLine())
	        { pos = endOfLine(visually, doc.cm, lineObj, pos.line, dir); }
	      else
	        { return false }
	    } else {
	      pos = next;
	    }
	    return true
	  }

	  if (unit == "char") {
	    moveOnce();
	  } else if (unit == "column") {
	    moveOnce(true);
	  } else if (unit == "word" || unit == "group") {
	    var sawType = null, group = unit == "group";
	    var helper = doc.cm && doc.cm.getHelper(pos, "wordChars");
	    for (var first = true;; first = false) {
	      if (dir < 0 && !moveOnce(!first)) { break }
	      var cur = lineObj.text.charAt(pos.ch) || "\n";
	      var type = isWordChar(cur, helper) ? "w"
	        : group && cur == "\n" ? "n"
	        : !group || /\s/.test(cur) ? null
	        : "p";
	      if (group && !first && !type) { type = "s"; }
	      if (sawType && sawType != type) {
	        if (dir < 0) {dir = 1; moveOnce(); pos.sticky = "after";}
	        break
	      }

	      if (type) { sawType = type; }
	      if (dir > 0 && !moveOnce(!first)) { break }
	    }
	  }
	  var result = skipAtomic(doc, pos, oldPos, origDir, true);
	  if (equalCursorPos(oldPos, result)) { result.hitSide = true; }
	  return result
	}

	// For relative vertical movement. Dir may be -1 or 1. Unit can be
	// "page" or "line". The resulting position will have a hitSide=true
	// property if it reached the end of the document.
	function findPosV(cm, pos, dir, unit) {
	  var doc = cm.doc, x = pos.left, y;
	  if (unit == "page") {
	    var pageSize = Math.min(cm.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
	    var moveAmount = Math.max(pageSize - .5 * textHeight(cm.display), 3);
	    y = (dir > 0 ? pos.bottom : pos.top) + dir * moveAmount;

	  } else if (unit == "line") {
	    y = dir > 0 ? pos.bottom + 3 : pos.top - 3;
	  }
	  var target;
	  for (;;) {
	    target = coordsChar(cm, x, y);
	    if (!target.outside) { break }
	    if (dir < 0 ? y <= 0 : y >= doc.height) { target.hitSide = true; break }
	    y += dir * 5;
	  }
	  return target
	}

	// CONTENTEDITABLE INPUT STYLE

	var ContentEditableInput = function(cm) {
	  this.cm = cm;
	  this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null;
	  this.polling = new Delayed();
	  this.composing = null;
	  this.gracePeriod = false;
	  this.readDOMTimeout = null;
	};

	ContentEditableInput.prototype.init = function (display) {
	    var this$1 = this;

	  var input = this, cm = input.cm;
	  var div = input.div = display.lineDiv;
	  disableBrowserMagic(div, cm.options.spellcheck);

	  on(div, "paste", function (e) {
	    if (signalDOMEvent(cm, e) || handlePaste(e, cm)) { return }
	    // IE doesn't fire input events, so we schedule a read for the pasted content in this way
	    if (ie_version <= 11) { setTimeout(operation(cm, function () { return this$1.updateFromDOM(); }), 20); }
	  });

	  on(div, "compositionstart", function (e) {
	    this$1.composing = {data: e.data, done: false};
	  });
	  on(div, "compositionupdate", function (e) {
	    if (!this$1.composing) { this$1.composing = {data: e.data, done: false}; }
	  });
	  on(div, "compositionend", function (e) {
	    if (this$1.composing) {
	      if (e.data != this$1.composing.data) { this$1.readFromDOMSoon(); }
	      this$1.composing.done = true;
	    }
	  });

	  on(div, "touchstart", function () { return input.forceCompositionEnd(); });

	  on(div, "input", function () {
	    if (!this$1.composing) { this$1.readFromDOMSoon(); }
	  });

	  function onCopyCut(e) {
	    if (signalDOMEvent(cm, e)) { return }
	    if (cm.somethingSelected()) {
	      setLastCopied({lineWise: false, text: cm.getSelections()});
	      if (e.type == "cut") { cm.replaceSelection("", null, "cut"); }
	    } else if (!cm.options.lineWiseCopyCut) {
	      return
	    } else {
	      var ranges = copyableRanges(cm);
	      setLastCopied({lineWise: true, text: ranges.text});
	      if (e.type == "cut") {
	        cm.operation(function () {
	          cm.setSelections(ranges.ranges, 0, sel_dontScroll);
	          cm.replaceSelection("", null, "cut");
	        });
	      }
	    }
	    if (e.clipboardData) {
	      e.clipboardData.clearData();
	      var content = lastCopied.text.join("\n");
	      // iOS exposes the clipboard API, but seems to discard content inserted into it
	      e.clipboardData.setData("Text", content);
	      if (e.clipboardData.getData("Text") == content) {
	        e.preventDefault();
	        return
	      }
	    }
	    // Old-fashioned briefly-focus-a-textarea hack
	    var kludge = hiddenTextarea(), te = kludge.firstChild;
	    cm.display.lineSpace.insertBefore(kludge, cm.display.lineSpace.firstChild);
	    te.value = lastCopied.text.join("\n");
	    var hadFocus = document.activeElement;
	    selectInput(te);
	    setTimeout(function () {
	      cm.display.lineSpace.removeChild(kludge);
	      hadFocus.focus();
	      if (hadFocus == div) { input.showPrimarySelection(); }
	    }, 50);
	  }
	  on(div, "copy", onCopyCut);
	  on(div, "cut", onCopyCut);
	};

	ContentEditableInput.prototype.prepareSelection = function () {
	  var result = prepareSelection(this.cm, false);
	  result.focus = this.cm.state.focused;
	  return result
	};

	ContentEditableInput.prototype.showSelection = function (info, takeFocus) {
	  if (!info || !this.cm.display.view.length) { return }
	  if (info.focus || takeFocus) { this.showPrimarySelection(); }
	  this.showMultipleSelections(info);
	};

	ContentEditableInput.prototype.showPrimarySelection = function () {
	  var sel = window.getSelection(), cm = this.cm, prim = cm.doc.sel.primary();
	  var from = prim.from(), to = prim.to();

	  if (cm.display.viewTo == cm.display.viewFrom || from.line >= cm.display.viewTo || to.line < cm.display.viewFrom) {
	    sel.removeAllRanges();
	    return
	  }

	  var curAnchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
	  var curFocus = domToPos(cm, sel.focusNode, sel.focusOffset);
	  if (curAnchor && !curAnchor.bad && curFocus && !curFocus.bad &&
	      cmp(minPos(curAnchor, curFocus), from) == 0 &&
	      cmp(maxPos(curAnchor, curFocus), to) == 0)
	    { return }

	  var view = cm.display.view;
	  var start = (from.line >= cm.display.viewFrom && posToDOM(cm, from)) ||
	      {node: view[0].measure.map[2], offset: 0};
	  var end = to.line < cm.display.viewTo && posToDOM(cm, to);
	  if (!end) {
	    var measure = view[view.length - 1].measure;
	    var map$$1 = measure.maps ? measure.maps[measure.maps.length - 1] : measure.map;
	    end = {node: map$$1[map$$1.length - 1], offset: map$$1[map$$1.length - 2] - map$$1[map$$1.length - 3]};
	  }

	  if (!start || !end) {
	    sel.removeAllRanges();
	    return
	  }

	  var old = sel.rangeCount && sel.getRangeAt(0), rng;
	  try { rng = range(start.node, start.offset, end.offset, end.node); }
	  catch(e) {} // Our model of the DOM might be outdated, in which case the range we try to set can be impossible
	  if (rng) {
	    if (!gecko && cm.state.focused) {
	      sel.collapse(start.node, start.offset);
	      if (!rng.collapsed) {
	        sel.removeAllRanges();
	        sel.addRange(rng);
	      }
	    } else {
	      sel.removeAllRanges();
	      sel.addRange(rng);
	    }
	    if (old && sel.anchorNode == null) { sel.addRange(old); }
	    else if (gecko) { this.startGracePeriod(); }
	  }
	  this.rememberSelection();
	};

	ContentEditableInput.prototype.startGracePeriod = function () {
	    var this$1 = this;

	  clearTimeout(this.gracePeriod);
	  this.gracePeriod = setTimeout(function () {
	    this$1.gracePeriod = false;
	    if (this$1.selectionChanged())
	      { this$1.cm.operation(function () { return this$1.cm.curOp.selectionChanged = true; }); }
	  }, 20);
	};

	ContentEditableInput.prototype.showMultipleSelections = function (info) {
	  removeChildrenAndAdd(this.cm.display.cursorDiv, info.cursors);
	  removeChildrenAndAdd(this.cm.display.selectionDiv, info.selection);
	};

	ContentEditableInput.prototype.rememberSelection = function () {
	  var sel = window.getSelection();
	  this.lastAnchorNode = sel.anchorNode; this.lastAnchorOffset = sel.anchorOffset;
	  this.lastFocusNode = sel.focusNode; this.lastFocusOffset = sel.focusOffset;
	};

	ContentEditableInput.prototype.selectionInEditor = function () {
	  var sel = window.getSelection();
	  if (!sel.rangeCount) { return false }
	  var node = sel.getRangeAt(0).commonAncestorContainer;
	  return contains(this.div, node)
	};

	ContentEditableInput.prototype.focus = function () {
	  if (this.cm.options.readOnly != "nocursor") {
	    if (!this.selectionInEditor())
	      { this.showSelection(this.prepareSelection(), true); }
	    this.div.focus();
	  }
	};
	ContentEditableInput.prototype.blur = function () { this.div.blur(); };
	ContentEditableInput.prototype.getField = function () { return this.div };

	ContentEditableInput.prototype.supportsTouch = function () { return true };

	ContentEditableInput.prototype.receivedFocus = function () {
	  var input = this;
	  if (this.selectionInEditor())
	    { this.pollSelection(); }
	  else
	    { runInOp(this.cm, function () { return input.cm.curOp.selectionChanged = true; }); }

	  function poll() {
	    if (input.cm.state.focused) {
	      input.pollSelection();
	      input.polling.set(input.cm.options.pollInterval, poll);
	    }
	  }
	  this.polling.set(this.cm.options.pollInterval, poll);
	};

	ContentEditableInput.prototype.selectionChanged = function () {
	  var sel = window.getSelection();
	  return sel.anchorNode != this.lastAnchorNode || sel.anchorOffset != this.lastAnchorOffset ||
	    sel.focusNode != this.lastFocusNode || sel.focusOffset != this.lastFocusOffset
	};

	ContentEditableInput.prototype.pollSelection = function () {
	  if (this.readDOMTimeout != null || this.gracePeriod || !this.selectionChanged()) { return }
	  var sel = window.getSelection(), cm = this.cm;
	  // On Android Chrome (version 56, at least), backspacing into an
	  // uneditable block element will put the cursor in that element,
	  // and then, because it's not editable, hide the virtual keyboard.
	  // Because Android doesn't allow us to actually detect backspace
	  // presses in a sane way, this code checks for when that happens
	  // and simulates a backspace press in this case.
	  if (android && chrome && this.cm.options.gutters.length && isInGutter(sel.anchorNode)) {
	    this.cm.triggerOnKeyDown({type: "keydown", keyCode: 8, preventDefault: Math.abs});
	    this.blur();
	    this.focus();
	    return
	  }
	  if (this.composing) { return }
	  this.rememberSelection();
	  var anchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
	  var head = domToPos(cm, sel.focusNode, sel.focusOffset);
	  if (anchor && head) { runInOp(cm, function () {
	    setSelection(cm.doc, simpleSelection(anchor, head), sel_dontScroll);
	    if (anchor.bad || head.bad) { cm.curOp.selectionChanged = true; }
	  }); }
	};

	ContentEditableInput.prototype.pollContent = function () {
	  if (this.readDOMTimeout != null) {
	    clearTimeout(this.readDOMTimeout);
	    this.readDOMTimeout = null;
	  }

	  var cm = this.cm, display = cm.display, sel = cm.doc.sel.primary();
	  var from = sel.from(), to = sel.to();
	  if (from.ch == 0 && from.line > cm.firstLine())
	    { from = Pos(from.line - 1, getLine(cm.doc, from.line - 1).length); }
	  if (to.ch == getLine(cm.doc, to.line).text.length && to.line < cm.lastLine())
	    { to = Pos(to.line + 1, 0); }
	  if (from.line < display.viewFrom || to.line > display.viewTo - 1) { return false }

	  var fromIndex, fromLine, fromNode;
	  if (from.line == display.viewFrom || (fromIndex = findViewIndex(cm, from.line)) == 0) {
	    fromLine = lineNo(display.view[0].line);
	    fromNode = display.view[0].node;
	  } else {
	    fromLine = lineNo(display.view[fromIndex].line);
	    fromNode = display.view[fromIndex - 1].node.nextSibling;
	  }
	  var toIndex = findViewIndex(cm, to.line);
	  var toLine, toNode;
	  if (toIndex == display.view.length - 1) {
	    toLine = display.viewTo - 1;
	    toNode = display.lineDiv.lastChild;
	  } else {
	    toLine = lineNo(display.view[toIndex + 1].line) - 1;
	    toNode = display.view[toIndex + 1].node.previousSibling;
	  }

	  if (!fromNode) { return false }
	  var newText = cm.doc.splitLines(domTextBetween(cm, fromNode, toNode, fromLine, toLine));
	  var oldText = getBetween(cm.doc, Pos(fromLine, 0), Pos(toLine, getLine(cm.doc, toLine).text.length));
	  while (newText.length > 1 && oldText.length > 1) {
	    if (lst(newText) == lst(oldText)) { newText.pop(); oldText.pop(); toLine--; }
	    else if (newText[0] == oldText[0]) { newText.shift(); oldText.shift(); fromLine++; }
	    else { break }
	  }

	  var cutFront = 0, cutEnd = 0;
	  var newTop = newText[0], oldTop = oldText[0], maxCutFront = Math.min(newTop.length, oldTop.length);
	  while (cutFront < maxCutFront && newTop.charCodeAt(cutFront) == oldTop.charCodeAt(cutFront))
	    { ++cutFront; }
	  var newBot = lst(newText), oldBot = lst(oldText);
	  var maxCutEnd = Math.min(newBot.length - (newText.length == 1 ? cutFront : 0),
	                           oldBot.length - (oldText.length == 1 ? cutFront : 0));
	  while (cutEnd < maxCutEnd &&
	         newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1))
	    { ++cutEnd; }
	  // Try to move start of change to start of selection if ambiguous
	  if (newText.length == 1 && oldText.length == 1 && fromLine == from.line) {
	    while (cutFront && cutFront > from.ch &&
	           newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1)) {
	      cutFront--;
	      cutEnd++;
	    }
	  }

	  newText[newText.length - 1] = newBot.slice(0, newBot.length - cutEnd).replace(/^\u200b+/, "");
	  newText[0] = newText[0].slice(cutFront).replace(/\u200b+$/, "");

	  var chFrom = Pos(fromLine, cutFront);
	  var chTo = Pos(toLine, oldText.length ? lst(oldText).length - cutEnd : 0);
	  if (newText.length > 1 || newText[0] || cmp(chFrom, chTo)) {
	    replaceRange(cm.doc, newText, chFrom, chTo, "+input");
	    return true
	  }
	};

	ContentEditableInput.prototype.ensurePolled = function () {
	  this.forceCompositionEnd();
	};
	ContentEditableInput.prototype.reset = function () {
	  this.forceCompositionEnd();
	};
	ContentEditableInput.prototype.forceCompositionEnd = function () {
	  if (!this.composing) { return }
	  clearTimeout(this.readDOMTimeout);
	  this.composing = null;
	  this.updateFromDOM();
	  this.div.blur();
	  this.div.focus();
	};
	ContentEditableInput.prototype.readFromDOMSoon = function () {
	    var this$1 = this;

	  if (this.readDOMTimeout != null) { return }
	  this.readDOMTimeout = setTimeout(function () {
	    this$1.readDOMTimeout = null;
	    if (this$1.composing) {
	      if (this$1.composing.done) { this$1.composing = null; }
	      else { return }
	    }
	    this$1.updateFromDOM();
	  }, 80);
	};

	ContentEditableInput.prototype.updateFromDOM = function () {
	    var this$1 = this;

	  if (this.cm.isReadOnly() || !this.pollContent())
	    { runInOp(this.cm, function () { return regChange(this$1.cm); }); }
	};

	ContentEditableInput.prototype.setUneditable = function (node) {
	  node.contentEditable = "false";
	};

	ContentEditableInput.prototype.onKeyPress = function (e) {
	  if (e.charCode == 0) { return }
	  e.preventDefault();
	  if (!this.cm.isReadOnly())
	    { operation(this.cm, applyTextInput)(this.cm, String.fromCharCode(e.charCode == null ? e.keyCode : e.charCode), 0); }
	};

	ContentEditableInput.prototype.readOnlyChanged = function (val) {
	  this.div.contentEditable = String(val != "nocursor");
	};

	ContentEditableInput.prototype.onContextMenu = function () {};
	ContentEditableInput.prototype.resetPosition = function () {};

	ContentEditableInput.prototype.needsContentAttribute = true;

	function posToDOM(cm, pos) {
	  var view = findViewForLine(cm, pos.line);
	  if (!view || view.hidden) { return null }
	  var line = getLine(cm.doc, pos.line);
	  var info = mapFromLineView(view, line, pos.line);

	  var order = getOrder(line, cm.doc.direction), side = "left";
	  if (order) {
	    var partPos = getBidiPartAt(order, pos.ch);
	    side = partPos % 2 ? "right" : "left";
	  }
	  var result = nodeAndOffsetInLineMap(info.map, pos.ch, side);
	  result.offset = result.collapse == "right" ? result.end : result.start;
	  return result
	}

	function isInGutter(node) {
	  for (var scan = node; scan; scan = scan.parentNode)
	    { if (/CodeMirror-gutter-wrapper/.test(scan.className)) { return true } }
	  return false
	}

	function badPos(pos, bad) { if (bad) { pos.bad = true; } return pos }

	function domTextBetween(cm, from, to, fromLine, toLine) {
	  var text = "", closing = false, lineSep = cm.doc.lineSeparator();
	  function recognizeMarker(id) { return function (marker) { return marker.id == id; } }
	  function close() {
	    if (closing) {
	      text += lineSep;
	      closing = false;
	    }
	  }
	  function addText(str) {
	    if (str) {
	      close();
	      text += str;
	    }
	  }
	  function walk(node) {
	    if (node.nodeType == 1) {
	      var cmText = node.getAttribute("cm-text");
	      if (cmText != null) {
	        addText(cmText || node.textContent.replace(/\u200b/g, ""));
	        return
	      }
	      var markerID = node.getAttribute("cm-marker"), range$$1;
	      if (markerID) {
	        var found = cm.findMarks(Pos(fromLine, 0), Pos(toLine + 1, 0), recognizeMarker(+markerID));
	        if (found.length && (range$$1 = found[0].find(0)))
	          { addText(getBetween(cm.doc, range$$1.from, range$$1.to).join(lineSep)); }
	        return
	      }
	      if (node.getAttribute("contenteditable") == "false") { return }
	      var isBlock = /^(pre|div|p)$/i.test(node.nodeName);
	      if (isBlock) { close(); }
	      for (var i = 0; i < node.childNodes.length; i++)
	        { walk(node.childNodes[i]); }
	      if (isBlock) { closing = true; }
	    } else if (node.nodeType == 3) {
	      addText(node.nodeValue);
	    }
	  }
	  for (;;) {
	    walk(from);
	    if (from == to) { break }
	    from = from.nextSibling;
	  }
	  return text
	}

	function domToPos(cm, node, offset) {
	  var lineNode;
	  if (node == cm.display.lineDiv) {
	    lineNode = cm.display.lineDiv.childNodes[offset];
	    if (!lineNode) { return badPos(cm.clipPos(Pos(cm.display.viewTo - 1)), true) }
	    node = null; offset = 0;
	  } else {
	    for (lineNode = node;; lineNode = lineNode.parentNode) {
	      if (!lineNode || lineNode == cm.display.lineDiv) { return null }
	      if (lineNode.parentNode && lineNode.parentNode == cm.display.lineDiv) { break }
	    }
	  }
	  for (var i = 0; i < cm.display.view.length; i++) {
	    var lineView = cm.display.view[i];
	    if (lineView.node == lineNode)
	      { return locateNodeInLineView(lineView, node, offset) }
	  }
	}

	function locateNodeInLineView(lineView, node, offset) {
	  var wrapper = lineView.text.firstChild, bad = false;
	  if (!node || !contains(wrapper, node)) { return badPos(Pos(lineNo(lineView.line), 0), true) }
	  if (node == wrapper) {
	    bad = true;
	    node = wrapper.childNodes[offset];
	    offset = 0;
	    if (!node) {
	      var line = lineView.rest ? lst(lineView.rest) : lineView.line;
	      return badPos(Pos(lineNo(line), line.text.length), bad)
	    }
	  }

	  var textNode = node.nodeType == 3 ? node : null, topNode = node;
	  if (!textNode && node.childNodes.length == 1 && node.firstChild.nodeType == 3) {
	    textNode = node.firstChild;
	    if (offset) { offset = textNode.nodeValue.length; }
	  }
	  while (topNode.parentNode != wrapper) { topNode = topNode.parentNode; }
	  var measure = lineView.measure, maps = measure.maps;

	  function find(textNode, topNode, offset) {
	    for (var i = -1; i < (maps ? maps.length : 0); i++) {
	      var map$$1 = i < 0 ? measure.map : maps[i];
	      for (var j = 0; j < map$$1.length; j += 3) {
	        var curNode = map$$1[j + 2];
	        if (curNode == textNode || curNode == topNode) {
	          var line = lineNo(i < 0 ? lineView.line : lineView.rest[i]);
	          var ch = map$$1[j] + offset;
	          if (offset < 0 || curNode != textNode) { ch = map$$1[j + (offset ? 1 : 0)]; }
	          return Pos(line, ch)
	        }
	      }
	    }
	  }
	  var found = find(textNode, topNode, offset);
	  if (found) { return badPos(found, bad) }

	  // FIXME this is all really shaky. might handle the few cases it needs to handle, but likely to cause problems
	  for (var after = topNode.nextSibling, dist = textNode ? textNode.nodeValue.length - offset : 0; after; after = after.nextSibling) {
	    found = find(after, after.firstChild, 0);
	    if (found)
	      { return badPos(Pos(found.line, found.ch - dist), bad) }
	    else
	      { dist += after.textContent.length; }
	  }
	  for (var before = topNode.previousSibling, dist$1 = offset; before; before = before.previousSibling) {
	    found = find(before, before.firstChild, -1);
	    if (found)
	      { return badPos(Pos(found.line, found.ch + dist$1), bad) }
	    else
	      { dist$1 += before.textContent.length; }
	  }
	}

	// TEXTAREA INPUT STYLE

	var TextareaInput = function(cm) {
	  this.cm = cm;
	  // See input.poll and input.reset
	  this.prevInput = "";

	  // Flag that indicates whether we expect input to appear real soon
	  // now (after some event like 'keypress' or 'input') and are
	  // polling intensively.
	  this.pollingFast = false;
	  // Self-resetting timeout for the poller
	  this.polling = new Delayed();
	  // Used to work around IE issue with selection being forgotten when focus moves away from textarea
	  this.hasSelection = false;
	  this.composing = null;
	};

	TextareaInput.prototype.init = function (display) {
	    var this$1 = this;

	  var input = this, cm = this.cm;

	  // Wraps and hides input textarea
	  var div = this.wrapper = hiddenTextarea();
	  // The semihidden textarea that is focused when the editor is
	  // focused, and receives input.
	  var te = this.textarea = div.firstChild;
	  display.wrapper.insertBefore(div, display.wrapper.firstChild);

	  // Needed to hide big blue blinking cursor on Mobile Safari (doesn't seem to work in iOS 8 anymore)
	  if (ios) { te.style.width = "0px"; }

	  on(te, "input", function () {
	    if (ie && ie_version >= 9 && this$1.hasSelection) { this$1.hasSelection = null; }
	    input.poll();
	  });

	  on(te, "paste", function (e) {
	    if (signalDOMEvent(cm, e) || handlePaste(e, cm)) { return }

	    cm.state.pasteIncoming = true;
	    input.fastPoll();
	  });

	  function prepareCopyCut(e) {
	    if (signalDOMEvent(cm, e)) { return }
	    if (cm.somethingSelected()) {
	      setLastCopied({lineWise: false, text: cm.getSelections()});
	    } else if (!cm.options.lineWiseCopyCut) {
	      return
	    } else {
	      var ranges = copyableRanges(cm);
	      setLastCopied({lineWise: true, text: ranges.text});
	      if (e.type == "cut") {
	        cm.setSelections(ranges.ranges, null, sel_dontScroll);
	      } else {
	        input.prevInput = "";
	        te.value = ranges.text.join("\n");
	        selectInput(te);
	      }
	    }
	    if (e.type == "cut") { cm.state.cutIncoming = true; }
	  }
	  on(te, "cut", prepareCopyCut);
	  on(te, "copy", prepareCopyCut);

	  on(display.scroller, "paste", function (e) {
	    if (eventInWidget(display, e) || signalDOMEvent(cm, e)) { return }
	    cm.state.pasteIncoming = true;
	    input.focus();
	  });

	  // Prevent normal selection in the editor (we handle our own)
	  on(display.lineSpace, "selectstart", function (e) {
	    if (!eventInWidget(display, e)) { e_preventDefault(e); }
	  });

	  on(te, "compositionstart", function () {
	    var start = cm.getCursor("from");
	    if (input.composing) { input.composing.range.clear(); }
	    input.composing = {
	      start: start,
	      range: cm.markText(start, cm.getCursor("to"), {className: "CodeMirror-composing"})
	    };
	  });
	  on(te, "compositionend", function () {
	    if (input.composing) {
	      input.poll();
	      input.composing.range.clear();
	      input.composing = null;
	    }
	  });
	};

	TextareaInput.prototype.prepareSelection = function () {
	  // Redraw the selection and/or cursor
	  var cm = this.cm, display = cm.display, doc = cm.doc;
	  var result = prepareSelection(cm);

	  // Move the hidden textarea near the cursor to prevent scrolling artifacts
	  if (cm.options.moveInputWithCursor) {
	    var headPos = cursorCoords(cm, doc.sel.primary().head, "div");
	    var wrapOff = display.wrapper.getBoundingClientRect(), lineOff = display.lineDiv.getBoundingClientRect();
	    result.teTop = Math.max(0, Math.min(display.wrapper.clientHeight - 10,
	                                        headPos.top + lineOff.top - wrapOff.top));
	    result.teLeft = Math.max(0, Math.min(display.wrapper.clientWidth - 10,
	                                         headPos.left + lineOff.left - wrapOff.left));
	  }

	  return result
	};

	TextareaInput.prototype.showSelection = function (drawn) {
	  var cm = this.cm, display = cm.display;
	  removeChildrenAndAdd(display.cursorDiv, drawn.cursors);
	  removeChildrenAndAdd(display.selectionDiv, drawn.selection);
	  if (drawn.teTop != null) {
	    this.wrapper.style.top = drawn.teTop + "px";
	    this.wrapper.style.left = drawn.teLeft + "px";
	  }
	};

	// Reset the input to correspond to the selection (or to be empty,
	// when not typing and nothing is selected)
	TextareaInput.prototype.reset = function (typing) {
	  if (this.contextMenuPending || this.composing) { return }
	  var cm = this.cm;
	  if (cm.somethingSelected()) {
	    this.prevInput = "";
	    var content = cm.getSelection();
	    this.textarea.value = content;
	    if (cm.state.focused) { selectInput(this.textarea); }
	    if (ie && ie_version >= 9) { this.hasSelection = content; }
	  } else if (!typing) {
	    this.prevInput = this.textarea.value = "";
	    if (ie && ie_version >= 9) { this.hasSelection = null; }
	  }
	};

	TextareaInput.prototype.getField = function () { return this.textarea };

	TextareaInput.prototype.supportsTouch = function () { return false };

	TextareaInput.prototype.focus = function () {
	  if (this.cm.options.readOnly != "nocursor" && (!mobile || activeElt() != this.textarea)) {
	    try { this.textarea.focus(); }
	    catch (e) {} // IE8 will throw if the textarea is display: none or not in DOM
	  }
	};

	TextareaInput.prototype.blur = function () { this.textarea.blur(); };

	TextareaInput.prototype.resetPosition = function () {
	  this.wrapper.style.top = this.wrapper.style.left = 0;
	};

	TextareaInput.prototype.receivedFocus = function () { this.slowPoll(); };

	// Poll for input changes, using the normal rate of polling. This
	// runs as long as the editor is focused.
	TextareaInput.prototype.slowPoll = function () {
	    var this$1 = this;

	  if (this.pollingFast) { return }
	  this.polling.set(this.cm.options.pollInterval, function () {
	    this$1.poll();
	    if (this$1.cm.state.focused) { this$1.slowPoll(); }
	  });
	};

	// When an event has just come in that is likely to add or change
	// something in the input textarea, we poll faster, to ensure that
	// the change appears on the screen quickly.
	TextareaInput.prototype.fastPoll = function () {
	  var missed = false, input = this;
	  input.pollingFast = true;
	  function p() {
	    var changed = input.poll();
	    if (!changed && !missed) {missed = true; input.polling.set(60, p);}
	    else {input.pollingFast = false; input.slowPoll();}
	  }
	  input.polling.set(20, p);
	};

	// Read input from the textarea, and update the document to match.
	// When something is selected, it is present in the textarea, and
	// selected (unless it is huge, in which case a placeholder is
	// used). When nothing is selected, the cursor sits after previously
	// seen text (can be empty), which is stored in prevInput (we must
	// not reset the textarea when typing, because that breaks IME).
	TextareaInput.prototype.poll = function () {
	    var this$1 = this;

	  var cm = this.cm, input = this.textarea, prevInput = this.prevInput;
	  // Since this is called a *lot*, try to bail out as cheaply as
	  // possible when it is clear that nothing happened. hasSelection
	  // will be the case when there is a lot of text in the textarea,
	  // in which case reading its value would be expensive.
	  if (this.contextMenuPending || !cm.state.focused ||
	      (hasSelection(input) && !prevInput && !this.composing) ||
	      cm.isReadOnly() || cm.options.disableInput || cm.state.keySeq)
	    { return false }

	  var text = input.value;
	  // If nothing changed, bail.
	  if (text == prevInput && !cm.somethingSelected()) { return false }
	  // Work around nonsensical selection resetting in IE9/10, and
	  // inexplicable appearance of private area unicode characters on
	  // some key combos in Mac (#2689).
	  if (ie && ie_version >= 9 && this.hasSelection === text ||
	      mac && /[\uf700-\uf7ff]/.test(text)) {
	    cm.display.input.reset();
	    return false
	  }

	  if (cm.doc.sel == cm.display.selForContextMenu) {
	    var first = text.charCodeAt(0);
	    if (first == 0x200b && !prevInput) { prevInput = "\u200b"; }
	    if (first == 0x21da) { this.reset(); return this.cm.execCommand("undo") }
	  }
	  // Find the part of the input that is actually new
	  var same = 0, l = Math.min(prevInput.length, text.length);
	  while (same < l && prevInput.charCodeAt(same) == text.charCodeAt(same)) { ++same; }

	  runInOp(cm, function () {
	    applyTextInput(cm, text.slice(same), prevInput.length - same,
	                   null, this$1.composing ? "*compose" : null);

	    // Don't leave long text in the textarea, since it makes further polling slow
	    if (text.length > 1000 || text.indexOf("\n") > -1) { input.value = this$1.prevInput = ""; }
	    else { this$1.prevInput = text; }

	    if (this$1.composing) {
	      this$1.composing.range.clear();
	      this$1.composing.range = cm.markText(this$1.composing.start, cm.getCursor("to"),
	                                         {className: "CodeMirror-composing"});
	    }
	  });
	  return true
	};

	TextareaInput.prototype.ensurePolled = function () {
	  if (this.pollingFast && this.poll()) { this.pollingFast = false; }
	};

	TextareaInput.prototype.onKeyPress = function () {
	  if (ie && ie_version >= 9) { this.hasSelection = null; }
	  this.fastPoll();
	};

	TextareaInput.prototype.onContextMenu = function (e) {
	  var input = this, cm = input.cm, display = cm.display, te = input.textarea;
	  var pos = posFromMouse(cm, e), scrollPos = display.scroller.scrollTop;
	  if (!pos || presto) { return } // Opera is difficult.

	  // Reset the current text selection only if the click is done outside of the selection
	  // and 'resetSelectionOnContextMenu' option is true.
	  var reset = cm.options.resetSelectionOnContextMenu;
	  if (reset && cm.doc.sel.contains(pos) == -1)
	    { operation(cm, setSelection)(cm.doc, simpleSelection(pos), sel_dontScroll); }

	  var oldCSS = te.style.cssText, oldWrapperCSS = input.wrapper.style.cssText;
	  input.wrapper.style.cssText = "position: absolute";
	  var wrapperBox = input.wrapper.getBoundingClientRect();
	  te.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e.clientY - wrapperBox.top - 5) + "px; left: " + (e.clientX - wrapperBox.left - 5) + "px;\n      z-index: 1000; background: " + (ie ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
	  var oldScrollY;
	  if (webkit) { oldScrollY = window.scrollY; } // Work around Chrome issue (#2712)
	  display.input.focus();
	  if (webkit) { window.scrollTo(null, oldScrollY); }
	  display.input.reset();
	  // Adds "Select all" to context menu in FF
	  if (!cm.somethingSelected()) { te.value = input.prevInput = " "; }
	  input.contextMenuPending = true;
	  display.selForContextMenu = cm.doc.sel;
	  clearTimeout(display.detectingSelectAll);

	  // Select-all will be greyed out if there's nothing to select, so
	  // this adds a zero-width space so that we can later check whether
	  // it got selected.
	  function prepareSelectAllHack() {
	    if (te.selectionStart != null) {
	      var selected = cm.somethingSelected();
	      var extval = "\u200b" + (selected ? te.value : "");
	      te.value = "\u21da"; // Used to catch context-menu undo
	      te.value = extval;
	      input.prevInput = selected ? "" : "\u200b";
	      te.selectionStart = 1; te.selectionEnd = extval.length;
	      // Re-set this, in case some other handler touched the
	      // selection in the meantime.
	      display.selForContextMenu = cm.doc.sel;
	    }
	  }
	  function rehide() {
	    input.contextMenuPending = false;
	    input.wrapper.style.cssText = oldWrapperCSS;
	    te.style.cssText = oldCSS;
	    if (ie && ie_version < 9) { display.scrollbars.setScrollTop(display.scroller.scrollTop = scrollPos); }

	    // Try to detect the user choosing select-all
	    if (te.selectionStart != null) {
	      if (!ie || (ie && ie_version < 9)) { prepareSelectAllHack(); }
	      var i = 0, poll = function () {
	        if (display.selForContextMenu == cm.doc.sel && te.selectionStart == 0 &&
	            te.selectionEnd > 0 && input.prevInput == "\u200b") {
	          operation(cm, selectAll)(cm);
	        } else if (i++ < 10) {
	          display.detectingSelectAll = setTimeout(poll, 500);
	        } else {
	          display.selForContextMenu = null;
	          display.input.reset();
	        }
	      };
	      display.detectingSelectAll = setTimeout(poll, 200);
	    }
	  }

	  if (ie && ie_version >= 9) { prepareSelectAllHack(); }
	  if (captureRightClick) {
	    e_stop(e);
	    var mouseup = function () {
	      off(window, "mouseup", mouseup);
	      setTimeout(rehide, 20);
	    };
	    on(window, "mouseup", mouseup);
	  } else {
	    setTimeout(rehide, 50);
	  }
	};

	TextareaInput.prototype.readOnlyChanged = function (val) {
	  if (!val) { this.reset(); }
	  this.textarea.disabled = val == "nocursor";
	};

	TextareaInput.prototype.setUneditable = function () {};

	TextareaInput.prototype.needsContentAttribute = false;

	function fromTextArea(textarea, options) {
	  options = options ? copyObj(options) : {};
	  options.value = textarea.value;
	  if (!options.tabindex && textarea.tabIndex)
	    { options.tabindex = textarea.tabIndex; }
	  if (!options.placeholder && textarea.placeholder)
	    { options.placeholder = textarea.placeholder; }
	  // Set autofocus to true if this textarea is focused, or if it has
	  // autofocus and no other element is focused.
	  if (options.autofocus == null) {
	    var hasFocus = activeElt();
	    options.autofocus = hasFocus == textarea ||
	      textarea.getAttribute("autofocus") != null && hasFocus == document.body;
	  }

	  function save() {textarea.value = cm.getValue();}

	  var realSubmit;
	  if (textarea.form) {
	    on(textarea.form, "submit", save);
	    // Deplorable hack to make the submit method do the right thing.
	    if (!options.leaveSubmitMethodAlone) {
	      var form = textarea.form;
	      realSubmit = form.submit;
	      try {
	        var wrappedSubmit = form.submit = function () {
	          save();
	          form.submit = realSubmit;
	          form.submit();
	          form.submit = wrappedSubmit;
	        };
	      } catch(e) {}
	    }
	  }

	  options.finishInit = function (cm) {
	    cm.save = save;
	    cm.getTextArea = function () { return textarea; };
	    cm.toTextArea = function () {
	      cm.toTextArea = isNaN; // Prevent this from being ran twice
	      save();
	      textarea.parentNode.removeChild(cm.getWrapperElement());
	      textarea.style.display = "";
	      if (textarea.form) {
	        off(textarea.form, "submit", save);
	        if (typeof textarea.form.submit == "function")
	          { textarea.form.submit = realSubmit; }
	      }
	    };
	  };

	  textarea.style.display = "none";
	  var cm = CodeMirror$1(function (node) { return textarea.parentNode.insertBefore(node, textarea.nextSibling); },
	    options);
	  return cm
	}

	function addLegacyProps(CodeMirror) {
	  CodeMirror.off = off;
	  CodeMirror.on = on;
	  CodeMirror.wheelEventPixels = wheelEventPixels;
	  CodeMirror.Doc = Doc;
	  CodeMirror.splitLines = splitLinesAuto;
	  CodeMirror.countColumn = countColumn;
	  CodeMirror.findColumn = findColumn;
	  CodeMirror.isWordChar = isWordCharBasic;
	  CodeMirror.Pass = Pass;
	  CodeMirror.signal = signal;
	  CodeMirror.Line = Line;
	  CodeMirror.changeEnd = changeEnd;
	  CodeMirror.scrollbarModel = scrollbarModel;
	  CodeMirror.Pos = Pos;
	  CodeMirror.cmpPos = cmp;
	  CodeMirror.modes = modes;
	  CodeMirror.mimeModes = mimeModes;
	  CodeMirror.resolveMode = resolveMode;
	  CodeMirror.getMode = getMode;
	  CodeMirror.modeExtensions = modeExtensions;
	  CodeMirror.extendMode = extendMode;
	  CodeMirror.copyState = copyState;
	  CodeMirror.startState = startState;
	  CodeMirror.innerMode = innerMode;
	  CodeMirror.commands = commands;
	  CodeMirror.keyMap = keyMap;
	  CodeMirror.keyName = keyName;
	  CodeMirror.isModifierKey = isModifierKey;
	  CodeMirror.lookupKey = lookupKey;
	  CodeMirror.normalizeKeyMap = normalizeKeyMap;
	  CodeMirror.StringStream = StringStream;
	  CodeMirror.SharedTextMarker = SharedTextMarker;
	  CodeMirror.TextMarker = TextMarker;
	  CodeMirror.LineWidget = LineWidget;
	  CodeMirror.e_preventDefault = e_preventDefault;
	  CodeMirror.e_stopPropagation = e_stopPropagation;
	  CodeMirror.e_stop = e_stop;
	  CodeMirror.addClass = addClass;
	  CodeMirror.contains = contains;
	  CodeMirror.rmClass = rmClass;
	  CodeMirror.keyNames = keyNames;
	}

	// EDITOR CONSTRUCTOR

	defineOptions(CodeMirror$1);

	addEditorMethods(CodeMirror$1);

	// Set up methods on CodeMirror's prototype to redirect to the editor's document.
	var dontDelegate = "iter insert remove copy getEditor constructor".split(" ");
	for (var prop in Doc.prototype) { if (Doc.prototype.hasOwnProperty(prop) && indexOf(dontDelegate, prop) < 0)
	  { CodeMirror$1.prototype[prop] = (function(method) {
	    return function() {return method.apply(this.doc, arguments)}
	  })(Doc.prototype[prop]); } }

	eventMixin(Doc);

	// INPUT HANDLING

	CodeMirror$1.inputStyles = {"textarea": TextareaInput, "contenteditable": ContentEditableInput};

	// MODE DEFINITION AND QUERYING

	// Extra arguments are stored as the mode's dependencies, which is
	// used by (legacy) mechanisms like loadmode.js to automatically
	// load a mode. (Preferred mechanism is the require/define calls.)
	CodeMirror$1.defineMode = function(name/*, mode, …*/) {
	  if (!CodeMirror$1.defaults.mode && name != "null") { CodeMirror$1.defaults.mode = name; }
	  defineMode.apply(this, arguments);
	};

	CodeMirror$1.defineMIME = defineMIME;

	// Minimal default mode.
	CodeMirror$1.defineMode("null", function () { return ({token: function (stream) { return stream.skipToEnd(); }}); });
	CodeMirror$1.defineMIME("text/plain", "null");

	// EXTENSIONS

	CodeMirror$1.defineExtension = function (name, func) {
	  CodeMirror$1.prototype[name] = func;
	};
	CodeMirror$1.defineDocExtension = function (name, func) {
	  Doc.prototype[name] = func;
	};

	CodeMirror$1.fromTextArea = fromTextArea;

	addLegacyProps(CodeMirror$1);

	CodeMirror$1.version = "5.31.0";

	return CodeMirror$1;

	})));


/***/ }),
/* 96 */
/***/ (function(module, exports) {

	module.exports = function(arr, obj){
	  if (arr.indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(14);
	var core = __webpack_require__(4);
	var fails = __webpack_require__(16);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
	};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isCssAnimationSupported = undefined;

	var _typeof2 = __webpack_require__(27);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _Event = __webpack_require__(125);

	var _Event2 = _interopRequireDefault(_Event);

	var _componentClasses = __webpack_require__(119);

	var _componentClasses2 = _interopRequireDefault(_componentClasses);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var isCssAnimationSupported = _Event2['default'].endEvents.length !== 0;
	var capitalPrefixes = ['Webkit', 'Moz', 'O',
	// ms is special .... !
	'ms'];
	var prefixes = ['-webkit-', '-moz-', '-o-', 'ms-', ''];

	function getStyleProperty(node, name) {
	  // old ff need null, https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
	  var style = window.getComputedStyle(node, null);
	  var ret = '';
	  for (var i = 0; i < prefixes.length; i++) {
	    ret = style.getPropertyValue(prefixes[i] + name);
	    if (ret) {
	      break;
	    }
	  }
	  return ret;
	}

	function fixBrowserByTimeout(node) {
	  if (isCssAnimationSupported) {
	    var transitionDelay = parseFloat(getStyleProperty(node, 'transition-delay')) || 0;
	    var transitionDuration = parseFloat(getStyleProperty(node, 'transition-duration')) || 0;
	    var animationDelay = parseFloat(getStyleProperty(node, 'animation-delay')) || 0;
	    var animationDuration = parseFloat(getStyleProperty(node, 'animation-duration')) || 0;
	    var time = Math.max(transitionDuration + transitionDelay, animationDuration + animationDelay);
	    // sometimes, browser bug
	    node.rcEndAnimTimeout = setTimeout(function () {
	      node.rcEndAnimTimeout = null;
	      if (node.rcEndListener) {
	        node.rcEndListener();
	      }
	    }, time * 1000 + 200);
	  }
	}

	function clearBrowserBugTimeout(node) {
	  if (node.rcEndAnimTimeout) {
	    clearTimeout(node.rcEndAnimTimeout);
	    node.rcEndAnimTimeout = null;
	  }
	}

	var cssAnimation = function cssAnimation(node, transitionName, endCallback) {
	  var nameIsObj = (typeof transitionName === 'undefined' ? 'undefined' : (0, _typeof3['default'])(transitionName)) === 'object';
	  var className = nameIsObj ? transitionName.name : transitionName;
	  var activeClassName = nameIsObj ? transitionName.active : transitionName + '-active';
	  var end = endCallback;
	  var start = void 0;
	  var active = void 0;
	  var nodeClasses = (0, _componentClasses2['default'])(node);

	  if (endCallback && Object.prototype.toString.call(endCallback) === '[object Object]') {
	    end = endCallback.end;
	    start = endCallback.start;
	    active = endCallback.active;
	  }

	  if (node.rcEndListener) {
	    node.rcEndListener();
	  }

	  node.rcEndListener = function (e) {
	    if (e && e.target !== node) {
	      return;
	    }

	    if (node.rcAnimTimeout) {
	      clearTimeout(node.rcAnimTimeout);
	      node.rcAnimTimeout = null;
	    }

	    clearBrowserBugTimeout(node);

	    nodeClasses.remove(className);
	    nodeClasses.remove(activeClassName);

	    _Event2['default'].removeEndEventListener(node, node.rcEndListener);
	    node.rcEndListener = null;

	    // Usually this optional end is used for informing an owner of
	    // a leave animation and telling it to remove the child.
	    if (end) {
	      end();
	    }
	  };

	  _Event2['default'].addEndEventListener(node, node.rcEndListener);

	  if (start) {
	    start();
	  }
	  nodeClasses.add(className);

	  node.rcAnimTimeout = setTimeout(function () {
	    node.rcAnimTimeout = null;
	    nodeClasses.add(activeClassName);
	    if (active) {
	      setTimeout(active, 0);
	    }
	    fixBrowserByTimeout(node);
	    // 30ms for firefox
	  }, 30);

	  return {
	    stop: function stop() {
	      if (node.rcEndListener) {
	        node.rcEndListener();
	      }
	    }
	  };
	};

	cssAnimation.style = function (node, style, callback) {
	  if (node.rcEndListener) {
	    node.rcEndListener();
	  }

	  node.rcEndListener = function (e) {
	    if (e && e.target !== node) {
	      return;
	    }

	    if (node.rcAnimTimeout) {
	      clearTimeout(node.rcAnimTimeout);
	      node.rcAnimTimeout = null;
	    }

	    clearBrowserBugTimeout(node);

	    _Event2['default'].removeEndEventListener(node, node.rcEndListener);
	    node.rcEndListener = null;

	    // Usually this optional callback is used for informing an owner of
	    // a leave animation and telling it to remove the child.
	    if (callback) {
	      callback();
	    }
	  };

	  _Event2['default'].addEndEventListener(node, node.rcEndListener);

	  node.rcAnimTimeout = setTimeout(function () {
	    for (var s in style) {
	      if (style.hasOwnProperty(s)) {
	        node.style[s] = style[s];
	      }
	    }
	    node.rcAnimTimeout = null;
	    fixBrowserByTimeout(node);
	  }, 0);
	};

	cssAnimation.setTransition = function (node, p, value) {
	  var property = p;
	  var v = value;
	  if (value === undefined) {
	    v = property;
	    property = '';
	  }
	  property = property || '';
	  capitalPrefixes.forEach(function (prefix) {
	    node.style[prefix + 'Transition' + property] = v;
	  });
	};

	cssAnimation.isCssAnimationSupported = isCssAnimationSupported;

	exports.isCssAnimationSupported = isCssAnimationSupported;
	exports['default'] = cssAnimation;

/***/ }),
/* 99 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 100 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	var _defineProperty2 = __webpack_require__(23);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _classCallCheck2 = __webpack_require__(7);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(25);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(12);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(11);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(21);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _ChildrenUtils = __webpack_require__(131);

	var _AnimateChild = __webpack_require__(130);

	var _AnimateChild2 = _interopRequireDefault(_AnimateChild);

	var _util = __webpack_require__(102);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var defaultKey = 'rc_animate_' + Date.now();


	function getChildrenFromProps(props) {
	  var children = props.children;
	  if (_react2['default'].isValidElement(children)) {
	    if (!children.key) {
	      return _react2['default'].cloneElement(children, {
	        key: defaultKey
	      });
	    }
	  }
	  return children;
	}

	function noop() {}

	var Animate = function (_React$Component) {
	  (0, _inherits3['default'])(Animate, _React$Component);

	  function Animate(props) {
	    (0, _classCallCheck3['default'])(this, Animate);

	    var _this = (0, _possibleConstructorReturn3['default'])(this, (Animate.__proto__ || Object.getPrototypeOf(Animate)).call(this, props));

	    _initialiseProps.call(_this);

	    _this.currentlyAnimatingKeys = {};
	    _this.keysToEnter = [];
	    _this.keysToLeave = [];

	    _this.state = {
	      children: (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(_this.props))
	    };

	    _this.childrenRefs = {};
	    return _this;
	  }

	  (0, _createClass3['default'])(Animate, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      var showProp = this.props.showProp;
	      var children = this.state.children;
	      if (showProp) {
	        children = children.filter(function (child) {
	          return !!child.props[showProp];
	        });
	      }
	      children.forEach(function (child) {
	        if (child) {
	          _this2.performAppear(child.key);
	        }
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var _this3 = this;

	      this.nextProps = nextProps;
	      var nextChildren = (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(nextProps));
	      var props = this.props;
	      // exclusive needs immediate response
	      if (props.exclusive) {
	        Object.keys(this.currentlyAnimatingKeys).forEach(function (key) {
	          _this3.stop(key);
	        });
	      }
	      var showProp = props.showProp;
	      var currentlyAnimatingKeys = this.currentlyAnimatingKeys;
	      // last props children if exclusive
	      var currentChildren = props.exclusive ? (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(props)) : this.state.children;
	      // in case destroy in showProp mode
	      var newChildren = [];
	      if (showProp) {
	        currentChildren.forEach(function (currentChild) {
	          var nextChild = currentChild && (0, _ChildrenUtils.findChildInChildrenByKey)(nextChildren, currentChild.key);
	          var newChild = void 0;
	          if ((!nextChild || !nextChild.props[showProp]) && currentChild.props[showProp]) {
	            newChild = _react2['default'].cloneElement(nextChild || currentChild, (0, _defineProperty3['default'])({}, showProp, true));
	          } else {
	            newChild = nextChild;
	          }
	          if (newChild) {
	            newChildren.push(newChild);
	          }
	        });
	        nextChildren.forEach(function (nextChild) {
	          if (!nextChild || !(0, _ChildrenUtils.findChildInChildrenByKey)(currentChildren, nextChild.key)) {
	            newChildren.push(nextChild);
	          }
	        });
	      } else {
	        newChildren = (0, _ChildrenUtils.mergeChildren)(currentChildren, nextChildren);
	      }

	      // need render to avoid update
	      this.setState({
	        children: newChildren
	      });

	      nextChildren.forEach(function (child) {
	        var key = child && child.key;
	        if (child && currentlyAnimatingKeys[key]) {
	          return;
	        }
	        var hasPrev = child && (0, _ChildrenUtils.findChildInChildrenByKey)(currentChildren, key);
	        if (showProp) {
	          var showInNext = child.props[showProp];
	          if (hasPrev) {
	            var showInNow = (0, _ChildrenUtils.findShownChildInChildrenByKey)(currentChildren, key, showProp);
	            if (!showInNow && showInNext) {
	              _this3.keysToEnter.push(key);
	            }
	          } else if (showInNext) {
	            _this3.keysToEnter.push(key);
	          }
	        } else if (!hasPrev) {
	          _this3.keysToEnter.push(key);
	        }
	      });

	      currentChildren.forEach(function (child) {
	        var key = child && child.key;
	        if (child && currentlyAnimatingKeys[key]) {
	          return;
	        }
	        var hasNext = child && (0, _ChildrenUtils.findChildInChildrenByKey)(nextChildren, key);
	        if (showProp) {
	          var showInNow = child.props[showProp];
	          if (hasNext) {
	            var showInNext = (0, _ChildrenUtils.findShownChildInChildrenByKey)(nextChildren, key, showProp);
	            if (!showInNext && showInNow) {
	              _this3.keysToLeave.push(key);
	            }
	          } else if (showInNow) {
	            _this3.keysToLeave.push(key);
	          }
	        } else if (!hasNext) {
	          _this3.keysToLeave.push(key);
	        }
	      });
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      var keysToEnter = this.keysToEnter;
	      this.keysToEnter = [];
	      keysToEnter.forEach(this.performEnter);
	      var keysToLeave = this.keysToLeave;
	      this.keysToLeave = [];
	      keysToLeave.forEach(this.performLeave);
	    }
	  }, {
	    key: 'isValidChildByKey',
	    value: function isValidChildByKey(currentChildren, key) {
	      var showProp = this.props.showProp;
	      if (showProp) {
	        return (0, _ChildrenUtils.findShownChildInChildrenByKey)(currentChildren, key, showProp);
	      }
	      return (0, _ChildrenUtils.findChildInChildrenByKey)(currentChildren, key);
	    }
	  }, {
	    key: 'stop',
	    value: function stop(key) {
	      delete this.currentlyAnimatingKeys[key];
	      var component = this.childrenRefs[key];
	      if (component) {
	        component.stop();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      var props = this.props;
	      this.nextProps = props;
	      var stateChildren = this.state.children;
	      var children = null;
	      if (stateChildren) {
	        children = stateChildren.map(function (child) {
	          if (child === null || child === undefined) {
	            return child;
	          }
	          if (!child.key) {
	            throw new Error('must set key for <rc-animate> children');
	          }
	          return _react2['default'].createElement(
	            _AnimateChild2['default'],
	            {
	              key: child.key,
	              ref: function ref(node) {
	                return _this4.childrenRefs[child.key] = node;
	              },
	              animation: props.animation,
	              transitionName: props.transitionName,
	              transitionEnter: props.transitionEnter,
	              transitionAppear: props.transitionAppear,
	              transitionLeave: props.transitionLeave
	            },
	            child
	          );
	        });
	      }
	      var Component = props.component;
	      if (Component) {
	        var passedProps = props;
	        if (typeof Component === 'string') {
	          passedProps = (0, _extends3['default'])({
	            className: props.className,
	            style: props.style
	          }, props.componentProps);
	        }
	        return _react2['default'].createElement(
	          Component,
	          passedProps,
	          children
	        );
	      }
	      return children[0] || null;
	    }
	  }]);
	  return Animate;
	}(_react2['default'].Component);

	Animate.propTypes = {
	  component: _propTypes2['default'].any,
	  componentProps: _propTypes2['default'].object,
	  animation: _propTypes2['default'].object,
	  transitionName: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].object]),
	  transitionEnter: _propTypes2['default'].bool,
	  transitionAppear: _propTypes2['default'].bool,
	  exclusive: _propTypes2['default'].bool,
	  transitionLeave: _propTypes2['default'].bool,
	  onEnd: _propTypes2['default'].func,
	  onEnter: _propTypes2['default'].func,
	  onLeave: _propTypes2['default'].func,
	  onAppear: _propTypes2['default'].func,
	  showProp: _propTypes2['default'].string
	};
	Animate.defaultProps = {
	  animation: {},
	  component: 'span',
	  componentProps: {},
	  transitionEnter: true,
	  transitionLeave: true,
	  transitionAppear: false,
	  onEnd: noop,
	  onEnter: noop,
	  onLeave: noop,
	  onAppear: noop
	};

	var _initialiseProps = function _initialiseProps() {
	  var _this5 = this;

	  this.performEnter = function (key) {
	    // may already remove by exclusive
	    if (_this5.childrenRefs[key]) {
	      _this5.currentlyAnimatingKeys[key] = true;
	      _this5.childrenRefs[key].componentWillEnter(_this5.handleDoneAdding.bind(_this5, key, 'enter'));
	    }
	  };

	  this.performAppear = function (key) {
	    if (_this5.childrenRefs[key]) {
	      _this5.currentlyAnimatingKeys[key] = true;
	      _this5.childrenRefs[key].componentWillAppear(_this5.handleDoneAdding.bind(_this5, key, 'appear'));
	    }
	  };

	  this.handleDoneAdding = function (key, type) {
	    var props = _this5.props;
	    delete _this5.currentlyAnimatingKeys[key];
	    // if update on exclusive mode, skip check
	    if (props.exclusive && props !== _this5.nextProps) {
	      return;
	    }
	    var currentChildren = (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(props));
	    if (!_this5.isValidChildByKey(currentChildren, key)) {
	      // exclusive will not need this
	      _this5.performLeave(key);
	    } else {
	      if (type === 'appear') {
	        if (_util2['default'].allowAppearCallback(props)) {
	          props.onAppear(key);
	          props.onEnd(key, true);
	        }
	      } else {
	        if (_util2['default'].allowEnterCallback(props)) {
	          props.onEnter(key);
	          props.onEnd(key, true);
	        }
	      }
	    }
	  };

	  this.performLeave = function (key) {
	    // may already remove by exclusive
	    if (_this5.childrenRefs[key]) {
	      _this5.currentlyAnimatingKeys[key] = true;
	      _this5.childrenRefs[key].componentWillLeave(_this5.handleDoneLeaving.bind(_this5, key));
	    }
	  };

	  this.handleDoneLeaving = function (key) {
	    var props = _this5.props;
	    delete _this5.currentlyAnimatingKeys[key];
	    // if update on exclusive mode, skip check
	    if (props.exclusive && props !== _this5.nextProps) {
	      return;
	    }
	    var currentChildren = (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(props));
	    // in case state change is too fast
	    if (_this5.isValidChildByKey(currentChildren, key)) {
	      _this5.performEnter(key);
	    } else {
	      var end = function end() {
	        if (_util2['default'].allowLeaveCallback(props)) {
	          props.onLeave(key);
	          props.onEnd(key, false);
	        }
	      };
	      if (!(0, _ChildrenUtils.isSameChildren)(_this5.state.children, currentChildren, props.showProp)) {
	        _this5.setState({
	          children: currentChildren
	        }, end);
	      } else {
	        end();
	      }
	    }
	  };
	};

	exports['default'] = Animate;
	module.exports = exports['default'];

/***/ }),
/* 102 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var util = {
	  isAppearSupported: function isAppearSupported(props) {
	    return props.transitionName && props.transitionAppear || props.animation.appear;
	  },
	  isEnterSupported: function isEnterSupported(props) {
	    return props.transitionName && props.transitionEnter || props.animation.enter;
	  },
	  isLeaveSupported: function isLeaveSupported(props) {
	    return props.transitionName && props.transitionLeave || props.animation.leave;
	  },
	  allowAppearCallback: function allowAppearCallback(props) {
	    return props.transitionAppear || props.animation.appear;
	  },
	  allowEnterCallback: function allowEnterCallback(props) {
	    return props.transitionEnter || props.animation.enter;
	  },
	  allowLeaveCallback: function allowLeaveCallback(props) {
	    return props.transitionLeave || props.animation.leave;
	  }
	};
	exports["default"] = util;
	module.exports = exports['default'];

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(104);
	var $Object = __webpack_require__(4).Object;
	module.exports = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(8), 'Object', { defineProperty: __webpack_require__(6).f });


/***/ }),
/* 105 */,
/* 106 */,
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = addEventListenerWrap;

	var _addDomEventListener = __webpack_require__(147);

	var _addDomEventListener2 = _interopRequireDefault(_addDomEventListener);

	var _reactDom = __webpack_require__(85);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function addEventListenerWrap(target, eventType, cb) {
	  /* eslint camelcase: 2 */
	  var callback = _reactDom2['default'].unstable_batchedUpdates ? function run(e) {
	    _reactDom2['default'].unstable_batchedUpdates(cb, e);
	  } : cb;
	  return (0, _addDomEventListener2['default'])(target, eventType, callback);
	}
	module.exports = exports['default'];

/***/ }),
/* 108 */,
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(162);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ }),
/* 110 */,
/* 111 */,
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _warning = __webpack_require__(135);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var warned = {};

	exports['default'] = function (valid, message) {
	    if (!valid && !warned[message]) {
	        (0, _warning2['default'])(false, message);
	        warned[message] = true;
	    }
	};

	module.exports = exports['default'];

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _defineProperty2 = __webpack_require__(23);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	var _classCallCheck2 = __webpack_require__(7);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(25);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(12);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(11);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(21);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(20);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _rcCheckbox = __webpack_require__(188);

	var _rcCheckbox2 = _interopRequireDefault(_rcCheckbox);

	var _shallowequal = __webpack_require__(134);

	var _shallowequal2 = _interopRequireDefault(_shallowequal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var __rest = undefined && undefined.__rest || function (s, e) {
	    var t = {};
	    for (var p in s) {
	        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
	    }return t;
	};

	var Checkbox = function (_React$Component) {
	    (0, _inherits3['default'])(Checkbox, _React$Component);

	    function Checkbox() {
	        (0, _classCallCheck3['default'])(this, Checkbox);
	        return (0, _possibleConstructorReturn3['default'])(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
	    }

	    (0, _createClass3['default'])(Checkbox, [{
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
	            return !(0, _shallowequal2['default'])(this.props, nextProps) || !(0, _shallowequal2['default'])(this.state, nextState) || !(0, _shallowequal2['default'])(this.context.checkboxGroup, nextContext.checkboxGroup);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var props = this.props,
	                context = this.context;

	            var prefixCls = props.prefixCls,
	                className = props.className,
	                children = props.children,
	                indeterminate = props.indeterminate,
	                style = props.style,
	                onMouseEnter = props.onMouseEnter,
	                onMouseLeave = props.onMouseLeave,
	                restProps = __rest(props, ["prefixCls", "className", "children", "indeterminate", "style", "onMouseEnter", "onMouseLeave"]);

	            var checkboxGroup = context.checkboxGroup;

	            var checkboxProps = (0, _extends3['default'])({}, restProps);
	            if (checkboxGroup) {
	                checkboxProps.onChange = function () {
	                    return checkboxGroup.toggleOption({ label: children, value: props.value });
	                };
	                checkboxProps.checked = checkboxGroup.value.indexOf(props.value) !== -1;
	                checkboxProps.disabled = props.disabled || checkboxGroup.disabled;
	            }
	            var classString = (0, _classnames2['default'])(className, (0, _defineProperty3['default'])({}, prefixCls + '-wrapper', true));
	            var checkboxClass = (0, _classnames2['default'])((0, _defineProperty3['default'])({}, prefixCls + '-indeterminate', indeterminate));
	            return _react2['default'].createElement(
	                'label',
	                { className: classString, style: style, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave },
	                _react2['default'].createElement(_rcCheckbox2['default'], (0, _extends3['default'])({}, checkboxProps, { prefixCls: prefixCls, className: checkboxClass })),
	                children !== undefined ? _react2['default'].createElement(
	                    'span',
	                    null,
	                    children
	                ) : null
	            );
	        }
	    }]);
	    return Checkbox;
	}(_react2['default'].Component);

	exports['default'] = Checkbox;

	Checkbox.defaultProps = {
	    prefixCls: 'ant-checkbox',
	    indeterminate: false
	};
	Checkbox.contextTypes = {
	    checkboxGroup: _propTypes2['default'].any
	};
	module.exports = exports['default'];

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	var _defineProperty2 = __webpack_require__(23);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _classCallCheck2 = __webpack_require__(7);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(25);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(12);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(11);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(21);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(20);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _omit = __webpack_require__(87);

	var _omit2 = _interopRequireDefault(_omit);

	var _TextArea = __webpack_require__(115);

	var _TextArea2 = _interopRequireDefault(_TextArea);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function fixControlledValue(value) {
	    if (typeof value === 'undefined' || value === null) {
	        return '';
	    }
	    return value;
	}

	var Input = function (_Component) {
	    (0, _inherits3['default'])(Input, _Component);

	    function Input() {
	        (0, _classCallCheck3['default'])(this, Input);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));

	        _this.handleKeyDown = function (e) {
	            var _this$props = _this.props,
	                onPressEnter = _this$props.onPressEnter,
	                onKeyDown = _this$props.onKeyDown;

	            if (e.keyCode === 13 && onPressEnter) {
	                onPressEnter(e);
	            }
	            if (onKeyDown) {
	                onKeyDown(e);
	            }
	        };
	        return _this;
	    }

	    (0, _createClass3['default'])(Input, [{
	        key: 'focus',
	        value: function focus() {
	            this.refs.input.focus();
	        }
	    }, {
	        key: 'blur',
	        value: function blur() {
	            this.refs.input.blur();
	        }
	    }, {
	        key: 'getInputClassName',
	        value: function getInputClassName() {
	            var _classNames;

	            var _props = this.props,
	                prefixCls = _props.prefixCls,
	                size = _props.size,
	                disabled = _props.disabled;

	            return (0, _classnames2['default'])(prefixCls, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-sm', size === 'small'), (0, _defineProperty3['default'])(_classNames, prefixCls + '-lg', size === 'large'), (0, _defineProperty3['default'])(_classNames, prefixCls + '-disabled', disabled), _classNames));
	        }
	    }, {
	        key: 'renderLabeledInput',
	        value: function renderLabeledInput(children) {
	            var props = this.props;
	            // Not wrap when there is not addons
	            if (!props.addonBefore && !props.addonAfter) {
	                return children;
	            }
	            var wrapperClassName = props.prefixCls + '-group';
	            var addonClassName = wrapperClassName + '-addon';
	            var addonBefore = props.addonBefore ? _react2['default'].createElement(
	                'span',
	                { className: addonClassName },
	                props.addonBefore
	            ) : null;
	            var addonAfter = props.addonAfter ? _react2['default'].createElement(
	                'span',
	                { className: addonClassName },
	                props.addonAfter
	            ) : null;
	            var className = (0, _classnames2['default'])(props.prefixCls + '-wrapper', (0, _defineProperty3['default'])({}, wrapperClassName, addonBefore || addonAfter));
	            // Need another wrapper for changing display:table to display:inline-block
	            // and put style prop in wrapper
	            if (addonBefore || addonAfter) {
	                return _react2['default'].createElement(
	                    'span',
	                    { className: props.prefixCls + '-group-wrapper', style: props.style },
	                    _react2['default'].createElement(
	                        'span',
	                        { className: className },
	                        addonBefore,
	                        (0, _react.cloneElement)(children, { style: null }),
	                        addonAfter
	                    )
	                );
	            }
	            return _react2['default'].createElement(
	                'span',
	                { className: className },
	                addonBefore,
	                children,
	                addonAfter
	            );
	        }
	    }, {
	        key: 'renderLabeledIcon',
	        value: function renderLabeledIcon(children) {
	            var props = this.props;

	            if (!('prefix' in props || 'suffix' in props)) {
	                return children;
	            }
	            var prefix = props.prefix ? _react2['default'].createElement(
	                'span',
	                { className: props.prefixCls + '-prefix' },
	                props.prefix
	            ) : null;
	            var suffix = props.suffix ? _react2['default'].createElement(
	                'span',
	                { className: props.prefixCls + '-suffix' },
	                props.suffix
	            ) : null;
	            return _react2['default'].createElement(
	                'span',
	                { className: (0, _classnames2['default'])(props.className, props.prefixCls + '-affix-wrapper'), style: props.style },
	                prefix,
	                (0, _react.cloneElement)(children, { style: null, className: this.getInputClassName() }),
	                suffix
	            );
	        }
	    }, {
	        key: 'renderInput',
	        value: function renderInput() {
	            var _props2 = this.props,
	                value = _props2.value,
	                className = _props2.className;
	            // Fix https://fb.me/react-unknown-prop

	            var otherProps = (0, _omit2['default'])(this.props, ['prefixCls', 'onPressEnter', 'addonBefore', 'addonAfter', 'prefix', 'suffix']);
	            if ('value' in this.props) {
	                otherProps.value = fixControlledValue(value);
	                // Input elements must be either controlled or uncontrolled,
	                // specify either the value prop, or the defaultValue prop, but not both.
	                delete otherProps.defaultValue;
	            }
	            return this.renderLabeledIcon(_react2['default'].createElement('input', (0, _extends3['default'])({}, otherProps, { className: (0, _classnames2['default'])(this.getInputClassName(), className), onKeyDown: this.handleKeyDown, ref: 'input' })));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            if (this.props.type === 'textarea') {
	                return _react2['default'].createElement(_TextArea2['default'], (0, _extends3['default'])({}, this.props, { ref: 'input' }));
	            }
	            return this.renderLabeledInput(this.renderInput());
	        }
	    }]);
	    return Input;
	}(_react.Component);

	exports['default'] = Input;

	Input.defaultProps = {
	    prefixCls: 'ant-input',
	    type: 'text',
	    disabled: false
	};
	Input.propTypes = {
	    type: _propTypes2['default'].string,
	    id: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
	    size: _propTypes2['default'].oneOf(['small', 'default', 'large']),
	    maxLength: _propTypes2['default'].string,
	    disabled: _propTypes2['default'].bool,
	    value: _propTypes2['default'].any,
	    defaultValue: _propTypes2['default'].any,
	    className: _propTypes2['default'].string,
	    addonBefore: _propTypes2['default'].node,
	    addonAfter: _propTypes2['default'].node,
	    prefixCls: _propTypes2['default'].string,
	    autosize: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].object]),
	    onPressEnter: _propTypes2['default'].func,
	    onKeyDown: _propTypes2['default'].func,
	    onFocus: _propTypes2['default'].func,
	    onBlur: _propTypes2['default'].func,
	    prefix: _propTypes2['default'].node,
	    suffix: _propTypes2['default'].node
	};
	module.exports = exports['default'];

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	var _defineProperty2 = __webpack_require__(23);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _classCallCheck2 = __webpack_require__(7);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(25);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(12);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(11);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _omit = __webpack_require__(87);

	var _omit2 = _interopRequireDefault(_omit);

	var _classnames = __webpack_require__(20);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _calculateNodeHeight = __webpack_require__(158);

	var _calculateNodeHeight2 = _interopRequireDefault(_calculateNodeHeight);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function onNextFrame(cb) {
	    if (window.requestAnimationFrame) {
	        return window.requestAnimationFrame(cb);
	    }
	    return window.setTimeout(cb, 1);
	}
	function clearNextFrameAction(nextFrameId) {
	    if (window.cancelAnimationFrame) {
	        window.cancelAnimationFrame(nextFrameId);
	    } else {
	        window.clearTimeout(nextFrameId);
	    }
	}

	var TextArea = function (_React$Component) {
	    (0, _inherits3['default'])(TextArea, _React$Component);

	    function TextArea() {
	        (0, _classCallCheck3['default'])(this, TextArea);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).apply(this, arguments));

	        _this.state = {
	            textareaStyles: null
	        };
	        _this.resizeTextarea = function () {
	            var autosize = _this.props.autosize;

	            if (!autosize || !_this.textAreaRef) {
	                return;
	            }
	            var minRows = autosize ? autosize.minRows : null;
	            var maxRows = autosize ? autosize.maxRows : null;
	            var textareaStyles = (0, _calculateNodeHeight2['default'])(_this.textAreaRef, false, minRows, maxRows);
	            _this.setState({ textareaStyles: textareaStyles });
	        };
	        _this.handleTextareaChange = function (e) {
	            if (!('value' in _this.props)) {
	                _this.resizeTextarea();
	            }
	            var onChange = _this.props.onChange;

	            if (onChange) {
	                onChange(e);
	            }
	        };
	        _this.handleKeyDown = function (e) {
	            var _this$props = _this.props,
	                onPressEnter = _this$props.onPressEnter,
	                onKeyDown = _this$props.onKeyDown;

	            if (e.keyCode === 13 && onPressEnter) {
	                onPressEnter(e);
	            }
	            if (onKeyDown) {
	                onKeyDown(e);
	            }
	        };
	        _this.saveTextAreaRef = function (textArea) {
	            _this.textAreaRef = textArea;
	        };
	        return _this;
	    }

	    (0, _createClass3['default'])(TextArea, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.resizeTextarea();
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            // Re-render with the new content then recalculate the height as required.
	            if (this.props.value !== nextProps.value) {
	                if (this.nextFrameActionId) {
	                    clearNextFrameAction(this.nextFrameActionId);
	                }
	                this.nextFrameActionId = onNextFrame(this.resizeTextarea);
	            }
	        }
	    }, {
	        key: 'focus',
	        value: function focus() {
	            this.textAreaRef.focus();
	        }
	    }, {
	        key: 'blur',
	        value: function blur() {
	            this.textAreaRef.blur();
	        }
	    }, {
	        key: 'getTextAreaClassName',
	        value: function getTextAreaClassName() {
	            var _props = this.props,
	                prefixCls = _props.prefixCls,
	                className = _props.className,
	                disabled = _props.disabled;

	            return (0, _classnames2['default'])(prefixCls, className, (0, _defineProperty3['default'])({}, prefixCls + '-disabled', disabled));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var props = this.props;
	            var otherProps = (0, _omit2['default'])(props, ['prefixCls', 'onPressEnter', 'autosize']);
	            var style = (0, _extends3['default'])({}, props.style, this.state.textareaStyles);
	            // Fix https://github.com/ant-design/ant-design/issues/6776
	            // Make sure it could be reset when using form.getFieldDecorator
	            if ('value' in otherProps) {
	                otherProps.value = otherProps.value || '';
	            }
	            return _react2['default'].createElement('textarea', (0, _extends3['default'])({}, otherProps, { className: this.getTextAreaClassName(), style: style, onKeyDown: this.handleKeyDown, onChange: this.handleTextareaChange, ref: this.saveTextAreaRef }));
	        }
	    }]);
	    return TextArea;
	}(_react2['default'].Component);

	exports['default'] = TextArea;

	TextArea.defaultProps = {
	    prefixCls: 'ant-input'
	};
	module.exports = exports['default'];

/***/ }),
/* 116 */,
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(120), __esModule: true };

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	try {
	  var index = __webpack_require__(96);
	} catch (err) {
	  var index = __webpack_require__(96);
	}

	/**
	 * Whitespace regexp.
	 */

	var re = /\s+/;

	/**
	 * toString reference.
	 */

	var toString = Object.prototype.toString;

	/**
	 * Wrap `el` in a `ClassList`.
	 *
	 * @param {Element} el
	 * @return {ClassList}
	 * @api public
	 */

	module.exports = function(el){
	  return new ClassList(el);
	};

	/**
	 * Initialize a new ClassList for `el`.
	 *
	 * @param {Element} el
	 * @api private
	 */

	function ClassList(el) {
	  if (!el || !el.nodeType) {
	    throw new Error('A DOM element reference is required');
	  }
	  this.el = el;
	  this.list = el.classList;
	}

	/**
	 * Add class `name` if not already present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.add = function(name){
	  // classList
	  if (this.list) {
	    this.list.add(name);
	    return this;
	  }

	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (!~i) arr.push(name);
	  this.el.className = arr.join(' ');
	  return this;
	};

	/**
	 * Remove class `name` when present, or
	 * pass a regular expression to remove
	 * any which match.
	 *
	 * @param {String|RegExp} name
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.remove = function(name){
	  if ('[object RegExp]' == toString.call(name)) {
	    return this.removeMatching(name);
	  }

	  // classList
	  if (this.list) {
	    this.list.remove(name);
	    return this;
	  }

	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (~i) arr.splice(i, 1);
	  this.el.className = arr.join(' ');
	  return this;
	};

	/**
	 * Remove all classes matching `re`.
	 *
	 * @param {RegExp} re
	 * @return {ClassList}
	 * @api private
	 */

	ClassList.prototype.removeMatching = function(re){
	  var arr = this.array();
	  for (var i = 0; i < arr.length; i++) {
	    if (re.test(arr[i])) {
	      this.remove(arr[i]);
	    }
	  }
	  return this;
	};

	/**
	 * Toggle class `name`, can force state via `force`.
	 *
	 * For browsers that support classList, but do not support `force` yet,
	 * the mistake will be detected and corrected.
	 *
	 * @param {String} name
	 * @param {Boolean} force
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.toggle = function(name, force){
	  // classList
	  if (this.list) {
	    if ("undefined" !== typeof force) {
	      if (force !== this.list.toggle(name, force)) {
	        this.list.toggle(name); // toggle again to correct
	      }
	    } else {
	      this.list.toggle(name);
	    }
	    return this;
	  }

	  // fallback
	  if ("undefined" !== typeof force) {
	    if (!force) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  } else {
	    if (this.has(name)) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  }

	  return this;
	};

	/**
	 * Return an array of classes.
	 *
	 * @return {Array}
	 * @api public
	 */

	ClassList.prototype.array = function(){
	  var className = this.el.getAttribute('class') || '';
	  var str = className.replace(/^\s+|\s+$/g, '');
	  var arr = str.split(re);
	  if ('' === arr[0]) arr.shift();
	  return arr;
	};

	/**
	 * Check if class `name` is present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.has =
	ClassList.prototype.contains = function(name){
	  return this.list
	    ? this.list.contains(name)
	    : !! ~index(this.array(), name);
	};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(123);
	module.exports = __webpack_require__(4).Object.assign;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(124);
	module.exports = __webpack_require__(4).Object.keys;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys = __webpack_require__(22);
	var gOPS = __webpack_require__(41);
	var pIE = __webpack_require__(26);
	var toObject = __webpack_require__(49);
	var IObject = __webpack_require__(50);
	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(16)(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = gOPS.f;
	  var isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject(arguments[index++]);
	    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(14);

	$export($export.S + $export.F, 'Object', { assign: __webpack_require__(122) });


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(49);
	var $keys = __webpack_require__(22);

	__webpack_require__(97)('keys', function () {
	  return function keys(it) {
	    return $keys(toObject(it));
	  };
	});


/***/ }),
/* 125 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var EVENT_NAME_MAP = {
	  transitionend: {
	    transition: 'transitionend',
	    WebkitTransition: 'webkitTransitionEnd',
	    MozTransition: 'mozTransitionEnd',
	    OTransition: 'oTransitionEnd',
	    msTransition: 'MSTransitionEnd'
	  },

	  animationend: {
	    animation: 'animationend',
	    WebkitAnimation: 'webkitAnimationEnd',
	    MozAnimation: 'mozAnimationEnd',
	    OAnimation: 'oAnimationEnd',
	    msAnimation: 'MSAnimationEnd'
	  }
	};

	var endEvents = [];

	function detectEvents() {
	  var testEl = document.createElement('div');
	  var style = testEl.style;

	  if (!('AnimationEvent' in window)) {
	    delete EVENT_NAME_MAP.animationend.animation;
	  }

	  if (!('TransitionEvent' in window)) {
	    delete EVENT_NAME_MAP.transitionend.transition;
	  }

	  for (var baseEventName in EVENT_NAME_MAP) {
	    if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
	      var baseEvents = EVENT_NAME_MAP[baseEventName];
	      for (var styleName in baseEvents) {
	        if (styleName in style) {
	          endEvents.push(baseEvents[styleName]);
	          break;
	        }
	      }
	    }
	  }
	}

	if (typeof window !== 'undefined' && typeof document !== 'undefined') {
	  detectEvents();
	}

	function addEventListener(node, eventName, eventListener) {
	  node.addEventListener(eventName, eventListener, false);
	}

	function removeEventListener(node, eventName, eventListener) {
	  node.removeEventListener(eventName, eventListener, false);
	}

	var TransitionEvents = {
	  addEndEventListener: function addEndEventListener(node, eventListener) {
	    if (endEvents.length === 0) {
	      window.setTimeout(eventListener, 0);
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      addEventListener(node, endEvent, eventListener);
	    });
	  },


	  endEvents: endEvents,

	  removeEndEventListener: function removeEndEventListener(node, eventListener) {
	    if (endEvents.length === 0) {
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      removeEventListener(node, endEvent, eventListener);
	    });
	  }
	};

	exports['default'] = TransitionEvents;
	module.exports = exports['default'];

/***/ }),
/* 126 */,
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	if (true) {
	  var invariant = __webpack_require__(92);
	  var warning = __webpack_require__(93);
	  var ReactPropTypesSecret = __webpack_require__(100);
	  var loggedTypeFailures = {};
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (true) {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}

	module.exports = checkPropTypes;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(99);
	var invariant = __webpack_require__(92);
	var warning = __webpack_require__(93);
	var assign = __webpack_require__(129);

	var ReactPropTypesSecret = __webpack_require__(100);
	var checkPropTypes = __webpack_require__(127);

	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (true) {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant(
	            false,
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	        } else if (("development") !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            warning(
	              false,
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `%s` prop on `%s`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
	              propFullName,
	              componentName
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	       true ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	       true ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        warning(
	          false,
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received %s at index %s.',
	          getPostfixForTypeWarning(checker),
	          i
	        );
	        return emptyFunction.thatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 129 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof2 = __webpack_require__(27);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _classCallCheck2 = __webpack_require__(7);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(25);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(12);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(11);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(85);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _propTypes = __webpack_require__(21);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _cssAnimation = __webpack_require__(98);

	var _cssAnimation2 = _interopRequireDefault(_cssAnimation);

	var _util = __webpack_require__(102);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var transitionMap = {
	  enter: 'transitionEnter',
	  appear: 'transitionAppear',
	  leave: 'transitionLeave'
	};

	var AnimateChild = function (_React$Component) {
	  (0, _inherits3['default'])(AnimateChild, _React$Component);

	  function AnimateChild() {
	    (0, _classCallCheck3['default'])(this, AnimateChild);
	    return (0, _possibleConstructorReturn3['default'])(this, (AnimateChild.__proto__ || Object.getPrototypeOf(AnimateChild)).apply(this, arguments));
	  }

	  (0, _createClass3['default'])(AnimateChild, [{
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.stop();
	    }
	  }, {
	    key: 'componentWillEnter',
	    value: function componentWillEnter(done) {
	      if (_util2['default'].isEnterSupported(this.props)) {
	        this.transition('enter', done);
	      } else {
	        done();
	      }
	    }
	  }, {
	    key: 'componentWillAppear',
	    value: function componentWillAppear(done) {
	      if (_util2['default'].isAppearSupported(this.props)) {
	        this.transition('appear', done);
	      } else {
	        done();
	      }
	    }
	  }, {
	    key: 'componentWillLeave',
	    value: function componentWillLeave(done) {
	      if (_util2['default'].isLeaveSupported(this.props)) {
	        this.transition('leave', done);
	      } else {
	        // always sync, do not interupt with react component life cycle
	        // update hidden -> animate hidden ->
	        // didUpdate -> animate leave -> unmount (if animate is none)
	        done();
	      }
	    }
	  }, {
	    key: 'transition',
	    value: function transition(animationType, finishCallback) {
	      var _this2 = this;

	      var node = _reactDom2['default'].findDOMNode(this);
	      var props = this.props;
	      var transitionName = props.transitionName;
	      var nameIsObj = (typeof transitionName === 'undefined' ? 'undefined' : (0, _typeof3['default'])(transitionName)) === 'object';
	      this.stop();
	      var end = function end() {
	        _this2.stopper = null;
	        finishCallback();
	      };
	      if ((_cssAnimation.isCssAnimationSupported || !props.animation[animationType]) && transitionName && props[transitionMap[animationType]]) {
	        var name = nameIsObj ? transitionName[animationType] : transitionName + '-' + animationType;
	        var activeName = name + '-active';
	        if (nameIsObj && transitionName[animationType + 'Active']) {
	          activeName = transitionName[animationType + 'Active'];
	        }
	        this.stopper = (0, _cssAnimation2['default'])(node, {
	          name: name,
	          active: activeName
	        }, end);
	      } else {
	        this.stopper = props.animation[animationType](node, end);
	      }
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      var stopper = this.stopper;
	      if (stopper) {
	        this.stopper = null;
	        stopper.stop();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return this.props.children;
	    }
	  }]);
	  return AnimateChild;
	}(_react2['default'].Component);

	AnimateChild.propTypes = {
	  children: _propTypes2['default'].any
	};
	exports['default'] = AnimateChild;
	module.exports = exports['default'];

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toArrayChildren = toArrayChildren;
	exports.findChildInChildrenByKey = findChildInChildrenByKey;
	exports.findShownChildInChildrenByKey = findShownChildInChildrenByKey;
	exports.findHiddenChildInChildrenByKey = findHiddenChildInChildrenByKey;
	exports.isSameChildren = isSameChildren;
	exports.mergeChildren = mergeChildren;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function toArrayChildren(children) {
	  var ret = [];
	  _react2['default'].Children.forEach(children, function (child) {
	    ret.push(child);
	  });
	  return ret;
	}

	function findChildInChildrenByKey(children, key) {
	  var ret = null;
	  if (children) {
	    children.forEach(function (child) {
	      if (ret) {
	        return;
	      }
	      if (child && child.key === key) {
	        ret = child;
	      }
	    });
	  }
	  return ret;
	}

	function findShownChildInChildrenByKey(children, key, showProp) {
	  var ret = null;
	  if (children) {
	    children.forEach(function (child) {
	      if (child && child.key === key && child.props[showProp]) {
	        if (ret) {
	          throw new Error('two child with same key for <rc-animate> children');
	        }
	        ret = child;
	      }
	    });
	  }
	  return ret;
	}

	function findHiddenChildInChildrenByKey(children, key, showProp) {
	  var found = 0;
	  if (children) {
	    children.forEach(function (child) {
	      if (found) {
	        return;
	      }
	      found = child && child.key === key && !child.props[showProp];
	    });
	  }
	  return found;
	}

	function isSameChildren(c1, c2, showProp) {
	  var same = c1.length === c2.length;
	  if (same) {
	    c1.forEach(function (child, index) {
	      var child2 = c2[index];
	      if (child && child2) {
	        if (child && !child2 || !child && child2) {
	          same = false;
	        } else if (child.key !== child2.key) {
	          same = false;
	        } else if (showProp && child.props[showProp] !== child2.props[showProp]) {
	          same = false;
	        }
	      }
	    });
	  }
	  return same;
	}

	function mergeChildren(prev, next) {
	  var ret = [];

	  // For each key of `next`, the list of keys to insert before that key in
	  // the combined list
	  var nextChildrenPending = {};
	  var pendingChildren = [];
	  prev.forEach(function (child) {
	    if (child && findChildInChildrenByKey(next, child.key)) {
	      if (pendingChildren.length) {
	        nextChildrenPending[child.key] = pendingChildren;
	        pendingChildren = [];
	      }
	    } else {
	      pendingChildren.push(child);
	    }
	  });

	  next.forEach(function (child) {
	    if (child && nextChildrenPending.hasOwnProperty(child.key)) {
	      ret = ret.concat(nextChildrenPending[child.key]);
	    }
	    ret.push(child);
	  });

	  ret = ret.concat(pendingChildren);

	  return ret;
	}

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	var _defineProperty2 = __webpack_require__(23);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass = __webpack_require__(86);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _propTypes = __webpack_require__(21);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = __webpack_require__(20);

	var _classnames3 = _interopRequireDefault(_classnames2);

	var _utils = __webpack_require__(88);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var TabContent = (0, _createReactClass2['default'])({
	  displayName: 'TabContent',
	  propTypes: {
	    animated: _propTypes2['default'].bool,
	    animatedWithMargin: _propTypes2['default'].bool,
	    prefixCls: _propTypes2['default'].string,
	    children: _propTypes2['default'].any,
	    activeKey: _propTypes2['default'].string,
	    style: _propTypes2['default'].any,
	    tabBarPosition: _propTypes2['default'].string
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      animated: true
	    };
	  },
	  getTabPanes: function getTabPanes() {
	    var props = this.props;
	    var activeKey = props.activeKey;
	    var children = props.children;
	    var newChildren = [];

	    _react2['default'].Children.forEach(children, function (child) {
	      if (!child) {
	        return;
	      }
	      var key = child.key;
	      var active = activeKey === key;
	      newChildren.push(_react2['default'].cloneElement(child, {
	        active: active,
	        destroyInactiveTabPane: props.destroyInactiveTabPane,
	        rootPrefixCls: props.prefixCls
	      }));
	    });

	    return newChildren;
	  },
	  render: function render() {
	    var _classnames;

	    var props = this.props;
	    var prefixCls = props.prefixCls,
	        children = props.children,
	        activeKey = props.activeKey,
	        tabBarPosition = props.tabBarPosition,
	        animated = props.animated,
	        animatedWithMargin = props.animatedWithMargin;
	    var style = props.style;

	    var classes = (0, _classnames3['default'])((_classnames = {}, (0, _defineProperty3['default'])(_classnames, prefixCls + '-content', true), (0, _defineProperty3['default'])(_classnames, animated ? prefixCls + '-content-animated' : prefixCls + '-content-no-animated', true), _classnames));
	    if (animated) {
	      var activeIndex = (0, _utils.getActiveIndex)(children, activeKey);
	      if (activeIndex !== -1) {
	        var animatedStyle = animatedWithMargin ? (0, _utils.getMarginStyle)(activeIndex, tabBarPosition) : (0, _utils.getTransformPropValue)((0, _utils.getTransformByIndex)(activeIndex, tabBarPosition));
	        style = (0, _extends3['default'])({}, style, animatedStyle);
	      } else {
	        style = (0, _extends3['default'])({}, style, {
	          display: 'none'
	        });
	      }
	    }
	    return _react2['default'].createElement(
	      'div',
	      {
	        className: classes,
	        style: style
	      },
	      this.getTabPanes()
	    );
	  }
	});

	exports['default'] = TabContent;
	module.exports = exports['default'];

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	var _defineProperty2 = __webpack_require__(23);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _objectWithoutProperties2 = __webpack_require__(91);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(21);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _createReactClass = __webpack_require__(86);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _classnames2 = __webpack_require__(20);

	var _classnames3 = _interopRequireDefault(_classnames2);

	var _utils = __webpack_require__(88);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var TabPane = (0, _createReactClass2['default'])({
	  displayName: 'TabPane',
	  propTypes: {
	    className: _propTypes2['default'].string,
	    active: _propTypes2['default'].bool,
	    style: _propTypes2['default'].any,
	    destroyInactiveTabPane: _propTypes2['default'].bool,
	    forceRender: _propTypes2['default'].bool,
	    placeholder: _propTypes2['default'].node
	  },
	  getDefaultProps: function getDefaultProps() {
	    return { placeholder: null };
	  },
	  render: function render() {
	    var _classnames;

	    var _props = this.props,
	        className = _props.className,
	        destroyInactiveTabPane = _props.destroyInactiveTabPane,
	        active = _props.active,
	        forceRender = _props.forceRender,
	        rootPrefixCls = _props.rootPrefixCls,
	        style = _props.style,
	        children = _props.children,
	        placeholder = _props.placeholder,
	        restProps = (0, _objectWithoutProperties3['default'])(_props, ['className', 'destroyInactiveTabPane', 'active', 'forceRender', 'rootPrefixCls', 'style', 'children', 'placeholder']);

	    this._isActived = this._isActived || active;
	    var prefixCls = rootPrefixCls + '-tabpane';
	    var cls = (0, _classnames3['default'])((_classnames = {}, (0, _defineProperty3['default'])(_classnames, prefixCls, 1), (0, _defineProperty3['default'])(_classnames, prefixCls + '-inactive', !active), (0, _defineProperty3['default'])(_classnames, prefixCls + '-active', active), (0, _defineProperty3['default'])(_classnames, className, className), _classnames));
	    var isRender = destroyInactiveTabPane ? active : this._isActived;
	    return _react2['default'].createElement(
	      'div',
	      (0, _extends3['default'])({
	        style: style,
	        role: 'tabpanel',
	        'aria-hidden': active ? 'false' : 'true',
	        className: cls
	      }, (0, _utils.getDataAttr)(restProps)),
	      isRender || forceRender ? children : placeholder
	    );
	  }
	});

	exports['default'] = TabPane;
	module.exports = exports['default'];

/***/ }),
/* 134 */
/***/ (function(module, exports) {

	module.exports = function shallowEqual(objA, objB, compare, compareContext) {

	    var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

	    if(ret !== void 0) {
	        return !!ret;
	    }

	    if(objA === objB) {
	        return true;
	    }

	    if(typeof objA !== 'object' || !objA ||
	       typeof objB !== 'object' || !objB) {
	        return false;
	    }

	    var keysA = Object.keys(objA);
	    var keysB = Object.keys(objB);

	    if(keysA.length !== keysB.length) {
	        return false;
	    }

	    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

	    // Test for A's keys different from B.
	    for(var idx = 0; idx < keysA.length; idx++) {

	        var key = keysA[idx];

	        if(!bHasOwnProperty(key)) {
	            return false;
	        }

	        var valueA = objA[key];
	        var valueB = objB[key];

	        ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

	        if(ret === false ||
	           ret === void 0 && valueA !== valueB) {
	            return false;
	        }

	    }

	    return true;

	};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = function() {};

	if (true) {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;


/***/ }),
/* 136 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports['default'] = getRequestAnimationFrame;
	exports.cancelRequestAnimationFrame = cancelRequestAnimationFrame;
	var availablePrefixs = ['moz', 'ms', 'webkit'];
	function requestAnimationFramePolyfill() {
	    var lastTime = 0;
	    return function (callback) {
	        var currTime = new Date().getTime();
	        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	        var id = window.setTimeout(function () {
	            callback(currTime + timeToCall);
	        }, timeToCall);
	        lastTime = currTime + timeToCall;
	        return id;
	    };
	}
	function getRequestAnimationFrame() {
	    if (typeof window === 'undefined') {
	        return function () {};
	    }
	    if (window.requestAnimationFrame) {
	        // https://github.com/vuejs/vue/issues/4465
	        return window.requestAnimationFrame.bind(window);
	    }
	    var prefix = availablePrefixs.filter(function (key) {
	        return key + 'RequestAnimationFrame' in window;
	    })[0];
	    return prefix ? window[prefix + 'RequestAnimationFrame'] : requestAnimationFramePolyfill();
	}
	function cancelRequestAnimationFrame(id) {
	    if (typeof window === 'undefined') {
	        return null;
	    }
	    if (window.cancelAnimationFrame) {
	        return window.cancelAnimationFrame(id);
	    }
	    var prefix = availablePrefixs.filter(function (key) {
	        return key + 'CancelAnimationFrame' in window || key + 'CancelRequestAnimationFrame' in window;
	    })[0];
	    return prefix ? (window[prefix + 'CancelAnimationFrame'] || window[prefix + 'CancelRequestAnimationFrame']).call(this, id) : clearTimeout(id);
	}

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _button = __webpack_require__(152);

	var _button2 = _interopRequireDefault(_button);

	var _buttonGroup = __webpack_require__(151);

	var _buttonGroup2 = _interopRequireDefault(_buttonGroup);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	_button2['default'].Group = _buttonGroup2['default'];
	exports['default'] = _button2['default'];
	module.exports = exports['default'];

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(84);

	__webpack_require__(174);

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Input = __webpack_require__(114);

	var _Input2 = _interopRequireDefault(_Input);

	var _Group = __webpack_require__(156);

	var _Group2 = _interopRequireDefault(_Group);

	var _Search = __webpack_require__(157);

	var _Search2 = _interopRequireDefault(_Search);

	var _TextArea = __webpack_require__(115);

	var _TextArea2 = _interopRequireDefault(_TextArea);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	_Input2['default'].Group = _Group2['default'];
	_Input2['default'].Search = _Search2['default'];
	_Input2['default'].TextArea = _TextArea2['default'];
	exports['default'] = _Input2['default'];
	module.exports = exports['default'];

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(84);

	__webpack_require__(176);

/***/ }),
/* 141 */,
/* 142 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;

	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = debounce;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 143 */,
/* 144 */,
/* 145 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @ignore
	 * base event object for custom and dom event.
	 * @author yiminghe@gmail.com
	 */

	function returnFalse() {
	  return false;
	}

	function returnTrue() {
	  return true;
	}

	function EventBaseObject() {
	  this.timeStamp = Date.now();
	  this.target = undefined;
	  this.currentTarget = undefined;
	}

	EventBaseObject.prototype = {
	  isEventObject: 1,

	  constructor: EventBaseObject,

	  isDefaultPrevented: returnFalse,

	  isPropagationStopped: returnFalse,

	  isImmediatePropagationStopped: returnFalse,

	  preventDefault: function preventDefault() {
	    this.isDefaultPrevented = returnTrue;
	  },
	  stopPropagation: function stopPropagation() {
	    this.isPropagationStopped = returnTrue;
	  },
	  stopImmediatePropagation: function stopImmediatePropagation() {
	    this.isImmediatePropagationStopped = returnTrue;
	    // fixed 1.2
	    // call stopPropagation implicitly
	    this.stopPropagation();
	  },
	  halt: function halt(immediate) {
	    if (immediate) {
	      this.stopImmediatePropagation();
	    } else {
	      this.stopPropagation();
	    }
	    this.preventDefault();
	  }
	};

	exports["default"] = EventBaseObject;
	module.exports = exports['default'];

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _EventBaseObject = __webpack_require__(145);

	var _EventBaseObject2 = _interopRequireDefault(_EventBaseObject);

	var _objectAssign = __webpack_require__(148);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/**
	 * @ignore
	 * event object for dom
	 * @author yiminghe@gmail.com
	 */

	var TRUE = true;
	var FALSE = false;
	var commonProps = ['altKey', 'bubbles', 'cancelable', 'ctrlKey', 'currentTarget', 'eventPhase', 'metaKey', 'shiftKey', 'target', 'timeStamp', 'view', 'type'];

	function isNullOrUndefined(w) {
	  return w === null || w === undefined;
	}

	var eventNormalizers = [{
	  reg: /^key/,
	  props: ['char', 'charCode', 'key', 'keyCode', 'which'],
	  fix: function fix(event, nativeEvent) {
	    if (isNullOrUndefined(event.which)) {
	      event.which = !isNullOrUndefined(nativeEvent.charCode) ? nativeEvent.charCode : nativeEvent.keyCode;
	    }

	    // add metaKey to non-Mac browsers (use ctrl for PC 's and Meta for Macs)
	    if (event.metaKey === undefined) {
	      event.metaKey = event.ctrlKey;
	    }
	  }
	}, {
	  reg: /^touch/,
	  props: ['touches', 'changedTouches', 'targetTouches']
	}, {
	  reg: /^hashchange$/,
	  props: ['newURL', 'oldURL']
	}, {
	  reg: /^gesturechange$/i,
	  props: ['rotation', 'scale']
	}, {
	  reg: /^(mousewheel|DOMMouseScroll)$/,
	  props: [],
	  fix: function fix(event, nativeEvent) {
	    var deltaX = void 0;
	    var deltaY = void 0;
	    var delta = void 0;
	    var wheelDelta = nativeEvent.wheelDelta;
	    var axis = nativeEvent.axis;
	    var wheelDeltaY = nativeEvent.wheelDeltaY;
	    var wheelDeltaX = nativeEvent.wheelDeltaX;
	    var detail = nativeEvent.detail;

	    // ie/webkit
	    if (wheelDelta) {
	      delta = wheelDelta / 120;
	    }

	    // gecko
	    if (detail) {
	      // press control e.detail == 1 else e.detail == 3
	      delta = 0 - (detail % 3 === 0 ? detail / 3 : detail);
	    }

	    // Gecko
	    if (axis !== undefined) {
	      if (axis === event.HORIZONTAL_AXIS) {
	        deltaY = 0;
	        deltaX = 0 - delta;
	      } else if (axis === event.VERTICAL_AXIS) {
	        deltaX = 0;
	        deltaY = delta;
	      }
	    }

	    // Webkit
	    if (wheelDeltaY !== undefined) {
	      deltaY = wheelDeltaY / 120;
	    }
	    if (wheelDeltaX !== undefined) {
	      deltaX = -1 * wheelDeltaX / 120;
	    }

	    // 默认 deltaY (ie)
	    if (!deltaX && !deltaY) {
	      deltaY = delta;
	    }

	    if (deltaX !== undefined) {
	      /**
	       * deltaX of mousewheel event
	       * @property deltaX
	       * @member Event.DomEvent.Object
	       */
	      event.deltaX = deltaX;
	    }

	    if (deltaY !== undefined) {
	      /**
	       * deltaY of mousewheel event
	       * @property deltaY
	       * @member Event.DomEvent.Object
	       */
	      event.deltaY = deltaY;
	    }

	    if (delta !== undefined) {
	      /**
	       * delta of mousewheel event
	       * @property delta
	       * @member Event.DomEvent.Object
	       */
	      event.delta = delta;
	    }
	  }
	}, {
	  reg: /^mouse|contextmenu|click|mspointer|(^DOMMouseScroll$)/i,
	  props: ['buttons', 'clientX', 'clientY', 'button', 'offsetX', 'relatedTarget', 'which', 'fromElement', 'toElement', 'offsetY', 'pageX', 'pageY', 'screenX', 'screenY'],
	  fix: function fix(event, nativeEvent) {
	    var eventDoc = void 0;
	    var doc = void 0;
	    var body = void 0;
	    var target = event.target;
	    var button = nativeEvent.button;

	    // Calculate pageX/Y if missing and clientX/Y available
	    if (target && isNullOrUndefined(event.pageX) && !isNullOrUndefined(nativeEvent.clientX)) {
	      eventDoc = target.ownerDocument || document;
	      doc = eventDoc.documentElement;
	      body = eventDoc.body;
	      event.pageX = nativeEvent.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
	      event.pageY = nativeEvent.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
	    }

	    // which for click: 1 === left; 2 === middle; 3 === right
	    // do not use button
	    if (!event.which && button !== undefined) {
	      if (button & 1) {
	        event.which = 1;
	      } else if (button & 2) {
	        event.which = 3;
	      } else if (button & 4) {
	        event.which = 2;
	      } else {
	        event.which = 0;
	      }
	    }

	    // add relatedTarget, if necessary
	    if (!event.relatedTarget && event.fromElement) {
	      event.relatedTarget = event.fromElement === target ? event.toElement : event.fromElement;
	    }

	    return event;
	  }
	}];

	function retTrue() {
	  return TRUE;
	}

	function retFalse() {
	  return FALSE;
	}

	function DomEventObject(nativeEvent) {
	  var type = nativeEvent.type;

	  var isNative = typeof nativeEvent.stopPropagation === 'function' || typeof nativeEvent.cancelBubble === 'boolean';

	  _EventBaseObject2["default"].call(this);

	  this.nativeEvent = nativeEvent;

	  // in case dom event has been mark as default prevented by lower dom node
	  var isDefaultPrevented = retFalse;
	  if ('defaultPrevented' in nativeEvent) {
	    isDefaultPrevented = nativeEvent.defaultPrevented ? retTrue : retFalse;
	  } else if ('getPreventDefault' in nativeEvent) {
	    // https://bugzilla.mozilla.org/show_bug.cgi?id=691151
	    isDefaultPrevented = nativeEvent.getPreventDefault() ? retTrue : retFalse;
	  } else if ('returnValue' in nativeEvent) {
	    isDefaultPrevented = nativeEvent.returnValue === FALSE ? retTrue : retFalse;
	  }

	  this.isDefaultPrevented = isDefaultPrevented;

	  var fixFns = [];
	  var fixFn = void 0;
	  var l = void 0;
	  var prop = void 0;
	  var props = commonProps.concat();

	  eventNormalizers.forEach(function (normalizer) {
	    if (type.match(normalizer.reg)) {
	      props = props.concat(normalizer.props);
	      if (normalizer.fix) {
	        fixFns.push(normalizer.fix);
	      }
	    }
	  });

	  l = props.length;

	  // clone properties of the original event object
	  while (l) {
	    prop = props[--l];
	    this[prop] = nativeEvent[prop];
	  }

	  // fix target property, if necessary
	  if (!this.target && isNative) {
	    this.target = nativeEvent.srcElement || document; // srcElement might not be defined either
	  }

	  // check if target is a text node (safari)
	  if (this.target && this.target.nodeType === 3) {
	    this.target = this.target.parentNode;
	  }

	  l = fixFns.length;

	  while (l) {
	    fixFn = fixFns[--l];
	    fixFn(this, nativeEvent);
	  }

	  this.timeStamp = nativeEvent.timeStamp || Date.now();
	}

	var EventBaseObjectProto = _EventBaseObject2["default"].prototype;

	(0, _objectAssign2["default"])(DomEventObject.prototype, EventBaseObjectProto, {
	  constructor: DomEventObject,

	  preventDefault: function preventDefault() {
	    var e = this.nativeEvent;

	    // if preventDefault exists run it on the original event
	    if (e.preventDefault) {
	      e.preventDefault();
	    } else {
	      // otherwise set the returnValue property of the original event to FALSE (IE)
	      e.returnValue = FALSE;
	    }

	    EventBaseObjectProto.preventDefault.call(this);
	  },
	  stopPropagation: function stopPropagation() {
	    var e = this.nativeEvent;

	    // if stopPropagation exists run it on the original event
	    if (e.stopPropagation) {
	      e.stopPropagation();
	    } else {
	      // otherwise set the cancelBubble property of the original event to TRUE (IE)
	      e.cancelBubble = TRUE;
	    }

	    EventBaseObjectProto.stopPropagation.call(this);
	  }
	});

	exports["default"] = DomEventObject;
	module.exports = exports['default'];

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = addEventListener;

	var _EventObject = __webpack_require__(146);

	var _EventObject2 = _interopRequireDefault(_EventObject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function addEventListener(target, eventType, callback) {
	  function wrapCallback(e) {
	    var ne = new _EventObject2["default"](e);
	    callback.call(target, ne);
	  }

	  if (target.addEventListener) {
	    target.addEventListener(eventType, wrapCallback, false);
	    return {
	      remove: function remove() {
	        target.removeEventListener(eventType, wrapCallback, false);
	      }
	    };
	  } else if (target.attachEvent) {
	    target.attachEvent('on' + eventType, wrapCallback);
	    return {
	      remove: function remove() {
	        target.detachEvent('on' + eventType, wrapCallback);
	      }
	    };
	  }
	}
	module.exports = exports['default'];

/***/ }),
/* 148 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 149 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports['default'] = isFlexSupported;
	function isFlexSupported() {
	    if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
	        var documentElement = window.document.documentElement;

	        return 'flex' in documentElement.style || 'webkitFlex' in documentElement.style || 'Flex' in documentElement.style || 'msFlex' in documentElement.style;
	    }
	    return false;
	}
	module.exports = exports['default'];

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _cssAnimation = __webpack_require__(98);

	var _cssAnimation2 = _interopRequireDefault(_cssAnimation);

	var _getRequestAnimationFrame = __webpack_require__(136);

	var _getRequestAnimationFrame2 = _interopRequireDefault(_getRequestAnimationFrame);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var reqAnimFrame = (0, _getRequestAnimationFrame2['default'])();
	function animate(node, show, done) {
	    var height = void 0;
	    var requestAnimationFrameId = void 0;
	    return (0, _cssAnimation2['default'])(node, 'ant-motion-collapse', {
	        start: function start() {
	            if (!show) {
	                node.style.height = node.offsetHeight + 'px';
	                node.style.opacity = 1;
	            } else {
	                height = node.offsetHeight;
	                node.style.height = 0;
	                node.style.opacity = 0;
	            }
	        },
	        active: function active() {
	            if (requestAnimationFrameId) {
	                (0, _getRequestAnimationFrame.cancelRequestAnimationFrame)(requestAnimationFrameId);
	            }
	            requestAnimationFrameId = reqAnimFrame(function () {
	                node.style.height = (show ? height : 0) + 'px';
	                node.style.opacity = show ? 1 : 0;
	            });
	        },
	        end: function end() {
	            if (requestAnimationFrameId) {
	                (0, _getRequestAnimationFrame.cancelRequestAnimationFrame)(requestAnimationFrameId);
	            }
	            node.style.height = '';
	            node.style.opacity = '';
	            done();
	        }
	    });
	}
	var animation = {
	    enter: function enter(node, done) {
	        return animate(node, true, done);
	    },
	    leave: function leave(node, done) {
	        return animate(node, false, done);
	    },
	    appear: function appear(node, done) {
	        return animate(node, true, done);
	    }
	};
	exports['default'] = animation;
	module.exports = exports['default'];

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	var _defineProperty2 = __webpack_require__(23);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(20);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var __rest = undefined && undefined.__rest || function (s, e) {
	    var t = {};
	    for (var p in s) {
	        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
	    }return t;
	};

	var ButtonGroup = function ButtonGroup(props) {
	    var _props$prefixCls = props.prefixCls,
	        prefixCls = _props$prefixCls === undefined ? 'ant-btn-group' : _props$prefixCls,
	        size = props.size,
	        className = props.className,
	        others = __rest(props, ["prefixCls", "size", "className"]);
	    // large => lg
	    // small => sm


	    var sizeCls = '';
	    switch (size) {
	        case 'large':
	            sizeCls = 'lg';
	            break;
	        case 'small':
	            sizeCls = 'sm';
	        default:
	            break;
	    }
	    var classes = (0, _classnames2['default'])(prefixCls, (0, _defineProperty3['default'])({}, prefixCls + '-' + sizeCls, sizeCls), className);
	    return _react2['default'].createElement('div', (0, _extends3['default'])({}, others, { className: classes }));
	};
	exports['default'] = ButtonGroup;
	module.exports = exports['default'];

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	var _defineProperty2 = __webpack_require__(23);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _classCallCheck2 = __webpack_require__(7);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(25);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(12);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(11);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(21);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(20);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _omit = __webpack_require__(87);

	var _omit2 = _interopRequireDefault(_omit);

	var _icon = __webpack_require__(89);

	var _icon2 = _interopRequireDefault(_icon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var __rest = undefined && undefined.__rest || function (s, e) {
	    var t = {};
	    for (var p in s) {
	        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
	    }return t;
	};

	var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
	var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
	function isString(str) {
	    return typeof str === 'string';
	}
	// Insert one space between two chinese characters automatically.
	function insertSpace(child, needInserted) {
	    // Check the child if is undefined or null.
	    if (child == null) {
	        return;
	    }
	    var SPACE = needInserted ? ' ' : '';
	    // strictNullChecks oops.
	    if (typeof child !== 'string' && typeof child !== 'number' && isString(child.type) && isTwoCNChar(child.props.children)) {
	        return _react2['default'].cloneElement(child, {}, child.props.children.split('').join(SPACE));
	    }
	    if (typeof child === 'string') {
	        if (isTwoCNChar(child)) {
	            child = child.split('').join(SPACE);
	        }
	        return _react2['default'].createElement(
	            'span',
	            null,
	            child
	        );
	    }
	    return child;
	}

	var Button = function (_React$Component) {
	    (0, _inherits3['default'])(Button, _React$Component);

	    function Button(props) {
	        (0, _classCallCheck3['default'])(this, Button);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

	        _this.handleClick = function (e) {
	            // Add click effect
	            _this.setState({ clicked: true });
	            clearTimeout(_this.timeout);
	            _this.timeout = setTimeout(function () {
	                return _this.setState({ clicked: false });
	            }, 500);
	            var onClick = _this.props.onClick;
	            if (onClick) {
	                onClick(e);
	            }
	        };
	        _this.state = {
	            loading: props.loading,
	            clicked: false
	        };
	        return _this;
	    }

	    (0, _createClass3['default'])(Button, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            var _this2 = this;

	            var currentLoading = this.props.loading;
	            var loading = nextProps.loading;
	            if (currentLoading) {
	                clearTimeout(this.delayTimeout);
	            }
	            if (typeof loading !== 'boolean' && loading && loading.delay) {
	                this.delayTimeout = setTimeout(function () {
	                    return _this2.setState({ loading: loading });
	                }, loading.delay);
	            } else {
	                this.setState({ loading: loading });
	            }
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            if (this.timeout) {
	                clearTimeout(this.timeout);
	            }
	            if (this.delayTimeout) {
	                clearTimeout(this.delayTimeout);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _classNames;

	            var _a = this.props,
	                type = _a.type,
	                shape = _a.shape,
	                size = _a.size,
	                className = _a.className,
	                htmlType = _a.htmlType,
	                children = _a.children,
	                icon = _a.icon,
	                prefixCls = _a.prefixCls,
	                ghost = _a.ghost,
	                others = __rest(_a, ["type", "shape", "size", "className", "htmlType", "children", "icon", "prefixCls", "ghost"]);var _state = this.state,
	                loading = _state.loading,
	                clicked = _state.clicked;
	            // large => lg
	            // small => sm

	            var sizeCls = '';
	            switch (size) {
	                case 'large':
	                    sizeCls = 'lg';
	                    break;
	                case 'small':
	                    sizeCls = 'sm';
	                default:
	                    break;
	            }
	            var classes = (0, _classnames2['default'])(prefixCls, className, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + type, type), (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + shape, shape), (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + sizeCls, sizeCls), (0, _defineProperty3['default'])(_classNames, prefixCls + '-icon-only', !children && icon), (0, _defineProperty3['default'])(_classNames, prefixCls + '-loading', loading), (0, _defineProperty3['default'])(_classNames, prefixCls + '-clicked', clicked), (0, _defineProperty3['default'])(_classNames, prefixCls + '-background-ghost', ghost), _classNames));
	            var iconType = loading ? 'loading' : icon;
	            var iconNode = iconType ? _react2['default'].createElement(_icon2['default'], { type: iconType }) : null;
	            var needInserted = _react2['default'].Children.count(children) === 1 && (!iconType || iconType === 'loading');
	            var kids = _react2['default'].Children.map(children, function (child) {
	                return insertSpace(child, needInserted);
	            });
	            return _react2['default'].createElement(
	                'button',
	                (0, _extends3['default'])({}, (0, _omit2['default'])(others, ['loading']), { type: htmlType || 'button', className: classes, onClick: this.handleClick }),
	                iconNode,
	                kids
	            );
	        }
	    }]);
	    return Button;
	}(_react2['default'].Component);

	exports['default'] = Button;

	Button.__ANT_BUTTON = true;
	Button.defaultProps = {
	    prefixCls: 'ant-btn',
	    loading: false,
	    ghost: false
	};
	Button.propTypes = {
	    type: _propTypes2['default'].string,
	    shape: _propTypes2['default'].oneOf(['circle', 'circle-outline']),
	    size: _propTypes2['default'].oneOf(['large', 'default', 'small']),
	    htmlType: _propTypes2['default'].oneOf(['submit', 'button', 'reset']),
	    onClick: _propTypes2['default'].func,
	    loading: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].object]),
	    className: _propTypes2['default'].string,
	    icon: _propTypes2['default'].string
	};
	module.exports = exports['default'];

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _toConsumableArray2 = __webpack_require__(109);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _classCallCheck2 = __webpack_require__(7);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(25);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(12);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(11);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(21);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(20);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _shallowequal = __webpack_require__(134);

	var _shallowequal2 = _interopRequireDefault(_shallowequal);

	var _Checkbox = __webpack_require__(113);

	var _Checkbox2 = _interopRequireDefault(_Checkbox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var CheckboxGroup = function (_React$Component) {
	    (0, _inherits3['default'])(CheckboxGroup, _React$Component);

	    function CheckboxGroup(props) {
	        (0, _classCallCheck3['default'])(this, CheckboxGroup);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (CheckboxGroup.__proto__ || Object.getPrototypeOf(CheckboxGroup)).call(this, props));

	        _this.toggleOption = function (option) {
	            var optionIndex = _this.state.value.indexOf(option.value);
	            var value = [].concat((0, _toConsumableArray3['default'])(_this.state.value));
	            if (optionIndex === -1) {
	                value.push(option.value);
	            } else {
	                value.splice(optionIndex, 1);
	            }
	            if (!('value' in _this.props)) {
	                _this.setState({ value: value });
	            }
	            var onChange = _this.props.onChange;
	            if (onChange) {
	                onChange(value);
	            }
	        };
	        _this.state = {
	            value: props.value || props.defaultValue || []
	        };
	        return _this;
	    }

	    (0, _createClass3['default'])(CheckboxGroup, [{
	        key: 'getChildContext',
	        value: function getChildContext() {
	            return {
	                checkboxGroup: {
	                    toggleOption: this.toggleOption,
	                    value: this.state.value,
	                    disabled: this.props.disabled
	                }
	            };
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            if ('value' in nextProps) {
	                this.setState({
	                    value: nextProps.value || []
	                });
	            }
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps, nextState) {
	            return !(0, _shallowequal2['default'])(this.props, nextProps) || !(0, _shallowequal2['default'])(this.state, nextState);
	        }
	    }, {
	        key: 'getOptions',
	        value: function getOptions() {
	            var options = this.props.options;
	            // https://github.com/Microsoft/TypeScript/issues/7960

	            return options.map(function (option) {
	                if (typeof option === 'string') {
	                    return {
	                        label: option,
	                        value: option
	                    };
	                }
	                return option;
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var props = this.props,
	                state = this.state;
	            var prefixCls = props.prefixCls,
	                className = props.className,
	                options = props.options;

	            var children = props.children;
	            if (options && options.length > 0) {
	                children = this.getOptions().map(function (option) {
	                    return _react2['default'].createElement(
	                        _Checkbox2['default'],
	                        { key: option.value, disabled: 'disabled' in option ? option.disabled : props.disabled, value: option.value, checked: state.value.indexOf(option.value) !== -1, onChange: function onChange() {
	                                return _this2.toggleOption(option);
	                            }, className: prefixCls + '-item' },
	                        option.label
	                    );
	                });
	            }
	            var classString = (0, _classnames2['default'])(prefixCls, className);
	            return _react2['default'].createElement(
	                'div',
	                { className: classString },
	                children
	            );
	        }
	    }]);
	    return CheckboxGroup;
	}(_react2['default'].Component);

	exports['default'] = CheckboxGroup;

	CheckboxGroup.defaultProps = {
	    options: [],
	    prefixCls: 'ant-checkbox-group'
	};
	CheckboxGroup.propTypes = {
	    defaultValue: _propTypes2['default'].array,
	    value: _propTypes2['default'].array,
	    options: _propTypes2['default'].array.isRequired,
	    onChange: _propTypes2['default'].func
	};
	CheckboxGroup.childContextTypes = {
	    checkboxGroup: _propTypes2['default'].any
	};
	module.exports = exports['default'];

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Checkbox = __webpack_require__(113);

	var _Checkbox2 = _interopRequireDefault(_Checkbox);

	var _Group = __webpack_require__(153);

	var _Group2 = _interopRequireDefault(_Group);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	_Checkbox2['default'].Group = _Group2['default'];
	exports['default'] = _Checkbox2['default'];
	module.exports = exports['default'];

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(84);

	__webpack_require__(175);

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _defineProperty2 = __webpack_require__(23);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(20);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var Group = function Group(props) {
	    var _classNames;

	    var _props$prefixCls = props.prefixCls,
	        prefixCls = _props$prefixCls === undefined ? 'ant-input-group' : _props$prefixCls,
	        _props$className = props.className,
	        className = _props$className === undefined ? '' : _props$className;

	    var cls = (0, _classnames2['default'])(prefixCls, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-lg', props.size === 'large'), (0, _defineProperty3['default'])(_classNames, prefixCls + '-sm', props.size === 'small'), (0, _defineProperty3['default'])(_classNames, prefixCls + '-compact', props.compact), _classNames), className);
	    return _react2['default'].createElement(
	        'span',
	        { className: cls, style: props.style },
	        props.children
	    );
	};
	exports['default'] = Group;
	module.exports = exports['default'];

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	var _classCallCheck2 = __webpack_require__(7);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(25);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(12);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(11);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(20);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _Input = __webpack_require__(114);

	var _Input2 = _interopRequireDefault(_Input);

	var _icon = __webpack_require__(89);

	var _icon2 = _interopRequireDefault(_icon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var __rest = undefined && undefined.__rest || function (s, e) {
	    var t = {};
	    for (var p in s) {
	        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
	    }return t;
	};

	var Search = function (_React$Component) {
	    (0, _inherits3['default'])(Search, _React$Component);

	    function Search() {
	        (0, _classCallCheck3['default'])(this, Search);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (Search.__proto__ || Object.getPrototypeOf(Search)).apply(this, arguments));

	        _this.onSearch = function () {
	            var onSearch = _this.props.onSearch;

	            if (onSearch) {
	                onSearch(_this.input.refs.input.value);
	            }
	            _this.input.focus();
	        };
	        return _this;
	    }

	    (0, _createClass3['default'])(Search, [{
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var _a = this.props,
	                className = _a.className,
	                inputPrefixCls = _a.inputPrefixCls,
	                prefixCls = _a.prefixCls,
	                suffix = _a.suffix,
	                others = __rest(_a, ["className", "inputPrefixCls", "prefixCls", "suffix"]);
	            delete others.onSearch;
	            var searchIcon = _react2['default'].createElement(_icon2['default'], { className: prefixCls + '-icon', onClick: this.onSearch, type: 'search', key: 'searchIcon' });
	            var searchSuffix = suffix ? [suffix, searchIcon] : searchIcon;
	            return _react2['default'].createElement(_Input2['default'], (0, _extends3['default'])({ onPressEnter: this.onSearch }, others, { className: (0, _classnames2['default'])(prefixCls, className), prefixCls: inputPrefixCls, suffix: searchSuffix, ref: function ref(node) {
	                    return _this2.input = node;
	                } }));
	        }
	    }]);
	    return Search;
	}(_react2['default'].Component);

	exports['default'] = Search;

	Search.defaultProps = {
	    inputPrefixCls: 'ant-input',
	    prefixCls: 'ant-input-search'
	};
	module.exports = exports['default'];

/***/ }),
/* 158 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports['default'] = calculateNodeHeight;
	// Thanks to https://github.com/andreypopp/react-textarea-autosize/
	/**
	 * calculateNodeHeight(uiTextNode, useCache = false)
	 */
	var HIDDEN_TEXTAREA_STYLE = '\n  min-height:0 !important;\n  max-height:none !important;\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n';
	var SIZING_STYLE = ['letter-spacing', 'line-height', 'padding-top', 'padding-bottom', 'font-family', 'font-weight', 'font-size', 'text-rendering', 'text-transform', 'width', 'text-indent', 'padding-left', 'padding-right', 'border-width', 'box-sizing'];
	var computedStyleCache = {};
	var hiddenTextarea = void 0;
	function calculateNodeStyling(node) {
	    var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	    var nodeRef = node.getAttribute('id') || node.getAttribute('data-reactid') || node.getAttribute('name');
	    if (useCache && computedStyleCache[nodeRef]) {
	        return computedStyleCache[nodeRef];
	    }
	    var style = window.getComputedStyle(node);
	    var boxSizing = style.getPropertyValue('box-sizing') || style.getPropertyValue('-moz-box-sizing') || style.getPropertyValue('-webkit-box-sizing');
	    var paddingSize = parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top'));
	    var borderSize = parseFloat(style.getPropertyValue('border-bottom-width')) + parseFloat(style.getPropertyValue('border-top-width'));
	    var sizingStyle = SIZING_STYLE.map(function (name) {
	        return name + ':' + style.getPropertyValue(name);
	    }).join(';');
	    var nodeInfo = {
	        sizingStyle: sizingStyle,
	        paddingSize: paddingSize,
	        borderSize: borderSize,
	        boxSizing: boxSizing
	    };
	    if (useCache && nodeRef) {
	        computedStyleCache[nodeRef] = nodeInfo;
	    }
	    return nodeInfo;
	}
	function calculateNodeHeight(uiTextNode) {
	    var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    var minRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	    var maxRows = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

	    if (!hiddenTextarea) {
	        hiddenTextarea = document.createElement('textarea');
	        document.body.appendChild(hiddenTextarea);
	    }
	    // Fix wrap="off" issue
	    // https://github.com/ant-design/ant-design/issues/6577
	    if (uiTextNode.getAttribute('wrap')) {
	        hiddenTextarea.setAttribute('wrap', uiTextNode.getAttribute('wrap'));
	    } else {
	        hiddenTextarea.removeAttribute('wrap');
	    }
	    // Copy all CSS properties that have an impact on the height of the content in
	    // the textbox

	    var _calculateNodeStyling = calculateNodeStyling(uiTextNode, useCache),
	        paddingSize = _calculateNodeStyling.paddingSize,
	        borderSize = _calculateNodeStyling.borderSize,
	        boxSizing = _calculateNodeStyling.boxSizing,
	        sizingStyle = _calculateNodeStyling.sizingStyle;
	    // Need to have the overflow attribute to hide the scrollbar otherwise
	    // text-lines will not calculated properly as the shadow will technically be
	    // narrower for content


	    hiddenTextarea.setAttribute('style', sizingStyle + ';' + HIDDEN_TEXTAREA_STYLE);
	    hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || '';
	    var minHeight = -Infinity;
	    var maxHeight = Infinity;
	    var height = hiddenTextarea.scrollHeight;
	    var overflowY = void 0;
	    if (boxSizing === 'border-box') {
	        // border-box: add border, since height = content + padding + border
	        height = height + borderSize;
	    } else if (boxSizing === 'content-box') {
	        // remove padding, since height = content
	        height = height - paddingSize;
	    }
	    if (minRows !== null || maxRows !== null) {
	        // measure height of a textarea with a single row
	        hiddenTextarea.value = '';
	        var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
	        if (minRows !== null) {
	            minHeight = singleRowHeight * minRows;
	            if (boxSizing === 'border-box') {
	                minHeight = minHeight + paddingSize + borderSize;
	            }
	            height = Math.max(minHeight, height);
	        }
	        if (maxRows !== null) {
	            maxHeight = singleRowHeight * maxRows;
	            if (boxSizing === 'border-box') {
	                maxHeight = maxHeight + paddingSize + borderSize;
	            }
	            overflowY = height > maxHeight ? '' : 'hidden';
	            height = Math.min(maxHeight, height);
	        }
	    }
	    // Remove scroll bar flash when autosize without maxRows
	    if (!maxRows) {
	        overflowY = 'hidden';
	    }
	    return { height: height, minHeight: minHeight, maxHeight: maxHeight, overflowY: overflowY };
	}
	module.exports = exports['default'];

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	var _defineProperty2 = __webpack_require__(23);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _typeof2 = __webpack_require__(27);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _classCallCheck2 = __webpack_require__(7);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(25);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(12);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(11);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(85);

	var _rcTabs = __webpack_require__(196);

	var _rcTabs2 = _interopRequireDefault(_rcTabs);

	var _ScrollableInkTabBar = __webpack_require__(192);

	var _ScrollableInkTabBar2 = _interopRequireDefault(_ScrollableInkTabBar);

	var _TabContent = __webpack_require__(132);

	var _TabContent2 = _interopRequireDefault(_TabContent);

	var _classnames = __webpack_require__(20);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _icon = __webpack_require__(89);

	var _icon2 = _interopRequireDefault(_icon);

	var _warning = __webpack_require__(112);

	var _warning2 = _interopRequireDefault(_warning);

	var _isFlexSupported = __webpack_require__(149);

	var _isFlexSupported2 = _interopRequireDefault(_isFlexSupported);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var Tabs = function (_React$Component) {
	    (0, _inherits3['default'])(Tabs, _React$Component);

	    function Tabs() {
	        (0, _classCallCheck3['default'])(this, Tabs);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).apply(this, arguments));

	        _this.createNewTab = function (targetKey) {
	            var onEdit = _this.props.onEdit;
	            if (onEdit) {
	                onEdit(targetKey, 'add');
	            }
	        };
	        _this.removeTab = function (targetKey, e) {
	            e.stopPropagation();
	            if (!targetKey) {
	                return;
	            }
	            var onEdit = _this.props.onEdit;
	            if (onEdit) {
	                onEdit(targetKey, 'remove');
	            }
	        };
	        _this.handleChange = function (activeKey) {
	            var onChange = _this.props.onChange;
	            if (onChange) {
	                onChange(activeKey);
	            }
	        };
	        return _this;
	    }

	    (0, _createClass3['default'])(Tabs, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var NO_FLEX = ' no-flex';
	            var tabNode = (0, _reactDom.findDOMNode)(this);
	            if (tabNode && !(0, _isFlexSupported2['default'])() && tabNode.className.indexOf(NO_FLEX) === -1) {
	                tabNode.className += NO_FLEX;
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _classNames,
	                _this2 = this;

	            var _props = this.props,
	                prefixCls = _props.prefixCls,
	                _props$className = _props.className,
	                className = _props$className === undefined ? '' : _props$className,
	                size = _props.size,
	                _props$type = _props.type,
	                type = _props$type === undefined ? 'line' : _props$type,
	                tabPosition = _props.tabPosition,
	                children = _props.children,
	                tabBarExtraContent = _props.tabBarExtraContent,
	                tabBarStyle = _props.tabBarStyle,
	                hideAdd = _props.hideAdd,
	                onTabClick = _props.onTabClick,
	                onPrevClick = _props.onPrevClick,
	                onNextClick = _props.onNextClick,
	                _props$animated = _props.animated,
	                animated = _props$animated === undefined ? true : _props$animated;

	            var _ref = (typeof animated === 'undefined' ? 'undefined' : (0, _typeof3['default'])(animated)) === 'object' ? {
	                inkBarAnimated: animated.inkBar, tabPaneAnimated: animated.tabPane
	            } : {
	                inkBarAnimated: animated, tabPaneAnimated: animated
	            },
	                inkBarAnimated = _ref.inkBarAnimated,
	                tabPaneAnimated = _ref.tabPaneAnimated;
	            // card tabs should not have animation


	            if (type !== 'line') {
	                tabPaneAnimated = 'animated' in this.props ? tabPaneAnimated : false;
	            }
	            (0, _warning2['default'])(!(type.indexOf('card') >= 0 && size === 'small'), 'Tabs[type=card|editable-card] doesn\'t have small size, it\'s by designed.');
	            var cls = (0, _classnames2['default'])(className, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-mini', size === 'small' || size === 'mini'), (0, _defineProperty3['default'])(_classNames, prefixCls + '-vertical', tabPosition === 'left' || tabPosition === 'right'), (0, _defineProperty3['default'])(_classNames, prefixCls + '-card', type.indexOf('card') >= 0), (0, _defineProperty3['default'])(_classNames, prefixCls + '-' + type, true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-no-animation', !tabPaneAnimated), _classNames));
	            // only card type tabs can be added and closed
	            var childrenWithClose = void 0;
	            if (type === 'editable-card') {
	                childrenWithClose = [];
	                _react2['default'].Children.forEach(children, function (child, index) {
	                    var closable = child.props.closable;
	                    closable = typeof closable === 'undefined' ? true : closable;
	                    var closeIcon = closable ? _react2['default'].createElement(_icon2['default'], { type: 'close', onClick: function onClick(e) {
	                            return _this2.removeTab(child.key, e);
	                        } }) : null;
	                    childrenWithClose.push((0, _react.cloneElement)(child, {
	                        tab: _react2['default'].createElement(
	                            'div',
	                            { className: closable ? undefined : prefixCls + '-tab-unclosable' },
	                            child.props.tab,
	                            closeIcon
	                        ),
	                        key: child.key || index
	                    }));
	                });
	                // Add new tab handler
	                if (!hideAdd) {
	                    tabBarExtraContent = _react2['default'].createElement(
	                        'span',
	                        null,
	                        _react2['default'].createElement(_icon2['default'], { type: 'plus', className: prefixCls + '-new-tab', onClick: this.createNewTab }),
	                        tabBarExtraContent
	                    );
	                }
	            }
	            tabBarExtraContent = tabBarExtraContent ? _react2['default'].createElement(
	                'div',
	                { className: prefixCls + '-extra-content' },
	                tabBarExtraContent
	            ) : null;
	            var renderTabBar = function renderTabBar() {
	                return _react2['default'].createElement(_ScrollableInkTabBar2['default'], { inkBarAnimated: inkBarAnimated, extraContent: tabBarExtraContent, onTabClick: onTabClick, onPrevClick: onPrevClick, onNextClick: onNextClick, style: tabBarStyle });
	            };
	            return _react2['default'].createElement(
	                _rcTabs2['default'],
	                (0, _extends3['default'])({}, this.props, { className: cls, tabBarPosition: tabPosition, renderTabBar: renderTabBar, renderTabContent: function renderTabContent() {
	                        return _react2['default'].createElement(_TabContent2['default'], { animated: tabPaneAnimated, animatedWithMargin: true });
	                    }, onChange: this.handleChange }),
	                childrenWithClose || children
	            );
	        }
	    }]);
	    return Tabs;
	}(_react2['default'].Component);

	exports['default'] = Tabs;

	Tabs.TabPane = _rcTabs.TabPane;
	Tabs.defaultProps = {
	    prefixCls: 'ant-tabs',
	    hideAdd: false
	};
	module.exports = exports['default'];

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(84);

	__webpack_require__(177);

/***/ }),
/* 161 */,
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(163), __esModule: true };

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(52);
	__webpack_require__(171);
	module.exports = __webpack_require__(4).Array.from;


/***/ }),
/* 164 */,
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(39);
	var TAG = __webpack_require__(5)('toStringTag');
	// ES3 wrong here
	var ARG = cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	module.exports = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(6);
	var createDesc = __webpack_require__(18);

	module.exports = function (object, index, value) {
	  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators = __webpack_require__(24);
	var ITERATOR = __webpack_require__(5)('iterator');
	var ArrayProto = Array.prototype;

	module.exports = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(13);
	module.exports = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

	var ITERATOR = __webpack_require__(5)('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(riter, function () { throw 2; });
	} catch (e) { /* empty */ }

	module.exports = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

	var classof = __webpack_require__(165);
	var ITERATOR = __webpack_require__(5)('iterator');
	var Iterators = __webpack_require__(24);
	module.exports = __webpack_require__(4).getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var ctx = __webpack_require__(40);
	var $export = __webpack_require__(14);
	var toObject = __webpack_require__(49);
	var call = __webpack_require__(168);
	var isArrayIter = __webpack_require__(167);
	var toLength = __webpack_require__(51);
	var createProperty = __webpack_require__(166);
	var getIterFn = __webpack_require__(170);

	$export($export.S + $export.F * !__webpack_require__(169)(function (iter) { Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = getIterFn(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var _assign = __webpack_require__(173);

	var emptyObject = __webpack_require__(178);
	var _invariant = __webpack_require__(92);

	if (true) {
	  var warning = __webpack_require__(93);
	}

	var MIXINS_KEY = 'mixins';

	// Helper function to allow the creation of anonymous functions which do not
	// have .name set to the name of the variable being assigned to.
	function identity(fn) {
	  return fn;
	}

	var ReactPropTypeLocationNames;
	if (true) {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	} else {
	  ReactPropTypeLocationNames = {};
	}

	function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
	  /**
	   * Policies that describe methods in `ReactClassInterface`.
	   */

	  var injectedMixins = [];

	  /**
	   * Composite components are higher-level components that compose other composite
	   * or host components.
	   *
	   * To create a new type of `ReactClass`, pass a specification of
	   * your new class to `React.createClass`. The only requirement of your class
	   * specification is that you implement a `render` method.
	   *
	   *   var MyComponent = React.createClass({
	   *     render: function() {
	   *       return <div>Hello World</div>;
	   *     }
	   *   });
	   *
	   * The class specification supports a specific protocol of methods that have
	   * special meaning (e.g. `render`). See `ReactClassInterface` for
	   * more the comprehensive protocol. Any other properties and methods in the
	   * class specification will be available on the prototype.
	   *
	   * @interface ReactClassInterface
	   * @internal
	   */
	  var ReactClassInterface = {
	    /**
	     * An array of Mixin objects to include when defining your component.
	     *
	     * @type {array}
	     * @optional
	     */
	    mixins: 'DEFINE_MANY',

	    /**
	     * An object containing properties and methods that should be defined on
	     * the component's constructor instead of its prototype (static methods).
	     *
	     * @type {object}
	     * @optional
	     */
	    statics: 'DEFINE_MANY',

	    /**
	     * Definition of prop types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    propTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    contextTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types this component sets for its children.
	     *
	     * @type {object}
	     * @optional
	     */
	    childContextTypes: 'DEFINE_MANY',

	    // ==== Definition methods ====

	    /**
	     * Invoked when the component is mounted. Values in the mapping will be set on
	     * `this.props` if that prop is not specified (i.e. using an `in` check).
	     *
	     * This method is invoked before `getInitialState` and therefore cannot rely
	     * on `this.state` or use `this.setState`.
	     *
	     * @return {object}
	     * @optional
	     */
	    getDefaultProps: 'DEFINE_MANY_MERGED',

	    /**
	     * Invoked once before the component is mounted. The return value will be used
	     * as the initial value of `this.state`.
	     *
	     *   getInitialState: function() {
	     *     return {
	     *       isOn: false,
	     *       fooBaz: new BazFoo()
	     *     }
	     *   }
	     *
	     * @return {object}
	     * @optional
	     */
	    getInitialState: 'DEFINE_MANY_MERGED',

	    /**
	     * @return {object}
	     * @optional
	     */
	    getChildContext: 'DEFINE_MANY_MERGED',

	    /**
	     * Uses props from `this.props` and state from `this.state` to render the
	     * structure of the component.
	     *
	     * No guarantees are made about when or how often this method is invoked, so
	     * it must not have side effects.
	     *
	     *   render: function() {
	     *     var name = this.props.name;
	     *     return <div>Hello, {name}!</div>;
	     *   }
	     *
	     * @return {ReactComponent}
	     * @required
	     */
	    render: 'DEFINE_ONCE',

	    // ==== Delegate methods ====

	    /**
	     * Invoked when the component is initially created and about to be mounted.
	     * This may have side effects, but any external subscriptions or data created
	     * by this method must be cleaned up in `componentWillUnmount`.
	     *
	     * @optional
	     */
	    componentWillMount: 'DEFINE_MANY',

	    /**
	     * Invoked when the component has been mounted and has a DOM representation.
	     * However, there is no guarantee that the DOM node is in the document.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been mounted (initialized and rendered) for the first time.
	     *
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidMount: 'DEFINE_MANY',

	    /**
	     * Invoked before the component receives new props.
	     *
	     * Use this as an opportunity to react to a prop transition by updating the
	     * state using `this.setState`. Current props are accessed via `this.props`.
	     *
	     *   componentWillReceiveProps: function(nextProps, nextContext) {
	     *     this.setState({
	     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	     *     });
	     *   }
	     *
	     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	     * transition may cause a state change, but the opposite is not true. If you
	     * need it, you are probably looking for `componentWillUpdate`.
	     *
	     * @param {object} nextProps
	     * @optional
	     */
	    componentWillReceiveProps: 'DEFINE_MANY',

	    /**
	     * Invoked while deciding if the component should be updated as a result of
	     * receiving new props, state and/or context.
	     *
	     * Use this as an opportunity to `return false` when you're certain that the
	     * transition to the new props/state/context will not require a component
	     * update.
	     *
	     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	     *     return !equal(nextProps, this.props) ||
	     *       !equal(nextState, this.state) ||
	     *       !equal(nextContext, this.context);
	     *   }
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @return {boolean} True if the component should update.
	     * @optional
	     */
	    shouldComponentUpdate: 'DEFINE_ONCE',

	    /**
	     * Invoked when the component is about to update due to a transition from
	     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	     * and `nextContext`.
	     *
	     * Use this as an opportunity to perform preparation before an update occurs.
	     *
	     * NOTE: You **cannot** use `this.setState()` in this method.
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @param {ReactReconcileTransaction} transaction
	     * @optional
	     */
	    componentWillUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component's DOM representation has been updated.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been updated.
	     *
	     * @param {object} prevProps
	     * @param {?object} prevState
	     * @param {?object} prevContext
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component is about to be removed from its parent and have
	     * its DOM representation destroyed.
	     *
	     * Use this as an opportunity to deallocate any external resources.
	     *
	     * NOTE: There is no `componentDidUnmount` since your component will have been
	     * destroyed by that point.
	     *
	     * @optional
	     */
	    componentWillUnmount: 'DEFINE_MANY',

	    // ==== Advanced methods ====

	    /**
	     * Updates the component's currently mounted DOM representation.
	     *
	     * By default, this implements React's rendering and reconciliation algorithm.
	     * Sophisticated clients may wish to override this.
	     *
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     * @overridable
	     */
	    updateComponent: 'OVERRIDE_BASE'
	  };

	  /**
	   * Mapping from class specification keys to special processing functions.
	   *
	   * Although these are declared like instance properties in the specification
	   * when defining classes using `React.createClass`, they are actually static
	   * and are accessible on the constructor instead of the prototype. Despite
	   * being static, they must be defined outside of the "statics" key under
	   * which all other static methods are defined.
	   */
	  var RESERVED_SPEC_KEYS = {
	    displayName: function(Constructor, displayName) {
	      Constructor.displayName = displayName;
	    },
	    mixins: function(Constructor, mixins) {
	      if (mixins) {
	        for (var i = 0; i < mixins.length; i++) {
	          mixSpecIntoComponent(Constructor, mixins[i]);
	        }
	      }
	    },
	    childContextTypes: function(Constructor, childContextTypes) {
	      if (true) {
	        validateTypeDef(Constructor, childContextTypes, 'childContext');
	      }
	      Constructor.childContextTypes = _assign(
	        {},
	        Constructor.childContextTypes,
	        childContextTypes
	      );
	    },
	    contextTypes: function(Constructor, contextTypes) {
	      if (true) {
	        validateTypeDef(Constructor, contextTypes, 'context');
	      }
	      Constructor.contextTypes = _assign(
	        {},
	        Constructor.contextTypes,
	        contextTypes
	      );
	    },
	    /**
	     * Special case getDefaultProps which should move into statics but requires
	     * automatic merging.
	     */
	    getDefaultProps: function(Constructor, getDefaultProps) {
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps = createMergedResultFunction(
	          Constructor.getDefaultProps,
	          getDefaultProps
	        );
	      } else {
	        Constructor.getDefaultProps = getDefaultProps;
	      }
	    },
	    propTypes: function(Constructor, propTypes) {
	      if (true) {
	        validateTypeDef(Constructor, propTypes, 'prop');
	      }
	      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
	    },
	    statics: function(Constructor, statics) {
	      mixStaticSpecIntoComponent(Constructor, statics);
	    },
	    autobind: function() {}
	  };

	  function validateTypeDef(Constructor, typeDef, location) {
	    for (var propName in typeDef) {
	      if (typeDef.hasOwnProperty(propName)) {
	        // use a warning instead of an _invariant so components
	        // don't show up in prod but only in __DEV__
	        if (true) {
	          warning(
	            typeof typeDef[propName] === 'function',
	            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
	              'React.PropTypes.',
	            Constructor.displayName || 'ReactClass',
	            ReactPropTypeLocationNames[location],
	            propName
	          );
	        }
	      }
	    }
	  }

	  function validateMethodOverride(isAlreadyDefined, name) {
	    var specPolicy = ReactClassInterface.hasOwnProperty(name)
	      ? ReactClassInterface[name]
	      : null;

	    // Disallow overriding of base class methods unless explicitly allowed.
	    if (ReactClassMixin.hasOwnProperty(name)) {
	      _invariant(
	        specPolicy === 'OVERRIDE_BASE',
	        'ReactClassInterface: You are attempting to override ' +
	          '`%s` from your class specification. Ensure that your method names ' +
	          'do not overlap with React methods.',
	        name
	      );
	    }

	    // Disallow defining methods more than once unless explicitly allowed.
	    if (isAlreadyDefined) {
	      _invariant(
	        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
	        'ReactClassInterface: You are attempting to define ' +
	          '`%s` on your component more than once. This conflict may be due ' +
	          'to a mixin.',
	        name
	      );
	    }
	  }

	  /**
	   * Mixin helper which handles policy validation and reserved
	   * specification keys when building React classes.
	   */
	  function mixSpecIntoComponent(Constructor, spec) {
	    if (!spec) {
	      if (true) {
	        var typeofSpec = typeof spec;
	        var isMixinValid = typeofSpec === 'object' && spec !== null;

	        if (true) {
	          warning(
	            isMixinValid,
	            "%s: You're attempting to include a mixin that is either null " +
	              'or not an object. Check the mixins included by the component, ' +
	              'as well as any mixins they include themselves. ' +
	              'Expected object but got %s.',
	            Constructor.displayName || 'ReactClass',
	            spec === null ? null : typeofSpec
	          );
	        }
	      }

	      return;
	    }

	    _invariant(
	      typeof spec !== 'function',
	      "ReactClass: You're attempting to " +
	        'use a component class or function as a mixin. Instead, just use a ' +
	        'regular object.'
	    );
	    _invariant(
	      !isValidElement(spec),
	      "ReactClass: You're attempting to " +
	        'use a component as a mixin. Instead, just use a regular object.'
	    );

	    var proto = Constructor.prototype;
	    var autoBindPairs = proto.__reactAutoBindPairs;

	    // By handling mixins before any other properties, we ensure the same
	    // chaining order is applied to methods with DEFINE_MANY policy, whether
	    // mixins are listed before or after these methods in the spec.
	    if (spec.hasOwnProperty(MIXINS_KEY)) {
	      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	    }

	    for (var name in spec) {
	      if (!spec.hasOwnProperty(name)) {
	        continue;
	      }

	      if (name === MIXINS_KEY) {
	        // We have already handled mixins in a special case above.
	        continue;
	      }

	      var property = spec[name];
	      var isAlreadyDefined = proto.hasOwnProperty(name);
	      validateMethodOverride(isAlreadyDefined, name);

	      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	        RESERVED_SPEC_KEYS[name](Constructor, property);
	      } else {
	        // Setup methods on prototype:
	        // The following member methods should not be automatically bound:
	        // 1. Expected ReactClass methods (in the "interface").
	        // 2. Overridden methods (that were mixed in).
	        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	        var isFunction = typeof property === 'function';
	        var shouldAutoBind =
	          isFunction &&
	          !isReactClassMethod &&
	          !isAlreadyDefined &&
	          spec.autobind !== false;

	        if (shouldAutoBind) {
	          autoBindPairs.push(name, property);
	          proto[name] = property;
	        } else {
	          if (isAlreadyDefined) {
	            var specPolicy = ReactClassInterface[name];

	            // These cases should already be caught by validateMethodOverride.
	            _invariant(
	              isReactClassMethod &&
	                (specPolicy === 'DEFINE_MANY_MERGED' ||
	                  specPolicy === 'DEFINE_MANY'),
	              'ReactClass: Unexpected spec policy %s for key %s ' +
	                'when mixing in component specs.',
	              specPolicy,
	              name
	            );

	            // For methods which are defined more than once, call the existing
	            // methods before calling the new property, merging if appropriate.
	            if (specPolicy === 'DEFINE_MANY_MERGED') {
	              proto[name] = createMergedResultFunction(proto[name], property);
	            } else if (specPolicy === 'DEFINE_MANY') {
	              proto[name] = createChainedFunction(proto[name], property);
	            }
	          } else {
	            proto[name] = property;
	            if (true) {
	              // Add verbose displayName to the function, which helps when looking
	              // at profiling tools.
	              if (typeof property === 'function' && spec.displayName) {
	                proto[name].displayName = spec.displayName + '_' + name;
	              }
	            }
	          }
	        }
	      }
	    }
	  }

	  function mixStaticSpecIntoComponent(Constructor, statics) {
	    if (!statics) {
	      return;
	    }
	    for (var name in statics) {
	      var property = statics[name];
	      if (!statics.hasOwnProperty(name)) {
	        continue;
	      }

	      var isReserved = name in RESERVED_SPEC_KEYS;
	      _invariant(
	        !isReserved,
	        'ReactClass: You are attempting to define a reserved ' +
	          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
	          'as an instance property instead; it will still be accessible on the ' +
	          'constructor.',
	        name
	      );

	      var isInherited = name in Constructor;
	      _invariant(
	        !isInherited,
	        'ReactClass: You are attempting to define ' +
	          '`%s` on your component more than once. This conflict may be ' +
	          'due to a mixin.',
	        name
	      );
	      Constructor[name] = property;
	    }
	  }

	  /**
	   * Merge two objects, but throw if both contain the same key.
	   *
	   * @param {object} one The first object, which is mutated.
	   * @param {object} two The second object
	   * @return {object} one after it has been mutated to contain everything in two.
	   */
	  function mergeIntoWithNoDuplicateKeys(one, two) {
	    _invariant(
	      one && two && typeof one === 'object' && typeof two === 'object',
	      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
	    );

	    for (var key in two) {
	      if (two.hasOwnProperty(key)) {
	        _invariant(
	          one[key] === undefined,
	          'mergeIntoWithNoDuplicateKeys(): ' +
	            'Tried to merge two objects with the same key: `%s`. This conflict ' +
	            'may be due to a mixin; in particular, this may be caused by two ' +
	            'getInitialState() or getDefaultProps() methods returning objects ' +
	            'with clashing keys.',
	          key
	        );
	        one[key] = two[key];
	      }
	    }
	    return one;
	  }

	  /**
	   * Creates a function that invokes two functions and merges their return values.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createMergedResultFunction(one, two) {
	    return function mergedResult() {
	      var a = one.apply(this, arguments);
	      var b = two.apply(this, arguments);
	      if (a == null) {
	        return b;
	      } else if (b == null) {
	        return a;
	      }
	      var c = {};
	      mergeIntoWithNoDuplicateKeys(c, a);
	      mergeIntoWithNoDuplicateKeys(c, b);
	      return c;
	    };
	  }

	  /**
	   * Creates a function that invokes two functions and ignores their return vales.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createChainedFunction(one, two) {
	    return function chainedFunction() {
	      one.apply(this, arguments);
	      two.apply(this, arguments);
	    };
	  }

	  /**
	   * Binds a method to the component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   * @param {function} method Method to be bound.
	   * @return {function} The bound method.
	   */
	  function bindAutoBindMethod(component, method) {
	    var boundMethod = method.bind(component);
	    if (true) {
	      boundMethod.__reactBoundContext = component;
	      boundMethod.__reactBoundMethod = method;
	      boundMethod.__reactBoundArguments = null;
	      var componentName = component.constructor.displayName;
	      var _bind = boundMethod.bind;
	      boundMethod.bind = function(newThis) {
	        for (
	          var _len = arguments.length,
	            args = Array(_len > 1 ? _len - 1 : 0),
	            _key = 1;
	          _key < _len;
	          _key++
	        ) {
	          args[_key - 1] = arguments[_key];
	        }

	        // User is trying to bind() an autobound method; we effectively will
	        // ignore the value of "this" that the user is trying to use, so
	        // let's warn.
	        if (newThis !== component && newThis !== null) {
	          if (true) {
	            warning(
	              false,
	              'bind(): React component methods may only be bound to the ' +
	                'component instance. See %s',
	              componentName
	            );
	          }
	        } else if (!args.length) {
	          if (true) {
	            warning(
	              false,
	              'bind(): You are binding a component method to the component. ' +
	                'React does this for you automatically in a high-performance ' +
	                'way, so you can safely remove this call. See %s',
	              componentName
	            );
	          }
	          return boundMethod;
	        }
	        var reboundMethod = _bind.apply(boundMethod, arguments);
	        reboundMethod.__reactBoundContext = component;
	        reboundMethod.__reactBoundMethod = method;
	        reboundMethod.__reactBoundArguments = args;
	        return reboundMethod;
	      };
	    }
	    return boundMethod;
	  }

	  /**
	   * Binds all auto-bound methods in a component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   */
	  function bindAutoBindMethods(component) {
	    var pairs = component.__reactAutoBindPairs;
	    for (var i = 0; i < pairs.length; i += 2) {
	      var autoBindKey = pairs[i];
	      var method = pairs[i + 1];
	      component[autoBindKey] = bindAutoBindMethod(component, method);
	    }
	  }

	  var IsMountedPreMixin = {
	    componentDidMount: function() {
	      this.__isMounted = true;
	    }
	  };

	  var IsMountedPostMixin = {
	    componentWillUnmount: function() {
	      this.__isMounted = false;
	    }
	  };

	  /**
	   * Add more to the ReactClass base class. These are all legacy features and
	   * therefore not already part of the modern ReactComponent.
	   */
	  var ReactClassMixin = {
	    /**
	     * TODO: This will be deprecated because state should always keep a consistent
	     * type signature and the only use case for this, is to avoid that.
	     */
	    replaceState: function(newState, callback) {
	      this.updater.enqueueReplaceState(this, newState, callback);
	    },

	    /**
	     * Checks whether or not this composite component is mounted.
	     * @return {boolean} True if mounted, false otherwise.
	     * @protected
	     * @final
	     */
	    isMounted: function() {
	      if (true) {
	        warning(
	          this.__didWarnIsMounted,
	          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
	            'subscriptions and pending requests in componentWillUnmount to ' +
	            'prevent memory leaks.',
	          (this.constructor && this.constructor.displayName) ||
	            this.name ||
	            'Component'
	        );
	        this.__didWarnIsMounted = true;
	      }
	      return !!this.__isMounted;
	    }
	  };

	  var ReactClassComponent = function() {};
	  _assign(
	    ReactClassComponent.prototype,
	    ReactComponent.prototype,
	    ReactClassMixin
	  );

	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  function createClass(spec) {
	    // To keep our warnings more understandable, we'll use a little hack here to
	    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
	    // unnecessarily identify a class without displayName as 'Constructor'.
	    var Constructor = identity(function(props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.

	      if (true) {
	        warning(
	          this instanceof Constructor,
	          'Something is calling a React component directly. Use a factory or ' +
	            'JSX instead. See: https://fb.me/react-legacyfactory'
	        );
	      }

	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }

	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;

	      this.state = null;

	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.

	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (true) {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (
	          initialState === undefined &&
	          this.getInitialState._isMockFunction
	        ) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      _invariant(
	        typeof initialState === 'object' && !Array.isArray(initialState),
	        '%s.getInitialState(): must return an object or null',
	        Constructor.displayName || 'ReactCompositeComponent'
	      );

	      this.state = initialState;
	    });
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];

	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

	    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
	    mixSpecIntoComponent(Constructor, spec);
	    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    if (true) {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }

	    _invariant(
	      Constructor.prototype.render,
	      'createClass(...): Class specification must implement a `render` method.'
	    );

	    if (true) {
	      warning(
	        !Constructor.prototype.componentShouldUpdate,
	        '%s has a method called ' +
	          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
	          'The name is phrased as a question because the function is ' +
	          'expected to return a value.',
	        spec.displayName || 'A component'
	      );
	      warning(
	        !Constructor.prototype.componentWillRecieveProps,
	        '%s has a method called ' +
	          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
	        spec.displayName || 'A component'
	      );
	    }

	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }

	    return Constructor;
	  }

	  return createClass;
	}

	module.exports = factory;


/***/ }),
/* 173 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 174 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"ant-btn":"ant-btn___llYlK","anticon":"anticon___u6FnB","disabled":"disabled___3teWh","ant-btn-lg":"ant-btn-lg___3DVQS","ant-btn-sm":"ant-btn-sm___CuSJg","active":"active___1MLee","ant-btn-primary":"ant-btn-primary___3ExhH","ant-btn-group":"ant-btn-group___kXink","ant-btn-ghost":"ant-btn-ghost___3lbp7","ant-btn-dashed":"ant-btn-dashed___9_99c","ant-btn-danger":"ant-btn-danger___3-iVJ","ant-btn-circle":"ant-btn-circle___2HkqT","ant-btn-circle-outline":"ant-btn-circle-outline___3y9tk","ant-btn-loading":"ant-btn-loading___2YR5g","ant-btn-icon-only":"ant-btn-icon-only___24o7n","ant-btn-group-lg":"ant-btn-group-lg___BY9JI","ant-btn-group-sm":"ant-btn-group-sm___2n1z-","ant-btn-clicked":"ant-btn-clicked___1XHtr","buttonEffect":"buttonEffect___3JuDg","ant-btn-background-ghost":"ant-btn-background-ghost___Vas9S"};

/***/ }),
/* 175 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"ant-checkbox":"ant-checkbox___3qwGQ","ant-checkbox-wrapper":"ant-checkbox-wrapper___1UxIj","ant-checkbox-inner":"ant-checkbox-inner___3jrxg","ant-checkbox-input":"ant-checkbox-input___1eteT","ant-checkbox-checked":"ant-checkbox-checked___1XQK-","antCheckboxEffect":"antCheckboxEffect___2LU7L","ant-checkbox-indeterminate":"ant-checkbox-indeterminate___3SqKJ","ant-checkbox-disabled":"ant-checkbox-disabled___t6Gus","none":"none___l9gId","ant-checkbox-group":"ant-checkbox-group___72D7C","ant-checkbox-group-item":"ant-checkbox-group-item___1L82B"};

/***/ }),
/* 176 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"ant-input-search-icon":"ant-input-search-icon___3NIJH","ant-search-input-wrapper":"ant-search-input-wrapper___2oKzS","ant-search-input":"ant-search-input___3BDyo","ant-input-group":"ant-input-group___2TLgT","ant-input":"ant-input___1rBPa","ant-select":"ant-select___2hI0r","ant-search-btn":"ant-search-btn___vKVE7","active":"active___3Ig-h","disabled":"disabled___3-gid","ant-search-input-focus":"ant-search-input-focus___NGVDq","ant-search-btn-noempty":"ant-search-btn-noempty___C1r1K","ant-select-combobox":"ant-select-combobox___27Oop","ant-select-selection__rendered":"ant-select-selection__rendered___2QnXH","ant-input-disabled":"ant-input-disabled___1OoRa","ant-input-lg":"ant-input-lg___1yIfm","ant-input-sm":"ant-input-sm___MdXo6","ant-input-group-addon":"ant-input-group-addon___HCmNk","ant-input-group-wrap":"ant-input-group-wrap___105qY","ant-select-selection":"ant-select-selection___v_hyZ","ant-select-open":"ant-select-open___3iqlL","ant-select-focused":"ant-select-focused___2SfZF","ant-input-affix-wrapper":"ant-input-affix-wrapper___3cZRc","ant-input-group-lg":"ant-input-group-lg___iRZIL","ant-input-group-sm":"ant-input-group-sm___xMggM","ant-select-selection--single":"ant-select-selection--single___H8H-G","ant-input-group-compact":"ant-input-group-compact___1zFBF","ant-calendar-picker":"ant-calendar-picker___eqxyB","ant-select-auto-complete":"ant-select-auto-complete___31O2-","ant-cascader-picker":"ant-cascader-picker___1qUtW","ant-mention-wrapper":"ant-mention-wrapper___1By5z","ant-mention-editor":"ant-mention-editor___17P7B","ant-time-picker":"ant-time-picker___32x4z","ant-time-picker-input":"ant-time-picker-input___1IyDH","ant-input-group-wrapper":"ant-input-group-wrapper___3OLYZ","ant-input-prefix":"ant-input-prefix___3FaYl","ant-input-suffix":"ant-input-suffix___lYCpS"};

/***/ }),
/* 177 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"ant-tabs":"ant-tabs___1QkM-","ant-tabs-card":"ant-tabs-card___QnIeN","ant-tabs-bar":"ant-tabs-bar___3MsvX","ant-tabs-nav-container":"ant-tabs-nav-container___FxpXw","ant-tabs-ink-bar":"ant-tabs-ink-bar___2wtJL","ant-tabs-tab":"ant-tabs-tab___2wrcX","ant-tabs-tab-active":"ant-tabs-tab-active___3GiYq","ant-tabs-tab-inactive":"ant-tabs-tab-inactive___2viLg","ant-tabs-nav-wrap":"ant-tabs-nav-wrap___1cOmO","anticon-close":"anticon-close___2iwtj","ant-tabs-content":"ant-tabs-content___6Zh1F","ant-tabs-tabpane":"ant-tabs-tabpane___18rpW","ant-tabs-editable-card":"ant-tabs-editable-card___25Cfq","ant-tabs-tabpane-inactive":"ant-tabs-tabpane-inactive___2XHRJ","ant-tabs-extra-content":"ant-tabs-extra-content___24aqT","ant-tabs-new-tab":"ant-tabs-new-tab___3ZitR","ant-tabs-vertical":"ant-tabs-vertical___2gIkS","ant-tabs-left":"ant-tabs-left___2CShI","ant-tabs-right":"ant-tabs-right___3DBrS","ant-tabs-nav-container-scrolling":"ant-tabs-nav-container-scrolling___lNq-X","ant-tabs-tab-prev":"ant-tabs-tab-prev___nNiBU","ant-tabs-tab-next":"ant-tabs-tab-next____4S11","ant-tabs-tab-arrow-show":"ant-tabs-tab-arrow-show___1cIZv","ant-tabs-tab-prev-icon":"ant-tabs-tab-prev-icon___3e-E8","ant-tabs-tab-next-icon":"ant-tabs-tab-next-icon___4E7MV","ant-tabs-tab-btn-disabled":"ant-tabs-tab-btn-disabled___1MdqP","ant-tabs-nav-scroll":"ant-tabs-nav-scroll___1Z3LI","ant-tabs-nav":"ant-tabs-nav___2_JWM","ant-tabs-tab-disabled":"ant-tabs-tab-disabled___3OZ2s","anticon":"anticon___380ZO","ant-tabs-mini":"ant-tabs-mini___20d8q","ant-tabs-content-animated":"ant-tabs-content-animated___1b3yV","ant-tabs-bar-tab-prev":"ant-tabs-bar-tab-prev___1BWkU","ant-tabs-bar-tab-next":"ant-tabs-bar-tab-next___1MG8N","ant-tabs-bottom":"ant-tabs-bottom___2qGfX","ant-tabs-top":"ant-tabs-top___2kojt","ant-tabs-ink-bar-animated":"ant-tabs-ink-bar-animated___1FSiU","no-flex":"no-flex___38udP","ant-tabs-no-animation":"ant-tabs-no-animation___zVTYD"};

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyObject = {};

	if (true) {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;

/***/ }),
/* 179 */,
/* 180 */,
/* 181 */
/***/ (function(module, exports) {

	/**
	 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = getNative;


/***/ }),
/* 182 */
/***/ (function(module, exports) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isArguments;


/***/ }),
/* 183 */
/***/ (function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]',
	    funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isArray;


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var getNative = __webpack_require__(181),
	    isArguments = __webpack_require__(182),
	    isArray = __webpack_require__(183);

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;


/***/ }),
/* 185 */,
/* 186 */,
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	var _defineProperty2 = __webpack_require__(23);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _objectWithoutProperties2 = __webpack_require__(91);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	var _classCallCheck2 = __webpack_require__(7);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(25);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(12);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(11);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(21);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _PureRenderMixin = __webpack_require__(197);

	var _PureRenderMixin2 = _interopRequireDefault(_PureRenderMixin);

	var _classnames = __webpack_require__(20);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var Checkbox = function (_React$Component) {
	  (0, _inherits3['default'])(Checkbox, _React$Component);

	  function Checkbox(props) {
	    (0, _classCallCheck3['default'])(this, Checkbox);

	    var _this = (0, _possibleConstructorReturn3['default'])(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, props));

	    _initialiseProps.call(_this);

	    var checked = 'checked' in props ? props.checked : props.defaultChecked;

	    _this.state = {
	      checked: checked
	    };
	    return _this;
	  }

	  (0, _createClass3['default'])(Checkbox, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if ('checked' in nextProps) {
	        this.setState({
	          checked: nextProps.checked
	        });
	      }
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return _PureRenderMixin2['default'].shouldComponentUpdate.apply(this, args);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _classNames;

	      var _props = this.props,
	          prefixCls = _props.prefixCls,
	          className = _props.className,
	          style = _props.style,
	          name = _props.name,
	          type = _props.type,
	          disabled = _props.disabled,
	          readOnly = _props.readOnly,
	          tabIndex = _props.tabIndex,
	          onClick = _props.onClick,
	          onFocus = _props.onFocus,
	          onBlur = _props.onBlur,
	          others = (0, _objectWithoutProperties3['default'])(_props, ['prefixCls', 'className', 'style', 'name', 'type', 'disabled', 'readOnly', 'tabIndex', 'onClick', 'onFocus', 'onBlur']);


	      var globalProps = Object.keys(others).reduce(function (prev, key) {
	        if (key.substr(0, 5) === 'aria-' || key.substr(0, 5) === 'data-' || key === 'role') {
	          prev[key] = others[key];
	        }
	        return prev;
	      }, {});

	      var checked = this.state.checked;

	      var classString = (0, _classnames2['default'])(prefixCls, className, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-checked', checked), (0, _defineProperty3['default'])(_classNames, prefixCls + '-disabled', disabled), _classNames));

	      return _react2['default'].createElement(
	        'span',
	        { className: classString, style: style },
	        _react2['default'].createElement('input', (0, _extends3['default'])({
	          name: name,
	          type: type,
	          readOnly: readOnly,
	          disabled: disabled,
	          tabIndex: tabIndex,
	          className: prefixCls + '-input',
	          checked: !!checked,
	          onClick: onClick,
	          onFocus: onFocus,
	          onBlur: onBlur,
	          onChange: this.handleChange
	        }, globalProps)),
	        _react2['default'].createElement('span', { className: prefixCls + '-inner' })
	      );
	    }
	  }]);
	  return Checkbox;
	}(_react2['default'].Component);

	Checkbox.propTypes = {
	  prefixCls: _propTypes2['default'].string,
	  className: _propTypes2['default'].string,
	  style: _propTypes2['default'].object,
	  name: _propTypes2['default'].string,
	  type: _propTypes2['default'].string,
	  defaultChecked: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].bool]),
	  checked: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].bool]),
	  disabled: _propTypes2['default'].bool,
	  onFocus: _propTypes2['default'].func,
	  onBlur: _propTypes2['default'].func,
	  onChange: _propTypes2['default'].func,
	  onClick: _propTypes2['default'].func,
	  tabIndex: _propTypes2['default'].string,
	  readOnly: _propTypes2['default'].bool
	};
	Checkbox.defaultProps = {
	  prefixCls: 'rc-checkbox',
	  className: '',
	  style: {},
	  type: 'checkbox',
	  defaultChecked: false,
	  onFocus: function onFocus() {},
	  onBlur: function onBlur() {},
	  onChange: function onChange() {}
	};

	var _initialiseProps = function _initialiseProps() {
	  var _this2 = this;

	  this.handleChange = function (e) {
	    var props = _this2.props;

	    if (props.disabled) {
	      return;
	    }
	    if (!('checked' in props)) {
	      _this2.setState({
	        checked: e.target.checked
	      });
	    }
	    props.onChange({
	      target: (0, _extends3['default'])({}, props, {
	        checked: e.target.checked
	      }),
	      stopPropagation: function stopPropagation() {
	        e.stopPropagation();
	      },
	      preventDefault: function preventDefault() {
	        e.preventDefault();
	      }
	    });
	  };
	};

	exports['default'] = Checkbox;
	module.exports = exports['default'];

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Checkbox = __webpack_require__(187);

	Object.defineProperty(exports, 'default', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Checkbox)['default'];
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	module.exports = exports['default'];

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(23);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	exports.getScroll = getScroll;

	var _utils = __webpack_require__(88);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = __webpack_require__(20);

	var _classnames3 = _interopRequireDefault(_classnames2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function getScroll(w, top) {
	  var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
	  var method = 'scroll' + (top ? 'Top' : 'Left');
	  if (typeof ret !== 'number') {
	    var d = w.document;
	    // ie6,7,8 standard mode
	    ret = d.documentElement[method];
	    if (typeof ret !== 'number') {
	      // quirks mode
	      ret = d.body[method];
	    }
	  }
	  return ret;
	}

	function offset(elem) {
	  var box = void 0;
	  var x = void 0;
	  var y = void 0;
	  var doc = elem.ownerDocument;
	  var body = doc.body;
	  var docElem = doc && doc.documentElement;
	  box = elem.getBoundingClientRect();
	  x = box.left;
	  y = box.top;
	  x -= docElem.clientLeft || body.clientLeft || 0;
	  y -= docElem.clientTop || body.clientTop || 0;
	  var w = doc.defaultView || doc.parentWindow;
	  x += getScroll(w);
	  y += getScroll(w, true);
	  return {
	    left: x, top: y
	  };
	}

	function _componentDidUpdate(component, init) {
	  var styles = component.props.styles;

	  var wrapNode = component.nav || component.root;
	  var containerOffset = offset(wrapNode);
	  var inkBarNode = component.inkBar;
	  var activeTab = component.activeTab;
	  var inkBarNodeStyle = inkBarNode.style;
	  var tabBarPosition = component.props.tabBarPosition;
	  if (init) {
	    // prevent mount animation
	    inkBarNodeStyle.display = 'none';
	  }
	  if (activeTab) {
	    var tabNode = activeTab;
	    var tabOffset = offset(tabNode);
	    var transformSupported = (0, _utils.isTransformSupported)(inkBarNodeStyle);
	    if (tabBarPosition === 'top' || tabBarPosition === 'bottom') {
	      var left = tabOffset.left - containerOffset.left;
	      var width = tabNode.offsetWidth;

	      // If tabNode'width width equal to wrapNode'width when tabBarPosition is top or bottom
	      // It means no css working, then ink bar should not have width until css is loaded
	      // Fix https://github.com/ant-design/ant-design/issues/7564
	      if (width === wrapNode.offsetWidth) {
	        width = 0;
	      } else if (styles.inkBar && styles.inkBar.width !== undefined) {
	        width = parseFloat(styles.inkBar.width, 10);
	        if (width) {
	          left = left + (tabNode.offsetWidth - width) / 2;
	        }
	      }
	      // use 3d gpu to optimize render
	      if (transformSupported) {
	        (0, _utils.setTransform)(inkBarNodeStyle, 'translate3d(' + left + 'px,0,0)');
	        inkBarNodeStyle.width = width + 'px';
	        inkBarNodeStyle.height = '';
	      } else {
	        inkBarNodeStyle.left = left + 'px';
	        inkBarNodeStyle.top = '';
	        inkBarNodeStyle.bottom = '';
	        inkBarNodeStyle.right = wrapNode.offsetWidth - left - width + 'px';
	      }
	    } else {
	      var top = tabOffset.top - containerOffset.top;
	      var height = tabNode.offsetHeight;
	      if (styles.inkBar && styles.inkBar.height !== undefined) {
	        height = parseFloat(styles.inkBar.height, 10);
	        if (height) {
	          top = top + (tabNode.offsetHeight - height) / 2;
	        }
	      }
	      if (transformSupported) {
	        (0, _utils.setTransform)(inkBarNodeStyle, 'translate3d(0,' + top + 'px,0)');
	        inkBarNodeStyle.height = height + 'px';
	        inkBarNodeStyle.width = '';
	      } else {
	        inkBarNodeStyle.left = '';
	        inkBarNodeStyle.right = '';
	        inkBarNodeStyle.top = top + 'px';
	        inkBarNodeStyle.bottom = wrapNode.offsetHeight - top - height + 'px';
	      }
	    }
	  }
	  inkBarNodeStyle.display = activeTab ? 'block' : 'none';
	}

	exports['default'] = {
	  getDefaultProps: function getDefaultProps() {
	    return {
	      inkBarAnimated: true
	    };
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    _componentDidUpdate(this);
	  },
	  componentDidMount: function componentDidMount() {
	    _componentDidUpdate(this, true);
	  },
	  getInkBarNode: function getInkBarNode() {
	    var _classnames;

	    var _props = this.props,
	        prefixCls = _props.prefixCls,
	        styles = _props.styles,
	        inkBarAnimated = _props.inkBarAnimated;

	    var className = prefixCls + '-ink-bar';
	    var classes = (0, _classnames3['default'])((_classnames = {}, (0, _defineProperty3['default'])(_classnames, className, true), (0, _defineProperty3['default'])(_classnames, inkBarAnimated ? className + '-animated' : className + '-no-animated', true), _classnames));
	    return _react2['default'].createElement('div', {
	      style: styles.inkBar,
	      className: classes,
	      key: 'inkBar',
	      ref: this.saveRef('inkBar')
	    });
	  }
	};

/***/ }),
/* 190 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {
	  /**
	   * LEFT
	   */
	  LEFT: 37, // also NUM_WEST
	  /**
	   * UP
	   */
	  UP: 38, // also NUM_NORTH
	  /**
	   * RIGHT
	   */
	  RIGHT: 39, // also NUM_EAST
	  /**
	   * DOWN
	   */
	  DOWN: 40 // also NUM_SOUTH
	};
	module.exports = exports['default'];

/***/ }),
/* 191 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {
	  saveRef: function saveRef(name) {
	    var _this = this;

	    return function (node) {
	      _this[name] = node;
	    };
	  }
	};
	module.exports = exports['default'];

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createReactClass = __webpack_require__(86);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _InkTabBarMixin = __webpack_require__(189);

	var _InkTabBarMixin2 = _interopRequireDefault(_InkTabBarMixin);

	var _ScrollableTabBarMixin = __webpack_require__(193);

	var _ScrollableTabBarMixin2 = _interopRequireDefault(_ScrollableTabBarMixin);

	var _TabBarMixin = __webpack_require__(194);

	var _TabBarMixin2 = _interopRequireDefault(_TabBarMixin);

	var _RefMixin = __webpack_require__(191);

	var _RefMixin2 = _interopRequireDefault(_RefMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var ScrollableInkTabBar = (0, _createReactClass2['default'])({
	  displayName: 'ScrollableInkTabBar',
	  mixins: [_RefMixin2['default'], _TabBarMixin2['default'], _InkTabBarMixin2['default'], _ScrollableTabBarMixin2['default']],
	  render: function render() {
	    var inkBarNode = this.getInkBarNode();
	    var tabs = this.getTabs();
	    var scrollbarNode = this.getScrollBarNode([inkBarNode, tabs]);
	    return this.getRootNode(scrollbarNode);
	  }
	});

	exports['default'] = ScrollableInkTabBar;
	module.exports = exports['default'];

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(23);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _classnames5 = __webpack_require__(20);

	var _classnames6 = _interopRequireDefault(_classnames5);

	var _utils = __webpack_require__(88);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _addEventListener = __webpack_require__(107);

	var _addEventListener2 = _interopRequireDefault(_addEventListener);

	var _lodash = __webpack_require__(142);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	exports['default'] = {
	  getDefaultProps: function getDefaultProps() {
	    return {
	      scrollAnimated: true,
	      onPrevClick: function onPrevClick() {},
	      onNextClick: function onNextClick() {}
	    };
	  },
	  getInitialState: function getInitialState() {
	    this.offset = 0;
	    return {
	      next: false,
	      prev: false
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var _this = this;

	    this.componentDidUpdate();
	    var debouncedResize = (0, _lodash2['default'])(function () {
	      _this.setNextPrev();
	      _this.scrollToActiveTab();
	    }, 200);
	    this.resizeEvent = (0, _addEventListener2['default'])(window, 'resize', debouncedResize);
	  },
	  componentDidUpdate: function componentDidUpdate(prevProps) {
	    var props = this.props;
	    if (prevProps && prevProps.tabBarPosition !== props.tabBarPosition) {
	      this.setOffset(0);
	      return;
	    }
	    var nextPrev = this.setNextPrev();
	    // wait next, prev show hide
	    /* eslint react/no-did-update-set-state:0 */
	    if (this.isNextPrevShown(this.state) !== this.isNextPrevShown(nextPrev)) {
	      this.setState({}, this.scrollToActiveTab);
	    } else if (!prevProps || props.activeKey !== prevProps.activeKey) {
	      // can not use props.activeKey
	      this.scrollToActiveTab();
	    }
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (this.resizeEvent) {
	      this.resizeEvent.remove();
	    }
	  },
	  setNextPrev: function setNextPrev() {
	    var navNode = this.nav;
	    var navNodeWH = this.getOffsetWH(navNode);
	    var navWrapNode = this.navWrap;
	    var navWrapNodeWH = this.getOffsetWH(navWrapNode);
	    var offset = this.offset;

	    var minOffset = navWrapNodeWH - navNodeWH;
	    var _state = this.state,
	        next = _state.next,
	        prev = _state.prev;

	    if (minOffset >= 0) {
	      next = false;
	      this.setOffset(0, false);
	      offset = 0;
	    } else if (minOffset < offset) {
	      next = true;
	    } else {
	      next = false;
	      this.setOffset(minOffset, false);
	      offset = minOffset;
	    }

	    if (offset < 0) {
	      prev = true;
	    } else {
	      prev = false;
	    }

	    this.setNext(next);
	    this.setPrev(prev);
	    return {
	      next: next,
	      prev: prev
	    };
	  },
	  getOffsetWH: function getOffsetWH(node) {
	    var tabBarPosition = this.props.tabBarPosition;
	    var prop = 'offsetWidth';
	    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
	      prop = 'offsetHeight';
	    }
	    return node[prop];
	  },
	  getOffsetLT: function getOffsetLT(node) {
	    var tabBarPosition = this.props.tabBarPosition;
	    var prop = 'left';
	    if (tabBarPosition === 'left' || tabBarPosition === 'right') {
	      prop = 'top';
	    }
	    return node.getBoundingClientRect()[prop];
	  },
	  setOffset: function setOffset(offset) {
	    var checkNextPrev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	    var target = Math.min(0, offset);
	    if (this.offset !== target) {
	      this.offset = target;
	      var navOffset = {};
	      var tabBarPosition = this.props.tabBarPosition;
	      var navStyle = this.nav.style;
	      var transformSupported = (0, _utils.isTransformSupported)(navStyle);
	      if (tabBarPosition === 'left' || tabBarPosition === 'right') {
	        if (transformSupported) {
	          navOffset = {
	            value: 'translate3d(0,' + target + 'px,0)'
	          };
	        } else {
	          navOffset = {
	            name: 'top',
	            value: target + 'px'
	          };
	        }
	      } else {
	        if (transformSupported) {
	          navOffset = {
	            value: 'translate3d(' + target + 'px,0,0)'
	          };
	        } else {
	          navOffset = {
	            name: 'left',
	            value: target + 'px'
	          };
	        }
	      }
	      if (transformSupported) {
	        (0, _utils.setTransform)(navStyle, navOffset.value);
	      } else {
	        navStyle[navOffset.name] = navOffset.value;
	      }
	      if (checkNextPrev) {
	        this.setNextPrev();
	      }
	    }
	  },
	  setPrev: function setPrev(v) {
	    if (this.state.prev !== v) {
	      this.setState({
	        prev: v
	      });
	    }
	  },
	  setNext: function setNext(v) {
	    if (this.state.next !== v) {
	      this.setState({
	        next: v
	      });
	    }
	  },
	  isNextPrevShown: function isNextPrevShown(state) {
	    if (state) {
	      return state.next || state.prev;
	    }
	    return this.state.next || this.state.prev;
	  },
	  prevTransitionEnd: function prevTransitionEnd(e) {
	    if (e.propertyName !== 'opacity') {
	      return;
	    }
	    var container = this.container;

	    this.scrollToActiveTab({
	      target: container,
	      currentTarget: container
	    });
	  },
	  scrollToActiveTab: function scrollToActiveTab(e) {
	    var activeTab = this.activeTab,
	        navWrap = this.navWrap;

	    if (e && e.target !== e.currentTarget || !activeTab) {
	      return;
	    }

	    // when not scrollable or enter scrollable first time, don't emit scrolling
	    var needToSroll = this.isNextPrevShown() && this.lastNextPrevShown;
	    this.lastNextPrevShown = this.isNextPrevShown();
	    if (!needToSroll) {
	      return;
	    }

	    var activeTabWH = this.getOffsetWH(activeTab);
	    var navWrapNodeWH = this.getOffsetWH(navWrap);
	    var offset = this.offset;

	    var wrapOffset = this.getOffsetLT(navWrap);
	    var activeTabOffset = this.getOffsetLT(activeTab);
	    if (wrapOffset > activeTabOffset) {
	      offset += wrapOffset - activeTabOffset;
	      this.setOffset(offset);
	    } else if (wrapOffset + navWrapNodeWH < activeTabOffset + activeTabWH) {
	      offset -= activeTabOffset + activeTabWH - (wrapOffset + navWrapNodeWH);
	      this.setOffset(offset);
	    }
	  },
	  prev: function prev(e) {
	    this.props.onPrevClick(e);
	    var navWrapNode = this.navWrap;
	    var navWrapNodeWH = this.getOffsetWH(navWrapNode);
	    var offset = this.offset;

	    this.setOffset(offset + navWrapNodeWH);
	  },
	  next: function next(e) {
	    this.props.onNextClick(e);
	    var navWrapNode = this.navWrap;
	    var navWrapNodeWH = this.getOffsetWH(navWrapNode);
	    var offset = this.offset;

	    this.setOffset(offset - navWrapNodeWH);
	  },
	  getScrollBarNode: function getScrollBarNode(content) {
	    var _classnames, _classnames2, _classnames3, _classnames4;

	    var _state2 = this.state,
	        next = _state2.next,
	        prev = _state2.prev;
	    var _props = this.props,
	        prefixCls = _props.prefixCls,
	        scrollAnimated = _props.scrollAnimated;

	    var showNextPrev = prev || next;

	    var prevButton = _react2['default'].createElement(
	      'span',
	      {
	        onClick: prev ? this.prev : null,
	        unselectable: 'unselectable',
	        className: (0, _classnames6['default'])((_classnames = {}, (0, _defineProperty3['default'])(_classnames, prefixCls + '-tab-prev', 1), (0, _defineProperty3['default'])(_classnames, prefixCls + '-tab-btn-disabled', !prev), (0, _defineProperty3['default'])(_classnames, prefixCls + '-tab-arrow-show', showNextPrev), _classnames)),
	        onTransitionEnd: this.prevTransitionEnd
	      },
	      _react2['default'].createElement('span', { className: prefixCls + '-tab-prev-icon' })
	    );

	    var nextButton = _react2['default'].createElement(
	      'span',
	      {
	        onClick: next ? this.next : null,
	        unselectable: 'unselectable',
	        className: (0, _classnames6['default'])((_classnames2 = {}, (0, _defineProperty3['default'])(_classnames2, prefixCls + '-tab-next', 1), (0, _defineProperty3['default'])(_classnames2, prefixCls + '-tab-btn-disabled', !next), (0, _defineProperty3['default'])(_classnames2, prefixCls + '-tab-arrow-show', showNextPrev), _classnames2))
	      },
	      _react2['default'].createElement('span', { className: prefixCls + '-tab-next-icon' })
	    );

	    var navClassName = prefixCls + '-nav';
	    var navClasses = (0, _classnames6['default'])((_classnames3 = {}, (0, _defineProperty3['default'])(_classnames3, navClassName, true), (0, _defineProperty3['default'])(_classnames3, scrollAnimated ? navClassName + '-animated' : navClassName + '-no-animated', true), _classnames3));

	    return _react2['default'].createElement(
	      'div',
	      {
	        className: (0, _classnames6['default'])((_classnames4 = {}, (0, _defineProperty3['default'])(_classnames4, prefixCls + '-nav-container', 1), (0, _defineProperty3['default'])(_classnames4, prefixCls + '-nav-container-scrolling', showNextPrev), _classnames4)),
	        key: 'container',
	        ref: this.saveRef('container')
	      },
	      prevButton,
	      nextButton,
	      _react2['default'].createElement(
	        'div',
	        { className: prefixCls + '-nav-wrap', ref: this.saveRef('navWrap') },
	        _react2['default'].createElement(
	          'div',
	          { className: prefixCls + '-nav-scroll' },
	          _react2['default'].createElement(
	            'div',
	            { className: navClasses, ref: this.saveRef('nav') },
	            content
	          )
	        )
	      )
	    );
	  }
	};
	module.exports = exports['default'];

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(23);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _objectWithoutProperties2 = __webpack_require__(91);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = __webpack_require__(20);

	var _classnames3 = _interopRequireDefault(_classnames2);

	var _warning = __webpack_require__(135);

	var _warning2 = _interopRequireDefault(_warning);

	var _utils = __webpack_require__(88);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	exports['default'] = {
	  getDefaultProps: function getDefaultProps() {
	    return {
	      styles: {}
	    };
	  },
	  onTabClick: function onTabClick(key) {
	    this.props.onTabClick(key);
	  },
	  getTabs: function getTabs() {
	    var _this = this;

	    var _props = this.props,
	        children = _props.panels,
	        activeKey = _props.activeKey,
	        prefixCls = _props.prefixCls;

	    var rst = [];

	    _react2['default'].Children.forEach(children, function (child) {
	      if (!child) {
	        return;
	      }
	      var key = child.key;
	      var cls = activeKey === key ? prefixCls + '-tab-active' : '';
	      cls += ' ' + prefixCls + '-tab';
	      var events = {};
	      if (child.props.disabled) {
	        cls += ' ' + prefixCls + '-tab-disabled';
	      } else {
	        events = {
	          onClick: _this.onTabClick.bind(_this, key)
	        };
	      }
	      var ref = {};
	      if (activeKey === key) {
	        ref.ref = _this.saveRef('activeTab');
	      }
	      (0, _warning2['default'])('tab' in child.props, 'There must be `tab` property on children of Tabs.');
	      rst.push(_react2['default'].createElement(
	        'div',
	        (0, _extends3['default'])({
	          role: 'tab',
	          'aria-disabled': child.props.disabled ? 'true' : 'false',
	          'aria-selected': activeKey === key ? 'true' : 'false'
	        }, events, {
	          className: cls,
	          key: key
	        }, ref),
	        child.props.tab
	      ));
	    });

	    return rst;
	  },
	  getRootNode: function getRootNode(contents) {
	    var _props2 = this.props,
	        prefixCls = _props2.prefixCls,
	        onKeyDown = _props2.onKeyDown,
	        className = _props2.className,
	        extraContent = _props2.extraContent,
	        style = _props2.style,
	        tabBarPosition = _props2.tabBarPosition,
	        restProps = (0, _objectWithoutProperties3['default'])(_props2, ['prefixCls', 'onKeyDown', 'className', 'extraContent', 'style', 'tabBarPosition']);

	    var cls = (0, _classnames3['default'])(prefixCls + '-bar', (0, _defineProperty3['default'])({}, className, !!className));
	    var topOrBottom = tabBarPosition === 'top' || tabBarPosition === 'bottom';
	    var tabBarExtraContentStyle = topOrBottom ? { float: 'right' } : {};
	    var extraContentStyle = extraContent && extraContent.props ? extraContent.props.style : {};
	    var children = contents;
	    if (extraContent) {
	      children = [(0, _react.cloneElement)(extraContent, {
	        key: 'extra',
	        style: (0, _extends3['default'])({}, tabBarExtraContentStyle, extraContentStyle)
	      }), (0, _react.cloneElement)(contents, { key: 'content' })];
	      children = topOrBottom ? children : children.reverse();
	    }
	    return _react2['default'].createElement(
	      'div',
	      (0, _extends3['default'])({
	        role: 'tablist',
	        className: cls,
	        tabIndex: '0',
	        ref: this.saveRef('root'),
	        onKeyDown: onKeyDown,
	        style: style
	      }, (0, _utils.getDataAttr)(restProps)),
	      children
	    );
	  }
	};
	module.exports = exports['default'];

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	var _defineProperty2 = __webpack_require__(23);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _objectWithoutProperties2 = __webpack_require__(91);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	var _classCallCheck2 = __webpack_require__(7);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(25);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(12);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(11);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(21);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _KeyCode = __webpack_require__(190);

	var _KeyCode2 = _interopRequireDefault(_KeyCode);

	var _TabPane = __webpack_require__(133);

	var _TabPane2 = _interopRequireDefault(_TabPane);

	var _classnames2 = __webpack_require__(20);

	var _classnames3 = _interopRequireDefault(_classnames2);

	var _utils = __webpack_require__(88);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function noop() {}

	function getDefaultActiveKey(props) {
	  var activeKey = void 0;
	  _react2['default'].Children.forEach(props.children, function (child) {
	    if (child && !activeKey && !child.props.disabled) {
	      activeKey = child.key;
	    }
	  });
	  return activeKey;
	}

	function activeKeyIsValid(props, key) {
	  var keys = _react2['default'].Children.map(props.children, function (child) {
	    return child && child.key;
	  });
	  return keys.indexOf(key) >= 0;
	}

	var Tabs = function (_React$Component) {
	  (0, _inherits3['default'])(Tabs, _React$Component);

	  function Tabs(props) {
	    (0, _classCallCheck3['default'])(this, Tabs);

	    var _this = (0, _possibleConstructorReturn3['default'])(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

	    _initialiseProps.call(_this);

	    var activeKey = void 0;
	    if ('activeKey' in props) {
	      activeKey = props.activeKey;
	    } else if ('defaultActiveKey' in props) {
	      activeKey = props.defaultActiveKey;
	    } else {
	      activeKey = getDefaultActiveKey(props);
	    }

	    _this.state = {
	      activeKey: activeKey
	    };
	    return _this;
	  }

	  (0, _createClass3['default'])(Tabs, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if ('activeKey' in nextProps) {
	        this.setState({
	          activeKey: nextProps.activeKey
	        });
	      } else if (!activeKeyIsValid(nextProps, this.state.activeKey)) {
	        // https://github.com/ant-design/ant-design/issues/7093
	        this.setState({
	          activeKey: getDefaultActiveKey(nextProps)
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _classnames;

	      var props = this.props;
	      var prefixCls = props.prefixCls,
	          tabBarPosition = props.tabBarPosition,
	          className = props.className,
	          renderTabContent = props.renderTabContent,
	          renderTabBar = props.renderTabBar,
	          destroyInactiveTabPane = props.destroyInactiveTabPane,
	          restProps = (0, _objectWithoutProperties3['default'])(props, ['prefixCls', 'tabBarPosition', 'className', 'renderTabContent', 'renderTabBar', 'destroyInactiveTabPane']);

	      var cls = (0, _classnames3['default'])((_classnames = {}, (0, _defineProperty3['default'])(_classnames, prefixCls, 1), (0, _defineProperty3['default'])(_classnames, prefixCls + '-' + tabBarPosition, 1), (0, _defineProperty3['default'])(_classnames, className, !!className), _classnames));

	      this.tabBar = renderTabBar();
	      var contents = [_react2['default'].cloneElement(this.tabBar, {
	        prefixCls: prefixCls,
	        key: 'tabBar',
	        onKeyDown: this.onNavKeyDown,
	        tabBarPosition: tabBarPosition,
	        onTabClick: this.onTabClick,
	        panels: props.children,
	        activeKey: this.state.activeKey
	      }), _react2['default'].cloneElement(renderTabContent(), {
	        prefixCls: prefixCls,
	        tabBarPosition: tabBarPosition,
	        activeKey: this.state.activeKey,
	        destroyInactiveTabPane: destroyInactiveTabPane,
	        children: props.children,
	        onChange: this.setActiveKey,
	        key: 'tabContent'
	      })];
	      if (tabBarPosition === 'bottom') {
	        contents.reverse();
	      }
	      return _react2['default'].createElement(
	        'div',
	        (0, _extends3['default'])({
	          className: cls,
	          style: props.style
	        }, (0, _utils.getDataAttr)(restProps)),
	        contents
	      );
	    }
	  }]);
	  return Tabs;
	}(_react2['default'].Component);

	var _initialiseProps = function _initialiseProps() {
	  var _this2 = this;

	  this.onTabClick = function (activeKey) {
	    if (_this2.tabBar.props.onTabClick) {
	      _this2.tabBar.props.onTabClick(activeKey);
	    }
	    _this2.setActiveKey(activeKey);
	  };

	  this.onNavKeyDown = function (e) {
	    var eventKeyCode = e.keyCode;
	    if (eventKeyCode === _KeyCode2['default'].RIGHT || eventKeyCode === _KeyCode2['default'].DOWN) {
	      e.preventDefault();
	      var nextKey = _this2.getNextActiveKey(true);
	      _this2.onTabClick(nextKey);
	    } else if (eventKeyCode === _KeyCode2['default'].LEFT || eventKeyCode === _KeyCode2['default'].UP) {
	      e.preventDefault();
	      var previousKey = _this2.getNextActiveKey(false);
	      _this2.onTabClick(previousKey);
	    }
	  };

	  this.setActiveKey = function (activeKey) {
	    if (_this2.state.activeKey !== activeKey) {
	      if (!('activeKey' in _this2.props)) {
	        _this2.setState({
	          activeKey: activeKey
	        });
	      }
	      _this2.props.onChange(activeKey);
	    }
	  };

	  this.getNextActiveKey = function (next) {
	    var activeKey = _this2.state.activeKey;
	    var children = [];
	    _react2['default'].Children.forEach(_this2.props.children, function (c) {
	      if (c && !c.props.disabled) {
	        if (next) {
	          children.push(c);
	        } else {
	          children.unshift(c);
	        }
	      }
	    });
	    var length = children.length;
	    var ret = length && children[0].key;
	    children.forEach(function (child, i) {
	      if (child.key === activeKey) {
	        if (i === length - 1) {
	          ret = children[0].key;
	        } else {
	          ret = children[i + 1].key;
	        }
	      }
	    });
	    return ret;
	  };
	};

	exports['default'] = Tabs;


	Tabs.propTypes = {
	  destroyInactiveTabPane: _propTypes2['default'].bool,
	  renderTabBar: _propTypes2['default'].func.isRequired,
	  renderTabContent: _propTypes2['default'].func.isRequired,
	  onChange: _propTypes2['default'].func,
	  children: _propTypes2['default'].any,
	  prefixCls: _propTypes2['default'].string,
	  className: _propTypes2['default'].string,
	  tabBarPosition: _propTypes2['default'].string,
	  style: _propTypes2['default'].object,
	  activeKey: _propTypes2['default'].string,
	  defaultActiveKey: _propTypes2['default'].string
	};

	Tabs.defaultProps = {
	  prefixCls: 'rc-tabs',
	  destroyInactiveTabPane: false,
	  onChange: noop,
	  tabBarPosition: 'top',
	  style: {}
	};

	Tabs.TabPane = _TabPane2['default'];
	module.exports = exports['default'];

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TabContent = exports.TabPane = undefined;

	var _Tabs = __webpack_require__(195);

	var _Tabs2 = _interopRequireDefault(_Tabs);

	var _TabPane = __webpack_require__(133);

	var _TabPane2 = _interopRequireDefault(_TabPane);

	var _TabContent = __webpack_require__(132);

	var _TabContent2 = _interopRequireDefault(_TabContent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	exports['default'] = _Tabs2['default'];
	exports.TabPane = _TabPane2['default'];
	exports.TabContent = _TabContent2['default'];

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponentWithPureRenderMixin
	 */

	var shallowEqual = __webpack_require__(198);

	function shallowCompare(instance, nextProps, nextState) {
	  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
	}

	/**
	 * If your React component's render function is "pure", e.g. it will render the
	 * same result given the same props and state, provide this mixin for a
	 * considerable performance boost.
	 *
	 * Most React components have pure render functions.
	 *
	 * Example:
	 *
	 *   var ReactComponentWithPureRenderMixin =
	 *     require('ReactComponentWithPureRenderMixin');
	 *   React.createClass({
	 *     mixins: [ReactComponentWithPureRenderMixin],
	 *
	 *     render: function() {
	 *       return <div className={this.props.className}>foo</div>;
	 *     }
	 *   });
	 *
	 * Note: This only checks shallow equality for props and state. If these contain
	 * complex data structures this mixin may have false-negatives for deeper
	 * differences. Only mixin to components which have simple props and state, or
	 * use `forceUpdate()` when you know deep data structures have changed.
	 *
	 * See https://facebook.github.io/react/docs/pure-render-mixin.html
	 */
	var ReactComponentWithPureRenderMixin = {
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return shallowCompare(this, nextProps, nextState);
	  }
	};

	module.exports = ReactComponentWithPureRenderMixin;

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var fetchKeys = __webpack_require__(184);

	module.exports = function shallowEqual(objA, objB, compare, compareContext) {

	    var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

	    if (ret !== void 0) {
	        return !!ret;
	    }

	    if (objA === objB) {
	        return true;
	    }

	    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	        return false;
	    }

	    var keysA = fetchKeys(objA);
	    var keysB = fetchKeys(objB);

	    var len = keysA.length;
	    if (len !== keysB.length) {
	        return false;
	    }

	    compareContext = compareContext || null;

	    // Test for A's keys different from B.
	    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
	    for (var i = 0; i < len; i++) {
	        var key = keysA[i];
	        if (!bHasOwnProperty(key)) {
	            return false;
	        }
	        var valueA = objA[key];
	        var valueB = objB[key];

	        var _ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
	        if (_ret === false || _ret === void 0 && valueA !== valueB) {
	            return false;
	        }
	    }

	    return true;
	};

/***/ }),
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE

	(function(mod) {
	  if (true) // CommonJS
	    mod(__webpack_require__(95));
	  else if (typeof define == "function" && define.amd) // AMD
	    define(["../../lib/codemirror"], mod);
	  else // Plain browser env
	    mod(CodeMirror);
	})(function(CodeMirror) {
	"use strict";

	CodeMirror.defineMode("css", function(config, parserConfig) {
	  var inline = parserConfig.inline
	  if (!parserConfig.propertyKeywords) parserConfig = CodeMirror.resolveMode("text/css");

	  var indentUnit = config.indentUnit,
	      tokenHooks = parserConfig.tokenHooks,
	      documentTypes = parserConfig.documentTypes || {},
	      mediaTypes = parserConfig.mediaTypes || {},
	      mediaFeatures = parserConfig.mediaFeatures || {},
	      mediaValueKeywords = parserConfig.mediaValueKeywords || {},
	      propertyKeywords = parserConfig.propertyKeywords || {},
	      nonStandardPropertyKeywords = parserConfig.nonStandardPropertyKeywords || {},
	      fontProperties = parserConfig.fontProperties || {},
	      counterDescriptors = parserConfig.counterDescriptors || {},
	      colorKeywords = parserConfig.colorKeywords || {},
	      valueKeywords = parserConfig.valueKeywords || {},
	      allowNested = parserConfig.allowNested,
	      lineComment = parserConfig.lineComment,
	      supportsAtComponent = parserConfig.supportsAtComponent === true;

	  var type, override;
	  function ret(style, tp) { type = tp; return style; }

	  // Tokenizers

	  function tokenBase(stream, state) {
	    var ch = stream.next();
	    if (tokenHooks[ch]) {
	      var result = tokenHooks[ch](stream, state);
	      if (result !== false) return result;
	    }
	    if (ch == "@") {
	      stream.eatWhile(/[\w\\\-]/);
	      return ret("def", stream.current());
	    } else if (ch == "=" || (ch == "~" || ch == "|") && stream.eat("=")) {
	      return ret(null, "compare");
	    } else if (ch == "\"" || ch == "'") {
	      state.tokenize = tokenString(ch);
	      return state.tokenize(stream, state);
	    } else if (ch == "#") {
	      stream.eatWhile(/[\w\\\-]/);
	      return ret("atom", "hash");
	    } else if (ch == "!") {
	      stream.match(/^\s*\w*/);
	      return ret("keyword", "important");
	    } else if (/\d/.test(ch) || ch == "." && stream.eat(/\d/)) {
	      stream.eatWhile(/[\w.%]/);
	      return ret("number", "unit");
	    } else if (ch === "-") {
	      if (/[\d.]/.test(stream.peek())) {
	        stream.eatWhile(/[\w.%]/);
	        return ret("number", "unit");
	      } else if (stream.match(/^-[\w\\\-]+/)) {
	        stream.eatWhile(/[\w\\\-]/);
	        if (stream.match(/^\s*:/, false))
	          return ret("variable-2", "variable-definition");
	        return ret("variable-2", "variable");
	      } else if (stream.match(/^\w+-/)) {
	        return ret("meta", "meta");
	      }
	    } else if (/[,+>*\/]/.test(ch)) {
	      return ret(null, "select-op");
	    } else if (ch == "." && stream.match(/^-?[_a-z][_a-z0-9-]*/i)) {
	      return ret("qualifier", "qualifier");
	    } else if (/[:;{}\[\]\(\)]/.test(ch)) {
	      return ret(null, ch);
	    } else if ((ch == "u" && stream.match(/rl(-prefix)?\(/)) ||
	               (ch == "d" && stream.match("omain(")) ||
	               (ch == "r" && stream.match("egexp("))) {
	      stream.backUp(1);
	      state.tokenize = tokenParenthesized;
	      return ret("property", "word");
	    } else if (/[\w\\\-]/.test(ch)) {
	      stream.eatWhile(/[\w\\\-]/);
	      return ret("property", "word");
	    } else {
	      return ret(null, null);
	    }
	  }

	  function tokenString(quote) {
	    return function(stream, state) {
	      var escaped = false, ch;
	      while ((ch = stream.next()) != null) {
	        if (ch == quote && !escaped) {
	          if (quote == ")") stream.backUp(1);
	          break;
	        }
	        escaped = !escaped && ch == "\\";
	      }
	      if (ch == quote || !escaped && quote != ")") state.tokenize = null;
	      return ret("string", "string");
	    };
	  }

	  function tokenParenthesized(stream, state) {
	    stream.next(); // Must be '('
	    if (!stream.match(/\s*[\"\')]/, false))
	      state.tokenize = tokenString(")");
	    else
	      state.tokenize = null;
	    return ret(null, "(");
	  }

	  // Context management

	  function Context(type, indent, prev) {
	    this.type = type;
	    this.indent = indent;
	    this.prev = prev;
	  }

	  function pushContext(state, stream, type, indent) {
	    state.context = new Context(type, stream.indentation() + (indent === false ? 0 : indentUnit), state.context);
	    return type;
	  }

	  function popContext(state) {
	    if (state.context.prev)
	      state.context = state.context.prev;
	    return state.context.type;
	  }

	  function pass(type, stream, state) {
	    return states[state.context.type](type, stream, state);
	  }
	  function popAndPass(type, stream, state, n) {
	    for (var i = n || 1; i > 0; i--)
	      state.context = state.context.prev;
	    return pass(type, stream, state);
	  }

	  // Parser

	  function wordAsValue(stream) {
	    var word = stream.current().toLowerCase();
	    if (valueKeywords.hasOwnProperty(word))
	      override = "atom";
	    else if (colorKeywords.hasOwnProperty(word))
	      override = "keyword";
	    else
	      override = "variable";
	  }

	  var states = {};

	  states.top = function(type, stream, state) {
	    if (type == "{") {
	      return pushContext(state, stream, "block");
	    } else if (type == "}" && state.context.prev) {
	      return popContext(state);
	    } else if (supportsAtComponent && /@component/.test(type)) {
	      return pushContext(state, stream, "atComponentBlock");
	    } else if (/^@(-moz-)?document$/.test(type)) {
	      return pushContext(state, stream, "documentTypes");
	    } else if (/^@(media|supports|(-moz-)?document|import)$/.test(type)) {
	      return pushContext(state, stream, "atBlock");
	    } else if (/^@(font-face|counter-style)/.test(type)) {
	      state.stateArg = type;
	      return "restricted_atBlock_before";
	    } else if (/^@(-(moz|ms|o|webkit)-)?keyframes$/.test(type)) {
	      return "keyframes";
	    } else if (type && type.charAt(0) == "@") {
	      return pushContext(state, stream, "at");
	    } else if (type == "hash") {
	      override = "builtin";
	    } else if (type == "word") {
	      override = "tag";
	    } else if (type == "variable-definition") {
	      return "maybeprop";
	    } else if (type == "interpolation") {
	      return pushContext(state, stream, "interpolation");
	    } else if (type == ":") {
	      return "pseudo";
	    } else if (allowNested && type == "(") {
	      return pushContext(state, stream, "parens");
	    }
	    return state.context.type;
	  };

	  states.block = function(type, stream, state) {
	    if (type == "word") {
	      var word = stream.current().toLowerCase();
	      if (propertyKeywords.hasOwnProperty(word)) {
	        override = "property";
	        return "maybeprop";
	      } else if (nonStandardPropertyKeywords.hasOwnProperty(word)) {
	        override = "string-2";
	        return "maybeprop";
	      } else if (allowNested) {
	        override = stream.match(/^\s*:(?:\s|$)/, false) ? "property" : "tag";
	        return "block";
	      } else {
	        override += " error";
	        return "maybeprop";
	      }
	    } else if (type == "meta") {
	      return "block";
	    } else if (!allowNested && (type == "hash" || type == "qualifier")) {
	      override = "error";
	      return "block";
	    } else {
	      return states.top(type, stream, state);
	    }
	  };

	  states.maybeprop = function(type, stream, state) {
	    if (type == ":") return pushContext(state, stream, "prop");
	    return pass(type, stream, state);
	  };

	  states.prop = function(type, stream, state) {
	    if (type == ";") return popContext(state);
	    if (type == "{" && allowNested) return pushContext(state, stream, "propBlock");
	    if (type == "}" || type == "{") return popAndPass(type, stream, state);
	    if (type == "(") return pushContext(state, stream, "parens");

	    if (type == "hash" && !/^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(stream.current())) {
	      override += " error";
	    } else if (type == "word") {
	      wordAsValue(stream);
	    } else if (type == "interpolation") {
	      return pushContext(state, stream, "interpolation");
	    }
	    return "prop";
	  };

	  states.propBlock = function(type, _stream, state) {
	    if (type == "}") return popContext(state);
	    if (type == "word") { override = "property"; return "maybeprop"; }
	    return state.context.type;
	  };

	  states.parens = function(type, stream, state) {
	    if (type == "{" || type == "}") return popAndPass(type, stream, state);
	    if (type == ")") return popContext(state);
	    if (type == "(") return pushContext(state, stream, "parens");
	    if (type == "interpolation") return pushContext(state, stream, "interpolation");
	    if (type == "word") wordAsValue(stream);
	    return "parens";
	  };

	  states.pseudo = function(type, stream, state) {
	    if (type == "meta") return "pseudo";

	    if (type == "word") {
	      override = "variable-3";
	      return state.context.type;
	    }
	    return pass(type, stream, state);
	  };

	  states.documentTypes = function(type, stream, state) {
	    if (type == "word" && documentTypes.hasOwnProperty(stream.current())) {
	      override = "tag";
	      return state.context.type;
	    } else {
	      return states.atBlock(type, stream, state);
	    }
	  };

	  states.atBlock = function(type, stream, state) {
	    if (type == "(") return pushContext(state, stream, "atBlock_parens");
	    if (type == "}" || type == ";") return popAndPass(type, stream, state);
	    if (type == "{") return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top");

	    if (type == "interpolation") return pushContext(state, stream, "interpolation");

	    if (type == "word") {
	      var word = stream.current().toLowerCase();
	      if (word == "only" || word == "not" || word == "and" || word == "or")
	        override = "keyword";
	      else if (mediaTypes.hasOwnProperty(word))
	        override = "attribute";
	      else if (mediaFeatures.hasOwnProperty(word))
	        override = "property";
	      else if (mediaValueKeywords.hasOwnProperty(word))
	        override = "keyword";
	      else if (propertyKeywords.hasOwnProperty(word))
	        override = "property";
	      else if (nonStandardPropertyKeywords.hasOwnProperty(word))
	        override = "string-2";
	      else if (valueKeywords.hasOwnProperty(word))
	        override = "atom";
	      else if (colorKeywords.hasOwnProperty(word))
	        override = "keyword";
	      else
	        override = "error";
	    }
	    return state.context.type;
	  };

	  states.atComponentBlock = function(type, stream, state) {
	    if (type == "}")
	      return popAndPass(type, stream, state);
	    if (type == "{")
	      return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top", false);
	    if (type == "word")
	      override = "error";
	    return state.context.type;
	  };

	  states.atBlock_parens = function(type, stream, state) {
	    if (type == ")") return popContext(state);
	    if (type == "{" || type == "}") return popAndPass(type, stream, state, 2);
	    return states.atBlock(type, stream, state);
	  };

	  states.restricted_atBlock_before = function(type, stream, state) {
	    if (type == "{")
	      return pushContext(state, stream, "restricted_atBlock");
	    if (type == "word" && state.stateArg == "@counter-style") {
	      override = "variable";
	      return "restricted_atBlock_before";
	    }
	    return pass(type, stream, state);
	  };

	  states.restricted_atBlock = function(type, stream, state) {
	    if (type == "}") {
	      state.stateArg = null;
	      return popContext(state);
	    }
	    if (type == "word") {
	      if ((state.stateArg == "@font-face" && !fontProperties.hasOwnProperty(stream.current().toLowerCase())) ||
	          (state.stateArg == "@counter-style" && !counterDescriptors.hasOwnProperty(stream.current().toLowerCase())))
	        override = "error";
	      else
	        override = "property";
	      return "maybeprop";
	    }
	    return "restricted_atBlock";
	  };

	  states.keyframes = function(type, stream, state) {
	    if (type == "word") { override = "variable"; return "keyframes"; }
	    if (type == "{") return pushContext(state, stream, "top");
	    return pass(type, stream, state);
	  };

	  states.at = function(type, stream, state) {
	    if (type == ";") return popContext(state);
	    if (type == "{" || type == "}") return popAndPass(type, stream, state);
	    if (type == "word") override = "tag";
	    else if (type == "hash") override = "builtin";
	    return "at";
	  };

	  states.interpolation = function(type, stream, state) {
	    if (type == "}") return popContext(state);
	    if (type == "{" || type == ";") return popAndPass(type, stream, state);
	    if (type == "word") override = "variable";
	    else if (type != "variable" && type != "(" && type != ")") override = "error";
	    return "interpolation";
	  };

	  return {
	    startState: function(base) {
	      return {tokenize: null,
	              state: inline ? "block" : "top",
	              stateArg: null,
	              context: new Context(inline ? "block" : "top", base || 0, null)};
	    },

	    token: function(stream, state) {
	      if (!state.tokenize && stream.eatSpace()) return null;
	      var style = (state.tokenize || tokenBase)(stream, state);
	      if (style && typeof style == "object") {
	        type = style[1];
	        style = style[0];
	      }
	      override = style;
	      if (type != "comment")
	        state.state = states[state.state](type, stream, state);
	      return override;
	    },

	    indent: function(state, textAfter) {
	      var cx = state.context, ch = textAfter && textAfter.charAt(0);
	      var indent = cx.indent;
	      if (cx.type == "prop" && (ch == "}" || ch == ")")) cx = cx.prev;
	      if (cx.prev) {
	        if (ch == "}" && (cx.type == "block" || cx.type == "top" ||
	                          cx.type == "interpolation" || cx.type == "restricted_atBlock")) {
	          // Resume indentation from parent context.
	          cx = cx.prev;
	          indent = cx.indent;
	        } else if (ch == ")" && (cx.type == "parens" || cx.type == "atBlock_parens") ||
	            ch == "{" && (cx.type == "at" || cx.type == "atBlock")) {
	          // Dedent relative to current context.
	          indent = Math.max(0, cx.indent - indentUnit);
	        }
	      }
	      return indent;
	    },

	    electricChars: "}",
	    blockCommentStart: "/*",
	    blockCommentEnd: "*/",
	    blockCommentContinue: " * ",
	    lineComment: lineComment,
	    fold: "brace"
	  };
	});

	  function keySet(array) {
	    var keys = {};
	    for (var i = 0; i < array.length; ++i) {
	      keys[array[i].toLowerCase()] = true;
	    }
	    return keys;
	  }

	  var documentTypes_ = [
	    "domain", "regexp", "url", "url-prefix"
	  ], documentTypes = keySet(documentTypes_);

	  var mediaTypes_ = [
	    "all", "aural", "braille", "handheld", "print", "projection", "screen",
	    "tty", "tv", "embossed"
	  ], mediaTypes = keySet(mediaTypes_);

	  var mediaFeatures_ = [
	    "width", "min-width", "max-width", "height", "min-height", "max-height",
	    "device-width", "min-device-width", "max-device-width", "device-height",
	    "min-device-height", "max-device-height", "aspect-ratio",
	    "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio",
	    "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color",
	    "max-color", "color-index", "min-color-index", "max-color-index",
	    "monochrome", "min-monochrome", "max-monochrome", "resolution",
	    "min-resolution", "max-resolution", "scan", "grid", "orientation",
	    "device-pixel-ratio", "min-device-pixel-ratio", "max-device-pixel-ratio",
	    "pointer", "any-pointer", "hover", "any-hover"
	  ], mediaFeatures = keySet(mediaFeatures_);

	  var mediaValueKeywords_ = [
	    "landscape", "portrait", "none", "coarse", "fine", "on-demand", "hover",
	    "interlace", "progressive"
	  ], mediaValueKeywords = keySet(mediaValueKeywords_);

	  var propertyKeywords_ = [
	    "align-content", "align-items", "align-self", "alignment-adjust",
	    "alignment-baseline", "anchor-point", "animation", "animation-delay",
	    "animation-direction", "animation-duration", "animation-fill-mode",
	    "animation-iteration-count", "animation-name", "animation-play-state",
	    "animation-timing-function", "appearance", "azimuth", "backface-visibility",
	    "background", "background-attachment", "background-blend-mode", "background-clip",
	    "background-color", "background-image", "background-origin", "background-position",
	    "background-repeat", "background-size", "baseline-shift", "binding",
	    "bleed", "bookmark-label", "bookmark-level", "bookmark-state",
	    "bookmark-target", "border", "border-bottom", "border-bottom-color",
	    "border-bottom-left-radius", "border-bottom-right-radius",
	    "border-bottom-style", "border-bottom-width", "border-collapse",
	    "border-color", "border-image", "border-image-outset",
	    "border-image-repeat", "border-image-slice", "border-image-source",
	    "border-image-width", "border-left", "border-left-color",
	    "border-left-style", "border-left-width", "border-radius", "border-right",
	    "border-right-color", "border-right-style", "border-right-width",
	    "border-spacing", "border-style", "border-top", "border-top-color",
	    "border-top-left-radius", "border-top-right-radius", "border-top-style",
	    "border-top-width", "border-width", "bottom", "box-decoration-break",
	    "box-shadow", "box-sizing", "break-after", "break-before", "break-inside",
	    "caption-side", "caret-color", "clear", "clip", "color", "color-profile", "column-count",
	    "column-fill", "column-gap", "column-rule", "column-rule-color",
	    "column-rule-style", "column-rule-width", "column-span", "column-width",
	    "columns", "content", "counter-increment", "counter-reset", "crop", "cue",
	    "cue-after", "cue-before", "cursor", "direction", "display",
	    "dominant-baseline", "drop-initial-after-adjust",
	    "drop-initial-after-align", "drop-initial-before-adjust",
	    "drop-initial-before-align", "drop-initial-size", "drop-initial-value",
	    "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis",
	    "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap",
	    "float", "float-offset", "flow-from", "flow-into", "font", "font-feature-settings",
	    "font-family", "font-kerning", "font-language-override", "font-size", "font-size-adjust",
	    "font-stretch", "font-style", "font-synthesis", "font-variant",
	    "font-variant-alternates", "font-variant-caps", "font-variant-east-asian",
	    "font-variant-ligatures", "font-variant-numeric", "font-variant-position",
	    "font-weight", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow",
	    "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-gap",
	    "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-gap",
	    "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns",
	    "grid-template-rows", "hanging-punctuation", "height", "hyphens",
	    "icon", "image-orientation", "image-rendering", "image-resolution",
	    "inline-box-align", "justify-content", "justify-items", "justify-self", "left", "letter-spacing",
	    "line-break", "line-height", "line-stacking", "line-stacking-ruby",
	    "line-stacking-shift", "line-stacking-strategy", "list-style",
	    "list-style-image", "list-style-position", "list-style-type", "margin",
	    "margin-bottom", "margin-left", "margin-right", "margin-top",
	    "marks", "marquee-direction", "marquee-loop",
	    "marquee-play-count", "marquee-speed", "marquee-style", "max-height",
	    "max-width", "min-height", "min-width", "move-to", "nav-down", "nav-index",
	    "nav-left", "nav-right", "nav-up", "object-fit", "object-position",
	    "opacity", "order", "orphans", "outline",
	    "outline-color", "outline-offset", "outline-style", "outline-width",
	    "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y",
	    "padding", "padding-bottom", "padding-left", "padding-right", "padding-top",
	    "page", "page-break-after", "page-break-before", "page-break-inside",
	    "page-policy", "pause", "pause-after", "pause-before", "perspective",
	    "perspective-origin", "pitch", "pitch-range", "place-content", "place-items", "place-self", "play-during", "position",
	    "presentation-level", "punctuation-trim", "quotes", "region-break-after",
	    "region-break-before", "region-break-inside", "region-fragment",
	    "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness",
	    "right", "rotation", "rotation-point", "ruby-align", "ruby-overhang",
	    "ruby-position", "ruby-span", "shape-image-threshold", "shape-inside", "shape-margin",
	    "shape-outside", "size", "speak", "speak-as", "speak-header",
	    "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set",
	    "tab-size", "table-layout", "target", "target-name", "target-new",
	    "target-position", "text-align", "text-align-last", "text-decoration",
	    "text-decoration-color", "text-decoration-line", "text-decoration-skip",
	    "text-decoration-style", "text-emphasis", "text-emphasis-color",
	    "text-emphasis-position", "text-emphasis-style", "text-height",
	    "text-indent", "text-justify", "text-outline", "text-overflow", "text-shadow",
	    "text-size-adjust", "text-space-collapse", "text-transform", "text-underline-position",
	    "text-wrap", "top", "transform", "transform-origin", "transform-style",
	    "transition", "transition-delay", "transition-duration",
	    "transition-property", "transition-timing-function", "unicode-bidi",
	    "user-select", "vertical-align", "visibility", "voice-balance", "voice-duration",
	    "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress",
	    "voice-volume", "volume", "white-space", "widows", "width", "will-change", "word-break",
	    "word-spacing", "word-wrap", "z-index",
	    // SVG-specific
	    "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color",
	    "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events",
	    "color-interpolation", "color-interpolation-filters",
	    "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering",
	    "marker", "marker-end", "marker-mid", "marker-start", "shape-rendering", "stroke",
	    "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin",
	    "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering",
	    "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal",
	    "glyph-orientation-vertical", "text-anchor", "writing-mode"
	  ], propertyKeywords = keySet(propertyKeywords_);

	  var nonStandardPropertyKeywords_ = [
	    "scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color",
	    "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color",
	    "scrollbar-3d-light-color", "scrollbar-track-color", "shape-inside",
	    "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button",
	    "searchfield-results-decoration", "zoom"
	  ], nonStandardPropertyKeywords = keySet(nonStandardPropertyKeywords_);

	  var fontProperties_ = [
	    "font-family", "src", "unicode-range", "font-variant", "font-feature-settings",
	    "font-stretch", "font-weight", "font-style"
	  ], fontProperties = keySet(fontProperties_);

	  var counterDescriptors_ = [
	    "additive-symbols", "fallback", "negative", "pad", "prefix", "range",
	    "speak-as", "suffix", "symbols", "system"
	  ], counterDescriptors = keySet(counterDescriptors_);

	  var colorKeywords_ = [
	    "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige",
	    "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown",
	    "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue",
	    "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod",
	    "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen",
	    "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen",
	    "darkslateblue", "darkslategray", "darkturquoise", "darkviolet",
	    "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick",
	    "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite",
	    "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew",
	    "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender",
	    "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral",
	    "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink",
	    "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray",
	    "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta",
	    "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple",
	    "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise",
	    "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin",
	    "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered",
	    "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred",
	    "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue",
	    "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown",
	    "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue",
	    "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan",
	    "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white",
	    "whitesmoke", "yellow", "yellowgreen"
	  ], colorKeywords = keySet(colorKeywords_);

	  var valueKeywords_ = [
	    "above", "absolute", "activeborder", "additive", "activecaption", "afar",
	    "after-white-space", "ahead", "alias", "all", "all-scroll", "alphabetic", "alternate",
	    "always", "amharic", "amharic-abegede", "antialiased", "appworkspace",
	    "arabic-indic", "armenian", "asterisks", "attr", "auto", "auto-flow", "avoid", "avoid-column", "avoid-page",
	    "avoid-region", "background", "backwards", "baseline", "below", "bidi-override", "binary",
	    "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box",
	    "both", "bottom", "break", "break-all", "break-word", "bullets", "button", "button-bevel",
	    "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "calc", "cambodian",
	    "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret",
	    "cell", "center", "checkbox", "circle", "cjk-decimal", "cjk-earthly-branch",
	    "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote",
	    "col-resize", "collapse", "color", "color-burn", "color-dodge", "column", "column-reverse",
	    "compact", "condensed", "contain", "content", "contents",
	    "content-box", "context-menu", "continuous", "copy", "counter", "counters", "cover", "crop",
	    "cross", "crosshair", "currentcolor", "cursive", "cyclic", "darken", "dashed", "decimal",
	    "decimal-leading-zero", "default", "default-button", "dense", "destination-atop",
	    "destination-in", "destination-out", "destination-over", "devanagari", "difference",
	    "disc", "discard", "disclosure-closed", "disclosure-open", "document",
	    "dot-dash", "dot-dot-dash",
	    "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out",
	    "element", "ellipse", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede",
	    "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er",
	    "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er",
	    "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et",
	    "ethiopic-halehame-gez", "ethiopic-halehame-om-et",
	    "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et",
	    "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig",
	    "ethiopic-numeric", "ew-resize", "exclusion", "expanded", "extends", "extra-condensed",
	    "extra-expanded", "fantasy", "fast", "fill", "fixed", "flat", "flex", "flex-end", "flex-start", "footnotes",
	    "forwards", "from", "geometricPrecision", "georgian", "graytext", "grid", "groove",
	    "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hard-light", "hebrew",
	    "help", "hidden", "hide", "higher", "highlight", "highlighttext",
	    "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "hue", "icon", "ignore",
	    "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite",
	    "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis",
	    "inline-block", "inline-flex", "inline-grid", "inline-table", "inset", "inside", "intrinsic", "invert",
	    "italic", "japanese-formal", "japanese-informal", "justify", "kannada",
	    "katakana", "katakana-iroha", "keep-all", "khmer",
	    "korean-hangul-formal", "korean-hanja-formal", "korean-hanja-informal",
	    "landscape", "lao", "large", "larger", "left", "level", "lighter", "lighten",
	    "line-through", "linear", "linear-gradient", "lines", "list-item", "listbox", "listitem",
	    "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian",
	    "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian",
	    "lower-roman", "lowercase", "ltr", "luminosity", "malayalam", "match", "matrix", "matrix3d",
	    "media-controls-background", "media-current-time-display",
	    "media-fullscreen-button", "media-mute-button", "media-play-button",
	    "media-return-to-realtime-button", "media-rewind-button",
	    "media-seek-back-button", "media-seek-forward-button", "media-slider",
	    "media-sliderthumb", "media-time-remaining-display", "media-volume-slider",
	    "media-volume-slider-container", "media-volume-sliderthumb", "medium",
	    "menu", "menulist", "menulist-button", "menulist-text",
	    "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic",
	    "mix", "mongolian", "monospace", "move", "multiple", "multiply", "myanmar", "n-resize",
	    "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop",
	    "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap",
	    "ns-resize", "numbers", "numeric", "nw-resize", "nwse-resize", "oblique", "octal", "opacity", "open-quote",
	    "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset",
	    "outside", "outside-shape", "overlay", "overline", "padding", "padding-box",
	    "painted", "page", "paused", "persian", "perspective", "plus-darker", "plus-lighter",
	    "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d",
	    "progress", "push-button", "radial-gradient", "radio", "read-only",
	    "read-write", "read-write-plaintext-only", "rectangle", "region",
	    "relative", "repeat", "repeating-linear-gradient",
	    "repeating-radial-gradient", "repeat-x", "repeat-y", "reset", "reverse",
	    "rgb", "rgba", "ridge", "right", "rotate", "rotate3d", "rotateX", "rotateY",
	    "rotateZ", "round", "row", "row-resize", "row-reverse", "rtl", "run-in", "running",
	    "s-resize", "sans-serif", "saturation", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "screen",
	    "scroll", "scrollbar", "scroll-position", "se-resize", "searchfield",
	    "searchfield-cancel-button", "searchfield-decoration",
	    "searchfield-results-button", "searchfield-results-decoration", "self-start", "self-end",
	    "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama",
	    "simp-chinese-formal", "simp-chinese-informal", "single",
	    "skew", "skewX", "skewY", "skip-white-space", "slide", "slider-horizontal",
	    "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow",
	    "small", "small-caps", "small-caption", "smaller", "soft-light", "solid", "somali",
	    "source-atop", "source-in", "source-out", "source-over", "space", "space-around", "space-between", "space-evenly", "spell-out", "square",
	    "square-button", "start", "static", "status-bar", "stretch", "stroke", "sub",
	    "subpixel-antialiased", "super", "sw-resize", "symbolic", "symbols", "system-ui", "table",
	    "table-caption", "table-cell", "table-column", "table-column-group",
	    "table-footer-group", "table-header-group", "table-row", "table-row-group",
	    "tamil",
	    "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai",
	    "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight",
	    "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er",
	    "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top",
	    "trad-chinese-formal", "trad-chinese-informal", "transform",
	    "translate", "translate3d", "translateX", "translateY", "translateZ",
	    "transparent", "ultra-condensed", "ultra-expanded", "underline", "unset", "up",
	    "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal",
	    "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url",
	    "var", "vertical", "vertical-text", "visible", "visibleFill", "visiblePainted",
	    "visibleStroke", "visual", "w-resize", "wait", "wave", "wider",
	    "window", "windowframe", "windowtext", "words", "wrap", "wrap-reverse", "x-large", "x-small", "xor",
	    "xx-large", "xx-small"
	  ], valueKeywords = keySet(valueKeywords_);

	  var allWords = documentTypes_.concat(mediaTypes_).concat(mediaFeatures_).concat(mediaValueKeywords_)
	    .concat(propertyKeywords_).concat(nonStandardPropertyKeywords_).concat(colorKeywords_)
	    .concat(valueKeywords_);
	  CodeMirror.registerHelper("hintWords", "css", allWords);

	  function tokenCComment(stream, state) {
	    var maybeEnd = false, ch;
	    while ((ch = stream.next()) != null) {
	      if (maybeEnd && ch == "/") {
	        state.tokenize = null;
	        break;
	      }
	      maybeEnd = (ch == "*");
	    }
	    return ["comment", "comment"];
	  }

	  CodeMirror.defineMIME("text/css", {
	    documentTypes: documentTypes,
	    mediaTypes: mediaTypes,
	    mediaFeatures: mediaFeatures,
	    mediaValueKeywords: mediaValueKeywords,
	    propertyKeywords: propertyKeywords,
	    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
	    fontProperties: fontProperties,
	    counterDescriptors: counterDescriptors,
	    colorKeywords: colorKeywords,
	    valueKeywords: valueKeywords,
	    tokenHooks: {
	      "/": function(stream, state) {
	        if (!stream.eat("*")) return false;
	        state.tokenize = tokenCComment;
	        return tokenCComment(stream, state);
	      }
	    },
	    name: "css"
	  });

	  CodeMirror.defineMIME("text/x-scss", {
	    mediaTypes: mediaTypes,
	    mediaFeatures: mediaFeatures,
	    mediaValueKeywords: mediaValueKeywords,
	    propertyKeywords: propertyKeywords,
	    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
	    colorKeywords: colorKeywords,
	    valueKeywords: valueKeywords,
	    fontProperties: fontProperties,
	    allowNested: true,
	    lineComment: "//",
	    tokenHooks: {
	      "/": function(stream, state) {
	        if (stream.eat("/")) {
	          stream.skipToEnd();
	          return ["comment", "comment"];
	        } else if (stream.eat("*")) {
	          state.tokenize = tokenCComment;
	          return tokenCComment(stream, state);
	        } else {
	          return ["operator", "operator"];
	        }
	      },
	      ":": function(stream) {
	        if (stream.match(/\s*\{/, false))
	          return [null, null]
	        return false;
	      },
	      "$": function(stream) {
	        stream.match(/^[\w-]+/);
	        if (stream.match(/^\s*:/, false))
	          return ["variable-2", "variable-definition"];
	        return ["variable-2", "variable"];
	      },
	      "#": function(stream) {
	        if (!stream.eat("{")) return false;
	        return [null, "interpolation"];
	      }
	    },
	    name: "css",
	    helperType: "scss"
	  });

	  CodeMirror.defineMIME("text/x-less", {
	    mediaTypes: mediaTypes,
	    mediaFeatures: mediaFeatures,
	    mediaValueKeywords: mediaValueKeywords,
	    propertyKeywords: propertyKeywords,
	    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
	    colorKeywords: colorKeywords,
	    valueKeywords: valueKeywords,
	    fontProperties: fontProperties,
	    allowNested: true,
	    lineComment: "//",
	    tokenHooks: {
	      "/": function(stream, state) {
	        if (stream.eat("/")) {
	          stream.skipToEnd();
	          return ["comment", "comment"];
	        } else if (stream.eat("*")) {
	          state.tokenize = tokenCComment;
	          return tokenCComment(stream, state);
	        } else {
	          return ["operator", "operator"];
	        }
	      },
	      "@": function(stream) {
	        if (stream.eat("{")) return [null, "interpolation"];
	        if (stream.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/, false)) return false;
	        stream.eatWhile(/[\w\\\-]/);
	        if (stream.match(/^\s*:/, false))
	          return ["variable-2", "variable-definition"];
	        return ["variable-2", "variable"];
	      },
	      "&": function() {
	        return ["atom", "atom"];
	      }
	    },
	    name: "css",
	    helperType: "less"
	  });

	  CodeMirror.defineMIME("text/x-gss", {
	    documentTypes: documentTypes,
	    mediaTypes: mediaTypes,
	    mediaFeatures: mediaFeatures,
	    propertyKeywords: propertyKeywords,
	    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
	    fontProperties: fontProperties,
	    counterDescriptors: counterDescriptors,
	    colorKeywords: colorKeywords,
	    valueKeywords: valueKeywords,
	    supportsAtComponent: true,
	    tokenHooks: {
	      "/": function(stream, state) {
	        if (!stream.eat("*")) return false;
	        state.tokenize = tokenCComment;
	        return tokenCComment(stream, state);
	      }
	    },
	    name: "css",
	    helperType: "gss"
	  });

	});


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE

	(function(mod) {
	  if (true) // CommonJS
	    mod(__webpack_require__(95), __webpack_require__(290), __webpack_require__(208), __webpack_require__(206));
	  else if (typeof define == "function" && define.amd) // AMD
	    define(["../../lib/codemirror", "../xml/xml", "../javascript/javascript", "../css/css"], mod);
	  else // Plain browser env
	    mod(CodeMirror);
	})(function(CodeMirror) {
	  "use strict";

	  var defaultTags = {
	    script: [
	      ["lang", /(javascript|babel)/i, "javascript"],
	      ["type", /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i, "javascript"],
	      ["type", /./, "text/plain"],
	      [null, null, "javascript"]
	    ],
	    style:  [
	      ["lang", /^css$/i, "css"],
	      ["type", /^(text\/)?(x-)?(stylesheet|css)$/i, "css"],
	      ["type", /./, "text/plain"],
	      [null, null, "css"]
	    ]
	  };

	  function maybeBackup(stream, pat, style) {
	    var cur = stream.current(), close = cur.search(pat);
	    if (close > -1) {
	      stream.backUp(cur.length - close);
	    } else if (cur.match(/<\/?$/)) {
	      stream.backUp(cur.length);
	      if (!stream.match(pat, false)) stream.match(cur);
	    }
	    return style;
	  }

	  var attrRegexpCache = {};
	  function getAttrRegexp(attr) {
	    var regexp = attrRegexpCache[attr];
	    if (regexp) return regexp;
	    return attrRegexpCache[attr] = new RegExp("\\s+" + attr + "\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*");
	  }

	  function getAttrValue(text, attr) {
	    var match = text.match(getAttrRegexp(attr))
	    return match ? /^\s*(.*?)\s*$/.exec(match[2])[1] : ""
	  }

	  function getTagRegexp(tagName, anchored) {
	    return new RegExp((anchored ? "^" : "") + "<\/\s*" + tagName + "\s*>", "i");
	  }

	  function addTags(from, to) {
	    for (var tag in from) {
	      var dest = to[tag] || (to[tag] = []);
	      var source = from[tag];
	      for (var i = source.length - 1; i >= 0; i--)
	        dest.unshift(source[i])
	    }
	  }

	  function findMatchingMode(tagInfo, tagText) {
	    for (var i = 0; i < tagInfo.length; i++) {
	      var spec = tagInfo[i];
	      if (!spec[0] || spec[1].test(getAttrValue(tagText, spec[0]))) return spec[2];
	    }
	  }

	  CodeMirror.defineMode("htmlmixed", function (config, parserConfig) {
	    var htmlMode = CodeMirror.getMode(config, {
	      name: "xml",
	      htmlMode: true,
	      multilineTagIndentFactor: parserConfig.multilineTagIndentFactor,
	      multilineTagIndentPastTag: parserConfig.multilineTagIndentPastTag
	    });

	    var tags = {};
	    var configTags = parserConfig && parserConfig.tags, configScript = parserConfig && parserConfig.scriptTypes;
	    addTags(defaultTags, tags);
	    if (configTags) addTags(configTags, tags);
	    if (configScript) for (var i = configScript.length - 1; i >= 0; i--)
	      tags.script.unshift(["type", configScript[i].matches, configScript[i].mode])

	    function html(stream, state) {
	      var style = htmlMode.token(stream, state.htmlState), tag = /\btag\b/.test(style), tagName
	      if (tag && !/[<>\s\/]/.test(stream.current()) &&
	          (tagName = state.htmlState.tagName && state.htmlState.tagName.toLowerCase()) &&
	          tags.hasOwnProperty(tagName)) {
	        state.inTag = tagName + " "
	      } else if (state.inTag && tag && />$/.test(stream.current())) {
	        var inTag = /^([\S]+) (.*)/.exec(state.inTag)
	        state.inTag = null
	        var modeSpec = stream.current() == ">" && findMatchingMode(tags[inTag[1]], inTag[2])
	        var mode = CodeMirror.getMode(config, modeSpec)
	        var endTagA = getTagRegexp(inTag[1], true), endTag = getTagRegexp(inTag[1], false);
	        state.token = function (stream, state) {
	          if (stream.match(endTagA, false)) {
	            state.token = html;
	            state.localState = state.localMode = null;
	            return null;
	          }
	          return maybeBackup(stream, endTag, state.localMode.token(stream, state.localState));
	        };
	        state.localMode = mode;
	        state.localState = CodeMirror.startState(mode, htmlMode.indent(state.htmlState, ""));
	      } else if (state.inTag) {
	        state.inTag += stream.current()
	        if (stream.eol()) state.inTag += " "
	      }
	      return style;
	    };

	    return {
	      startState: function () {
	        var state = CodeMirror.startState(htmlMode);
	        return {token: html, inTag: null, localMode: null, localState: null, htmlState: state};
	      },

	      copyState: function (state) {
	        var local;
	        if (state.localState) {
	          local = CodeMirror.copyState(state.localMode, state.localState);
	        }
	        return {token: state.token, inTag: state.inTag,
	                localMode: state.localMode, localState: local,
	                htmlState: CodeMirror.copyState(htmlMode, state.htmlState)};
	      },

	      token: function (stream, state) {
	        return state.token(stream, state);
	      },

	      indent: function (state, textAfter, line) {
	        if (!state.localMode || /^\s*<\//.test(textAfter))
	          return htmlMode.indent(state.htmlState, textAfter);
	        else if (state.localMode.indent)
	          return state.localMode.indent(state.localState, textAfter, line);
	        else
	          return CodeMirror.Pass;
	      },

	      innerMode: function (state) {
	        return {state: state.localState || state.htmlState, mode: state.localMode || htmlMode};
	      }
	    };
	  }, "xml", "javascript", "css");

	  CodeMirror.defineMIME("text/html", "htmlmixed");
	});


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE

	(function(mod) {
	  if (true) // CommonJS
	    mod(__webpack_require__(95));
	  else if (typeof define == "function" && define.amd) // AMD
	    define(["../../lib/codemirror"], mod);
	  else // Plain browser env
	    mod(CodeMirror);
	})(function(CodeMirror) {
	"use strict";

	CodeMirror.defineMode("javascript", function(config, parserConfig) {
	  var indentUnit = config.indentUnit;
	  var statementIndent = parserConfig.statementIndent;
	  var jsonldMode = parserConfig.jsonld;
	  var jsonMode = parserConfig.json || jsonldMode;
	  var isTS = parserConfig.typescript;
	  var wordRE = parserConfig.wordCharacters || /[\w$\xa1-\uffff]/;

	  // Tokenizer

	  var keywords = function(){
	    function kw(type) {return {type: type, style: "keyword"};}
	    var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c"), D = kw("keyword d");
	    var operator = kw("operator"), atom = {type: "atom", style: "atom"};

	    var jsKeywords = {
	      "if": kw("if"), "while": A, "with": A, "else": B, "do": B, "try": B, "finally": B,
	      "return": D, "break": D, "continue": D, "new": kw("new"), "delete": C, "void": C, "throw": C,
	      "debugger": kw("debugger"), "var": kw("var"), "const": kw("var"), "let": kw("var"),
	      "function": kw("function"), "catch": kw("catch"),
	      "for": kw("for"), "switch": kw("switch"), "case": kw("case"), "default": kw("default"),
	      "in": operator, "typeof": operator, "instanceof": operator,
	      "true": atom, "false": atom, "null": atom, "undefined": atom, "NaN": atom, "Infinity": atom,
	      "this": kw("this"), "class": kw("class"), "super": kw("atom"),
	      "yield": C, "export": kw("export"), "import": kw("import"), "extends": C,
	      "await": C
	    };

	    // Extend the 'normal' keywords with the TypeScript language extensions
	    if (isTS) {
	      var type = {type: "variable", style: "type"};
	      var tsKeywords = {
	        // object-like things
	        "interface": kw("class"),
	        "implements": C,
	        "namespace": C,
	        "module": kw("module"),
	        "enum": kw("module"),

	        // scope modifiers
	        "public": kw("modifier"),
	        "private": kw("modifier"),
	        "protected": kw("modifier"),
	        "abstract": kw("modifier"),
	        "readonly": kw("modifier"),

	        // types
	        "string": type, "number": type, "boolean": type, "any": type
	      };

	      for (var attr in tsKeywords) {
	        jsKeywords[attr] = tsKeywords[attr];
	      }
	    }

	    return jsKeywords;
	  }();

	  var isOperatorChar = /[+\-*&%=<>!?|~^@]/;
	  var isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;

	  function readRegexp(stream) {
	    var escaped = false, next, inSet = false;
	    while ((next = stream.next()) != null) {
	      if (!escaped) {
	        if (next == "/" && !inSet) return;
	        if (next == "[") inSet = true;
	        else if (inSet && next == "]") inSet = false;
	      }
	      escaped = !escaped && next == "\\";
	    }
	  }

	  // Used as scratch variables to communicate multiple values without
	  // consing up tons of objects.
	  var type, content;
	  function ret(tp, style, cont) {
	    type = tp; content = cont;
	    return style;
	  }
	  function tokenBase(stream, state) {
	    var ch = stream.next();
	    if (ch == '"' || ch == "'") {
	      state.tokenize = tokenString(ch);
	      return state.tokenize(stream, state);
	    } else if (ch == "." && stream.match(/^\d+(?:[eE][+\-]?\d+)?/)) {
	      return ret("number", "number");
	    } else if (ch == "." && stream.match("..")) {
	      return ret("spread", "meta");
	    } else if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
	      return ret(ch);
	    } else if (ch == "=" && stream.eat(">")) {
	      return ret("=>", "operator");
	    } else if (ch == "0" && stream.eat(/x/i)) {
	      stream.eatWhile(/[\da-f]/i);
	      return ret("number", "number");
	    } else if (ch == "0" && stream.eat(/o/i)) {
	      stream.eatWhile(/[0-7]/i);
	      return ret("number", "number");
	    } else if (ch == "0" && stream.eat(/b/i)) {
	      stream.eatWhile(/[01]/i);
	      return ret("number", "number");
	    } else if (/\d/.test(ch)) {
	      stream.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
	      return ret("number", "number");
	    } else if (ch == "/") {
	      if (stream.eat("*")) {
	        state.tokenize = tokenComment;
	        return tokenComment(stream, state);
	      } else if (stream.eat("/")) {
	        stream.skipToEnd();
	        return ret("comment", "comment");
	      } else if (expressionAllowed(stream, state, 1)) {
	        readRegexp(stream);
	        stream.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/);
	        return ret("regexp", "string-2");
	      } else {
	        stream.eat("=");
	        return ret("operator", "operator", stream.current());
	      }
	    } else if (ch == "`") {
	      state.tokenize = tokenQuasi;
	      return tokenQuasi(stream, state);
	    } else if (ch == "#") {
	      stream.skipToEnd();
	      return ret("error", "error");
	    } else if (isOperatorChar.test(ch)) {
	      if (ch != ">" || !state.lexical || state.lexical.type != ">") {
	        if (stream.eat("=")) {
	          if (ch == "!" || ch == "=") stream.eat("=")
	        } else if (/[<>*+\-]/.test(ch)) {
	          stream.eat(ch)
	          if (ch == ">") stream.eat(ch)
	        }
	      }
	      return ret("operator", "operator", stream.current());
	    } else if (wordRE.test(ch)) {
	      stream.eatWhile(wordRE);
	      var word = stream.current()
	      if (state.lastType != ".") {
	        if (keywords.propertyIsEnumerable(word)) {
	          var kw = keywords[word]
	          return ret(kw.type, kw.style, word)
	        }
	        if (word == "async" && stream.match(/^\s*[\(\w]/, false))
	          return ret("async", "keyword", word)
	      }
	      return ret("variable", "variable", word)
	    }
	  }

	  function tokenString(quote) {
	    return function(stream, state) {
	      var escaped = false, next;
	      if (jsonldMode && stream.peek() == "@" && stream.match(isJsonldKeyword)){
	        state.tokenize = tokenBase;
	        return ret("jsonld-keyword", "meta");
	      }
	      while ((next = stream.next()) != null) {
	        if (next == quote && !escaped) break;
	        escaped = !escaped && next == "\\";
	      }
	      if (!escaped) state.tokenize = tokenBase;
	      return ret("string", "string");
	    };
	  }

	  function tokenComment(stream, state) {
	    var maybeEnd = false, ch;
	    while (ch = stream.next()) {
	      if (ch == "/" && maybeEnd) {
	        state.tokenize = tokenBase;
	        break;
	      }
	      maybeEnd = (ch == "*");
	    }
	    return ret("comment", "comment");
	  }

	  function tokenQuasi(stream, state) {
	    var escaped = false, next;
	    while ((next = stream.next()) != null) {
	      if (!escaped && (next == "`" || next == "$" && stream.eat("{"))) {
	        state.tokenize = tokenBase;
	        break;
	      }
	      escaped = !escaped && next == "\\";
	    }
	    return ret("quasi", "string-2", stream.current());
	  }

	  var brackets = "([{}])";
	  // This is a crude lookahead trick to try and notice that we're
	  // parsing the argument patterns for a fat-arrow function before we
	  // actually hit the arrow token. It only works if the arrow is on
	  // the same line as the arguments and there's no strange noise
	  // (comments) in between. Fallback is to only notice when we hit the
	  // arrow, and not declare the arguments as locals for the arrow
	  // body.
	  function findFatArrow(stream, state) {
	    if (state.fatArrowAt) state.fatArrowAt = null;
	    var arrow = stream.string.indexOf("=>", stream.start);
	    if (arrow < 0) return;

	    if (isTS) { // Try to skip TypeScript return type declarations after the arguments
	      var m = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(stream.string.slice(stream.start, arrow))
	      if (m) arrow = m.index
	    }

	    var depth = 0, sawSomething = false;
	    for (var pos = arrow - 1; pos >= 0; --pos) {
	      var ch = stream.string.charAt(pos);
	      var bracket = brackets.indexOf(ch);
	      if (bracket >= 0 && bracket < 3) {
	        if (!depth) { ++pos; break; }
	        if (--depth == 0) { if (ch == "(") sawSomething = true; break; }
	      } else if (bracket >= 3 && bracket < 6) {
	        ++depth;
	      } else if (wordRE.test(ch)) {
	        sawSomething = true;
	      } else if (/["'\/]/.test(ch)) {
	        return;
	      } else if (sawSomething && !depth) {
	        ++pos;
	        break;
	      }
	    }
	    if (sawSomething && !depth) state.fatArrowAt = pos;
	  }

	  // Parser

	  var atomicTypes = {"atom": true, "number": true, "variable": true, "string": true, "regexp": true, "this": true, "jsonld-keyword": true};

	  function JSLexical(indented, column, type, align, prev, info) {
	    this.indented = indented;
	    this.column = column;
	    this.type = type;
	    this.prev = prev;
	    this.info = info;
	    if (align != null) this.align = align;
	  }

	  function inScope(state, varname) {
	    for (var v = state.localVars; v; v = v.next)
	      if (v.name == varname) return true;
	    for (var cx = state.context; cx; cx = cx.prev) {
	      for (var v = cx.vars; v; v = v.next)
	        if (v.name == varname) return true;
	    }
	  }

	  function parseJS(state, style, type, content, stream) {
	    var cc = state.cc;
	    // Communicate our context to the combinators.
	    // (Less wasteful than consing up a hundred closures on every call.)
	    cx.state = state; cx.stream = stream; cx.marked = null, cx.cc = cc; cx.style = style;

	    if (!state.lexical.hasOwnProperty("align"))
	      state.lexical.align = true;

	    while(true) {
	      var combinator = cc.length ? cc.pop() : jsonMode ? expression : statement;
	      if (combinator(type, content)) {
	        while(cc.length && cc[cc.length - 1].lex)
	          cc.pop()();
	        if (cx.marked) return cx.marked;
	        if (type == "variable" && inScope(state, content)) return "variable-2";
	        return style;
	      }
	    }
	  }

	  // Combinator utils

	  var cx = {state: null, column: null, marked: null, cc: null};
	  function pass() {
	    for (var i = arguments.length - 1; i >= 0; i--) cx.cc.push(arguments[i]);
	  }
	  function cont() {
	    pass.apply(null, arguments);
	    return true;
	  }
	  function register(varname) {
	    function inList(list) {
	      for (var v = list; v; v = v.next)
	        if (v.name == varname) return true;
	      return false;
	    }
	    var state = cx.state;
	    cx.marked = "def";
	    if (state.context) {
	      if (inList(state.localVars)) return;
	      state.localVars = {name: varname, next: state.localVars};
	    } else {
	      if (inList(state.globalVars)) return;
	      if (parserConfig.globalVars)
	        state.globalVars = {name: varname, next: state.globalVars};
	    }
	  }

	  // Combinators

	  var defaultVars = {name: "this", next: {name: "arguments"}};
	  function pushcontext() {
	    cx.state.context = {prev: cx.state.context, vars: cx.state.localVars};
	    cx.state.localVars = defaultVars;
	  }
	  function popcontext() {
	    cx.state.localVars = cx.state.context.vars;
	    cx.state.context = cx.state.context.prev;
	  }
	  function pushlex(type, info) {
	    var result = function() {
	      var state = cx.state, indent = state.indented;
	      if (state.lexical.type == "stat") indent = state.lexical.indented;
	      else for (var outer = state.lexical; outer && outer.type == ")" && outer.align; outer = outer.prev)
	        indent = outer.indented;
	      state.lexical = new JSLexical(indent, cx.stream.column(), type, null, state.lexical, info);
	    };
	    result.lex = true;
	    return result;
	  }
	  function poplex() {
	    var state = cx.state;
	    if (state.lexical.prev) {
	      if (state.lexical.type == ")")
	        state.indented = state.lexical.indented;
	      state.lexical = state.lexical.prev;
	    }
	  }
	  poplex.lex = true;

	  function expect(wanted) {
	    function exp(type) {
	      if (type == wanted) return cont();
	      else if (wanted == ";") return pass();
	      else return cont(exp);
	    };
	    return exp;
	  }

	  function statement(type, value) {
	    if (type == "var") return cont(pushlex("vardef", value.length), vardef, expect(";"), poplex);
	    if (type == "keyword a") return cont(pushlex("form"), parenExpr, statement, poplex);
	    if (type == "keyword b") return cont(pushlex("form"), statement, poplex);
	    if (type == "keyword d") return cx.stream.match(/^\s*$/, false) ? cont() : cont(pushlex("stat"), maybeexpression, expect(";"), poplex);
	    if (type == "debugger") return cont(expect(";"));
	    if (type == "{") return cont(pushlex("}"), block, poplex);
	    if (type == ";") return cont();
	    if (type == "if") {
	      if (cx.state.lexical.info == "else" && cx.state.cc[cx.state.cc.length - 1] == poplex)
	        cx.state.cc.pop()();
	      return cont(pushlex("form"), parenExpr, statement, poplex, maybeelse);
	    }
	    if (type == "function") return cont(functiondef);
	    if (type == "for") return cont(pushlex("form"), forspec, statement, poplex);
	    if (type == "variable") {
	      if (isTS && value == "type") {
	        cx.marked = "keyword"
	        return cont(typeexpr, expect("operator"), typeexpr, expect(";"));
	      } if (isTS && value == "declare") {
	        cx.marked = "keyword"
	        return cont(statement)
	      } else {
	        return cont(pushlex("stat"), maybelabel);
	      }
	    }
	    if (type == "switch") return cont(pushlex("form"), parenExpr, expect("{"), pushlex("}", "switch"),
	                                      block, poplex, poplex);
	    if (type == "case") return cont(expression, expect(":"));
	    if (type == "default") return cont(expect(":"));
	    if (type == "catch") return cont(pushlex("form"), pushcontext, expect("("), funarg, expect(")"),
	                                     statement, poplex, popcontext);
	    if (type == "class") return cont(pushlex("form"), className, poplex);
	    if (type == "export") return cont(pushlex("stat"), afterExport, poplex);
	    if (type == "import") return cont(pushlex("stat"), afterImport, poplex);
	    if (type == "module") return cont(pushlex("form"), pattern, expect("{"), pushlex("}"), block, poplex, poplex)
	    if (type == "async") return cont(statement)
	    if (value == "@") return cont(expression, statement)
	    return pass(pushlex("stat"), expression, expect(";"), poplex);
	  }
	  function expression(type) {
	    return expressionInner(type, false);
	  }
	  function expressionNoComma(type) {
	    return expressionInner(type, true);
	  }
	  function parenExpr(type) {
	    if (type != "(") return pass()
	    return cont(pushlex(")"), expression, expect(")"), poplex)
	  }
	  function expressionInner(type, noComma) {
	    if (cx.state.fatArrowAt == cx.stream.start) {
	      var body = noComma ? arrowBodyNoComma : arrowBody;
	      if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, expect("=>"), body, popcontext);
	      else if (type == "variable") return pass(pushcontext, pattern, expect("=>"), body, popcontext);
	    }

	    var maybeop = noComma ? maybeoperatorNoComma : maybeoperatorComma;
	    if (atomicTypes.hasOwnProperty(type)) return cont(maybeop);
	    if (type == "function") return cont(functiondef, maybeop);
	    if (type == "class") return cont(pushlex("form"), classExpression, poplex);
	    if (type == "keyword c" || type == "async") return cont(noComma ? expressionNoComma : expression);
	    if (type == "(") return cont(pushlex(")"), maybeexpression, expect(")"), poplex, maybeop);
	    if (type == "operator" || type == "spread") return cont(noComma ? expressionNoComma : expression);
	    if (type == "[") return cont(pushlex("]"), arrayLiteral, poplex, maybeop);
	    if (type == "{") return contCommasep(objprop, "}", null, maybeop);
	    if (type == "quasi") return pass(quasi, maybeop);
	    if (type == "new") return cont(maybeTarget(noComma));
	    return cont();
	  }
	  function maybeexpression(type) {
	    if (type.match(/[;\}\)\],]/)) return pass();
	    return pass(expression);
	  }

	  function maybeoperatorComma(type, value) {
	    if (type == ",") return cont(expression);
	    return maybeoperatorNoComma(type, value, false);
	  }
	  function maybeoperatorNoComma(type, value, noComma) {
	    var me = noComma == false ? maybeoperatorComma : maybeoperatorNoComma;
	    var expr = noComma == false ? expression : expressionNoComma;
	    if (type == "=>") return cont(pushcontext, noComma ? arrowBodyNoComma : arrowBody, popcontext);
	    if (type == "operator") {
	      if (/\+\+|--/.test(value) || isTS && value == "!") return cont(me);
	      if (value == "?") return cont(expression, expect(":"), expr);
	      return cont(expr);
	    }
	    if (type == "quasi") { return pass(quasi, me); }
	    if (type == ";") return;
	    if (type == "(") return contCommasep(expressionNoComma, ")", "call", me);
	    if (type == ".") return cont(property, me);
	    if (type == "[") return cont(pushlex("]"), maybeexpression, expect("]"), poplex, me);
	    if (isTS && value == "as") { cx.marked = "keyword"; return cont(typeexpr, me) }
	    if (type == "regexp") {
	      cx.state.lastType = cx.marked = "operator"
	      cx.stream.backUp(cx.stream.pos - cx.stream.start - 1)
	      return cont(expr)
	    }
	  }
	  function quasi(type, value) {
	    if (type != "quasi") return pass();
	    if (value.slice(value.length - 2) != "${") return cont(quasi);
	    return cont(expression, continueQuasi);
	  }
	  function continueQuasi(type) {
	    if (type == "}") {
	      cx.marked = "string-2";
	      cx.state.tokenize = tokenQuasi;
	      return cont(quasi);
	    }
	  }
	  function arrowBody(type) {
	    findFatArrow(cx.stream, cx.state);
	    return pass(type == "{" ? statement : expression);
	  }
	  function arrowBodyNoComma(type) {
	    findFatArrow(cx.stream, cx.state);
	    return pass(type == "{" ? statement : expressionNoComma);
	  }
	  function maybeTarget(noComma) {
	    return function(type) {
	      if (type == ".") return cont(noComma ? targetNoComma : target);
	      else if (type == "variable" && isTS) return cont(maybeTypeArgs, noComma ? maybeoperatorNoComma : maybeoperatorComma)
	      else return pass(noComma ? expressionNoComma : expression);
	    };
	  }
	  function target(_, value) {
	    if (value == "target") { cx.marked = "keyword"; return cont(maybeoperatorComma); }
	  }
	  function targetNoComma(_, value) {
	    if (value == "target") { cx.marked = "keyword"; return cont(maybeoperatorNoComma); }
	  }
	  function maybelabel(type) {
	    if (type == ":") return cont(poplex, statement);
	    return pass(maybeoperatorComma, expect(";"), poplex);
	  }
	  function property(type) {
	    if (type == "variable") {cx.marked = "property"; return cont();}
	  }
	  function objprop(type, value) {
	    if (type == "async") {
	      cx.marked = "property";
	      return cont(objprop);
	    } else if (type == "variable" || cx.style == "keyword") {
	      cx.marked = "property";
	      if (value == "get" || value == "set") return cont(getterSetter);
	      var m // Work around fat-arrow-detection complication for detecting typescript typed arrow params
	      if (isTS && cx.state.fatArrowAt == cx.stream.start && (m = cx.stream.match(/^\s*:\s*/, false)))
	        cx.state.fatArrowAt = cx.stream.pos + m[0].length
	      return cont(afterprop);
	    } else if (type == "number" || type == "string") {
	      cx.marked = jsonldMode ? "property" : (cx.style + " property");
	      return cont(afterprop);
	    } else if (type == "jsonld-keyword") {
	      return cont(afterprop);
	    } else if (type == "modifier") {
	      return cont(objprop)
	    } else if (type == "[") {
	      return cont(expression, expect("]"), afterprop);
	    } else if (type == "spread") {
	      return cont(expressionNoComma, afterprop);
	    } else if (value == "*") {
	      cx.marked = "keyword";
	      return cont(objprop);
	    } else if (type == ":") {
	      return pass(afterprop)
	    }
	  }
	  function getterSetter(type) {
	    if (type != "variable") return pass(afterprop);
	    cx.marked = "property";
	    return cont(functiondef);
	  }
	  function afterprop(type) {
	    if (type == ":") return cont(expressionNoComma);
	    if (type == "(") return pass(functiondef);
	  }
	  function commasep(what, end, sep) {
	    function proceed(type, value) {
	      if (sep ? sep.indexOf(type) > -1 : type == ",") {
	        var lex = cx.state.lexical;
	        if (lex.info == "call") lex.pos = (lex.pos || 0) + 1;
	        return cont(function(type, value) {
	          if (type == end || value == end) return pass()
	          return pass(what)
	        }, proceed);
	      }
	      if (type == end || value == end) return cont();
	      return cont(expect(end));
	    }
	    return function(type, value) {
	      if (type == end || value == end) return cont();
	      return pass(what, proceed);
	    };
	  }
	  function contCommasep(what, end, info) {
	    for (var i = 3; i < arguments.length; i++)
	      cx.cc.push(arguments[i]);
	    return cont(pushlex(end, info), commasep(what, end), poplex);
	  }
	  function block(type) {
	    if (type == "}") return cont();
	    return pass(statement, block);
	  }
	  function maybetype(type, value) {
	    if (isTS) {
	      if (type == ":") return cont(typeexpr);
	      if (value == "?") return cont(maybetype);
	    }
	  }
	  function typeexpr(type, value) {
	    if (type == "variable" || value == "void") {
	      if (value == "keyof") {
	        cx.marked = "keyword"
	        return cont(typeexpr)
	      } else {
	        cx.marked = "type"
	        return cont(afterType)
	      }
	    }
	    if (type == "string" || type == "number" || type == "atom") return cont(afterType);
	    if (type == "[") return cont(pushlex("]"), commasep(typeexpr, "]", ","), poplex, afterType)
	    if (type == "{") return cont(pushlex("}"), commasep(typeprop, "}", ",;"), poplex, afterType)
	    if (type == "(") return cont(commasep(typearg, ")"), maybeReturnType)
	  }
	  function maybeReturnType(type) {
	    if (type == "=>") return cont(typeexpr)
	  }
	  function typeprop(type, value) {
	    if (type == "variable" || cx.style == "keyword") {
	      cx.marked = "property"
	      return cont(typeprop)
	    } else if (value == "?") {
	      return cont(typeprop)
	    } else if (type == ":") {
	      return cont(typeexpr)
	    } else if (type == "[") {
	      return cont(expression, maybetype, expect("]"), typeprop)
	    }
	  }
	  function typearg(type) {
	    if (type == "variable") return cont(typearg)
	    else if (type == ":") return cont(typeexpr)
	  }
	  function afterType(type, value) {
	    if (value == "<") return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType)
	    if (value == "|" || type == ".") return cont(typeexpr)
	    if (type == "[") return cont(expect("]"), afterType)
	    if (value == "extends") return cont(typeexpr)
	  }
	  function maybeTypeArgs(_, value) {
	    if (value == "<") return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType)
	  }
	  function vardef() {
	    return pass(pattern, maybetype, maybeAssign, vardefCont);
	  }
	  function pattern(type, value) {
	    if (type == "modifier") return cont(pattern)
	    if (type == "variable") { register(value); return cont(); }
	    if (type == "spread") return cont(pattern);
	    if (type == "[") return contCommasep(pattern, "]");
	    if (type == "{") return contCommasep(proppattern, "}");
	  }
	  function proppattern(type, value) {
	    if (type == "variable" && !cx.stream.match(/^\s*:/, false)) {
	      register(value);
	      return cont(maybeAssign);
	    }
	    if (type == "variable") cx.marked = "property";
	    if (type == "spread") return cont(pattern);
	    if (type == "}") return pass();
	    return cont(expect(":"), pattern, maybeAssign);
	  }
	  function maybeAssign(_type, value) {
	    if (value == "=") return cont(expressionNoComma);
	  }
	  function vardefCont(type) {
	    if (type == ",") return cont(vardef);
	  }
	  function maybeelse(type, value) {
	    if (type == "keyword b" && value == "else") return cont(pushlex("form", "else"), statement, poplex);
	  }
	  function forspec(type) {
	    if (type == "(") return cont(pushlex(")"), forspec1, expect(")"), poplex);
	  }
	  function forspec1(type) {
	    if (type == "var") return cont(vardef, expect(";"), forspec2);
	    if (type == ";") return cont(forspec2);
	    if (type == "variable") return cont(formaybeinof);
	    return pass(expression, expect(";"), forspec2);
	  }
	  function formaybeinof(_type, value) {
	    if (value == "in" || value == "of") { cx.marked = "keyword"; return cont(expression); }
	    return cont(maybeoperatorComma, forspec2);
	  }
	  function forspec2(type, value) {
	    if (type == ";") return cont(forspec3);
	    if (value == "in" || value == "of") { cx.marked = "keyword"; return cont(expression); }
	    return pass(expression, expect(";"), forspec3);
	  }
	  function forspec3(type) {
	    if (type != ")") cont(expression);
	  }
	  function functiondef(type, value) {
	    if (value == "*") {cx.marked = "keyword"; return cont(functiondef);}
	    if (type == "variable") {register(value); return cont(functiondef);}
	    if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, maybetype, statement, popcontext);
	    if (isTS && value == "<") return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, functiondef)
	  }
	  function funarg(type, value) {
	    if (value == "@") cont(expression, funarg)
	    if (type == "spread" || type == "modifier") return cont(funarg);
	    return pass(pattern, maybetype, maybeAssign);
	  }
	  function classExpression(type, value) {
	    // Class expressions may have an optional name.
	    if (type == "variable") return className(type, value);
	    return classNameAfter(type, value);
	  }
	  function className(type, value) {
	    if (type == "variable") {register(value); return cont(classNameAfter);}
	  }
	  function classNameAfter(type, value) {
	    if (value == "<") return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, classNameAfter)
	    if (value == "extends" || value == "implements" || (isTS && type == ","))
	      return cont(isTS ? typeexpr : expression, classNameAfter);
	    if (type == "{") return cont(pushlex("}"), classBody, poplex);
	  }
	  function classBody(type, value) {
	    if (type == "modifier" || type == "async" ||
	        (type == "variable" &&
	         (value == "static" || value == "get" || value == "set") &&
	         cx.stream.match(/^\s+[\w$\xa1-\uffff]/, false))) {
	      cx.marked = "keyword";
	      return cont(classBody);
	    }
	    if (type == "variable" || cx.style == "keyword") {
	      cx.marked = "property";
	      return cont(isTS ? classfield : functiondef, classBody);
	    }
	    if (type == "[")
	      return cont(expression, expect("]"), isTS ? classfield : functiondef, classBody)
	    if (value == "*") {
	      cx.marked = "keyword";
	      return cont(classBody);
	    }
	    if (type == ";") return cont(classBody);
	    if (type == "}") return cont();
	    if (value == "@") return cont(expression, classBody)
	  }
	  function classfield(type, value) {
	    if (value == "?") return cont(classfield)
	    if (type == ":") return cont(typeexpr, maybeAssign)
	    if (value == "=") return cont(expressionNoComma)
	    return pass(functiondef)
	  }
	  function afterExport(type, value) {
	    if (value == "*") { cx.marked = "keyword"; return cont(maybeFrom, expect(";")); }
	    if (value == "default") { cx.marked = "keyword"; return cont(expression, expect(";")); }
	    if (type == "{") return cont(commasep(exportField, "}"), maybeFrom, expect(";"));
	    return pass(statement);
	  }
	  function exportField(type, value) {
	    if (value == "as") { cx.marked = "keyword"; return cont(expect("variable")); }
	    if (type == "variable") return pass(expressionNoComma, exportField);
	  }
	  function afterImport(type) {
	    if (type == "string") return cont();
	    return pass(importSpec, maybeMoreImports, maybeFrom);
	  }
	  function importSpec(type, value) {
	    if (type == "{") return contCommasep(importSpec, "}");
	    if (type == "variable") register(value);
	    if (value == "*") cx.marked = "keyword";
	    return cont(maybeAs);
	  }
	  function maybeMoreImports(type) {
	    if (type == ",") return cont(importSpec, maybeMoreImports)
	  }
	  function maybeAs(_type, value) {
	    if (value == "as") { cx.marked = "keyword"; return cont(importSpec); }
	  }
	  function maybeFrom(_type, value) {
	    if (value == "from") { cx.marked = "keyword"; return cont(expression); }
	  }
	  function arrayLiteral(type) {
	    if (type == "]") return cont();
	    return pass(commasep(expressionNoComma, "]"));
	  }

	  function isContinuedStatement(state, textAfter) {
	    return state.lastType == "operator" || state.lastType == "," ||
	      isOperatorChar.test(textAfter.charAt(0)) ||
	      /[,.]/.test(textAfter.charAt(0));
	  }

	  function expressionAllowed(stream, state, backUp) {
	    return state.tokenize == tokenBase &&
	      /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(state.lastType) ||
	      (state.lastType == "quasi" && /\{\s*$/.test(stream.string.slice(0, stream.pos - (backUp || 0))))
	  }

	  // Interface

	  return {
	    startState: function(basecolumn) {
	      var state = {
	        tokenize: tokenBase,
	        lastType: "sof",
	        cc: [],
	        lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
	        localVars: parserConfig.localVars,
	        context: parserConfig.localVars && {vars: parserConfig.localVars},
	        indented: basecolumn || 0
	      };
	      if (parserConfig.globalVars && typeof parserConfig.globalVars == "object")
	        state.globalVars = parserConfig.globalVars;
	      return state;
	    },

	    token: function(stream, state) {
	      if (stream.sol()) {
	        if (!state.lexical.hasOwnProperty("align"))
	          state.lexical.align = false;
	        state.indented = stream.indentation();
	        findFatArrow(stream, state);
	      }
	      if (state.tokenize != tokenComment && stream.eatSpace()) return null;
	      var style = state.tokenize(stream, state);
	      if (type == "comment") return style;
	      state.lastType = type == "operator" && (content == "++" || content == "--") ? "incdec" : type;
	      return parseJS(state, style, type, content, stream);
	    },

	    indent: function(state, textAfter) {
	      if (state.tokenize == tokenComment) return CodeMirror.Pass;
	      if (state.tokenize != tokenBase) return 0;
	      var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical, top
	      // Kludge to prevent 'maybelse' from blocking lexical scope pops
	      if (!/^\s*else\b/.test(textAfter)) for (var i = state.cc.length - 1; i >= 0; --i) {
	        var c = state.cc[i];
	        if (c == poplex) lexical = lexical.prev;
	        else if (c != maybeelse) break;
	      }
	      while ((lexical.type == "stat" || lexical.type == "form") &&
	             (firstChar == "}" || ((top = state.cc[state.cc.length - 1]) &&
	                                   (top == maybeoperatorComma || top == maybeoperatorNoComma) &&
	                                   !/^[,\.=+\-*:?[\(]/.test(textAfter))))
	        lexical = lexical.prev;
	      if (statementIndent && lexical.type == ")" && lexical.prev.type == "stat")
	        lexical = lexical.prev;
	      var type = lexical.type, closing = firstChar == type;

	      if (type == "vardef") return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? lexical.info + 1 : 0);
	      else if (type == "form" && firstChar == "{") return lexical.indented;
	      else if (type == "form") return lexical.indented + indentUnit;
	      else if (type == "stat")
	        return lexical.indented + (isContinuedStatement(state, textAfter) ? statementIndent || indentUnit : 0);
	      else if (lexical.info == "switch" && !closing && parserConfig.doubleIndentSwitch != false)
	        return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit : 2 * indentUnit);
	      else if (lexical.align) return lexical.column + (closing ? 0 : 1);
	      else return lexical.indented + (closing ? 0 : indentUnit);
	    },

	    electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
	    blockCommentStart: jsonMode ? null : "/*",
	    blockCommentEnd: jsonMode ? null : "*/",
	    blockCommentContinue: jsonMode ? null : " * ",
	    lineComment: jsonMode ? null : "//",
	    fold: "brace",
	    closeBrackets: "()[]{}''\"\"``",

	    helperType: jsonMode ? "json" : "javascript",
	    jsonldMode: jsonldMode,
	    jsonMode: jsonMode,

	    expressionAllowed: expressionAllowed,

	    skipExpression: function(state) {
	      var top = state.cc[state.cc.length - 1]
	      if (top == expression || top == expressionNoComma) state.cc.pop()
	    }
	  };
	});

	CodeMirror.registerHelper("wordChars", "javascript", /[\w$]/);

	CodeMirror.defineMIME("text/javascript", "javascript");
	CodeMirror.defineMIME("text/ecmascript", "javascript");
	CodeMirror.defineMIME("application/javascript", "javascript");
	CodeMirror.defineMIME("application/x-javascript", "javascript");
	CodeMirror.defineMIME("application/ecmascript", "javascript");
	CodeMirror.defineMIME("application/json", {name: "javascript", json: true});
	CodeMirror.defineMIME("application/x-json", {name: "javascript", json: true});
	CodeMirror.defineMIME("application/ld+json", {name: "javascript", jsonld: true});
	CodeMirror.defineMIME("text/typescript", { name: "javascript", typescript: true });
	CodeMirror.defineMIME("application/typescript", { name: "javascript", typescript: true });

	});


/***/ }),
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _toConsumableArray2 = __webpack_require__(109);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	exports['default'] = throttleByAnimationFrame;
	exports.throttleByAnimationFrameDecorator = throttleByAnimationFrameDecorator;

	var _getRequestAnimationFrame = __webpack_require__(136);

	var _getRequestAnimationFrame2 = _interopRequireDefault(_getRequestAnimationFrame);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var reqAnimFrame = (0, _getRequestAnimationFrame2['default'])();
	function throttleByAnimationFrame(fn) {
	    var requestId = void 0;
	    var later = function later(args) {
	        return function () {
	            requestId = null;
	            fn.apply(undefined, (0, _toConsumableArray3['default'])(args));
	        };
	    };
	    var throttled = function throttled() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        if (requestId == null) {
	            requestId = reqAnimFrame(later(args));
	        }
	    };
	    throttled.cancel = function () {
	        return (0, _getRequestAnimationFrame.cancelRequestAnimationFrame)(requestId);
	    };
	    return throttled;
	}
	function throttleByAnimationFrameDecorator() {
	    return function (target, key, descriptor) {
	        var fn = descriptor.value;
	        var definingProperty = false;
	        return {
	            configurable: true,
	            get: function get() {
	                if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
	                    return fn;
	                }
	                var boundFn = throttleByAnimationFrame(fn.bind(this));
	                definingProperty = true;
	                Object.defineProperty(this, key, {
	                    value: boundFn,
	                    configurable: true,
	                    writable: true
	                });
	                definingProperty = false;
	                return boundFn;
	            }
	        };
	    };
	}

/***/ }),
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(20);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var __rest = undefined && undefined.__rest || function (s, e) {
	    var t = {};
	    for (var p in s) {
	        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
	    }return t;
	};

	exports['default'] = function (props) {
	    var _props$prefixCls = props.prefixCls,
	        prefixCls = _props$prefixCls === undefined ? 'ant-card' : _props$prefixCls,
	        className = props.className,
	        others = __rest(props, ["prefixCls", "className"]);

	    var classString = (0, _classnames2['default'])(prefixCls + '-grid', className);
	    return _react2['default'].createElement('div', (0, _extends3['default'])({}, others, { className: classString }));
	};

	module.exports = exports['default'];

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	var _defineProperty2 = __webpack_require__(23);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _classCallCheck2 = __webpack_require__(7);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(25);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(12);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(11);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _typeof2 = __webpack_require__(27);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(20);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _addEventListener = __webpack_require__(107);

	var _addEventListener2 = _interopRequireDefault(_addEventListener);

	var _Grid = __webpack_require__(232);

	var _Grid2 = _interopRequireDefault(_Grid);

	var _throttleByAnimationFrame = __webpack_require__(226);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof3["default"])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __rest = undefined && undefined.__rest || function (s, e) {
	    var t = {};
	    for (var p in s) {
	        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
	    }return t;
	};

	var Card = function (_Component) {
	    (0, _inherits3["default"])(Card, _Component);

	    function Card() {
	        (0, _classCallCheck3["default"])(this, Card);

	        var _this = (0, _possibleConstructorReturn3["default"])(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));

	        _this.state = {
	            widerPadding: false
	        };
	        _this.saveRef = function (node) {
	            _this.container = node;
	        };
	        return _this;
	    }

	    (0, _createClass3["default"])(Card, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            this.updateWiderPadding();
	            this.resizeEvent = (0, _addEventListener2["default"])(window, 'resize', this.updateWiderPadding);
	        }
	    }, {
	        key: "componentWillUnmount",
	        value: function componentWillUnmount() {
	            if (this.resizeEvent) {
	                this.resizeEvent.remove();
	            }
	            this.updateWiderPadding.cancel();
	        }
	    }, {
	        key: "updateWiderPadding",
	        value: function updateWiderPadding() {
	            var _this2 = this;

	            if (!this.container) {
	                return;
	            }
	            // 936 is a magic card width pixer number indicated by designer
	            var WIDTH_BOUDARY_PX = 936;
	            if (this.container.offsetWidth >= WIDTH_BOUDARY_PX && !this.state.widerPadding) {
	                this.setState({ widerPadding: true }, function () {
	                    _this2.updateWiderPaddingCalled = true; // first render without css transition
	                });
	            }
	            if (this.container.offsetWidth < WIDTH_BOUDARY_PX && this.state.widerPadding) {
	                this.setState({ widerPadding: false }, function () {
	                    _this2.updateWiderPaddingCalled = true; // first render without css transition
	                });
	            }
	        }
	    }, {
	        key: "isContainGrid",
	        value: function isContainGrid() {
	            var containGrid = void 0;
	            _react.Children.forEach(this.props.children, function (element) {
	                if (element && element.type && element.type === _Grid2["default"]) {
	                    containGrid = true;
	                }
	            });
	            return containGrid;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _classNames;

	            var _a = this.props,
	                _a$prefixCls = _a.prefixCls,
	                prefixCls = _a$prefixCls === undefined ? 'ant-card' : _a$prefixCls,
	                className = _a.className,
	                extra = _a.extra,
	                bodyStyle = _a.bodyStyle,
	                noHovering = _a.noHovering,
	                title = _a.title,
	                loading = _a.loading,
	                _a$bordered = _a.bordered,
	                bordered = _a$bordered === undefined ? true : _a$bordered,
	                others = __rest(_a, ["prefixCls", "className", "extra", "bodyStyle", "noHovering", "title", "loading", "bordered"]);
	            var children = this.props.children;
	            var classString = (0, _classnames2["default"])(prefixCls, className, (_classNames = {}, (0, _defineProperty3["default"])(_classNames, prefixCls + "-loading", loading), (0, _defineProperty3["default"])(_classNames, prefixCls + "-bordered", bordered), (0, _defineProperty3["default"])(_classNames, prefixCls + "-no-hovering", noHovering), (0, _defineProperty3["default"])(_classNames, prefixCls + "-wider-padding", this.state.widerPadding), (0, _defineProperty3["default"])(_classNames, prefixCls + "-padding-transition", this.updateWiderPaddingCalled), (0, _defineProperty3["default"])(_classNames, prefixCls + "-contain-grid", this.isContainGrid()), _classNames));
	            if (loading) {
	                children = _react2["default"].createElement(
	                    "div",
	                    { className: prefixCls + "-loading-content" },
	                    _react2["default"].createElement("p", { className: prefixCls + "-loading-block", style: { width: '94%' } }),
	                    _react2["default"].createElement(
	                        "p",
	                        null,
	                        _react2["default"].createElement("span", { className: prefixCls + "-loading-block", style: { width: '28%' } }),
	                        _react2["default"].createElement("span", { className: prefixCls + "-loading-block", style: { width: '62%' } })
	                    ),
	                    _react2["default"].createElement(
	                        "p",
	                        null,
	                        _react2["default"].createElement("span", { className: prefixCls + "-loading-block", style: { width: '22%' } }),
	                        _react2["default"].createElement("span", { className: prefixCls + "-loading-block", style: { width: '66%' } })
	                    ),
	                    _react2["default"].createElement(
	                        "p",
	                        null,
	                        _react2["default"].createElement("span", { className: prefixCls + "-loading-block", style: { width: '56%' } }),
	                        _react2["default"].createElement("span", { className: prefixCls + "-loading-block", style: { width: '39%' } })
	                    ),
	                    _react2["default"].createElement(
	                        "p",
	                        null,
	                        _react2["default"].createElement("span", { className: prefixCls + "-loading-block", style: { width: '21%' } }),
	                        _react2["default"].createElement("span", { className: prefixCls + "-loading-block", style: { width: '15%' } }),
	                        _react2["default"].createElement("span", { className: prefixCls + "-loading-block", style: { width: '40%' } })
	                    )
	                );
	            }
	            var head = void 0;
	            if (title || extra) {
	                head = _react2["default"].createElement(
	                    "div",
	                    { className: prefixCls + "-head" },
	                    title ? _react2["default"].createElement(
	                        "div",
	                        { className: prefixCls + "-head-title" },
	                        title
	                    ) : null,
	                    extra ? _react2["default"].createElement(
	                        "div",
	                        { className: prefixCls + "-extra" },
	                        extra
	                    ) : null
	                );
	            }
	            return _react2["default"].createElement(
	                "div",
	                (0, _extends3["default"])({}, others, { className: classString, ref: this.saveRef }),
	                head,
	                _react2["default"].createElement(
	                    "div",
	                    { className: prefixCls + "-body", style: bodyStyle },
	                    children
	                )
	            );
	        }
	    }]);
	    return Card;
	}(_react.Component);

	exports["default"] = Card;

	Card.Grid = _Grid2["default"];
	__decorate([(0, _throttleByAnimationFrame.throttleByAnimationFrameDecorator)()], Card.prototype, "updateWiderPadding", null);
	module.exports = exports["default"];

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(84);

	__webpack_require__(323);

/***/ }),
/* 235 */,
/* 236 */,
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CollapsePanel = undefined;

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	var _defineProperty2 = __webpack_require__(23);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _createClass2 = __webpack_require__(25);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _classCallCheck2 = __webpack_require__(7);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(12);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(11);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _rcCollapse = __webpack_require__(386);

	var _rcCollapse2 = _interopRequireDefault(_rcCollapse);

	var _classnames = __webpack_require__(20);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _openAnimation = __webpack_require__(150);

	var _openAnimation2 = _interopRequireDefault(_openAnimation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var CollapsePanel = exports.CollapsePanel = function (_React$Component) {
	    (0, _inherits3['default'])(CollapsePanel, _React$Component);

	    function CollapsePanel() {
	        (0, _classCallCheck3['default'])(this, CollapsePanel);
	        return (0, _possibleConstructorReturn3['default'])(this, (CollapsePanel.__proto__ || Object.getPrototypeOf(CollapsePanel)).apply(this, arguments));
	    }

	    return CollapsePanel;
	}(_react2['default'].Component);

	var Collapse = function (_React$Component2) {
	    (0, _inherits3['default'])(Collapse, _React$Component2);

	    function Collapse() {
	        (0, _classCallCheck3['default'])(this, Collapse);
	        return (0, _possibleConstructorReturn3['default'])(this, (Collapse.__proto__ || Object.getPrototypeOf(Collapse)).apply(this, arguments));
	    }

	    (0, _createClass3['default'])(Collapse, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props,
	                prefixCls = _props.prefixCls,
	                _props$className = _props.className,
	                className = _props$className === undefined ? '' : _props$className,
	                bordered = _props.bordered;

	            var collapseClassName = (0, _classnames2['default'])((0, _defineProperty3['default'])({}, prefixCls + '-borderless', !bordered), className);
	            return _react2['default'].createElement(_rcCollapse2['default'], (0, _extends3['default'])({}, this.props, { className: collapseClassName }));
	        }
	    }]);
	    return Collapse;
	}(_react2['default'].Component);

	exports['default'] = Collapse;

	Collapse.Panel = _rcCollapse2['default'].Panel;
	Collapse.defaultProps = {
	    prefixCls: 'ant-collapse',
	    bordered: true,
	    openAnimation: (0, _extends3['default'])({}, _openAnimation2['default'], {
	        appear: function appear() {}
	    })
	};

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Collapse = __webpack_require__(237);

	var _Collapse2 = _interopRequireDefault(_Collapse);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	exports['default'] = _Collapse2['default'];
	module.exports = exports['default'];

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(84);

	__webpack_require__(324);

/***/ }),
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */
/***/ (function(module, exports) {

	"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = {
	    init: function init(root) {
	        var plugin = this;
	        plugin.initDashboard(root);
	    },
	    contentChanged: function contentChanged() {
	    },
	    searchDOMByResults: function searchDOMByResults(data) {
	        var plugin = this;
	        plugin.searchDOMByResults(data);
	    },
	    mutationObeserverAvailability: function mutationObeserverAvailability(data) {
	        var plugin = this;
	        plugin.mutationObeserverAvailability(data);
	    },
	    innerHTML: function innerHTML(data) {
	        var plugin = this;
	        plugin.setInnerHTMLView(data);
	    },
	    setLayoutStyle: function setLayoutStyle(data) {
	        var plugin = this;
	        plugin.setLayoutStyle(data);
	    },
	    setComputedStyle: function setComputedStyle(data) {
	        var plugin = this;
	        plugin.setComputedStyle(data);
	    },
	    refreshNode: function refreshNode(node) {
	        var plugin = this;
	        plugin.updateDashboard(node);
	    },
	    nodeStyle: function nodeStyle(data) {
	        console.log("dashboard receive node style", data);
	        var plugin = this;
	        plugin.setNodeStyle(data.internalID, data.styles);
	    } };module.exports = exports["default"];

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _classCallCheck2 = __webpack_require__(7);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _DomExplorerNodeAttribute = __webpack_require__(260);var _DomExplorerNodeAttribute2 = _interopRequireDefault(_DomExplorerNodeAttribute);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _VORLON =
	VORLON,FluentDOM = _VORLON.FluentDOM,Tools = _VORLON.Tools;var
	DomExplorerNode = function () {
	    function DomExplorerNode(plugin, parent, parentElt, node, oldNode) {(0, _classCallCheck3.default)(this, DomExplorerNode);
	        this.attributes = [];
	        this.childs = [];
	        this.parent = parent;
	        this.node = node;
	        this.plugin = plugin;
	        if (oldNode) {
	            this.parent = oldNode.parent;
	            this.element = oldNode.element;
	            this.element.innerHTML = "";
	            this.render(parentElt, true);
	        } else
	        {
	            this.render(parentElt);
	        }
	    }DomExplorerNode.prototype.
	    dispose = function dispose() {
	        for (var i = 0, l = this.childs.length; i < l; i++) {
	            this.childs[i].dispose();
	        }
	        this.plugin = null;
	        this.parent = null;
	        this.element = null;
	        this.header = null;
	        this.headerAttributes = null;
	        this.contentContainer = null;
	    };DomExplorerNode.prototype.
	    update = function update(node) {
	        this.plugin.refreshButton.removeAttribute('changed');
	        var newNode = this.insertReceivedObject(node, this.plugin._rootNode);
	        if (node.highlightElementID)
	        this.openNode(node.highlightElementID);
	    };DomExplorerNode.prototype.
	    insertReceivedObject = function insertReceivedObject(receivedObject, root) {
	        if (root && root.node && root.node.internalId === this.plugin.clikedNodeID || this.plugin.clikedNodeID === null && root.node.internalId === receivedObject.internalId) {
	            this.plugin.clikedNodeID = null;
	            var newNode;
	            if (root.parent === null) {
	                newNode = new DomExplorerNode(root.plugin, null, this.plugin.treeDiv, receivedObject, root);
	            } else
	            {
	                newNode = new DomExplorerNode(root.plugin, root.parent, root.parent.element, receivedObject, root);
	            }
	            root.childs = newNode.childs;
	            root.node.hasChildNodes = false;
	            return root;
	        } else
	        {
	            if (root && root.childs && root.childs.length) {
	                for (var index = 0; index < root.childs.length; index++) {
	                    var res = this.insertReceivedObject(receivedObject, root.childs[index]);
	                    if (res) {
	                        root.childs[index] = res;
	                        return root;
	                    }
	                }
	            }
	        }
	    };DomExplorerNode.prototype.
	    openNode = function openNode(highlightElementID) {
	        $('#plusbtn' + highlightElementID).trigger('click');
	        $('.treeNodeSelected').removeClass('treeNodeSelected');
	        var domnode = $('#domNode' + highlightElementID);
	        if (domnode.length == 0) {
	            return;
	        }
	        domnode.addClass('treeNodeSelected');
	        var container = $(this.plugin.treeDiv);
	        container.animate({ scrollTop: domnode.offset().top - container.offset().top + container.scrollTop() });
	    };DomExplorerNode.prototype.
	    selected = function selected(_selected) {
	        if (_selected) {
	            $('.treeNodeSelected').removeClass('treeNodeSelected');
	            Tools.AddClass(this.element, 'treeNodeSelected');
	        } else
	        {
	            $('.treeNodeSelected').removeClass('treeNodeSelected');
	        }
	    };DomExplorerNode.prototype.
	    render = function render(parent) {var isUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	        if (this.node.name === "#comment") {
	            this.renderCommentNode(parent, isUpdate);
	        } else
	        if (this.node.type == "3") {
	            this.renderTextNode(parent, isUpdate);
	        } else
	        {
	            this.renderDOMNode(parent, isUpdate);
	        }
	    };DomExplorerNode.prototype.
	    sendTextToClient = function sendTextToClient() {
	        this.plugin.sendCommandToClient('setElementValue', {
	            value: this.element.innerHTML,
	            order: this.parent.node.internalId });

	        this.plugin.undoEditable(this.element);
	    };DomExplorerNode.prototype.
	    renderCommentNode = function renderCommentNode(parentElt) {var isUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	        if (DomExplorerNode._spaceCheck.test(this.node.content)) {
	            if (!isUpdate) {
	                var textNode = new FluentDOM('span', 'nodeTextContent nodeComment', parentElt);
	                this.element = textNode.element;
	                textNode.text(this.node.content.trim()).editable(false);
	            } else
	            {
	                this.element.innerHTML = "";
	            }
	        }
	    };DomExplorerNode.prototype.
	    renderTextNode = function renderTextNode(parentElt) {var _this = this;var isUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	        if (DomExplorerNode._spaceCheck.test(this.node.content)) {
	            if (!isUpdate) {
	                var textNode = new FluentDOM('span', 'nodeTextContent', parentElt);
	                this.element = textNode.element;
	                textNode.text(this.node.content.trim()).
	                editable(false).
	                blur(function () {return _this.sendTextToClient();}).
	                keydown(function (evt) {
	                    if (evt.keyCode === 13 || evt.keyCode === 9) {
	                        _this.sendTextToClient();
	                    }
	                }).click(function () {
	                    _this.plugin.makeEditable(_this.element);
	                });
	            } else
	            {
	                this.element.innerHTML = "";
	            }
	        }
	    };DomExplorerNode.prototype.
	    renderDOMNode = function renderDOMNode(parentElt) {var isUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	        parentElt.setAttribute('data-has-children', '');
	        if (!isUpdate) {
	            var root = new FluentDOM('DIV', 'domNode', parentElt);
	            this.element = root.element;
	        } else
	        {
	            this.element.innerHTML = "";
	        }
	        this.element.id = "domNode" + this.node.internalId;
	        this.renderDOMNodeContent();
	    };DomExplorerNode.prototype.
	    renderDOMNodeContent = function renderDOMNodeContent() {var _this2 = this;
	        var root = FluentDOM.forElement(this.element);
	        root.append('BUTTON', 'treeNodeButton', function (nodeButton) {
	            nodeButton.attr("aria-label", "This is a tree node button that allows you to navigate trought the DOM tree");
	            nodeButton.element.id = "plusbtn" + _this2.node.internalId;
	            if (_this2.node.hasChildNodes && (!_this2.node.children || _this2.node.children.length === 0)) {
	                Tools.AddClass(_this2.element, "collapsed");
	                nodeButton.attr("data-collapsed", "");
	            } else
	            {
	                Tools.RemoveClass(_this2.element, "collapsed");
	            }
	            nodeButton.attr('button-block', '');
	            nodeButton.click(function () {
	                if (_this2.node.hasChildNodes && !nodeButton.element.className.match('loading')) {
	                    Tools.AddClass(nodeButton.element, "loading");
	                    _this2.plugin.clikedNodeID = _this2.node.internalId;
	                    _this2.plugin.sendCommandToClient('refreshNode', {
	                        order: _this2.node.internalId });

	                }
	            });
	        });
	        var that = this;
	        var menu = function menu(idtarget) {
	            $('.b-m-mpanel').remove();
	            var option = {
	                width: 180, items: [
	                {
	                    text: "Edit content as HTML", icon: "", alias: "1-1", action: function action() {
	                        that.parent.plugin.select(that);
	                        that.parent.plugin.sendCommandToClient('getInnerHTML', {
	                            order: that.plugin._selectedNode.node.internalId });

	                        $("#accordion .htmlsection").trigger('click');
	                    } },

	                {
	                    text: "Add attribute", alias: "1-3", icon: "", action: function action() {
	                        var attr = new _DomExplorerNodeAttribute2.default(that, "name", "value");
	                        that.attributes.push(attr);
	                    } }] };



	            $('.b-m-mpanel').remove();
	            $(idtarget).contextmenu(option);
	        };
	        root.append("SPAN", "treeNodeHeader", function (header) {
	            _this2.header = header.element;
	            header.click(function () {return _this2.plugin.select(_this2);});
	            header.createChild("SPAN", "opentag").text('<');
	            var nodename = header.createChild("SPAN", "nodeName");
	            nodename.text(_this2.node.name);
	            header.element.id = "treeNodeHeader-" + _this2.node.internalId;
	            $(_this2.header).data("internalid", _this2.node.internalId);
	            _this2.headerAttributes = header.createChild("SPAN", "attributes").element;
	            _this2.node.attributes.forEach(function (attr) {
	                _this2.addAttribute(attr[0], attr[1]);
	            });
	            header.createChild("SPAN", "closetag").text('>');
	            nodename.element.addEventListener("contextmenu", function (evt) {
	                menu("#treeNodeHeader-" + that.node.internalId);
	            });
	        });
	        if (this.node.isEmpty) {
	            this.header.classList.add('emptynode');
	        } else
	        {
	            root.append('DIV', 'nodeContentContainer', function (container) {
	                _this2.contentContainer = container.element;
	                if (_this2.node.hasChildNodes) {
	                    _this2.contentContainer.id = "vorlon-" + _this2.node.internalId;
	                }
	                var nodes = _this2.node.children;
	                if (nodes && nodes.length) {
	                    for (var index = 0; index < nodes.length; index++) {
	                        var child = nodes[index];
	                        if (child.nodeType != 3) {
	                            var node = new DomExplorerNode(_this2.plugin, _this2, _this2.contentContainer, child);
	                            _this2.childs.push(node);
	                        }
	                    }
	                }
	            });
	        }
	        if (this.node.name) {
	            if (this.node.name != "input" && this.node.name != "meta" && this.node.name != "link" && this.node.name != "img" && this.node.name != "br" && this.node.name != "hr") {
	                root.append("DIV", "treeNodeClosingText", function (footer) {
	                    footer.createChild("SPAN", "openclosingtag").text('</');
	                    footer.createChild("SPAN", "nodeName").text(_this2.node.name);
	                    footer.createChild("SPAN", "closetag").text('>');
	                    if (!footer.element.dataset)
	                    footer.element.dataset = {};
	                    $(footer.element).data("internalid", _this2.node.internalId);
	                    footer.element.id = 'treeNodeClosingText' + _this2.node.internalId;
	                    footer.element.addEventListener("contextmenu", function () {
	                        menu("#treeNodeClosingText" + _this2.node.internalId);
	                    });
	                });
	            } else
	            {
	                root.element.classList.add('notexpansible');
	                this.header.querySelector('.closetag').innerHTML = "/>";
	            }
	        }
	        // Main node
	        // Tools
	        if (this.node.id) {
	            root.createChild("span", "treeNodeTools fa fa-terminal").click(function () {
	                _this2.plugin.sendCommandToPluginDashboard("CONSOLE", "setorder", {
	                    order: _this2.node.id });

	            });
	        }
	    };DomExplorerNode.prototype.
	    addAttribute = function addAttribute(name, value) {
	        var attr = new _DomExplorerNodeAttribute2.default(this, name, value);
	        this.attributes.push(attr);
	    };return DomExplorerNode;}();exports.default = DomExplorerNode;

	DomExplorerNode._spaceCheck = /[^\t\n\r ]/;module.exports = exports['default'];

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _classCallCheck2 = __webpack_require__(7);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _VORLON = VORLON,FluentDOM = _VORLON.FluentDOM;var
	DomExplorerNodeAttribute = function () {
	    function DomExplorerNodeAttribute(parent, name, value) {(0, _classCallCheck3.default)(this, DomExplorerNodeAttribute);
	        this.parent = parent;
	        this.name = name;
	        this.value = value;
	        this.render();
	    }DomExplorerNodeAttribute.prototype.
	    eventNode = function eventNode(nodeName, nodeValue, parentElementId) {var _this = this;
	        var oldNodeName = nodeName.innerHTML;
	        var that = this;
	        var sendTextToClient = function sendTextToClient(attributeName, attributeValue, nodeEditable) {
	            _this.parent.plugin.sendCommandToClient('attribute', {
	                attributeName: attributeName,
	                attributeOldName: oldNodeName,
	                attributeValue: attributeValue,
	                order: _this.parent.node.internalId });

	            if (!attributeName) {
	                nodeName.parentElement.removeChild(nodeName);
	                nodeValue.parentElement.removeChild(nodeValue);
	            }
	            that.parent.plugin.undoEditable(nodeEditable);
	        };
	        var menu = function menu() {
	            var option = {
	                width: 180, items: [
	                {
	                    text: "Edit attribute name", icon: "", alias: "1-1", action: function action() {
	                        that.parent.plugin.makeEditable(nodeName);
	                    } },

	                {
	                    text: "Edit attribute value", alias: "1-2", icon: "", action: function action() {
	                        that.parent.plugin.makeEditable(nodeValue);
	                    } },

	                {
	                    text: "Edit content as HTML", alias: "1-3", icon: "", action: function action() {
	                        that.parent.plugin.select(that.parent);
	                        that.parent.plugin.sendCommandToClient('getInnerHTML', {
	                            order: that.parent.plugin._selectedNode.node.internalId });

	                        $("#accordion .htmlsection").trigger('click');
	                    } },

	                {
	                    text: "Add attribute", alias: "1-4", icon: "", action: function action() {
	                        that.parent.addAttribute("name", "value");
	                    } },

	                {
	                    text: "Delete attribute", alias: "1-5", icon: "", action: function action() {
	                        sendTextToClient.bind(that)("", nodeValue.innerHTML, nodeValue);
	                    } }] };



	            $('.b-m-mpanel').remove();
	            $("#" + parentElementId).contextmenu(option);
	        };
	        nodeValue.addEventListener("contextmenu", function () {
	            if (nodeValue.contentEditable != "true" && nodeName.contentEditable != "true")
	            menu.bind(_this)("value");
	        });
	        nodeValue.addEventListener("click", function (e) {
	            if (!_this.uriCheck("click", nodeValue, e))
	            _this.parent.plugin.makeEditable(nodeValue);
	        });
	        nodeName.addEventListener("click", function () {
	            _this.parent.plugin.makeEditable(nodeName);
	        });
	        nodeName.addEventListener("contextmenu", function () {
	            if (nodeValue.contentEditable != "true" && nodeName.contentEditable != "true")
	            menu.bind(_this)("name");
	        });
	        nodeValue.addEventListener("blur", function () {
	            sendTextToClient.bind(_this)(nodeName.innerHTML, nodeValue.innerHTML, nodeValue);
	        });
	        nodeName.addEventListener("blur", function () {
	            sendTextToClient.bind(_this)(nodeName.innerHTML, nodeValue.innerHTML, nodeName);
	        });
	        nodeName.addEventListener("keydown", function (evt) {
	            if (evt.keyCode === 13 || evt.keyCode === 9) {
	                evt.preventDefault();
	                sendTextToClient.bind(_this)(nodeName.innerHTML, nodeValue.innerHTML, nodeName);
	            }
	        });
	        nodeValue.addEventListener("keydown", function (evt) {
	            if (evt.keyCode === 13 || evt.keyCode === 9) {
	                evt.preventDefault();
	                sendTextToClient.bind(_this)(nodeName.innerHTML, nodeValue.innerHTML, nodeValue);
	            }
	        });
	        nodeValue.addEventListener("mousemove", function (e) {
	            _this.uriCheck("mousemove", nodeValue, e);
	        });
	        nodeValue.addEventListener("mouseout", function (e) {
	            $(nodeValue).removeClass("link-hovered");
	        });
	    };DomExplorerNodeAttribute.prototype.
	    uriCheck = function uriCheck(triggerType, node, e) {
	        if (e != null && e.ctrlKey) {
	            var urlPattern = /(\w+):\/*([^\/]+)([a-z0-9\-@\^=%&;\/~\+]*)[\?]?([^ \#]*)#?([^ \#]*)/i;
	            if (urlPattern.test(node.innerText)) {
	                switch (triggerType) {
	                    case "click":open(node.innerText);
	                    case "mousemove":$(node).addClass("link-hovered");
	                    default:return true;}

	            }
	        } else
	        {
	            $(node).removeClass("link-hovered");
	        }
	        return false;
	    };DomExplorerNodeAttribute.prototype.
	    render = function render() {
	        var node = new FluentDOM("SPAN", "nodeAttribute", this.parent.headerAttributes);
	        this.element = node.element;
	        var nodename = node.createChild("SPAN", "attr-name").html(this.name);
	        node.element.id = VORLON.Tools.CreateGUID();
	        node.createChild("SPAN").html("=\"");
	        var nodevalue = node.createChild("SPAN", "attr-value").html(this.value);
	        node.createChild("SPAN").html("\"");
	        this.eventNode(nodename.element, nodevalue.element, node.element.id);
	    };return DomExplorerNodeAttribute;}();exports.default = DomExplorerNodeAttribute;module.exports = exports["default"];

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _classCallCheck2 = __webpack_require__(7);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _DomExplorerPropertyEditorItem = __webpack_require__(262);var _DomExplorerPropertyEditorItem2 = _interopRequireDefault(_DomExplorerPropertyEditorItem);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var
	DomExplorerPropertyEditor = function () {
	    function DomExplorerPropertyEditor(plugin) {(0, _classCallCheck3.default)(this, DomExplorerPropertyEditor);
	        //private parent: HTMLElement = null;
	        this.styles = [];
	        this.plugin = plugin;
	    }DomExplorerPropertyEditor.prototype.
	    _generateButton = function _generateButton(parentNode, text, className, attribute) {
	        var button = document.createElement("button");
	        button.innerHTML = text;
	        button.className = className;
	        if (attribute)
	        button.setAttribute(attribute.name, attribute.value);
	        button.setAttribute('button-block', '');
	        return parentNode.appendChild(button);
	    };DomExplorerPropertyEditor.prototype.
	    generateStyles = function generateStyles(node, internalId, styles) {var _this = this;
	        this.node = node;
	        this.internalId = internalId;
	        this.styles = [];
	        while (this.plugin.styleView.hasChildNodes()) {
	            this.plugin.styleView.removeChild(this.plugin.styleView.lastChild);
	        }
	        if (styles) {
	            // Current styles
	            for (var index = 0; index < styles.length; index++) {
	                var style = styles[index];
	                var splits = style.split(":");
	                // ensure that urls are not malformed after the split.
	                if (splits[2] !== undefined && splits[2].indexOf('//') > -1)
	                splits[1] += ":" + splits[2];
	                this.styles.push(new _DomExplorerPropertyEditorItem2.default(this, splits[0], splits[1], this.internalId));
	            }
	            // Append add style button
	            this._generateButton(this.plugin.styleView, "+", "styleButton", null).addEventListener('click', function (e) {
	                new _DomExplorerPropertyEditorItem2.default(_this, "property", "value", _this.internalId, true);
	                _this.plugin.styleView.appendChild(e.target);
	            });
	        }
	    };return DomExplorerPropertyEditor;}();exports.default = DomExplorerPropertyEditor;module.exports = exports['default'];

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _classCallCheck2 = __webpack_require__(7);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var DomExplorerPropertyEditorItem = function () {
	    function DomExplorerPropertyEditorItem(parent, name, value, internalId) {var editableLabel = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;var generate = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;(0, _classCallCheck3.default)(this, DomExplorerPropertyEditorItem);
	        this.parent = parent;
	        this.name = name;
	        this.value = value;
	        if (generate)
	        this._generateStyle(name, value, internalId, editableLabel);
	    }DomExplorerPropertyEditorItem.prototype.
	    _generateStyle = function _generateStyle(property, value, internalId) {var _this = this;var editableLabel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	        console.debug(property + value);
	        var wrap = document.createElement("div");
	        wrap.className = 'styleWrap';
	        var label = document.createElement("div");
	        label.innerHTML = property;
	        label.className = "styleLabel";
	        label.contentEditable = "false";
	        var valueElement = this._generateClickableValue(label, value, internalId);
	        wrap.appendChild(label);
	        if (property.indexOf("color") != -1) {
	            var square = document.createElement("span");
	            square.className = "colored-square";
	            square.style.backgroundColor = value;
	            wrap.appendChild(square);
	        }
	        wrap.appendChild(valueElement);
	        this.parent.plugin.styleView.appendChild(wrap);
	        if (editableLabel) {
	            label.addEventListener("blur", function () {
	                _this.parent.plugin.undoEditable(label);
	            });
	            label.addEventListener("click", function () {
	                _this.parent.plugin.makeEditable(label);
	            });
	            label.addEventListener("keydown", function (evt) {
	                if (evt.keyCode === 13 || evt.keyCode === 9) {
	                    _this.parent.plugin.makeEditable(valueElement);
	                    evt.preventDefault();
	                }
	            });
	        }
	    };DomExplorerPropertyEditorItem.prototype.
	    _generateClickableValue = function _generateClickableValue(label, value, internalId) {var _this2 = this;
	        // Value
	        var valueElement = document.createElement("div");
	        valueElement.contentEditable = "false";
	        valueElement.innerHTML = value || "&nbsp;";
	        valueElement.className = "styleValue";
	        valueElement.addEventListener("keydown", function (evt) {
	            if (evt.keyCode === 13 || evt.keyCode === 9) {
	                //Create the properties object of elements.
	                var propertyObject = {};
	                propertyObject.property = label.innerHTML.trim();
	                propertyObject.newValue = valueElement.innerHTML;
	                var propsArr = _this2.parent.styles;
	                //check if property exists in array
	                var found = false;
	                for (var index = 0; index < _this2.parent.styles.length; index++) {
	                    var propObj = _this2.parent.styles[index];
	                    if (propObj.name === propertyObject.property) {
	                        _this2.parent.styles[index].value = propertyObject.newValue;
	                        found = true;
	                        break;
	                    }
	                }
	                if (!found) {
	                    _this2.parent.styles.push(new DomExplorerPropertyEditorItem(_this2.parent, propertyObject.property, propertyObject.newValue, internalId, false, false));
	                }
	                _this2.parent.node.styles = [];
	                for (var index = 0; index < _this2.parent.styles.length; index++) {
	                    _this2.parent.node.styles.push(_this2.parent.styles[index].name + ":" + _this2.parent.styles[index].value);
	                }
	                _this2.parent.plugin.sendCommandToClient('style', {
	                    property: label.innerHTML,
	                    newValue: valueElement.innerHTML,
	                    order: internalId });

	                evt.preventDefault();
	                _this2.parent.plugin.undoEditable(valueElement);
	            }
	        });
	        valueElement.addEventListener("blur", function () {
	            _this2.parent.plugin.undoEditable(valueElement);
	        });
	        valueElement.addEventListener("click", function () {
	            _this2.parent.plugin.makeEditable(valueElement);
	        });
	        return valueElement;
	    };return DomExplorerPropertyEditorItem;}();exports.default = DomExplorerPropertyEditorItem;module.exports = exports["default"];

/***/ }),
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = __webpack_require__(7);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = __webpack_require__(12);var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = __webpack_require__(11);var _inherits3 = _interopRequireDefault(_inherits2);var _react = __webpack_require__(2);var _react2 = _interopRequireDefault(_react);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

	ComputedStyleView = function (_React$Component) {(0, _inherits3.default)(ComputedStyleView, _React$Component);

	  function ComputedStyleView() {(0, _classCallCheck3.default)(this, ComputedStyleView);return (0, _possibleConstructorReturn3.default)(this,
	    _React$Component.call(this));

	  }ComputedStyleView.prototype.

	  render = function render() {var
	    computedStyle = this.props.computedStyle;
	    if (!computedStyle) {
	      computedStyle = [];
	    }
	    return (
	      _react2.default.createElement("div", null,

	        computedStyle.map(function (item) {return (
	            _react2.default.createElement("div", { className: "styleWrap" },
	              _react2.default.createElement("span", { className: "styleLabel" }, item.name),
	              _react2.default.createElement("span", { className: "styleValue" }, item.value)));})));





	  };return ComputedStyleView;}(_react2.default.Component);exports.default =


	ComputedStyleView;module.exports = exports["default"];

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _card = __webpack_require__(233);var _card2 = _interopRequireDefault(_card);var _input = __webpack_require__(139);var _input2 = _interopRequireDefault(_input);var _button = __webpack_require__(137);var _button2 = _interopRequireDefault(_button);var _keys = __webpack_require__(118);var _keys2 = _interopRequireDefault(_keys);var _extends2 = __webpack_require__(17);var _extends3 = _interopRequireDefault(_extends2);var _classCallCheck2 = __webpack_require__(7);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = __webpack_require__(12);var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = __webpack_require__(11);var _inherits3 = _interopRequireDefault(_inherits2);var _tabs = __webpack_require__(159);var _tabs2 = _interopRequireDefault(_tabs);var _collapse = __webpack_require__(238);var _collapse2 = _interopRequireDefault(_collapse);__webpack_require__(234);__webpack_require__(140);__webpack_require__(138);__webpack_require__(160);__webpack_require__(239);var _react = __webpack_require__(2);var _react2 = _interopRequireDefault(_react);
	var _reactDom = __webpack_require__(85);var _reactDom2 = _interopRequireDefault(_reactDom);

	var _LayoutView = __webpack_require__(269);var _LayoutView2 = _interopRequireDefault(_LayoutView);
	var _HTMLView = __webpack_require__(268);var _HTMLView2 = _interopRequireDefault(_HTMLView);
	var _ComputedStyleView = __webpack_require__(266);var _ComputedStyleView2 = _interopRequireDefault(_ComputedStyleView);
	var _SettingView = __webpack_require__(271);var _SettingView2 = _interopRequireDefault(_SettingView);
	var _YScrollView = __webpack_require__(272);var _YScrollView2 = _interopRequireDefault(_YScrollView);
	var _DomExplorer = __webpack_require__(314);var _DomExplorer2 = _interopRequireDefault(_DomExplorer);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
	var Panel = _collapse2.default.Panel;
	var TabPane = _tabs2.default.TabPane;var
	DomExplorer = function (_React$Component) {(0, _inherits3.default)(DomExplorer, _React$Component);
	  function DomExplorer() {(0, _classCallCheck3.default)(this, DomExplorer);var _this = (0, _possibleConstructorReturn3.default)(this,
	    _React$Component.call(this));
	    _this.state = {
	      active: false,
	      activeKey: '1',
	      computedStyle: null,
	      layoutStyle: null,
	      innerHTML: null,
	      internalId: null };

	    _this.extProps = {};
	    _this.onRefresh = _this.onRefresh.bind(_this);
	    _this.onReload = _this.onReload.bind(_this);
	    _this.onStyleAccordionChanged = _this.onStyleAccordionChanged.bind(_this);
	    _this.onStyleViewTabChanged = _this.onStyleViewTabChanged.bind(_this);return _this;
	  }DomExplorer.prototype.

	  externalSetProps = function externalSetProps(nextProps, cb) {var _this2 = this;var
	    extProps = this.extProps;var
	    select = nextProps.select;
	    if (select) delete nextProps.select;
	    var newProps = (0, _extends3.default)({},
	    extProps,
	    nextProps);var


	    internalId = newProps.internalId;
	    var newExtPropsLength = (0, _keys2.default)(newProps).length;
	    var extPropsLength = (0, _keys2.default)(extProps).length;

	    if (select) {
	      if (internalId != extProps.internalId) {
	        this.setState(newProps, function () {var
	          activeKey = _this2.state.activeKey;
	          _this2.updateAccordionPaneContent(activeKey);
	        });
	      }

	    } else {
	      if (extPropsLength != newExtPropsLength) {
	        this.setState(newProps);
	      } else {
	        var bChanged = false;
	        (0, _keys2.default)(extProps).forEach(function (key) {
	          if (extProps[key] != newProps[key]) {
	            bChanged = true;
	          }
	        });
	        if (bChanged) {
	          this.setState(newProps);
	        }
	      }
	    }



	    this.extProps = newProps;
	  };DomExplorer.prototype.

	  componentDidMount = function componentDidMount() {
	    var dashboard = null;
	    var dashboardFilterArray = VORLON.Core.DashboardPlugins.filter(function (item) {return item.name === 'domExplorer';});
	    if (dashboardFilterArray.length > 0) {
	      dashboard = dashboardFilterArray[0];
	    }

	    this.dashboard = dashboard;

	    dashboard._ready = true;
	    dashboard.sendCommandToClient("getMutationObeserverAvailability");

	    this.bindTreeViewMouseEnter();
	    this.bindTreeViewMouserLeave();

	    this.setState({
	      active: true });

	  };

	  /**
	      * 
	      * @param {*} e 
	      */DomExplorer.prototype.
	  onTreeViewClick = function onTreeViewClick(e) {
	    var button = e.target;
	    if (button.className.match('treeNodeButton')) {
	      button.hasAttribute('data-collapsed') ? button.removeAttribute('data-collapsed') : button.setAttribute('data-collapsed', '');
	    }
	  };



	  /**
	      * 注册moouseenter的捕获事件
	      */DomExplorer.prototype.
	  bindTreeViewMouseEnter = function bindTreeViewMouseEnter() {var
	    treeDiv = this.treeDiv,dashboard = this.dashboard;
	    treeDiv.addEventListener('mouseenter', function (e) {
	      var node = e.target;
	      var parent = node.parentElement;
	      var isHeader = node.className.match('treeNodeHeader');
	      if (isHeader || parent.className.match('treeNodeClosingText')) {
	        if (isHeader) {
	          parent.setAttribute('data-hovered-tag', '');
	          var id = $(node).data('internalid');
	          if (id) {
	            dashboard.hoverNode(id);
	          }
	        } else
	        {
	          parent.parentElement.setAttribute('data-hovered-tag', '');
	          var id = $(parent).data('internalid');
	          if (id) {
	            dashboard.hoverNode(id);
	          }
	        }
	      }
	    }, true);
	  };
	  /**
	      * 
	      */DomExplorer.prototype.
	  bindTreeViewMouserLeave = function bindTreeViewMouserLeave() {var _this3 = this;var
	    treeDiv = this.treeDiv,dashboard = this.dashboard;
	    treeDiv.addEventListener('mouseleave', function (e) {
	      var node = e.target;
	      if (node.className.match('treeNodeHeader') || node.parentElement.className.match('treeNodeClosingText')) {
	        var hovered = _this3.treeDiv.querySelector('[data-hovered-tag]');
	        if (hovered) hovered.removeAttribute('data-hovered-tag');
	        dashboard.hoverNode(null, true);
	      }
	    }, true);
	  };


	  /**
	      * 
	      * @param {*} index 
	      */DomExplorer.prototype.
	  updateAccordionPaneContent = function updateAccordionPaneContent(index) {var
	    dashboard = this.dashboard;var _state =





	    this.state,computedStyle = _state.computedStyle,layoutStyle = _state.layoutStyle,innerHTML = _state.innerHTML,internalId = _state.internalId;

	    if (index == '1') {
	    } else if (index == '2') {
	      if (!layoutStyle) {
	        dashboard.sendCommandToClient('getStyle', {
	          order: internalId });

	      }
	    } else if (index == '3') {
	      if (!computedStyle) {
	        dashboard.sendCommandToClient('getComputedStyleById', {
	          order: internalId });

	      }

	    } else if (index == '4') {
	      if (!innerHTML) {
	        dashboard.sendCommandToClient('getInnerHTML', {
	          order: internalId });

	      }
	    } else if (index == '5') {

	    }
	  };

	  /**
	      * index 
	      * 1. 样式
	      * 2. 布局
	      * 3. 计算样式
	      * 4. 主文档结构
	      * 5. 设置
	      */DomExplorer.prototype.
	  onStyleAccordionChanged = function onStyleAccordionChanged(index) {var _this4 = this;
	    this.setState({
	      activeKey: index },
	    function () {
	      _this4.updateAccordionPaneContent(index);
	    });
	  };DomExplorer.prototype.

	  onStyleViewTabChanged = function onStyleViewTabChanged(index) {var _this5 = this;
	    this.setState({
	      activeKey: index },
	    function () {
	      _this5.updateAccordionPaneContent(index);
	    });
	  };

	  /**
	      * 
	      */DomExplorer.prototype.
	  onReload = function onReload() {
	    VORLON.DashboardManager.ReloadClient();

	  };

	  /**
	      * 
	      */DomExplorer.prototype.
	  onRefresh = function onRefresh() {var
	    root = this.root,dashboard = this.dashboard;
	    dashboard.sendCommandToClient('refresh');
	    // VORLON.DashboardManager.ReloadClient()
	  };

	  /**
	      * 
	      */DomExplorer.prototype.
	  getCartToolBar = function getCartToolBar() {var _this6 = this;
	    var size = 'small';
	    return (
	      _react2.default.createElement(_button2.default.Group, { size: size },
	        _react2.default.createElement(_button2.default, {
	            onClick: this.onRefresh,
	            size: size,
	            ref: function ref(ele) {_this6.refreshButton = _reactDom2.default.findDOMNode(ele);} }, '\u5237\u65B0'),




	        _react2.default.createElement(_button2.default, {
	            onClick: this.onReload,
	            size: size }, '\u91CD\u65B0\u52A0\u8F7D')));





	  };

	  /**
	      *
	      * @returns {XML}
	      */DomExplorer.prototype.
	  getTreeViewContent = function getTreeViewContent() {var _this7 = this;var
	    maxHeight = this.state.maxHeight;
	    var treeViewStyle = {};
	    if (maxHeight) {
	      treeViewStyle['height'] = maxHeight - 100 + 'px';
	    }
	    return (
	      _react2.default.createElement(_card2.default, {
	          title: this.getCartToolBar(),
	          extra: _react2.default.createElement(_input2.default, { size: 'small' }),
	          className: _DomExplorer2.default.treeViewCard,
	          bordered: false },

	        _react2.default.createElement('div', {
	          id: 'treeView',
	          onClick: this.onTreeViewClick.bind(this),
	          className: 'code-text',
	          style: treeViewStyle,
	          ref: function ref(ele) {return _this7.treeDiv = ele;} })));



	  };

	  /**
	      *
	      * @returns {XML}
	      */DomExplorer.prototype.
	  getStyleViewContent_bak = function getStyleViewContent_bak() {var _this8 = this;var _state2 =
	    this.state,activeKey = _state2.activeKey,computedStyle = _state2.computedStyle,layoutStyle = _state2.layoutStyle,innerHTML = _state2.innerHTML,maxHeight = _state2.maxHeight;
	    var paneMaxHeight = 0;
	    if (maxHeight) {
	      paneMaxHeight = maxHeight - 260;
	    }
	    return (
	      _react2.default.createElement(_collapse2.default, {
	          bordered: true,
	          defaultActiveKey: ['1'],
	          activeKey: [activeKey],
	          accordion: true,
	          onChange: this.onStyleAccordionChanged },

	        _react2.default.createElement(Panel, { header: '\u6837\u5F0F', key: '1' },
	          _react2.default.createElement(_YScrollView2.default, {
	              maxHeight: paneMaxHeight },

	            _react2.default.createElement('div', { ref: function ref(ele) {return _this8.styleView = _reactDom2.default.findDOMNode(ele);} }))),



	        _react2.default.createElement(Panel, { header: '\u5E03\u5C40', key: '2' },
	          _react2.default.createElement(_YScrollView2.default, { id: 'layoutsection', maxHeight: paneMaxHeight },
	            _react2.default.createElement(_LayoutView2.default, { layoutStyle: layoutStyle }))),


	        _react2.default.createElement(Panel, { header: '\u8BA1\u7B97\u6837\u5F0F', key: '3', style: { padding: 0 } },
	          _react2.default.createElement(_YScrollView2.default, { maxHeight: paneMaxHeight },
	            _react2.default.createElement(_ComputedStyleView2.default, {
	              computedStyle: computedStyle }))),



	        _react2.default.createElement(Panel, { header: '\u4E3B\u6587\u6863\u7ED3\u6784', key: '4' },
	          _react2.default.createElement('div', { style: { padding: '10px' } },
	            _react2.default.createElement(_HTMLView2.default, { innerHTML: innerHTML, maxHeight: paneMaxHeight }))),


	        _react2.default.createElement(Panel, { header: '\u8BBE\u7F6E', key: '5' },
	          _react2.default.createElement(_YScrollView2.default, { maxHeight: paneMaxHeight },
	            _react2.default.createElement(_SettingView2.default, null)))));




	  };DomExplorer.prototype.

	  getStyleViewContent = function getStyleViewContent() {var _this9 = this;var _state3 =
	    this.state,activeKey = _state3.activeKey,computedStyle = _state3.computedStyle,layoutStyle = _state3.layoutStyle,innerHTML = _state3.innerHTML,maxHeight = _state3.maxHeight;
	    return (
	      _react2.default.createElement(_tabs2.default, { type: 'card', className: _DomExplorer2.default.styleViewTab, onChange: this.onStyleViewTabChanged },
	        _react2.default.createElement(TabPane, { tab: '\u6837\u5F0F', key: '1' },
	          _react2.default.createElement('div', { ref: function ref(ele) {return _this9.styleView = _reactDom2.default.findDOMNode(ele);} })),

	        _react2.default.createElement(TabPane, { tab: '\u5E03\u5C40', key: '2' },
	          _react2.default.createElement('div', { id: 'layoutsection' },
	            _react2.default.createElement(_LayoutView2.default, { layoutStyle: layoutStyle }))),


	        _react2.default.createElement(TabPane, { tab: '\u8BA1\u7B97\u6837\u5F0F', key: '3' },
	          _react2.default.createElement(_ComputedStyleView2.default, {
	            computedStyle: computedStyle })),


	        _react2.default.createElement(TabPane, { tab: '\u4E3B\u6587\u6863\u7ED3\u6784', key: '4' },
	          _react2.default.createElement('div', { style: { padding: '10px' } },
	            _react2.default.createElement(_HTMLView2.default, { innerHTML: innerHTML }))),


	        _react2.default.createElement(TabPane, { tab: '\u8BBE\u7F6E', key: '5' },
	          _react2.default.createElement(_SettingView2.default, null))));



	  };DomExplorer.prototype.

	  render = function render() {var _this10 = this;var _state4 =
	    this.state,active = _state4.active,maxHeight = _state4.maxHeight;
	    var activeClass = active ? 'active' : '';

	    return (
	      _react2.default.createElement('div', {
	          id: 'rootDomExplorer',
	          className: _DomExplorer2.default.main,
	          ref: function ref(ele) {_this10.root = ele;} },

	        _react2.default.createElement('div', { className: 'tree-view-wrapper panel-left ' + activeClass },
	          this.getTreeViewContent(),

	          _react2.default.createElement('div', { className: 'domload-spinner' },
	            _react2.default.createElement('div', { className: 'ant-spin ant-spin-lg ant-spin-spinning' },
	              _react2.default.createElement('span', { className: 'ant-spin-dot' },
	                _react2.default.createElement('i', null), _react2.default.createElement('i', null), _react2.default.createElement('i', null), _react2.default.createElement('i', null))),


	            _react2.default.createElement('div', { style: { position: 'absolute', left: '50%', 'top': '60%' } },
	              _react2.default.createElement('span', { style: { marginLeft: '-25%', whiteSpace: 'nowrap' } }, '\u53CC\u51FB\u5237\u65B0\u9875\u9762')))),




	        _react2.default.createElement('div', { className: 'style-view-wrapper panel-right code-text' },
	          this.getStyleViewContent())));



	  };return DomExplorer;}(_react2.default.Component);exports.default =


	DomExplorer;module.exports = exports['default'];

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = __webpack_require__(7);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = __webpack_require__(12);var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = __webpack_require__(11);var _inherits3 = _interopRequireDefault(_inherits2);var _button = __webpack_require__(137);var _button2 = _interopRequireDefault(_button);var _input = __webpack_require__(139);var _input2 = _interopRequireDefault(_input);__webpack_require__(138);__webpack_require__(140);var _react = __webpack_require__(2);var _react2 = _interopRequireDefault(_react);
	var _reactDom = __webpack_require__(85);var _reactDom2 = _interopRequireDefault(_reactDom);


	var _ReactCodeMirrorEditor = __webpack_require__(270);var _ReactCodeMirrorEditor2 = _interopRequireDefault(_ReactCodeMirrorEditor);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

	TextArea = _input2.default.TextArea;var
	ButtonGroup = _button2.default.Group;

	function stripscript(s) {
	  // return s.replace(/<script.*?>.*?<\/script>/ig, '');  
	  return s.replace(/<script(([\s\S])*?)<\/script>/ig, '');
	}

	function striplink(s) {
	  return s.replace(/<link.*?>/ig, '');
	}

	function stripstyle(s) {
	  return s.replace(/<style(([\s\S])*?)<\/style>/ig, '');
	}var


	InnerHTMLView = function (_React$Component) {(0, _inherits3.default)(InnerHTMLView, _React$Component);

	  function InnerHTMLView() {(0, _classCallCheck3.default)(this, InnerHTMLView);var _this = (0, _possibleConstructorReturn3.default)(this,
	    _React$Component.call(this));
	    _this.state = {
	      modalVisible: false };

	    _this.onFullScreen = _this.onFullScreen.bind(_this);return _this;
	  }InnerHTMLView.prototype.

	  componentWillReceiveProps = function componentWillReceiveProps(nextProps) {var
	    maxHeight = nextProps.maxHeight;
	    if (this.editor) {
	      var dom = _reactDom2.default.findDOMNode(this.editor);
	      $('.CodeMirror', dom).css({ height: maxHeight - 50 });
	    }
	  };InnerHTMLView.prototype.

	  onFullScreen = function onFullScreen() {

	  };InnerHTMLView.prototype.


	  render = function render() {var _this2 = this;var
	    innerHTML = this.props.innerHTML;
	    var value = '';
	    if (innerHTML) {
	      value = innerHTML.outerHTML.trim();

	      value = stripscript(value);
	      //value = striplink(value);
	      //value = stripstyle(value);
	    }

	    return (
	      _react2.default.createElement('div', null,
	        _react2.default.createElement(ButtonGroup, { style: { marginBottom: '10px' } },
	          _react2.default.createElement(_button2.default, { size: 'small' }, '\u9884\u89C8'),
	          _react2.default.createElement(_button2.default, { size: 'small', onClick: this.onFullScreen }, '\u67E5\u770B')),

	        _react2.default.createElement(_ReactCodeMirrorEditor2.default, {
	          code: value,
	          ref: function ref(ele) {_this2.editor = ele;} })));



	  };return InnerHTMLView;}(_react2.default.Component);exports.default =


	InnerHTMLView;module.exports = exports['default'];

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = __webpack_require__(7);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = __webpack_require__(12);var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = __webpack_require__(11);var _inherits3 = _interopRequireDefault(_inherits2);var _react = __webpack_require__(2);var _react2 = _interopRequireDefault(_react);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

	LayoutView = function (_React$Component) {(0, _inherits3.default)(LayoutView, _React$Component);
	  function LayoutView() {(0, _classCallCheck3.default)(this, LayoutView);return (0, _possibleConstructorReturn3.default)(this,
	    _React$Component.call(this));
	  }LayoutView.prototype.

	  render = function render() {var
	    layoutStyle = this.props.layoutStyle;
	    if (!layoutStyle) return null;var
	    margin = layoutStyle.margin,border = layoutStyle.border,padding = layoutStyle.padding,size = layoutStyle.size;
	    var w = size.width;
	    if (w && w.indexOf('.') !== -1) {
	      w = w.split('.')[0] + 'px';
	    }
	    var h = size.height;
	    if (h && h.indexOf('.') !== -1) {
	      h = h.split('.')[0] + 'px';
	    }

	    return (
	      _react2.default.createElement('div', { className: 'margin' },
	        _react2.default.createElement('div', { className: 'label' }, 'margin'),
	        _react2.default.createElement('div', { className: 'container', id: 'margincontainer' },
	          _react2.default.createElement('div', { className: 'top' }, margin.top),
	          _react2.default.createElement('div', { className: 'bottom' }, margin.bottom),
	          _react2.default.createElement('div', { className: 'right' }, margin.right),
	          _react2.default.createElement('div', { className: 'left' }, margin.left)),

	        _react2.default.createElement('div', { className: 'border' },
	          _react2.default.createElement('div', { className: 'label' }, 'border'),
	          _react2.default.createElement('div', { className: 'container', id: 'bordercontainer' },
	            _react2.default.createElement('div', { className: 'top' }, border.topWidth),
	            _react2.default.createElement('div', { className: 'bottom' }, border.bottomWidth),
	            _react2.default.createElement('div', { className: 'right' }, border.rightWidth),
	            _react2.default.createElement('div', { className: 'left' }, border.leftWidth)),

	          _react2.default.createElement('div', { className: 'padding' },
	            _react2.default.createElement('div', { className: 'label' }, 'padding'),
	            _react2.default.createElement('div', { className: 'container', id: 'paddingcontainer' },
	              _react2.default.createElement('div', { className: 'top' }, padding.top),
	              _react2.default.createElement('div', { className: 'bottom' }, padding.bottom),
	              _react2.default.createElement('div', { className: 'right' }, padding.right),
	              _react2.default.createElement('div', { className: 'left' }, padding.left)),

	            _react2.default.createElement('div', { className: 'size', id: 'sizecontainer' },
	              w + " x " + h)))));





	  };return LayoutView;}(_react2.default.Component);exports.default =

	LayoutView;module.exports = exports['default'];

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = __webpack_require__(7);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = __webpack_require__(12);var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = __webpack_require__(11);var _inherits3 = _interopRequireDefault(_inherits2);var _react = __webpack_require__(2);var _react2 = _interopRequireDefault(_react);
	var _codemirror = __webpack_require__(95);var _codemirror2 = _interopRequireDefault(_codemirror);
	__webpack_require__(288);
	__webpack_require__(207);
	__webpack_require__(208);
	__webpack_require__(289);
	__webpack_require__(206);
	__webpack_require__(312);
	__webpack_require__(313);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

	(function () {
	  _codemirror2.default.extendMode("css", {
	    commentStart: "/*",
	    commentEnd: "*/",
	    newlineAfterToken: function newlineAfterToken(type, content) {
	      return (/^[;{}]$/.test(content));
	    } });


	  _codemirror2.default.extendMode("javascript", {
	    commentStart: "/*",
	    commentEnd: "*/",
	    // FIXME semicolons inside of for
	    newlineAfterToken: function newlineAfterToken(type, content, textAfter, state) {
	      if (this.jsonMode) {
	        return (/^[\[,{]$/.test(content) || /^}/.test(textAfter));
	      } else {
	        if (content == ";" && state.lexical && state.lexical.type == ")") return false;
	        return (/^[;{}]$/.test(content) && !/^;/.test(textAfter));
	      }
	    } });


	  _codemirror2.default.extendMode("xml", {
	    commentStart: "<!--",
	    commentEnd: "-->",
	    newlineAfterToken: function newlineAfterToken(type, content, textAfter) {
	      return type == "tag" && />$/.test(content) || /^</.test(textAfter);
	    } });


	  // Comment/uncomment the specified range
	  _codemirror2.default.defineExtension("commentRange", function (isComment, from, to) {
	    var cm = this,curMode = _codemirror2.default.innerMode(cm.getMode(), cm.getTokenAt(from).state).mode;
	    cm.operation(function () {
	      if (isComment) {// Comment range
	        cm.replaceRange(curMode.commentEnd, to);
	        cm.replaceRange(curMode.commentStart, from);
	        if (from.line == to.line && from.ch == to.ch) // An empty comment inserted - put cursor inside
	          cm.setCursor(from.line, from.ch + curMode.commentStart.length);
	      } else {// Uncomment range
	        var selText = cm.getRange(from, to);
	        var startIndex = selText.indexOf(curMode.commentStart);
	        var endIndex = selText.lastIndexOf(curMode.commentEnd);
	        if (startIndex > -1 && endIndex > -1 && endIndex > startIndex) {
	          // Take string till comment start
	          selText = selText.substr(0, startIndex)
	          // From comment start till comment end
	          + selText.substring(startIndex + curMode.commentStart.length, endIndex)
	          // From comment end till string end
	          + selText.substr(endIndex + curMode.commentEnd.length);
	        }
	        cm.replaceRange(selText, from, to);
	      }
	    });
	  });

	  // Applies automatic mode-aware indentation to the specified range
	  _codemirror2.default.defineExtension("autoIndentRange", function (from, to) {
	    var cmInstance = this;
	    this.operation(function () {
	      for (var i = from.line; i <= to.line; i++) {
	        cmInstance.indentLine(i, "smart");
	      }
	    });
	  });

	  // Applies automatic formatting to the specified range
	  _codemirror2.default.defineExtension("autoFormatRange", function (from, to) {
	    var cm = this;
	    var outer = cm.getMode(),text = cm.getRange(from, to).split("\n");
	    var state = _codemirror2.default.copyState(outer, cm.getTokenAt(from).state);
	    var tabSize = cm.getOption("tabSize");

	    var out = "",lines = 0,atSol = from.ch == 0;
	    function newline() {
	      out += "\n";
	      atSol = true;
	      ++lines;
	    }

	    for (var i = 0; i < text.length; ++i) {
	      var stream = new _codemirror2.default.StringStream(text[i], tabSize);
	      while (!stream.eol()) {
	        var inner = _codemirror2.default.innerMode(outer, state);
	        var style = outer.token(stream, state),cur = stream.current();
	        stream.start = stream.pos;
	        if (!atSol || /\S/.test(cur)) {
	          out += cur;
	          atSol = false;
	        }
	        if (!atSol && inner.mode.newlineAfterToken &&
	        inner.mode.newlineAfterToken(style, cur, stream.string.slice(stream.pos) || text[i + 1] || "", inner.state))
	        newline();
	      }
	      if (!stream.pos && outer.blankLine) outer.blankLine(state);
	      if (!atSol) newline();
	    }

	    cm.operation(function () {
	      cm.replaceRange(out, from, to);
	      for (var cur = from.line + 1, end = from.line + lines; cur <= end; ++cur) {
	        cm.indentLine(cur, "smart");}
	      cm.setSelection(from, cm.getCursor(false));
	    });
	  });
	})();


	_codemirror2.default.defineExtension("autoFormatRange", function (from, to) {
	  var cm = this;
	  var outer = cm.getMode(),text = cm.getRange(from, to).split("\n");
	  var state = _codemirror2.default.copyState(outer, cm.getTokenAt(from).state);
	  var tabSize = cm.getOption("tabSize");

	  var out = "",lines = 0,atSol = from.ch == 0;
	  function newline() {
	    out += "\n";
	    atSol = true;
	    ++lines;
	  }
	  for (var i = 0; i < text.length; ++i) {
	    var stream = new _codemirror2.default.StringStream(text[i], tabSize);
	    while (!stream.eol()) {
	      var inner = _codemirror2.default.innerMode(outer, state);
	      var style = outer.token(stream, state),cur = stream.current();
	      stream.start = stream.pos;
	      if (!atSol || /\S/.test(cur)) {
	        out += cur;
	        atSol = false;
	      }

	      if (!atSol &&
	      inner.mode.newlineAfterToken &&
	      inner.mode.newlineAfterToken(style, cur, stream.string.slice(stream.pos) || text[i + 1] || "", inner.state))
	      {
	        newline();
	      }

	    }
	    if (!stream.pos && outer.blankLine) outer.blankLine(state);
	    if (!atSol) newline();
	  }

	  cm.operation(function () {
	    cm.replaceRange(out, from, to);
	    for (var cur = from.line + 1, end = from.line + lines; cur <= end; ++cur) {
	      cm.indentLine(cur, "smart");}
	  });
	});

	// Applies automatic mode-aware indentation to the specified range
	_codemirror2.default.defineExtension("autoIndentRange", function (from, to) {
	  var cmInstance = this;
	  this.operation(function () {
	    for (var i = from.line; i <= to.line; i++) {
	      cmInstance.indentLine(i, "smart");
	    }
	  });
	});

	$(window).on("resize", function () {
	  var showing = document.body.getElementsByClassName("CodeMirror-fullscreen")[0];
	  if (!showing) return;
	  showing.CodeMirror.getScrollerElement().style.height = winHeight() + "px";
	});


	function isFullScreen(cm) {
	  return (/\bCodeMirror-fullscreen\b/.test(cm.getWrapperElement().className));
	}
	function winHeight() {
	  return window.innerHeight || (document.documentElement || document.body).clientHeight;
	}

	function setFullScreen(cm, full) {
	  var wrap = cm.getWrapperElement(),scroll = cm.getScrollerElement();
	  if (full) {
	    wrap.className += " CodeMirror-fullscreen";
	    scroll.style.height = winHeight() + "px";
	    document.documentElement.style.overflow = "hidden";
	  } else {
	    wrap.className = wrap.className.replace(" CodeMirror-fullscreen", "");
	    scroll.style.height = "";
	    document.documentElement.style.overflow = "";
	  }
	  cm.refresh();
	}var


	ReactCodeMirrorEditor = function (_React$Component) {(0, _inherits3.default)(ReactCodeMirrorEditor, _React$Component);
	  function ReactCodeMirrorEditor(props) {(0, _classCallCheck3.default)(this, ReactCodeMirrorEditor);return (0, _possibleConstructorReturn3.default)(this,
	    _React$Component.call(this, props));
	  }ReactCodeMirrorEditor.prototype.

	  componentDidMount = function componentDidMount() {var _props =
	    this.props,code = _props.code,mode = _props.mode;
	    var a = _codemirror2.default;

	    var editor = this.editor = (0, _codemirror2.default)(this.rootEle, {
	      mode: "htmlmixed",
	      htmlMode: true,
	      value: code,
	      styleActiveLine: true,
	      lineNumbers: true,
	      lineWrapping: true,
	      autoCloseBrackets: true,
	      matchBrackets: true,
	      showCursorWhenSelecting: true,
	      theme: "monokai",
	      tabSize: 2 });


	    this.enterFullScreen = function () {
	      setFullScreen(editor, !isFullScreen(editor));
	    };

	    this.exitFullScreen = function () {
	      if (isFullScreen(editor)) setFullScreen(editor, false);
	    };

	    if (code) {
	      this.formatCode(code);
	    }
	  };ReactCodeMirrorEditor.prototype.

	  formatCode = function formatCode(code) {var
	    editor = this.editor;
	    this.editor.setValue(code);
	    function autoFormat() {
	      var totalLines = editor.lineCount();
	      var totalChars = code.length;

	      editor.autoFormatRange && editor.autoFormatRange({ line: 0, ch: 0 }, { line: totalLines, ch: totalChars });
	    }
	    autoFormat();
	  };ReactCodeMirrorEditor.prototype.

	  componentWillReceiveProps = function componentWillReceiveProps(nextProps) {var

	    code = nextProps.code;var
	    oldCode = this.props.code;
	    if (code != oldCode) {
	      this.formatCode(code);
	    }

	  };ReactCodeMirrorEditor.prototype.

	  getEditingData = function getEditingData() {
	    return this.editor.getValue();
	  };ReactCodeMirrorEditor.prototype.


	  render = function render() {var _this2 = this;
	    return (
	      _react2.default.createElement('div', {
	        ref: function ref(ele) {_this2.rootEle = ele;} }));



	  };return ReactCodeMirrorEditor;}(_react2.default.Component);exports.default =


	ReactCodeMirrorEditor;module.exports = exports['default'];

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _checkbox = __webpack_require__(154);var _checkbox2 = _interopRequireDefault(_checkbox);var _classCallCheck2 = __webpack_require__(7);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = __webpack_require__(12);var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = __webpack_require__(11);var _inherits3 = _interopRequireDefault(_inherits2);__webpack_require__(155);var _react = __webpack_require__(2);var _react2 = _interopRequireDefault(_react);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var


	SettingView = function (_React$Component) {(0, _inherits3.default)(SettingView, _React$Component);function SettingView() {(0, _classCallCheck3.default)(this, SettingView);return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));}SettingView.prototype.

	  render = function render() {
	    return (
	      _react2.default.createElement('div', { id: 'settingssection' },
	        _react2.default.createElement(_checkbox2.default, { onChange: function onChange() {} }, '\u81EA\u52A8\u5237\u65B0'),
	        _react2.default.createElement(_checkbox2.default, { onChange: function onChange() {} }, '\u5168\u5C40\u52A0\u8F7D')));


	  };return SettingView;}(_react2.default.Component);exports.default =


	SettingView;module.exports = exports['default'];

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = __webpack_require__(7);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = __webpack_require__(12);var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = __webpack_require__(11);var _inherits3 = _interopRequireDefault(_inherits2);var _react = __webpack_require__(2);var _react2 = _interopRequireDefault(_react);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

	YScrollView = function (_React$Component) {(0, _inherits3.default)(YScrollView, _React$Component);function YScrollView() {(0, _classCallCheck3.default)(this, YScrollView);return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));}YScrollView.prototype.

	  render = function render() {var _props =
	    this.props,children = _props.children,maxHeight = _props.maxHeight,id = _props.id;
	    var style = { overflowY: 'auto', padding: '10px' };
	    if (maxHeight) {
	      style['height'] = maxHeight + 'px';
	    } else {
	      style['height'] = '100px';
	    }

	    return (
	      _react2.default.createElement('div', { style: style, id: id },
	        children));


	  };return YScrollView;}(_react2.default.Component);exports.default =


	YScrollView;module.exports = exports['default'];

/***/ }),
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE

	(function(mod) {
	  if (true) // CommonJS
	    mod(__webpack_require__(95));
	  else if (typeof define == "function" && define.amd) // AMD
	    define(["../../lib/codemirror"], mod);
	  else // Plain browser env
	    mod(CodeMirror);
	})(function(CodeMirror) {
	"use strict";

	CodeMirror.multiplexingMode = function(outer /*, others */) {
	  // Others should be {open, close, mode [, delimStyle] [, innerStyle]} objects
	  var others = Array.prototype.slice.call(arguments, 1);

	  function indexOf(string, pattern, from, returnEnd) {
	    if (typeof pattern == "string") {
	      var found = string.indexOf(pattern, from);
	      return returnEnd && found > -1 ? found + pattern.length : found;
	    }
	    var m = pattern.exec(from ? string.slice(from) : string);
	    return m ? m.index + from + (returnEnd ? m[0].length : 0) : -1;
	  }

	  return {
	    startState: function() {
	      return {
	        outer: CodeMirror.startState(outer),
	        innerActive: null,
	        inner: null
	      };
	    },

	    copyState: function(state) {
	      return {
	        outer: CodeMirror.copyState(outer, state.outer),
	        innerActive: state.innerActive,
	        inner: state.innerActive && CodeMirror.copyState(state.innerActive.mode, state.inner)
	      };
	    },

	    token: function(stream, state) {
	      if (!state.innerActive) {
	        var cutOff = Infinity, oldContent = stream.string;
	        for (var i = 0; i < others.length; ++i) {
	          var other = others[i];
	          var found = indexOf(oldContent, other.open, stream.pos);
	          if (found == stream.pos) {
	            if (!other.parseDelimiters) stream.match(other.open);
	            state.innerActive = other;
	            state.inner = CodeMirror.startState(other.mode, outer.indent ? outer.indent(state.outer, "") : 0);
	            return other.delimStyle && (other.delimStyle + " " + other.delimStyle + "-open");
	          } else if (found != -1 && found < cutOff) {
	            cutOff = found;
	          }
	        }
	        if (cutOff != Infinity) stream.string = oldContent.slice(0, cutOff);
	        var outerToken = outer.token(stream, state.outer);
	        if (cutOff != Infinity) stream.string = oldContent;
	        return outerToken;
	      } else {
	        var curInner = state.innerActive, oldContent = stream.string;
	        if (!curInner.close && stream.sol()) {
	          state.innerActive = state.inner = null;
	          return this.token(stream, state);
	        }
	        var found = curInner.close ? indexOf(oldContent, curInner.close, stream.pos, curInner.parseDelimiters) : -1;
	        if (found == stream.pos && !curInner.parseDelimiters) {
	          stream.match(curInner.close);
	          state.innerActive = state.inner = null;
	          return curInner.delimStyle && (curInner.delimStyle + " " + curInner.delimStyle + "-close");
	        }
	        if (found > -1) stream.string = oldContent.slice(0, found);
	        var innerToken = curInner.mode.token(stream, state.inner);
	        if (found > -1) stream.string = oldContent;

	        if (found == stream.pos && curInner.parseDelimiters)
	          state.innerActive = state.inner = null;

	        if (curInner.innerStyle) {
	          if (innerToken) innerToken = innerToken + " " + curInner.innerStyle;
	          else innerToken = curInner.innerStyle;
	        }

	        return innerToken;
	      }
	    },

	    indent: function(state, textAfter) {
	      var mode = state.innerActive ? state.innerActive.mode : outer;
	      if (!mode.indent) return CodeMirror.Pass;
	      return mode.indent(state.innerActive ? state.inner : state.outer, textAfter);
	    },

	    blankLine: function(state) {
	      var mode = state.innerActive ? state.innerActive.mode : outer;
	      if (mode.blankLine) {
	        mode.blankLine(state.innerActive ? state.inner : state.outer);
	      }
	      if (!state.innerActive) {
	        for (var i = 0; i < others.length; ++i) {
	          var other = others[i];
	          if (other.open === "\n") {
	            state.innerActive = other;
	            state.inner = CodeMirror.startState(other.mode, mode.indent ? mode.indent(state.outer, "") : 0);
	          }
	        }
	      } else if (state.innerActive.close === "\n") {
	        state.innerActive = state.inner = null;
	      }
	    },

	    electricChars: outer.electricChars,

	    innerMode: function(state) {
	      return state.inner ? {state: state.inner, mode: state.innerActive.mode} : {state: state.outer, mode: outer};
	    }
	  };
	};

	});


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE

	(function(mod) {
	  if (true) // CommonJS
	    mod(__webpack_require__(95));
	  else if (typeof define == "function" && define.amd) // AMD
	    define(["../../lib/codemirror"], mod);
	  else // Plain browser env
	    mod(CodeMirror);
	})(function(CodeMirror) {
	  "use strict";
	  var WRAP_CLASS = "CodeMirror-activeline";
	  var BACK_CLASS = "CodeMirror-activeline-background";
	  var GUTT_CLASS = "CodeMirror-activeline-gutter";

	  CodeMirror.defineOption("styleActiveLine", false, function(cm, val, old) {
	    var prev = old == CodeMirror.Init ? false : old;
	    if (val == prev) return
	    if (prev) {
	      cm.off("beforeSelectionChange", selectionChange);
	      clearActiveLines(cm);
	      delete cm.state.activeLines;
	    }
	    if (val) {
	      cm.state.activeLines = [];
	      updateActiveLines(cm, cm.listSelections());
	      cm.on("beforeSelectionChange", selectionChange);
	    }
	  });

	  function clearActiveLines(cm) {
	    for (var i = 0; i < cm.state.activeLines.length; i++) {
	      cm.removeLineClass(cm.state.activeLines[i], "wrap", WRAP_CLASS);
	      cm.removeLineClass(cm.state.activeLines[i], "background", BACK_CLASS);
	      cm.removeLineClass(cm.state.activeLines[i], "gutter", GUTT_CLASS);
	    }
	  }

	  function sameArray(a, b) {
	    if (a.length != b.length) return false;
	    for (var i = 0; i < a.length; i++)
	      if (a[i] != b[i]) return false;
	    return true;
	  }

	  function updateActiveLines(cm, ranges) {
	    var active = [];
	    for (var i = 0; i < ranges.length; i++) {
	      var range = ranges[i];
	      var option = cm.getOption("styleActiveLine");
	      if (typeof option == "object" && option.nonEmpty ? range.anchor.line != range.head.line : !range.empty())
	        continue
	      var line = cm.getLineHandleVisualStart(range.head.line);
	      if (active[active.length - 1] != line) active.push(line);
	    }
	    if (sameArray(cm.state.activeLines, active)) return;
	    cm.operation(function() {
	      clearActiveLines(cm);
	      for (var i = 0; i < active.length; i++) {
	        cm.addLineClass(active[i], "wrap", WRAP_CLASS);
	        cm.addLineClass(active[i], "background", BACK_CLASS);
	        cm.addLineClass(active[i], "gutter", GUTT_CLASS);
	      }
	      cm.state.activeLines = active;
	    });
	  }

	  function selectionChange(cm, sel) {
	    updateActiveLines(cm, sel.ranges);
	  }
	});


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE

	(function(mod) {
	  if (true) // CommonJS
	    mod(__webpack_require__(95), __webpack_require__(207),
	        __webpack_require__(287));
	  else if (typeof define == "function" && define.amd) // AMD
	    define(["../../lib/codemirror", "../htmlmixed/htmlmixed",
	            "../../addon/mode/multiplex"], mod);
	  else // Plain browser env
	    mod(CodeMirror);
	})(function(CodeMirror) {
	  "use strict";

	  CodeMirror.defineMode("htmlembedded", function(config, parserConfig) {
	    return CodeMirror.multiplexingMode(CodeMirror.getMode(config, "htmlmixed"), {
	      open: parserConfig.open || parserConfig.scriptStartRegex || "<%",
	      close: parserConfig.close || parserConfig.scriptEndRegex || "%>",
	      mode: CodeMirror.getMode(config, parserConfig.scriptingModeSpec)
	    });
	  }, "htmlmixed");

	  CodeMirror.defineMIME("application/x-ejs", {name: "htmlembedded", scriptingModeSpec:"javascript"});
	  CodeMirror.defineMIME("application/x-aspx", {name: "htmlembedded", scriptingModeSpec:"text/x-csharp"});
	  CodeMirror.defineMIME("application/x-jsp", {name: "htmlembedded", scriptingModeSpec:"text/x-java"});
	  CodeMirror.defineMIME("application/x-erb", {name: "htmlembedded", scriptingModeSpec:"ruby"});
	});


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE

	(function(mod) {
	  if (true) // CommonJS
	    mod(__webpack_require__(95));
	  else if (typeof define == "function" && define.amd) // AMD
	    define(["../../lib/codemirror"], mod);
	  else // Plain browser env
	    mod(CodeMirror);
	})(function(CodeMirror) {
	"use strict";

	var htmlConfig = {
	  autoSelfClosers: {'area': true, 'base': true, 'br': true, 'col': true, 'command': true,
	                    'embed': true, 'frame': true, 'hr': true, 'img': true, 'input': true,
	                    'keygen': true, 'link': true, 'meta': true, 'param': true, 'source': true,
	                    'track': true, 'wbr': true, 'menuitem': true},
	  implicitlyClosed: {'dd': true, 'li': true, 'optgroup': true, 'option': true, 'p': true,
	                     'rp': true, 'rt': true, 'tbody': true, 'td': true, 'tfoot': true,
	                     'th': true, 'tr': true},
	  contextGrabbers: {
	    'dd': {'dd': true, 'dt': true},
	    'dt': {'dd': true, 'dt': true},
	    'li': {'li': true},
	    'option': {'option': true, 'optgroup': true},
	    'optgroup': {'optgroup': true},
	    'p': {'address': true, 'article': true, 'aside': true, 'blockquote': true, 'dir': true,
	          'div': true, 'dl': true, 'fieldset': true, 'footer': true, 'form': true,
	          'h1': true, 'h2': true, 'h3': true, 'h4': true, 'h5': true, 'h6': true,
	          'header': true, 'hgroup': true, 'hr': true, 'menu': true, 'nav': true, 'ol': true,
	          'p': true, 'pre': true, 'section': true, 'table': true, 'ul': true},
	    'rp': {'rp': true, 'rt': true},
	    'rt': {'rp': true, 'rt': true},
	    'tbody': {'tbody': true, 'tfoot': true},
	    'td': {'td': true, 'th': true},
	    'tfoot': {'tbody': true},
	    'th': {'td': true, 'th': true},
	    'thead': {'tbody': true, 'tfoot': true},
	    'tr': {'tr': true}
	  },
	  doNotIndent: {"pre": true},
	  allowUnquoted: true,
	  allowMissing: true,
	  caseFold: true
	}

	var xmlConfig = {
	  autoSelfClosers: {},
	  implicitlyClosed: {},
	  contextGrabbers: {},
	  doNotIndent: {},
	  allowUnquoted: false,
	  allowMissing: false,
	  caseFold: false
	}

	CodeMirror.defineMode("xml", function(editorConf, config_) {
	  var indentUnit = editorConf.indentUnit
	  var config = {}
	  var defaults = config_.htmlMode ? htmlConfig : xmlConfig
	  for (var prop in defaults) config[prop] = defaults[prop]
	  for (var prop in config_) config[prop] = config_[prop]

	  // Return variables for tokenizers
	  var type, setStyle;

	  function inText(stream, state) {
	    function chain(parser) {
	      state.tokenize = parser;
	      return parser(stream, state);
	    }

	    var ch = stream.next();
	    if (ch == "<") {
	      if (stream.eat("!")) {
	        if (stream.eat("[")) {
	          if (stream.match("CDATA[")) return chain(inBlock("atom", "]]>"));
	          else return null;
	        } else if (stream.match("--")) {
	          return chain(inBlock("comment", "-->"));
	        } else if (stream.match("DOCTYPE", true, true)) {
	          stream.eatWhile(/[\w\._\-]/);
	          return chain(doctype(1));
	        } else {
	          return null;
	        }
	      } else if (stream.eat("?")) {
	        stream.eatWhile(/[\w\._\-]/);
	        state.tokenize = inBlock("meta", "?>");
	        return "meta";
	      } else {
	        type = stream.eat("/") ? "closeTag" : "openTag";
	        state.tokenize = inTag;
	        return "tag bracket";
	      }
	    } else if (ch == "&") {
	      var ok;
	      if (stream.eat("#")) {
	        if (stream.eat("x")) {
	          ok = stream.eatWhile(/[a-fA-F\d]/) && stream.eat(";");
	        } else {
	          ok = stream.eatWhile(/[\d]/) && stream.eat(";");
	        }
	      } else {
	        ok = stream.eatWhile(/[\w\.\-:]/) && stream.eat(";");
	      }
	      return ok ? "atom" : "error";
	    } else {
	      stream.eatWhile(/[^&<]/);
	      return null;
	    }
	  }
	  inText.isInText = true;

	  function inTag(stream, state) {
	    var ch = stream.next();
	    if (ch == ">" || (ch == "/" && stream.eat(">"))) {
	      state.tokenize = inText;
	      type = ch == ">" ? "endTag" : "selfcloseTag";
	      return "tag bracket";
	    } else if (ch == "=") {
	      type = "equals";
	      return null;
	    } else if (ch == "<") {
	      state.tokenize = inText;
	      state.state = baseState;
	      state.tagName = state.tagStart = null;
	      var next = state.tokenize(stream, state);
	      return next ? next + " tag error" : "tag error";
	    } else if (/[\'\"]/.test(ch)) {
	      state.tokenize = inAttribute(ch);
	      state.stringStartCol = stream.column();
	      return state.tokenize(stream, state);
	    } else {
	      stream.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/);
	      return "word";
	    }
	  }

	  function inAttribute(quote) {
	    var closure = function(stream, state) {
	      while (!stream.eol()) {
	        if (stream.next() == quote) {
	          state.tokenize = inTag;
	          break;
	        }
	      }
	      return "string";
	    };
	    closure.isInAttribute = true;
	    return closure;
	  }

	  function inBlock(style, terminator) {
	    return function(stream, state) {
	      while (!stream.eol()) {
	        if (stream.match(terminator)) {
	          state.tokenize = inText;
	          break;
	        }
	        stream.next();
	      }
	      return style;
	    };
	  }
	  function doctype(depth) {
	    return function(stream, state) {
	      var ch;
	      while ((ch = stream.next()) != null) {
	        if (ch == "<") {
	          state.tokenize = doctype(depth + 1);
	          return state.tokenize(stream, state);
	        } else if (ch == ">") {
	          if (depth == 1) {
	            state.tokenize = inText;
	            break;
	          } else {
	            state.tokenize = doctype(depth - 1);
	            return state.tokenize(stream, state);
	          }
	        }
	      }
	      return "meta";
	    };
	  }

	  function Context(state, tagName, startOfLine) {
	    this.prev = state.context;
	    this.tagName = tagName;
	    this.indent = state.indented;
	    this.startOfLine = startOfLine;
	    if (config.doNotIndent.hasOwnProperty(tagName) || (state.context && state.context.noIndent))
	      this.noIndent = true;
	  }
	  function popContext(state) {
	    if (state.context) state.context = state.context.prev;
	  }
	  function maybePopContext(state, nextTagName) {
	    var parentTagName;
	    while (true) {
	      if (!state.context) {
	        return;
	      }
	      parentTagName = state.context.tagName;
	      if (!config.contextGrabbers.hasOwnProperty(parentTagName) ||
	          !config.contextGrabbers[parentTagName].hasOwnProperty(nextTagName)) {
	        return;
	      }
	      popContext(state);
	    }
	  }

	  function baseState(type, stream, state) {
	    if (type == "openTag") {
	      state.tagStart = stream.column();
	      return tagNameState;
	    } else if (type == "closeTag") {
	      return closeTagNameState;
	    } else {
	      return baseState;
	    }
	  }
	  function tagNameState(type, stream, state) {
	    if (type == "word") {
	      state.tagName = stream.current();
	      setStyle = "tag";
	      return attrState;
	    } else {
	      setStyle = "error";
	      return tagNameState;
	    }
	  }
	  function closeTagNameState(type, stream, state) {
	    if (type == "word") {
	      var tagName = stream.current();
	      if (state.context && state.context.tagName != tagName &&
	          config.implicitlyClosed.hasOwnProperty(state.context.tagName))
	        popContext(state);
	      if ((state.context && state.context.tagName == tagName) || config.matchClosing === false) {
	        setStyle = "tag";
	        return closeState;
	      } else {
	        setStyle = "tag error";
	        return closeStateErr;
	      }
	    } else {
	      setStyle = "error";
	      return closeStateErr;
	    }
	  }

	  function closeState(type, _stream, state) {
	    if (type != "endTag") {
	      setStyle = "error";
	      return closeState;
	    }
	    popContext(state);
	    return baseState;
	  }
	  function closeStateErr(type, stream, state) {
	    setStyle = "error";
	    return closeState(type, stream, state);
	  }

	  function attrState(type, _stream, state) {
	    if (type == "word") {
	      setStyle = "attribute";
	      return attrEqState;
	    } else if (type == "endTag" || type == "selfcloseTag") {
	      var tagName = state.tagName, tagStart = state.tagStart;
	      state.tagName = state.tagStart = null;
	      if (type == "selfcloseTag" ||
	          config.autoSelfClosers.hasOwnProperty(tagName)) {
	        maybePopContext(state, tagName);
	      } else {
	        maybePopContext(state, tagName);
	        state.context = new Context(state, tagName, tagStart == state.indented);
	      }
	      return baseState;
	    }
	    setStyle = "error";
	    return attrState;
	  }
	  function attrEqState(type, stream, state) {
	    if (type == "equals") return attrValueState;
	    if (!config.allowMissing) setStyle = "error";
	    return attrState(type, stream, state);
	  }
	  function attrValueState(type, stream, state) {
	    if (type == "string") return attrContinuedState;
	    if (type == "word" && config.allowUnquoted) {setStyle = "string"; return attrState;}
	    setStyle = "error";
	    return attrState(type, stream, state);
	  }
	  function attrContinuedState(type, stream, state) {
	    if (type == "string") return attrContinuedState;
	    return attrState(type, stream, state);
	  }

	  return {
	    startState: function(baseIndent) {
	      var state = {tokenize: inText,
	                   state: baseState,
	                   indented: baseIndent || 0,
	                   tagName: null, tagStart: null,
	                   context: null}
	      if (baseIndent != null) state.baseIndent = baseIndent
	      return state
	    },

	    token: function(stream, state) {
	      if (!state.tagName && stream.sol())
	        state.indented = stream.indentation();

	      if (stream.eatSpace()) return null;
	      type = null;
	      var style = state.tokenize(stream, state);
	      if ((style || type) && style != "comment") {
	        setStyle = null;
	        state.state = state.state(type || style, stream, state);
	        if (setStyle)
	          style = setStyle == "error" ? style + " error" : setStyle;
	      }
	      return style;
	    },

	    indent: function(state, textAfter, fullLine) {
	      var context = state.context;
	      // Indent multi-line strings (e.g. css).
	      if (state.tokenize.isInAttribute) {
	        if (state.tagStart == state.indented)
	          return state.stringStartCol + 1;
	        else
	          return state.indented + indentUnit;
	      }
	      if (context && context.noIndent) return CodeMirror.Pass;
	      if (state.tokenize != inTag && state.tokenize != inText)
	        return fullLine ? fullLine.match(/^(\s*)/)[0].length : 0;
	      // Indent the starts of attribute names.
	      if (state.tagName) {
	        if (config.multilineTagIndentPastTag !== false)
	          return state.tagStart + state.tagName.length + 2;
	        else
	          return state.tagStart + indentUnit * (config.multilineTagIndentFactor || 1);
	      }
	      if (config.alignCDATA && /<!\[CDATA\[/.test(textAfter)) return 0;
	      var tagAfter = textAfter && /^<(\/)?([\w_:\.-]*)/.exec(textAfter);
	      if (tagAfter && tagAfter[1]) { // Closing tag spotted
	        while (context) {
	          if (context.tagName == tagAfter[2]) {
	            context = context.prev;
	            break;
	          } else if (config.implicitlyClosed.hasOwnProperty(context.tagName)) {
	            context = context.prev;
	          } else {
	            break;
	          }
	        }
	      } else if (tagAfter) { // Opening tag spotted
	        while (context) {
	          var grabbers = config.contextGrabbers[context.tagName];
	          if (grabbers && grabbers.hasOwnProperty(tagAfter[2]))
	            context = context.prev;
	          else
	            break;
	        }
	      }
	      while (context && context.prev && !context.startOfLine)
	        context = context.prev;
	      if (context) return context.indent + indentUnit;
	      else return state.baseIndent || 0;
	    },

	    electricInput: /<\/[\s\w:]+>$/,
	    blockCommentStart: "<!--",
	    blockCommentEnd: "-->",

	    configuration: config.htmlMode ? "html" : "xml",
	    helperType: config.htmlMode ? "html" : "xml",

	    skipAttribute: function(state) {
	      if (state.state == attrValueState)
	        state.state = attrState
	    }
	  };
	});

	CodeMirror.defineMIME("text/xml", "xml");
	CodeMirror.defineMIME("application/xml", "xml");
	if (!CodeMirror.mimeModes.hasOwnProperty("text/html"))
	  CodeMirror.defineMIME("text/html", {name: "xml", htmlMode: true});

	});


/***/ }),
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 313 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 314 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"main":"main___1C4m7","treeViewCard":"treeViewCard___1JItk","styleViewTab":"styleViewTab___1xqHM"};

/***/ }),
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"ant-card":"ant-card___sRtRq","ant-card-no-hovering":"ant-card-no-hovering___1YftV","ant-card-bordered":"ant-card-bordered___3O-SO","ant-card-head":"ant-card-head___3po8B","ant-card-head-title":"ant-card-head-title___2h7hG","ant-card-extra":"ant-card-extra___FAtkB","ant-card-body":"ant-card-body___1P4zz","ant-card-contain-grid":"ant-card-contain-grid___2dzwm","ant-card-grid":"ant-card-grid___ui6WJ","ant-card-wider-padding":"ant-card-wider-padding___71ogO","ant-card-padding-transition":"ant-card-padding-transition___2BMEn","ant-card-loading":"ant-card-loading___1FFyy","ant-card-loading-content":"ant-card-loading-content___1C-MK","ant-card-loading-block":"ant-card-loading-block___2UtDa","card-loading":"card-loading___vWDfd"};

/***/ }),
/* 324 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"ant-collapse":"ant-collapse___2Y9wT","ant-collapse-item":"ant-collapse-item___mkroi","ant-collapse-header":"ant-collapse-header___3XZqh","arrow":"arrow___3Dp6s","ant-collapse-anim-active":"ant-collapse-anim-active___2c-8J","ant-collapse-content":"ant-collapse-content___2hd6P","ant-collapse-content-box":"ant-collapse-content-box___3zWkP","ant-collapse-content-inactive":"ant-collapse-content-inactive___2wVGV","ant-collapse-borderless":"ant-collapse-borderless___1owT7","ant-collapse-item-active":"ant-collapse-item-active___DmwC0","ant-collapse-item-disabled":"ant-collapse-item-disabled___23x5M"};

/***/ }),
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(21);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _Panel = __webpack_require__(384);

	var _Panel2 = _interopRequireDefault(_Panel);

	var _openAnimationFactory = __webpack_require__(387);

	var _openAnimationFactory2 = _interopRequireDefault(_openAnimationFactory);

	var _classnames = __webpack_require__(20);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function toArray(activeKey) {
	  var currentActiveKey = activeKey;
	  if (!Array.isArray(currentActiveKey)) {
	    currentActiveKey = currentActiveKey ? [currentActiveKey] : [];
	  }
	  return currentActiveKey;
	}

	var Collapse = function (_Component) {
	  _inherits(Collapse, _Component);

	  function Collapse(props) {
	    _classCallCheck(this, Collapse);

	    var _this = _possibleConstructorReturn(this, (Collapse.__proto__ || Object.getPrototypeOf(Collapse)).call(this, props));

	    var _this$props = _this.props,
	        activeKey = _this$props.activeKey,
	        defaultActiveKey = _this$props.defaultActiveKey;

	    var currentActiveKey = defaultActiveKey;
	    if ('activeKey' in _this.props) {
	      currentActiveKey = activeKey;
	    }

	    _this.state = {
	      openAnimation: _this.props.openAnimation || (0, _openAnimationFactory2['default'])(_this.props.prefixCls),
	      activeKey: toArray(currentActiveKey)
	    };
	    return _this;
	  }

	  _createClass(Collapse, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if ('activeKey' in nextProps) {
	        this.setState({
	          activeKey: toArray(nextProps.activeKey)
	        });
	      }
	      if ('openAnimation' in nextProps) {
	        this.setState({
	          openAnimation: nextProps.openAnimation
	        });
	      }
	    }
	  }, {
	    key: 'onClickItem',
	    value: function onClickItem(key) {
	      var activeKey = this.state.activeKey;
	      if (this.props.accordion) {
	        activeKey = activeKey[0] === key ? [] : [key];
	      } else {
	        activeKey = [].concat(_toConsumableArray(activeKey));
	        var index = activeKey.indexOf(key);
	        var isActive = index > -1;
	        if (isActive) {
	          // remove active state
	          activeKey.splice(index, 1);
	        } else {
	          activeKey.push(key);
	        }
	      }
	      this.setActiveKey(activeKey);
	    }
	  }, {
	    key: 'getItems',
	    value: function getItems() {
	      var _this2 = this;

	      var activeKey = this.state.activeKey;
	      var _props = this.props,
	          prefixCls = _props.prefixCls,
	          accordion = _props.accordion,
	          destroyInactivePanel = _props.destroyInactivePanel;

	      var newChildren = [];

	      _react.Children.forEach(this.props.children, function (child, index) {
	        if (!child) return;
	        // If there is no key provide, use the panel order as default key
	        var key = child.key || String(index);
	        var _child$props = child.props,
	            header = _child$props.header,
	            headerClass = _child$props.headerClass,
	            disabled = _child$props.disabled;

	        var isActive = false;
	        if (accordion) {
	          isActive = activeKey[0] === key;
	        } else {
	          isActive = activeKey.indexOf(key) > -1;
	        }

	        var props = {
	          key: key,
	          header: header,
	          headerClass: headerClass,
	          isActive: isActive,
	          prefixCls: prefixCls,
	          destroyInactivePanel: destroyInactivePanel,
	          openAnimation: _this2.state.openAnimation,
	          children: child.props.children,
	          onItemClick: disabled ? null : function () {
	            return _this2.onClickItem(key);
	          }
	        };

	        newChildren.push(_react2['default'].cloneElement(child, props));
	      });

	      return newChildren;
	    }
	  }, {
	    key: 'setActiveKey',
	    value: function setActiveKey(activeKey) {
	      if (!('activeKey' in this.props)) {
	        this.setState({ activeKey: activeKey });
	      }
	      this.props.onChange(this.props.accordion ? activeKey[0] : activeKey);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _classNames;

	      var _props2 = this.props,
	          prefixCls = _props2.prefixCls,
	          className = _props2.className,
	          style = _props2.style;

	      var collapseClassName = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, className, !!className), _classNames));
	      return _react2['default'].createElement(
	        'div',
	        { className: collapseClassName, style: style },
	        this.getItems()
	      );
	    }
	  }]);

	  return Collapse;
	}(_react.Component);

	Collapse.propTypes = {
	  children: _propTypes2['default'].any,
	  prefixCls: _propTypes2['default'].string,
	  activeKey: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].arrayOf(_propTypes2['default'].string)]),
	  defaultActiveKey: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].arrayOf(_propTypes2['default'].string)]),
	  openAnimation: _propTypes2['default'].object,
	  onChange: _propTypes2['default'].func,
	  accordion: _propTypes2['default'].bool,
	  className: _propTypes2['default'].string,
	  style: _propTypes2['default'].object,
	  destroyInactivePanel: _propTypes2['default'].bool
	};

	Collapse.defaultProps = {
	  prefixCls: 'rc-collapse',
	  onChange: function onChange() {},

	  accordion: false,
	  destroyInactivePanel: false
	};

	Collapse.Panel = _Panel2['default'];

	exports['default'] = Collapse;
	module.exports = exports['default'];

/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(21);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(20);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _PanelContent = __webpack_require__(385);

	var _PanelContent2 = _interopRequireDefault(_PanelContent);

	var _rcAnimate = __webpack_require__(101);

	var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CollapsePanel = function (_Component) {
	  _inherits(CollapsePanel, _Component);

	  function CollapsePanel() {
	    _classCallCheck(this, CollapsePanel);

	    return _possibleConstructorReturn(this, (CollapsePanel.__proto__ || Object.getPrototypeOf(CollapsePanel)).apply(this, arguments));
	  }

	  _createClass(CollapsePanel, [{
	    key: 'handleItemClick',
	    value: function handleItemClick() {
	      if (this.props.onItemClick) {
	        this.props.onItemClick();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _classNames2;

	      var _props = this.props,
	          className = _props.className,
	          id = _props.id,
	          style = _props.style,
	          prefixCls = _props.prefixCls,
	          header = _props.header,
	          headerClass = _props.headerClass,
	          children = _props.children,
	          isActive = _props.isActive,
	          showArrow = _props.showArrow,
	          destroyInactivePanel = _props.destroyInactivePanel,
	          disabled = _props.disabled;

	      var headerCls = (0, _classnames2['default'])(prefixCls + '-header', _defineProperty({}, headerClass, headerClass));
	      var itemCls = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-item', true), _defineProperty(_classNames2, prefixCls + '-item-active', isActive), _defineProperty(_classNames2, prefixCls + '-item-disabled', disabled), _classNames2), className);
	      return _react2['default'].createElement(
	        'div',
	        { className: itemCls, style: style, id: id },
	        _react2['default'].createElement(
	          'div',
	          {
	            className: headerCls,
	            onClick: this.handleItemClick.bind(this),
	            role: 'tab',
	            'aria-expanded': isActive
	          },
	          showArrow && _react2['default'].createElement('i', { className: 'arrow' }),
	          header
	        ),
	        _react2['default'].createElement(
	          _rcAnimate2['default'],
	          {
	            showProp: 'isActive',
	            exclusive: true,
	            component: '',
	            animation: this.props.openAnimation
	          },
	          _react2['default'].createElement(
	            _PanelContent2['default'],
	            {
	              prefixCls: prefixCls,
	              isActive: isActive,
	              destroyInactivePanel: destroyInactivePanel
	            },
	            children
	          )
	        )
	      );
	    }
	  }]);

	  return CollapsePanel;
	}(_react.Component);

	CollapsePanel.propTypes = {
	  className: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].object]),
	  id: _propTypes2['default'].string,
	  children: _propTypes2['default'].any,
	  openAnimation: _propTypes2['default'].object,
	  prefixCls: _propTypes2['default'].string,
	  header: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number, _propTypes2['default'].node]),
	  headerClass: _propTypes2['default'].string,
	  showArrow: _propTypes2['default'].bool,
	  isActive: _propTypes2['default'].bool,
	  onItemClick: _propTypes2['default'].func,
	  style: _propTypes2['default'].object,
	  destroyInactivePanel: _propTypes2['default'].bool,
	  disabled: _propTypes2['default'].bool
	};

	CollapsePanel.defaultProps = {
	  showArrow: true,
	  isActive: false,
	  destroyInactivePanel: false,
	  onItemClick: function onItemClick() {},

	  headerClass: ''
	};

	exports['default'] = CollapsePanel;
	module.exports = exports['default'];

/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(21);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = __webpack_require__(20);

	var _classnames3 = _interopRequireDefault(_classnames2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PanelContent = function (_Component) {
	  _inherits(PanelContent, _Component);

	  function PanelContent() {
	    _classCallCheck(this, PanelContent);

	    return _possibleConstructorReturn(this, (PanelContent.__proto__ || Object.getPrototypeOf(PanelContent)).apply(this, arguments));
	  }

	  _createClass(PanelContent, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return this.props.isActive || nextProps.isActive;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _classnames;

	      this._isActived = this._isActived || this.props.isActive;
	      if (!this._isActived) {
	        return null;
	      }
	      var _props = this.props,
	          prefixCls = _props.prefixCls,
	          isActive = _props.isActive,
	          children = _props.children,
	          destroyInactivePanel = _props.destroyInactivePanel;

	      var contentCls = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, prefixCls + '-content', true), _defineProperty(_classnames, prefixCls + '-content-active', isActive), _defineProperty(_classnames, prefixCls + '-content-inactive', !isActive), _classnames));
	      var child = !isActive && destroyInactivePanel ? null : _react2['default'].createElement(
	        'div',
	        { className: prefixCls + '-content-box' },
	        children
	      );
	      return _react2['default'].createElement(
	        'div',
	        {
	          className: contentCls,
	          role: 'tabpanel'
	        },
	        child
	      );
	    }
	  }]);

	  return PanelContent;
	}(_react.Component);

	PanelContent.propTypes = {
	  prefixCls: _propTypes2['default'].string,
	  isActive: _propTypes2['default'].bool,
	  children: _propTypes2['default'].any,
	  destroyInactivePanel: _propTypes2['default'].bool
	};

	exports['default'] = PanelContent;
	module.exports = exports['default'];

/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Panel = undefined;

	var _Collapse = __webpack_require__(383);

	var _Collapse2 = _interopRequireDefault(_Collapse);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	exports['default'] = _Collapse2['default'];
	var Panel = exports.Panel = _Collapse2['default'].Panel;

/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _cssAnimation = __webpack_require__(98);

	var _cssAnimation2 = _interopRequireDefault(_cssAnimation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function animate(node, show, transitionName, done) {
	  var height = void 0;
	  return (0, _cssAnimation2['default'])(node, transitionName, {
	    start: function start() {
	      if (!show) {
	        node.style.height = node.offsetHeight + 'px';
	      } else {
	        height = node.offsetHeight;
	        node.style.height = 0;
	      }
	    },
	    active: function active() {
	      node.style.height = (show ? height : 0) + 'px';
	    },
	    end: function end() {
	      node.style.height = '';
	      done();
	    }
	  });
	}

	function animation(prefixCls) {
	  return {
	    enter: function enter(node, done) {
	      return animate(node, true, prefixCls + '-anim', done);
	    },
	    leave: function leave(node, done) {
	      return animate(node, false, prefixCls + '-anim', done);
	    }
	  };
	}

	exports['default'] = animation;
	module.exports = exports['default'];

/***/ })
/******/ ]);