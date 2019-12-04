/*  Requirements for each event that we create. There are a few other things that we need to add here */

var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    //BASICS
    evnName: String, 
    evnDate: Date,
    interests: [], 
    evnOrganizerName: String,
    evnOrganizerPage: String,
    evnOrganizerContact: String,
    evnLocation: String, 
    targetAge: String,
    // CONTACT SUMUK BELOW THIS
    evnDescription: String, 
    Comments: Array,
    evnState: String,
    Event_Rating: Number,
    Attendees: Array //Specifically not something like [user.Schema]
});

module.exports = mongoose.model("event", eventSchema);