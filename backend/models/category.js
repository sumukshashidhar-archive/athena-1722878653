var mongoose = require('mongoose')


var catSchema = new mongoose.Schema({
    catId: Number,
    catName: String, 
    subCat: Array
});

module.exports = mongoose.model("Category", catSchema);