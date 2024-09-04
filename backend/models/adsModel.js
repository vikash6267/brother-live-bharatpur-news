const mongoose = require("mongoose");

const adsSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
            trim: true,
        },

        url: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            type: String,
            required: true,
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Ads", adsSchema);