/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/redux/es/redux.js":
/*!****************************************!*\
  !*** ./node_modules/redux/es/redux.js ***!
  \****************************************/
/*! exports provided: __DO_NOT_USE__ActionTypes, applyMiddleware, bindActionCreators, combineReducers, compose, createStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__DO_NOT_USE__ActionTypes\", function() { return ActionTypes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"applyMiddleware\", function() { return applyMiddleware; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bindActionCreators\", function() { return bindActionCreators; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"combineReducers\", function() { return combineReducers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"compose\", function() { return compose; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createStore\", function() { return createStore; });\n/* harmony import */ var symbol_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! symbol-observable */ \"./node_modules/symbol-observable/es/index.js\");\n\n\n/**\n * These are private action types reserved by Redux.\n * For any unknown actions, you must return the current state.\n * If the current state is undefined, you must return the initial state.\n * Do not reference these action types directly in your code.\n */\nvar randomString = function randomString() {\n  return Math.random().toString(36).substring(7).split('').join('.');\n};\n\nvar ActionTypes = {\n  INIT: \"@@redux/INIT\" + randomString(),\n  REPLACE: \"@@redux/REPLACE\" + randomString(),\n  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {\n    return \"@@redux/PROBE_UNKNOWN_ACTION\" + randomString();\n  }\n};\n\n/**\n * @param {any} obj The object to inspect.\n * @returns {boolean} True if the argument appears to be a plain object.\n */\nfunction isPlainObject(obj) {\n  if (typeof obj !== 'object' || obj === null) return false;\n  var proto = obj;\n\n  while (Object.getPrototypeOf(proto) !== null) {\n    proto = Object.getPrototypeOf(proto);\n  }\n\n  return Object.getPrototypeOf(obj) === proto;\n}\n\n/**\n * Creates a Redux store that holds the state tree.\n * The only way to change the data in the store is to call `dispatch()` on it.\n *\n * There should only be a single store in your app. To specify how different\n * parts of the state tree respond to actions, you may combine several reducers\n * into a single reducer function by using `combineReducers`.\n *\n * @param {Function} reducer A function that returns the next state tree, given\n * the current state tree and the action to handle.\n *\n * @param {any} [preloadedState] The initial state. You may optionally specify it\n * to hydrate the state from the server in universal apps, or to restore a\n * previously serialized user session.\n * If you use `combineReducers` to produce the root reducer function, this must be\n * an object with the same shape as `combineReducers` keys.\n *\n * @param {Function} [enhancer] The store enhancer. You may optionally specify it\n * to enhance the store with third-party capabilities such as middleware,\n * time travel, persistence, etc. The only store enhancer that ships with Redux\n * is `applyMiddleware()`.\n *\n * @returns {Store} A Redux store that lets you read the state, dispatch actions\n * and subscribe to changes.\n */\n\nfunction createStore(reducer, preloadedState, enhancer) {\n  var _ref2;\n\n  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {\n    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function.');\n  }\n\n  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {\n    enhancer = preloadedState;\n    preloadedState = undefined;\n  }\n\n  if (typeof enhancer !== 'undefined') {\n    if (typeof enhancer !== 'function') {\n      throw new Error('Expected the enhancer to be a function.');\n    }\n\n    return enhancer(createStore)(reducer, preloadedState);\n  }\n\n  if (typeof reducer !== 'function') {\n    throw new Error('Expected the reducer to be a function.');\n  }\n\n  var currentReducer = reducer;\n  var currentState = preloadedState;\n  var currentListeners = [];\n  var nextListeners = currentListeners;\n  var isDispatching = false;\n  /**\n   * This makes a shallow copy of currentListeners so we can use\n   * nextListeners as a temporary list while dispatching.\n   *\n   * This prevents any bugs around consumers calling\n   * subscribe/unsubscribe in the middle of a dispatch.\n   */\n\n  function ensureCanMutateNextListeners() {\n    if (nextListeners === currentListeners) {\n      nextListeners = currentListeners.slice();\n    }\n  }\n  /**\n   * Reads the state tree managed by the store.\n   *\n   * @returns {any} The current state tree of your application.\n   */\n\n\n  function getState() {\n    if (isDispatching) {\n      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');\n    }\n\n    return currentState;\n  }\n  /**\n   * Adds a change listener. It will be called any time an action is dispatched,\n   * and some part of the state tree may potentially have changed. You may then\n   * call `getState()` to read the current state tree inside the callback.\n   *\n   * You may call `dispatch()` from a change listener, with the following\n   * caveats:\n   *\n   * 1. The subscriptions are snapshotted just before every `dispatch()` call.\n   * If you subscribe or unsubscribe while the listeners are being invoked, this\n   * will not have any effect on the `dispatch()` that is currently in progress.\n   * However, the next `dispatch()` call, whether nested or not, will use a more\n   * recent snapshot of the subscription list.\n   *\n   * 2. The listener should not expect to see all state changes, as the state\n   * might have been updated multiple times during a nested `dispatch()` before\n   * the listener is called. It is, however, guaranteed that all subscribers\n   * registered before the `dispatch()` started will be called with the latest\n   * state by the time it exits.\n   *\n   * @param {Function} listener A callback to be invoked on every dispatch.\n   * @returns {Function} A function to remove this change listener.\n   */\n\n\n  function subscribe(listener) {\n    if (typeof listener !== 'function') {\n      throw new Error('Expected the listener to be a function.');\n    }\n\n    if (isDispatching) {\n      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');\n    }\n\n    var isSubscribed = true;\n    ensureCanMutateNextListeners();\n    nextListeners.push(listener);\n    return function unsubscribe() {\n      if (!isSubscribed) {\n        return;\n      }\n\n      if (isDispatching) {\n        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');\n      }\n\n      isSubscribed = false;\n      ensureCanMutateNextListeners();\n      var index = nextListeners.indexOf(listener);\n      nextListeners.splice(index, 1);\n    };\n  }\n  /**\n   * Dispatches an action. It is the only way to trigger a state change.\n   *\n   * The `reducer` function, used to create the store, will be called with the\n   * current state tree and the given `action`. Its return value will\n   * be considered the **next** state of the tree, and the change listeners\n   * will be notified.\n   *\n   * The base implementation only supports plain object actions. If you want to\n   * dispatch a Promise, an Observable, a thunk, or something else, you need to\n   * wrap your store creating function into the corresponding middleware. For\n   * example, see the documentation for the `redux-thunk` package. Even the\n   * middleware will eventually dispatch plain object actions using this method.\n   *\n   * @param {Object} action A plain object representing “what changed”. It is\n   * a good idea to keep actions serializable so you can record and replay user\n   * sessions, or use the time travelling `redux-devtools`. An action must have\n   * a `type` property which may not be `undefined`. It is a good idea to use\n   * string constants for action types.\n   *\n   * @returns {Object} For convenience, the same action object you dispatched.\n   *\n   * Note that, if you use a custom middleware, it may wrap `dispatch()` to\n   * return something else (for example, a Promise you can await).\n   */\n\n\n  function dispatch(action) {\n    if (!isPlainObject(action)) {\n      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');\n    }\n\n    if (typeof action.type === 'undefined') {\n      throw new Error('Actions may not have an undefined \"type\" property. ' + 'Have you misspelled a constant?');\n    }\n\n    if (isDispatching) {\n      throw new Error('Reducers may not dispatch actions.');\n    }\n\n    try {\n      isDispatching = true;\n      currentState = currentReducer(currentState, action);\n    } finally {\n      isDispatching = false;\n    }\n\n    var listeners = currentListeners = nextListeners;\n\n    for (var i = 0; i < listeners.length; i++) {\n      var listener = listeners[i];\n      listener();\n    }\n\n    return action;\n  }\n  /**\n   * Replaces the reducer currently used by the store to calculate the state.\n   *\n   * You might need this if your app implements code splitting and you want to\n   * load some of the reducers dynamically. You might also need this if you\n   * implement a hot reloading mechanism for Redux.\n   *\n   * @param {Function} nextReducer The reducer for the store to use instead.\n   * @returns {void}\n   */\n\n\n  function replaceReducer(nextReducer) {\n    if (typeof nextReducer !== 'function') {\n      throw new Error('Expected the nextReducer to be a function.');\n    }\n\n    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.\n    // Any reducers that existed in both the new and old rootReducer\n    // will receive the previous state. This effectively populates\n    // the new state tree with any relevant data from the old one.\n\n    dispatch({\n      type: ActionTypes.REPLACE\n    });\n  }\n  /**\n   * Interoperability point for observable/reactive libraries.\n   * @returns {observable} A minimal observable of state changes.\n   * For more information, see the observable proposal:\n   * https://github.com/tc39/proposal-observable\n   */\n\n\n  function observable() {\n    var _ref;\n\n    var outerSubscribe = subscribe;\n    return _ref = {\n      /**\n       * The minimal observable subscription method.\n       * @param {Object} observer Any object that can be used as an observer.\n       * The observer object should have a `next` method.\n       * @returns {subscription} An object with an `unsubscribe` method that can\n       * be used to unsubscribe the observable from the store, and prevent further\n       * emission of values from the observable.\n       */\n      subscribe: function subscribe(observer) {\n        if (typeof observer !== 'object' || observer === null) {\n          throw new TypeError('Expected the observer to be an object.');\n        }\n\n        function observeState() {\n          if (observer.next) {\n            observer.next(getState());\n          }\n        }\n\n        observeState();\n        var unsubscribe = outerSubscribe(observeState);\n        return {\n          unsubscribe: unsubscribe\n        };\n      }\n    }, _ref[symbol_observable__WEBPACK_IMPORTED_MODULE_0__[\"default\"]] = function () {\n      return this;\n    }, _ref;\n  } // When a store is created, an \"INIT\" action is dispatched so that every\n  // reducer returns their initial state. This effectively populates\n  // the initial state tree.\n\n\n  dispatch({\n    type: ActionTypes.INIT\n  });\n  return _ref2 = {\n    dispatch: dispatch,\n    subscribe: subscribe,\n    getState: getState,\n    replaceReducer: replaceReducer\n  }, _ref2[symbol_observable__WEBPACK_IMPORTED_MODULE_0__[\"default\"]] = observable, _ref2;\n}\n\n/**\n * Prints a warning in the console if it exists.\n *\n * @param {String} message The warning message.\n * @returns {void}\n */\nfunction warning(message) {\n  /* eslint-disable no-console */\n  if (typeof console !== 'undefined' && typeof console.error === 'function') {\n    console.error(message);\n  }\n  /* eslint-enable no-console */\n\n\n  try {\n    // This error was thrown as a convenience so that if you enable\n    // \"break on all exceptions\" in your console,\n    // it would pause the execution at this line.\n    throw new Error(message);\n  } catch (e) {} // eslint-disable-line no-empty\n\n}\n\nfunction getUndefinedStateErrorMessage(key, action) {\n  var actionType = action && action.type;\n  var actionDescription = actionType && \"action \\\"\" + String(actionType) + \"\\\"\" || 'an action';\n  return \"Given \" + actionDescription + \", reducer \\\"\" + key + \"\\\" returned undefined. \" + \"To ignore an action, you must explicitly return the previous state. \" + \"If you want this reducer to hold no value, you can return null instead of undefined.\";\n}\n\nfunction getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {\n  var reducerKeys = Object.keys(reducers);\n  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';\n\n  if (reducerKeys.length === 0) {\n    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';\n  }\n\n  if (!isPlainObject(inputState)) {\n    return \"The \" + argumentName + \" has unexpected type of \\\"\" + {}.toString.call(inputState).match(/\\s([a-z|A-Z]+)/)[1] + \"\\\". Expected argument to be an object with the following \" + (\"keys: \\\"\" + reducerKeys.join('\", \"') + \"\\\"\");\n  }\n\n  var unexpectedKeys = Object.keys(inputState).filter(function (key) {\n    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];\n  });\n  unexpectedKeys.forEach(function (key) {\n    unexpectedKeyCache[key] = true;\n  });\n  if (action && action.type === ActionTypes.REPLACE) return;\n\n  if (unexpectedKeys.length > 0) {\n    return \"Unexpected \" + (unexpectedKeys.length > 1 ? 'keys' : 'key') + \" \" + (\"\\\"\" + unexpectedKeys.join('\", \"') + \"\\\" found in \" + argumentName + \". \") + \"Expected to find one of the known reducer keys instead: \" + (\"\\\"\" + reducerKeys.join('\", \"') + \"\\\". Unexpected keys will be ignored.\");\n  }\n}\n\nfunction assertReducerShape(reducers) {\n  Object.keys(reducers).forEach(function (key) {\n    var reducer = reducers[key];\n    var initialState = reducer(undefined, {\n      type: ActionTypes.INIT\n    });\n\n    if (typeof initialState === 'undefined') {\n      throw new Error(\"Reducer \\\"\" + key + \"\\\" returned undefined during initialization. \" + \"If the state passed to the reducer is undefined, you must \" + \"explicitly return the initial state. The initial state may \" + \"not be undefined. If you don't want to set a value for this reducer, \" + \"you can use null instead of undefined.\");\n    }\n\n    if (typeof reducer(undefined, {\n      type: ActionTypes.PROBE_UNKNOWN_ACTION()\n    }) === 'undefined') {\n      throw new Error(\"Reducer \\\"\" + key + \"\\\" returned undefined when probed with a random type. \" + (\"Don't try to handle \" + ActionTypes.INIT + \" or other actions in \\\"redux/*\\\" \") + \"namespace. They are considered private. Instead, you must return the \" + \"current state for any unknown actions, unless it is undefined, \" + \"in which case you must return the initial state, regardless of the \" + \"action type. The initial state may not be undefined, but can be null.\");\n    }\n  });\n}\n/**\n * Turns an object whose values are different reducer functions, into a single\n * reducer function. It will call every child reducer, and gather their results\n * into a single state object, whose keys correspond to the keys of the passed\n * reducer functions.\n *\n * @param {Object} reducers An object whose values correspond to different\n * reducer functions that need to be combined into one. One handy way to obtain\n * it is to use ES6 `import * as reducers` syntax. The reducers may never return\n * undefined for any action. Instead, they should return their initial state\n * if the state passed to them was undefined, and the current state for any\n * unrecognized action.\n *\n * @returns {Function} A reducer function that invokes every reducer inside the\n * passed object, and builds a state object with the same shape.\n */\n\n\nfunction combineReducers(reducers) {\n  var reducerKeys = Object.keys(reducers);\n  var finalReducers = {};\n\n  for (var i = 0; i < reducerKeys.length; i++) {\n    var key = reducerKeys[i];\n\n    if (true) {\n      if (typeof reducers[key] === 'undefined') {\n        warning(\"No reducer provided for key \\\"\" + key + \"\\\"\");\n      }\n    }\n\n    if (typeof reducers[key] === 'function') {\n      finalReducers[key] = reducers[key];\n    }\n  }\n\n  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same\n  // keys multiple times.\n\n  var unexpectedKeyCache;\n\n  if (true) {\n    unexpectedKeyCache = {};\n  }\n\n  var shapeAssertionError;\n\n  try {\n    assertReducerShape(finalReducers);\n  } catch (e) {\n    shapeAssertionError = e;\n  }\n\n  return function combination(state, action) {\n    if (state === void 0) {\n      state = {};\n    }\n\n    if (shapeAssertionError) {\n      throw shapeAssertionError;\n    }\n\n    if (true) {\n      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);\n\n      if (warningMessage) {\n        warning(warningMessage);\n      }\n    }\n\n    var hasChanged = false;\n    var nextState = {};\n\n    for (var _i = 0; _i < finalReducerKeys.length; _i++) {\n      var _key = finalReducerKeys[_i];\n      var reducer = finalReducers[_key];\n      var previousStateForKey = state[_key];\n      var nextStateForKey = reducer(previousStateForKey, action);\n\n      if (typeof nextStateForKey === 'undefined') {\n        var errorMessage = getUndefinedStateErrorMessage(_key, action);\n        throw new Error(errorMessage);\n      }\n\n      nextState[_key] = nextStateForKey;\n      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;\n    }\n\n    return hasChanged ? nextState : state;\n  };\n}\n\nfunction bindActionCreator(actionCreator, dispatch) {\n  return function () {\n    return dispatch(actionCreator.apply(this, arguments));\n  };\n}\n/**\n * Turns an object whose values are action creators, into an object with the\n * same keys, but with every function wrapped into a `dispatch` call so they\n * may be invoked directly. This is just a convenience method, as you can call\n * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.\n *\n * For convenience, you can also pass an action creator as the first argument,\n * and get a dispatch wrapped function in return.\n *\n * @param {Function|Object} actionCreators An object whose values are action\n * creator functions. One handy way to obtain it is to use ES6 `import * as`\n * syntax. You may also pass a single function.\n *\n * @param {Function} dispatch The `dispatch` function available on your Redux\n * store.\n *\n * @returns {Function|Object} The object mimicking the original object, but with\n * every action creator wrapped into the `dispatch` call. If you passed a\n * function as `actionCreators`, the return value will also be a single\n * function.\n */\n\n\nfunction bindActionCreators(actionCreators, dispatch) {\n  if (typeof actionCreators === 'function') {\n    return bindActionCreator(actionCreators, dispatch);\n  }\n\n  if (typeof actionCreators !== 'object' || actionCreators === null) {\n    throw new Error(\"bindActionCreators expected an object or a function, instead received \" + (actionCreators === null ? 'null' : typeof actionCreators) + \". \" + \"Did you write \\\"import ActionCreators from\\\" instead of \\\"import * as ActionCreators from\\\"?\");\n  }\n\n  var boundActionCreators = {};\n\n  for (var key in actionCreators) {\n    var actionCreator = actionCreators[key];\n\n    if (typeof actionCreator === 'function') {\n      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);\n    }\n  }\n\n  return boundActionCreators;\n}\n\nfunction _defineProperty(obj, key, value) {\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n\n  return obj;\n}\n\nfunction ownKeys(object, enumerableOnly) {\n  var keys = Object.keys(object);\n\n  if (Object.getOwnPropertySymbols) {\n    keys.push.apply(keys, Object.getOwnPropertySymbols(object));\n  }\n\n  if (enumerableOnly) keys = keys.filter(function (sym) {\n    return Object.getOwnPropertyDescriptor(object, sym).enumerable;\n  });\n  return keys;\n}\n\nfunction _objectSpread2(target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var source = arguments[i] != null ? arguments[i] : {};\n\n    if (i % 2) {\n      ownKeys(source, true).forEach(function (key) {\n        _defineProperty(target, key, source[key]);\n      });\n    } else if (Object.getOwnPropertyDescriptors) {\n      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));\n    } else {\n      ownKeys(source).forEach(function (key) {\n        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));\n      });\n    }\n  }\n\n  return target;\n}\n\n/**\n * Composes single-argument functions from right to left. The rightmost\n * function can take multiple arguments as it provides the signature for\n * the resulting composite function.\n *\n * @param {...Function} funcs The functions to compose.\n * @returns {Function} A function obtained by composing the argument functions\n * from right to left. For example, compose(f, g, h) is identical to doing\n * (...args) => f(g(h(...args))).\n */\nfunction compose() {\n  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {\n    funcs[_key] = arguments[_key];\n  }\n\n  if (funcs.length === 0) {\n    return function (arg) {\n      return arg;\n    };\n  }\n\n  if (funcs.length === 1) {\n    return funcs[0];\n  }\n\n  return funcs.reduce(function (a, b) {\n    return function () {\n      return a(b.apply(void 0, arguments));\n    };\n  });\n}\n\n/**\n * Creates a store enhancer that applies middleware to the dispatch method\n * of the Redux store. This is handy for a variety of tasks, such as expressing\n * asynchronous actions in a concise manner, or logging every action payload.\n *\n * See `redux-thunk` package as an example of the Redux middleware.\n *\n * Because middleware is potentially asynchronous, this should be the first\n * store enhancer in the composition chain.\n *\n * Note that each middleware will be given the `dispatch` and `getState` functions\n * as named arguments.\n *\n * @param {...Function} middlewares The middleware chain to be applied.\n * @returns {Function} A store enhancer applying the middleware.\n */\n\nfunction applyMiddleware() {\n  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {\n    middlewares[_key] = arguments[_key];\n  }\n\n  return function (createStore) {\n    return function () {\n      var store = createStore.apply(void 0, arguments);\n\n      var _dispatch = function dispatch() {\n        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');\n      };\n\n      var middlewareAPI = {\n        getState: store.getState,\n        dispatch: function dispatch() {\n          return _dispatch.apply(void 0, arguments);\n        }\n      };\n      var chain = middlewares.map(function (middleware) {\n        return middleware(middlewareAPI);\n      });\n      _dispatch = compose.apply(void 0, chain)(store.dispatch);\n      return _objectSpread2({}, store, {\n        dispatch: _dispatch\n      });\n    };\n  };\n}\n\n/*\n * This is a dummy function to check if the function name has been altered by minification.\n * If the function has been minified and NODE_ENV !== 'production', warn the user.\n */\n\nfunction isCrushed() {}\n\nif ( true && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {\n  warning('You are currently using minified code outside of NODE_ENV === \"production\". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');\n}\n\n\n\n\n//# sourceURL=webpack:///./node_modules/redux/es/redux.js?");

