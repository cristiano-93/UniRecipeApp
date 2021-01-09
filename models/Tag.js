const mongoose = require("mongoose");
const {Schema} = mongoose;
const tagSchema = new Schema(
    {
        tag:{type: String}
    },
    { timestamps: true}
);

module.exports = mongoose.model("Tag", tagSchema);