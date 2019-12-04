module.exports = {
	tokenExtractor: function tokenExtractor(tokenHeader){
    var str = tokenHeader
    if(str.startsWith("Bearer ")){
        var toke = str.substring(8, str.length-1)
        console.log("toke" + toke)
        return toke
    	}
	}	
}