var sr = require('./evn-micro')
var rdms = require('./rd-micro.js')

async function gateway(student, PRCSEvns, choice){
    var callback = new Promise(async (res, rej)=> {
        //This gateway is needed if in the future someone needs to further process these events.
        //This also limits redundant code.

        if(choice == 1) {
            var fin = await rdms.handler(student, PRCSEvns)
            res(fin)
    
        }
        else if (choice == 2) {
            var fin = await rdms.handlerglobal(student, PRCSEvns)
            res(fin)
    
        }
    })
    let r = await callback
    return r
}


module.exports = {
    explore: async function(student) {
        var callback = new Promise(async (res, rej) => {
            var choice = 1
            console.log(student.Location)
            var PRCSEvns = await sr.cityspecific(student.Location)
            var returner = await gateway(student, PRCSEvns, choice)
            //These are the events to process
            res(returner)
            
        })

        let r = await callback; 
        return r;
    }, 
    testexplore: async function(student) {
        var callback = new Promise(async (res, rej) => {
            var PRCSEvns = await sr.all()
            //These are the events to process
            //Here comes the recommendations
            var choice = 2
            var returner = await gateway(student, PRCSEvns, choice)
            // console.log("These are the events from the gateway", returner)
            res(returner)
            // res(PRCSEvns)
            
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
            var returner = await gateway(student, PRCSEvns, 2)
            //These are the events to process
            //Here comes the recommendations
            res(returner)
            // res(PRCSEvns)
            
        })

        let r = await callback; 
        return r;
    },


    reqular_city_search: async function(query, student) {
        var callback = new Promise( async (res, rej) => {
            var PRCSEvns = sr.search_normal(student.Location, query)
            var returner = await gateway(student, PRCSEvns, 1)
            res(returner)
            // res(PRCSEvns)
        })

        let r = await callback
        return r;
    }
}
