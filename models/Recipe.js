const mongoose = require("mongoose");
const { Schema } = mongoose;
const recipeSchema = new Schema(
    {
        name: {type: String, required:[true,'name is required']},
        n_minutes: {type: Number},
        n_ingredients: {type: Number},
        tags: [{type: String}],
        ingredients: [{type: String, required:[true, 'ingredient list is required']}],
        description: {type: String, required:[true,'description is required']},
        steps: [{type: String, required:[true,'steps are required']}],
               
    },
);
module.exports = mongoose.model("Recipe", recipeSchema);