// To have a database of stored interests


var mongoose = require('mongoose');

var interestSchema = new mongoose.Schema({
<<<<<<< HEAD
    subCat: String,
    users: []
=======
    interestName: String,
    interestRank: String,
>>>>>>> archivable/master
});

module.exports = mongoose.model("interest", interestSchema);