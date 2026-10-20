const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    transportType: { type: mongoose.Schema.Types.ObjectId, ref: 'TransportType' } ,   // "coche", "autobús", etc.
    distance: Number,
    unit: { type: String, default: 'km' },
    date: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });


const UserActivity = mongoose.model('useractivity', activitySchema);
module.exports = UserActivity


