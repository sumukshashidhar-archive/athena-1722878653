var mongoose = require('mongoose')
var event = require('./../models/event')
var archevent = require('./../models/archived-event')



module.exports =
    {
        regular: function regularpull(city) {
            event.find({ evnLocation: city }, function (err, MONGO_OBJ) {
                if (err) {
                    console.log('INTERNAL ERROR. FAILED TO RETRIEVE EVENTS FROM DB. \n CHECK DB CONNECTION');
                    return err;
                }
                else {
                    return MONGO_OBJ
                }
            }
            )
        },
        
        deep: function deepSearch() //possibly a run code. only then, we run
        {
            event.find({}, function (err, MONGO_OBJ) {
                if (err) {
                    console.log('INTERNAL ERROR. RETRIEVE FOR DEEP FAILED');
                    return err;
                }
                else {
                    console.log('SUCCESS >>>> Retrived from DATABASE')
                    return MONGO_OBJ;
                }
            }
            )
        },

        archive: function archivedpull() //A run code may be needed. Something to search old events for
        {
            archevent.find({}, function (err, MONGO_OBJ) {
                if (err) {
                    console.log('INTERNAL ERROR. FAILED MONGO RETRIEVE');
                    return err;
                }
                else {
                    console.log('SUCCESS >>> RETRIEVED ARCHIVED EVENTS');
                    return MONGO_OBJ;
                }
            }
            )
        },

        archiveSearch: function archivedSearch(keyword) {
            //Have to check how to do this
            archevent.find({ "evnName": ("/ . *" + keyword + ". * /") }, function (err, MONGO_OBJ) {
                if (err) {
                    console.log("INTERNAL ERROR. CANNOT FIND/SEARCH");
                    return err;
                }
                else {
                    console.log('SUCCESS >>> FOUND, NOW RETURNING');
                    return MONGO_OBJ;
                }
            })
        },

        deepSearch: function deepSearch(keyword) {
            event.find({ "evnName": ("/ . *" + keyword + ". * /") }, function (err, MONGO_OBJ) {
                if (err) {
                    console.log("INTERNAL ERROR. CANNOT FIND/SEARCH");
                    return err;
                }
                else {
                    console.log('SUCCESS >>> FOUND, NOW RETURNING');
                    return MONGO_OBJ;
                }
            })
        },
        // Should Work well enough
        regularSearch: function regSearch(keyword, city) {
            event.find({ $and: [{ "evnName": ("/ . *" + keyword + ". * /") }, { "evnLocation": city }] }, function (err, MONGO_OBJ) {
                if (err) {
                    console.log("INTERNAL ERROR. CANNOT FIND/SEARCH");
                    return err;
                }
                else {
                    console.log('SUCCESS >>> FOUND, NOW RETURNING');
                    return MONGO_OBJ;
                }
            })
        }
    }