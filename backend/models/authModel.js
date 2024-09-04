const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
           
        },

        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "Admin","SuperAdmin"],
            default: "user",
            required: true,
        },
        permissions: {
            canAdd: { type: Boolean, default: false },
            canEdit: { type: Boolean, default: false },
            canDelete: { type: Boolean, default: false }
          },

        token: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("auth", authSchema);