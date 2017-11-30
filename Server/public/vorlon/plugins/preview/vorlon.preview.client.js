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

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.PreviewClient = undefined;var _classCallCheck2 = __webpack_require__(5);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = __webpack_require__(11);var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = __webpack_require__(10);var _inherits3 = _interopRequireDefault(_inherits2);var _html2canvas = __webpack_require__(260);var _html2canvas2 = _interopRequireDefault(_html2canvas);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _VORLON =
	VORLON,Core = _VORLON.Core,ClientPlugin = _VORLON.ClientPlugin;
	var ready = function ready(callback) {
	    ///兼容FF,Google
	    if (document.addEventListener) {
	        var func = function func() {
	            document.removeEventListener('DOMContentLoaded', func, false);
	            callback();
	        };
	        document.addEventListener('DOMContentLoaded', func, false);
	    } else
	    if (document.attachEvent) {
	        document.attachEvent('onreadystatechange', function () {
	            if (document.readyState == "complete") {
	                document.detachEvent("onreadystatechange", arguments.callee);
	                callback();
	            }
	        });
	    } else
	    if (document.lastChild == document.body) {
	        callback();
	    }
	};var
	PreviewClient = exports.PreviewClient = function (_ClientPlugin) {(0, _inherits3.default)(PreviewClient, _ClientPlugin);
	    function PreviewClient() {(0, _classCallCheck3.default)(this, PreviewClient);
	        // Name
	        var _this = (0, _possibleConstructorReturn3.default)(this, _ClientPlugin.call(this, "preview"));_this._ready = true; // No need to wait
	        console.log('Started');return _this;
	    }
	    //Return unique id for your plugin
	    PreviewClient.prototype.getID = function getID() {
	        return "PREVIEW";
	    };PreviewClient.prototype.
	    refresh = function refresh() {



	    } //override this method with cleanup work that needs to happen
	    //as the user switches between clients on the dashboard
	    //we don't really need to do anything in this sample
	    // This code will run on the client //////////////////////
	    // Start the clientside code
	    ;PreviewClient.prototype.startClientSide = function startClientSide() {//don't actually need to do anything at startup
	        ready(function () {});
	    };
	    // Handle messages from the dashboard, on the client
	    PreviewClient.prototype.onRealtimeMessageReceivedFromDashboardSide = function onRealtimeMessageReceivedFromDashboardSide(receivedObject) {var _this2 = this;
	        if (receivedObject.message == 'preview') {
	            var width = document.body.clientWidth; //准备截图div的宽
	            var height = document.body.clientHeight; //准备截图div的高
	            var varscaleBy = 3; //缩放比例
	            var allImages = document.getElementsByTagName('img');
	            // 改变页面中img标签的src属性地址
	            // for (let index = 0; index < allImages.length; index++ ) {
	            //     const image = allImages[index];
	            //     if ( image.src.indexOf('proxyToLocal') < 0 ) {
	            //         image.src = `/proxyToLocal?url=${encodeURIComponent(image.src)}`;
	            //     }
	            // }
	            var node = document.body; // document.getElementById('header'); 
	            (0, _html2canvas2.default)(node, {
	                useCORS: true,
	                allowTaint: true }).
	            then(function (canvas) {
	                canvas.id = "mycanvas";
	                // document.body.appendChild(canvas);
	                //生成base64图片数据
	                var dataUrl = canvas.toDataURL('image/png');
	                // document.execCommand("dataUrl");
	                // var newImg=document.createElement("img");
	                // newImg.crossOrigin="anonymous";//关键
	                // newImg.src=dataUrl;
	                var screen = {
	                    width: window.screen.width,
	                    height: window.screen.height };

	                _this2.sendToDashboard({ data: { dataUrl: dataUrl, screen: screen }, message: 'preview' });
	            }).catch(function () {
	                _this2.sendToDashboard({ data: { dataUrl: '' }, message: 'preview' });
	            });
	        }
	    };return PreviewClient;}(ClientPlugin);

	//Register the plugin with vorlon core
	Core.RegisterClientPlugin(new PreviewClient());

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
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.5.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var store = __webpack_require__(34)('wks');
	var uid = __webpack_require__(21);
	var Symbol = __webpack_require__(1).Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(14);
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(16)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(7);
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

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(60);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(55);

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
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(51);
	var defined = __webpack_require__(30);
	module.exports = function (it) {
	  return IObject(defined(it));
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(1);
	var core = __webpack_require__(3);
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(15);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


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
/* 17 */,
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
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


/***/ }),
/* 22 */,
/* 23 */
/***/ (function(module, exports) {

	module.exports = {};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(47);
	var enumBugKeys = __webpack_require__(31);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

	exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(62);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(61);

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

	module.exports = true;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(7).f;
	var has = __webpack_require__(6);
	var TAG = __webpack_require__(4)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(14);
	var dPs = __webpack_require__(74);
	var enumBugKeys = __webpack_require__(31);
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
	  __webpack_require__(54).appendChild(iframe);
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(34)('keys');
	var uid = __webpack_require__(21);
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
	var core = __webpack_require__(3);
	var LIBRARY = __webpack_require__(28);
	var wksExt = __webpack_require__(38);
	var defineProperty = __webpack_require__(7).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(4);


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
	var aFunction = __webpack_require__(50);
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
	var LIBRARY = __webpack_require__(28);
	var $export = __webpack_require__(13);
	var redefine = __webpack_require__(48);
	var hide = __webpack_require__(9);
	var has = __webpack_require__(6);
	var Iterators = __webpack_require__(23);
	var $iterCreate = __webpack_require__(71);
	var setToStringTag = __webpack_require__(29);
	var getPrototypeOf = __webpack_require__(57);
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

	var pIE = __webpack_require__(25);
	var createDesc = __webpack_require__(18);
	var toIObject = __webpack_require__(12);
	var toPrimitive = __webpack_require__(36);
	var has = __webpack_require__(6);
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
	var hiddenKeys = __webpack_require__(31).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	var has = __webpack_require__(6);
	var toIObject = __webpack_require__(12);
	var arrayIndexOf = __webpack_require__(68)(false);
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
	var defined = __webpack_require__(30);
	module.exports = function (it) {
	  return Object(defined(it));
	};


/***/ }),
/* 50 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(39);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(35);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $at = __webpack_require__(76)(true);

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
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	var document = __webpack_require__(1).document;
	module.exports = document && document.documentElement;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(12);
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(6);
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
/* 58 */
/***/ (function(module, exports) {

	

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(78);
	var global = __webpack_require__(1);
	var hide = __webpack_require__(9);
	var Iterators = __webpack_require__(23);
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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(64), __esModule: true };

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(79);
	var $Object = __webpack_require__(3).Object;
	module.exports = function create(P, D) {
	  return $Object.create(P, D);
	};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(80);
	module.exports = __webpack_require__(3).Object.setPrototypeOf;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(81);
	__webpack_require__(58);
	__webpack_require__(82);
	__webpack_require__(83);
	module.exports = __webpack_require__(3).Symbol;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(53);
	__webpack_require__(59);
	module.exports = __webpack_require__(38).f('iterator');


/***/ }),
/* 67 */
/***/ (function(module, exports) {

	module.exports = function () { /* empty */ };


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(12);
	var toLength = __webpack_require__(52);
	var toAbsoluteIndex = __webpack_require__(77);
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(24);
	var gOPS = __webpack_require__(41);
	var pIE = __webpack_require__(25);
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
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(39);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var create = __webpack_require__(32);
	var descriptor = __webpack_require__(18);
	var setToStringTag = __webpack_require__(29);
	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(9)(IteratorPrototype, __webpack_require__(4)('iterator'), function () { return this; });

	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	var META = __webpack_require__(21)('meta');
	var isObject = __webpack_require__(15);
	var has = __webpack_require__(6);
	var setDesc = __webpack_require__(7).f;
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
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(7);
	var anObject = __webpack_require__(14);
	var getKeys = __webpack_require__(24);

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
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(15);
	var anObject = __webpack_require__(14);
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
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(35);
	var defined = __webpack_require__(30);
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
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(35);
	var max = Math.max;
	var min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(67);
	var step = __webpack_require__(72);
	var Iterators = __webpack_require__(23);
	var toIObject = __webpack_require__(12);

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
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(13);
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', { create: __webpack_require__(32) });


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(13);
	$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(75).set });


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global = __webpack_require__(1);
	var has = __webpack_require__(6);
	var DESCRIPTORS = __webpack_require__(8);
	var $export = __webpack_require__(13);
	var redefine = __webpack_require__(48);
	var META = __webpack_require__(73).KEY;
	var $fails = __webpack_require__(16);
	var shared = __webpack_require__(34);
	var setToStringTag = __webpack_require__(29);
	var uid = __webpack_require__(21);
	var wks = __webpack_require__(4);
	var wksExt = __webpack_require__(38);
	var wksDefine = __webpack_require__(37);
	var enumKeys = __webpack_require__(69);
	var isArray = __webpack_require__(70);
	var anObject = __webpack_require__(14);
	var toIObject = __webpack_require__(12);
	var toPrimitive = __webpack_require__(36);
	var createDesc = __webpack_require__(18);
	var _create = __webpack_require__(32);
	var gOPNExt = __webpack_require__(56);
	var $GOPD = __webpack_require__(45);
	var $DP = __webpack_require__(7);
	var $keys = __webpack_require__(24);
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
	  __webpack_require__(25).f = $propertyIsEnumerable;
	  __webpack_require__(41).f = $getOwnPropertySymbols;

	  if (DESCRIPTORS && !__webpack_require__(28)) {
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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(37)('asyncIterator');


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(37)('observable');


/***/ }),
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(39);
	var TAG = __webpack_require__(4)('toStringTag');
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
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators = __webpack_require__(23);
	var ITERATOR = __webpack_require__(4)('iterator');
	var ArrayProto = Array.prototype;

	module.exports = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(14);
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
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	var ITERATOR = __webpack_require__(4)('iterator');
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
/* 125 */,
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

	var classof = __webpack_require__(108);
	var ITERATOR = __webpack_require__(4)('iterator');
	var Iterators = __webpack_require__(23);
	module.exports = __webpack_require__(3).getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};


/***/ }),
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
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

	var ctx = __webpack_require__(40);
	var invoke = __webpack_require__(165);
	var html = __webpack_require__(54);
	var cel = __webpack_require__(42);
	var global = __webpack_require__(1);
	var process = global.process;
	var setTask = global.setImmediate;
	var clearTask = global.clearImmediate;
	var MessageChannel = global.MessageChannel;
	var Dispatch = global.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (__webpack_require__(39)(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
	    defer = function (id) {
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in cel('script')) {
	    defer = function (id) {
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set: setTask,
	  clear: clearTask
	};


/***/ }),
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
/* 165 */
/***/ (function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// 25.4.1.5 NewPromiseCapability(C)
	var aFunction = __webpack_require__(50);

	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject = aFunction(reject);
	}

	module.exports.f = function (C) {
	  return new PromiseCapability(C);
	};


/***/ }),
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
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(14);
	var isObject = __webpack_require__(15);
	var newPromiseCapability = __webpack_require__(166);

	module.exports = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject = __webpack_require__(14);
	var aFunction = __webpack_require__(50);
	var SPECIES = __webpack_require__(4)('species');
	module.exports = function (O, D) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};


