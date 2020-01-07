  
//CHANGE ALL TOKENS TO JWT AUTH
//Imports - Needed Packages for Running
var express = require("express");
var fs = require('fs');
var jwt = require('jsonwebtoken')
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const cors = require('cors');
var bcrypt = require('bcryptjs');
const crypto = require("crypto");
var multer = require('multer');
const GridFsStorage = require("multer-gridfs-storage");
// var tempsearch = require('./controllers/search/search_controller')
const nodemailer = require('nodemailer');
const exphbs = require('express-handlebars');
const path = require('path');
// const category = require('./models/category-model')
// const subcat = require('./models/subcategory-model')
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
var Encrypt = require('./models/encrypt.js');
var CatE = require('./models/category.js');
var Grid = require('gridfs-stream');
var InterestSchema = require('./models/interest.js');

//var brain = require('brain.js')
//Requirements - Needed Files for Running
const tokenExtractor = require('./controllers/tokenExtractor.js')
var organizer_functions = require('./controllers/organizer_controller');
var student_functions = require('./controllers/student_controller');
var user_function = require('./controllers/user_controller.js')
var achievements = require('./models/Achievements.js');
const enc = require('./config/encryptionConfig.js');
const apiTokenSign = require('./config/API_TOKEN_SIGNATURE.js')
var serv = require('./config/severConfig.js');
var user = require("./models/user.js");
var Student = require("./models/StudentInfo.js");
var Organiser = require("./models/OrganiserInfo.js");
const db = require('./config/database');
var event = require('./models/event');
var key_controller = require('./controllers/keystore_control')
var keystore = require('./models/key-store')
const saltRounds = enc.saltRounds;
// const alg = require('./controllers/algorithm_runtime')
// var recommnedations = require("./recommendation/recommender");
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './uploads' });
var daVinci = require('./controllers/recommendation-engine.js')

// PRIVATE and PUBLIC key. Key Requirements are important to JWT authentication
var privateKEY = fs.readFileSync('./keys/private.key', 'utf8');
var publicKEY = fs.readFileSync('./keys/public.key', 'utf8');
var adminKEY = fs.readFileSync('./keys/admin_hash.key', 'utf8')


var API_SIGNATORY = require('./controllers/API_SIGN')


var admin = require('./models/admin.js')
var ADMIN_CONTROLLER = require('./controllers/admin_controller')











var dms = require('./microservices/davinci-micro')







///NODE MAILER STUFF --- DON'T TOUCH --- CONTACT VIJAY

function sendMail(output, to) {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'developersatathena@gmail.com ', // generated ethereal user
            pass: 'Kumarans@365!'
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
        subject: 'Athena Contact', // Subject line
        text: 'Com[puter generated email, please do not reply', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        console.log('Email has been sent');
    });
}

//usage   
//sendMail(req.body.name, req.body.company, req.body.email, req.body.phone, req.body.message, req.body.email);  

//RANDOM CODE GENERATOR

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


/*
INITIALIZATIONS
*/

//Express app instantiation
var app = express();

//testing var declaration - will be removed as development goes on
var token;

//Using Cors
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
//To get data from the angular project
app.use(bodyParser.json());

//To get rid of the promise exception
mongoose.Promise = global.Promise;

//DB CONNECTION
const conn = mongoose.createConnection(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// This is an async funtion
mongoose.connect(db.mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }) //Changed this line to link to a database file instead of having everything in one file to provide quick and easy access for further work
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// init gfs
let gfs;
conn.once("open", () => {
    // init stream
    console.log('Connection Successful to GFS')
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads"
    });
});

// Create storage engine
const storage = new GridFsStorage({
    url: db.mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err)
                }
                const filename = file.originalname
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads',
                }
                resolve(fileInfo)
            })
        })
    },
});

const upLoad = multer({
    storage
});

//STARTING SERVER HERE  
app.listen(serv.port, process.env.IP, function (req, res) //The Serv.port is from a config file
{
    console.log("SERVER STARTED");
});

//FILE UPLOAD CODE, DON'T TOUCH, FOR HELP CONTACT VIJAY


var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
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








app.post("/upload", upLoad.single('img'), (req, res) => {
    console.log(req.body)
    console.log('ADDED IMAGE TO DATABASE')
    res.status(201).send('YES')
});

