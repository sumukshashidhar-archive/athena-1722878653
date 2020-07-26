var mongoose = require('mongoose')

var logSchema = new mongoose.Schema({
    username: String,
    logTime: Date, 
    logId: Number,
    dat: String
})

module.exports = mongoose.model("logSchema", logSchema)



///LogId = 1; Log Ins;
//LogId = 2; Log Out;
//LogId = 3; UserCreation;
//LogID = 4; System Event Runs;
//LogId = 5; Reset Password