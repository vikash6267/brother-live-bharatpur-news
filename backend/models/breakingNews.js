const mongoose = require("mongoose");

const breakingNewsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        active: {
            type: Boolean,
            default: true
        },
        url: {
            type: String,
            trim: true,
        },
    },

    { timestamps: true }
);

module.exports = mongoose.model("breakingNewSchma", breakingNewsSchema);