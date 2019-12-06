//IMPORTS
var user = require("./models/user.js");
var Student = require("./models/StudentInfo.js");
var Organiser = require("./models/OrganiserInfo.js");
const crypto = require("crypto");

module.exports = {
    
    furtherInfoStudent: function furtherInfoStudent(fName, lName, emailId, DOB, phoneNo, loginId, securityQuestion, securityAnswer){
        console.log("Saving Further info..."); //Should remove this line once testing is done
        var newStudent = new Student({
            FirstName: fName,
            LastName: lName,
            EmailId: emailId,
            DOB: DOB,
            PhoneNo: phoneNo,
            LoginId: loginId,
            UserInterests: "",
            Achievements: [],
            securityQuestion: securityQuestion,
            securityAnswer: securityAnswer
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