/***/ }),

/***/ "./node_modules/symbol-observable/es/index.js":
/*!****************************************************!*\
  !*** ./node_modules/symbol-observable/es/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var _ponyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ponyfill.js */ \"./node_modules/symbol-observable/es/ponyfill.js\");\n/* global window */\n\n\nvar root;\n\nif (typeof self !== 'undefined') {\n  root = self;\n} else if (typeof window !== 'undefined') {\n  root = window;\n} else if (typeof global !== 'undefined') {\n  root = global;\n} else if (true) {\n  root = module;\n} else {}\n\nvar result = Object(_ponyfill_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(root);\n/* harmony default export */ __webpack_exports__[\"default\"] = (result);\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\"), __webpack_require__(/*! ./../../webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./node_modules/symbol-observable/es/index.js?");

/***/ }),

/***/ "./node_modules/symbol-observable/es/ponyfill.js":
/*!*******************************************************!*\
  !*** ./node_modules/symbol-observable/es/ponyfill.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return symbolObservablePonyfill; });\nfunction symbolObservablePonyfill(root) {\n\tvar result;\n\tvar Symbol = root.Symbol;\n\n\tif (typeof Symbol === 'function') {\n\t\tif (Symbol.observable) {\n\t\t\tresult = Symbol.observable;\n\t\t} else {\n\t\t\tresult = Symbol('observable');\n\t\t\tSymbol.observable = result;\n\t\t}\n\t} else {\n\t\tresult = '@@observable';\n\t}\n\n\treturn result;\n};\n\n\n//# sourceURL=webpack:///./node_modules/symbol-observable/es/ponyfill.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

/***/ }),

