////Have to make sensitive data excluded



//CODE CLEANS - SUMUK
var express = require("express");
var fs = require("fs");
var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const cors = require("cors");
var bcrypt = require("bcryptjs");
const crypto = require("crypto");
var multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const nodemailer = require("nodemailer");
const multipart = require("connect-multiparty");
var Grid = require("gridfs-stream");



const multipartMiddleware = multipart({
    uploadDir: "./uploads"
});
var mms = require("./microservices/ml-data-exports");
var rcms = require("./microservices/redundancy-check");
var oems = require("./microservices/event-org-micro");
// PRIVATE and PUBLIC key. Key Requirements are important to JWT authentication
var privateKEY = fs.readFileSync("./keys/private.key", "utf8");
var publicKEY = fs.readFileSync("./keys/public.key", "utf8");
var lms = require("./microservices/logs-micro");
var dms = require("./microservices/davinci-micro");
var jwms = require("./microservices/jwt-micro");
var CatE = require("./models/category.js");
var InterestSchema = require("./models/interest.js");
const tokenExtractor = require("./controllers/tokenExtractor.js");
var organizer_functions = require("./controllers/organizer_controller");
var student_functions = require("./controllers/student_controller");
var user_function = require("./controllers/user_controller.js");
var achievements = require("./models/Achievements.js");
var AcademicsSchema = require("./models/AcademicsSchema.js");
var randomise = require('./config/randomizer');
const enc = require("./config/encryptionConfig.js");
var serv = require("./config/severConfig.js");
var user = require("./models/user.js");
var Student = require("./models/StudentInfo.js");
var Organiser = require("./models/OrganiserInfo.js");
const db = require("./config/database");
var event = require("./models/event");
var sr = require("./microservices/evn-micro");



const saltRounds = enc.saltRounds;

function sendMail(output, to) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "developersatathena@gmail.com ", // generated ethereal user
            pass: "Kumarans@365!"
            // generated ethereal password //Ty61YkTXI82slp4HOmLqSaq5EYi0gcyvs8Etd6JFjHi12g7j8D7TBObdvzNghUZ3ddK8xGAESGE3lK5po0T0X4jtPJk5cVC
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Athena Contact" <developersatathena@gmail.com>', // sender address
        to: to, // list of receivers
        subject: "Athena Contact", // Subject line
        text: "Com[puter generated email, please do not reply", // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        console.log("Email has been sent");
    });
}
/*
INITIALIZATIONS
*/

//Express app instantiation
var app = express();

//testing var declaration - will be removed as development goes on
var token;

var rdstring = randomise.randomizer;
//Using Cors
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
//To get data from the angular project
app.use(bodyParser.json());

//To get rid of the promise exception
mongoose.Promise = global.Promise;

//DB CONNECTION
const conn = mongoose.createConnection(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// This is an async funtion
mongoose
    .connect(db.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }) //Changed this line to link to a database file instead of having everything in one file to provide quick and easy access for further work
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

// init gfs
let gfs;
conn.once("open", () => {
    // init stream
    console.log("Connection Successful to GFS");
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads"
    });
});

// Create storage engine
var storage = new GridFsStorage({
    url: db.mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = file.originalname + dater();
                const fileInfo = {
                    filename: filename,
                    bucketName: "uploads"
                };
                resolve(fileInfo);
            });
        });
    }
});

function dater() {
    var d = new Date().getDay().toString();
    var m = new Date().getMonth().toString();
    var y = new Date().getFullYear().toString();
    var thro = new Date().toISOString()
    var randomstring = d + m + y + thro.slice(0, 11) + rdstring;
    console.log(randomstring)
    return randomstring
}

function generate(n) {
    var add = 1;
    var max = 12 - add;

    if (n > max) {
        return generate(max) + generate(n - max);
    }

    max = Math.pow(10, n + add);
    var min = max / 10;
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ("" + number).substring(add);
}

//STARTING SERVER HERE
app.listen(serv.port, process.env.IP, function(
    req,
    res //The Serv.port is from a config file
) {
    console.log("SERVER STARTED");
});



app.get('/api/test', function(req, res){
    console.log('Got the request')
    res.json('Server Runs')
})



app.post("/getProfileName", (req, res) => {
    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        function(err, decodedToken) {
            if (!err && decodedToken != null) {
                console.log("Verified");
                console.log(decodedToken);

                user.findOne({
                        username: decodedToken.email
                    },
                    function(err, obj) {
                        if (err) {
                            console.log("ERRROR" + err);
                            res.send(false);
                        } else {
                            console.log("Sent profile picture");
                            /*console.log(obj)*/
                            console.log(obj.profilePic);
                            res.send({
                                name: obj.profilePic
                            });
                        }
                    }
                );
            }
        }
    );
});
const upLoad = multer({
    storage
});

app.post("/upload", upLoad.single("img"), (req, res) => {
    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        function(err, decodedToken) {
            if (!err && decodedToken != null) {
                console.log("Verified");

                user.findOneAndUpdate({
                        username: decodedToken.email
                    },
                    function(err, obj) {
                        if (err) {
                            console.log("ERRROR" + err);
                            res.send(false);
                        } else {
                            console.log("ADDED IMAGE TO DATABASE");
                            res.send({
                                name: req.body.name
                            });
                        }
                    }
                );
            }
        }
    );
});

app.post("/uploadProfile", upLoad.single("img"), (req, res) => {
    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        function(err, decodedToken) {
            if (!err && decodedToken != null) {
                console.log("Verified PROFILE PICTURE");
                console.log(req.body);

                user.findOneAndUpdate({
                        username: decodedToken.email
                    }, {
                        $set: {
                            profilePic: req.body.name + dater()
                        }
                    },
                    function(err, obj) {
                        if (err) {
                            console.log("ERRROR" + err);
                            res.send(false);
                        } else {
                            console.log("Updated profile pic!!");

                            console.log("ADDED IMAGE TO DATABASE");
                            console.log(req.body.name);

                            res.status(200).send(req.body.name);
                        }
                    }
                );
            }
        }
    );
});

app.get('/userdp', function(req, res){
    user.updateMany({profilePic: "dp.png"}, {$set: {profilePic: "dp.png0020202020-01-26TcAXU972wrRoMVtbSAlNDeQIVMfwgw"}}, function(err, obj)
    {
        console.log(obj);
    })
})

//REGISTRATION ROUTE FOR STUDENTS.
app.post("/register", async function(req, res) {
    console.log(req.body);
    var redcheck = await rcms.check(req.body.email);
    console.log(redcheck);
    if (redcheck) {
        bcrypt.hash(req.body.password, saltRounds, function(
            err,
            BCRYPT_PASSWORD_HASH
        ) {
            if (err) {
                console.log(err);
                res.status(500).send("Internal Server Error"); //Sends an internal server err
            } else {
                console.log("registering user");
                var newUser = new user({
                    username: req.body.email,
                    userType: "Student",
                    password: BCRYPT_PASSWORD_HASH,
                    profilePic: "dp.png0020202020-01-26TcAXU972wrRoMVtbSAlNDeQIVMfwgw",
                    LastSeen: Date.now(),
                    Verified: false
                });

                newUser.save(async function(err, obj) {
                    if (err) {
                        console.log("ERROR, " + err);
                        res.status(422).send("Error in saving user");
                    } else {
                        var age = await ageconvert(req.body.DOB);
                        console.log(age);
                        /*console.log(obj)*/
                        var output =
                            "Click on below link to verify <b> => http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com:3000/verifyuser/" +
                            obj._id;
                        console.log(output);
                        sendMail(output, req.body.email);
                        lms.log(obj.username, 3, JSON.stringify(obj));
                        //Sends the following data to the functions.js file. Edits have to be made in there if needed
                        res.send(
                            student_functions.furtherInfoStudent(
                                req.body.firstname,
                                req.body.lastname,
                                req.body.email,
                                req.body.DOB,
                                req.body.phoneNo,
                                req.body.city,
                                req.body.pincode,
                                req.body.bio,
                                req.body.studentSchool
                            )
                        ); //TODO: Put this in a different file
                    }
                });
            }
        });
    } else {
        console.log("THIS USER EXISTS");
        res.status(403).send("user exists already");
    }
});

