// models/SubCategory.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  image: {
    type: String, // Assuming image URL for simplicity
    // required: true,
  },
  news: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News",
    },
  ],

  active: {
    type: Boolean,
    default: true, // Default active state
  },
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
