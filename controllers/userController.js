const {
  Thought,
  User
} = require('../models');

module.exports = {
  // get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // get user by id and populate thoughts and friend data
  getSingleUser(req, res) {
    User.findOne({
        _id: req.params._id
      })
      .select('-__v')
      .populate('thoughts')
      .then((user) =>
        !user ?
        res.status(404).json({
          message: 'No user with that ID'
        }) :
        res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },


  // Update a 
  updateUser(req, res) {
    User.findOneAndUpdate({
        _id: req.params._id
      }, {
        $set: req.body
      }, {
        runValidators: true,
        new: true
      })
      .then((userData) =>
        !userData ?
        res.status(404).json({
          message: 'No user with this id!'
        }) :
        res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a student and remove them from the course
  deleteUser(req, res) {
    User.findOneAndRemove({
        _id: req.params._id
      })
      // .then((user) =>
      //   !user ? res.status(404).json({
      //     message: 'No user exists'
      //   }) : User.findOneAndUpdate({
      //     _id: req.params.studentId
      //   }, {
      //     $pull: {
      //       _id: req.params.userId
      //     }
      //   }, {
      //     new: true
      //   })
      // )
      .then((user) =>
        // !user ?
        // res.status(404).json({
        //   message: 'User deleted'
        // }) :
        res.json({
          message: 'User successfully deleted'
        })
      )
      .catch((err) => {
        console.log(err);
        res.status(500)
          .json(err);
      });
  },

// create a friend successful!
  createFriend({params}, res) {
    User.findOneAndUpdate(
      { _id: params.userId }, 
      { $push: { friends: params.friendId } }, 
      { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({
            message: 'No user found at this id!'
          });
          return;
        }
        res.json(dbUserData)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

// delete a friend SUCCESSFUL!
  deleteFriend({params}, res) {
    User.findOneAndUpdate(
      { _id: params.userId},
      { $pull: { friends: params.friendId } },
      { new: true })
      .then(userData => {
        if (!userData) {
          res.status(404).json({
            message: 'No user found at this id!'
          });
          return;
        }
        res.json(userData)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
}