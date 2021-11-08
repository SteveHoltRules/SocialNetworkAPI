const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
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
    validate: [validateEmail, 'Please enter a valie email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valie email address'],
  },
  thoughts: [],
  friends: []
  });

//create the User model using the UserSchema
const User = UserSchema('User', UserSchema);

module.exports = User;
