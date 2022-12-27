// Currying

// Named after Haskell B. Curry

// Concept from lambda calculus

// Currying takes a function that receives more than one parameter
// and breaks it into a series of unary (one parameter) functions

// Therefore, a curried function only takes one parameter at a time

// Curring can look like this:

const buildSandwich = (ingredient1) => {
  return (ingredient2) => {
    return (ingredient3) => {
      return `${ingredient1}, ${ingredient2}, ${ingredient3}`;
    };
  };
};

const mySandwich = buildSandwich("Bacon")("Lettuce")("Tomato");
console.log(mySandwich);

// It works but thats getting ugly and nested the further we go

// Let's refactor:
const buildSammy = (ingred1) => (ingred2) => (ingred3) =>
  `${ingred1},${ingred2}, ${ingred3},  `;

const mySammy = buildSammy("turkey")("cheese")("bread");
console.log(mySammy);

// That's how usually it is used. They tend to be more expressions
// instead of imperative step by step.

// Another Example of a curried function
const multiply = (x, y) => x * y;

const curriedMultiply = (x) => (y) => x * y;

console.log(multiply(2, 3));
console.log(curriedMultiply(2)); // returns a function, waiting for the next param
console.log(curriedMultiply(2)(3));

// Partially applied functions are a common use of currying
const timesTen = curriedMultiply(10);
console.log(timesTen);
console.log(timesTen(8));
console.log(timesTen(3));
console.log(timesTen(4));

// Another commom use of currying is function composition
// Allows calling small functions in a specific order

const addCustumer = (fn) => (...args) => {
  console.log("saving customer info...");
  return fn(...args);
};

const processOrder = (fn) => (...args) => {
  console.log(`processing order #${args[0]}`);
  return fn(...args);
};

let completeOrder = (...args) => {
  console.log(`Order #${[...args].toString()} completed.`); // ...args just another way to show the args
};

completeOrder = processOrder(completeOrder);
console.log(completeOrder); // anon function

completeOrder = addCustumer(completeOrder);

completeOrder("1000");

// if this was written in the standard way...
function addCustomer(...args) {
  return function processOrder(...args) {
    return function completeOrder(...args) {
      // end
    };
  };
}

// Requires a function with a fixed number of parameters
const curry = (fn) => {
  console.log(fn.length);
  return (curried = (...args) => {
    console.log(args.length);
    if (fn.length !== args.length) {
      console.log(...args);
      return curried.bind(null, ...args); // bind creates a new function
    }
    return fn(...args);
  });
};

const total = (x, y, z) => x + y + z;

const curriedTotal = curry(total);
console.log(curriedTotal(10)(20)(30));
