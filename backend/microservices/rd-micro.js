async function rd(decodedToken, evns) {
    var callback = new Promise((res, rej) =>  {
        console.log("REACHED: RD")
        var total_length = evns.length
        var sum_array=[];
        for(let i=0; i<total_length; i++) {
            var ev = evns[i] //To sesdlect an event
            var sum = 0.0
            console.log("REACHED: OUTER LOOP")
            if (decodedToken.Pincode!=undefined && ev.evnPincode!=undefined) {
                sum += (Math.abs(decodedToken.Pincode - ev.evnPincode)*0.7)
                console.log((Math.abs(decodedToken.Pincode - ev.evnPincode)*0.7))
                console.log('Sum at step 1: ', sum)
                console.log("REACHED: COMPARISON STEP FOR PINCODE")
            }
            if (ev.evnTargetAge!=undefined && decodedToken.age!=undefined) {
            
                //Subtracting Raw Target Age Difference
                sum -= (Math.abs(decodedToken.age - ev.evnTargetAge)*0.5)
                console.log((Math.abs(decodedToken.age - ev.evnTargetAge)*0.5))
                console.log('Sum at step 2: ', sum)
            }
    
            //BASIC RECOMMENDATIONS
    
            // => Further comes the events searching
            var n = 1;
            var event_interests = ev.evnInterests;
            var userinterests = decodedToken.interests;
            var tot_event_interests = ev.evnInterests.length;
            for(let j=0; j < tot_event_interests; j++) {
                console.log('Entering loop ' , j)
                console.log("REACHED: INNER EVENT COMPARISON LOOP")
                for(let k=0; k < userinterests.length; k++) { //have to change this to binary search
                    if(event_interests[j]==userinterests[k]) {
                        sum +=10
                    }
                }
            }
            console.log("REACHED: OUTSIDE, REACHED FINAL LOOP")
            sum_array.push(sum)
            evns[i].evnScore = sum;
            res(evns)
            
        }
    })
}

async function GetSortOrder(prop) {
    return function(a, b) {
        if(a[prop]  < b[prop]) {
            return 1
        }
        else if (a[prop] > b[prop]) {
            return -1;
        }
        return 0
    }
}

module.exports = {
    //just a handler for the RD
    handler: async (decodedToken, evns) => {
        var ret = await rd(decodedToken, evns)
        var final = await evns.sort(GetSortOrder('evnScore'))
        console.log("This is the final callback: Sending the frontend this. \n ", final)
        return final;
    }
}