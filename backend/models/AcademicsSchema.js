var mongoose = require('mongoose')


var acSchema = new mongoose.Schema({
    testName: String,
    testRank: String,
    Image: String,
    toShow: Boolean,
    id: Number,
    testScore: String
});

module.exports = mongoose.model("Academics", acSchema);