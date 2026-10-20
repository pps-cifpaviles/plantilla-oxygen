const mongoose = require('mongoose');

const transportTypeSchema = new mongoose.Schema({
    name: String,        // "transportation"
    factor: Number      // "coche", "autobús", etc.
  });

const TransportTypeUser = mongoose.model('transporttype', transportTypeSchema);


module.exports = TransportTypeUser