//REGISTRATION ROUTE FOR STUDENTS.
app.post('/register', function (req, res) {
    console.log(req.body)
    jwt.verify(token, publicKEY, enc.verifyOptions, function (err, decodedToken) {
        if (err) {
            //CODE BELOW THIS IS PRODUCTION READY
            bcrypt.hash(req.body.password, saltRounds, function (err, BCRYPT_PASSWORD_HASH) {
                if (err) {
                    console.log(err)
                    res.status(500).send("Internal Server Error") //Sends an internal server err
                }
                else {
                    bcrypt.hash(req.body.securityAnswer, saltRounds, function (err, BCRYPT_SECURITY_ANSWER_HASH) {
                        if (err) {
                            console.log(err)
                            res.status(500).send("Internal Server Error") //Sends an internal server err
                        }
                        else {

                            console.log("registering user");
                            var newUser = new user
                                ({
                                    username: req.body.email,
                                    userType: "Student",
                                    password: BCRYPT_PASSWORD_HASH,
                                    securityQuestion: req.body.securityQuestion,
                                    securityAnswer: BCRYPT_SECURITY_ANSWER_HASH,
                                    profilePic: "/uploads/lak.png",
                                    Bio: req.body.bio,
                                    Interests: " ",
                                    studentSchool: req.body.studentSchool,
                                    Verified: false
                                });

                            newUser.save(function (err, obj) {
                                if (err) {
                                    console.log("ERROR, " + err);
                                    res.status(422).send("Error in saving user");
                                }
                                else {
                                    console.log(obj);
                                    var output = 'Click on below link to verify<b> => http://localhost:3000/verifyuser/' + obj._id;
                                    console.log(output);
                                    sendMail(output, req.body.email);

                                    //Sends the following data to the functions.js file. Edits have to be made in there if needed
                                    res.send(student_functions.furtherInfoStudent(req.body.firstname, req.body.lastname, req.body.email, req.body.DOB, req.body.phoneNo, req.body.city, req.body.pincode, req.body.bio)); //TODO: Put this in a different file
                                }
                            });
                        }
                    })
                }
            })

        }
        else {
            //TODO: Make a way for the user to be redirected to the homepage
            //NOT READY
        }
    })

});

app.post('/updateinfo', function (req, res) {
    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, function (err, decodedToken) {
        if (err) {
            console.log(err)
            res.status(403).send("Not Logged In")
        }
        else {
            user.findOne({ email: req.body.email }, function (err, obj) {
                if (err) {
                    console.log("Mongo Error:" + err)
                }
                else {
                    if (obj != null && obj != undefined && obj != {}) {
                        console.log(obj)
                        bcrypt.compare(req.body.password, obj.password, function (err, BCRYPT_RES) {
                            if (BCRYPT_RES) {
                                var FirstName = req.body.FirstName
                                var LastName = req.body.LastName
                                var PhoneNo = req.body.phoneNo
                                var Bio = req.body.bio
                                var SLocation = req.body.Slocation

                                user.updateOne({ id: obj._id }, { $set: { FirstName: req.body.FirstName, LastName: req.body.LastName, PhoneNo: req.body.phoneNo, Bio: req.body.bio, SLocation: req.body.Slocation } }, function (err, obj) {
                                    if (err) {
                                        console.log(err)
                                    }
                                    else {
                                        console.log("Success");

                                        res.status(200).send("Success")
                                    }
                                })
                            }
                            else {

                            }
                        })
                    }
                }
            })
        }
    })
});


//REGISTRATION ROUTE FOR ORGANIZERS.
app.post('/registerorganizer', function (req, res) {
    jwt.verify(token, publicKEY, enc.verifyOptions, function (err, decodedToken) {
        if (err) {
            console.log(req.body.Password)
            //CODE BELOW THIS IS PRODUCTION READY
            bcrypt.hash(req.body.Password, saltRounds, function (err, BCRYPT_PASSWORD_HASH) {
                if (err) {
                    console.log(err)
                    res.status(500).send("Internal Server Error") //Sends an internal server err
                }
                else {
                    bcrypt.hash(req.body.securityAnswer, saltRounds, function (err, BCRYPT_SECURITY_ANSWER_HASH) {
                        if (err) {
                            console.log(err)
                            res.status(500).send("Internal Server Error") //Sends an internal server err
                        }
                        else {
                            console.log("registering user");
                            var newUser = new user({
                                username: req.body.OrganizerEmail,
                                userType: "Organizer",
                                password: BCRYPT_PASSWORD_HASH,
                                securityQuestion: req.body.securityQuestion,
                                securityAnswer: BCRYPT_SECURITY_ANSWER_HASH,
                                profilePic: "/uploads/lak.png",
                                Verified: false
                            });

                            newUser.save(function (err, obj) {
                                if (err) {
                                    console.log("ERROR, " + err);
                                    res.status(422).send("Error in saving user");
                                }
                                else {
                                    console.log(obj._id);
                                    var output = 'Click on below link to verify<b> => http://localhost:3000/verifyuser/' + obj._id;

                                    sendMail(output, req.body.OrganizerEmail);
                                    //Sends the following data to the functions.js file. Edits have to be made in there if needed
                                    res.send(organizer_functions.furtherInfoOrg(req.body.OrganizerName, req.body.OrganizerEmail, req.body.PhoneNo)); //TODO: Put this in a different file
                                }
                            });
                        }
                    })
                }
            })

        }
        else {
            //TODO: Make a way for the user to be redirected to the homepage
            //NOT READY
        }
    })

});

