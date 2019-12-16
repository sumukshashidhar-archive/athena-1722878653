var mongoose = require('mongoose')
var event = require('./../../models/event')

module.exports = {
    regSearch: function regSearch(keyword) {
        event.find({}, function(err, obj){
            if(err) {

            }
            else {
                if(obj) {

                }
                else {
                    
                }
            }
        })
    }
}