// app.post("/updateinfo", function(req, res) {
//     jwt.verify(
//         tokenExtractor.tokenExtractor(req.headers.authorization),
//         publicKEY,
//         enc.verifyOptions,
//         function(err, decodedToken) {
//             if (err) {
//                 console.log(err);
//                 res.status(403).send("Not Logged In");
//             } else {
//                 user.findOne({
//                         email: req.body.email
//                     },
//                     function(err, obj) {
//                         if (err) {
//                             console.log("Mongo Error:" + err);
//                         } else {
//                             if (obj != null && obj != undefined && obj != {}) {
//                                 /*console.log(obj)*/
//                                 bcrypt.compare(req.body.password, obj.password, function(
//                                     err,
//                                     BCRYPT_RES
//                                 ) {
//                                     if (BCRYPT_RES) {
//                                         var FirstName = req.body.FirstName;
//                                         var LastName = req.body.LastName;
//                                         var PhoneNo = req.body.phoneNo;
//                                         var Bio = req.body.bio;
//                                         var Location = req.body.Location;

//                                         user.updateOne({
//                                                 id: obj._id
//                                             }, {
//                                                 $set: {
//                                                     FirstName: req.body.FirstName,
//                                                     LastName: req.body.LastName,
//                                                     PhoneNo: req.body.phoneNo,
//                                                     Bio: req.body.bio,
//                                                     SLocation: req.body.Slocation
//                                                 }
//                                             },
//                                             function(err, obj) {
//                                                 if (err) {
//                                                     console.log(err);
//                                                 } else {
//                                                     console.log("Success");

//                                                     res.status(200).send("Success");
//                                                 }
//                                             }
//                                         );
//                                     } else {}
//                                 });
//                             }
//                         }
//                     }
//                 );
//             }
//         }
//     );
// });

//REGISTRATION ROUTE FOR ORGANIZERS.
app.post("/registerorganizer", function(req, res) {
    var redcheck = rcms.check(req.body.email);
    if (redcheck) {
        bcrypt.hash(req.body.Password, saltRounds, function(
            err,
            BCRYPT_PASSWORD_HASH
        ) {
            if (err) {
                console.log(err);
                res.status(500).send("Internal Server Error"); //Sends an internal server err
            } else {
                console.log("registering user");
                var newUser = new user({
                    username: req.body.OrganizerEmail,
                    userType: "Organizer",
                    password: BCRYPT_PASSWORD_HASH,
                    profilePic: "dp.png0020202020-01-26TcAXU972wrRoMVtbSAlNDeQIVMfwgw",
                    Verified: false
                });

                newUser.save(function(err, obj) {
                    if (err) {
                        console.log("ERROR, " + err);
                        res.status(422).send("Error in saving user");
                    } else {
                        console.log(obj._id);
                        var output =
                            "Click on below link to verify<b> => http://ec2-13-126-238-105.ap-south-1.compute.amazonaws.com:3000/verifyuser/" +
                            obj._id;
                        sendMail(output, req.body.OrganizerEmail);
                        //Sends the following data to the functions.js file. Edits have to be made in there if needed
                        lms.log(obj.username, 3, JSON.stringify(obj));
                        res.send(
                            organizer_functions.furtherInfoOrg(
                                req.body.OrganizerName,
                                req.body.OrganizerEmail,
                                req.body.PhoneNo,
                                req.body.orgCity
                            )
                        ); //TODO: Put this in a different file
                    }
                });
            }
        });
    } else {
        res.status(403).send("user exists already");
    }
});

app.get("/verifyuser/*", function(req, res) {
    var idx = req.url.slice(12, 1000);

    user.updateOne({
            _id: idx
        }, {
            $set: {
                Verified: true
            }
        },
        function(err, obj1) {
            if (err) {
                console.log("ERROR" + err);
            } else {
                console.log("VERIFIED");
                console.log(obj1);
                res.redirect(
                    "http://athena-zero.s3-website.ap-south-1.amazonaws.com/login"
                );
            }
        }
    );
});



//////UPLOAD PROFILE PIC
app.post("/uploadProfile", multipartMiddleware, (req, res) => {
    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        function(err, decodedToken) {
            if (!err && decodedToken != null) {
                console.log("Verified");
                console.log(decodedToken);

                user.findOneAndUpdate({
                        username: decodedToken.email
                    }, {
                        $set: {
                            profilePic: req.files.uploads[0].path
                        }
                    },
                    function(err, ibj) {
                        if (err) {
                            console.log("ERRROR" + err);
                            res.send(false);
                        } else {
                            console.log("Updated profile pic!!");
                            res.send({
                                path: req.files.uploads[0].path
                            });
                        }
                    }
                );
            }
        }
    );
});


var removeByAttr = function(arr, attr, value) {
    var i = arr.length;
    while (i--) {
        if (arr[i] &&
            arr[i].hasOwnProperty(attr) &&
            (arguments.length > 2 && arr[i][attr] === value)) {

            arr.splice(i, 1);

        }
    }
    return arr;
}

// LOGIN
app.post("/login", async function(req, res) {
    //First finding if such a user exists in the database
    user.findOne({
            username: req.body.username
        },
        function(err, usrobj) {
            console.log(usrobj);
            //checking that the user object is not null or undefined, to avoid further errors
            if (!err && usrobj != null && usrobj != undefined) {
                if (usrobj.Verified) {
                    bcrypt.compare(req.body.password, usrobj["password"], function(
                        err,
                        BCRYPT_RES
                    ) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (BCRYPT_RES) {
                                console.log(usrobj);
                                //Checking what user type the user is, and returning a JWT based on that
                                if (usrobj["userType"] == "Student") {
                                    //If the user object is a Student. I am finding a student with the required description
                                    Student.findOne({
                                            EmailId: req.body.username
                                        },
                                        function(err, obj) {
                                            if (!err && usrobj != null && usrobj != undefined) {
                                                //I am generating a JWT here with some required details. Signing options can be changed in config/encryption.js
                                                /*console.log(obj)*/
                                                token = jwt.sign({
                                                        usrid: obj["_id"],
                                                        email: obj["EmailId"],
                                                        given_name: obj["FirstName"],
                                                        family_name: obj["LastName"],
                                                        role: usrobj["userType"],
                                                        Location: obj["Location"],
                                                        Pincode: obj["pincode"],
                                                    },
                                                    privateKEY,
                                                    enc.signOptions
                                                );
                                                console.log(token);
                                                //Testing verification. Has to be removed during deployment
                                                jwt.verify(
                                                    token,
                                                    publicKEY,
                                                    enc.verifyOptions,
                                                    function(err, decodedToken) {
                                                        console.log(decodedToken);
                                                        console.log("Succesfully generated a JWT Token");
                                                        res.json(token);
                                                    }
                                                );
                                                lms.log(obj.EmailId, 2);
                                            } else {
                                                console.log("vhjk");
                                                console.log(err);
                                            }
                                        }
                                    );
                                } else if (usrobj["userType"] == "Organizer") {
                                    //Repeating for Organizer
                                    Organiser.findOne({
                                            OrganiserEmail: req.body.username
                                        },
                                        function(err, obj) {
                                            if (usrobj.Verified) {
                                                console.log("vhjk fghuio");

                                                /*console.log(obj)*/
                                                token = jwt.sign({
                                                        usrid: obj["_id"],
                                                        email: obj["OrganiserEmail"],
                                                        name: obj["OrganiserName"],
                                                        role: "Org"
                                                    },
                                                    privateKEY,
                                                    enc.signOptions
                                                );
                                                res.json(token);
                                                lms.log(obj.OrganiserEmail, 2);
                                            } else {
                                                res.send("WRONG VER");
                                                console.log("ORGANISER NOT VERIFIED");
                                            }
                                        }
                                    );
                                }
                            } else {
                                console.log("Wrong Password");
                                res.status(403).send("WRONG PASS");
                                //WRONG PASSWORD
                            }
                        }
                    });
                } else {
                    res.send("WRONG VER");
                    console.log("USER NOT VERIFIED");
                }
            } else {
                res.send(false);
                console.log("PROBABLY NOT FOUND USER");
                console.log(err);
            }
        }
    );
});

