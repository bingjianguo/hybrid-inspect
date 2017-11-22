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

	'use strict';__webpack_require__(251);
	var _vorlon = __webpack_require__(182);
	var _vorlon2 = __webpack_require__(94);
	var _vorlon3 = __webpack_require__(181);
	var _vorlon4 = __webpack_require__(136);
	var _vorlon5 = __webpack_require__(238);
	var _vorlon6 = __webpack_require__(239);
	var _vorlon7 = __webpack_require__(180);
	var _vorlon8 = __webpack_require__(109);
	__webpack_require__(240);
	window.VORLON = {
	    Tools: _vorlon.Tools,
	    FluentDOM: _vorlon.FluentDOM,
	    PluginType: _vorlon2.PluginType,
	    RuntimeSide: _vorlon2.RuntimeSide,
	    Connection: _vorlon3.Connection,
	    BasePlugin: _vorlon4.BasePlugin,
	    ClientPlugin: _vorlon5.ClientPlugin,
	    DashboardPlugin: _vorlon6.DashboardPlugin,
	    ClientMessenger: _vorlon7.ClientMessenger,
	    Core: _vorlon8.Core,
	    _Core: _vorlon8._Core };

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.5.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var store = __webpack_require__(34)('wks');
	var uid = __webpack_require__(22);
	var Symbol = __webpack_require__(2).Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(59);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(58);

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
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(14);
	var IE8_DOM_DEFINE = __webpack_require__(43);
	var toPrimitive = __webpack_require__(36);
	var dP = Object.defineProperty;

	exports.f = __webpack_require__(10) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(19)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(9);
	var createDesc = __webpack_require__(21);
	module.exports = __webpack_require__(10) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(50);
	var defined = __webpack_require__(28);
	module.exports = function (it) {
	  return IObject(defined(it));
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2);
	var core = __webpack_require__(4);
	var ctx = __webpack_require__(40);
	var hide = __webpack_require__(11);
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
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


