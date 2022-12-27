// Foundational Knowledge for Writing Pure functions ... and getting into
// The Functional Programming paradigm

// Javascript Data Types

// Primitive vs Structural

/*
  Primitive:
  1) undefined
  2) Boolean
  3) Number
  4) String
  5) BigInt
  6) Symbol
*/

/*
  Structural:
  1) Object: (new) Object, Array, Map, Set, WeakMap, Date
  2) Function
*/

// Value vs Reference
// Primitives pass values:
let x = 2;
let y = x;
y += 1;
console.log(y);
console.log(x);

// Structural types uses references:
let xArray = [1, 2, 3];
let yArray = xArray;
yArray.push(4);
console.log(yArray);
console.log(xArray);

// Mutable vs Immutable

// Primitives are immutable
let myName = "Foo";
myName[0] = "W"; // nope!
console.log(myName);

// Reassignment is not the same as mutable
myName = "Woo";
console.log(myName);

// Structures contain mutable data
yArray[0] = 9;
console.log(yArray);
console.log(xArray); // oops, they share the same reference in memory...

// Pure functions require you to avoid mutating the data

// Impure function that mutates the data
// (Note: there's nothing wrong with it to be impure, it is just a name,
//  sometimes they're necessary, but in this example it is impure just
//  because it mutates the data)

const addToScoreHistory = (array, score) => {
  array.push(score);
  return array;
};

const scoreArray = [11, 22, 33];
console.log(addToScoreHistory(scoreArray, 44));

// This mutates the original array
// This is considered to be a side-effect

// Notice: "const" does not make the array immutable
// You cannot reassign the array to other type, but you can still change
// its content.

// We need to modify our function so it does not mutate the original
// data

// Shallow copy vs. Deep copy (clones)

// Shallow copy

// With the spread operator
const zArray = [...yArray, 10];
console.log(zArray);
console.log(yArray);

console.log(xArray === yArray);
console.log(yArray === zArray);

// With Object.assign()
const tArray = Object.assign([], zArray);
console.log(tArray);
console.log(tArray === zArray);
tArray.push(11);
console.log(zArray);
console.log(tArray);

// But if there are nested arrays or objects...
yArray.push([8, 9, 10]);
const vArray = [...yArray];
console.log(vArray);
vArray[4].push(5);
console.log(vArray);
console.log(yArray);
// nested structural data types still share a reference!

// Note: Array.from() and slice() create shallow copies, too.

// When it comes to objects, what about...
// ...Object.freeze() ??
const scoreObj = {
  first: 11,
  second: 22,
  third: { a: 1, b: 2 },
};

Object.freeze(scoreObj);
scoreObj.third.a = 8;
console.log(scoreObj);
// Even freezing, mutating is possible... it is a shallow freeze

// How to avoid this mutations?
// Deep copy is needed to avoid this

// Several libraries like loadash, Ramda, and others
// have this feature built-in

/* Here's a one line Vanilla JS solution, but it does not work with:
  Dates, functions, undefined, Infinity, RegExps, Maps, Sets, Blobs, FileLists,
  ImageDatas, and other complex data types
*/

const newScoreObj = JSON.parse(JSON.stringify(scoreObj));
console.log(newScoreObj);
console.log(scoreObj === newScoreObj);

// Now a deep clone function using Vanilla JS

const deepClone = (obj) => {
  if (typeof obj !== "object" || obj === null) return obj; // PS: type of null is Object... JS...

  // Create an array or object to hold the values
  const newObject = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    const value = obj[key];
    // recursive call for nested objects & arrays
    newObject[key] = deepClone(value);
  }

  return newObject;
};

const newScoreArray = deepClone(scoreArray);
console.log(newScoreArray);
console.log(newScoreArray === scoreArray);

const myScoreObj = deepClone(scoreObj);
console.log(myScoreObj);
console.log(myScoreObj === scoreObj);

// Now we can make a pure function
const pureAddToScoreHistory = (array, score, cloneFunc) => {
  const newArray = cloneFunc(array);
  newArray.push(score);
  return newArray;
};

console.log(pureAddToScoreHistory(scoreArray, 99, deepClone));
console.log(pureAddToScoreHistory(scoreArray, 99, deepClone)); // A pure function always return the same result
console.log(pureAddToScoreHistory(scoreArray, 99, deepClone)); // given the same inputs. Since this is a new array
console.log(scoreArray); // scoreArray is not changed.

//  Review:
//   - Primitive vs Structural data Types
//   - Primitives data types pass values
//   - Structural data types pass references
//   - Primitives data types are immutable
//   - Reassignment is not the same as mutable
//   - Structural data types contain mutable data
//   - Shallow copy vs. Deep copy (clones of data structures)
//   - Shallow copies still share references of nested structures
// which allows for mutation of the original data
//   - Object.freeze() creates a shallow freeze
//   - Deep copies share no references
//   - All this is important to know when construction pure functions
// because they require you to avoid mutating the original data
