var mongoose = require("mongoose");

var OrganiserInfoSchema = new mongoose.Schema({
    OrganiserName: String,
    OrganiserEmail: String,
    Password: String,
<<<<<<< HEAD
    PhoneNo: String,
    OrgCity: String, 
    evns: Array,
=======
    PhoneNo: String, 
>>>>>>> archivable/master
    // CONTACT SUMUK UNDER THIS
    Organizer_Score: Number, 
    Events_Number: Number, //Have to store the number of events the organizer has organized here
    Average_Event_Rating: Number, 
<<<<<<< HEAD
    Average_Event_Score: Number,
=======
    Average_Event_Score: Number
>>>>>>> archivable/master
});

module.exports = mongoose.model("OrganiserInfo", OrganiserInfoSchema);