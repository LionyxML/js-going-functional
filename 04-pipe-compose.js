// Functional Programming

// Often uses pipe and compose = higher order functions

// A higher order function is any function which takes a function as an
// argument, returns a function, or both.

// Here's how a "compose" function works:

// Start with small unary (one parameter) functions
const add2 = (x) => x + 2;
const subtract1 = (x) => x - 1;
const multiplyBy5 = (x) => x * 5;

// Notice how the functions execute from inside to outside and right
// to left

const result = multiplyBy5(subtract1(add2(4)));
console.log(result);

// The above is NOT a compose function - let's make one

// Note: Ramda.js and lodash libraries have their own built-in
// compose and pipe functions. lodash calls pipe "flow".

// The higher order function "reduce" takes a list of values and applies a
// function to each of those values, accumulating a single result.

// To get the compose order from right to left as we see with nested
// function calls in our example above, we need reduceRight...

// It accepts a list of functions and a value, and then...
const compose = (...fns) => (val) =>
  fns.reduceRight((prev, fn) => fn(prev), val);

const compResult = compose(multiplyBy5, subtract1, add2)(4);
console.log(compResult);

// To do the same, but read from left to right... we use "pipe".
// It is the same except uses reduce insted of reduceRight.
const pipe = (...fns) => (val) => fns.reduce((prev, fn) => fn(prev), val);

const pipeResult = pipe(add2, subtract1, multiplyBy5)(5);
console.log(pipeResult);

// You'll often see the functions on separate lines
const pipeResult2 = pipe(
  add2,
  subtract1,
  multiplyBy5,
  multiplyBy5,
  multiplyBy5,
  multiplyBy5
)(6);
console.log(pipeResult2);

// This is a "pointer free" style where you do not see the unary parameter
// passed between each function

// Example with a 2nd parameter
const divideBy = (divisor, num) => num / divisor;

const pipeResult3 = pipe(
  add2,
  subtract1,
  subtract1,
  subtract1,
  multiplyBy5,
  (x) => divideBy(2, x)
)(5);
console.log(pipeResult3);

// Or you could curry the divideBy function for a custom unary function
const divBy = (divisor) => (num) => num / divisor;

// Partially applied function
const divideBy2 = divBy(2);

const pipeResult4 = pipe(
  add2,
  subtract1,
  subtract1,
  subtract1,
  multiplyBy5,
  divBy(2)
)(5);
console.log(pipeResult3);

const pipeResult5 = pipe(
  add2,
  subtract1,
  subtract1,
  subtract1,
  multiplyBy5,
  divideBy2
)(5);
console.log(pipeResult5);

// Let's look at some examples beyond math functions
const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vestibulum ac dui vel fringilla. Duis euismod lectus at cursus tincidunt. Morbi in risus et nulla bibendum pellentesque quis et ligula. Donec mollis malesuada vulputate. Integer pharetra placerat mauris ac luctus. Donec a massa mi.";

const splitOnSpace = (string) => string.split(" ");
const count = (array) => array.length;

// See how we don't have to call it imediately
const wordCount = pipe(splitOnSpace, count);

console.log(wordCount(lorem));

// The pipe function is reusable
const egbdf = "Every good boy does fine.";
console.log(wordCount(egbdf));

// Combine Processes: Check for palindrome (spell the same forwards and
// backwards onde got rid of spaces and it is all lowercase)
const pal1 = "taco cat";
const pal2 = "UFO tofu";
const pal3 = "Foo";

const split = (string) => string.split("");
const join = (string) => string.join("");
const lower = (string) => string.toLowerCase();
const reverse = (array) => array.reverse();

const fwd = pipe(splitOnSpace, join, lower);

const rev = pipe(
  fwd, // a nested pipe function
  split,
  reverse,
  join
);

console.log(fwd(pal1) === rev(pal1));
console.log(fwd(pal2) === rev(pal2));
console.log(fwd(pal3) === rev(pal3));

// In object oriented programming (oop), objects are often past around,
// and mutated by different functions. Unfortunally then you have to
// know the history of everything that's happened to the object
// sometimes to find a bug. And that also makes it harder to test.

// Fortunally state mutation is not allowed on functional programming

// Clone / Copy functions withing a pipe or compose function

// 3 approaches:

// 1) Clone the object before an impure function mutates it
const scoreObj = { home: 0, away: 0 };

const shallowClone = (obj) => (Array.isArray(obj) ? [...obj] : { ...obj });

const incrementHome = (obj) => {
  obj.home += 1; // mutation
  return obj;
};

const homeScore = pipe(
  shallowClone,
  incrementHome
  // another func
  // and another...
);

console.log(homeScore(scoreObj));
console.log(scoreObj);
console.log(homeScore(scoreObj) === scoreObj);

// Positive: fewer function calls
// Negative: create impure functions and testing difficulties

// 2) Curry the function to create a partial that is unary
let incrementHomeB = (cloneFn) => (obj) => {
  const newObj = cloneFn(obj);
  newObj.home += 1; // mutation
  return newObj;
};

// Creates the partial by applying the first argument in advance
incrementHomeB = incrementHomeB(shallowClone);

const homeScoreB = pipe(
  incrementHomeB
  // another,
  // and another...
);
console.log(homeScoreB(scoreObj));
console.log(scoreObj);

// Positive: Pure funcitons with clear dependencies
// Negative: More calls to the cloning function

// 3) Insert the clone function as a dependency
const incrementHomeC = (obj, cloneFn) => {
  const newObj = cloneFn(obj);
  newObj.home += 1; // mutation
  return newObj;
};

const homeScoreC = pipe(
  (x) => incrementHomeC(x, shallowClone)
  // another function,
  // and another ...
);

console.log(homeScoreC(scoreObj));
console.log(scoreObj);

// Positive: Pure funciton with clear dependencies
// Negative: Non-unary functions in your pipe / compose chain
