var bcrypt = require('bcrypt');
var user = require("./models/user.js");

module.exports = {
    
    resetPasswordFunction: function resetPasswordFunction(email, newPassword, code)
    {
        console.log(email);
        console.log(newPassword);
        user.findOne({username: email}, function(err, obj) {
            if(err) {
                console.log(err)
            }
            else {
                console.log(obj)
                if(obj){
                    console.log("Found the objectwddffas")
                    bcrypt.hash(newPassword, saltRounds, function(err, BCRYPT_NEW_PWD_HASH) {
                        if(err) {

                        }
                        else {
                            user.findOneAndUpdate({username:email}, {$set: {password: BCRYPT_NEW_PWD_HASH}}, function(err, obj){
                                if(err) {
                                    console.log(err)
                                }
                                else{
                                    if(obj) {
                                        console.log("Object is updated successfully: ", obj)
                                    }
                                    else {
                                        console.log('INTERNAL ERROR. DID NOT FIND SUCH A USER');
                                    }
                                }
                            })
                        }
                    })
                }
                else {
                    console.log("The user does not exist, or the authcode is incrorrect")
                }
            }
        })
        
    }
}