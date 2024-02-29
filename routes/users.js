// JavaScript source code
const usersController = require('../controllers/users');
const express = require('express');
var router = express.Router();

router.route('/')
/*    .get(usersController.getUser)
*/    .post(usersController.createUser);
/*router.route('/:id')
    .get(articleController.getArticle)
    .patch(articleController.updateArticle)
    .delete(articleController.deleteArticle);*/
module.exports = router; 
