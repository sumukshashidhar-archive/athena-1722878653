var mongoose = require('mongoose')
var event = require('./../../models/event')

module.exports = {
    regSearch: function regSearch(keyword) {
        event.find({}, function(err, RETURNED_EVENTS){
            if(err) {
                console.log("Random error: ", err)
                res.send([])
            }
            else {
                if(RETURNED_EVENTS) {
                    console.log("Found the events: ", RETURNED_EVENTS)
                    res.send(RETURNED_EVENTS) 
                }
                else {
                    console.log("No matched searches")
                    res.send([])
                }
            }
        })
    }
}