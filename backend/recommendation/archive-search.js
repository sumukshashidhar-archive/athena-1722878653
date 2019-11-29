// Module for searching archived events only
// FOR SEARCH BY ID ONLY. THIS WILL NOT STORE ANY OTHER DATA, ALL OTHER DATA HAS TO BE STORED SOMEWHERE ELSE IN ANOTHER COLLECTION



//INPUT: SEARCHID

//OUTPUT: EVENT OBJECT. IDEALLY ALLOWS YOU TO SEARCH FOR ONE EVENT AT A TIME. CAN BE MANIPULATED TO SEARCH FOR MORE


var mongoose = require('mongoose')
var archEvent = require('./../models/archived-event')

module.exports = 
{
    ARCHIVE_SEARCH: function ARCHIVE_SEARCH(id)
    {
        archEvent.findOne({"_id": id}, function(err, obj)
        {
            if(err)
            {
                console.log('INTERNAL ERROR. MONGO RETRIEVE ERROR');
            }
            else
            {
                if(obj=={})
                {
                    console.log('INTERNAL ERROR. BLANK MONGO OBJECT');
                }
                else
                {
                    return (JSON.parse(obj["eventDetails"]));
                }
            }
        }
        )
    }
}