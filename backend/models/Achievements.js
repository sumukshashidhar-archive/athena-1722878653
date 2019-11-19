/* Model for storing each achivement
Has to be implemented by Vijay */

var mongoose = require("mongoose");

var AchievementsSchema = new mongoose.Schema({
    achID: String,
    achNam: String,
    CategoryId: String,
    SubCategoryId: String,
    achDescription: String,
    CertifiedImage: String,
    Verified: Boolean,
    VerifiedBy: String,
    achRank: String
});

module.exports = mongoose.model("Achievement", AchievementsSchema);