//Admin Logs controller
var admin_log = require('./../models/admin-log')


module.exports = {
    log_module_run: function log_module_run(authentication, module) {
        var newAdminLog = new admin_log( {
            module: module,
            timeStamp: Date.now(),
            runBy: authentication
        })

        newAdminLog.save(function(err, obj) {
            if(err) {
                console.log('INTERNAL ERROR. FAILED TO PUSH\n' , err);

            }
            else {
                console.log("Succesfully Logged the Module Run Attempt: \n" , obj)
            }
        })
    }
}