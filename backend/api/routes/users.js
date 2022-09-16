let express = require('express');
let router = express.Router();

const UsersController = require("../controllers/users");

// get all users
router.get('/', UsersController.get_all_users);

// get user by id
router.get('/:userId', UsersController.get_user);

// add user
router.post('/', UsersController.add_user);

// update user
router.patch('/:userId', UsersController.update_user);

// delete user
router.delete('/:userId', UsersController.delete_user);

module.exports = router;
