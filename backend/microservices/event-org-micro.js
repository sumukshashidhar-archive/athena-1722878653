var Organiser = require('./../models/OrganiserInfo')


module.exports = {

    addToOrganiser: function addToOrganiser(id, evnId) {
        Organiser.findOne({_id: id}, function(err, obj) {
            if(err) {
                for(let i=0; i<10; i++) {
                    console.log(err)
                }
            }
            else {
                if(obj!=null) {
                    obj.evns.push(evnId)
                    Organiser.updateOne({_id: id}, {$set: {evns: obj.evns}}, function(err2, obj2) {
                        if (err) {
                            console.log(err2)
                        } else {
                            console.log("SUCCESS IN UPDATING TO EVNS ARRAY")
                        }
                    })
                }
                else {
                    for(let i=0; i<10; i++) {
                        console.log('Did not find organiser like this')
                    }
                }
            }
        })
    }

}