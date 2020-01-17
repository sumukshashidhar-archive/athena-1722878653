var sms = require('./student-micro')
async function rd(decodedToken, evns) {
    console.log('THE OSsdasdasdasdasdTUOBJ IS ', decodedToken)
    var callback = new Promise(async (res, rej) =>  {
        console.log("REACHED: RD")
        var total_length = evns.length
        var sum_array=[];
        var stuobj = await sms.getStudentForRd(decodedToken._id)
        if(stuobj.response) {
            var stu = stuobj.obj;
            for(let i=0; i<total_length; i++) {
                var ev = evns[i] //To sesdlect an event
                var sum = 1.0
                console.log("THE TARGET AGE IS;", ev.evnTargetAge)
                console.log("REACHED: OUTER LOOP")


                //Step 3 starts here. This is mainly for the events

                ///This needs the sorted array to work, because then I can execute a binary search on the elements
                ///The Binary Search Code lives here, because its better

                //In the student object is the vector we need to check.
                console.log('DATA POINT 1 is: ', stu.uservector)
                console.log('DATA POINT 2 is: ',  stu.Interests)
                console.log('DATA POINT 3 is: ',  ev.evnInterests)
                console.log('DATA POINT 4 is: ',  ev.evnName)
                
                
                var n = 100;
                var vectors = stu.uservector;
                var ints = stu.Interests;
                var evints = ev.evnInterests

                for(let m=0; m<ints.length; m++) {
                    var result = binarySearch(evints, ints[m])
                    if(result){ 
                        console.log('Step 1 for interest based works properly')
                        console.log('original sum is ', sum)
                        sum = sum + sum*n;
                        n += 100
                        console.log('SUM IS ',  sum)

                    }
                    else if (result==false) {

                    }
                    else {
                        console.log('Bitwise Binary Search is failing')
                    }
                }
                for(let m=0; m<vectors.length; m++) {
                    var result = binarySearch(evints, vectors[m])
                    if(result){ 
                        console.log('Step 2s for interest based works properly')
                        sum = sum + ((sum*n)*0.01);
                        n += 1
                    }
                    else if (result==false) {
                        //This is not an error, nothing is supposed to happen here
                    }
                    else {
                        console.log('Bitwise Binary Search is failing')
                    }
                }

                if (stu.pincode!=undefined && ev.evnPincode!=undefined) {
                    sum -= (Math.abs(stu.pincode - ev.evnPincode)*0.3) //0.7 because the pincode should not be given that much weightage
                    console.log('Sum at step 1: ', sum)
                    console.log("REACHED: COMPARISON STEP FOR PINCODE")
                }
                if (ev.evnTargetAge!=undefined && stu.Age!=undefined) {
                    //Subtracting Raw Target Age Difference
                    sum -= (Math.abs(decodedToken.age - ev.evnTargetAge)*0.5)
                    console.log((Math.abs(decodedToken.age - ev.evnTargetAge)*0.5))
                    console.log('Sum at step 2: ', sum)
                }

                //Final Code for pushing the sum to the sum array
                sum_array.push(sum)
                evns[i].evnScore = sum;
                
            }
        }
        else {
            console.log('The RD Failed. Returning the Events as is')
        }

        res(evns)
    })

    let r = await callback;
    return r
}

async function rdglobal(decodedToken, evns) {
    console.log('THE OSsdasdasdasdasdTUOBJ IS ', decodedToken)
    var callback = new Promise(async (res, rej) =>  {
        console.log("REACHED: RD")
        var total_length = evns.length
        var sum_array=[];
        var stuobj = await sms.getStudentForRd(decodedToken._id)
        if(stuobj.response) {
            var stu = stuobj.obj;
            for(let i=0; i<total_length; i++) {
                var ev = evns[i] //To sesdlect an event
                var sum = 1.0
                console.log("THE TARGET AGE IS;", ev.evnTargetAge)
                console.log("REACHED: OUTER LOOP")


                //Step 3 starts here. This is mainly for the events

                ///This needs the sorted array to work, because then I can execute a binary search on the elements
                ///The Binary Search Code lives here, because its better

                //In the student object is the vector we need to check.
                console.log('DATA POINT 1 is: ', stu.uservector)
                console.log('DATA POINT 2 is: ',  stu.Interests)
                console.log('DATA POINT 3 is: ',  ev.evnInterests)
                console.log('DATA POINT 4 is: ',  ev.evnName)
                
                
                var n = 100;
                var vectors = stu.uservector;
                var ints = stu.Interests;
                var evints = ev.evnInterests

                for(let m=0; m<ints.length; m++) {
                    var result = binarySearch(evints, ints[m])
                    if(result){ 
                        console.log('Step 1 for interest based works properly')
                        console.log('original sum is ', sum)
                        sum = sum + sum*n;
                        n += 100
                        console.log('SUM IS ',  sum)

                    }
                    else if (result==false) {

                    }
                    else {
                        console.log('Bitwise Binary Search is failing')
                    }
                }
                for(let m=0; m<vectors.length; m++) {
                    var result = binarySearch(evints, vectors[m])
                    if(result){ 
                        console.log('Step 2s for interest based works properly')
                        sum = sum + ((sum*n)*0.01);
                        n += 1
                    }
                    else if (result==false) {
                        //This is not an error, nothing is supposed to happen here
                    }
                    else {
                        console.log('Bitwise Binary Search is failing')
                    }
                }
                if (ev.evnTargetAge!=undefined && stu.Age!=undefined) {
                    //Subtracting Raw Target Age Difference
                    sum -= (Math.abs(decodedToken.age - ev.evnTargetAge)*0.5)
                    console.log((Math.abs(decodedToken.age - ev.evnTargetAge)*0.5))
                    console.log('Sum at step 2: ', sum)
                }

                //Final Code for pushing the sum to the sum array
                sum_array.push(sum)
                evns[i].evnScore = sum;
                
            }
        }
        else {
            console.log('The RD Failed. Returning the Events as is')
        }

        res(evns)
    })

    let r = await callback;
    return r
}




//Old Code in case we need a recalll.
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
function binarySearch(array, key) {
        var lo = 0,
        hi = array.length - 1,
        mid,
        element;
    while (lo <= hi) {
        mid = ((lo + hi) >> 1);
        element = array[mid];
        if (element < key) {
            lo = mid + 1;
        } else if (element > key) {
            hi = mid - 1;
        } else {
            console.log('Found at mid: ', array[mid])
            return(true)
        }
    }
    return(false)

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



//The handler is to change the versions of the recommendation system and for max
//async usage

module.exports = {
    //just a handler for the RD
    handler: async (decodedToken, evns) => {
        var ret = await rd(decodedToken, evns)
        // console.log("these areasdsadsadsadsad", ret)
        ret.sort(GetSortOrder('evnScore'))
        // console.log("This is the final callback: Sending the frontend this. \n ", final)
        // console.log("FINALLY RETYEEDS", ret)
        return ret;
    },
    //just a handler for the RD
    handlerglobal: async (decodedToken, evns) => {
        var ret = await rdglobal(decodedToken, evns)
        // console.log("these areasdsadsadsadsad", ret)
        ret.sort(GetSortOrder('evnScore'))
        // console.log("This is the final callback: Sending the frontend this. \n ", final)
        // console.log("FINALLY RETYEEDS", ret)
        return ret;
    }
}

