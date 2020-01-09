//IMPORTS
var user = require("./../models/user");
var Student = require("./../models/StudentInfo.js");
var Organiser = require("./../models/OrganiserInfo.js");
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
}