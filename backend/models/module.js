//Module Models

var mongoose = require('mongoose')


var newModuleSchema = new mongoose.Schema({
    name: String, 
    privilege: String, 
})

module.exports = mongoose.model('Module', newModuleSchema)