/***/ }),
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
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
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
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
/* 258 */,
/* 259 */,
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;/* WEBPACK VAR INJECTION */(function(global) {"use strict";var _create = __webpack_require__(55);var _create2 = _interopRequireDefault(_create);var _promise = __webpack_require__(268);var _promise2 = _interopRequireDefault(_promise);var _typeof2 = __webpack_require__(27);var _typeof3 = _interopRequireDefault(_typeof2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                         html2canvas 0.5.0-beta4 <http://html2canvas.hertzen.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                         Copyright (c) 2016 Niklas von Hertzen
	                                                                                                                                                                                                                                                                                                                                                                                                                                       
	                                                                                                                                                                                                                                                                                                                                                                                                                                         Released under  License
	                                                                                                                                                                                                                                                                                                                                                                                                                                       */

	(function (f) {if (( false ? "undefined" : (0, _typeof3.default)(exports)) === "object" && typeof module !== "undefined") {module.exports = f();} else if (true) {!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));} else {var g;if (typeof window !== "undefined") {g = window;} else if (typeof global !== "undefined") {g = global;} else if (typeof self !== "undefined") {g = self;} else {g = this;}g.html2canvas = f();}})(function () {var define, module, exports;return function e(t, n, r) {function s(o, u) {if (!n[o]) {if (!t[o]) {var a = typeof require == "function" && require;if (!u && a) return require(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;}var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {var n = t[o][1][e];return s(n ? n : e);}, l, l.exports, e, t, n, r);}return n[o].exports;}var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {s(r[o]);}return s;}({ 1: [function (_dereq_, module, exports) {
	            (function (global) {
	                /*! https://mths.be/punycode v1.4.0 by @mathias */
	                ;(function (root) {

	                    /** Detect free variables */
	                    var freeExports = (typeof exports === "undefined" ? "undefined" : (0, _typeof3.default)(exports)) == 'object' && exports &&
	                    !exports.nodeType && exports;
	                    var freeModule = (typeof module === "undefined" ? "undefined" : (0, _typeof3.default)(module)) == 'object' && module &&
	                    !module.nodeType && module;
	                    var freeGlobal = (typeof global === "undefined" ? "undefined" : (0, _typeof3.default)(global)) == 'object' && global;
	                    if (
	                    freeGlobal.global === freeGlobal ||
	                    freeGlobal.window === freeGlobal ||
	                    freeGlobal.self === freeGlobal)
	                    {
	                        root = freeGlobal;
	                    }

	                    /**
	                       * The `punycode` object.
	                       * @name punycode
	                       * @type Object
	                       */
	                    var punycode,

	                    /** Highest positive signed 32-bit float value */
	                    maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	                    /** Bootstring parameters */
	                    base = 36,
	                    tMin = 1,
	                    tMax = 26,
	                    skew = 38,
	                    damp = 700,
	                    initialBias = 72,
	                    initialN = 128, // 0x80
	                    delimiter = '-', // '\x2D'

	                    /** Regular expressions */
	                    regexPunycode = /^xn--/,
	                    regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	                    regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	                    /** Error messages */
	                    errors = {
	                        'overflow': 'Overflow: input needs wider integers to process',
	                        'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	                        'invalid-input': 'Invalid input' },


	                    /** Convenience shortcuts */
	                    baseMinusTMin = base - tMin,
	                    floor = Math.floor,
	                    stringFromCharCode = String.fromCharCode,

	                    /** Temporary variable */
	                    key;

	                    /*--------------------------------------------------------------------------*/

	                    /**
	                                                                                                    * A generic error utility function.
	                                                                                                    * @private
	                                                                                                    * @param {String} type The error type.
	                                                                                                    * @returns {Error} Throws a `RangeError` with the applicable error message.
	                                                                                                    */
	                    function error(type) {
	                        throw new RangeError(errors[type]);
	                    }

	                    /**
	                       * A generic `Array#map` utility function.
	                       * @private
	                       * @param {Array} array The array to iterate over.
	                       * @param {Function} callback The function that gets called for every array
	                       * item.
	                       * @returns {Array} A new array of values returned by the callback function.
	                       */
	                    function map(array, fn) {
	                        var length = array.length;
	                        var result = [];
	                        while (length--) {
	                            result[length] = fn(array[length]);
	                        }
	                        return result;
	                    }

	                    /**
	                       * A simple `Array#map`-like wrapper to work with domain name strings or email
	                       * addresses.
	                       * @private
	                       * @param {String} domain The domain name or email address.
	                       * @param {Function} callback The function that gets called for every
	                       * character.
	                       * @returns {Array} A new string of characters returned by the callback
	                       * function.
	                       */
	                    function mapDomain(string, fn) {
	                        var parts = string.split('@');
	                        var result = '';
	                        if (parts.length > 1) {
	                            // In email addresses, only the domain name should be punycoded. Leave
	                            // the local part (i.e. everything up to `@`) intact.
	                            result = parts[0] + '@';
	                            string = parts[1];
	                        }
	                        // Avoid `split(regex)` for IE8 compatibility. See #17.
	                        string = string.replace(regexSeparators, '\x2E');
	                        var labels = string.split('.');
	                        var encoded = map(labels, fn).join('.');
	                        return result + encoded;
	                    }

	                    /**
	                       * Creates an array containing the numeric code points of each Unicode
	                       * character in the string. While JavaScript uses UCS-2 internally,
	                       * this function will convert a pair of surrogate halves (each of which
	                       * UCS-2 exposes as separate characters) into a single code point,
	                       * matching UTF-16.
	                       * @see `punycode.ucs2.encode`
	                       * @see <https://mathiasbynens.be/notes/javascript-encoding>
	                       * @memberOf punycode.ucs2
	                       * @name decode
	                       * @param {String} string The Unicode input string (UCS-2).
	                       * @returns {Array} The new array of code points.
	                       */
	                    function ucs2decode(string) {
	                        var output = [],
	                        counter = 0,
	                        length = string.length,
	                        value,
	                        extra;
	                        while (counter < length) {
	                            value = string.charCodeAt(counter++);
	                            if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
	                                // high surrogate, and there is a next character
	                                extra = string.charCodeAt(counter++);
	                                if ((extra & 0xFC00) == 0xDC00) {// low surrogate
	                                    output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
	                                } else {
	                                    // unmatched surrogate; only append this code unit, in case the next
	                                    // code unit is the high surrogate of a surrogate pair
	                                    output.push(value);
	                                    counter--;
	                                }
	                            } else {
	                                output.push(value);
	                            }
	                        }
	                        return output;
	                    }

	                    /**
	                       * Creates a string based on an array of numeric code points.
	                       * @see `punycode.ucs2.decode`
	                       * @memberOf punycode.ucs2
	                       * @name encode
	                       * @param {Array} codePoints The array of numeric code points.
	                       * @returns {String} The new Unicode string (UCS-2).
	                       */
	                    function ucs2encode(array) {
	                        return map(array, function (value) {
	                            var output = '';
	                            if (value > 0xFFFF) {
	                                value -= 0x10000;
	                                output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
	                                value = 0xDC00 | value & 0x3FF;
	                            }
	                            output += stringFromCharCode(value);
	                            return output;
	                        }).join('');
	                    }

	                    /**
	                       * Converts a basic code point into a digit/integer.
	                       * @see `digitToBasic()`
	                       * @private
	                       * @param {Number} codePoint The basic numeric code point value.
	                       * @returns {Number} The numeric value of a basic code point (for use in
	                       * representing integers) in the range `0` to `base - 1`, or `base` if
	                       * the code point does not represent a value.
	                       */
	                    function basicToDigit(codePoint) {
	                        if (codePoint - 48 < 10) {
	                            return codePoint - 22;
	                        }
	                        if (codePoint - 65 < 26) {
	                            return codePoint - 65;
	                        }
	                        if (codePoint - 97 < 26) {
	                            return codePoint - 97;
	                        }
	                        return base;
	                    }

	                    /**
	                       * Converts a digit/integer into a basic code point.
	                       * @see `basicToDigit()`
	                       * @private
	                       * @param {Number} digit The numeric value of a basic code point.
	                       * @returns {Number} The basic code point whose value (when used for
	                       * representing integers) is `digit`, which needs to be in the range
	                       * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	                       * used; else, the lowercase form is used. The behavior is undefined
	                       * if `flag` is non-zero and `digit` has no uppercase form.
	                       */
	                    function digitToBasic(digit, flag) {
	                        //  0..25 map to ASCII a..z or A..Z
	                        // 26..35 map to ASCII 0..9
	                        return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	                    }

	                    /**
	                       * Bias adaptation function as per section 3.4 of RFC 3492.
	                       * https://tools.ietf.org/html/rfc3492#section-3.4
	                       * @private
	                       */
	                    function adapt(delta, numPoints, firstTime) {
	                        var k = 0;
	                        delta = firstTime ? floor(delta / damp) : delta >> 1;
	                        delta += floor(delta / numPoints);
	                        for (; /* no initialization */delta > baseMinusTMin * tMax >> 1; k += base) {
	                            delta = floor(delta / baseMinusTMin);
	                        }
	                        return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	                    }

	                    /**
	                       * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	                       * symbols.
	                       * @memberOf punycode
	                       * @param {String} input The Punycode string of ASCII-only symbols.
	                       * @returns {String} The resulting string of Unicode symbols.
	                       */
	                    function decode(input) {
	                        // Don't use UCS-2
	                        var output = [],
	                        inputLength = input.length,
	                        out,
	                        i = 0,
	                        n = initialN,
	                        bias = initialBias,
	                        basic,
	                        j,
	                        index,
	                        oldi,
	                        w,
	                        k,
	                        digit,
	                        t,
	                        /** Cached calculation results */
	                        baseMinusT;

	                        // Handle the basic code points: let `basic` be the number of input code
	                        // points before the last delimiter, or `0` if there is none, then copy
	                        // the first basic code points to the output.

	                        basic = input.lastIndexOf(delimiter);
	                        if (basic < 0) {
	                            basic = 0;
	                        }

	                        for (j = 0; j < basic; ++j) {
	                            // if it's not a basic code point
	                            if (input.charCodeAt(j) >= 0x80) {
	                                error('not-basic');
	                            }
	                            output.push(input.charCodeAt(j));
	                        }

	                        // Main decoding loop: start just after the last delimiter if any basic code
	                        // points were copied; start at the beginning otherwise.

	                        for (index = basic > 0 ? basic + 1 : 0; index < inputLength;) /* no final expression */{

	                            // `index` is the index of the next character to be consumed.
	                            // Decode a generalized variable-length integer into `delta`,
	                            // which gets added to `i`. The overflow checking is easier
	                            // if we increase `i` as we go, then subtract off its starting
	                            // value at the end to obtain `delta`.
	                            for (oldi = i, w = 1, k = base;; /* no condition */k += base) {

	                                if (index >= inputLength) {
	                                    error('invalid-input');
	                                }

	                                digit = basicToDigit(input.charCodeAt(index++));

	                                if (digit >= base || digit > floor((maxInt - i) / w)) {
	                                    error('overflow');
	                                }

	                                i += digit * w;
	                                t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

	                                if (digit < t) {
	                                    break;
	                                }

	                                baseMinusT = base - t;
	                                if (w > floor(maxInt / baseMinusT)) {
	                                    error('overflow');
	                                }

	                                w *= baseMinusT;

	                            }

	                            out = output.length + 1;
	                            bias = adapt(i - oldi, out, oldi == 0);

	                            // `i` was supposed to wrap around from `out` to `0`,
	                            // incrementing `n` each time, so we'll fix that now:
	                            if (floor(i / out) > maxInt - n) {
	                                error('overflow');
	                            }

	                            n += floor(i / out);
	                            i %= out;

	                            // Insert `n` at position `i` of the output
	                            output.splice(i++, 0, n);

	                        }

	                        return ucs2encode(output);
	                    }

	                    /**
	                       * Converts a string of Unicode symbols (e.g. a domain name label) to a
	                       * Punycode string of ASCII-only symbols.
	                       * @memberOf punycode
	                       * @param {String} input The string of Unicode symbols.
	                       * @returns {String} The resulting Punycode string of ASCII-only symbols.
	                       */
	                    function encode(input) {
	                        var n,
	                        delta,
	                        handledCPCount,
	                        basicLength,
	                        bias,
	                        j,
	                        m,
	                        q,
	                        k,
	                        t,
	                        currentValue,
	                        output = [],
	                        /** `inputLength` will hold the number of code points in `input`. */
	                        inputLength,
	                        /** Cached calculation results */
	                        handledCPCountPlusOne,
	                        baseMinusT,
	                        qMinusT;

	                        // Convert the input in UCS-2 to Unicode
	                        input = ucs2decode(input);

	                        // Cache the length
	                        inputLength = input.length;

	                        // Initialize the state
	                        n = initialN;
	                        delta = 0;
	                        bias = initialBias;

	                        // Handle the basic code points
	                        for (j = 0; j < inputLength; ++j) {
	                            currentValue = input[j];
	                            if (currentValue < 0x80) {
	                                output.push(stringFromCharCode(currentValue));
	                            }
	                        }

	                        handledCPCount = basicLength = output.length;

	                        // `handledCPCount` is the number of code points that have been handled;
	                        // `basicLength` is the number of basic code points.

	                        // Finish the basic string - if it is not empty - with a delimiter
	                        if (basicLength) {
	                            output.push(delimiter);
	                        }

	                        // Main encoding loop:
	                        while (handledCPCount < inputLength) {

	                            // All non-basic code points < n have been handled already. Find the next
	                            // larger one:
	                            for (m = maxInt, j = 0; j < inputLength; ++j) {
	                                currentValue = input[j];
	                                if (currentValue >= n && currentValue < m) {
	                                    m = currentValue;
	                                }
	                            }

	                            // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
	                            // but guard against overflow
	                            handledCPCountPlusOne = handledCPCount + 1;
	                            if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
	                                error('overflow');
	                            }

	                            delta += (m - n) * handledCPCountPlusOne;
	                            n = m;

	                            for (j = 0; j < inputLength; ++j) {
	                                currentValue = input[j];

	                                if (currentValue < n && ++delta > maxInt) {
	                                    error('overflow');
	                                }

	                                if (currentValue == n) {
	                                    // Represent delta as a generalized variable-length integer
	                                    for (q = delta, k = base;; /* no condition */k += base) {
	                                        t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
	                                        if (q < t) {
	                                            break;
	                                        }
	                                        qMinusT = q - t;
	                                        baseMinusT = base - t;
	                                        output.push(
	                                        stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));

	                                        q = floor(qMinusT / baseMinusT);
	                                    }

	                                    output.push(stringFromCharCode(digitToBasic(q, 0)));
	                                    bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
	                                    delta = 0;
	                                    ++handledCPCount;
	                                }
	                            }

	                            ++delta;
	                            ++n;

	                        }
	                        return output.join('');
	                    }

	                    /**
	                       * Converts a Punycode string representing a domain name or an email address
	                       * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	                       * it doesn't matter if you call it on a string that has already been
	                       * converted to Unicode.
	                       * @memberOf punycode
	                       * @param {String} input The Punycoded domain name or email address to
	                       * convert to Unicode.
	                       * @returns {String} The Unicode representation of the given Punycode
	                       * string.
	                       */
	                    function toUnicode(input) {
	                        return mapDomain(input, function (string) {
	                            return regexPunycode.test(string) ?
	                            decode(string.slice(4).toLowerCase()) :
	                            string;
	                        });
	                    }

	                    /**
	                       * Converts a Unicode string representing a domain name or an email address to
	                       * Punycode. Only the non-ASCII parts of the domain name will be converted,
	                       * i.e. it doesn't matter if you call it with a domain that's already in
	                       * ASCII.
	                       * @memberOf punycode
	                       * @param {String} input The domain name or email address to convert, as a
	                       * Unicode string.
	                       * @returns {String} The Punycode representation of the given domain name or
	                       * email address.
	                       */
	                    function toASCII(input) {
	                        return mapDomain(input, function (string) {
	                            return regexNonASCII.test(string) ?
	                            'xn--' + encode(string) :
	                            string;
	                        });
	                    }

	                    /*--------------------------------------------------------------------------*/

	                    /** Define the public API */
	                    punycode = {
	                        /**
	                                  * A string representing the current Punycode.js version number.
	                                  * @memberOf punycode
	                                  * @type String
	                                  */
	                        'version': '1.3.2',
	                        /**
	                                             * An object of methods to convert from JavaScript's internal character
	                                             * representation (UCS-2) to Unicode code points, and back.
	                                             * @see <https://mathiasbynens.be/notes/javascript-encoding>
	                                             * @memberOf punycode
	                                             * @type Object
	                                             */
	                        'ucs2': {
	                            'decode': ucs2decode,
	                            'encode': ucs2encode },

	                        'decode': decode,
	                        'encode': encode,
	                        'toASCII': toASCII,
	                        'toUnicode': toUnicode };


	                    /** Expose `punycode` */
	                    // Some AMD build optimizers, like r.js, check for specific condition patterns
	                    // like the following:
	                    if (
	                    typeof define == 'function' &&
	                    (0, _typeof3.default)(define.amd) == 'object' &&
	                    define.amd)
	                    {
	                        define('punycode', function () {
	                            return punycode;
	                        });
	                    } else if (freeExports && freeModule) {
	                        if (module.exports == freeExports) {
	                            // in Node.js, io.js, or RingoJS v0.8.0+
	                            freeModule.exports = punycode;
	                        } else {
	                            // in Narwhal or RingoJS v0.7.0-
	                            for (key in punycode) {
	                                punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
	                            }
	                        }
	                    } else {
	                        // in Rhino or a web browser
	                        root.punycode = punycode;
	                    }

	                })(this);

	            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	        }, {}], 2: [function (_dereq_, module, exports) {
	            var log = _dereq_('./log');

	            function restoreOwnerScroll(ownerDocument, x, y) {
	                if (ownerDocument.defaultView && (x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
	                    ownerDocument.defaultView.scrollTo(x, y);
	                }
	            }

	            function cloneCanvasContents(canvas, clonedCanvas) {
	                try {
	                    if (clonedCanvas) {
	                        clonedCanvas.width = canvas.width;
	                        clonedCanvas.height = canvas.height;
	                        clonedCanvas.getContext("2d").putImageData(canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height), 0, 0);
	                    }
	                } catch (e) {
	                    log("Unable to copy canvas content from", canvas, e);
	                }
	            }

	            function cloneNode(node, javascriptEnabled) {
	                var clone = node.nodeType === 3 ? document.createTextNode(node.nodeValue) : node.cloneNode(false);

	                var child = node.firstChild;
	                while (child) {
	                    if (javascriptEnabled === true || child.nodeType !== 1 || child.nodeName !== 'SCRIPT') {
	                        clone.appendChild(cloneNode(child, javascriptEnabled));
	                    }
	                    child = child.nextSibling;
	                }

	                if (node.nodeType === 1) {
	                    clone._scrollTop = node.scrollTop;
	                    clone._scrollLeft = node.scrollLeft;
	                    if (node.nodeName === "CANVAS") {
	                        cloneCanvasContents(node, clone);
	                    } else if (node.nodeName === "TEXTAREA" || node.nodeName === "SELECT") {
	                        clone.value = node.value;
	                    }
	                }

	                return clone;
	            }

	            function initNode(node) {
	                if (node.nodeType === 1) {
	                    node.scrollTop = node._scrollTop;
	                    node.scrollLeft = node._scrollLeft;

	                    var child = node.firstChild;
	                    while (child) {
	                        initNode(child);
	                        child = child.nextSibling;
	                    }
	                }
	            }

	            module.exports = function (ownerDocument, containerDocument, width, height, options, x, y) {
	                var documentElement = cloneNode(ownerDocument.documentElement, options.javascriptEnabled);
	                var container = containerDocument.createElement("iframe");

	                container.className = "html2canvas-container";
	                container.style.visibility = "hidden";
	                container.style.position = "fixed";
	                container.style.left = "-10000px";
	                container.style.top = "0px";
	                container.style.border = "0";
	                container.width = width;
	                container.height = height;
	                container.scrolling = "no"; // ios won't scroll without it
	                containerDocument.body.appendChild(container);

	                return new _promise2.default(function (resolve) {
	                    var documentClone = container.contentWindow.document;

	                    /* Chrome doesn't detect relative background-images assigned in inline <style> sheets when fetched through getComputedStyle
	                                                                           if window url is about:blank, we can assign the url to current by writing onto the document
	                                                                           */
	                    container.contentWindow.onload = container.onload = function () {
	                        var interval = setInterval(function () {
	                            if (documentClone.body.childNodes.length > 0) {
	                                initNode(documentClone.documentElement);
	                                clearInterval(interval);
	                                if (options.type === "view") {
	                                    container.contentWindow.scrollTo(x, y);
	                                    if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent) && (container.contentWindow.scrollY !== y || container.contentWindow.scrollX !== x)) {
	                                        documentClone.documentElement.style.top = -y + "px";
	                                        documentClone.documentElement.style.left = -x + "px";
	                                        documentClone.documentElement.style.position = 'absolute';
	                                    }
	                                }
	                                resolve(container);
	                            }
	                        }, 50);
	                    };

	                    documentClone.open();
	                    documentClone.write("<!DOCTYPE html><html></html>");
	                    // Chrome scrolls the parent document for some reason after the write to the cloned window???
	                    restoreOwnerScroll(ownerDocument, x, y);
	                    documentClone.replaceChild(documentClone.adoptNode(documentElement), documentClone.documentElement);
	                    documentClone.close();
	                });
	            };

	        }, { "./log": 13 }], 3: [function (_dereq_, module, exports) {
	            // http://dev.w3.org/csswg/css-color/

	            function Color(value) {
	                this.r = 0;
	                this.g = 0;
	                this.b = 0;
	                this.a = null;
	                var result = this.fromArray(value) ||
	                this.namedColor(value) ||
	                this.rgb(value) ||
	                this.rgba(value) ||
	                this.hex6(value) ||
	                this.hex3(value);
	            }

	            Color.prototype.darken = function (amount) {
	                var a = 1 - amount;
	                return new Color([
	                Math.round(this.r * a),
	                Math.round(this.g * a),
	                Math.round(this.b * a),
	                this.a]);

	            };

	            Color.prototype.isTransparent = function () {
	                return this.a === 0;
	            };

	            Color.prototype.isBlack = function () {
	                return this.r === 0 && this.g === 0 && this.b === 0;
	            };

	            Color.prototype.fromArray = function (array) {
	                if (Array.isArray(array)) {
	                    this.r = Math.min(array[0], 255);
	                    this.g = Math.min(array[1], 255);
	                    this.b = Math.min(array[2], 255);
	                    if (array.length > 3) {
	                        this.a = array[3];
	                    }
	                }

	                return Array.isArray(array);
	            };

	            var _hex3 = /^#([a-f0-9]{3})$/i;

	            Color.prototype.hex3 = function (value) {
	                var match = null;
	                if ((match = value.match(_hex3)) !== null) {
	                    this.r = parseInt(match[1][0] + match[1][0], 16);
	                    this.g = parseInt(match[1][1] + match[1][1], 16);
	                    this.b = parseInt(match[1][2] + match[1][2], 16);
	                }
	                return match !== null;
	            };

	            var _hex6 = /^#([a-f0-9]{6})$/i;

	            Color.prototype.hex6 = function (value) {
	                var match = null;
	                if ((match = value.match(_hex6)) !== null) {
	                    this.r = parseInt(match[1].substring(0, 2), 16);
	                    this.g = parseInt(match[1].substring(2, 4), 16);
	                    this.b = parseInt(match[1].substring(4, 6), 16);
	                }
	                return match !== null;
	            };


	            var _rgb = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;

	            Color.prototype.rgb = function (value) {
	                var match = null;
	                if ((match = value.match(_rgb)) !== null) {
	                    this.r = Number(match[1]);
	                    this.g = Number(match[2]);
	                    this.b = Number(match[3]);
	                }
	                return match !== null;
	            };

	            var _rgba = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/;

	            Color.prototype.rgba = function (value) {
	                var match = null;
	                if ((match = value.match(_rgba)) !== null) {
	                    this.r = Number(match[1]);
	                    this.g = Number(match[2]);
	                    this.b = Number(match[3]);
	                    this.a = Number(match[4]);
	                }
	                return match !== null;
	            };

	            Color.prototype.toString = function () {
	                return this.a !== null && this.a !== 1 ?
	                "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" :
	                "rgb(" + [this.r, this.g, this.b].join(",") + ")";
	            };

	            Color.prototype.namedColor = function (value) {
	                value = value.toLowerCase();
	                var color = colors[value];
	                if (color) {
	                    this.r = color[0];
	                    this.g = color[1];
	                    this.b = color[2];
	                } else if (value === "transparent") {
	                    this.r = this.g = this.b = this.a = 0;
	                    return true;
	                }

	                return !!color;
	            };

	            Color.prototype.isColor = true;

	            // JSON.stringify([].slice.call($$('.named-color-table tr'), 1).map(function(row) { return [row.childNodes[3].textContent, row.childNodes[5].textContent.trim().split(",").map(Number)] }).reduce(function(data, row) {data[row[0]] = row[1]; return data}, {}))
	            var colors = {
	                "aliceblue": [240, 248, 255],
	                "antiquewhite": [250, 235, 215],
	                "aqua": [0, 255, 255],
	                "aquamarine": [127, 255, 212],
	                "azure": [240, 255, 255],
	                "beige": [245, 245, 220],
	                "bisque": [255, 228, 196],
	                "black": [0, 0, 0],
	                "blanchedalmond": [255, 235, 205],
	                "blue": [0, 0, 255],
	                "blueviolet": [138, 43, 226],
	                "brown": [165, 42, 42],
	                "burlywood": [222, 184, 135],
	                "cadetblue": [95, 158, 160],
	                "chartreuse": [127, 255, 0],
	                "chocolate": [210, 105, 30],
	                "coral": [255, 127, 80],
	                "cornflowerblue": [100, 149, 237],
	                "cornsilk": [255, 248, 220],
	                "crimson": [220, 20, 60],
	                "cyan": [0, 255, 255],
	                "darkblue": [0, 0, 139],
	                "darkcyan": [0, 139, 139],
	                "darkgoldenrod": [184, 134, 11],
	                "darkgray": [169, 169, 169],
	                "darkgreen": [0, 100, 0],
	                "darkgrey": [169, 169, 169],
	                "darkkhaki": [189, 183, 107],
	                "darkmagenta": [139, 0, 139],
	                "darkolivegreen": [85, 107, 47],
	                "darkorange": [255, 140, 0],
	                "darkorchid": [153, 50, 204],
	                "darkred": [139, 0, 0],
	                "darksalmon": [233, 150, 122],
	                "darkseagreen": [143, 188, 143],
	                "darkslateblue": [72, 61, 139],
	                "darkslategray": [47, 79, 79],
	                "darkslategrey": [47, 79, 79],
	                "darkturquoise": [0, 206, 209],
	                "darkviolet": [148, 0, 211],
	                "deeppink": [255, 20, 147],
	                "deepskyblue": [0, 191, 255],
	                "dimgray": [105, 105, 105],
	                "dimgrey": [105, 105, 105],
	                "dodgerblue": [30, 144, 255],
	                "firebrick": [178, 34, 34],
	                "floralwhite": [255, 250, 240],
	                "forestgreen": [34, 139, 34],
	                "fuchsia": [255, 0, 255],
	                "gainsboro": [220, 220, 220],
	                "ghostwhite": [248, 248, 255],
	                "gold": [255, 215, 0],
	                "goldenrod": [218, 165, 32],
	                "gray": [128, 128, 128],
	                "green": [0, 128, 0],
	                "greenyellow": [173, 255, 47],
	                "grey": [128, 128, 128],
	                "honeydew": [240, 255, 240],
	                "hotpink": [255, 105, 180],
	                "indianred": [205, 92, 92],
	                "indigo": [75, 0, 130],
	                "ivory": [255, 255, 240],
	                "khaki": [240, 230, 140],
	                "lavender": [230, 230, 250],
	                "lavenderblush": [255, 240, 245],
	                "lawngreen": [124, 252, 0],
	                "lemonchiffon": [255, 250, 205],
	                "lightblue": [173, 216, 230],
	                "lightcoral": [240, 128, 128],
	                "lightcyan": [224, 255, 255],
	                "lightgoldenrodyellow": [250, 250, 210],
	                "lightgray": [211, 211, 211],
	                "lightgreen": [144, 238, 144],
	                "lightgrey": [211, 211, 211],
	                "lightpink": [255, 182, 193],
	                "lightsalmon": [255, 160, 122],
	                "lightseagreen": [32, 178, 170],
	                "lightskyblue": [135, 206, 250],
	                "lightslategray": [119, 136, 153],
	                "lightslategrey": [119, 136, 153],
	                "lightsteelblue": [176, 196, 222],
	                "lightyellow": [255, 255, 224],
	                "lime": [0, 255, 0],
	                "limegreen": [50, 205, 50],
	                "linen": [250, 240, 230],
	                "magenta": [255, 0, 255],
	                "maroon": [128, 0, 0],
	                "mediumaquamarine": [102, 205, 170],
	                "mediumblue": [0, 0, 205],
	                "mediumorchid": [186, 85, 211],
	                "mediumpurple": [147, 112, 219],
	                "mediumseagreen": [60, 179, 113],
	                "mediumslateblue": [123, 104, 238],
	                "mediumspringgreen": [0, 250, 154],
	                "mediumturquoise": [72, 209, 204],
	                "mediumvioletred": [199, 21, 133],
	                "midnightblue": [25, 25, 112],
	                "mintcream": [245, 255, 250],
	                "mistyrose": [255, 228, 225],
	                "moccasin": [255, 228, 181],
	                "navajowhite": [255, 222, 173],
	                "navy": [0, 0, 128],
	                "oldlace": [253, 245, 230],
	                "olive": [128, 128, 0],
	                "olivedrab": [107, 142, 35],
	                "orange": [255, 165, 0],
	                "orangered": [255, 69, 0],
	                "orchid": [218, 112, 214],
	                "palegoldenrod": [238, 232, 170],
	                "palegreen": [152, 251, 152],
	                "paleturquoise": [175, 238, 238],
	                "palevioletred": [219, 112, 147],
	                "papayawhip": [255, 239, 213],
	                "peachpuff": [255, 218, 185],
	                "peru": [205, 133, 63],
	                "pink": [255, 192, 203],
	                "plum": [221, 160, 221],
	                "powderblue": [176, 224, 230],
	                "purple": [128, 0, 128],
	                "rebeccapurple": [102, 51, 153],
	                "red": [255, 0, 0],
	                "rosybrown": [188, 143, 143],
	                "royalblue": [65, 105, 225],
	                "saddlebrown": [139, 69, 19],
	                "salmon": [250, 128, 114],
	                "sandybrown": [244, 164, 96],
	                "seagreen": [46, 139, 87],
	                "seashell": [255, 245, 238],
	                "sienna": [160, 82, 45],
	                "silver": [192, 192, 192],
	                "skyblue": [135, 206, 235],
	                "slateblue": [106, 90, 205],
	                "slategray": [112, 128, 144],
	                "slategrey": [112, 128, 144],
	                "snow": [255, 250, 250],
	                "springgreen": [0, 255, 127],
	                "steelblue": [70, 130, 180],
	                "tan": [210, 180, 140],
	                "teal": [0, 128, 128],
	                "thistle": [216, 191, 216],
	                "tomato": [255, 99, 71],
	                "turquoise": [64, 224, 208],
	                "violet": [238, 130, 238],
	                "wheat": [245, 222, 179],
	                "white": [255, 255, 255],
	                "whitesmoke": [245, 245, 245],
	                "yellow": [255, 255, 0],
	                "yellowgreen": [154, 205, 50] };


	            module.exports = Color;

	        }, {}], 4: [function (_dereq_, module, exports) {
	            var Support = _dereq_('./support');
	            var CanvasRenderer = _dereq_('./renderers/canvas');
	            var ImageLoader = _dereq_('./imageloader');
	            var NodeParser = _dereq_('./nodeparser');
	            var NodeContainer = _dereq_('./nodecontainer');
	            var log = _dereq_('./log');
	            var utils = _dereq_('./utils');
	            var createWindowClone = _dereq_('./clone');
	            var loadUrlDocument = _dereq_('./proxy').loadUrlDocument;
	            var getBounds = utils.getBounds;

	            var html2canvasNodeAttribute = "data-html2canvas-node";
	            var html2canvasCloneIndex = 0;

	            function html2canvas(nodeList, options) {
	                var index = html2canvasCloneIndex++;
	                options = options || {};
	                if (options.logging) {
	                    log.options.logging = true;
	                    log.options.start = Date.now();
	                }

	                options.async = typeof options.async === "undefined" ? true : options.async;
	                options.allowTaint = typeof options.allowTaint === "undefined" ? false : options.allowTaint;
	                options.removeContainer = typeof options.removeContainer === "undefined" ? true : options.removeContainer;
	                options.javascriptEnabled = typeof options.javascriptEnabled === "undefined" ? false : options.javascriptEnabled;
	                options.imageTimeout = typeof options.imageTimeout === "undefined" ? 10000 : options.imageTimeout;
	                options.renderer = typeof options.renderer === "function" ? options.renderer : CanvasRenderer;
	                options.strict = !!options.strict;

	                if (typeof nodeList === "string") {
	                    if (typeof options.proxy !== "string") {
	                        return _promise2.default.reject("Proxy must be used when rendering url");
	                    }
	                    var width = options.width != null ? options.width : window.innerWidth;
	                    var height = options.height != null ? options.height : window.innerHeight;
	                    return loadUrlDocument(absoluteUrl(nodeList), options.proxy, document, width, height, options).then(function (container) {
	                        return renderWindow(container.contentWindow.document.documentElement, container, options, width, height);
	                    });
	                }

	                var node = (nodeList === undefined ? [document.documentElement] : nodeList.length ? nodeList : [nodeList])[0];
	                node.setAttribute(html2canvasNodeAttribute + index, index);
	                return renderDocument(node.ownerDocument, options, node.ownerDocument.defaultView.innerWidth, node.ownerDocument.defaultView.innerHeight, index).then(function (canvas) {
	                    if (typeof options.onrendered === "function") {
	                        log("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas");
	                        options.onrendered(canvas);
	                    }
	                    return canvas;
	                });
	            }

	            html2canvas.CanvasRenderer = CanvasRenderer;
	            html2canvas.NodeContainer = NodeContainer;
	            html2canvas.log = log;
	            html2canvas.utils = utils;

	            var html2canvasExport = typeof document === "undefined" || typeof _create2.default !== "function" || typeof document.createElement("canvas").getContext !== "function" ? function () {
	                return _promise2.default.reject("No canvas support");
	            } : html2canvas;

	            module.exports = html2canvasExport;

	            if (typeof define === 'function' && define.amd) {
	                define('html2canvas', [], function () {
	                    return html2canvasExport;
	                });
	            }

	            function renderDocument(document, options, windowWidth, windowHeight, html2canvasIndex) {
	                return createWindowClone(document, document, windowWidth, windowHeight, options, document.defaultView.pageXOffset, document.defaultView.pageYOffset).then(function (container) {
	                    log("Document cloned");
	                    var attributeName = html2canvasNodeAttribute + html2canvasIndex;
	                    var selector = "[" + attributeName + "='" + html2canvasIndex + "']";
	                    document.querySelector(selector).removeAttribute(attributeName);
	                    var clonedWindow = container.contentWindow;
	                    var node = clonedWindow.document.querySelector(selector);
	                    var oncloneHandler = typeof options.onclone === "function" ? _promise2.default.resolve(options.onclone(clonedWindow.document)) : _promise2.default.resolve(true);
	                    return oncloneHandler.then(function () {
	                        return renderWindow(node, container, options, windowWidth, windowHeight);
	                    });
	                });
	            }

	            function renderWindow(node, container, options, windowWidth, windowHeight) {
	                var clonedWindow = container.contentWindow;
	                var support = new Support(clonedWindow.document);
	                var imageLoader = new ImageLoader(options, support);
	                var bounds = getBounds(node);
	                var width = options.type === "view" ? windowWidth : documentWidth(clonedWindow.document);
	                var height = options.type === "view" ? windowHeight : documentHeight(clonedWindow.document);
	                var renderer = new options.renderer(width, height, imageLoader, options, document);
	                var parser = new NodeParser(node, renderer, support, imageLoader, options);
	                return parser.ready.then(function () {
	                    log("Finished rendering");
	                    var canvas;

	                    if (options.type === "view") {
	                        canvas = crop(renderer.canvas, { width: renderer.canvas.width, height: renderer.canvas.height, top: 0, left: 0, x: 0, y: 0 });
	                    } else if (node === clonedWindow.document.body || node === clonedWindow.document.documentElement || options.canvas != null) {
	                        canvas = renderer.canvas;
	                    } else {
	                        canvas = crop(renderer.canvas, { width: options.width != null ? options.width : bounds.width, height: options.height != null ? options.height : bounds.height, top: bounds.top, left: bounds.left, x: 0, y: 0 });
	                    }

	                    cleanupContainer(container, options);
	                    return canvas;
	                });
	            }

	            function cleanupContainer(container, options) {
	                if (options.removeContainer) {
	                    container.parentNode.removeChild(container);
	                    log("Cleaned up container");
	                }
	            }

	            function crop(canvas, bounds) {
	                var croppedCanvas = document.createElement("canvas");
	                var x1 = Math.min(canvas.width - 1, Math.max(0, bounds.left));
	                var x2 = Math.min(canvas.width, Math.max(1, bounds.left + bounds.width));
	                var y1 = Math.min(canvas.height - 1, Math.max(0, bounds.top));
	                var y2 = Math.min(canvas.height, Math.max(1, bounds.top + bounds.height));
	                croppedCanvas.width = bounds.width;
	                croppedCanvas.height = bounds.height;
	                var width = x2 - x1;
	                var height = y2 - y1;
	                log("Cropping canvas at:", "left:", bounds.left, "top:", bounds.top, "width:", width, "height:", height);
	                log("Resulting crop with width", bounds.width, "and height", bounds.height, "with x", x1, "and y", y1);
	                croppedCanvas.getContext("2d").drawImage(canvas, x1, y1, width, height, bounds.x, bounds.y, width, height);
	                return croppedCanvas;
	            }

	            function documentWidth(doc) {
	                return Math.max(
	                Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth),
	                Math.max(doc.body.offsetWidth, doc.documentElement.offsetWidth),
	                Math.max(doc.body.clientWidth, doc.documentElement.clientWidth));

	            }

	            function documentHeight(doc) {
	                return Math.max(
	                Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
	                Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
	                Math.max(doc.body.clientHeight, doc.documentElement.clientHeight));

	            }

	            function absoluteUrl(url) {
	                var link = document.createElement("a");
	                link.href = url;
	                link.href = link.href;
	                return link;
	            }

	        }, { "./clone": 2, "./imageloader": 11, "./log": 13, "./nodecontainer": 14, "./nodeparser": 15, "./proxy": 16, "./renderers/canvas": 20, "./support": 22, "./utils": 26 }], 5: [function (_dereq_, module, exports) {
	            var log = _dereq_('./log');
	            var smallImage = _dereq_('./utils').smallImage;

	            function DummyImageContainer(src) {
	                this.src = src;
	                log("DummyImageContainer for", src);
	                if (!this.promise || !this.image) {
	                    log("Initiating DummyImageContainer");
	                    DummyImageContainer.prototype.image = new Image();
	                    var image = this.image;
	                    DummyImageContainer.prototype.promise = new _promise2.default(function (resolve, reject) {
	                        image.onload = resolve;
	                        image.onerror = reject;
	                        image.src = smallImage();
	                        if (image.complete === true) {
	                            resolve(image);
	                        }
	                    });
	                }
	            }

	            module.exports = DummyImageContainer;

	        }, { "./log": 13, "./utils": 26 }], 6: [function (_dereq_, module, exports) {
	            var smallImage = _dereq_('./utils').smallImage;

	            function Font(family, size) {
	                var container = document.createElement('div'),
	                img = document.createElement('img'),
	                span = document.createElement('span'),
	                sampleText = 'Hidden Text',
	                baseline,
	                middle;

	                container.style.visibility = "hidden";
	                container.style.fontFamily = family;
	                container.style.fontSize = size;
	                container.style.margin = 0;
	                container.style.padding = 0;

	                document.body.appendChild(container);

	                img.src = smallImage();
	                img.width = 1;
	                img.height = 1;

	                img.style.margin = 0;
	                img.style.padding = 0;
	                img.style.verticalAlign = "baseline";

	                span.style.fontFamily = family;
	                span.style.fontSize = size;
	                span.style.margin = 0;
	                span.style.padding = 0;

	                span.appendChild(document.createTextNode(sampleText));
	                container.appendChild(span);
	                container.appendChild(img);
	                baseline = img.offsetTop - span.offsetTop + 1;

	                container.removeChild(span);
	                container.appendChild(document.createTextNode(sampleText));

	                container.style.lineHeight = "normal";
	                img.style.verticalAlign = "super";

	                middle = img.offsetTop - container.offsetTop + 1;

	                document.body.removeChild(container);

	                this.baseline = baseline;
	                this.lineWidth = 1;
	                this.middle = middle;
	            }

	            module.exports = Font;

	        }, { "./utils": 26 }], 7: [function (_dereq_, module, exports) {
	            var Font = _dereq_('./font');

	            function FontMetrics() {
	                this.data = {};
	            }

	            FontMetrics.prototype.getMetrics = function (family, size) {
	                if (this.data[family + "-" + size] === undefined) {
	                    this.data[family + "-" + size] = new Font(family, size);
	                }
	                return this.data[family + "-" + size];
	            };

	            module.exports = FontMetrics;

	        }, { "./font": 6 }], 8: [function (_dereq_, module, exports) {
	            var utils = _dereq_('./utils');
	            var getBounds = utils.getBounds;
	            var loadUrlDocument = _dereq_('./proxy').loadUrlDocument;

	            function FrameContainer(container, sameOrigin, options) {
	                this.image = null;
	                this.src = container;
	                var self = this;
	                var bounds = getBounds(container);
	                this.promise = (!sameOrigin ? this.proxyLoad(options.proxy, bounds, options) : new _promise2.default(function (resolve) {
	                    if (container.contentWindow.document.URL === "about:blank" || container.contentWindow.document.documentElement == null) {
	                        container.contentWindow.onload = container.onload = function () {
	                            resolve(container);
	                        };
	                    } else {
	                        resolve(container);
	                    }
	                })).then(function (container) {
	                    var html2canvas = _dereq_('./core');
	                    return html2canvas(container.contentWindow.document.documentElement, { type: 'view', width: container.width, height: container.height, proxy: options.proxy, javascriptEnabled: options.javascriptEnabled, removeContainer: options.removeContainer, allowTaint: options.allowTaint, imageTimeout: options.imageTimeout / 2 });
	                }).then(function (canvas) {
	                    return self.image = canvas;
	                });
	            }

	            FrameContainer.prototype.proxyLoad = function (proxy, bounds, options) {
	                var container = this.src;
	                return loadUrlDocument(container.src, proxy, container.ownerDocument, bounds.width, bounds.height, options);
	            };

	            module.exports = FrameContainer;

	        }, { "./core": 4, "./proxy": 16, "./utils": 26 }], 9: [function (_dereq_, module, exports) {
	            function GradientContainer(imageData) {
	                this.src = imageData.value;
	                this.colorStops = [];
	                this.type = null;
	                this.x0 = 0.5;
	                this.y0 = 0.5;
	                this.x1 = 0.5;
	                this.y1 = 0.5;
	                this.promise = _promise2.default.resolve(true);
	            }

	            GradientContainer.TYPES = {
	                LINEAR: 1,
	                RADIAL: 2 };


	            // TODO: support hsl[a], negative %/length values
	            // TODO: support <angle> (e.g. -?\d{1,3}(?:\.\d+)deg, etc. : https://developer.mozilla.org/docs/Web/CSS/angle )
	            GradientContainer.REGEXP_COLORSTOP = /^\s*(rgba?\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}(?:,\s*[0-9\.]+)?\s*\)|[a-z]{3,20}|#[a-f0-9]{3,6})(?:\s+(\d{1,3}(?:\.\d+)?)(%|px)?)?(?:\s|$)/i;

	            module.exports = GradientContainer;

	        }, {}], 10: [function (_dereq_, module, exports) {
	            function ImageContainer(src, cors) {
	                // 更改image的src值为代理地址
	                // 写死在里面
	                // To Be Continue
	                // && /^[http]/.test(src)
	                if (!/proxyToLocal/.test(src)) {
	                    this.originSrc = src;
	                    src = location.protocol + "//" + location.host + "/proxyToLocal?url=" + encodeURIComponent(src);
	                }
	                this.src = src;
	                this.image = new Image();
	                var self = this;
	                this.tainted = null;
	                this.promise = new _promise2.default(function (resolve, reject) {
	                    self.image.onload = resolve;
	                    self.image.onerror = reject;
	                    if (cors) {
	                        self.image.crossOrigin = "anonymous";
	                    }
	                    self.image.src = src;
	                    if (self.image.complete === true) {

	                        resolve(self.image);
	                    }
	                });
	            }

	            module.exports = ImageContainer;

	        }, {}], 11: [function (_dereq_, module, exports) {
	            var log = _dereq_('./log');
	            var ImageContainer = _dereq_('./imagecontainer');
	            var DummyImageContainer = _dereq_('./dummyimagecontainer');
	            var ProxyImageContainer = _dereq_('./proxyimagecontainer');
	            var FrameContainer = _dereq_('./framecontainer');
	            var SVGContainer = _dereq_('./svgcontainer');
	            var SVGNodeContainer = _dereq_('./svgnodecontainer');
	            var LinearGradientContainer = _dereq_('./lineargradientcontainer');
	            var WebkitGradientContainer = _dereq_('./webkitgradientcontainer');
	            var bind = _dereq_('./utils').bind;

	            function ImageLoader(options, support) {
	                this.link = null;
	                this.options = options;
	                this.support = support;
	                this.origin = this.getOrigin(window.location.href);
	            }

	            ImageLoader.prototype.findImages = function (nodes) {
	                var images = [];
	                nodes.reduce(function (imageNodes, container) {
	                    switch (container.node.nodeName) {
	                        case "IMG":
	                            return imageNodes.concat([{
	                                args: [container.node.src],
	                                method: "url" }]);

	                        case "svg":
	                        case "IFRAME":
	                            return imageNodes.concat([{
	                                args: [container.node],
	                                method: container.node.nodeName }]);}


	                    return imageNodes;
	                }, []).forEach(this.addImage(images, this.loadImage), this);
	                return images;
	            };

	            ImageLoader.prototype.findBackgroundImage = function (images, container) {
	                container.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(images, this.loadImage), this);
	                return images;
	            };

	            ImageLoader.prototype.addImage = function (images, callback) {
	                return function (newImage) {
	                    newImage.args.forEach(function (image) {
	                        if (!this.imageExists(images, image)) {
	                            images.splice(0, 0, callback.call(this, newImage));
	                            log('Added image #' + images.length, typeof image === "string" ? image.substring(0, 100) : image);
	                        }
	                    }, this);
	                };
	            };

	            ImageLoader.prototype.hasImageBackground = function (imageData) {
	                return imageData.method !== "none";
	            };

	            ImageLoader.prototype.loadImage = function (imageData) {
	                if (imageData.method === "url") {
	                    var src = imageData.args[0];
	                    if (this.isSVG(src) && !this.support.svg && !this.options.allowTaint) {
	                        return new SVGContainer(src);
	                    } else if (src.match(/data:image\/.*;base64,/i)) {
	                        return new ImageContainer(src.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, ''), false);
	                    } else if (this.isSameOrigin(src) || this.options.allowTaint === true || this.isSVG(src)) {
	                        return new ImageContainer(src, false);
	                    } else if (this.support.cors && !this.options.allowTaint && this.options.useCORS) {
	                        return new ImageContainer(src, true);
	                    } else if (this.options.proxy) {
	                        return new ProxyImageContainer(src, this.options.proxy);
	                    } else {
	                        return new DummyImageContainer(src);
	                    }
	                } else if (imageData.method === "linear-gradient") {
	                    return new LinearGradientContainer(imageData);
	                } else if (imageData.method === "gradient") {
	                    return new WebkitGradientContainer(imageData);
	                } else if (imageData.method === "svg") {
	                    return new SVGNodeContainer(imageData.args[0], this.support.svg);
	                } else if (imageData.method === "IFRAME") {
	                    return new FrameContainer(imageData.args[0], this.isSameOrigin(imageData.args[0].src), this.options);
	                } else {
	                    return new DummyImageContainer(imageData);
	                }
	            };

	            ImageLoader.prototype.isSVG = function (src) {
	                return src.substring(src.length - 3).toLowerCase() === "svg" || SVGContainer.prototype.isInline(src);
	            };

	            ImageLoader.prototype.imageExists = function (images, src) {
	                return images.some(function (image) {
	                    return image.src === src;
	                });
	            };

	            ImageLoader.prototype.isSameOrigin = function (url) {
	                return this.getOrigin(url) === this.origin;
	            };

	            ImageLoader.prototype.getOrigin = function (url) {
	                var link = this.link || (this.link = document.createElement("a"));
	                link.href = url;
	                link.href = link.href; // IE9, LOL! - http://jsfiddle.net/niklasvh/2e48b/
	                return link.protocol + link.hostname + link.port;
	            };

	            ImageLoader.prototype.getPromise = function (container) {
	                return this.timeout(container, this.options.imageTimeout)['catch'](function () {
	                    var dummy = new DummyImageContainer(container.src);
	                    return dummy.promise.then(function (image) {
	                        container.image = image;
	                    });
	                });
	            };

	            ImageLoader.prototype.get = function (src) {
	                var found = null;
	                return this.images.some(function (img) {
	                    var bFound = img.src === src;
	                    if (img.originSrc)
	                    bFound = bFound || img.originSrc === src;
	                    if (bFound) found = img;
	                    return bFound;
	                }) ? found : null;
	            };

	            ImageLoader.prototype.fetch = function (nodes) {
	                this.images = nodes.reduce(bind(this.findBackgroundImage, this), this.findImages(nodes));
	                this.images.forEach(function (image, index) {
	                    image.promise.then(function () {
	                        log("Succesfully loaded image #" + (index + 1), image);
	                    }, function (e) {
	                        log("Failed loading image #" + (index + 1), image, e);
	                    });
	                });
	                this.ready = _promise2.default.all(this.images.map(this.getPromise, this));
	                log("Finished searching images");
	                return this;
	            };

	            ImageLoader.prototype.timeout = function (container, timeout) {
	                var timer;
	                var promise = _promise2.default.race([container.promise, new _promise2.default(function (res, reject) {
	                    timer = setTimeout(function () {
	                        log("Timed out loading image", container);
	                        reject(container);
	                    }, timeout);
	                })]).then(function (container) {
	                    clearTimeout(timer);
	                    return container;
	                });
	                promise['catch'](function () {
	                    clearTimeout(timer);
	                });
	                return promise;
	            };

	            module.exports = ImageLoader;

	        }, { "./dummyimagecontainer": 5, "./framecontainer": 8, "./imagecontainer": 10, "./lineargradientcontainer": 12, "./log": 13, "./proxyimagecontainer": 17, "./svgcontainer": 23, "./svgnodecontainer": 24, "./utils": 26, "./webkitgradientcontainer": 27 }], 12: [function (_dereq_, module, exports) {
	            var GradientContainer = _dereq_('./gradientcontainer');
	            var Color = _dereq_('./color');

	            function LinearGradientContainer(imageData) {
	                GradientContainer.apply(this, arguments);
	                this.type = GradientContainer.TYPES.LINEAR;

	                var hasDirection = LinearGradientContainer.REGEXP_DIRECTION.test(imageData.args[0]) ||
	                !GradientContainer.REGEXP_COLORSTOP.test(imageData.args[0]);

	                if (hasDirection) {
	                    imageData.args[0].split(/\s+/).reverse().forEach(function (position, index) {
	                        switch (position) {
	                            case "left":
	                                this.x0 = 0;
	                                this.x1 = 1;
	                                break;
	                            case "top":
	                                this.y0 = 0;
	                                this.y1 = 1;
	                                break;
	                            case "right":
	                                this.x0 = 1;
	                                this.x1 = 0;
	                                break;
	                            case "bottom":
	                                this.y0 = 1;
	                                this.y1 = 0;
	                                break;
	                            case "to":
	                                var y0 = this.y0;
	                                var x0 = this.x0;
	                                this.y0 = this.y1;
	                                this.x0 = this.x1;
	                                this.x1 = x0;
	                                this.y1 = y0;
	                                break;
	                            case "center":
	                                break; // centered by default
	                            // Firefox internally converts position keywords to percentages:
	                            // http://www.w3.org/TR/2010/WD-CSS2-20101207/colors.html#propdef-background-position
	                            default: // percentage or absolute length
	                                // TODO: support absolute start point positions (e.g., use bounds to convert px to a ratio)
	                                var ratio = parseFloat(position, 10) * 1e-2;
	                                if (isNaN(ratio)) {// invalid or unhandled value
	                                    break;
	                                }
	                                if (index === 0) {
	                                    this.y0 = ratio;
	                                    this.y1 = 1 - this.y0;
	                                } else {
	                                    this.x0 = ratio;
	                                    this.x1 = 1 - this.x0;
	                                }
	                                break;}

	                    }, this);
	                } else {
	                    this.y0 = 0;
	                    this.y1 = 1;
	                }

	                this.colorStops = imageData.args.slice(hasDirection ? 1 : 0).map(function (colorStop) {
	                    var colorStopMatch = colorStop.match(GradientContainer.REGEXP_COLORSTOP);
	                    var value = +colorStopMatch[2];
	                    var unit = value === 0 ? "%" : colorStopMatch[3]; // treat "0" as "0%"
	                    return {
	                        color: new Color(colorStopMatch[1]),
	                        // TODO: support absolute stop positions (e.g., compute gradient line length & convert px to ratio)
	                        stop: unit === "%" ? value / 100 : null };

	                });

	                if (this.colorStops[0].stop === null) {
	                    this.colorStops[0].stop = 0;
	                }

	                if (this.colorStops[this.colorStops.length - 1].stop === null) {
	                    this.colorStops[this.colorStops.length - 1].stop = 1;
	                }

	                // calculates and fills-in explicit stop positions when omitted from rule
	                this.colorStops.forEach(function (colorStop, index) {
	                    if (colorStop.stop === null) {
	                        this.colorStops.slice(index).some(function (find, count) {
	                            if (find.stop !== null) {
	                                colorStop.stop = (find.stop - this.colorStops[index - 1].stop) / (count + 1) + this.colorStops[index - 1].stop;
	                                return true;
	                            } else {
	                                return false;
	                            }
	                        }, this);
	                    }
	                }, this);
	            }

	            LinearGradientContainer.prototype = (0, _create2.default)(GradientContainer.prototype);

	            // TODO: support <angle> (e.g. -?\d{1,3}(?:\.\d+)deg, etc. : https://developer.mozilla.org/docs/Web/CSS/angle )
	            LinearGradientContainer.REGEXP_DIRECTION = /^\s*(?:to|left|right|top|bottom|center|\d{1,3}(?:\.\d+)?%?)(?:\s|$)/i;

	            module.exports = LinearGradientContainer;

	        }, { "./color": 3, "./gradientcontainer": 9 }], 13: [function (_dereq_, module, exports) {
	            var logger = function logger() {
	                if (logger.options.logging && window.console && window.console.log) {
	                    Function.prototype.bind.call(window.console.log, window.console).apply(window.console, [Date.now() - logger.options.start + "ms", "html2canvas:"].concat([].slice.call(arguments, 0)));
	                }
	            };

	            logger.options = { logging: false };
	            module.exports = logger;

	        }, {}], 14: [function (_dereq_, module, exports) {
	            var Color = _dereq_('./color');
	            var utils = _dereq_('./utils');
	            var getBounds = utils.getBounds;
	            var parseBackgrounds = utils.parseBackgrounds;
	            var offsetBounds = utils.offsetBounds;

	            function NodeContainer(node, parent) {
	                this.node = node;
	                this.parent = parent;
	                this.stack = null;
	                this.bounds = null;
	                this.borders = null;
	                this.clip = [];
	                this.backgroundClip = [];
	                this.offsetBounds = null;
	                this.visible = null;
	                this.computedStyles = null;
	                this.colors = {};
	                this.styles = {};
	                this.backgroundImages = null;
	                this.transformData = null;
	                this.transformMatrix = null;
	                this.isPseudoElement = false;
	                this.opacity = null;
	            }

	            NodeContainer.prototype.cloneTo = function (stack) {
	                stack.visible = this.visible;
	                stack.borders = this.borders;
	                stack.bounds = this.bounds;
	                stack.clip = this.clip;
	                stack.backgroundClip = this.backgroundClip;
	                stack.computedStyles = this.computedStyles;
	                stack.styles = this.styles;
	                stack.backgroundImages = this.backgroundImages;
	                stack.opacity = this.opacity;
	            };

	            NodeContainer.prototype.getOpacity = function () {
	                return this.opacity === null ? this.opacity = this.cssFloat('opacity') : this.opacity;
	            };

	            NodeContainer.prototype.assignStack = function (stack) {
	                this.stack = stack;
	                stack.children.push(this);
	            };

	            NodeContainer.prototype.isElementVisible = function () {
	                return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible :
	                this.css('display') !== "none" &&
	                this.css('visibility') !== "hidden" &&
	                !this.node.hasAttribute("data-html2canvas-ignore") && (
	                this.node.nodeName !== "INPUT" || this.node.getAttribute("type") !== "hidden");

	            };

	            NodeContainer.prototype.css = function (attribute) {
	                if (!this.computedStyles) {
	                    this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null);
	                }

	                return this.styles[attribute] || (this.styles[attribute] = this.computedStyles[attribute]);
	            };

	            NodeContainer.prototype.prefixedCss = function (attribute) {
	                var prefixes = ["webkit", "moz", "ms", "o"];
	                var value = this.css(attribute);
	                if (value === undefined) {
	                    prefixes.some(function (prefix) {
	                        value = this.css(prefix + attribute.substr(0, 1).toUpperCase() + attribute.substr(1));
	                        return value !== undefined;
	                    }, this);
	                }
	                return value === undefined ? null : value;
	            };

	            NodeContainer.prototype.computedStyle = function (type) {
	                return this.node.ownerDocument.defaultView.getComputedStyle(this.node, type);
	            };

	            NodeContainer.prototype.cssInt = function (attribute) {
	                var value = parseInt(this.css(attribute), 10);
	                return isNaN(value) ? 0 : value; // borders in old IE are throwing 'medium' for demo.html
	            };

	            NodeContainer.prototype.color = function (attribute) {
	                return this.colors[attribute] || (this.colors[attribute] = new Color(this.css(attribute)));
	            };

	            NodeContainer.prototype.cssFloat = function (attribute) {
	                var value = parseFloat(this.css(attribute));
	                return isNaN(value) ? 0 : value;
	            };

	            NodeContainer.prototype.fontWeight = function () {
	                var weight = this.css("fontWeight");
	                switch (parseInt(weight, 10)) {
	                    case 401:
	                        weight = "bold";
	                        break;
	                    case 400:
	                        weight = "normal";
	                        break;}

	                return weight;
	            };

	            NodeContainer.prototype.parseClip = function () {
	                var matches = this.css('clip').match(this.CLIP);
	                if (matches) {
	                    return {
	                        top: parseInt(matches[1], 10),
	                        right: parseInt(matches[2], 10),
	                        bottom: parseInt(matches[3], 10),
	                        left: parseInt(matches[4], 10) };

	                }
	                return null;
	            };

	            NodeContainer.prototype.parseBackgroundImages = function () {
	                return this.backgroundImages || (this.backgroundImages = parseBackgrounds(this.css("backgroundImage")));
	            };

	            NodeContainer.prototype.cssList = function (property, index) {
	                var value = (this.css(property) || '').split(',');
	                value = value[index || 0] || value[0] || 'auto';
	                value = value.trim().split(' ');
	                if (value.length === 1) {
	                    value = [value[0], isPercentage(value[0]) ? 'auto' : value[0]];
	                }
	                return value;
	            };

	            NodeContainer.prototype.parseBackgroundSize = function (bounds, image, index) {
	                var size = this.cssList("backgroundSize", index);
	                var width, height;

	                if (isPercentage(size[0])) {
	                    width = bounds.width * parseFloat(size[0]) / 100;
	                } else if (/contain|cover/.test(size[0])) {
	                    var targetRatio = bounds.width / bounds.height,currentRatio = image.width / image.height;
	                    return targetRatio < currentRatio ^ size[0] === 'contain' ? { width: bounds.height * currentRatio, height: bounds.height } : { width: bounds.width, height: bounds.width / currentRatio };
	                } else {
	                    width = parseInt(size[0], 10);
	                }

	                if (size[0] === 'auto' && size[1] === 'auto') {
	                    height = image.height;
	                } else if (size[1] === 'auto') {
	                    height = width / image.width * image.height;
	                } else if (isPercentage(size[1])) {
	                    height = bounds.height * parseFloat(size[1]) / 100;
	                } else {
	                    height = parseInt(size[1], 10);
	                }

	                if (size[0] === 'auto') {
	                    width = height / image.height * image.width;
	                }

	                return { width: width, height: height };
	            };

	            NodeContainer.prototype.parseBackgroundPosition = function (bounds, image, index, backgroundSize) {
	                var position = this.cssList('backgroundPosition', index);
	                var left, top;

	                if (isPercentage(position[0])) {
	                    left = (bounds.width - (backgroundSize || image).width) * (parseFloat(position[0]) / 100);
	                } else {
	                    left = parseInt(position[0], 10);
	                }

	                if (position[1] === 'auto') {
	                    top = left / image.width * image.height;
	                } else if (isPercentage(position[1])) {
	                    top = (bounds.height - (backgroundSize || image).height) * parseFloat(position[1]) / 100;
	                } else {
	                    top = parseInt(position[1], 10);
	                }

	                if (position[0] === 'auto') {
	                    left = top / image.height * image.width;
	                }

	                return { left: left, top: top };
	            };

	            NodeContainer.prototype.parseBackgroundRepeat = function (index) {
	                return this.cssList("backgroundRepeat", index)[0];
	            };

	            NodeContainer.prototype.parseTextShadows = function () {
	                var textShadow = this.css("textShadow");
	                var results = [];

	                if (textShadow && textShadow !== 'none') {
	                    var shadows = textShadow.match(this.TEXT_SHADOW_PROPERTY);
	                    for (var i = 0; shadows && i < shadows.length; i++) {
	                        var s = shadows[i].match(this.TEXT_SHADOW_VALUES);
	                        results.push({
	                            color: new Color(s[0]),
	                            offsetX: s[1] ? parseFloat(s[1].replace('px', '')) : 0,
	                            offsetY: s[2] ? parseFloat(s[2].replace('px', '')) : 0,
	                            blur: s[3] ? s[3].replace('px', '') : 0 });

	                    }
	                }
	                return results;
	            };

	            NodeContainer.prototype.parseTransform = function () {
	                if (!this.transformData) {
	                    if (this.hasTransform()) {
	                        var offset = this.parseBounds();
	                        var origin = this.prefixedCss("transformOrigin").split(" ").map(removePx).map(asFloat);
	                        origin[0] += offset.left;
	                        origin[1] += offset.top;
	                        this.transformData = {
	                            origin: origin,
	                            matrix: this.parseTransformMatrix() };

	                    } else {
	                        this.transformData = {
	                            origin: [0, 0],
	                            matrix: [1, 0, 0, 1, 0, 0] };

	                    }
	                }
	                return this.transformData;
	            };

	            NodeContainer.prototype.parseTransformMatrix = function () {
	                if (!this.transformMatrix) {
	                    var transform = this.prefixedCss("transform");
	                    var matrix = transform ? parseMatrix(transform.match(this.MATRIX_PROPERTY)) : null;
	                    this.transformMatrix = matrix ? matrix : [1, 0, 0, 1, 0, 0];
	                }
	                return this.transformMatrix;
	            };

	            NodeContainer.prototype.parseBounds = function () {
	                return this.bounds || (this.bounds = this.hasTransform() ? offsetBounds(this.node) : getBounds(this.node));
	            };

	            NodeContainer.prototype.hasTransform = function () {
	                return this.parseTransformMatrix().join(",") !== "1,0,0,1,0,0" || this.parent && this.parent.hasTransform();
	            };

	            NodeContainer.prototype.getValue = function () {
	                var value = this.node.value || "";
	                if (this.node.tagName === "SELECT") {
	                    value = selectionValue(this.node);
	                } else if (this.node.type === "password") {
	                    value = Array(value.length + 1).join("\u2022"); // jshint ignore:line
	                }
	                return value.length === 0 ? this.node.placeholder || "" : value;
	            };

	            NodeContainer.prototype.MATRIX_PROPERTY = /(matrix|matrix3d)\((.+)\)/;
	            NodeContainer.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g;
	            NodeContainer.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
	            NodeContainer.prototype.CLIP = /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/;

	            function selectionValue(node) {
	                var option = node.options[node.selectedIndex || 0];
	                return option ? option.text || "" : "";
	            }

	            function parseMatrix(match) {
	                if (match && match[1] === "matrix") {
	                    return match[2].split(",").map(function (s) {
	                        return parseFloat(s.trim());
	                    });
	                } else if (match && match[1] === "matrix3d") {
	                    var matrix3d = match[2].split(",").map(function (s) {
	                        return parseFloat(s.trim());
	                    });
	                    return [matrix3d[0], matrix3d[1], matrix3d[4], matrix3d[5], matrix3d[12], matrix3d[13]];
	                }
	            }

	            function isPercentage(value) {
	                return value.toString().indexOf("%") !== -1;
	            }

	            function removePx(str) {
	                return str.replace("px", "");
	            }

	            function asFloat(str) {
	                return parseFloat(str);
	            }

	            module.exports = NodeContainer;

	        }, { "./color": 3, "./utils": 26 }], 15: [function (_dereq_, module, exports) {
	            var log = _dereq_('./log');
	            var punycode = _dereq_('punycode');
	            var NodeContainer = _dereq_('./nodecontainer');
	            var TextContainer = _dereq_('./textcontainer');
	            var PseudoElementContainer = _dereq_('./pseudoelementcontainer');
	            var FontMetrics = _dereq_('./fontmetrics');
	            var Color = _dereq_('./color');
	            var StackingContext = _dereq_('./stackingcontext');
	            var utils = _dereq_('./utils');
	            var bind = utils.bind;
	            var getBounds = utils.getBounds;
	            var parseBackgrounds = utils.parseBackgrounds;
	            var offsetBounds = utils.offsetBounds;

	            function NodeParser(element, renderer, support, imageLoader, options) {
	                log("Starting NodeParser");
	                this.renderer = renderer;
	                this.options = options;
	                this.range = null;
	                this.support = support;
	                this.renderQueue = [];
	                this.stack = new StackingContext(true, 1, element.ownerDocument, null);
	                var parent = new NodeContainer(element, null);
	                if (options.background) {
	                    renderer.rectangle(0, 0, renderer.width, renderer.height, new Color(options.background));
	                }
	                if (element === element.ownerDocument.documentElement) {
	                    // http://www.w3.org/TR/css3-background/#special-backgrounds
	                    var canvasBackground = new NodeContainer(parent.color('backgroundColor').isTransparent() ? element.ownerDocument.body : element.ownerDocument.documentElement, null);
	                    renderer.rectangle(0, 0, renderer.width, renderer.height, canvasBackground.color('backgroundColor'));
	                }
	                parent.visibile = parent.isElementVisible();
	                this.createPseudoHideStyles(element.ownerDocument);
	                this.disableAnimations(element.ownerDocument);
	                this.nodes = flatten([parent].concat(this.getChildren(parent)).filter(function (container) {
	                    return container.visible = container.isElementVisible();
	                }).map(this.getPseudoElements, this));
	                this.fontMetrics = new FontMetrics();
	                log("Fetched nodes, total:", this.nodes.length);
	                log("Calculate overflow clips");
	                this.calculateOverflowClips();
	                log("Start fetching images");
	                this.images = imageLoader.fetch(this.nodes.filter(isElement));
	                this.ready = this.images.ready.then(bind(function () {
	                    log("Images loaded, starting parsing");
	                    log("Creating stacking contexts");
	                    this.createStackingContexts();
	                    log("Sorting stacking contexts");
	                    this.sortStackingContexts(this.stack);
	                    this.parse(this.stack);
	                    log("Render queue created with " + this.renderQueue.length + " items");
	                    return new _promise2.default(bind(function (resolve) {
	                        if (!options.async) {
	                            this.renderQueue.forEach(this.paint, this);
	                            resolve();
	                        } else if (typeof options.async === "function") {
	                            options.async.call(this, this.renderQueue, resolve);
	                        } else if (this.renderQueue.length > 0) {
	                            this.renderIndex = 0;
	                            this.asyncRenderer(this.renderQueue, resolve);
	                        } else {
	                            resolve();
	                        }
	                    }, this));
	                }, this));
	            }

	            NodeParser.prototype.calculateOverflowClips = function () {
	                this.nodes.forEach(function (container) {
	                    if (isElement(container)) {
	                        if (isPseudoElement(container)) {
	                            container.appendToDOM();
	                        }
	                        container.borders = this.parseBorders(container);
	                        var clip = container.css('overflow') === "hidden" ? [container.borders.clip] : [];
	                        var cssClip = container.parseClip();
	                        if (cssClip && ["absolute", "fixed"].indexOf(container.css('position')) !== -1) {
	                            clip.push([["rect",
	                            container.bounds.left + cssClip.left,
	                            container.bounds.top + cssClip.top,
	                            cssClip.right - cssClip.left,
	                            cssClip.bottom - cssClip.top]]);

	                        }
	                        container.clip = hasParentClip(container) ? container.parent.clip.concat(clip) : clip;
	                        container.backgroundClip = container.css('overflow') !== "hidden" ? container.clip.concat([container.borders.clip]) : container.clip;
	                        if (isPseudoElement(container)) {
	                            container.cleanDOM();
	                        }
	                    } else if (isTextNode(container)) {
	                        container.clip = hasParentClip(container) ? container.parent.clip : [];
	                    }
	                    if (!isPseudoElement(container)) {
	                        container.bounds = null;
	                    }
	                }, this);
	            };

	            function hasParentClip(container) {
	                return container.parent && container.parent.clip.length;
	            }

	            NodeParser.prototype.asyncRenderer = function (queue, resolve, asyncTimer) {
	                asyncTimer = asyncTimer || Date.now();
	                this.paint(queue[this.renderIndex++]);
	                if (queue.length === this.renderIndex) {
	                    resolve();
	                } else if (asyncTimer + 20 > Date.now()) {
	                    this.asyncRenderer(queue, resolve, asyncTimer);
	                } else {
	                    setTimeout(bind(function () {
	                        this.asyncRenderer(queue, resolve);
	                    }, this), 0);
	                }
	            };

	            NodeParser.prototype.createPseudoHideStyles = function (document) {
	                this.createStyles(document, '.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ':before { content: "" !important; display: none !important; }' +
	                '.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ':after { content: "" !important; display: none !important; }');
	            };

	            NodeParser.prototype.disableAnimations = function (document) {
	                this.createStyles(document, '* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; ' +
	                '-webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}');
	            };

	            NodeParser.prototype.createStyles = function (document, styles) {
	                var hidePseudoElements = document.createElement('style');
	                hidePseudoElements.innerHTML = styles;
	                document.body.appendChild(hidePseudoElements);
	            };

	            NodeParser.prototype.getPseudoElements = function (container) {
	                var nodes = [[container]];
	                if (container.node.nodeType === Node.ELEMENT_NODE) {
	                    var before = this.getPseudoElement(container, ":before");
	                    var after = this.getPseudoElement(container, ":after");

	                    if (before) {
	                        nodes.push(before);
	                    }

	                    if (after) {
	                        nodes.push(after);
	                    }
	                }
	                return flatten(nodes);
	            };

	            function toCamelCase(str) {
	                return str.replace(/(\-[a-z])/g, function (match) {
	                    return match.toUpperCase().replace('-', '');
	                });
	            }

	            NodeParser.prototype.getPseudoElement = function (container, type) {
	                var style = container.computedStyle(type);
	                if (!style || !style.content || style.content === "none" || style.content === "-moz-alt-content" || style.display === "none") {
	                    return null;
	                }

	                var content = stripQuotes(style.content);
	                var isImage = content.substr(0, 3) === 'url';
	                var pseudoNode = document.createElement(isImage ? 'img' : 'html2canvaspseudoelement');
	                var pseudoContainer = new PseudoElementContainer(pseudoNode, container, type);

	                for (var i = style.length - 1; i >= 0; i--) {
	                    var property = toCamelCase(style.item(i));
	                    pseudoNode.style[property] = style[property];
	                }

	                pseudoNode.className = PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER;

	                if (isImage) {
	                    pseudoNode.src = parseBackgrounds(content)[0].args[0];
	                    return [pseudoContainer];
	                } else {
	                    var text = document.createTextNode(content);
	                    pseudoNode.appendChild(text);
	                    return [pseudoContainer, new TextContainer(text, pseudoContainer)];
	                }
	            };


	            NodeParser.prototype.getChildren = function (parentContainer) {
	                return flatten([].filter.call(parentContainer.node.childNodes, renderableNode).map(function (node) {
	                    var container = [node.nodeType === Node.TEXT_NODE ? new TextContainer(node, parentContainer) : new NodeContainer(node, parentContainer)].filter(nonIgnoredElement);
	                    return node.nodeType === Node.ELEMENT_NODE && container.length && node.tagName !== "TEXTAREA" ? container[0].isElementVisible() ? container.concat(this.getChildren(container[0])) : [] : container;
	                }, this));
	            };

	            NodeParser.prototype.newStackingContext = function (container, hasOwnStacking) {
	                var stack = new StackingContext(hasOwnStacking, container.getOpacity(), container.node, container.parent);
	                container.cloneTo(stack);
	                var parentStack = hasOwnStacking ? stack.getParentStack(this) : stack.parent.stack;
	                parentStack.contexts.push(stack);
	                container.stack = stack;
	            };

	            NodeParser.prototype.createStackingContexts = function () {
	                this.nodes.forEach(function (container) {
	                    if (isElement(container) && (this.isRootElement(container) || hasOpacity(container) || isPositionedForStacking(container) || this.isBodyWithTransparentRoot(container) || container.hasTransform())) {
	                        this.newStackingContext(container, true);
	                    } else if (isElement(container) && (isPositioned(container) && zIndex0(container) || isInlineBlock(container) || isFloating(container))) {
	                        this.newStackingContext(container, false);
	                    } else {
	                        container.assignStack(container.parent.stack);
	                    }
	                }, this);
	            };

	            NodeParser.prototype.isBodyWithTransparentRoot = function (container) {
	                return container.node.nodeName === "BODY" && container.parent.color('backgroundColor').isTransparent();
	            };

	            NodeParser.prototype.isRootElement = function (container) {
	                return container.parent === null;
	            };

	            NodeParser.prototype.sortStackingContexts = function (stack) {
	                stack.contexts.sort(zIndexSort(stack.contexts.slice(0)));
	                stack.contexts.forEach(this.sortStackingContexts, this);
	            };

	            NodeParser.prototype.parseTextBounds = function (container) {
	                return function (text, index, textList) {
	                    if (container.parent.css("textDecoration").substr(0, 4) !== "none" || text.trim().length !== 0) {
	                        if (this.support.rangeBounds && !container.parent.hasTransform()) {
	                            var offset = textList.slice(0, index).join("").length;
	                            return this.getRangeBounds(container.node, offset, text.length);
	                        } else if (container.node && typeof container.node.data === "string") {
	                            var replacementNode = container.node.splitText(text.length);
	                            var bounds = this.getWrapperBounds(container.node, container.parent.hasTransform());
	                            container.node = replacementNode;
	                            return bounds;
	                        }
	                    } else if (!this.support.rangeBounds || container.parent.hasTransform()) {
	                        container.node = container.node.splitText(text.length);
	                    }
	                    return {};
	                };
	            };

	            NodeParser.prototype.getWrapperBounds = function (node, transform) {
	                var wrapper = node.ownerDocument.createElement('html2canvaswrapper');
	                var parent = node.parentNode,
	                backupText = node.cloneNode(true);

	                wrapper.appendChild(node.cloneNode(true));
	                parent.replaceChild(wrapper, node);
	                var bounds = transform ? offsetBounds(wrapper) : getBounds(wrapper);
	                parent.replaceChild(backupText, wrapper);
	                return bounds;
	            };

	            NodeParser.prototype.getRangeBounds = function (node, offset, length) {
	                var range = this.range || (this.range = node.ownerDocument.createRange());
	                range.setStart(node, offset);
	                range.setEnd(node, offset + length);
	                return range.getBoundingClientRect();
	            };

	            function ClearTransform() {}

	            NodeParser.prototype.parse = function (stack) {
	                // http://www.w3.org/TR/CSS21/visuren.html#z-index
	                var negativeZindex = stack.contexts.filter(negativeZIndex); // 2. the child stacking contexts with negative stack levels (most negative first).
	                var descendantElements = stack.children.filter(isElement);
	                var descendantNonFloats = descendantElements.filter(not(isFloating));
	                var nonInlineNonPositionedDescendants = descendantNonFloats.filter(not(isPositioned)).filter(not(inlineLevel)); // 3 the in-flow, non-inline-level, non-positioned descendants.
	                var nonPositionedFloats = descendantElements.filter(not(isPositioned)).filter(isFloating); // 4. the non-positioned floats.
	                var inFlow = descendantNonFloats.filter(not(isPositioned)).filter(inlineLevel); // 5. the in-flow, inline-level, non-positioned descendants, including inline tables and inline blocks.
	                var stackLevel0 = stack.contexts.concat(descendantNonFloats.filter(isPositioned)).filter(zIndex0); // 6. the child stacking contexts with stack level 0 and the positioned descendants with stack level 0.
	                var text = stack.children.filter(isTextNode).filter(hasText);
	                var positiveZindex = stack.contexts.filter(positiveZIndex); // 7. the child stacking contexts with positive stack levels (least positive first).
	                negativeZindex.concat(nonInlineNonPositionedDescendants).concat(nonPositionedFloats).
	                concat(inFlow).concat(stackLevel0).concat(text).concat(positiveZindex).forEach(function (container) {
	                    this.renderQueue.push(container);
	                    if (isStackingContext(container)) {
	                        this.parse(container);
	                        this.renderQueue.push(new ClearTransform());
	                    }
	                }, this);
	            };

	            NodeParser.prototype.paint = function (container) {
	                try {
	                    if (container instanceof ClearTransform) {
	                        this.renderer.ctx.restore();
	                    } else if (isTextNode(container)) {
	                        if (isPseudoElement(container.parent)) {
	                            container.parent.appendToDOM();
	                        }
	                        this.paintText(container);
	                        if (isPseudoElement(container.parent)) {
	                            container.parent.cleanDOM();
	                        }
	                    } else {
	                        this.paintNode(container);
	                    }
	                } catch (e) {
	                    log(e);
	                    if (this.options.strict) {
	                        throw e;
	                    }
	                }
	            };

	            NodeParser.prototype.paintNode = function (container) {
	                if (isStackingContext(container)) {
	                    this.renderer.setOpacity(container.opacity);
	                    this.renderer.ctx.save();
	                    if (container.hasTransform()) {
	                        this.renderer.setTransform(container.parseTransform());
	                    }
	                }

	                if (container.node.nodeName === "INPUT" && container.node.type === "checkbox") {
	                    this.paintCheckbox(container);
	                } else if (container.node.nodeName === "INPUT" && container.node.type === "radio") {
	                    this.paintRadio(container);
	                } else {
	                    this.paintElement(container);
	                }
	            };

	            NodeParser.prototype.paintElement = function (container) {
	                var bounds = container.parseBounds();
	                this.renderer.clip(container.backgroundClip, function () {
	                    this.renderer.renderBackground(container, bounds, container.borders.borders.map(getWidth));
	                }, this);

	                this.renderer.clip(container.clip, function () {
	                    this.renderer.renderBorders(container.borders.borders);
	                }, this);

	                this.renderer.clip(container.backgroundClip, function () {var _this = this;
	                    switch (container.node.nodeName) {
	                        case "svg":
	                        case "IFRAME":
	                            var imgContainer = this.images.get(container.node);
	                            if (imgContainer) {
	                                this.renderer.renderImage(container, bounds, container.borders, imgContainer);
	                            } else {
	                                log("Error loading <" + container.node.nodeName + ">", container.node);
	                            }
	                            break;
	                        case "IMG":
	                            var imageContainer = this.images.get(container.node.src);
	                            if (imageContainer) {
	                                imageContainer.promise.then(function () {

	                                    _this.renderer.renderImage(container, bounds, container.borders, imageContainer);
	                                });
	                            } else {
	                                log("Error loading <img>", container.node.src);
	                            }
	                            break;
	                        case "CANVAS":
	                            this.renderer.renderImage(container, bounds, container.borders, { image: container.node });
	                            break;
	                        case "SELECT":
	                        case "INPUT":
	                        case "TEXTAREA":
	                            this.paintFormValue(container);
	                            break;}

	                }, this);
	            };

	            NodeParser.prototype.paintCheckbox = function (container) {
	                var b = container.parseBounds();

	                var size = Math.min(b.width, b.height);
	                var bounds = { width: size - 1, height: size - 1, top: b.top, left: b.left };
	                var r = [3, 3];
	                var radius = [r, r, r, r];
	                var borders = [1, 1, 1, 1].map(function (w) {
	                    return { color: new Color('#A5A5A5'), width: w };
	                });

	                var borderPoints = calculateCurvePoints(bounds, radius, borders);

	                this.renderer.clip(container.backgroundClip, function () {
	                    this.renderer.rectangle(bounds.left + 1, bounds.top + 1, bounds.width - 2, bounds.height - 2, new Color("#DEDEDE"));
	                    this.renderer.renderBorders(calculateBorders(borders, bounds, borderPoints, radius));
	                    if (container.node.checked) {
	                        this.renderer.font(new Color('#424242'), 'normal', 'normal', 'bold', size - 3 + "px", 'arial');
	                        this.renderer.text("\u2714", bounds.left + size / 6, bounds.top + size - 1);
	                    }
	                }, this);
	            };

	            NodeParser.prototype.paintRadio = function (container) {
	                var bounds = container.parseBounds();

	                var size = Math.min(bounds.width, bounds.height) - 2;

	                this.renderer.clip(container.backgroundClip, function () {
	                    this.renderer.circleStroke(bounds.left + 1, bounds.top + 1, size, new Color('#DEDEDE'), 1, new Color('#A5A5A5'));
	                    if (container.node.checked) {
	                        this.renderer.circle(Math.ceil(bounds.left + size / 4) + 1, Math.ceil(bounds.top + size / 4) + 1, Math.floor(size / 2), new Color('#424242'));
	                    }
	                }, this);
	            };

	            NodeParser.prototype.paintFormValue = function (container) {
	                var value = container.getValue();
	                if (value.length > 0) {
	                    var document = container.node.ownerDocument;
	                    var wrapper = document.createElement('html2canvaswrapper');
	                    var properties = ['lineHeight', 'textAlign', 'fontFamily', 'fontWeight', 'fontSize', 'color',
	                    'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom',
	                    'width', 'height', 'borderLeftStyle', 'borderTopStyle', 'borderLeftWidth', 'borderTopWidth',
	                    'boxSizing', 'whiteSpace', 'wordWrap'];

	                    properties.forEach(function (property) {
	                        try {
	                            wrapper.style[property] = container.css(property);
	                        } catch (e) {
	                            // Older IE has issues with "border"
	                            log("html2canvas: Parse: Exception caught in renderFormValue: " + e.message);
	                        }
	                    });
	                    var bounds = container.parseBounds();
	                    wrapper.style.position = "fixed";
	                    wrapper.style.left = bounds.left + "px";
	                    wrapper.style.top = bounds.top + "px";
	                    wrapper.textContent = value;
	                    document.body.appendChild(wrapper);
	                    this.paintText(new TextContainer(wrapper.firstChild, container));
	                    document.body.removeChild(wrapper);
	                }
	            };

	            NodeParser.prototype.paintText = function (container) {
	                container.applyTextTransform();
	                var characters = punycode.ucs2.decode(container.node.data);
	                var textList = (!this.options.letterRendering || noLetterSpacing(container)) && !hasUnicode(container.node.data) ? getWords(characters) : characters.map(function (character) {
	                    return punycode.ucs2.encode([character]);
	                });

	                var weight = container.parent.fontWeight();
	                var size = container.parent.css('fontSize');
	                var family = container.parent.css('fontFamily');
	                var shadows = container.parent.parseTextShadows();

	                this.renderer.font(container.parent.color('color'), container.parent.css('fontStyle'), container.parent.css('fontVariant'), weight, size, family);
	                if (shadows.length) {
	                    // TODO: support multiple text shadows
	                    this.renderer.fontShadow(shadows[0].color, shadows[0].offsetX, shadows[0].offsetY, shadows[0].blur);
	                } else {
	                    this.renderer.clearShadow();
	                }

	                this.renderer.clip(container.parent.clip, function () {
	                    textList.map(this.parseTextBounds(container), this).forEach(function (bounds, index) {
	                        if (bounds) {
	                            this.renderer.text(textList[index], bounds.left, bounds.bottom);
	                            this.renderTextDecoration(container.parent, bounds, this.fontMetrics.getMetrics(family, size));
	                        }
	                    }, this);
	                }, this);
	            };

	            NodeParser.prototype.renderTextDecoration = function (container, bounds, metrics) {
	                switch (container.css("textDecoration").split(" ")[0]) {
	                    case "underline":
	                        // Draws a line at the baseline of the font
	                        // TODO As some browsers display the line as more than 1px if the font-size is big, need to take that into account both in position and size
	                        this.renderer.rectangle(bounds.left, Math.round(bounds.top + metrics.baseline + metrics.lineWidth), bounds.width, 1, container.color("color"));
	                        break;
	                    case "overline":
	                        this.renderer.rectangle(bounds.left, Math.round(bounds.top), bounds.width, 1, container.color("color"));
	                        break;
	                    case "line-through":
	                        // TODO try and find exact position for line-through
	                        this.renderer.rectangle(bounds.left, Math.ceil(bounds.top + metrics.middle + metrics.lineWidth), bounds.width, 1, container.color("color"));
	                        break;}

	            };

	            var borderColorTransforms = {
	                inset: [
	                ["darken", 0.60],
	                ["darken", 0.10],
	                ["darken", 0.10],
	                ["darken", 0.60]] };



	            NodeParser.prototype.parseBorders = function (container) {
	                var nodeBounds = container.parseBounds();
	                var radius = getBorderRadiusData(container);
	                var borders = ["Top", "Right", "Bottom", "Left"].map(function (side, index) {
	                    var style = container.css('border' + side + 'Style');
	                    var color = container.color('border' + side + 'Color');
	                    if (style === "inset" && color.isBlack()) {
	                        color = new Color([255, 255, 255, color.a]); // this is wrong, but
	                    }
	                    var colorTransform = borderColorTransforms[style] ? borderColorTransforms[style][index] : null;
	                    return {
	                        width: container.cssInt('border' + side + 'Width'),
	                        color: colorTransform ? color[colorTransform[0]](colorTransform[1]) : color,
	                        args: null };

	                });
	                var borderPoints = calculateCurvePoints(nodeBounds, radius, borders);

	                return {
	                    clip: this.parseBackgroundClip(container, borderPoints, borders, radius, nodeBounds),
	                    borders: calculateBorders(borders, nodeBounds, borderPoints, radius) };

	            };

	            function calculateBorders(borders, nodeBounds, borderPoints, radius) {
	                return borders.map(function (border, borderSide) {
	                    if (border.width > 0) {
	                        var bx = nodeBounds.left;
	                        var by = nodeBounds.top;
	                        var bw = nodeBounds.width;
	                        var bh = nodeBounds.height - borders[2].width;

	                        switch (borderSide) {
	                            case 0:
	                                // top border
	                                bh = borders[0].width;
	                                border.args = drawSide({
	                                    c1: [bx, by],
	                                    c2: [bx + bw, by],
	                                    c3: [bx + bw - borders[1].width, by + bh],
	                                    c4: [bx + borders[3].width, by + bh] },
	                                radius[0], radius[1],
	                                borderPoints.topLeftOuter, borderPoints.topLeftInner, borderPoints.topRightOuter, borderPoints.topRightInner);
	                                break;
	                            case 1:
	                                // right border
	                                bx = nodeBounds.left + nodeBounds.width - borders[1].width;
	                                bw = borders[1].width;

	                                border.args = drawSide({
	                                    c1: [bx + bw, by],
	                                    c2: [bx + bw, by + bh + borders[2].width],
	                                    c3: [bx, by + bh],
	                                    c4: [bx, by + borders[0].width] },
	                                radius[1], radius[2],
	                                borderPoints.topRightOuter, borderPoints.topRightInner, borderPoints.bottomRightOuter, borderPoints.bottomRightInner);
	                                break;
	                            case 2:
	                                // bottom border
	                                by = by + nodeBounds.height - borders[2].width;
	                                bh = borders[2].width;
	                                border.args = drawSide({
	                                    c1: [bx + bw, by + bh],
	                                    c2: [bx, by + bh],
	                                    c3: [bx + borders[3].width, by],
	                                    c4: [bx + bw - borders[3].width, by] },
	                                radius[2], radius[3],
	                                borderPoints.bottomRightOuter, borderPoints.bottomRightInner, borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner);
	                                break;
	                            case 3:
	                                // left border
	                                bw = borders[3].width;
	                                border.args = drawSide({
	                                    c1: [bx, by + bh + borders[2].width],
	                                    c2: [bx, by],
	                                    c3: [bx + bw, by + borders[0].width],
	                                    c4: [bx + bw, by + bh] },
	                                radius[3], radius[0],
	                                borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner, borderPoints.topLeftOuter, borderPoints.topLeftInner);
	                                break;}

	                    }
	                    return border;
	                });
	            }

	            NodeParser.prototype.parseBackgroundClip = function (container, borderPoints, borders, radius, bounds) {
	                var backgroundClip = container.css('backgroundClip'),
	                borderArgs = [];

	                switch (backgroundClip) {
	                    case "content-box":
	                    case "padding-box":
	                        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftInner, borderPoints.topRightInner, bounds.left + borders[3].width, bounds.top + borders[0].width);
	                        parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightInner, borderPoints.bottomRightInner, bounds.left + bounds.width - borders[1].width, bounds.top + borders[0].width);
	                        parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightInner, borderPoints.bottomLeftInner, bounds.left + bounds.width - borders[1].width, bounds.top + bounds.height - borders[2].width);
	                        parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftInner, borderPoints.topLeftInner, bounds.left + borders[3].width, bounds.top + bounds.height - borders[2].width);
	                        break;

	                    default:
	                        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftOuter, borderPoints.topRightOuter, bounds.left, bounds.top);
	                        parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightOuter, borderPoints.bottomRightOuter, bounds.left + bounds.width, bounds.top);
	                        parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightOuter, borderPoints.bottomLeftOuter, bounds.left + bounds.width, bounds.top + bounds.height);
	                        parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftOuter, borderPoints.topLeftOuter, bounds.left, bounds.top + bounds.height);
	                        break;}


	                return borderArgs;
	            };

	            function getCurvePoints(x, y, r1, r2) {
	                var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
	                var ox = r1 * kappa, // control point offset horizontal
	                oy = r2 * kappa, // control point offset vertical
	                xm = x + r1, // x-middle
	                ym = y + r2; // y-middle
	                return {
	                    topLeft: bezierCurve({ x: x, y: ym }, { x: x, y: ym - oy }, { x: xm - ox, y: y }, { x: xm, y: y }),
	                    topRight: bezierCurve({ x: x, y: y }, { x: x + ox, y: y }, { x: xm, y: ym - oy }, { x: xm, y: ym }),
	                    bottomRight: bezierCurve({ x: xm, y: y }, { x: xm, y: y + oy }, { x: x + ox, y: ym }, { x: x, y: ym }),
	                    bottomLeft: bezierCurve({ x: xm, y: ym }, { x: xm - ox, y: ym }, { x: x, y: y + oy }, { x: x, y: y }) };

	            }

	            function calculateCurvePoints(bounds, borderRadius, borders) {
	                var x = bounds.left,
	                y = bounds.top,
	                width = bounds.width,
	                height = bounds.height,

	                tlh = borderRadius[0][0] < width / 2 ? borderRadius[0][0] : width / 2,
	                tlv = borderRadius[0][1] < height / 2 ? borderRadius[0][1] : height / 2,
	                trh = borderRadius[1][0] < width / 2 ? borderRadius[1][0] : width / 2,
	                trv = borderRadius[1][1] < height / 2 ? borderRadius[1][1] : height / 2,
	                brh = borderRadius[2][0] < width / 2 ? borderRadius[2][0] : width / 2,
	                brv = borderRadius[2][1] < height / 2 ? borderRadius[2][1] : height / 2,
	                blh = borderRadius[3][0] < width / 2 ? borderRadius[3][0] : width / 2,
	                blv = borderRadius[3][1] < height / 2 ? borderRadius[3][1] : height / 2;

	                var topWidth = width - trh,
	                rightHeight = height - brv,
	                bottomWidth = width - brh,
	                leftHeight = height - blv;

	                return {
	                    topLeftOuter: getCurvePoints(x, y, tlh, tlv).topLeft.subdivide(0.5),
	                    topLeftInner: getCurvePoints(x + borders[3].width, y + borders[0].width, Math.max(0, tlh - borders[3].width), Math.max(0, tlv - borders[0].width)).topLeft.subdivide(0.5),
	                    topRightOuter: getCurvePoints(x + topWidth, y, trh, trv).topRight.subdivide(0.5),
	                    topRightInner: getCurvePoints(x + Math.min(topWidth, width + borders[3].width), y + borders[0].width, topWidth > width + borders[3].width ? 0 : trh - borders[3].width, trv - borders[0].width).topRight.subdivide(0.5),
	                    bottomRightOuter: getCurvePoints(x + bottomWidth, y + rightHeight, brh, brv).bottomRight.subdivide(0.5),
	                    bottomRightInner: getCurvePoints(x + Math.min(bottomWidth, width - borders[3].width), y + Math.min(rightHeight, height + borders[0].width), Math.max(0, brh - borders[1].width), brv - borders[2].width).bottomRight.subdivide(0.5),
	                    bottomLeftOuter: getCurvePoints(x, y + leftHeight, blh, blv).bottomLeft.subdivide(0.5),
	                    bottomLeftInner: getCurvePoints(x + borders[3].width, y + leftHeight, Math.max(0, blh - borders[3].width), blv - borders[2].width).bottomLeft.subdivide(0.5) };

	            }

	            function bezierCurve(start, startControl, endControl, end) {
	                var lerp = function lerp(a, b, t) {
	                    return {
	                        x: a.x + (b.x - a.x) * t,
	                        y: a.y + (b.y - a.y) * t };

	                };

	                return {
	                    start: start,
	                    startControl: startControl,
	                    endControl: endControl,
	                    end: end,
	                    subdivide: function subdivide(t) {
	                        var ab = lerp(start, startControl, t),
	                        bc = lerp(startControl, endControl, t),
	                        cd = lerp(endControl, end, t),
	                        abbc = lerp(ab, bc, t),
	                        bccd = lerp(bc, cd, t),
	                        dest = lerp(abbc, bccd, t);
	                        return [bezierCurve(start, ab, abbc, dest), bezierCurve(dest, bccd, cd, end)];
	                    },
	                    curveTo: function curveTo(borderArgs) {
	                        borderArgs.push(["bezierCurve", startControl.x, startControl.y, endControl.x, endControl.y, end.x, end.y]);
	                    },
	                    curveToReversed: function curveToReversed(borderArgs) {
	                        borderArgs.push(["bezierCurve", endControl.x, endControl.y, startControl.x, startControl.y, start.x, start.y]);
	                    } };

	            }

	            function drawSide(borderData, radius1, radius2, outer1, inner1, outer2, inner2) {
	                var borderArgs = [];

	                if (radius1[0] > 0 || radius1[1] > 0) {
	                    borderArgs.push(["line", outer1[1].start.x, outer1[1].start.y]);
	                    outer1[1].curveTo(borderArgs);
	                } else {
	                    borderArgs.push(["line", borderData.c1[0], borderData.c1[1]]);
	                }

	                if (radius2[0] > 0 || radius2[1] > 0) {
	                    borderArgs.push(["line", outer2[0].start.x, outer2[0].start.y]);
	                    outer2[0].curveTo(borderArgs);
	                    borderArgs.push(["line", inner2[0].end.x, inner2[0].end.y]);
	                    inner2[0].curveToReversed(borderArgs);
	                } else {
	                    borderArgs.push(["line", borderData.c2[0], borderData.c2[1]]);
	                    borderArgs.push(["line", borderData.c3[0], borderData.c3[1]]);
	                }

	                if (radius1[0] > 0 || radius1[1] > 0) {
	                    borderArgs.push(["line", inner1[1].end.x, inner1[1].end.y]);
	                    inner1[1].curveToReversed(borderArgs);
	                } else {
	                    borderArgs.push(["line", borderData.c4[0], borderData.c4[1]]);
	                }

	                return borderArgs;
	            }

	            function parseCorner(borderArgs, radius1, radius2, corner1, corner2, x, y) {
	                if (radius1[0] > 0 || radius1[1] > 0) {
	                    borderArgs.push(["line", corner1[0].start.x, corner1[0].start.y]);
	                    corner1[0].curveTo(borderArgs);
	                    corner1[1].curveTo(borderArgs);
	                } else {
	                    borderArgs.push(["line", x, y]);
	                }

	                if (radius2[0] > 0 || radius2[1] > 0) {
	                    borderArgs.push(["line", corner2[0].start.x, corner2[0].start.y]);
	                }
	            }

	            function negativeZIndex(container) {
	                return container.cssInt("zIndex") < 0;
	            }

	            function positiveZIndex(container) {
	                return container.cssInt("zIndex") > 0;
	            }

	            function zIndex0(container) {
	                return container.cssInt("zIndex") === 0;
	            }

	            function inlineLevel(container) {
	                return ["inline", "inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
	            }

	            function isStackingContext(container) {
	                return container instanceof StackingContext;
	            }

	            function hasText(container) {
	                return container.node.data.trim().length > 0;
	            }

	            function noLetterSpacing(container) {
	                return (/^(normal|none|0px)$/.test(container.parent.css("letterSpacing")));
	            }

	            function getBorderRadiusData(container) {
	                return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function (side) {
	                    var value = container.css('border' + side + 'Radius');
	                    var arr = value.split(" ");
	                    if (arr.length <= 1) {
	                        arr[1] = arr[0];
	                    }
	                    return arr.map(asInt);
	                });
	            }

	            function renderableNode(node) {
	                return node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE;
	            }

	            function isPositionedForStacking(container) {
	                var position = container.css("position");
	                var zIndex = ["absolute", "relative", "fixed"].indexOf(position) !== -1 ? container.css("zIndex") : "auto";
	                return zIndex !== "auto";
	            }

	            function isPositioned(container) {
	                return container.css("position") !== "static";
	            }

	            function isFloating(container) {
	                return container.css("float") !== "none";
	            }

	            function isInlineBlock(container) {
	                return ["inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
	            }

	            function not(callback) {
	                var context = this;
	                return function () {
	                    return !callback.apply(context, arguments);
	                };
	            }

	            function isElement(container) {
	                return container.node.nodeType === Node.ELEMENT_NODE;
	            }

	            function isPseudoElement(container) {
	                return container.isPseudoElement === true;
	            }

	            function isTextNode(container) {
	                return container.node.nodeType === Node.TEXT_NODE;
	            }

	            function zIndexSort(contexts) {
	                return function (a, b) {
	                    return a.cssInt("zIndex") + contexts.indexOf(a) / contexts.length - (b.cssInt("zIndex") + contexts.indexOf(b) / contexts.length);
	                };
	            }

	            function hasOpacity(container) {
	                return container.getOpacity() < 1;
	            }

	            function asInt(value) {
	                return parseInt(value, 10);
	            }

	            function getWidth(border) {
	                return border.width;
	            }

	            function nonIgnoredElement(nodeContainer) {
	                return nodeContainer.node.nodeType !== Node.ELEMENT_NODE || ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"].indexOf(nodeContainer.node.nodeName) === -1;
	            }

	            function flatten(arrays) {
	                return [].concat.apply([], arrays);
	            }

	            function stripQuotes(content) {
	                var first = content.substr(0, 1);
	                return first === content.substr(content.length - 1) && first.match(/'|"/) ? content.substr(1, content.length - 2) : content;
	            }

	            function getWords(characters) {
	                var words = [],i = 0,onWordBoundary = false,word;
	                while (characters.length) {
	                    if (isWordBoundary(characters[i]) === onWordBoundary) {
	                        word = characters.splice(0, i);
	                        if (word.length) {
	                            words.push(punycode.ucs2.encode(word));
	                        }
	                        onWordBoundary = !onWordBoundary;
	                        i = 0;
	                    } else {
	                        i++;
	                    }

	                    if (i >= characters.length) {
	                        word = characters.splice(0, i);
	                        if (word.length) {
	                            words.push(punycode.ucs2.encode(word));
	                        }
	                    }
	                }
	                return words;
	            }

	            function isWordBoundary(characterCode) {
	                return [
	                32, // <space>
	                13, // \r
	                10, // \n
	                9, // \t
	                45 // -
	                ].indexOf(characterCode) !== -1;
	            }

	            function hasUnicode(string) {
	                return (/[^\u0000-\u00ff]/.test(string));
	            }

	            module.exports = NodeParser;

	        }, { "./color": 3, "./fontmetrics": 7, "./log": 13, "./nodecontainer": 14, "./pseudoelementcontainer": 18, "./stackingcontext": 21, "./textcontainer": 25, "./utils": 26, "punycode": 1 }], 16: [function (_dereq_, module, exports) {
	            var XHR = _dereq_('./xhr');
	            var utils = _dereq_('./utils');
	            var log = _dereq_('./log');
	            var createWindowClone = _dereq_('./clone');
	            var decode64 = utils.decode64;

	            function Proxy(src, proxyUrl, document) {
	                var supportsCORS = 'withCredentials' in new XMLHttpRequest();
	                if (!proxyUrl) {
	                    return _promise2.default.reject("No proxy configured");
	                }
	                var callback = createCallback(supportsCORS);
	                var url = createProxyUrl(proxyUrl, src, callback);

	                return supportsCORS ? XHR(url) : jsonp(document, url, callback).then(function (response) {
	                    return decode64(response.content);
	                });
	            }
	            var proxyCount = 0;

	            function ProxyURL(src, proxyUrl, document) {
	                var supportsCORSImage = 'crossOrigin' in new Image();
	                var callback = createCallback(supportsCORSImage);
	                var url = createProxyUrl(proxyUrl, src, callback);
	                return supportsCORSImage ? _promise2.default.resolve(url) : jsonp(document, url, callback).then(function (response) {
	                    return "data:" + response.type + ";base64," + response.content;
	                });
	            }

	            function jsonp(document, url, callback) {
	                return new _promise2.default(function (resolve, reject) {
	                    var s = document.createElement("script");
	                    var cleanup = function cleanup() {
	                        delete window.html2canvas.proxy[callback];
	                        document.body.removeChild(s);
	                    };
	                    window.html2canvas.proxy[callback] = function (response) {
	                        cleanup();
	                        resolve(response);
	                    };
	                    s.src = url;
	                    s.onerror = function (e) {
	                        cleanup();
	                        reject(e);
	                    };
	                    document.body.appendChild(s);
	                });
	            }

	            function createCallback(useCORS) {
	                return !useCORS ? "html2canvas_" + Date.now() + "_" + ++proxyCount + "_" + Math.round(Math.random() * 100000) : "";
	            }

	            function createProxyUrl(proxyUrl, src, callback) {
	                return proxyUrl + "?url=" + encodeURIComponent(src) + (callback.length ? "&callback=html2canvas.proxy." + callback : "");
	            }

	            function documentFromHTML(src) {
	                return function (html) {
	                    var parser = new DOMParser(),doc;
	                    try {
	                        doc = parser.parseFromString(html, "text/html");
	                    } catch (e) {
	                        log("DOMParser not supported, falling back to createHTMLDocument");
	                        doc = document.implementation.createHTMLDocument("");
	                        try {
	                            doc.open();
	                            doc.write(html);
	                            doc.close();
	                        } catch (ee) {
	                            log("createHTMLDocument write not supported, falling back to document.body.innerHTML");
	                            doc.body.innerHTML = html; // ie9 doesnt support writing to documentElement
	                        }
	                    }

	                    var b = doc.querySelector("base");
	                    if (!b || !b.href.host) {
	                        var base = doc.createElement("base");
	                        base.href = src;
	                        doc.head.insertBefore(base, doc.head.firstChild);
	                    }

	                    return doc;
	                };
	            }

	            function loadUrlDocument(src, proxy, document, width, height, options) {
	                return new Proxy(src, proxy, window.document).then(documentFromHTML(src)).then(function (doc) {
	                    return createWindowClone(doc, document, width, height, options, 0, 0);
	                });
	            }

	            exports.Proxy = Proxy;
	            exports.ProxyURL = ProxyURL;
	            exports.loadUrlDocument = loadUrlDocument;

	        }, { "./clone": 2, "./log": 13, "./utils": 26, "./xhr": 28 }], 17: [function (_dereq_, module, exports) {
	            var ProxyURL = _dereq_('./proxy').ProxyURL;

	            function ProxyImageContainer(src, proxy) {
	                var link = document.createElement("a");
	                link.href = src;
	                src = link.href;
	                this.src = src;
	                this.image = new Image();
	                var self = this;
	                this.promise = new _promise2.default(function (resolve, reject) {
	                    self.image.crossOrigin = "Anonymous";
	                    self.image.onload = resolve;
	                    self.image.onerror = reject;

	                    new ProxyURL(src, proxy, document).then(function (url) {
	                        self.image.src = url;
	                    })['catch'](reject);
	                });
	            }

	            module.exports = ProxyImageContainer;

	        }, { "./proxy": 16 }], 18: [function (_dereq_, module, exports) {
	            var NodeContainer = _dereq_('./nodecontainer');

	            function PseudoElementContainer(node, parent, type) {
	                NodeContainer.call(this, node, parent);
	                this.isPseudoElement = true;
	                this.before = type === ":before";
	            }

	            PseudoElementContainer.prototype.cloneTo = function (stack) {
	                PseudoElementContainer.prototype.cloneTo.call(this, stack);
	                stack.isPseudoElement = true;
	                stack.before = this.before;
	            };

	            PseudoElementContainer.prototype = (0, _create2.default)(NodeContainer.prototype);

	            PseudoElementContainer.prototype.appendToDOM = function () {
	                if (this.before) {
	                    this.parent.node.insertBefore(this.node, this.parent.node.firstChild);
	                } else {
	                    this.parent.node.appendChild(this.node);
	                }
	                this.parent.node.className += " " + this.getHideClass();
	            };

	            PseudoElementContainer.prototype.cleanDOM = function () {
	                this.node.parentNode.removeChild(this.node);
	                this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "");
	            };

	            PseudoElementContainer.prototype.getHideClass = function () {
	                return this["PSEUDO_HIDE_ELEMENT_CLASS_" + (this.before ? "BEFORE" : "AFTER")];
	            };

	            PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before";
	            PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after";

	            module.exports = PseudoElementContainer;

	        }, { "./nodecontainer": 14 }], 19: [function (_dereq_, module, exports) {
	            var log = _dereq_('./log');

	            function Renderer(width, height, images, options, document) {
	                this.width = width;
	                this.height = height;
	                this.images = images;
	                this.options = options;
	                this.document = document;
	            }

	            Renderer.prototype.renderImage = function (container, bounds, borderData, imageContainer) {
	                var paddingLeft = container.cssInt('paddingLeft'),
	                paddingTop = container.cssInt('paddingTop'),
	                paddingRight = container.cssInt('paddingRight'),
	                paddingBottom = container.cssInt('paddingBottom'),
	                borders = borderData.borders;

	                var width = bounds.width - (borders[1].width + borders[3].width + paddingLeft + paddingRight);
	                var height = bounds.height - (borders[0].width + borders[2].width + paddingTop + paddingBottom);
	                this.drawImage(
	                imageContainer,
	                0,
	                0,
	                imageContainer.image.width || width,
	                imageContainer.image.height || height,
	                bounds.left + paddingLeft + borders[3].width,
	                bounds.top + paddingTop + borders[0].width,
	                width,
	                height);

	            };

	            Renderer.prototype.renderBackground = function (container, bounds, borderData) {
	                if (bounds.height > 0 && bounds.width > 0) {
	                    this.renderBackgroundColor(container, bounds);
	                    this.renderBackgroundImage(container, bounds, borderData);
	                }
	            };

	            Renderer.prototype.renderBackgroundColor = function (container, bounds) {
	                var color = container.color("backgroundColor");
	                if (!color.isTransparent()) {
	                    this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, color);
	                }
	            };

	            Renderer.prototype.renderBorders = function (borders) {
	                borders.forEach(this.renderBorder, this);
	            };

	            Renderer.prototype.renderBorder = function (data) {
	                if (!data.color.isTransparent() && data.args !== null) {
	                    this.drawShape(data.args, data.color);
	                }
	            };

	            Renderer.prototype.renderBackgroundImage = function (container, bounds, borderData) {
	                var backgroundImages = container.parseBackgroundImages();
	                backgroundImages.reverse().forEach(function (backgroundImage, index, arr) {
	                    switch (backgroundImage.method) {
	                        case "url":
	                            var image = this.images.get(backgroundImage.args[0]);
	                            if (image) {
	                                this.renderBackgroundRepeating(container, bounds, image, arr.length - (index + 1), borderData);
	                            } else {
	                                log("Error loading background-image", backgroundImage.args[0]);
	                            }
	                            break;
	                        case "linear-gradient":
	                        case "gradient":
	                            var gradientImage = this.images.get(backgroundImage.value);
	                            if (gradientImage) {
	                                this.renderBackgroundGradient(gradientImage, bounds, borderData);
	                            } else {
	                                log("Error loading background-image", backgroundImage.args[0]);
	                            }
	                            break;
	                        case "none":
	                            break;
	                        default:
	                            log("Unknown background-image type", backgroundImage.args[0]);}

	                }, this);
	            };

	            Renderer.prototype.renderBackgroundRepeating = function (container, bounds, imageContainer, index, borderData) {
	                var size = container.parseBackgroundSize(bounds, imageContainer.image, index);
	                var position = container.parseBackgroundPosition(bounds, imageContainer.image, index, size);
	                var repeat = container.parseBackgroundRepeat(index);
	                switch (repeat) {
	                    case "repeat-x":
	                    case "repeat no-repeat":
	                        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + borderData[3], bounds.top + position.top + borderData[0], 99999, size.height, borderData);
	                        break;
	                    case "repeat-y":
	                    case "no-repeat repeat":
	                        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + borderData[0], size.width, 99999, borderData);
	                        break;
	                    case "no-repeat":
	                        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + position.top + borderData[0], size.width, size.height, borderData);
	                        break;
	                    default:
	                        this.renderBackgroundRepeat(imageContainer, position, size, { top: bounds.top, left: bounds.left }, borderData[3], borderData[0]);
	                        break;}

	            };

	            module.exports = Renderer;

	        }, { "./log": 13 }], 20: [function (_dereq_, module, exports) {
	            var Renderer = _dereq_('../renderer');
	            var LinearGradientContainer = _dereq_('../lineargradientcontainer');
	            var log = _dereq_('../log');

	            function CanvasRenderer(width, height) {
	                Renderer.apply(this, arguments);
	                this.canvas = this.options.canvas || this.document.createElement("canvas");
	                if (!this.options.canvas) {
	                    this.canvas.width = width;
	                    this.canvas.height = height;
	                }
	                this.ctx = this.canvas.getContext("2d");
	                this.taintCtx = this.document.createElement("canvas").getContext("2d");
	                this.ctx.textBaseline = "bottom";
	                this.variables = {};
	                log("Initialized CanvasRenderer with size", width, "x", height);
	            }

	            CanvasRenderer.prototype = (0, _create2.default)(Renderer.prototype);

	            CanvasRenderer.prototype.setFillStyle = function (fillStyle) {
	                this.ctx.fillStyle = (typeof fillStyle === "undefined" ? "undefined" : (0, _typeof3.default)(fillStyle)) === "object" && !!fillStyle.isColor ? fillStyle.toString() : fillStyle;
	                return this.ctx;
	            };

	            CanvasRenderer.prototype.rectangle = function (left, top, width, height, color) {
	                this.setFillStyle(color).fillRect(left, top, width, height);
	            };

	            CanvasRenderer.prototype.circle = function (left, top, size, color) {
	                this.setFillStyle(color);
	                this.ctx.beginPath();
	                this.ctx.arc(left + size / 2, top + size / 2, size / 2, 0, Math.PI * 2, true);
	                this.ctx.closePath();
	                this.ctx.fill();
	            };

	            CanvasRenderer.prototype.circleStroke = function (left, top, size, color, stroke, strokeColor) {
	                this.circle(left, top, size, color);
	                this.ctx.strokeStyle = strokeColor.toString();
	                this.ctx.stroke();
	            };

	            CanvasRenderer.prototype.drawShape = function (shape, color) {
	                this.shape(shape);
	                this.setFillStyle(color).fill();
	            };

	            CanvasRenderer.prototype.taints = function (imageContainer) {
	                if (imageContainer.tainted === null) {
	                    this.taintCtx.drawImage(imageContainer.image, 0, 0);
	                    try {
	                        this.taintCtx.getImageData(0, 0, 1, 1);
	                        imageContainer.tainted = false;
	                    } catch (e) {
	                        this.taintCtx = document.createElement("canvas").getContext("2d");
	                        imageContainer.tainted = true;
	                    }
	                }

	                return imageContainer.tainted;
	            };

	            CanvasRenderer.prototype.drawImage = function (imageContainer, sx, sy, sw, sh, dx, dy, dw, dh) {
	                if (!this.taints(imageContainer) || this.options.allowTaint) {
	                    // debugger;
	                    this.ctx.drawImage(imageContainer.image, sx, sy, sw, sh, dx, dy, dw, dh);
	                }
	            };

	            CanvasRenderer.prototype.clip = function (shapes, callback, context) {
	                this.ctx.save();
	                shapes.filter(hasEntries).forEach(function (shape) {
	                    this.shape(shape).clip();
	                }, this);
	                callback.call(context);
	                this.ctx.restore();
	            };

	            CanvasRenderer.prototype.shape = function (shape) {
	                this.ctx.beginPath();
	                shape.forEach(function (point, index) {
	                    if (point[0] === "rect") {
	                        this.ctx.rect.apply(this.ctx, point.slice(1));
	                    } else {
	                        this.ctx[index === 0 ? "moveTo" : point[0] + "To"].apply(this.ctx, point.slice(1));
	                    }
	                }, this);
	                this.ctx.closePath();
	                return this.ctx;
	            };

	            CanvasRenderer.prototype.font = function (color, style, variant, weight, size, family) {
	                this.setFillStyle(color).font = [style, variant, weight, size, family].join(" ").split(",")[0];
	            };

	            CanvasRenderer.prototype.fontShadow = function (color, offsetX, offsetY, blur) {
	                this.setVariable("shadowColor", color.toString()).
	                setVariable("shadowOffsetY", offsetX).
	                setVariable("shadowOffsetX", offsetY).
	                setVariable("shadowBlur", blur);
	            };

	            CanvasRenderer.prototype.clearShadow = function () {
	                this.setVariable("shadowColor", "rgba(0,0,0,0)");
	            };

	            CanvasRenderer.prototype.setOpacity = function (opacity) {
	                this.ctx.globalAlpha = opacity;
	            };

	            CanvasRenderer.prototype.setTransform = function (transform) {
	                this.ctx.translate(transform.origin[0], transform.origin[1]);
	                this.ctx.transform.apply(this.ctx, transform.matrix);
	                this.ctx.translate(-transform.origin[0], -transform.origin[1]);
	            };

	            CanvasRenderer.prototype.setVariable = function (property, value) {
	                if (this.variables[property] !== value) {
	                    this.variables[property] = this.ctx[property] = value;
	                }

	                return this;
	            };

	            CanvasRenderer.prototype.text = function (text, left, bottom) {
	                this.ctx.fillText(text, left, bottom);
	            };

	            CanvasRenderer.prototype.backgroundRepeatShape = function (imageContainer, backgroundPosition, size, bounds, left, top, width, height, borderData) {
	                var shape = [
	                ["line", Math.round(left), Math.round(top)],
	                ["line", Math.round(left + width), Math.round(top)],
	                ["line", Math.round(left + width), Math.round(height + top)],
	                ["line", Math.round(left), Math.round(height + top)]];

	                this.clip([shape], function () {
	                    this.renderBackgroundRepeat(imageContainer, backgroundPosition, size, bounds, borderData[3], borderData[0]);
	                }, this);
	            };

	            CanvasRenderer.prototype.renderBackgroundRepeat = function (imageContainer, backgroundPosition, size, bounds, borderLeft, borderTop) {
	                var offsetX = Math.round(bounds.left + backgroundPosition.left + borderLeft),offsetY = Math.round(bounds.top + backgroundPosition.top + borderTop);
	                this.setFillStyle(this.ctx.createPattern(this.resizeImage(imageContainer, size), "repeat"));
	                this.ctx.translate(offsetX, offsetY);
	                this.ctx.fill();
	                this.ctx.translate(-offsetX, -offsetY);
	            };

	            CanvasRenderer.prototype.renderBackgroundGradient = function (gradientImage, bounds) {
	                if (gradientImage instanceof LinearGradientContainer) {
	                    var gradient = this.ctx.createLinearGradient(
	                    bounds.left + bounds.width * gradientImage.x0,
	                    bounds.top + bounds.height * gradientImage.y0,
	                    bounds.left + bounds.width * gradientImage.x1,
	                    bounds.top + bounds.height * gradientImage.y1);
	                    gradientImage.colorStops.forEach(function (colorStop) {
	                        gradient.addColorStop(colorStop.stop, colorStop.color.toString());
	                    });
	                    this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, gradient);
	                }
	            };

	            CanvasRenderer.prototype.resizeImage = function (imageContainer, size) {
	                var image = imageContainer.image;
	                if (image.width === size.width && image.height === size.height) {
	                    return image;
	                }

	                var ctx,canvas = document.createElement('canvas');
	                canvas.width = size.width;
	                canvas.height = size.height;
	                ctx = canvas.getContext("2d");
	                ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, size.width, size.height);
	                return canvas;
	            };

	            function hasEntries(array) {
	                return array.length > 0;
	            }

	            module.exports = CanvasRenderer;

	        }, { "../lineargradientcontainer": 12, "../log": 13, "../renderer": 19 }], 21: [function (_dereq_, module, exports) {
	            var NodeContainer = _dereq_('./nodecontainer');

	            function StackingContext(hasOwnStacking, opacity, element, parent) {
	                NodeContainer.call(this, element, parent);
	                this.ownStacking = hasOwnStacking;
	                this.contexts = [];
	                this.children = [];
	                this.opacity = (this.parent ? this.parent.stack.opacity : 1) * opacity;
	            }

	            StackingContext.prototype = (0, _create2.default)(NodeContainer.prototype);

	            StackingContext.prototype.getParentStack = function (context) {
	                var parentStack = this.parent ? this.parent.stack : null;
	                return parentStack ? parentStack.ownStacking ? parentStack : parentStack.getParentStack(context) : context.stack;
	            };

	            module.exports = StackingContext;

	        }, { "./nodecontainer": 14 }], 22: [function (_dereq_, module, exports) {
	            function Support(document) {
	                this.rangeBounds = this.testRangeBounds(document);
	                this.cors = this.testCORS();
	                this.svg = this.testSVG();
	            }

	            Support.prototype.testRangeBounds = function (document) {
	                var range,testElement,rangeBounds,rangeHeight,support = false;

	                if (document.createRange) {
	                    range = document.createRange();
	                    if (range.getBoundingClientRect) {
	                        testElement = document.createElement('boundtest');
	                        testElement.style.height = "123px";
	                        testElement.style.display = "block";
	                        document.body.appendChild(testElement);

	                        range.selectNode(testElement);
	                        rangeBounds = range.getBoundingClientRect();
	                        rangeHeight = rangeBounds.height;

	                        if (rangeHeight === 123) {
	                            support = true;
	                        }
	                        document.body.removeChild(testElement);
	                    }
	                }

	                return support;
	            };

	            Support.prototype.testCORS = function () {
	                return typeof new Image().crossOrigin !== "undefined";
	            };

	            Support.prototype.testSVG = function () {
	                var img = new Image();
	                var canvas = document.createElement("canvas");
	                var ctx = canvas.getContext("2d");
	                img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";

	                try {
	                    ctx.drawImage(img, 0, 0);
	                    canvas.toDataURL();
	                } catch (e) {
	                    return false;
	                }
	                return true;
	            };

	            module.exports = Support;

	        }, {}], 23: [function (_dereq_, module, exports) {
	            var XHR = _dereq_('./xhr');
	            var decode64 = _dereq_('./utils').decode64;

	            function SVGContainer(src) {
	                this.src = src;
	                this.image = null;
	                var self = this;

	                this.promise = this.hasFabric().then(function () {
	                    return self.isInline(src) ? _promise2.default.resolve(self.inlineFormatting(src)) : XHR(src);
	                }).then(function (svg) {
	                    return new _promise2.default(function (resolve) {
	                        window.html2canvas.svg.fabric.loadSVGFromString(svg, self.createCanvas.call(self, resolve));
	                    });
	                });
	            }

	            SVGContainer.prototype.hasFabric = function () {
	                return !window.html2canvas.svg || !window.html2canvas.svg.fabric ? _promise2.default.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg")) : _promise2.default.resolve();
	            };

	            SVGContainer.prototype.inlineFormatting = function (src) {
	                return (/^data:image\/svg\+xml;base64,/.test(src) ? this.decode64(this.removeContentType(src)) : this.removeContentType(src));
	            };

	            SVGContainer.prototype.removeContentType = function (src) {
	                return src.replace(/^data:image\/svg\+xml(;base64)?,/, '');
	            };

	            SVGContainer.prototype.isInline = function (src) {
	                return (/^data:image\/svg\+xml/i.test(src));
	            };

	            SVGContainer.prototype.createCanvas = function (resolve) {
	                var self = this;
	                return function (objects, options) {
	                    var canvas = new window.html2canvas.svg.fabric.StaticCanvas('c');
	                    self.image = canvas.lowerCanvasEl;
	                    canvas.
	                    setWidth(options.width).
	                    setHeight(options.height).
	                    add(window.html2canvas.svg.fabric.util.groupSVGElements(objects, options)).
	                    renderAll();
	                    resolve(canvas.lowerCanvasEl);
	                };
	            };

	            SVGContainer.prototype.decode64 = function (str) {
	                return typeof window.atob === "function" ? window.atob(str) : decode64(str);
	            };

	            module.exports = SVGContainer;

	        }, { "./utils": 26, "./xhr": 28 }], 24: [function (_dereq_, module, exports) {
	            var SVGContainer = _dereq_('./svgcontainer');

	            function SVGNodeContainer(node, _native) {
	                this.src = node;
	                this.image = null;
	                var self = this;

	                this.promise = _native ? new _promise2.default(function (resolve, reject) {
	                    self.image = new Image();
	                    self.image.onload = resolve;
	                    self.image.onerror = reject;
	                    self.image.src = "data:image/svg+xml," + new XMLSerializer().serializeToString(node);
	                    if (self.image.complete === true) {
	                        resolve(self.image);
	                    }
	                }) : this.hasFabric().then(function () {
	                    return new _promise2.default(function (resolve) {
	                        window.html2canvas.svg.fabric.parseSVGDocument(node, self.createCanvas.call(self, resolve));
	                    });
	                });
	            }

	            SVGNodeContainer.prototype = (0, _create2.default)(SVGContainer.prototype);

	            module.exports = SVGNodeContainer;

	        }, { "./svgcontainer": 23 }], 25: [function (_dereq_, module, exports) {
	            var NodeContainer = _dereq_('./nodecontainer');

	            function TextContainer(node, parent) {
	                NodeContainer.call(this, node, parent);
	            }

	            TextContainer.prototype = (0, _create2.default)(NodeContainer.prototype);

	            TextContainer.prototype.applyTextTransform = function () {
	                this.node.data = this.transform(this.parent.css("textTransform"));
	            };

	            TextContainer.prototype.transform = function (transform) {
	                var text = this.node.data;
	                switch (transform) {
	                    case "lowercase":
	                        return text.toLowerCase();
	                    case "capitalize":
	                        return text.replace(/(^|\s|:|-|\(|\))([a-z])/g, capitalize);
	                    case "uppercase":
	                        return text.toUpperCase();
	                    default:
	                        return text;}

	            };

	            function capitalize(m, p1, p2) {
	                if (m.length > 0) {
	                    return p1 + p2.toUpperCase();
	                }
	            }

	            module.exports = TextContainer;

	        }, { "./nodecontainer": 14 }], 26: [function (_dereq_, module, exports) {
	            exports.smallImage = function smallImage() {
	                return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
	            };

	            exports.bind = function (callback, context) {
	                return function () {
	                    return callback.apply(context, arguments);
	                };
	            };

	            /*
	                * base64-arraybuffer
	                * https://github.com/niklasvh/base64-arraybuffer
	                *
	                * Copyright (c) 2012 Niklas von Hertzen
	                * Licensed under the MIT license.
	                */

	            exports.decode64 = function (base64) {
	                var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	                var len = base64.length,i,encoded1,encoded2,encoded3,encoded4,byte1,byte2,byte3;

	                var output = "";

	                for (i = 0; i < len; i += 4) {
	                    encoded1 = chars.indexOf(base64[i]);
	                    encoded2 = chars.indexOf(base64[i + 1]);
	                    encoded3 = chars.indexOf(base64[i + 2]);
	                    encoded4 = chars.indexOf(base64[i + 3]);

	                    byte1 = encoded1 << 2 | encoded2 >> 4;
	                    byte2 = (encoded2 & 15) << 4 | encoded3 >> 2;
	                    byte3 = (encoded3 & 3) << 6 | encoded4;
	                    if (encoded3 === 64) {
	                        output += String.fromCharCode(byte1);
	                    } else if (encoded4 === 64 || encoded4 === -1) {
	                        output += String.fromCharCode(byte1, byte2);
	                    } else {
	                        output += String.fromCharCode(byte1, byte2, byte3);
	                    }
	                }

	                return output;
	            };

	            exports.getBounds = function (node) {
	                if (node.getBoundingClientRect) {
	                    var clientRect = node.getBoundingClientRect();
	                    var width = node.offsetWidth == null ? clientRect.width : node.offsetWidth;
	                    return {
	                        top: clientRect.top,
	                        bottom: clientRect.bottom || clientRect.top + clientRect.height,
	                        right: clientRect.left + width,
	                        left: clientRect.left,
	                        width: width,
	                        height: node.offsetHeight == null ? clientRect.height : node.offsetHeight };

	                }
	                return {};
	            };

	            exports.offsetBounds = function (node) {
	                var parent = node.offsetParent ? exports.offsetBounds(node.offsetParent) : { top: 0, left: 0 };

	                return {
	                    top: node.offsetTop + parent.top,
	                    bottom: node.offsetTop + node.offsetHeight + parent.top,
	                    right: node.offsetLeft + parent.left + node.offsetWidth,
	                    left: node.offsetLeft + parent.left,
	                    width: node.offsetWidth,
	                    height: node.offsetHeight };

	            };

	            exports.parseBackgrounds = function (backgroundImage) {
	                var whitespace = ' \r\n\t',
	                method,definition,prefix,prefix_i,block,results = [],
	                mode = 0,numParen = 0,quote,args;
	                var appendResult = function appendResult() {
	                    if (method) {
	                        if (definition.substr(0, 1) === '"') {
	                            definition = definition.substr(1, definition.length - 2);
	                        }
	                        if (definition) {
	                            args.push(definition);
	                        }
	                        if (method.substr(0, 1) === '-' && (prefix_i = method.indexOf('-', 1) + 1) > 0) {
	                            prefix = method.substr(0, prefix_i);
	                            method = method.substr(prefix_i);
	                        }
	                        results.push({
	                            prefix: prefix,
	                            method: method.toLowerCase(),
	                            value: block,
	                            args: args,
	                            image: null });

	                    }
	                    args = [];
	                    method = prefix = definition = block = '';
	                };
	                args = [];
	                method = prefix = definition = block = '';
	                backgroundImage.split("").forEach(function (c) {
	                    if (mode === 0 && whitespace.indexOf(c) > -1) {
	                        return;
	                    }
	                    switch (c) {
	                        case '"':
	                            if (!quote) {
	                                quote = c;
	                            } else if (quote === c) {
	                                quote = null;
	                            }
	                            break;
	                        case '(':
	                            if (quote) {
	                                break;
	                            } else if (mode === 0) {
	                                mode = 1;
	                                block += c;
	                                return;
	                            } else {
	                                numParen++;
	                            }
	                            break;
	                        case ')':
	                            if (quote) {
	                                break;
	                            } else if (mode === 1) {
	                                if (numParen === 0) {
	                                    mode = 0;
	                                    block += c;
	                                    appendResult();
	                                    return;
	                                } else {
	                                    numParen--;
	                                }
	                            }
	                            break;

	                        case ',':
	                            if (quote) {
	                                break;
	                            } else if (mode === 0) {
	                                appendResult();
	                                return;
	                            } else if (mode === 1) {
	                                if (numParen === 0 && !method.match(/^url$/i)) {
	                                    args.push(definition);
	                                    definition = '';
	                                    block += c;
	                                    return;
	                                }
	                            }
	                            break;}


	                    block += c;
	                    if (mode === 0) {
	                        method += c;
	                    } else {
	                        definition += c;
	                    }
	                });

	                appendResult();
	                return results;
	            };

	        }, {}], 27: [function (_dereq_, module, exports) {
	            var GradientContainer = _dereq_('./gradientcontainer');

	            function WebkitGradientContainer(imageData) {
	                GradientContainer.apply(this, arguments);
	                this.type = imageData.args[0] === "linear" ? GradientContainer.TYPES.LINEAR : GradientContainer.TYPES.RADIAL;
	            }

	            WebkitGradientContainer.prototype = (0, _create2.default)(GradientContainer.prototype);

	            module.exports = WebkitGradientContainer;

	        }, { "./gradientcontainer": 9 }], 28: [function (_dereq_, module, exports) {
	            function XHR(url) {
	                return new _promise2.default(function (resolve, reject) {
	                    var xhr = new XMLHttpRequest();
	                    xhr.open('GET', url);

	                    xhr.onload = function () {
	                        if (xhr.status === 200) {
	                            resolve(xhr.responseText);
	                        } else {
	                            reject(new Error(xhr.statusText));
	                        }
	                    };

	                    xhr.onerror = function () {
	                        reject(new Error("Network Error"));
	                    };

	                    xhr.send();
	                });
	            }

	            module.exports = XHR;

	        }, {}] }, {}, [4])(4);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(280), __esModule: true };

