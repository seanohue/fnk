'use strict';

/*
 * Takes two arrays, returns an array with any elements that the arrays do not share.
 */

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var arrayDiff = function arrayDiff(a, b) {
  return a.filter(function (x) {
    return b.indexOf(x) === -1;
  });
};

/*
  Takes a higher order func as a string, returns a func that takes a thing
  (The thing may be an array), and a functor, then applies the functor either
  as a regular function (if the thing is not an array-like)
  or applies it to the iterable using the wrapped higher order function.

  Example:
  maybeMap([1, 2, 3], double); // [2, 4, 6]
  maybeMap(37, double); // 74

  */
var maybeIterableWrapper = function maybeIterableWrapper(higherOrderFunc) {
  return function (thing, fn) {
    return Array.isArray ? thing[higherOrderFunc](fn) : fn(thing);
  };
};
var maybeForEach = maybeIterableWrapper('forEach');
var maybeSort = maybeIterableWrapper('sort');
var maybeMap = maybeIterableWrapper('map');

/**
 * Returns an iterator function to run fn on x a specified number of times.
 * @param function
 * @param number of times to iterate over the function
 * @return x value to pass into fn, then the function iterates over its own result
 */
var createIterator = function createIterator(fn, times) {
  return function (x) {
    var result = fn(x);
    var i = times - 1;
    while (i) {
      i--;
      result = fn(result);
    }
    return result;
  };
};

/**
 * A memoizer using ES6 maps
 * @param  function to be memoized
 * @return function to take variable args, and utilize the cache.
 */

var cache = function cache(func) {
  var cache = new Map();

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var key = [].concat(args).map(JSON.stringify).join(',');

    return cache.has(key) ? cache.get(key) : cache.set(key, func.apply(undefined, args)).get(key);
  };
};

/**
 * Fills an array of size n with value v
 * @param number n of items to go into the array
 * @param value v of item to fill array with
 * @return an array of size n with value v
 */

var fillArray = function fillArray(n, v) {
  return [].concat(_toConsumableArray(Array(parseInt(n, 10)))).map(function () {
    return v;
  });
};

/*
 * Takes an array or string and a thing and tells you if the thing is in the array or string.
 */
var has = function has(collection, thing) {
  return collection.indexOf(thing) !== -1;
};
var hasNot = function hasNot(collection, thing) {
  return !has(collection, thing);
};

/**
 * Takes an object and returns an array of all of its values.
 * @param  Obj
 * @return Array of values
 */
var values = function values(obj) {
  var vals = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      vals.push(obj[key]);
    }
  }
  return vals;
};

/**
 * Does the object have an array of keys?
 */
var hasKeys = function hasKeys(obj) {
  return !!Object.keys(obj).length;
};

/**
 * Pads leftly.
 */
var leftPad = function leftPad(amt, pad) {
  pad = pad || '';
  while (amt) {
    pad += ' ';
    amt--;
  }
  return pad;
};

/*
 * Takes a constructor and a value and tells you if the thing is an instance of the constructor.
 */
var is = function is(typeclass, thing) {
  return thing ? thing instanceof typeclass : false;
};

/*
 * Shortcut for reducing all the values of an object to a single value.
 * Makes parsing objects a bit more functional.
 */
var reduceValues = function reduceValues(obj, callback, starter) {
  return values(obj).reduce(callback, starter);
};

/*
 * Gets the first word of a string.
 * For parsing command args.
 */
var firstWord = function firstWord(args) {
  return splitArgs(args)[0];
};

/*
 * Splits a string into an array of words.
 * For parsing command args.
 */
var splitArgs = function splitArgs(args) {
  return args.toLowerCase().split(' ');
};

/**
 * Function composition with variable arity (lol jargon)
 * @param(s) any number of functions
 * @return  a function that will take all of the functions, then you can pass a single arg to it.
 */

var compose = function compose() {
  for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }

  return fns.reduce(function (f, g) {
    return function (a) {
      return f(g(a));
    };
  }, id);
};

/**
 * Allows you to set min and max range for a number.
 * Mostly for preventing semi-random results from getting wacky.
 * Usage:
 * // Returns a number guaranteed to be between 0 and 100 inclusive but probably tending toward 100.
 * const arbitraryWithinBounds = setBounds(0, 100);
 * const arbitrarySmallNumber  = arbitraryWithinBounds(Math.random() * 1000);
 * @param Number minimum bound
 * @param Number maximum bound
 * @return Function boundsChecker
 *   @param n Number
 *   @return Number n, unless n is out of bounds, then it will be the nearest bound.
 */
var setBounds = function setBounds(min, max) {
  return function (n) {
    return Math.max(Math.min(max, stat), min);
  };
};

module.exports = {
  fillArray: fillArray, compose: compose,
  has: has, hasNot: hasNot,
  firstWord: firstWord, splitArgs: splitArgs,
  hasKeys: hasKeys, leftPad: leftPad,
  values: values, reduceValues: reduceValues,
  setBounds: setBounds, is: is,
  cache: cache, arrayDiff: arrayDiff,
  maybeMap: maybeMap, maybeSort: maybeSort,
  createIterator: createIterator,
  maybeIterableWrapper: maybeIterableWrapper,
  maybeForEach: maybeForEach
};

//# sourceMappingURL=fnk.js.map