// Imports
var mongoose = require("mongoose")
var event = require('./models/event')


module.exports = {


    //MAIN FUNCTION RETURNING THE SCORES
    recommedation: function recommedation(userInterests, userPincode, userLocation){
        event.find({}, function(err, obj){
            if(err){
                res.status(500).send("Failed to get events from DB")
            }
            else{
                return obj
            }
        })
    }
}