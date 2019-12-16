var mongoose = require('mongoose')
var event = require('./../../models/event')

module.exports = {
    regSearch: function regSearch(keyword) {
        event.find({}, function(err, RETURNED_EVENTS){
            if(err) {

            }
            else {
                if(RETURNED_EVENTS) {
                    console.log(RETURNED_EVENTS)
                }
                else {

                }
            }
        })
    }
}