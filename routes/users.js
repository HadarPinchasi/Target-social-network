// JavaScript source code
const usersController = require('../controllers/users');
const articlesController = require('../controllers/article');
const express = require('express');
const loginController = require('../controllers/login');
const users = require('../models/users');
var router = express.Router();

router.route('/')
/*    .get(usersController.getUser)
*/    .post(usersController.createUser);
router.route('/:id')
    .get(usersController.getUser)
    .patch(loginController.isLoggedIn,usersController.updateUser)
    .delete(loginController.isLoggedIn,usersController.deleteUser);
router.route('/:id/posts')
    .post(loginController.isLoggedIn,articlesController.createArticle)
router.route('/:id/posts/:pid')
    .delete(loginController.isLoggedIn, articlesController.deleteArticle)
    .patch(loginController.isLoggedIn, articlesController.updateArticle)
router.route('/:id/friends')
    .get(usersController.getFriends)
    .post(usersController.newFriend);
router.route('/:id/friends/:fid')
    .patch(usersController.approveFriend)
    .delete(usersCobtroller.deleteFriend);


module.exports = router; 
 