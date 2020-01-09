//FOR ADMINS

var mongoose = require('mongoose')

var adminSchema = new mongoose.Schema({
    Name: String, 
    username: String, 
    access_level: Number, 
    password: String
})

module.exports = mongoose.model('admin' , adminSchema)