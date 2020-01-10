var sr = require('./evn-micro')
var rdms = require('./rd-micro.js')

async function gateway(student, PRCSEvns){
    var callback = new Promise(async (res, rej)=> {
        //This gateway is needed if in the future someone needs to further process these events.
        //This also limits redundant code.
        var fin = await rdms.handler(student, PRCSEvns)
        res(fin)
    })
    let r = await callback
    return r
}


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
            //Here comes the recommendations
            var returner = await gateway(student, PRCSEvns)
            console.log("These are the events from the gateway", returner)
            res(returner)
            
        })

        let r = await callback; 
        return r;
    }, 

    testexplore2: async function(student) {
        var callback = new Promise(async (res, rej) => {
            var PRCSEvns = await sr.all()
            //These are the events to process
            //Here comes the recommendations
            res(PRCSEvns)
            
        })

        let r = await callback; 
        return r;
    },


    deep_search: async function(query, student) {
        var callback = new Promise(async (res, rej) => {
            var PRCSEvns = sr.search_deep(query)
            console.log('EVENT IS NOW: ', PRCSEvns)
            var returner = await gateway(student, PRCSEvns)
            //These are the events to process
            //Here comes the recommendations
            res(returner)
            
        })

        let r = await callback; 
        return r;
    },


    reqular_city_search: async function(query, student) {
        var callback = new Promise( async (res, rej) => {
            var PRCSEvns = sr.search_normal(student.Location, query)
            var returner = await gateway(student, PRCSEvns)
            res(returner)
        })
    }
}