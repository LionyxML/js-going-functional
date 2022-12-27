// Pure Functions

// A part of the Functional Programming Paradigm

// Why write Pure Functions?
// 1) Clean Code
// 2) Easy to test
// 3) Easy to debug
// 4) Decoupled and Independent
// 5) Could be added to your utility functions

// Rules for Pure Functions:
// 1) The same input ALWAYS gives the same output
// 2) No side effects

// Let's break the rules...
// 1) The same input ALWAYS gives the same output

const add = (x, y) => x + y;
console.log(add(2, 3));

const fullName = (first, last) => `${first} ${last}`;
console.log(fullName("Foo", "Bar"));

// We can replace the function with the output
// This is called "referential transparency"

// A pure function should have at least one parameter.

// Otherwise, it is the same as a constant because they can
// only work with their input.

const firstName = () => "Foo";

// would be equal to...
// const firstName = "Dave";

// 2) No side effects

// This also means accessing the scope outside the functions make the
// function impure

const z = 5;
const sum = (x, y) => x + y + z;
console.log(sum(2, 2));

// Pure functions cannot:
// Access a database, API, file system, storage, etc.
// Modify the DOM
// Or even log to the console

// That said, clearly "impure" funcitions are necessary
// but they are harder to test and debug

// Further, no input state can be modified
// That is, no data should be "mutated"
// Consider all input data to be immutable

// Impure Example 1:
let x = 1;
const increment = () => (x += 1);
console.log(increment());
console.log(x);

// Impure Example 2:
const myArray = [1, 2, 3];
const addToArray = (array, data) => {
  array.push(data);
  return array;
};
console.log(addToArray(myArray, 4));
console.log(myArray);

// Refactored Example 1:
const pureIncrement = (num) => (num += 1);
console.log(pureIncrement(x));
console.log(x);

// Refactored Example 2:
const pureAddToArray = (array, data) => [...array, data];
console.log(pureAddToArray(myArray, 5));
console.log(myArray);

// Note: if you have nested data structure, see 01-shallow-deep.js
// on how to use a deep copy.

// Also notive how Pure Functions always return something.
// No return means you definitely do not have a pure function.

// You may have already been working with some great examples of
// Pure functions and not realizing it.

// These common Higher Order Functions are Pure Functinos:

const oneToFive = [1, 2, 3, 4, 5];
const oddToFive = oneToFive.filter((elem) => elem % 2 !== 0);
console.log(oddToFive);

const doubled = oneToFive.map((elem) => elem * 2);
console.log(doubled);

const summed = oneToFive.reduce((acc, elem) => acc + elem);
console.log(summed);

console.log(oneToFive); // it is still the original array

// Review the Rules for Pure Functions:
// 1) The same input ALWAYS gives the same output (referential transparency)
// 2) No side effects (no mutations!)

// The goal: Write small, pure functions when you can for code
// that is clean, easy to test, and easy to debug.
