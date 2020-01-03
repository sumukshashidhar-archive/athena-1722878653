var sr = require('./evn-micro')




module.exports = {
    explore: async function(student) {
        var callback = new Promise(async (res, rej) => {
            var PRCSEvns = await sr.cityspecific(student.Location)
            //These are the events to process
            res(PRCSEvns)
            
        })

        let r = await callback; 
        return r;
    }, 
    testexplore: async function(student) {
        var callback = new Promise(async (res, rej) => {
            var PRCSEvns = await sr.all()
            //These are the events to process
            res(PRCSEvns)
            
        })

        let r = await callback; 
        return r;
    }, 
}