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

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.DOMExplorerDashboard = undefined;var _classCallCheck2 = __webpack_require__(9);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = __webpack_require__(15);var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = __webpack_require__(14);var _inherits3 = _interopRequireDefault(_inherits2);var _DomExplorerNode = __webpack_require__(178);var _DomExplorerNode2 = _interopRequireDefault(_DomExplorerNode);
	var _DomExplorerPropertyEditor = __webpack_require__(180);var _DomExplorerPropertyEditor2 = _interopRequireDefault(_DomExplorerPropertyEditor);
	var _DomSettings = __webpack_require__(182);var _DomSettings2 = _interopRequireDefault(_DomSettings);
	var _DashboardCommands = __webpack_require__(177);var _DashboardCommands2 = _interopRequireDefault(_DashboardCommands);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _VORLON =
	VORLON,DashboardPlugin = _VORLON.DashboardPlugin,Core = _VORLON.Core,Tools = _VORLON.Tools,FluentDOM = _VORLON.FluentDOM;var
	DOMExplorerDashboard = exports.DOMExplorerDashboard = function (_DashboardPlugin) {(0, _inherits3.default)(DOMExplorerDashboard, _DashboardPlugin);
	    function DOMExplorerDashboard() {(0, _classCallCheck3.default)(this, DOMExplorerDashboard);var _this = (0, _possibleConstructorReturn3.default)(this,
	        _DashboardPlugin.call(this, "domExplorer", "control.html", "control.css"));
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
	            _this2._containerDiv = filledDiv;
	            _this2.treeDiv = Tools.QuerySelectorById(filledDiv, "treeView");
	            _this2._innerHTMLView = Tools.QuerySelectorById(filledDiv, "innerHTMLView");
	            _this2._margincontainer = Tools.QuerySelectorById(filledDiv, "margincontainer");
	            _this2._bordercontainer = Tools.QuerySelectorById(filledDiv, "bordercontainer");
	            _this2._paddingcontainer = Tools.QuerySelectorById(filledDiv, "paddingcontainer");
	            _this2._sizecontainer = Tools.QuerySelectorById(filledDiv, "sizecontainer");
	            _this2._computedsection = Tools.QuerySelectorById(filledDiv, "computedsection");
	            _this2._searchinput = Tools.QuerySelectorById(filledDiv, "searchinput");
	            _this2._searchresults = Tools.QuerySelectorById(filledDiv, "searchresults");
	            _this2.styleView = Tools.QuerySelectorById(filledDiv, "styleView");
	            var domSettings = new _DomSettings2.default(_this2);
	            _this2.searchDOM();
	            _this2.refreshButton = _this2._containerDiv.querySelector('x-action[event="refresh"]');
	            _this2.inspectButton = _this2._containerDiv.querySelector('x-action[event="inspect"]');
	            _this2._stylesEditor = new _DomExplorerPropertyEditor2.default(_this2);
	            _this2._containerDiv.addEventListener('inspectFromClient', function () {
	                _this2.sendCommandToClient('inspect');
	            });
	            _this2._containerDiv.addEventListener('refresh', function () {
	                _this2.sendCommandToClient('refresh');
	            });
	            _this2._containerDiv.addEventListener('gethtml', function () {
	                _this2.sendCommandToClient('getInnerHTML', {
	                    order: _this2._selectedNode.node.internalId });

	            });
	            _this2._containerDiv.addEventListener('savehtml', function () {
	                _this2.clikedNodeID = _this2._selectedNode.node.internalId;
	                _this2.sendCommandToClient('saveinnerHTML', {
	                    order: _this2._selectedNode.node.internalId,
	                    innerhtml: _this2._innerHTMLView.value });

	            });
	            _this2.treeDiv.addEventListener('click', function (e) {
	                var button = e.target;
	                if (button.className.match('treeNodeButton')) {
	                    button.hasAttribute('data-collapsed') ? button.removeAttribute('data-collapsed') : button.setAttribute('data-collapsed', '');
	                }
	            });
	            _this2.treeDiv.addEventListener('mouseenter', function (e) {
	                var node = e.target;
	                var parent = node.parentElement;
	                var isHeader = node.className.match('treeNodeHeader');
	                if (isHeader || parent.className.match('treeNodeClosingText')) {
	                    if (isHeader) {
	                        parent.setAttribute('data-hovered-tag', '');
	                        var id = $(node).data('internalid');
	                        if (id) {
	                            _this2.hoverNode(id);
	                        }
	                    } else
	                    {
	                        parent.parentElement.setAttribute('data-hovered-tag', '');
	                        var id = $(parent).data('internalid');
	                        if (id) {
	                            _this2.hoverNode(id);
	                        }
	                    }
	                }
	            }, true);
	            _this2.treeDiv.addEventListener('mouseleave', function (e) {
	                var node = e.target;
	                if (node.className.match('treeNodeHeader') || node.parentElement.className.match('treeNodeClosingText')) {
	                    var hovered = _this2.treeDiv.querySelector('[data-hovered-tag]');
	                    if (hovered)
	                    hovered.removeAttribute('data-hovered-tag');
	                    _this2.hoverNode(null, true);
	                }
	            }, true);
	            $('.domload-spinner', _this2._containerDiv).on('dblclick', function () {
	                location.reload();
	            });
	            $("#accordion h3", _this2._containerDiv).click(function (elt) {
	                $('.visible', elt.target.parentElement).removeClass('visible');
	                $('#' + elt.target.className, elt.target.parentElement).addClass('visible');
	                elt.target.classList.add('visible');
	                if (elt.target.className.indexOf("htmlsection") !== -1) {
	                    _this2.sendCommandToClient('getInnerHTML', {
	                        order: _this2._selectedNode.node.internalId });

	                } else
	                if (elt.target.className.indexOf("layoutsection") !== -1) {
	                    _this2.sendCommandToClient('getStyle', {
	                        order: _this2._selectedNode.node.internalId });

	                } else
	                if (elt.target.className.indexOf("computedsection") !== -1) {
	                    _this2.sendCommandToClient('getComputedStyleById', {
	                        order: _this2._selectedNode.node.internalId });

	                }
	            });
	            _this2._ready = true;
	            _this2.sendCommandToClient("getMutationObeserverAvailability");
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
	    };DOMExplorerDashboard.prototype.
	    onRealtimeMessageReceivedFromClientSide = function onRealtimeMessageReceivedFromClientSide(receivedObject) {
	        if (receivedObject.type === "contentchanged" && !this._editablemode && (!this._clientHaveMutationObserver || this._autorefresh == false)) {
	            this.dirtyCheck();
	        } else
	        if (receivedObject.type === "contentchanged" && receivedObject.internalId !== null && this._clientHaveMutationObserver) {
	            if (this._autorefresh)
	            this.sendCommandToClient('refreshNode', {
	                order: receivedObject.internalId });else


	            this.dirtyCheck();
	        }
	    };DOMExplorerDashboard.prototype.
	    contentChanged = function contentChanged() {
	        this.refreshButton.setAttribute('changed', '');
	    };DOMExplorerDashboard.prototype.
	    setInnerHTMLView = function setInnerHTMLView(data) {
	        this._innerHTMLView.value = data.innerHTML;
	    };DOMExplorerDashboard.prototype.
	    setComputedStyle = function setComputedStyle(data) {var _this4 = this;
	        if (data && data.length) {
	            data.forEach(function (item) {
	                var root = new FluentDOM('div', 'styleWrap', _this4._computedsection);
	                root.append('span', 'styleLabel', function (span) {
	                    span.text(item.name);
	                });
	                root.append('span', 'styleValue', function (span) {
	                    span.text(item.value);
	                });
	            });
	        }
	    };DOMExplorerDashboard.prototype.
	    setLayoutStyle = function setLayoutStyle(data) {
	        this._margincontainer.parentElement.parentElement.classList.remove('hide');
	        $('.top', this._margincontainer).html(data.margin.top);
	        $('.bottom', this._margincontainer).html(data.margin.bottom);
	        $('.left', this._margincontainer).html(data.margin.left);
	        $('.right', this._margincontainer).html(data.margin.right);
	        $('.top', this._bordercontainer).html(data.border.topWidth);
	        $('.bottom', this._bordercontainer).html(data.border.bottomWidth);
	        $('.left', this._bordercontainer).html(data.border.leftWidth);
	        $('.right', this._bordercontainer).html(data.border.rightWidth);
	        $('.top', this._paddingcontainer).html(data.padding.top);
	        $('.bottom', this._paddingcontainer).html(data.padding.bottom);
	        $('.left', this._paddingcontainer).html(data.padding.left);
	        $('.right', this._paddingcontainer).html(data.padding.right);
	        var w = data.size.width;
	        if (w && w.indexOf('.') !== -1) {
	            w = w.split('.')[0] + 'px';
	        }
	        var h = data.size.height;
	        if (h && h.indexOf('.') !== -1) {
	            h = h.split('.')[0] + 'px';
	        }
	        $(this._sizecontainer).html(w + " x " + h);
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
	        if (this.treeDiv.parentElement)
	        this.treeDiv.parentElement.classList.add('active');
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
	    hoverNode = function hoverNode(internalId) {var _this5 = this;var unselect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	        this._highlightedNode = internalId;
	        if (!internalId) {
	            this.sendCommandToClient('unhighlight', {
	                order: null });

	        } else
	        if (unselect) {
	            setTimeout(function () {
	                if (!_this5._highlightedNode) {
	                    _this5.sendCommandToClient('unhighlight', {
	                        order: internalId });

	                }
	            }, 5);
	        } else
	        {
	            this.sendCommandToClient('highlight', {
	                order: internalId });

	        }
	    };DOMExplorerDashboard.prototype.
	    select = function select(selected) {
	        $("#accordion .stylessection ").trigger('click');
	        this._margincontainer.parentElement.parentElement.classList.add('hide');
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

	            this._stylesEditor.generateStyles(selected.node, selected.node.internalId);
	            //this._stylesEditor.generateStyles(selected.node, selected.node.internalId);
	            this._innerHTMLView.value = "";
	        } else
	        {
	            this._selectedNode = null;
	        }
	    };DOMExplorerDashboard.prototype.
	    setNodeStyle = function setNodeStyle(internalId, styles) {
	        if (this._selectedNode && this._selectedNode.node.internalId == internalId) {
	            this._stylesEditor.generateStyles(this._selectedNode.node, this._selectedNode.node.internalId, styles);
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

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.5.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var store = __webpack_require__(29)('wks');
	var uid = __webpack_require__(18);
	var Symbol = __webpack_require__(1).Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(11);
	var IE8_DOM_DEFINE = __webpack_require__(43);
	var toPrimitive = __webpack_require__(31);
	var dP = Object.defineProperty;

	exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(16)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(5);
	var createDesc = __webpack_require__(17);
	module.exports = __webpack_require__(6) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(51);
	var defined = __webpack_require__(23);
	module.exports = function (it) {
	  return IObject(defined(it));
	};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(12);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(1);
	var core = __webpack_require__(3);
	var ctx = __webpack_require__(39);
	var hide = __webpack_require__(7);
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(57);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(56);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(36);

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(36);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
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
/* 18 */
/***/ (function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

	module.exports = {};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(47);
	var enumBugKeys = __webpack_require__(24);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

	exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 22 */,
/* 23 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');


/***/ }),
/* 25 */
/***/ (function(module, exports) {

	module.exports = true;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(11);
	var dPs = __webpack_require__(72);
	var enumBugKeys = __webpack_require__(24);
	var IE_PROTO = __webpack_require__(28)('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(40)('iframe');
	  var i = enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(50).appendChild(iframe);
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(5).f;
	var has = __webpack_require__(2);
	var TAG = __webpack_require__(4)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(29)('keys');
	var uid = __webpack_require__(18);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(1);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(12);
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(1);
	var core = __webpack_require__(3);
	var LIBRARY = __webpack_require__(25);
	var wksExt = __webpack_require__(33);
	var defineProperty = __webpack_require__(5).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(4);


/***/ }),
/* 34 */,
/* 35 */,
/* 36 */
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
/* 37 */,
/* 38 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};


/***/ }),
/* 39 */
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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(12);
	var document = __webpack_require__(1).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 42 */,
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(6) && !__webpack_require__(16)(function () {
	  return Object.defineProperty(__webpack_require__(40)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(25);
	var $export = __webpack_require__(13);
	var redefine = __webpack_require__(48);
	var hide = __webpack_require__(7);
	var has = __webpack_require__(2);
	var Iterators = __webpack_require__(19);
	var $iterCreate = __webpack_require__(69);
	var setToStringTag = __webpack_require__(27);
	var getPrototypeOf = __webpack_require__(53);
	var ITERATOR = __webpack_require__(4)('iterator');
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

	var pIE = __webpack_require__(21);
	var createDesc = __webpack_require__(17);
	var toIObject = __webpack_require__(8);
	var toPrimitive = __webpack_require__(31);
	var has = __webpack_require__(2);
	var IE8_DOM_DEFINE = __webpack_require__(43);
	var gOPD = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
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
	var hiddenKeys = __webpack_require__(24).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	var has = __webpack_require__(2);
	var toIObject = __webpack_require__(8);
	var arrayIndexOf = __webpack_require__(66)(false);
	var IE_PROTO = __webpack_require__(28)('IE_PROTO');

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

	module.exports = __webpack_require__(7);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(23);
	module.exports = function (it) {
	  return Object(defined(it));
	};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	var document = __webpack_require__(1).document;
	module.exports = document && document.documentElement;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(38);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(8);
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(2);
	var toObject = __webpack_require__(49);
	var IE_PROTO = __webpack_require__(28)('IE_PROTO');
	var ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(30);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};


/***/ }),
/* 55 */
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
	var $Object = __webpack_require__(3).Object;
	module.exports = function create(P, D) {
	  return $Object.create(P, D);
	};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(78);
	module.exports = __webpack_require__(3).Object.setPrototypeOf;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(80);
	__webpack_require__(79);
	__webpack_require__(81);
	__webpack_require__(82);
	module.exports = __webpack_require__(3).Symbol;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(55);
	__webpack_require__(83);
	module.exports = __webpack_require__(33).f('iterator');


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
	var toIObject = __webpack_require__(8);
	var toLength = __webpack_require__(54);
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
	var getKeys = __webpack_require__(20);
	var gOPS = __webpack_require__(41);
	var pIE = __webpack_require__(21);
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
	var cof = __webpack_require__(38);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var create = __webpack_require__(26);
	var descriptor = __webpack_require__(17);
	var setToStringTag = __webpack_require__(27);
	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(7)(IteratorPrototype, __webpack_require__(4)('iterator'), function () { return this; });

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

	var META = __webpack_require__(18)('meta');
	var isObject = __webpack_require__(12);
	var has = __webpack_require__(2);
	var setDesc = __webpack_require__(5).f;
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

	var dP = __webpack_require__(5);
	var anObject = __webpack_require__(11);
	var getKeys = __webpack_require__(20);

	module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
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
	var isObject = __webpack_require__(12);
	var anObject = __webpack_require__(11);
	var check = function (O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = __webpack_require__(39)(Function.call, __webpack_require__(45).f(Object.prototype, '__proto__').set, 2);
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

	var toInteger = __webpack_require__(30);
	var defined = __webpack_require__(23);
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

	var toInteger = __webpack_require__(30);
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
	var Iterators = __webpack_require__(19);
	var toIObject = __webpack_require__(8);

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

	var $export = __webpack_require__(13);
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', { create: __webpack_require__(26) });


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(13);
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
	var has = __webpack_require__(2);
	var DESCRIPTORS = __webpack_require__(6);
	var $export = __webpack_require__(13);
	var redefine = __webpack_require__(48);
	var META = __webpack_require__(71).KEY;
	var $fails = __webpack_require__(16);
	var shared = __webpack_require__(29);
	var setToStringTag = __webpack_require__(27);
	var uid = __webpack_require__(18);
	var wks = __webpack_require__(4);
	var wksExt = __webpack_require__(33);
	var wksDefine = __webpack_require__(32);
	var enumKeys = __webpack_require__(67);
	var isArray = __webpack_require__(68);
	var anObject = __webpack_require__(11);
	var toIObject = __webpack_require__(8);
	var toPrimitive = __webpack_require__(31);
	var createDesc = __webpack_require__(17);
	var _create = __webpack_require__(26);
	var gOPNExt = __webpack_require__(52);
	var $GOPD = __webpack_require__(45);
	var $DP = __webpack_require__(5);
	var $keys = __webpack_require__(20);
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
	  __webpack_require__(21).f = $propertyIsEnumerable;
	  __webpack_require__(41).f = $getOwnPropertySymbols;

	  if (DESCRIPTORS && !__webpack_require__(25)) {
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
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(7)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(32)('asyncIterator');


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(32)('observable');


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(76);
	var global = __webpack_require__(1);
	var hide = __webpack_require__(7);
	var Iterators = __webpack_require__(19);
	var TO_STRING_TAG = __webpack_require__(4)('toStringTag');

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
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(98), __esModule: true };

/***/ }),
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

	var core = __webpack_require__(3);
	var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
	module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};


