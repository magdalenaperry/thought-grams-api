const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser, 
  createFriend,
  deleteFriend

} = require('../../controllers/userController');

// /api/users
router.route('/')
  .get(getUsers)
  .post(createUser);

// /api/users/:userId
router.route('/:_id')
.get(getSingleUser)
.delete(deleteUser)

router.route('/:userId/friends/:friendId')
.post(createFriend)
.delete(deleteFriend)

module.exports = router;
