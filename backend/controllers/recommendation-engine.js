//This should take care of almost everything
//All recommendation requests have to be redirected here

var mongoose = require('mongoose')
var tokenExtractor = require()
var publicKEY = fs.readFileSync('./../keys/public.key', 'utf8'); 
const enc = require('./../config/encryptionConfig.js');
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
                rd(USER, EVNSOBJ)
            }
        })
    }, 

    deepSearch: function deepSearch(keyword, USER) {
        event.find({} ,function(err, EVNSOBJ) {
            if(err) {
                console.log(err)
            }
            else {
                console.log(EVNSOBJ)
            }
        })
    }, 

    archSearch: function archSearch(keyword, USER) {

    }, 

    explore: function explore(USEROBJ) {
        event.find({evnLocation: USEROBJ.Location}, function(err, EVNSOBJ) {
            if(err) {
                console.log(err)
            }
            else {
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
    }
}