var bcrypt = require('bcryptjs')
const enc = require('./../config/encryptionConfig');
const saltRounds = enc.saltRounds;


module.exports = {
    hashme: async function hashme(plaintext) {
        var bcrypt_promise = new Promise(function(res, rej) {
            bcrypt.hash(plaintext, saltRounds, function(err, HASHED_PASSWORD) {
                if(err) {
                    console.log(err)
                }
                else {
                    res(HASHED_PASSWORD)
                }
            })
        })
        let HASHRETURN = await bcrypt_promise
        return HASHRETURN;
        
    }, 
    compareme: async function compareme(plaintext, hashed) {
        var promise = new Promise(function(res, rej) {
            bcrypt.compare(plaintext, hashed, function(err, BCRYPT_RES) {
                if(err) {
                    console.log(err)
                }
                else {
                    res(BCRYPT_RES)
                }   
            })
        })
        let RESRETURN = await promise
        return RESRETURN;
    }

}