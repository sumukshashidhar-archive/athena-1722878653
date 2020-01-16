var user = require('./../models/user')

module.exports = {
    check: async function check(query) {
        var callback = new Promise((res, rej) => {
            user.findOne({username: query}, function(err, obj) {
                if(err) {
                    console.log(err)
                }
                else {
                    if(obj!=null) {
                        res(false)
                    }
                    else {
                        res(true)
                    }
                }
            })
        })

        let r = await callback
        return r
    }
}