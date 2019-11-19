// this is the recommendation system that I will use to recommend events to people

/* 
HIGHLY ALPHA STAGE.

There has to be a socre that we output for each Event-User relation based on whatever we calculate it. This will return
a sorted array of object IDS, including the event and the scores for each event. Which the user can then see



1. Has to factor in the user interests
2. Has to factor in the event interest list that the organizers are trying to target
3. Has to factor in the location of the event and the location of the user
4. Gender
5. Age of the students
6. Schools
    6.1 School organizing the event
    6.2 Schools attending the event
    6.3 People that you know attending the event
7. Prices


*/

var event = require('./models/event.js')
 
var returner;
var total = 0; 

function ageFactor(age, processEvent){
    //This will give an age range value
    pAge = processEvent["Age"]
    

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
//I DO NOT KNOW HOW TO DEVELOP THIS
function LocationFactor(){

}

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

 return (items[middleIndex] != value) ? -1 : 1;

}


// This function has to factor in the users interests and the organizers interests 
function interestFactor(interests, targetInterests){
    var interestScore=0; 
    var n = 0;
    for(i=0; i<targetInterests.length; i++){
        n += binary_Search(interests.sort(), targetInterests[i])
        interestScore += 0.1*n
    }
    return interestScore;
}


function arrayMaker(obj, arr){

}

function scoreMaker(obj){
    var processEvent;
    curStudent = obj;
    event.find({evnState: "Open", evnLocation:curStudent["SLocation"]}, function(err, obj){
        if(err){
            throw err;
        }
        else{
            events = obj
        }
    });
    for(i=0; i<=events.length; i++){
        processEvent = events[i]
        total = 0;
        total = total + ageFactor(curStudent["Age"], processEvent["targetAge"]) + interestFactor(curStudent["interests"], processEvent["targetInterests"])
        var returner = {name: processEvent["evnName"], score: total}

    }
    
    return returner; 

}


/* 
module.exports = {
    getScores = function getScores(obj){
        evnScore = scoreMaker(obj)
        


    }
} */