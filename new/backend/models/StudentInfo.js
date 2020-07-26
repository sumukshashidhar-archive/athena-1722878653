var mongoose = require("mongoose");
var interest = require('./interest.js');
var Achievements = require('./Achievements.js');
<<<<<<< HEAD
var Academics = require('./AcademicsSchema.js');
=======
>>>>>>> archivable/master

var StudentInfoSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    EmailId: String,
<<<<<<< HEAD
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
=======
    Age: String,
    Bio: String, 
    Interests: Array, 
    DOB: String,
    PhoneNo: String,
    SLocation: String,
    Achievement: [Achievements.schema], 
    pincode: Number
>>>>>>> archivable/master
});

module.exports = mongoose.model("StudentInfo", StudentInfoSchema);