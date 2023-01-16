let string = "Hello World";

" Hello World ".trim();   // "Hello World"
string.length;  // 11
string.charAt(1);  // e
string.startsWith("Hello");  // true
string.endsWith("d") // true
string.includes("World")  // true
string.indexOf("World")  // 6
string.match(/[A-Z]/g);  // ["H", "W"]
string.repeat(2)   // "Hello WorldHello World"
string.replace("World", "Earth");   // "Hello Earth"
string.slice(6, 10);   // "Worl"
string.split(" ");   // ["Hello" , "World"]
string.toLowerCase();  // "hello world"
string.toUpperCase();   // "HELLO WORLD"
