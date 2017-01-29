A library of utility functions, written in ES6 and transpiled using babel and uglify.

Taken from a handful of utility functions I found myself using all over the place in my fork of [RanvierMUD](https://github.com/seanohue/ranviermud).

Install using `npm install fnk --save`

Use cases:

```javascript
const _ = require('fnk');

// Finding something in a string or array:
_.has('potatoes', 'toes')   // true
_.has([true, false], false) // true
_.hasNot([true, false], 'toes') // true


// Finding the difference between two arrays.
_.arrayDiff(['a', 'b', 'c'], ['a']) // ['b', 'c']


// Memoization of functions, using ES6 Maps. 
// Fn can take variable arguments.
// Polyfill if Maps are not supported natively.
_.cache(fn);  
fn(x) // does something complicated
fn(x) // simply gets result from cache


// Create and fill an array with a value.
// Equivalent to new Array(n).fill(v), but does not require Array.fill polyfill.
_.fillArray(4, 'bazinga') // ['bazinga', 'bazinga', 'bazinga', 'bazinga']


// Creating a functional iterator.
// Will call the function N times, passing in the result each time.
const quadruple = _.createIterator(x => x + x, 2);
quadruple('f') // 'ffff'


// Get values from an object
// kind of a polyfill for Object.values
// but shortcuts if the object already has a .values method.
_.values({1: 'a', 2: 'b'}) // ['a', 'b']


// Reduce over values, shortcut for _.values(obj).reduce
_.reduceValues({1: 'a', 2: 'b'}, (x, acc) => acc + x, '') // 'ab'


// Checks to see if the object is empty or not...
_.hasKeys({}) // false
_.haskeys({'potato': undefined}) // true


// Function composition with variable number of functions.
// Reduces functions right to left.
// Only takes a single arg so it's best to pass in an object and destructure it in each of the functions.
const doStupidMath = _.compose(x => x + 1, x => x * 2, x => x + 100);
doStupidMath(2) // 205


// Pads leftly
_.leftPad(5, 'potatoes', '*') // '*****potatoes'

// Nicer-looking typechecking
const isPlayer = (thing) => is(Player);
isPlayer(potato) // false
isPlayer(new Player()) // true

// Setting bounds for numbers to ensure they are in a certain range.
const mustBePositive = _.setBounds(1, Infinity);
mustBePositive(-100) // 1
mustBePositive(52) // 52

```
