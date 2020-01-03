var mongoose = require('mongoose')

var event = require('./../models/event')


module.exports = {
    cityspecific: async function(city) {
        var callback = new Promise
        event.find({evnLocation: city}, function(err, OBJ) {
            if(err) {
                console.log(err)
            }
            else {
                

            }
        })
    }
}