//PRODUCTION READY CODE:
//PRODUCTION READY CODE:
app.post("/reset", function(req, res) {
    //Finding a user from the DB
    user.findOne({
            username: req.body.email
        },
        function(err, obj) {
            if (!obj) {
                if (err) {
                    console.log(err);
                    res.send(false);
                } else {
                    console.log("COULDN'T FIND OBJECT");
                    res.send(false);
                }
            } else {
                var code = generate(6);
                var output = "YOUR CODE IS: " + code;

                user.findOneAndUpdate({
                        username: req.body.email
                    }, {
                        $set: {
                            AuthCode: code
                        }
                    },
                    function(err, obj) {
                        if (err) {
                            console.log(err);
                            res.send(false);
                        } else {
                            sendMail(output, req.body.email);
                            /*console.log(obj)*/
                            res.send(true);
                        }
                    }
                );
            }
        }
    );
});

app.post("/resetPasswordCode", function(req, res) {
    console.log(req.body.code);
    console.log(req.body.email);

    user.findOne({
            username: req.body.email
        },
        function(err, mongoObj) {
            if (err) {
                console.log(err);
            } else {
                console.log(mongoObj);
                if (mongoObj.AuthCode == req.body.code) {
                    console.log("Verified");
                    res.send(true);
                } else {
                    console.log("PROBLEMMM");
                    res.send(false);
                }
            }
        }
    );
});

//Method for resetting passwords
app.post("/resetpassword", function(req, res) {
    //Finding if a user exists with the same email
    console.log("Email is: ", req.body.email);
    console.log("Password: ", req.body.password);
    console.log("Reseting password");
    user_function.resetPasswordFunction(
        req.body.email,
        req.body.password,
        req.body.authCode
    );
    res.send(true);
    lms.log(req.body.email, 5);
});

//I BELIEVE THIS IS REDUNDANT CODE:

app.post("/new-password", function(err, obj) {
    //Checks the authorization code is not null or undefined
    if (
        req.body.authCode != null ||
        req.body.authCode != undefined ||
        req.body.authCode != ""
    ) {
        //finds a user with a matching authcode and checks for an error
        user.findOne({
                authCode: req.body.authCode
            },
            function(err, obj) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("successfully got the authCode");
                    //Updates the user's password in the database if all checks out
                    user.updateOne({
                            _id: obj._id
                        }, {
                            $set: {
                                password: req.body.password
                            }
                        },
                        function(err, obj) {
                            if (err) {
                                console.log(err);
                            } else {
                                //if it is a successfull update, it sends 200.
                                /*console.log(obj)*/
                                res.status(200).json(obj);
                            }
                        }
                    );
                }
            }
        );
    } else {
        console.log("session error. Please contact the system administrators");
    }
});

//Dashboard Method, can verify token in the frontend to reduce server process times and lag
app.get("/dashboard", async function(req, res) {
    console.log("Login Successful. Now in the dashboard methods");
    //TODO: Verify in the frontend
    //Have to get the token the right way here
    jwt.verify(token, publicKEY, enc.verifyOptions, function(err, decodedToken) {
        if (err) {
            console.log(err);
        } else {
            console.log("Token has been decoded to \n" + decodedToken);
            if (decodedToken["role"] == "Student") {
                res.status(200).json(decodedToken);
            } else {
                res.status(403).send("User is not authorized to access this page");
            }
        }
    });
});

app.post("/bio", function(req, res) {
    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        function(err, decodedToken) {
            console.log("Getting Bio....");
            if (!err && decodedToken != null) {
                console.log("Verified: " + decodedToken.email);
                Student.findOne({
                        EmailId: decodedToken.email
                    },
                    function(err, mongoObj) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Mongo Object is Bio " + mongoObj);
                            res.json(mongoObj.Bio);
                        }
                    }
                );
            } else {
                console.log(err);
                console.log("Something went wrong");
            }
        }
    );
});

// ORGANIZER EVENTS CREATOR ROUTE.
app.post("/organizer-events", async function(req, res) {
    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        function(err, decodedToken) {
            if (err) {
                console.log(err);
            } else {
                var newImgName = req.body.Image + dater();
                if (decodedToken["role"] == "Org") {
                    var newEvent = new event({
                        evnName: req.body.evnName,
                        evnDate1: req.body.evnDate1,
                        evnDate2: req.body.evnDate2,
                        evnInterests: req.body.interestArray,
                        evnLocation: req.body.evnLocation,
                        evnCity: req.body.evnCity,
                        evnOrganizerName: decodedToken["name"], //this line has to be changed
                        evnOrganizerPage: req.body.evnOrganizerPage,
                        evnOrganizerContact: req.body.evnOrganizerContact,
                        evnLocation: req.body.evnLocation,
                        evnPincode: req.body.evnPincode,
                        evnTargetAge: req.body.evnTargetAge,
                        evnDescription: req.body.evnDescription,
                        evnCost: req.body.cost,
                        Image: newImgName
                    });
                    newEvent.save(function(err, obj) {
                        if (err) {
                            console.log("ERROR:\n" + err);
                            return res.redirect("/registerorganiser");
                        } else {
                            /*console.log(obj)*/
                            //have to append the newly created id to the organizer as well
                            oems.addToOrganiser(decodedToken["usrid"], obj._id);
                            res.json(obj);
                        }
                    });
                } else {
                    console.log("This user is not authenticated to access this page");
                    res.status(404).send("This user is unauthorized to access this page");
                }
            }
        }
    );
});

app.post("/addInterestOrganizer", function(req, res) {
    console.log("INTEREST SENT FROM FRONTEND: \n\n" + req.body);

    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        function(err, decodedToken) {
            if (!err && decodedToken != null && decodedToken['role']=='Org') {
                console.log("Verified");
                var newInterests = req.body.eventInterest;
                event.findOne({
                        _id: req.body.eventId
                    },
                    function(err, obj) {
                        if (err || obj == null || obj == undefined) {
                            console.log(err);
                        } else {
                            var currentInterests = obj.evnInterests;

                            for (var i = 0; i < newInterests.length; i++) {
                                if (currentInterests.includes(newInterests[i])) {
                                    console.log("Already there");
                                } else {
                                    obj.evnInterests.push(newInterests[i]);
                                    event.updateOne({
                                            EmailId: decodedToken.email
                                        }, {
                                            $set: {
                                                Interests: obj.Interests
                                            }
                                        },
                                        function(err, updateobj) {
                                            if (err) {
                                                console.log(err);
                                            } else {}
                                        }
                                    );
                                }
                            }
                            /*console.log(obj)*/
                        }
                    }
                );
            }
        }
    );
});

app.get("/achievements", async function(req, res) {
    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        function(err, decodedToken) {
            console.log("Getting Achievements....");
            if (!err && decodedToken != null) {
                if (decodedToken["role"] == "Student") {
                    console.log("Verified");
                    Student.findOne({
                            EmailId: decodedToken.email
                        },
                        function(err, mongoObj) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(
                                    "Mongo Object is AChievments" + mongoObj.Achievement
                                );
                                res.json(mongoObj.Achievement);
                            }
                        }
                    );
                } else {
                    console.log("Unauthorized JWT");
                    res.status(403).send("Wrong JWT");
                }
            } else {
                console.log(err);
                console.log("Something went wrong");
            }
        }
    );
});

// ACHIEVEMENTS ROUTE
app.post("/achievements", (req, res) => {
    console.log("NN");
    console.log(req.body);
    console.log(req.body);
    console.log(req.body.uploadedFiles);
    console.log("PRINTED IT");
    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        function(err, decodedToken) {
            if (!err && decodedToken != null && decodedToken['role']=='Student') {
                console.log("Verified");
                console.log(decodedToken);
                var newAch = new achievements({
                    CategoryId: req.body.category.catName,
                    SubCategoryId: req.body.subCatName.subCatName,
                    Image: (req.body.file + dater()),
                    Description: req.body.description,
                    achRank: req.body.rank.name,
                    Name: req.body.name
                });
                newAch.save(function(err, achobj) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).json(achobj);
                        Student.findOne({
                                EmailId: decodedToken.email
                            },
                            function(err, obj) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(
                                        "Found the student object with the token. Now pushing achievement"
                                    );
                                    obj.Achievement.push(achobj);
                                    Student.updateOne({
                                            EmailId: decodedToken.email
                                        }, {
                                            $set: {
                                                Achievement: obj.Achievement
                                            }
                                        },
                                        function(err, updateobj) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                console.log("Pushed the object successfully");
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                });
            }
        }
    );
});

