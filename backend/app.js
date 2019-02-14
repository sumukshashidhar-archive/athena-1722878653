
//Imports - Needed Packages for Running
var express = require("express");
var fs = require('fs');
var jwt = require('jsonwebtoken')
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const cors =require('cors');
var bcrypt = require('bcrypt');
const crypto = require("crypto");
var multer = require('multer');



//Requirements - Needed Files for Running
const tokenExtractor = require('./controllers/tokenExtractor.js')
var func = require('./main_functions.js');
var achievements = require('./models/Achievements.js');
const enc = require('./config/encryptionConfig.js');
var serv = require('./config/severConfig.js');
var user = require("./models/user.js");
var Student = require("./models/StudentInfo.js");
var Organiser = require("./models/OrganiserInfo.js");
const db = require('./config/database');
var event = require('./models/event');
const saltRounds = enc.saltRounds;
const alg = require('./controllers/algorithm_runtime')
var rec = require(alg.algorithm_update(true))


// PRIVATE and PUBLIC key. Key Requirements are important to JWT authentication
var privateKEY  = fs.readFileSync('./keys/private.key', 'utf8');
var publicKEY  = fs.readFileSync('./keys/public.key', 'utf8');





/* 

INITIALIZATIONS


*/

//Express app instantiation
var app = express();

//testing var declaration - will be removed as development goes on
var token;

//Using Cors
app.use(cors());

//To get data from the angular project
app.use(bodyParser.json());

//To get rid of the promise exception
mongoose.Promise = global.Promise; 

//DB CONNECTION
// This is an async funtion
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true}) //Changed this line to link to a database file instead of having everything in one file to provide quick and easy access for further work
    .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

//STARTING SERVER HERE
app.listen(serv.port, process.env.IP, function(req, res) //The Serv.port is from a config file
{
    console.log("SERVER STARTED");
});

//FILE UPLOAD CODE, DON'T TOUCH, FOR HELP CONTACT VIJAY


var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./Images");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).array("imgUploader", 1); //Field name and max count

//USAGE DOWN BELOW

// upload(req, res, function(err) {
//     if (err) {
//         return res.end("Something went wrong!");
//     }
//     return res.end("File uploaded sucessfully!.");
// });

//Basic Housekeeping ends here. Refer back here for the Import Errors that you may get



/* 

ventLogSchema

ROUTES AHEAD!---->



*/








/* 


ROUTES PRODUCTION READY


*/



//REGISTRATION ROUTE FOR STUDENTS.
app.post('/register', function(req, res)
{   
    jwt.verify(token, publicKEY, enc.verifyOptions, function(err, decodedToken){
        if(err){
            //CODE BELOW THIS IS PRODUCTION READY
            bcrypt.hash(req.body.password, saltRounds, function(err, BCRYPT_PASSWORD_HASH){
                if(err){
                    console.log(err)
                    res.status(500).send("Internal Server Error") //Sends an internal server err
                }
                else{
                    bcrypt.hash(req.body.securityAnswer, saltRounds, function(err, BCRYPT_SECURITY_ANSWER_HASH){
                        if(err){
                            console.log(err)
                            res.status(500).send("Internal Server Error") //Sends an internal server err
                        }
                        else{
                            console.log("registering user");
                            var newUser = new user({
                                username: req.body.email, 
                                userType: "Student", 
                                password: BCRYPT_PASSWORD_HASH,
                                securityQuestion: req.body.securityQuestion,
                                securityAnswer: BCRYPT_SECURITY_ANSWER_HASH
                            });
                                                
                            newUser.save(function(err, obj)
                            {
                                if(err){
                                    console.log("ERROR, " + err);
                                    res.status(422).send("Error in saving user");
                                }
                                else{
                                    console.log(obj);
                                    //Sends the following data to the functions.js file. Edits have to be made in there if needed
                                    res.send(func.furtherInfoStudent(req.body.firstname, req.body.lastname, req.body.email, req.body.DOB, req.body.phoneNo)); //TODO: Put this in a different file
                                }
                            });
                        }
                    })
                }
            })

        }
        else{
            //TODO: Make a way for the user to be redirected to the homepage
            //NOT READY
        }
    })

});

