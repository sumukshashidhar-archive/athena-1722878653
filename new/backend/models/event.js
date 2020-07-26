/*  Requirements for each event that we create. There are a few other things that we need to add here */

var mongoose = require('mongoose');

<<<<<<< HEAD



//IF UPDATING THIS, UPDATE THE ARCHIVE DATA AS WELL.

//ARCHIVE DATA MAY BREAK IF EXTRA PARAMAETERS
var eventSchema = new mongoose.Schema({
    //BASICS
    evnName: String, 
    evnDate1: Number,
    evnDate2: Number,
    evnInterests: Array, 
=======
var eventSchema = new mongoose.Schema({
    //BASICS
    evnName: String, 
    evnDate: Date,
    interests: [], 
>>>>>>> archivable/master
    evnOrganizerName: String,
    evnOrganizerPage: String,
    evnOrganizerContact: String,
    evnLocation: String, 
<<<<<<< HEAD
    evnPincode: Number,
    evnAddress: String, 
    evnTargetAge: Number,
    evnCity: String,
    // CONTACT SUMUK BELOW THIS
    evnDescription: String, 
    evnComments: Array,
    evnScore: Number, 
    evnCost: Number, 
    evnRating: Number,
    evnAttendees: Array, //Specifically not something like [user.Schema]
    Image:String, 
=======
    targetAge: String,
    // CONTACT SUMUK BELOW THIS
    evnDescription: String, 
    Comments: Array,
    evnState: String,
    Event_Rating: Number,
    Attendees: Array //Specifically not something like [user.Schema]
>>>>>>> archivable/master
});

module.exports = mongoose.model("event", eventSchema);