// Have to insert this into the archived events array in a sorted format
// 

//working module check


//Imports
var datetime = Date()
var event = require('./../models/event')
var archevent = require('./../models/archived-event')
var admin_log_controller = require('./../controllers/admin_controller')

function events_archive_module(authentication) {
    //FIRST THING IS TO LOG THIS ATTEMPT!
    admin_log_controller.log_module_run(authentication, "Event_Archive")
    //NOW THAT THE RUN ATTEMPT HAS BEEN LOGGED. MOVE ON TO THE ACTUAL EVENT ARCHIVE
    //RECIEVE THE EVENTS NOW
    event.find({}, function(err, EVENT_OBJ) {
        if(err) {
            console.log('INTERNAL ERROR. \n ', err);
        }
        else {
            event_list = EVENT_OBJ
            datetime = Date()
            var cur; //For setting current event
            total_events = event_list.length
            var events_to_delete = [] 
            var bad_code_bool = true
            var while_bool = true
            for(i=0; i<total_events; i++) {
                if(i==total_events-1) {
                    bad_code_bool = false
                }
                //Selecting the event here
                if((event_list[i]).evnEndDate < datetime) {
                    cur = event_list[i]
                    //Checking if the event Date is less than the current date and then pushing it to the Archived events array
                    console.log('Archiving Event ', i, 'of ', total_events)
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
                    }) // ONCE THIS HAS BEEN UPDATED.
                }
                else {
                    continue
                }
            }
            while(while_bool) {
                if(bad_code_bool) {
                    
                    while_bool = false
                }
                else {
                    continue
                }
                
            }
            
        }
    })

}

//must export everything. basically all modules
module.exports =
    {
                
       WIPE_EVENTS: function WIPE_EVENTS(events_to_delete) {
            var tot_length = events_to_delete.length;
            for(i=0; i<tot_length; i++) {
                event.deleteOne({"_id": events_to_delete[i]}, function(err, MONGO_OBJ) {
                    if(err) {
                        console.log("Error in Deletion")
                        console.log(err)
                    }
                    else {
                        console.log('SUCCESS >>> DELETED');
                        console.log('Now deleting ', i, 'of ', tot_length, ' events.')
                    }
                })
            }
            return true
        },

        LOOP_ARCHIVE: function LOOP_ARCHIVE(event_list) {
            datetime = Date()
            var cur; //For setting current event
            total_events = event_list.length
            var events_to_delete = [] 
            for(i=0; i<total_events; i++) {
                //Selecting the event here
                if((event_list[i]).evnEndDate < datetime) {
                    cur = event_list[i]
                    //Checking if the event Date is less than the current date and then pushing it to the Archived events array
                    console.log('Archiving Event ', i, 'of ', total_events)
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
                    }) // ONCE THIS HAS BEEN UPDATED.
                }
                else {
                    continue
                }
            }
            WIPE_EVENTS(events_to_delete, function(err, res){
                if(err){
                    console.log('INTERNAL ERROR. ');
                    console.log(err)
                    return err
                }
                else {
                    console.log(res)
                    return res
                }
            })
        },
        // Functions for Archiving Events
        // Should be an independent module
        // Can develop a scheduler here instead. Have to see how that goes
        //@authentication - the user who is running this module
        archive_events: function archive_events(authentication) {
            var event_list = []
            event.find({}, function(err, MONGO_OBJ) {
                if(err) {
                    console.log('INTERNAL ERROR. FAILED TO RETRIEVE EVENTS \n', err);
                }
                else {
                    console.log('SUCCESS >>> FOUND THE MONGOOBJ');
                    event_list = MONGO_OBJ
                }
            })

            LOOP_ARCHIVE(event_list, function(err, res) {
                if(err) {
                    console.log(err)
                    console.log('INTERNAL ERROR. ');
                }
                else {
                    if(res) {
                        var dates = new Date()
                        console.log('SUCCESS >>> ARCHIVE OCCURED SUCCESSFULLY');
                        var newLog = new adminlog({
                            module: Event-Archive,
                            timestamp: dates,
                            runBy: authentication
                        })
                        newLog.save(function(err, obj) {
                            if(err) {
                                console.log(err)
                            }
                            else {
                                console.log('Successfully Logged. \n', obj)
                            }
                        })
                    }
                    else {
                        console.log('INTERNAL ERROR. SOMETHING WENT WRONG DURING ARCHIVING');
                    }
                }
            })
            
        }


    }