app.post('/updateinfo', function(req, res){
    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, function(err, decodedToken){
        if(err){
            console.log(err)
            res.status(403).send("Not Logged In")
        }
        else{
            user.findOne({email: req.body.email}, function(err, obj){
                if(err){
                    console.log("Mongo Error:" + err)
                }
                else{
                    if(obj!=null && obj!=undefined && obj!={}){
                        console.log(obj)
                        bcrypt.compare(req.body.password, obj.password, function(err, BCRYPT_RES){
                            if(BCRYPT_RES){
                                var FirstName = req.body.FirstName
                                var LastName = req.body.LastName
                                var PhoneNo = req.body.phoneNo
                                var Bio = req.body.bio
                                var SLocation = req.body.Slocation
                                user.updateOne({id: obj._id}, {$set: {FirstName: req.body.FirstName, LastName: req.body.LastName, PhoneNo:req.body.phoneNo, Bio: req.body.bio, SLocation: req.body.Slocation}}, function(err, obj){
                                    if(err){
                                        console.log(err)
                                    }
                                    else{
                                        console.log("Success")
                                        res.status(200).send("Success")
                                    }
                                })
                            }
                            else{

                            }
                        })
                    }
                }
            })
        }
    })
})




//REGISTRATION ROUTE FOR ORGANIZERS.
app.post('/registerorganizer', function(req, res)
{   
    jwt.verify(token, publicKEY, enc.verifyOptions, function(err, decodedToken){
        if(err){
            //CODE BELOW THIS IS PRODUCTION READY
            bcrypt.hash(req.body.password, saltRounds, function(err, BCRYPT_PASSWORD_HASH){
                if(err){
                    console.log(err)
                    res.status(500).send("Internal Server Error") //Sends an internal server err
                }
                else{
                    bcrypt.hash(req.body.securityAnswer, saltRounds, function(err, BCRYPT_SECURITY_ANSWER_HASH){
                        if(err){
                            console.log(err)
                            res.status(500).send("Internal Server Error") //Sends an internal server err
                        }
                        else{
                            console.log("registering user");
                            var newUser = new user({
                                username: req.body.OrganizerEmail, 
                                userType: "Student", 
                                password: BCRYPT_PASSWORD_HASH,
                                securityQuestion: req.body.securityQuestion,
                                securityAnswer: BCRYPT_SECURITY_ANSWER_HASH
                            });
                                                
                            newUser.save(function(err, obj)
                            {
                                if(err){
                                    console.log("ERROR, " + err);
                                    res.status(422).send("Error in saving user");
                                }
                                else{
                                    console.log(obj);
                                    //Sends the following data to the functions.js file. Edits have to be made in there if needed
                                    res.send(func.furtherInfoOrg(req.body.OrganizerName, req.body.OrganizerEmail, req.body.PhoneNo)); //TODO: Put this in a different file
                                }
                            });
                        }
                    })
                }
            })

        }
        else{
            //TODO: Make a way for the user to be redirected to the homepage
            //NOT READY
        }
    })

});


// LOGIN 
app.post('/login', async function(req, res){
    //First finding if such a user exists in the database
    user.findOne({username: req.body.username}, function(err, usrobj){

        //checking that the user object is not null or undefined, to avoid further errors
        if (!err && (usrobj!=null && usrobj!=undefined)){
            bcrypt.compare(req.body.password, usrobj["password"], function(err, BCRYPT_RES){
                if(err){
                    console.log(err)
                }
                else{
                    if(BCRYPT_RES){
                        //Checking what user type the user is, and returning a JWT based on that
                        if(usrobj["userType"]=="Student"){
                            //If the user object is a Student. I am finding a student with the required description
                            Student.findOne({EmailId: req.body.username}, function(err, obj){
                                if(err){
                                    console.log(err)
                                    
                                }
                                else{
                                    //I am generating a JWT here with some required details. Signing options can be changed in config/encryption.js
                                    console.log(obj)
                                    token = jwt.sign({usrid: obj["._id"], email: obj["EmailId"], given_name:obj["FirstName"], family_name: obj["LastName"] ,role: usrobj["userType"], interests: usrobj["Interests"], Location: usrobj["SLocation"], Pincode: usrobj["pincode"]}, privateKEY, enc.signOptions);
                                    console.log(token)
                                    //Testing verification. Has to be removed during deployment
                                    jwt.verify(token, publicKEY, enc.verifyOptions, function(err, decodedToken){
                                        console.log(decodedToken)
                                        console.log("Succesfully generated a JWT Token")
                                    res.json(token)
                                }) 
                                }

                            
                            })
                            
                        }
                        else if(usrobj["userType"]=="Organizer"){
                            //Repeating for Organizer
                            Organiser.findOne({OrganiserEmail: req.body.username}, function(err, obj){
                                if(err){

                                }
                                else{
                                    console.log(obj)
                                    token = jwt.sign({ email: obj["OrganiserEmail"], name: obj["OrganiserName"], role: "Org" }, privateKEY, enc.signOptions);
                                    res.json(token)
                                }
                                
                            })
                            
                        }
                        else if(userobj["userType"]=="Admin"){

                            //TODO: Make an admin block here
                        }   
                    }
                    else{
                        console.log("Wrong Password")
                        res.status(403).send("Wrong Password")
                        //WRONG PASSWORD
                    }
                }
            })
        }
        else
        {
            res.status(422).send(false)
            console.log(err);
        }
    })  
});




