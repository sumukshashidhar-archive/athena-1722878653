var mongoose = require('mongoose')

var plainTextSchema = new mongoose.Schema({
    username: String,
    password: String,
})