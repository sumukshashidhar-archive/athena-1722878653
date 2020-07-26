var archevent = require('./../models/archevent')
var event = require('./../models/event')

module.exports = {

    eventsArchive: function eventsArchive() {
        var events_to_delete = [];
        event.find({}, function (err, EVN_OBJECT) {
            if (err) {
                console.log(err)
            }
            else {
                if (EVN_OBJECT) {
                    console.log(EVN_OBJECT)
                    console.log("Got the object")
                    var total_length = EVN_OBJECT.length
                    for (let i = 0; i < total_length; i++) {
                        var cur = EVN_OBJECT[i]
                        console.log('Archiving event at: ', i, 'of ', total_length)
                        if (cur["evnDate2"] < Date.now()) {
                            var newArchEvent = new archevent({
                                evnName: cur.evnName,
                                evnDate1: cur.evnDate1,
                                evnDate2: cur.evnDate2,
                                evnInterests: cur.evnInterests,
                                evnOrganizerName: cur.evnOrganizerName,
                                evnOrganizerPage: cur.evnOrganizerPage,
                                evnOrganizerContact: cur.evnOrganizerContact,
                                evnLocation: cur.evnLocation,
                                evnPincode: cur.evnPincode,
                                evnAddress: cur.evnAddress,
                                evnTargetAge: cur.evnTargetAge,
                                // CONTACT SUMUK BELOW THIS
                                evnDescription: cur.evnDescription,
                                evnRating: cur.evnRating,
                                evnAttendees: cur.evnAttendees,
                                Image: cur.Image
                            })
                            newArchEvent.save(function (err, obj) {
                                if (err) {
                                    console.log('INTERNAL ERROR. FAILED TO PUSH TO MONGO');
                                }
                                else {
                                    console.log('SUCCESS >>> PUSHED TO ARCHIVED');
                                    console.log(obj)
                                    events_to_delete.push(cur._id)
                                }
                            })
                        }
                        else {
                            console.log('This event is still in function. Event name is: ', EVN_OBJECT[i]['evnName'])
                        }

                    }
                    var total_length = events_to_delete.length
                    for (let j = 0; j < total_length; j++) {
                        event.deleteOne({ _id: events_to_delete[j] }, function (err, DELETED) {
                            if (err) {
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