const router = require('express').Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

const { create } = require('../../models/user');

router.route('/')
.get(getThoughts)
.post(createThought);

router.route('/:_id')
.get(getSingleThought)
.delete(deleteThought);

router.route(`/:thoughtId/reactions`)
.post(createReaction)

router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)

module.exports = router;
