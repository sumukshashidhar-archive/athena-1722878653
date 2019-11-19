/*  Requirements for each event that we create. There are a few other things that we need to add here */

var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    evnName: String, 
    evnDate: Date,
    evnIntersts: [], 
    evnOrganizerName: String,
    evnOrganizerPage: String,
    evnOrganizerContact: String,
    evnLocation: String, 
    targetAge: String,
    evnState: String,
    targetAge:String,
    // Find out how to store images in mongoDB.
    // Add more here once there are things to add.
});

module.exports = mongoose.model("event", eventSchema);