//This should take care of almost everything
//All recommendation requests have to be redirected here

var fs = require('fs');
var mongoose = require('mongoose')
// var tokenExtractor = require()
var publicKEY = fs.readFileSync('./../keys/public.key', 'utf8'); 
const enc = require('./../config/encryptionConfig.js');
var event = require('./../models/event.js')
var archevent = require('./../models/archived-event.js')
var admin_logs = require('./admin_controller.js')
module.exports = {
    //This must be sent the authorization header, else it will not work
    searchHandler: function searchHandler(useCase, keyword, tokenObject) {
        jwt.verify(tokenExtractor.tokenExtractor(tokenObject), publicKEY, enc.verifyOptions, function(err, DECODED_STUDENT) {
            if(err) {
                console.log(err)
                res.status(403).send("Bad Token.")
            }
            else {
                if(useCase==1) {
                    //This is the regular search use case. 
                    regSearch(keyword, DECODED_STUDENT)
                }
                else if(useCase == 2) {
                    deepSearch(keyword, DECODED_STUDENT)
                }
                else if (useCase == 3) {
                    archSearch(keyword, DECODED_STUDENT)
                }
                else {
                    res.status(500).send("Bad Request")
                }
            }
        })
    }, 

    regSearch: function regSearch(keyword, USER) {
        event.find({evnLocation: USER.Location, }, function(err, EVNSOBJ) {
            if(err) {
                console.log(err)
            }
            else {
                console.log("SENDING TO RD INTERESTS")
                rd(USER, EVNSOBJ)
            }
        })
    }, 

    deepSearch: function deepSearch(keyword, USER) {
        //Search using the keyword
        event.find({} ,function(err, EVNSOBJ) {
            if(err) {
                console.log(err)
            }
            else {
                console.log("SENDING TO RD INTERESTS")
                console.log(EVNSOBJ)
                rd(USER, EVNSOBJ)
            }
        })
    }, 

    archSearch: function archSearch(keyword, USER) {
        archevent.find({}, function(err, EVNSOBJ) {
            if(err) {
                console.log(err)
            }
            else {
                if(EVNSOBJ) {
                    console.log(EVNSOBJ)
                    rd(USEROBJ, EVNSOBJ)
                }
                else {
                    console.log("Blank Array returned")
                    res.send([])
                }
            }
        })
    }, 

    explore: function explore(USEROBJ) {
        event.find({evnLocation: USEROBJ.Location}, function(err, EVNSOBJ) {
            if(err) {
                console.log(err)
            }
            else {
                console.log("SENDING TO RD")
                console.log(EVNSOBJ)
                rd(USEROBJ, EVNSOBJ)
            }
        })
    },

    rd: function rd(decodedToken, evns) {
        //o_l_counter_evns => outer loop events counter
        total_length = evns.length
        for(let o_l_counter_evns=0; o_l_counter_evns< total_length; o_l_counter_evns++) {
            var ev = evns[i] //To select an event
            var sum = 0.0
            if (decodedToken.pincode!=undefined && ev.evnPincode!=undefined) {
                sum += (Math.abs(decodedToken.pincode - ev.evnPincode)*0.7)
                console.log((Math.abs(decodedToken.pincode - ev.evnPincode)*0.7))
                console.log('Sum at step 1: ', sum)
            }
            if (ev.evnTargetAge!=undefined && decodedToken.age!=undefined) {
            
                //Subtracting Raw Target Age Difference
                sum -= (Math.abs(decodedToken.age - ev.evnTargetAge)*0.5)
                console.log((Math.abs(decodedToken.age - ev.evnTargetAge)*0.5))
                console.log('Sum at step 2: ', sum)
            }

            //BASIC RECOMMENDATIONS

            // => Further comes the events searching
            var n = 1;
            var event_interests = ev.evnInterests;
            var userinterests = decodedToken.interests;
            var tot_event_interests = ev.evnInterests.length;
            for(let j=0; j < tot_event_interests; j++) {
                console.log('Entering loop ' , j)
                for(let k=0; k < userinterests.length; k++) { //have to change this to binary search
                    if(event_interests[j]==userinterests[k]) {
                        sum +=10
                    }
                }
            }
            sum_array.push(sum)
            evns[i]['score'] = sum;
            evns.sort(GetSortOrder('score'))
            res.status(200).send(evns)
            
        }
    },
    GetSortOrder: function GetSortOrder(prop) {
        return function(a, b) {
            if(a[prop] > b[prop]) {
                return 1
            }
            else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0
        }
    }, 
    eventsArchive: function eventsArchive(authentication) {
        var events_to_delete;
        admin_logs.log_module_run(authentication, "Archiver Function")
        event.find({}, function(err, EVN_OBJECT) {
            if(err) {
                console.log(err)
            }
            else {
                if(EVN_OBJECT) {
                    console.log(EVN_OBJECT)
                    console.log("Got the object")
                    var total_length = EVN_OBJECT.length
                    for(let i=0; i<total_length; i++) {
                        var CUR_EVENT = EVN_OBJECT[i]
                        console.log('Archiving event at: ', i, 'of ', total_length)
                        if(CUR_EVENT["evnEndDate"] < Date.now()) {
                            var newArchEvent = new archevent({
                                evnName: cur.evnName, 
                                evnStartDate: cur.evnStartDate,
                                evnEndDate: cur.evnEndDate,
                                evnInterests: cur.interests, 
                                evnOrganizerName: cur.evnOrganizerName,
                                evnOrganizerPage: cur.evnOrganizerPage,
                                evnOrganizerContact: cur.evnOrganizerContact,
                                evnLocation: cur.evnLocation, 
                                evnPincode: cur.evnPincode,
                                evnAddress: cur.evnAddress, 
                                evnTargetAge: cur.targetAge,
                                // CONTACT SUMUK BELOW THIS
                                evnDescription: cur.evnDescription, 
                                evnRating: cur.evnRating
                            })
                            newArchEvent.save(function(err, obj) {
                                if(err) {
                                    console.log('INTERNAL ERROR. FAILED TO PUSH TO MONGO');
                                }
                                else {
                                    console.log('SUCCESS >>> PUSHED TO ARCHIVED');
                                    console.log(obj)
                                    events_to_delete.push(cur._id)
                                }
                            })
                        }
                        
                    }
                    total_length = events_to_delete.length
                    for(let j=0; j < total_length; j++) {
                        event.deleteOne({_id:events_to_delete[j]}, function(err, DELETED) {
                            if(err) {
                                console.log(err)
                            }
                            else {
                                console.log("Deleted")
                            }
                        })
                    }
                    console.log("Deleted all redundant achievements")
                }
                else {
                    console.log("got blank from mongo")
                }
            }
        })
    }
}