//ACADEMICS

app.post("/addAcademics", function(req, res) {
    // onsole.log("\N\N");
    // console.log(req.body)

    // console.log(req.body);
    // console.log(req.body.uploadedFiles)
    console.log("PRINTED IT");

    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        function(err, decodedToken) {
            if (!err && decodedToken != null && decodedToken['role']=='Student') {
                console.log("Verified");
                console.log(decodedToken);
                // console.log('THIS IS TH EAHIEVEMENT' + req.body.achCat + req.body.achSubCat + req.body.uploadedFiles + req.body.rank + req.body.description)

                Student.findOne({
                        EmailId: decodedToken.email
                    },
                    function(err, obj) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (obj.Academics) {
                                var newImgName = req.body.Image + dater();
                                var newAc = new AcademicsSchema({
                                    testName: req.body.testName,
                                    testRank: req.body.testRank,
                                    Image: newImgName,
                                    toShow: req.body.toShow,
                                    id: obj.Academics.length,
                                    testScore: req.body.testScore
                                });

                                newAc.save(function(err, achobj) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        Student.findOne({
                                                EmailId: decodedToken.email
                                            },
                                            function(err, obj) {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    console.log("FOUND TOKEN, ADDING ACADEMICS");
                                                    obj.Academics.push(newAc);
                                                    Student.updateOne({
                                                            EmailId: decodedToken.email
                                                        }, {
                                                            $set: {
                                                                Academics: obj.Academics
                                                            }
                                                        },
                                                        function(err, updateobj) {
                                                            if (err) {
                                                                console.log(err);
                                                            } else {
                                                                console.log("SUCCESS");
                                                                res.send(true);
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                        );
                                    }
                                });
                            } else {

                                var newAc = new AcademicsSchema({
                                    testName: req.body.testName,
                                    testRank: req.body.testRank,
                                    Image: newImgName,
                                    toShow: req.body.toShow,
                                    id: 0,
                                    testScore: req.body.testScore
                                });

                                newAc.save(function(err, achobj) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        Student.findOne({
                                                EmailId: decodedToken.email
                                            },
                                            function(err, obj) {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    console.log("FOUND TOKEN, ADDING ACADEMICS");
                                                    obj.Academics.push(newAc);
                                                    Student.updateOne({
                                                            EmailId: decodedToken.email
                                                        }, {
                                                            $set: {
                                                                Academics: obj.Academics
                                                            }
                                                        },
                                                        function(err, updateobj) {
                                                            if (err) {
                                                                console.log(err);
                                                            } else {
                                                                console.log("SUCCESS");
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                        );
                                    }
                                });
                            }
                        }
                    }
                );
            }
        }
    );
});

app.post("/getAcademics", async function(req, res) {
    var decoded = await jwms.verify(req.headers.authorization);
    if(decoded!=false && decoded['role']=='Student') {
            Student.findOne({
            EmailId: decoded.email
        },
        function(err, obj) {
            if (err) {
                console.log(err);
            } else {
                console.log(obj.Academics);
                res.send(obj.Academics);
            }
        }
    );
    }
    else {
        res.status(403).send('Unauthorized')
    }

});

app.post("/getSpecicifAc", async function(req, res) {
    var decoded = await jwms.verify(req.headers.authorization);
    if(decoded!=false && decoded['role']=='Student'){
            console.log(req.body.email);
            console.log.apply(req.body.acId);
            Student.findOne({
                    EmailId: req.body.email
                },
                function(err, obj) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(obj.Academics[req.body.acId]);
                        res.send(obj.Academics[req.body.acId]);
                    }
                }
            );
    }
    else {
        res.status(403).send('wrong type')
    }

});

//INTERESTS

app.get("/interests", async function(req, res) {
    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        function(err, decodedToken) {
            console.log("Getting Interests....");
            if (!err && decodedToken != null && decodedToken['role']=='Student') {
                console.log("Verified");
                Student.findOne({
                        EmailId: decodedToken.email
                    },
                    function(err, mongoObj) {
                        if (err || mongoObj == null) {
                            console.log(err);
                        } else {
                            console.log("Mongo Object is" + mongoObj.Interests);

                            res.send(mongoObj.Interests);
                        }
                    }
                );
            } else {
                console.log(err);
                console.log("Something went wrong");
            }
        }
    );
});

app.post("/addInterest", function(req, res) {
    console.log("INTEREST SENT FROM FRONTEND: \n\n" + req.body);

    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        function(err, decodedToken) {
            console.log("Getting Achievements....");
            if (!err && decodedToken != null && decodedToken['role']=='Student') {
                console.log("Verified");
                var newInterests = req.body;
                console.log(newInterests);

                Student.findOne({
                        EmailId: decodedToken.email
                    },
                    function(err, obj) {
                        if (err || obj == null || obj == undefined) {
                            console.log(err);
                        } else {
                            var currentInterests = obj.Interests;

                            for (var i = 0; i < newInterests.length; i++) {
                                if (currentInterests.includes(newInterests[i])) {
                                    console.log("Already there");
                                } else {
                                    obj.Interests.push(newInterests[i]);
                                    obj.Interests.sort();
                                    Student.updateOne({
                                            EmailId: decodedToken.email
                                        }, {
                                            $set: {
                                                Interests: obj.Interests
                                            }
                                        },
                                        function(err, updateobj) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                console.log("UPDATED!1");
                                            }
                                        }
                                    );

                                    console.log("NEW INTEREST NAMEMM: " + newInterests[i]);
                                    var subCat = newInterests[i];

                                    InterestSchema.findOne({
                                            subCat: newInterests[i]
                                        },
                                        function(err, intObj) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                console.log("adding to interest schema");

                                                if (intObj == null) {
                                                    var interestSchema = new InterestSchema({
                                                        subCat: subCat,
                                                        users: [obj._id]
                                                    });

                                                    interestSchema.save(function(err, obj) {
                                                        if (err) {
                                                            console.log(err);
                                                        } else {
                                                            console.log("SUCCESSFULLY DONE!!");
                                                        }
                                                    });
                                                } else {
                                                    console.log(intObj);
                                                    intObj.users.push(obj._id);

                                                    InterestSchema.updateOne({
                                                            subCat: subCat
                                                        }, {
                                                            $set: {
                                                                users: intObj.users
                                                            }
                                                        },
                                                        function(err, lObj) {
                                                            if (err) {
                                                                console.log(err);
                                                            } else {
                                                                console.log("added successfully");
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                        }
                                    );
                                }
                            }

                            /*console.log(obj)*/
                            res.send(obj);
                        }
                    }
                );
            } else {
                console.log(err);
                console.log("Something went wrong");
            }
        }
    );
});

app.post("/getUserInfo", function(req, res) {
    console.log("ID: ");
    console.log(req.body.id);

    Student.findOne({
            _id: req.body.id
        },
        function(err, obj) {
            if (err) {
                console.log(err);
            } else {
                console.log("FOUND STUDENT OBJECT.");

                user.findOne({
                        username: obj.EmailId
                    },
                    function(err1, obj1) {
                        if (err1) {
                            console.log(err1);
                        } else {
                            res.send({
                                obj: obj,
                                dp: obj1.profilePic
                            });
                        }
                    }
                );
            }
        }
    );
});

app.post("/deleteInterest", function(req, res) {
    console.log("delete interest" + req.body.interest);
    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        function(err, decodedToken) {
            if (!err && decodedToken != null && decodedToken['role']=='Student') {
                Student.findOne({
                        EmailId: decodedToken.email
                    },
                    function(err, obj) {
                        if (err || obj == null || obj == undefined) {
                            console.log("ERROR");
                        } else {
                            var arr = obj.Interests;

                            for (var i = 0; i < arr.length; i++) {
                                if (arr[i] === req.body.interest) {
                                    arr.splice(i, 1);
                                }
                            }

                            Student.update({
                                    EmailId: decodedToken.email
                                }, {
                                    $set: {
                                        Interests: arr
                                    }
                                },
                                function(err1, obj1) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log(obj1);
                                        console.log("Success");
                                        res.status(200).send(true);
                                    }
                                }
                            );
                        }
                    }
                );
            } else {
                console.log(err);
                console.log("Something went wrong");
            }
        }
    );
});

