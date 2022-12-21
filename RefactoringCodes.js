// Many Ways' main aim is to make code leaner, understandable and have lower complexity. refactoring of code deals with all of these things and consistently make positive impact on coders life.

// How refactoring help in Coding Interview..
// For Ex: You got a problem in Your interview that give the counts of the characters come in "Hi there! How are you?". How do you approach to the problem??

// we can do.. 
const countChar = function (str) {
  let charCount = {};
  for(let i=0; i< str.length ; i++) {
    let char = str[i].toLowerCase();
    if(/[a-z0-9/.test(char)) {
      if(charCount[char] > 0) {
        charCount[char]++; 
      }
      else { 
        charCount[char] = 1; 
      }
    }
  }
  return charCount;
}

let s = "Hi there! How are you?";
countChar(s);  // will show {a:1 e:3 h:3 i:1 o:2 r:2 t:1 u:1 w:1 y:1}  

// SO HOW CAN WE REFACTOR THIS CODE? 
// First we should see what this code is doing and how it is doing?

// 1. it has created an empty object to store the char and its counts,
// 2. it has also taken a variable char, which act as a pointer & helping in lowering the case of all char one by one, and at last store in charCount object,
// 3. double if statements, first one to make sure the str will be in a to z and 0 to 9, and second if condition to check if char is present in the object or not,
// 4. so function is lowering the string char and then looping over the str for the char and counting out if present and initialising out if not present.

// Second, in those steps, which step is imp, or which step can be neglected or can be done through simpler version ?

// 1. Since we have to go through all the char of str, so we have to use loop, either while or For loop,
// 2. If we opt For loop, we can use for-of loop to iterate over 'char of str' instead of initialising a variable i for that, however int's complexity is const.
// 3. we have use If- else conditionals to check if the char is already present in the object or not, here we can refactor it 'many ways' 
  //  - we can simply write  
if(charCount[char] > 0) charCount[char]++;
else charCount[char] = 1;

// Or even smaller without using if, 
charCount[char] = ++charCount[char]  || 1 ; 
// it means charCount will be equal to incremented charCount or 1 with condition on which argument is present in that object or not.

// Third, Look back and write code again with siplified versions

function countChar(str) {
  let charCount = {};
  for (let char of str) {
    char = char.toLowerCase();
    if(/[a-z0-9/.test(char)) {
       charCount[char] = ++charCount[char]  || 1 ;
    }
  }
  return charCount;
}

// However, there is still something which we can improve. Since we are delaing with Alphanumeric expresions, we shouls use character codes used by the system to recognize which char is what n which no. is what. e.g, h's char code i.e, lowercase h is 104, and no.s start from 47 to 58 i.e, 47 is 0, 48 is 1 and so on.

// if our code would be : 

function countChar(str) {
  let charCount = {};
  for(let i=0; i< str.length ; i++) {
    let code = str.charCodeAt(i);
    let char = str[i].toLowerCase;
    if(!(code >47 && code < 58) &&  // numeric (0-9)
       !(code >64 && code < 91) &&   // uppercase Alphabets (A-Z)
       !(code >96 && code < 123)) {  // lowercase Alphabets (a-z)
       charCount[char] = ++charCount[char]  || 1 ;
    }
  }
  return charCount;
}

// its if check is 53% faster than the previous one, especially for larger n ( in terms of complexity). Because it is non regular boolean comparison which is best in complexity. If we write code in machine point of view, we can go faster.

// So again, if we create custom function to check the char and return true or false for the chack, and then use the function in countChar function to obtain output, it will be the best possible solution for the question.

function isAlphaNumeric(char) {
  let code = char.charCodeAt(0);
  if(!(code >47 && code < 58) &&  // numeric (0-9)
     !(code >64 && code < 91) &&   // uppercase Alphabets (A-Z)
     !(code >96 && code < 123)) {
    return false;
  }
  return true;
}

function countChar(str) {
  let charCount = {};
  for (let char of str) {    
    if(isAlphaNumeric(char)) {
       char = char.toLowerCase();
       charCount[char] = ++charCount[char]  || 1 ;
    }
  }
  return charCount;
}
