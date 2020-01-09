//Part of the DaVinci Algorithm Network
/* 
Author: Sumuk Shashidhar
LICSENSE: No License

*/

var event = require('./../models/event')
var sum_array = [];
//We take in bytes / elements, and return a score

function get_scores(arr, pincode, interests, age, costPref) {
    
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
    //Main top array, iterating through the passed events
    for(i=0; i<arr.length; i++) {
        var ev = arr[i]
        var sum=0; 

        //Pincode Calculation. ONLY IF BOTH DEFINED
        if (pincode!=undefined && ev.evnPincode!=undefined) {
            sum += (Math.abs(pincode - ev.evnPincode)*0.7)
        }
        
        if (ev.evnScore!=undefined) {
            //Adding raw event score
            sum += ev.evnScore
        }
        
        if (ev.evnTarget!=undefined && age!=undefined) {
            
            //Subtracting Raw Target Age Difference
            sum -= (Math.abs(age - ev.evnTargetAge)*0.5)
        }
    
        if(costPref!=undefined && ev.evnCost!=undefined) {
            //Subtracting Cost Preferences modulus from the total score. Multiplied by 0.1
            sum -= (Math.abs(costPref - ev.evnCost)*0.1)
        }
        console.log(sum)
        //For the interests checking
        event_interests = ev.evnInterests
        var n = 1;
        for(i=0; i<ev.event_interests; i++) {
            binarySearch(interests, event_interests[i], 0, (interests.length-1), function(err, res) {
                if(err) {
                    console.log('INTERNAL ERROR. ');
                }
                else {
                    if (res) {
                        console.log('Similarity found. Now incrementing score')
                        sum += 1*n
                        n += 1
                    } 
                    else {
                        continue
                    }
                }
            })
        }
    
        //Return and total sum declaration
        sum_array.push(sum)
    
    
    }
    console.log(sum_array)

    //Have to make one for attending friends as well.
}
                                                                               

