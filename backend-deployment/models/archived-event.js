var mongoose = require('mongoose')

//Find a way to delete the images after this

var archivedEvent = new mongoose.Schema({
    timeStamp: Number,
    runBy: String,
    eventDetails: String //Going to be a Stringified JSON Object
})


module.exports = mongoose.model("Archived_Event", archivedEvent)