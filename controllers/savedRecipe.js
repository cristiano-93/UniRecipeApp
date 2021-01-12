const User = require("../models/User");
const Recipe = require("./recipe");

exports.list = async (req, res) => {
    try {
      const userRef = await User.findOne({"_id": user.id}).populate('saved_recipes');
      console.log("user reference: "+userRef);
      res.render('saved-recipes', {recipes: userRef.saved_recipes});
    } catch (e) {
      console.log(e);
      res.json({result: 'could not find user favorite recipes'}); 
    }
}