app.get('/verifyuser/*', function (req, res) {
    var idx = req.url.slice(12, 1000);

    user.updateOne({ _id: idx }, { $set: { Verified: true } }, function (err, obj1) {
        if (err) {
            console.log("ERROR" + err);
        }
        else {

            console.log("VERIFIED");
            console.log(obj1);
            res.redirect("http://localhost:4200/login");
        }
    });
});

//////UPLOAD PROFILE PIC
app.post('/uploadProfile', multipartMiddleware, (req, res) => {

    console.log("HSSSSSSSSSSS\N\N");

    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, function (err, decodedToken) {
        if (!err && decodedToken != null) {
            console.log("Verified");
            console.log(decodedToken);

            user.findOneAndUpdate({ username: decodedToken.email }, { $set: { profilePic: req.files.uploads[0].path } }, function (err, ibj) {
                if (err) {
                    console.log("ERRROR" + err);
                    res.send(false);
                }
                else {
                    console.log("Updated profile pic!!");
                    res.send({ path: req.files.uploads[0].path });


                }
            });


        }
    });


});

// LOGIN
app.post('/login', async function (req, res) {
    //First finding if such a user exists in the database
    user.findOne({ username: req.body.username }, function (err, usrobj) {
        console.log(usrobj);
        //checking that the user object is not null or undefined, to avoid further errors
        if (!err && (usrobj != null && usrobj != undefined)) {

            if (usrobj.Verified) {
                bcrypt.compare(req.body.password, usrobj["password"], function (err, BCRYPT_RES) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        if (BCRYPT_RES) {
                            console.log(usrobj)
                            //Checking what user type the user is, and returning a JWT based on that
                            if (usrobj["userType"] == "Student" || usrobj["userType"] == adminKEY) {

                                //If the user object is a Student. I am finding a student with the required description
                                Student.findOne({ EmailId: req.body.username }, function (err, obj) {
                                    if (!err && (usrobj != null && usrobj != undefined)) {
                                        console.log(req.body)
                                        //I am generating a JWT here with some required details. Signing options can be changed in config/encryption.js
                                        console.log(obj)
                                        token = jwt.sign({ usrid: obj["_id"], email: obj["EmailId"], given_name: obj["FirstName"], family_name: obj["LastName"], role: usrobj["userType"], interests: obj["UserInterests"], Location: obj["Location"], Pincode: obj["pincode"], Bio: obj["bio"] }, privateKEY, enc.signOptions);
                                        console.log(token)
                                        //Testing verification. Has to be removed during deployment
                                        jwt.verify(token, publicKEY, enc.verifyOptions, function (err, decodedToken) {
                                            console.log(decodedToken)
                                            console.log("Succesfully generated a JWT Token")
                                            res.json(token)
                                        })
                                    }
                                    else {
                                        console.log("vhjk");
                                        console.log(err);
                                    }


                                });
                            }
                            else if (usrobj["userType"] == "Organizer") {
                                //Repeating for Organizer
                                Organiser.findOne({ OrganiserEmail: req.body.username }, function (err, obj) {
                                    if (usrobj.Verified) {
                                        console.log("vhjk fghuio");

                                        console.log(obj)
                                        token = jwt.sign({ email: obj["OrganiserEmail"], name: obj["OrganiserName"], role: "Org" }, privateKEY, enc.signOptions);
                                        res.json(token)
                                    }
                                    else {
                                        res.send("WRONG VER");
                                        console.log("ORGANISER NOT VERIFIED");
                                    }

                                });
                            }
                            else if (userobj["userType"] == "Admin") {

                                //TODO: Make an admin block here
                            }
                        }
                        else {
                            console.log("Wrong Password")
                            res.status(403).send("WRONG PASS");
                            //WRONG PASSWORD
                        }
                    }
                });
            }
            else {
                res.send("WRONG VER");
                console.log("USER NOT VERIFIED");
            }
        }
        else {
            res.send(false);
            console.log("PROBABLY NOT FOUND USER");
            console.log(err);
        }
    })
});


//PRODUCTION READY CODE:
//PRODUCTION READY CODE:
app.post('/reset', function (req, res) {
    //Finding a user from the DB
    user.findOne({ username: req.body.email }, function (err, obj) {
        if (!obj) {
            if (err) {
                console.log(err);
                res.send(false);
            }
            else {
                console.log("COULDN'T FIND OBJECT");
                res.send(false);
            }
        }
        else {
            var code = generate(6);
            var output = 'YOUR CODE IS: ' + code;

            user.findOneAndUpdate({ username: req.body.email }, { $set: { AuthCode: code } }, function (err, obj) {
                if (err) {
                    console.log(err);
                    res.send(false);
                }
                else {
                    sendMail(output, req.body.email);
                    console.log(obj);
                    res.send(true);
                }
            });
        }
    })
});

