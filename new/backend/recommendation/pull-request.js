var mongoose = require('mongoose')
var event = require('./../models/event')
var archevent = require('./../models/archived-event')
<<<<<<< HEAD
var rec = require('./common_ground')
=======

>>>>>>> archivable/master


module.exports =
    {
<<<<<<< HEAD
        //These Events
=======
>>>>>>> archivable/master
        regular: function regularpull(city) {
            event.find({ evnLocation: city }, function (err, MONGO_OBJ) {
                if (err) {
                    console.log('INTERNAL ERROR. FAILED TO RETRIEVE EVENTS FROM DB. \n CHECK DB CONNECTION');
                    return err;
                }
<<<<<<< HEAD
                else if(MONGO_OBJ) {
                    return MONGO_OBJ
                }
                else {
                    return false
=======
                else {
                    return MONGO_OBJ
>>>>>>> archivable/master
                }
            }
            )
        },
<<<<<<< HEAD

=======
        
>>>>>>> archivable/master
        deep: function deepSearch() //possibly a run code. only then, we run
        {
            event.find({}, function (err, MONGO_OBJ) {
                if (err) {
                    console.log('INTERNAL ERROR. RETRIEVE FOR DEEP FAILED');
                    return err;
                }
                else {
<<<<<<< HEAD
                    console.log(MONGO_OBJ)
                    rec.score_events(MONGO_OBJ, function(err, scores) {
                        if(err) {
                            console.log('INTERNAL ERROR. ');
                        }
                        else {
                            console.log(scores)
                        }
                    })
                }
            })

=======
                    console.log('SUCCESS >>>> Retrived from DATABASE')
                    return MONGO_OBJ;
                }
            }
            )
>>>>>>> archivable/master
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