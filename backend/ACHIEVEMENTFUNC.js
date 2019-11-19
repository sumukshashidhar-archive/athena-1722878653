module.exports = {
    createAchievement: function(achobj){
            console.log(achobj["id"])
            res.status(200).json(achobj)
            Student.findOne({email: decodedToken}, function(err, obj){
                if(err){
                    console.log(err)
                }
                else{
                    console.log("Found the student object with the token. Now pushing achievement")
                    obj.Achievement.push(achobj)
                    console.log(obj.Achievement)

                }
            })
        }
}