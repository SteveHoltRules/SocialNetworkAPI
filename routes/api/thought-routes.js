const router = require('express').Router();

const {
  getThoughts,
  getCertainThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

