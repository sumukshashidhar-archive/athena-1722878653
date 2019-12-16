//This should take care of almost everything


var mongoose = require('mongoose')
var tokenExtractor = require()
var publicKEY = fs.readFileSync('./../keys/public.key', 'utf8'); 
const enc = require('./../config/encryptionConfig.js');
module.exports = {
    //This must be sent the authorization header, else it will not work
    searchHandler: function searchHandler(useCase, keyword, tokenObject) {
        jwt.verify(tokenExtractor.tokenExtractor(tokenObject), publicKEY, enc.verifyOptions, function(err, DECODED_STUDENT) {
            if(err) {
                console.log(err)
                res.status(403).send("Bad Token.")
            }
            else {
                if(useCase==1) {

                }
                else if(useCase == 2) {

                }
                else if (useCase == 3) {

                }
                else {
                    res.status(500).send("Bad Request")
                }
            }
        })
    }, 

    regSearch: function regSearch(keyword, city, USER) {

    }
}