/***/ }),
/* 20 */
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
/* 21 */
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
/* 22 */
/***/ (function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


/***/ }),
/* 23 */,
/* 24 */
/***/ (function(module, exports) {

	module.exports = {};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(47);
	var enumBugKeys = __webpack_require__(29);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

	exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(61);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(60);

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
	var anObject = __webpack_require__(14);
	var dPs = __webpack_require__(74);
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

	var def = __webpack_require__(9).f;
	var has = __webpack_require__(5);
	var TAG = __webpack_require__(6)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(34)('keys');
	var uid = __webpack_require__(22);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2);
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

	var global = __webpack_require__(2);
	var core = __webpack_require__(4);
	var LIBRARY = __webpack_require__(30);
	var wksExt = __webpack_require__(38);
	var defineProperty = __webpack_require__(9).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(6);


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
	var aFunction = __webpack_require__(66);
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
	var document = __webpack_require__(2).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(10) && !__webpack_require__(19)(function () {
	  return Object.defineProperty(__webpack_require__(42)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(30);
	var $export = __webpack_require__(13);
	var redefine = __webpack_require__(48);
	var hide = __webpack_require__(11);
	var has = __webpack_require__(5);
	var Iterators = __webpack_require__(24);
	var $iterCreate = __webpack_require__(71);
	var setToStringTag = __webpack_require__(32);
	var getPrototypeOf = __webpack_require__(55);
	var ITERATOR = __webpack_require__(6)('iterator');
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
	var createDesc = __webpack_require__(21);
	var toIObject = __webpack_require__(12);
	var toPrimitive = __webpack_require__(36);
	var has = __webpack_require__(5);
	var IE8_DOM_DEFINE = __webpack_require__(43);
	var gOPD = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(10) ? gOPD : function getOwnPropertyDescriptor(O, P) {
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

	var has = __webpack_require__(5);
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

	module.exports = __webpack_require__(11);


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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	var document = __webpack_require__(2).document;
	module.exports = document && document.documentElement;


/***/ }),
/* 54 */
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
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(5);
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
/* 56 */,
/* 57 */,
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

	module.exports = { "default": __webpack_require__(64), __esModule: true };

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(79);
	var $Object = __webpack_require__(4).Object;
	module.exports = function create(P, D) {
	  return $Object.create(P, D);
	};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(80);
	module.exports = __webpack_require__(4).Object.setPrototypeOf;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(82);
	__webpack_require__(81);
	__webpack_require__(83);
	__webpack_require__(84);
	module.exports = __webpack_require__(4).Symbol;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(52);
	__webpack_require__(85);
	module.exports = __webpack_require__(38).f('iterator');


/***/ }),
/* 66 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


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
	var toLength = __webpack_require__(51);
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
	var getKeys = __webpack_require__(25);
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
	var create = __webpack_require__(31);
	var descriptor = __webpack_require__(21);
	var setToStringTag = __webpack_require__(32);
	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(11)(IteratorPrototype, __webpack_require__(6)('iterator'), function () { return this; });

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

	var META = __webpack_require__(22)('meta');
	var isObject = __webpack_require__(15);
	var has = __webpack_require__(5);
	var setDesc = __webpack_require__(9).f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(19)(function () {
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

	var dP = __webpack_require__(9);
	var anObject = __webpack_require__(14);
	var getKeys = __webpack_require__(25);

	module.exports = __webpack_require__(10) ? Object.defineProperties : function defineProperties(O, Properties) {
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
	var Iterators = __webpack_require__(24);
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
	$export($export.S, 'Object', { create: __webpack_require__(31) });


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(13);
	$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(75).set });


/***/ }),
/* 81 */
/***/ (function(module, exports) {

	

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global = __webpack_require__(2);
	var has = __webpack_require__(5);
	var DESCRIPTORS = __webpack_require__(10);
	var $export = __webpack_require__(13);
	var redefine = __webpack_require__(48);
	var META = __webpack_require__(73).KEY;
	var $fails = __webpack_require__(19);
	var shared = __webpack_require__(34);
	var setToStringTag = __webpack_require__(32);
	var uid = __webpack_require__(22);
	var wks = __webpack_require__(6);
	var wksExt = __webpack_require__(38);
	var wksDefine = __webpack_require__(37);
	var enumKeys = __webpack_require__(69);
	var isArray = __webpack_require__(70);
	var anObject = __webpack_require__(14);
	var toIObject = __webpack_require__(12);
	var toPrimitive = __webpack_require__(36);
	var createDesc = __webpack_require__(21);
	var _create = __webpack_require__(31);
	var gOPNExt = __webpack_require__(54);
	var $GOPD = __webpack_require__(45);
	var $DP = __webpack_require__(9);
	var $keys = __webpack_require__(25);
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
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(37)('asyncIterator');


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(37)('observable');


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(78);
	var global = __webpack_require__(2);
	var hide = __webpack_require__(11);
	var Iterators = __webpack_require__(24);
	var TO_STRING_TAG = __webpack_require__(6)('toStringTag');

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
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(111), __esModule: true };

/***/ }),
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */
/***/ (function(module, exports) {

	"use strict";Object.defineProperty(exports, "__esModule", { value: true });var RuntimeSide = exports.RuntimeSide = undefined;
	(function (RuntimeSide) {
	    RuntimeSide[RuntimeSide["Client"] = 0] = "Client";
	    RuntimeSide[RuntimeSide["Dashboard"] = 1] = "Dashboard";
	    RuntimeSide[RuntimeSide["Both"] = 2] = "Both";
	})(RuntimeSide || (exports.RuntimeSide = RuntimeSide = {}));
	var PluginType = exports.PluginType = undefined;
	(function (PluginType) {
	    PluginType[PluginType["OneOne"] = 0] = "OneOne";
	    PluginType[PluginType["MulticastReceiveOnly"] = 1] = "MulticastReceiveOnly";
	    PluginType[PluginType["Multicast"] = 2] = "Multicast";
	})(PluginType || (exports.PluginType = PluginType = {}));

/***/ }),
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
/* 108 */,
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.Core = exports._Core = undefined;var _stringify = __webpack_require__(121);var _stringify2 = _interopRequireDefault(_stringify);var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = __webpack_require__(20);var _createClass3 = _interopRequireDefault(_createClass2);var _vorlon = __webpack_require__(180);
	var _vorlon2 = __webpack_require__(94);
	var _vorlon3 = __webpack_require__(182);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var
	_Core = exports._Core = function () {
	    function _Core() {(0, _classCallCheck3.default)(this, _Core);
	        this._clientPlugins = new Array();
	        this._dashboardPlugins = new Array();
	        this._socketIOWaitCount = 0;
	        this.debug = false;
	        this._RetryTimeout = 1002;
	        this._isHttpsEnabled = false;
	    }_Core.prototype.












	    RegisterClientPlugin = function RegisterClientPlugin(plugin) {
	        Core._clientPlugins.push(plugin);
	    };_Core.prototype.
	    RegisterDashboardPlugin = function RegisterDashboardPlugin(plugin) {
	        Core._dashboardPlugins.push(plugin);
	    };_Core.prototype.
	    StopListening = function StopListening() {
	        if (Core._messenger) {
	            Core._messenger.stopListening();
	            delete Core._messenger;
	        }
	    };_Core.prototype.
	    StartClientSide = function StartClientSide() {var serverUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "'http://localhost:1337/'";var _this = this;var sessionId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";var listenClientId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
	        Core._side = _vorlon2.RuntimeSide.Client;
	        Core._sessionID = sessionId;
	        Core._listenClientId = listenClientId;
	        if (serverUrl[serverUrl.length - 1] === '/') {
	            serverUrl = serverUrl.slice(0, -1);
	        }
	        if (serverUrl.match("$https://")) {
	            Core._isHttpsEnabled = true;
	        }
	        // Checking socket.io
	        if (_vorlon3.Tools.IsWindowAvailable && window.io === undefined) {
	            if (this._socketIOWaitCount < 10) {
	                this._socketIOWaitCount++;
	                // Let's wait a bit just in case socket.io was loaded asynchronously
	                setTimeout(function () {
	                    console.log("Vorlon.js: waiting for socket.io to load...");
	                    Core.StartClientSide(serverUrl, sessionId, listenClientId);
	                }, 1000);
	            } else
	            {
	                console.log("Vorlon.js: please load socket.io before referencing vorlon.js or use includeSocketIO = true in your catalog.json file.");
	                Core.ShowError("Vorlon.js: please load socket.io before referencing vorlon.js or use includeSocketIO = true in your catalog.json file.", 0);
	            }
	            return;
	        }
	        // Cookie
	        var clientId;
	        if (_vorlon3.Tools.IsWindowAvailable) {
	            clientId = _vorlon3.Tools.ReadCookie("vorlonJS_clientId");
	            if (!clientId) {
	                clientId = _vorlon3.Tools.CreateGUID();
	                _vorlon3.Tools.CreateCookie("vorlonJS_clientId", clientId, 1);
	            }
	        } else
	        {
	            clientId = _vorlon3.Tools.CreateGUID();
	        }
	        // Creating the messenger
	        if (Core._messenger) {
	            Core._messenger.stopListening();
	            delete Core._messenger;
	        }
	        Core._messenger = new _vorlon.ClientMessenger(Core._side, serverUrl, sessionId, clientId, listenClientId);
	        // Connect messenger to dispatcher
	        Core.Messenger.onRealtimeMessageReceived = Core._Dispatch;
	        Core.Messenger.onHeloReceived = Core._OnIdentificationReceived;
	        Core.Messenger.onIdentifyReceived = Core._OnIdentifyReceived;
	        Core.Messenger.onStopListenReceived = Core._OnStopListenReceived;
	        Core.Messenger.onError = Core._OnError;
	        Core.Messenger.onReload = Core._OnReloadClient;
	        this.sendHelo();
	        // 发送心跳消息
	        this.sendHeart();
	        // Launch plugins
	        for (var index = 0; index < Core._clientPlugins.length; index++) {
	            var plugin = Core._clientPlugins[index];
	            plugin.startClientSide();
	        }
	        // Handle client disconnect
	        if (_vorlon3.Tools.IsWindowAvailable) {
	            window.addEventListener("beforeunload", function () {
	                Core.Messenger.sendRealtimeMessage("", { socketid: Core.Messenger.socketId }, Core._side, "clientclosed");
	            }, false);
	        } else
	        {var


	            exitHandler = function exitHandler(options, err) {
	                if (!exitMessageWritten) {
	                    Core.Messenger.sendRealtimeMessage("", { socketid: Core.Messenger.socketId }, Core._side, "clientclosed");
	                    console.log('Disconnected from Vorlon.js instance');
	                    exitMessageWritten = true;
	                }
	                process.exit(0);
	            };
	            //do something when app is closing
	            process.stdin.resume(); //so the program will not close instantly
	            var exitMessageWritten = false;process.on('exit', exitHandler.bind(null, { cleanup: true })); //catches ctrl+c event
	            process.on('SIGINT', exitHandler.bind(null, { exit: true }));
	            //catches uncaught exceptions
	            process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
	        }
	        // Start global dirty check, at this point document is not ready,
	        // little timeout to defer starting dirtycheck
	        setTimeout(function () {
	            _this.startClientDirtyCheck();
	        }, 500);
	    };_Core.prototype.
	    sendHeart = function sendHeart() {
	        var loopSend = function loopSend() {
	            setTimeout(function () {
	                Core.Messenger.sendRealtimeMessage("", {}, Core._side, "heart");
	                loopSend();
	            }, 5000);
	        };
	        loopSend();
	    };_Core.prototype.
	    sendHelo = function sendHelo() {
	        // Say 'helo'
	        var heloMessage = void 0;
	        var titleNodes = document.getElementsByTagName('title');
	        var title = '';
	        var titleNode = void 0;
	        if (titleNodes.length > 0 && (titleNode = titleNodes[0])) {
	            if (titleNode.text) {
	                title = titleNode.text;
	            }
	        } else
	        if (window.vorlonTitle) {
	            title = window.vorlonTitle;
	        } else
	        {
	            title = '-NoTitle-';
	        }
	        // title的值在js脚本执行的时候还没有被渲染
	        if (_vorlon3.Tools.IsWindowAvailable) {
	            heloMessage = {
	                title: title,
	                url: location.href,
	                ua: navigator.userAgent,
	                identity: sessionStorage["vorlonClientIdentity"] || localStorage["vorlonClientIdentity"] };

	        } else
	        {
	            heloMessage = {
	                ua: "Node.js",
	                identity: "",
	                noWindow: true,
	                url: location.href,
	                title: title };

	        }
	        Core.Messenger.sendRealtimeMessage("", heloMessage, Core._side, "helo");
	    };_Core.prototype.
	    startClientDirtyCheck = function startClientDirtyCheck() {var _this2 = this;
	        //sometimes refresh is called before document was loaded
	        if (_vorlon3.Tools.IsWindowAvailable && !document.body) {
	            setTimeout(function () {
	                _this2.startClientDirtyCheck();
	            }, 200);
	            return;
	        }
	        var mutationObserver = _vorlon3.Tools.IsWindowAvailable && (window.MutationObserver || window.WebKitMutationObserver);
	        if (mutationObserver) {
	            if (!document.body.__vorlon)
	            document.body.__vorlon = {};
	            var config = { attributes: true, childList: true, subtree: true, characterData: true };
	            document.body.__vorlon._observerMutationObserver = new mutationObserver(function (mutations) {
	                var sended = false;
	                var cancelSend = false;
	                var sendComandId = [];
	                mutations.forEach(function (mutation) {
	                    if (cancelSend) {
	                        for (var i = 0; i < sendComandId.length; i++) {
	                            clearTimeout(sendComandId[i]);
	                        }
	                        cancelSend = false;
	                    }
	                    if (mutation.target && mutation.target.__vorlon && mutation.target.__vorlon.ignore) {
	                        cancelSend = true;
	                        return;
	                    }
	                    if (mutation.previousSibling && mutation.previousSibling.__vorlon && mutation.previousSibling.__vorlon.ignore) {
	                        cancelSend = true;
	                        return;
	                    }
	                    if (mutation.target && !sended && mutation.target.__vorlon && mutation.target.parentNode && mutation.target.parentNode.__vorlon && mutation.target.parentNode.__vorlon.internalId) {
	                        sendComandId.push(setTimeout(function () {
	                            var internalId = null;
	                            if (mutation && mutation.target && mutation.target.parentNode && mutation.target.parentNode.__vorlon && mutation.target.parentNode.__vorlon.internalId)
	                            internalId = mutation.target.parentNode.__vorlon.internalId;
	                            Core.Messenger.sendRealtimeMessage('ALL_PLUGINS', {
	                                type: 'contentchanged',
	                                internalId: internalId },
	                            Core._side, 'message');
	                        }, 300));
	                    }
	                    sended = true;
	                });
	            });
	            document.body.__vorlon._observerMutationObserver.observe(document.body, config);
	        } else
	        if (_vorlon3.Tools.IsWindowAvailable) {
	            console.log("dirty check using html string");
	            var content;
	            if (document.body)
	            content = document.body.innerHTML;
	            setInterval(function () {
	                var html = document.body.innerHTML;
	                if (content != html) {
	                    content = html;
	                    Core.Messenger.sendRealtimeMessage('ALL_PLUGINS', {
	                        type: 'contentchanged' },
	                    Core._side, 'message');
	                }
	            }, 2000);
	        }
	    };_Core.prototype.
	    StartDashboardSide = function StartDashboardSide() {var serverUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "'http://localhost:1337/'";var sessionId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";var listenClientId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";var divMapper = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	        Core._side = _vorlon2.RuntimeSide.Dashboard;
	        Core._sessionID = sessionId;
	        Core._listenClientId = listenClientId;
	        /* Notification elements */
	        Core._errorNotifier = document.createElement('x-notify');
	        Core._errorNotifier.setAttribute('type', 'error');
	        Core._errorNotifier.setAttribute('position', 'top');
	        Core._errorNotifier.setAttribute('duration', 5000);
	        Core._messageNotifier = document.createElement('x-notify');
	        Core._messageNotifier.setAttribute('position', 'top');
	        Core._messageNotifier.setAttribute('duration', 4000);
	        document.body.appendChild(Core._errorNotifier);
	        document.body.appendChild(Core._messageNotifier);
	        // Checking socket.io
	        if (_vorlon3.Tools.IsWindowAvailable && window.io === undefined) {
	            if (this._socketIOWaitCount < 10) {
	                this._socketIOWaitCount++;
	                // Let's wait a bit just in case socket.io was loaded asynchronously
	                setTimeout(function () {
	                    console.log("Vorlon.js: waiting for socket.io to load...");
	                    Core.StartDashboardSide(serverUrl, sessionId, listenClientId, divMapper);
	                }, 1000);
	            } else
	            {
	                console.log("Vorlon.js: please load socket.io before referencing vorlon.js or use includeSocketIO = true in your catalog.json file.");
	                Core.ShowError("Vorlon.js: please load socket.io before referencing vorlon.js or use includeSocketIO = true in your catalog.json file.", 0);
	            }
	            return;
	        }
	        // Cookie
	        var clientId = _vorlon3.Tools.ReadCookie("vorlonJS_clientId");
	        if (!clientId) {
	            clientId = _vorlon3.Tools.CreateGUID();
	            _vorlon3.Tools.CreateCookie("vorlonJS_clientId", clientId, 1);
	        }
	        // Creating the messenger
	        if (Core._messenger) {
	            Core._messenger.stopListening();
	            delete Core._messenger;
	        }
	        Core._messenger = new _vorlon.ClientMessenger(Core._side, serverUrl, sessionId, clientId, listenClientId);
	        // Connect messenger to dispatcher
	        Core.Messenger.onRealtimeMessageReceived = Core._Dispatch;
	        Core.Messenger.onHeloReceived = Core._OnIdentificationReceived;
	        Core.Messenger.onIdentifyReceived = Core._OnIdentifyReceived;
	        Core.Messenger.onStopListenReceived = Core._OnStopListenReceived;
	        Core.Messenger.onError = Core._OnError;
	        // Say 'helo'
	        var heloMessage = {
	            ua: navigator.userAgent };

	        Core.Messenger.sendRealtimeMessage("", heloMessage, Core._side, "helo");
	        // Launch plugins
	        for (var index = 0; index < Core._dashboardPlugins.length; index++) {
	            var plugin = Core._dashboardPlugins[index];
	            plugin.startDashboardSide(divMapper ? divMapper(plugin.getID()) : null);
	        }
	    };
	    /**
	        * retryConnect考虑复用当前的_listenClientId逻辑
	        * 刷新后有socket.io事件冒泡过来的清除_listenClientId的事件回调
	        * @private
	        */_Core.prototype.
	    _OnStopListenReceived = function _OnStopListenReceived() {
	        Core._listenClientId = "";
	    };_Core.prototype.
	    _OnIdentifyReceived = function _OnIdentifyReceived(message) {
	        if (Core._side === _vorlon2.RuntimeSide.Dashboard) {
	            Core._messageNotifier.innerHTML = message;
	            Core._messageNotifier.show();
	        } else
	        if (_vorlon3.Tools.IsWindowAvailable) {
	            var div = document.createElement("div");
	            div.className = "vorlonIdentifyNumber";var
	            style = div.style;
	            style.position = 'fixed';
	            style.left = "0";
	            style.top = "50%";
	            style.marginTop = "-150px";
	            style.width = "100%";
	            style.height = "300px";
	            style.fontFamily = "Arial";
	            style.fontSize = "300px";
	            style.textAlign = "center";
	            style.color = "white";
	            style.textShadow = "2px 2px 5px black";
	            style.zIndex = "1000000";
	            div.innerHTML = message;
	            if (document.getElementsByClassName('vorlonIdentifyNumber').length <= 0) {
	                document.body.appendChild(div);
	                setTimeout(function () {
	                    document.body.removeChild(div);
	                }, 4000);
	            }
	        } else
	        {
	            console.log('Vorlon client n° ' + message);
	        }
	    };_Core.prototype.
	    ShowError = function ShowError(message) {var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;
	        if (Core._side === _vorlon2.RuntimeSide.Dashboard) {
	            Core._errorNotifier.innerHTML = message;
	            Core._errorNotifier.setAttribute('duration', timeout);
	            Core._errorNotifier.show();
	        } else
	        if (_vorlon3.Tools.IsWindowAvailable) {
	            var divError = document.createElement("div");
	            divError.style.position = "absolute";
	            divError.style.top = "0";
	            divError.style.left = "0";
	            divError.style.width = "100%";
	            divError.style.height = "100px";
	            divError.style.backgroundColor = "red";
	            divError.style.textAlign = "center";
	            divError.style.fontSize = "30px";
	            divError.style.paddingTop = "20px";
	            divError.style.color = "white";
	            divError.style.fontFamily = "consolas";
	            divError.style.zIndex = "1001";
	            divError.innerHTML = message;
	            document.body.appendChild(divError);
	            if (timeout) {
	                setTimeout(function () {
	                    document.body.removeChild(divError);
	                }, timeout);
	            }
	        }
	    };_Core.prototype.
	    _OnError = function _OnError(err) {
	        Core.ShowError("Error while connecting to server. Server may be offline.<BR>Error message: " + err.message);
	    };_Core.prototype.
	    _OnIdentificationReceived = function _OnIdentificationReceived(id) {
	        Core._listenClientId = id;
	        if (Core._side === _vorlon2.RuntimeSide.Client) {
	            // Refresh plugins
	            for (var index = 0; index < Core._clientPlugins.length; index++) {
	                var plugin = Core._clientPlugins[index];
	                plugin.refresh();
	            }
	        }
	    };_Core.prototype.
	    _OnReloadClient = function _OnReloadClient(id) {
	        if (_vorlon3.Tools.IsWindowAvailable) {
	            document.location.reload();
	        }
	    };_Core.prototype.
	    _RetrySendingRealtimeMessage = function _RetrySendingRealtimeMessage(plugin, message) {
	        setTimeout(function () {
	            if (plugin.isReady()) {
	                Core._DispatchFromClientPluginMessage(plugin, message);
	                return;
	            }
	            Core._RetrySendingRealtimeMessage(plugin, message);
	        }, Core._RetryTimeout);
	    };_Core.prototype.
	    _Dispatch = function _Dispatch(message) {
	        if (!message.metadata) {
	            console.error('invalid message ' + (0, _stringify2.default)(message));
	            return;
	        }
	        if (message.metadata.pluginID == 'ALL_PLUGINS') {
	            Core._clientPlugins.forEach(function (plugin) {
	                Core._DispatchPluginMessage(plugin, message);
	            });
	            Core._dashboardPlugins.forEach(function (plugin) {
	                Core._DispatchPluginMessage(plugin, message);
	            });
	        } else
	        {
	            Core._clientPlugins.forEach(function (plugin) {
	                if (plugin.getID() === message.metadata.pluginID) {
	                    Core._DispatchPluginMessage(plugin, message);
	                    return;
	                }
	            });
	            Core._dashboardPlugins.forEach(function (plugin) {
	                if (plugin.getID() === message.metadata.pluginID) {
	                    Core._DispatchPluginMessage(plugin, message);
	                    return;
	                }
	            });
	        }
	    };_Core.prototype.
	    _DispatchPluginMessage = function _DispatchPluginMessage(plugin, message) {
	        plugin.trace('received ' + (0, _stringify2.default)(message));
	        if (message.metadata.side === _vorlon2.RuntimeSide.Client) {
	            if (!plugin.isReady()) {
	                Core._RetrySendingRealtimeMessage(plugin, message);
	            } else
	            {
	                Core._DispatchFromClientPluginMessage(plugin, message);
	            }
	        } else
	        {
	            Core._DispatchFromDashboardPluginMessage(plugin, message);
	        }
	    };_Core.prototype.
	    _DispatchFromClientPluginMessage = function _DispatchFromClientPluginMessage(plugin, message) {
	        if (message.command && plugin.DashboardCommands) {
	            var command = plugin.DashboardCommands[message.command];
	            if (command) {
	                command.call(plugin, message.data);
	                return;
	            }
	        }
	        plugin.onRealtimeMessageReceivedFromClientSide(message.data);
	    };_Core.prototype.
	    _DispatchFromDashboardPluginMessage = function _DispatchFromDashboardPluginMessage(plugin, message) {
	        if (message.command && plugin.ClientCommands) {
	            var command = plugin.ClientCommands[message.command];
	            if (command) {
	                command.call(plugin, message.data);
	                return;
	            }
	        }
	        plugin.onRealtimeMessageReceivedFromDashboardSide(message.data);
	    };(0, _createClass3.default)(_Core, [{ key: 'Messenger', get: function get() {return Core._messenger;} }, { key: 'ClientPlugins', get: function get() {return Core._clientPlugins;} }, { key: 'IsHttpsEnabled', get: function get() {return Core._isHttpsEnabled;} }, { key: 'DashboardPlugins', get: function get() {return Core._dashboardPlugins;} }]);return _Core;}();

	var Core = exports.Core = new _Core();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(334)))

