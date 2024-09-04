// models/LiveStream.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const liveStreamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("LiveStream", liveStreamSchema);
