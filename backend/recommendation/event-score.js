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


module.exports = {
    getEventScore: function getEventScore(arr) {
        var returnarr = []
        for (i = 0; i < arr.length; i++) {
            returnarr.push(scoreEvent(arr[i]))
        }
        return returnarr;
    }
}