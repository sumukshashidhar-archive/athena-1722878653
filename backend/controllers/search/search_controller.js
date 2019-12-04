var mongoose = require('mongoose')
var temp = require('./../../recommendation/pull-request')


module.exports = {
    event_search: function event_search(keyword, usecase, city) {
        city = city || 0
        if (usecase==1) {
            temp.regularSearch(keyword, city, function(err, obj) {
                if(err) {
                    console.log('INTERNAL ERROR. ');
                }
                else {
                    console.log('SUCCESS >>> WORKS');
                    return obj
                }
            })
        } //USECASE 1 is REGSEARCH

        else if(usecase==2) {
            temp.deepSearch(keyword, function(err, obj) {
                if(err) {
                    console.log('INTERNAL ERROR. ');
                }
                else {
                    console.log('SUCCESS >>>  DEEPWORKS');
                    return obj
                }
            })
        }

        else if(usecase=3) {
            temp.archiveSearch(keyword, function(err, obj) {
                if(err) {
                    console.log('INTERNAL ERROR. ');
                }
                else {
                    console.log('SUCCESS >>> ');
                    return obj
                }
            })
        }
    }
}