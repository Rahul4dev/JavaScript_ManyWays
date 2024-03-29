let Array = [4,5,6,7];

Array.at(1) // 5
Array.push(8)   // [4,5,6,7,8]
Array.pop()  // [4,5,6]
Array.fill(1)  // [1,1,1,1]
Array.join('')   // '4 5 6 7' (string)
Array.shift()   // [5,6,7]
Array.reverse()  // [7,6,5,4]
Array.unshift(3)   // [3,4,5,6,7]
Array.includes(6)   // true
Array.map(item => 2*item)   // [8,10,12,14]
Array.filter(item => item > 5)  // [6,7]
Array.find(item  => item > 5 )  // 6 (first match)
Array.every(item  => item > 0)  // true
Array.findIndex(item  => item === 5)  // 1
Array.reduce((prev, curr)  =>  prev + curr, 0)  // 22

// Also: 
Array.push();   // mutable   increase

// it adds the element/value given as param to the end of the array, i.e, last element, hence its BigO for insertion is just O(1), as not other element involve in the creation of that last element's index.
// we can push as many items as parameter to the array, e.g, 
let array = [ 10, 20, 30, 40, 50 ];
array = array.push(70, 80, 90);
console.log(array);   // console will show [10, 20, 30, 40, 50, 70, 80, 90];

---------==

  Array.unshift();    //   mutable   increase

// method used to add the new element to the front of all element, i.e, index 0; e.g,
// hence its BigO for insertion is O(n), as it have to change the index of all the element next to the inserting array, i.e, affect all the element during creation of the index.

array = array.unshift(1,5); 
console.log(array);  // console will show [1, 5, 10, 20, 30, 40, 50, 70, 80, 90];

-------------===
  
  Array.pop();    //   mutable  decrease

// method used to delete the last element of the array, it does not require any param, hence its BigO for deletion is just O(1) as it just direct to delete the last element without affecting other element of the array. e.g,

popped = array.pop(); 
console.log(array);  // console will show [1, 5, 10, 20, 30, 40, 50, 70, 80];
console.log(popped);  // console will show [90]; i.e, it will show that element which is popped out of the array.

----------------------===
  
  Array.shift();    // mutable    decrease

// used to remove the element from the index =0, ie., first element, hence again affecting all the element of he array as all element will now get new index. hence its complexity will be O(n)T

array = array.shift();   
console.log(array);  // console will show [ 5, 10, 20, 30, 40, 50, 70, 80];
