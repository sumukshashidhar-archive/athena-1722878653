var mongoose = require("mongoose");

var OrganiserInfoSchema = new mongoose.Schema({
    OrganiserName: String,
    OrganiserEmail: String,
    Password: String,
    PhoneNo: String, 
    // securityQuestion: String,
    // securityAnswer: String
});

module.exports = mongoose.model("OrganiserInfo", OrganiserInfoSchema);