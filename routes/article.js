// JavaScript source code
const articleController = require('../controllers/article');
const express = require('express');
var router = express.Router();
const loginController = require('../controllers/login');

router.route('/')
    .get(loginController.isLoggedIn,articleController.getArticles)
router.route('/:id')
    .get(articleController.getArticle)
    .patch(articleController.updateArticle)
module.exports = router;
