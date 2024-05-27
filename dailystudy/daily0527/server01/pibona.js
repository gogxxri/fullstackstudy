console.log("Hello Node.js");

// 1 + 1 + 2 + 3 + 5 + 8 + 13 + 21 = 54
let p = 0;
let c = 1;
let n = 0;
let str = "";
let total = 0;
while(c <= 21 ) {
    str += c + (c<21?"+":"=");
    total += c;
    n = p + c;
    p = c;
    c = n;
}
console.log(str, total);