// Clear all Cookies: stored by the application by setting their expiry date to a date that has already passed

const clearCookies = document.cookie.split(';').forEach((cookie) => 
        (document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`))
        );

// Reverse a string: in one line using split, join and reverse methods

const strReverse = str => str.spilt('').reverse().join('');

// Scroll to Top feature: in page using scrollTop() method. It accept the X and Y coordinates of the position javascript sould scroll top.

const toTop = () => window.scrollTo(0, 0);

// Generate random Hex : using Math.random() and padEnd()

const hexClr = () => '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0');
console.log(hexClr());

// Capitalise a string : as JS doesn't have inbuilt capitalise function, so we can use the following code 

let str = 'follow me for more JS learing and web designs';
let capStr = str.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())
            ));

console.log(capStr);

// Copy to clipboard functionality: to copy any text to clipboard using navigator.clipboard.writeText

const copy = (text) => navigator.clipboard.writeText(text);

copy('Say My NAME: Its Heisenberg');