/***/ }),
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */
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
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _classCallCheck2 = __webpack_require__(9);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _DomExplorerNodeAttribute = __webpack_require__(179);var _DomExplorerNodeAttribute2 = _interopRequireDefault(_DomExplorerNodeAttribute);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _VORLON =
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
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _classCallCheck2 = __webpack_require__(9);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _VORLON = VORLON,FluentDOM = _VORLON.FluentDOM;var
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
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _classCallCheck2 = __webpack_require__(9);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _DomExplorerPropertyEditorItem = __webpack_require__(181);var _DomExplorerPropertyEditorItem2 = _interopRequireDefault(_DomExplorerPropertyEditorItem);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var
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
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _classCallCheck2 = __webpack_require__(9);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var DomExplorerPropertyEditorItem = function () {
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
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _stringify = __webpack_require__(90);var _stringify2 = _interopRequireDefault(_stringify);var _classCallCheck2 = __webpack_require__(9);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _VORLON = VORLON,Tools = _VORLON.Tools,Core = _VORLON.Core;var
	DomSettings = function () {
	    function DomSettings(plugin) {(0, _classCallCheck3.default)(this, DomSettings);
	        this._plugin = plugin;
	        this.setSettings(this._plugin.getContainerDiv());
	    }DomSettings.prototype.
	    setSettings = function setSettings(filledDiv) {var _this = this;
	        this._globalload = Tools.QuerySelectorById(filledDiv, "globalload");
	        this._autorefresh = Tools.QuerySelectorById(filledDiv, "autorefresh");
	        this.loadSettings();
	        this.refreshClient();
	        $(this._autorefresh).change(function () {
	            _this.saveSettings();
	        });
	        $(this._globalload).change(function () {
	            _this.saveSettings();
	        });
	    };DomSettings.prototype.
	    refreshClient = function refreshClient() {
	        this._plugin.sendCommandToClient('setSettings', { globalload: this._globalload.checked, autoRefresh: this._autorefresh.checked });
	    };DomSettings.prototype.
	    loadSettings = function loadSettings() {
	        var stringSettings = Tools.getLocalStorageValue("settings" + Core._sessionID);
	        if (this._autorefresh && this._globalload && stringSettings) {
	            var settings = JSON.parse(stringSettings);
	            if (settings) {
	                $(this._globalload).switchButton({ checked: settings.globalload });
	                $(this._autorefresh).switchButton({ checked: settings.autorefresh });
	                if (settings.globalload)
	                this._plugin.sendCommandToClient('globalload', { value: true });
	                this._plugin.setAutorefresh(this._autorefresh.checked);
	                return;
	            }
	        }
	        $(this._globalload).switchButton({ checked: false });
	        $(this._autorefresh).switchButton({ checked: false });
	        this._plugin.setAutorefresh(this._autorefresh.checked);
	    };DomSettings.prototype.
	    saveSettings = function saveSettings() {
	        this.refreshClient();
	        this._plugin.setAutorefresh(this._autorefresh.checked);
	        Tools.setLocalStorageValue("settings" + Core._sessionID, (0, _stringify2.default)({
	            "globalload": this._globalload.checked,
	            "autorefresh": this._autorefresh.checked }));

	    };return DomSettings;}();exports.default = DomSettings;module.exports = exports["default"];

/***/ })
/******/ ]);