const mongoose = require("mongoose");
const { Schema } = mongoose;
const recipeSchema = new Schema(
    {
        id:Number,
        name: String,
        minutes: Number,
        tags: String,   //should i keep tags??
        n_steps: Number,
        n_ingredients: Number,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);