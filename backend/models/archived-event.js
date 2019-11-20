var mongoose = require('mongoose')


var archivedEvent = new mongoose.Schema({
    timeStamp: Number,
    runBy: String
})


module.exports = mongoose.model("Archived_Event", archivedEvent)