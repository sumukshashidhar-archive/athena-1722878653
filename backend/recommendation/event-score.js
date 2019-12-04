//DaVinci Algortithm by Sumuk Shashidhar


//THIS MODULE OUTPUTS AN ARRAY OF SCORES FOR AN ARRAY OF EVENTS


var mongoose = require('mongoose')
var event = require('./../models/event')

function RatingModule() {

}


function scoreEvent(event) {
    var scorereturn;
    //HORRIBLY INEFFICIENT CODE 
    if (event.Event_Rating != undefined || event.Event_Rating != null) {
        scorereturn += event.Event_Rating;
    }
    if (event.Attendees != undefined || event.Attendees != null) {
        scorereturn += (event.Attendees * 0.1);
    }
    if (event.Organiser_Reputation != undefined || event.Organiser_Reputation != null) {
        socrereturn += event.Organiser_Reputation;
    }
    if (event.interests != undefined || event.interests != null) {
        scorereturn += (event.interests).length;
    }
    if (event.evnDescription != undefined || event.evnDescription != null) {
        scorereturn += ((event.evnDescription).length) * 0.1;
    }
    if (event.Comments != undefined || event.Comments != null) {
        scorereturn += (event.Comments.length) * 0.1;
    }
    if (event.targetAge != undefined || event.targetAge != null) {
        scorereturn += 1
    }
    if (event.evnOrganizerContact != undefined || event.evnOrganizerContact != null) {
        scorereturn += 1
    }
    if (event.evnOrganizerPage != undefined || event.evnOrganizerPage != null) {
        scorereturn += 1
    }



}

function Assigner(scoreArray, eventArray) {
    for(i=0; i<eventArray.length; i++) {
        event.findOneAndUpdate({"_id" : (eventArray[i]._id)}, {$set: {"evnScore": scoreArray[i]}}, function(err, MONGO_OBJ){
            if(err) {
                console.log('INTERNAL ERROR. COULD NOT FIND EVENT');
            }
            else {
                console.log('SUCCESS >>> FOUND AND UPDTAED for EVENT NUMBER: ', i);
            }
        })
    }
}

function getEventScore(arr) {
    var returnarr = []
    for (i = 0; i < arr.length; i++) {
        returnarr.push(scoreEvent(arr[i]))
    }
    return returnarr;
}

module.exports = {
    run_event_scores: function run_event_scores(arr) {
        getEventScore(arr, function(err, returnarr) {
            if(err) {
                console.log('err')
            }
            else {
                    console.log('SUCCESS >>> ');
                    Assigner(returnarr, arr)
            }
        })   

    }
}