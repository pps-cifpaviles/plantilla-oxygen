const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    active:{
      type:Boolean,
      required:false,
      default:false
    },
    createdAt: {
      type: Date,
      default: Date.now, 
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User

