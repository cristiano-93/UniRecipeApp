const User = require("../../models/User");

exports.create = async (req, res) => {
  const recipeId = req.body.id;
  console.log(recipeId);
  if (!recipeId || req.session.userID) {
    res.json({ result: 'error' });
  }
  try {
    await User.update({ "_id": req.session.userID }, { $push: { saved_recipes: recipeId } })
  } catch (e) {
    res.json({ result: 'error could not create a favourite' });
  }
}




// exports.create = async (req, res) => {
//       const recipeId = req.body.id;
//       console.log(recipeId);
//       // if (  !recipeId || req.session.userID) {
//       //   res.json({result: 'error in savedRecipeApi'});
//       // }
//       try {
//         await User.update({"_id": req.session.userID}, {$push:{saved_recipe: recipeId}})
//       } catch (e) {
//         res.json({result: 'error could not create a favourite'}); 
//       }
//   }