/***/ }),
/* 110 */,
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(112);
	var $Object = __webpack_require__(4).Object;
	module.exports = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(13);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(10), 'Object', { defineProperty: __webpack_require__(9).f });


/***/ }),
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(142), __esModule: true };

/***/ }),
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
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.BasePlugin = undefined;var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = __webpack_require__(20);var _createClass3 = _interopRequireDefault(_createClass2);var _vorlon = __webpack_require__(94);
	var _vorlon2 = __webpack_require__(109);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var
	BasePlugin = exports.BasePlugin = function () {
	    function BasePlugin(name) {(0, _classCallCheck3.default)(this, BasePlugin);
	        this.name = name;
	        this._ready = true;
	        this._id = "";
	        this._type = _vorlon.PluginType.OneOne;
	        this.traceLog = function (msg) {
	            console.log(msg);
	            debugger;
	        };
	        this.traceNoop = function (msg) {};
	        this.loadingDirectory = "vorlon/plugins";
	        this.debug = _vorlon2.Core.debug;
	    }BasePlugin.prototype.















	    getID = function getID() {
	        return this._id;
	    };BasePlugin.prototype.
	    isReady = function isReady() {
	        return this._ready;
	    };(0, _createClass3.default)(BasePlugin, [{ key: 'Type', get: function get() {return this._type;} }, { key: 'debug', get: function get() {return this._debug;}, set: function set(val) {this._debug = val;if (val) {this.trace = this.traceLog;} else {this.trace = this.traceNoop;}} }]);return BasePlugin;}();

/***/ }),
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

	var core = __webpack_require__(4);
	var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
	module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};


