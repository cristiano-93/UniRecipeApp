const mongoose = require("mongoose");
const { Schema } = mongoose;

const ingredientSchema = new Schema(
    {
        name: { type: String, required: [true, 'Name is required'] },
    },
);

module.exports = mongoose.model("Ingredient", ingredientSchema);