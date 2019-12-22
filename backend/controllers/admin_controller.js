//Admin Logs controller
var admin_log = require('./../models/admin-log')
var admin = require('./../models/admin')

async function admin_conflict_check(username) {
    var admin_check_promise = new Promise(function(res, rej) {
        admin.findOne({username: username}, function(err, obj) {
            if(err) {
                console.log(err)
            }
            else {
                if(obj) {
                    res(false)
                }
                else {
                    res(true)
                }
            }
        })
    })
    let CHECK_RETURN = await admin_check_promise;
    return(CHECK_RETURN);
    
}


module.exports = {
    log_module_run: function log_module_run(authentication, modules) {
        var newAdminLog = new admin_log( {
            module: modules,
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
    }, 




    ADMIN_ADD: async function ADMIN_ADD(username, password) {
        if(admin_conflict_check) {
            console.log('No conflict.')
            
        }
        else {
            console.log('Conflict in Adding the user')
        }
    }, 



}