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
    }, 


    import: async function() {

        var call = new Promise((res, rej) => {
            mld.find({}, function(err, obj) {
                if(err) {
                    console.log('error')
                }
                else {
                    console.log('obj')
                    res(obj)
                }
            });
        })

        let r = await call;
        return r

    }
 }