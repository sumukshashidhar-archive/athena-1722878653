var pull_test = require('./pull-request')
var db = require('./../config/database')
var mongoose = require('mongoose')
var express = require('express')
var rec = require('./common_ground')


var port = 3000
db.shellBatchSize = 300
mongoose.connect(db.mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }) //Changed this line to link to a database file instead of having everything in one file to provide quick and easy access for further work
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

var app =express()
//STARTING SERVER HERE
app.listen(port, process.env.IP, function (req, res) //The Serv.port is from a config file
{
    console.log("SERVER STARTED on port ", port);
});
app.use(express.static("styles"));
app.set('view engine', 'ejs')

app.get('/hello', function(req, res) {
    console.log("GOT THE REQUEST")
    pull_test.deep(function(err, MONGO_OBJ) {
        if(err) {
            console.log(err)
        }
        else {
            console.log("THIS IS IN THE MAIN FILE" , MONGO_OBJ)
            rec.score_events(MONGO_OBJ, function(err, scores) {
                if(err) {
                    console.log('some random error')
                    console.log(err)
                }
                else {
                    console.log('sdfab gi hu nbuug avioh wi asiufiaus')
                    console.log(scores)
                    res.render('index')
                }
                console.log("its insideee")
            })
        }
    })
})
