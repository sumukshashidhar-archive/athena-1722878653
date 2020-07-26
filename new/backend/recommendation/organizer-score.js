// A scoring algorithm for organizers and their reputation
/* 
Developer Notes:
What and all do I need to do?

1. Take into account the previous number of events the organizer has organized
2. Take into Account the average rating of the previous organized events
3. Take into account the average score of the previous organzied events --> to stop gaming the system by raw bruteforce / ratings










Public Notes:
This is still in Beta, so all features may not work as intended.




What goes in: Organzier ID
What comes out: Score [A decimal Number]


RUNTIME: 
This module only has to be run when there is a need to generate new scores or update the scores that are present to reflect the same.

We can make it so that only the Admins can run this function


*/

var mongoose = require('mongoose');
var orginf = require('./../models/OrganiserInfo');


function scoreCreate(organiserObject) {
    var score;
    // Need to check for undefined and defined data types here
}



module.exports =
    {
        getScores: function getScores(organiserID) {
            // A simple DB retrieve function
            orginf.findOne({ "_id": organiserID }, function (err, obj) {
                if (obj) {
                    if (obj != {}) {
                        console.log("Testing Logs: \n ", obj)
                        scoreCreate(obj)
                    }
                    else {
                        console.log("Internal Module Error. Blank Object Return. Contact Sumuk")
                    }
                }
                else {
                    console.log("Internal Module Error. Object not found. Contact Sumuk")
                }
            })
        }
    }