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
  // successful!
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

  deleteThought(req, res) {
    Thought.findOneAndRemove({
        _id: req.params._id
      })
      //  !thought ?
      //  res.status(404).json({
      //    message: 'No course with that ID'
      //  }) :
      //  Thought.deleteMany({
      //    _id: {
      //      $in: course.students
      //    }
      //  })
      //  )
      .then((thought) =>
        res.json({
          message: 'Thought deleted!'
        }))
      .catch((err) => {
        console.log(err);
        res.status(500)
        .json(err)
      });

  },

  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        // console.log(thought)
        console.log(req.body);
        return User.findOneAndUpdate({
          _id: req.body.userId
        }, 
        { $push: { thoughts: thought._id } }, {
          new: true
        });
      })
      .then((user) =>
        !user ?
        res
        .status(404)
        .json({
          message: 'Post created, but found no user with that ID'
        }) :
        res.json('Yay! Created the post and updated user with thought 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

    // Update a Thought successful!
    updateThought(req, res) {
      Thought.findOneAndUpdate({ _id: req.params._id }, 
        { $set: req.body }, 
        { runValidators: true, new: true })
        .then((thoughtData) =>
          !thoughtData ?
          res.status(404).json({
            message: 'No user with this id!'
          }) :
          res.json(thoughtData)
        )
        .catch((err) => res.status(500).json(err));
    },




  createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, 
              runValidators: true }
        )
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thought found at this id!' });
                    return;
                }

                res.json(dbThoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // reaction Id!
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true, runValidators: true }
        )
            .then(thoughtsData => {
              // console.log(thoughtsData)
                if (!thoughtsData) {
                    res.status(404)
                    .json(
                      { message: 'No thoughts found at this id!' });
                    return;
                }
                res.json(thoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
};