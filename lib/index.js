(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.npmPackageES6DSLparser = factory());
}(this, (function () { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	var _defined$1 = /*#__PURE__*/Object.freeze({
		default: _defined,
		__moduleExports: _defined
	});

	var defined = ( _defined$1 && _defined ) || _defined$1;

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(defined(it));
	};

	var _toObject$1 = /*#__PURE__*/Object.freeze({
		default: _toObject,
		__moduleExports: _toObject
	});

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var _has$1 = /*#__PURE__*/Object.freeze({
		default: _has,
		__moduleExports: _has
	});

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var _cof$1 = /*#__PURE__*/Object.freeze({
		default: _cof,
		__moduleExports: _cof
	});

	var cof = ( _cof$1 && _cof ) || _cof$1;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

	var _iobject$1 = /*#__PURE__*/Object.freeze({
		default: _iobject,
		__moduleExports: _iobject
	});

	var IObject = ( _iobject$1 && _iobject ) || _iobject$1;

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return IObject(defined(it));
	};

	var _toIobject$1 = /*#__PURE__*/Object.freeze({
		default: _toIobject,
		__moduleExports: _toIobject
	});

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	var _toInteger$1 = /*#__PURE__*/Object.freeze({
		default: _toInteger,
		__moduleExports: _toInteger
	});

	var toInteger = ( _toInteger$1 && _toInteger ) || _toInteger$1;

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var _toLength$1 = /*#__PURE__*/Object.freeze({
		default: _toLength,
		__moduleExports: _toLength
	});

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	var _toAbsoluteIndex$1 = /*#__PURE__*/Object.freeze({
		default: _toAbsoluteIndex,
		__moduleExports: _toAbsoluteIndex
	});

	var toIObject = ( _toIobject$1 && _toIobject ) || _toIobject$1;

	var toLength = ( _toLength$1 && _toLength ) || _toLength$1;

	var toAbsoluteIndex = ( _toAbsoluteIndex$1 && _toAbsoluteIndex ) || _toAbsoluteIndex$1;

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
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

	var _arrayIncludes$1 = /*#__PURE__*/Object.freeze({
		default: _arrayIncludes,
		__moduleExports: _arrayIncludes
	});

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _global$1 = /*#__PURE__*/Object.freeze({
		default: _global,
		__moduleExports: _global
	});

	var global$1 = ( _global$1 && _global ) || _global$1;

	var SHARED = '__core-js_shared__';
	var store = global$1[SHARED] || (global$1[SHARED] = {});
	var _shared = function (key) {
	  return store[key] || (store[key] = {});
	};

	var _shared$1 = /*#__PURE__*/Object.freeze({
		default: _shared,
		__moduleExports: _shared
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _uid$1 = /*#__PURE__*/Object.freeze({
		default: _uid,
		__moduleExports: _uid
	});

	var require$$0 = ( _shared$1 && _shared ) || _shared$1;

	var uid = ( _uid$1 && _uid ) || _uid$1;

	var shared = require$$0('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};

	var _sharedKey$1 = /*#__PURE__*/Object.freeze({
		default: _sharedKey,
		__moduleExports: _sharedKey
	});

	var has = ( _has$1 && _has ) || _has$1;

	var require$$0$1 = ( _arrayIncludes$1 && _arrayIncludes ) || _arrayIncludes$1;

	var require$$1 = ( _sharedKey$1 && _sharedKey ) || _sharedKey$1;

	var arrayIndexOf = require$$0$1(false);
	var IE_PROTO = require$$1('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
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

	var _objectKeysInternal$1 = /*#__PURE__*/Object.freeze({
		default: _objectKeysInternal,
		__moduleExports: _objectKeysInternal
	});

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	var _enumBugKeys$1 = /*#__PURE__*/Object.freeze({
		default: _enumBugKeys,
		__moduleExports: _enumBugKeys
	});

	var $keys = ( _objectKeysInternal$1 && _objectKeysInternal ) || _objectKeysInternal$1;

	var enumBugKeys = ( _enumBugKeys$1 && _enumBugKeys ) || _enumBugKeys$1;

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};

	var _objectKeys$1 = /*#__PURE__*/Object.freeze({
		default: _objectKeys,
		__moduleExports: _objectKeys
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.5.5' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _core$1 = /*#__PURE__*/Object.freeze({
		default: _core,
		__moduleExports: _core,
		version: _core_1
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	var _aFunction$1 = /*#__PURE__*/Object.freeze({
		default: _aFunction,
		__moduleExports: _aFunction
	});

	var aFunction = ( _aFunction$1 && _aFunction ) || _aFunction$1;

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
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

	var _ctx$1 = /*#__PURE__*/Object.freeze({
		default: _ctx,
		__moduleExports: _ctx
	});

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _isObject$1 = /*#__PURE__*/Object.freeze({
		default: _isObject,
		__moduleExports: _isObject
	});

	var isObject = ( _isObject$1 && _isObject ) || _isObject$1;

	var _anObject = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _anObject$1 = /*#__PURE__*/Object.freeze({
		default: _anObject,
		__moduleExports: _anObject
	});

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	var _fails$1 = /*#__PURE__*/Object.freeze({
		default: _fails,
		__moduleExports: _fails
	});

	var require$$1$1 = ( _fails$1 && _fails ) || _fails$1;

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !require$$1$1(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var _descriptors$1 = /*#__PURE__*/Object.freeze({
		default: _descriptors,
		__moduleExports: _descriptors
	});

	var document = global$1.document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	var _domCreate = function (it) {
	  return is ? document.createElement(it) : {};
	};

	var _domCreate$1 = /*#__PURE__*/Object.freeze({
		default: _domCreate,
		__moduleExports: _domCreate
	});

	var require$$0$2 = ( _descriptors$1 && _descriptors ) || _descriptors$1;

	var require$$2 = ( _domCreate$1 && _domCreate ) || _domCreate$1;

	var _ie8DomDefine = !require$$0$2 && !require$$1$1(function () {
	  return Object.defineProperty(require$$2('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	var _ie8DomDefine$1 = /*#__PURE__*/Object.freeze({
		default: _ie8DomDefine,
		__moduleExports: _ie8DomDefine
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var _toPrimitive$1 = /*#__PURE__*/Object.freeze({
		default: _toPrimitive,
		__moduleExports: _toPrimitive
	});

	var anObject = ( _anObject$1 && _anObject ) || _anObject$1;

	var IE8_DOM_DEFINE = ( _ie8DomDefine$1 && _ie8DomDefine ) || _ie8DomDefine$1;

	var toPrimitive = ( _toPrimitive$1 && _toPrimitive ) || _toPrimitive$1;

	var dP = Object.defineProperty;

	var f = require$$0$2 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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

	var _objectDp = {
		f: f
	};

	var _objectDp$1 = /*#__PURE__*/Object.freeze({
		default: _objectDp,
		__moduleExports: _objectDp,
		f: f
	});

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _propertyDesc$1 = /*#__PURE__*/Object.freeze({
		default: _propertyDesc,
		__moduleExports: _propertyDesc
	});

	var dP$1 = ( _objectDp$1 && _objectDp ) || _objectDp$1;

	var createDesc = ( _propertyDesc$1 && _propertyDesc ) || _propertyDesc$1;

	var _hide = require$$0$2 ? function (object, key, value) {
	  return dP$1.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var _hide$1 = /*#__PURE__*/Object.freeze({
		default: _hide,
		__moduleExports: _hide
	});

	var core = ( _core$1 && _core ) || _core$1;

	var ctx = ( _ctx$1 && _ctx ) || _ctx$1;

	var hide = ( _hide$1 && _hide ) || _hide$1;

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
	  var target = IS_GLOBAL ? global$1 : IS_STATIC ? global$1[name] : (global$1[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global$1)
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
	var _export = $export;

	var _export$1 = /*#__PURE__*/Object.freeze({
		default: _export,
		__moduleExports: _export
	});

	var $export$1 = ( _export$1 && _export ) || _export$1;

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  $export$1($export$1.S + $export$1.F * require$$1$1(function () { fn(1); }), 'Object', exp);
	};

	var _objectSap$1 = /*#__PURE__*/Object.freeze({
		default: _objectSap,
		__moduleExports: _objectSap
	});

	var toObject = ( _toObject$1 && _toObject ) || _toObject$1;

	var getKeys = ( _objectKeys$1 && _objectKeys ) || _objectKeys$1;

	var require$$0$3 = ( _objectSap$1 && _objectSap ) || _objectSap$1;

	// 19.1.2.14 Object.keys(O)



	require$$0$3('keys', function () {
	  return function keys(it) {
	    return getKeys(toObject(it));
	  };
	});

	var keys = core.Object.keys;

	var keys$1 = /*#__PURE__*/Object.freeze({
		default: keys,
		__moduleExports: keys
	});

	var require$$0$4 = ( keys$1 && keys ) || keys$1;

	var keys$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$4, __esModule: true };
	});

	var _Object$keys = unwrapExports(keys$2);

	var f$1 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$1
	};

	var _objectGops$1 = /*#__PURE__*/Object.freeze({
		default: _objectGops,
		__moduleExports: _objectGops,
		f: f$1
	});

	var f$2 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$2
	};

	var _objectPie$1 = /*#__PURE__*/Object.freeze({
		default: _objectPie,
		__moduleExports: _objectPie,
		f: f$2
	});

	var gOPS = ( _objectGops$1 && _objectGops ) || _objectGops$1;

	var pIE = ( _objectPie$1 && _objectPie ) || _objectPie$1;

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || require$$1$1(function () {
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

	var _objectAssign$1 = /*#__PURE__*/Object.freeze({
		default: _objectAssign,
		__moduleExports: _objectAssign
	});

	var require$$0$5 = ( _objectAssign$1 && _objectAssign ) || _objectAssign$1;

	// 19.1.3.1 Object.assign(target, source)


	$export$1($export$1.S + $export$1.F, 'Object', { assign: require$$0$5 });

	var assign = core.Object.assign;

	var assign$1 = /*#__PURE__*/Object.freeze({
		default: assign,
		__moduleExports: assign
	});

	var require$$0$6 = ( assign$1 && assign ) || assign$1;

	var assign$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$6, __esModule: true };
	});

	var assign$3 = unwrapExports(assign$2);

	var assign$4 = /*#__PURE__*/Object.freeze({
		default: assign$3,
		__moduleExports: assign$2
	});

	var _assign = ( assign$4 && assign$3 ) || assign$4;

	var _extends = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



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
	});

	var _extends$1 = unwrapExports(_extends);

	var classCallCheck = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	});

	var _classCallCheck = unwrapExports(classCallCheck);

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export$1($export$1.S + $export$1.F * !require$$0$2, 'Object', { defineProperty: dP$1.f });

	var $Object = core.Object;
	var defineProperty = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};

	var defineProperty$1 = /*#__PURE__*/Object.freeze({
		default: defineProperty,
		__moduleExports: defineProperty
	});

	var require$$0$7 = ( defineProperty$1 && defineProperty ) || defineProperty$1;

	var defineProperty$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$7, __esModule: true };
	});

	var defineProperty$3 = unwrapExports(defineProperty$2);

	var defineProperty$4 = /*#__PURE__*/Object.freeze({
		default: defineProperty$3,
		__moduleExports: defineProperty$2
	});

	var _defineProperty = ( defineProperty$4 && defineProperty$3 ) || defineProperty$4;

	var createClass = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



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
	});

	var _createClass = unwrapExports(createClass);

	// Commonly used console helper methods.
	var Console = function () {
		function Console() {
			var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
			    config = _ref.config;

			_classCallCheck(this, Console);

			var def_config = {
				silent: false,
				prefix: ''
			};
			this.config = _extends$1({}, config, def_config);
		}

		/**
	 * setSilent 	sets visibility output
	 * @param 		{Boolean}	value	(required) If true, hides all output
	 */


		_createClass(Console, [{
			key: 'setSilent',
			value: function setSilent() {
				var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
				    _ref2$value = _ref2.value,
				    value = _ref2$value === undefined ? this.throwIfMissing('value') : _ref2$value;

				this.config.silent = value;
			}

			/**
	  * setPrefix 	sets output prefix
	  * @param 		{Boolean}	prefix	optional prefix
	  * @param 		{String}	color	optional: black,red,green,yellow,blue,purple,cyan,white
	  */

		}, {
			key: 'setPrefix',
			value: function setPrefix() {
				var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
				    prefix = _ref3.prefix,
				    color = _ref3.color;

				if (prefix) this.config.prefix = prefix;
				if (color) {
					var txt = '[' + this.config.prefix + '] ';
					var colors = require('colors/safe');
					this.config.prefix = colors[color](txt);
				} else {
					this.config.prefix = '[' + this.config.prefix + '] ';
				}
			}
		}, {
			key: 'clear',
			value: function clear() {
				var clearConsole = require('clear-any-console');
				clearConsole();
			}
		}, {
			key: 'out',
			value: function out() {
				var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
				    _ref4$message = _ref4.message,
				    message = _ref4$message === undefined ? this.throwIfMissing('message') : _ref4$message,
				    data = _ref4.data,
				    color = _ref4.color;

				var msg = message,
				    colors = require('colors/safe');
				if (!this.config.silent) {
					if (color && msg != '') {
						if (color in colors) {
							console.log(this.config.prefix + colors[color](msg));
						} else {
							console.log(this.config.prefix + msg);
						}
					} else if (msg.indexOf('error:') != -1) {
						console.error(this.config.prefix + colors.red(msg));
					}
					// data output
					if (data) {
						console.log('console.out():var=', data);
					}
				}
			}
		}, {
			key: 'outT',
			value: function outT() {
				var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
				    _ref5$message = _ref5.message,
				    message = _ref5$message === undefined ? this.throwIfMissing('message') : _ref5$message,
				    data = _ref5.data,
				    color = _ref5.color;

				var msg = message,
				    colors = require('colors/safe');
				if (!this.config.silent) {
					// timestamp prefix
					var d = new Date();
					var hr = d.getHours();
					if (hr < 10) {
						hr = "0" + hr;
					}
					var min = d.getMinutes();
					if (min < 10) {
						min = "0" + min;
					}
					var sec = d.getSeconds();
					if (sec < 10) {
						sec = "0" + sec;
					}
					var timeStamp = '[' + hr + ':' + min + ':' + sec + ']: ' + msg.trim();
					// output
					if (data && color) {
						this.out({ message: timeStamp, data: data, color: color });
					} else if (data) {
						this.out({ message: timeStamp, data: data });
					} else if (color) {
						this.out({ message: timeStamp, color: color });
					} else {
						this.out({ message: timeStamp });
					}
				}
			}

			/**
	  * title 		displays the given text as a title
	  * @param 		{String}	title		title to display
	  * @param 		{String}	color		(optional) color for box borders.
	  * @param 		{String}	titleColor	(optional) color for title. If undefined, uses the box color.
	  * @param 		{Object}	config		(optional) config overwrite params for boxen.
	  */

		}, {
			key: 'title',
			value: function title() {
				var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
				    _ref6$title = _ref6.title,
				    _title = _ref6$title === undefined ? this.throwIfMissing('title') : _ref6$title,
				    color = _ref6.color,
				    titleColor = _ref6.titleColor,
				    _ref6$config = _ref6.config,
				    config = _ref6$config === undefined ? {} : _ref6$config;

				var box = require('boxen'),
				    colors = require('colors/safe');
				var textc = titleColor ? titleColor : color;
				var resp = box(colors[textc](_title), _extends$1({
					borderColor: color,
					align: 'center',
					padding: {
						left: 2,
						right: 2
					},
					borderStyle: {
						topLeft: '*',
						topRight: '*',
						bottomLeft: '*',
						bottomRight: '*',
						horizontal: '*',
						vertical: '*'
					}
				}, config));
				console.log(resp);
			}
			/**
	  * table 		shows data array as table in the console
	  * @param 		{String}	title			title for table
	  * @param 		{Array}		data			array of objects for building the table.
	  * @param 		{String}	struct_sort		(optional) sort data before displaying. Supports: field asc/desc.
	  * @param 		{String}	color			(optional) color for table.
	  */

		}, {
			key: 'table',
			value: function table() {
				var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
				    _ref7$title = _ref7.title,
				    title = _ref7$title === undefined ? this.throwIfMissing('title') : _ref7$title,
				    _ref7$data = _ref7.data,
				    data = _ref7$data === undefined ? this.throwIfMissing('data') : _ref7$data,
				    struct_sort = _ref7.struct_sort,
				    color = _ref7.color;

				var info = data,
				    colors = require('colors/safe');
				if (struct_sort) {
					var sortObjectsArray = require('sort-objects-array');
					if (struct_sort.split(' ').length > 1) {
						// field desc, field asc
						info = sortObjectsArray(data, struct_sort.split(' ')[0], struct_sort.split(' ')[1]);
					} else {
						info = sortObjectsArray(data, struct_sort);
					}
				}
				var asciiTable = require('ascii-table');
				var table = new asciiTable(title);
				// heading
				var cols = _Object$keys(info[0]);
				table.setHeading(cols);
				// data
				for (var row in info) {
					var jdata = [];
					for (var col in cols) {
						jdata.push(info[row][cols[col]]);
					}
					table.addRow(jdata).setJustify(true);
				}
				//
				if (color) {
					console.log(colors[color](table.render()));
				} else {
					console.log(table.toString());
				}
			}

			// ********************
			// private methods
			// ********************

		}, {
			key: 'throwIfMissing',
			value: function throwIfMissing(name) {
				throw new Error('Missing ' + name + ' parameter!');
			}
		}]);

		return Console;
	}();

	return Console;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanMiLCIuLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcbiIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcbiIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG4iLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG4iLCJ2YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcbiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSU9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgaWYgKGtleSAhPSBJRV9QUk9UTykgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcbiIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG4iLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi41LjUnIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIElTX1dSQVAgPSB0eXBlICYgJGV4cG9ydC5XO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV07XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIga2V5LCBvd24sIG91dDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAob3duICYmIGhhcyhleHBvcnRzLCBrZXkpKSBjb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uIChDKSB7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQykge1xuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEMoKTtcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYgKElTX1BST1RPKSB7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYgKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0pIGhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG4iLCIvLyBtb3N0IE9iamVjdCBtZXRob2RzIGJ5IEVTNiBzaG91bGQgYWNjZXB0IHByaW1pdGl2ZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVksIGV4ZWMpIHtcbiAgdmFyIGZuID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldO1xuICB2YXIgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24gKCkgeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTtcbiIsIi8vIDE5LjEuMi4xNCBPYmplY3Qua2V5cyhPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2tleXMnLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBrZXlzKGl0KSB7XG4gICAgcmV0dXJuICRrZXlzKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Qua2V5cztcbiIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikgaWYgKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpIFRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuIiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GLCAnT2JqZWN0JywgeyBhc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKSB9KTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9hc3NpZ25cIik7XG5cbnZhciBfYXNzaWduMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9hc3NpZ24yLmRlZmF1bHQgfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7IGRlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mIH0pO1xuIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKSB7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7IiwiLy8gQ29tbW9ubHkgdXNlZCBjb25zb2xlIGhlbHBlciBtZXRob2RzLlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uc29sZSB7XG5cblx0Y29uc3RydWN0b3IoeyBjb25maWcgfT17fSkge1xuXHRcdGxldCBkZWZfY29uZmlnID0ge1xuXHRcdFx0c2lsZW50OmZhbHNlLFxuXHRcdFx0cHJlZml4OicnXG5cdFx0fTtcblx0XHR0aGlzLmNvbmZpZyA9IHsuLi5jb25maWcsIC4uLmRlZl9jb25maWd9O1xuXHR9XG5cblx0LyoqXG5cdCogc2V0U2lsZW50IFx0c2V0cyB2aXNpYmlsaXR5IG91dHB1dFxuXHQqIEBwYXJhbSBcdFx0e0Jvb2xlYW59XHR2YWx1ZVx0KHJlcXVpcmVkKSBJZiB0cnVlLCBoaWRlcyBhbGwgb3V0cHV0XG5cdCovXG5cdHNldFNpbGVudCh7IHZhbHVlPXRoaXMudGhyb3dJZk1pc3NpbmcoJ3ZhbHVlJykgfT17fSkge1xuXHRcdHRoaXMuY29uZmlnLnNpbGVudCA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCogc2V0UHJlZml4IFx0c2V0cyBvdXRwdXQgcHJlZml4XG5cdCogQHBhcmFtIFx0XHR7Qm9vbGVhbn1cdHByZWZpeFx0b3B0aW9uYWwgcHJlZml4XG5cdCogQHBhcmFtIFx0XHR7U3RyaW5nfVx0Y29sb3JcdG9wdGlvbmFsOiBibGFjayxyZWQsZ3JlZW4seWVsbG93LGJsdWUscHVycGxlLGN5YW4sd2hpdGVcblx0Ki9cblx0c2V0UHJlZml4KHsgcHJlZml4LGNvbG9yIH09e30pIHtcblx0XHRpZiAocHJlZml4KSB0aGlzLmNvbmZpZy5wcmVmaXg9cHJlZml4O1xuXHRcdGlmIChjb2xvcikge1xuXHRcdFx0bGV0IHR4dCA9IGBbJHt0aGlzLmNvbmZpZy5wcmVmaXh9XSBgO1xuXHRcdFx0bGV0IGNvbG9ycyA9IHJlcXVpcmUoJ2NvbG9ycy9zYWZlJyk7XG5cdFx0XHR0aGlzLmNvbmZpZy5wcmVmaXggPSBjb2xvcnNbY29sb3JdKHR4dCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuY29uZmlnLnByZWZpeCA9IGBbJHt0aGlzLmNvbmZpZy5wcmVmaXh9XSBgO1xuXHRcdH1cblx0fVxuXG5cdGNsZWFyKCkge1xuXHRcdGxldCBjbGVhckNvbnNvbGUgPSByZXF1aXJlKCdjbGVhci1hbnktY29uc29sZScpO1xuXHRcdGNsZWFyQ29uc29sZSgpO1xuXHR9XG5cblx0b3V0KHsgbWVzc2FnZT10aGlzLnRocm93SWZNaXNzaW5nKCdtZXNzYWdlJyksZGF0YSxjb2xvciB9PXt9KSB7XG5cdFx0bGV0IG1zZyA9IG1lc3NhZ2UsIGNvbG9ycyA9IHJlcXVpcmUoJ2NvbG9ycy9zYWZlJyk7XG5cdFx0aWYgKCF0aGlzLmNvbmZpZy5zaWxlbnQpIHtcblx0XHRcdGlmIChjb2xvciAmJiBtc2chPScnKSB7XG5cdFx0XHRcdGlmIChjb2xvciBpbiBjb2xvcnMpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLmNvbmZpZy5wcmVmaXggKyBjb2xvcnNbY29sb3JdKG1zZykpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMuY29uZmlnLnByZWZpeCArIG1zZyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAobXNnLmluZGV4T2YoJ2Vycm9yOicpIT0tMSkge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKHRoaXMuY29uZmlnLnByZWZpeCArIGNvbG9ycy5yZWQobXNnKSk7XG5cdFx0XHR9XG5cdFx0XHQvLyBkYXRhIG91dHB1dFxuXHRcdFx0aWYgKGRhdGEpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2NvbnNvbGUub3V0KCk6dmFyPScsZGF0YSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0b3V0VCh7IG1lc3NhZ2U9dGhpcy50aHJvd0lmTWlzc2luZygnbWVzc2FnZScpLGRhdGEsY29sb3IgfT17fSkge1xuXHRcdGxldCBtc2cgPSBtZXNzYWdlLCBjb2xvcnMgPSByZXF1aXJlKCdjb2xvcnMvc2FmZScpO1xuXHRcdGlmICghdGhpcy5jb25maWcuc2lsZW50KSB7XG5cdFx0XHQvLyB0aW1lc3RhbXAgcHJlZml4XG5cdFx0XHRsZXQgZCA9IG5ldyBEYXRlKCk7XG5cdFx0XHRsZXQgaHIgPSBkLmdldEhvdXJzKCk7XG5cdFx0XHRpZiAoaHIgPCAxMCkge1xuXHRcdFx0ICAgIGhyID0gXCIwXCIgKyBocjtcblx0XHRcdH1cblx0XHRcdGxldCBtaW4gPSBkLmdldE1pbnV0ZXMoKTtcblx0XHRcdGlmIChtaW4gPCAxMCkge1xuXHRcdFx0ICAgIG1pbiA9IFwiMFwiICsgbWluO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHNlYyA9IGQuZ2V0U2Vjb25kcygpO1xuXHRcdFx0aWYgKHNlYyA8IDEwKSB7XG5cdFx0XHQgICAgc2VjID0gXCIwXCIgKyBzZWM7XG5cdFx0XHR9XG5cdFx0XHRsZXQgdGltZVN0YW1wID0gYFske2hyfToke21pbn06JHtzZWN9XTogJHttc2cudHJpbSgpfWA7XG5cdFx0XHQvLyBvdXRwdXRcblx0XHRcdGlmIChkYXRhICYmIGNvbG9yKSB7XG5cdFx0XHRcdHRoaXMub3V0KHsgbWVzc2FnZTp0aW1lU3RhbXAsIGRhdGE6ZGF0YSwgY29sb3I6Y29sb3IgfSk7XG5cdFx0XHR9IGVsc2UgaWYgKGRhdGEpIHtcblx0XHRcdFx0dGhpcy5vdXQoeyBtZXNzYWdlOnRpbWVTdGFtcCwgZGF0YTpkYXRhIH0pO1xuXHRcdFx0fSBlbHNlIGlmIChjb2xvcikge1xuXHRcdFx0XHR0aGlzLm91dCh7IG1lc3NhZ2U6dGltZVN0YW1wLCBjb2xvcjpjb2xvciB9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMub3V0KHsgbWVzc2FnZTp0aW1lU3RhbXAgfSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCogdGl0bGUgXHRcdGRpc3BsYXlzIHRoZSBnaXZlbiB0ZXh0IGFzIGEgdGl0bGVcblx0KiBAcGFyYW0gXHRcdHtTdHJpbmd9XHR0aXRsZVx0XHR0aXRsZSB0byBkaXNwbGF5XG5cdCogQHBhcmFtIFx0XHR7U3RyaW5nfVx0Y29sb3JcdFx0KG9wdGlvbmFsKSBjb2xvciBmb3IgYm94IGJvcmRlcnMuXG5cdCogQHBhcmFtIFx0XHR7U3RyaW5nfVx0dGl0bGVDb2xvclx0KG9wdGlvbmFsKSBjb2xvciBmb3IgdGl0bGUuIElmIHVuZGVmaW5lZCwgdXNlcyB0aGUgYm94IGNvbG9yLlxuXHQqIEBwYXJhbSBcdFx0e09iamVjdH1cdGNvbmZpZ1x0XHQob3B0aW9uYWwpIGNvbmZpZyBvdmVyd3JpdGUgcGFyYW1zIGZvciBib3hlbi5cblx0Ki9cblxuXHR0aXRsZSh7IHRpdGxlPXRoaXMudGhyb3dJZk1pc3NpbmcoJ3RpdGxlJyksIGNvbG9yLCB0aXRsZUNvbG9yLCBjb25maWc9e30gfT17fSkge1xuXHRcdGNvbnN0IGJveCA9IHJlcXVpcmUoJ2JveGVuJyksIGNvbG9ycyA9IHJlcXVpcmUoJ2NvbG9ycy9zYWZlJyk7XG5cdFx0bGV0IHRleHRjID0gKHRpdGxlQ29sb3IpP3RpdGxlQ29sb3I6Y29sb3I7XG5cdFx0bGV0IHJlc3AgPSBib3goY29sb3JzW3RleHRjXSh0aXRsZSkse1xuXHRcdFx0Ym9yZGVyQ29sb3I6Y29sb3IsXG5cdFx0XHRhbGlnbjonY2VudGVyJyxcblx0XHRcdHBhZGRpbmc6IHtcblx0ICAgIFx0XHRsZWZ0OjIsXG5cdCAgICBcdFx0cmlnaHQ6MlxuXHQgICAgXHR9LFxuXHQgICAgXHRib3JkZXJTdHlsZToge1xuXHQgICAgXHRcdHRvcExlZnQ6ICcqJyxcblx0ICAgIFx0XHR0b3BSaWdodDogJyonLFxuXHQgICAgXHRcdGJvdHRvbUxlZnQ6ICcqJyxcblx0ICAgIFx0XHRib3R0b21SaWdodDogJyonLFxuXHQgICAgXHRcdGhvcml6b250YWw6ICcqJyxcblx0ICAgIFx0XHR2ZXJ0aWNhbDogJyonXG5cdCAgICBcdH1cblx0XHQsLi4uY29uZmlnfSk7XG5cdFx0Y29uc29sZS5sb2cocmVzcCk7XG5cdH1cblx0LyoqXG5cdCogdGFibGUgXHRcdHNob3dzIGRhdGEgYXJyYXkgYXMgdGFibGUgaW4gdGhlIGNvbnNvbGVcblx0KiBAcGFyYW0gXHRcdHtTdHJpbmd9XHR0aXRsZVx0XHRcdHRpdGxlIGZvciB0YWJsZVxuXHQqIEBwYXJhbSBcdFx0e0FycmF5fVx0XHRkYXRhXHRcdFx0YXJyYXkgb2Ygb2JqZWN0cyBmb3IgYnVpbGRpbmcgdGhlIHRhYmxlLlxuXHQqIEBwYXJhbSBcdFx0e1N0cmluZ31cdHN0cnVjdF9zb3J0XHRcdChvcHRpb25hbCkgc29ydCBkYXRhIGJlZm9yZSBkaXNwbGF5aW5nLiBTdXBwb3J0czogZmllbGQgYXNjL2Rlc2MuXG5cdCogQHBhcmFtIFx0XHR7U3RyaW5nfVx0Y29sb3JcdFx0XHQob3B0aW9uYWwpIGNvbG9yIGZvciB0YWJsZS5cblx0Ki9cblx0dGFibGUoeyB0aXRsZT10aGlzLnRocm93SWZNaXNzaW5nKCd0aXRsZScpLGRhdGE9dGhpcy50aHJvd0lmTWlzc2luZygnZGF0YScpLHN0cnVjdF9zb3J0LGNvbG9yIH09e30pIHtcblx0XHRsZXQgaW5mbyA9IGRhdGEsIGNvbG9ycyA9IHJlcXVpcmUoJ2NvbG9ycy9zYWZlJyk7XG5cdFx0aWYgKHN0cnVjdF9zb3J0KSB7XG5cdFx0XHRsZXQgc29ydE9iamVjdHNBcnJheSA9IHJlcXVpcmUoJ3NvcnQtb2JqZWN0cy1hcnJheScpO1xuXHRcdFx0aWYgKHN0cnVjdF9zb3J0LnNwbGl0KCcgJykubGVuZ3RoPjEpIHtcblx0XHRcdFx0Ly8gZmllbGQgZGVzYywgZmllbGQgYXNjXG5cdFx0XHRcdGluZm8gPSBzb3J0T2JqZWN0c0FycmF5KGRhdGEsIHN0cnVjdF9zb3J0LnNwbGl0KCcgJylbMF0sIHN0cnVjdF9zb3J0LnNwbGl0KCcgJylbMV0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aW5mbyA9IHNvcnRPYmplY3RzQXJyYXkoZGF0YSwgc3RydWN0X3NvcnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRsZXQgYXNjaWlUYWJsZSA9IHJlcXVpcmUoJ2FzY2lpLXRhYmxlJyk7XG5cdFx0bGV0IHRhYmxlID0gbmV3IGFzY2lpVGFibGUodGl0bGUpO1xuXHRcdC8vIGhlYWRpbmdcblx0XHRsZXQgY29scyA9IE9iamVjdC5rZXlzKGluZm9bMF0pO1xuXHRcdHRhYmxlLnNldEhlYWRpbmcoY29scyk7XG5cdFx0Ly8gZGF0YVxuXHRcdGZvciAobGV0IHJvdyBpbiBpbmZvKSB7XG5cdFx0XHRsZXQgamRhdGEgPSBbXTtcblx0XHRcdGZvciAobGV0IGNvbCBpbiBjb2xzKSB7XG5cdFx0XHRcdGpkYXRhLnB1c2goaW5mb1tyb3ddW2NvbHNbY29sXV0pO1xuXHRcdFx0fVxuXHRcdFx0dGFibGUuYWRkUm93KGpkYXRhKS5zZXRKdXN0aWZ5KHRydWUpO1xuIFx0XHR9XG5cdFx0Ly9cblx0XHRpZiAoY29sb3IpIHtcblx0XHRcdGNvbnNvbGUubG9nKGNvbG9yc1tjb2xvcl0odGFibGUucmVuZGVyKCkpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS5sb2codGFibGUudG9TdHJpbmcoKSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gKioqKioqKioqKioqKioqKioqKipcblx0Ly8gcHJpdmF0ZSBtZXRob2RzXG5cdC8vICoqKioqKioqKioqKioqKioqKioqXG5cblx0dGhyb3dJZk1pc3NpbmcobmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgJytuYW1lKycgcGFyYW1ldGVyIScpO1xuICAgIH1cblxufSJdLCJuYW1lcyI6WyJtaW4iLCJnbG9iYWwiLCJyZXF1aXJlJCQwIiwicmVxdWlyZSQkMSIsImRQIiwiJGV4cG9ydCIsImZhaWxzIiwiJGtleXMiLCJDb25zb2xlIiwiY29uZmlnIiwiZGVmX2NvbmZpZyIsInNpbGVudCIsInByZWZpeCIsInZhbHVlIiwidGhyb3dJZk1pc3NpbmciLCJjb2xvciIsInR4dCIsImNvbG9ycyIsInJlcXVpcmUiLCJjbGVhckNvbnNvbGUiLCJtZXNzYWdlIiwiZGF0YSIsIm1zZyIsImNvbnNvbGUiLCJsb2ciLCJpbmRleE9mIiwiZXJyb3IiLCJyZWQiLCJkIiwiRGF0ZSIsImhyIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwic2VjIiwiZ2V0U2Vjb25kcyIsInRpbWVTdGFtcCIsInRyaW0iLCJvdXQiLCJ0aXRsZSIsInRpdGxlQ29sb3IiLCJib3giLCJ0ZXh0YyIsInJlc3AiLCJib3JkZXJDb2xvciIsImFsaWduIiwicGFkZGluZyIsImxlZnQiLCJyaWdodCIsImJvcmRlclN0eWxlIiwidG9wTGVmdCIsInRvcFJpZ2h0IiwiYm90dG9tTGVmdCIsImJvdHRvbVJpZ2h0IiwiaG9yaXpvbnRhbCIsInZlcnRpY2FsIiwic3RydWN0X3NvcnQiLCJpbmZvIiwic29ydE9iamVjdHNBcnJheSIsInNwbGl0IiwibGVuZ3RoIiwiYXNjaWlUYWJsZSIsInRhYmxlIiwiY29scyIsInNldEhlYWRpbmciLCJyb3ciLCJqZGF0YSIsImNvbCIsInB1c2giLCJhZGRSb3ciLCJzZXRKdXN0aWZ5IiwicmVuZGVyIiwidG9TdHJpbmciLCJuYW1lIiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0NBQUE7Q0FDQSxZQUFjLEdBQUcsVUFBVSxFQUFFLEVBQUU7R0FDN0IsSUFBSSxFQUFFLElBQUksU0FBUyxFQUFFLE1BQU0sU0FBUyxDQUFDLHdCQUF3QixHQUFHLEVBQUUsQ0FBQyxDQUFDO0dBQ3BFLE9BQU8sRUFBRSxDQUFDO0VBQ1gsQ0FBQzs7Ozs7Ozs7O0NDSkY7O0NBRUEsYUFBYyxHQUFHLFVBQVUsRUFBRSxFQUFFO0dBQzdCLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzVCLENBQUM7Ozs7Ozs7Q0NKRixJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFD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