/***/ "./src/actions.js":
/*!************************!*\
  !*** ./src/actions.js ***!
  \************************/
/*! exports provided: setSlideshowPhotoId, setSlideshowPhotos, setSlideshowPhotoIdToPrevious, setSlideshowPhotoIdToNext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setSlideshowPhotoId\", function() { return setSlideshowPhotoId; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setSlideshowPhotos\", function() { return setSlideshowPhotos; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setSlideshowPhotoIdToPrevious\", function() { return setSlideshowPhotoIdToPrevious; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setSlideshowPhotoIdToNext\", function() { return setSlideshowPhotoIdToNext; });\n\n\nconst setSlideshowPhotoId = (id) => {\n  return {\n    type: 'SET_SLIDESHOW_PHOTO_ID',\n    id\n  };\n};\n\nconst setSlideshowPhotos = (photos) => {\n  return {\n    type: 'SET_SLIDESHOW_PHOTOS',\n    photos\n  };\n};\n\nconst setSlideshowPhotoIdToPrevious = () => {\n  return {\n    type: 'SET_SLIDESHOW_PHOTO_ID_TO_PREVIOUS'\n  };\n};\n\nconst setSlideshowPhotoIdToNext = () => {\n  return {\n    type: 'SET_SLIDESHOW_PHOTO_ID_TO_NEXT'\n  };\n};\n\n//# sourceURL=webpack:///./src/actions.js?");

/***/ }),