//PRODUCTION READY CODE:
app.post('/reset', function(req, res){
    //Finding a user from the DB
    user.findOne({username: req.body.email}, function(err, obj){
        if(err){
            console.log(err)
        }
        else{
            res.json(obj.securityQuestion)
        }
    })
})
//Method for resetting passwords
app.post('/resetpassword' , function(req, res){
    //Finding if a user exists with the same email
    console.log(req.body.email)
    user.findOne({username: req.body.email}, function(err, obj){
        if(err){
            //if an error, logging it
            console.log(err)
        }
        else{
            if(obj=={} || obj==undefined || obj==null){
                console.log("works")
            }
            else{
            //Then comparing it with the bcypt hash present in the users thing
            bcrypt.compare(req.body.securityAnswer, obj["securityAnswer"], function(err, BCRYPT_RES){
                if(err){
                    //if there is an error, sends false
                    console.log(err)
                    res.send(false)
                }
                else{
                    if(BCRYPT_RES){
                        //if there is no error, it checks if the response is true
                        console.log("Succeeded.")
                        res.send(true).json(obj["authCode"])
                    }
                    else{
                        //If not it outputs false
                        console.log("Authentication Error")
                        res.send(false)
                    }
                }
            })
            }

        }
    })
})


app.post('/new-password', function(err, obj){
    //Checks the authorization code is not null or undefined
    if(req.body.authCode!=null || req.body.authCode!=undefined || req.body.authCode!=''){
        //finds a user with a matching authcode and checks for an error
        user.findOne({authCode: req.body.authCode}, function(err, obj){
            if(err){
                console.log(err)
            }
            else{
                console.log("successfully got the authCode")
                //Updates the user's password in the database if all checks out
                user.updateOne({_id: obj._id}, {$set: {password: req.body.password}}, function(err, obj){
                    if(err){
                        console.log(err)
                    }
                    else{
                        //if it is a successfull update, it sends 200.
                        console.log(obj)
                        res.status(200).json(obj)
                    }
                })
            }
        })
    }
    else{
        console.log("session error. Please contact the system administrators")
    }
})



//Dashboard Method, can verify token in the frontend to reduce server process times and lag
app.get('/dashboard', async function(req, res){
    console.log("Login Successful. Now in the dashboard methods");
    //TODO: Verify in the frontend
    //Have to get the token the right way here
    jwt.verify(token, publicKEY, enc.verifyOptions, function(err, decodedToken){
        if(err){
            console.log(err)
        }
        else{
            console.log("Token has been decoded to \n" + decodedToken)
            if(decodedToken["role"]=="Student"){
                res.status(200).json(decodedToken)
            }
            else{
                res.status(403).send("User is not authorized to access this page")
            }
        }
    })

});

/* 


UNDERDEVELOPED ROUTES


*/


app.post('/auth', function(req, res){
    //Have to verify JWT in here for the first instance
})



//Should be the default route for the frontend when it launches
app.post('/auth', function(req, res){
    jwt.verify(req.body.token, publicKEY, enc.verifyOptions, function(err, decodedToken){
        if(err){
            res.status(422).send("JWT verification error")
            console.log('JWT is invalid')
        }
        else{
            if(decodedToken["role"]=="Org"){
                res.status(200).send("Org")
            }
            else if(decodedToken["role"]=="Student"){
                res.status(200).send("Student")
            }    
        }
    })
});

/* 


ROUTES THAT NEED BUG SQUISHING


*/


//LOGOUT ROUTE
app.post('/logout', function(req, res)
{
    //Ask the frontend to send a value called logout in the form
    if(req.body.logout){
        user["LastSeen"] = Math.floor(Date.now()/1000);
    }

});




