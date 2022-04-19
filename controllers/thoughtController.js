const {
  Thought,
  User
} = require('../models');

module.exports = {
  // SUCCESSFUL!
  getThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne({
        _id: req.params._id
      })
      .then((thought) =>
        !thought ?
        res.status(404).json({
          message: 'No post with that ID'
        }) :
        res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
      console.log(thought)
        console.log(req.body);
        return User.findOneAndUpdate(
          { _id: req.body.userId }, 
          { $push: { thoughts: thought._id } }, 
          { new: true });
      })
      .then((user) =>
        !user ?
        res
        .status(404)
        .json({
          message: 'Post created, but found no user with that ID'
        }) :
        res.json('Created the post 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};



