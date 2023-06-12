// Bind method helps an object(function) to borrow a method from another object.
// The bind() function creates a new bound function. Calling the bound function generally results in the execution of the function it wraps, which is also called the target function. The bound function will store the parameters passed — which include the value of this and the first few arguments — as its internal state

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind

example: 
const person = {
  firstName: 'Rahul',
  lastName: 'Singh',
  fullName: function() {
    return this.firstName + " " + this.lastName; 
  }
}

const member = {
  firstName: 'Your',
  lastName: 'Name',
}

let fullName = person.fullName.bind(member); // will print:  Your Name
// hence member has borrowed the fullName function/method from the person object.

// Arguments of the bind method are:
// 1st: argument refer to 'this' used in the function(object) on which the bind method is used.
  //What is 'this'?
  //In JavaScript, the this keyword refers to an object.

  //object depends on how this is being invoked (used or called).

  //The this keyword refers to different objects depending on how it is used:

  //In an object method, this refers to the object.
  //Alone, this refers to the global object.
  //In a function, in strict mode, this is undefined.
  //In an event, this refers to the element that received the event.
  //Methods like call(), apply(), and bind() can refer this to any object.

// 2nd: arguments of the method if any required to pass for the return statement
// arg1, …, argN Optional
//Arguments to prepend to arguments provided to the bound function when invoking func.

Usage: 
// 1. Syntax of bind method
const boundFn = fn.bind(thisArg, arg1, arg2)

// 2. preserve 'this'
// Top-level 'this' is bound to 'globalThis' in scripts.
this.x = 9;
const module = {
  x: 81,
  getX() {
    return this.x;
  },
};

// The 'this' parameter of 'getX' is bound to 'module'.
console.log(module.getX()); // 81

const retrieveX = module.getX;
// The 'this' parameter of 'retrieveX' is bound to 'globalThis' in non-strict mode.
console.log(retrieveX()); // 'undefined' as it will assign this.x = 9, but bound to 'globalThis' not module's this.

// Create a new function 'boundGetX' with the 'this' parameter bound to 'module'.
const boundGetX = retrieveX.bind(module);
console.log(boundGetX()); // 81

//3.



// Polyfill of bind()
// lets see what bind() do with any object..
const person = {
  firstName: 'Rahul',
  lastName: 'Singh',
};

let printName = function (homeTown, state) {
  console.log(
    this.firstName + ' ' + this.lastName + ' ,' + homeTown + ', ' + state
  );
};

// we want to print the name
let printMyName = printName.bind(person, 'Allahabad');
// bind will create a printMyName function(method) which will call the log function to print the person object with its arguments if we call printMyName method.
printMyName('Uttar Pradesh');
console.log('by bind method ^');
// console.log('call by the bind method' + ' ' + retrievedPerson); // Rahul Singh

// lets create a polyfill
// Some criteria to be in mind during creating the bind() polyfill
// 1. Every function in JS have the access to this bind(), so our myBind() should also be accessible to all the JS function. For that we have to create the Function.prototype

// Function.prototype.myBind() {}
// now we can use the myBind() to any function like -->  printName.myBind();

// 2. Also when we use bind() over any function/object it return the similar func/obj with addition to the bounded method. Hence our myBind() should also return the function which we can execute or call, like:

// 1. First implementation...
Function.prototype.myBind = function (...args) {
  let obj = this;
  return function () {
    obj.call(args[0]);
    // here we want 'this' object of the function/object on which we are using this bind(). So we have created our this and stored in obj which we call with the first argument which will be the refer to 'this' of the function.
  };
};

let printMyName2 = printName.myBind(person);
// it is working fine with 'this'. But if we have other arguments on the printName function then it will throw undefined.
printMyName2(); // Rahul Singh , undefined ( coz we have not given the 2nd argument in the myBind function)
console.log('by our myBind() ');
//let printMyName3 = printName.myBind(person, 'Allahabad'); //Rahul Singh ,undefined(coz we have not handled other arguments other that 'this')

//2. Now we have to handle other arguments as well
Function.prototype.myBind = function (...args) {
  let obj = this,
    params = args.slice(1);
  // it will return all the arguments to the params except the first one which is the 'this' of the function which we have already handled by obj. We will get an array of the arguments in the params array. which we can't pass as the argument to the call() method. So we will use apply() instead.
  return function () {
    obj.apply(args[0], params);
  };
};
let printMyName3 = printName.myBind(person, 'Allahabad');
printMyName3('Uttar Pradesh'); //Rahul Singh ,Allahabad , Uttar Pradesh

// Now if we pass some argument to the printMyName function as well which we want to show on the console.. this it will not support. we have to handle its arguments as well. For that...

Function.prototype.myBind = function (...args) {
  let obj = this,
    params = args.slice(1);
  return function (...args2) {
    obj.apply(args[0], [...params, ...args2]);
    // arguments of the returned function which we execute by calling, will also get the params(both arguments of bind and returned function) which we spread out and pass to the apply method as an array which will concatenate them together.
  };
};

let printMyName4 = printName.myBind(person, 'Allahabad');
printMyName4('Uttar Pradesh'); //Rahul Singh ,Allahabad , Uttar Pradesh

// Hence we have created the polyfill of bind() which work exactly the same.
Function.prototype.myBind = function (...args) {
  let obj = this,
    params = args.slice(1);
  return function (...args2) {
    obj.apply(args[0], [...params, ...args2]);
  };
};

// lets check it out
// Bound functions used as constructors

function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return `${this.x},${this.y}`;
};

const p = new Point(1, 2);
p.toString();
// '1,2'
const emptyObj = {};
const YAxisPoint = Point.myBind(emptyObj, 0 /*x*/);

// Can still be called as a normal function
// (although usually this is undesirable)
YAxisPoint(13);

// The modifications to `this` is now observable from the outside
console.log(emptyObj); // { x: 0, y: 13 }

Function.prototype.newBind = function (...args) {
  let obj = this;
  params = args.slice(1);
  return function (...args2) {
    obj.apply(args[0], [...args, ...args2]);
  };
};

Function.prototype.myNewBind = function (obj, ...args) {
  let func = this;
  // Accepting arguments passed to newFunc
  return function (...newArgs) {
    func.apply(obj, [...args, ...newArgs]);
  };
};

//todo: But out bind() does not work properly for the following case:
const module = {
  x: 42,
  getX: function () {
    return this.x;
  },
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// Expected output: undefined

const boundGetX = unboundGetX.myBind(module);
console.log(boundGetX());
// Expected output: 42