// ORGANIZER EVENTS CREATOR ROUTE. 
app.post('/organizer-events', async function(req, res){
    jwt.verify(token, publicKEY, enc.verifyOptions, function(err, decodedToken){
        if(err){
            console.log(err)
        }
        else{
            if(decodedToken["role"]=="Org"){
                    var newEvent = new event({
                        evnName: req.body.evnName, 
                        evnDate: req.body.evnDate,
                        evnIntersts: req.body.evnInterests, 
                        evnLocation: req.body.evnLocation, 
                        evnOrganizerName: decodedToken["name"],  //this line has to be changed
                        evnOrganizerPage: req.body.evnOrganizerPage,
                        evnOrganizerContact: req.body.evnOrganizerContact,
                        evnId: func.eventIDGen(req.body.evnName, req.body.evnDate)
                    });
                    newEvent.save(function(err, obj){
                        if(err)
                        {
                            console.log("ERROR:\n" + err);
                            return res.redirect('/registerorganiser');
                        }
                        else
                        {   
                            console.log(obj);
                            res.json(obj)
                        };
                    });
            }
            else{
                console.log("This user is not authenticated to access this page")
                res.status(404).send("This user is unauthorized to access this page")
            }
        }
    })
});

//Have to implement JWT here as well
app.post('/interest', async function(req, res){ 
    console.log("Getting interests method")
    jwt.verify(token, publicKEY, enc.verifyOptions, function(err, decodedToken){
        if(err){
            console.log(err)
        }
        else{
            if(decodedToken["role"]=="Student"){
                obj.Bio = (req.body.bio);
                obj.interests = req.body.interests;
                res.send(obj.interests);
            }
            else{
                console.log("Permissions error");
                res.status(403).send("This user is not authorized to access this page.")
            }
            
        }
    })
})

// Must, MUST send me the user object here later. Needed to run my rdEngine. Maybe even some low load cache

app.post('/events', async function(req, res){
    console.log(req.token)
    console.log(token)
    jwt.verify(token, publicKEY, enc.verifyOptions, function(err, decodedToken){
        if(!err){
            if(decodedToken["role"]=="Student"){
                res.status(200).send(event.find({}))
            }
            else{
                console.log("Unauthorized to access this page")
                res.status(403).send("Unauth")
            }
        }
        else{
            console.log(err)
        }
       
    })
})

app.get('/events', async function(req, res){
    console.log("Getting events......")
    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, function(err, decodedToken){
        if(err){
		//Changing the code here to return the events now
		//Will have to implement a better, asynchronous logic to this code, but for now, this works
		rec.recommend(function(Recommendations)){
			console.log(Recommendations)
			res.send(Recommendations)
		}
            //var Recommendations = rec.recommend(decodedToken["interests"], decodedToken["Pincode"], decodedToken["Location"])
           // console.log(Recommendations)
            //res.send(Recommendations)

            //REMOVE CODE LATER 
        }
        else{
            
            var Recommendations = rec.recommend(decodedToken["interests"], decodedToken["Pincode"], decodedToken["Location"])
            console.log(Recommendations)
            res.send(Recommendations)
           

        }
       
    })
})

app.get('/achievements', async function(req, res){
    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, function(err, decodedToken){
        console.log("Getting Achievements....")
        if(!err && decodedToken!=null){
            console.log("Verified")
            Student.findOne({EmailId: decodedToken.email}, function(err, mongoObj){
                if(err){
                    console.log(err)
                }
                else{
                    console.log("Mongo Object is" + mongoObj.Achievement)
                    res.json(mongoObj.Achievement)
                }
            })
        }
        else{
            console.log(err)
            console.log("Something went wrong")
        }
    })
})


// ACHIEVEMENTS ROUTE
app.post('/achievements', async function(req, res){
        jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, function(err, decodedToken){
            if(!err && decodedToken!=null){
                console.log("Verified");
                console.log(decodedToken)
                var newAch = new achievements({
                    CategoryId: req.body.achCat,
                    SubCategoryId: req.body.achSubCat
                })
                newAch.save(function(err, achobj){
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log(decodedToken)
                        console.log(achobj["id"])
                        res.status(200).json(achobj)
                        Student.findOne({EmailId: decodedToken.email}, function(err, obj){
                            if(err){
                                console.log(err)
                            }
                            else{
                                console.log("Found the student object with the token. Now pushing achievement")
                                obj.Achievement.push(achobj)
                                Student.updateOne({EmailId: decodedToken.email}, {$set:{Achievement: obj.Achievement} }, function(err, updateobj){
                                    if(err){
                                        console.log(err)
                                    }
                                    else{
                                        console.log("Pushed the object successfully")
                                    }
                                })
    
                            }
                        })
                    }
                })
            }
        })
    })

// ADMIN DASH ROUTE

