var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    userType: String, 
    securityQuestion: String,
    securityAnswer: String, 
<<<<<<< HEAD
    LastSeen: Date,
    AuthCode: String,
    lastUpdatedOn: Date,
    user_Activity: Number,
    Verified: false,
    profilePic: String,
    Interests: String,
    iv: String
=======
    LastSeen: String,
    AuthCode: String,
    lastUpdatedOn: Date,
    user_Activity: Number
>>>>>>> archivable/master
});

module.exports = mongoose.model("User", UserSchema);