// Question: Write a function called CompareCheck, which accepts two arrays, and return true if every value in the array has it's corresponding value squared in the second array. The frequency of value must be same.

// test samples:
compareCheck([1,2,3] , [9,4,1])  // true
compareCheck([1,2,3] , [9,4])  // false
compareCheck([1,2,3] , [3,9,1])  // false
compareCheck([] , [])  // true
compareCheck([1,2,3,3] , [9,4,1,9])  // true
compareCheck([1,2,3,3] , [9,4,1,5])  // false
// so we can write our code as 

function compareCheck(arr1,arr2) {          
    if( arr1.length  !== arr2.length) return "False"; 
    let hV = 0; 
    for(let i=0; i<arr1.length; i++) {
        hV = arr1[i];        
        let h2 = arr2.indexOf(hV**2);        
        if (h2 === -1) return "False"; 
        arr2.splice(h2,1);  
    }    
    return "True";    
}

let a = [2,1,3];
let b = [1,4,9];

 compareCheck(a,b)  // will return : true
// Here we got O(n**2)T because of using for-loop and indexOf method nested in one another.
// splice will delete that value from arr2 in order to check the frequency.

// If we want to improve in the trems of Complexity, it's best case can only be O(n), because we have iterate all the elements of both the array at least once. so we can write as:

function compareCheck(ar1,ar2) {
    if(ar1.length !== ar2.length) return false;
    let objAr1 = {};
    let objAr2 = {};
    for( let val of ar1){
        objAr1[val] = (objAr1[val] || 0) +1;
    }
    for( let val of ar2){
        objAr2[val] = (objAr2[val] || 0) +1;
    }
    console.log(objAr1);
    console.log(objAr2);
    for(let key in objAr1){
        if(!(key ** 2 in objAr2)) return false;
        if(objAr1[key**2] !== objAr2[key]) return false;
    }
    return true;
}

let a = [2,1,3,2];
let b = [1,4,9,4];

compareCheck(a,b);   // will return : true

// objAr1[val] = (objAr1[val] || 0) +1;  // this line means if objAr1[val] is present , add 1 to its value or if not then also initialise it with 1.
// similar to :   objAr1[val] ? objAr1[val] += 1 : objAr1[val] = 1;
// here we have refactored the for loop and if conditions so that we opt for the values rather than the indices of the array/object. Hence it loops 3 times but not nested any, so O(3n) = O(n).
-------------------------------------------------------------------------------------------------------------
  
  // Similarly if we want to check for the anagrams i.e, given strings have exact alphabets used or not.
  
validAnagram("", "")   // true
validAnagram("cinema", "iceman")   // true
validAnagram("cars", "scar")   // true
validAnagram("cat", "act")   // true
validAnagram("car", "cat")   // false
validAnagram("awesom", "awesome")   // false
validAnagram("twistthetongue", "tonguetwister")   // false

// so we can use the same mechanism :
const validAnagram = function (str1, str2) {
  if(str1.length !== str2.length) return false;
    let objStr1 = {};
    let objStr2 = {};
    for(let char of str1) {
        objStr1[char] = ( objStr1[char] || 0) +1; 
    }
    for(let char of str2) {
        objStr2[char] = ( objStr2[char] || 0) +1; 
    }
    for (let key in objStr1) {
        if(!(key in objStr2)) return false;
        if(objStr1[key] !== objStr2[key]) return false;
    }
    // console.log(objStr1);
    // console.log(objStr2);
    return true;
}

validAnagram("cinema", "iceman");   // will show : true

// However we can shorten it by using just two for loops, as ..

const validAnagram = function (str1, str2) {
  if(str1.length !== str2.length) return false;
    let objStr = {};
    
    for(let char of str1) {
        objStr[char] = ( objStr[char] || 0) +1; 
    }    
    for (let char of str2) {   // here we just check if that char is present or not in str2, if present delete that and if not return false.
        if(!objStr[char]) return false;
        else objStr[char] -= 1;
        // if(objStr[key] !== objStr2[key]) return false;
        
    }    
    return true;
}



