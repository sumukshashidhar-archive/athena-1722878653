var mongoose = require('mongoose')


var admin_log_Schema = new mongoose.Schema({
    module: String, 
    timeStamp: Number,
    runBy: String
})


module.exports = mongoose.model("admin_log", admin_log_Schema)