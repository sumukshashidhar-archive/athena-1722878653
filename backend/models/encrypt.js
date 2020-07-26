// This file will shortly be scrapped

var mongoose = require("mongoose");

var EncryptSchema = new mongoose.Schema({
    iv: String,
    username: String
});

module.exports = mongoose.model("Encrypt", EncryptSchema);