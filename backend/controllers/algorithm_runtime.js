module.exports = {
	algorithm_update: function algUpdate(bool){
		if(bool){
			return './fake.js'
		}
		else{
			return'./recommendation/rd-v1'
		}
	}
}