/***/ }),
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(58);
	__webpack_require__(53);
	__webpack_require__(59);
	__webpack_require__(289);
	__webpack_require__(290);
	__webpack_require__(291);
	module.exports = __webpack_require__(3).Promise;


/***/ }),
/* 281 */,
/* 282 */
/***/ (function(module, exports) {

	module.exports = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

	var ctx = __webpack_require__(40);
	var call = __webpack_require__(123);
	var isArrayIter = __webpack_require__(122);
	var anObject = __webpack_require__(14);
	var toLength = __webpack_require__(52);
	var getIterFn = __webpack_require__(126);
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
	  var f = ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = call(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(1);
	var macrotask = __webpack_require__(143).set;
	var Observer = global.MutationObserver || global.WebKitMutationObserver;
	var process = global.process;
	var Promise = global.Promise;
	var isNode = __webpack_require__(39)(process) == 'process';

	module.exports = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function () {
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if (Observer) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise && Promise.resolve) {
	    var promise = Promise.resolve();
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(9);
	module.exports = function (target, src, safe) {
	  for (var key in src) {
	    if (safe && target[key]) target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var global = __webpack_require__(1);
	var core = __webpack_require__(3);
	var dP = __webpack_require__(7);
	var DESCRIPTORS = __webpack_require__(8);
	var SPECIES = __webpack_require__(4)('species');

	module.exports = function (KEY) {
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};


/***/ }),
/* 287 */,
/* 288 */,
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(28);
	var global = __webpack_require__(1);
	var ctx = __webpack_require__(40);
	var classof = __webpack_require__(108);
	var $export = __webpack_require__(13);
	var isObject = __webpack_require__(15);
	var aFunction = __webpack_require__(50);
	var anInstance = __webpack_require__(282);
	var forOf = __webpack_require__(283);
	var speciesConstructor = __webpack_require__(194);
	var task = __webpack_require__(143).set;
	var microtask = __webpack_require__(284)();
	var newPromiseCapabilityModule = __webpack_require__(166);
	var perform = __webpack_require__(192);
	var promiseResolve = __webpack_require__(193);
	var PROMISE = 'Promise';
	var TypeError = global.TypeError;
	var process = global.process;
	var $Promise = global[PROMISE];
	var isNode = classof(process) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[__webpack_require__(4)('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value);
	            if (domain) domain.exit();
	          }
	          if (result === reaction.promise) {
	            reject(TypeError('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(global, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = perform(function () {
	        if (isNode) {
	          process.emit('unhandledRejection', value, promise);
	        } else if (handler = global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  if (promise._h == 1) return false;
	  var chain = promise._a || promise._c;
	  var i = 0;
	  var reaction;
	  while (chain.length > i) {
	    reaction = chain[i++];
	    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
	  } return true;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(global, function () {
	    var handler;
	    if (isNode) {
	      process.emit('rejectionHandled', promise);
	    } else if (handler = global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(285)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject = ctx($reject, promise, 1);
	  };
	  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
	__webpack_require__(29)($Promise, PROMISE);
	__webpack_require__(286)(PROMISE);
	Wrapper = __webpack_require__(3)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(124)(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-promise-finally
	'use strict';
	var $export = __webpack_require__(13);
	var core = __webpack_require__(3);
	var global = __webpack_require__(1);
	var speciesConstructor = __webpack_require__(194);
	var promiseResolve = __webpack_require__(193);

	$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
	  var C = speciesConstructor(this, core.Promise || global.Promise);
	  var isFunction = typeof onFinally == 'function';
	  return this.then(
	    isFunction ? function (x) {
	      return promiseResolve(C, onFinally()).then(function () { return x; });
	    } : onFinally,
	    isFunction ? function (e) {
	      return promiseResolve(C, onFinally()).then(function () { throw e; });
	    } : onFinally
	  );
	} });


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-promise-try
	var $export = __webpack_require__(13);
	var newPromiseCapability = __webpack_require__(166);
	var perform = __webpack_require__(192);

	$export($export.S, 'Promise', { 'try': function (callbackfn) {
	  var promiseCapability = newPromiseCapability.f(this);
	  var result = perform(callbackfn);
	  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
	  return promiseCapability.promise;
	} });


/***/ })
/******/ ]);