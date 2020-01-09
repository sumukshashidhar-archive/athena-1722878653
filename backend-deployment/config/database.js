// COMPLETED MODULE:

if(process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI: 'mongodb://developers:Kumarans365@kumaranstest-shard-00-00-jezzh.mongodb.net:27017,kumaranstest-shard-00-01-jezzh.mongodb.net:27017,kumaranstest-shard-00-02-jezzh.mongodb.net:27017/test?ssl=true&replicaSet=kumaranstest-shard-0&authSource=admin&retryWrites=true&w=majority'}
} else {
  module.exports = {mongoURI: 'mongodb://developers:Kumarans365@kumaranstest-shard-00-00-jezzh.mongodb.net:27017,kumaranstest-shard-00-01-jezzh.mongodb.net:27017,kumaranstest-shard-00-02-jezzh.mongodb.net:27017/test?ssl=true&replicaSet=kumaranstest-shard-0&authSource=admin&retryWrites=true&w=majority'}
}
