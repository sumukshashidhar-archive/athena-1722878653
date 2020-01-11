var LOG = require('./../models/log')


module.exports = {
    log: async (username, logId, dat) => {
        var newlog = new LOG({
            username: username, 
            logTime: Date.now(),
            logId: logId,
            dat: dat

        })

        newlog.save((err, obj)=> {
            if (err) {
                console.log(err)
            } else {
                console.log("LOGGED: ", obj)
            }
        })
    }
}