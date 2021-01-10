const mongoose = require("mongoose");
const { Schema } = mongoose;

const stepSchema = new Schema(
    {
        name: { type: String, required: [true, 'Name is required'] },
    },
);

module.exports = mongoose.model("Step", stepSchema);