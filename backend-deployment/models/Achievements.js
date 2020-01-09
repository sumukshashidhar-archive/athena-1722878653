/* Model for storing each achivement
Has to be implemented by Vijay */

var mongoose = require("mongoose");

var AchievementsSchema = new mongoose.Schema({
    Name: String, //Name 
    CategoryId: String, //Category ID
    SubCategoryId: String, //Subcat ID
    Description: String, //Achievement Description
    Image: String, //Image File Path
    Verified: Boolean, //verified or not
    VerifiedBy: String, //Verification Status
    achRank: String  //Rank of Achievements
});

module.exports = mongoose.model("Achievement", AchievementsSchema);