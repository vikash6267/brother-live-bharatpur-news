const mongoose = require("mongoose");

const ytVideoSchema = new mongoose.Schema(
    {


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

module.exports = mongoose.model("YouTubeVideo", ytVideoSchema);