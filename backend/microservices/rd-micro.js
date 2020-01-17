var sms = require('./student-micro')


async function rd(decodedToken, evns) {
    var callback = new Promise((res, rej) =>  {
        console.log("REACHED: RD")
        var total_length = evns.length
        var sum_array=[];
        var stuobj = await sms.getStudentForRd(decodedToken.usrid)
        for(let i=0; i<total_length; i++) {
            var ev = evns[i] //To sesdlect an event
            var sum = 0.0
            console.log("THE TARGET AGE IS;", ev.evnTargetAge)
            console.log("REACHED: OUTER LOOP")
            if (decodedToken.pincode!=undefined && ev.evnPincode!=undefined) {
                sum -= (Math.abs(decodedToken.pincode - ev.evnPincode)*0.7) //0.7 because the pincode should not be given that much weightage
                console.log((Math.abs(decodedToken.pincode - ev.evnPincode)*0.7))
                console.log('Sum at step 1: ', sum)
                console.log("REACHED: COMPARISON STEP FOR PINCODE")
            }
            if (ev.evnTargetAge!=undefined && decodedToken.age!=undefined) {
                //Subtracting Raw Target Age Difference
                sum -= (Math.abs(decodedToken.age - ev.evnTargetAge)*0.5)
                console.log((Math.abs(decodedToken.age - ev.evnTargetAge)*0.5))
                console.log('Sum at step 2: ', sum)
            }
            var n = 1            
            //This is the interests
            // Student.findOne({_id: decodedToken.usrid}, function(err, obj) {
            //     if(err) {
            //         console.log(err)
            //     }
            //     else {
            //         console.log('Now got the student. Will continue with the recommendation')
            //     }
            // })
            // for(let m=0; m < decodedToken.interests.length; m++) {
            //     if(ev.evnInterests.includes(decodedToken.interests[m])) {
            //         sum = sum + sum*n;
            //         n = n+1;
            //     }
            //     else {
                    
            //     }
            // }

            //BASIC RECOMMENDATIONS
    
            // => Further comes the events searchin
            // var n = 1;
            // var event_interests = ev.evnInterests;
            // var userinterests = decodedToken.interests;
            // var tot_event_interests = ev.evnInterests.length;

            // //
            // for(let j=0; j<userinterests.length; j++) {
            //     console.log('comparing interests')
            //     if(event_interests.includes(userinterests[j])) {
            //         sum = sum + n*1
            //         n++
            //     }
            //     else {

            //     }
            // }
            // var vectors = decodedToken.uservector;
            // for(let m=0; m< vectors.length; m++) {
            //     console.log('comparing interests')
            //     if(event_interests.includes(userinterests[j])) {
            //         sum = sum + n*1
            //         n++
            //     }
            //     else {
                    
            //     }
            // }
            // for(let j=0; j < tot_event_interests; j++) {
            //     // console.log('Entering loop ' , j)
            //     // console.log("REACHED: INNER EVENT COMPARISON LOOP")
            //     for(let k=0; k < userinterests.length; k++) { //have to change this to binary search
            //         if(event_interests[j]==userinterests[k]) {
            //             sum +=10
            //         }
            //     }
            // }
            // console.log("REACHED: OUTSIDE, REACHED FINAL LOOP")
            sum_array.push(sum)
            evns[i].evnScore = sum;
            // console.log(evns)
            // console.log(decodedToken)
            
        }
        res(evns)
    })

    let r = await callback;
    return r
}

async function rdv2(decodedToken, evns) {
    var callback = new Promise((res, rej) =>  {
        console.log("REACHED: RD")
        var total_length = evns.length
        var sum_array=[];
        for(let i=0; i<total_length; i++) {
            var ev = evns[i] //To sesdlect an event
            var sum = 0.0
            console.log("REACHED: OUTER LOOP")
            if (decodedToken.pincode!=undefined && ev.evnPincode!=undefined) {
                sum -= (Math.abs(decodedToken.pincode - ev.evnPincode)*0.7) //0.7 because the pincode should not be given that much weightage
                console.log((Math.abs(decodedToken.pincode - ev.evnPincode)*0.7))
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
                // console.log('Entering loop ' , j)
                // console.log("REACHED: INNER EVENT COMPARISON LOOP")
                for(let k=0; k < userinterests.length; k++) { //have to change this to binary search
                    if(event_interests[j]==userinterests[k]) {
                        sum +=10
                    }
                }
            }
            // console.log("REACHED: OUTSIDE, REACHED FINAL LOOP")
            sum_array.push(sum)
            evns[i].evnScore = sum;
            // console.log(evns)
            // console.log(decodedToken)
            
        }
        res(evns)
    })

    let r = await callback;
    return r
}

function binarySearch(arr, x, start, end) { 
        
    // Base Condtion 
    if (start > end) return false; 

    // Find the middle index 
    let mid=Math.floor((start + end)/2); 

    // Compare mid with given key x 
    if (arr[mid]===x) return true; 
        
    // If element at mid is greater than x, 
    // search in the left half of mid 
    if(arr[mid] > x)  
        return binarySearch(arr, x, start, mid-1); 
    else

        // If element at mid is smaller than x, 
        // search in the right half of mid 
        return binarySearch(arr, x, mid+1, end); 
}

function GetSortOrder(prop) {
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
        console.log("these areasdsadsadsadsad", ret)
        ret.sort(GetSortOrder('evnScore'))
        // console.log("This is the final callback: Sending the frontend this. \n ", final)
        console.log("FINALLY RETYEEDS", ret)
        return ret;
    }
}

//Uncomment the commented lines if you need to test the DaVinci System