var mongoose = require('mongoose')

var event = require('./../models/event')


module.exports = {
    cityspecific: async function (city) {
        console.log(city)
        var callback = new Promise((res, rej) => {
            event.find({ evnCity: city }, async function (err, OBJ) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log('The Mongo Object is: ', OBJ)
                    res(OBJ)
                }
            })
        })

        let r = await callback;
        return r

    },
    all: async function () {
        var callback = new Promise((res, rej) => {
            event.find({}, async function (err, OBJ) {
                if (err) {
                    console.log(err)
                }
                else {
                    res(OBJ)
                }
            })
        })
        let r = await callback;
        return r
    },
    search_normal: async function (city, query) {
        var callback = new Promise((res, rej) => {
            event.find({evnName: {$regex: query, $options: 'i'}, evnCity: city}, function(err, OBJ) {
                if (err) {
                    console.log("Mongo Error")
                } else {
                    console.log(OBJ)
                    res(OBJ)
                }
            })
        })

        let r = await callback;
        return r
    },
    search_deep: async function (query) {
        console.log("VJSJSONSSO")
        var callback = new Promise((res, rej) => {
            event.find({evnName: {$regex: query, $options: 'i'}}, function(err, OBJ) {
                if (err) {
                    console.log("asdadasd")
                } else {
                    console.log(OBJ)
                    console.log("works")
                    res(OBJ)
                }
            })
        })
        let r = await callback;
        console.log("IS IT GOING OUT?", r)
        return r;
    },
    search_archive: async function () {
        var callback = new Promise((res, rej) => {
            event.find({}, async function (err, OBJ) {
                if (err) {
                    console.log(err)
                } else {
                    res(OBJ)
                }
            })

        })
        let r = await callback;
        return r
    },
}

