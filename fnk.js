'use strict';

/*
 * Takes two arrays, returns an array with any elements that the arrays do not share.
 */
const arrayDiff = (a, b) => a.filter(x => b.indexOf(x) === -1);

/**
 * Returns an iterator function to run fn on x a specified number of times.
 * @param function
 * @param number of times to iterate over the function
 * @return x value to pass into fn, then the function iterates over its own result
 */
const createIterator = (fn, times) => x => {
  let result = fn(x);
  let i = times - 1;
  while (i) {
    i--;
    result = fn(result);
  }
  return result;
};

/**
 * A memoizer using ES6 maps
 * @param  function to be memoized
 * @return function to take variable args, and utilize the cache.
 */

const cache = (func) => {
  const cache = new Map();

  return (...args) => {
    const key = [...args]
      .map(JSON.stringify)
      .join(',');

    return cache.has(key) ?
           cache.get(key) :
           cache.set(key, func(...args))
                .get(key);
    }
}

/**
 * Fills an array of size n with value v
 * @param number n of items to go into the array
 * @param value v of item to fill array with
 * @return an array of size n with value v
 */

const fillArray = (n, v) =>
  [...Array(parseInt(n, 10))].map(() => v);

/*
 * Takes an array or string and a thing and tells you if the thing is in the array or string.
 */
const has    = (collection, thing) => collection.indexOf(thing) !== -1;
const hasNot = (collection, thing) => !has(collection, thing);

/**
 * Takes an object and returns an array of all of its values.
 * @param  Obj
 * @return Array of values
 */
const values = obj => {
  let vals = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)){
      vals.push(obj[key]);
    }
  }
  return vals;
}

/**
 * Does the object have an array of keys?
 */
const hasKeys = obj => !!Object.keys(obj).length;

/**
 * Pads leftly.
 */
const leftPad = (amt, pad) => {
  pad = pad || '';
  while (amt) {
    pad += ' ';
    amt--;
  }
  return pad;
}

/*
 * Takes a constructor and a value and tells you if the thing is an instance of the constructor.
 */
const is = (typeclass, thing) => thing ? thing instanceof typeclass : false;

/*
 * Shortcut for reducing all the values of an object to a single value.
 * Makes parsing objects a bit more functional.
 */
const reduceValues = (obj, callback, starter) => values(obj).reduce(callback, starter);

/*
 * Gets the first word of a string.
 * For parsing command args.
 */
const firstWord = args => splitArgs(args)[0];

/*
 * Splits a string into an array of words.
 * For parsing command args.
 */
const splitArgs = args => args.toLowerCase().split(' ');

/**
 * Function composition with variable arity (lol jargon)
 * @param(s) any number of functions
 * @return  a function that will take all of the functions, then you can pass a single arg to it.
 */

const compose = (...fns) =>
  fns.reduce( (f, g) => (a) => f( g( a) ), id);

/**
 * Allows you to set min and max range for a number.
 * Mostly for preventing semi-random results from getting wacky.
 * Usage:
 * // Returns a number guaranteed to be between 0 and 100 inclusive but probably tending toward 100.
 * const arbitraryWithinBounds = setBounds(0, 100);
 * const arbitrarySmallNumber = arbitraryWithinBounds(Math.random() * 1000);
 * @param Number minimum bound
 * @param Number maximum bound
 * @return Function boundsChecker
 *   @param n Number
 *   @return Number n, unless n is out of bounds, then it will be the nearest bound.
 */
const setBounds = (min, max) => n =>
  Math.max(Math.min(max, stat), min);

module.exports = {
  fillArray, compose,
  has,       hasNot,
  firstWord, splitArgs,
  hasKeys,   leftPad,
  values,    reduceValues,
  setBounds, is,
  cache,     arrayDiff,
  createIterator
};
