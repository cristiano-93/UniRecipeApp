const mongoose = require("mongoose");
const {Schema} = mongoose;
const listSchema = new Schema(
    {
        name: String,
        minutes: Number,
        submitted: Date,
        tags: String,
        nutrituion: String,
        n_steps: Number,
        steps: String,
        description: String,
        ingredients: String,
        n_ingredients: Number,
        //add categories by using aggreagation
    },
    {timestamps: true}
);

listSchema.index({'$**': 'text'});

module.exports = mongoose.model("List", listSchema);