app.post('/resetPasswordCode', function (req, res) {
    console.log(req.body.code);
    console.log(req.body.email);

    user.findOne({ username: req.body.email }, function (err, mongoObj) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(mongoObj);
            if (mongoObj.AuthCode == req.body.code) {
                console.log("Verified")
                res.send(true);
            }
            else {
                console.log("PROBLEMMM")
                res.send(false);
            }
        }
    });
});


//Method for resetting passwords
app.post('/resetpassword', function (req, res) {
    //Finding if a user exists with the same email
    console.log("Email is: ", req.body.email)
    console.log("Password: ", req.body.password)
    console.log("Reseting password");
    user_function.resetPasswordFunction(req.body.email, req.body.password, req.body.authCode);
    res.send("Validated")

});


//I BELIEVE THIS IS REDUNDANT CODE:


app.post('/new-password', function (err, obj) {
    //Checks the authorization code is not null or undefined
    if (req.body.authCode != null || req.body.authCode != undefined || req.body.authCode != '') {
        //finds a user with a matching authcode and checks for an error
        user.findOne({ authCode: req.body.authCode }, function (err, obj) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("successfully got the authCode")
                //Updates the user's password in the database if all checks out
                user.updateOne({ _id: obj._id }, { $set: { password: req.body.password } }, function (err, obj) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        //if it is a successfull update, it sends 200.
                        console.log(obj)
                        res.status(200).json(obj)
                    }
                })
            }
        })
    }
    else {
        console.log("session error. Please contact the system administrators")
    }
})



//Dashboard Method, can verify token in the frontend to reduce server process times and lag
app.get('/dashboard', async function (req, res) {
    console.log("Login Successful. Now in the dashboard methods");
    //TODO: Verify in the frontend
    //Have to get the token the right way here
    jwt.verify(token, publicKEY, enc.verifyOptions, function (err, decodedToken) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Token has been decoded to \n" + decodedToken)
            if (decodedToken["role"] == "Student") {
                res.status(200).json(decodedToken)
            }
            else {
                res.status(403).send("User is not authorized to access this page")
            }
        }
    })

});

app.get('/getImage', function (req, res) {
    console.log(req.query.url);
    var Path = path.join(__dirname, req.query.url)
    console.log(Path)
    res.sendFile(Path);
});


app.get('/imageUpload', function (req, res) {
    // console.log(req.url);
    // var Path=path.join(__dirname, req.query.url)
    // console.log(Path)
    // res.sendFile(Path);

    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, function (err, decodedToken) {
        console.log("Getting Bio....")
        if (!err && decodedToken != null) {
            console.log("Verified: " + decodedToken.email);
            user.findOne({ username: decodedToken.email }, function (err, obj) {
                if (err) {
                    console.log(err);
                }
                else {
                    var Path = path.join(__dirname, obj.profilePic)
                    console.log(obj.profilePic)
                    console.log("Path: " + Path);
                    console.log('HEREEE')
                    res.sendFile(Path)

                }
            });
        }
        else {
            console.log(err)
            console.log("Something went wrong")
        }
    });

    console.log("sdfghjklkjhgfghioiuygfghjioihgvcvhjkijhgvc");
});














app.post('/bio', function (req, res) {
    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, function (err, decodedToken) {
        console.log("Getting Bio....")
        if (!err && decodedToken != null) {
            console.log("Verified: " + decodedToken.email);
            Student.findOne({ EmailId: decodedToken.email }, function (err, mongoObj) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Mongo Object is Bio " + mongoObj);
                    res.json(mongoObj.Bio);
                }
            })
        }
        else {
            console.log(err)
            console.log("Something went wrong")
        }
    });
});










/*
UNDERDEVELOPED ROUTES
*/


app.post('/auth', function (req, res) {
    //Have to verify JWT in here for the first instance
})



//Should be the default route for the frontend when it launches
app.post('/auth', function (req, res) {
    jwt.verify(req.body.token, publicKEY, enc.verifyOptions, function (err, decodedToken) {
        if (err) {
            res.status(422).send("JWT verification error")
            console.log('JWT is invalid')
        }
        else {
            if (decodedToken["role"] == "Org") {
                res.status(200).send("Org")
            }
            else if (decodedToken["role"] == "Student") {
                res.status(200).send("Student")
            }
        }
    })
});

/*
ROUTES THAT NEED BUG SQUISHING
*/


//LOGOUT ROUTE
app.post('/logout', function (req, res) {
    //Ask the frontend to send a value called logout in the form
    if (req.body.logout) {
        user["LastSeen"] = Math.floor(Date.now() / 1000);
    }

});




