// JavaScript source code
const usersController = require('../controllers/users');
const express = require('express');
var router = express.Router();

router.route('/')
/*    .get(usersController.getUser)
*/    .post(usersController.createUser);
router.route('/:id')
    .get(usersController.getUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser);
module.exports = router; 