/***/ "./src/custom-elements/PhotosListPhoto.js":
/*!************************************************!*\
  !*** ./src/custom-elements/PhotosListPhoto.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PhotosListPhoto; });\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store */ \"./src/store.js\");\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions */ \"./src/actions.js\");\n\n\n\n\nclass PhotosListPhoto extends HTMLElement {\n\n  constructor() {\n    super();\n  }\n\n  showPhoto(evt) {\n    evt.preventDefault();\n    _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_1__[\"setSlideshowPhotoId\"])(this.dataset.id));\n  }\n\n  connectedCallback() {\n    this.addEventListener('click', this.showPhoto.bind(this));\n  }\n\n  discconnectedCallback() {\n    this.removeEventListener('click', this.showPhoto.bind(this));\n\n  }\n}\n\n\n//# sourceURL=webpack:///./src/custom-elements/PhotosListPhoto.js?");

/***/ }),

/***/ "./src/custom-elements/SiteOverlay.js":
/*!********************************************!*\
  !*** ./src/custom-elements/SiteOverlay.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SiteOverlay; });\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store */ \"./src/store.js\");\n\n\n\nclass SiteOverlay extends HTMLElement {\n\n  connectedCallback() {\n    _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe(() => {\n      const state = _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getState();\n      if (state.overlayShow) {\n        this.classList.add('site-overlay-visible');\n      } else {\n        this.classList.remove('site-overlay-visible');\n      }\n    });\n  }\n\n  disconnectedCallback() {\n    if (this._storeUnsubscribe) {\n      this._storeUnsubscribe();\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./src/custom-elements/SiteOverlay.js?");