// ORGANIZER EVENTS CREATOR ROUTE.
app.post('/organizer-events', async function (req, res) {
    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, function (err, decodedToken) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(req.body.Image)
            if (decodedToken["role"] == "Org") {
                var newEvent = new event({
                    evnName: req.body.evnName,
                    evnDate1: req.body.evnDate1,
                    evnDate2: req.body.evnDate2,
                    evnInterests: [],
                    evnLocation: req.body.evnLocation,
                    evnOrganizerName: decodedToken["name"],  //this line has to be changed
                    evnOrganizerPage: req.body.evnOrganizerPage,
                    evnOrganizerContact: req.body.evnOrganizerContact,
                    evnLocation: req.body.evnLocation,
                    evnPincode: req.body.evnPincode,
                    evnTargetAge: req.body.evnTargetAge,
                    evnDescription: req.body.evnDescription,
                    evnCost: req.body.cost,
                    Image: req.body.Image
                });
                newEvent.save(function (err, obj) {
                    if (err) {
                        console.log("ERROR:\n" + err);
                        return res.redirect('/registerorganiser');
                    }
                    else {
                        console.log(obj);
                        res.json(obj)
                    };
                });
            }
            else {
                console.log("This user is not authenticated to access this page")
                res.status(404).send("This user is unauthorized to access this page")
            }
        }
    })
});

app.post("/addInterestOrganizer", function (req, res) {
    console.log("INTEREST SENT FROM FRONTEND: \n\n" + req.body);

    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, function (err, decodedToken) {
        if (!err && decodedToken != null) {
            console.log("Verified");
            var newInterests = req.body.eventInterest;
            event.findOne({ _id: req.body.eventId }, function (err, obj) {
                if (err || obj == null || obj == undefined) {
                    console.log(err);
                } else {
                    var currentInterests = obj.evnInterests;

                    for (var i = 0; i < newInterests.length; i++) {
                        if (currentInterests.includes(newInterests[i])) {
                            console.log("Already there");
                        } else {
                            obj.evnInterests.push(newInterests[i]);
                            event.updateOne(
                                { EmailId: decodedToken.email },
                                { $set: { Interests: obj.Interests } },
                                function (err, updateobj) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                    }
                                }
                            );
                        }
                    }
                    console.log(obj);
                }
            });
        }
    });
});





app.get('/achievements', async function (req, res) {
    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, function (err, decodedToken) {
        console.log("Getting Achievements....")
        if (!err && decodedToken != null) {
            console.log("Verified")
            Student.findOne({ EmailId: decodedToken.email }, function (err, mongoObj) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Mongo Object is AChievments" + mongoObj.Achievement);
                    res.json(mongoObj.Achievement);
                }
            })
        }
        else {
            console.log(err)
            console.log("Something went wrong")
        }
    })
})

var flag = 0;
var achCat = '';
var achSubCat = '';



app.post('/abcd', multipartMiddleware, (req, res) => {

    console.log("ABCD METHOD");
    console.log(req.body)


    console.log(req.body);



    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, function (err, decodedToken) {
        if (!err && decodedToken != null) {
            console.log("Verified");
            console.log(decodedToken);
            console.log(req.files.uploads[0]['path'])
            res.send({ Image: req.files.uploads[0]['path'] })

        }
    });

    flag = 0;
    // }



});


// ACHIEVEMENTS ROUTE
app.post('/achievements', multipartMiddleware, (req, res) => {

    console.log("\N\N");
    console.log(req.body)


    console.log(req.body);
    console.log(req.body.uploadedFiles)
    console.log('PRINTED IT')


    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, function (err, decodedToken) {
        if (!err && decodedToken != null) {
            console.log("Verified");
            console.log(decodedToken);
            console.log('THIS IS TH EAHIEVEMENT' + req.body.achCat + req.body.achSubCat + req.body.uploadedFiles + req.body.rank + req.body.description)
            var newAch = new achievements
                ({
                    CategoryId: req.body.achCat,
                    SubCategoryId: req.body.achSubCat,
                    Image: req.body.uploadedFiles,
                    Description: req.body.description,
                    achRank: req.body.rank

                })
            newAch.save(function (err, achobj) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(decodedToken)
                    console.log(achobj["id"])
                    console.log(achobj)
                    res.status(200).json(achobj)
                    Student.findOne({ EmailId: decodedToken.email }, function (err, obj) {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log("Found the student object with the token. Now pushing achievement")
                            obj.Achievement.push(achobj)
                            Student.updateOne({ EmailId: decodedToken.email }, { $set: { Achievement: obj.Achievement } }, function (err, updateobj) {
                                if (err) {
                                    console.log(err)
                                }
                                else {
                                    console.log("Pushed the object successfully")
                                }
                            })

                        }
                    })
                }
            })
        }
    });






});



app.post('/achImg', function (req, res) {
    console.log('REQUEEST  is' + req.body.url)
    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, function (err, decodedToken) {
        console.log("Getting Achievements....")
        if (!err && decodedToken != null) {
            console.log("Verified")
            Student.findOne({ EmailId: decodedToken.EmailId }, function (err, mongoObj) {
                if (err) {
                    console.log(err)
                }
                else {
                    // console.log("Mongo Object is AChievments" + mongoObj.Achievement);
                    // console.log(mongoObj.Achievement[0]['Image'])
                    for (var i = 0; i < mongoObj.Achievement.length; i++) {
                        // console.log(mongoObj.Achievement[i]['Image'])   


                    }
                    console.log("WORKINGG ANIRUDHHHH" + req.body.url)
                    res.sendFile(path.join(__dirname + '', req.body.url))



                }
            })
        }
        else {
            console.log(err)
            console.log("Something went wrong")
        }
    })
})










