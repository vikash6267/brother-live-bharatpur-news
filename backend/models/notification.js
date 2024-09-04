const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  news: {
    type: Schema.Types.ObjectId,
    ref: 'News',
    required: true
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
