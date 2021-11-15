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

router
  .route('/')
  .get(getThoughts)
  .post(createThought);

router
  .route('/:thoughtId')
  .get(getCertainThought)
  .put(updateThought)
  .delete(deleteThought);

router
  .route('/:thoughtId/reaction')
  .post(addReaction);

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;