app.post('/delete-achievement', function (req, res) {
    //This is for deleting achievements
    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, function (err, decodedToken) {
        if (!err && decodedToken != null && decodedToken != undefined && decodedToken != {}) {
            //Have to send which achievement id I have to delete
            console.log(req);

            Student.update(
                { EmailId: decodedToken.email },
                { $pull: { Achievements: { _id: req.body.achId } } },
                { multi: false }
            )

        }
        else {
            console.log('INTERNAL ERROR. UNABLE TO VERIFY JWT');
            res.status(403)
        }
    })
})



//INTERESTS

app.get('/interests', async function (req, res) {
    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, function (err, decodedToken) {
        console.log("Getting Interests....")
        if (!err && decodedToken != null) {
            console.log("Verified")
            Student.findOne({ EmailId: decodedToken.email }, function (err, mongoObj) {
                if (err || mongoObj == null) {
                    console.log(err)
                }
                else {
                    console.log("Mongo Object is" + mongoObj.Interests);

                    res.send(mongoObj.Interests);
                }
            })
        }
        else {
            console.log(err)
            console.log("Something went wrong")
        }
    })
});

app.post('/addInterest', function (req, res) {

    console.log("INTEREST SENT FROM FRONTEND: \n\n" + req.body);


    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, function (err, decodedToken) {
        console.log("Getting Achievements....")
        if (!err && decodedToken != null) {
            console.log("Verified")

            var newInterests = req.body;

            Student.findOne({ EmailId: decodedToken.email }, function (err, obj) {
                if (err || obj == null || obj == undefined) {
                    console.log(err);
                }
                else {
                    var currentInterests = obj.Interests;

                    for (var i = 0; i < newInterests.length; i++) {
                        if (currentInterests.includes(newInterests[i])) {
                            console.log("Already there");
                        }
                        else {
                            obj.Interests.push(newInterests[i]);
                            Student.updateOne({ EmailId: decodedToken.email }, { $set: { Interests: obj.Interests } }, function (err, updateobj) {
                                if (err) {
                                    console.log(err)
                                }
                                else {

                                }
                            });

                            InterestSchema.findOne({ subCat: newInterests[i] }, function (err, intObj) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    console.log("adding to interest");
                                    intObj.users.push(obj._id);

                                    InterestSchema.updateOne({ subCat: newInterests[i] }, { $set: { users: intObj.users } }, function (err, lObj) {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            console.log("added successfully");
                                        }
                                    });
                                }
                            });

                        }
                    }

                    console.log(obj);

                }
            });

        }
        else {
            console.log(err)
            console.log("Something went wrong")
        }
    });
});

app.post('/deleteInterest', function (req, res) {
    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, function (err, decodedToken) {
        console.log("Getting Achievements....")
        if (!err && decodedToken != null) {
            Student.findOne({ EmailId: decodedToken.email }, function (err, obj) {
                if (err || obj == null || obj == undefined) {
                    console.log("ERROR");
                }
                else {
                    obj.Interests.pop(req.body.interest);
                }
            });
        }
        else {
            console.log(err)
            console.log("Something went wrong")
        }
    });
});

// ADMIN DASH ROUTE

app.post('/organizerdashboard', async function (req, res) {
    //Will have to make more options to display more specific errors in the future and them handle that in the frontend
    jwt.verify(token, publicKEY, enc.verifyOptions, function (err, decodedToken) {
        if (!err && decodedToken != null) {
            console.log("Now redirecting to organizer dashboard");
            res.status(200).json(decodedToken);
        }
        else {
            res.status(403).send("Unauth");
        }
    })
})

app.post('/event-search', async function (req, res) {
    //Running an event search with the given keywords in the database
    // pubmsg.find({$or: [{sender: req.body.searchitem}, {msgid: req.body.searchitem}]}, function(err, obj)
    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, async function (err, DECODEDTOKEN) {
        if (err) {

        }
        else {
            console.log(req.body.keyword)
            var query = req.body.keyword
            var evns = await dms.testexplore3(query, DECODEDTOKEN)
            console.log("HELSOF S", evns)
            res.send(evns)
        }
    })

})

app.post('/events_search', function (req, res) {
    if (req.body.keyword != undefined) {
        tempsearch.event_search(req.body.keyword, req.body.usecase, function (err, obj) {
            if (err) {
                console.log('INTERNAL ERROR. ');
            }
            else {
                console.log('SUCCESS >>> GOT SEARCH EVENTS');
                console.log(obj)
            }
        })
    }
    else {
        console.log('INTERNAL ERROR. YOURE NOT SENDING ');
    }
})


