"use strict";
function fRec(n) {
    if (n === 1) {
        return 1;
    }
    else {
        return n * fRec(n - 1);
    }
}
console.log(fRec(5)); // 120 