/***/ }),

/***/ "./src/custom-elements/SlideshowNav.js":
/*!*********************************************!*\
  !*** ./src/custom-elements/SlideshowNav.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SlideshowNav; });\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store */ \"./src/store.js\");\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions */ \"./src/actions.js\");\n\n\n\n\n\nconst tpl = `\n<ul class=\"photos-slideshow-nav\">\n  <li class=\"previous\"><a>&#x2190;</a></li>\n  <li class=\"close\"><a>&times;</a></li>\n  <li class=\"next\"><a>&#x2192;</a></li>\n</ul>\n`;\n\nclass SlideshowNav extends HTMLElement {\n\n  constructor() {\n    super();\n    this._previous = this.previous.bind(this);\n    this._next = this.next.bind(this);\n    this._close = this.close.bind(this);\n  }\n\n  connectedCallback() {\n    this.innerHTML = tpl;\n    this.querySelector('.previous a').addEventListener('click', this._previous);\n    this.querySelector('.next a').addEventListener('click', this._next);\n    this.querySelector('.close a').addEventListener('click', this._close);\n    document.addEventListener('keydown', this.keydownHandler.bind(this));\n  }  \n\n  disconnectedCallback() {\n    this.querySelector('.previous a').removeEventListener('click', this._previous);\n    this.querySelector('.next a').removeEventListener('click', this._next);\n    this.querySelector('.close a').removeEventListener('click', this._close);\n    document.removeEventListener('keydown', this.keydownHandler.bind(this));\n  }\n\n  previous(evt) {\n    _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_1__[\"setSlideshowPhotoIdToPrevious\"])());\n  };\n\n  next(evt) {\n    _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_1__[\"setSlideshowPhotoIdToNext\"])());\n  };\n\n  close(evt) {\n    _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_1__[\"setSlideshowPhotoId\"])(null));\n  };\n\n  keydownHandler(evt) {    \n    switch(evt.keyCode) {\n      case 37:\n      case 38:\n        this.previous();\n      break;\n      case 39:\n      case 40:\n        this.next();\n      break;\n      case 27:\n        this.close();\n      break;\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/custom-elements/SlideshowNav.js?");

