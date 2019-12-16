/* 
We finally arrive at the actual recommendation algorithm

*/

function hello() {
    sum = 0
    for(i=0; i<=1000000; i++) {
        sum = sum +1
        
    }
    console.log('Done')
    for(i=0; i<=1000000; i++) {
        sum = sum -1
        
    }
    console.log('Done 2 ')
    for(i=0; i<=1000000; i++) {
        sum = sum +1
    }
    for(i=0; i<=1000000; i++) {
        sum = sum -1
    }
    for(i=0; i<=1000000; i++) {
        sum = sum +1
    }
    for(i=0; i<=1000000; i++) {
        sum = sum -1
    }
    for(i=0; i<=1000000; i++) {
        sum = sum +1
        
    }
    console.log('Done 3')
    for(i=0; i<=1000000; i++) {
        sum = sum * sum
    }
    return sum
}

var a = hello()
console.log(a)