/***/ }),
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
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.ClientMessenger = undefined;var _stringify = __webpack_require__(121);var _stringify2 = _interopRequireDefault(_stringify);var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = __webpack_require__(20);var _createClass3 = _interopRequireDefault(_createClass2);var _vorlon = __webpack_require__(94);
	var _vorlon2 = __webpack_require__(109);
	var _vorlon3 = __webpack_require__(181);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var
	ClientMessenger = exports.ClientMessenger = function () {
	    function ClientMessenger(side, serverUrl, sessionId, clientId, listenClientId) {(0, _classCallCheck3.default)(this, ClientMessenger);
	        this._isConnected = false;
	        this._side = side;
	        this._isConnected = false;
	        this._sessionId = sessionId;
	        this._clientId = clientId;
	        _vorlon2.Core._listenClientId = listenClientId;
	        this._serverUrl = serverUrl;
	        var options = {
	            "path": serverUrl.replace(/h.*:\/\/[^\/]*/, "") + "/socket.io" };

	        var ua = navigator.userAgent;
	        if (ua.indexOf('Nebula WK') >= 0) {
	            options['transports'] = ['websocket'];
	        }
	        this._options = options;
	        this.generateConnection();
	    }









	    /**
	       * 抽离创建websocket连接的的公共功能代码，为断线重连
	       */ClientMessenger.prototype.
	    generateConnection = function generateConnection() {var _this = this;
	        var side = this._side;
	        var serverUrl = this._serverUrl;
	        var options = this._options;
	        switch (side) {
	            case _vorlon.RuntimeSide.Client:
	                this._socket = io.connect(serverUrl + "/client", options);
	                this._isConnected = true;
	                break;
	            case _vorlon.RuntimeSide.Dashboard:
	                this._socket = io.connect(serverUrl + "/dashboard", options);
	                this._isConnected = true;
	                break;}

	        // this._socket.binaryType = 'blob';
	        if (this.isConnected) {
	            var manager = io.Manager(serverUrl, options);
	            manager.on('connect_error', function (err) {
	                if (_this.onError) {
	                    _this.onError(err);
	                }
	            });
	            this._socket.on('message', function (message) {
	                var received = JSON.parse(message);
	                if (_this.onRealtimeMessageReceived) {
	                    _this.onRealtimeMessageReceived(received);
	                }
	            });
	            this._socket.on('helo', function (message) {
	                _vorlon2.Core._listenClientId = message;
	                if (_this.onHeloReceived) {
	                    _this.onHeloReceived(message);
	                }
	            });
	            this._socket.on('identify', function (message) {
	                if (_this.onIdentifyReceived) {
	                    _this.onIdentifyReceived(message);
	                }
	            });
	            this._socket.on('stoplisten', function () {
	                if (_this.onStopListenReceived) {
	                    _this.onStopListenReceived();
	                }
	            });
	            this._socket.on('refreshclients', function () {
	                if (_this.onRefreshClients) {
	                    _this.onRefreshClients();
	                }
	            });
	            this._socket.on('addclient', function (client) {
	                if (_this.onAddClient) {
	                    _this.onAddClient(client);
	                }
	            });
	            this._socket.on('removeclient', function (client) {
	                if (_this.onRemoveClient) {
	                    _this.onRemoveClient(client);
	                }
	            });
	            this._socket.on('reload', function (message) {
	                _vorlon2.Core._listenClientId = message;
	                if (_this.onReload) {
	                    _this.onReload(message);
	                }
	            });
	        }
	    };
	    /**
	        * 重新初始化_socket 对象
	        */ClientMessenger.prototype.
	    retryConnect = function retryConnect() {
	        _vorlon3.Connection.CurrentListenClientId = _vorlon2.Core._listenClientId;
	        this.stopListening();
	        this.generateConnection();
	        // 重新将本次建联的websocket注册到dashboard列表中
	        _vorlon2.Core.sendHelo();
	    };ClientMessenger.prototype.
	    stopListening = function stopListening() {
	        if (this._socket) {
	            this._socket.removeAllListeners();
	        }
	    };ClientMessenger.prototype.
	    sendRealtimeMessage = function sendRealtimeMessage(pluginID, objectToSend, side) {var messageType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "message";var command = arguments[4];
	        var message = {
	            metadata: {
	                pluginID: pluginID,
	                side: side,
	                sessionId: this._sessionId,
	                clientId: this._clientId,
	                listenClientId: _vorlon2.Core._listenClientId },

	            data: objectToSend };

	        if (command)
	        message.command = command;
	        if (!this.isConnected) {
	            // Directly raise response locally
	            if (this.onRealtimeMessageReceived) {
	                this.onRealtimeMessageReceived(message);
	            }
	            return;
	        } else
	        {
	            if (_vorlon2.Core._listenClientId !== "" || messageType !== "message") {
	                var strmessage = (0, _stringify2.default)(message);
	                this._socket.emit(messageType, strmessage);
	            }
	        }
	    };ClientMessenger.prototype.
	    sendMonitoringMessage = function sendMonitoringMessage(pluginID, message) {
	        var xhr = new XMLHttpRequest();
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState === 4) {
	                if (xhr.status === 200) {
	                }
	            }
	        };
	        xhr.open("POST", this._serverUrl + "api/push");
	        xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
	        var data = (0, _stringify2.default)({ "_idsession": this._sessionId, "id": pluginID, "message": message });
	        //xhr.setRequestHeader("Content-length", data.length.toString());
	        xhr.send(data);
	    };ClientMessenger.prototype.
	    getMonitoringMessage = function getMonitoringMessage(pluginID, onMonitoringMessage) {var from = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "-20";var to = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "-1";
	        var xhr = new XMLHttpRequest();
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState === 4) {
	                if (xhr.status === 200) {
	                    if (onMonitoringMessage)
	                    onMonitoringMessage(JSON.parse(xhr.responseText));
	                } else
	                {
	                    if (onMonitoringMessage)
	                    onMonitoringMessage(null);
	                }
	            } else
	            {
	                if (onMonitoringMessage)
	                onMonitoringMessage(null);
	            }
	        };
	        xhr.open("GET", this._serverUrl + "api/range/" + this._sessionId + "/" + pluginID + "/" + from + "/" + to);
	        xhr.send();
	    };(0, _createClass3.default)(ClientMessenger, [{ key: 'isConnected', get: function get() {return this._isConnected;} }, { key: 'clientId', set: function set(value) {this._clientId = value;} }, { key: 'socketId', get: function get() {return this._socket.id;} }]);return ClientMessenger;}();

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.Connection = undefined;var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = __webpack_require__(20);var _createClass3 = _interopRequireDefault(_createClass2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var Connection = exports.Connection = function () {function Connection() {(0, _classCallCheck3.default)(this, Connection);}(0, _createClass3.default)(Connection, null, [{ key: 'CurrentListenClientId', get: function get()
	        {
	            return Connection._CurrentListenClientId;
	        }, set: function set(
	        value) {
	            Connection._CurrentListenClientId = value;
	        } }, { key: 'inRetry', get: function get()
	        {
	            return Connection._inRetry;
	        }, set: function set(
	        value) {
	            Connection._inRetry = value;
	        } }]);return Connection;}();

	Connection._CurrentListenClientId = '';
	Connection._inRetry = false;

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.FluentDOM = exports.Tools = undefined;var _defineProperty = __webpack_require__(90);var _defineProperty2 = _interopRequireDefault(_defineProperty);var _setImmediate2 = __webpack_require__(255);var _setImmediate3 = _interopRequireDefault(_setImmediate2);var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = __webpack_require__(20);var _createClass3 = _interopRequireDefault(_createClass2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var Tools = exports.Tools = function () {function Tools() {(0, _classCallCheck3.default)(this, Tools);}Tools.



	    QuerySelectorById = function QuerySelectorById(root, id) {
	        if (root.querySelector) {
	            return root.querySelector("#" + id);
	        }
	        return document.getElementById(id);
	    };Tools.
	    SetImmediate = function SetImmediate(func) {
	        if (window.setImmediate) {
	            (0, _setImmediate3.default)(func);
	        } else
	        {
	            setTimeout(func, 0);
	        }
	    };Tools.
	    setLocalStorageValue = function setLocalStorageValue(key, data) {
	        if (localStorage) {
	            try {
	                localStorage.setItem(key, data);
	            }
	            catch (e) {
	            }
	        }
	    };Tools.
	    getLocalStorageValue = function getLocalStorageValue(key) {
	        if (localStorage) {
	            try {
	                return localStorage.getItem(key);
	            }
	            catch (e) {
	                //local storage is not available (private mode maybe)
	                return "";
	            }
	        }
	    };Tools.
	    Hook = function Hook(rootObject, functionToHook, hookingFunction) {
	        var previousFunction = rootObject[functionToHook];
	        rootObject[functionToHook] = function () {for (var _len = arguments.length, optionalParams = Array(_len), _key = 0; _key < _len; _key++) {optionalParams[_key] = arguments[_key];}
	            hookingFunction(optionalParams);
	            previousFunction.apply(rootObject, optionalParams);
	        };
	        return previousFunction;
	    };Tools.
	    HookProperty = function HookProperty(rootObjectName, propertyToHook, callback) {
	        var rootObject = (Tools.IsWindowAvailable ? window : global)[rootObjectName];
	        var initialValue = rootObject[propertyToHook];
	        (0, _defineProperty2.default)(rootObject, propertyToHook, {
	            get: function get() {
	                if (callback) {
	                    var stack = Tools.getCallStack(1);
	                    stack.property = propertyToHook;
	                    callback(stack);
	                }
	                return initialValue;
	            } });

	    };Tools.
	    getCallStack = function getCallStack(skipped) {
	        skipped = skipped || 0;
	        try {
	            //Throw an error to generate a stack trace
	            throw new Error();
	        }
	        catch (e) {
	            //Split the stack trace into each line
	            var stackLines = e.stack.split('\n');
	            var callerIndex = 0;
	            //Now walk though each line until we find a path reference
	            for (var i = 2 + skipped, l = stackLines.length; i < l; i++) {
	                if (!(stackLines[i].indexOf("http://") >= 0))
	                continue;
	                //We skipped all the lines with out an http so we now have a script reference
	                //This one is the class constructor, the next is the getScriptPath() call
	                //The one after that is the user code requesting the path info (so offset by 2)
	                callerIndex = i;
	                break;
	            }
	            var res = {
	                stack: e.stack };

	            var linetext = stackLines[callerIndex];
	            //Now parse the string for each section we want to return
	            //var pathParts = linetext.match(/((http[s]?:\/\/.+\/)([^\/]+\.js))([\/]):/);
	            // if (pathParts){
	            //
	            // }
	            var opening = linetext.indexOf("http://") || linetext.indexOf("https://");
	            if (opening > 0) {
	                var closing = linetext.indexOf(")", opening);
	                if (closing < 0)
	                closing = linetext.length - 1;
	                var filename = linetext.substr(opening, closing - opening);
	                var linestart = filename.indexOf(":", filename.lastIndexOf("/"));
	                res.file = filename.substr(0, linestart);
	                res.line = filename.substr(linestart + 1);
	            }
	            return res;
	        }
	    };Tools.
	    CreateCookie = function CreateCookie(name, value, days) {
	        var expires;
	        if (days) {
	            var date = new Date();
	            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	            expires = "; expires=" + date.toUTCString();
	        } else
	        {
	            expires = "";
	        }
	        document.cookie = name + "=" + value + expires + "; path=/";
	    };Tools.
	    ReadCookie = function ReadCookie(name) {
	        var nameEQ = name + "=";
	        var ca = document.cookie.split(';');
	        for (var i = 0; i < ca.length; i++) {
	            var c = ca[i];
	            while (c.charAt(0) === ' ') {
	                c = c.substring(1, c.length);
	            }
	            if (c.indexOf(nameEQ) === 0) {
	                return c.substring(nameEQ.length, c.length);
	            }
	        }
	        return "";
	    };
	    // from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#answer-2117523
	    Tools.CreateGUID = function CreateGUID() {
	        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	            var r = Math.random() * 16 | 0,v = c === 'x' ? r : r & 0x3 | 0x8;
	            return v.toString(16);
	        });
	    };Tools.
	    RemoveEmpties = function RemoveEmpties(arr) {
	        var len = arr.length;
	        for (var i = len - 1; i >= 0; i--) {
	            if (!arr[i]) {
	                arr.splice(i, 1);
	                len--;
	            }
	        }
	        return len;
	    };Tools.
	    AddClass = function AddClass(e, name) {
	        if (e.classList) {
	            if (name.indexOf(" ") < 0) {
	                e.classList.add(name);
	            } else
	            {
	                var namesToAdd = name.split(" ");
	                Tools.RemoveEmpties(namesToAdd);
	                for (var i = 0, len = namesToAdd.length; i < len; i++) {
	                    e.classList.add(namesToAdd[i]);
	                }
	            }
	            return e;
	        } else
	        {
	            var className = e.className;
	            var names = className.split(" ");
	            var l = Tools.RemoveEmpties(names);
	            var toAdd;
	            if (name.indexOf(" ") >= 0) {
	                namesToAdd = name.split(" ");
	                Tools.RemoveEmpties(namesToAdd);
	                for (i = 0; i < l; i++) {
	                    var found = namesToAdd.indexOf(names[i]);
	                    if (found >= 0) {
	                        namesToAdd.splice(found, 1);
	                    }
	                }
	                if (namesToAdd.length > 0) {
	                    toAdd = namesToAdd.join(" ");
	                }
	            } else
	            {
	                var saw = false;
	                for (i = 0; i < l; i++) {
	                    if (names[i] === name) {
	                        saw = true;
	                        break;
	                    }
	                }
	                if (!saw) {
	                    toAdd = name;
	                }
	            }
	            if (toAdd) {
	                if (l > 0 && names[0].length > 0) {
	                    e.className = className + " " + toAdd;
	                } else
	                {
	                    e.className = toAdd;
	                }
	            }
	            return e;
	        }
	    };Tools.
	    RemoveClass = function RemoveClass(e, name) {
	        if (e.classList) {
	            if (e.classList.length === 0) {
	                return e;
	            }
	            var namesToRemove = name.split(" ");
	            Tools.RemoveEmpties(namesToRemove);
	            for (var i = 0, len = namesToRemove.length; i < len; i++) {
	                e.classList.remove(namesToRemove[i]);
	            }
	            return e;
	        } else
	        {
	            var original = e.className;
	            if (name.indexOf(" ") >= 0) {
	                namesToRemove = name.split(" ");
	                Tools.RemoveEmpties(namesToRemove);
	            } else
	            {
	                if (original.indexOf(name) < 0) {
	                    return e;
	                }
	                namesToRemove = [name];
	            }
	            var removed;
	            var names = original.split(" ");
	            var namesLen = Tools.RemoveEmpties(names);
	            for (i = namesLen - 1; i >= 0; i--) {
	                if (namesToRemove.indexOf(names[i]) >= 0) {
	                    names.splice(i, 1);
	                    removed = true;
	                }
	            }
	            if (removed) {
	                e.className = names.join(" ");
	            }
	            return e;
	        }
	    };Tools.
	    ToggleClass = function ToggleClass(e, name, callback) {
	        if (e.className.match(name)) {
	            Tools.RemoveClass(e, name);
	            if (callback)
	            callback(false);
	        } else
	        {
	            Tools.AddClass(e, name);
	            if (callback)
	            callback(true);
	        }
	    };Tools.
	    htmlToString = function htmlToString(text) {
	        return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
	    };(0, _createClass3.default)(Tools, null, [{ key: "IsWindowAvailable", get: function get() {return typeof window != 'undefined';} }]);return Tools;}();var

	FluentDOM = function () {
	    function FluentDOM(nodeType, className, parentElt, parent) {(0, _classCallCheck3.default)(this, FluentDOM);
	        this.childs = [];
	        if (nodeType) {
	            this.element = document.createElement(nodeType);
	            if (className)
	            this.element.className = className;
	            if (parentElt)
	            parentElt.appendChild(this.element);
	            this.parent = parent;
	            if (parent) {
	                parent.childs.push(this);
	            }
	        }
	    }FluentDOM.
	    forElement = function forElement(element) {
	        var res = new FluentDOM(null);
	        res.element = element;
	        return res;
	    };FluentDOM.prototype.
	    addClass = function addClass(classname) {
	        this.element.classList.add(classname);
	        return this;
	    };FluentDOM.prototype.
	    toggleClass = function toggleClass(classname) {
	        this.element.classList.toggle(classname);
	        return this;
	    };FluentDOM.prototype.
	    className = function className(classname) {
	        this.element.className = classname;
	        return this;
	    };FluentDOM.prototype.
	    opacity = function opacity(_opacity) {
	        this.element.style.opacity = _opacity;
	        return this;
	    };FluentDOM.prototype.
	    display = function display(_display) {
	        this.element.style.display = _display;
	        return this;
	    };FluentDOM.prototype.
	    hide = function hide() {
	        this.element.style.display = 'none';
	        return this;
	    };FluentDOM.prototype.
	    visibility = function visibility(_visibility) {
	        this.element.style.visibility = _visibility;
	        return this;
	    };FluentDOM.prototype.
	    text = function text(_text) {
	        this.element.textContent = _text;
	        return this;
	    };FluentDOM.prototype.
	    html = function html(text) {
	        this.element.innerHTML = text;
	        return this;
	    };FluentDOM.prototype.
	    attr = function attr(name, val) {
	        this.element.setAttribute(name, val);
	        return this;
	    };FluentDOM.prototype.
	    editable = function editable(_editable) {
	        this.element.contentEditable = _editable ? "true" : "false";
	        return this;
	    };FluentDOM.prototype.
	    style = function style(name, val) {
	        this.element.style[name] = val;
	        return this;
	    };FluentDOM.prototype.
	    appendTo = function appendTo(elt) {
	        elt.appendChild(this.element);
	        return this;
	    };FluentDOM.prototype.
	    append = function append(nodeType, className, callback) {
	        var child = new FluentDOM(nodeType, className, this.element, this);
	        if (callback) {
	            callback(child);
	        }
	        return this;
	    };FluentDOM.prototype.
	    createChild = function createChild(nodeType, className) {
	        var child = new FluentDOM(nodeType, className, this.element, this);
	        return child;
	    };FluentDOM.prototype.
	    click = function click(callback) {
	        this.element.addEventListener('click', callback);
	        return this;
	    };FluentDOM.prototype.
	    blur = function blur(callback) {
	        this.element.addEventListener('blur', callback);
	        return this;
	    };FluentDOM.prototype.
	    keydown = function keydown(callback) {
	        this.element.addEventListener('keydown', callback);
	        return this;
	    };return FluentDOM;}();exports.FluentDOM = FluentDOM;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
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
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.ClientPlugin = undefined;var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = __webpack_require__(8);var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = __webpack_require__(7);var _inherits3 = _interopRequireDefault(_inherits2);var _vorlon = __webpack_require__(136);
	var _vorlon2 = __webpack_require__(109);
	var _vorlon3 = __webpack_require__(94);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var
	ClientPlugin = exports.ClientPlugin = function (_BasePlugin) {(0, _inherits3.default)(ClientPlugin, _BasePlugin);
	    function ClientPlugin(name) {(0, _classCallCheck3.default)(this, ClientPlugin);return (0, _possibleConstructorReturn3.default)(this,
	        _BasePlugin.call(this, name));
	    }ClientPlugin.prototype.
	    startClientSide = function startClientSide() {
	    };ClientPlugin.prototype.
	    onRealtimeMessageReceivedFromDashboardSide = function onRealtimeMessageReceivedFromDashboardSide(receivedObject) {};ClientPlugin.prototype.
	    sendToDashboard = function sendToDashboard(data) {
	        if (_vorlon2.Core.Messenger)
	        _vorlon2.Core.Messenger.sendRealtimeMessage(this.getID(), data, _vorlon3.RuntimeSide.Client, "message");
	    };ClientPlugin.prototype.
	    sendCommandToDashboard = function sendCommandToDashboard(command) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	        if (_vorlon2.Core.Messenger) {
	            var message = this.getID() + ' send command to dashboard ' + command;
	            // trace在debug模式下回调用console.log造成死循环
	            // this.trace(message);
	            _vorlon2.Core.Messenger.sendRealtimeMessage(this.getID(), data, _vorlon3.RuntimeSide.Client, "message", command);
	        }
	    };ClientPlugin.prototype.
	    refresh = function refresh() {
	        console.error("Please override plugin.refresh()");
	    };ClientPlugin.prototype.
	    _loadNewScriptAsync = function _loadNewScriptAsync(scriptName, callback, waitForDOMContentLoaded) {var _this2 = this;
	        var basedUrl = "";
	        if (this.loadingDirectory.indexOf('http') === 0) {
	            if (scriptName[0] == "/") {
	                basedUrl = "";
	            } else
	            {
	                basedUrl = this.loadingDirectory + "/" + this.name + "/";
	            }
	        } else
	        {
	            if (scriptName[0] == "/") {
	                basedUrl = vorlonBaseURL;
	            } else
	            {
	                basedUrl = vorlonBaseURL + "/" + this.loadingDirectory + "/" + this.name + "/";
	            }
	        }
	        if (_vorlon2.Core.IsHttpsEnabled) {
	            basedUrl = basedUrl.replace("$http://", "https://");
	        }
	        function loadScript() {
	            var scriptToLoad = document.createElement("script");
	            scriptToLoad.setAttribute("src", basedUrl + scriptName);
	            scriptToLoad.onload = callback;
	            var first = document.getElementsByTagName('script')[0];
	            first.parentNode.insertBefore(scriptToLoad, first);
	        }
	        if (!waitForDOMContentLoaded || document.body) {
	            loadScript();
	        } else
	        {
	            document.addEventListener("DOMContentLoaded", function () {
	                _this2._loadNewScriptAsync(scriptName, callback, waitForDOMContentLoaded);
	            });
	        }
	    };return ClientPlugin;}(_vorlon.BasePlugin);

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.DashboardPlugin = undefined;var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = __webpack_require__(8);var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = __webpack_require__(7);var _inherits3 = _interopRequireDefault(_inherits2);var _vorlon = __webpack_require__(136);
	var _vorlon2 = __webpack_require__(109);
	var _vorlon3 = __webpack_require__(94);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var
	DashboardPlugin = exports.DashboardPlugin = function (_BasePlugin) {(0, _inherits3.default)(DashboardPlugin, _BasePlugin);
	    function DashboardPlugin(name, htmlFragmentUrl, cssStyleSheetUrl, JavascriptSheetUrl) {(0, _classCallCheck3.default)(this, DashboardPlugin);var _this = (0, _possibleConstructorReturn3.default)(this,
	        _BasePlugin.call(this, name));
	        _this.htmlFragmentUrl = htmlFragmentUrl;
	        _this.cssStyleSheetUrl = cssStyleSheetUrl instanceof Array ? cssStyleSheetUrl : typeof cssStyleSheetUrl === 'undefined' ? [] : [cssStyleSheetUrl];
	        _this.JavascriptSheetUrl = JavascriptSheetUrl instanceof Array ? JavascriptSheetUrl : typeof JavascriptSheetUrl === 'undefined' ? [] : [JavascriptSheetUrl];
	        _this.debug = _vorlon2.Core.debug;return _this;
	    }DashboardPlugin.prototype.
	    startDashboardSide = function startDashboardSide(div) {};DashboardPlugin.prototype.
	    onRealtimeMessageReceivedFromClientSide = function onRealtimeMessageReceivedFromClientSide(receivedObject) {};DashboardPlugin.prototype.
	    sendToClient = function sendToClient(data) {
	        if (_vorlon2.Core.Messenger)
	        _vorlon2.Core.Messenger.sendRealtimeMessage(this.getID(), data, _vorlon3.RuntimeSide.Dashboard, "message");
	    };DashboardPlugin.prototype.
	    sendCommandToClient = function sendCommandToClient(command) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	        if (_vorlon2.Core.Messenger) {
	            this.trace(this.getID() + ' send command to client ' + command);
	            _vorlon2.Core.Messenger.sendRealtimeMessage(this.getID(), data, _vorlon3.RuntimeSide.Dashboard, "message", command);
	        }
	    };DashboardPlugin.prototype.
	    sendCommandToPluginClient = function sendCommandToPluginClient(pluginId, command) {var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	        if (_vorlon2.Core.Messenger) {
	            this.trace(this.getID() + ' send command to plugin client ' + command);
	            _vorlon2.Core.Messenger.sendRealtimeMessage(pluginId, data, _vorlon3.RuntimeSide.Dashboard, "protocol", command);
	        }
	    };DashboardPlugin.prototype.
	    sendCommandToPluginDashboard = function sendCommandToPluginDashboard(pluginId, command) {var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	        if (_vorlon2.Core.Messenger) {
	            this.trace(this.getID() + ' send command to plugin dashboard ' + command);
	            _vorlon2.Core.Messenger.sendRealtimeMessage(pluginId, data, _vorlon3.RuntimeSide.Client, "protocol", command);
	        }
	    };DashboardPlugin.prototype.
	    _insertHtmlContentAsync = function _insertHtmlContentAsync(divContainer, callback) {var _this2 = this;
	        var basedUrl = vorlonBaseURL + "/" + this.loadingDirectory + "/" + this.name + "/";
	        var alone = false;
	        if (!divContainer) {
	            // Not emptyDiv provided, let's plug into the main DOM
	            divContainer = document.createElement("div");
	            document.body.appendChild(divContainer);
	            alone = true;
	        }
	        var request = new XMLHttpRequest();
	        request.open('GET', basedUrl + this.htmlFragmentUrl, true);
	        request.onreadystatechange = function (ev) {
	            if (request.readyState === 4) {
	                if (request.status === 200) {
	                    var headID = document.getElementsByTagName("head")[0];
	                    for (var i = 0; i < _this2.cssStyleSheetUrl.length; i++) {
	                        var cssNode = document.createElement('link');
	                        cssNode.type = "text/css";
	                        cssNode.rel = "stylesheet";
	                        cssNode.href = basedUrl + _this2.cssStyleSheetUrl[i];
	                        cssNode.media = "screen";
	                        headID.appendChild(cssNode);
	                    }
	                    for (var i = 0; i < _this2.JavascriptSheetUrl.length; i++) {
	                        var jsNode = document.createElement('script');
	                        jsNode.type = "text/javascript";
	                        jsNode.src = basedUrl + _this2.JavascriptSheetUrl[i];
	                        headID.appendChild(jsNode);
	                    }
	                    divContainer.innerHTML = _this2._stripContent(request.responseText);
	                    if ($(divContainer).find('.split').length && $(divContainer).find('.split').is(":visible") && !$(divContainer).find('.vsplitter').length) {
	                        $(divContainer).find('.split').split({
	                            orientation: $(divContainer).find('.split').data('orientation'),
	                            limit: $(divContainer).find('.split').data('limit'),
	                            position: $(divContainer).find('.split').data('position') });

	                    }
	                    var firstDivChild = divContainer.children[0];
	                    if (alone) {
	                        firstDivChild.className = "alone";
	                    }
	                    callback(firstDivChild);
	                } else
	                {
	                    throw new Error("Error status: " + request.status + " - Unable to load " + basedUrl + _this2.htmlFragmentUrl);
	                }
	            }
	        };
	        request.send(null);
	    };DashboardPlugin.prototype.
	    _stripContent = function _stripContent(content) {
	        // in case of SVG injection
	        var xmlRegExp = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im;
	        // for HTML content
	        var bodyRegExp = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im;
	        if (content) {
	            content = content.replace(xmlRegExp, "");
	            var matches = content.match(bodyRegExp);
	            if (matches) {
	                content = matches[1];
	            }
	        }
	        return content;
	    };return DashboardPlugin;}(_vorlon.BasePlugin);

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';var _hooks = __webpack_require__(303);var _hooks2 = _interopRequireDefault(_hooks);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
	// Add hooks' methods: `hook`, `pre`, and `post`
	var doc = document;
	var head = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement;
	for (var k in _hooks2.default) {
	    head[k] = _hooks2.default[k];
	}
	// document.pre('createElement', function (next) {
	//   debugger;
	//   console.log("hello");
	//   return next();
	// }).pre('createElement', function (next) {
	//   console.log("world");
	//   return next();
	// });
	head.pre('appendChild', function (next, node) {
	    if (node instanceof HTMLElement) {
	        if (node.tagName == 'LINK') {
	        } else
	        if (node.tagName == 'SCRIPT') {
	            // 需要判断是否为 jsonp
	            console.log(node);
	        }
	    }
	    return next();
	});