app.post("/deleteAchievements", function(req, res) {
    console.log("DELETING ACH");
    console.log("******************************");
    console.log("req.body: ");
    console.log(req.body);
    console.log("******************************");

    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        function(err, decodedToken) {
            console.log("Getting Achievements....");
            if (!err && decodedToken != null && decodedToken['role']=='Student') {
                Student.updateOne({
                        EmailId: decodedToken.email
                    }, {
                        $pull: {
                            Achievement: {
                                _id: req.body.achId
                            }
                        }
                    },
                    function(err, obj) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(req.body.achId);
                            res.status(200).send("SUCCESS");
                        }
                    }
                );
            } else {
                console.log(err);
                console.log("Something went wrong");
            }
        }
    );
});

// ADMIN DASH ROUTE

app.post("/organizerdashboard", async function(req, res) {
    //Will have to make more options to display more specific errors in the future and them handle that in the frontend
    jwt.verify(token, publicKEY, enc.verifyOptions, function(err, decodedToken) {
        if (!err && decodedToken != null && decodedToken['role']=='Org') {
            console.log("Now redirecting to organizer dashboard");
            res.status(200).json(decodedToken);
        } else {
            res.status(403).send("Unauth");
        }
    });
});

app.post("/event-search", async function(req, res) {
    //Running an event search with the given keywords in the database
    // pubmsg.find({$or: [{sender: req.body.searchitem}, {msgid: req.body.searchitem}]}, function(err, obj)
    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        async function(err, DECODEDTOKEN) {
            if (err) {} else {
                if (req.body.usecase == 1) {
                    if(DECODEDTOKEN['role']=='Student'){
                        var evns = await dms.reqular_city_search(req.body.keyword,DECODEDTOKEN);
                        res.send(evns); 
                    }
                    else {
                        res.status(403).send('Unauthorized')
                    }
                } else if (req.body.usecase == 2) {
                    var evns = await dms.deep_search(req.body.keyword, DECODEDTOKEN);
                    res.send(evns);
                } else if (req.body.usecase == 3) {
                    ///DOES NOT WORK
                    var evns = await dms.deep_search(req.body.keyword, DECODEDTOKEN);
                    res.send(evns);
                }
                res.send(evns);
            }
        }
    );
});

app.get("/events", async (req, res) => {
    //Gets a request from the user
    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        async (err, decodedToken) => {
            if (err) {
                console.log(err);
            } else {
                if (err) {
                    console.log("INTERNAL ERROR. ", err);
                } else {
                    if(decodedToken['role']=='Student') {
                                Student.findOne({
                                _id: decodedToken.usrid
                            },
                            async function(err, MONGO_OBJ_RETURN) {
                                if (err) {
                                    console.log(err);
                                    res.status(403).send("Unauthorized JWT");
                                } else {
                                    if (MONGO_OBJ_RETURN) {
                                        //This implies that I found a user like this
                                        //Now I need to process recommendations for this user
                                        var evns_to_return = await dms.explore(MONGO_OBJ_RETURN);
                                        // var evns_to_return = await dms.testexplore(MONGO_OBJ_RETURN)
                                        // console.log("Being sent is: \n", evns_to_return)
                                        res.send(evns_to_return);
                                    } else {
                                        console.log("INTERNAL ERROR. DID NOT FIND A USER LIKE THIS");
                                    }
                                }
                            }
                        );
                    }
                    else {
                        res.status(403).send('Unauthorized')
                    }

                }
            }
        }
    );
});

app.get("/eventsdeep", async (req, res) => {
    console.log("ENTERSSSSSSSS");
    //Gets a request from the user
    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        async (err, decodedToken) => {
            if (err) {
                console.log(err);
            } else {
                if (err) {
                    console.log("INTERNAL ERROR. ", err);
                } else {
                    Student.findOne({
                            _id: decodedToken.usrid
                        },
                        async function(err, MONGO_OBJ_RETURN) {
                            if (err) {
                                console.log(err);
                                res.status(403).send("Unauthorized JWT");
                            } else {
                                if (MONGO_OBJ_RETURN) {
                                    //This implies that I found a user like this
                                    //Now I need to process recommendations for this user
                                    var evns_to_return = await dms.testexplore(MONGO_OBJ_RETURN);
                                    // var evns_to_return = await dms.testexplore(MONGO_OBJ_RETURN)
                                    // console.log("Being sent is: \n", evns_to_return)
                                    res.send(evns_to_return);
                                } else {
                                    console.log("INTERNAL ERROR. DID NOT FIND A USER LIKE THIS");
                                }
                            }
                        }
                    );
                }
            }
        }
    );
});

app.get("/getnord", async (req, res) => {
    console.log("ENTERSSSSSSSS");
    //Gets a request from the user
    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        async (err, decodedToken) => {
            if (err) {
                console.log(err);
            } else {
                if (err) {
                    console.log("INTERNAL ERROR. ", err);
                } else {
                    Student.findOne({
                            _id: decodedToken.usrid
                        },
                        async function(err, MONGO_OBJ_RETURN) {
                            if (err) {
                                console.log(err);
                                res.status(403).send("Unauthorized JWT");
                            } else {
                                if (MONGO_OBJ_RETURN) {
                                    //This implies that I found a user like this
                                    //Now I need to process recommendations for this user
                                    var evns_to_return = await dms.testexplore2(MONGO_OBJ_RETURN);
                                    // var evns_to_return = await dms.testexplore(MONGO_OBJ_RETURN)
                                    // console.log("Being sent is: \n", evns_to_return)
                                    res.send(evns_to_return);
                                } else {
                                    console.log("INTERNAL ERROR. DID NOT FIND A USER LIKE THIS");
                                }
                            }
                        }
                    );
                }
            }
        }
    );
});

function binarySearch(array, key) {
    var lo = 0,
        hi = array.length - 1,
        mid,
        element;
    while (lo <= hi) {
        mid = (lo + hi) >> 1;
        element = array[mid];
        if (element < key) {
            lo = mid + 1;
        } else if (element > key) {
            hi = mid - 1;
        } else {
            console.log("Found at mid: ", array[mid]);
            return true;
        }
    }
    return false;
}



async function add(interests, evnInterests, uservector, _id) {
    var to_add = new Array(); //Defining the array where we add the interests
    var evlen = evnInterests.length;
    var callback1 = new Promise((res, rej) => {
        for (let i = 0; i < evlen; i++) {
            if (binarySearch(interests, evnInterests[i])) {
                if (binarySearch(uservector, evnInterests[i])) {
                    console.log("no");
                } else {
                    to_add.push(evnInterests[i]);
                    if (i == evlen - 1) {
                        res(true);
                    }
                }
                console.log("no");
            } else {
                to_add.push(evnInterests[i]);
                if (i == evlen - 1) {
                    res(true);
                }
            }
        }
    });

    var op1 = await callback1;
    if (op1) {
        var callback2 = new Promise((res, rej) => {
            for (let j = 0; j < to_add.length; j++) {
                uservector.push(to_add[j]);
            }
            uservector.sort().then(res(true));
        });

        var op2 = await callback2;
        if (op2) {
            Student.updateOne({
                _id: _id
            }, {
                $set: {
                    uservector: uservector
                }
            }, function(err, obj) {
                if (obj) {
                    console.log('success')
                }
            });
        }
    }
}

