// JavaScript source code
const articleController = require('../controllers/article');
const express = require('express');
var router = express.Router();
const loginController = require('../controllers/login');

router.route('/')
    .get(loginController.isLoggedIn,articleController.getArticles)
   // .post(articleController.createArticle);
router.route('/:id')
    .get(articleController.getArticle)
    .patch(articleController.updateArticle)
  //  .delete(loginController.isLoggedIn,articleController.deleteArticle);
module.exports = router;
