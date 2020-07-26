
var smtpcreds = {
    'username': 'Username Goes here',
    'password': 'Password Goes here',
    'port': 465,
    'host': 'Smtp Server Credentials here'
}

module.exports = {
    mongoURI: 'mongodb://developers:Kumarans365@kumaranstest-shard-00-00-jezzh.mongodb.net:27017,kumaranstest-shard-00-01-jezzh.mongodb.net:27017,kumaranstest-shard-00-02-jezzh.mongodb.net:27017/test?ssl=true&replicaSet=kumaranstest-shard-0&authSource=admin&retryWrites=true&w=majority',

    smtpcreds: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        user: 'developersatathena@gmail.com ',
        pass: 'Kumarans@365!', 
        text: 'Here'
    }
}