//NOT TESTED
app.post("/click-on-events", async function(req, res) {
    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        function(err, decodedToken) {
            if (err) {
                console.log("INTERNAL ERROR. ", err);
            } else {
                if(decodedToken['role']=='Student') {
                                    Student.findOne({
                        _id: decodedToken.usrid
                    }, {
                        Interests: 1,
                        uservector: 1
                    },
                    function(err, MONGO_OBJ_RETURN) {
                        if (err) {
                            console.log(err);
                            res.status(403).send("Unauthorized JWT");
                        } else {
                            if (MONGO_OBJ_RETURN) {
                                event.findOne({
                                        _id: req.body._id
                                    },
                                    function(err, EVNobj) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            if (EVNobj) {
                                                console.log("Works");
                                                mms.export(
                                                    MONGO_OBJ_RETURN["Interests"],
                                                    EVNobj["evnInterests"]
                                                );
                                                add(
                                                    MONGO_OBJ_RETURN["Interests"],
                                                    EVNobj["evnInterests"],
                                                    MONGO_OBJ_RETURN["uservector"],
                                                    decodedToken.usrid
                                                );
                                                res.status(200).send(EVNobj);
                                            } else {
                                                console.log("INTERNAL ERROR. COULD NOT FIND THE EVENT");
                                            }
                                        }
                                    }
                                );
                            } else {
                                console.log("INTERNAL ERROR. DID NOT FIND A USER LIKE THIS");
                            }
                        }
                    }
                );
                }
                else {
                    res.status(403).send('Unauthorized')
                }

            }
        }
    );
    //Does not require authentication
    //Must send a post
});

app.post("//addInterestOrganizer", async function(req, res) {
    var decoded = await jwms.verify(req.headers.authorization)
    if(decoded!=false && decoded['role']=='Org') {
            var eventId = req.body.eventId;
    var eventInterest = req.body.eventInterest;

    event.findOne({
            _id: eventId
        },
        function(err, obj) {
            if (err) {
                console.log(err);
            } else {
                obj.evnInterests.push(eventInterest);

                event.findOneAndUpdate({
                        _id: eventId
                    }, {
                        $set: {
                            evnInterests: obj.evnInterests
                        }
                    },
                    function(err1, obj1) {
                        if (err1) {
                            console.log(err1);
                        } else {
                            console.log(obj1);
                            console.log("DONE");
                        }
                    }
                );
            }
        }
    );
    }
    else {
        res.status(403).send('Unauth')
    }


    // console.log(req.body.eventInterest);
    // console.log(req.body.eventId);
});

app.post("/add-categories", function(err, obj) {
    category.findOne({
            catName: req.body.catName
        },
        function(err, obj) {
            if (err) {
                console.log("INTERNAL ERROR. ");
            } else {
                if (obj) {
                    var newSubCat = new subcat({
                        subCatName: req.body.subCatName
                    });
                    newSubCat.save(function(err, subcatsave) {
                        if (err) {
                            console.log("INTERNAL ERROR. ", err);
                        } else {
                            console.log(subcatsave);
                        }
                    });
                } else {
                    var newSubCategory = new subcat({
                        subCatName: req.body.subCatName
                    });
                    var newCategody = new category({
                        catName: req.body.catName
                    });
                }
            }
        }
    );
});

app.get("/getCategoriesAll", function(req, res) {
    CatE.find({}, {
            subCat: 0
        },
        function(err, obj) {
            if (err) {
                console.log();
            } else {
                /*console.log(obj)*/
                res.send(obj);
            }
        }
    );
});

app.get("/getCategoriesId", function(req, res) {
    console.log(req.query.catId);
    var id = parseInt(req.query.catId);
    console.log(id);

    CatE.findOne({
            catId: id
        },
        function(err, obj) {
            if (err) {
                console.log();
            } else {
                /*console.log(obj)*/
                console.log(obj.catId);
                res.send(obj.subCat);
            }
        }
    );
});



app.get("/:filename", (req, res) => {
    const file = gfs
        .find({
            filename: req.params.filename
        })
        .toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: "no files exist"
                });
                console.log("NO SUCH FILE");
            }
            // console.log(files)
            gfs.openDownloadStreamByName(req.params.filename).pipe(res);
            // return res.json({File:files})
        });
});

function getFrndInt(email) {
    Student.findOne({
            EmailId: email
        },
        function(err, obj) {
            var frnds = obj.Friends;

            var interests = [];

            for (var i = 0; i < frnds.length; i++) {
                Student.findOne({
                        EmailId: frnds[i]
                    },
                    function(err, obj1) {
                        interests.concat(obj1.interests);
                    }
                );
            }

            return interests;
        }
    );
}



app.post("/api/follow", async function(req, res) {
    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        function(err, decodedToken) {
            if (err) {
                console.log("INTERNAL ERROR. ", err);
            } else {
                console.log(decodedToken);
                Student.findOne({
                        _id: decodedToken["usrid"]
                    },
                    function(err, obj) {
                        if (err) {
                            console.log(err);
                            res.status(403).send("No such student");
                        } else {
                            if (obj != null) {
                                var id = req.body._id;
                                if (obj.evnFollowing.includes(id)) {
                                    res.status(403).send("Already Exists");
                                } else {
                                    obj.evnFollowing.push(id);
                                    /*console.log(obj)*/
                                    Student.updateOne({
                                            _id: decodedToken["usrid"]
                                        }, {
                                            $set: {
                                                evnFollowing: obj.evnFollowing
                                            }
                                        },
                                        function(err, obj) {
                                            if (err) {
                                                res.status(500).send("Something went wrong");
                                            } else {
                                                res.status(200).send(obj);
                                            }
                                        }
                                    );
                                }
                            } else {
                                res.status(403).send('Not Student')
                            }
                            /*console.log(obj)*/

                        }
                    }
                );
            }
        }
    );
});
//This is for the personal stuff
app.get("/api/getevents", async function(req, res) {
    var return_arr = [];
    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        async function(err, decodedToken) {
            if (err) {
                console.log("INTERNAL ERROR. ", err);
            } else {
                if(decodedToken['role']=='Student') {
                                    // console.log(decodedToken)
                Student.findOne({
                        _id: decodedToken["usrid"]
                    },
                    async function(err, obj) {
                        if (err) {
                            res.status(403).send("No such student");
                        } else {
                            /*console.log(obj)*/
                            for (let i = 0; i < obj.evnFollowing.length; i++) {
                                // console.log(obj.evnFollowing.length)
                                // console.log(obj.evnFollowing[i])
                                var evnFound = await evnFind(obj.evnFollowing[i]);
                                return_arr.push(evnFound);
                            }
                            // console.log(return_arr)
                            res.status(200).send(return_arr);

                            // console.log(obj.evnFollowing)
                            // event.find({"_id" : { "$in" : obj['evnFollowing']}}, function(err2, EVNS){
                            //     if(err2) {
                            //         res.status(404).send("Something went wrong");
                            //     }
                            //     else{
                            //         console.log("HHSHHSHSHSHSHSHSSHHSHS")
                            //         console.log(EVNS)
                            //         res.status(200).send(EVNS);
                            //     }
                            // })
                        }
                    }
                );
                }
                else {
                    res.status(403).send('Unauthorized')
                }

            }
        }
    );
});

async function evnFind(idx) {
    var callback = new Promise(function(res, rej) {
        event.findOne({
                _id: idx
            },
            function(err, obj) {
                if (err) {
                    console.log(err);
                } else {
                    // console.log("FOUND EVENT IS: \n", obj)
                    res(obj);
                }
            }
        );
    });

    let r = await callback;
    return r;
}

async function evnFindLite(idx) {
    var callback = new Promise(function(res, rej) {
        event.findOne({
                _id: idx
            }, {
                evnName: 1,
                Image: 1,
                evnDate1: 1,
                evnDate2: 1,
                evnDescription: 1,
                _id: 1
            },
            function(err, obj) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("FOUND EVENT IS: \n", obj);
                    res(obj);
                }
            }
        );
    });

    let r = await callback;
    return r;
}

app.get("/api/retorgevents", async function(req, res) {
    var decoded = await jwms.verify(req.headers.authorization);
    console.log(decoded);
    if (decoded != false) {
        if (decoded["role"] == "Org") {
            Organiser.findOne({
                    _id: decoded["usrid"]
                },
                async function(err, obj) {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                    } else {
                        if (obj != null) {
                            var evn_arr = [];
                            for (let i = obj.evns.length - 1; i > 0; i--) {
                                var cur = await evnFindLite(obj.evns[i]);
                                evn_arr.push(cur);
                            }
                            res.status(200).send(evn_arr);
                        } else {
                            res.status(404).send("This user is not found");
                        }
                    }
                }
            );
        } else {
            res.status(403).send("Bad JWT");
        }
    } else {
        res.status(403).send("Invalid JWT");
    }
});