/***/ }),

/***/ "./src/custom-elements/SlideshowPhoto.js":
/*!***********************************************!*\
  !*** ./src/custom-elements/SlideshowPhoto.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SlideshowPhoto; });\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store */ \"./src/store.js\");\n\n\n\nclass SlideshowPhoto extends HTMLElement {\n\n  connectedCallback() {\n    this.update();\n    this._storeUnsubscribe = _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe(() => {\n      this.update();\n    });\n  }\n\n  disconnectedCallback() {\n    this.classList.remove('photo-visible');\n    this._storeUnsubscribe();\n  }\n\n  update() {\n    const state = _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getState();\n    if (state.slideshowPhotoId) {\n      this.show(state.slideshowPhotoId);\n    } else {\n      this.hide();\n    }\n  }\n\n  show(id) {\n    if (this.dataset.id === id) {\n      \n      const existingImg = this.querySelector('img');\n      if (existingImg.src !== this.dataset.backgroundImage) {\n        existingImg.onload = evt => {\n          const state = _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getState();\n          if (state.slideshowPhotoId === this.dataset.id) {\n            this.className = 'photo-visible';\n          }\n        };\n        existingImg.src = this.dataset.backgroundImage;// use lower res that are already loaded!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n      } else {\n        this.className = 'photo-visible';\n      }\n    } else {\n      this.className = ''\n    }\n  }\n\n  hide() {\n    this.className = '';\n    //this.classList.remove('photo-visible');\n  }\n\n}\n\n\n//# sourceURL=webpack:///./src/custom-elements/SlideshowPhoto.js?");

