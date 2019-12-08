var mongoose = require("mongoose");
var interest = require('./interest.js');
var Achievements = require('./Achievements.js');

var StudentInfoSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    EmailId: String,
    Age: String,
    Bio: String, 
    interests: [], 
    DOB: String,
    PhoneNo: String,
    Location: String,
    Achievement: [Achievements.schema], 
    pincode: Number,
});

module.exports = mongoose.model("StudentInfo", StudentInfoSchema);