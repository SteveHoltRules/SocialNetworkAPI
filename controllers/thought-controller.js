const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getThoughts(req, res) {
    Thought.find({})
      
      // .sort({ createdAt: -1 })
      .then((dbThoughtData) => {
        console.log("DbThoughtData: ", dbThoughtData);
        res.json(dbThoughtData)
      })
      .catch((err) => {
        console.log(err);
        res.status(50).json(err);
      });
  },
  //get single thought by id
  getCertainThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .then((dbThoughtData) => {
      if(!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!'});
      }
      res.json(dbThoughtData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  //create thoughts
  createThought(req, res) {
    Thought.create(req.body)
    .then((dbThoughtData) => {
      return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: dbThoughtData }},
        { new: true, runValidators: true }
      );
    })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "Thoughts without a body. Please pick a different user" });
      }
      res.json({ message: "Thought linked with body"});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body}, { new: true })
    .then((dbThoughtData) => {
      if(!dbThoughtData) {
        return res.status(404).json({ message: 'No thoughts here! Please pick a different thought!'})
      }
      res.json(dbThoughtData);
    })
    .catch((err) => {
      console.log(err);
      res.status(502).json(err);
    })
  },
  //delete thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thoughts here! Please select another id"});
        }

        return User.findOneAndUpdate( 
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId }},
          { new: true }
        );
      })
      .then((dbUserData) => {
        if(!dbUserData) {
          return res.status(404).json({message: 'Thoughts without a body. Please pick a different user'});
        }
        res.json({message: 'Empty thoughts'});
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json(err);
      });
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        res.json(dbThoughtData);
        
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json(err);
      });
  },

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId }}},
      { new: true }
    )
    .then((dbThoughtData) => {
      if(!dbThoughtData) {
        return res.status(404).json({message: 'No thought with this id!'});
      }
      res.json(dbThoughtData);
    })
    .catch((err) => {
      console.log(err);
      res.status(502).json(err);
    })
  }
};

module.exports = thoughtController;