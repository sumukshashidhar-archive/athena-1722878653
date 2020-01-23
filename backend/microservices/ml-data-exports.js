var mld = require('./../models/mldataexports')

module.exports = {
    export: async function(interests, evnInterests) {

        
        var obj = new mld({
            Interests: interests,
            EventInterests: evnInterests
        })

        obj.save(function(err, obj) {
            if(err) {
                console.log(err)
            }
            else {
                console.log(obj)
            }
        })
    }
}