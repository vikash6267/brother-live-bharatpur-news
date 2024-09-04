// models/Track.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const trackVisitSchema = new Schema({
    visit: {
      type: Number,
      required: true,
      default:0
    }
  });
  
  const TrackVisit = mongoose.model('Visits', trackVisitSchema);
  
  module.exports = TrackVisit;
  