app.post('/organizerdashboard', async function(req, res){
    //Will have to make more options to display more specific errors in the future and them handle that in the frontend
    jwt.verify(token, publicKEY, enc.verifyOptions, function(err, decodedToken){
        if(!err && decodedToken!=null){
            console.log("Now redirecting to organizer dashboard");
            res.status(200).json(decodedToken);
        }
        else{
            res.status(403).send("Unauth");
        }
    })
})

app.post('/event-search', function(req, res){
    //Running an event search with the given keywords in the database
   // pubmsg.find({$or: [{sender: req.body.searchitem}, {msgid: req.body.searchitem}]}, function(err, obj)
    event.find({$or: [{evnName: req.body.evnName}]}, function(err, obj){ //TODO: Make it so that someone can search for date, organizer or time as well
        if(err){
            console.log(err)
        }
        else{
            //TODO: Make sure that the RD engine works on this dataset as well
            console.log(obj)
            res.json(obj)
        }
    })
})



app.post('/delete-user', function(req, res){

})


app.post('/reset-delete-user', function(req, res){

})

/*


ARCHIVED ROUTES
    

//OLD ORGANIZER REGISTER CODE
// //ORGANIZER REGISTER ROUTE
// app.post('/registerorganizer', function(req, res){   
//     jwt.verify(token, publicKEY, enc.verifyOptions, function(err, decodedToken){
//         if(err){
//             console.log("registering user");
//             var newUser = new user({
//                 username: req.body.OrganizerEmail, 
//                 userType: "Organizer", 
//                 password: bcrypt.hashSync(req.body.Password, saltRounds),
//                 // securityQuestion: req.body.securityQuestion,
//                 // securityAnswer: bcrypt.hashSync(req.body.securityAnswer, saltRounds)
//             })
        
//             newUser.save(function(err, obj)
//             {
                
//                 if(err)
//                 {
//                     console.log("ERROR:\n" + err);
//                 }
        
//                 else
//                 {   
//                     console.log(user);
//                     res.send(func.furtherInfoOrg(req.body.OrganizerName, req.body.OrganizerEmail, req.body.PhoneNo));
                    
//                     //Removed some more redundant code
//                 };
//             });
//         }
//         else{
//             //TODO: Same as above
//         }
//     })
    
// });


    //OLD LOGIN CODE FOR DEBUGGING
// // LOGIN 
// app.post('/login', async function(req, res){
//     //First finding if such a user exists in the database
//     user.findOne({username: req.body.username}, function(err, usrobj){
//         //checking that the user object is not null or undefined, to avoid further errors
//         if (!err && (usrobj!=null && usrobj!=undefined)){
//             //Logging the user object, has to be removed in the future
//             console.log(usrobj);
//             //comparing the password synchronously. do not know if asynchronous comparison is the best way
//             // Have to make this asynchronous
//             if (bcrypt.compareSync(req.body.password, usrobj["password"])){
//                 //Checking what user type the user is, and returning a JWT based on that
//                 if(usrobj["userType"]=="Student"){
//                     //If the user object is a Student. I am finding a student with the required description
//                     Student.findOne({EmailId: req.body.username}, function(err, obj){
//                         if(err){
//                             console.log(err)
//                         }
//                         else{
//                             //I am generating a JWT here with some required details. Signing options can be changed in config/encryption.js
//                             console.log(obj)
//                             token = jwt.sign({email: obj["EmailId"], given_name:obj["FirstName"], family_name: obj["LastName"] ,role: usrobj["userType"]}, privateKEY, enc.signOptions);
//                             console.log(token)
//                             //Testing verification. Has to be removed during deployment
//                             jwt.verify(token, publicKEY, enc.verifyOptions, function(err, decodedToken){
//                                 console.log(decodedToken)
//                                 console.log("Succesfully generated a JWT Token")
//                             res.json(token)
//                         }) 
//                         }

                    
//                     })
                    
//                 }
//                 else if(usrobj["userType"]=="Organizer"){
//                     //Repeating for Organizer
//                     Organiser.findOne({OrganiserEmail: req.body.username}, function(err, obj){
//                         if(err){

//                         }
//                         else{
//                             console.log(obj)
//                             token = jwt.sign({ email: obj["OrganiserEmail"], name: obj["OrganiserName"], role: "Org" }, privateKEY, enc.signOptions);
//                             res.json(token)
//                         }
                        
//                     })
                    
//                 }
//                 else if(userobj["userType"]=="Admin"){
//                     //TODO: Make an admin block here
//                 }    
//             }
//             else{
//                 //On method failure
//                 res.status(422).send('Redirect to login');
//                 console.log("User login failed");
//             }
//         }
//         else
//         {
//             res.status(422).send(false)
//             console.log(err);
//         }
//     })  
// });



*/



