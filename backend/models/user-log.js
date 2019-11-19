var mongoose = require('mongoose')

var userLogSchema = mongoose.Schema({
	ip: String,
	timestamp: Number
})