app.post("/logout", async function(req, res) {
    var decoded = await jwms.verify(req.headers.authorization);
    if (decoded != false) {
        console.log(decoded);
        console.log("HSSSSSHSHHSHSSSS");
        var d = Date.now();
        user.updateOne({
                _id: decoded["usrid"]
            }, {
                $set: {
                    LastSeen: d
                }
            },
            function(err, MONGOUPDTAE) {
                if (err) {
                    for (let i = 0; i < 10; i++) {
                        console.log("FAILED TO UPDATE LAST SEEN");
                    }
                } else {
                    console.log("UPDATED LAST SEEN");
                }
            }
        );
    } else {
        res.status(403).send("Bad JWT");
    }
});



app.get("/api/getrecent", async function(req, res) {
    var evns = await sr.all();
    var ret_arr = [];
    for (let i = evns.length - 1; i > evns.length - 4; i--) {
        ret_arr.push(evns[i]);
    }
    console.log(ret_arr);
    console.log(evns);
    res.send(ret_arr);
});

app.post("/api/searchbyinterests", async function(req, res) {
    //req.body.keyword
    var decoded = await jwms.verify(req.headers.authorization)
    if(decoded!=false && decoded['role']=='Student') {
            var keyword = req.body;

    console.log(keyword[0]);

    Student.find({
            Interests: {
                $all: keyword
            }
        },
        async function(err, obj) {
            if (err) {
                console.log(err);
            } else {
                if (obj.length > 0) {
                    console.log("*****************************************");
                    /*console.log(obj)*/
                    console.log("******************************************");
                    console.log(obj)
                    console.log(decoded.usrid)

                    for(let i=0; i<obj.length; i++) {
                        if(obj[i]['_id']==decoded.usrid) {
                            console.log('comes till here')
                            obj.splice (i, 1);
                            res.status(200).send(obj);
                        }
                    }

                } else {
                    console.log("no users founf");
                    res.status(403).send("No users found");
                    console.log("No other have the same interest");
                }
            }
        }
    );
    } 
    else {
        res.status(403).send('Unauthorized')
    }

});

app.post("/api/organiser/searchbyinterests", async function(req, res) {
    //req.body.keyword

    var keyword = req.body;

    console.log(keyword[0]);

    event.find({
            evnInterests: {
                $all: keyword
            }
        },
        async function(err, obj) {
            if (err) {
                console.log(err);
            } else {
                if (obj.length > 0) {
                    console.log("*****************************************");
                    /*console.log(obj)*/
                    console.log("******************************************");
                    res.status(200).send(obj);
                } else {
                    console.log("no events founf");
                    res.status(403).send("No events found");
                    console.log("No other events have the same interest");
                }
            }
        }
    );
});

// app.post("/searchbyint", function(req, res) {
//     var keyword = "BMX";

//     InterestSchema.findOne({
//             subCat: keyword
//         },
//         function(err, obj) {
//             /*console.log(obj)*/
//         }
//     );
// });

async function findStudent(id) {
    var callback = new Promise((res, rej) => {
        Student.findOne({
                _id: id
            }, {
                FirstName: 1,
                LastName: 1,
                _id: 1
            },
            function(err, obj) {
                if (err) {
                    console.log("MONGO ERROR");
                    res(false);
                } else {
                    if (obj != null) {
                        res(obj);
                    } else {
                        console.log("NO USER LIKE THAT");
                        res(false);
                    }
                }
            }
        );
    });

    let r = await callback;
    return r;
}

app.post("/api/tracker/click-on-user-event", async function(req, res) {
    ///need to send in a student id here to find
    var decoded = await jwms.verify(req.headers.authorization);
    if (decoded != false) {
        if (decoded["role"] == "Student") {
            Student.findOne({
                    _id: decoded["usrid"]
                },
                function(err, obj) {
                    if (err) {
                        console.log(err);
                        res.send(500).send("Mongo Error");
                    } else {
                        if (obj != null) {
                            //Means that the user is found, here we search for the selected user
                            Student.findOne({
                                    _id: req.body._id
                                },
                                function(err2, obj2) {
                                    if (err) {
                                        res.status(500).send("Internal Mongo Error");
                                    } else {
                                        if (obj2 != null) {
                                            user.findOne({
                                                    username: obj2.EmailId
                                                },
                                                function(err, obj23) {
                                                    res.status(200).send({
                                                        obj: obj2,
                                                        dp: obj23.profilePic
                                                    });
                                                }
                                            );
                                        } else {
                                            res.status(404).send("User is not found");
                                        }
                                    }
                                }
                            );
                        } else {
                            res.status(404).send("user not found");
                        }
                    }
                }
            );
        } else {
            res.status(403).send("Bad JWT");
        }
        //We need to add the selected students interests to the user vector object
    } else {
        res.status(403).send("Bad JWT");
    }
});

app.post("/api/tracker/vectorless/click-on-user-event", async function(
    req,
    res
) {
    ///need to send in a student id here to find
    var decoded = await jwms.verify(req.headers.authorization);
    if (decoded != false) {
        if (decoded["role"] == "Org") {
            //We need to add the selected students interests to the user vector object
            Organiser.findOne({
                    _id: decoded["usrid"]
                },
                function(err, obj) {
                    if (err) {
                        console.log(err);
                        res.send(500).send("Mongo Error");
                    } else {
                        if (obj != null) {
                            //Means that the user is found, here we search for the selected user
                            Student.findOne({
                                    _id: req.body._id
                                },
                                function(err2, obj2) {
                                    if (err) {
                                        res.status(500).send("Internal Mongo Error");
                                    } else {
                                        if (obj2 != null) {
                                            //This means that the user object has also been found here
                                            //Now what matters is that I reuturn this
                                            user.findOne({
                                                    username: obj2.EmailId
                                                },
                                                function(err, obj23) {
                                                    res.status(200).send({
                                                        obj: obj2,
                                                        dp: obj23.profilePic
                                                    });
                                                }
                                            );
                                        } else {
                                            res.status(404).send("User is not found");
                                        }
                                    }
                                }
                            );
                        } else {
                            res.status(404).send("user not found");
                        }
                    }
                }
            );
        } else {
            res.status(403).send("Bad JWT");
        }
    } else {
        res.status(403).send("Bad JWT");
    }
});

function addToUserVector(userid, to_add) {
    Student.findOne({
            _id: userid
        },
        function(err, obj) {
            Student.updateOne({
                    _id: userid
                }, {
                    $set: {}
                },
                function(err2, obj2) {
                    if (err2) {} else {
                        if (obj2) {
                            console.log("");
                        } else {
                            console.log("Failed Uservector Add");
                        }
                    }
                }
            );
        }
    );
}

app.get("/discoverUsers", async function(req, res) {
    var decoded = await jwms.verify(req.headers.authorization);
    if (decoded != false) {
        //Must add profile picture when you find it here
        //Must also refine to fit in good recommendations
        //Should be pretty good for a small dataset
        Student.find({
                Location: decoded["Location"]
            }, {
                Firstname: 1,
                LastName: 1,
                _id: 1
            },
            function(err, obj) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    if (obj != []) {
                        res.status(200).send(obj);
                    } else {
                        res.status(404).send("users not found in this city");
                    }
                }
            }
        );
    } else {
        res
            .status(403)
            .send("user might not be logged in. reqd to use our platform");
    }
});

