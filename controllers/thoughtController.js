const {
  Thought,
  User
} = require('../models');

module.exports = {

  getThoughts(req, res) {
    Thought.find()
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne(
      { _id: req.params._id })
      .then((thoughtData) =>
        !thoughtData ?
        res.status(404).json(
          { message: 'No thought with that ID' }) : 
        res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteThought({ params }, res) {
    Thought.findOneAndRemove(
      { _id: params._id })
      // { $pull: { thoughts: params._id } }, 
      // { new: true, runValidators: true })

      .then((thought) =>
        res.json(
          { message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId }, 
          { $push: { thoughts: thought._id } }, 
          { new: true });
      })
      .then((userData) =>
        !userData ?
        res.status(404).json(
          { message: 'Oops. Thought was created, but found no user with that ID'}) :
        res.json('Yay! Thought was created and linked to the user')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params._id }, 
      { $set: req.body }, 
      { runValidators: true, new: true })
      .then((thoughtData) =>
        !thoughtData ?
        res.status(404).json(
          { message: 'No user with this id!' }) :
        res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId}, 
      { $push: { reactions: body } }, 
      { new: true, runValidators: true })
      .then(thoughtsData => {
        !thoughtsData ?
          res.status(404).json(
            { message: 'No thought found at this id!' }) :
          res.json(thoughtsData)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId }, 
      { $pull: { reactions: { reactionId: params.reactionId } } }, 
      { new: true, runValidators: true })
      .then(thoughtsData => {
        !thoughtsData ?
          res.status(404).json(
            { message: 'No thoughts found at this id!' }) :
          res.json(thoughtsData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
};