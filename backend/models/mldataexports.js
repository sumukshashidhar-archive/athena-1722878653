var mongoose = require("mongoose");

var mLDataSchema = new mongoose.Schema({
    Interests = Array,
    EventInterests = Array, 
})

module.exports = mongoose.model("mlData", mLDataSchema);