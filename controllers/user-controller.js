const { User } = require('../models');

const userController = {
  // here is where the functions will go as methods
  getAllUsers(req, res) {
    User.find({})
    .then((dbUserData) => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  },

  getUserbyId({ params }, res) {
    User.findOne({ _id: params.id })
    .then((dbUserData) => {
      //if no user is found, send 404 error
      if(!dbUserData) {
        res.status(404).json({ message: 'No user found with that id'})
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  createUser({ body }, res) {
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(400).json(err));
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate( { _id: params.id }, body, { new: true })
    .then(dbUserData => {
      if(!dbUserData) {
        res.status(404).json({ message: 'No user found with that id'});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
  },

  deleteUser({ params }, res) { 
    User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => {
      if(!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!'});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
  }

};

module.exports = userController;