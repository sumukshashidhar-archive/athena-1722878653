var mongoose = require("mongoose");
var interest = require('./interest.js');
var Achievements = require('./Achievements.js');

var StudentInfoSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    EmailId: String,
    Age: String,
    Bio: String, 
    Interests: [], 
    DOB: String,
    studentSchool: String, 
    studentSchoolId: Number, 
    PhoneNo: String,
    Location: String,
    Achievement: [Achievements.schema], 
    pincode: Number,
    uservector: []
});

module.exports = mongoose.model("StudentInfo", StudentInfoSchema);