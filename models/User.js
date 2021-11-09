const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valie email address'],
  },
  thoughts: [],
  friends: []
  });

//create the User model using the UserSchema
const User = model('User', userSchema);

module.exports = User;
