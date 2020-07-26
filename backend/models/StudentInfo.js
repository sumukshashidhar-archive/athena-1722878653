var mongoose = require("mongoose");
var interest = require('./interest.js');
var Achievements = require('./Achievements.js');
var Academics = require('./AcademicsSchema.js');

var StudentInfoSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    EmailId: String,
    Age: Number,
    Bio: String, 
    Interests: Array, 
    DOB: Number,
    studentSchool: String, 
    studentSchoolId: Number, 
    PhoneNo: String,
    Location: String,
    Achievement: [Achievements.schema],
    Academics: [Academics.schema], 
    pincode: Number,
    uservector: Array, 
    evnFollowing: Array,
    Academics: Array
});

module.exports = mongoose.model("StudentInfo", StudentInfoSchema);