app.post("/api/search/users", async function(req, res) {
    var query = req.body.userKey;
    var usecase = req.body.usecase;
    var decoded = await jwms.verify(req.headers.authorization);
    var sender = [];
    if (decoded != false) {
        if (usecase == 1) {
            Student.find({
                    $and: [{
                        Location: decoded["Location"]
                    }, {
                        $or: [{
                            FirstName: {
                                $regex: query,
                                $options: "i"
                            }
                        }, {
                            LastName: {
                                $regex: query,
                                $options: "i"
                            }
                        }, {
                            EmailId: {
                                $regex: query,
                                $options: "i"
                            }
                        }]
                    }]
                }, {
                    FirstName: 1,
                    LastName: 1,
                    LastSeen: 1,
                    _id: 1
                },
                async function(err, obj) {
                    if (err) {
                        res.status(500).send("MONGo");
                    } else {
                        if (obj != []) {
                                                for(let i=0; i<obj.length; i++) {
                        if(obj[i]['_id']==decoded.usrid) {
                            console.log('comes till here')
                            obj.splice (i, 1);
                            res.status(200).send(obj);
                        }
                    }
                        } else {
                            res.status(200).send("NO USERS FOUND");
                        }
                    }
                }
            );
        } else {
            Student.find({
                    $or: [{
                        FirstName: {
                            $regex: query,
                            $options: "i"
                        }
                    }, {
                        LastName: {
                            $regex: query,
                            $options: "i"
                        }
                    }, {
                        EmailId: {
                            $regex: query,
                            $options: "i"
                        }
                    }]
                }, {
                    FirstName: 1,
                    LastName: 1,
                    LastSeen: 1,
                    _id: 1
                },
                function(err, obj) {
                    if (err) {
                        res.status(500).send("MONGo");
                    } else {
                        if (obj != []) {
                            sender.concat;
                            res.status(200).send(obj);
                        } else {
                            res.status(200).send("NO USERS FOUND");
                        }
                    }
                }
            );
        }
    } else {
        res.status(403).send("JWT is unauth or somehing");
    }
});

app.post("/api/search/organizers", async function(req, res) {
    var query = req.body.orgKey;
    var usecase = req.body.usecase;
    var decoded = await jwms.verify(req.headers.authorization);
    var sender = [];
    if (decoded != false) {
        Organiser.find({
                $or: [{
                    OrganiserName: {
                        $regex: query,
                        $options: "i"
                    }
                }, {
                    Organiser: {
                        $regex: query,
                        $options: "i"
                    }
                }]
            }, {
                OrganiserName: 1,
                OrganiserEmail: 1,
                _id: 1
            },
            function(err, obj) {
                if (err) {
                    res.status(500).send("MONGo");
                } else {
                    if (obj != []) {
                                            for(let i=0; i<obj.length; i++) {
                        if(obj[i]['_id']==decoded.usrid) {
                            console.log('comes till here')
                            obj.splice (i, 1);
                            res.status(200).send(obj);
                        }
                    }

                    } else {
                        res.status(200).send("NO USERS FOUND");
                    }
                }
            }
        );
    } else {
        res.status(403).send("JWT is unauth or somehing");
    }
});

var arms = require("./microservices/archive-micro");

app.get("/api/run", function(req, res) {
    ///Archiving Events
    var key = "";
    arms.eventsArchive();
});

app.post("/api/vectorless/click-on-events", function(req, res) {
    jwt.verify(
        tokenExtractor.tokenExtractor(req.headers.authorization),
        publicKEY,
        enc.verifyOptions,
        function(err, decodedToken) {
            if (err) {
                console.log("INTERNAL ERROR. ", err);
            } else {
                Organiser.findOne({
                        _id: decodedToken.usrid
                    },
                    function(err, MONGO_OBJ_RETURN) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (MONGO_OBJ_RETURN) {
                                event.findOne({
                                        _id: req.body._id
                                    },
                                    function(err, EVNobj) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            if (EVNobj) {
                                                res.status(200).send(EVNobj);
                                            } else {
                                                console.log("INTERNAL ERROR. COULD NOT FIND THE EVENT");
                                            }
                                        }
                                    }
                                );
                            } else {
                                console.log("INTERNAL ERROR. DID NOT FIND A USER LIKE THIS");
                            }
                        }
                    }
                );
            }
        }
    );
    //Does not require authentication
    //Must send a post
});

// async function ageconvert(dob) {
//     var callback = new Promise((res, rej) => {
//         var checkYear = Math.floor(dob / 31536000000);
//         res(checkYear);
//     });

//     let r = await callback;
//     return r;
// }

// app.post("/api/unfollowevent", async function (req, res) {
//     jwt.verify(
//         tokenExtractor.tokenExtractor(req.headers.authorization),
//         publicKEY,
//         enc.verifyOptions,
//         function (err, decodedToken) {
//             if (err) {
//                 console.log("INTERNAL ERROR. ", err);
//                 res.status(403).send("Wrong JWT");
//             } else {
//                 Student.findOne(
//                     {
//                         _id: decodedToken.usrid
//                     },
//                     {
//                         evnFollowing: 1
//                     },
//                     function (err, MONGO_OBJ_RETURN) {
//                         if (err) {
//                             console.log(err);
//                         } else {
//                             if (MONGO_OBJ_RETURN) {
//                                 if (MONGO_OBJ_RETURN.evnFollowing.includes(req.body.id)) {
//                                     var index = MONGO_OBJ_RETURN.evnFollowing.indexOf(
//                                         req.body.id
//                                     );
//                                     if (index > -1) {
//                                         MONGO_OBJ_RETURN.evnFollowing.splice(index, 1);

//                                         Student.updateOne(
//                                             {
//                                                 id: decodedToken.usrid
//                                             },
//                                             {
//                                                 $set: {
//                                                     evnFollowing: MONGO_OBJ_RETURN.evnFollowing
//                                                 }
//                                             },
//                                             function (err2, obj2) {
//                                                 if (err) {
//                                                     res.status(500).send("Update Error");
//                                                 } else {
//                                                     res.status(200).send("Removed");
//                                                 }
//                                             }
//                                         );
//                                     } else {
//                                         res.status(404).send("Event not found in Event Following");
//                                     }
//                                 } else {
//                                     res.status(404).send("Event not found in Event Following");
//                                 }
//                             } else {
//                                 console.log("INTERNAL ERROR. DID NOT FIND A USER LIKE THIS");
//                             }
//                         }
//                     }
//                 );
//             }
//         }
//     );
// });

// var usrctr = 50;

// app.get("/external/usercount", function (req, res) {
//     res.status(200).send(usrctr);
// });

// app.get("/external/usercount/updater", function (req, res) {
//     usrctr += 10;
// });


// app.get('/api/mlstuff', async function(req, res){
//     console.log('comes here')
//     var result = await mms.import()
//     console.log(result)
//     res.json(result)
// })



///DEV ROUTES ===>


// app.get('/api/addevnsdata', (req, res) => {
//     //Add DATA Here
//     //PLEASE ADD A ORGANISER ID
//     var newImgName = req.body.Image + dater(); //VERY IMPORTANT - YOU NEED AN IMAGE NAME STAT
//     //IF YOU DONT WANT IMAGE NOW, COMMENT OUT THE IMAGE FIELD IN THE BOTTOM
//     var orgID = ''; //ADD HERE FROM WHICH ORGANISER
//     var evnName = '';
//     var evnDate1 = ''; //MUST BE IN MILLISECONDS, ADD A REGULAR AND CHECK
//     var evnDate2 = ''; // SAME AS ABOVE 
//     var evnInterests = ''; //MUST BE AN ARRAY
//     var evnLocation = ''; //DONT KNOW WHAT THIS IS FOR
//     var evnOrganizerName = ''; //ADD THIS FROM THE TOKEN AS WELL
//     var evnOrganizerPage = ''; //KEEP THEM CONSTANT
//     var evnOrganizerContact = ''; //THIS AS WELL
//     var evnPincode = ''; //MUST BE 560076 or 560078 or something along those lines
//     var evnTargetAge = ''; //PUT 15-16  
//     var newEvent = new event({
//         evnName: evnName,
//         evnDate1: evnDate1,
//         evnDate2: evnDate2,
//         evnInterests: evnInterests,
//         evnLocation: evnLocation,
//         evnCity: req.body.evnCity,
//         evnOrganizerName: evnOrganizerName, //this line has to be changed
//         evnOrganizerPage: evnOrganizerPage,
//         evnOrganizerContact: evnOrganizerContact,
//         evnPincode:evnPincode,
//         evnTargetAge: evnTargetAge,
//         evnDescription: req.body.evnDescription,
//         evnCost: req.body.cost,
//         Image: newImgName
//     });
//     newEvent.save(function (err, obj) {
//         if (err) {
//             console.log("ERROR:\n" + err);
//             return res.redirect("/registerorganiser");
//         } else {
//             /*console.log(obj)*/
//             //have to append the newly created id to the organizer as well
//             oems.addToOrganiser(orgID, obj._id);
//             res.json(obj);
//         }
//     });
// })