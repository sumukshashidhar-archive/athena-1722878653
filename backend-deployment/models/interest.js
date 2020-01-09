// To have a database of stored interests


var mongoose = require('mongoose');

var interestSchema = new mongoose.Schema({
    subCat: String,
    users: []
});

module.exports = mongoose.model("interest", interestSchema);