var mongoose = require("mongoose");

var OrganiserInfoSchema = new mongoose.Schema({
    OrganiserName: String,
    OrganiserEmail: String,
    Password: String,
    PhoneNo: String, 
    // CONTACT SUMUK UNDER THIS
    Organizer_Score: Number, 
    Events_Number: Number, //Have to store the number of events the organizer has organized here
    Average_Event_Rating: Number, 
    Average_Event_Score: Number,
});

module.exports = mongoose.model("OrganiserInfo", OrganiserInfoSchema);