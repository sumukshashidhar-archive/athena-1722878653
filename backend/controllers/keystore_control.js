var mongoose = require('mongoose')
var keystore = require('./../models/key-store')


module.exports = {
    key_add: function key_add(key, user) {
        var newKey = new keystore ({
            keyHash: key, 
            Authorization: user,
            privileges: 1
        })

        newKey.save(function(err, obj) {
            if(err) {
                console.log("Error in adding key")
            }
            else {
                console.log("Successfully Added Key: \n ", obj)
            }
        })
    }
}