/***/ }),

/***/ "./src/custom-elements/SlideshowPhotos.js":
/*!************************************************!*\
  !*** ./src/custom-elements/SlideshowPhotos.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SlideshowPhotos; });\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store */ \"./src/store.js\");\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions */ \"./src/actions.js\");\n\n\n\nclass SlideshowPhotos extends HTMLElement {\n\n  constructor() {\n    super();\n  }\n\n  connectedCallback() {\n    const photos = Array.from(this.querySelectorAll('slideshow-photo'));\n    const photosData = photos.map((photo, listIndex) => {\n      const { id/*, title, url_s,*/, url_o/*, date_taken,flickr_page_url*/, urlO } = photo.dataset;\n      return {\n        id, listIndex, urlO\n      };\n    });\n    // Load data from existing html into store\n    _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"].dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_1__[\"setSlideshowPhotos\"])(photosData));\n\n  }\n}\n\n//# sourceURL=webpack:///./src/custom-elements/SlideshowPhotos.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _touch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./touch.js */ \"./src/touch.js\");\n/* harmony import */ var _touch_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_touch_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lazy_load_background_images__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lazy-load-background-images */ \"./src/lazy-load-background-images.js\");\n/* harmony import */ var _lazy_load_background_images__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lazy_load_background_images__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _custom_elements_SiteOverlay_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom-elements/SiteOverlay.js */ \"./src/custom-elements/SiteOverlay.js\");\n/* harmony import */ var _custom_elements_SlideshowPhoto_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./custom-elements/SlideshowPhoto.js */ \"./src/custom-elements/SlideshowPhoto.js\");\n/* harmony import */ var _custom_elements_SlideshowPhotos_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./custom-elements/SlideshowPhotos.js */ \"./src/custom-elements/SlideshowPhotos.js\");\n/* harmony import */ var _custom_elements_SlideshowNav_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./custom-elements/SlideshowNav.js */ \"./src/custom-elements/SlideshowNav.js\");\n/* harmony import */ var _custom_elements_PhotosListPhoto_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./custom-elements/PhotosListPhoto.js */ \"./src/custom-elements/PhotosListPhoto.js\");\n\n\n\n\n//import store from './store';\n\n\n\n\n\n\n\ncustomElements.define('site-overlay', _custom_elements_SiteOverlay_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\ncustomElements.define('slideshow-photo', _custom_elements_SlideshowPhoto_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\ncustomElements.define('slideshow-photos', _custom_elements_SlideshowPhotos_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\ncustomElements.define('slideshow-nav', _custom_elements_SlideshowNav_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\ncustomElements.define('photos-list-photo', _custom_elements_PhotosListPhoto_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/lazy-load-background-images.js":
/*!********************************************!*\
  !*** ./src/lazy-load-background-images.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n(function() {\n  const lazyBackgrounds = [ ...document.querySelectorAll('.lazy-load') ];\n\n  if (lazyBackgrounds.length === 0) {\n    return;\n  }\n\n  if (typeof window != 'undefined' && 'IntersectionObserver' in window) {\n    let lazyBackgroundObserver = new IntersectionObserver(function(entries) {\n      entries.forEach(async function(entry) {\n        if (entry.isIntersecting) {\n          const src = entry.target.dataset.src;\n          if (src) {\n            preloadImages( [ src ]).then(function() {\n              entry.target.classList.remove('lazy-load');\n              entry.target.classList.add('lazy-loaded');\n            });\n            entry.target.src = src;\n            lazyBackgroundObserver.unobserve(entry.target);\n          }\n        }\n      })\n    })\n\n    lazyBackgrounds.forEach(function(lazyBackground) {\n      lazyBackgroundObserver.observe(lazyBackground)\n    })\n\n  } else {\n    // If IntersectionObserver is not supported, load all images\n    lazyBackgrounds.forEach(el => {\n      \n      setTimeout(() => {\n        el.classList.add('lazy-loaded')\n        el.classList.remove('lazy')\n      }, 100)\n      \n    })\n  }\n})();\n\n//# sourceURL=webpack:///./src/lazy-load-background-images.js?");

/***/ }),

