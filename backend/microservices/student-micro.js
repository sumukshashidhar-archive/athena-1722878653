
///This is a retrieval service only for student recommendations

var Student = require('./../models/StudentInfo')


module.exports = {
    getStudent: async function getStudent(id) {
        var callback = new Promise((res, rej) => {
            Student.findOne({_id: id}, async function(err, obj) {
                if(err) {
                    console.log(err)
                    res({
                        'obj' : err, 
                        'response' : false
                    })
                }
    
                else {
                    if(obj == null) {
                        res({
                            'obj': null,
                            'response': false
                        })
                    }
                    else {
                        res({
                            'obj': obj, 
                            'response' : true
                        })
                    }
                }
            })
        }) 

        let r = await callback
        return r

    }
}