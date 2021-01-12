const mongoose = require("mongoose");
const { Schema } = mongoose;
const recipeSchema = new Schema(
    {
        name: {type: String, required:[true,'name is required']},
        minutes: {type: Number},
        n_ingredients: {type: Number},
        n_steps: {type: Number},
        tags: [{type: String}],
        ingredients: [{type: String, required:[true, 'ingredient list is required']}],
        description: {type: String, required:[true,'description is required']},
        steps: [{type: String, required:[true,'steps are required']}],
               
    },
);
recipeSchema.index({'$**': 'text'});
module.exports = mongoose.model("Recipe", recipeSchema);