/***/ }),
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
/* 251 */
/***/ (function(module, exports) {

	'use strict'; /* jshint unused:false */
	/* global base64_decode, CSSWizardView, window, console, jQuery */
	(function (global) {
	  'use strict';
	  var fi = function fi() {

	    this.cssImportStatements = [];
	    this.cssKeyframeStatements = [];

	    this.cssRegex = new RegExp('([\\s\\S]*?){([\\s\\S]*?)}', 'gi');
	    this.cssMediaQueryRegex = '((@media [\\s\\S]*?){([\\s\\S]*?}\\s*?)})';
	    this.cssKeyframeRegex = '((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})';
	    this.combinedCSSRegex = '((\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})'; //to match css & media queries together
	    this.cssCommentsRegex = '(\\/\\*[\\s\\S]*?\\*\\/)';
	    this.cssImportStatementRegex = new RegExp('@import .*?;', 'gi');
	  };

	  /*
	       Strip outs css comments and returns cleaned css string
	        @param css, the original css string to be stipped out of comments
	        @return cleanedCSS contains no css comments
	     */


	  fi.prototype.stripComments = function (cssString) {
	    var regex = new RegExp(this.cssCommentsRegex, 'gi');

	    return cssString.replace(regex, '');
	  };

	  /*
	       Parses given css string, and returns css object
	       keys as selectors and values are css rules
	       eliminates all css comments before parsing
	        @param source css string to be parsed
	        @return object css
	     */


	  fi.prototype.parseCSS = function (source) {

	    if (source === undefined) {
	      return [];
	    }

	    var css = [];
	    //strip out comments
	    //source = this.stripComments(source);

	    //get import statements

	    while (true) {
	      var imports = this.cssImportStatementRegex.exec(source);
	      if (imports !== null) {
	        this.cssImportStatements.push(imports[0]);
	        css.push({
	          selector: '@imports',
	          type: 'imports',
	          styles: imports[0] });

	      } else {
	        break;
	      }
	    }
	    source = source.replace(this.cssImportStatementRegex, '');
	    //get keyframe statements
	    var keyframesRegex = new RegExp(this.cssKeyframeRegex, 'gi');
	    var arr;
	    while (true) {
	      arr = keyframesRegex.exec(source);
	      if (arr === null) {
	        break;
	      }
	      css.push({
	        selector: '@keyframes',
	        type: 'keyframes',
	        styles: arr[0] });

	    }
	    source = source.replace(keyframesRegex, '');

	    //unified regex
	    var unified = new RegExp(this.combinedCSSRegex, 'gi');

	    while (true) {
	      arr = unified.exec(source);
	      if (arr === null) {
	        break;
	      }
	      var selector = '';
	      if (arr[2] === undefined) {
	        selector = arr[5].split('\r\n').join('\n').trim();
	      } else {
	        selector = arr[2].split('\r\n').join('\n').trim();
	      }

	      /*
	          fetch comments and associate it with current selector
	        */
	      var commentsRegex = new RegExp(this.cssCommentsRegex, 'gi');
	      var comments = commentsRegex.exec(selector);
	      if (comments !== null) {
	        selector = selector.replace(commentsRegex, '').trim();
	      }

	      //determine the type
	      if (selector.indexOf('@media') !== -1) {
	        //we have a media query
	        var cssObject = {
	          selector: selector,
	          type: 'media',
	          subStyles: this.parseCSS(arr[3] + '\n}') //recursively parse media query inner css
	        };
	        if (comments !== null) {
	          cssObject.comments = comments[0];
	        }
	        css.push(cssObject);
	      } else {
	        //we have standart css
	        var rules = this.parseRules(arr[6]);
	        var style = {
	          selector: selector,
	          rules: rules };

	        if (selector === '@font-face') {
	          style.type = 'font-face';
	        }
	        if (comments !== null) {
	          style.comments = comments[0];
	        }
	        css.push(style);
	      }
	    }

	    return css;
	  };

	  /*
	       parses given string containing css directives
	       and returns an array of objects containing ruleName:ruleValue pairs
	        @param rules, css directive string example
	           \n\ncolor:white;\n    font-size:18px;\n
	     */

	  fi.prototype.parseRules = function (rules) {
	    //convert all windows style line endings to unix style line endings
	    rules = rules.split('\r\n').join('\n');
	    var ret = [];

	    rules = rules.split(';');

	    //proccess rules line by line
	    for (var i = 0; i < rules.length; i++) {
	      var line = rules[i];

	      //determine if line is a valid css directive, ie color:white;
	      line = line.trim();
	      if (line.indexOf(':') !== -1) {
	        //line contains :
	        line = line.split(':');
	        var cssDirective = line[0].trim();
	        var cssValue = line.slice(1).join(':').trim();

	        //more checks
	        if (cssDirective.length < 1 || cssValue.length < 1) {
	          continue; //there is no css directive or value that is of length 1 or 0
	          // PLAIN WRONG WHAT ABOUT margin:0; ?
	        }

	        //push rule
	        ret.push({
	          directive: cssDirective,
	          value: cssValue });

	      } else {
	        //if there is no ':', but what if it was mis splitted value which starts with base64
	        if (line.trim().substr(0, 7) == 'base64,') {//hack :)
	          ret[ret.length - 1].value += line.trim();
	        } else {
	          //add rule, even if it is defective
	          if (line.length > 0) {
	            ret.push({
	              directive: '',
	              value: line,
	              defective: true });

	          }
	        }
	      }
	    }

	    return ret; //we are done!
	  };
	  /*
	       just returns the rule having given directive
	       if not found returns false;
	     */
	  fi.prototype.findCorrespondingRule = function (rules, directive, value) {
	    if (value === undefined) {
	      value = false;
	    }
	    var ret = false;
	    for (var i = 0; i < rules.length; i++) {
	      if (rules[i].directive == directive) {
	        ret = rules[i];
	        if (value === rules[i].value) {
	          break;
	        }
	      }
	    }
	    return ret;
	  };

	  /*
	         Finds styles that have given selector, compress them,
	         and returns them
	     */
	  fi.prototype.findBySelector = function (cssObjectArray, selector, contains) {
	    if (contains === undefined) {
	      contains = false;
	    }

	    var found = [];
	    for (var i = 0; i < cssObjectArray.length; i++) {
	      if (contains === false) {
	        if (cssObjectArray[i].selector === selector) {
	          found.push(cssObjectArray[i]);
	        }
	      } else {
	        if (cssObjectArray[i].selector.indexOf(selector) !== -1) {
	          found.push(cssObjectArray[i]);
	        }
	      }

	    }
	    if (found.length < 2) {
	      return found;
	    } else {
	      var base = found[0];
	      for (i = 1; i < found.length; i++) {
	        this.intelligentCSSPush([base], found[i]);
	      }
	      return [base]; //we are done!! all properties merged into base!
	    }
	  };

	  /*
	       deletes cssObjects having given selector, and returns new array
	     */
	  fi.prototype.deleteBySelector = function (cssObjectArray, selector) {
	    var ret = [];
	    for (var i = 0; i < cssObjectArray.length; i++) {
	      if (cssObjectArray[i].selector !== selector) {
	        ret.push(cssObjectArray[i]);
	      }
	    }
	    return ret;
	  };

	  /*
	         Compresses given cssObjectArray and tries to minimize
	         selector redundence.
	     */
	  fi.prototype.compressCSS = function (cssObjectArray) {
	    var compressed = [];
	    var done = {};
	    for (var i = 0; i < cssObjectArray.length; i++) {
	      var obj = cssObjectArray[i];
	      if (done[obj.selector] === true) {
	        continue;
	      }

	      var found = this.findBySelector(cssObjectArray, obj.selector); //found compressed
	      if (found.length !== 0) {
	        compressed.push(found[0]);
	        done[obj.selector] = true;
	      }
	    }
	    return compressed;
	  };

	  /*
	       Received 2 css objects with following structure
	         {
	           rules : [{directive:"", value:""}, {directive:"", value:""}, ...]
	           selector : "SOMESELECTOR"
	         }
	        returns the changed(new,removed,updated) values on css1 parameter, on same structure
	        if two css objects are the same, then returns false
	         
	         if a css directive exists in css1 and     css2, and its value is different, it is included in diff
	         if a css directive exists in css1 and not css2, it is then included in diff
	         if a css directive exists in css2 but not css1, then it is deleted in css1, it would be included in diff but will be marked as type='DELETED'
	          @object css1 css object
	         @object css2 css object
	          @return diff css object contains changed values in css1 in regards to css2 see test input output in /test/data/css.js
	     */




	  fi.prototype.cssDiff = function (css1, css2) {
	    if (css1.selector !== css2.selector) {
	      return false;
	    }

	    //if one of them is media query return false, because diff function can not operate on media queries
	    if (css1.type === 'media' || css2.type === 'media') {
	      return false;
	    }

	    var diff = {
	      selector: css1.selector,
	      rules: [] };

	    var rule1, rule2;
	    for (var i = 0; i < css1.rules.length; i++) {
	      rule1 = css1.rules[i];
	      //find rule2 which has the same directive as rule1
	      rule2 = this.findCorrespondingRule(css2.rules, rule1.directive, rule1.value);
	      if (rule2 === false) {
	        //rule1 is a new rule in css1
	        diff.rules.push(rule1);
	      } else {
	        //rule2 was found only push if its value is different too
	        if (rule1.value !== rule2.value) {
	          diff.rules.push(rule1);
	        }
	      }
	    }

	    //now for rules exists in css2 but not in css1, which means deleted rules
	    for (var ii = 0; ii < css2.rules.length; ii++) {
	      rule2 = css2.rules[ii];
	      //find rule2 which has the same directive as rule1
	      rule1 = this.findCorrespondingRule(css1.rules, rule2.directive);
	      if (rule1 === false) {
	        //rule1 is a new rule
	        rule2.type = 'DELETED'; //mark it as a deleted rule, so that other merge operations could be true
	        diff.rules.push(rule2);
	      }
	    }


	    if (diff.rules.length === 0) {
	      return false;
	    }
	    return diff;
	  };

	  /*
	         Merges 2 different css objects together
	         using intelligentCSSPush,
	          @param cssObjectArray, target css object array
	         @param newArray, source array that will be pushed into cssObjectArray parameter
	         @param reverse, [optional], if given true, first parameter will be traversed on reversed order
	                 effectively giving priority to the styles in newArray
	     */

	  fi.prototype.intelligentMerge = function (cssObjectArray, newArray, reverse) {
	    if (reverse === undefined) {
	      reverse = false;
	    }


	    for (var i = 0; i < newArray.length; i++) {
	      this.intelligentCSSPush(cssObjectArray, newArray[i], reverse);
	    }
	    for (i = 0; i < cssObjectArray.length; i++) {
	      var cobj = cssObjectArray[i];
	      if (cobj.type === 'media' || cobj.type === 'keyframes') {
	        continue;
	      }
	      cobj.rules = this.compactRules(cobj.rules);
	    }
	  };

	  /*
	       inserts new css objects into a bigger css object
	       with same selectors groupped together
	        @param cssObjectArray, array of bigger css object to be pushed into
	       @param minimalObject, single css object
	       @param reverse [optional] default is false, if given, cssObjectArray will be reversly traversed
	               resulting more priority in minimalObject's styles
	     */

	  fi.prototype.intelligentCSSPush = function (cssObjectArray, minimalObject, reverse) {
	    var pushSelector = minimalObject.selector;
	    //find correct selector if not found just push minimalObject into cssObject
	    var cssObject = false;

	    if (reverse === undefined) {
	      reverse = false;
	    }

	    if (reverse === false) {
	      for (var i = 0; i < cssObjectArray.length; i++) {
	        if (cssObjectArray[i].selector === minimalObject.selector) {
	          cssObject = cssObjectArray[i];
	          break;
	        }
	      }
	    } else {
	      for (var j = cssObjectArray.length - 1; j > -1; j--) {
	        if (cssObjectArray[j].selector === minimalObject.selector) {
	          cssObject = cssObjectArray[j];
	          break;
	        }
	      }
	    }

	    if (cssObject === false) {
	      cssObjectArray.push(minimalObject); //just push, because cssSelector is new
	    } else {
	      if (minimalObject.type !== 'media') {
	        for (var ii = 0; ii < minimalObject.rules.length; ii++) {
	          var rule = minimalObject.rules[ii];
	          //find rule inside cssObject
	          var oldRule = this.findCorrespondingRule(cssObject.rules, rule.directive);
	          if (oldRule === false) {
	            cssObject.rules.push(rule);
	          } else if (rule.type == 'DELETED') {
	            oldRule.type = 'DELETED';
	          } else {
	            //rule found just update value

	            oldRule.value = rule.value;
	          }
	        }
	      } else {
	        cssObject.subStyles = minimalObject.subStyles; //TODO, make this intelligent too
	      }

	    }
	  };

	  /*
	       filter outs rule objects whose type param equal to DELETED
	        @param rules, array of rules
	        @returns rules array, compacted by deleting all unneccessary rules
	     */


	  fi.prototype.compactRules = function (rules) {
	    var newRules = [];
	    for (var i = 0; i < rules.length; i++) {
	      if (rules[i].type !== 'DELETED') {
	        newRules.push(rules[i]);
	      }
	    }
	    return newRules;
	  };
	  /*
	       computes string for ace editor using this.css or given cssBase optional parameter
	        @param [optional] cssBase, if given computes cssString from cssObject array
	     */

	  fi.prototype.getCSSForEditor = function (cssBase, depth) {
	    if (depth === undefined) {
	      depth = 0;
	    }
	    var ret = '';
	    if (cssBase === undefined) {
	      cssBase = this.css;
	    }
	    //append imports
	    for (var i = 0; i < cssBase.length; i++) {
	      if (cssBase[i].type == 'imports') {
	        ret += cssBase[i].styles + '\n\n';
	      }
	    }
	    for (i = 0; i < cssBase.length; i++) {
	      var tmp = cssBase[i];
	      if (tmp.selector === undefined) {//temporarily omit media queries
	        continue;
	      }
	      var comments = "";
	      if (tmp.comments !== undefined) {
	        comments = tmp.comments + '\n';
	      }

	      if (tmp.type == 'media') {//also put media queries to output
	        ret += comments + tmp.selector + '{\n';
	        ret += this.getCSSForEditor(tmp.subStyles, depth + 1);
	        ret += '}\n\n';
	      } else if (tmp.type !== 'keyframes' && tmp.type !== 'imports') {
	        ret += this.getSpaces(depth) + comments + tmp.selector + ' {\n';
	        ret += this.getCSSOfRules(tmp.rules, depth + 1);
	        ret += this.getSpaces(depth) + '}\n\n';
	      }
	    }

	    //append keyFrames
	    for (i = 0; i < cssBase.length; i++) {
	      if (cssBase[i].type == 'keyframes') {
	        ret += cssBase[i].styles + '\n\n';
	      }
	    }

	    return ret;
	  };

	  fi.prototype.getImports = function (cssObjectArray) {
	    var imps = [];
	    for (var i = 0; i < cssObjectArray.length; i++) {
	      if (cssObjectArray[i].type == 'imports') {
	        imps.push(cssObjectArray[i].styles);
	      }
	    }
	    return imps;
	  };
	  /*
	       given rules array, returns visually formatted css string
	       to be used inside editor
	     */
	  fi.prototype.getCSSOfRules = function (rules, depth) {
	    var ret = '';
	    for (var i = 0; i < rules.length; i++) {
	      if (rules[i] === undefined) {
	        continue;
	      }
	      if (rules[i].defective === undefined) {
	        ret += this.getSpaces(depth) + rules[i].directive + ' : ' + rules[i].value + ';\n';
	      } else {
	        ret += this.getSpaces(depth) + rules[i].value + ';\n';
	      }

	    }
	    return ret || '\n';
	  };

	  /*
	         A very simple helper function returns number of spaces appended in a single string,
	         the number depends input parameter, namely input*2
	     */
	  fi.prototype.getSpaces = function (num) {
	    var ret = '';
	    for (var i = 0; i < num * 4; i++) {
	      ret += ' ';
	    }
	    return ret;
	  };

	  /*
	       Given css string or objectArray, parses it and then for every selector,
	       prepends this.cssPreviewNamespace to prevent css collision issues
	        @returns css string in which this.cssPreviewNamespace prepended
	     */

	  fi.prototype.applyNamespacing = function (css, forcedNamespace) {
	    var cssObjectArray = css;
	    var namespaceClass = '.' + this.cssPreviewNamespace;
	    if (forcedNamespace !== undefined) {
	      namespaceClass = forcedNamespace;
	    }

	    if (typeof css === 'string') {
	      cssObjectArray = this.parseCSS(css);
	    }

	    for (var i = 0; i < cssObjectArray.length; i++) {
	      var obj = cssObjectArray[i];

	      //bypass namespacing for @font-face @keyframes @import
	      if (obj.selector.indexOf('@font-face') > -1 || obj.selector.indexOf('keyframes') > -1 || obj.selector.indexOf('@import') > -1 || obj.selector.indexOf('.form-all') > -1 || obj.selector.indexOf('#stage') > -1) {
	        continue;
	      }

	      if (obj.type !== 'media') {
	        var selector = obj.selector.split(',');
	        var newSelector = [];
	        for (var j = 0; j < selector.length; j++) {
	          if (selector[j].indexOf('.supernova') === -1) {//do not apply namespacing to selectors including supernova
	            newSelector.push(namespaceClass + ' ' + selector[j]);
	          } else {
	            newSelector.push(selector[j]);
	          }
	        }
	        obj.selector = newSelector.join(',');
	      } else {
	        obj.subStyles = this.applyNamespacing(obj.subStyles, forcedNamespace); //handle media queries as well
	      }
	    }

	    return cssObjectArray;
	  };

	  /*
	       given css string or object array, clears possible namespacing from
	       all of the selectors inside the css
	     */
	  fi.prototype.clearNamespacing = function (css, returnObj) {
	    if (returnObj === undefined) {
	      returnObj = false;
	    }
	    var cssObjectArray = css;
	    var namespaceClass = '.' + this.cssPreviewNamespace;
	    if (typeof css === 'string') {
	      cssObjectArray = this.parseCSS(css);
	    }

	    for (var i = 0; i < cssObjectArray.length; i++) {
	      var obj = cssObjectArray[i];

	      if (obj.type !== 'media') {
	        var selector = obj.selector.split(',');
	        var newSelector = [];
	        for (var j = 0; j < selector.length; j++) {
	          newSelector.push(selector[j].split(namespaceClass + ' ').join(''));
	        }
	        obj.selector = newSelector.join(',');
	      } else {
	        obj.subStyles = this.clearNamespacing(obj.subStyles, true); //handle media queries as well
	      }
	    }
	    if (returnObj === false) {
	      return this.getCSSForEditor(cssObjectArray);
	    } else {
	      return cssObjectArray;
	    }

	  };

	  /*
	       creates a new style tag (also destroys the previous one)
	       and injects given css string into that css tag
	     */
	  fi.prototype.createStyleElement = function (id, css, format) {
	    if (format === undefined) {
	      format = false;
	    }

	    if (this.testMode === false && format !== 'nonamespace') {
	      //apply namespacing classes
	      css = this.applyNamespacing(css);
	    }

	    if (typeof css != 'string') {
	      css = this.getCSSForEditor(css);
	    }
	    //apply formatting for css
	    if (format === true) {
	      css = this.getCSSForEditor(this.parseCSS(css));
	    }

	    if (this.testMode !== false) {
	      return this.testMode('create style #' + id, css); //if test mode, just pass result to callback
	    }

	    var __el = document.getElementById(id);
	    if (__el) {
	      __el.parentNode.removeChild(__el);
	    }

	    var head = document.head || document.getElementsByTagName('head')[0],
	    style = document.createElement('style');

	    style.id = id;
	    style.type = 'text/css';

	    head.appendChild(style);

	    if (style.styleSheet && !style.sheet) {
	      style.styleSheet.cssText = css;
	    } else {
	      style.appendChild(document.createTextNode(css));
	    }
	  };

	  global.cssjs = fi;

	})(window);

/***/ }),
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(265), __esModule: true };

