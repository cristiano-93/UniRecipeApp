const mongoose = require("mongoose");
const { Schema } = mongoose;
const recipeSchema = new Schema(
    {
        name: {type: String},
        description: {type: String},
        ingredients: {type: String},
        steps: {type: String}
    },
    { timestamps: true }
);
module.exports = mongoose.model("Recipe", recipeSchema);