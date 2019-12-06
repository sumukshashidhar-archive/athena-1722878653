var pull_test = require('./pull-request')
var db = require('./../config/database')

mongoose.connect(db.mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }) //Changed this line to link to a database file instead of having everything in one file to provide quick and easy access for further work
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//STARTING SERVER HERE
app.listen(serv.port, process.env.IP, function (req, res) //The Serv.port is from a config file
{
    console.log("SERVER STARTED");
});


pull_test.deep(function(err, returns) {
    if(err) {
        console.log(err)
    }
    else {
        console.log(returns)
    }
})