/***/ "./src/reducers.js":
/*!*************************!*\
  !*** ./src/reducers.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nconst defaultState = {\n  overlayTemplateId: null,\n  slideshowPhotoId: null,\n  slideshowPhotos: []\n};\n\nfunction appReducer(state = defaultState, action) {\n  switch (action.type) {\n\n    case 'SET_SLIDESHOW_PHOTO_ID': {// current photo/object\n      if (action.id) {\n        return { ...state, overlayShow: true, slideshowPhotoId: action.id };\n      }\n      return { ...state, overlayShow: false, slideshowPhotoId: null };\n    }\n\n    case 'SET_SLIDESHOW_PHOTOS': {\n      if (action.photos) {\n        return { ...state, slideshowPhotos: action.photos };\n      }\n      return state;\n    }\n\n    case 'SET_SLIDESHOW_PHOTO_ID_TO_PREVIOUS': {\n      if (!state.slideshowPhotos.length) {\n        return state;\n      }\n      const currentPhoto = state.slideshowPhotos.find((photo => photo.id === state.slideshowPhotoId));\n      if (currentPhoto) {\n        const previousPhoto = state.slideshowPhotos[currentPhoto.listIndex - 1];\n        if (previousPhoto) {\n          return { ...state, slideshowPhotoId: previousPhoto.id };\n        }\n      }\n      return state;\n    }\n\n    case 'SET_SLIDESHOW_PHOTO_ID_TO_NEXT': {\n      if (!state.slideshowPhotos.length) {\n        return state;\n      }\n      const currentPhoto = state.slideshowPhotos.find((photo => photo.id === state.slideshowPhotoId));\n      if (currentPhoto) {\n        const nextPhoto = state.slideshowPhotos[currentPhoto.listIndex + 1];\n        if (nextPhoto) {\n          return { ...state, slideshowPhotoId: nextPhoto.id };\n        }\n      }\n\n      return state;\n    }\n\n    default:\n      return state;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (appReducer);\n\n//# sourceURL=webpack:///./src/reducers.js?");

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducers */ \"./src/reducers.js\");\n\n\n\n\nlet store;\nif (!store) {\n  store = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(_reducers__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (store);\n\n\n//# sourceURL=webpack:///./src/store.js?");

/***/ }),

/***/ "./src/touch.js":
/*!**********************!*\
  !*** ./src/touch.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\ndocument.addEventListener('touchstart', handleTouchStart, { passive: true });    \ndocument.addEventListener('touchmove', handleTouchMove, { passive: true });\n\nvar xDown = null;\nvar yDown = null;\n\nfunction getTouches(evt) {\n  return evt.touches;\n}\n\nfunction handleTouchStart(evt) {\n  const firstTouch = getTouches(evt)[0];\n  xDown = firstTouch.clientX;\n  yDown = firstTouch.clientY;\n};\n\nfunction handleTouchMove(evt) {\n  if ( ! xDown || ! yDown ) {\n    return;\n  }\n\n  var xUp = evt.touches[0].clientX;                  \n  var yUp = evt.touches[0].clientY;\n\n  var xDiff = xDown - xUp;\n  var yDiff = yDown - yUp;\n  \n  document.dispatchEvent(new CustomEvent('touch-swiped'));\n\n  if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/\n    if ( xDiff > 0 ) {\n      document.dispatchEvent(new CustomEvent('touch-swiped-left'));\n    } else {\n      document.dispatchEvent(new CustomEvent('touch-swiped-right'));\n\n    }             \n  } else {\n    if ( yDiff > 0 ) {\n      document.dispatchEvent(new CustomEvent('touch-swiped-up'));\n    } else { \n      document.dispatchEvent(new CustomEvent('touch-swiped-down'));\n    }                                 \n  }\n  /* reset values */\n  xDown = null;\n  yDown = null;                       \n};\n\n\n//# sourceURL=webpack:///./src/touch.js?");

/***/ })

/******/ });