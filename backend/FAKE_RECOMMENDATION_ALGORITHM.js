var event = require('./models/event');

module.exports = {
	rd: function(){
		event.find({}, function(err, obj){
                if(err){
                    console.log(err)
                }
                else{
                    console.log(obj)
                    return obj
                }
            })
	}
            


}