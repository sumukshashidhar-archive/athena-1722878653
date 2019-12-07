var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    userType: String, 
    securityQuestion: String,
    securityAnswer: String, 
    LastSeen: String,
    AuthCode: String,
    lastUpdatedOn: Date,
    user_Activity: Number,
    Verified: false
});

module.exports = mongoose.model("User", UserSchema);