/***/ }),
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(270);
	module.exports = __webpack_require__(4).setImmediate;


/***/ }),
/* 266 */
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
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

	var ctx = __webpack_require__(40);
	var invoke = __webpack_require__(266);
	var html = __webpack_require__(53);
	var cel = __webpack_require__(42);
	var global = __webpack_require__(2);
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
/* 268 */,
/* 269 */,
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(13);
	var $task = __webpack_require__(267);
	$export($export.G + $export.B, {
	  setImmediate: $task.set,
	  clearImmediate: $task.clear
	});


/***/ }),
/* 271 */,
/* 272 */,
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
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
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
/* 303 */
/***/ (function(module, exports) {

	// TODO Add in pre and post skipping options
	module.exports = {
	  /**
	   *  Declares a new hook to which you can add pres and posts
	   *  @param {String} name of the function
	   *  @param {Function} the method
	   *  @param {Function} the error handler callback
	   */
	  hook: function (name, fn, errorCb) {
	    if (arguments.length === 1 && typeof name === 'object') {
	      for (var k in name) { // `name` is a hash of hookName->hookFn
	        this.hook(k, name[k]);
	      }
	      return;
	    }

	    var proto = this.prototype || this
	      , pres = proto._pres = proto._pres || {}
	      , posts = proto._posts = proto._posts || {};
	    pres[name] = pres[name] || [];
	    posts[name] = posts[name] || [];

	    proto[name] = function () {
	      var self = this
	        , hookArgs // arguments eventually passed to the hook - are mutable
	        , lastArg = arguments[arguments.length-1]
	        , pres = this._pres[name]
	        , posts = this._posts[name]
	        , _total = pres.length
	        , _current = -1
	        , _asyncsLeft = proto[name].numAsyncPres
	        , _next = function () {
	            if (arguments[0] instanceof Error) {
	              return handleError(arguments[0]);
	            }
	            var _args = Array.prototype.slice.call(arguments)
	              , currPre
	              , preArgs;
	            if (_args.length && !(arguments[0] == null && typeof lastArg === 'function'))
	              hookArgs = _args;
	            if (++_current < _total) {
	              currPre = pres[_current]
	              if (currPre.isAsync && currPre.length < 2)
	                throw new Error("Your pre must have next and done arguments -- e.g., function (next, done, ...)");
	              if (currPre.length < 1)
	                throw new Error("Your pre must have a next argument -- e.g., function (next, ...)");
	              preArgs = (currPre.isAsync
	                          ? [once(_next), once(_asyncsDone)]
	                          : [once(_next)]).concat(hookArgs);
	              return currPre.apply(self, preArgs);
	            } else if (!proto[name].numAsyncPres) {
	              return _done.apply(self, hookArgs);
	            }
	          }
	        , _done = function () {
	            var args_ = Array.prototype.slice.call(arguments)
	              , ret, total_, current_, next_, done_, postArgs;

	            if (_current === _total) {
	              
	              next_ = function () {
	                if (arguments[0] instanceof Error) {
	                  return handleError(arguments[0]);
	                }
	                var args_ = Array.prototype.slice.call(arguments, 1)
	                  , currPost
	                  , postArgs;
	                if (args_.length) hookArgs = args_;
	                if (++current_ < total_) {
	                  currPost = posts[current_]
	                  if (currPost.length < 1)
	                    throw new Error("Your post must have a next argument -- e.g., function (next, ...)");
	                  postArgs = [once(next_)].concat(hookArgs);
	                  return currPost.apply(self, postArgs);
	                } else if (typeof lastArg === 'function'){
	                  // All post handlers are done, call original callback function
	                  return lastArg.apply(self, arguments);
	                }
	              };

	              // We are assuming that if the last argument provided to the wrapped function is a function, it was expecting
	              // a callback.  We trap that callback and wait to call it until all post handlers have finished.
	              if(typeof lastArg === 'function'){
	                args_[args_.length - 1] = once(next_);
	              }

	              total_ = posts.length;
	              current_ = -1;
	              ret = fn.apply(self, args_); // Execute wrapped function, post handlers come afterward

	              if (total_ && typeof lastArg !== 'function') return next_();  // no callback provided, execute next_() manually
	              return ret;
	            }
	          };
	      if (_asyncsLeft) {
	        function _asyncsDone (err) {
	          if (err && err instanceof Error) {
	            return handleError(err);
	          }
	          --_asyncsLeft || _done.apply(self, hookArgs);
	        }
	      }
	      function handleError (err) {
	        if ('function' == typeof lastArg)
	          return lastArg(err);
	        if (errorCb) return errorCb.call(self, err);
	        throw err;
	      }
	      return _next.apply(this, arguments);
	    };
	    
	    proto[name].numAsyncPres = 0;

	    return this;
	  },

	  pre: function (name, isAsync, fn, errorCb) {
	    if ('boolean' !== typeof arguments[1]) {
	      errorCb = fn;
	      fn = isAsync;
	      isAsync = false;
	    }
	    var proto = this.prototype || this
	      , pres = proto._pres = proto._pres || {};

	    this._lazySetupHooks(proto, name, errorCb);

	    if (fn.isAsync = isAsync) {
	      proto[name].numAsyncPres++;
	    }

	    (pres[name] = pres[name] || []).push(fn);
	    return this;
	  },
	  post: function (name, isAsync, fn) {
	    if (arguments.length === 2) {
	      fn = isAsync;
	      isAsync = false;
	    }
	    var proto = this.prototype || this
	      , posts = proto._posts = proto._posts || {};
	    
	    this._lazySetupHooks(proto, name);
	    (posts[name] = posts[name] || []).push(fn);
	    return this;
	  },
	  removePre: function (name, fnToRemove) {
	    var proto = this.prototype || this
	      , pres = proto._pres || (proto._pres || {});
	    if (!pres[name]) return this;
	    if (arguments.length === 1) {
	      // Remove all pre callbacks for hook `name`
	      pres[name].length = 0;
	    } else {
	      pres[name] = pres[name].filter( function (currFn) {
	        return currFn !== fnToRemove;
	      });
	    }
	    return this;
	  },
	  _lazySetupHooks: function (proto, methodName, errorCb) {
	    if ('undefined' === typeof proto[methodName].numAsyncPres) {
	      this.hook(methodName, proto[methodName], errorCb);
	    }
	  }
	};

	function once (fn, scope) {
	  return function fnWrapper () {
	    if (fnWrapper.hookCalled) return;
	    fnWrapper.hookCalled = true;
	    return fn.apply(scope, arguments);
	  };
	}


/***/ }),
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ })
/******/ ]);