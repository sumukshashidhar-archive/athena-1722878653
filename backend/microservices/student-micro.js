
///This is a retrieval service only for student recommendations

var Student = require('./../models/StudentInfo')


module.exports = {
    getStudentForRd: async function getStudent(id) {
        var callback = new Promise((res, rej) => {
            Student.findOne({_id: id}, {Interests: 1, Age: 1, pincode: 1, uservector: 1},  async function(err, obj) {
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

    }, 
    getStudentHeavybyID: async function getStudent(id) {
        var callback = new Promise((res, rej) => {
            Student.findOne({_id: id},  async function(err, obj) {
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

    }, 
    getStudentHeavybyID: async function getStudent(email) {
        var callback = new Promise((res, rej) => {
            Student.findOne({EmailId: email},  async function(err, obj) {
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