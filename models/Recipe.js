const mongoose = require("mongoose");
const { Schema } = mongoose;
const recipeSchema = new Schema(
    {
        name: {type: String, required: [true, 'Name is required'], minlength: [3, "Name must be 4 chars long"]},
        minutes: {type: Number, default: 0},
        tags: String,   //should i keep tags??
        n_steps: {type: Number, default: 0},
        n_ingredients: {type: Number, default: 0},
    },
    { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);