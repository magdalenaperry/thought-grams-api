const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser
} = require('../../controllers/userController');

// /api/users
router.route('/')
  .get(getUsers)
  .post(createUser);

// /api/users/:userId
router.route('/:_id')
.get(getSingleUser)
.delete(deleteUser)

module.exports = router;
