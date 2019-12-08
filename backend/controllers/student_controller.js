//IMPORTS
var user = require("./../models/user.js");
var Student = require("./../models/StudentInfo.js");
var Organiser = require("./../models/OrganiserInfo.js");
const crypto = require("crypto");

module.exports = {
    
    furtherInfoStudent: function furtherInfoStudent(fName, lName, emailId, DOB, phoneNo, city, pincode){
        console.log("Saving Further info..."); //Should remove this line once testing is done
        var newStudent = new Student({
            FirstName: fName,
            LastName: lName,
            EmailId: emailId,
            DOB: DOB,
            PhoneNo: phoneNo,
            interests: [],
            Achievement: [],
            Location: city, 
            pincode: pincode
        });
        newStudent.save(function(err, obj)
        {
            if(err)
            {
                console.log("ERROR, " + err);
            }
            else
            {
                console.log(obj);
                return (obj);
            }
        });
    },
    
}