// JavaScript source code
const usersController = require('../controllers/users');
const articlesController = require('../controllers/article');
const express = require('express');
const loginController = require('../controllers/login');
var router = express.Router();

router.route('/')
  .post(usersController.createUser); //being used
router.route('/:id')
    .get(loginController.isLoggedIn,usersController.getUser)//being used -id=username
    .patch(loginController.isLoggedIn, usersController.updateUser)//being used -id=username
    .delete(loginController.isLoggedIn, usersController.deleteUser);//being used -id=username
router.route('/:id/posts')
    .post(loginController.isLoggedIn,articlesController.createArticle)//being used -id=username
    .get(loginController.isLoggedIn,usersController.getPostsOf)//being used 
router.route('/:id/posts/:pid')
    .delete(loginController.isLoggedIn,articlesController.deleteArticle) //being used -id=username
    .patch(loginController.isLoggedIn,articlesController.updateArticle)//being used -id=username
router.route('/:id/friends')
    .get(loginController.isLoggedIn,usersController.getFriends)//need to do to only friends
    .post(loginController.isLoggedIn,usersController.newFriendRequest);
router.route('/:id/friends/:fid')
    .patch(loginController.isLoggedIn,usersController.approveRequest)
    .delete(loginController.isLoggedIn,usersController.deleteFriend);
router.route('/:id/friendsRequest')
    .get(loginController.isLoggedIn, usersController.getRequests);





module.exports = router; 
 