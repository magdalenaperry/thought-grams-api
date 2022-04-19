const router = require('express').Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
} = require('../../controllers/thoughtController');

router.route('/')
.get(getThoughts)
.post(createThought);

router.route('/:postId')
.get(getSingleThought);

module.exports = router;

//  createThought({ body }, res) {
//         Thought.create(
//           { thoughtText: body.thoughtText,
//             username: body.username }
//           )
//         .then((
//           {_id}) => User.findOneAndUpdate(
//             { _id: body.userId}, 
//             { $push: { thoughts: _id } }, 
//             { new: true }))

//         .then(dbThoughtData => res.json(dbThoughtData))
//         .catch(err => res.status(400).json(err))
//     },