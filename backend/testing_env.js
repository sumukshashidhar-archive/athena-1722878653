/* var interestScore = 0;
var n = 0;


function binary_Search(items, value){
    var firstIndex  = 0,
        lastIndex   = items.length - 1,
        middleIndex = Math.floor((lastIndex + firstIndex)/2);

    while(items[middleIndex] != value && firstIndex < lastIndex)
    {
       if (value < items[middleIndex])
        {
            lastIndex = middleIndex - 1;
        } 
      else if (value > items[middleIndex])
        {
            firstIndex = middleIndex + 1;
        }
        middleIndex = Math.floor((lastIndex + firstIndex)/2);
    }

 return (items[middleIndex] != value) ? 0: 1;

}


function interestFactor(interests, targetInterests){
    
    
    for(i=0; i<targetInterests.length; i++){
        n += binary_Search(interests.sort(), targetInterests[i])
        interestScore += 0.1*n
    }
    return interestScore;
}


a = ["something", "skating", "swimming"]
b = ["swimming", "acting", "skating"]

score = interestFactor(a, b)
console.log(score)



// Age stuff 



function ageFactor(age, processEvent){
    //This will give an age range value
    pAge = processEvent
    

    //This has to return a score

    if(Math.abs(pAge - age)<=3){
        //Have to set a score value
        return 1.0
    }
    else{
        if(Math.abs(pAge - age)<=5){
            //Have to set a score value
            return 0.7
        }
        else{
            if(Math.abs(pAge - age)<=7){
                //Have to set a score value
                return 0.4
            }
            else{
                return 0.0
            }
        }
    }
 
}

console.log(ageFactor(16, 22))

const crypto = require("crypto");

//console.log(crypto.randomBytes(16).toString("hex"));
 */
const enc = require('./config/encryptionConfig.js')
var fs = require('fs');
var privateKEY  = fs.readFileSync('./keys/private.key', 'utf8');
var publicKEY  = fs.readFileSync('./keys/public.key', 'utf8');


const jwt = require('jsonwebtoken')

const token = jwt.sign({ _id: "Name", role: "Stu" }, privateKEY, enc.signOptions);
console.log(token)

jwt.verify(token, publicKEY, enc.verifyOptions, function(err, decodedToken){
    console.log(decodedToken)
    console.log("It comes here")
    console.log(Math.floor(Date.now()/1000))
})