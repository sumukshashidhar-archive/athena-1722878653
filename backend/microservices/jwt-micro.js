var privateKEY = fs.readFileSync('./../keys/private.key', 'utf8');
var publicKEY = fs.readFileSync('./../keys/public.key', 'utf8');
var enc = require('./../config/encryptionConfig')


async function tokenExtractor(tokenHeader) {
    var callback = new Promise((res, rej) => {
        var str = tokenHeader
        if (str.startsWith("Bearer ")) {
            var toke = str.substring(8, str.length - 1)
            console.log("toke" + toke)
            res(toke)
        }
        else {
            var toke = false
            res(toke)
        }
    })

}



module.exports = {
    sign_student: async (studentObject) => {
        var callback = new Promise((res, rej) => {
            var obj = studentObject
            var token = jwt.sign({ usrid: obj["_id"], email: obj["EmailId"], given_name: obj["FirstName"], family_name: obj["LastName"], role: usrobj["userType"], interests: obj["UserInterests"], Location: obj["Location"], Pincode: obj["pincode"], Bio: obj["bio"] }, privateKEY, enc.signOptions);
            res(token)
        })
        let tk = await callback;
        return tk
        //Should effectively sign a JWT for students
    },
    sign_organizer: async (organizerObject) => {
        var callback = new Promise((res, rej) => {
            var obj = organizerObject
            var token = jwt.sign({ email: obj["OrganiserEmail"], name: obj["OrganiserName"], role: "Org" }, privateKEY, enc.signOptions);
            res(token)
        })
        let tk = await callback;
        return tk
        //Should effectively sign a JWT for students
    },

    verify: async (header_file) => {
        var callback = new Promise((res, rej) => {
            var extracted = await tokenExtractor(header_file)
            jwt.verify(extracted, publicKEY, enc.verifyOptions, (err, DECODED_TOKEN) => {
                if(err) {
                    console.log(err)
                    res(false)
                }
                else {
                    res(DECODED_TOKEN)
                }
            })
        })

        var decoded = await callback; 
        return decoded
    }
}