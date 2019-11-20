var mongoose = require('mongoose')


var EventLogSchema = new mongoose.Schema({
    timeStamp: Number,
    runBy: String
})


module.exports = mongoose.model("EventLog", EventLogSchema)