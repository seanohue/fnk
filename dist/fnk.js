'use strict';
var arrayDiff = function(a, b) {
  return a.filter(function(x) {
    return b.indexOf(x) === -1;
  });
};
var createIterator = function(fn, times) {
  return function(x) {
    var result = fn(x);
    var i = times - 1;
    while (i) {
      i--;
      result = fn(result);
    }
    return result;
  };
};
var cache = function(func) {
  var cache = new Map();
  return function() {
    for (var args = [],
        $__1 = 0; $__1 < arguments.length; $__1++)
      args[$__1] = arguments[$__1];
    var key = $traceurRuntime.spread(args).map(JSON.stringify).join(',');
    return cache.has(key) ? cache.get(key) : cache.set(key, func.apply((void 0), $traceurRuntime.spread(args))).get(key);
  };
};
var fillArray = function(n, v) {
  return $traceurRuntime.spread(Array(parseInt(n, 10))).map(function() {
    return v;
  });
};
var has = function(collection, thing) {
  return collection.indexOf(thing) !== -1;
};
var hasNot = function(collection, thing) {
  return !has(collection, thing);
};
var values = function(obj) {
  var vals = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      vals.push(obj[key]);
    }
  }
  return vals;
};
var hasKeys = function(obj) {
  return !!Object.keys(obj).length;
};
var leftPad = function(amt, pad) {
  pad = pad || '';
  while (amt) {
    pad += ' ';
    amt--;
  }
  return pad;
};
var is = function(typeclass, thing) {
  return thing ? thing instanceof typeclass : false;
};
var reduceValues = function(obj, callback, starter) {
  return values(obj).reduce(callback, starter);
};
var firstWord = function(args) {
  return splitArgs(args)[0];
};
var splitArgs = function(args) {
  return args.toLowerCase().split(' ');
};
var compose = function() {
  for (var fns = [],
      $__1 = 0; $__1 < arguments.length; $__1++)
    fns[$__1] = arguments[$__1];
  return fns.reduce(function(f, g) {
    return function(a) {
      return f(g(a));
    };
  }, id);
};
var setBounds = function(min, max) {
  return function(n) {
    return Math.max(Math.min(max, stat), min);
  };
};
module.exports = {
  fillArray: fillArray,
  compose: compose,
  has: has,
  hasNot: hasNot,
  firstWord: firstWord,
  splitArgs: splitArgs,
  hasKeys: hasKeys,
  leftPad: leftPad,
  values: values,
  reduceValues: reduceValues,
  setBounds: setBounds,
  is: is,
  cache: cache,
  arrayDiff: arrayDiff,
  createIterator: createIterator
};