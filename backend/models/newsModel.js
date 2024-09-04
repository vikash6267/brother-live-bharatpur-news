// models/News.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);




const newsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    // required: true,
  },
  slug:{
    type:String,
    required: true,
    unique: true 
  },
  location: {
    type: String,
    // required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: 'SubCategory',
    // required: true,
  },
  expire: {
    type: Date,
    // required: true,
  },
  description: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  images: [
    {
      public_id: String,
      url: String,
    },
  ],
  youtubeurl: {
    type: String,
    // required: true,
  },
  publish: {
    type: Date,
    default: Date.now()
  }
  ,
  active: {
    type: Boolean,
    default: true, // Default active state
  },
  type: {
    type: String,
    required: true
  },
  tag: {
    type: [String],
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'auth',
    // required: true,
  },

  comments: [commentSchema],
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'auth',
  }],

},
{ timestamps: true });

const News = mongoose.model('News', newsSchema);

module.exports = News;
