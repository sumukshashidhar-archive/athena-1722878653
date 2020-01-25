var d = new Date().getDay().toString();
var m = new Date().getMonth().toString();
var y = new Date().getFullYear().toString();
var thro = new Date().toISOString()
console.log(d + m + y + thro.slice(0, 11))