//SHA256 hash of add_keys. Done for the anonyminity of the post URL
app.post('/1b08dd3d330c927106bba6bb785301c97cf2090ee7b067c685a258eba35a608e', function (req, res) {
    //SHA512 of 'admin'
    console.log("Recieved the post request")
    console.log(req.body)
    user.findOne({ "username": req.body.username, "userType": "c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd472634dfac71cd34ebc35d16ab7fb8a90c81f975113d6c7538dc69dd8de9077ec" }, function (err, MONGO_ADMIN_OBJ) {
        if (err) {
            console.log('INTERNAL ERROR. FOUND NO ADMIN');
            res.status(404).send("No user found")
        }
        else if (MONGO_ADMIN_OBJ) {
            bcrypt.compare(req.body.password, MONGO_ADMIN_OBJ.password, function (err, BCRYPT_RES) {
                if (err) {
                    console.log('INTERNAL ERROR. ');
                    res.status(403).send("Hash Error")
                }
                else if (BCRYPT_RES) {
                    console.log('SUCCESS >>> VERIFIED');
                    bcrypt.hash(req.body.key, 0, function (err, BCRYPT_KEY_HASH) {
                        if (err) {
                            console.log('INTERNAL ERROR. FAILED TO HASH');
                            res.status(500)
                        }
                        else {
                            key_controller.key_add(BCRYPT_KEY_HASH, MONGO_ADMIN_OBJ.username)
                            res.status(200).send("Added Key")
                        }
                    })
                }
                else {
                    console.log('INTERNAL ERROR. WRONG PASSWORD');
                    res.status(403).send("Wrong Password")
                }
            })
        }
    })
})

app.post('/f8ff5cec5f99f6cbf3a6533ee75627d1c25091dd1d22593ac14e02bc9e97368e', function (req, res) {
    console.log("Recieved a module run request")
    console.log(req.body) //dev test
    //Very very slow, but since we have a small number of keys, should not take much time
    keystore.find({}, function (err, MONGO_KEYS_OBJ) {
        if (err) {
            console.log(err)
        }
        else {
            var notfound = true
            total_length = MONGO_KEYS_OBJ.length
            for (i = 0; i < total_length; i++) {
                keycheck = MONGO_KEYS_OBJ[i]
                bcrypt.compare(req.body.key, keycheck['keyHash'], function (err, BCRYPT_RESP) {
                    if (err) {
                        console.log(err)

                    }
                    else {
                        if (BCRYPT_RESP) {
                            notfound = false
                            //This implies that the key has been found, and hence the desired module can be then run
                            console.log("YAY. KEY FOUND")
                        }
                        else {
                            console.log("Searching Record ", i, "of ", total_length)
                        }
                    }
                })
            }
            if (notfound) {
                res.status(403).send("No Such Key in DB")
            }
        }
    })
})

app.get('/events', async (req, res) => {
    //Gets a request from the user
    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, async (err, decodedToken) => {
        if (err) {
            console.log(err)
        }
        else {
            if (err) {
                console.log('INTERNAL ERROR. ', err);
            }
            else {
                Student.findOne({ _id: decodedToken.usrid }, async function (err, MONGO_OBJ_RETURN) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        if (MONGO_OBJ_RETURN) {
                            //This implies that I found a user like this
                            //Now I need to process recommendations for this user
                            //var evns_to_return = await dms.testexplore2(MONGO_OBJ_RETURN)
                            var evns_to_return = await dms.testexplore(MONGO_OBJ_RETURN)
                            console.log("Being sent is: \n", evns_to_return)
                            res.send(evns_to_return)
                        }

                        else {
                            console.log('INTERNAL ERROR. DID NOT FIND A USER LIKE THIS');
                        }
                    }
                })
            }
        }
    })
})




//NOT TESTED
app.post('/click-on-events', function (req, res) {
    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, function (err, decodedToken) {
        if (err) {
            console.log('INTERNAL ERROR. ', err);
        }
        else {
            Student.findOne({ _id: decodedToken.usrid }, function (err, MONGO_OBJ_RETURN) {
                if (err) {
                    console.log(err)
                }
                else {
                    if (MONGO_OBJ_RETURN) {
                        event.findOne({ _id: req.body._id }, function (err, EVNobj) {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                if (EVNobj) {
                                    console.log(EVNobj)
                                    res.send(EVNobj)
                                    console.log("Inside the click on events method")
                                    MONGO_OBJ_RETURN.uservector.push(EVNobj.evnInterests)
                                    event.findOneAndUpdate({ _id: EVNobj._id }, { $set: { uservector: MONGO_OBJ_RETURN.uservector } }, function (err, UPDATED_OBJ) {
                                        if (err) {
                                            console.log(err)
                                        }
                                        else {
                                            console.log(UPDATED_OBJ)
                                        }
                                    })
                                }
                                else {
                                    console.log('INTERNAL ERROR. COULD NOT FIND THE EVENT');
                                }
                            }
                        })

                    }
                    else {
                        console.log('INTERNAL ERROR. DID NOT FIND A USER LIKE THIS');
                    }
                }
            })
        }
    })
    //Does not require authentication
    //Must send a post

})

