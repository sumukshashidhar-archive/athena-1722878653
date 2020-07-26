//This module is to store RSA Based keys in the mongodb database - in the hashed format

var mongoose = require('mongoose')



var keystoreSchema = new mongoose.Schema({
    keyHash: String,
    Authorization: String,
    privileges: Number
})

module.exports = mongoose.model("keystore", keystoreSchema)