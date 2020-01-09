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