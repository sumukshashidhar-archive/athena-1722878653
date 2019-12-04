// To have a database of stored interests


var mongoose = require('mongoose');

var interestSchema = new mongoose.Schema({
    interestName: String,
    interestRank: String,
});

module.exports = mongoose.model("interest", interestSchema);