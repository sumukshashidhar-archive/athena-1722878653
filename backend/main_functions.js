//IMPORTS
var user = require("./models/user.js");
var Student = require("./models/StudentInfo.js");
var Organiser = require("./models/OrganiserInfo.js");
const crypto = require("crypto");

module.exports = {

    userFind: function userFind(usr){
        user.findOne({username: usr}, function(err, obj){
            if(err){
                console.log("Error in retrieving user object: " + err);
            }
            else{
                return obj;
            }
        })
    }, 
    resetPassword: function resetPassword(securityAnswer, newobj){
        console.log("Resetting user password.......")
        var isVerified = false;
        isVerified = bcrypt.compareSync(securityAnswer, usrobj["securityAnswer"])
        if (isVerified==true){
           return true;
        }
        else{
            return false;
        }
    }, 
    eventIDGen: function eventIDGen(Name){
        ts = Date.now();
        name = "id_" + Name + "_id" + crypto.randomBytes(16).toString("hex");
        return name;

    }, 

    returnEventfromList: function returnEventfromList(rdList){
        returnArray = []
        for(i=0; i<=rdList.length; i++){
            event.findOne({evnId: rdList[i]}, function(err, obj){
                if(!err){
                    
                }
                else{
                    console.log(err);
                }
            })
        }
    }
    
}