app.post('/add-categories', function (err, obj) {
    category.findOne({ catName: req.body.catName }, function (err, obj) {
        if (err) {
            console.log('INTERNAL ERROR. ');
        }
        else {
            if (obj) {
                var newSubCat = new subcat({
                    subCatName: req.body.subCatName

                })
                newSubCat.save(function (err, subcatsave) {
                    if (err) {
                        console.log('INTERNAL ERROR. ', err);
                    }
                    else {
                        console.log(subcatsave)

                    }
                })
            }
            else {
                var newSubCategory = new subcat({
                    subCatName: req.body.subCatName
                })
                var newCategody = new category({
                    catName: req.body.catName,

                })
            }
        }
    })
});

app.get('/getCategoriesAll', function (req, res) {
    CatE.find({}, { subCat: 0 }, function (err, obj) {
        if (err) {
            console.log()
        }
        else {
            console.log(obj);
            res.send(obj);
        }
    });
});

app.get('/getCategoriesId', function (req, res) {
    console.log(req.query.catId);
    var id = parseInt(req.query.catId);
    console.log(id);

    CatE.findOne({ catId: id }, function (err, obj) {
        if (err) {
            console.log()
        }
        else {
            console.log(obj);
            console.log(obj.catId);
            res.send(obj.subCat)
        }
    });
});

app.post('/addCat', function (req, res) {


    var catId = generate(6);
    var catName = "Adventerous Journey";

    var subCatNameArray = ["Nature", "Historic", "Investigation", "Survival"];
    var subCat = new Array();

    for (var i = 0; i < subCatNameArray.length; i++) {
        var subCatObj =
        {
            subCatId: parseInt(generate(10)),
            subCatName: subCatNameArray[i]
        }

        subCat.push(subCatObj);
    }


    var cat = new CatE
        ({
            catId: catId,
            catName: catName,
            subCat: subCat
        });

    cat.save(function (err, obj) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(obj);
            res.redirect("file:///C:/Users/Dell/Documents/main/athena-pvt/addCat.html");
        }
    });
});

app.get('/:filename', (req, res) => {
    // gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    //     console.log(req.params)
    //     console.log(file)
    //   // Check if file
    //   if (!file || file.length === 0) {
    //     return res.status(404).json({
    //       err: 'No file exists',
    //     })
    //   }

    //   // Check if image
    //   if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
    //     // Read output to browser
    //     console.log('REached this point')
    //     const readstream = gfs.createReadStream(file.filename)
    //     readstream.pipe(res)
    //     return({files:file})

    //   } else {
    //     res.status(404).json({
    //       err: 'Not an image',
    //     })

    //   }
    // })
    const file = gfs
        .find({
            filename: req.params.filename
        })
        .toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: "no files exist"
                });
                console.log('NO SUCH FILE')
            }
            console.log(files)
            gfs.openDownloadStreamByName(req.params.filename).pipe(res);
            // return res.json({File:files})
        });
})


function getFrndInt(email) {
    Student.findOne({ EmailId: email }, function (err, obj) {

        var frnds = obj.Friends

        var interests = []

        for (var i = 0; i < frnds.length; i++) {
            Student.findOne({ EmailId: frnds[i] }, function (err, obj1) {

                interests.concat(obj1.interests);

            });
        }

        return interests;
    });
}


var jwms = require('./microservices/jwt-micro')


app.post('/api/follow', async function (req, res) {
    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, function (err, decodedToken) {
        if (err) {
            console.log('INTERNAL ERROR. ', err);
        }
        else {
            console.log(decodedToken)
            Student.findOne({_id: decodedToken['usrid'] }, function (err, obj) {
                if (err) {
                    res.status(403).send("No such student");
                }
                else {
                    console.log(obj)
                    var id = req.body._id
                    if (obj.evnFollowing.includes(id)) {
                        res.status(403).send("Already Exists");
                    } else {
                        obj.evnFollowing.push(id)
                        console.log(obj)
                        Student.updateOne({ _id: decodedToken["usrid"] }, { $set: { evnFollowing: obj.evnFollowing } }, function (err, obj) {
                            if (err) {
                                res.status(500).send("Something went wrong");
                            } else {
                                res.status(200).send(obj);
                            }

                        })
                    }
                }
            })
        }
    })
})



app.get('/api/getevents', async function(req, res){
    jwt.verify(tokenExtractor.tokenExtractor(req.headers.authorization), publicKEY, enc.verifyOptions, function (err, decodedToken) {
        if (err) {
            console.log('INTERNAL ERROR. ', err);
        }
        else {
            console.log(decodedToken)
            Student.findOne({_id: decodedToken['usrid'] }, function (err, obj) {
                if (err) {
                    res.status(403).send("No such student");
                }
                else {
                    res.status(200).send(obj.evnFollowing);
                }
            })
        }
    })
})
