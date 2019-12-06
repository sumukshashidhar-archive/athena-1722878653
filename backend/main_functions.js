//IMPORTS
var user = require("./models/user.js");
var Student = require("./models/StudentInfo.js");
var Organiser = require("./models/OrganiserInfo.js");
const crypto = require("crypto");

module.exports = {

    furtherInfoOrg: function furtherInfoOrganiser(OrganizerName, emailId, PhoneNo){
        console.log("Saving further info organiser...");
        console.log(OrganizerName)
        var newOrganiser = new Organiser({
            OrganiserName: OrganizerName,
            OrganiserEmail: emailId,
            // RegistrationDate: RegistrationDate,
            PhoneNo: PhoneNo
            // loginId: loginId
        });
        // console.log(newOrganiser.OrganiserEmail)
        // console.log(newOrganiser.OrganiserName)
        // console.log(newOrganiser.PhoneNo)
        newOrganiser.save(function(err, obj)
        {
            if(err)
            {
                res.send("ERROR");
                return("ERROR");
            }
            else
            {
                console.log(obj);
                return(obj);
            }
        });
    }, 
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