var mongoose = require('mongoose')

var apiAuth = new mongoose.Schema({
    timeStamp: Date, 
    AUTH_LEVEL: Number, 
    authorization_admin: String,
    bcrypt_hash: String
})