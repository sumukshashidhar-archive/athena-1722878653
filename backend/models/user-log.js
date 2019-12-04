var mongoose = require('mongoose')

var userLogSchema = mongoose.Schema({
	user_id: String,
	ip: String,
	timestamp: Number
})

module.exports = mongoose.model("User_Log", userLogSchema)