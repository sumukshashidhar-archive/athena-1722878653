/*  Requirements for each event that we create. There are a few other things that we need to add here */

var mongoose = require('mongoose');




//IF UPDATING THIS, UPDATE THE ARCHIVE DATA AS WELL.

//ARCHIVE DATA MAY BREAK IF EXTRA PARAMAETERS
var eventSchema = new mongoose.Schema({
    //BASICS
    evnName: String, 
    evnStartDate: Date,
    evnEndDate: Date,
    evnInterests: [], 
    evnOrganizerName: String,
    evnOrganizerPage: String,
    evnOrganizerContact: String,
    evnLocation: String, 
    evnPincode: Number,
    evnAddress: String, 
    evnTargetAge: String,
    // CONTACT SUMUK BELOW THIS
    evnDescription: String, 
    evnComments: Array,
    evnScore: Number, 
    evnCost: Number, 
    evnRating: Number,
    evnAttendees: Array //Specifically not something like [user.Schema]
});

module.exports = mongoose.model("event", eventSchema);